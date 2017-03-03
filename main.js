// http://sinonjs.org/
var sinon = require('sinon');

console.log('sinon practice');

//-----------------------------------
// Spy
//-----------------------------------
// test function
function once(func) {
    var returnValue, called = false;
    return function() {
        if (!called) {
            called = true;
            returnValue = func.apply(this, arguments);
        }
        return returnValue;
    };
}

// called or not

var callback = sinon.spy();
var proxy = once(callback);

proxy();

console.log(callback.called);


// call count

callback = sinon.spy();
proxy = once(callback);

proxy();
proxy();

console.log(callback.calledOnce);
if (callback.callCount === 1) {
    console.log('callback.callCount = 1');
}


// this value and arguments

callback = sinon.spy();
proxy = once(callback);
var obj = {};

proxy.call(obj, 1, 2, 3);

console.log(callback.calledOn(obj));
console.log(callback.calledWith(1, 2, 3));


//-----------------------------------
// Stub
//-----------------------------------
// test function
function once2(func) {
    return 5;
}

var callback2 = sinon.stub().returns(42);
var proxy2 = once(callback2);

if (proxy2() === 42) {
    console.log('proxy2() == 42');
}