// Adapted from: https://github.com/argyleink/gui-challenges/tree/main/theme-switch

const storageKey_schemePref = 'scheme-preference';

const localStorageHasSchemePref = () => {
  return localStorage.getItem(storageKey_schemePref) ? true : false;
}

const latestLocalStorageSchemePref = () => {
  return localStorage.getItem(storageKey_schemePref);
}
 
const setLocalStorageSchemePrefToAuto = () => {
  localStorage.setItem(storageKey_schemePref, "auto");
}

const getColorSchemePref = () => {
  if (localStorageHasSchemePref()) {
    return latestLocalStorageSchemePref();
   } else {
     setLocalStorageSchemePrefToAuto();
     return "auto";
   }
 }

const scheme = {
  pref: getColorSchemePref(),
}

const setLocalStorageSchemePrefToLatest = () => {
   localStorage.setItem(storageKey_schemePref, scheme.pref);
 }

const setHtmlTagSchemePref = () => {
  document.firstElementChild.setAttribute('data-scheme-pref', scheme.pref);
}

const reflectSchemePref = () => {
  setHtmlTagSchemePref();
}
const setSchemePrefToTargetValue = (e) => {
  scheme.pref = e.target.value;
}

const setSchemePref = () => {
   setLocalStorageSchemePrefToLatest();
   reflectSchemePref();
 }

const onClick_colorSchemeControl = (e) => {
  setSchemePrefToTargetValue(e);
  setSchemePref();
}

const verifyThatColorSchemeControlIsChecked = (e) => {
  console.log("verifying scheme control change");
  console.log("control value:", e.target.value);
  if (e.target.value == true) {
    console.log("control is checked", e.target);
    onClick_colorSchemeControl(e);
  }
}

const setUpColorSchemeControls = () => {
  console.debug("Before setup");
  console.debug(document.querySelectorAll(".color-scheme-control"));
  document.querySelectorAll(".color-scheme-control").forEach((el) => {
    el.removeAttribute("checked");
    el.checked = false;
    el.addEventListener("click", onClick_colorSchemeControl);
  });
  console.debug("after setup");
  console.debug(document.querySelectorAll(".color-scheme-control"));
}

const updateColorSchemeControlWithPref = () => {
  const colorSchemeControlSelector = "#color-scheme-" + scheme.pref;
  console.debug("radio input element", document.querySelector(colorSchemeControlSelector));
  // if (document.querySelector(colorSchemeControlSelector) ) {
    console.debug("radio input element: before", document.querySelector(colorSchemeControlSelector));
    document.querySelector(colorSchemeControlSelector)?.setAttribute("checked", "checked");
    document.querySelector(colorSchemeControlSelector)?.click();
    console.debug("radio input element: after", document.querySelector(colorSchemeControlSelector));
  
  // }
}

console.log("Running: scheme-switcher scripts");
// Set early so no page flashes and that CSS is made aware
reflectSchemePref();

window.onload = () => {
  // Set after the buttons exist
  reflectSchemePref();
  setUpColorSchemeControls();
  // setTimeout(() => {
    // updateColorSchemeControlWithPref();
  // }, 100); // Seems like the problem is that the function was run too early, which doesn't make sense since console shows that the object is already created and detectable.

}


console.log("End of scheme-switcher.js");

// runFeature_ColorSchemeControl();

/* Site-specific modifications */


function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

const colorSchemeControlSelector = "#color-scheme-" + scheme.pref;
waitForElm(colorSchemeControlSelector).then((el) => {
  updateColorSchemeControlWithPref();
});


// const windowResized = () => {
//   console.log("Sticky header resized");

//   setUpColorSchemeControls();
//   updateColorSchemeControlWithPref();
// }

// window.onresize = () => {
//   windowResized();
// }