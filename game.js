function Floor(oogl, callback) {
	var program = new oogl.AjaxProgram('floor', ['in_Vertex'], callback);
	var arrays = new oogl.AttributeArrays(6);
	arrays.add4('float', [
		0, 0, 0, 1,
		1, 0, 1, 0,
		-1, 0, 1, 0,
		-1, 0, -1, 0,
		1, 0, -1, 0,
		1, 0, 1, 0
	]);
	this.draw = function () {
		program.use();
		arrays.bindAndPointer();
		arrays.drawTriangleFan();
	};
}
