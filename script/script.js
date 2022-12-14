const vv_cMin = 60 * 24 * 7;
const redirectUrl = "/wordpress.php/";

/*
const vv_setC_unhide = function () {
  console.log("temp: func: set and unhiding");
  vv_setC(vv_cMin);
  vv_unhide();
};

const vv_unhide = function () {
  console.log('temp: unhide content');
};
*/

const getDaysFromMinutes = function (minutes) {
  let date = new Date();
  date.setTime(date.getTime() + (minutes * 60 * 1000));
  // console.log("date", date);
  return date;
};
  
const getValidVisitorCookieString = function (minutes) {
    // Let cookie apply across pages in domain: Add "domain=.example.com;path=/": https://stackoverflow.com/questions/5671451/creating-a-javascript-cookie-on-a-domain-and-reading-it-across-sub-domains

	  let expiryDate = getDaysFromMinutes(minutes);
	  let cookieValue = "vv=true;expires=" + expiryDate.toUTCString() + ";domain=.ivanwlam.com;path=/;secure";
	  console.log("cookieValue", cookieValue);
	  return cookieValue;
};

const setBodyAsNotPermitted = function () {
  document.body.classList.add("permission-denied");
}

const vv_redirect = function () {
  if (window.location.href.includes(redirectUrl)) return;
  window.location.replace(redirectUrl);
}

const vv_setC = function (minutes) {
  document.cookie = getValidVisitorCookieString(minutes);
  console.log("Running: vv_setC");
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