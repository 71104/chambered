function Bars(sprites) {
	var bars = sprites.addTypes([0]);

	this.cut = function (i, j) {
		bars.fastForEach(function (bars) {
			var cell = bars.getCell();
			if ((cell.i == i) && (cell.j == j)) {
				Sound.play('cut');
				bars.setType(1);
			}
		});
	};
}
