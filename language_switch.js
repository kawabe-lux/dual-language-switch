(function(){  
	let schemeStored, languageStored
	// is called before DOM is loaded
  function init() {
		const root = document.documentElement;

		languageStored = sessionStorage.getItem('language');
		if (languageStored == "DE"){
			root.classList.add(languageStored);
			root.setAttribute("lang", "de");
		}
		else if (languageStored == "EN"){
			root.classList.add(languageStored);
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
    setSwitch("language", function(pressed) {
			let language;
			if (pressed == true){
				language = "DE";
			}
			else{
				language = "EN";
			}
			document.documentElement.classList.toggle("DE");
			sessionStorage.setItem('language', language);
		})
    
    //sets switch to "DE" if stored so
    if (typeof languageStored != "undefined" && languageStored != null){
			if (languageStored == "DE"){
				document.getElementById("language-button").setAttribute("aria-checked", "false");
			}
		}
  }
  
  // function for dual switch function creation
  function setSwitch(name, callback) {
		const button = document.getElementById(name + "-button");
		button.addEventListener("click", function(){
			const pressed = this.getAttribute("aria-checked") === "true";
      this.setAttribute("aria-checked", !pressed);
			callback(pressed);
		});
	}
  
  init();
})()
