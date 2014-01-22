/**

* @author admin

*/

__myNameSpace.ERRORS = {
	'login' : {
		'loginInvalid':{
			error		: 10,
			errorMessage: "Invalid login"
		},
		'unknownRole': {
			error		: 11,
			errorMessage: "Unknown Role"
		},
		'passwordInvalid': {
			error		: 12,
			errorMessage: "Invalid password"
		},
		'notExist': {
			error		: 13,
			errorMessage: "Login does not exist"
		},
		'notConnected': {
			error		: 14,
			errorMessage: "You must be connected"
		}
	},
	Model : {
		TimeTable :{
			'invalidNbOfHours' :{
				error		: 2100,
				errorMessage: "The number of hours is invalid"
			},
			'invalidNbOfMinutes' :{
				error		: 2101,
				errorMessage: "The number of minutes is invalid"
			},
			'emptyTeacher' :{
				error		: 2102,
				errorMessage: "The teacher can not be empty"
			},
			'emptyStudyGroup' :{
				error		: 2103,
				errorMessage: "The grade can not be empty"
			},
			'emptyClassroom' :{
				error		: 2104,
				errorMessage: "The classroom can not be empty"
			},
			'emptyCourse' :{
				error		: 2105,
				errorMessage: "The course can not be empty"
			},
			'teacherIsBusy': {
				error		: 2106,
				errorMessage: "The teacher is busy"
			},
			'studyGroupIsBusy': {
				error		: 2106,
				errorMessage: "The grade is busy"
			},
			'classroomIsBusy': {
				error		: 2107,
				errorMessage: "The classroom is busy"
			},
			'invalidBeginDate': {
				error		: 2108,
				errorMessage: "Begin date is invalid"
			},
			'isVacancy': {
				error		: 2109,
				errorMessage: "You can not add add a timetable in vacancy day "
			},
			'invalidEndDate': {
				error		: 2110,
				errorMessage: "The end date must be bigger than the beginDate attribute!"
			}
		},
		CourseMaterial :{
			'emptyMaterial' :{
				error		: 220,
				errorMessage: "You can not save a courseMaterial without a Material"
			},
			'emptyCourse' :{
				error		: 221,
				errorMessage: "You can not save a material that is associated with no course"
			},
			'notAllowedToModify': {
				error		: 222,
				errorMessage: "You do not have permission to modify this Material"
			},
			'notAllowedToCreate': {
				error		: 223,
				errorMessage: "You do not have permission to create this Material in this course"
			},
			'notAllowedToCreateOrModify': {
				error		: 224,
				errorMessage: "You do not have permission to create or modify this Material in this course"
			}
		},
		Administrator: {
			'updateWithoutAdminRole':{
				error		: 230,
				errorMessage: "Oups! how did you that ??"
			},
			'updateAnotherAdmin':{
				error		: 231,
				errorMessage: "Oups! You do not have permission to update the info of this Administrator!!"
			}
		},
		RecordOfficer: {
			'updateAnotherRecorder':{
				error		: 240,
				errorMessage: "Oups! You do not have permission to update the info of this Record Officer!!"
			}
		},
		Vacancy: {
			'invalidType':{
				error		: 250,
				errorMessage: "Invalid type!!"
			},
			'startEndEmpty':{
				error		: 251,
				errorMessage: "The start/end dates can not be empty!!"
			},
			'invalidEndDate':{
				error		: 252,
				errorMessage: "The end date is less than the start date!!"
			},
			'notSameMonth':{
				error		: 253,
				errorMessage: "The start and end dates should be in the same month and year!!"
			},
			'notSameYear':{
				error		: 254,
				errorMessage: "The start and end dates should be in the same year!!"
			}
		},
		Attendance: {
			'timetableEmpty': {
				error		: 260,
				errorMessage: "The time table can not be empty!!"
			},
			'studentEmpty': {
				error		: 261,
				errorMessage: "The student can not be empty!!"
			},
			'futureTimetable': {
				error		: 262,
				errorMessage: "You cannot know if this student will be absent!!"
			},
			'invalidStudent': {
				error		: 263,
				errorMessage: "The selected student is not in the selected studyGroup!!"
			},
			'invalidStudent': {
				error		: 263,
				errorMessage: "The selected student is not in the selected studyGroup!!"
			},
			'notPermitted': {
				error		: 264,
				errorMessage: "You are not permitted to modify this Attendance list!!"
			}
		}
	}
};
