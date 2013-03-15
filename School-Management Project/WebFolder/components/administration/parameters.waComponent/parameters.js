
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'parameters';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		schoolSource 	= sources[getHtmlId('school')],
		agendaSource	= sources[getHtmlId('agenda0')];
		
	// @region namespaceDeclaration// @startlock
	var saveAll = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	saveAll.click = function saveAll_click (event)// @startlock
	{// @endlock
		var msg = "All changes have been saved";
		
		schoolSource.save({
			onSuccess: function(){
				agendaSource.save({
					onSuccess: function(){
						if(dhtmlx.alert){
							dhtmlx.alert(msg)
						}
						else{
							alert(msg);
						}
					}
				});
			}
		});
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_saveAll", "click", saveAll.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
