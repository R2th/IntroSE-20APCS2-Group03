Nối tiếp bài viết trước bài viết trước [Phần 1 - Cài đặt môi trường và firewall ](https://viblo.asia/p/huong-dan-setup-server-vps-host-aspnet-net-core-mongodb-nginx-va-bao-ve-server-co-ban-bang-ufw-fail2ban-phan-1-cai-dat-moi-truong-va-firewall-m68Z0j9N5kG),  [Phần 2 - Phần 2 - hướng dẫn setup nginx ](https://viblo.asia/p/huong-dan-setup-server-vps-host-aspnet-net-core-mongodb-nginx-va-bao-ve-server-co-ban-bang-ufw-fail2ban-phan-2-huong-dan-setup-nginx-djeZ1dM8KWz). Hôm nay mình sẽ hướng dẫn Host web với ASP.Net, .Net Core và MongoDB.
# Cài đặt MongoDB:
MongoDB là một cơ sở dữ liệu document được sử dụng trong nhiều ứng dụng web hiện đại. Nó được phân loại là cơ sở dữ liệu NoSQL vì nó không dựa trên cấu trúc cơ sở dữ liệu quan hệ dựa trên bảng truyền thống.
Đầu tiên mình sẽ kiểm tra status của MongoDB.
```
sudo systemctl status mongod
```
```
 mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-06-09 12:57:06 UTC; 2s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 37128 (mongod)
     Memory: 64.8M
     CGroup: /system.slice/mongod.service
             └─37128 /usr/bin/mongod --config /etc/mongod.conf
```
Sau khi xác nhận rằng dịch vụ đang chạy như mong đợi, hãy kích hoạt dịch vụ MongoDB để khởi động khi khởi động:
```
sudo systemctl enable mongod
```
# Câu lệnh để quản lý MongoDB Process:
Stop MongoDB:
```
sudo systemctl stop mongod
```
Start MongoDB
```
sudo systemctl start mongod
```
Restart MongoDB
```
sudo systemctl restart mongod
```
Nếu bạn muốn tắt tính năng khởi động tự động:
```
sudo systemctl disable mongod
```
#  Kích hoạt Authentication trên mongo.
Để bảo vệ data của bạn an toàn mình mình khuyến nghị nên kích hoạt Authentication.
**Đầu tiên mình sẽ thêm Administrative User **

Để thêm người dùng quản trị, trước tiên bạn phải kết nối với Mongo shell. Vì xác thực bị vô hiệu hóa nên bạn có thể làm như vậy với lệnh mongo mà không có bất kỳ tùy chọn nào khác:
```
mongo
```
```
Output
MongoDB shell version v4.4.0

 . . . 

2020-06-09T13:26:51.391+0000 I  CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2020-06-09T13:26:51.391+0000 I  CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.

 . . .

> 
```
Những cảnh báo này sẽ biến mất sau khi bạn bật xác thực, nhưng hiện tại, chúng có nghĩa là bất kỳ ai có thể truy cập máy chủ Ubuntu của bạn cũng có thể kiểm soát cơ sở dữ liệu của bạn.
Là một phần của việc giảm thiểu lỗ hổng này, bước này tập trung vào việc thêm người dùng quản trị. Để làm điều này, trước tiên bạn phải kết nối với cơ sở dữ liệu quản trị. Đây là nơi lưu trữ thông tin về người dùng, như tên người dùng, mật khẩu và vai trò của họ:
```
use admin
```
```
Output
switched to db admin
```
Phương thức db.createUser, được sử dụng để tạo người dùng mới trên cơ sở dữ liệu mà phương thức được chạy trên đó.
```
db.createUser(
... {
... user: "AdminTest",
... pwd: passwordPrompt(),
... roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
... }
... )
```
Nếu cú pháp của mỗi dòng là chính xác, phương thức sẽ thực thi đúng cách và bạn sẽ được nhắc nhập mật khẩu:
```
Output
Enter password: 
```
Nhập mật khẩu mạnh mà bạn chọn. Sau đó, bạn sẽ nhận được xác nhận rằng người dùng đã được thêm vào:
```
Output
Successfully added user: {
    "user" : "AdminTest",
    "roles" : [
        {
            "role" : "userAdminAnyDatabase",
            "db" : "admin"
        },
        "readWriteAnyDatabase"
    ]
}
```
Sau đó, bạn có thể thoát khỏi ứng dụng MongoDB:
```
exit
```
Tại thời điểm này, người dùng của bạn sẽ được phép nhập thông tin đăng nhập. Tuy nhiên, họ sẽ không bắt buộc phải làm như vậy cho đến khi bạn kích hoạt xác thực và khởi động lại MongoDB daemon.

**Tiếp theo mình sẽ kích hoạt authentication **

Mở tệp cấu hình bằng trình soạn thảo văn bản ưa thích của bạn:
```
sudo nano /etc/mongod.conf
```
Tìm dòng `security`
```
. . .
#security:

#operationProfiling:

. . .
```
Gỡ comment dòng này:
```
. . .
security:

#operationProfiling:

. . .
```
Sau đó, thêm authorization  và đặt nó thành enabled . Khi bạn hoàn thành, các dòng sẽ trông như thế này:
```
. . .
security:
  authorization: enabled
. . .
```
*Lưu ý rằng dòng security: không có dấu cách ở đầu, trong khi dòng ủy quyền: được thụt lề với hai dấu cách.*
Save lại thay đổi của bạn, sau đó restart mongdb:
```
sudo systemctl restart mongod
```
Tiếp theo, hãy kiểm tra trạng thái của dịch vụ để đảm bảo rằng nó đã khởi động lại:
```
sudo systemctl status mongod
```
```
● mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2020-06-09 22:06:20 UTC; 7s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 15370 (mongod)
     Memory: 170.1M
     CGroup: /system.slice/mongod.service
             └─15370 /usr/bin/mongod --config /etc/mongod.conf

Jun 09 22:06:20 your_host systemd[1]: Started MongoDB Database Server.
```

**Kiểm tra Authentication kích hoạt**
```
mongo
```
Bây giờ bạn đã bật xác thực, sẽ không có cảnh báo nào bạn gặp phải trước đó xuất hiện:
```
Output
MongoDB shell version v4.4.0
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("5d50ed96-f7e1-493a-b4da-076067b2d898") }
MongoDB server version: 4.4.0
> 
```
Đảm bảo thay thế AdminTest bằng tên người dùng của người dùng quản trị của riêng bạn. Nó cũng bao gồm cờ -p, cờ này sẽ nhắc bạn nhập mật khẩu của người dùng và chỉ định quản trị viên làm cơ sở dữ liệu xác thực nơi tên người dùng được chỉ định được tạo:
```
mongo -u AdminTest -p --authenticationDatabase admin
```
#  Cài đặt ASP.Net , .Net Core:
Ở phần 1 mình đã hướng dẫn các bạn cài ASP.Net và .Net Core theo hướng dẫn của Microsoft.
Mình sẽ kiểm tra version ASP.Net , .Net Core đã cài :

Check SDK versions
```
dotnet --list-sdks
```
```
2.1.500 [/home/user/dotnet/sdk]
2.1.502 [/home/user/dotnet/sdk]
2.1.504 [/home/user/dotnet/sdk]
2.1.600 [/home/user/dotnet/sdk]
2.1.602 [/home/user/dotnet/sdk]
3.1.100 [/home/user/dotnet/sdk]
5.0.100 [/home/user/dotnet/sdk]
6.0.100 [/home/user/dotnet/sdk]
```
Check runtime versions:
```
dotnet --list-runtimes
```
```
Microsoft.AspNetCore.All 2.1.7 [/home/user/dotnet/shared/Microsoft.AspNetCore.All]
Microsoft.AspNetCore.All 2.1.13 [/home/user/dotnet/shared/Microsoft.AspNetCore.All]
Microsoft.AspNetCore.App 2.1.7 [/home/user/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.AspNetCore.App 2.1.13 [/home/user/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.AspNetCore.App 3.1.0 [/home/user/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.AspNetCore.App 5.0.0 [/home/user/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.AspNetCore.App 6.0.0 [/home/user/dotnet/shared/Microsoft.AspNetCore.App]
Microsoft.NETCore.App 2.1.7 [/home/user/dotnet/shared/Microsoft.NETCore.App]
Microsoft.NETCore.App 2.1.13 [/home/user/dotnet/shared/Microsoft.NETCore.App]
Microsoft.NETCore.App 3.1.0 [/home/user/dotnet/shared/Microsoft.NETCore.App]
Microsoft.NETCore.App 5.0.0 [/home/user/dotnet/shared/Microsoft.NETCore.App]
Microsoft.NETCore.App 6.0.0 [/home/user/dotnet/shared/Microsoft.NETCore.App]
```

Bạn có thể xem cả phiên bản SDK và runtime  bằng lệnh:
```
dotnet --info
```
#  Start web ASP.Net , .Net Core:
Tham khảo "https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-5.0"
Thông thường mình sẽ set Urls của web qua command. Các bạn có thể dùng các cách khác. Tham khảo : "https://andrewlock.net/5-ways-to-set-the-urls-for-an-aspnetcore-app/"
Start service cho trang `your_domain`
```
cd /var/www/your_domain
dotnet app_assembly.dll --urls=https://localhost:5001'
```
app_assembly.dll là tên assembly của ứng dụng web.
Ứng với config trong nginx :
```
location ~ ^/(?!api|guest)  {
                 root /var/www/your_domain;
                 proxy_pass        https://localhost:5001;
                try_files $uri $uri/ =404;
        }
```

**Tạo service file**

Tạo file definition:
```
sudo nano /etc/systemd/system/kestrel-webapp.service
```
```
[Unit]
Description=Example .NET Web API App running on Ubuntu

[Service]
WorkingDirectory=/var/www/your_domain
ExecStart=/bin/bash -c 'cd /var/www/your_domain && dotnet app_assembly.dll --urls=https://localhost:5001'
Restart=always
# Restart service after 10 seconds if the dotnet service crashes:
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=dotnet-example
User=www-data
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=DOTNET_PRINT_TELEMETRY_MESSAGE=false

[Install]
WantedBy=multi-user.target
```
Lưu ý User thông thường là www-data nếu gặp lỗi trong quá trình start `Unable to configure HTTPS endpoint. No server certificate was specified, and the default developer certificate could not be found or is out of date.`  do urls bạn chọn là https. Bạn có thể sửa bằng cách tạo hoặc refresh dev-certs cho user www-data:
```
sudo su -l www-data
dotnet dev-certs https -t
dotnet dev-certs https --trust
```

Sau đó save và kích hoạt service:

```
sudo systemctl enable kestrel-webapp.service
```

Start serive và chắc chắn nó hoạt động:

```
sudo systemctl start kestrel-webapp.service
sudo systemctl status kestrel-webapp.service

◝ kestrel-webapp.service - Example .NET Web API App running on Ubuntu
    Loaded: loaded (/etc/systemd/system/kestrel-webapp.service; enabled)
    Active: active (running) since Thu 2020-10-18 08:9:35 NZDT; 35s ago
Main PID: 9021 (dotnet)
    CGroup: /system.slice/kestrel-webapp.service
            └─9021 /bin/bash -c 'cd /var/www/your_domain && dotnet app_assembly.dll --urls=https://localhost:5001'
```

**Xem log**

Để xem log service bạn dùng lệnh:
```
sudo journalctl -fu kestrel-webapp.service
```
Để lọc thêm, các tùy chọn thời gian như --since today, --until 1 hour ago, hoặc kết hợp các tùy chọn này có thể làm giảm số lượng mục nhập được trả về.
```
sudo journalctl -fu kestrel-webapp.service --since "2020-10-18" --until "2020-10-19 04:00"
```
Nếu bạn muốn thêm `kestrel-webapp.service` start khi boot:
```
sudo systemctl enable kestrel-webapp.service .
```
Kiểm tra xem server web đã hoạt động chưa. Bạn truy cập `www.your_domain`

#  Tổng kết:
Bài viết này mình đã hướng dẫn các bạn cài đặt setup cơ bản của MongoDB và Host 1 web ASP.Net, .Net Core. Nếu có thắc mắc hoặc câu hỏi cần sự giúp đỡ thì đừng ngần ngại comment. Cảm ơn các bạn đã theo dõi, ở phần tiếp theo mình sẽ hướng dẫn setup HTTPS cho website các bạn bằng 2 cách self-certification và Let's Encrypt.

Bài viết này mình đã hướng dẫn các bạn cài đặt môi trường và setup cơ bản để bảo vệ server an toàn hơn. Nếu có thắc mắc hoặc câu hỏi cần sự giúp đỡ thì đừng ngần ngại comment. Cảm ơn các bạn đã theo dõi, ở phần tiếp theo mình sẽ hướng dẫn setup nginx cũng như một số mẹo mà mình biết.

Phần 1 - Cài đặt môi trường và firewall

Phần 2 - hướng dẫn setup nginx .

Phần 3 - Host web với ASP.Net, .Net Core và MongoDB

Phần 4 - Cấu hình HTTPS bằng self-certification hoặc Let's Encrypt.

Một phút quảng cáo, mình đang dùng VPS trên digitalocean.com. Đang có chương trình tặng 100$ cho account sử dụng trong 60 ngày, hãy đăng kí sử dụng và dùng invite link này "https://m.do.co/c/666bcca701f7" để ủng hộ mình.