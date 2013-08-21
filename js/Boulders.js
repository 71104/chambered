function Boulders(level, sprites) {
	var boulders = new MultiSet();

	function Boulder() {
		boulders.add(this);

		var position = this.getPosition();

		var vx = 0;
		var vz = 0;

		this.tick = function () {
			// TODO
		};

		this.clamp = function (p, r, v) {
			Physics.clamp(position, 0.8, p, r, v);
		};
	}

	sprites.addTypes([6, 7]).forEach(function (sprite) {
		Boulder.call(sprite);
	});

	this.tick = function () {
		boulders.fastForEach(function (boudler) {
			boulder.tick();
		});
	};

	this.clamp = function (p, r, v) {
		boulders.fastForEach(function (boulder) {
			boulder.clamp(p, r, v);
		});
	};
}
