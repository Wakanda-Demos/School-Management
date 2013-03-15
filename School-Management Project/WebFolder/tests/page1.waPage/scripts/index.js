
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var login1 = {};	// @login
	var timeTableEvent = {};	// @dataSource
	var documentEvent = {};	// @document
// @endregion// @endlock
	var mappingObj = new Mapping();
// eventHandlers// @lock

	login1.logout = function login1_logout (event)// @startlock
	{// @endlock
		sources.timeTable.all();
	};// @lock

	login1.login = function login1_login (event)// @startlock
	{// @endlock
		sources.timeTable.all();
	};// @lock

	timeTableEvent.onCollectionChange = function timeTableEvent_onCollectionChange (event)// @startlock
	{// @endlock
		if(!this._time ||  new Date() > new Date(this._time + 5000) ){
			this.toArray('tt_length , rec_type , tt_pid , parentTT , comment , ID , teacher , course, beginDate , endDate , classroom , studyGroup' , {
				onSuccess: function(e){
					var
					res 		= e.result;
					scheduler.clearAll();
					for(var i = 0 ; i < res.length ; i++){
						res[i] = mappingObj.getReverseObject(res[i]);
					}
					scheduler.parse(res , 'json');
				}
			});
		}
		
		this._time = new Date();
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$.ajax({
			url : '/getTemplate',
			success: function(response , type , xhr){
				$$('container1').$domNode.append($(response));
				initScheduler('container1' , new Date(), "month");
			}
		});
		
		var dataSources = [{
			id			: 'teacher',
			ttAttrName	: 'teacher',
			idAttr		: 'ID'
		} , 'course', 'classroom' , 'studyGroup'];
		
		for(var i = 0 , dataS ; dataS = dataSources[i] ; i++){
			var
			id 			= dataS.id ? dataS.id : dataS,
			ttAttrName	= dataS.ttAttrName ? dataS.ttAttrName : dataS,
			idAttr		= dataS.idAttr ? dataS.idAttr : 'ID';
			
			sources[id]._private._tmp = {
				ttAttrName	: ttAttrName,
				idAttr		: idAttr
			};
			sources[id]._private._ttAttrName = ttAttrName;
			
			WAF.addListener(id, "onCurrentElementChange", function(event){
				if(event.eventKind == 'onCurrentElementChange' && this.getCurrentElement()){
					sources.timeTable.query(event.dataSource._private._tmp.ttAttrName + '.' + 
					event.dataSource._private._tmp.idAttr + ' = ' + this.getCurrentElement().getKey());
				}
			}, "WAF");
		}
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("login1", "logout", login1.logout, "WAF");
	WAF.addListener("login1", "login", login1.login, "WAF");
	WAF.addListener("timeTable", "onCollectionChange", timeTableEvent.onCollectionChange, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
