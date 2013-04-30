
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
	// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		if(ds.Utils.loginAs($$(getHtmlId('combobox1')).getValue())){
			location.href = '/index/?view=agenda';
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container1", "click", container1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
