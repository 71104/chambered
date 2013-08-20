function Rubble(loader, type) {
	var program = loader.getProgram('glsl/rubble');

	var arrays = new oogl.AttributeArrays(6);
	arrays.add2f([-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1]);

	var texture = loader.getTexture('media/sprites.png');

	var pebbles = new MultiSet();

	function Pebble(spawnTime, x, y, z) {
		var remove = pebbles.add(this);
		setTimeout(remove, Math.round(Math.random() * 10000));

		var x0 = x;
		var y0 = y;
		var z0 = z;
		var vx = 0;
		var vy = 0;
		var vz = 0;
		var ay = 0;

		this.tick = function (timestamp) {
			var t = timestamp - spawnTime;
			x = vx * t + x0;
			y = Math.max(0, ay * t * t + vy * t + y0);
			z = vz * t + z0;
			vx *= 0.9;
			vy *= 0.9;
			vz *= 0.9;
		};

		this.render = function () {
			program.uniform3f('Position', x, y, z);
			arrays.drawTriangles();
		};
	}

	this.spawn = function (i, j) {
		for (var c = 0; c < 15; c++) {
			var x = j * 2 + Math.random() * 2 - 1;
			var y = Math.random() * 2;
			var z = i * 2 + Math.random() * 2 - 1;
			new Pebble(x, y, z);
		}
	};

	this.tick = function (timestamp) {
		pebbles.fastForEach(function (pebble) {
			pebble.tick(timestamp);
		});
	};

	this.render = function (camera) {
		program.use();
		arrays.enable();
		arrays.bindAndPointer();
		texture.bind();
		camera.uniform(program);
		pebbles.fastForEach(function (pebble) {
			pebble.render();
		});
		arrays.disable();
	};
}
