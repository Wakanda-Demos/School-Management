
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'ttSearch';
	// @endregion// @endlock

	this.load = function (data) {// @lock
			
		function selectQueryType(type , search){
			var
			pos = 12,
			mapObj = {
				'teacher' : {
					widget : $$(getHtmlId('teacherCombo'))
				},
				'classroom' : {
					widget : $$(getHtmlId('classroomCombo'))
				},
				'custom' : {
					widget : $$(getHtmlId('customQuery'))
				},
				'studyGroup' : {
					widget : $$(getHtmlId('sgCombo'))
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
			if(typeof mappingObj != 'undefined'){
				mappingObj.colorAttr = colorAttr;
			}
			window['ttQueryStr'] = query;
			sources[getHtmlId('ttQueryStr')].sync();
		}
		
		selectQueryType('teacher');
	// @region namespaceDeclaration// @startlock
	var combobox1 = {};	// @combobox
	var button1 = {};	// @button
	var ttQueryStrEvent = {};	// @dataSource
	var textField1 = {};	// @textField
	var sgCombo = {};	// @combobox
	var classroomCombo = {};	// @combobox
	var teacherCombo = {};	// @combobox
	// @endregion// @endlock

	// eventHandlers// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		selectQueryType(this.getValue());
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		$comp.sources.teacher.select(-1);
		$comp.sources.classroom.select(-1);
		$comp.sources.studyGroup.select(-1);
		initChangeEvent.call(this , '' , 'classroom.color');
	};// @lock

	ttQueryStrEvent.onAttributeChange = function ttQueryStrEvent_onAttributeChange (event)// @startlock
	{// @endlock
		sources.timeTable.query(window['ttQueryStr']);
	};// @lock

	textField1.change = function textField1_change (event)// @startlock
	{// @endlock
		initChangeEvent.call(this , this.getValue() , 'classroom.color');
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
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_ttQueryStr", "onAttributeChange", ttQueryStrEvent.onAttributeChange, "WAF");
	WAF.addListener(this.id + "_textField1", "change", textField1.change, "WAF");
	WAF.addListener(this.id + "_sgCombo", "change", sgCombo.change, "WAF");
	WAF.addListener(this.id + "_classroomCombo", "change", classroomCombo.change, "WAF");
	WAF.addListener(this.id + "_teacherCombo", "change", teacherCombo.change, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
