const express = require("express");
const router = express.Router();
const db = require("../config/db");

// express-session
const session = require("express-session");
const helmet = require("helmet");
const assert = require("assert");
const mySqlStore = require("express-mysql-session")(session);
const sessionOptions = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "play_with_db",
  port: "3308",
};
const sessionStore = new mySqlStore(sessionOptions);
//..세션을 외부에 저장하도록 설정
sessionStore.on("error", function (error) {
  assert.ifError(error);
  assert.ok(false);
});
//..세션 암호화
router.use(
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
router.use(
  helmet.hsts({
    maxAge: 10886400000,
    includeSubDomains: true,
  })
);

// passport - express-session 이후 기술
const passport = require("passport");
const naverStrategy = require("passport-naver").Strategy;
const kakaoStrategy = require("passport-kakao").Strategy;

router.use(passport.initialize()); //passport 모듈 초기화
router.use(passport.session()); //passport 세션 사용

//세션 생성시
passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  db.query("SELECT * FROM session WHERE ");
  done(null, user);
});

//세션 생성후 접근시
passport.deserializeUser(function (user, done) {
  console.log("deserializeUser");
  db.query(
    "SELECT * FROM member WHERE login_id = ? AND auth_type = ?",
    [user.id, user.authType],
    (err, data) => {
      done(null, data[0]);
    }
  );
});

//로그인 & 도메인별 설정
passport.use(
  "naver",
  new naverStrategy(
    {
      clientID: "KQmu6XOsGf96uxKQqvlT",
      clientSecret: "sXdES2lky7",
      callbackURL: "http://localhost:8081/login/naver_oauth",
    },
    function (accessToken, refreshToken, profile, done) {
      //DB 처리
      profile.authType = "NAVER";
      db.query(
        "SELECT * FROM member WHERE login_id = ? AND auth_type = ?",
        [profile.id, profile.authType],
        (err, data) => {
          if (!err) {
            if (Object.keys(data).length !== 0) {
              //사용자 조회시 DB에 사용자 있음 - serializeUser 호출
              return done(null, profile);
            } else {
              //사용자 조회시 DB에 사용자 없음, 회원가입 진행
              var tmp = accessToken;
              var tmp2 = new Date();
              var emailId = profile.emails[0].value.slice(
                0,
                profile.emails[0].value.indexOf("@")
              );
              db.query(
                "INSERT INTO member (member_auth_id, nick_name, auth_type, profile_url, email_addr, age, gender, expire_date, creation_date, created_by, last_update_date, last_updated_by, login_id) VALUES(?, ?, ?, ?, ?, ?, ?, null, ?, 0, ?, 0, ?)",
                [
                  emailId,
                  emailId,
                  profile.authType,
                  profile._json.profile_image,
                  profile.emails[0].value,
                  0,
                  "U",
                  tmp2,
                  tmp2,
                  profile.id,
                ],
                (err, data) => {
                  if (!err) {
                    //사용자 정보 DB 입력 성공
                    return done(null, profile);
                  } else return done(err); //사용자 정보 DB 입력 실패
                }
              );
            }
          } else return done(err); //사용자 조회시 에러발생
        }
      );
    }
  )
);

//..로그인
router.get(
  "/naver",
  passport.authenticate("naver", {
    successRedirect: "/",
    failureRedirect: "/login/fail",
  }),
  function (req, res) {
    console.log("/naver failed, stopped");
  }
);

router.get(
  "/naver_oauth",
  passport.authenticate("naver", {
    successRedirect: "/",
    failureRedirect: "/login/fail",
  })
);

//..로그인 확인
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login/fail");
}

//..로그인 실패
router.get("/fail", (req, res) => {
  res.send("Login Failed!! OR Session expired!!");
});
module.exports = router;
