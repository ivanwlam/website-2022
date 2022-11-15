let pageIsBelowFold = false;

const documentIsBelowFold = () => {
  const pageYScrollPosition = window.pageYOffset;
  const viewportHeight = window.innerHeight;
  return (pageYScrollPosition >= viewportHeight);
}

const navMenuClicked = (e) => {
  // check nav-list state. if open, set to close. if close, set to open
  const nav = document.querySelector("header nav");
  nav.classList.toggle("isOpen");
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

const updateDocFoldStatus = () => {  
  pageIsBelowFold = documentIsBelowFold();
  pageIsBelowFold ? setDocAsBelowFold() : setDocAsAboveFold();
}

window.onscroll = () => {
  updateDocFoldStatus();
}

window.onload = () => {
  updateDocFoldStatus();
  // set up listener for nav click
  const headerNav = document.querySelector("header nav");
  headerNav.addEventListener("click", e => {
    console.debug("parent capture");
    navMenuClicked();
  }, {capture: true});

  const headerNavChildren = document.querySelectorAll("header nav *");
  headerNavChildren.forEach(el => {
    el.addEventListener("click", e => {
      console.debug("nav children clicked");
      e.stopPropagation();
    });
  });

  const headerNavList = document.querySelector("header nav .nav-list");
  headerNavList.addEventListener("click", e => {
    console.debug("nav list clicked");
    e.stopPropagation();
  });
}