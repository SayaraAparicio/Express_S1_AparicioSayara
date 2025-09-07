/*
-- DIA 1 --
 */
//Importación de express en variable app
const express = require('express');
const app = express();

require('dotenv').config();

//Definimos el puerto
const PORT = process.env.PORT;

//Ruta principal -> Endpoint
app.get('/',(req,res) =>{
    res.send('Holissss!! Bievenidos a expressss!');
});

app.get('/mensaje1',(req,res) =>{
    res.send('Este es otro endpoint');
});

app.post('/mensaje1',(req,res) =>{
    res.send('Un post falso');
});
//Ruta con respuesta en formato JSON
app.get('/mensaje2',(req,res) =>{
    let jsonsito= {
        "mensaje":"Holiii"
    };
    //res.send('Este es otro endpoint');
    res.json(jsonsito);
});

// Ruta con parámetros
app.get('/mensajePersonalizado',(req,res) =>{
    const nombre = req.params.nombre;
    res.send(`Hola ${nombre}`);
});

//Iniciar el servidor
app.listen(PORT,()=>{
    console.log("Servidor iniciado!");
});