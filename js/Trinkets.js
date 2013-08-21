function Trinkets(sprites) {
	var trinkets = sprites.addType(13);

	this.remove = function (i, j) {
		trinkets.fastForEach(function (trinket) {
			var cell = trinket.getCell();
			if ((cell.i == i) && (cell.j == j)) {
				Sound.play('trinket');
				trinket.remove();
			}
		});
	};
}
