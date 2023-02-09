const vv_cMin = 60 * 24 * 7;
const redirectUrl = "/";


const bodyLoaded = function () {
  // console.debug("bodyLoaded() ran");
  if (typeof track_pageLoad === "function") {
    track_pageLoad();
  }

  if (typeof styleHomePageHeroBody === "function") {
    styleHomePageHeroBody();
  }

  removeProjectMetaLink();
}

const flagProjectMetas = function () {
  // NOTE: possible to refactor to be generalized if necessary
  const projectMetas = document.querySelectorAll(".et_pb_portfolio_item .post-meta");
  projectMetas.forEach(projectMeta => {
    projectMeta.classList.add("js-nolink");
  });
}

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
	  // console.debug("cookieValue", cookieValue);
	  return cookieValue;
};

const removeProjectMetaLink = function () {
  const projectMetaAnchors = document.querySelectorAll(".et_pb_portfolio_item .post-meta a, .text-project-categories a");
  const projectMetas = document.querySelectorAll(".et_pb_portfolio_item .post-meta");
  projectMetaAnchors.forEach(anchor => {
    anchor.removeAttribute("href");
  });

  flagProjectMetas();
  projectMetas.forEach(meta => meta.innerHTML = meta.innerHTML.replaceAll(",",""));

}

// Home Page Hero Body Parsing Styling
const styleHomePageHeroBody = function () {
  // Split up Hero Body copy and wrap each word with a element tag for custom styling
  const textsHeroBody = document.querySelectorAll(".text-hero-body span.textBlock");
  textsHeroBody.forEach((textBlock) => {
    let textBlockContent = textBlock.textContent;
    let textBlockContentUnit = textBlockContent.split(" ");
    let newTextBlockInnerHTML = "";
    textBlockContentUnit.forEach((textUnit) => {
      newTextBlockInnerHTML += "<span>" + textUnit + "</span> ";
    });
    newTextBlockInnerHTML = newTextBlockInnerHTML.trim();
    textBlock.innerHTML = newTextBlockInnerHTML;

  });
}

const urlIsHome = function () {
  // Strip URL of query
  return window.location.href.replace(/\?.*/, "").endsWith(redirectUrl);
}

const vv_redirect = function () {
  // if (window.location.href.includes(redirectUrl)) return;
  if (urlIsHome()) return;
  window.location.replace(redirectUrl);
}

const vv_setC = function (minutes) {
  document.cookie = getValidVisitorCookieString(minutes);
  // console.debug("Running: vv_setC");
};

