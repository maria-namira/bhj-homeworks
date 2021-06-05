const chatSide = document.querySelector('.chat-widget__side'),
    chat = document.querySelector('.chat-widget'),
    messages = document.getElementById('chat-widget__messages'),
    chatInput = document.getElementById('chat-widget__input'),
    chatContainer = document.querySelector('.chat-widget__messages-container'),
    bot = [
        'Где ваша совесть?',
        'Кто тут?',
        'К сожалению, все операторы сейчас заняты. Не пишите нам больше.',
        'Добрый день! До свидания!',
        'Вы не купили ни одного товара для того, чтобы так с нами разговаривать!',
        'Мы ничего не будем вам продавать!'
    ];
let ping = '';

chatSide.addEventListener('click', () => {
    chat.classList.toggle('chat-widget_active');
});

chatInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && chatInput.value != '') {
        messages.innerHTML += getMessage(chatInput.value, true);
        chatInput.value = '';

        messages.innerHTML += getMessage(bot[randomInteger(0, bot.length - 1)]); // случайное сообщение от бота

        chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.getBoundingClientRect().height; // автопрокрутка в конец сообщений.

        // вопрос от бота через 30 секунд
        if (ping !== '') {
            clearTimeout(ping);
        }
        ping = setTimeout(() => {
            messages.innerHTML += getMessage('Вы уже ушли?');
            chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.getBoundingClientRect().height;
        }, 30000);
    }
});


// функция для генерации кода сообщений
function getMessage(text, isClient = 0) {
    const now = new Date();
    return `<div class="message${isClient ? ' message_client' : ''}">
                <div class="message__time">${now.getHours() + ':' + now.getMinutes()}</div>
                <div class="message__text">
                    ${text}
                </div>
            </div>`;
}

// функция случайного числа
function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}