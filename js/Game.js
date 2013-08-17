function Game(oogl) {
	var loader = new oogl.Loader();
	loader
		.queueTextures(
	[
		'media/sky.png',
		'media/levels/crypt/walls.png',
		'media/levels/crypt/floor.png',
		'media/levels/crypt/squares.png',
		'media/levels/dungeon/walls.png',
		'media/levels/dungeon/floor.png',
		'media/levels/dungeon/squares.png',
		'media/levels/ice/walls.png',
		'media/levels/ice/floor.png',
		'media/levels/ice/squares.png',
		'media/levels/overworld/walls.png',
		'media/levels/overworld/floor.png',
		'media/levels/overworld/squares.png',
		'media/levels/start/walls.png',
		'media/levels/start/floor.png',
		'media/levels/start/squares.png',
		'media/levels/temple/walls.png',
		'media/levels/temple/floor.png',
		'media/levels/temple/squares.png',
		'media/sprites/0.png',
		'media/sprites/1.png',
		'media/sprites/rubble/crypt.png',
		'media/sprites/rubble/dungeon.png',
		'media/sprites/rubble/ice.png',
		'media/sprites/rubble/start.png',
		'media/sprites/rubble/temple.png',
		'media/sprites/3.png',
		'media/sprites/4.png',
		'media/sprites/5.png',
		'media/sprites/6.png',
		'media/sprites/7.png',
		'media/sprites/8.png',
		'media/sprites/9.png',
		'media/sprites/10.png',
		'media/sprites/11.png',
		'media/sprites/12.png',
		'media/sprites/13.png',
		'media/sprites/14.png',
		'media/sprites/15.png',
		'media/sprites/16.png',
		'media/sprites/17.png',
		'media/sprites/18.png',
		'media/sprites/19.png',
		'media/sprites/20.png',
		'media/sprites/21.png',
		'media/sprites/22.png',
		'media/sprites/23.png',
		'media/sprites/24.png',
		'media/sprites/25.png',
		'media/door/locked.png',
		'media/door/unlocked.png'
	])
		.queuePrograms(
	{
		'glsl/blocks': ['in_Vertex', 'in_TexCoord', 'in_fBrightness'],
		'glsl/plane': ['in_Vertex'],
		'glsl/sky': ['in_Vertex', 'in_TexCoord'],
		'glsl/sprite': ['in_Vertex', 'in_TexCoord'],
		'glsl/squares': ['in_Vertex', 'in_TexCoord'],
		'glsl/door/0': ['in_Vertex', 'in_TexCoord'],
		'glsl/door/1': ['in_Vertex', 'in_TexCoord'],
		'glsl/weak/0': ['in_Vertex', 'in_TexCoord'],
		'glsl/weak/1': ['in_Vertex', 'in_TexCoord'],
		'glsl/weak/2': ['in_Vertex', 'in_TexCoord'],
		'glsl/weak/3': ['in_Vertex', 'in_TexCoord']
	})
		.start(function ()
	{
		document.title = 'Prelude of the Chambered';
		var camera = new Camera(oogl);
		var floor = new Floor(oogl, function () {
			(new OOGL.RenderLoop(function () {
				floor.draw(camera);
				oogl.flush();
			})).start();
		});
		// TODO
	}, function (progress) {
		document.title = Math.round(progress) + '%';
	});
}
