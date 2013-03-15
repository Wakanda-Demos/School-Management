WAF.onAfterInit = function onAfterInit() {
	WAF.addListener("document", "onLoad", function (event){
		
		
		$('.login').animate({
			top: '50%'
		}, 1000 , 'easeOutBounce' , function(){
			$('.logo').css({
				top: ($(window).height() - $('.login').height() - $(this).height())/2 + 70
			});
			$('.logo').animate({
				left: "50%"
			}, 300 , 'easeOutQuint');
		});
		
		$(window).resize(function(){
			$('.logo').css({
				top:  ($(window).height() - $('.login').height() - $('.logo').height())/2 + 70,
				left: "50%"
			});
		});
	}, "WAF");
	
	$('#page').show();
	
	$('#formLog').submit(function(){
		var
		login	= $('#login'),
		passwd	= $('#password');
		
		if(waf.directory.loginByPassword(login.val() , passwd.val())){
			location.href = "/logmein";
		}
		else{
			login.addClass('wrong').effect("shake", { times:2 }, 50);
			passwd.addClass('wrong').effect("shake", { times:2 }, 50);
			
			return false;
		}
	});
};

