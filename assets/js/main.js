const tarefa = document.querySelector('.tarefas');
const novaTarefa = document.querySelector('.nova-tarefa');//input
const addTarefa = document.querySelector('.add-tarefa');//button

function criaLi() {
    const li = document.createElement('li');
    return li;
}

novaTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!novaTarefa.value) return;
        criaTarefa(novaTarefa.value);
    }
});

function limpaInput() {
    novaTarefa.value = '';
    novaTarefa.focus();
}

function criaBotaoAapagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'apagar esta tarefa');
    li.appendChild(botaoApagar);
}

function criaTarefa(texto) {
    const li = criaLi();
    li.innerText = texto;
    tarefa.appendChild(li);
    limpaInput();
    criaBotaoAapagar(li);
    salvarTarefas();
}

addTarefa.addEventListener('click', function() {
    if (!novaTarefa.value) return;
    criaTarefa(novaTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const liTarefas = tarefa.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefaJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefaJSON);
}

function addTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
addTarefasSalvas();