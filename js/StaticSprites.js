function StaticSprites(levelData, assets) {
	var program = assets.getProgram('glsl/sprites');

	var arrays = (function () {
		var count = 0;
		var vertices = [];
		var pivots = [];
		var textureCoordinates = [];

		function addSprite(type, x, z) {
			count += 6;
			vertices.push(-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1);
			pivots.push(x, z, x, z, x, z, x, z, x, z, x, z);
			textureCoordinates.push(type, type, type, type, type, type);
		}

		var spriteMap = levelData.spriteMap;
		var wallMap = levelData.wallMap;
		for (var i in spriteMap) {
			for (var j in spriteMap[i]) {
				var x = j * 2;
				var z = i * 2;
				if ((spriteMap[i][j] === 3) || (spriteMap[i][j] === 4)) {
					if (wallMap[i - 1] && (wallMap[i - 1][j] === 0)) {
						addSprite(4 - (i + j) % 2, x, z - 0.85);
					}
					if (wallMap[i + 1] && (wallMap[i + 1][j] === 0)) {
						addSprite(3 + (i + j) % 2, x, z + 0.85);
					}
					if (wallMap[i] && (wallMap[i][j - 1] === 0)) {
						addSprite(4 - (i + j) % 2, x - 0.85, z);
					}
					if (wallMap[i] && (wallMap[i][j + 1] === 0)) {
						addSprite(3 + (i + j) % 2, x + 0.85, z);
					}
				} else if ((spriteMap[i][j] === 9) || (spriteMap[i][j] === 10)) {
					addSprite(spriteMap[i][j], x, z);
				}
			}
		}

		var arrays = new oogl.AttributeArrays(count);
		arrays.add2f(vertices);
		arrays.add2f(pivots);
		arrays.add1f(textureCoordinates);

		return arrays;
	})();

	var texture = assets.getTexture('media/sprites.png');

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
