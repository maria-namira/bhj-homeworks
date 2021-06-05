const book = document.getElementById('book'),
    size = document.querySelectorAll('.book__control_font-size .font-size'),
    color = document.querySelectorAll('.book__control_color .color'),
    background = document.querySelectorAll('.book__control_background .color');

size.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        addClasses(item, 'font-size_active', 'book_fs', 'size');
    });
});

color.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        addClasses(item, 'color_active', 'book_color', 'textColor');
    });
});

background.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        addClasses(item, 'color_active', 'book_bg', 'bgColor');
    });
});

function addClasses(elem, activeClass, classPref, datasetName) {
    elem.parentElement.querySelector('.' + activeClass).classList.remove(activeClass); // меняем активный класс переключателя
    elem.classList.add(activeClass);

    const clearClasses = book.className.split(' ').filter(bookClass => bookClass.indexOf(classPref) != -1); // составляем массив из уже применённых аналогичных классов book
    clearClasses.forEach((clearClass) => book.classList.remove(clearClass)); // удаляем предыдущие аналогичные классы book

    const bookClass = elem.dataset[datasetName] ? classPref + '-' + elem.dataset[datasetName] : ''; // если dataset со стилем задан, то составляем из него название нового класса
    book.classList.add(bookClass);
}