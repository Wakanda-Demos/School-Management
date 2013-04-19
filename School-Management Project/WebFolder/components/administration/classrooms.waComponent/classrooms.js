
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'classrooms';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var dg = $$(getHtmlId('dataGrid1'));
		
		insertColPicker(dg , true , {
			colPOptions: {
				attrName  : 'color'
			},
			confirm : 'Do you want to remove this classroom?'
		});
	// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
	var classroomEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		var src = dg.source;
		dg.$domNode.find('.content-edit').blur();
		setTimeout(function(){
			src.addNewElement();
			dg.editCell(src.getPosition() , 0);
		} , 200)
	};// @lock

	classroomEvent.onCollectionChange = function classroomEvent_onCollectionChange (event)// @startlock
	{// @endlock
		window[getHtmlId('nbClassrooms')] = this.length + ' classroom' + (this.length > 1 ? 's' : '');
		sources[getHtmlId('nbClassrooms')].sync();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container1", "click", container1.click, "WAF");
	WAF.addListener(this.id + "_classroom", "onCollectionChange", classroomEvent.onCollectionChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
