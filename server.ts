import app from'./app';
import db from './app/infrastructure/config/config';

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`!! Running on port ${port} !!`)
})