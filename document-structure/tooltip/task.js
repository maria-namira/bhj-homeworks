const links = document.querySelectorAll('.has-tooltip');
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
tooltip.style.display = 'block';

// позиция подсказки
//tooltip.dataset.position = 'top';
//tooltip.dataset.position = 'right';
//tooltip.dataset.position = 'left';
tooltip.dataset.position = 'bottom';

[...links].forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        if (link.nextSibling.className === 'tooltip') {
            link.nextSibling.remove(); // отключаем если подсказка уже есть
        } else {
            tooltip.textContent = link.title;
            link.after(tooltip);

            if (tooltip.dataset.position === 'top') { // сверху
                tooltip.style.left = link.offsetLeft + 'px';
                tooltip.style.marginTop = -(link.offsetHeight + tooltip.offsetHeight) + 'px';
            } else if (tooltip.dataset.position === 'right') { // справа
                tooltip.style.left = link.offsetLeft + link.offsetWidth + 'px';
                tooltip.style.marginTop = -tooltip.offsetHeight + 'px';
            } else if (tooltip.dataset.position === 'left') { // слева
                tooltip.style.left = (link.offsetLeft - tooltip.offsetWidth) + 'px';
                tooltip.style.marginTop = -tooltip.offsetHeight + 'px';
            } else { // снизу или по умолчанию
                tooltip.style.left = link.offsetLeft + 'px';
            }
        }
    });
});