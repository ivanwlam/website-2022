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
  if (scheme.pref != e.target.value) {
    console.debug("scheme.pref != e.target.value", "scheme.pref:", scheme.pref, "e.target.value:", e.target.value);
    triggerMtmEvent_htmlTagSchemeChange();
  }
  scheme.pref = e.target.value;
}

const setSchemePref = () => {
   setLocalStorageSchemePrefToLatest();
   reflectSchemePref();
}

const triggerMtmEvent_htmlTagSchemeChange = () => {
  var _mtm = window._mtm || [];
  _mtm.push({"event": "html-tag-scheme-change"});
}

const onClick_colorSchemeControl = (e) => {
  setSchemePrefToTargetValue(e);
  setSchemePref();
}

const verifyThatColorSchemeControlIsChecked = (e) => {
  console.debug("verifying scheme control change");
  console.debug("control value:", e.target.value);
  if (e.target.value == true) {
    // console.debug("control is checked", e.target);
    onClick_colorSchemeControl(e);
  }
}

const setUpColorSchemeControls = () => {
  document.querySelectorAll(".color-scheme-control").forEach((el) => {
    el.removeAttribute("checked");
    el.checked = false;
    el.addEventListener("click", onClick_colorSchemeControl);
  });
}

const updateColorSchemeControlWithPref = () => {
  const colorSchemeControlSelector = "#color-scheme-" + scheme.pref;
  // console.debug("radio input element", document.querySelector(colorSchemeControlSelector));
  // if (document.querySelector(colorSchemeControlSelector) ) {
    // console.debug("radio input element: before", document.querySelector(colorSchemeControlSelector));
    document.querySelector(colorSchemeControlSelector)?.setAttribute("checked", "checked");
    document.querySelector(colorSchemeControlSelector)?.click();
    // console.debug("radio input element: after", document.querySelector(colorSchemeControlSelector));
  
  // }

  /* TODO 11/8/22: Adjust to allow for multiple instances of the scheme component and therefore multiple radio input for the same value */
}

// console.debug("Running: scheme-switcher scripts");
// Set early so no page flashes and that CSS is made aware
reflectSchemePref();

/*
window.onload = () => {
  // Set after the buttons exist
  reflectSchemePref();
  setUpColorSchemeControls();
  // setTimeout(() => {
    updateColorSchemeControlWithPref();
  // }, 100); // Seems like the problem is that the function was run too early, which doesn't make sense since console shows that the object is already created and detectable.
}
*/

window.addEventListener("load", () => {

  reflectSchemePref();
  setUpColorSchemeControls();
  updateColorSchemeControlWithPref();

});

window.onresize = () => {
  /* Need to implement a delay after window resize to update the switcher */

  /* TODO: 11/4/22: Preferably:
    1) the update happens as soon as it's ready and not with a hard-coded time
    2) the update only happens after the resizing stops, and not constantly.
    */
  setTimeout(() => {
    // console.debug("timeout to update controls");
    setUpColorSchemeControls();
    updateColorSchemeControlWithPref();
    // console.debug("end of timeout");
  }, 500);

}

// TODO: 11/15/22: Add event listener for when "et_builder_inner_content et_pb_gutters3" and other divs changes class to run the scheme update. 

// runFeature_ColorSchemeControl();

/* Site-specific modifications */


// const windowResized = () => {
//   console.debug("Sticky header resized");

//   setUpColorSchemeControls();
//   updateColorSchemeControlWithPref();
// }

// window.onresize = () => {
//   windowResized();
// }