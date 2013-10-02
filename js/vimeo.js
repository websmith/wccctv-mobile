var vimeoUserName = 'wccctv';
var vimeoChannelName = '380729';

// Tell Vimeo what function to call
var callback = 'showThumbs';

// Set up the URLs
var url = 'http://vimeo.com/api/v2/channel/' + vimeoChannelName + '/videos.json?callback=' + callback;

// This function loads the data from Vimeo
function init() {
    var js = document.createElement('script');
    js.setAttribute('src', url);
	document.getElementsByTagName('head').item(0).appendChild(js);
}

// This function goes through the clips and puts them on the page
function showThumbs(videos) {
	var thumbs = document.getElementById('thumbs');
	thumbs.innerHTML = '';
    
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
        var thumb = document.createElement('img');
        var wrap = document.createElement('div');
        var title = document.createElement('h1');
        var duration = document.createElement('small');
        var clear1 = document.createElement('div');
        var desc = document.createElement('p');
        var clear2 = document.createElement('div');
        var linkbox = document.createElement('a');
        var li = document.createElement('li');
        
        wrap.setAttribute('class', 'wrap');
        title.appendChild(document.createTextNode(videos[i].title));
        title.setAttribute('class', 'thumb-title');
        duration.appendChild(document.createTextNode(convertTime(videos[i].duration)));
        duration.setAttribute('class', 'thumb-duration');
        clear1.setAttribute('class', 'cl');
        desc.appendChild(document.createTextNode(stripQuotes(videos[i].description)));
        desc.setAttribute('class', 'thumb-desc');
        clear2.setAttribute('class', 'cl');
        linkbox.setAttribute('href', '#video?id=' + videos[i].id);
        linkbox.setAttribute('class', 'ui-link');
        linkbox.setAttribute('id', i);
		thumbs.appendChild(linkbox);
        
		thumb.setAttribute('src', videos[i].thumbnail_medium);
		thumb.setAttribute('alt', videos[i].title);
		thumb.setAttribute('title', videos[i].title);
        thumb.setAttribute('class', 'thumb-img');
				
        wrap.appendChild(thumb);
		wrap.appendChild(title);
		wrap.appendChild(duration);
        wrap.appendChild(clear1);
		thumbs.appendChild(li);
		li.appendChild(linkbox);
		linkbox.appendChild(wrap);
		linkbox.appendChild(desc);
		linkbox.appendChild(clear2);
    }

    $('.ui-link').on('click', function() {
        //return the parameter as a variable
        var param = this.href.split('=')[1];

		/* Poplate Video */
		$('#vimeo').html("").append(
		'<div class="wrap">'+
		'<iframe src="http://player.vimeo.com/video/'+ videos[this.id].id +'?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=0&amp;color=ffffff" class="vimeo-iframe" color="ffffff" width="100%" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>'+
		'<article><h3 class="v-title">'+videos[this.id].title+'</h3>'+
		'<small class="v-duration">'+convertTime(videos[this.id].duration)+'</small>'+
		'<div class="social">'+
		'<a href="'+videos[this.id].url+'" class="sm_vimeo"></a>'+
		'<a href="http://twitter.com/home?status=' + videos[this.id].title + '+' + videos[this.id].url + '" class="sm_twitter"></a>'+
		'<a href="http://www.facebook.com/share.php?u=' + videos[this.id].url + '&title=' + videos[this.id].title + '" class="sm_facebook"></a>'+
		'</div></article></div>'+
		'<p class="v-desc">'+stripQuotes(videos[this.id].description)+'</p>');
			
		$(document).ready(function(){
			var ratio = 2.1;
			var outerwidth = $('#video').width();
			$('.vimeo-iframe').attr("height", outerwidth/ratio);
		});
	});  
}

// Call init function when the page loads
window.onload = init;