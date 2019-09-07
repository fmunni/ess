# Course and Test Management

###### Mainpage

![Homepage](/images/mainpage.png)

###### Searching

![Search](/images/search.png)

### How to install, build and run the app

1. `git clone https://github.com/fmunni/ess.git`
2. `npm install`
3. `npm run buildui`
4. run `node index.js`

### Mysql Env

The following envs are required for the application.

```
DB_HOST=****
DB_USER=****
DB_PASS=****
DB_NAME=****
```

It runs on the default port 3306.

#### Database Tables

This application requires two database tables. The schemas are given below.

```
CREATE TABLE `course` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
`domain` varchar(100) COLLATE utf8_bin DEFAULT NULL,
`description` varchar(100) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `name` (`name`)
);
```

```
CREATE TABLE `test` (
`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
`course_id` int(10) unsigned NOT NULL,
`num_of_questions` int(10) unsigned NOT NULL,
`name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
`duration` varchar(10) COLLATE utf8_bin DEFAULT NULL,
PRIMARY KEY (`id`)
);
```
