require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(express.json());

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log('conexion exitosa MONGODB atlas');
})
.catch(err =>{
    console.log('error de conexion', err.message);
    process.exit(1);
})

const juegoRoutes = require('./routes/juegoRoutes')
app.use('/api/juegos', juegoRoutes)

const resenaroutes = requiere('./routes/rresenaRoutes')
app.use('/api/resena', resenaRoutes)

app.listen(PORT, ()=> {
    console.log('servidor corriendo en http://localhost:${PORT}')
})