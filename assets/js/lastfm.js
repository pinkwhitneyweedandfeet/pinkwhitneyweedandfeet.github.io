const API_KEY = "a2a45f3b925019bd9fec7fdbe36bf272";
const USERNAME = "relaxedrealist";

function urlencode(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
}

$(document).ready(function () {
    function displayMusic() {
        $("#music").show()
    }

    function lastfmRequest(method, params) {
        params['api_key'] = API_KEY;
        params['format'] = "json";

        return fetch("https://ws.audioscrobbler.com/2.0/?method=" + method + "&" + urlencode(params) + "&format=json")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            });
    }

    function getImage(trackinfo) {
        return lastfmRequest("track.getInfo", { autocorrect: 1, track: trackinfo["name"], artist: trackinfo["artist"]["name"] })
            .then((data) => {
                    try {
                        return data.track.album.image[1]["#text"];
                    } catch(e) {
                        throw new Error("No image found")
                    }
                });
    }

    lastfmRequest("user.gettoptracks", { user: USERNAME, limit: "3", period: "7day" }).then((data) => {
        var html = '<h3 class="colorchanger">weekly tracks</h3>';
        $.each(data.toptracks.track, function (i, item) {
            const itemid = item.mbid + '-track';

            html += '<div class="music-row">';
            html += '<img id="' + itemid + '" src="' + item.image[1]["#text"] + '">';
            html += '<div><a href="' + item.url + '" target="_blank">' + item.name + '</a> - ' + item.artist['name'] + '</div></div>';

            getImage(item).then((img) => {
                $("#" + itemid).attr("src", img);
            });
        });
        displayMusic();
        $('#listening-to').append(html);
    });

    lastfmRequest("user.gettopalbums", { user: USERNAME, limit: "9", period: "7day" }).then((data) => {
        var html = '<h3 class="colorchanger">weekly 3x3</h3><div class="music-grid">';
        $.each(data.topalbums.album, function (i, item) {
            const itemid = item.mbid + '-album';

            html += '<div class="music-row">';
            html += '<a href="' + item.url + '" target="_blank"><img id="' + itemid + '" src="' + item.image[2]["#text"] + '"></a>';
            html += '<div><a href="' + item.url + '" target="_blank">' + item.name + '</a> - ' + item.artist['name'] + '</div></div>';
        });
        html += '</div>';
        displayMusic();
        $('#top-albums').append(html);
    });

    lastfmRequest("user.getrecenttracks", { user: USERNAME, limit: 4 }).then((data) => {
    console.log(data);

    var items = data.recenttracks.track;
    var isNowPlaying = items[0]["@attr"] && items[0]["@attr"].nowplaying;
    
    if (isNowPlaying) {
        const item = items[0];
        const itemid = item.mbid + '-nowplaying';

        let nowPlayingHtml = '<h3 class="colorchanger">now playing</h3>';
        nowPlayingHtml += '<div class="music-row">';
        nowPlayingHtml += '<img id="' + itemid + '" src="' + item.image[1]["#text"] + '">';
        nowPlayingHtml += '<div><a href="' + item.url + '" target="_blank">' + item.name + '</a> - ' + item.artist['#text'] + '</div></div>';

        $('#now-playing-section').html(nowPlayingHtml).show();

        getImage({ name: item["name"], artist: { name: item["artist"]["#text"] } }).then((img) => {
            $("#" + itemid).attr("src", img);
        });

        items = items.slice(1, 4);
    } else {
        items = items.slice(0, 3);
    }

    let html = '<h3 class="colorchanger">recents</h3>';
    
    items.forEach(function(item, index) {
        const itemid = item.mbid + '-recent-' + index;
        
        // Calculate time ago
        const scrobbleTime = item.date ? parseInt(item.date.uts) * 1000 : null;
        let timeAgo = '';
        if (scrobbleTime) {
            const now = Date.now();
            const diff = now - scrobbleTime;
            const minutes = Math.floor(diff / 60000);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            
            if (days > 0) timeAgo = days + 'd ago';
            else if (hours > 0) timeAgo = hours + 'h ago';
            else timeAgo = minutes + 'm ago';
        }

        html += '<div class="music-row">';
        html += '<img id="' + itemid + '" src="' + item.image[1]["#text"] + '">';
        html += '<div>';
        html += '<a href="' + item.url + '" target="_blank">' + item.name + '</a> - ' + item.artist['#text'];
        if (timeAgo) html += '<div style="color: var(--text-light); margin-top: 2px;">' + timeAgo + '</div>';
        html += '</div></div>';

        getImage({ name: item["name"], artist: { name: item["artist"]["#text"] } }).then((img) => {
            $("#" + itemid).attr("src", img);
        });
    });

    displayMusic();
    $('#currently-playing').append(html);
});
});