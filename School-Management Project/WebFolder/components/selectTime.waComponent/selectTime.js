
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var
	src			= this.sources.timeRange,
	sourceVar	= window[getHtmlId('timeRange')],
    timeRegex	= /^([01]?[0-9]) *: *([0-5]?[0-9]) *([pa]m)$/i,
    strictRegex	= /^([01]?[0-9]):([0-5]?[0-9]) ([PA]M)$/;
    
    function parseTime(value){
		var
		res  	= {},
		regExec = timeRegex.exec(value);
			
		if(!regExec || regExec.length != 4 || regExec[1] > 12){
			return null;
		}
		
		res.hours	= parseInt(regExec[1]);
		res.minutes	= parseInt(regExec[2]);
		res.am		= regExec[3].toLowerCase() == 'am';
		
		return res;
	}
	
	function timeToNumber(time){
		var parsedTime = parseTime(time);
		if(parsedTime){
			return parsedTime.hours*60 + parsedTime.minutes + (parsedTime.am ? 0 : 1)*12*60;
		}
		return 0;
	}
	
	function getMinTime(){
		return numberToTime($$(id)._minTime);
	}
	
	function getMaxTime(){
		return numberToTime($$(id)._maxTime);
	}
	
	function numberToTime (number){
		var
		res = {
			hours: 0,
			minutes: 0,
			am : true
		};
		
		
		if(number > $$(id)._maxTime){
			number = $$(id)._maxTime;
		}
		else if(number < $$(id)._minTime){
			number = $$(id)._minTime;
		}
		
		res.am		= true;
		res.hours 	= parseInt(number/60),
		res.minutes	= number - res.hours*60;
		
		if(res.hours > 12){
			res.am = false;
			res.hours -= 12;
		}
		
		return res;
	}
	
	function formatTime(time){
		if(!time){
			time = getMinTime();
		}
		else if(typeof time == 'string'){
			time = parseTime(time);
			if(!time){
				time = getMinTime();
			}
		}
		
		var
		hours	= time.hours,
		minutes	= time.minutes + '',
		am		= time.am ? ' AM' : ' PM';
		
		while(minutes.length < 2){
			minutes = '0' + minutes;
		}
		
		return hours + ':' + minutes + am;
	}
	
	function fixRange(){
		var
		sync	= false,
		fromNb	= timeToNumber(sourceVar.begin),
		toNb	= timeToNumber(sourceVar.end);
		
		if(fromNb < $$(id)._minTime){
			sync 	= true;
			sourceVar.begin = src.begin = formatTime(numberToTime($$(id)._minTime));
		}
		else if(fromNb > $$(id)._maxTime){
			sync 	= true;
			sourceVar.begin = src.begin = formatTime(numberToTime($$(id)._maxTime));
		}
		
		if(toNb < $$(id)._minTime){
			sync 	= true;
			sourceVar.end = src.end = formatTime(numberToTime($$(id)._minTime));
		}
		else if(toNb > $$(id)._maxTime){
			sync 	= true;
			sourceVar.end = src.end = formatTime(numberToTime($$(id)._maxTime));
		}
		
		if(fromNb > toNb || !sourceVar.end){
			if(fromNb == $$(id)._maxTime){
				sourceVar.begin = sourceVar.end;
				return;
			}
			
			var
			res = numberToTime(fromNb + 1);
			
			sourceVar.end = src.end = formatTime(res);
			sync = true;
		}
		
		if(sync){
			src.sync();
		}
	}
	
	function attributeChange(event){
		switch(event.eventKind){
			case "onAttributeChange":
				var
				sync		= false,
				timeParsed	= parseTime(this[event.attributeName]);
				
				if(timeParsed && !strictRegex.test(this[event.attributeName])){
					sourceVar[event.attributeName] = formatTime(timeParsed);
					sync 	= true;
				}
				else if(!timeParsed){
					sourceVar[event.attributeName] = '0:00 AM';
					sync 	= true;
				}
				
				if(sync){
					fixRange();
					this[event.attributeName] = sourceVar[event.attributeName];
					this.sync();
				}
				else if(event.attributeName == 'begin'){
					fixRange();
				}
				break;
		}
	}
	
	function getDateFromTime(baseDate , time){
		var
		t,
		date	= new Date(baseDate),
		temp	= date.getTime(),
		parsedT	= parseTime(time);
		
		t = parseInt(temp/(24*60*60*1000));
		t *= 24*60*60*1000;
		
		date.setTime(t);
		date.setHours(parsedT.hours + (parsedT.am ? 0 : 12));
		date.setMinutes(parsedT.minutes);
		
		return date;
	}
    
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'selectTime';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		$comp._setMaxTime = function(max){
			this._maxTime = max;
		}
		
		$comp._setMinTime = function(min){
			this._minTime = min;
		}
		
		$comp._getTime = function(){
	    	return sourceVar;
	    }
	    
		$comp._getSchedulerTime = function(){
	    	return {
	    		start_date : getDateFromTime(sourceVar.date , sourceVar.begin),
	    		end_date : getDateFromTime(sourceVar.date , sourceVar.end)
	    	};
	    }
	    
	    $comp._setTime = function(time){
	    	time.begin 	= formatTime(time.begin);
	    	time.end 	= formatTime(time.end);
			$.extend(sourceVar , time);
	    	src.sync();
	    	fixRange();
	    }
	
	// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	var timeRangeEvent = {};	// @dataSource
	// @endregion// @endlock

	// eventHandlers// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		getHtmlObj('date').datepicker( "show" );
	};// @lock

	timeRangeEvent.onendAttributeChange = function timeRangeEvent_onendAttributeChange (event)// @startlock
	{// @endlock
		attributeChange.apply(this , arguments);
	};// @lock

	timeRangeEvent.onbeginAttributeChange = function timeRangeEvent_onbeginAttributeChange (event)// @startlock
	{// @endlock
		attributeChange.apply(this , arguments);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	WAF.addListener(this.id + "_timeRange", "onendAttributeChange", timeRangeEvent.onendAttributeChange, "WAF", "end");
	WAF.addListener(this.id + "_timeRange", "onbeginAttributeChange", timeRangeEvent.onbeginAttributeChange, "WAF", "begin");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
