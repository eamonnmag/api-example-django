

/*****************/
/*** CUSTOM JS ***/
/*****************/
jQuery(function () {

  // Settings
  var viewportTop    = 0,
      scrollTime    = 400,
      openTime      = 400,
      completeTime  = 800,
      siteName      = "23andMe API Demo",
      scrollElement = "html,body";


  // Initialize waypoints
  $(".area").waypoint({ offset: viewportTop });

  $('.top').addClass('hidden');
  $.waypoints.settings.scrollThrottle = 30;
  
  $('#wrapper').waypoint(function(event, direction) {
    $('.top').toggleClass('hidden', direction === "up");
  }, {
    offset: '-100%'
  }).find('#nav').waypoint(function(event, direction) {
    $(this).parent().toggleClass('sticky', direction === "down");
    event.stopPropagation();
  });

  // Smooth scrolling for internal links
  $("a[href^='#']").click(function (event) {
    event.preventDefault();
    var $this   = $(this),
        target  = this.hash,
        $target = $(target);
    $(scrollElement).stop().animate({
      "scrollTop": $target.offset().top
    }, scrollTime, "swing", function () {
      window.location.hash = target;
    });
  });

  /*************/
  /*** TABS  ***/
  /*************/    
  $('#tabs').show();
  $('#tabs .ttarea').hide();
  $('#tabs .ttarea:first').show();
  $('#tabs ul li:first').addClass('active');
  $('#tabs ul li a').click(function(){ 
    $('#tabs ul li').removeClass('active');
    $(this).parent().addClass('active'); 
    var currentTab = $(this).attr('href'); 
    $('#tabs .ttarea').hide();
    $(currentTab).show();
    return false;
  });

  /*******************/
  /*** SNP SELECT  ***/
  /*******************/
  $("ul.snplist li.snp").live("click", function() {
    $("div.chosensnp").hide().html( $(this).text() ).fadeIn()
      .css("background-color", "#eaeaea")
      .css("padding", "5px 8px 5px 8px")
      .css("font-family", "Helvetica")
      .css("font-weight:400");
    $("div.chosendesc").hide().html( $(this).next().text() ).fadeIn();

    // get snp id
    var snpId = $(this).text();
    //log('snpID', snpId);

    $.getJSON('/auth/genotype/'+ snpId +'/', function(data) {
      var items = [];

      log('data', data);

      $('div.ttcontent div').html("");

      $.each(data, function(key, value) {
        $('div.ttcontent div').hide().append('<tr>').fadeIn();
        $('div.ttcontent div').hide().append('<td><span class="darker">Profile ID</span>:&nbsp;</td><td>' + value.id + ' </td>').fadeIn();
        $('div.ttcontent div').hide().append('<td>&nbsp;&nbsp;<span class="darker">Result</span>:&nbsp;</td><td> ' + value[snpId] + ' </td>').fadeIn();
        $('div.ttcontent div').hide().append('</tr>').fadeIn();
      });
    });

    // build iframe on the fly
    $("div.sarea div.scontent").hide().html( 
      $('<iframe />', {
          id:   'sframe',
          width: '100%',
          height: '300',
          src: 'http://www.snpedia.com/index.php/' + snpId,
      }).appendTo('div.scontent')
    ).fadeIn();
  });

}); 

/******************************/
/*** DJANGO XSS PROTECTION ****/
/******************************/
/**
 *
Adding this to a javascript file that is included on your site will ensure that AJAX POST requests that are made via jQuery
will not be caught by the CSRF protection.

The above code could be simplified by using the jQuery cookie plugin to replace getCookie, and settings.crossDomain in jQuery 1.5
and later to replace sameOrigin.

In addition, if the CSRF cookie has not been sent to the client by use of csrf_token, you may need to ensure the client receives
the cookie by using ensure_csrf_cookie().
 *
 **/

$(document).ajaxSend(function(event, xhr, settings) {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    function sameOrigin(url) {
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }
    function safeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    if (!safeMethod(settings.type) && sameOrigin(settings.url)) {
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    }
});

/******************************/
/***** PLUGINS & HELPERS ******/
/******************************/
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
