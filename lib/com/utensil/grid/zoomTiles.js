/*
 * requires ToolkitJS and TweenLite with CSS Plugin
 * https://github.com/fahimc/Toolkit-JS
 * http://www.greensock.com/get-started-js/
 */
var ZoomTiles={
	dataLocation : "resource/json/data.json",
	imageLocation : "resource/image/",
	buttonSpriteName : "zoomButtons.png",
	holderId : "tileHolder",
	holder:null,
	container:null,
	data:null,
	startX:null,
	startY:null,
	zoomOutButton:null,
	zoomInButton:null,
	currentZoom:0,
	imgCollection:[],
	handlers:{},
	init:function() {
		this.holder = document.getElementById(this.holderId);
		this.holder.style.overflow = "hidden";
		this.holder.style.position = "relative";

		this.createContainer();
		this.createButtons();
		var randomNum = Math.floor(Math.random() * 10) + 2;
		
		var root=this;
		this.handlers.dataLoaded = function(t,x)
		{
			root.dataLoaded(t,x);
		}
		Utensil.URLLoader.load(this.dataLocation + "?randomNum=" + randomNum, this.handlers.dataLoaded);
	},
	 createContainer:function() {
		this.container = new UIElement();
		this.container.build();
		this.container.layout(new GridLayout());
		this.container.layout().verticalGap = 0;
		this.container.layout().horizontalGap = 0;
		this.container.layout().top = 0;
		this.container.layout().bottom = 0;
		this.container.setStyle();
		this.holder.appendChild(this.container.display);
		this.container.arrange();
		
		this.container.display.style["-moz-user-select"]="none";
		this.container.display.style["-khtml-user-select"]="none";
		this.container.display.style["-webkit-user-select"]="none";
		this.container.display.style["user-select"]="none";
	},

	 createButtons:function() {
		this.zoomOutButton = document.createElement("div");
		this.zoomInButton = document.createElement("div");

		this.zoomOutButton.style.backgroundImage = "url("+this.imageLocation + this.buttonSpriteName+")";
		this.zoomOutButton.style.width = "35px";
		this.zoomOutButton.style.height = "35px";
		this.zoomOutButton.style.position = "absolute";
		this.zoomOutButton.style.margin = "0px";
		this.zoomOutButton.style.padding = "0px";
		this.zoomOutButton.style.backgroundPosition = "0 -35px";

		this.zoomInButton.style.backgroundImage ="url("+this.imageLocation + this.buttonSpriteName+")";
		this.zoomInButton.style.width = "35px";
		this.zoomInButton.style.height = "35px";
		this.zoomInButton.style.position = "absolute";
		this.zoomInButton.style.margin = "0px";
		this.zoomInButton.style.padding = "0px";
		this.zoomInButton.style.cursor = "pointer";
		
		this.zoomInButton.style.left = (this.holder.clientWidth-40)+"px";
		this.zoomOutButton.style.left = (this.holder.clientWidth-40)+"px";
		this.zoomInButton.style.top = "5px";
		this.zoomOutButton.style.top = "45px";
		this.zoomOutButton.style.cursor = "pointer";
		
		this.holder.appendChild(this.zoomInButton);
		this.holder.appendChild(this.zoomOutButton);
	},
	 onZoomIn:function(event)
	{
		if(this.currentZoom+1<=parseInt(this.data.maxLevel))
		{
			this.currentZoom++;
			this.clearGrid();
			this.createGrid(this.currentZoom);
		}
	},
	 onZoomOut:function(event)
	{
		
		if(this.currentZoom-1>=parseInt(this.data.minLevel))
		{
			this.currentZoom--;
			this.clearGrid();
			this.createGrid(this.currentZoom);
			this.checkXY();
		}
	},
	 checkXY:function()
	{
		if(this.container.x() < -(this.container.width() - this.holder.clientWidth))
		{
			this.container.x(-(this.container.width() - this.holder.clientWidth));
		}
		if(this.container.y() < -(this.container.height() - this.holder.clientHeight))
		{
			this.container.y(-(this.container.height() - this.holder.clientHeight));
		}
	},
	 clearGrid:function()
	{
		for(var a=0;a<this.imgCollection.length;a++)
		{
			this.container.removeChild(this.imgCollection[a]);
		}
		this.imgCollection=[];
	} ,
	 createGrid:function(z) {
		
		for (var a = 0; a < this.data.zoom.length; a++) {
			var zoom = this.data.zoom[a];
			
			if (parseInt(zoom.level) == parseInt(z)) {
				this.container.width((this.data.cellSize * zoom.cols) + 10);
				this.container.height((this.data.cellSize * zoom.rows) + 10);
				for (var b = 0; b < zoom.image.length; b++) {

					var img = new Image();
					img.src = this.imageLocation + zoom.level + "/" + zoom.image[b];
					img.style.position = "absolute";
					img.style.width = this.data.cellSize + "px";
					img.style.height = this.data.cellSize + "px";
					img.style.margin = "0px";
					img.style.padding = "0px";
					img.ondragstart = function() {
						return false;
					};
					this.imgCollection.push(img);
					this.container.addChild(img);
				}
			}
		}
		this.container.arrange();
	},

	 dataLoaded:function(t, x) {
		this.data = eval('(' + t + ')');
		this.currentZoom =parseInt(this.data.startLevel);
		this.createGrid(this.currentZoom);

		this.addListeners();
	},

	 addListeners:function() {
		
		var root=this;
		this.handlers.onMouseDown = function(event)
		{
			root.onMouseDown(event);
		}
		this.handlers.onZoomOut = function(event)
		{
			root.onZoomOut(event);
		}
		this.handlers.onZoomIn = function(event)
		{
			root.onZoomIn(event);
		}
		this.handlers.onMouseUp = function(event)
		{
			root.onMouseUp(event);
		}
		this.handlers.onMouseMove = function(event)
		{
			root.onMouseMove(event);
		}
		
		Utensil.addListener(this.container.display, "mousedown", this.handlers.onMouseDown);
		Utensil.addListener(this.zoomOutButton, "click", this.handlers.onZoomOut);
		Utensil.addListener(this.zoomInButton, "click", this.handlers.onZoomIn);
	},

	 onMouseDown:function(event) {
		this.startX = Utensil.mouseX(document.body, event);
		this.startY = Utensil.mouseY(document.body, event);
		
		
		
		
		Utensil.addListener(document.body, "mouseup",  this.handlers.onMouseUp);
		Utensil.addListener(this.container.display, "mouseup",  this.handlers.onMouseUp);
		Utensil.addListener(document.body, "mousemove",  this.handlers.onMouseMove);
	},

	 onMouseUp:function(event) {
		Utensil.removeListener(document.body, "mousemove",  this.handlers.onMouseMove);
		Utensil.removeListener(this.container.display, "mouseup",   this.handlers.onMouseUp);
		Utensil.removeListener(document.body, "mouseup",   this.handlers.onMouseUp);
	},

	 onMouseMove:function(event) {
		var x = this.container.x() - (this.startX - Utensil.mouseX(document.body, event));
		var y = this.container.y() - (this.startY - Utensil.mouseY(document.body, event));

		if (x < 0 && x > -(this.container.width() - this.holder.clientWidth))
			this.container.x(x);

		if (y < 0 && y > -(this.container.height() - this.holder.clientHeight))
			this.container.y(y);

		this.startX = Utensil.mouseX(document.body, event);
		this.startY = Utensil.mouseY(document.body, event);
		
		if(event.preventDefault)event.preventDefault();
		return false;
	}
	
}