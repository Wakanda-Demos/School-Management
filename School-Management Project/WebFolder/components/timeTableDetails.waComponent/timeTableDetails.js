
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'timeTableDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var timeTableEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	timeTableEvent.onCurrentElementChange = function timeTableEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var
		begin = this.beginDate,
		end = this.endDate;
		
		timetable_time = {
			start : begin ? begin.getHours() + ':' + begin.getMinutes() : '',
			end : end ? end.getHours() + ':' + end.getMinutes() : ''
		}
		
		sources.timetable_time.sync();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener("timeTable", "onCurrentElementChange", timeTableEvent.onCurrentElementChange, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
