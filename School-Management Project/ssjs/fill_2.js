var
baseFolder	= Folder(getFolder('path') + 'assets/users'),
mapClasses	= [
{
	dcName 	: 'Teacher',
	folder	: 'teachers'
},
{
	dcName 	: 'Student',
	folder	: 'students'
},
{
	dcName 	: 'Administrator',
	folder	: 'administrators'
}];

for(var i = 0 , mapObj ; mapObj = mapClasses[i] ; i++){
	var
	fol1= Folder(baseFolder.path + mapObj.folder),
	dc 	= ds[mapObj.dcName];
	
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
			
			if(line.trim() == 'break'){
				break;
			}
			
			for(var k = 0 , attr ; attr = attrs[k] ; k++){
				attr = attr.trim();
				
				if(!dc[attr]){
					continue;
				}
				
				values[k] = values[k].replace('\\n' , '\n');
				
				switch(dc[attr].type){
					case "string":
					case "number":
						person[attr] = values[k];
						break;
					case "date":
						person[attr] = new Date(values[k]);
						break;
					case "image":
						person[attr] = loadImage(fol2.path + values[k].trim());
						break;
				}
				
			}
				
			dc['gender'] = fol2.name == 'Men' ? true : false;
			
			try{
				person.save();
			}catch(e){
				
			}
		}
	}
}

var
randomizer 	= new (require('utils').Randomizer)();

ds.Teacher.forEach(function(entity){
	var course = ds.Course.find('$(this.teachers.length == 0)' , { allowJavascript: true });
	if(!course){
		course = randomizer.getRandom('Course');
	}
	entity.speciality = course;
	entity.save();
});

ds.Student.forEach(function(entity){
	var sg = ds.StudyGroup.find('$(this.students.length == 0)' , { allowJavascript: true });
	if(!sg){
		sg = randomizer.getRandom('StudyGroup');
	}
	entity.studyGroup = sg;
	entity.save();
});

ds.TimeTable.remove();

var
agenda	= ds.Agenda.first(),
date = new Date(),
timeTableMeta	= {
	
    seances		: [
    {
    	begin : {
    		hours : 7,
    		minutes : 0
    	},
    	end	: {
    		hours : 8,
    		minutes : 45
    	}
    },
    {
    	begin : {
    		hours : 9,
    		minutes : 0
    	},
    	end	: {
    		hours : 10,
    		minutes : 45
    	}
    },
    {
    	begin : {
    		hours : 11,
    		minutes : 0
    	},
    	end	: {
    		hours : 12,
    		minutes : 45
    	}
    },
    {
    	begin : {
    		hours : 13,
    		minutes : 0
    	},
    	end	: {
    		hours : 14,
    		minutes : 45
    	}
    },
    {
    	begin : {
    		hours : 15,
    		minutes : 0
    	},
    	end	: {
    		hours : 16,
    		minutes : 45
    	}
    },
    {
    	begin : {
    		hours : 17,
    		minutes : 0
    	},
    	end	: {
    		hours : 18,
    		minutes : 45
    	}
    }],
    workingDays		: agenda.getWorkingDays()
};

date.setDate(date.getDate() - date.getDay() + 1);
date.setSeconds(0);
date.setMilliseconds(0);

while(ds.TimeTable.count() < 1000){
	for(var i = 0 , seance ; seance = timeTableMeta.seances[i] ; i++){
		var
		course = randomizer.getRandom('Course'),
		beginDate = new Date(date),
		endDate = new Date(date);
		
		beginDate.setHours(seance.begin.hours);
		endDate.setHours(seance.end.hours);
		
		beginDate.setMinutes(seance.begin.minutes);
		endDate.setMinutes(seance.end.minutes);
		
	    var timeTable 		= new ds.TimeTable({
	        beginDate	: beginDate,
	        endDate		: endDate,
	        studyGroup 	: randomizer.getRandom('StudyGroup'),
	        teacher 	: randomizer.getRandomFromCollection(ds.Teacher.query('speciality.ID = :1' , course)),
	        classroom 	: randomizer.getRandom('Classroom'),
	        course 		: course
	    })
	    
	    timeTable.save();
	}
    
    do{
    	date.setDate(date.getDate() + 1);
		date.setSeconds(0);
		date.setMilliseconds(0);
    }while(timeTableMeta.workingDays.indexOf(date.getDay()) < 0)
}