Hôm nay mình sẽ trình bày với các bạn bài viết về việc config Zabbix trên Ubuntu:
## 1. Chuẩn bị
   1 Server Ubuntu 16.04 <br>
   	2 CPU | 2 GB RAM <br>
    Set IP tĩnh, Ping được internet, update các gói package.
## 2. Cài đặt zabbix:
###     2.1: Download & cài đặt package zabbix.
  Đầu tiên, ta download package zabbix về: <br>
          `root@huylv-zabbix:~# wget http://repo.zabbix.com/zabbix/3.4/ubuntu/pool/main/z/zabbix-release/zabbix-release_3.4-1+xenial_all.deb ` <br>
![](https://images.viblo.asia/316e896d-e08c-4b17-94a7-355074774a1f.png)<br>
<br>
    Kiểm tra package đấy đã down thành công chưa ? sau đó tiến hành cài đặt.<br>
  `root@huylv-zabbix:~#   dpkg -i zabbix-release_3.4-1+xenial_all.deb`<br>
     ![](https://images.viblo.asia/c6dc248c-6e63-4374-b888-55b83993cc53.png)<br>
###      2.2: Cài đặt thêm gói cài đặt cần thiết: zabbix server, zabbix client, mysql, php...
  Update lại các package mới <br>
     ![](https://images.viblo.asia/2d3a1a68-2348-4d55-a045-770aa294f15e.png)
     <br>  <br>
     Tiến hành cài đặt<br>
    ` root@huylv-zabbix:~# apt-get install zabbix-server-mysql zabbix-frontend-php zabbix-agent zabbix-get zabbix-sender snmp snmpd snmp-mibs-downloader php7.0-bcmath php7.0-xml php7.0-mbstring`
     <br>
     ![](https://images.viblo.asia/bf381cf1-75a8-414a-9d16-507f472552e7.png)
###      2.3 Edit time zone của zabbix server
   Open file /etc/zabbix/apache.conf  sau đó edit time zone Việt Nam : Asia/Ho_Chi_Minh <br>
    `root@huylv-zabbix:~# vi /etc/zabbix/apache.conf`<br>
    ![](https://images.viblo.asia/e7ddf7d6-ac4e-4d2f-8fc7-fe68cc482dcc.png)<br>
    Reload lại services để hoàn thành việc update time zone. <br>
    `systemctl reload apache2`<br>
###     2.4 Tạo database và user truy cập database
   Truy cập vào database, <br>
   user: root<br>
   passwd: none<br>
   ` root@huylv-zabbix:/# mysql -u root -p`<br>
    ![](https://images.viblo.asia/94b0275b-ff76-4a4f-9aa6-0e9dbd4241cd.PNG)<br><br>
    Ta tiến hành tạo  với tên là zabbixdb, gán quyền & thực thi quyền ngay lập tức.<br>
    `MariaDB [(none)]> create database zabbixdb character set utf8 collate utf8_bin;`  <br>
`MariaDB [(none)]> grant all privileges on zabbixdb.* to zabbixuser@localhost identified by '123456a@';` <br>
`MariaDB [(none)]> flush privileges;`<br>
`MariaDB [(none)]> quit`<br><br>
    ![](https://images.viblo.asia/896e1caa-dcaa-42bc-95f2-b79b2ab3f1ed.PNG)<br>
###     2.5  Import database ban đầu của zabbix
   Database đã có, chừ ta tiến hành import database default của zabbix. <br>
   `cd /usr/share/doc/zabbix-server-mysql/` <br>
 `  zcat create.sql.gz | mysql -u root -p zabbixdb `  
<br>
    ![](https://images.viblo.asia/acbcd166-7432-413f-8994-4639791b574b.PNG)
###    2.6 Config database
   Mở file zabbix_server.conf & tiến hành update lại một vài thông số như: DBHost, DBName, DBUser, DBPassword <br>
   -> Những thông số này đã được tạo ở phía trên.<br>
  ` vi /etc/zabbix/zabbix_server.conf`<br>
   ![](https://images.viblo.asia/481edcc9-b071-4774-be6e-4ddb1e5f40a1.PNG)<br>
   Confirm lại đã update chưa ?<br>
   `root@huylv-zabbix:~# cat /etc/zabbix/zabbix_server.conf | nl | grep DBHost `<br>
   ![](https://images.viblo.asia/63eb739e-f86a-4d4b-a367-e8e1688f2397.png)
###    2.7 Tiến hành Restart service zabbix-server, zabbix-agent.
 `root@huylv-zabbix:/# systemctl enable zabbix-server ` <br>
  ` root@huylv-zabbix:/# systemctl start zabbix-server `<br>
 `  root@huylv-zabbix:/# systemctl enable zabbix-agent` <br>
  ` root@huylv-zabbix:/# systemctl start zabbix-agent `<br>
        
###    2.8 Quản lí zabbix bằng giao diện web.
Truy cập web bằng địa chỉ IP máy server ta cài khi nãy. <br>
<br>
http://172.16.200.13/zabbix/setup.php <br>
Giao diện zabbix hiển thị, ta chọn next để tiếp tục. <br>
<br>
![](https://images.viblo.asia/965273dc-d82c-42df-a8a4-e7a12df6e1c1.png) <br><br>
Check lại điều kiện tối thiểu để chạy zabbix - xem đã đạt chưa ? <br>
Nếu OK -> next để tiếp tục. <br>
![](https://images.viblo.asia/15ca3bd1-8df1-44bc-af9b-64342c981604.png)<br><br>
<br>
Nhập tên DB, User, password (thông số này phía trên đã có cài) <br>
![](https://images.viblo.asia/43958351-eae6-485f-b5c6-3919bfdd86fa.png)<br><br>
<br>
Đặt tên hiển thị trên web-zabbix  <br>
![](https://images.viblo.asia/f9e47a67-0a3b-490f-8056-268fccad72c2.PNG)<br><br>
<br>
Check lại 1 lần tổng thể xem như thế nào ?<br>
OK -> next để tiếp tục.<br>
![](https://images.viblo.asia/971e82fd-f97a-421d-b266-6f3ad4d89179.png)<br>
<br>
Lựa chọn finish để hoàn thành thiết lập zabbix.<br>
![](https://images.viblo.asia/7a2c0321-b38c-4730-ac1f-ce04118408ac.PNG)<br>
### 2.9 Giao diện Zabbix trên web.
 Giao diện thành công sẽ như bên dưới.<br>
 Lần đầu tiên chưa có gì để test monitor -> thì ta lấy chính nó để monitor.<br>
 Monitoring -> Lastest data -> Host (nhập zabbix server) -> Check xem các value...<br>
 ![](https://images.viblo.asia/11ac4484-1e80-485f-955c-1335a51b4077.PNG)
##  3. Trouble shoot.
 Nếu trong trường cảm thấy phát sinh lỗi hay nghi ngờ..<br>
 ta có thể check log để xem hiện trạng như thế nào.<br>
 SSH vào server zabbix -> Sau đó truy cập log<br>
 `root@huylv-zabbix:~# cat /var/log/zabbix/zabbix_server.log` <br>
 
 Ví dụ như thế này - là đang có một lỗi, lỗi DBname đang config sai trong file zabbix_server.conf<br>
 ![](https://images.viblo.asia/550011f5-fb20-422d-b1c2-bd0db44c7990.PNG)<br>

<br>
<br>
Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai xót có thể góp ý để em(mình) cải thiện.<br>
Trong bài viết tiếp theo sẽ hướng dẫn monitor các thiết bị cơ bản như: Router, Switch, Linux, Windows...<br>
<br>
Nguồn tham khảo:<br>
https://www.zabbix.com/documentation/3.4/manual/installation/requirements<br>
http://kb.nhanhoa.com/pages/viewpage.action?pageId=2785400<br>