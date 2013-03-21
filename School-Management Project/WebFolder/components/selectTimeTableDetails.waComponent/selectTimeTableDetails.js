
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'selectTimeTableDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	// @region namespaceDeclaration// @startlock
	var courseEvent = {};	// @dataSource
	// @endregion// @endlock
		
	// eventHandlers// @lock

	courseEvent.onCurrentElementChange = function courseEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		if(this.getCurrentElement()){
			sources[getHtmlId('teacher')].query('speciality.ID == ' + this.getCurrentElement().getKey())
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_course", "onCurrentElementChange", courseEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
