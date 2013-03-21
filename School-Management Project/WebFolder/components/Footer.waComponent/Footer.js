
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'Footer';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	var
	$cont = $$(getHtmlId('container1'));
	
	$cont.center({center : 'h'});
	
	$(window).resize(function(){
		$cont.center({center : 'h'});
	})
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
