$(function () {
    let selectYear = $("#year").val();
    let selectMonth = $("#month").val();
    console.log(selectMonth, selectYear);

    //生成select表单
    let option;
    for (let i = 1997; i <= 2037; i++) {
        option = document.createElement("option");
        option.innerText = i;
        option.value = i;
        $("#year").append(option);
    }

    // 标记今天
    let date = new Date();

    // 判断改变选择的对象是年还是月
    $("article").on("change", "#month, #year", function (event) {
        const value = this.value;
        if (value < 13)
            selectMonth = value;
        else selectYear = value;
        changeCalendar(selectYear, selectMonth)
    });

    //点击回到今天
    $("article").on("click", "#resetToday", function () {
        // $("#month").val(date.getMonth()+1);
        // $("#year").val(date.getFullYear());
        let date = new Date();

        backToday(date);
    })
    // 回到今天
    function backToday(date) {
        console.log(date, "date");
        $("#month").val(date.getMonth() + 1);
        $("#year").val(date.getFullYear());
        changeCalendar(date.getFullYear(), date.getMonth() + 1);
    }

    // 生成对应的日历
    function changeCalendar(selectYear, selectMonth) {
        console.log('entry');
        const dayInMon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let day, month, year, monthLength, date = new Date();


        day = date.getDate();
        month = (isNaN(selectMonth) || selectMonth === null) ? date.getMonth() : (selectMonth - 1);
        year = (isNaN(selectYear) || selectYear === null) ? date.getFullYear() : selectYear;
        // date = new Date(year, month, day+1);

        let firstDay = new Date(year, month, 1);        //获取当月的第一天
        let weekDay = firstDay.getDay();
        console.log(day, 'month', month, 'year', year, firstDay, weekDay);

        // 判断是否为闰年，计算二月的天数
        let judgeLength = (month) => {
            let monthLength = dayInMon[month];
            if (month === 1) {
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    return 29;
                }
            } else {
                return monthLength;
            }
        }
        //生成date对象用于记录
        function dateObject(day, month, year) {
            this.day = day;
            this.month = month;
            this.year = year;
        }

        //todo: 点击获得当天的年月日 someday();


        // 获取一个月日历中开始的日期
        let getStartDay = (preMonth, weekDay) => {
            let preMonthLength = judgeLength(preMonth);
            console.log(preMonthLength);
            if (weekDay === 0) weekDay = 7;
            //算出当前日历开始的日期
            let startDay = preMonthLength - weekDay + 2;
            // 用于校验日历当前的开始时间是否为周一
            let startDayDate = new Date(year, month - 1, startDay);
            let startDate = new dateObject(startDay, month - 1, year);
            if (startDayDate.getDay() === 1) {
                return startDate;
            } else {
                return error;
            }
        }

        let tr = document.querySelectorAll('tr');
        // 当前日历开始的日期
        let cellDate = getStartDay(month - 1, weekDay);
        console.log(tr, cellDate);
        let creatMonHtml = (cellDate, month, year) => {
            let currentTr, td;
            console.log("month", month, cellDate.month);
            for (let i = 1; i <= 6; i++) {
                currentTr = tr[i];
                currentTr.innerHTML = "";

                for (let j = 0; j <= 6; j++) {
                    td = $("<td></td>").text(cellDate.day);

                    //标记今天
                    let signToday = (cellDate) =>{
                        let date = new Date();
                        if ((cellDate.day == date.getDate()) && (cellDate.month == date.getMonth()) && (cellDate.year == date.getFullYear())) {
                            td.css("background-color", "white");
                        }
                    }
                    signToday(cellDate);
                    $(currentTr).append(td);
                    cellDate.day++;
                    // 判断是否为上个月的结尾
                    if ((cellDate.day > judgeLength(month - 1)) && (cellDate.month === month - 1)) {
                        cellDate.day = 1;
                        cellDate.month = month;
                    } else if ((cellDate.day > judgeLength(month)) && (cellDate.month === month)) {
                        cellDate.day = 1;
                        cellDate.month = month + 1;
                        console.log("for", cellDate);
                    }

                }
            }

        }
        creatMonHtml(cellDate, month, year);
    }

    changeCalendar(selectYear, selectMonth);

})