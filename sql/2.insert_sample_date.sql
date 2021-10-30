INSERT INTO admin (id,name,login_id,password,expire_date,creation_date,created_by,last_update_date,last_updated_by
)VALUES(1,'현가영','ga0hyeon','admin',null,now(),1,now(),1
),(2,'신태식','hekatons','admin',null,now(),2,now(),2
);

INSERT INTO auth (id,auth_key,auth_name,expire_date,creation_date,created_by,last_update_date,last_updated_by
)VALUES(1,'SUPER_ADMIN','Super Admin',null,now(),1,now(),1
);
