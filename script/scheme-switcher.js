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
  document.querySelectorAll(".color-scheme-control").forEach((el) => {
    el.addEventListener("click", onClick_colorSchemeControl);
    el.addEventListener("change", onClick_colorSchemeControl);
    el.removeAttribute("checked");
  });
}

const updateColorSchemeControlWithPref = () => {
  const colorSchemeControlSelector = "#color-scheme-" + scheme.pref;
  console.log("radio input element", document.querySelector(colorSchemeControlSelector));
  // if (document.querySelector(colorSchemeControlSelector) ) {
    console.log("radio input element: before", document.querySelector(colorSchemeControlSelector));
    document.querySelector(colorSchemeControlSelector)?.setAttribute("checked", "checked");
    // document.querySelector(colorSchemeControlSelector)?.click();
    console.log("radio input element: after", document.querySelector(colorSchemeControlSelector));
  
  // }
}

console.log("Running: scheme-switcher scripts");
// Set early so no page flashes and that CSS is made aware
reflectSchemePref();

window.onload = () => {
  // Set after the buttons exist
  reflectSchemePref();
  setUpColorSchemeControls();
  setTimeout(() => {
    updateColorSchemeControlWithPref();
  }, 1000); // Seems like the problem is that the function was run too early, which doesn't make sense since console shows that the object is already created and detectable.

}


console.log("End of scheme-switcher.js");

// runFeature_ColorSchemeControl();