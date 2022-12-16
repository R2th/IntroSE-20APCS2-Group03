Phần 1: [.Net Core API Project With EF6 code first, Responsitory Design Partern](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-GrLZDw0BKk0)

Phần 2: [.Net Core API Project With EF6 code first, Responsitory Design Partern - P2 - Create Repository](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p2-create-repository-djeZ1V2GlWz)

Phần 3: [Net Core API Project With EF6 code first, Responsitory Design Partern - P3 - Create Configuration from database](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p3-create-configuration-from-database-OeVKBywM5kW)

Phần 4: [Net Core API Project With EF6 code first, Responsitory Design Partern - P4 - Sử dụng JWT để thực hiện Authorization.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p4-su-dung-jwt-de-thuc-hien-authorization-gGJ59jmDKX2)

Phần 5: [Net Core API Project With EF6 code first, Responsitory Design Partern - P5 - Create Dynamic Authorization Policy.](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p5-su-dung-jwt-de-thuc-hien-authorization-part-2-gGJ59jD1KX2)

Phần 6: [Net Core API Project With EF6 code first, Responsitory Design Partern - P6 - Handle midware](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p6-handle-midware-V3m5Woxg5O7)

Phần 7: [Net Core API Project With EF6 code first, Responsitory Design Partern - P7 - Deploy With Centos](https://viblo.asia/p/net-core-api-project-with-ef6-code-first-responsitory-design-partern-p7-deploy-with-centos-XL6lAxpgZek)

Ở phần trước chúng ta đã setup xong môi trường server rồi, giờ chúng ta tiếp tục đi config các thứ khác nhé:

Hiện tại mình đang deploy với môi trường như sau:
 - OS: Centos7
 - Apache
 - .Net Core 2.0.3

#  Connect to server
   Điều kiện cần thiết:
       - public key của máy deploy phải được add vào server
       
`ssh user_name@serverIP (root@127.0.0.1)`

# Cài đặt môi trường, dành cho lần đầu tiên deploy
## Cài đặt .Net Core 
Thực hiện các lệnh sau
```
sudo yum install libunwind libicu
sudo rpm --import https://packages.microsoft.com/keys/microsoft.asc
sudo sh -c 'echo -e "[packages-microsoft-com-prod]\nname=packages-microsoft-com-prod \nbaseurl=https://packages.microsoft.com/yumrepos/microsoft-rhel7.3-prod\nenabled=1\ngpgcheck=1\ngpgkey=https://packages.microsoft.com/keys/microsoft.asc" > /etc/yum.repos.d/dotnetdev.repo'
sudo yum update
sudo yum install dotnet-sdk-2.1.101
export PATH=$PATH:$HOME/dotnet
```

## Cài đặt Apache
### Cài đặt
```
sudo yum update -y
sudo yum -y install httpd mod_ssl
cd /etc/httpd/conf.d/
sudo vim sample_api_sys.conf
```

### Tiền hành tạo file config cho Apache

```
<VirtualHost *:80>
        ServerName domain.com
        ProxyPreserveHost On
        ProxyPass / http://localhost:5001/
        ProxyPassReverse / http://localhost:5001/
        ErrorLog /var/log/httpd/sample_api_sys_error.log
        CustomLog /var/log/httpd/sample_api_sys_access.log common
 </VirtualHost>
```

Mình có lượm nhặt về một số thông tin các config cần thiết, ở bài viết này có một số config thì mình đang đi xin code về nên có nhiều cái chưa hiểu rõ, nên mọi người thông cảm :D.

| Tên Config | Nội dung | 
| -------- | -------- |
| <VirtualHost *:80> | Đây là cổng sẽ apache sẽ bắt khi có request     |
| ServerName | Domain sẽ được gắn cho IP của server    |
| ProxyPreserveHost | Giúp Apache truyền qua header Host  tới server phụ trợ. Điều này giúp cho  server phụ trợ có thể nhận biết được địa chỉ truy cập vào ứng dụng của nó.    |
| ProxyPass | Là mục cấu hình proxy chính, trong trường hợp này nó xác định tất cả dữ liệu dưới URL gốc (/) để ánh xạ tới server phụ trợ tại địa chỉ cho trước. Ví dụ nếu Apache nhận yêu cầu truy cập /example, nó sẽ kết nối tới http://localhost:5001//example và phản hồi kết quả cho người truy cập.    |
| ProxyPassReverse | Có cùng cấu hình với ProxyPass. Nó lệnh cho Apache điều chỉnh header phản hồi từ server phụ trợ để đảm bảo rằng nếu nó trả về header được định vị lại vị trí, thì trình duyệt của người truy cập sẽ được điều hướng lại tới địa chỉ proxy chứ không phải địa chỉ server phụ trợ, cái mà sẽ không hoạt động như dự kiến.|
| ErrorLog | Vị trí file log của Apache khi xảy ra lỗi.|
| CustomLog | Vị trí file log của Apache khi xảy ra lỗi access.|


### Save file config và test thử syntax của file config:

```
sudo service httpd configtest
```

Command line sẽ trả về kết quả ok nếu như chúng ta đúng syntax
### Khởi động Apache
```
service httpd start
```

# Cài đặt Git
```
sudo yum install git
```

Để thuận tiện cho deploy thì mỗi project sẽ có 1 branch dùng để chứa các file publish và mỗi lần deploy sẽ push code từ máy của dev lên bitbucket và từ server sẽ pull code về. Ở bài trước mình đã có hướng dẫn tạo 1 branch để phục vụ cho việc deploy, bạn nào chưa xem thì coi ở bài trước nhé.

## Get deploy code
```
cd /home/
sudo mkdir SampleNetCoreAPI (tùy vào API nào mà đặt tên folder cho dễ quản lý)
sudo git clone <git_url>
chmod 644 * 
ls -la
chmod +x .
Cd
```

# Config Service
Nãy chúng ta đã config xong Apache, bây giờ chúng ta sẽ tiếp hành tạo các service để bật tắt Project của chúng ta nha.
```
cd /etc/systemd/system/
/usr/sbin/setsebool -P httpd_can_network_connect 1
sudo vim sample_net_core_api.service
```

Copy và Paste

```
[Unit]
    Description=Sample  .NET Web API Application running on CentOS 7
    [Service]
    WorkingDirectory=/home/SampleNetCoreAPI/NetCoreSampleDeploy
    ExecStart=/usr/share/dotnet/dotnet /home/SampleNetCoreAPI/NetCoreSampleDeploy/SampleNetCoreAPI.dll
    Restart=always
    RestartSec=10
    SyslogIdentifier=dotnet-sampleNetCore
    User=root
    Environment=ASPNETCORE_ENVIRONMENT=Production
    [Install]
    WantedBy=multi-user.target
```

Ok chúng ta save lại và coi như chúng ta đã tạo xong service cho API rồi.

Giờ là lúc start nó nào:

```
sudo systemctl enable sample_net_core_api.service
sudo systemctl start sample_net_core_api.service
sudo systemctl status sample_net_core_api.service
```

# Config FireWall

Chúng ta tiến hành cài đặt và config cho firewall của Server bằng các lệnh sau:
```
sudo yum install firewalld -y
sudo systemctl enable firewalld.service
sudo systemctl start firewalld.service
sudo firewall-cmd --add-port=80/tcp --permanent
sudo firewall-cmd --add-port=443/tcp --permanent
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```

Đến đây coi như chúng ta đã config và deploy xong rồi. từ lần sau trở đi các bạn chỉ cần thực hiện một số lệnh sau để get code mới nhất và bật tắt server thôi

# Dành cho những lần deploy khác
```
cd /home/SampleNetCoreAPI/NetCoreSampleDeploy
sudo git pull origin master
sudo systemctl stop sample_net_core_api.service
sudo systemctl start sample_net_core_api.service
sudo systemctl status sample_net_core_api.service -l
```

# Một số lỗi thường gặp:


| Lỗi | Phương án giải quyết | 
| -------- | -------- |
| Sai version của .net core     | Trong trường hợp này các bạn nên sử dụng  lệnh   ```dotnet --info``` để kiểm tra xem là hiện tại Server có đang chạy đúng version ko| 
| Lỗi 503 service temporarily unavailable     | Lỗi này thường là do các bạn chưa start Apache nên khi request lên server sẽ báo về như vậy| 
|  Lỗi thiếu dll    |Lỗi này là do Git Ignore đôi khi nó ignore một số file .dll nên các bạn cần check kỹ xem bằng cách sau, Redirect tới folder chứa code, cụ thể trong bài này là "/home/SampleNetCoreAPI/NetCoreSampleDeploy" ```cd /home/SampleNetCoreAPI/NetCoreSampleDeploy```. Chạy thử API xem có throw error nào ko bằng cách chạy lệnh ```donet SampleNetCoreAPI.dll``` Nếu như có lỗi thì sẽ được in ra ở màn hình command line giúp các bạn biết project đang có vấn đề gì ko.| 

Vậy là chúng ta đã hoàn thành việc tạo 1 API bằng .Net Core và deploy nó rồi. Từ bài sau mình sẽ tiền hành viết các bài liên quan đến ReactJS nhé mn.