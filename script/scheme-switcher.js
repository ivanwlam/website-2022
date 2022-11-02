// Adapted from: https://github.com/argyleink/gui-challenges/tree/main/theme-switch

const storageKey_schemePref = 'scheme-preference';

const localStorageHasSchemePref = ()     => {
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
  console.log("click", e);
  setSchemePrefToTargetValue(e);
  setSchemePref();
}

const setUpColorSchemeControls = () => {
  document.querySelectorAll(".color-scheme-control").forEach((el) => {
    el.addEventListener('click', onClick_colorSchemeControl);
    el.removeAttribute("checked");
  });
}

const updateColorSchemeControlWithPref = () => {
  const colorSchemeControlSelector = "#color-scheme-" + scheme.pref;
  if (document.querySelector(colorSchemeControlSelector)) {
    document.querySelector(colorSchemeControlSelector).setAttribute("checked", "checked");
  }
}

const runFeature_ColorSchemeControl = () => {
  // Set early so no page flashes and that CSS is made aware
  reflectSchemePref();

  window.onload = () => {
    // Set after the buttons exist
    reflectSchemePref();
    setUpColorSchemeControls();
    updateColorSchemeControlWithPref();
  }
}



runFeature_ColorSchemeControl();