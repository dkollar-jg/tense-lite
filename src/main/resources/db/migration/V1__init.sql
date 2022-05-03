CREATE TABLE IF NOT EXISTS users (
    id                      int             NOT NULL auto_increment,
    username                varchar(50)     NOT NULL,
    password                varchar(60)     NOT NULL,
    first_name              varchar(120)    NOT NULL,
    last_name               varchar(120)    NOT NULL,
    email                   varchar(255)    NOT NULL,
    is_admin                TINYINT(1)      NOT NULL DEFAULT 0,
    CONSTRAINT pkey_users_id PRIMARY KEY (id)
);

INSERT IGNORE INTO users (id, username, password, first_name, last_name, email, is_admin) VALUES
    (1, "dkollar", "pass", "Dan", "Kollar", "dkollar@jahnelgroup.com", 1),
    (2, "jlucier", "pass", "Jesse", "Lucier", "jlucier@jahnelgroup.com", 1),
    (3, "mshirk", "pass", "Michael", "Shirk", "mshirk@jahnelgroup.com", 0);