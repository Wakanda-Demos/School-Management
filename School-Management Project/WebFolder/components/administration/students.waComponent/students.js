
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'students';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	var
	dg			= $$(getHtmlId('dataGrid1')),
	dataSource 	= sources.adminStudent,
	selectedSts	= sources.adminSelectedStudents;
	
	dg.$domNode.find('.waf-dataGrid-header .waf-dataGrid-cell.waf-dataGrid-col-avatar').empty().removeClass('clickable');
	dg.$domNode.find('.waf-dataGrid-header .waf-dataGrid-cell.waf-dataGrid-col-fullname').empty().css({
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
					dataSource.collectionRefresh();
				}
			})
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
					var
					msg = 'Do you want to remove the ' + selectedSts.length + ' selected student(s) ?';
					
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
	var container5 = {};	// @container
	var container3 = {};	// @container
	var combobox1 = {};	// @combobox
	var container2 = {};	// @container
	var dataGrid1 = {};	// @dataGrid
	// @endregion// @endlock

	// eventHandlers// @lock

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
		if(!this._inited){
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
	WAF.addListener(this.id + "_container5", "click", container5.click, "WAF");
	WAF.addListener(this.id + "_container3", "click", container3.click, "WAF");
	WAF.addListener(this.id + "_combobox1", "change", combobox1.change, "WAF");
	WAF.addListener(this.id + "_container2", "click", container2.click, "WAF");
	WAF.addListener(this.id + "_dataGrid1", "onRowDblClick", dataGrid1.onRowDblClick, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
