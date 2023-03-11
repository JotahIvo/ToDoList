const inputPesquisa = document.getElementById('pesquisar');
const listaDeTarefasPesquisar = document.querySelectorAll('.to-do-list');

inputPesquisa.addEventListener('input', () => {
    const filtro = inputPesquisa.value.toLowerCase();
    
    listaDeTarefasPesquisar.forEach(tarefa => {
        const nome = tarefa.textContent.toLowerCase();

        if(nome.includes(filtro)){
            tarefa.style.display = 'block';
        } else {
            tarefa.style.display = 'none';
        };
    });
});