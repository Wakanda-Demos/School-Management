
WAF.onAfterInit = function onAfterInit() {// @lock
	_ns.adminView.mapViewObj = {
		'home' : {
			value 	: 'Home',
			tabID 	: 'homeTab',
			index 	: 1,
			view 	: 'home'
		},
		'agenda' : {
			value 	: 'Agenda',
			tabID 	: 'agendaTab',
			index 	: 2,
			view 	: 'agenda',
			groups	: ['loggedIn']
		},
		'administration' : {
			value 	: 'Administration',
			tabID 	: 'adminTab',
			index 	: 3,
			view 	: 'administration',
			groups	: ['administrator']
		}
	}
	
	function setView(view){
		var
		mapObj			= _ns.adminView.mapViewObj,
		groups			= mapObj[view].groups,
		tabContainer 	= $$('tabContainer').$domNode,
		tabWidget 		= $$('mainTab'),
		mapObj 			= _ns.adminView.mapViewObj;
		
		if(!mapObj[view]){
			return false;
		}
		
		if(groups instanceof Array){
			for(var i = 0 , g ; g = groups[i] ; i++){
				if(!waf.directory.currentUserBelongsTo(g)){
					setView('home');
					return false;
				}
			}
		}
		
		tabContainer.find('.containerMI').removeClass('selected');
		tabContainer.find('#' + mapObj[view].tabID).addClass('selected');
		
		tabWidget.selectTab(mapObj[view].index);
		
		currentView = {
			key: view,
			value: mapObj[view].value
		};
		sources.currentView.sync();
	}

	function center(container){
		$$(container).center({center : 'h'});
		$(window).resize(function(){
			$$(container).center({center : 'h'});
		});
	}

	function openDialog(view){
		var
		adminFolder			= '/components/administration/',
		dialogCompo			= $$('dialogCompo'),
		mainDialog			= $$('mainDialog'),
		dialogMappingObj 	= {
			'studentDetails' : {
				width: 675,
				height: 490,
				path: adminFolder + 'studentDetails.waComponent'
			},
			'teacherDetails' : {
				width: 675,
				height: 475,
				path: adminFolder + 'teacherDetails.waComponent'
			},
			'groupsDetails' : {
				width: 351,
				height: 175,
				path: adminFolder + 'AssignTo-group.waComponent'
			}
		},
		viewObj = dialogMappingObj[view];
		
		if(!viewObj){
			return;
		}
		
		mainDialog.setWidth(viewObj.width);
		mainDialog.setHeight(viewObj.height);
		dialogCompo.loadComponent(viewObj.path);
		
		mainDialog.center({center : 'vh'});
		mainDialog.displayDialog();
	}
	
	function refreshMenues(){
		var
		mapView	= _ns.adminView.mapViewObj;
		
		for(attr in mapView){
			if(mapView.hasOwnProperty(attr)){
				var obj = mapView[attr];
				if(obj.groups){
					$('#' + obj.tabID)
					.unbind('click')
					.addClass('disabled');
					
					for(var i = 0 , g ; g = obj.groups[i] ; i++){
						if(waf.directory.currentUserBelongsTo(g)){
							$('#' + obj.tabID)
							.data('view' , obj.view)
							.click(function(){
								setView($(this).data('view'));
							})
							.removeClass('disabled')
						}
					}
				}
			}
		}
				
		if(waf.directory.currentUser()){
			$$('login1').$domNode.show();
		}
		else{
			$$('login1').$domNode.hide();
			setView('home');
		}
	}
	
	_ns.adminView.setView 		= setView;
	_ns.adminView.refreshMenues = refreshMenues;
	_ns.adminView.openDialog 	= openDialog;
	_ns.adminView.queryKey 		= _ns.parseUri(location.href).queryKey,
	_ns.adminView.current		= {},
	_ns.adminView.options		= $.extend(true , {
		view 		: 'home',
		calendar	: "week",
		adminTab	: "teachers"
	} , _ns.adminView.queryKey);
	
// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var homeTab = {};	// @container
	var agendaQueryStrEvent = {};	// @dataSource
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		//location.href = '/logmein';
		refreshMenues();
		sources.timeTable.all();
	};// @lock

	homeTab.click = function homeTab_click (event)// @startlock
	{// @endlock
		setView('home');
	};// @lock

	agendaQueryStrEvent.onAttributeChange = function agendaQueryStrEvent_onAttributeChange (event)// @startlock
	{// @endlock
		sources.timeTable.query(agendaQueryStr);
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var
		html 	= '',
		options = _ns.adminView.options,
		groups	= [
			{
				name 	: 'administrator',
				script	: '/scripts/scheduler/admin.js',
				readonly: false
			},
			{
				name 	: 'loggedIn',
				script	: '/scripts/scheduler/view.js',
				readonly: true
			}
		];
		
		html 	+= '<div class="dhx_cal_navline" height="100px">';
		html 	+= 	'<div class="dhx_cal_prev_button">&nbsp;</div>';
		html 	+= 	'<div class="dhx_cal_next_button">&nbsp;</div>';
		html 	+= 	'<div class="dhx_cal_today_button"></div>';
		html 	+= 	'<div class="dhx_cal_date"></div>';
		html 	+= 	'<div class="dhx_cal_tab dhx_cal_tab_first" name="day_tab" style="right: 261px;"></div>';
		html 	+= 	'<div class="dhx_cal_tab" name="week_tab" style="right:200px;"></div>';
		html 	+= 	'<div class="dhx_cal_tab dhx_cal_tab_last" name="month_tab" style="right: 139px;"></div>';
		html 	+= 	'<div class="dhx_cal_date"></div>';
		html 	+= 	'<div class="dhx_minical_icon" id="dhx_minical_icon">&nbsp;</div>';
		html 	+= '</div>';
		html 	+= '<div class="dhx_cal_header">';
		html 	+= '</div>';
		html 	+= 	'<div class="dhx_cal_data">';
		html 	+= '</div>';
		
		$$('scheduler').$domNode.append(html);
		center('main');
		center('mainDialog');
		
		setView(options.view);
		
		for(var i = 0 , g ; g = groups[i] ; i++){
			if(waf.directory.currentUserBelongsTo(g.name)){
				$.getScript(g.script, function(data, textStatus, jqxhr) {
					mappingObj = initScheduler('scheduler' , new Date(), options.calendar , {
						dataSource 	: sources.timeTable,
						readonly	: g.readonly,
						fields		: {
							id				: 'ID',
							text			: "comment",
							rec_type 		: 'rec_type',
							end_date		: "endDate",
							courseID		: "course",
							event_pid 		: 'tt_pid',
							teacherID		: "teacher",
							start_date		: "beginDate",
							classroomID		: "classroom",
							studyGroupID	: "studyGroup",
							event_length 	: 'tt_length'
						},
						colorAttr	: 'classroom.color',
						initQuery	: ''
					});
				});
				break;
			}
		}
		
		refreshMenues();
		
		$$('component1').loadComponent('/components/ttSearch.waComponent');
		$$('component3').loadComponent('/components/Footer.waComponent');
		
		var
		$cont = $$('component3').$domNode;
		
		$cont.css({
			top: $(document).height() - $cont.height()
		})
		$(window).resize(function(){
			$cont.css({
				top: $(document).height() - $cont.height()
			});
		})
		
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("homeTab", "click", homeTab.click, "WAF");
	WAF.addListener("agendaQueryStr", "onAttributeChange", agendaQueryStrEvent.onAttributeChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
