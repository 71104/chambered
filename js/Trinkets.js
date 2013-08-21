function Trinkets(sprites) {
	var trinkets = new MultiSet();

	function Trinket() {
		var removeTrinket = trinkets.add(this);
		var removeSprite = this.remove;
		this.remove = function () {
			removeTrinket();
			removeSprite();
		};
	}

	sprites.addType(13).forEach(function (sprite) {
		Trinket.call(sprite);
	});

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
