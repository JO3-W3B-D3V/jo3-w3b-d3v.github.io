/**
 * @todo I need to clean up this code, BIG TIME, I also need to look at 
 *       making the entire application work as quickly as possible, with 
 *       as little complexity as possible. 
 * @todo I also need to look at testing and debugging any potential issue(s)
 *       there may be within this code.
 */


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
	addEvent(document, "DOMContentLoaded", function () { fnc(); });
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
	
	
	
	var isEmptyOrNull = function (str) {
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
		
		if (urlPath.indexOf("#") >= 0) pagename = window.location.hash.replace(new RegExp("#", "g"), "");
		else  pagename = pagename.substring(0, pagename.indexOf("."));
		
		
		console.log(pagename);
		
		if (pagename == "home" || pagename == "index" || pagename == "") {		
			ninja.setData("home", {});
			ninja.render("home");
		} else if (pagename == "about") { // TODO
			ninja.setData("home", {});
			ninja.render("home");
		} else if (pagename == "") { // TODO
			ninja.setData("home", {});
			ninja.render("home");
		} else { 
			errorPage(); 
		}
	};
	
	var nagivation = $e("nav a");
	console.log(nagivation);
	addEvent(nagivation, "click", function (e) {
		try {
			e = e || window.event;
			e.preventDefault();
		} catch (Exception) {
			/* don't worry about it... */
		}
		
		var link = this.getAttribute("href").split("/");
		var targetURI = link[link.length - 1];
		console.log(targetURI);
		
		router.navigate(null, null, targetURI);
		
		if (ninja.getData(targetURI) == null) {
			ninja.setData(targetURI, {});
		}
		
		ninja.render(targetURI);
		
		return false;
	});
	
	
	
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
