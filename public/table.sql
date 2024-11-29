
drop table ticket;
drop table users;
drop table activity;
drop table area;


create table ticket (
ticket_id	INT IDENTITY(1,1),
activity_id	int,
seat		varchar(15),
user_id		varchar(15),
primary		key(ticket_id)
);

create table users (
id			INT IDENTITY(1,1),
username	varchar(15),
password    varchar(15),
phone		varchar(15),
primary key(id)
);

create table activity (
activity_id		INT IDENTITY(1,1),
activity_name	NVARCHAR(255),
place			NVARCHAR(255),
artist			NVARCHAR(255),
activity_date	NVARCHAR(255),
primary key(activity_id)
);

create table area (
area_id			INT IDENTITY(1,1),
place			NVARCHAR(255),
area			varchar(15),
area_row		varchar(15),
area_column		varchar(15),
primary key(area_id)
);