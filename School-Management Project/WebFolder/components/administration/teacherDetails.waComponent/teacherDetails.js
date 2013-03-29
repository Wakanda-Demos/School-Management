
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'studentDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		combo 	= $$(getHtmlId('combobox1')),
		dataSource = sources.adminTeacher;
	// @region namespaceDeclaration// @startlock
	var container6 = {};	// @container
	var container7 = {};	// @container
	var icon3 = {};	// @icon
	// @endregion// @endlock

	// eventHandlers// @lock
	
	if(dataSource.getCurrentElement() && dataSource.getCurrentElement().getKey()){
		var
		spec	= dataSource.getCurrentElement().speciality;
		
		switch(true){
			case spec instanceof WAF.EntityAttributeRelated:
				spec.load({
					onSuccess: function(e){
						spec = e.entity;
					}
				})
				break;
			case spec instanceof WAF.Entity:
				break;
		}
		
		if(combo.source.length == 0){
			combo.source.all({
				onSuccess: function(e){
					if(spec){
						e.dataSource.selectByKey(spec.getKey());
					}
					else{
						e.dataSource.select(-1);
					}
				}
			})
		}
		else if(spec){
			combo.setValue(spec.getKey());
		}
		else{
			combo.source.select(-1);
		}
	}

	container6.click = function container6_click (event)// @startlock
	{// @endlock
		dataSource.speciality.set(combo.source);
		dataSource.save({
			onSuccess: function(){
				$$('mainDialog').closeDialog();
			}
		});
	};// @lock

	container7.click = function container7_click (event)// @startlock
	{// @endlock
		dataSource.cancel();
		$$('mainDialog').closeDialog();
	};// @lock

	icon3.click = function icon3_click (event)// @startlock
	{// @endlock
		$$('mainDialog').closeDialog();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container6", "click", container6.click, "WAF");
	WAF.addListener(this.id + "_container7", "click", container7.click, "WAF");
	WAF.addListener(this.id + "_icon3", "click", icon3.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
