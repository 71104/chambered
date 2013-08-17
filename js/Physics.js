var Physics = {
	clamp: function (p1, r1, p2, r2, v) {
		var p = {
			x: p2.x - p1.x + v.x,
			z: p2.z - p1.z + v.z
		};
		var r = r1 + r2;
		if ((p.x >= 0) && (p.x < r)) {
			if ((p.z >= 0) && (p.z < r)) {
				if (p.z > p.x) {
					p2.z = p1.z + r + 0.001;
					v.z = 0;
					return true;
				} else {
					p2.x = p1.x + r + 0.001;
					v.x = 0;
					return true;
				}
			} else if ((p.z < 0) && (p.z > -r)) {
				if (-p.z > p.x) {
					p2.z = p1.z - r - 0.001;
					v.z = 0;
					return true;
				} else {
					p2.x = p1.x + r + 0.001;
					v.x = 0;
					return true;
				}
			} else {
				return false;
			}
		} else if ((p.x < 0) && (p.x > -r)) {
			if ((p.z >= 0) && (p.z < r)) {
				if (p.z > -p.x) {
					p2.z = p1.z + r + 0.001;
					v.z = 0;
					return true;
				} else {
					p2.x = p1.x - r - 0.001;
					v.x = 0;
					return true;
				}
			} else if ((p.z < 0) && (p.z > -r)) {
				if (-p.z > -p.x) {
					p2.z = p1.z - r - 0.001;
					v.z = 0;
					return true;
				} else {
					p2.x = p1.x - r - 0.001;
					v.x = 0;
					return true;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}
	},
	clampAgainstWalls: function (p, r, test, v) {
		function clamp(i, j, v) {
			if (test(i, j)) {
				return Physics.clamp({
					x: j * 2,
					z: i * 2
				}, 1, p, r, v);
			} else {
				return false;
			}
		}
		var i = Math.round(p.z / 2);
		var j = Math.round(p.x / 2);
		var collision = clamp(i - 1, j, v);
		collision |= clamp(i, j - 1, v);
		collision |= clamp(i, j + 1, v);
		collision |= clamp(i + 1, j, v);
		collision |= clamp(i - 1, j - 1, v);
		collision |= clamp(i - 1, j + 1, v);
		collision |= clamp(i + 1, j - 1, v);
		collision |= clamp(i + 1, j + 1, v);
		return collision;
	}
};
