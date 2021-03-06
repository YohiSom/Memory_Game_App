import express from "express";
import "dotenv/config";
import cors from "cors";
import mysql from "mysql";
import bcrypt from "bcrypt";
import formValidation from "./middlewares/formValidation.js";
import loginValidation from "./middlewares/loginValidation.js";

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
const saltRounds = 10;

app.use(express.json());
const db = mysql.createPool({
  connectionLimit: 100,
  user: "root",
  // host: "localhost",
  password: "270678",
  database: "gameapp",
  port: "3306",
  debug: "true",
});



db.getConnection(function(err) {
  if (err){ console.log("error: " + err) 
    connection.release();
  };
const mysql = "CREATE TABLE  if not exists users(email VARCHAR(45), firstname VARCHAR(45), lastname VARCHAR(45), password VARCHAR(500), nickname VARCHAR(45))";
db.query(mysql, function (err, result) {
  if (err) {console.log(err)}
});
const sql = "CREATE TABLE  if not exists usersscores(email VARCHAR(45),nickname VARCHAR(45), score VARCHAR(45), date VARCHAR(45))";
db.query(sql, function (err, result) {
  if (err) {console.log(err)}
});
});

app.post("/signup", formValidation, (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const nickname = req.body.nickname;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
      "SELECT email FROM users WHERE email = '" + email + "'",
      function (err, result, field) {
        if (result.length === 0) {
          db.query(
            "INSERT INTO users (email,password,nickname,firstname,lastname)VALUES (?,?,?,?,?)",

            [email, hash, nickname, firstname, lastname],
            (err, result) => {
              res
                .status(200)
                .send({ email, hash, nickname, firstname, lastname });
            }
          );
        } else {
          return res.status(401).send({ message: "user exists" });
        }
      }
    );
  });
});

app.post("/login", loginValidation, (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ? ", [email], (err, result) => {
    if (result >= 0) {
      return res.status(401).send({ message: "wrong email or password" });
    } else {
      if (result) {
        bcrypt.compare(password, result[0].password, (err, responsepass) => {
          if (responsepass) {
            res.send(result);
          } else {
            res.status(400).send({ message: "Wrong email or password" });
          }
        });
      } else {
        res.status(400).send({ message: "User does not exist " });
      }
    }
  });
});
app.post("/scores/:email", (req, res) => {
  const nickname = req.body.nickname;
  const moves = req.body.moves;
  const email = req.params.email;

  db.query(
    "INSERT INTO usersscores (email,nickname,score,date)VALUES (?,?,?,?)",
    [email, nickname, moves, Date.now()],
    (err, result) => {
      res.json({ result: { email, nickname, moves } });
    }
  );
});

app.get("/getscores", (req, res) => {
  db.query(
    "SELECT * FROM  usersscores ORDER BY score ASC LIMIT 10 ",
    (err, result) => {
      res.json({ result });
    }
  );
});
app.get("/highscore/:email", (req, res) => {
  const email = req.params.email;
  db.query(
    "SELECT * FROM  usersscores WHERE email = ? ORDER BY score ASC LIMIT 1 ",
    [email],
    (err, result) => {
      res.json({ result });
    }
  );
});
app.get("/lastscore/:email", (req, res) => {
  const email = req.params.email;
  db.query(
    "SELECT * FROM  usersscores WHERE email = ? ORDER BY date DESC LIMIT 1 ",
    [email],
    (err, result) => {
      res.json({ result });
    }
  );
});

app.get("/", (req, res) => {
  res.send("welcome!!!!");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});