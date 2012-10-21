(function(window) {
	var dataLocation = "resource/json/data.json";
	var imageLocation = "resource/image/";
	var buttonSpriteName = "zoomButtons.png";
	var holderId = "tileHolder";
	var holder;
	var container;
	var data;
	var startX;
	var startY;
	var zoomOutButton;
	var zoomInButton;
	var currentZoom=0;
	var imgCollection=[];
	function Main() {
		if (window.addEventListener) {
			window.addEventListener("load", onLoad);
		} else {
			window.attachEvent("onload", onLoad);
		}

	}

	function onLoad() {
		// holder = document.getElementById(holderId);
		// holder.style.overflow = "hidden";
		// holder.style.position = "relative";
// 
		// createContainer();
		// createButtons();
		// var randomNum = Math.floor(Math.random() * 10) + 2;
		// Utensil.URLLoader.load(dataLocation + "?randomNum=" + randomNum, dataLoaded);
		ZoomTiles.init();

	}

	// function createContainer() {
		// container = new UIElement();
		// container.build();
		// container.layout(new GridLayout());
		// container.layout().verticalGap = 0;
		// container.layout().horizontalGap = 0;
		// container.layout().top = 0;
		// container.layout().bottom = 0;
		// container.setStyle();
		// holder.appendChild(container.display);
		// container.arrange();
// 		
		// container.display.style["-moz-user-select"]="none";
		// container.display.style["-khtml-user-select"]="none";
		// container.display.style["-webkit-user-select"]="none";
		// container.display.style["user-select"]="none";
	// }
// 
	// function createButtons() {
		// zoomOutButton = document.createElement("div");
		// zoomInButton = document.createElement("div");
// 
		// zoomOutButton.style.backgroundImage = "url("+imageLocation + buttonSpriteName+")";
		// zoomOutButton.style.width = "35px";
		// zoomOutButton.style.height = "35px";
		// zoomOutButton.style.position = "absolute";
		// zoomOutButton.style.margin = "0px";
		// zoomOutButton.style.padding = "0px";
		// zoomOutButton.style.backgroundPosition = "0 -35px";
// 
		// zoomInButton.style.backgroundImage ="url("+imageLocation + buttonSpriteName+")";
		// zoomInButton.style.width = "35px";
		// zoomInButton.style.height = "35px";
		// zoomInButton.style.position = "absolute";
		// zoomInButton.style.margin = "0px";
		// zoomInButton.style.padding = "0px";
		// zoomInButton.style.cursor = "pointer";
// 		
		// zoomInButton.style.left = (holder.clientWidth-40)+"px";
		// zoomOutButton.style.left = (holder.clientWidth-40)+"px";
		// zoomInButton.style.top = "5px";
		// zoomOutButton.style.top = "45px";
		// zoomOutButton.style.cursor = "pointer";
// 		
		// holder.appendChild(zoomInButton);
		// holder.appendChild(zoomOutButton);
	// }
	// function onZoomIn(event)
	// {
		// if(currentZoom+1<=parseInt(data.maxLevel))
		// {
			// currentZoom++;
			// clearGrid();
			// createGrid(currentZoom);
		// }
	// }
	// function onZoomOut(event)
	// {
// 		
		// if(currentZoom-1>=parseInt(data.minLevel))
		// {
			// currentZoom--;
			// clearGrid();
			// createGrid(currentZoom);
			// checkXY();
		// }
	// }
	// function checkXY()
	// {
		// if(container.x() < -(container.width() - holder.clientWidth))
		// {
			// container.x(-(container.width() - holder.clientWidth));
		// }
		// if(container.y() < -(container.height() - holder.clientHeight))
		// {
			// container.y(-(container.height() - holder.clientHeight));
		// }
	// }
	// function clearGrid()
	// {
		// for(var a=0;a<imgCollection.length;a++)
		// {
			// container.removeChild(imgCollection[a]);
		// }
		// imgCollection=[];
	// } 
	// function createGrid(z) {
// 		
		// for (var a = 0; a < data.zoom.length; a++) {
			// var zoom = data.zoom[a];
// 			
			// if (parseInt(zoom.level) == parseInt(z)) {
				// container.width((data.cellSize * zoom.cols) + 10);
				// container.height((data.cellSize * zoom.rows) + 10);
				// for (var b = 0; b < zoom.image.length; b++) {
// 
					// var img = new Image();
					// img.src = imageLocation + zoom.level + "/" + zoom.image[b];
					// img.style.position = "absolute";
					// img.style.width = data.cellSize + "px";
					// img.style.height = data.cellSize + "px";
					// img.style.margin = "0px";
					// img.style.padding = "0px";
					// img.ondragstart = function() {
						// return false;
					// };
					// imgCollection.push(img);
					// container.addChild(img);
				// }
			// }
		// }
		// container.arrange();
	// }
// 
	// function dataLoaded(t, x) {
		// data = eval('(' + t + ')');
		// currentZoom =parseInt(data.startLevel);
		// createGrid(currentZoom);
// 
		// addListeners();
	// }
// 
	// function addListeners() {
// 
		// Utensil.addListener(container.display, "mousedown", onMouseDown);
		// Utensil.addListener(zoomOutButton, "click", onZoomOut);
		// Utensil.addListener(zoomInButton, "click", onZoomIn);
	// }
// 
	// function onMouseDown(event) {
		// startX = Utensil.mouseX(document.body, event);
		// startY = Utensil.mouseY(document.body, event);
		// Utensil.addListener(document.body, "mouseup", onMouseUp);
		// Utensil.addListener(container.display, "mouseup", onMouseUp);
		// Utensil.addListener(document.body, "mousemove", onMouseMove);
	// }
// 
	// function onMouseUp(event) {
		// Utensil.removeListener(document.body, "mousemove", onMouseMove);
		// Utensil.removeListener(container.display, "mouseup", onMouseUp);
		// Utensil.removeListener(document.body, "mouseup", onMouseUp);
	// }
// 
	// function onMouseMove(event) {
		// var x = container.x() - (startX - Utensil.mouseX(document.body, event));
		// var y = container.y() - (startY - Utensil.mouseY(document.body, event));
// 
		// if (x < 0 && x > -(container.width() - holder.clientWidth))
			// container.x(x);
// 
		// if (y < 0 && y > -(container.height() - holder.clientHeight))
			// container.y(y);
// 
		// startX = Utensil.mouseX(document.body, event);
		// startY = Utensil.mouseY(document.body, event);
// 		
		// if(event.preventDefault)event.preventDefault();
		// return false;
	// }


	Main();
}
)(window);
