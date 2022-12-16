**INSTALL RVM**
* Step 1: `sudo apt-get update`

![](https://images.viblo.asia/65543df0-9747-4eb5-888b-3e1d53cfe494.png)

* Step 2: `sudo apt install gnupg2`

![](https://images.viblo.asia/837e3719-917c-4f62-88d6-344a2c066d57.png)

* Step 3: `sudo apt install curl`

![](https://images.viblo.asia/30c47f20-6648-494c-adab-aa89ca54e09a.png)

* Step 4: `curl -sSL https://rvm.io/mpapis.asc | gpg --import -`

![](https://images.viblo.asia/0509347e-5664-4744-9f3f-4c696b57f3ac.png)

* Step 5: `curl -sSL https://rvm.io/pkuczynski.asc | gpg --import -`

![](https://images.viblo.asia/91486a38-ae04-4e1b-9596-ffbb944c6017.png)

* Step 6: `curl -sSL https://get.rvm.io | bash -s stable` && `source ~/.bashrc`

![](https://images.viblo.asia/0efe3929-3861-4d67-afa9-d19abe6a1869.png)

* Step 7: `rvm --version`

![](https://images.viblo.asia/72af8261-e1fb-431b-ac55-669fc5520263.png)


**INSTALL RUBY**
* Step 8: `rvm install ruby`

![](https://images.viblo.asia/04d19961-d9cb-40d3-b6e7-5ed440997f90.png)

* Step 9: `rvm install 2.7.2`

![](https://images.viblo.asia/c47563f6-e381-4d5f-b27a-da61de5708bc.png)

* Step 10: `sudo apt install ruby` && check `ruby --version`

![](https://images.viblo.asia/4ff2f824-90be-40bb-8e01-ce26ea80d7dc.png)


**INSTALL RAILS**

* Step 11: `sudo apt install ruby-railties` & check `rails -v`

![](https://images.viblo.asia/33e5ded9-ad2a-4d6d-adb5-abfad2d5256f.png)

* Step 12: `/bin/bash --login` && `rvm use 2.7.2 --default`

![](https://images.viblo.asia/436c21e2-be41-4044-becd-5de117d88131.png)

* Step 13: install rails version , i install rails 6.1 `gem install rails --version=6.1.4` && `rails -v`

![](https://images.viblo.asia/e24f0c5c-dfb3-462a-b199-6253c8b3f6a9.png)

**INSTALL MYSQL**
* Step 14: `sudo apt install mysql-server`

![](https://images.viblo.asia/d243175f-4ce3-4aa7-bd1d-005bc96bb3a3.png)

* Step 15: `sudo mysql_secure_installation`
Come here, you set a password and keep saying yes
![](https://images.viblo.asia/206e5a26-bfd7-4685-9c00-a1e8b3745b75.png)


* Step 16: `sudo mysql -u root -p`
   Press enter  `ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'welcome123';`

![](https://images.viblo.asia/b5e9e4f7-73a4-4cb3-a7e6-8b3d7203dd89.png)

* Step 17: `ALTER USER 'user'@'localhost' IDENTIFIED WITH mysql_native_password BY 'welcome123';`
in case error  **Your password does not satisfy the current policy requirements**
then enter  `SHOW VARIABLES LIKE 'validate_password%';`

![](https://images.viblo.asia/89410ad6-26d9-4ab8-89d9-62cb32967e57.png)

enter 3 line this code 
```
SET GLOBAL validate_password_policy=LOW;
SET GLOBAL validate_password.length = 9; 
SET GLOBAL validate_password.number_count = 0;
```
If there is no error, continue
This is you set your mysql password, to connect the database
![](https://images.viblo.asia/ecf918e3-94e4-4612-9e42-9673245ecde4.png)

* Step 19 : `sudo mysql -u root -p`
Result
![](https://images.viblo.asia/d4bfaa64-9280-4889-8e20-ad17f04e0819.png)

That's it, just to be sure, try to enter it wrong and see if it gives you this error, Result

![](https://images.viblo.asia/76509cc3-ed7d-4632-9b61-2cf502ddad26.png)

DONE !

**Install mysql workbench** 
* Step 20 : [LINK SETTING ](https://computingforgeeks.com/install-and-use-mysql-workbench-on-ubuntu/)

Result

![](https://images.viblo.asia/c7699ec9-4728-44fc-89d4-04991df401ed.png)

* Step 21: connect mysql workbech
Enter your password mysql 

![](https://images.viblo.asia/67414714-92b3-4345-8a3b-ab0c654893e8.png)

result :

![](https://images.viblo.asia/4c4f4023-99f3-4bac-9bdb-ca327565c304.png)

Done :D