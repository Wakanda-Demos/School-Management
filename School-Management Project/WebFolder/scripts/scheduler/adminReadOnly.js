function initScheduler(containerID, date, view, syncObj) {
	var
	html = '',
		compoID = 'timeTableDetails',
		rangeCompoID = 'timeRangeDetails',
		dataSources = [{
				name: 'teacher',
				global: false,
				mapAttr: 'teacherID',
				getAll: false
			}, {
				name: 'studyGroup',
				global: false,
				mapAttr: 'studyGroupID'
			}, {
				name: 'course',
				global: false,
				mapAttr: 'courseID'
			}, {
				name: 'classroom',
				global: false,
				mapAttr: 'classroomID'
			}
		],
		validationRules = [{
				selector: '#timeRangeDetails_date', //date
				rule: function(event_object) {
					var workingDays = scheduler.config.workingDays || [];

					if (event_object.start_date && event_object.end_date && (workingDays.indexOf(event_object.start_date.getDay()) < 0 || workingDays.indexOf(event_object.end_date.getDay()) < 0)) {
						return false;
					}

					return true;
				},
				key: 'prevent_add_course',
				code: '000'
			}, {
				selector: '#timeRangeDetails_date', //date
				rule: 'notEmpty',
				key: 'sdate_mandatory',
				attr: 'start_date',
				code: '001'
			}, {
				selector: '#timeRangeDetails_date', //end_date
				rule: 'notEmpty',
				key: 'edate_mandatory',
				attr: 'end_date',
				code: '002'
			}, {
				selector: '#timeTableDetails_combobox1', //classroom
				rule: 'relatedEntityNotEmplty',
				key: 'cr_mandatory',
				attr: 'classroom',
				code: '001'
			}, {
				selector: '#timeTableDetails_combobox2', // Course
				rule: 'relatedEntityNotEmplty',
				key: 'course_mandatory',
				attr: 'course',
				code: '003'
			}, {
				selector: '#timeTableDetails_combobox3', // StudyGroup
				rule: 'relatedEntityNotEmplty',
				key: 'grade_mandatory',
				attr: 'studyGroup',
				code: '004'
			}, {
				selector: '#waf-temp-container-timeTableDetails_matrix1', // Teacher
				rule: 'relatedEntityNotEmplty',
				key: 'teacher_mandatory',
				attr: 'teacher',
				code: '005'
			}
		]
		mappingObj = _ns.Mapping.getInstance();
	mappingObj.init(syncObj.fields, syncObj.dataSource);

	function validator(event_obj) {
		if (typeof this.rule == 'function') {
			return this.rule(event_obj)
		}

		switch (this.rule) {
			case 'notEmpty':
				if (!event_obj[this.attr]) {
					return false;
				}
				break;
			case 'relatedEntityNotEmplty':
				var curElement = mappingObj.source.getCurrentElement();

				if (!curElement || !curElement[this.attr] || !curElement[this.attr].relKey) {
					return false;
				}
				break;
		}

		return true;
	}

	function initErrors() {
		$(scheduler.getLightbox()).find('.sm-error').removeClass('sm-error');
	}

	function validateEvent(event_object) {
		var
		msg = _ns.Message.getInstance(),
			res = {
				errors: [],
				wornings: [],
				valid: true
			};

		initErrors();

		for (var i = 0, rule; rule = validationRules[i]; i++) {
			var
			$widget = $(rule.selector);

			if (!validator.call(rule, event_object)) {
				msg.append(rule.key, {});
				$widget.addClass('sm-error');
			}
		}

		if (msg.getStack().length) {
			msg.display({
				options: {
					type: 'dialog-error',
					title: 'Errors',
					css: {
						'text-align': 'left'
					}
				}
			});

			res.valid = false;
		}

		return res;
	}

	function refreshEvent(id) {
		var
		that = this,
			event_object = that.getEvent(id),
			dc = syncObj.dataSource.getDataClass();

		if (event_object && dc) {
			dc.getEntity(id, {
				onSuccess: function(ev) {
					var obj = mappingObj.getObjectFromEntity(ev.entity);

					for (var attr in obj) {
						if (attr != 'id' && obj.hasOwnProperty(attr)) {
							event_object[attr] = obj[attr];
						}
					}

					that.changeEventId(id, ev.entity.getKey())
					that.updateEvent(id);
				},
				onError: function() {

				}
			})
		}
	}

	scheduler.config = $.extend({}, scheduler.config, ds.School.getSchedulerConfig());



	scheduler.locale.labels = $.extend({}, scheduler.locale.labels, {
		section_timeTableDetails: '',
		section_time: ''
	});

	scheduler.form_blocks = $.extend({}, scheduler.form_blocks, {
		'timeTable_details': {
			render: function(sns) { //sns - section configuration object
				return '<div id="' + compoID + '" data-type="component" data-constraint-top="true" style="height:286px" data-constraint-left="true" class="waf-widget waf-component default inherited"></div>';
			},
			set_value: function(node, value, ev) {
				mappingObj.source.dispatch('onCurrentElementChange');
			},
			get_value: function(node, ev) {
				mappingObj.source._doNotRefreshTeachers = true;
				mappingObj.source.teacher.set(sources.timeTableDetails_teacher);
				mappingObj.source.course.set(sources.ttcourse);
				mappingObj.source.classroom.set(sources.ttclassroom);
				mappingObj.source.studyGroup.set(sources.ttstudyGroup);
			}
		},
		'time_range': {
			render: function(sns) {
				return '<div id="' + rangeCompoID + '" data-type="component" data-constraint-top="true" style="height:65px" data-constraint-left="true" class="waf-widget waf-component default inherited"></div>';
			},
			set_value: function(node, value, ev) {
				if ($(node).children().length) {
					$$(rangeCompoID)._fixSource.call(syncObj.dataSource);
				}
			},
			get_value: function(node, ev) {
				ev.start_date = mappingObj.source.beginDate;
				ev.end_date = mappingObj.source.endDate;
			}
		}
	});

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

	scheduler.attachEvent("onEventChanged", function(event_id, event_object) {
		var validation = validateEvent.call(this, event_object);
		if (validation.valid && event_id.toString().indexOf('#') < 0) {
			mappingObj.saveSource(event_id, event_object);
		} else if (!validation.valid) {
			ds.TimeTable.getEntity(event_id, {
				forceReload: true,
				onSuccess: function(e) {
					if (e.entity) {
						mappingObj.refreshFromEntity(e.entity);
					}
				}
			})
		}
	});

	scheduler.attachEvent("onBeforeEventDelete", function(event_id, event_object) {
		if (event_object._dont_save) {
			delete event_object._dont_save;
			return true;
		}

		if (event_object.event_pid) {
			event_object.rec_type = "none";
			mappingObj.saveSource(event_id, event_object);
		} else {
			var opts = {
				onSuccess: function(e) {
					e.dataSource.removeCurrent();
				}
			}
			if (event_object._position) {
				mappingObj.source.select(mappingObj.getRealPosition(event_object._position), opts);
			} else {
				mappingObj.source.selectByKey(event_id, opts);
			}
		}

		return true;
	});
	function block_readonly(id) {
		return false;
	}
	scheduler.attachEvent("onEventAdd",block_readonly);

	scheduler.attachEvent("onBeforeDrag", function(event_id, mode, native_event_object) {
		switch (mode) {
			case 'move':
			case 'resize':
				if (false) {
					delete scheduler._ignore_click;
				} else {
					scheduler._ignore_click = true;
					mappingObj.select(scheduler.getEvent(event_id));
				}
				break;
		}

		return true;
	});

	scheduler.attachEvent("onEventSave", function(id, data, is_new_event) {
		var validator = validateEvent.call(this, data);
		return validator.valid;
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

	scheduler.renderEvent = function(container, ev) {
		var
		$cont = $(container);

		var html = "<div class='dhx_event_move dhx_header event_subElement' style='width:100%'>&nbsp;</div>";

		html += '<div class="dhx_event_move dhx_title event_subElement" style="height:15px;">' + scheduler.templates.event_date(ev.start_date) + ' - ' + scheduler.templates.event_date(ev.end_date) + '</div>';

		html += '<div class="dhx_event_move dhx_body event_subElement" style="cursor:pointer;width:' + ($cont.width() - 10) + 'px;height:' + ($cont.height() - 32) + 'px">';

		html += ev.text;

		html += "</div>";

		// resize section
		html += "<div class='dhx_event_resize dhx_footer event_subElement' style='width:100%'></div>";

		$cont.append(html).find('.event_subElement').css({
			'background-color': ev.color
		});

		return true;
	}

	var
	labelChanges = [{
			oldVal: 'value="1" />day',
			newVal: 'value="1" />day(s)'
		}, {
			oldVal: 'value="1" />month',
			newVal: 'value="1" />month(s)'
		}, {
			oldVal: 'Every workday',
			newVal: 'Every weekday'
		}, {
			oldVal: 'week next days:',
			newVal: 'week(s) on:'
		}, {
			oldVal: 'day every',
			newVal: 'day(s) every'
		}, {
			oldVal: 'occurrences',
			newVal: 'occurrence(s)'
		}
	]

	for (var i = 0, ch; ch = labelChanges[i]; i++) {
		scheduler.__recurring_template = scheduler.__recurring_template.replace(new RegExp(ch.oldVal, 'g'), ch.newVal);
	}

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

	return _ns.syncWithDS(syncObj);
}