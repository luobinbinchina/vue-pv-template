export default {
  timeFormat(time) {
    let _time = new Date(+time)
    let timeMonth = (_time.getMonth() + 1) > 9 ? (_time.getMonth() + 1) : ('0' + (_time.getMonth() + 1))
    let timeDate = _time.getDate() > 9 ? _time.getDate() : '0' + _time.getDate()
    let timeHours = _time.getHours() > 9 ? _time.getHours() : '0' + _time.getHours()
    let timeMinutes = _time.getMinutes() > 9 ? _time.getMinutes() : '0' + _time.getMinutes()
    return _time.getFullYear() + '.' + timeMonth + '.' + timeDate + ' ' + timeHours + ':' + timeMinutes
  }
}
