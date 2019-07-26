function times(date) {
    // var date = new Date()
    // setInterval(function () {
    //     date = new Date()
    // }, 100)
    function dates() {
        var atime = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + (date.getDate() + '日')
        return atime
    }
    function newtime() {
        var btime = date.getHours() + '时' + date.getMinutes() + '分' + date.getSeconds() + '秒';
        return btime
    }

    var dateTime = {
    year: date.getFullYear(),
    month: date.getFullYear() + '年' + (date.getMonth() + 1) + '月',
    day: dates(),
    hour: newtime(),
    minute:date.getMinutes() + '分',
    second: dates() + '' + newtime()
    }


    return dateTime
}

module.exports = {
    times
};