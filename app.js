/* Пакет Express  имеет множество служебных методов HTTP и промежуточных обработчиков, чтобы создать API или веб-сайт. */
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const contactsRouter = require("./routes/api/contacts");

const app = express(); /* вызывыем объект как функцию для создания сервера */

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

/* Логирование */
app.use(logger(formatsLogger));

/* Разрешаем кросс-доменные запросы */
app.use(cors());
app.use(express.json());

/* Путь, с которого начинаются наши маршруты в api/contacts.js */
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

/* const DB_HOST =
  "mongodb+srv://DmitrievAlexander:dCa4vJDZmb3GQbcn@cluster0.ec0kvfb.mongodb.net/db-contacts?retryWrites=true&w=majority"; */

module.exports = app;
