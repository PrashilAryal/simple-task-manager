-- To create a new table
create table if not exists todos(
id serial primary key not null,
task_name varchar(255) not null unique,
priority INT not null default 1,
is_complete BOOLEAN default false,
created_date timestamp default current_timestamp,
updated_date timestamp default current_timestamp
);


-- To insert into the table
INSERT INTO todos (task_name, priority, is_complete, created_date, updated_date) 
VALUES 
    ('Task 4', 1, false, '2023-01-01 10:00:00', '2023-01-01 10:00:00'),
    ('Task 5', 2, false, '2023-01-02 12:00:00', '2023-01-02 12:00:00'),
    ('Task 6', 3, true, '2023-01-03 15:00:00', '2023-01-03 15:00:00');


   
