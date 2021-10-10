INSERT INTO admin (id,name,login_id,password,expire_date,creation_date,created_by,last_update_date,last_updated_by
)VALUES(1,'현가영','ga0hyeon','admin',null,now(),1,now(),1
),(2,'신태식','hekatons','admin',null,now(),2,now(),2
);

INSERT INTO auth (id,auth_key,auth_name,expire_date,creation_date,created_by,last_update_date,last_updated_by
)VALUES(1,'SUPER_ADMIN','Super Admin',null,now(),1,now(),1
);


INSERT INTO play_with_db.`member`
(member_auth_id, nick_name, auth_type, profile_url, email_addr, age, gender, expire_date, creation_date, created_by, last_update_date, last_updated_by)
VALUES('tlsxotlr', '그로밋', 'NAVER', '', 'tlsxotlr@navar.com', 0, 'M', null, now(), 0, now(), 0);
INSERT INTO play_with_db.member_child
(id, member_id, age, gender, creation_date, created_by, last_update_date, last_updated_by, nick_name)
VALUES(1,1, 8, 'F', now(), 0, now(), 0, '월레스');
INSERT INTO play_with_db.interest
(interest_code, description, expire_date, creation_date, created_by, last_update_date, last_updated_by)
VALUES('HISTORY', '역사', null, now(), 0, now(), 0);
INSERT INTO play_with_db.child_interest
(child_id, interest_id, creation_date, created_by, last_update_date, last_updated_by)
VALUES(1, 1, now(), 0, now(), 0);
INSERT INTO play_with_db.region
(region_code, description, expire_date, creation_date, created_by, last_update_date, last_updated_by)
VALUES('SEOUL', '서울', null, now(), 0, now(), 0);
INSERT INTO play_with_db.member_bookmark_region
(member_id, region_id, creation_date, created_by, last_update_date, last_updated_by)
VALUES(1, 1, now(), 0, now(), 0);