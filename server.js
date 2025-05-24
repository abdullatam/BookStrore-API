import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pgclient from './db.js';
import router from './routes/book.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

app.use('/api/books', router);

pgclient.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })