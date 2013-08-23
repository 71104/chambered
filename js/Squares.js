function Squares(levelData, assets) {
	var program = assets.getProgram('glsl/squares');

	var arrays = new oogl.AttributeArrays(levelData.squares.vertexArray.length / 3);
	arrays.add3f(levelData.squares.vertexArray);
	arrays.add2f(levelData.squares.textureCoordinates);

	var texture = assets.getTexture('media/levels/' + levelData.name + '/squares.png');

	this.render = function (camera) {
		program.use();
		arrays.enable();
		arrays.bindAndPointer();
		texture.bind();
		camera.uniform(program);
		arrays.drawTriangles();
		arrays.disable();
	};
}
