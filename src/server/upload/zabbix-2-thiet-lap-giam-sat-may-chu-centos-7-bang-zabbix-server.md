Bài trước mình đã hướng dẫn các bạn cài đặt Zabbix Server trên hệ điều hành Centos 7.
Ở bài này mình sẽ hướng dẫn các bạn thiết lập giám sát máy chủ Centos, trước khi thực hiện mình sẽ tìm hiểu qua một số  khái niệm cơ bản:
* Host: Là một máy tính, server, vps chạy các hệ điều hành khác nhau hoặc một thực thể trong hệ thống mạng.
* Templates: Là một bố cục hay một thành phần được tạo ra sẳn để không cần phải lặp lại khi gặp đúng trường hợp
* Items: Đây là một nơi chứa các key như key memory, key cpu, key hdd ... Items được đưa vào trong một templates.
* Triggers: Là một điều kiện thỏa mãn điều kiện của Trigger mà người lập trình đặt ra thì sẽ thực hiện một hành động nào đó tiếp theo.
* Graps: Là một sơ đồ giám sát trực quan để người quản trị nhìn các thông tin một cách dễ dàng hơn.

**1. Cài đặt zabbix agent**

Để monitor được các host chúng ta cần cài đặt zabbix agent trên các host
Bước 1: Tải về Zabbix-agent
```
rpm -Uvh https://repo.zabbix.com/zabbix/4.4/rhel/7/x86_64/zabbix-agent-4.4.0-1.el7.x86_64.rpm
```

Bước 2: Cài đặt Zabbix-agent
```
yum install zabbix-agent -y
```

Bước 3: Cấu hình Zabbix-agent
Sửa file cấu hình /etc/zabbix/zabbix_agentd.conf theo các tham số sau
```
Server=<IP_ZABBIX_SERVER>
ServerActive=<IP_ZABBIX_SERVER>
Hostname=<ZABBIX_SERVER_HOSTNAME>
```

Bước 4: Cấu hình firewalld
```
firewall-cmd --zone=public --add-port=10050/tcp --permanent
firewall-cmd --reload
```

Bước 5: Khởi động lại Zabbix-agent
```
systemctl enable zabbix-agent
systemctl restart zabbix-agent
```

Bước 6: Kiểm tra lại việc cài đặt zabbix-agent
Thực hiện trên Zabbix Server, sử dụng zabbix-get để kiểm tra
```
zabbix_get -s <ZABBIX_AGENT_IP> -k agent.version
```

Nếu output hiển thị version của zabbix-agent thì việc kết nối từ zabbix-server đến zabbix-agent đã thành công.

**2. Thêm host Centos 7 trên giao diện Zabbix-server**

Bước 1: Đăng nhập vào dashboard Zabbix-server
![image.png](https://images.viblo.asia/6a8154a9-3609-42b7-b870-b457f88414e9.png)

Bước 2: Chọn Configuration >> Chọn Host >> Chọn Create Host
![image.png](https://images.viblo.asia/36967cb7-1dff-4b53-ad6a-7dfa438b2574.png)

Bây giờ các bạn điền các thông tin cần thiết như hình dưới
![image.png](https://images.viblo.asia/b2debd8f-05fe-47a6-b6ba-0f85ed981da6.png)

Bước 3: Chọn Templates  để giám sát dịch vụ
Trên Zabbix hiện nay đã được hỗ trợ rất nhiều Template khác nhau, tuy nhiên ở bài viết này mình chỉ sử dụng một số template thường dùng cho việc giám sát một máy chủ Linux
Các templates sử dụng:
* HTTPS Services
* ICMP Ping
* Linux by Zabbix agent
* Mysql by Zabbix agent

![image.png](https://images.viblo.asia/43681b7a-1368-475b-9db2-b256cd391bb9.png)

Nhấn Add để hoàn thành cấu hình add host

![image.png](https://images.viblo.asia/211aa53b-6de9-4423-88c4-6578c132eab6.png)

Như vậy chúng ta đã hoàn thành việc add giám sát một máy chủ Linux.