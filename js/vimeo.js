var vimeoUserName = 'wccctv',
	vimeoChannelName = '380729',
	callback = 'showThumbs',
	url = 'http://vimeo.com/api/v2/channel/' + vimeoChannelName + '/videos.json?callback=' + callback;

function init() {
	$('head').append('<script src="'+url+'"></script>');
}

// Iterates through the videos and adds them to the page
function showThumbs(videos) {
	var thumbs = $('#thumbs');
	$(thumbs).html('');
	
	//Convert duration to min:sec format
	function convertTime(duration) { 
		var v_minutes = parseInt(duration / 60, 10) % 60;
		var v_seconds = duration % 60;
		var v_playtime = (v_minutes < 10 ? "0" + v_minutes : v_minutes) + ":" + (v_seconds < 10 ? "0" + v_seconds : v_seconds);
		return v_playtime;
	}
	
	//strip quotes from strings
	function stripQuotes(str) {
		return (str=str.replace('<br/>',''));
	}
  
	for (var i = 0; i < videos.length; i++) {
		$(thumbs).append(
			'<li>'+
				'<a href="#video?id=' + videos[i].id + '" class="ui-link" id="'+i+'">'+
					'<div class="wrap">'+
						'<img src="'+videos[i].thumbnail_medium+'" alt="'+videos[i].title+'" title="'+videos[i].title+'" class="thumb-img">'+
						'<h1 class="thumb-title">'+videos[i].title+'</h1>'+
						'<small class="thumb-duration">'+convertTime(videos[i].duration)+'</small>'+
						'<div class="cl"></div>'+
					'</div>'+
					'<p class="thumb-desc">'+stripQuotes(videos[i].description)+'</p>'+
					'<div class="cl"></div>'+
				'</a>'+
			'</li>'
		);
	}

	$('.ui-link').on('click', function() {
		//return the parameter as a variable
		var param = this.href.split('=')[1];

		/* Poplate Video and info */
		$('#vimeo').html("").append(
		'<div class="wrap">'+
		'<iframe src="http://player.vimeo.com/video/'+ videos[this.id].id +'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;color=ffffff" class="vimeo-iframe" color="ffffff" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'+
		'<article><h3 class="v-title">'+videos[this.id].title+'</h3>'+
		'<small class="v-duration">'+convertTime(videos[this.id].duration)+'</small>'+
		'<div class="social">'+
		'<a href="'+videos[this.id].url+'" class="sm_vimeo external"></a>'+
		'<a href="http://twitter.com/home?status=' + videos[this.id].title + '+' + videos[this.id].url + '" class="sm_twitter external"></a>'+
		'<a href="http://www.facebook.com/share.php?u=' + videos[this.id].url + '&title=' + videos[this.id].title + '" class="sm_facebook external"></a>'+
		'</div></article></div>'+
		'<p class="v-desc">'+stripQuotes(videos[this.id].description)+'</p>');
			
		$(document).ready(function(){
			var ratio = 2.1;
			var outerwidth = $('#video').width();
			var livewidth = $('#live-player').width();
			$('.vimeo-iframe').attr("height", outerwidth/ratio);
			$('#live-player').attr("height", livewidth/ratio);
		});
	});  
}

$(document).on('pageshow', '#live',  function(){
	var ratio = 2.1;
	var livewidth = $('#live').width();
	$('#live-player').attr("height", livewidth/ratio);
});

$(document).on('click', ".external", function (e) {
    e.preventDefault();
    var targetURL = $(this).attr("href");
    window.open(targetURL, "_system");
});

window.onload = init;