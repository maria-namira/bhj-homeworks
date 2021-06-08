const pollTitle = document.getElementById('poll__title'),
    pollAnswers = document.getElementById('poll__answers');

let xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
xhr.send();
xhr.addEventListener('readystatechange', () => {
    if (xhr.readyState === xhr.DONE && xhr.status == 200) {

        const ansXhr = JSON.parse(xhr.responseText);

        pollTitle.innerText = ansXhr.data.title;

        for (let answer in ansXhr.data.answers) {
            const ansElement = document.createElement('button');
            ansElement.className = 'poll__answer';
            ansElement.innerText = ansXhr.data.answers[answer];

            ansElement.addEventListener('click', () => {
                alert('Спасибо, ваш голос засчитан!');

                // отображение результатов
                xhr = new XMLHttpRequest();
                xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/poll.php');
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(`vote=${ansXhr.id}&answer=${answer}`);
                xhr.addEventListener('readystatechange', () => {
                    if (xhr.readyState === xhr.DONE && xhr.status == 200) {
                        const resXhr = JSON.parse(xhr.responseText);
                        const resSummary = Object.values(resXhr.stat).reduce((sum, item) => sum + item.votes, 0); // считаем сумму всех голосов

                        pollAnswers.innerHTML = ''; // убираем кнопки голосования
                        for (let result in resXhr.stat) {
                            pollAnswers.innerHTML += `<div>${resXhr.stat[result].answer}: <b>${(resXhr.stat[result].votes / resSummary * 100).toFixed(2)}%</b></div>`;
                        }
                    }
                });

            });

            pollAnswers.appendChild(ansElement);
        }
    }
});