function Plane(levelName, loader, camera) {
	var program = loader.getProgram('glsl/plane');
	var texture = loader.getTexture('media/levels/' + levelName + '/floor');

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
		arrays.bindAndPointer();
		arrays.enable();
		texture.bind();
		camera.uniform(program);
	};

	this.render = function (height) {
		program.uniform1f('fHeight', height);
		arrays.drawTriangleFan();
		arrays.disable();
	};
}
