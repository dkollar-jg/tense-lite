CREATE TABLE IF NOT EXISTS user (
    id                      int             NOT NULL auto_increment,
    first_name              varchar(120)    NOT NULL,
    last_name               varchar(120)    NOT NULL,
    email                   varchar(255)    NOT NULL,
    password                varchar(60)     NOT NULL,
    is_admin                INT             NOT NULL DEFAULT 0,
    enabled                 INT             NOT NULL DEFAULT 1,
    created_by_user_id      INT             NOT NULL,
    created_date            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by_user_id      INT             NOT NULL,
    updated_date            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pkey_user_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS project (
     id                       INT             NOT NULL AUTO_INCREMENT,
     name                     VARCHAR(50)     NULL,
     is_billable              INT             NULL,
     start_date               DATE            NULL,
     end_date                 DATE            NULL,
     enabled                  INT             NOT NULL DEFAULT 1,
     created_by_user_id       INT             NOT NULL,
     created_date             DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     updated_by_user_id       INT             NOT NULL,
     updated_date             DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     CONSTRAINT pkey_project_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS project_x_user (
    project_id              INT             NOT NULL,
    user_id                 INT             NOT NULL,
    hourly_rate             DOUBLE          NULL,
    start_date              DATE            NULL,
    end_date                DATE            NULL,
    enabled                 INT             NOT NULL DEFAULT 1,
    created_by_user_id      INT             NOT NULL,
    created_date            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    updated_by_user_id      INT             NOT NULL,
    updated_date            DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fkey_project_x_user_project_id FOREIGN KEY (project_id) REFERENCES project(id),
    CONSTRAINT fkey_project_x_user_user_id FOREIGN KEY (user_id) REFERENCES user(id)
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
        is_billable               INT             NOT NULL DEFAULT 0,
        enabled                   INT             NOT NULL DEFAULT 1,
        created_by_user_id        INT             NOT NULL,
        created_date              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        updated_by_user_id        INT             NOT NULL,
        updated_date              DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT pkey_time_entry_id PRIMARY KEY (id),
        CONSTRAINT fkey_time_entry_user_id FOREIGN KEY (user_id) REFERENCES user(id),
        CONSTRAINT fkey_time_entry_project_id FOREIGN KEY (project_id) REFERENCES project(id)
);

INSERT IGNORE INTO user (id, first_name, last_name, email, password, is_admin, enabled, created_by_user_id, created_date, updated_by_user_id, updated_date) VALUES
    (1, "Dan", "Kollar", "dkollar@jahnelgroup.com", "$2a$10$8ns.62JdvDrjcP9L4SpuluP7YRuO1YJRsCx35hefSDXIYX9NqdGVi", 1, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (2, "Jesse", "Lucier", "jlucier@jahnelgroup.com", "$2a$10$8ns.62JdvDrjcP9L4SpuluP7YRuO1YJRsCx35hefSDXIYX9NqdGVi", 1, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (3, "Michael", "Shirk", "mshirk@jahnelgroup.com", "$2a$10$8ns.62JdvDrjcP9L4SpuluP7YRuO1YJRsCx35hefSDXIYX9NqdGVi", 0, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

INSERT IGNORE INTO project (id, name, is_billable, start_date, end_date, enabled, created_by_user_id, created_date, updated_by_user_id, updated_date) VALUES
    (1, "Jahnel Group", 0, "2014-01-01", "2030-12-31", 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (2, "Kelmar", 1, "2014-01-01", "2030-12-31", 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (3, "Levy Gorvy", 1, "2014-01-01", "2030-12-31", 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

INSERT IGNORE INTO project_x_user (project_id, user_id, hourly_rate, start_date, end_date, enabled, created_by_user_id, created_date, updated_by_user_id, updated_date) VALUES
    (1, 1, 0, "2014-05-27", NULL, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (1, 2, 0, "2015-02-25", NULL, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (1, 3, 0, "2015-02-05", NULL, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (2, 2, 125, "2015-02-05", NULL, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (2, 3, 100, "2015-02-05", "2020-08-11", 0, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (3, 3, 100, "2020-08-12", NULL, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP);

INSERT IGNORE INTO time_entry (id, user_id, project_id, entry_date, entry_notes, hours, hourly_rate, entry_dollar_value, enabled, created_by_user_id, created_date, updated_by_user_id, updated_date) VALUES
    (1, 1, 1, "2022-05-02", "Working on stuff", 8, 0, 0, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (2, 1, 1, "2022-05-03", "Working on more stuff", 8, 0, 0, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (3, 1, 1, "2022-05-04", "Thinking about more stuff to work on", 8, 0, 0, 1, 1, CURRENT_TIMESTAMP, 1, CURRENT_TIMESTAMP),
    (4, 2, 2, "2022-05-02", "Auditing big business", 8, 125, 1000, 1, 2, CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP),
    (5, 2, 2, "2022-05-03", "Crunching numbers", 8, 125, 1000, 1, 2, CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP),
    (6, 2, 2, "2022-05-04", "Stacking cash", 7, 125, 875, 1, 2, CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP),
    (7, 2, 1, "2022-05-04", "Engagement Hour", 1, 0, 0, 1, 2, CURRENT_TIMESTAMP, 2, CURRENT_TIMESTAMP),
    (8, 3, 3, "2022-05-02", "Changing background colors", 8, 100, 800, 1, 3, CURRENT_TIMESTAMP, 3, CURRENT_TIMESTAMP),
    (9, 3, 3, "2022-05-03", "Making GraphQL great again", 8, 100, 800, 1, 3, CURRENT_TIMESTAMP, 3, CURRENT_TIMESTAMP),
    (10, 3, 3, "2022-05-04", "Macaroni art with Luke", 7, 100, 700, 1, 3, CURRENT_TIMESTAMP, 3, CURRENT_TIMESTAMP),
    (11, 3, 1, "2022-05-04", "Beer & Cards", 7, 0, 0, 1, 3, CURRENT_TIMESTAMP, 3, CURRENT_TIMESTAMP);