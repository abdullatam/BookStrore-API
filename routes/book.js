import express from 'express';
import dotenv from 'dotenv';
import pgclient from '../db.js';
import morgan from 'morgan';

dotenv.config();
const router = express.Router();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());



router.get('/', async (req, res) => {
    const result = await pgclient.query('SELECT * FROM books');
    res.status(200).json(result.rows);

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const r = await pgclient.query('SELECT * FROM books WHERE id = $1', [id]);
    res.status(200).json(r.rows[0]);
});
})

router.post('/', async (req, res) => {
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    const r = await pgclient.query('INSERT INTO books (title, author, year) VALUES ($1, $2, $3) RETURNING *', [title, author, year]);
    res.status(201).json(r.rows[0]);
})


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const title = req.body.title;
    const author = req.body.author;
    const year = req.body.year;

    const r = await pgclient.query('UPDATE books SET title = $1, author = $2, year = $3 WHERE id = $4 RETURNING *', [title, author, year, id]);
    res.status(200).json(r.rows[0]);
})



router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const r = await pgclient.query('DELETE FROM books WHERE id = $1 RETURNING *', [id]);
    res.status(200).json(r.rows[0]);
})


export default router;
