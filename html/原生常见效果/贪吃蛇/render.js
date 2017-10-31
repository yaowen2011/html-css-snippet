function Render() {
    //options = options || {};
    //this.map = options.map;
}

Render.draw = function (map, obj) {
    Render.destroy(map, obj);

    var cell = 20;
    for (var i = 0; i < obj.body.length; ++i) {
        var div = document.createElement('div');
        div.className = obj.className;
        map.appendChild(div);

        div.style.position = 'absolute';
        div.style.width = cell + 'px';
        div.style.height = cell + 'px';
        div.style.left = obj.body[i].x * cell + 'px';
        div.style.top = obj.body[i].y * cell + 'px';
        div.style.backgroundColor = obj.body[i].bgColor;
    }

}

Render.destroy = function (map, obj) {
    var divList = document.querySelectorAll('#map>div');
    for (var i = 0; i < divList.length; ++i) {
        if (divList[i].className === obj.className) {
            map.removeChild(divList[i]);
        }
    }
}