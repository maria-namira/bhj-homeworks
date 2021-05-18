let time = document.getElementById('timer');
let inter = setInterval(() => {
    if (time.textContent == '00:00:00') {
        alert('Вы победили в конкурсе!');
        clearInterval(inter);
    } else {
        let hour = time.textContent[0] + time.textContent[1];
        let min = time.textContent[3] + time.textContent[4];
        let sec = time.textContent[6] + time.textContent[7];
        while(true) {
            if (sec == '00') {
                if (min == '00') {
                    hour = hour - 1;
                    min = '59';
                    sec = '59';
                    break;
                }
                min = min - 1;
                sec = '59';
                break;
            }
            sec = sec - 1;
            break;
        }
        if (sec.toString().length == 1) {
            sec = '0' + sec;
        }
        if (min.toString().length == 1) {
            min = '0' + min;
        }
        if (hour.toString().length == 1) {
            hour = '0' + hour;
        }

        time.textContent = `${hour}:${min}:${sec}`;
    }
}, 1000);