var resizedMixin=(function() {

	function _startDrag(e, context) {
		context.target;
		context.target.draggable = true;
		context.target.style.position = "fixed";
		context.offsetX = e.offsetX;
		var Xoff = context.offsetX = e.offsetX;
		var Yoff = context.offsetY = e.offsetY;
		document.addEventListener("mousemove", dragmeplease);
		document.addEventListener("mouseup", endThisPlease);
		function endThisPlease(omu) {
				document.removeEventListener("mousemove", dragmeplease);
				document.removeEventListener("mouseup", endThisPlease);
			}
		function dragmeplease(mp) {
			var _x = mp.clientX > 10 && mp.clientX < document.body.offsetWidth ? mp.clientX : mp.clientX < 10 ? 10 : mp.clientX > document.body.offsetWidth ? (document.body.offsetWidth - 25) : mp.clientX;
			_x = _x.toString() + 'px';
			var _y = mp.clientY > 8 && mp.clientY < window.innerHeight - 125 ? mp.clientY : mp.clientY < 8 ? 8 : mp.clientY > window.innerHeight - 125 ? window.innerHeight - 125 : mp.clientY;
			_y = _y.toString() + 'px';
			let target = context.target != undefined ? context.target : mp.target.dataset != undefined && mp.target.dataset.dragtarget != undefined ? getTarget(mp) : mp.target.parentElement;
			target.style.top = _y;
			target.style.left = _x;
	}
	}
	function _resizeWidget(e, context) {
		context._X = e.clientX - context.width;
		context._Y = e.clientY - context.height;
		context.target.draggable=false;
		document.addEventListener("mousemove", resizemeplease, true);
		function endResize(omu) {
		context.hasHeader?console.log(context.header_0,"hjehejh"):console.log("hello", context.resultsArea);
				document.removeEventListener("mousemove", resizemeplease, true);
				document.removeEventListener("mouseup", endResize);
			}
			document.addEventListener("mouseup", endResize);
		var context2=context;
		function resizemeplease(mp) {
			// let parent=mp.target;
	
			var _x = (mp.clientX - context._X) > 32 && (mp.clientX - context._X) < (document.body.offsetWidth - 48) ? mp.clientX - context._X : mp.clientX - context._X < 32 ? 32 : (mp.clientX - context._X) > (document.body.offsetWidth - 48) ? (document.body.offsetWidth - 64) : mp.clientX - context._X;
			_x = _x.toString() + 'px';
			var _y = (mp.clientY - context._Y) > 32 && (mp.clientY - context._Y) < (window.innerHeight - 64) ? mp.clientY - context._Y : mp.clientY - context._Y < 32 ? 32 : (mp.clientY - context._Y) > (window.innerHeight - 64) ? (window.innerHeight - 64) : mp.clientY - context._Y;
			_y = _y.toString() + 'px';
			context.width != undefined && context.height != undefined ? (context.height = _y, context.width = _x) : alert("grand error");
			
	}
	}

	const dragtag = (targetId) => `<section data-btn="dragme" style="font-size: 24px; cursor: move; color: blue; position: absolute; left: 0px; top: 0px;" draggable drags data-target="id_${targetId}">\&#x2756;</section>`;
	
	const resizer = (id1, id_2) => `<section id="${id1}_${id_2}" data-btn="resizeme" data-target="id_${id1}" style="font-size: 24px; cursor: nwse-resize; color: blue; position: absolute; right: 0px; bottom: 0px;z-index: 39;">\&#x21f1</section>`;
	
class Widget {
	constructor(argInit){
		let pa=argInit.targetId;
		tagsToProperties([pa], this);
		Object.defineProperties(this, {
			"width": {
				enumerable: true,
				configurable: true,
				get: function() {
					return document.getElementById(pa).getBoundingClientRect().width;
				},
				set: function(value) {
					document.getElementById(pa).style.width = value;
				}
			},
			"target":{
				enumerable: true,
				configurable: true,
				get:function(){return document.getElementById(pa);},
				set:function(value){},
				},
			"height": {
				enumerable: true,
				configurable: true,
				get: function() {
					return document.getElementById(pa).getBoundingClientRect().height;
				},
				set: function(value) {
					document.getElementById("form").style.height=value;
					document.getElementById(pa).style.height = value;
				}
			},
			"hasHeader":{
				enumerable:true,
			configurable:true,
				get:function(){
				if(this.headerNodes===undefined){
						this.headerNodes
							=this[pa].querySelectorAll(".header");
					console.log(this.headerNodes);
					return this.headerNodes.length>0
						?([].slice.call(this.headerNodes).forEach((n,i)=>{
						n.dataset.btn="_startDrag"; 
						n.dataset.target="id_resultsArea"
						n.dataset.id=`header_${i}`;
						this[`header_${i}`]=n;
									}),true):false;
					}
		},
			}
		});
		this.target=argInit.targetId?this[argInit.targetId]:{};
		this[argInit.targetId].addEventListener("mousedown", this, true);
		this.handleEvent=function(e){
			 var d=e.target.dataset;
					if(d.target!=undefined){
						this.getTarget(e);
						console.log(this.target, this[argInit.targetId], "the okeu")
					}
			switch (e.type) {
				case "mousedown":
					if(d != undefined && d.btn != undefined && typeof this[d.btn]==="function"){
										this[d.btn](e);
					}
				break;
			}
			
		};
		this.initializeMixins(argInit);
}
	getTarget(e){
		var d = e.target.dataset,split;
		this.target=d.target != undefined &&d.target.includes("_")? (split = d.target.split("_"), split[0]==="id"? document.getElementById(split[1]): e.target.parentElement): e.target.parentElement;
	}
	initializeMixins(argInit){
				alert("I DID SQUAT");
			}
		}

var dragMixin = Widget => class extends Widget {
  dragme(e) { 
		_startDrag(e, this);
	
	}
}
var resizeMixin = Widget => class extends Widget {
  		resizeme(e) { _resizeWidget(e, this);}
}

var initMixin = Widget => class extends Widget {
	initializeMixins(argInit) {
		this.target.insertAdjacentHTML("afterbegin", dragtag(argInit.targetId));

		this.target.firstElementChild.style.zIndex="22";
		this.target.insertAdjacentHTML('beforeend', resizer(argInit.targetId, argInit.id2));

	}
}

class SpecialWidget extends initMixin(resizeMixin(dragMixin(Widget))) {}

	var pickle = new SpecialWidget({"targetId": "resultsArea","id2": "zero"});
return pickle;
	})()

						