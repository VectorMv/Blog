create database Blog
go 

use Blog
go

create table Categories
(
	CategoryID int identity(1,1) primary key not null,
	[CategoryName] varchar(50) unique not null
);
go

create table Tags
(
	TagID int identity(1,1) primary key not null,
	[TagName] varchar(20) unique not null,
);

create table Articles
(
	ArticleID int identity(1,1) primary key not null,
	[Name] varchar(80) not null,
	ShortDescription varchar(200) null,
	[Description] varchar(max) not null,
	HeroImage varchar(200) null,
	Category int null,
	PublicationDate datetime not null default(getdate()),
	 
);
go

create table Articles_Tags
(
	ID int identity(1,1) primary key not null,
	TagID int not null,
	ArticleID int not null,

	unique(TagID, ArticleID)
);

ALTER TABLE Articles
add constraint FK_Articles_To_Categories FOREIGN KEY(Category) REFERENCES Categories(CategoryID) 
go

ALTER TABLE Articles_Tags
add constraint FK_AT_To_Tags FOREIGN KEY(TagID) REFERENCES Tags(TagID) on update cascade on delete cascade 
go

ALTER TABLE Articles_Tags
add constraint FK_AT_To_Articles FOREIGN KEY(ArticleID) REFERENCES Articles(ArticleID) on update cascade on delete cascade
go
