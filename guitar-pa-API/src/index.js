const express = require('express');
require('./db/mongoose');

const itemRouter = require('./routers/practiceItem');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(itemRouter);
app.use(userRouter);

app.listen(port, () => console.log(`Server is up on port ${port}`));
