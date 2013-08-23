function Sprites(levelData, assets) {
	var program = assets.getProgram('glsl/sprite');

	var arrays = new oogl.AttributeArrays(6);
	arrays.add2f([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]);

	var texture = assets.getTexture('media/sprites.png');

	var sprites = new MultiSet();

	function Sprite(type, x, z) {
		this.setType = function (newType) {
			type = newType;
		};

		this.getPosition = function () {
			return {
				x: x,
				z: z
			};
		};
		this.getCell = function () {
			return {
				i: Math.round(z / 2),
				j: Math.round(x / 2)
			};
		};

		this.setPosition = function (newX, newZ) {
			x = newX;
			z = newZ;
		};

		this.fork = function (type) {
			return new Sprite(type, x, z);
		};

		this.render = function () {
			program.uniform3f('Sprite', type, x, z);
			arrays.drawTriangles();
		};

		this.remove = sprites.add(this);
	}

	function addTypes(types) {
		var sprites = [];
		var spriteMap = levelData.spriteMap;
		types.forEach(function (type) {
			for (var i in spriteMap) {
				for (var j in spriteMap[i]) {
					if (spriteMap[i][j] === type) {
						sprites.push(new Sprite(type, j * 2, i * 2));
					}
				}
			}
		});
		return sprites;
	}

	this.add = function (type, x, z) {
		return new Sprite(type, x, z);
	};

	this.addTypes = addTypes;
	this.addType = function (type) {
		return addTypes([type]);
	};

	function drawSprite(sprite) {
		sprite.render();
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
