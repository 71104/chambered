/*global OOGL: false */

function Game(oogl) {
	var camera = new Camera(oogl);
	var floor = new Floor(oogl, function () {
		(new OOGL.RenderLoop(function () {
			floor.draw(camera);
			oogl.flush();
		})).start();
	});
}

/*
 * this hack is necessary to suppress linter's unused variable warning.
 * `jshint unused: false` won't work due to a bug in jshint.
 */
(function () {})(Game);
