var p = function () {
    this.name = 'abc'
}
var s = function () {
    this.id = 1
}
s.prototype = new p()
var m = new s()
console.log(m.constructor)