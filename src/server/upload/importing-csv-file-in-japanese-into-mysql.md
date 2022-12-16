# Operating environment
macOS Sierra 10.12.6

# Introduction
## What I want to do:
I would like to manage roster management and receptionist lists with MySQL.

## How I will make it done:
I will import / export csv data (with Japanese) somehow to MySQL.
Eventually, with Node - RED or something like that, you can make searching, sorting, writing, exhaling results, etc

# 1. Excel data preparation:
This time I made an excel file like this:
![](https://images.viblo.asia/75a6e103-2414-4103-a0d7-4ea64df987e4.png)
Since I still have trouble, I'd like to make it all strings.
Even if you input `001` as usual, it will be kindly converted into a number, so let's make it string by entering `'001`.

Save to the desktop

![](https://images.viblo.asia/15abed0f-2831-46bd-b6ea-0c3cc91b1522.png)
Save as "CSV UTF - 8".

# 2.MySQL
 MySQL's will do it all for me.
 
I installed it with homebrew, but I will skip how to do it.

## 2-1. Prepare the database
Please make database properly.

I will also skip through it.

## 2-2. Prepare a table
Please prepare the following table.

![](https://images.viblo.asia/73f1fbe7-6487-4568-8812-70b5111a38f9.png)

id:varchar(20)
name:varchar(20)
type:varchar(20)

* how to create the table
```
mysql> create table TABLE_NAME (here i use "tablepkmn")
    -> (id varchar(20), name varchar(20), type varchar(20));
Query OK, 0 rows affected (0.02 sec)
```

# 3. Move the data to an accessible place
In order to load it you need to move the data to a location that everyone can access.

csv data: desktop → / tmp

* to move the file
`cp ~/Desktop/hoge.csv /tmp`

That will make a copy.

# 4. Importing data
We assume that the database is in use.
Table name is `tablepkmn`, csv data name is `hoge.csv`
Please change as appropriate.

## 4.1 Import

* Make an import

```
mysql> load data infile "/tmp/hoge.csv"
    -> into table tablepkmn
    -> fields terminated by ','
    -> enclosed by '"'
    -> lines terminated by '\n';
```

![](https://images.viblo.asia/f6833b85-f3ef-46f0-a7f8-28d4e56225d8.png)

It is OK if this comes out.

## 4.2 Confirm the table
To display all the content:
`select * from tablepkmn \G`
![](https://images.viblo.asia/639da617-0226-4bb0-b36d-7d9d9e9fbe8a.png)

# 5. Error appeared
I got a lot of errors anyway at the time of importing, so I will summarize it.

## - If `secure-file-priv` is wrong
![](https://images.viblo.asia/b4f06956-3930-47a0-a49c-bceeca8f8a90.png)
** ERROR 1290 (HY000): The MySQL server is running with the --secure-file-priv option so it cannot execute this statement **

### How to fix
Reference: [MySQL] Attempted to export data as CSV, it caught on `secure-file-priv`
It seems that it can be solved by emptying `secure_file_priv`

* Checkout the content of `secure_file_priv` file:
```
mysql> SELECT @@global.secure_file_priv;
+---------------------------+
| @@global.secure_file_priv |
+---------------------------+
| NULL                      |
+---------------------------+
1 row in set (0.00 sec)
```
Make it empty instead of NULL.
This seems to be described in `my.cnf`.

#### ① Find `my.cnf`
Reference: Set `my.cnf` in MySQL that you put in Homebrew

* From a new terminal
```
$ mysql --help | grep my.cnf
/etc/my.cnf /etc/mysql/my.cnf /usr/local/etc/my.cnf ~/.my.cnf 
```
Four results were returned.
This is read from the left, but it will be overwritten more and more in the order in which it was read.
So I add the valid  `~/.my.cnf` to the right.
Note: Because I am addicted to the order of reading `my.cnf`, so I summarized it

#### ② Replace `my.cnf`

Rewrite with vim.
Reference: Commonly used Vim command summary

* In vim [mysqld] should be as follows. Comment out is acceptable.
```
[mysqld]
secure-file-priv = ""
```

#### ③ Reset the Server

Exit with `control + D` and restart with `mysql.server restart`.

After reentering the database,  I confirmed that it was empty safely with `SELECT @@ global.secure_file_priv;`
![](https://images.viblo.asia/e494a82a-5536-4996-82cd-20485e9de74d.png)

## Garbled characters
![](https://images.viblo.asia/19195e44-5efd-46cf-941b-1d666dc1fe93.png)

Apparently it seems to be a character code problem.

■ Solution
Reference: Set character code to `utf 8` with `mysql`
Let `character_set_database` be `utf-8`.

### ① Check the character code

Enter `show variables like "chara%";`

```
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       | 
| character_set_connection | utf8                       | 
| character_set_database   | latin1                     | ←make it utf8 here
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
```

### ② Change inside the my.cnf
I will use vim again to modify `~/.my.cnf` that I changed.
* ~/.my.cnf
```[mysqld]
...
character-set-server=utf8 #add the ending of mysqld section

[client]
default-character-set=utf8 #Add client section
```
### ③ Restart server
Exit with `control + D` and restart with `mysql.server restart`.
Type `show variables like "chara%";` and it was rewritten safely.
![](https://images.viblo.asia/66910425-00ff-4afa-83fd-a00688866235.png)