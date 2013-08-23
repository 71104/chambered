function Plane(levelName, assets) {
	var program = assets.getProgram('glsl/plane');
	var texture = assets.getTexture('media/levels/' + levelName + '/floor.png');

	var arrays = new oogl.AttributeArrays(6);
	arrays.add4f([
		0, 0, 0, 1,
		1, 0, 1, 0,
		-1, 0, 1, 0,
		-1, 0, -1, 0,
		1, 0, -1, 0,
		1, 0, 1, 0
	]);

	this.setup = function (camera) {
		program.use();
		arrays.enable();
		arrays.bindAndPointer();
		texture.bind();
		camera.uniform(program);
	};

	this.render = function (height) {
		program.uniform1f('fHeight', height);
		arrays.drawTriangleFan();
	};

	this.cleanup = function () {
		arrays.disable();
	};
}
