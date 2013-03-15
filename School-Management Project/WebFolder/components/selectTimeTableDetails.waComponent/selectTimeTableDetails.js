
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'selectTimeTableDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		getHtmlObj('container1').smSearch({
			datasource: sources[getHtmlId('teacher')]
		});
		
		this.clear = function(){
			getHtmlObj('container1').smSearch('clear');
		}
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
