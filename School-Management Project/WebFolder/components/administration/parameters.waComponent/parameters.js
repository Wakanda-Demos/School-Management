
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	var
	config 	= ds.School.getSchedulerConfig(),
	min		= config.first_hour*60,
	max		= config.last_hour*60,
	adminV 	= _ns.adminView;
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'parameters';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		$tRange			= getHtmlObj('timeRange'),
		calendar		= sources[getHtmlId('school_calendar')]
		schoolSource 	= sources['school'],
		agendaSource	= sources[getHtmlId('agenda0')];
		
		$tRange.css('overflow' , 'visible').rangeSlider({
			bounds	:{min: 0, max: 24*60},
			step	: 10,
			formatter:function(val){
				return adminV.formatTimeFromNumber(val);
			}
		}).on('valuesChanged' , function(e , data){
			var
			values	= data.values;
			
			agendaSource.from 	= adminV.formatTimeFromNumber(values.min);
			agendaSource.to 	= adminV.formatTimeFromNumber(values.max);
		});
		
	// @region namespaceDeclaration// @startlock
	var agenda0Event = {};	// @dataSource
	var container2 = {};	// @container
	var saveAll = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	agenda0Event.onCurrentElementChange = function agenda0Event_onCurrentElementChange (event)// @startlock
	{// @endlock
		$tRange.rangeSlider('values' , ((this.from_am ? 0 : 12) + this.from_hours)*60 + this.from_minutes , ((this.to_am ? 0 : 12) + this.to_hours)*60 + this.to_minutes);
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		calendar.addNewElement();
	};// @lock

	saveAll.click = function saveAll_click (event)// @startlock
	{// @endlock
		var msg = "All changes have been saved";
		
		agendaSource.save({
			onSuccess: function(){
				schoolSource.save({
					onSuccess: function(){
						if(dhtmlx.alert){
							dhtmlx.alert(msg)
						}
						else{
							alert(msg);
						}
					}
				});
			}
		});
		
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_agenda0", "onCurrentElementChange", agenda0Event.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	WAF.addListener(this.id + "_saveAll", "click", saveAll.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
