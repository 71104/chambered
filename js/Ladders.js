function Ladders(levelData) {
	var map = levelData.ladderMap;
	this.test = function (i, j) {
		if (map[i] && map[i][j]) {
			Ladders.emit('ladder', map[i][j]);
			return true;
		} else {
			return false;
		}
	};
}

EventEmitter.call(Ladders);
