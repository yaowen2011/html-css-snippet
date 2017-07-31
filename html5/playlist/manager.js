/**
 * Created by Administrator on 2017/7/30 0030.
 */

var worker2 = new Worker("worker.js");
var worker3 = new Worker("worker.js");

window.onload = function() {
    var worker = new Worker("worker.js");
    worker.postMessage("ping");
    worker.onmessage = function(event) {
        var message = "Worker says " + event.data;
    }
}
