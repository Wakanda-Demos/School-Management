
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'timeTableDetails';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	function format(number , size){
		var res = number + '';
		
		while(res.length < size){
			res = '0' + res;
		}
		
		return res;
	}
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
			start : begin ? format(begin.getHours() , 2) + ':' + format(begin.getMinutes() , 2) : '',
			end : end ? format(end.getHours() , 2) + ':' + format(end.getMinutes() , 2) : ''
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
