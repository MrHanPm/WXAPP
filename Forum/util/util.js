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
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
const zerofill = val => val >= 10 ? val : '0' + val
/* 相当于：
  var zerofill = function (val) {
    return val >=10 ? val : '0' + val
  };
*/

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型
 * @return {String}
 */
function dataTimeFormatter (time, type) {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  
  switch (type) {
    case 0: // 01秒
      return `${zerofill(second)}`
    case 1: // 01分
      return `${zerofill(minutes)}`
    case 2: // 01时
      return `${zerofill(hours)}`
    case 3: // 01-05
      return `${zerofill(month)}-${zerofill(day)}`
    case 4: // 11:12
      return `${zerofill(hours)}:${zerofill(minutes)}`
    case 5: // 11时12分33秒
      return `${zerofill(hours)}时${zerofill(minutes)}分${zerofill(second)}秒`
    case 6: // 2015-01-05
      return `${year}-${zerofill(month)}-${zerofill(day)}`
    case 11: // 2015年01月05日
      return `${year}年${zerofill(month)}月${zerofill(day)}日`
    case 9: // 2015年01月
      return `${year}年${zerofill(month)}月`
    case 7: // 2015-01-05 11:12
      return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}`
    case 8: // 08月31日12:22
      return `${zerofill(month)}月${zerofill(day)}日${zerofill(hours)}:${zerofill(minutes)}`
    case 10: // 08-31 12:22
      return `${zerofill(month)}-${zerofill(day)} ${zerofill(hours)}:${zerofill(minutes)}`
    default: // 2015-01-05 11:12:13
      return `${year}-${zerofill(month)}-${zerofill(day)}  ${zerofill(hours)}:${zerofill(minutes)}:${zerofill(second)}`
  }
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
  dataTimeFormatter: dataTimeFormatter,
  formatTime: formatTime,
  getCurrentData: getCurrentData,
  isFunction: isFunction,
  checkPhone: checkPhone,
  isNo: isNo
}
