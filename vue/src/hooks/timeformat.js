const timeformatstande = function (str) {
    return str.substring(0, 4) + '年' + str.substring(5, 7) + '月' + str.substring(8, 10) + '日'
}
const timeformat = function (timestr) {
    let str = ''
    // let year = Number(timestr.substring(0, 4)),
    //     month = Number(timestr.substring(5, 7)),
    //     day = Number(timestr.substring(8, 10)),
    //     hour = Number(timestr.substring(11, 13)),
    //     mint = Number(timestr.substring(14, 16)),
    //     sec = Number(timestr.substring(17, 19));
    // console.log(year, month, day, hour, mint, sec)

    //当前时间 2023 7 20
    let second1 = new Date(timestr).getTime().toString().substring(0,10)-0
    let second2 = new Date().getTime().toString().substring(0,10)-0;
    let time = (second2- second1)
    // console.log('time:',second2,second1,time)
    // let y = date.getFullYear();
    // let m = date.getMonth() + 1;
    // let d = date.getDate();
    // let h = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();
    if(time<60){
        str = '刚刚'
    }else{
        if(time<3600){
            str = Math.floor(time/60) +'分钟前'
        }else{
            if(time<3600*24){
                str = Math.floor(time/3600) +'小时前'
            }else{
                if(time<3600*24*30){
                    str = Math.floor(time/(3600*24)) +'天前'
                }else{
                    if(time<3600*24*365){
                        str = Math.floor(time/(3600*24*30)) +'个月前'
                    }else{
                        str = Math.floor(time/(3600*24*365)) +'年前'
                    }
                }
            }
        }
    }
    // if (y > year) {
    //     str = (y - year) + '年前'
    // } else if (y == year) {
    //     if (m > month) {
    //         str = (m - month) + '个月前'
    //     } else if (m == month) {
    //         if (d > day){
    //             str = (d-day)+'天前'
    //         }else if(d==day){
    //             if(h>hour){
    //                 str = (h-hour)+'小时前'
    //             }else if(h==hour){
    //                 if(minute>mint){
    //                     str = (minute - mint) + '分钟前'
    //                 }else if(minute == mint){
    //                     if(second>=sec){
    //                         str = '刚刚'
    //                     }else{
    //                         str = null
    //                     }
    //                 }else{
    //                     str = null
    //                 }
    //             }else{
    //                 str = null
    //             }
    //         }else{
    //             str = null
    //         }
    //     } else {
    //         str = null
    //     }
    // } else {
    //     str = null
    // }

    return str
}

export {
    timeformatstande,
    timeformat
}