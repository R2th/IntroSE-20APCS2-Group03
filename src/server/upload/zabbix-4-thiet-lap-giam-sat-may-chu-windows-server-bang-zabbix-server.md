Bài viết này sẽ hướng dẫn các bạn cài đặt Zabbix agent trên Windows Server và khai báo host trên hệ thống Zabbix Server

Bước 1: Tải về zabbix agent cho Windows Server
Tải gói zabbix agent từ trang https://www.zabbix.com/download_agents
![image.png](https://images.viblo.asia/b7ab7d53-45f1-4942-ade8-f060fb3b76aa.png)

![image.png](https://images.viblo.asia/c847a73b-17b0-433a-8a65-346b40ae75cd.png)

Bước 2: Cài đặt cấu hình zabbix agent
Giải nén gói cài vào thư mục C, cấu hình file zabbix_agent.conf 
![image.png](https://images.viblo.asia/11c312c5-fb90-4b10-9061-19c0d7e6cfd3.png)

```
Server=[zabbix server ip]
ServerActive=[zabbix server ip]
Hostname=[hostname of client system]
```

Đứng trong thư mục C:\zabbix\bin mở cmd dưới quyền admin, chuyển hướng vào thư mục conf trong zabbix, gõ lệnh cài đặt khởi động agent
```
zabbix_agentd.exe --config C:\zabbix\conf\zabbix_agentd.conf --install
zabbix_agentd.exe [6944]: service [Zabbix Agent] installed successfully
zabbix_agentd.exe [6944]: event source [Zabbix Agent] installed successfully

zabbix_agentd.exe --start
zabbix_agentd.exe [3960]: service [Zabbix Agent] started successfully
```

Bước 3: Kiểm tra zabbix agent đã hoạt động hay chưa
Vào run gõ services.msc tìm trạng thái "Zabbix Agent"
![image.png](https://images.viblo.asia/aadee1fd-3ffe-4155-b4c8-3656fa89cfe9.png)

Thiết lập khởi động zabbix agent cùng hệ thống, chọn Automatic (Delayed Start) >> Apply >> Ok
![image.png](https://images.viblo.asia/12fcb872-90ba-4841-810b-b31b3da49a83.png)

Note: Bổ sung một số lệnh chạy CMD (Quyền Admin)
```
sc stop "Zabbix Agent"
sc start "Zabbix Agent"
sc delete "Zabbix Agent"

sc query "Zabbix Agent" | findstr /i "STATE"
```

Bước 4: Thiết lập port trên Firewall
Vào Windows Firewall, tạo rule inbound cho phép port zabbix agent
![image.png](https://images.viblo.asia/ccd1aebf-72ec-444e-b64c-c81a32cd48d8.png)

Bước 5: Thêm host Windows
a. Tạo một Host group
Vào Configuration >> Host groups >> Create host group, điền tên Group name
![image.png](https://images.viblo.asia/a5288c19-6614-4d2a-bacb-ace16b38339b.png)

b. Thêm host
Vào Configuration >> Hosts >> Create host
![image.png](https://images.viblo.asia/36cb372e-8373-4c2d-99b6-7cdf73c24d54.png)

Chọn template
![image.png](https://images.viblo.asia/ff847a4a-6669-44e5-904d-d75b1b7d8874.png)

Bước 6: Kiểm tra đã có dữ liệu zabbix agent đẩy về zabbix server chưa
Để biết zabbix agent đã khai báo thông tin về zabbix server chưa, hoạt động bình thường hay không, ta chờ 5, 10 phút sau khi khai báo host thực hiện:
Vào Monitoring >> Lastest Data >> Chọn host vừa cài đặt >> Apply
![image.png](https://images.viblo.asia/0a637620-5b4a-4fd6-8ca7-604fff390e38.png)

Xem kết quả ở cột Last Check và Last value xem các thông tin có được cập nhật hay không, nếu chúng được cập nhật thì bạn đã khai báo host trên zabbix server thành công.