var mappingObj;

WAF.onAfterInit = function onAfterInit() {// @lock
	_ns.adminView.mapViewObj = {
		'home' : {
			value 	: 'Home',
			tabID 	: 'homeTab',
			index 	: 1,
			login	: false,
			view 	: 'home'
		},
		'agenda' : {
			value 	: 'Agenda',
			tabID 	: 'agendaTab',
			index 	: 2,
			login	: true,
			view 	: 'agenda'
		},
		'administration' : {
			value 	: 'Administration',
			tabID 	: 'adminTab',
			index 	: 3,
			login	: true,
			view 	: 'administration'
		}
	}
	
	function setView(view){
		var
		tabContainer 	= $$('tabContainer').$domNode,
		tabWidget 		= $$('mainTab'),
		mapObj 			= _ns.adminView.mapViewObj;
		
		if(!mapObj[view]){
			return false;
		}
		
		if(mapObj[view].login){
			if(!waf.directory.currentUserBelongsTo('administrator')){
				location.href = '/logmein';
				return false;
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
				height: 475,
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
		isAdmin	= waf.directory.currentUserBelongsTo('administrator'),
		mapView	= _ns.adminView.mapViewObj;
		
		for(attr in mapView){
			if(mapView.hasOwnProperty(attr)){
				var obj = mapView[attr];
				if(obj.login){
					if(isAdmin){
						$('#' + obj.tabID)
						.data('view' , obj.view)
						.click(function(){
							setView($(this).data('view'));
						})
						.removeClass('disabled')
					}else{
						$('#' + obj.tabID)
						.unbind('click')
						.addClass('disabled')
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
		options = _ns.adminView.options;
		
		center('main');
		center('mainDialog');
		
		setView(options.view);
		
		$.ajax({
			url : '/getTemplate',
			success: function(response , type , xhr){
				$$('scheduler').$domNode.append($(response));
				
				mappingObj = initScheduler('scheduler' , new Date(), options.calendar , {
					dataSource 	: sources.timeTable,
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
			}
		});
		
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
