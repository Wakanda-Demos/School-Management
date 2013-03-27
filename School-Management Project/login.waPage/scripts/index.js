
WAF.onAfterInit = function onAfterInit() {// @lock
	var
	msgWidget = $$('message'),
	toCheck = [
		{
			widget: $$('loginTF'),
			mondatory: true,
			messageIfEmpty: 'username is mondatory'
		},
		{
			widget: $$('password'),
			mondatory: true,
			messageIfEmpty: 'password is mondatory'
		}
	]
	
	function check(){
		var
		res = true,
		focus;
		for(var i = 0, attr ; attr = toCheck[i] ; i++){
			var $widget = attr.widget.$domNode;
			if(attr.mondatory && !$widget.val() ){
				if(withErrors){
					$widget.attr({
						placeholder: attr.messageIfEmpty
					}).addClass('smError');
				}
				res = false;
				if(!focus){
					focus = $widget;
				}
			}
		}
		
		if(focus){
			focus.focus();
		}
		
		return res;
	}
// @region namespaceDeclaration// @startlock
	var password = {};	// @textField
	var loginTF = {};	// @textField
	var button1 = {};	// @button
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	password.keyup = function password_keyup (event)// @startlock
	{// @endlock
		if(event.keyCode == 13 && check()){
			$$('button1').$domNode.click();
		}
	};// @lock

	loginTF.keyup = function loginTF_keyup (event)// @startlock
	{// @endlock
		if(event.keyCode == 13 && check()){
			$$('button1').$domNode.click();
		}
	};// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		if(check(true) && waf.directory.loginByPassword(login.username , login.password)){
			location.href = '/logmein';
		}
	};// @lock

	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$$('loginTF').$domNode.focus();
		
		$$("container1").show();
		
		$$("container1").$domNode.css({
			'display' : 'block !important'
		});
		
		$$("container1").center({center : 'vh'});
		
		$(window).resize(function(){
			$$("container1").center({center : 'vh'});
		});
	};// @lock

// @region eventManager// @startlock
	WAF.addListener("password", "keyup", password.keyup, "WAF");
	WAF.addListener("loginTF", "keyup", loginTF.keyup, "WAF");
	WAF.addListener("button1", "click", button1.click, "WAF");
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
