function Sprites(levelData, loader) {
	var program = loader.getProgram('glsl/sprite');

	var arrays = new oogl.AttributeArrays(6);
	arrays.add2f([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]);

	var texture = loader.getTexture('media/sprites.png');

	var sprites = new MultiSet();

	function add(type, x, z) {
		return sprites.add({
			type: type,
			x: x,
			z: z
		});
	};

	function addTypes(types) {
		var removers = [];
		var spriteMap = levelData.spriteMap;
		types.forEach(function (type) {
			for (var i in spriteMap) {
				for (var j in spriteMap[i]) {
					if (spriteMap[i][j] === type) {
						removers.push(add(type, j * 2, i * 2));
					}
				}
			}
		});
		return removers;
	}

	this.add = add;
	this.addTypes = addTypes;
	this.addType = function (type) {
		return addTypes([type]);
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
