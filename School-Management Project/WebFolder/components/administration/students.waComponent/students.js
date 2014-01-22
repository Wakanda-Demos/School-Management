
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'students';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	var
	groupsDS	= sources[getHtmlId('studyGroup')],
	dg			= $$(getHtmlId('dataGrid1')),
	dataSource 	= sources.adminStudent,
	selectedSts	= sources.adminSelectedStudents;
	
	getHtmlObj('container1').smSearch({
		datasource: dataSource,
			filter: true
	});
	
	dg.$domNode.find('.waf-dataGrid-header .waf-dataGrid-cell.waf-dataGrid-col-avatar').empty().removeClass('clickable');
	dg.$domNode.find('.waf-dataGrid-header .waf-dataGrid-cell.waf-dataGrid-col-fullname').css({
		'border-left-style' : 'none'
	});
	
	$(_ns).bind({
		'assignGroup' : function(event , group){
			selectedSts.toArray('ID' , {
				onSuccess: function(e){
					var res = e.result;
					
					for(var i = 0 ; i<res.length ; i++){
						res[i] = res[i]['ID'];
					}
					
					ds.Student.assignToGroup(res , group.getKey());
					selectedSts.setEntityCollection(null);
					$$(getHtmlId('dataGrid1')).setSelectedRows(res)
					dataSource.collectionRefresh();
				}
			})
		}
	});
	
	groupsDS.all({
		onSuccess: function(e){
			e.dataSource.select(-1);
		}
	})
	
	function deleteRecords(){
		var col = selectedSts.getEntityCollection();
		 
		col.removeAllEntities({
			onSuccess: function(){
				dataSource.all();
				selectedSts.setEntityCollection(null);
			}
		});
	}
	
	function applyAction(action){
		var
		res,
		sel = dataSource.getSelection(),
		col	= dataSource.getEntityCollection();
		
		col.buildFromSelection(sel, { onSuccess: function(ev){
			selectedSts.setEntityCollection(ev.entityCollection);
			
			switch(action){
				case 'delete':
					if(selectedSts.length < 1){
						break;
					}
					
					var
					plural = selectedSts.length > 1,
					msg = 'Are you sure you want to remove the' + (plural ? ' ' + selectedSts.length : '') + ' selected student' + (plural ? 's' : '') + '?';
					
					if(dhtmlx && dhtmlx.confirm){
						dhtmlx.confirm({
							text: msg,
							callback: function(resp){
								if(resp){
									deleteRecords();
								}
							}
						})
					}
					else if(confirm(msg)){
						deleteRecords();
					}
					
					break;
				case 'assignGroup':
					_ns.adminView.openDialog('groupsDetails');
					break;
			}
		}});
	}
	
	// @region namespaceDeclaration// @startlock
	var adminStudentEvent = {};	// @dataSource
	var button1 = {};	// @button
	var container5 = {};	// @container
	var container3 = {};	// @container
	var combobox1 = {};	// @combobox
	var container2 = {};	// @container
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

	adminStudentEvent.onCollectionChange = function adminStudentEvent_onCollectionChange (event)// @startlock
	{// @endlock
		window[getHtmlId('nbStudents')] = this.length + ' student' + (this.length > 1 ? 's' : '');
		sources[getHtmlId('nbStudents')].sync();
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		groupsDS.select(-1);
		dataSource.all();
		$("#component2_component1_container1 input").attr("value","");
	};// @lock

	container5.click = function container5_click (event)// @startlock
	{// @endlock
		applyAction('delete');
	};// @lock

	container3.click = function container3_click (event)// @startlock
	{// @endlock
		applyAction('assignGroup');
	};// @lock

	combobox1.change = function combobox1_change (event)// @startlock
	{// @endlock
		if(!this.source.getCurrentElement()){
			return false;
		}
		else if(!this._inited){
			this._inited = true;
			return false;
		}
		
		dataSource.query('studyGroup.ID = ' + this.getValue());
	};// @lock

	container2.click = function container2_click (event)// @startlock
	{// @endlock
		dataSource.addNewElement();
		_ns.adminView.openDialog('studentDetails')
	};// @lock

	dataGrid1.onRowDblClick = function dataGrid1_onRowDblClick (event)// @startlock
	{// @endlock
		_ns.adminView.openDialog('studentDetails')
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener("adminStudent", "onCollectionChange", adminStudentEvent.onCollectionChange, "WAF");
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	WAF.addListener(this.id + "_container5", "click", container5.click, "WAF");
	WAF.addListener(this.id + "_container3", "click", container3.click, "WAF");
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock
	
	dataSource.all();
	};// @lock


}// @startlock
return constructor;
})();// @endlock
