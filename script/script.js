	const vv_cMin = 60 * 12;
	const redirectUrl = "/wordpress.php/portfolio-home-2022-06/";
	
	const vv_setC_unhide = function () {
		console.log("temp: func: set and unhiding");
		vv_setC(vv_cMin);
		vv_unhide();
	};
	
	const vv_unhide = function () {
		console.log('temp: unhide content');
	};
	
// 	const vv_checkParams = function () {
// 		console.log('temp: check params');
// 		return false;
// 	};
	
// 	const vv_checkC = function () {
// 		console.log('temp: check cookies');
// 		return false;
// 	};
	
	const vv_redirect = function () {
		if (window.location.href.includes(redirectUrl)) return;
		window.location.replace(redirectUrl);
	}

	const getDaysFromMinutes = function (minutes) {
	  let date = new Date();
	  date.setTime(date.getTime() + (minutes * 60 * 1000));
	  // console.log("date", date);
	  return date;
	};
  
	const getValidVisitorCookieString = function (minutes) {
	  let expiryDate = getDaysFromMinutes(minutes);
	  let cookieValue = "vv=true;expires=" + expiryDate.toUTCString() + ";secure;";
	  // console.log("cookieValue", cookieValue);
	  return cookieValue;
	};

	const vv_setC = function (minutes) {
	  document.cookie = getValidVisitorCookieString(minutes);
	};
 
// setValidVisitorCookie(cookieMinutes);
	
	/*
	if (vv_checkC()) {
		console.log('if checkc = true');
		vv_setC_unhide();
	} else {	
		console.log('else checkc = false');
		if (vv_checkParams()) {
			console.log('if checkparams = true');
			vv_setC_unhide();
		} else {
			console.log('else checkparams = false');
			vv_redirect();
		}
	}*/