CREATE TABLE playWith.`member` (
	seq INT auto_increment NOT NULL PRIMARY KEY COMMENT 'PK용 seq',
	auth_type varchar(10) NOT NULL COMMENT 'NAVER, KAKAO',
	member_id varchar(100) NOT NULL COMMENT 'NAVER 로그인 아이디값 또는 KAKAO 로그인 아이디 값',
	email varchar(100) NULL COMMENT '이메일 주소',
	nickname varchar(100) NULL COMMENT '닉네임',
	profile_url varchar(300) NULL COMMENT '프로필 url',
	create_date DATETIME DEFAULT now() NOT NULL COMMENT '회원 가입 일자'
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
