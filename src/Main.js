(function(window) {

	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		ZoomTiles.init();
	}
	Main();
}
)(window);
