let pageIsBelowFold = false;

const documentIsBelowFold = () => {
  const pageYScrollPosition = window.pageYOffset;
  const viewportHeight = window.innerHeight;
  return (pageYScrollPosition >= viewportHeight);
}

const navMenuClicked = (e) => {
  toggleNavIsOpen(e);
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

const updateHeaderBreadcrumbCaseStudyTitle = () => {
  const el_caseStudyTitle = document.querySelector("header .case-study-title span");
  const el_h1 = document.querySelector("h1");
  
  if (!(el_caseStudyTitle && el_caseStudyTitle.textContent && el_h1 && el_h1.textContent)) return;
  el_caseStudyTitle.textContent = el_h1.textContent;
}

window.onscroll = () => {
  updateDocFoldStatus();
}

window.onload = () => {
  updateDocFoldStatus();
  setUpHeaderNavOverlayEvent();
  updateHeaderBreadcrumbCaseStudyTitle();
}