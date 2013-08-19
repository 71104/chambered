function StaticSprites(levelData, loader) {
	var program = loader.getProgram('glsl/sprites');
	var arrays = (function () {
		var count = 0;
		var vertices = [];
		var pivots = [];
		for (var i in levelData.spriteMap) {
			for (var j in levelData.spriteMap[i]) {
				count += 6;
				vertices.push(-1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1, 1);
				pivots.push(j, i, j, i, j, i, j, i, j, i, j, i);
			}
		}
		var arrays = new oogl.AttributeArrays(count);
		arrays.add2f(vertices);
		arrays.add2f(pivots);
		return arrays;
	})();

	this.render = function (camera) {
		program.use();
		arrays.enable();
		arrays.bindAndPointer();
		camera.uniform(program);
		arrays.drawTriangles();
		arrays.disable();
	};
}
