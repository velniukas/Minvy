// ready_signup effect //
function display_sform() {
	$('div.signup_form').fadeIn('fast', function() {
		var styled_input = $('input.styled');
		styled_input.placeholder();
		styled_input.focusin(function() {
			$(this).addClass('typing');
		});
		styled_input.focusout(function() {
			$(this).removeClass('typing');
		});		if(isMobile) {
		}
	});}$.fn.ready_signupFx = function() {
	$(this).fadeOut('normal', function() {
		$('#signup_intro').slideUp('fast', function() {
			display_sform();
		});	});};function isValidEmail(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return regex.test(email);
}function signup_clickFx(lang) {	var url_page;		if(lang === 'zh') {		url_page = 'signup_chi.html';	} else if(lang === 'en') {		url_page = 'signup.html';	}		$.ajax({
		url : url_page,
		context : document.body,
		success : function(data) {
			$(data).prependTo('#show-p').hide();
			if(isMobile) {
				$('#ajax_pop_merchants').fadeIn('fast');
				$.scrollTo('#ajax_pop_merchants', 200, {
					offset : {
						top : -88
					}
				});
			} else {
				$('#ajax_pop_merchants').slideDown();
				$.scrollTo('#ajax_pop_merchants', 200, {
					offset : {
						top : -88
					}
				});
			}
			$('#btn_ready_signup').click(function() {
				$(this).ready_signupFx();
			});			// signup effects
			$('#btn_signup_send').click(function() {
				var email, contact, company, phone;				email = $('#signupEmail').val();				contact = $('#signupContact').val();				company = $('#signupCompany').val();				phone = $('#signupPhone').val();
				var $resultBox = $('#signupResult');
				var $result = $('#signupResult_msg');
				if(isValidEmail(email) && contact != '' && company != '' && phone != '') {
					$.ajax({
						url : './php/signup.php',
						type : "POST",
						dataType : 'json',
						data : {
							signupEmail : email,
							signupContact : contact,
							signupCompany : company,
							signupPhone : phone
						},
						success : function(a, b) {
							switch (a['success']) {
								case 1:
									$result.text('Thanks for your interest. We will be in touch within 24 hours.');
									break;
								case 2:
									$result.text('You have registered too many times!');
									break;
								case 3:
									$result.text('Internet error.');
									break;
								case 4:
									$result.text('Please try again later.');
									break;
							}
							$('#signupZone').css({
								position : 'relative'
							}).animate({
								left : '-100%',
								opacity : 0
							}, 'slow', function() {
								$resultBox.fadeIn('fast');
							});						}					});
				} else {
					//console.log('failed with empty value');
				}
			});		}	});
}$(document).ready(function() {
	var supportCSS3 = false;
	jQuery.each(['BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'], function() {
		if(document.body.style[this] !== undefined)
			supportCSS3 = true;
		return (!supportCSS3);
	});	// switch ipSimulator / video holder //
	// var $ipSimulator = $('#ipSimulator'); //
	if(supportCSS3) {
	} else if(!supportCSS3) {
		$('.piece-in').eqHeight();
	}
	$('#nav_signup').find('a.pop_merchants').click(function() {
		if($('#ajax_pop_merchants').length) {
			return false;
		}		var lang;		if($('body').hasClass('zh')) {			lang = 'zh';		} else if($('body').hasClass('en')) {			lang = 'en';		}		
		signup_clickFx(lang);
	});});