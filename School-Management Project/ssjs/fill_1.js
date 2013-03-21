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
courses 	= [ 'Geography', 'physics', 'Physical Education', 'Theater', 'Cooking', 'General Science', 'Mathematics', 'English' , 'French' , 'Latin' , 'Biology' , 'History' , 'Chemistry' , 'Economics' , 'Linguistics'],
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
//ds.Log.disable();

loginByPassword('super' , 'super');

function randomStr(){
    var
    defaultConfig	= {
        onlyNumbers	: false,
        length		: 10,
        chars		: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
        spaceBetweenEach : 0
    },
    config 	= defaultConfig
    res 	= "";
	
    if(arguments.length == 0){
        config = defaultConfig;
    }
    else if(typeof arguments[0] == "number"){
        config.length = arguments[0];
		
        config = __utils.extend(defaultConfig , arguments[1]);
    }
    else if(typeof arguments[0] == "object"){
        config = __utils.extend(defaultConfig , arguments[0]);
    }
		
    if(config.onlyNumbers){
        config.chars = '1234567890';
    }
	
    for(var i=0 ; i < config.length ; i++){
        j = Math.floor(Math.random() * config.chars.length);
        res += config.chars.charAt(j);
    }
	
    return res;
}

function nextPerson(){
    var
    nextFn 	= fnStream.read('\n'),
    city	= citiesStream.read('\n'),
    ln		= lnStream.read('\r'),
    fn 		= nextFn.split('\t')[0],
    gender	= nextFn.split('\t')[1],
    res 	= {},
    randomIndex;
	
    res 	= {
        login 		: fn + '.' + ln,
        password	: "wakanda",
        email		: fn.toLowerCase() + '.' + ln.toLowerCase() + '@wakanda.org',
        address		: city,
        phone		: '+33 1 6 ' + randomStr(6 , {
            onlyNumbers : true,
            spaceBetweenEach: 2
        }),
        fax			: '0' + randomStr(9 , {
            onlyNumbers : true
        }),
        firstname	: ln,
        lastname	: fn
    };
	
    if(!parseInt(gender)){
        randomIndex = parseInt(Math.random()*menPhotos.files.length);
        res.avatar 	= loadImage(menPhotos.files[randomIndex]);
    }
    else{
        randomIndex = parseInt(Math.random()*womenPhotos.files.length);
        res.avatar 	= loadImage(womenPhotos.files[randomIndex]);
    }
	
    return res;
}

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
        name: sg,
        color: '#' + colors[parseInt(Math.random()*colors.length)]
    });
    
    studyG.save();
}

studyGroups	= ds.StudyGroup.toArray('ID');

// Generate the course
for(var _i = 0 , c ; c = courses[_i] ; _i++){
    var
    course = new ds.Course({
        name		: c,
        description	: 'Description of the course : ' + c,
        summary		: 'The summary of the course : ' + c,
        color: '#' + colors[parseInt(Math.random()*colors.length)]
    });
	
    course.save();
	
    for(var _j = 0 ; _j < 5 ; _j++){
        new ds.CourseMaterial({
            course: course
        }).save();
    }
}

// Generate classrooms
for(var _i = 0 , cr ; cr = classrooms[_i] ; _i++){
	new ds.Classroom({
        name	: cr,
        color: '#' + colors[parseInt(Math.random()*colors.length)]
    }).save();
}

absStream.close();

ds.StudyGroup.all();