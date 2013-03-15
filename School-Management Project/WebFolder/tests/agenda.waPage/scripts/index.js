
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$.ajax({
			url : '/getTemplate',
			success: function(response , type , xhr){
				$$('container1').$domNode.append($(response));
				initScheduler('container1' , new Date(), "week" , {
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
					}
				});
				
				sources.timeTable.all();
			}
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
