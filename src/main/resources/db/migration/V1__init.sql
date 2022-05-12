CREATE TABLE IF NOT EXISTS user (
    id                      int             NOT NULL auto_increment,
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

CREATE TABLE IF NOT EXISTS project_x_user (
    project_id       INT        NOT NULL,
    user_id          INT        NOT NULL,
    hourly_rate      DOUBLE     NULL,
    start_date       DATE       NULL,
    end_date         DATE       NULL,
    enabled          TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS time_entry (
        id                        INT             NOT NULL AUTO_INCREMENT,
        user_id                   INT             NULL,
        project_id                INT             NULL,
        entry_date                DATE            NULL,
        entry_notes               VARCHAR(2000)   NULL,
        hours                     DOUBLE          NULL,
        hourly_rate               DOUBLE          NULL,
        entry_dollar_value        DOUBLE          NULL,
        CONSTRAINT pkey_time_entry_id PRIMARY KEY (id),
        CONSTRAINT fkey_time_entry_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fkey_time_entry_project_id FOREIGN KEY (project_id) REFERENCES project(id)
);

INSERT IGNORE INTO user (id, first_name, last_name, email, is_admin) VALUES
    (1, "Dan", "Kollar", "dkollar@jahnelgroup.com", 1),
    (2, "Jesse", "Lucier", "jlucier@jahnelgroup.com", 1),
    (3, "Michael", "Shirk", "mshirk@jahnelgroup.com", 0);

INSERT IGNORE INTO project (id, name, is_billable, start_date, end_date) VALUES
    (1, "Jahnel Group", 0, "2014-01-01", "2030-12-31"),
    (2, "Kelmar", 1, "2014-01-01", "2030-12-31"),
    (3, "Levy Gorvy", 1, "2014-01-01", "2030-12-31");

INSERT IGNORE INTO project_x_user (project_id, user_id, hourly_rate, start_date, end_date) VALUES
    (1, 1, 0, "2014-05-27", NULL),
    (1, 2, 0, "2015-02-25", NULL),
    (1, 3, 0, "2015-02-05", NULL),
    (2, 2, 125, "2015-02-05", "2021-03-04"),
    (2, 3, 100, "2015-02-05", "2020-08-11"),
    (3, 3, 100, "2020-08-12", NULL);

INSERT IGNORE INTO time_entry (id, user_id, project_id, entry_date, entry_notes, hours, hourly_rate, entry_dollar_value) VALUES
    (1, 1, 1, "2022-05-02", "Working on stuff", 8, 0, 0),
    (2, 1, 1, "2022-05-03", "Working on more stuff", 8, 0, 0),
    (3, 1, 1, "2022-05-04", "Thinking about more stuff to work on", 8, 0, 0),
    (4, 2, 2, "2022-05-02", "Auditing big business", 8, 125, 1000),
    (5, 2, 2, "2022-05-03", "Crunching numbers", 8, 125, 1000),
    (6, 2, 2, "2022-05-04", "Stacking cash", 7, 125, 875),
    (7, 2, 1, "2022-05-04", "Engagement Hour", 1, 0, 0),
    (8, 3, 3, "2022-05-02", "Changing background colors", 8, 100, 800),
    (9, 3, 3, "2022-05-03", "Making GraphQL great again", 8, 100, 800),
    (10, 3, 3, "2022-05-04", "Macaroni art with Luke", 7, 100, 700),
    (11, 3, 1, "2022-05-04", "Beer & Cards", 7, 0, 0);