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
var callback2 = sinon.stub().returns(42);
var proxy2 = once(callback2);

if (proxy2() === 42) {
    console.log('proxy2() == 42');
}


//===================================
// sandbox
//===================================
class Klass {
    constructor() {
        console.log('Klass.constructor');
    }

    func(args) {
        return args;
    }

    func2(args) {
        return args;
    }
};

//-----------------------------------
// Spy
//-----------------------------------
global.sandbox = sinon.sandbox.create(); // create sandbox
var klass_ = new Klass();

sandbox.spy(klass_, 'func');
klass_.func();
console.log('sandbox-spy', klass_.func.calledOnce);

sandbox.restore(); // restore sandbox

//-----------------------------------
// Stub
//-----------------------------------
global.sandbox = sinon.sandbox.create(); // create sandbox
var klass_ = new Klass();

sandbox.stub(klass_, 'func', () => {
    console.log('sandbox-stub-func');
});
klass_.func();
// sinon.assert.calledOnce(klass_.func);
console.log('sandbox-stub-func', klass_.func.called);

sandbox.stub(klass_, 'func2', (args) => {
    console.log('sandbox-stub-func2');
    const { param0, param1 } = JSON.parse(args);
    console.log('sandbox-stub-func2 - 0');
    console.log(param0 === 'param0' ? 'param0 === \'param0\'' : 'param0 !== \'param0\'');
    console.log(param1 === 'param1' ? 'param1 === \'param1\'' : 'param1 !== \'param1\'');
});
klass_.func2(JSON.stringify({ param0: 'param0', param1: 'paramX' }));
console.log('sandbox-stub-func2', klass_.func2.called);

sandbox.restore(); // restore sandbox