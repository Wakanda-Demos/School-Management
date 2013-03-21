/**

* @author admin

*/

(function(){
	var
	__Vacancy 				= model.Vacancy = {},
	__events				= __Vacancy.events = {},
	__methods				= __Vacancy.methods = {},
	ROLES					= __myNameSpace.ROLES,
	directoryROLES			= __myNameSpace.DirectoryROLES;
	
	__events.onInit = function(){
		this.start = new Date();
		this.end = new Date();
		this.type = 0;
	}
	
	__events.onValidate = function(){
		var
		type,
		utils		= require('utils'),
		validTypes	= utils.getVacancyTypes(),
		type 		= utils.getVacancyType(this.type);
		
		if(validTypes.indexOf(this.type) < 0){
			return __myNameSpace.ERRORS.Model.Vacancy.invalidType;
		}
		
		if(!this.start || !this.end){
			return __myNameSpace.ERRORS.Model.Vacancy.startEndEmpty;
		}
		
		/******************** Verify the start/end dates  ********************/
		var
		start 	= this.start.getFullYear(),
		end		= this.end.getFullYear();
		
		if(type.name == 'ANNUAL' && start != end){
			return __myNameSpace.ERRORS.Model.Vacancy.notSameYear;
		}
		
		start 	+= ' ' + this.start.getMonth();
		end 	+= ' ' + this.end.getMonth();
		
		if(type.name == 'MONTHLY' && start != end){
			return __myNameSpace.ERRORS.Model.Vacancy.notSameMonth;
		}
		
		if(type.name == 'ONCE' && this.start > this.end){
			return __myNameSpace.ERRORS.Model.Vacancy.invalidEndDate;
		}
		/****************** @End: Verify the start/end dates  ******************/
	};
	
	__events.onSave = function(){
		ds.Log.push(__myNameSpace.LOG.getOperation(this , 'save'));
	}
	
	__events.onRemove = function(){
		ds.Log.push(__myNameSpace.LOG.getOperation(this , 'remove'));
	}
	
	__methods.isVacancy = function (date){
		var
		utils 	= require('utils'),
		res 	= false;
		
		date = new Date(date);
		
		this.forEach(function(entity){
			if(!res){
				var type = utils.getVacancyType(entity.type);
				
				if(!type){
					entity.type = 0;
					entity.save();
				}
				
				switch(type.name){
					case 'ONCE'		:
						res = entity.start <= date && date <= entity.end;
						break;
					case 'WEEKLY'	:
						var
						start 	= entity.start.getDay(),
						end		= entity.end.getDay(),
						theDate	= date.getDay();
						
						if(end < start){
							end += 7;
						
							if(theDate < start){
								theDate += 7;
							}
						}
						
						res = start <= theDate && theDate <= end;
						break;
					case 'MONTHLY'	:
						var
						start 	= entity.start.getDate(),
						end		= entity.end.getDate(),
						theDate	= date.getDate();
						
						res = start <= theDate && theDate <= end;
						break;
					case 'ANNUAL'	:
						var
						start 	= entity.start.getDate() + entity.start.getMonth()*31,
						end		= entity.end.getDate() + entity.end.getMonth()*31,
						theDate	= date.getDate() + date.getMonth()*31;
						
						res = start <= theDate && theDate <= end;
						break;
				}
			}
		});
		
		return res;
	}
	__methods.isVacancy.scope = 'public';
})();
