/*global period: false */

function Camera() {
	var moveSpeed = 7.5; // units per second
	var moveDelta = moveSpeed * period / 1000;
	var turnSpeed = Math.PI; // radiants per second
	var turnDelta = turnSpeed * period / 1000;
	var x, y, z, a;
	x = 0;
	y = 0.35;
	z = 0;
	a = 0;
	this.move = function (dz, dx, da) {
		a += turnDelta * da;
		x += Math.cos(a) * moveDelta * dx - Math.sin(a) * moveDelta * dz;
		z += Math.sin(a) * moveDelta * dx + Math.cos(a) * moveDelta * dz;
	};
	this.uniform = function (program) {
		program.uniform('4fv', 'Camera', [x, y, z, a]);
	};
}

function Floor(oogl, callback) {
	var program = new oogl.AjaxProgram('floor', ['in_Vertex'], callback);
	var arrays = new oogl.AttributeArrays(6);
	arrays.add4f([
		0, 0, 0, 1,
		1, 0, 1, 0,
		-1, 0, 1, 0,
		-1, 0, -1, 0,
		1, 0, -1, 0,
		1, 0, 1, 0
	]);
	this.draw = function (camera) {
		program.use();
		camera.uniform(program);
		arrays.bindAndPointer();
		arrays.drawTriangleFan();
	};
}

/*global OOGL: false */

/*jshint undef: false */

function Game(oogl) {
	/*jshint undef: true */
	var camera = new Camera(oogl);
	var floor = new Floor(oogl, function () {
		(new OOGL.RenderLoop(function () {
			floor.draw(camera);
			oogl.flush();
		})).start();
	});
}
