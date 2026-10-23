const express = require('express');
const knex = require('knex');

const app = new express();

const saep_db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'saep_db'
    }
});

async function testaConexao() {
    try {
        await saep_db.raw('select 1');
        console.log('Conexão com bandoe de dados realizado com sucesso!');
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados!");
    }
}

app.get('/usuario', async (request, response) => {
    const usuarios = await saep_db.select().from('USUARIO');
    response.send(usuarios);
})

app.get('/produto', async (reqeust, response) => {
    const produtos = await await saep_db.select('*').from('PRODUTO');
    response.send(produtos);
});

app.get('/pessoa', async (reqeust, response) => {
    const pessoas = await saep_db.select().from('PESSOA');
    const detalhe = pessoas.map((item) => {
        return `<tr>
                    <td style="border: 1px solid black;">${item.ID}</td>
                    <td style="border: 1px solid black;">${item.NOME}</td>
                </tr>`
    });

    response.send(
        `<table>
            <tr>
                <th style="border: 1px solid black;">ID</th>
                <th style="border: 1px solid black;">NOME</th>
            </tr>
            ${detalhe}
        </table>`);
});

app.get('/login', (request, response) => {

    response.send('<h1>Tela de Login</h1>');
});

//GET
//POST
//PUT
//DELETE

app.listen(8080, () => {
    console.log("serviço está rodando na porta 8080!");
    testaConexao();
});


//http://localhost:8080
//http://127.0.0.1:8080

