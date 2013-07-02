function initScheduler(containerID, date, view, syncObj) {
	var
	html = '',
		compoID = 'timeTableDetailsReadOnly',
		datasource = syncObj.dataSource,
		fileds = syncObj.fields;


	scheduler.xy = $.extend({}, scheduler.xy, {
		scale_height: 41
	})

	scheduler.locale.labels = $.extend({}, scheduler.locale.labels, {
		section_timeTableDetails: '',
		section_time: ''
	});

	scheduler.form_blocks = $.extend({}, scheduler.form_blocks, {
		'timeTable_details': {
			render: function(sns) { //sns - section configuration object
				return '<div id="' + compoID + '" data-type="component" data-constraint-top="true" style="height:265px" data-constraint-left="true" class="waf-widget waf-component default inherited"></div>';
			},
			set_value: function(node, value, ev) {

			},
			get_value: function(node, ev) {
				return "";
			}
		}
	});

	function block_readonly(id) {
		return false;
	}
	scheduler.attachEvent("onBeforeDrag", block_readonly);
	scheduler.attachEvent("onClick", block_readonly);

	scheduler.config = $.extend({}, scheduler.config, ds.School.getSchedulerConfig());

	scheduler.config = $.extend({}, scheduler.config, {
		lightbox: {
			sections: [{
					name: "timeTableDetails",
					height: 265,
					type: "timeTable_details",
					map_to: "auto"
				}
			]
		}
	});

	scheduler.attachEvent("onLightbox", function(event_id) {
		var
		event_object = scheduler.getEvent(event_id);

		if (!event_object) {
			this.cancel_lightbox();
			return false;
		}

		if (!$$(compoID)) {
			var compo = $('#' + compoID);
			var compoWidget = new WAF.widget.Component({
				'id': compo.attr('id'),
				'data-lib': 'WAF',
				'data-type': 'component',
				'data-theme': 'metal inherited'
			});
		}


		$$(compoID).loadComponent({
			path: '/components/timeTableDetails.waComponent',
			onSuccess: function() {
				datasource.selectByKey(event_id);
			}
		});

		var
		ttDSection = scheduler.formSection('timeTableDetails');

		ttDSection.header.style.display = 'none';
		$(ttDSection.node).parent().css({
			'background-color': '#eee'
		}).parent().addClass('view').parent().addClass('view');

	});

	scheduler.attachEvent("onBeforeLightbox", function(event_id) {
		var
		event_object = scheduler.getEvent(event_id);

		// If it's a new event (@todo: change how to detect if the event is new or not!)
		if(typeof event_id !== 'string'){
			scheduler.deleteEvent(event_id);
			return false;
		}

		return true;
	});

	html += '<div class="dhx_cal_navline" height="100px">';
	html += '<div class="dhx_cal_prev_button">&nbsp;</div>';
	html += '<div class="dhx_cal_next_button">&nbsp;</div>';
	html += '<div class="dhx_cal_today_button"></div>';
	html += '<div class="dhx_cal_date"></div>';
	html += '<div class="dhx_cal_tab dhx_cal_tab_first" name="day_tab" style="right: 261px;"></div>';
	html += '<div class="dhx_cal_tab" name="week_tab" style="right:200px;"></div>';
	html += '<div class="dhx_cal_tab dhx_cal_tab_last" name="month_tab" style="right: 139px;"></div>';
	html += '<div class="dhx_cal_date"></div>';
	html += '<div class="dhx_minical_icon" id="dhx_minical_icon">&nbsp;</div>';
	html += '</div>';
	html += '<div class="dhx_cal_header">';
	html += '</div>';
	html += '<div class="dhx_cal_data">';
	html += '</div>';

	$('#' + containerID)
		.empty()
		.append(html)
		.addClass('waf-project-noStyle dhx_cal_container calendar');

	scheduler.init(containerID, date, view);

	_ns.syncWithDS(syncObj);
}