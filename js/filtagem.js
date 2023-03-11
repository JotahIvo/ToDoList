const filtro = document.getElementById('seletor-filtro');

filtro.addEventListener('change', (event) => {
    filtrarTarefa(event.target.value);
});

function filtrarTarefa(escolha){
    let secaoToDo = document.getElementById('secao-to-do-list');
    secaoToDo.innerHTML = '';
  
    tarefas.forEach(tarefa => {
        if(tarefa.classe === escolha){
            criarElementoDaLista(tarefa)
        } else {
            if(escolha === 'todos'){
                criarElementoDaLista(tarefa)
            };
        };
    });
};