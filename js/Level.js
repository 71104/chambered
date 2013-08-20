function Level(loader, name) {
	var data = loader.getData('data/' + name + '.json');

	var sky = new Sky(loader);
	var plane = new Plane(name, loader);

	//this.squares = new Squares(data, camera);

	var blocks = new Blocks(data, loader);
	var staticSprites = new StaticSprites(data, loader);
	var sprites = new Sprites(data, loader);
	var bars = new Bars(sprites);
	var chests = new Chests(sprites);
	var boulders = new Boulders(sprites);
	var enemies = new Enemies(sprites);

	//this.doors = new Doors(data, camera);
	//this.switches = new Switches(data.switchMap, this.doors);
	//this.torches = new Torches(this, data);
	//this.weakWalls = new WeakWalls(this, data, camera);
	//this.trinkets = new Trinkets(this, data.spriteMap);
	//this.entities = new Entities(this, data);

	this.block = function (i, j) {
		return (i in data.walkMap) && data.walkMap[i][j];
	};

	this.ice = function (i, j) {
		return (i in data.floorMap) && (data.floorMap[i][j] === 8);
	};

	this.water = function (i, j) {
		return (i in data.waterMap) && data.waterMap[i][j];
	};

	this.ladder = function (i, j) {
		return (i in data.ladderMap) && data.ladderMap[i][j];
	};

	this.getLadder = function (source) {
		return data.ladders[source];
	};

	oogl.depthFunc(oogl.GREATER);
	oogl.clearDepth(0);

	this.render = function (camera) {
		oogl.disable(oogl.DEPTH_TEST);
		oogl.disable(oogl.CULL_FACE);
		if (!data.ceiling) {
			sky.render(camera);
		}
		plane.setup(camera);
		plane.render(-1);
		if (data.ceiling) {
			plane.render(1);
		}
		plane.cleanup();
		oogl.enable(oogl.DEPTH_TEST);
		oogl.clear(oogl.DEPTH_BUFFER_BIT);
		oogl.enable(oogl.CULL_FACE);
		blocks.render(camera);
		staticSprites.render(camera);
		sprites.render(camera);
	};
}
