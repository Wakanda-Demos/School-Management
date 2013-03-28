
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'home';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
	//No, no we're not that stupid :D !! The passwords are stored in the client side for demo purposes
	var loginMap = {
		'administrator': {
			login	: 'administrator',
			password: 'administrator'
		},
		'teacher' : {
			login	: 'teacher',
			password: 'teacher'
		},
		'student' : {
			login	: 'student',
			password: 'student'
		}
	}
	// @region namespaceDeclaration// @startlock
	var container1 = {};	// @container
	// @endregion// @endlock

	// eventHandlers// @lock

	container1.click = function container1_click (event)// @startlock
	{// @endlock
		var
		type 	= $$(getHtmlId('combobox1')).getValue(),
		obj 	= loginMap[type];
		
		if(obj && waf.directory.loginByPassword(obj.login , obj.password)){
			location.href = '/index/?view=agenda';
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_container1", "click", container1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
