/**

 * @author admin

 */
var
absFile			= File(Folder(getFolder('path') + "assets/data text files") , "abscence_status.txt"),
absStream		= TextStream(absFile, "read"),
__utils			= ds.Utils,
arrayIDs		= [],
colors			= [
	'b82760',
	'ffad10',
	'a0d925',
	'54a4ff',
	'4a4044',
	'693d88',
	'8f6f4f',
	'516c39',
	'e13e0b',
	'c40811',
	'2742b8',
	'8d6675',
	'b82760'
];

var
courses 	= [ 'Geography', 'Physics', 'Physical Education', 'Theater', 'Cooking', 'General Science', 'Mathematics', 'English' , 'French' , 'Latin' , 'Biology' , 'History' , 'Chemistry' , 'Economics' , 'Linguistics'],
classrooms	= [ 'C101', 'C102', 'C103', 'C104', 'C105',  'C201', 'C202', 'C203', 'C204', 'C205', 'C301', 'C302', 'C303', 'C304', 'C305'],
studyGroups	= [ '1st grade' , '2nd grade' , '3rd grade' , '4th grade' , '5th grade'];

ds.Utils.remove();
var util = new ds.Utils();
for(var i in util){
    if(i != 'ID'){
        util[i] = 0;
    }
}
util.save();

ds.Log.clear();

// Clear all data
for(var _i in ds.dataClasses){
    if(_i != 'Utils' && _i != 'Vacancy' && _i != 'Configuration'){
        ds[_i].remove();
    }
}

// Fill School:
ds.School.init();

// Get the abscence status from the abscence_status file
while(!absStream.end()){
    var line = absStream.read('\r');
	
    new ds.Absence_Status({
        type 	: line.split('\t')[1],
        code	: line.split('\t')[0]
    }).save();
}

//Generate the studyGroups
for(var _i = 0 , sg ; sg = studyGroups[_i] ; _i++){
    var studyG = new ds.StudyGroup({
        name	: sg,
        color 	: '#' + colors[_i%colors.length]
    });
    
    studyG.save();
}

// Generate the course
for(var _i = 0 , c ; c = courses[_i] ; _i++){
    var
    course = new ds.Course({
        name		: c,
        description	: 'Description of the course : ' + c,
        summary		: 'The summary of the course : ' + c,
        color 		: '#' + colors[_i%colors.length]
    });
	
    course.save();
}

// Generate classrooms
for(var _i = 0 , cr ; cr = classrooms[_i] ; _i++){
	new ds.Classroom({
        name	: cr,
        color 	: '#' + colors[_i%colors.length]
    }).save();
}

absStream.close();