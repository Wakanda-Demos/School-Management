/**

* @author admin

*/

(function(){
	var
	__Utils			= model.Utils 		= {},
	__methods		= __Utils.methods 	= {},
	directoryROLES	= __myNameSpace.DirectoryROLES;
	
	__methods.toCamelCase = function(str){
		return str.substring(0,1).toUpperCase() + str.substring(1);
	}
	
	__methods.classToType = function(variable){
		var
		class2type = {
          "[object Boolean]": "boolean",
          "[object Number]": "number",
          "[object String]": "string",
          "[object Function]": "function",
          "[object Array]": "array",
          "[object Date]": "date",
          "[object RegExp]": "regexp",
          "[object Object]": "object"
        };
        
        if(typeof variable != 'object'){
        	return typeof variable;
        }
        
        return class2type[Object.prototype.toString.call(variable)];
	}
	
	__methods.extend = function(destination, source) {
	  for (var property in source) {
	    if (typeof source[property] === "object" &&
	     source[property] !== null ) {
	      destination[property] = destination[property] || {};
	      arguments.callee(destination[property], source[property]);
	    } else {
	      destination[property] = source[property];
	    }
	  }
	  return destination;
	};
	
	__methods.isBusy = function(config){
		var
		ROLES			= __myNameSpace.ROLES,
		sessionRef		= currentSession(),
		promoteToken 	= sessionRef.promoteWith(ROLES.ADMINISTRATOR),
		result			= false,
		timeTable 		= config.timeTable,
		from			= timeTable.beginDate,
		to				= timeTable.endDate,
		timeTableID		= timeTable.ID,
		timeTables		= config.timeTables;
		
		timeTables.forEach(function(tt){
			if(to <= tt.beginDate || from >= tt.endDate || tt.ID == timeTableID){
				// at this moment ==> not busy... we can contine
			}
			
			else{
				result = true;
			}
		});
		
		return result;
	}
	
	__methods.switchTimeTables = function(ttID1 , ttID2){
		var
		sessionRef		= currentSession(),
		result			= true,
		timeTable1 		= ds.TimeTable(ttID1),
		timeTable2 		= ds.TimeTable(ttID2),
		beginDate1		= timeTable1.beginDate,
		beginDate2		= timeTable2.beginDate,
		tempDate		= new Date(0),
		findAnEmptyTT	= true;
		
		while(findAnEmptyTT){
			tempDate	= new Date(parseInt(Math.random()*new Date().getTime()));
			
			try{
				timeTable1.beginDate = tempDate;
				timeTable1.save();
				
				findAnEmptyTT = false;
			}catch(e){
				findAnEmptyTT = true;
			}
		}
			
		try{
			timeTable2.beginDate = beginDate1;
			timeTable2.save();
		}catch(e){
			timeTable1.beginDate = beginDate1;
			timeTable1.save();
			
			return e;
		}
		
		try{	
			timeTable1.beginDate = beginDate2;
			timeTable1.save();
		}catch(e){
			timeTable2.beginDate = beginDate2;
			timeTable2.save();
			
			timeTable1.beginDate = beginDate1;
			timeTable1.save();
			
			return e;
		}
		
		return result;
	}
	
	__methods.switchTimeTables.scope = 'public';
	
	__methods.generateRandomData = function(){
		var
		curSession	= currentSession(),
		promoteToken= curSession.promoteWith(directoryROLES.ADMINISTRATOR);
		
		importScripts('ssjs/fill_1.js' , 'ssjs/fill_2.js');
		
		curSession.unPromote(promoteToken);
	}
	__methods.generateRandomData.scope = 'public';
	
	__methods.loginAs = function(user){
		switch(user){
			case 'administrator':
				loginByPassword('administrator', 'administrator');
				break;
			case 'teacher':
				loginByPassword('teacher', 'teacher');
				break;
			case 'student':
				loginByPassword('student', 'student');
				break;
			default:
				return false;
		}
		
		return true;
	}
	__methods.loginAs.scope = 'public';
})();
