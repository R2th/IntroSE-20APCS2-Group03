Khi làm việc với code php chúng ta thường sử dụng xdebug để  debug code nhưng vào 1 ngày đẹp trời tự dưng sau 1 loạt update của hệ thống chúng ta không thể sử dụng được xdebug nữa, điều đó làm cho hiệu quả công việc kém đi khi phải dùng var_dum() hoặc echo để debug. 
Sau khi tìm hiểu mất khá nhiều thời gian thì mới phát hiện ra phiên bản 3.0.1 đã bị đổi port thay vì dùng cổng 9000  bây giờ dùng cổng 9003 . Đến đây tưởng chừng như đã fix được nhưng không cuộc sống mà xdebug vẫn không hoạt động đến đây ta cần config lại một chút nữa .

Đầu tiên chúng ta  thay đổi file php.ini ở đây mình dùng apache2 và php 7.2 nên sẽ chạy lệnh sau :
`sudo gedit  /etc/php/7.2/fpm/php.ini`
coppy dòng config sau vào file php.ini 
[xdebug]
```
;zend_extension=xdebug.so
zend_extension = /usr/lib/php/20190902/xdebug.so
xdebug.start_width_request = yes
xdebug.idekey =VSCODE
xdebug.mode =debug 
xdebug.discover_client_host = false
xdebug.client_host=127.0.0.1
xdebug.client_port=9003
xdebug.remote_enable = 1
xdebug.remote_autostart=on
```
![](https://images.viblo.asia/91b849ba-c79c-4f44-b2d5-5319ff6a4afc.png)
 
 Tiếp theo vào file xdebug.ini để edit 
` sudo gedit /etc/php/7.2/mods-available/xdebug.ini`
thêm dòng sau vào file 
```
xdebug.remote_enable = 1
xdebug.remote_port = 9003
xdebug.idekey = VSCODE
xdebug.show_error_trace = 1
xdebug.remote_autostart = 0
```
![](https://images.viblo.asia/055e43b1-225e-4cbe-b390-06b305e476ff.png)

Sau khi sửa song ở file ini ta sửa cổng trong file json 
![](https://images.viblo.asia/3a38bb0f-9e8e-439b-a0bb-8359a1df0939.png)

cuối cùng restart apache2 and fpm để hưởng thụ thành quả :
```
sudo service apache2 restart 
```
```
sudo service php7.2-fpm restart
```
kiêmr tra hoạt động 
https://yoursite/?XDEBUG_SESSION_START=1