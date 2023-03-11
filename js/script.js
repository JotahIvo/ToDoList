const formAddItem = document.getElementById('form');
const listaDeTarefas = document.getElementById('secao-to-do-list');
const formEdicao = document.getElementById('form-edicao');
const botaoCancelarEdicao = document.getElementById('botao-cancelar'); 
const inputEditado = document.getElementById('editar-input');
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let inputAntigo;

//atualiza a tela com os elementos já no local storage
tarefas.forEach((tarefa) => {
    criarElementoDaLista(tarefa);
});

//evento do submit principal, onde adiciona tarefas
formAddItem.addEventListener('submit', (event) =>{
    event.preventDefault();

    let descricaoTarefa = event.target.elements['tarefa'];

    const itemAtual = {
        texto: descricaoTarefa.value,
        classe: 'nao-feito'
    };

    criarElementoDaLista(itemAtual);

    if(itemAtual.texto != '') tarefas.push(itemAtual);

    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    descricaoTarefa.value = "";
    descricaoTarefa.focus();
});

//função que cria o elemento da lista
function criarElementoDaLista(objetoItemAtual){
    if(objetoItemAtual.texto === '') return;

    const novoItem = document.createElement('div');
    novoItem.classList.add('to-do-list');
    novoItem.classList.add(objetoItemAtual.classe);

    const paragrafoTexto = document.createElement('p');
    paragrafoTexto.innerText = objetoItemAtual.texto;
    novoItem.appendChild(paragrafoTexto);

    const botoes = document.createElement('div');
    botoes.classList.add('botoes-editar');

    const botaoFeito = document.createElement('button');
    botaoFeito.classList.add('botao-feito');
    botaoFeito.innerHTML += '<i class="fa-solid fa-check"></i>';
    botoes.appendChild(botaoFeito);

    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('botao-editar');
    botaoEditar.innerHTML += '<i class="fa-solid fa-pen"></i>';
    botoes.appendChild(botaoEditar);

    const botaoRemover = document.createElement('button');
    botaoRemover.classList.add('botao-remover');
    botaoRemover.innerHTML += '<i class="fa-solid fa-xmark"></i>';
    botoes.appendChild(botaoRemover);

    novoItem.appendChild(botoes);

    listaDeTarefas.appendChild(novoItem);
};

//evento que capta o aperto dos botões, usando uma forma mais geral por ter elementos inseridos dinamicamente
document.addEventListener('click', (event) => {
    const elementoClicado = event.target;
    const elementoPai = elementoClicado.parentNode.parentNode;
    let tituloDaTarefa;

    if(elementoPai && elementoPai.querySelector('p')){
        tituloDaTarefa = elementoPai.querySelector('p').innerText;
    };

    if(elementoClicado.classList.contains('botao-feito')){
        elementoPai.classList.toggle('feito'); 
        tituloDaTarefa = elementoPai.querySelector('p').innerText;

        tarefas.forEach(tarefa => {
            if(tarefa.texto === tituloDaTarefa && tarefa.classe === 'nao-feito'){
                tarefa.classe = 'feito';
            } else {
                if(tarefa.texto === tituloDaTarefa && tarefa.classe === 'feito'){
                    tarefa.classe = 'nao-feito';
                };
            };
        });
    };

    if(elementoClicado.classList.contains('botao-remover')){
        elementoPai.remove();

        tarefas.forEach(tarefa => {
            if(tarefa.texto === tituloDaTarefa){
                console.log(tarefas.indexOf(tarefa));
                tarefas.splice(tarefas.indexOf(tarefa), 1);
            };
        });
    };

    if(elementoClicado.classList.contains('botao-editar')){
        abilitarEdicao(); 

        inputEditado.value = tituloDaTarefa;
        inputAntigo = tituloDaTarefa;
    };

    localStorage.setItem("tarefas", JSON.stringify(tarefas));
});

function abilitarEdicao(){
    formAddItem.classList.toggle('hide');
    formEdicao.classList.toggle('hide');
    listaDeTarefas.classList.toggle('hide');
};

botaoCancelarEdicao.addEventListener('click', (event) => {
    event.preventDefault();
    abilitarEdicao();
});

formEdicao.addEventListener('submit', (event) => {
    event.preventDefault();

    const valorInput = inputEditado.value;

    if(valorInput){
        atualizarLista(valorInput);
    };

    abilitarEdicao();
});

function atualizarLista(input){
    const listaCompletaTarefas = document.querySelectorAll('.secao-to-do-list');

    listaCompletaTarefas.forEach(tarefa => {
        let titulo = tarefa.querySelector('p');
        if(titulo.innerText === inputAntigo){
            titulo.innerText = input;
        };
    });
};