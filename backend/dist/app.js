'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const api_1 = __importDefault(require('./routes/api'));
const passport_1 = __importDefault(require('passport'));
const mongoose_1 = __importDefault(require('mongoose'));
const dotenv_1 = __importDefault(require('dotenv'));
const body_parser_1 = __importDefault(require('body-parser'));
const cookie_parser_1 = __importDefault(require('cookie-parser'));
const cors_1 = __importDefault(require('cors'));
require('./passport');
dotenv_1.default.config();
// Set up DB
const mongoDB = process.env.DB_KEY;
mongoose_1.default.connect(mongoDB);
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));
const app = (0, express_1.default)();
const port = 3000;
app.use(
  (0, cors_1.default)({
    origin: 'https://quiver-chat.onrender.com',
    credentials: true,
  })
);
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', api_1.default);
app.listen(port, () => {
  return console.log(
    `Express is listening at https://quiver-chat-api.onrender.com`
  );
});
//# sourceMappingURL=app.js.map
