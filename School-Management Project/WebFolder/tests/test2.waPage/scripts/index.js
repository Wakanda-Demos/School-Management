
WAF.onAfterInit = function onAfterInit() {// @lock
	
// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock
	
// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		var $scheduler = $$('container1').$domNode;
		
		mappingObj = initScheduler($scheduler.attr('id') , new Date(), 'week' , {
			dataSource 	: sources.timeTable,
			fields		: {
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
			cacheSize	: 80,
			colorAttr	: 'classroom.color',
			initQuery	: ''
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
