function Range(from, to) {
    this.from = from;
    this.to = to;
}
Range.prototype.foreach = function(f) {
    for(var x=this.from; x<=this.to; ++x) {
       f(x);
    }
}

var r = new Range(1, 3);
r.foreach(console.log);