function Sprites(levelData, loader) {
	var program = loader.getProgram('glsl/sprite');

	var arrays = new oogl.AttributeArrays(6);
	arrays.add2f([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]);

	var texture = loader.getTexture('media/sprites.png');

	var sprites = new MultiSet();

	this.add = function (type, x, z) {
		return sprites.add({
			type: type,
			x: x,
			z: z
		});
	};

	function drawSprite(sprite) {
		program.uniform3f('Sprite', sprite.type, sprite.x, sprite.z);
		arrays.drawTriangles();
	}

	this.render = function (camera) {
		program.use();
		arrays.enable();
		arrays.bindAndPointer();
		texture.bind();
		camera.uniform(program);
		sprites.fastForEach(drawSprite);
		arrays.disable();
	};
}
