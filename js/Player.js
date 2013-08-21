function Player(level, camera) {
	var $this = this;

	var moveSpeed = 7.5; // units per second
	var moveDelta = moveSpeed * period / 1000;
	var turnSpeed = Math.PI * 1.5; // radiants per second
	var turnDelta = turnSpeed * period / 1000;
	var slideSpeed = 10; // units per second
	var slideDelta = slideSpeed * period / 1000;

	camera.set(22, 0.3, 16, Math.PI / 6);

	var moveState = (function () {
		function sign(x) {
			return (x < 0) ? -1 : 1;
		}
		var State = {
			walking: (function (newLevel) {
				return function (level, input, dz, dx, da) {
					var move = camera.move(level, dz, dx, da, input);
					if (input) {
						level.trinkets.remove(move.i, move.j);
					}
					if (move.newCell) {
						if (!newLevel && level.ladders.test(move.i, move.j)) {
							return State.walking(true);
						} else {
							if (level.ice(move.i, move.j)) {
								if (level.items.getSelected() != 4) {
									Sound.play('slide');
									return State.sliding({
										x: (move.j - move.j0) * slideDelta,
										z: (move.i - move.i0) * slideDelta
									});
								} else {
									camera.startSkating(move.dx, move.dz);
									return State.skating;
								}
							} else {
								return State.walking(false);
							}
						}
					} else {
						return State.walking(newLevel);
					}
				};
			}),
			sliding: (function (vector) {
				return function (level, input, dz, dx, da) {
					var move = camera.slide(level, vector.z, vector.x, da, input);
					if (move.newCell && !level.ice(move.i, move.j)) {
						return State.walking(false);
					} else if (move.collision) {
						return State.stopped;
					} else if (level.items.getSelected() != 4) {
						return State.sliding(vector);
					} else {
						camera.startSkating(vector.x, vector.z);
						return State.skating;
					}
				};
			}),
			stopped: function (level, input, dz, dx, da) {
				var move = camera.move(level, dz, dx, da, input);
				if (input) {
					if (level.items.getSelected() != 4) {
						Sound.play('slide');
						if (Math.abs(move.dx) > Math.abs(move.dz)) {
							return State.sliding({
								x: slideDelta * sign(move.dx),
								z: 0
							});
						} else {
							return State.sliding({
								x: 0,
								z: slideDelta * sign(move.dz)
							});
						}
					} else {
						camera.startSkating(0, 0);
						return State.skating;
					}
				} else {
					return State.stopped;
				}
			},
			skating: function (level, input, dz, dx, da) {
				var move = camera.skate(level, dz, dx, da);
				if (move.newCell && !level.ice(move.i, move.j)) {
					return State.walking(false);
				} else if (level.items.getSelected() != 4) {
					Sound.play('slide');
					if (Math.abs(move.dx) > Math.abs(move.dz)) {
						return State.sliding({
							x: slideDelta * sign(move.dx),
							z: 0
						});
					} else {
						return State.sliding({
							x: 0,
							z: slideDelta * sign(move.dz)
						});
					}
				} else {
					return State.skating;
				}
			},
			swimming: function (level, input, dz, dx, da) {
				// TODO
			}
		};
		return State.walking(true);
	})();

	this.tick = function (dz, dx, da) {
		dz *= moveDelta;
		dx *= moveDelta;
		da *= turnDelta;
		moveState = moveState($this.level, !!(dz || dx), dz, dx, da);
	};

	this.action = function () {
		var cell = camera.getPointedCell();
		level.weakWalls.destroy(cell.i, cell.j);
		level.chests.open(cell.i, cell.j);
		//level.doors.toggle(cell.i, cell.j);
		//level.switches.switch_(cell.i, cell.j);
		var selectedItem = level.items.getSelected();
		if (selectedItem === 0) {
			var cameraPosition = camera.getPosition();
			var x = cameraPosition.x;
			var z = cameraPosition.z;
			if (!level.enemies.hit(x, z)) {
				level.boulders.hit(x, z);
			}
		} else if (selectedItem === 3) {
			level.bars.cut(cell.i, cell.j);
		}
	};

	this.setLevel = function (newLevel) {
		var ladder = newLevel.getLadder(level.name);
		camera.moveTo(ladder.j * 2, ladder.i * 2);
		level = newLevel;
	};
}
