/**
 * @file EventSystem.js
 * @desc 全局事件系统
 * @author 全局事件系统，不同模块间的交互
 * */
const EventSystem = {
    queue: {},
    // 触发事件
    evoke: function (event, data, key) {
        var queue = this.queue[event];
        if (typeof queue === 'undefined') {
            return false;
        }

        if (queue instanceof Object) {
            if(key==undefined){
                for (var i in queue){
                    queue[i]&&queue[i](data);
                }
            }
            else {
                queue[key]&&queue[key](data);
            }
        }

        return true;
    },
    // 注册事件，必须带有key值
    register: function (event, callback, key) {
        if (typeof this.queue[event] === 'undefined') {
            this.queue[event] = {};
        }
        this.queue[event][key] = callback;
    },
    // 注销事件，注销对应事件名称下对应key值的事件处理函数
    unRegister: function (event, key) {
        var queue = this.queue[event];
        if (queue) {
            delete queue[key];
        }
    }
};
module.exports = EventSystem;
