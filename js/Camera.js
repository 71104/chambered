function Camera() {
	var period = 16.67;

	var position = {
		x: 0,
		z: 0
	};
	var y = 0;
	var angle = 0;
	var i = 0;
	var j = 0;

	var waveSteps = Math.floor(300 / period);
	var waveStep = 0;

	var skateSpeed = 7.5; // units per second
	var skateDelta = skateSpeed * period / 1000;
	var skateAcceleration = 0.07; // units per square second FIXME hardcoded, recalculate on framerate
	var skateVector = {
		x: 0,
		z: 0
	};

	function setPosition(x, z) {
		position.x = x;
		position.z = z;
		i = Math.round(position.z / 2);
		j = Math.round(position.x / 2);
	}

	function movePosition(x, z) {
		position.x += x;
		position.z += z;
		i = Math.round(position.z / 2);
		j = Math.round(position.x / 2);
	}

	function doMove(level, v, da, waving) {
		angle += da;

		var i0 = i;
		var j0 = j;
		var dx = v.x;
		var dz = v.z;

		var collision = Physics.clampAgainstWalls(position, 0.6, function (i, j) {
			return level.block(i, j) || level.water(i, j);
		}, v);
		//collision |= level.entities.clamp(position, 0.6, v);
		movePosition(v.x, v.z);

		y = 0.3 + Math.cos(Math.PI + waveStep * 2 * Math.PI / waveSteps) * 0.05;
		if (waveStep || waving) {
			waveStep = (waveStep + 1) % waveSteps;
		}

		return {
			i0: i0,
			j0: j0,
			i: i,
			j: j,
			dx: dx,
			dz: dz,
			newCell: (i != i0) || (j != j0),
			collision: collision
		};
	}

	this.set = function (x1, y1, z1, angle1) {
		setPosition(x1, z1);
		y = y1;
		angle = angle1;
	};
	this.move = function (level, dz, dx, da, waving) {
		return doMove(level, {
			x: Math.cos(angle) * dx - Math.sin(angle) * dz,
			z: Math.sin(angle) * dx + Math.cos(angle) * dz
		}, da, waving);
	};
	this.slide = function (level, dz, dx, da, waving) {
		return doMove(level, {
			x: dx,
			z: dz
		}, da, waving);
	};

	function clamp(x, a, b) {
		return Math.min(Math.max(x, a), b);
	}
	function hypot(x, y) {
		return Math.sqrt(x * x + y * y);
	}

	this.startSkating = function (dx, dz) {
		skateVector = {
			x: dx,
			z: dz
		};
	};
	this.skate = function (level, dz, dx, da) {
		var dx1 = Math.cos(angle) * dx - Math.sin(angle) * dz;
		var dz1 = Math.sin(angle) * dx + Math.cos(angle) * dz;
		var h = hypot(dx1, dz1);
		skateVector.x = clamp(skateVector.x + skateAcceleration * dx1, -skateDelta, skateDelta);
		skateVector.z = clamp(skateVector.z + skateAcceleration * dz1, -skateDelta, skateDelta);
		return doMove(level, skateVector, da, false);
	};

	this.moveTo = setPosition;
	this.getPosition = function () {
		return {
			x: position.x,
			z: position.z
		};
	};

	this.getCell = function () {
		return {
			i: i,
			j: j
		};
	};
	this.getPointedCell = function () {
		var direction = Math.round(angle * 2 / Math.PI) % 4;
		direction = (direction + 4) % 4;
		return {
			i: i + [1, 0, -1, 0][direction],
			j: j + [0, -1, 0, 1][direction]
		};
	};

	this.uniform = function (program) {
		program.uniform4fv('Camera', [position.x, y, position.z, angle]);
	};
}
