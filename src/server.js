import express from "express";
import { __dirname } from "./path.js";
import productsRouter from "./routes/productsRouter.js";
import morgan from "morgan";

const app = express();

app.use(express.static(__dirname + 'public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

app.use('/api/products', productsRouter);


const PORT = 8080;
app.listen(PORT, () => console.log(`Server ok en puerto ${PORT}`));
