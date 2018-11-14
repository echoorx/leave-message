const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// const myFormatTime = (timeStamp) => {
//   var date = new Date(timeStamp);
//   var Y = date.getFullYear() + '-';
//   var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//   var D = date.getDate() + ' ';
//   var h = date.getHours() + ':';
//   var m = date.getMinutes() + ':';
//   var s = date.getSeconds();
//   return Y + M + D + h + m + s;
// }

const myFormatTime = (dateTimeStamp) => {   
  var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60;
  var day = hour * 24;
  var week = day * 7;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();   //获取当前时间毫秒
  var diffValue = now - dateTimeStamp;//时间差
  var result
  if (diffValue < 0) {
    return;
  }
  var minC = diffValue / minute;  //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour;
  var dayC = diffValue / day;
  var weekC = diffValue / week;
  var monthC = diffValue / month;
  // console.log(now,'now')
  // console.log(dateTimeStamp,'dateTimeStamp')
  // console.log(diffValue, 'diffValue')
  // console.log(minC, 'minC')
  // console.log(hourC,'hourC')
  if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else if (minC >= 1 && minC <= 59) {
    result = " " + parseInt(minC) + "分钟前"
  } else if (hourC >= 1 && hourC <= 23) {
    result = " " + parseInt(hourC) + "小时前"
  }else {
    var datetime = new Date();
    datetime.setTime(dateTimeStamp);
    var Nyear = datetime.getFullYear();
    var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    result = Nyear + "-" + Nmonth + "-" + Ndate + " " + Nhour + ":" + Nminute + ":" + Nsecond
  }
  return result;
}
module.exports = {
  formatTime: formatTime,
  myFormatTime
}
