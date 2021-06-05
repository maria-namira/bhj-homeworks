const cases = document.querySelectorAll('.rotator .rotator__case');

function changeCase(count) { // функция с рекурсией, чтобы сделать бесконечный цикл
    cases[count].style.color = cases[count].dataset.color; // меняем цвет надписи по data-color

    timer = setInterval(() => {
        cases[count].classList.remove('rotator__case_active');

        count = (count >= cases.length - 1) ? 0 : ++count; // считаем от 0 до длины массива

        cases[count].classList.add('rotator__case_active');

        clearInterval(timer);
        changeCase(count); // рекурсия

    }, cases[count].dataset.speed); // скорость зависит от аттрибута data-speed
}

changeCase(0);