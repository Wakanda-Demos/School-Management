
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ttSearch';
	// @endregion// @endlock

	this.load = function (data) {// @lock
		var
		localDSs 		= [$comp.sources.teacher , $comp.sources.classroom , $comp.sources.studyGroup , $comp.sources.course],
		fieldsOptions	= [
		{
			label	: 'Teacher',
			value	: 'teacher',
			groups	: ['student' , 'administrator']
		},
		{
			label	: 'Classroom',
			value	: 'classroom'
		},
		{
			label	: 'Grade',
			value	: 'grade',
			groups	: ['teacher' , 'administrator']
		},
		{
			label	: 'Course',
			value	: 'course'
		}
		];
		
		var fields = window[getHtmlId('fields')] = [];
		for(var i = 0 , fOpt ; i < fieldsOptions.length ; i++){
			var
			fOpt 	= fieldsOptions[i],
			groups	= fOpt.groups;
			
			if(groups){
				for(var j = 0 ; j < groups.length ; j++){
					var g = groups[j];
					
					if(waf.directory.currentUserBelongsTo(g)){
						fields.push({
							value	: fOpt.value,
							label	: fOpt.label
						});
						break;
					}
				}
			}
			else{
				fields.push({
					value	: fOpt.value,
					label	: fOpt.label
				});
			}
		}
		$comp.sources['fields'].sync();
		
		function selectQueryType(type , search){
			var
			pos = 12,
			mapObj = {
				'teacher' : {
					position 	: 0,
					label 		: 'Teacher',
					widget 		: $$(getHtmlId('teacherCombo'))
				},
				'classroom' : {
					position	: 1,
					label		: 'Classroom',
					widget 		: $$(getHtmlId('classroomCombo'))
				},
//				'custom' : {
//					widget : $$(getHtmlId('customQuery'))
//				},
				'grade' : {
					position	: 2,
					label		: 'Classroom',
					widget 		: $$(getHtmlId('sgCombo'))
				},
				'course' : {
					position	: 3,
					label		: 'Classroom',
					widget 		: $$(getHtmlId('courseCombo'))
				}
			};
			
			if(!mapObj[type]){
				return false;
			}
			
			$('.queryType').hide();
			mapObj[type].widget.setLeft(pos);
			mapObj[type].widget.show();
		}
		
		function initChangeEvent(query , colorAttr , init){
			if(init && !this._init){
				this._init = true;
				return;
			}
			else if(this.source && !this.source.getCurrentElement()){
				return;
			}
			
			if(typeof mappingObj != 'undefined'){
				mappingObj.colorAttr = colorAttr;
			}
			window['ttQueryStr'] = query;
			sources[getHtmlId('ttQueryStr')].sync();
		}
		
		function initDataSources(initListeners){
			for(var i = 0 , dataSource ; dataSource = localDSs[i] ; i++){
				if(initListeners){
					dataSource.all({
						onSuccess: function(e){
							e.dataSource.select(-1);
						}
					});
				}
				else{
					dataSource.select(-1);
				}
			}
		}
		
		selectQueryType($comp.sources['fields'].value);
		initDataSources(true);
	// @region namespaceDeclaration// @startlock
	var courseCombo = {};	// @combobox
	var combobox1 = {};	// @combobox
	var button1 = {};	// @button
	var ttQueryStrEvent = {};	// @dataSource
	var sgCombo = {};	// @combobox
	var classroomCombo = {};	// @combobox
	var teacherCombo = {};	// @combobox
	// @endregion// @endlock

	// eventHandlers// @lock

	courseCombo.change = function courseCombo_change (event)// @startlock
	{// @endlock
		if(this.getValue()){
			initChangeEvent.call(this , 'course.ID = ' + this.getValue() , 'studyGroup.color' , true);
		}
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		selectQueryType(this.getValue());
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		initDataSources(false);
		initChangeEvent.call(this , '' , 'classroom.color');
	};// @lock

	ttQueryStrEvent.onAttributeChange = function ttQueryStrEvent_onAttributeChange (event)// @startlock
	{// @endlock
		var value = window['ttQueryStr'];
		
		if(value != this._oldValue){
			sources.timeTable.query(value);
		}
		this._oldValue = value;
	};// @lock

	sgCombo.change = function sgCombo_change (event)// @startlock
	{// @endlock
		if(this.getValue()){
			initChangeEvent.call(this , 'studyGroup.ID = ' + this.getValue() , 'course.color' , true);
		}
	};// @lock

	classroomCombo.change = function classroomCombo_change (event)// @startlock
	{// @endlock
		if(this.getValue()){
			initChangeEvent.call(this , 'classroom.ID = ' + this.getValue() , 'studyGroup.color' , true);
		}
	};// @lock

	teacherCombo.change = function teacherCombo_change (event)// @startlock
	{// @endlock
		if(this.getValue()){
			initChangeEvent.call(this , 'teacher.ID = ' + this.getValue() , 'classroom.color' , true);
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_courseCombo", "change", courseCombo.change, "WAF");
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_ttQueryStr", "onAttributeChange", ttQueryStrEvent.onAttributeChange, "WAF");
	WAF.addListener(this.id + "_sgCombo", "change", sgCombo.change, "WAF");
	WAF.addListener(this.id + "_classroomCombo", "change", classroomCombo.change, "WAF");
	WAF.addListener(this.id + "_teacherCombo", "change", teacherCombo.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
