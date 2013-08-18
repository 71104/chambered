function Plane(levelName, loader, camera) {
	var program = loader.getProgram('glsl/plane');
	var texture = loader.getTexture('media/levels/' + levelName + '/floor.png');

	var arrays = new oogl.AttributeArrays(6);
	arrays.add4f([
		0, 0, 0, 1,
		1, 0, 1, 0,
		-1, 0, 1, 0,
		-1, 0, -1, 0,
		1, 0, -1, 0,
		1, 0, 1, 0
	]);

	this.setup = function () {
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
