var CASTORGUI = CASTORGUI || {};
var guiElements = [];
var GUIstyle = null;
var GUItheme = null;
var objectCreate = function(proto) { //Alternative aux anciens navigateurs qui ne dispose pas de la methode Object.create()
	function construct() { }
	construct.prototype = proto;
	return new construct();
};
var Extends = function(ChildClass, ParentClass) { // ClassB (child) herite de classNameA (parent)
	ChildClass.prototype = Object.create(ParentClass.prototype) || objectCreate(ParentClass.prototype);
	ChildClass.prototype.constructor = ChildClass;
};

(function()
{
	CASTORGUI.GUIManager = function(canvas, css, options) {
		this.canvasCss = css;
		this.canvas = canvas;
		this.groups = [];
		this.guiVisible = true;		
		if(options) {
			this.pixel = options.pixel;
			this.themeRoot = options.themeRoot || "";
			this.theme = options.themeGUI || "default";
		} else {
			this.pixel = true;
			this.themeRoot = "";
			this.theme = "default";
		}			
		this.head = document.head || document.getElementsByTagName('head')[0] || null;
		this.html = document.body || document.getElementsByTagName('body')[0];
		if(this.head == null) {
			this.header = document.createElement('head');
			this.head.appendChild(this.header);
		}
		this.addStyle(this.canvasCss, options, this.theme);
    };

	CASTORGUI.GUIManager.prototype.addGuiElements = function(elem)
	{
		guiElements.push(elem);
	};
	
	CASTORGUI.GUIManager.convertPixelToPercent = false;
	
	CASTORGUI.GUIManager.prototype.convertPixelToPercentWidth = function(pixel)
	{
		var screenWidth = window.innerWidth;
		var valueWidth = (pixel / screenWidth) * 100;
		return valueWidth;
	};
	
	CASTORGUI.GUIManager.prototype.convertPixelToPercentHeight = function(pixel)
	{
		var screenHeight = window.innerHeight;		
		var valueHeight = (pixel / screenHeight) * 100;
		return valueHeight;
	};
	
	CASTORGUI.GUIManager.prototype.addStyle = function(css, options, theme)
	{
		if(css) {
			// CSS
			if(GUIstyle == null) {				
				GUIstyle = document.createElement('style');
				GUIstyle.type = 'text/css';
				GUIstyle.media = 'screen';
				GUIstyle.id = "styleGUI";		
				if (GUIstyle.styleSheet){
					GUIstyle.styleSheet.cssText = this.canvasCss;
				} else {
					GUIstyle.appendChild(document.createTextNode(this.canvasCss));
				}
				this.head.appendChild(GUIstyle);
			}
		}
		if(theme && options) {
			//Theme
			if(GUItheme == null) {				
				GUItheme = document.createElement('link');
				GUItheme.type = 'text/css';
				GUItheme.rel = 'stylesheet';
				GUItheme.media = 'screen';
				GUItheme.id = "themeGUI";
				GUItheme.href = this.themeRoot+"themesGUI/"+theme+".css";
				this.head.appendChild(GUItheme);
			}
		}
	};
	
	CASTORGUI.GUIManager.prototype.fadeOut = function(el) {
		if(el) {
			el.style.opacity = 1;
			(function fade_moin() {
				if ((el.style.opacity -= 0.1) < 0.1) {
					el.style.display = "none";
					el.style.opacity = 0;
				} else if(el.style.opacity > 0) {
					requestAnimationFrame(fade_moin);
				}
			})();
		}
	};

	CASTORGUI.GUIManager.prototype.fadeIn = function(el){
		if(el) {
			el.style.opacity = 0;
			el.style.display = "block";
			(function fade_plus() {
				var val = parseFloat(el.style.opacity);
				if (!((val += 0.1) > 0.9)) {
					el.style.opacity = 1;
					requestAnimationFrame(fade_plus);
				}
			})();
		}
	};

	CASTORGUI.GUIManager.prototype.getElementById = function(id) {
		return document.getElementById(id);
    };

	CASTORGUI.GUIManager.prototype.getCanvasOrigine = function() {
        var offsets = this.canvas.getBoundingClientRect(),
		offsetsTop = offsets.top || 0,
		offsetsLeft = offsets.left || 0;
		return {top:offsetsTop, left:offsetsLeft};
    };

	CASTORGUI.GUIManager.prototype.getCanvasSize = function() {
		var offsets = this.canvas.getBoundingClientRect(),
		offsetsWidth = offsets.width || 0,
		offsetsHeight = offsets.height || 0;
		return {width:offsetsWidth, height:offsetsHeight};
	};

    CASTORGUI.GUIManager.prototype.dispose = function() {
		var that = this;
		guiElements.forEach(function(e) {
			if(that.getElementById(e.id)) {
				that.html.removeChild(that.getElementById(e.id));
			}
		});
		return;
    };

    CASTORGUI.GUIManager.prototype.setVisible = function(bool, fade) {
		var display;
		var that = this;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.guiVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.guiVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) {
			guiElements.forEach(function(e) {
				that.getElementById(e.id).style.display = display;
			});
		}
    };

	CASTORGUI.GUIManager.prototype.isVisible = function() {
		return this.guiVisible;
    };

})();
