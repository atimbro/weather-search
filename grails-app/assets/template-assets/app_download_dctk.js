var T2D = T2D || {};

/*/////////////////////////////////
				Options
/////////////////////////////////*/
T2D.options = {
	url: '/Proxy?serviceID=TXT_MOBILEAPP_LINK',
	expiry: 90,
	day: 24*60*60*1000,
	placeholder: 'XXX-XXX-XXXX',
	placement: 'app_4',
	el: {
		container: '#appDLliteBoxAppContainer',
		mobileTab: '#tab-mobile',
		everywhereAd: '#t2d-everywhere',
		phone: '#appDLphoneNumber',
		send: '#appDL-btn-action',
		app: '#app',
		result: '#result',
		errorContainer: '#appDLerrorDiv',
		successContainer: '#appDLSuccessDiv',
		error: '#appDLphNumErrMsg',
		mask: '#appDLmaskDiv',
		litebox: '#appDLliteBoxApp',
		close: '#appDLcloseBtn',
		iphone: '#iphone',
		android: '#android',
		windows: '#windows',
		cookies: '#applb-cookies',
		autorun: '#applb-autorun',
		coupon: '#applb-couponTest'
	},
	error: {
		international: 'It looks like you just tried to enter a non-U.S. phone number. Unfortunately, at this time we are only supporting U.S. numbers. Please enter your number in the following format: 555-555-5555. Thank you!',
		general: 'We are having trouble processing your phone number. Try using this format: XXX-XXX-XXXX. Thank you!',
		service: 'Sorry, we are currently having problems connecting to our server. You can still download the app by clicking on the app-store buttons below. Thank you!',
		oversending: 'It seems like you are having trouble entering your phone number. Is it possible you\'ve already downloaded our app?'
	},
	request: {
		data: {
			'mobile_phone': '',
			'data_app': '',
			'country_calling_code': 1
		}
	},
	links: {
		app_1: {
			iphone: '',
			android: ''
		},
		app_2: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.SW.HD.Apple/NET/CLICKID/Text2Download',
			android: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.SW.HD.Android/NET/CLICKID/Text2Download'
		},
		app_3: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.HP.EE.Apple/NET/CLICKID/Text2Download',
			android: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.HP.EE.Android/NET/CLICKID/Text2Download'
		},
		app_4: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.HP.PU.Apple/NET/CLICKID/Text2Download',
			android: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.HP.PU.Android/NET/CLICKID/Text2Download'
		},
		app_5: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.HP.PU.CU.Text.Apple/NET/CLICKID/Text2Download',
			android: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.HP.PU.CU.Text.Android/NET/CLICKID/Text2Download'
		},
		app_6: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.HP.PU.NCU.Text.Apple/NET/CLICKID/Text2Download',
			android: 'x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.HP.PU.NCU.Text.Android/NET/CLICKID/Text2Download'
		},
		app_14: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.PCV1.Text.Apple/NET/CLICKID/Text2Download',
			android: 'x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.PCV1.Text.Android/NET/CLICKID/Text2Download'
		},
		app_22: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.NHP.INL_TOP.Text.Apple/NET/CLICKID/Text2Download',
			android: 'x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.NHP.INL_TOP.Text.Android/NET/CLICKID/Text2Download'
		},
		app_23: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.NHP.INL_MID.Text.Apple/NET/CLICKID/Text2Download',
			android: 'x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.NHP.INL_MID.Text.Android/NET/CLICKID/Text2Download'
		},
		app_24: {
			iphone: 'http://ad-x.co.uk/API/dynclk/expediaint56790jo/web751b6f8563c40c/rffrid/Text2Download.MCI.T2D_US.NHP.INL_BOT.Text.Apple/NET/CLICKID/Text2Download',
			android: 'x.co.uk/API/dynclk/expediaint56790jo/web851c2273d57086/rffrid/Text2Download.MCI.T2D_US.NHP.INL_BOT.Text.Android/NET/CLICKID/Text2Download'
		}
	},
	rffrid: {
		app_1: {
			iphone: 'T2D.AP.Apple',
			android: 'T2D.AP.Android',
			windows: 'T2D.AP.Windows',
			close: '', // not litebox
			send: 'T2D.AP.SendText',
			open: '' // not litebox
		},
		app_2: {
			iphone: 'T2D.HP.OH.Apple',
			android: 'T2D.HP.OH.Android',
			windows: '',
			close: 'T2D.HP.OH.Close',
			send: 'T2D.HP.OH.SendText',
			open: 'T2D.US.HP.OH.View'
		},
		app_3: {
			iphone: 'T2D.HP.EE.Apple',
			android: 'T2D.HP.EE.Android',
			windows: '',
			close: 'T2D.HP.EE.Close',
			send: 'T2D.HP.EE.SendText',
			open: 'T2D.US.HP.EE.View'
		},
		app_4: {
			iphone: 'T2D.HP.PU.Apple',
			android: 'T2D.HP.PU.Android',
			windows: '',
			close: 'T2D.HP.PU.Close',
			send: 'T2D.HP.PU.SendText',
			open: 'T2D.US.HP.PU.View'
		},
		app_5: {
			iphone: 'T2D.HP.PU.CU.Apple',
			android: 'T2D.HP.PU.CU.Android',
			windows: '',
			close: 'T2D.HP.PU.CU.Close',
			send: 'T2D.HP.PU.CU.SendText',
			open: 'T2D.US.HP.PU.CU.View'
		},
		app_6: {
			iphone: 'T2D.HP.PU.NCU.Apple',
			android: 'T2D.HP.PU.NCU.Android',
			windows: '',
			close: 'T2D.HP.PU.NCU.Close',
			send: 'T2D.HP.PU.NCU.SendText',
			open: 'T2D.US.HP.PU.NCU.View'
		},
		app_7: {
			iphone: '',
			android: '',
			windows: '',
			close: '',
			send: 'T2D.CC.SA.SendText',
			open: ''
		},
		app_8: {
			iphone: '',
			android: '',
			windows: '',
			close: '',
			send: 'T2D.CC.SE.SendText',
			open: ''
		},
		app_9: {
			iphone: '',
			android: '',
			windows: '',
			close: '',
			send: 'T2D.CC.EP.SendText',
			open: ''
		},
		app_14: {
			iphone: 'T2D.PCV1.Apple',
			android: 'T2D.PCV1.Android',
			windows: '',
			close: 'T2D.PCV1.Close',
			send: 'T2D.PCV1.SendText',
			open: 'T2D.US.PCV1.View'
		},
		errors: {
			err1: 'T2D.Error.International',
			err2: 'T2D.Error.Format',
			err3: 'T2D.Error.Service',
			err4: 'T2D.Error.Oversend'
		}

	}
}

/*/////////////////////////////////
				View
/////////////////////////////////*/
T2D.getPlacement = function () {
	return this.options.placement;
}

T2D.setPlacement = function (pPlacementId) {
	this.options.placement = pPlacementId;
}

T2D.getPhoneNumber = function () {
	return $( this.options.el.phone ).val();
}

T2D.setPhoneNumber = function (pNewPhoneNumber) {
	$( this.options.el.phone ).val(pNewPhoneNumber);
}

T2D.getUserData = function () {
	return this.Cookies.get( this.options.userDataCookie ).split( '=' )[1];
}

T2D.resetPhone = function () {
	$( this.options.el.phone ).val( this.options.placeholder ).css('color','#c7c7c7');
	this.resetRequest();
}

T2D.clearPhone = function () {
	$( this.options.el.phone ).val('').css('color','black');
}

T2D.showResult = function (pResult) {
	$( T2D.options.el.result ).html( pResult );
}

T2D.showError = function (pErrorMsg) {
	$( T2D.options.el.errorContainer ).show( );
	$( T2D.options.el.phone ).removeClass( 'phoneNumberBox' ).addClass( 'phoneNumberBoxError' );
	$( T2D.options.el.error ).html( pErrorMsg );
}
T2D.hideError = function () {
	$( T2D.options.el.phone ).removeClass( 'phoneNumberBoxError' ).addClass( 'phoneNumberBox' );
	$( T2D.options.el.errorContainer ).hide( );
}
T2D.resetStyles = function () {
	$('.liteBoxAppDiv .lb-control').show();
	$('.liteBoxAppDiv .lb-coupon').hide();
	$('.liteBoxAppDiv .lbTerms').removeClass('lbCouponTerms');
	$('.liteBoxAppDiv .appDLlogoDiv, .liteBoxAppDiv .appStoreButtons .first').removeClass('marL-0');
	$('.liteBoxAppDiv').removeClass('liteBoxAppDiv-mTop');
}
T2D.showSuccess = function () {
	$( T2D.options.el.successContainer ).show( );
}

T2D.hideSuccess = function () {
	$( T2D.options.el.successContainer ).hide( );
}
T2D.close = function () {
	$( this.options.el.mask ).hide();
	$( this.options.el.litebox ).hide();
}

T2D.closeGMT = function () {
	$('.t2d-module').animate({
			marginLeft: "102%"
	},500,
	function(){
			$('.t2d-module-sm').show('slow');
	});
}

T2D.show = function () {
	$( this.options.el.mask ).show();
	$( this.options.el.litebox ).show();
}

/*/////////////////////////////////
				Links
/////////////////////////////////*/
T2D.setStoreLinks = function (pAppId) {
	if (pAppId.iphone !== '') {
		$( this.options.el.iphone ).attr('href', pAppId.iphone );
		$( this.options.el.android ).attr('href', pAppId.android );
	}
}

/*/////////////////////////////////
				Main
/////////////////////////////////*/
T2D.reset = function () {
	this.resetPhone( );
	this.hideError();
	this.resetStyles();
}

T2D.init = function () {
	this.resetPhone( );

	$( this.options.el.send ).unbind().click( this.Events.sendMessage );
	$( this.options.el.close ).unbind().click( this.Events.close );
	$( this.options.el.mask ).unbind().click( this.Events.close );
	$( this.options.el.phone ).unbind().click( this.Events.clear );

	$( this.options.el.mobileTab ).unbind().click( this.Events.mobileTab );
	$( this.options.el.everywhereAd ).unbind().click( this.Events.everywhereAd );

	$( this.options.el.iphone )
	.unbind().click( function () {
						T2D.Events.gotoStore();
						T2D.Track.click( this, T2D.options.rffrid[T2D.getPlacement()].iphone );
						T2D.close();
					});

	$( this.options.el.android )
	.unbind().click( function () {
						T2D.close();
						T2D.Events.gotoStore();
						T2D.Track.click( this, T2D.options.rffrid[T2D.getPlacement()].android );
					});

	$( this.options.el.windows )
		.unbind().click( function () {
							T2D.Events.gotoStore();
							T2D.Track.click( this, T2D.options.rffrid[T2D.getPlacement()].windows );
						});

	$( this.options.el.phone ).keypress(function(e) {
	    if ( e.which == 13 ) {
	    	T2D.Events.sendMessage();
	    }
	});

	$( document ).keydown(function(e) {
		if ( e.keyCode == 27 ) {
	    	T2D.Events.close();
	    }
	});

	if ( T2D.hasAppId() ) {
		T2D.setPlacement( T2D.getAppId() );
	}
}

T2D.start = function (pCheckCookies) {
	if ( pCheckCookies ) {
		if ( !this.Cookies.get('appDLhomepageLB') ) {
			this.show();
		}
	} else {
		this.show();
	}
}

/*/////////////////////////////////
				Cookies
/////////////////////////////////*/
T2D.Cookies = {
	get: function (pCookieName) {
		var cookieSearch = new RegExp('(^| )'+ pCookieName +'=([^;]*)(;|$)'),
	    	searchResult = document.cookie.match( cookieSearch );

	    if ( searchResult != null ) {
			return unescape( searchResult[2] );
		}

		return null;
	},
	set: function (pCookieName, pCookieVal, pValidAfter) {
		var expires =  "; expires=",
			date = new Date();

		if (pValidAfter) {
			date.setTime(date.getTime()+(pValidAfter*T2D.options.day));
		} else {
			date.setTime(date.getTime()+(T2D.options.expiry*T2D.options.day));
		}
		expires+= date.toGMTString();

		var cookieStream = document.cookie.split( ';' );

		for ( var i=0; i < cookieStream.length; i+=1 ) {
			var lastCookieIndex = cookieStream.length - 1,
				keyLength = cookieStream[i].indexOf( '=' ),
				singleCookie = $.trim( cookieStream[i].substr( 0, keyLength ) );

			if ( singleCookie === $.trim( pCookieName ) || i === lastCookieIndex ) {
				document.cookie = pCookieName+ "="+ pCookieVal+ expires+ "; path=/";
				break;
			}
		}
	},
	isActive: function () {
		if ( typeof $( T2D.options.el.cookies ).attr( 'data-cookies' ) === 'undefined' ) {
			return false;
		}
		return true;
	}
}

/*/////////////////////////////////
				Events
/////////////////////////////////*/
T2D.Events = {
	sendMessage: function () {
		if ( T2D.hasAppId() ) {
			T2D.setPlacement( T2D.getAppId() );
		}
		if ( T2D.isValidPhoneNumber() ) {
			T2D.updateRequest();
			T2D.sendMessage();
			T2D.Cookies.set('appDLhomepageLB','app', 1000);
		}
	},
	close: function () {
		T2D.close();
		T2D.Cookies.set('appDLhomepageLB', 'app', T2D.options.expiry);
	},
	clear: function () {
		T2D.clearPhone();
	},
	gotoStore: function() {
		T2D.Cookies.set('appDLhomepageLB','app', 1000);
	},
	mobileTab: function () {
		T2D.reset();
		T2D.setStoreLinks( T2D.options.links.app_2 );
		T2D.setPlacement ( 'app_2' );
		if ( T2D.isDevice() ) {
			document.location.href = '/app';
		} else {
			T2D.start();
			T2D.Track.click( this, T2D.options.rffrid.app_2.open );
		}
	},
	everywhereAd: function () {

		T2D.reset();
		T2D.setStoreLinks( T2D.options.links.app_3 );
		T2D.setPlacement ( 'app_3' );
		if ( T2D.isDevice() ) {
			document.location.href = '/app';
		} else {
			T2D.start();
			T2D.Track.click( this, T2D.options.rffrid.app_3.open );
		}
	}
}

/*/////////////////////////////////
				Tracking
/////////////////////////////////*/
T2D.Track = {};

T2D.Track.click = function (element, linkID) {
	dctk.trackAction(linkID, element, {prop16:linkID,eVar28:linkID,eVar18:'Homepage'});
	return;
}

/*/////////////////////////////////
				Request
/////////////////////////////////*/
T2D.resetRequest = function () {
	this.options.request.data['mobile_phone'] = '';
	this.options.request.data['data_app'] = '';
}

T2D.updateRequest = function () {
	this.options.request.data['mobile_phone'] = this.getPhoneNumber();
	this.options.request.data['data_app'] = this.getPlacement();
}

T2D.sendMessage = function () {
	$.ajax ({ url: T2D.options.url,
        type: 'POST',
        datatype: 'json',
        data: T2D.options.request.data,
        success: function () {
        	T2D.close();
        	T2D.hideError();
					T2D.showSuccess();
        	T2D.resetPhone();
					T2D.closeGMT();
        },
        error: function (xhr) {
					var errResponse = xhr.responseText;
					if (errResponse.toLowerCase().indexOf("has already received 3 messages in 24 hours") >= 0) {
        		T2D.showError( T2D.options.error.oversending );
						T2D.Track.click( this, T2D.options.rffrid.errors.err4 );
					} else {
						T2D.showError( T2D.options.error.service );
						T2D.Track.click( this, T2D.options.rffrid.errors.err3 );
					}
					T2D.hideSuccess();
        }
    });
}

/*/////////////////////////////////
			Controller
/////////////////////////////////*/
T2D.isValidPhoneNumber = function () {
	var phoneNumber = this.getPhoneNumber().replace(/\D/g, ''),
		phoneNumberLength = phoneNumber.length;
	if (phoneNumberLength < 10) {
		this.showError( this.options.error.general );
		T2D.hideSuccess();
		T2D.Track.click( this, T2D.options.rffrid.errors.err2 );
		return false;
	} else if (phoneNumberLength > 10) {
		//if phone number starts with a 1, strip it out
		var newPhoneNumber = phoneNumber.replace(/^1/, '');

		if (newPhoneNumber.length === 10) {
			//success
			T2D.setPhoneNumber( newPhoneNumber );
			return true;
		} else {
			//show default error
			this.showError( this.options.error.international );
			T2D.hideSuccess();
			T2D.Track.click( this, T2D.options.rffrid.errors.err1 );
			return false;
		}
	}
	//success - update phone number to strip out characaters
	T2D.setPhoneNumber( phoneNumber );
	return true;
}

T2D.isDevice = function () {
	if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return true;
	}
	return false;
}

T2D.isAutorun = function () {

	if ( typeof $( T2D.options.el.autorun ).attr( 'data-autorun' ) === 'undefined' ) {
		return false;
	}
	return true;
}

T2D.getTestID = function () {
	testValue = $( T2D.options.el.coupon ).attr( 'data-coupon' );

	if (testValue == 'app_5' || testValue == 'app_6' || testValue == 'app_14') {
		$('.liteBoxAppDiv .lb-control').hide();
		$('.liteBoxAppDiv .lb-coupon').show();
		$('.liteBoxAppDiv .lbTerms').addClass('lbCouponTerms');
		$('.liteBoxAppDiv .appDLlogoDiv, .liteBoxAppDiv .appStoreButtons .first').addClass('marL-0');
		$('.liteBoxAppDiv').addClass('liteBoxAppDiv-mTop');
		if (testValue == 'app_6' || testValue == 'app_14') {
			$('.liteBoxAppDiv #appCouponCopy').html('Get the app and your coupon code');
		}
		if (testValue == 'app_14') {
				$(".lbCouponTerms a").attr("href", "/p/info-terms/terms?pageid=16112")
		}
	}
	return testValue;
}

T2D.hasAppId = function () {
	if ( typeof $( T2D.options.el.phone ).attr( 'data-app' ) === 'undefined' ) {
		return false;
	}
	return true;
}

T2D.getAppId = function () {
	return $( T2D.options.el.phone ).attr( 'data-app' );
}

T2D.compressLiteBoxes = function () {

	// save first-one
	var first = $( this.options.el.container );
		// move sepcial tags inside it
		$( this.options.el.litebox ).before( $(this.options.el.autorun) );
		$( this.options.el.litebox ).before( $(this.options.el.cookies) );
		// rename it
		first.attr( 'id', 'tempLbContainer' );

	// delete others
	while ( $( this.options.el.container ).length > 0 ) {
		$( this.options.el.container ).remove();
	}

	// reset first-one name to original
	first.attr( 'id', this.options.el.container.slice(1) );
}

T2D.removeMobileTabHref = function () {
	$( T2D.options.el.mobileTab + ' a' ).removeAttr( 'href' );
}

$(function () {

	T2D.removeMobileTabHref();
	T2D.compressLiteBoxes();
	T2D.init();
	if ( T2D.isAutorun() ) {
		T2D.start( T2D.Cookies.isActive() );

		//set placement based off of data-coupon
		T2D.setPlacement( T2D.getTestID() );
		T2D.setStoreLinks( T2D.options.links[T2D.getPlacement()] );
	}
});