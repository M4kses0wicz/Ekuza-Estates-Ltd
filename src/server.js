require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

const errorMiddleware = require('./middleware/error');
const routes = require('./routes');
const config = require('./config');

const app = express();


app.use(helmet({contentSecurityPolicy: config.security.contentSecurityPolicy}));
app.use(cors(config.security.cors));

app.use(express.static(config.paths.public, config.cache.static));
app.use(hpp());
app.use('/api', rateLimit(config.security.rateLimit));

app.use(compression());
app.use(morgan('dev'));
app.use(express.json(config.security.requestLimits));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
