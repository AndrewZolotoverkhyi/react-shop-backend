const express = require("express");
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const sqlQuery = require('./querry');
const cors = require("cors");

const app = express();

app.use(cors());
const PORT = process.env.PORT || 3001;

let bd;
open({
    filename: './db/shop.db',
    driver: sqlite3.Database
}).then((rdb) => {
    bd = rdb;
    onDbConnected(rdb);
}).catch((e) => {
    console.error(e);
    process.kill();
});

async function insertProduct(product) {
    return await bd.run(sqlQuery.insertproduct, product.id, product.for, product.img, product.name, product.description, product.price);
}

async function selectProducts() {
    return await bd.all(sqlQuery.selectproducts);
}

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send("<h3>OK</h3>");
});

app.get('/products', async (req, res) => {
    let pr = await selectProducts();
    res.status(200).send(pr);
});

app.get('/createproduct', async (req, res) => {
    await insertProduct({
        id: req.query.id,
        for: req.query.for,
        img: req.query.img,
        name: req.query.name,
        description: req.query.description,
        price: req.query.price
    });
    res.status(200).send("<h3>Inserted</h3>");
});

app.get("/products/remove", function (req, res) {

    res.status(200).send(message);
});

async function onDbConnected(db) {
    await db.migrate({
        force: false,
        migrationsPath: "./migrations"
    })
    app.listen(PORT);
}