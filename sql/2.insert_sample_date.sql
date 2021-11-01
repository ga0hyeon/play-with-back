INSERT INTO admin (id,name,login_id,password,expire_date,creation_date,created_by,last_update_date,last_updated_by
)VALUES(1,'현가영','ga0hyeon','admin',null,now(),1,now(),1
),(2,'신태식','hekatons','admin',null,now(),2,now(),2
);

INSERT INTO auth (id,auth_key,auth_name,expire_date,creation_date,created_by,last_update_date,last_updated_by
)VALUES(1,'SUPER_ADMIN','Super Admin',null,now(),1,now(),1
);


INSERT INTO play_with_db.`member`
(member_auth_id, nick_name, auth_type, profile_url, email_addr, age, gender, expire_date, creation_date, created_by, last_update_date, last_updated_by, login_id, area_code, sigungu_code, interests, password)
VALUES('first', '나야나첫째', 'LOCAL', 'http://', 'first@naver.com', 29, 'M', SYSDATE(), SYSDATE(), 1, SYSDATE(), 1, 'first', 'SEOUL', 'GNAGSUGU', '갤러리', '1q2w3e4r5t');


