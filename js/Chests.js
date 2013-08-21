function Chests(levelData, sprites) {
	var chests = sprites.addType(11);

	var map = levelData.lootMap;

	this.open = function (i, j) {
		chests.forEach(function (chest) {
			var cell = chest.getCell();
			if ((cell.i == i) && (cell.j == j)) {
				Sound.play('chest');
				chest.setType(12);
				thisObject.emit('loot', map[i][j]);
			}
		});
	};
}
