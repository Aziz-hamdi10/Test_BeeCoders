const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());


const port = 3000;
app.use('/getimage', express.static('./uploads'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.use(express.json());
require('./config/connect');
const courserouter=require('./routes/course');
app.use('/course',courserouter); 

const user=require('./routes/user');
app.use('/user',user); 
