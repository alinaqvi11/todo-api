const app = require('./app')
const db = require('./src/config/config')

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`!! Running on port ${port} !!`)
})