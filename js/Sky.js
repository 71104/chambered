function Sky(loader, camera) {
	var program = loader.getProgram('glsl/sky');
	var texture = loader.getTexture('media/sky.png');

	var arrays = new oogl.AttributeArrays(4);
	arrays.add2f([-1, 1, -1, -0.4, 5.4, -0.4, 5.4, 1]);
	arrays.add2f([0, 0, 0, 1, 1, 1, 1, 0]);

	this.render = function () {
		program.use();
		arrays.enable();
		arrays.bindAndPointer();
		texture.bind();
		camera.uniform(program);
		arrays.drawTriangleFan();
		arrays.disable();
	};
};
