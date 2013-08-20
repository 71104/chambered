function WeakWalls(levelData, loader, rubble) {
	var programs = [];
	for (var i = 0; i < 4; i++) {
		programs.push(loader.getProgram('glsl/weak/' + i));
	}

	var arrays = new oogl.AttributeArrays(4);
	arrays.add2f([-1, 1, -1, -1, 1, -1, 1, 1]);
	arrays.add2f([0.125, 0, 0.125, 1, 0.25, 1, 0.25, 0]);

	var wallMap = levelData.wallMap;
	var walkMap = levelData.walkMap;

	var map = {};
	for (var i in wallMap) {
		for (var j in wallMap[i]) {
			if (wallMap[i][j] === 1) {
				if (!(i in map)) {
					map[i] = {};
				}
				map[i][j] = true;
			}
		}
	}

	this.destroy = function (i, j) {
		if ((i in map) && map[i][j]) {
			//Sound.play('crumble');
			delete map[i][j];
			delete wallMap[i][j];
			walkMap[i][j] = false;
			rubble.spawn(i, j);
			return true;
		} else {
			return false;
		}
	};

	function blockAt(i, j) {
		return (i in wallMap) && (j in wallMap[i]);
	}

	var texture = loader.getTexture('media/levels/' + levelData.name + '/walls.png');

	this.render = function (camera) {
		arrays.enable();
		arrays.bindAndPointer();
		texture.bind();
		for (var type = 0; type < 4; type++) {
			var program = programs[type];
			program.use();
			camera.uniform(program);
			for (var i in map) {
				i = parseInt(i);
				for (var j in map[i]) {
					j = parseInt(j);
					if (!blockAt(i + [1, 0, -1, 0][type], j + [0, -1, 0, 1][type])) {
						program.uniform2i('Position', j, i);
						arrays.drawTriangleFan();
					}
				}
			}
		}
		arrays.disable();
	};
}
