# Backend part

***

## How to start
* Create '.env' file like an '[example.env](example.env)'
* Create database with 3 tables [users, posts, tokens]


## Databases blog
  ### users
    - id            (Primary Key) INT
    - username      (VARCHAR 45, UNIQUE)
    - email         (VARCHAR 255, UNIQUE)
    - password      (VARCHAR 255)
    - image         (VARCHAR 255, NULLABLE)
```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
)
```
### posts
    - id            (Primary Key) INT
    - title         (VARCHAR 255)
    - description   (VARCHAR 1000)
    - image         (VARCHAR 255)
    - category      (VARCHAR 45)
    - date          (TIMESTAMP or DATETIME)
    - user_id       (Foreign Key) INT
```
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `image` varchar(255) NOT NULL,
  `category` varchar(45) NOT NULL,
  `date` timestamp NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
```
### tokens
    - id            (Primary Key) INT
    - access_token  (VARCHAR 255, NULLABLE)
    - refresh_token (VARCHAR 255, NULLABLE)
    - user_id       (Foreign Key) INT
```
CREATE TABLE `tokens` (
`id` int NOT NULL AUTO_INCREMENT,
`user_id` int NOT NULL,
`access_token` varchar(255) DEFAULT NULL,
`refresh_token` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`),
KEY `user_id_idx` (`user_id`),
CONSTRAINT `usr_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
)
```
***
### About project
* Project was made in first database approach
  * Started with mysql2 and continued with mysql2/promises
* I didn't use @mui/material and others UI tools here, only scss
  <br />(Instead of react-quill for text (post.description))
* Inspiration to start this project found in YouTube

...in progress
🙂
