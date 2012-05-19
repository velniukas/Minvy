// global JS for TwoPatch, version 1 ; author Cyril Kong //

// define device & browser agent condition //
var isFirefox = $.browser.mozilla, isSafari = $.browser.safari, isWebkit = $.browser.webkit, docBody = (isWebkit) ? 'body' : 'html', isIE7 = $.browser.msie && $.browser.version === 7.0, isIE8 = $.browser.msie && $.browser.version === 8.0, deviceAgent = navigator.userAgent.toLowerCase(), isMobile = deviceAgent.match(/(iphone|ipod|ipad|android)/) !== null;

// set tallest height for targets functions //
$.fn.eqHeight = function(minH, maxH) {
	var tallest = minH || 0;
	this.each(function() {
		if($(this).height() > tallest) {
			tallest = $(this).height();
		}
	});
	if((maxH) && tallest > maxH)
		tallest = maxH;
	return this.each(function() {
		$(this).height(tallest);
	});
};
var body_h;
function sizeBody2block() {
	if($('body').height() != 'undefined') {
		body_h = $('body').height() - 88;
	} else if(window.innerHeight) {
		body_h = window.innerHeight;
	}
	//$('#show-p').find('article.block').css('minHeight', body_h);
}

// set submit signup form effect //
function submit_signup() {
	return;
}


$(document).ready(function() {

	var rel_article;
	$('#top-p').delegate('a.btn', 'click', function() {
		rel_article = $(this).attr('rel');
		//console.log(rel_article);
		if(rel_article) {
			$('#ajax_pop_merchants').remove();

			if(isMobile && rel_article !== 'page_home') {
				$.scrollTo('#' + rel_article, 200, {
					offset : {
						top : 0
					}
				});

			} else {
				$.scrollTo('#' + rel_article, 200, {
					offset : {
						top : -88
					}
				});
			}
		}
	});
	$('.features-f .dsc').eqHeight();
	$('.piece').eqHeight();
	sizeBody2block();

	$(window).resize(function() {
		sizeBody2block();
	});
	
	if(isMobile) {
		var css_for_mobile = '<link rel="stylesheet" type="text/css" href="stylesheets/mobile.css" media="screen"/>'
		$(css_for_mobile).appendTo('head');
	}

	$('#btn_special_signup').click(function() {

		var lang;

		if($('body').hasClass('zh')) {
			lang = 'zh';
		} else if($('body').hasClass('en')) {
			lang = 'en';
		}

		signup_clickFx(lang);

	});
	
	$('#btn_switch_lang_en').click(function(){
		window.location = 'index.html';
	});
	$('#btn_switch_lang_zh').click(function(){
		window.location = 'index_chi.html';
	});
});
