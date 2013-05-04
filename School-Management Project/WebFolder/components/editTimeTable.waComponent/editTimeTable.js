
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'editTimeTable';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var teacherSrc	= $comp.sources.teacher;
		
		function getTeachersFromSpeciality(courseKey, teacherKey){
			teacherSrc.query('speciality.ID == ' + courseKey, {
				onSuccess: function(e){
					if(e.dataSource.length == 1){
						e.dataSource.select(0);
					}
					else if(teacherKey) {
						e.dataSource.selectByKey(teacherKey);
					}
					else{
						e.dataSource.select(-1);
					}
				}
			})
		}
	// @region namespaceDeclaration// @startlock
	var teacherEvent = {};	// @dataSource
	var timeTableEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	teacherEvent.onCurrentElementChange = function teacherEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		sources.timeTable.teacher.set(this);
	};// @lock

	timeTableEvent.oncourseAttributeChange = function timeTableEvent_oncourseAttributeChange (event)// @startlock
	{// @endlock
		var curElement = this.getCurrentElement();
		if(curElement){
			curElement.course.load({
				onSuccess: function(eCourse){
					if(eCourse.entity){
						curElement.teacher.load({
							onSuccess: function(eTeacher){
								getTeachersFromSpeciality(eCourse.entity.getKey(),
									eTeacher.entity ? eTeacher.entity.getKey(): null);
							}
						})
					}
					else{
						var col = e.dataSource.getDataClass().newCollection();
						e.dataSource.setEntityCollection(col);
					}
				}
			})
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_teacher", "onCurrentElementChange", teacherEvent.onCurrentElementChange, "WAF");
	WAF.addListener("timeTable", "oncourseAttributeChange", timeTableEvent.oncourseAttributeChange, "WAF", "course");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
