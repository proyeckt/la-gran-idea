const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());

require('./server/config/config.mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app);
require('./server/routes/joboffer.routes')(app);

app.listen(port, () => console.log(`We are listening in the port: ${port}, how cool is that!!!`))