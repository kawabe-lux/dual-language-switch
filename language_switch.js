(function(){  
  let languageStored
  const root = document.documentElement;
  // is called before DOM is loaded
  function init() {
    languageStored = sessionStorage.getItem('language');
    if (languageStored !== null){
      root.setAttribute("lang", languageStored);
    }
    
    // if DOM is already loaded, call onDOMLoad(). if not, listen to event
    if (document.readyState !== 'loading'){      
      onDOMLoad();
    } else{
      document.addEventListener('DOMContentLoaded', onDOMLoad);
    }
  }
  
  // is called after DOM is loaded
  function onDOMLoad() {    
    setSwitch("language", function(language) {
      root.setAttribute("lang", language);
      sessionStorage.setItem('language', language);
    })
    
    //sets switch to "DE" if stored so
    if (typeof languageStored != "undefined" && languageStored != null){
      const radios = document.getElementById("language-switch").radios;
      if (languageStored in radios){
        radios[languageStored].checked = true;
      }
      else {
        console.error("language-switch: Language stored not found in values"
          + " stored in radio input values: " + languageStored);
      }
    }
  }
  
  // function for dual switch function creation
  function setSwitch(name, callback) {
    const switchEl = document.getElementById(name + "-switch");
    const radios = switchEl.getElementsByTagName("input");
    /*switchEl.radios = radios;*/
    switchEl.radios = {};
    for (var i = radios.length - 1; i >= 0; i--) {
      // set radio relationship
      if (radios[i].checked === true) {
        switchEl.radioChecked = radios[i];
      }
      radios[i].switch = switchEl;
      if (i === radios.length - 1) {
        radios[i].nextRadio = radios[0];
      }
      else {
        radios[i].nextRadio = radios[i + 1];
      }
      switchEl.radios[radios[i].value] = radios[i];
      // Click event
      radios[i].addEventListener("click", function(event){
        // check next if already checked
        const checked = this.checked;
        if (this === this.switch.radioChecked) {
          // check next
          this.switch.radioChecked = this.nextRadio;
          this.checked = false;
          this.nextRadio.checked = true;
        }
        else {
          this.switch.radioChecked = this;
        }
        const value = this.switch.radioChecked.value;
        callback(value);
      });
    }
  }
  
  init();
})()
