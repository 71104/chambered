var Sound = {
	play: function (id) {
		var element = document.querySelector('audio#' + id + '-sound');
		element && element.play();
	}
};
