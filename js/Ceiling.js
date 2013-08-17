function Ceiling(oogl, callback) {
	var program = new oogl.AjaxProgram('ceiling', ['in_Vertex'], callback);
	var arrays = new oogl.AttributeArrays(6);

	arrays.add4f([
		0, 0, 0, 1,
		1, 0, 1, 0,
		-1, 0, 1, 0,
		-1, 0, -1, 0,
		1, 0, -1, 0,
		1, 0, 1, 0
	]);

	this.draw = function (camera) {
		program.use();
		camera.uniform(program);
		arrays.bindAndPointer();
		arrays.drawTriangleFan();
	};
}
