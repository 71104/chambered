function Ladders(levelData) {
	EventEmitter.call(this);
	var thisObject = this;

	var map = levelData.ladderMap;

	this.test = function (i, j) {
		if (map[i] && map[i][j]) {
			thisObject.emit('ladder', map[i][j]);
			return true;
		} else {
			return false;
		}
	};
}
