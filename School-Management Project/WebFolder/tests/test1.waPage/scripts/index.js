
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var textField1 = {};	// @textField
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	textField1.keyup = function textField1_keyup (event)// @startlock
	{// @endlock
		debugger;
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var min = 8,
			max = 20;
			
		$.ui.rangeSlider.prototype.borders = function(){
			debugger;
		}
			
		$$('ranger').$domNode.css('overflow' , 'visible').rangeSlider({
			bounds	:{min: 0, max: 25},
			step	: 1,
			range 	: {
				min: 10,
				max: 20
			},
			formatter:function(val){
				return val;
			}
		})
		/*.on('valuesChanged' , function(e, slider){
			var values 	= slider.values,
				newMin	= values.min < min ? min : values.min,
				newMax	= values.max > max ? max : values.max;
			//debugger;
			//$(this).rangeSlider('values', newMin, newMax);
		})*/;
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("textField1", "keyup", textField1.keyup, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
