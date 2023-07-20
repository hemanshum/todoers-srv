import express from 'express';
import morgan from 'morgan';

const app = express();

// Middlewares
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello, world',
  });
});

app.get('/hello', (req, res) => {
  res.send('Helllo!');
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
