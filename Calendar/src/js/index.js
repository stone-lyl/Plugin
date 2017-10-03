$(function () {
    let selectYear = $("#year").val();
    let selectMonth = $("#month").val(); 
    console.log(selectMonth, selectYear);
    let option;
    for(let i = 1997 ; i <= 2037; i++){
        console.log(i);
        option = document.createElement("option");
        option.innerText = i;
        option.value = i;
        $("#year").append(option);
    }
  

    $(document).on("change","#month, #year", function (event) {
        const value = this.value;
        if(value < 13 )
        selectMonth = value;
        else selectYear = value;
        changeCalendar(selectYear, selectMonth)
    })

    function changeCalendar(selectYear, selectMonth) {
        console.log('entry');
        const dayInMon = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let day, month, year, monthLength, date = new Date();
        day = date.getDate();
        month = (isNaN(selectMonth) || selectMonth === null) ? date.getMonth() : (selectMonth -1);
        year = (isNaN(selectYear) || selectYear ===null ) ? date.getFullYear() : selectYear;
        date = new Date(year, month, day);        
        let firstDay = new Date(year, month, 1);
        let weekDay = firstDay.getDay();
        console.log(date, day,'month', month, 'year', year, firstDay, weekDay);
    
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
    
        let getStartDay = (preMonth, weekDay) => {
            let preMonthLength = judgeLength(preMonth);
            console.log(preMonthLength);
            if (weekDay === 0) weekDay = 7;
            let startDay = preMonthLength - weekDay + 2;
            // 用于校验日历当前的开始时间是否为周一
            let startDayDate = new Date(year, month - 1, startDay);
            if (startDayDate.getDay() === 1) {
                return startDay;
            } else {
                return error;
            }
        }
    
        let MonStartDay = getStartDay(month - 1, weekDay);
        console.log(MonStartDay);
        let tr = document.querySelectorAll('tr');
        let cellDay = MonStartDay;
        console.log(tr);
        let creatMonHtml = (cellDay, month) => {
            let currentTr, td, judgeMon = false;
            for (let i = 1; i <= 6; i++) {
                currentTr = tr[i];
                currentTr.innerHTML = "";
    
                for (let j = 0; j <= 6; j++) {
                    td = $("<td></td>").text(cellDay);
                    $(currentTr).append(td);
                    cellDay++;
    
                    // 判断是否为上个月的结尾
                    if ( (cellDay > judgeLength(month - 1)) && (!judgeMon)) {
                        cellDay = 1;
                        judgeMon = true;
                    }else if( (cellDay > judgeLength(month)) && judgeMon ){
                        cellDay = 1;
                    }
    
                }
            }
    
        }
        creatMonHtml(cellDay, month);
    }
   
    changeCalendar( selectYear, selectMonth);

})