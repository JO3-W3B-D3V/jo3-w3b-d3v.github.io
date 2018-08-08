// ---------------------------------------------------------------------------------------------------------------
// UTILS 
// ---------------------------------------------------------------------------------------------------------------
var addEvent = function (obj, event, callback) {
	if (obj == null) return;
	
	if (Array.isArray(obj) || obj instanceof HTMLCollection) {
		for (var i = 0, s = obj.length; i < s; i ++)
			addEvent(obj[i], event, callback);
	} else if (Array.isArray(event) ) {
		for (var i = 0, s = event.length; i < s; i ++)
			addEvent(obj, event[i], callback);
	} else  {		
		if (obj.addEventListener) obj.addEventListener(event, callback, false);
		else if (obj.attachEvent) obj.attachEvent('on' + event, callback);
		else                      obj["on" + event] = callback;
	}
};

var ready = function (fnc) {
	setTimeout(function () {
		addEvent(document, "DOMContentLoaded", function () { fnc(); });
	}, 10);
};

var $e = function (queryString) {
	return  Array.prototype.slice.call(document.querySelectorAll(queryString));
};




// ---------------------------------------------------------------------------------------------------------------
// APP 
// ---------------------------------------------------------------------------------------------------------------
ready (function () {
	var errors = "";
	var targetURL = "";
	var ninja = new Ninja();
	var router = new Router();
	
	
	try { errors = window.localStorage.getItem("errors"); } 
	catch (Exception) { errors = ""; }
	
	
	try { targetURL = window.localStorage.getItem("visited"); } 
	catch (Exception) { targetURL = ""; }
	
	
	
	var isEmptyOrNull (str) {
		return str == "" || str == null;
	};
	
	
	// ---------------------------------------------------------------------------------------------------------------
	// ROUTING
	// ---------------------------------------------------------------------------------------------------------------
	
	
	var errorPage = function () {
		ninja.setData("bug", {});
		ninja.render("bug");
	};
	
	
	var applyRouting = function (e) {
		var url = window.location.href;
		var urlPath = url.split("/");
		var pagename = urlPath[urlPath.length - 1].toLowerCase();
		var URI = "";
		
		
		try { URI = window.localStorage.getItem("visited"); } 
		catch (Exception) { /* Don't worry about it then?! :) */ }
		
		
		if (isEmptyOrNull(URI)) {
			try { pagename = window.localStorage.getItem("visited"); } 
			catch (Exception) { /* Don't worry about it then?! :) */ }
		} else {				
			if (urlPath.indexOf("#") >= 0) pagename = window.location.hash.replace(new RegExp("#", "g"), "");
			else  pagename = pagename.substring(0, pagename.indexOf("."));
		}
		
		
		if (pagename == "home" || pagename == "index" || pagename == "") {		
			ninja.setData("home", {});
			ninja.render("home");
		} else if (pagename == "about") {
			
		} else if (pagename == "") {
			
		} else { 
			errorPage(); 
		}
	};
	
	
	
	// ---------------------------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------------------------------------
	if (errors == "" && targetURL == "") {
		applyRouting();
	} else if (targetURL != "") {
		applyRouting();
	} else { errorPage(); }
	
	
	try {
		window.localStorage.setItem("errors", "");
	} catch (Exception) {
		/* Don't worry about it then?! :) */
	}
});
