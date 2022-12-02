let pageIsBelowFold = false;

const documentIsBelowFold = () => {
  const pageYScrollPosition = window.pageYOffset;
  const viewportHeight = window.innerHeight;
  return (pageYScrollPosition >= viewportHeight);
}

const navMenuClicked = (e) => {
  toggleNavIsOpen(e);
}

const pageHeadingIsAboveViewport = () => {
  const pageHeading = document.querySelector("h1.entry-title");
  if (!pageHeading) return false;

  const pageHeadingY = pageHeading.getBoundingClientRect().y;
  const pageHeadingHeight = pageHeading.offsetHeight;
  const pageHeadingBottomY = pageHeadingY + pageHeadingHeight;
  const pageYScrollPosition = window.pageYOffset;

  console.debug("pageHeadingY", pageHeadingY, "pageHeadingHeight", pageHeadingHeight, "pageHeadingBottomY", pageHeadingBottomY, "pageYScrollPosition", pageYScrollPosition);

  return (pageYScrollPosition >= pageHeadingBottomY);
}


const setDocAsAboveFold = () => {
  document.body.classList.remove("below-fold");
  document.body.classList.add("above-fold");
  // console.debug("setting: above");
}

const setDocAsBelowFold = () => {
  document.body.classList.remove("above-fold");
  document.body.classList.add("below-fold");
  // console.debug("setting: below");
}


const setPageHeadingAsAboveViewport = () => {
  document.body.classList.remove("page-heading-below-viewport");
  document.body.classList.add("page-heading-above-viewport");

  console.debug("page heading above viewport");
}

const setPageHeadingAsBelowViewport = () => {
  document.body.classList.remove("page-heading-above-viewport");
  document.body.classList.add("page-heading-below-viewport");

  console.debug("page heading below viewport");
}

const setUpHeaderNavOverlayEvent = () => {
  const headerNavOverlay = document.querySelector("header nav .overlay");
  headerNavOverlay?.addEventListener("click", toggleNavIsOpen);
}

const toggleNavIsOpen = (e) => {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("isOpen");
}

const updateDocFoldStatus = () => {  
  pageIsBelowFold = documentIsBelowFold();
  pageIsBelowFold ? setDocAsBelowFold() : setDocAsAboveFold();
}

const updatePageHeadingPositionStatus = () => {
  pageHeadingIsAboveViewport() ? setPageHeadingAsAboveViewport() : setPageHeadingAsBelowViewport();
}

const updateHeaderBreadcrumbCaseStudyTitle = () => {
  const el_caseStudyTitle = document.querySelector("header .case-study-title span");
  const el_h1 = document.querySelector("h1");
  
  if (!(el_caseStudyTitle && el_caseStudyTitle.textContent && el_h1 && el_h1.textContent)) return;
  el_caseStudyTitle.textContent = el_h1.textContent;
}

window.onscroll = () => {
  updateDocFoldStatus();
  updatePageHeadingPositionStatus();
}

// window.onload = () => {
//   updateDocFoldStatus();
//   setUpHeaderNavOverlayEvent();
//   updateHeaderBreadcrumbCaseStudyTitle();
// }

window.addEventListener("load", () => {
  updateDocFoldStatus();
  updatePageHeadingPositionStatus();
  setUpHeaderNavOverlayEvent();
  updateHeaderBreadcrumbCaseStudyTitle();
});