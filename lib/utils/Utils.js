/**
 * @file 一些常用的函数工具
 * @author luyongfang
 **/
const Utils = {
    array_diff: function (array1, array2) {
        // 在数组1中但不在数组2中
        var o = {};
        var res = [];
        for (var i in array2) {
            o[array2[i]] = true;
        }
        for (var j in array1) {
            if (!o[array1[j]]) {
                res.push(array1[j]);
            }
        }
        return res;
    },
    array_intersect: function (array1, array2) {
        var res1 = this.array_diff(array1, array2);
        var res2 = this.array_diff(array2, array1);
        return this.array_diff(array1.concat(res2), res1.concat(res2));
    },
    array_intersect_multi: function () {
        // 二维数组
        var twoDimenArray = arguments[0];
        var interArray = [];
        for (var i = 0, len = twoDimenArray.length; i < len - 1; i++) {
            var interArray = this.array_intersect(twoDimenArray[i], twoDimenArray[i + 1]);
            twoDimenArray[i + 1] = interArray;
        }
        return interArray;
    },
    cloneObj: function (obj) {
        // 不适合对象中属性值为函数的情况,深拷贝，复制变量值()
        var str;
        var newObj = obj.constructor === Array ? [] : {};
        if (typeof obj !== 'object') {
            return;
        }else if (window.JSON) {
            str = JSON.stringify(obj);
            newObj = JSON.parse(str);
        }else {
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    newObj[i] = typeof obj[i] === 'object' ? Utils.cloneObj(obj[i]) : obj[i];
                }
            }
        }
        return newObj;
    },
    createMarkup: function (htmlString) {
        return {
            __html: htmlString
        };
    }
};
module.exports =  Utils;
