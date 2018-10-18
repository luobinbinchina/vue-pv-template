export default {
  timeFormat(time) {
    let _time = new Date(+time),
        timeMonth = (_time.getMonth() + 1) > 9 ? (_time.getMonth() + 1) : ('0' + (_time.getMonth() + 1)),
        timeDate = _time.getDate() > 9 ? _time.getDate() : '0' + _time.getDate(),
        timeHours = _time.getHours() > 9 ? _time.getHours() : '0' + _time.getHours(),
        timeMinutes = _time.getMinutes() > 9 ? _time.getMinutes() : '0' + _time.getMinutes(),
        timeSeconds = _time.getSeconds() > 9 ? _time.getSeconds() : '0' + _time.getSeconds()
    return _time.getFullYear() + '-' + timeMonth + '-' + timeDate + ' ' + timeHours + ':' + timeMinutes + ':' + timeSeconds
  }
}
