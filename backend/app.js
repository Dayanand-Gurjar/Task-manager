const express = require('express');
const cors = require('cors');
const path=require('path');

const tasksRouter = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get('*',(req,res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports =app;

