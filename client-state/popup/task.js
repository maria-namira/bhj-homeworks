const modal = document.getElementById('subscribe-modal');
const close = document.querySelector('.modal__close');

function subscribe() {
    modal.classList.toggle('modal_active');
    close.onclick = function() {
    document.cookie = 'user=' + encodeURIComponent('closed');
    console.log(document.cookie);
    modal.classList.toggle('modal_active');
      }
}

const getCookie = (name) => {
const value = "; " + document.cookie;
let parts = value.split("; " + name + "=");
if (parts.length === 2) {
  return parts
  .pop()
  .split(";")
  .shift();
  }
}

window.onload = function() {
if (getCookie('user')) {
  return
} else {
  subscribe();
  }
}