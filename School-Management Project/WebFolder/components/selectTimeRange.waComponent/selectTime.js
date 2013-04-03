
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
	
	function format(str , nb){
		while(str.length < nb){
			str = '0' + str;
		}
		
		return str;
	}
	
	function getDate(baseDate , nb){
		var
		nbM = nb%60;
		nbH = (nb - nbM)/60;
		
		baseDate.setHours(nbH);
		baseDate.setMinutes(nbM);
		
		return new Date(baseDate);
	}
	
	this.load = function (data) {// @lock
		var
		$tRange	= getHtmlObj('timeRange'),
		$date	= getHtmlObj('date');
		
		$date.datepicker();
		
		$comp._setBounds = function(min , max){
			var
			bounds 	= $tRange.rangeSlider('bounds'),
			obj 	= {
				min : min ? min : bounds.min,
				max : max ? max : bounds.max
			};
			
			$tRange.rangeSlider('bounds' , obj.min , obj.max);
		}
		
		$comp._setMinTime = function(min){
			this._setBounds(min , null);
		}
		
		$comp._setMaxTime = function(max){
			this._setBounds(null , max);
		}
		
		$comp._getTime = function(){
			var
			fFormatter	= $tRange.rangeSlider('option' , 'formatter'),
			range 		= $tRange.rangeSlider("values");
			
	    	return {
	    		date : $date.datepicker("getDate"),
	    		begin: fFormatter.call($tRange , range.min),
	    		end	 : fFormatter.call($tRange , range.max)
	    	};
	    }
	    
		$comp._getSchedulerTime = function(){
			var
			range 	= $tRange.rangeSlider("values");
			
			return {
	    		start_date 	: getDate($date.datepicker("getDate") , range.min),
	    		end_date 	: getDate($date.datepicker("getDate") , range.max)
	    	};
	    }
	    
	    $comp._setTime = function(time){
	    	$date.datepicker("setDate" , time.date);
	    	$tRange.rangeSlider('values' , time.begin , time.end);
	    }
	    
	    $tRange.css('overflow' , 'visible').rangeSlider({
			bounds	:{min: min, max: max},
			step	: 5,
			min	: 0,
			max	: 100,
			formatter:function(val){
				var
				nbMinutes	= val%60
				nbHours 	= (val - nbMinutes)/60,
				pm			= nbHours > 12;

				if(pm){
					nbHours -= 12;
				}

				return format(nbHours + '' , 2) + ':' + format(nbMinutes + '' , 2) + ' ' + (pm ? 'PM' : 'AM');
			}
		});
	
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
