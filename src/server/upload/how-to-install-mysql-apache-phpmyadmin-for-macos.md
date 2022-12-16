Install Mysql and phpmyadmin for macos _ how to install mysql for macos
- Hello, My name is truongpd. I'm newbie FE devloper . To day, I happy to share with all of you about. How to install mysql and phpmyadmin on Macos! Because I want to fetch data from backEnd.
- I've used XAMPP, MAMP and after using. I feel uncomfortable.
- I search google to STS page and find one tutorial . Below is how.
I. Start Now

1. Check Macos has apache
``sudo apachectl start``

2. Open file httpd.conf for command line
> ```sudo nano /etc/apache2/httpd.conf```
- Find and unmount line #Loadmodule php7..... ( open comment, delele before #) (active using php 7)
- Restart Apache = command line : ``sudo apachectl restart``
- Get url :  http://localhost (website will show content Its work).

3. Test demo using index.php
- Download php
- ``sudo nano /etc/apache2/httpd.conf``
- Add index.php in DirectoryIndex line sudo apachectl restart
- Add code test : ```<?php phpinfo(): ?>```
> test: http://localhost/index.php

4. Download mysql
- Follow and get link : ![Mysql] (https://dev.mysql.com/downloads/)
- ``!note`` When installing remember password
- Create mysql : sudo mkdir /var/mysql
- sudo ln -s /tmp/mysql.sock /var/mysql/mysql.sock ( create mySQl connect phpMyadmin )
-  Get System Preferences on macos : Click logo ``mysql`` and Start mysql Server
``` Click icon Apple top-left > System Preferences > mySQl > Start mysql Server```

5. Setting connect
```cd /usr/local/mysql/bin```
``sudo ./mysql -u root -p`` (Login with the password entered at first install mySQl App )
> Alter user 'root'@'localhost identified by 'newpassword' ( If you want to change the password, You can skip this step)
> exit ( quit manager mysql)

6. Download phpmyadmin: https://www.phpmyadmin.net
- Copy paste it into Documents folder and rename to phpMyAdmin - after decompressing the directory then copy to the documents folder  ( ``Library⁩ ▸ ⁨WebServer⁩ ▸ ⁨Documents  ▸ phpMyAdmin ``).
- commanline: ```cd /Library/Webserver/Documents/``` > ```cd phpMyAdmin``` > ```sudo mkdir config``` > ```sudo chmod o+x config``` ( chmod ) >
- open localhost/phpmyadmin
- Get : ![SetupFileConfig] (http://localhost/phpmyadmin/setup/)
- Click ``New server`` > ``Authentication`` > `` Enter your user root and password`` > ``Download Config`` >> Copy/Paste config into config folder ( ``Library⁩ ▸ ⁨WebServer⁩ ▸ ⁨Documents  ▸ phpMyAdmin ``)

Document-references STS youtube!