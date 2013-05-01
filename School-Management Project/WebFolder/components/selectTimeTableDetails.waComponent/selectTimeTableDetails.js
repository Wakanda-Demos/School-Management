
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'selectTimeTableDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		
	// @region namespaceDeclaration// @startlock
	var teacherEvent = {};	// @dataSource
	var combobox2 = {};	// @combobox
	// @endregion// @endlock
		
	// eventHandlers// @lock

	teacherEvent.onCurrentElementChange = function teacherEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
//		if(!this._fromCombo){
//			$comp.widgets.combobox2._fromTeacher = true
//			sources.timeTable.teacher.set(this);
//		}
//		else{
//			delete this._fromCombo;
//		}
	};// @lock

	combobox2.change = function combobox2_change (event)// @startlock
	{// @endlock
		if(this.getValue()){
			var tt 	= sources.timeTable.getCurrentElement(),
				key	= tt ? tt.teacher.relKey : null;
				
			$comp.sources.teacher.query('speciality.ID == ' + this.getValue() , {
				onSuccess: function(e){
					if(e.dataSource.length > 1){
						e.dataSource.selectByKey(key , {
							onSuccess: function(ev){
								ev._ignore = true;
							}
						});
					}
				}
			})
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_teacher", "onCurrentElementChange", teacherEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_combobox2", "change", combobox2.change, "WAF");
	// @endregion// @endlock
	
	};// @lock


}// @startlock
return constructor;
})();// @endlock
