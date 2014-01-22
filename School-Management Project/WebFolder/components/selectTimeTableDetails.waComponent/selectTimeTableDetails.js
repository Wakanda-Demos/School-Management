
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'selectTimeTableDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var attrs			= ['_course', '_classroom', '_grade'],
			requiredCols 	= {
				init: function(all){
					for(var i = 0, attr; attr = attrs[i]; i++){
						requiredCols[attr] = false;
						if(all){
							Object.defineProperty(requiredCols, attr.substring(1), {
								set: function(){
									_checkReady();
								},
								get: function(){
									return null;
								},
								configurable: true
							});
						}
					}
				}
			};
		
		requiredCols.init(true);
	// @region namespaceDeclaration// @startlock
	var ttcourseEvent = {};	// @dataSource
	var ttclassroomEvent = {};	// @dataSource
	var ttstudyGroupEvent = {};	// @dataSource
	var combobox2 = {};	// @combobox
	// @endregion// @endlock
		function _checkReady(){
			for(var attr in attrs){
				if(!attrs[attr]){
					return false;
				}
			}
			
			requiredCols.init(false);
			$($comp).trigger('_ready');
		}
		

	// eventHandlers// @lock

	ttcourseEvent.onCollectionChange = function ttcourseEvent_onCollectionChange (event)// @startlock
	{// @endlock
		console.log('changed')
		if(this.length > 0){
			requiredCols['course'] = true;
		}
	};// @lock

	ttclassroomEvent.onCollectionChange = function ttclassroomEvent_onCollectionChange (event)// @startlock
	{// @endlock
		if(this.length > 0){
			requiredCols['classroom'] = true;
		}
	};// @lock

	ttstudyGroupEvent.onCollectionChange = function ttstudyGroupEvent_onCollectionChange (event)// @startlock
	{// @endlock
		if(this.length > 0){
			requiredCols['grade'] = true;
		}
	};// @lock

	combobox2.change = function combobox2_change (event)// @startlock
	{// @endlock
		//debugger;
		var val = this.$domNode.find('input').val();

		if(val && !sources.timeTable._doNotRefreshTeachers){
			this._callCount = this._callCount ? ++this._callCount : 1;
			switch(this._callCount){
				case 1:
					var tt 	= sources.timeTable.getCurrentElement();
					if(tt){
						this.setValue(tt.course.relKey);
					}
					return false;
				//case 2:
				//	return false;
			}
			
			var tt 	= sources.timeTable.getCurrentElement(),
				key	= tt ? tt.teacher.relKey : null;
				
			$comp.sources.teacher.query('speciality.ID == ' + this.getValue() , {
				onSuccess: function(e){
					if(e.dataSource.length > 1){
						e.dataSource.selectByKey(key);
					}
				}
			});
		}
		else if(!val){
			$comp.sources.teacher.query($comp.sources.teacher.getDataClass().getPrimaryKeyAttribute() + ' = null');
		}
//debugger;
		if(tt && sources.ttcourse && this._callCount<2){			
				sources.ttstudyGroup.selectByKey(tt.studyGroup.relKey);
				sources.ttclassroom.selectByKey(tt.classroom.relKey);
				sources.ttcourse.selectByKey(tt.course.relKey);
				}


	};// @lock
	function init_contournement()
		{
			
			sources.ttclassroom.all();
			sources.ttcourse.all();
			sources.ttstudyGroup.all();
		}

		init_contournement();
		//setTimeout(init_contournement,500);
	// @region eventManager// @startlock
	WAF.addListener("ttcourse", "onCollectionChange", ttcourseEvent.onCollectionChange, "WAF");
	WAF.addListener("ttclassroom", "onCollectionChange", ttclassroomEvent.onCollectionChange, "WAF");
	WAF.addListener("ttstudyGroup", "onCollectionChange", ttstudyGroupEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_combobox2", "change", combobox2.change, "WAF");
	// @endregion// @endlock
	
	};// @lock


}// @startlock
return constructor;
})();// @endlock
