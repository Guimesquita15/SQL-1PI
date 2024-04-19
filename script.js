// Função para fazer solicitação AJAX ao servidor para obter dados dos alunos
function getAlunos() {
    fetch('/alunos')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('alunosTable');
            data.forEach(aluno => {
                const row = table.insertRow();
                row.innerHTML = `<td>${aluno.Nome}</td><td>${aluno.Idade}</td>`;
                row.addEventListener('click', () => showDetails(aluno.ID));
            });
        })
        .catch(error => console.error('Erro:', error));
}

// Função para exibir detalhes de um aluno específico
function showDetails(id) {
    fetch(`/aluno/${id}`)
        .then(response => response.json())
        .then(data => {
            alert(`Nome: ${data.Nome}\nIdade: ${data.Idade}\nTurma: ${data.turma}\nNota: ${data.Nota}`);
        })
        .catch(error => console.error('Erro:', error));
}

// Chama a função para carregar os alunos quando a página carregar
window.onload = getAlunos;



