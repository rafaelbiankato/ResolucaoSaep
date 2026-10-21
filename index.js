const express = require('express');

const app = new express();


app.get('/login', (request, response)=>{
    response.send('<h1>Tela de Login</h1>');
});




app.listen(8080, ()=>{console.log ("teste")});