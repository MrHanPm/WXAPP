function formatTime(time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  var hour = parseInt(time / 3600)
  time = time % 3600
  var minute = parseInt(time / 60)
  time = time % 60
  var second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}






/**
 * 获取当前日期对象
 * @returns {object}
 */
function getCurrentData() {
  var date = new Date();
  return {
    date: new Date(),
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.getDay()
  };
}







function isFunction( val ) {
  return typeof val === 'function';
}

/*-------------Form--------------*/
//验证手机号
function checkPhone(phone) {
    if(/^1[3|4|5|7|8]\d{9}$/.test(phone)) { return true } else { return false }
}
//是否有空
function isNo(txt) {
  if(txt.replace(/^\s\s*/, '').replace(/\s\s*$/, '').length === 0 || txt == '') { return false } else { return true }
}


module.exports = {
  formatTime: formatTime,
  getCurrentData: getCurrentData,
  isFunction: isFunction,
  checkPhone: checkPhone,
  isNo: isNo
}
