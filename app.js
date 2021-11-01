// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require("./config/db");

const cors = require("cors");
app.use(cors());

// express-session
const session = require("express-session");
const helmet = require("helmet");
const assert = require("assert");
const mySqlStore = require("express-mysql-session")(session);
const sessionOptions = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "mysql", //play_with_db
  port: "3306", //3308
};
const sessionStore = new mySqlStore(sessionOptions);
//..세션을 외부에 저장하도록 설정
sessionStore.on("error", function (error) {
  assert.ifError(error);
  assert.ok(false);
});
//..세션 암호화
app.use(
  session({
    secret: "asdfasffdas",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000, httpOnly: true },
    store: sessionStore,
    rolling: true,
  })
);
//..세션 보안 설정
app.use(
  helmet.hsts({
    maxAge: 10886400000,
    includeSubDomains: true,
  })
);

// passport - express-session 이후 기술
const passport = require("passport");
app.use(passport.initialize()); //passport 모듈 초기화
app.use(passport.session()); //passport 세션 사용

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const PORT = process.env.PORT || 8081;

const auth = require("./lib/auth");

// router
const adminRouter = require("./routes/admins");
const loginRouter = require("./routes/login");

// Swagger
const swaggerOptions = {
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

const specs = swaggerJsdoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.get("/", (req, res) => res.send("Hello Play-With!!"));

// APIs Start
//Interceptor
app.use(function (req, res, next) {
  console.log("interceptor!!");
  //interceptor 작동
  next();
});

//routers
app.use("/admins", adminRouter);
app.use("/login", loginRouter);

//session Debug
app.get("/debug", (req, res) => {
  res.json({
    "req.session": req.session, // 세션 데이터
    "req.user": req.user, // 유저 데이터
    "req._passport": req._passport, // 패스포트 데이터
    "req.isAuthenticated()": req.isAuthenticated(),
  });
});

//members
//..회원 정보 조회
app.get("/members", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});
app.get("/member/:memberId", (req, res) => {
  const query = "SELECT * FROM member WHERE id = ?";
  const params = [req.params.memberId];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 ID 중복 체크
app.get("/member/loginId/:loginId", (req, res) => {
  const query =
    "SELECT count(login_id) AS login_id_cnt FROM member WHERE login_id = ?";
  const params = [req.params.loginId];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 가입
app.post("/member", (req, res) => {
  var query =
    "INSERT INTO member (member_auth_id, login_id, password, area_code, sigungu_code, interests, nick_name, auth_type, profile_url, email_addr, age, gender, creation_date, created_by, last_update_date, last_updated_by)";
  query +=
    "VALUES(?, ?, ?, ?, ?, ?, ?, 'LOCAL', ?, ?, ?, ?, SYSDATE(), 1, SYSDATE(), 1)";
  const params = [
    req.body.memberAuthId,
    req.body.loginId,
    req.body.password,
    req.body.areaCode,
    req.body.sigunguCode,
    req.body.interests,
    req.body.nickName,
    req.body.profileUrl,
    req.body.emailAddr,
    req.body.age,
    req.body.gender,
  ];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 정보 수정
app.put("/member/:memberId", (req, res) => {
  var query = "UPDATE member SET";
  var params = [];

  if (typeof req.body.nickName != "undefined") {
    query += "nick_name = ?,";
    params.push(req.body.nickName);
  }

  if (typeof req.body.password != "undefined") {
    query += "password = ?,";
    params.push(req.body.password);
  }

  if (typeof req.body.interests != "undefined") {
    query += "interests = ?,";
    params.push(req.body.interests);
  }

  if (typeof req.body.areaCode != "undefined") {
    query += "area_code = ?,";
    params.push(req.body.areaCode);
  }

  if (typeof req.body.sigunguCode != "undefined") {
    query += "sigungu_code = ?,";
    params.push(req.body.sigunguCode);
  }

  query += "last_update_date=SYSDATE(), last_updated_by=? WHERE id=?";
  params.push(req.params.memberId);
  params.push(req.params.memberId);

  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..회원 가입여부 확인
//....token을 받아 KAKAO 또는 NAVER api로 아이디 확인하고 DB에서 결과 전송
app.get("/member/:authType/:token", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});
/*
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

//..회원 정보 삭제
app.delete("/api/member/:emailAddr", (req, res) => {
  const query = "SELECT * FROM member";
  db.query(query, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});
*/
//..북마크 생성
app.post("/bookmark", (req, res) => {
  const query =
    "INSERT INTO member_bookmark (member_id, desription, content_id, content_type_id, creation_date, created_by, last_update_date, last_updated_by) VALUES (?, ?, ?, ?, SYSDATE(), ?, SYSDATE(), ?)";
  const params = [
    req.body.memberId,
    req.body.description,
    req.body.contentsId,
    req.body.contentsTypeId,
    req.body.memberId,
    req.body.memberId,
  ];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..북마크 조회
app.get("/bookmarks/:memberId", (req, res) => {
  const query =
    "SELECT * FROM member_bookmark WHERE member_id = ? ORDER BY creation_date";
  const params = [req.params.memberId];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..특정 북마크 조회
app.get("/bookmark/:memberId/:contentTypeId/:contentId", (req, res) => {
  const query =
    "SELECT * FROM member_bookmark WHERE member_id = ? AND content_type_id = ? AND content_id = ?";
  const params = [
    req.params.memberId,
    req.params.contentTypeId,
    req.params.contentId,
  ];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..북마크 삭제
app.delete("/bookmark/:memberId/:contentTypeId/:contentId", (req, res) => {
  const query =
    "DELETE FROM member_bookmark WHERE member_id = ? AND content_type_id = ? AND content_id = ?";
  const params = [
    req.params.memberId,
    req.params.contentTypeId,
    req.params.contentId,
  ];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..리뷰 생성
app.post("/review", (req, res) => {
  const query =
    "INSERT INTO member_review (member_id, content_id, content_type_id, score, content, creation_date, created_by, last_update_date, last_updated_by) VALUES(?, ?, ?, ?, ?, SYSDATE(), ?, SYSDATE(), ?)";
  const params = [
    req.body.memberId,
    req.body.contentId,
    req.body.contentTypeId,
    req.body.score,
    req.body.content,
    req.body.memberId,
    req.body.memberId,
  ];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..리뷰 조회
app.get("/reviews/:memberId", (req, res) => {
  const query =
    "SELECT id, content_id, content_type_id, score, CAST( content AS CHAR (10000) CHARACTER SET UTF8) AS content FROM member_review WHERE member_id = ? ORDER BY creation_date";
  const params = [req.params.memberId];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..리뷰 수정
app.put("/review/:reviewId", (req, res) => {
  const query =
    "UPDATE member_review SET content = ?, score = ?, last_update_date=SYSDATE() WHERE id = ?";
  const params = [req.body.content, req.body.score, req.params.reviewId];

  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});

//..리뷰 삭제
app.delete("/review/:reviewId", (req, res) => {
  const query = "DELETE FROM member_review WHERE id = ?";
  const params = [req.params.reviewId];
  db.query(query, params, (err, data) => {
    if (!err) {
      res.send({ result: data });
    } else res.send(err);
  });
});
// APIs End

// errors
app.use(function (req, res, next) {
  res.status(404).send("cant find resources!!");
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Something broke!!");
});

// 8081 포트로 서버 오픈
app.listen(PORT, function () {
  console.log(`Server On : http://localhost:${PORT}/`);
});
