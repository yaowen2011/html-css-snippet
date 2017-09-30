/**
 * Created by Administrator on 2017/7/30 0030.
 */
function showPlayList() {
    var ul = document.getElementById('playlist');
    var cachePlayList = getPlayList();
    // var li = document.createElement('li');
    for (var key in cachePlayList) {
        var li = document.createElement("li");
        li.innerHTML = cachePlayList[key];
        ul.appendChild(li);
    }
}


function setPlayList(songName) {
    var cachePlayList = getPlayList();
    cachePlayList.push(songName);

    const cacheKey = 'prefix_play_list';
    window.localStorage.setItem(cacheKey, window.JSON.stringify(cachePlayList));
}

function getPlayList() {
    const cacheKey = 'prefix_play_list';
    var cacheInfo = window.localStorage.getItem(cacheKey);
    if ( cacheInfo == null || cacheInfo=='') {
        cacheInfo = JSON.stringify([]);
    }

    return window.JSON.parse(cacheInfo);
}
