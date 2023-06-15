// Code below is a modification of an approach originally used by the BTAA Geoportal
// This approach is not used at this time... need feedback from Eric L.

 GoogleAnalytics = (function() {
  function GoogleAnalytics() {}

   GoogleAnalytics.load = function() {
	var firstScript, ga;
    // Grab tracking id from Ruby variable via function
    GoogleAnalytics.analyticsId = GoogleAnalytics.getAnalyticsId();
    console.log(GoogleAnalytics.analyticsId);
	// insert GA javascript into document
	ga = document.createElement('script');  
    ga.async = true;
    ga.src = ('https://www.googletagmanager.com/gtag/js?id=' + GoogleAnalytics.analyticsId);
	// Make this the first js include in the list
    firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(ga, firstScript);	
	// The following code comes from Google Analytics "install your tag" instructions.  Only difference is insertion of GoogleAnalytics.analyticsId
	window.dataLayer = window.dataLayer || [];
	function gtag(){dataLayer.push(arguments);}
	gtag('js', new Date());
	gtag('config', GoogleAnalytics.analyticsId,{'debug_mode':true });
  };

  GoogleAnalytics.getAnalyticsId = function() {
    return $('[data-analytics-id]').data('analytics-id');
  };

   return GoogleAnalytics;

 })();
 
  Blacklight.onLoad(function() {
  // inserting here results in at least two includes of google tag js
  //GoogleAnalytics.load();
  });
