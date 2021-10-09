// node_modules 에 있는 express 관련 파일을 가져온다.
const express = require("express");

// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.get("/", (req, res) => res.send("Hello Play-With!!"));

// 8080 포트로 서버 오픈
app.listen(8081, function () {
  console.log("start! express server on port 8081");
});
