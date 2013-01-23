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
