var CASTORGUI = CASTORGUI || {};

(function() {

    CASTORGUI.GUITextLink = function(id, options, guimanager, append) {

		CASTORGUI.GUIManager.call(this, guimanager.canvas, guimanager.options);

		this.append = append;
		if(append == null || append == undefined) { this.append = true; }

		this.id = id;
		this.html = document.body || document.getElementsByTagName('body')[0];
		this.textPosition = {x:options.x, y:options.y};
		this.textSize = options.size || 30;
		this.color = options.color || null;
		this.background = options.background || null;
		this.police = options.police || null;
		this.texte = options.text || "google.com";
		this.zIndex = options.zIndex || 1;
		this.bold = options.bold || null; // bold
		this.italic = options.italic || null; //italic
		this.position = options.position || "absolute";
		this.centerVertical = options.centerVertical || false;
		this.centerHorizontal = options.centerHorizontal || false;
		this.inline = options.inline || false;
		this.textVisible = true;
		this.textElement = null;
		this.font = null;
		this.href = options.href || "https:\/\/www.google.com";

		if(this.append == true) {
			this.addElement(this.append);
		}
	};

	Extends(CASTORGUI.GUITextLink, CASTORGUI.GUIManager);

	CASTORGUI.GUITextLink.prototype.addElement = function(append, element) {
		var signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		this.font = this.textSize+"px "+this.police;
		this.textElement = document.createElement("a");
		if(this.inline == false) {
			this.textElement.style.width = "auto";
		} else {
			this.textElement.style.width = CASTORGUI.GUITextLink.getTextWidth(this.texte, this.font).w+"px";			
		}
		this.textElement.style.height = CASTORGUI.GUITextLink.getTextWidth(this.texte, this.font).h+"px";
		if(CASTORGUI.GUIManager.convertPixelToPercent == true) {			
			if(append == true) {
				this.textElement.style.top = this.convertPixelToPercentHeight(this.textPosition.y + this.getCanvasOrigine().top)+"%";
				this.textElement.style.left = this.convertPixelToPercentWidth(this.textPosition.x + this.getCanvasOrigine().left)+"%";
			} else {
				this.textElement.style.top = (this.textPosition.y)+"px";
				this.textElement.style.left = (this.textPosition.x)+"px";
			}
		} else {
			if(append == true) {
				this.textElement.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+signe;
				this.textElement.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+signe;
			} else {
				this.textElement.style.top = this.textPosition.y+signe;
				this.textElement.style.left = this.textPosition.x+signe;
			}
		}			
		this.textElement.style.display = "block";
		this.textElement.style.position = this.position;
		this.textElement.style.font = this.font;
		this.textElement.style.color = this.color;
		this.textElement.style.background = this.background;
		this.textElement.style.fontStyle = this.italic;
		this.textElement.style.fontWeight = this.bold;
		this.textElement.innerHTML = this.texte;
		this.textElement.id = this.id;
		this.textElement.name = this.id;
		this.textElement.className = "GUITextLink";
		this.textElement.style.zIndex = this.zIndex;
		this.textElement.setAttribute('href', this.href);

		if(append == true) {
			if(this.centerVertical) {
				var marginTop = ((this.getCanvasSize().height / 2) - (CASTORGUI.GUITextLink.getTextWidth(this.texte, this.font).h / 2));
				this.textElement.style.top = (marginTop + this.getCanvasOrigine().top)+signe;
			}
			if(this.centerHorizontal) {
				var marginTotal = (this.getCanvasSize().width - CASTORGUI.GUITextLink.getTextWidth(this.texte, this.font).w);
				var marginLeft = (marginTotal / 2);
				this.textElement.style.left = (marginLeft + this.getCanvasOrigine().left)+signe;
			}
			this.html.appendChild(this.textElement);
		} else {
			if(this.centerVertical) {
				this.textElement.style.top = "calc(50% - "+(CASTORGUI.GUITextLink.getTextWidth(this.texte, this.font).h / 2)+"px)";
			}
			if(this.centerHorizontal == "true") {
				this.textElement.style.width = "100%";
				this.textElement.style.textAlign = "center";
			}
			element.appendChild(this.textElement);
		}
		this.addGuiElements(this.textElement);
    };

	CASTORGUI.GUITextLink.prototype.updateText = function(texte){
		var signe = "";
		if(this.pixel) { signe = "px"; }
		else { signe = "%"; }
		if(this.append == true) {
			this.textElement.style.width = CASTORGUI.GUITextLink.getTextWidth(texte, this.font).w+signe;
			this.textElement.style.height = CASTORGUI.GUITextLink.getTextWidth(texte, this.font).h+signe;
			this.textElement.style.top = (this.textPosition.y + this.getCanvasOrigine().top)+signe;
			this.textElement.style.left = (this.textPosition.x + this.getCanvasOrigine().left)+signe;
		} else {
			this.textElement.style.top = this.textPosition.y+signe;
			this.textElement.style.left = this.textPosition.x+signe;
		}
		if(this.centerVertical == "true") {
			var marginTop = ((this.getCanvasSize().height / 2) - (CASTORGUI.GUITextLink.getTextWidth(texte, this.font).h / 2));
			this.textElement.style.top = (marginTop + this.getCanvasOrigine().top)+signe;
		}
		if(this.centerHorizontal == "true") {
			var marginTotal = (this.getCanvasSize().width - CASTORGUI.GUITextLink.getTextWidth(texte, this.font).w);
			var marginLeft = (marginTotal / 2);
			this.textElement.style.left = (marginLeft + this.getCanvasOrigine().left)+signe;
		}
		this.textElement.innerHTML = texte;
	};

	CASTORGUI.GUITextLink.getTextWidth = function(texte, font){
		var tag = document.createElement("div");
		tag.style.position = "absolute";
		tag.style.left = "-999em";
		tag.style.display = "block";
		tag.style.whiteSpace = "nowrap";
		tag.style.font = font || this.textSize+"px "+this.police;
		tag.innerHTML = texte;
		document.body.appendChild(tag);
		var result = {w:tag.clientWidth+10,h:tag.clientHeight};
		document.body.removeChild(tag);
		return result;
	};

	CASTORGUI.GUITextLink.prototype.dispose = function() {
		return this.html.removeChild(this.getElementById(this.id));
    };

    CASTORGUI.GUITextLink.prototype.setVisible = function(bool, fade) {
		var display;
		if(fade == undefined) fade = true;
		var element = this.getElementById(this.id);
		if(bool == true) {
			display = "block";
			this.textVisible = true;
			if(fade == true) { this.fadeIn(element); }
		} else {
			display = "none";
			this.textVisible = false;
			if(fade == true) { this.fadeOut(element);}
		}
		if(fade == false) { element.style.display = display; }
    };

    CASTORGUI.GUITextLink.prototype.isVisible = function() {
		return this.textVisible;
    };

})();
