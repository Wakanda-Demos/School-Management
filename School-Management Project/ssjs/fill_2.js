var
folders		= Folder(getFolder('path') + 'assets/users').folders,
dataClasses	= [ 'Teacher' , 'Student' , 'Administrator'	];

loginByPassword('super' , 'super');

for(var i = 0 , fol1 ; fol1 = folders[i] ; i++){
	var
	dc = ds[dataClasses[i]];
	if(!dc){
		continue;
	}
	
	dc.remove();
	
	for(var j = 0 , fol2 ; fol2 = fol1.folders[j] ; j++){
		var
		file = File(fol2 , 'list.txt');
		
		if(!file.exists){
			continue;
		}
		
		var
		person,
		mapObj	= {},
		list 	= loadText(file);
		lines	= list.split('\n'),
		fline	= lines[0],
		attrs	= fline.split(':');
		
		for(var l = 1 , line ; line = lines[l] ; l++){
			var
			person 	= new dc(),
			values	= line.split(':');
			
			if(line == 'break'){
				break;
			}
			
			for(var k = 0 , attr ; attr = attrs[k] ; k++){
				if(!dc[attr]){
					continue;
				}
				
				values[k] = values[k].replace('\\n' , '\n');
				
				switch(dc[attr].type){
					case "string":
						person[attr] = values[k];
						break;
					case "date":
						person[attr] = new Date(values[k]);
						break;
					case "image":
						person[attr] = loadImage(fol2.path + values[k]);
						break;
				}
				
			}
			
			try{
				person.save();
			}catch(e){
				
			}
		}
	}
}

var
studyGroups = ds.StudyGroup.toArray('ID'),
courses		= ds.Course.toArray('ID'),
classrooms	= ds.Classroom.toArray('ID'),
teachers	= ds.Teacher.toArray('ID');

ds.Teacher.forEach(function(entity){
	entity.speciality = ds.Course(courses[parseInt(Math.random()*courses.length)]);
	entity.save();
});

ds.Student.forEach(function(entity){
	entity.studyGroup = ds.StudyGroup(studyGroups[parseInt(Math.random()*studyGroups.length)]);
	entity.save();
});

// Fill School:
ds.School.init();

ds.TimeTable.remove();

var
date = new Date(),
timeTableMeta	= {
    nbOfHours	: 0,
    nbOfMinutes	: 30,
    margin		: 30
};

for(var _i = 0 ; _i < 20 ; _i++ ){
    var timeTable 		= new ds.TimeTable({
        beginDate	: new Date(date),
        nbOfHours	: timeTableMeta.nbOfHours,
        nbOfMinutes	: timeTableMeta.nbOfMinutes,
        studyGroup 	: studyGroups[parseInt(Math.random()*studyGroups.length)].ID,
        teacher 	: teachers[parseInt(Math.random()*teachers.length)].ID,
        classroom 	: classrooms[parseInt(Math.random()*classrooms.length)].ID,
        course 		: courses[parseInt(Math.random()*courses.length)].ID
    })
    
    timeTable.save();
    
    date = new Date(timeTable.endDate.getTime() + timeTableMeta.margin*60*1000);
}