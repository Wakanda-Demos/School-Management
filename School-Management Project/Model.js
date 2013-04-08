var __myNameSpace = __myNameSpace || {};

__myNameSpace.Model = {};

var
model	= {};

(function(){
	var
	modelFolder		= 'Model/',
	extension		= '.js',
	filesToInclude	= ['Utils' , 'User/User' , 'TimeTable' , 'Course' ,  'StudyGroup' , 'Classroom' , 'CourseMaterial' , 'Vacancy' , 'Attendance' , 'Log' , 'Recurring' , 'Academic_calendar' , 'Agenda' , 'School' , 'Message'];
	
	for(var i = 0 , file ; file = filesToInclude[i] ; i++){
		include(modelFolder + file + extension);
	}
})();