const editor = document.getElementById('editor');
const button = document.getElementById('clear');

editor.value = localStorage.getItem('editor');

editor.oninput = () => {
    localStorage.setItem('editor', editor.value)
};

button.onclick = function() {
    localStorage.removeItem('editor');
    editor.value = '';
}
