function initScheduler(containerID , date, view , syncObj) {
	var
	schedulerConf	= ds.School.getSchedulerConfig(),
	compoID 		= 'timeTableDetails',
	rangeCompoID	= 'timeRangeDetails',
	dataSources 	= [
		{
			name: 'teacher',
			global: false,
			mapAttr: 'teacherID',
			getAll: true
		},
		{
			name: 'studyGroup',
			global: false,
			mapAttr: 'studyGroupID'
		},
		{
			name: 'course',
			global: false,
			mapAttr: 'courseID'
		},
		{
			name: 'classroom',
			global: false,
			mapAttr: 'classroomID'
		}
	],
	mappingObj = new _ns.Mapping(syncObj.fields , syncObj.dataSource.getDataClass());
	
	function show_minical(){
	  if (scheduler.isCalendarVisible())
	     scheduler.destroyCalendar();
	  else
	     scheduler.renderCalendar({
	        position:"dhx_minical_icon",
	        date:scheduler._date,
	        navigation:true,
	        handler:function(date,calendar){
	           scheduler.setCurrentView(date);
	           scheduler.destroyCalendar()
	        }
	     });
	}
	  	
  	function validateEvent(event_object){
		var
		that		= this,
		workingDays = this.config.workingDays || [],
		res 		= {
			messages 	: [],
			valid		: true
		};
		
		if(workingDays.indexOf(event_object.start_date.getDay()) < 0 || workingDays.indexOf(event_object.end_date.getDay())<0){
			res.valid = false;
			refreshEvent.call(that, event_object.id);
			res.messages.push('You can not add this course to this day!');
		}
		
		console.log(res.messages);
		
		return res;
	}
	
	function displayMessages(msgArray){
		
	}
	
	function refreshEvent(id){
		var
		that			= this,
		event_object 	= that.getEvent(id),
		dc 				= syncObj.dataSource.getDataClass();
		
		if(event_object && dc){
			dc.getEntity(id , {
			    onSuccess: function(ev){
			    	var obj = mappingObj.getObjectFromEntity(ev.entity);
			    	
			    	for(var attr in obj){
			    		if(attr != 'id' && obj.hasOwnProperty(attr)){
			    			event_object[attr] = obj[attr];
			    		}
			    	}
			    	
			    	that.changeEventId(id , ev.entity.getKey())
			    	that.updateEvent(id);
			    },
			    onError: function(){
			    	
			    }
			})
		}
	}
	
	$('#dhx_minical_icon').on({
		click: function(){
			show_minical();
		}
	});
	
	scheduler.locale.labels = $.extend({} , scheduler.locale.labels , {
		section_timeTableDetails: '',
		section_time: ''
	});
	
	scheduler.form_blocks = $.extend({} , scheduler.form_blocks , {
		'timeTable_details' : {
			render:function(sns){ //sns - section configuration object
				return '<div id="' + compoID + '" data-type="component" data-constraint-top="true" style="height:286px" data-constraint-left="true" class="waf-widget waf-component default inherited"></div>';
			},
			set_value:function(node,value,ev){
				
			},
			get_value:function(node,ev){
				return "";
			}
		},
		'time_range' : {
			render:function(sns){
				return '<div id="' + rangeCompoID + '" data-type="component" data-constraint-top="true" style="height:43px" data-constraint-left="true" class="waf-widget waf-component default inherited"></div>';
			},
			set_value:function(node,value,ev){
				
			},
			get_value:function(node,ev){
				return "";
			}
		}
	});
	
	scheduler.xy = $.extend({} , scheduler.xy , {
		scale_height: 41,
		min_event_height: 100
	});
	
	scheduler.config = $.extend({} , scheduler.config , {
		full_day: false,
		repeat_date : "%m/%d/%Y",
		hour_size_px: 132,
		separate_short_events: true,
		details_on_dblclick: true,
		xml_date : "%Y-%m-%d %H:%i",
		multi_day: false,
		details_on_create: true,
		fix_tab_position: false,
		first_hour: 7,
		last_hour: 23,
		drag_lightbox: true,
		show_loading: true,
		minicalendar: {
			mark_events: true
		},
		lightbox: {
			sections: [
				{ name:"timeRange", height:72, type:"time_range", map_to:"auto"},
				{name:"time", height:72, type:"time", map_to:"auto"},
				{ name: "recurring", type: "recurring", map_to: "rec_type", button: "recurring"},
				{ name:"timeTableDetails", height:250, type:"timeTable_details", map_to:"auto"}
			]
		},
		templates: {
			
		}
	});
	
	scheduler.config = $.extend({} , scheduler.config , schedulerConf);
	
	scheduler.attachEvent("onEventChanged", function(event_id,event_object){
		//debugger;
		var validation = validateEvent.call(this , event_object);
		if(validation.valid && event_id.toString().indexOf('#') < 0){
			var res = ds.TimeTable.editItem(event_id , mappingObj.getObject(event_object));
			if(res && res.getKey){
				scheduler.changeEventId(event_id , res.getKey())
			}
		}
  	});
  	
  	scheduler.attachEvent("onBeforeEventDelete", function(event_id,event_object){
  		//debugger;
  		if(event_object.event_pid){
			return ds.TimeTable.editItem(event_id , mappingObj.getObject(event_object));
		}
		else if(ds.TimeTable.editItem(event_id , mappingObj.getObject(event_object) , true)){
			return true;
		}
		
		return false;
	});
  	
  	scheduler.attachEvent("onEventAdded", function(event_id,event_object){
  		//debugger;
  		var validation = validateEvent.call(this , event_object);
		if(validation.valid){
			var res = ds.TimeTable.editItem(event_id , mappingObj.getObject(event_object));
	  		if(res && res.getKey){
				scheduler.changeEventId(event_id , res.getKey());
			}
		}
  	});
  	
  	scheduler.attachEvent("onLightbox", function (event_id){
  		//debugger;
  		var
  		event_object	= this.getEvent(event_id);
  		
  		function fixDataSources(){
  			for(var i = 0 , dataS ; dataS = dataSources[i] ; i++ ){
  				var name = dataS.global ? dataS.name : compoID + '_' + dataS.name;
  				if(sources[name]){
  					if(dataS.getAll){
  						sources[name].all({
  							onSuccess: function(ev){
  								ev.dataSource.selectByKey(event_object[ev.userData.mapAttr]);
  							},
  							userData: dataS
  						});
  					}
  					else{
  						sources[name].selectByKey(event_object[dataS.mapAttr]);
  					}
  				}
  			}
  		}
  		
  		function fixeTimeRange(){
  			var
			begin 		= event_object.start_date,
			end 		= event_object.end_date,
			beginStr 	= begin.getHours(),
			endStr 		= end.getHours();
			
			beginStr 	= (beginStr > 12 ? beginStr - 12 : beginStr) + ':' + begin.getMinutes() + (beginStr <= 12 ? 'am' : 'pm');
			endStr 		= (endStr > 12 ? endStr - 12 : endStr) + ':' + end.getMinutes() + (endStr <= 12 ? 'am' : 'pm');
			
			$$(rangeCompoID)._setTime({
			    date	: begin,
			    begin	: beginStr,
			    end 	: endStr
			});
  		}
  		
  		if(!$$(compoID)){
  			var compo = $('#' + compoID);
			var compoWidget = new WAF.widget.Component({
				'id': compo.attr('id'),
				'data-lib': 'WAF',
				'data-type': 'component',
				'data-theme': 'metal inherited'
			});
			compoWidget.loadComponent({
				path: '/components/selectTimeTableDetails.waComponent',
				onSuccess: function(){
					fixDataSources();
				}
			});
  		}
  		else{
  			fixDataSources();
  		}
  		
  		if(!$$(rangeCompoID)){
  			var rangeCompo = $('#' + rangeCompoID);
			var rangeWebCompo = new WAF.widget.Component({
				'id': rangeCompo.attr('id'),
				'data-lib': 'WAF',
				'data-type': 'component',
				'data-theme': 'metal inherited'
			});
			
			rangeWebCompo.loadComponent({
				path: '/components/selectTime.waComponent',
				onSuccess: function(){
					scheduler.setLightboxSize();
					
					$$(this.id)._setMinTime(scheduler.config.first_hour*60);
					$$(this.id)._setMaxTime(scheduler.config.last_hour*60);
					
  					fixeTimeRange();
				}
			});
  		}
  		else{
  			fixeTimeRange();
  		}
  		
  		var
  		checkb,
  		customBtn,
  		tSection	= scheduler.formSection('time'),
  		trSection 	= scheduler.formSection('timeRange'),
  		ttDSection	= scheduler.formSection('timeTableDetails'),
  		rSection	= scheduler.formSection('recurring');
  		
  		$(trSection.header).hide();
  		$(tSection.node).parent().hide();
  		$(ttDSection.header).hide().parent().css({'background-color' : 'rgb(234, 233, 233)'});
  		$(trSection.node).parent().css({'background-color' : 'rgb(234, 233, 233)'});
  		
  		customBtn = $(rSection.header).find('.dhx_custom_button').hide();
  		checkb	= $(rSection.header).find('.checkb');
  		
  		if(!checkb.length){
  			checkb	= $('<input type="checkbox" class="checkb">').click(function(){
  				var
	  			f = rSection.header,
	  			e = scheduler.form_blocks["recurring"];
	  			
	  			e.button_click('1' , customBtn.children().get(0) , f , f.nextSibling);
	  		});
	  		
	  		customBtn.after(checkb)
	  	}
	  	
	  	checkb.prop('checked' , event_object.rec_type ? true : false);
	});
	
	scheduler.render_event_bar = function(a) {
	    var b = this._rendered_location, c = this._colsS[a._sday], d = this._colsS[a._eday];
	    d == c && (d = this._colsS[a._eday + 1]);
	    var e = this.xy.bar_height, f = a.id == this._drag_id ? 0 : a._sorder * e, g = this._colsS.heights[a._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + f, h = document.createElement("DIV"), k = "dhx_cal_event_clear";
	    a._timed || (k = "dhx_cal_event_line", a.hasOwnProperty("_first_chunk") && a._first_chunk && (k += " dhx_cal_event_line_start"), a.hasOwnProperty("_last_chunk") && 
	    a._last_chunk && (k += " dhx_cal_event_line_end"));
	    var i = scheduler.templates.event_class(a.start_date, a.end_date, a);
	    i && (k = k + " " + i);
	    var j = a.color ? "color:" + a.color + ";" : "", m = a.textColor ? "color:" + a.textColor + ";" : "", n = '<div event_id="' + a.id + '" class="' + k + '" style="position:absolute; top:' + g + "px; left:" + c + "px; width:" + (d - c - 15) + "px;" + m + "" + j + "" + (a._text_style || "") + '">', a = scheduler.getEvent(a.id);
	    a._timed && (n += scheduler.templates.event_bar_date(a.start_date, a.end_date, a));
	    n += scheduler.templates.event_bar_text(a.start_date, 
	    a.end_date, a) + "</div>";
	    n += "</div>";
	    h.innerHTML = n;
	    this._rendered.push(h.firstChild);
	    b.appendChild(h.firstChild)
	};
	
	scheduler.attachEvent("onEventCancel", function(a) {
		
	});
	
	scheduler.attachEvent("onEventSave",function(id,data,is_new_event){
		var
		tSection		= scheduler.formSection('time'),
		time 			= $$(rangeCompoID)._getSchedulerTime(),
  		event_object	= this.getEvent(id);
		
		for(var i = 0 , dataS ; dataS = dataSources[i] ; i++ ){
			var name = dataS.global ? dataS.name : compoID + '_' + dataS.name;
			if(sources[name] && sources[name].getCurrentElement()){
				event_object[dataS.mapAttr] = sources[name].getCurrentElement().getKey();
			}
		}
		//tSection.setValue(time.start_date , time.end_date );
		tSection.setValue(null, {
			start_date:time.start_date, 
			end_date: time.end_date
		});
		
//		if(scheduler.getEventStartDate(id) != time.start_date){
//			scheduler.setEventStartDate(id, time.start_date);
//		}
//		if(scheduler.getEventEndDate(id) != time.end_date){
//			scheduler.setEventEndDate(id, time.end_date);
//		}
		
		$$(compoID).clear();
		
		return true;
	});
	
	scheduler.renderEvent = function(container , ev){
		var
		$cont = $(container);
	 
		var html = "<div class='dhx_event_move dhx_header event_subElement' style='width:100%'>&nbsp;</div>";
	 	
	 	html+= '<div class="dhx_event_move dhx_title event_subElement" style="height:15px;">' 
	 			+ scheduler.templates.event_date(ev.start_date) 
	 			+ ' - ' + scheduler.templates.event_date(ev.end_date) + '</div>';
	 	
		html+= '<div class="dhx_body event_subElement" style=" width:' + ( $cont.width() - 10) + 'px;height:' + ( $cont.height() - 32) + 'px">';
		
		html+= ev.text;
		
		html += "</div>";
	 
		// resize section
		html += "<div class='dhx_event_resize dhx_footer event_subElement' style='width:100%'></div>";
		
		$cont.append(html).find('.event_subElement').css({
			'background-color' : ev.color
		});
		
		return true;
	}
  	
  	$('#' + containerID).addClass('dhx_cal_container calendar');
	scheduler.init(containerID , date , view);
	
	return _ns.syncWithDS(syncObj);
}