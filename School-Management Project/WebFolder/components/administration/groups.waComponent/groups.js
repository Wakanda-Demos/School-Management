
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'groups';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		dg = $$(getHtmlId('dataGrid1'));
		
		insertColPicker(dg , true , {
			colPOptions: {
				attrName  : 'color'
			},
			confirm : 'Are you sure you want to delete this grade?'
		});
		
		dg.source.all();
	// @region namespaceDeclaration// @startlock
	var studyGroupEvent = {};	// @dataSource
	var container1 = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	studyGroupEvent.onCollectionChange = function studyGroupEvent_onCollectionChange (event)// @startlock
	{// @endlock
		window[getHtmlId('nbGroups')] = this.length + ' grade' + (this.length > 1 ? 's' : '');
		sources[getHtmlId('nbGroups')].sync();
	};// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		var src = dg.source;
		dg.$domNode.find('.content-edit').blur();
		setTimeout(function(){
			src.addNewElement();
			dg.editCell(src.getPosition() , 0);
		} , 200)
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_studyGroup", "onCollectionChange", studyGroupEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_container1", "click", container1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
