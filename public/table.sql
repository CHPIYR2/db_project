/*
drop table ticket;
drop table users;
drop table activity;
*/

create table ticket (
ticket_id	varchar(15),
seat		varchar(15),
primary key(ticket_id)
);

create table users (
id			varchar(15),
username	varchar(15),
phone		varchar(15),
ticket_id	varchar(15),
primary key(id)
);

create table activity (
activity_id		varchar(15),
activity_name	varchar(15),
place			varchar(15),
artist			varchar(15),
activity_date	varchar(15),
primary key(activity_id)
);