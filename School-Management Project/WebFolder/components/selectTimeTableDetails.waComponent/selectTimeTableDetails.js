
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
		$comp.refreshTeachers = function(){
			var course = $comp.sources.course;
			
			if(course.getCurrentElement()){
				sources[getHtmlId('teacher')].query('speciality.ID == ' + course.getCurrentElement().getKey())
			}
			else{
				sources[getHtmlId('teacher')].query('null');
			}
		}
	// eventHandlers// @lock

	courseEvent.onCurrentElementChange = function courseEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		$comp.refreshTeachers();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_course", "onCurrentElementChange", courseEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
