// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
//为 connection 事件注册一个监听器
eventEmitter.on('connection', function () {
    console.log('已连接');
});
//一秒后调用监听器
setTimeout(function () {
    eventEmitter.emit('connection');  //触发connection事件,监听器被调用
}, 1000);
// 使用 eventEmitter.once(eventName, listener) 可以注册最多可调用一次的监听器。 当事件被触发时，监听器会被注销，然后再调用
let n = 0;
eventEmitter.once('func',function(){
    console.log("触发" + ++n + "次"); 
})
eventEmitter.emit('func');
eventEmitter.emit('func');
