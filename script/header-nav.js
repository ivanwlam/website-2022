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

const toggleNavIsOpen = (e) => {
  const nav = document.querySelector("header nav");
  nav.classList.toggle("isOpen");
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

  const headerNavOverlay = document.querySelector("header nav .overlay");
  headerNavOverlay?.addEventListener("click", toggleNavIsOpen);

  // set up listener for nav click
  // NOTE 11/14/22: can't seem to get nav to not be clicked when children are clicked
  // TODO 11/14/22: Create a separate div that is gray and covers the entire page and link that to the close trigger.
  /* 
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
  */
}