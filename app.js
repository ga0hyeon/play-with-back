// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();
const db = require("./config/db");

const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 8081;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "play-with API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8081/api/",
      },
    ],
  },
  apis: ["./routes/routeSwegger.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/", (req, res) => res.send("Hello Play-With!!"));

// APIs Start
//admins
app.get("/api/admins", (req, res) => {
  db.query("SELECT * FROM admin", (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//members
//..회원 정보 조회
app.get("/api/members", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});
app.get("/api/member/:emailAddr", (req, res) => {
  const query = "SELECT * FROM member WHERE email_addr= ?";
  const params = [req.params.emailAddr];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 가입여부 확인
//....token을 받아 KAKAO 또는 NAVER api로 아이디 확인하고 DB에서 결과 날림
app.get("/api/member/:authType/:token", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 정보 생성
app.post("/api/member", (req, res) => {
  const query = "SELECT * FROM member";
  const emailAddr = req.body.emailAddr;
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 정보 수정
app.put("/api/member/:emailAddr", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 정보 삭제
app.delete("/api/member/{emailAddr}", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

// APIs End

// 8081 포트로 서버 오픈
app.listen(PORT, function () {
  console.log(`Server On : http://localhost:${PORT}/`);
});
