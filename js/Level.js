function Level(loader, name, camera) {
	var data = loader.getData('data/' + name + '.json');

	var sky = new Sky(loader, camera);
	var plane = new Plane(name, loader, camera);
	//this.squares = new Squares(data, camera);
	//this.blocks = new Blocks(data, camera);
	//this.doors = new Doors(data, camera);
	//this.switches = new Switches(data.switchMap, this.doors);
	//this.sprites = new Sprites(data, camera);
	//this.torches = new Torches(this, data);
	//this.weakWalls = new WeakWalls(this, data, camera);
	//this.trinkets = new Trinkets(this, data.spriteMap);
	//this.chests = new Chests(this, data.lootMap);
	//this.entities = new Entities(this, data);
	//this.boulders = new Boulders(this, data);
	//this.bars = new Bars(this, data.walkMap);
	//this.enemies = new Enemies(this);

	//this.block = function (i, j) {
	//	return (i in data.walkMap) && data.walkMap[i][j];
	//};

	//this.ice = function (i, j) {
	//	return (i in data.floorMap) && (data.floorMap[i][j] === 8);
	//};

	//this.water = function (i, j) {
	//	return (i in data.waterMap) && data.waterMap[i][j];
	//};

	//this.ladder = function (i, j) {
	//	return (i in data.ladderMap) && data.ladderMap[i][j];
	//};

	//this.getLadder = function (source) {
	//	return data.ladders[source];
	//};

	oogl.depthFunc(oogl.GREATER);
	oogl.clearDepth(0);
	oogl.enable(oogl.CULL_FACE);

	this.render = function () {
		if (!data.ceiling) {
			oogl.disable(oogl.DEPTH_TEST);
			sky.render();
			oogl.enable(oogl.DEPTH_TEST);
		}
		oogl.clear(oogl.DEPTH_BUFFER_BIT);
		oogl.disable(oogl.CULL_FACE);
		plane.setup();
		plane.render(-1);
		if (data.ceiling) {
			plane.render(1);
		}
		oogl.enable(oogl.CULL_FACE);
	};
}
