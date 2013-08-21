var Sound = {
	play: function (id) {
		var element = querySelector('audio#' + id + '-sound');
		element && element.play();
	}
};
