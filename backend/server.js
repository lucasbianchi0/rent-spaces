const express = require('express');
const cors = require('cors');
const path = require('path')
const spacesRouter = require('./routes/spaces.js')
const app = express();
const PORT = 4000;
app.use(cors(
  {
    origin:true,
    credentials:true
  }
))
// Middlewar

// Agrega el middleware express.static()
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


const isStaticMiddlewareEnabled = app._router.stack.some((middleware) => middleware.name === 'serveStatic');
console.log(isStaticMiddlewareEnabled);

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/spaces', spacesRouter)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
