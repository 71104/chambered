function Chests(levelData, sprites) {
	var chests = new MultiSet();

	function Chest() {
		var thisObject = this;

		var removeChest = chests.add(this);
		var cell = this.getCell();

		this.open = function (i, j) {
			if ((cell.i == i) && (cell.j == j)) {
				removeChest();
				thisObject.setType(12);
				Sound.play('treasure');
				Chests.emit('loot', map[i][j]);
				return true;
			} else {
				return false;
			}
		};
	}

	sprites.addType(11).forEach(function (sprite) {
		Chest.call(sprite);
	});

	var map = levelData.lootMap;

	this.open = function (i, j) {
		return chests.forEach(function (chest) {
			return !chest.open(i, j);
		});
	};
}

EventEmitter.call(Chests);
