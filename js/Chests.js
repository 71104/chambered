function Chests(levelData, sprites) {
	var chests = sprites.addType(11);

	var map = levelData.lootMap;

	this.open = function (i, j) {
		chests.fastForEach(function (chest) {
			var cell = trinket.getCell();
			if ((cell.i == i) && (cell.j == j)) {
				Sound.play('chest');
				chest.setType(12);
				thisObject.emit('loot', map[i][j]);
			}
		});
	};
}
