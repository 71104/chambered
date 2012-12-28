module.exports = function (grunt) {
	var files = [
		'js/Camera.js',
		'js/Floor.js',
		];
	grunt.initConfig({
		lint: {
			files: files
		},
		jshint: {
			options: {
				camelcase: true,
				curly: true,
				immed: true,
				indent: 4,
				latedef: true,
				newcap: true,
				noarg: true,
				quotmark: 'single',
				undef: true,
				unused: true,
				strict: false,
				trailing: true,
				boss: true,
				debug: true,
				expr: true,
				loopfunc: true,
				multistr: true,
				supernew: true,
				browser: true
			},
			globals: {
				ActiveXObject: false
			}
		},
		concat: {
			dist: {
				src: files,
				dest: 'game.js'
			}
		},
		min: {
			dist: {
				src: files,
				dest: 'game.js'
			}
		}
	});
	grunt.registerTask('default', 'min');
	grunt.registerTask('debug', 'lint concat');
};
