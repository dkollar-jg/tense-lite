CREATE TABLE IF NOT EXISTS user (
    id                      int             NOT NULL auto_increment,
    username                varchar(50)     NOT NULL,
    password                varchar(60)     NOT NULL,
    first_name              varchar(120)    NOT NULL,
    last_name               varchar(120)    NOT NULL,
    email                   varchar(255)    NOT NULL,
    is_admin                TINYINT         NOT NULL DEFAULT 0,
    CONSTRAINT pkey_users_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS project (
     id                       INT             NOT NULL AUTO_INCREMENT,
     name                     VARCHAR(50)     NULL,
     is_billable              TINYINT         NULL,
     start_date               DATE            NULL,
     end_date                 DATE            NULL,
     CONSTRAINT pkey_project_id PRIMARY KEY (id)
);

INSERT IGNORE INTO user (id, username, password, first_name, last_name, email, is_admin) VALUES
    (1, "dkollar", "pass", "Dan", "Kollar", "dkollar@jahnelgroup.com", 1),
    (2, "jlucier", "pass", "Jesse", "Lucier", "jlucier@jahnelgroup.com", 1),
    (3, "mshirk", "pass", "Michael", "Shirk", "mshirk@jahnelgroup.com", 0);

INSERT IGNORE INTO project (id, name, is_billable, start_date, end_date) VALUES
    (1, "Jahnel Group", 0, "2014-01-01", "2030-12-31"),
    (2, "Kelmar", 1, "2014-01-01", "2030-12-31"),
    (3, "Levy Gorvy", 1, "2014-01-01", "2030-12-31");