
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
    
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'selectTime';
	// @endregion// @endlock
	
	var
	config 	= ds.School.getSchedulerConfig(),
	min		= config.first_hour*60,
	max		= config.last_hour*60;
	
	this.load = function (data) {// @lock
		var
		dataS	= sources.timeTable,
		$tRange	= getHtmlObj('timeRange'),
		$date	= getHtmlObj('date');
		
		$tRange
		.rangeSlider('bounds' , min , max)
		.on({
			'valuesChanged': function(e, values){
				var
				baseD= new Date(dataS.beginDate),
				vals = $(this).rangeSlider('values');
				
				dataS.beginDate = _ns.getDateFromMinutes(baseD,vals.min);
				dataS.endDate = _ns.getDateFromMinutes(baseD,vals.max);
			}
		});
		
		$date
		.datepicker()
		.on({
			'change': function(){
				vals = $tRange.rangeSlider('values');
				dataS.beginDate = _ns.getDateFromMinutes($(this).datepicker('getDate'),vals.min);
			}
		})
	    
	    $comp._fixSource = function _fixTime(){
	    	var begin 	= this.beginDate,
				end 	= this.endDate;
			
			$tRange.rangeSlider('values',
				begin ? begin.getHours()*60 + begin.getMinutes():null,
				end ? end.getHours()*60 + end.getMinutes():null);
				
			$date.datepicker('setDate', dataS.beginDate);
	    }
	    
	    $tRange.css('overflow' , 'visible').rangeSlider({
			bounds	:{min: min, max: max},
			step	: 5,
			formatter:function(val){
				return _ns.formatTimeFromNumber(val);
			}
		});
		
		$comp._fixSource.call(dataS);
	
	// @region namespaceDeclaration// @startlock
	var image1 = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock

	image1.click = function image1_click (event)// @startlock
	{// @endlock
		getHtmlObj('date').datepicker( "show" );
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_image1", "click", image1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
