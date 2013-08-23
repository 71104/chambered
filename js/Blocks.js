function Blocks(levelData, assets) {
	var program = assets.getProgram('glsl/blocks');

	var arrays = new oogl.AttributeArrays(levelData.vertexArray.length / 3);
	arrays.add3f(levelData.vertexArray);
	arrays.add2f(levelData.textureCoordinates);
	arrays.add1f(levelData.brightnessValues);

	var texture = assets.getTexture('media/levels/' + levelData.name + '/walls.png');

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
