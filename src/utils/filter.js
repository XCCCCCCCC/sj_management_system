// import Vue from 'vue'
/* eslint-disable eqeqeq*/
import axios from 'axios';
const _axios = axios.create();
_axios.defaults.timeout = 10000;
const dateFormat = function(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    if (typeof date === 'number' || Number(date) == date) {
        date = new Date(Number(date));
    }
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};

function formatNumber(intInput) {
    // 将输入参数转换为字符串形式
    let strInput = Math.abs(intInput).toString();
    // 如果有小数，把小数部分提取出来
    let strXS = '';
    if (strInput.indexOf('.', 0) != -1) {
        strXS = strInput.substring(strInput.split('.')[0].length, strInput.length);
        strInput = strInput.split('.')[0];
    }
    // 获取输入参数的长度
    const iLen = strInput.length;
    // 如果输入参数的长度小于等于3，则直接返回
    // 否则，再进行处理
    if (iLen <= 3) {
        return intInput;
    } else {
        // 首先取模，以作为起始点，每3位截取一次存入数组，最后再进行拼接返回
        const iMod = iLen % 3;
        // 每3位截取的起始点
        let iStart = iMod;
        // 每3位截取的存储数组
        let aryReturn = [];

        // 循环处理：每3位截取一次 存储到数组
        while (iStart + 3 <= iLen) {
            aryReturn[aryReturn.length] = strInput.substring(iStart, iStart + 3);
            iStart = iStart + 3;
        }
        // 将数组中的数据连接起来
        aryReturn = aryReturn.join(',');

        // 处理输入参数长度不是3的倍数的情况
        if (iMod != 0) {
            aryReturn = strInput.substring(0, iMod) + ',' + aryReturn;
        }
        // 处理负数的情况
        if (intInput < 0) {
            aryReturn = '-' + aryReturn;
        }

        return aryReturn + strXS;
    }
}

function ruleNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000) % 1 === 0 ? number / 1000000000 + 'B' : (number / 1000000000).toFixed(1) + 'B';
    } else if (number >= 1000000) {
        return (number / 1000000) % 1 === 0 ? number / 1000000 + 'M' : (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000) % 1 === 0 ? number / 1000 + 'K' : (number / 1000).toFixed(1) + 'K';
    } else if (number > 0 <= 1) {
        return number;
    } else {
        return Math.floor(number);
    }
}
function tranNumber(num) {
    const numStr = num.toString();
    // 十万以内直接返回
    if (numStr.length < 6) {
        // let decimal = numStr.substring(
        //   numStr.length - 4
        // );
        return formatNumber(num);
        // return (parseFloat(parseInt(num / 10000))).toFixed(2) + "万";
    } else if (numStr.length > 8) {
        // 大于8位数是亿
        // let decimal = numStr.substring(
        //   numStr.length - 8,
        //   numStr.length - 8 + point
        // );
        const decimal = numStr.substring(numStr.length - 8);
        return parseFloat(parseInt(num / 100000000) + '.' + decimal).toFixed(2) + '亿';
    } else if (numStr.length > 5) {
        // 大于6位数是十万 (以10W分割 10W以下全部显示)
        const decimal = numStr.substring(numStr.length - 4);
        return parseFloat(parseInt(num / 10000) + '.' + decimal).toFixed(2) + '万';
    }
}

function accMul(arg1, arg2) {
    // 解决乘法精确位数 问题 0.55*100 = 55.00000000000001
    if (isNaN(arg1)) {
        return arg1;
    }
    let m = 0;
    const s1 = arg1.toString();
    const s2 = arg2.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {}
    try {
        m += s2.split('.')[1].length;
    } catch (e) {}
    return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
}
function accDiv(arg1, arg2) {
    // 解决除法精确位数 问题 0.55/100
    let t1 = 0;
    let t2 = 0;
    let r1;
    let r2;
    try {
        t1 = arg1.toString().split('.')[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split('.')[1].length;
    } catch (e) {}
    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

function initRule(data, rate) {
    if (data === 0) {
        return 0;
    }
    if (!data) {
        return '';
    }
    const a = rate || 0.8;
    const b = 1 - a;
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const second = date.getSeconds();
    const _min = hour * 60;
    const totalSecond = (_min + min) * 60 + second;
    return parseInt(data * a + ((data * b) / (24 * 3600)) * totalSecond + ((data * b) / (24 * 3600)) * 3 * Math.random());
}
function compare(prop, type) {
    return function(a, b) {
        const value1 = a[prop];
        const value2 = b[prop];
        if (type) {
            return value1 - value2;
        }
        return value2 - value1;
    };
}

function isLogin() {
    // console.log(document.cookie);
    const expireTime = localStorage.getItem('expireTime');
    if (!expireTime) {
        return false;
    }
    if (Date.parse(new Date()) > expireTime) {
        return false;
    }
    return true;
}
// 写cookies

function setCookie(name, value) {
    const exp = new Date();
    exp.setTime(exp.getTime() + 12 * 60 * 60 * 1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}

// 读取cookies
function getCookie(name) {
    let arr;
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
}

// 删除cookies
function delCookie(name) {
    const exp = new Date();
    exp.setTime(exp.getTime() - 1);
    const cval = getCookie(name);
    if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
}

// 区分vip描述名称
function getVipName() {
    switch (sessionStorage.getItem('plateId')) {
        case 'byl':
            return 'VIP会员';
        case 'jhq':
            return '认证会员';
        default:
            return 'VIP会员';
    }
}

// 下载
function axiosDownload(url) {
    _axios({
        url,
        method: 'GET',
        responseType: 'blob' // important
    }).then(data => {
        const dom = document.createElement('a');
        dom.href = window.URL.createObjectURL(new Blob([data]));
        dom.setAttribute('download', url.match(/[^/]+$/));
        document.body.appendChild(dom);
        dom.click();
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
            document.body.removeChild(dom);
        }, 0);
    });
}
export {
    dateFormat,
    formatNumber,
    ruleNumber,
    tranNumber,
    accMul,
    accDiv,
    initRule,
    compare,
    isLogin,
    setCookie,
    getCookie,
    delCookie,
    getVipName,
    axiosDownload
};
