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
				
        li.appendChild(wrap);
        wrap.appendChild(thumb);
		wrap.appendChild(title);
		wrap.appendChild(duration);
        wrap.appendChild(clear1);
		li.appendChild(desc);
        li.appendChild(clear2);
		linkbox.appendChild(li);
    }
    
    $('.ui-link').click(function() {
        //return the parameter as a variable
        var param = this.href.split('=')[1];
        
        var wrap2 = document.createElement('div');
        var thumblink = document.createElement('a');
        var video = videos[this.id].thumbnail_medium;
        var vimeo = document.getElementById('vimeo');
        var thumbnail = document.createElement('img');
        var article = document.createElement('article');
        var v_title = document.createElement('h3');
        var v_duration = document.createElement('small');
        var v_desc = document.createElement('p');
        var social = document.createElement('div');
        var sm_vimeo = document.createElement('a');
        var sm_twitter = document.createElement('a');
        var sm_facebook = document.createElement('a');
       
        thumblink.setAttribute('href', videos[this.id].url);
        thumbnail.setAttribute('src', video);
        thumbnail.setAttribute('class', 'vid');
        wrap2.setAttribute('class', 'wrap');
        v_title.setAttribute('class', 'v-title');
        v_duration.setAttribute('class', 'v-duration');
        v_desc.setAttribute('class', 'v-desc');
        social.setAttribute('class', 'social');
        sm_vimeo.setAttribute('class', 'sm_vimeo');
        sm_twitter.setAttribute('class', 'sm_twitter');
        sm_facebook.setAttribute('class', 'sm_facebook');
        sm_vimeo.setAttribute('href', videos[this.id].url);
        sm_twitter.setAttribute('href', 'http://twitter.com/home?status=' + videos[this.id].title + '+' + videos[this.id].url);
        sm_facebook.setAttribute('href', 'http://www.facebook.com/share.php?u=' + videos[this.id].url + '&title=' + videos[this.id].title);
        
        vimeo.innerHTML = '';
        vimeo.appendChild(wrap2);
        
        wrap2.appendChild(thumblink);
        wrap2.appendChild(article);
        thumblink.appendChild(thumbnail);
        article.appendChild(v_title);
        article.appendChild(v_duration);
        article.appendChild(social);
        social.appendChild(sm_vimeo);
        social.appendChild(sm_twitter);
        social.appendChild(sm_facebook);
        vimeo.appendChild(v_desc);
       
        v_title.appendChild(document.createTextNode(videos[this.id].title));
		v_duration.appendChild(document.createTextNode(convertTime(videos[this.id].duration)));
        v_desc.appendChild(document.createTextNode(stripQuotes(videos[this.id].description)));
    });  
}

// Call init function when the page loads
window.onload = init;