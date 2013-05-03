
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'main';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		options 	= _ns.adminView.options,
		$tabCont	= getHtmlObj('container1'),
		webcompo	= $$(getHtmlId('component1')),
		baseFolder	= '/components/administration/',
		mapObj 		= {
			'teachers' : {
				widgetID : 'container2',
				current : 'teachers'
			},
			'students' : {
				widgetID : 'container3',
				current : 'students'
			},
			'grades' : {
				widgetID : 'container4',
				current : 'groups'
			},
			'subjects' : {
				widgetID : 'container5',
				current : 'courses'
			},
			'classrooms' : {
				widgetID : 'container6',
				current : 'classrooms'
			},
			'parameters' : {
				widgetID : 'container7',
				current : 'parameters'
			}
		};
		function setAdminTab(tab){
			if(!mapObj[tab]){
				return false;
			}
			
			$comp.sourcesVar.currentTab = {
				widget: $$(getHtmlId(mapObj[tab].widgetID)),
				current: mapObj[tab].current
			}
			
			$comp.sources.currentTab.sync();
			
			if(history){
				history.pushState({}, '', '?view=administration&adminTab=' + tab)
			}
		}
		
		_ns.adminView.setAdminTab = setAdminTab;
		
		if(mapObj[options.adminTab]){
			$tabCont.find('.selected').removeClass('selected')
			$$(getHtmlId(mapObj[options.adminTab].widgetID)).addClass('selected');
			webcompo.loadComponent(baseFolder + mapObj[options.adminTab].current + '.waComponent' )
		}

	// @region namespaceDeclaration// @startlock
	var container7 = {};	// @container
	var container6 = {};	// @container
	var container5 = {};	// @container
	var container4 = {};	// @container
	var container3 = {};	// @container
	var currentTabEvent = {};	// @dataSource
	var container2 = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	container7.click = function container7_click (event)// @startlock
	{// @endlock
		setAdminTab('parameters');
	};// @lock

	container6.click = function container6_click (event)// @startlock
	{// @endlock
		setAdminTab('classrooms');
	};// @lock

	container5.click = function container5_click (event)// @startlock
	{// @endlock
		setAdminTab('subjects');
	};// @lock

	container4.click = function container4_click (event)// @startlock
	{// @endlock
		setAdminTab('grades');
	};// @lock

	container3.click = function container3_click (event)// @startlock
	{// @endlock
		setAdminTab('students');
	};// @lock

	currentTabEvent.onCurrentElementChange = function currentTabEvent_onCurrentElementChange (event)// @startlock
	{// @endlock
		var
		current 	= window[getHtmlId('currentTab')];
		
		$tabCont.find('.selected').removeClass('selected')
		current.widget.addClass('selected');
		webcompo.loadComponent(baseFolder + current.current + '.waComponent' )
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		setAdminTab('teachers');
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container7", "click", container7.click, "WAF");
	WAF.addListener(this.id + "_container6", "click", container6.click, "WAF");
	WAF.addListener(this.id + "_container5", "click", container5.click, "WAF");
	WAF.addListener(this.id + "_container4", "click", container4.click, "WAF");
	WAF.addListener(this.id + "_container3", "click", container3.click, "WAF");
	WAF.addListener(this.id + "_currentTab", "onCurrentElementChange", currentTabEvent.onCurrentElementChange, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
