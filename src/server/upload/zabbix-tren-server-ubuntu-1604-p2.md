### Trong bài trước mình đã hướng dẫn cài đặt zabbix, <br>
https://viblo.asia/p/cai-dat-zabbix-tren-server-ubuntu-1604-p1-V3m5WbwylO7 <br>
### Hôm nay tiếp theo, mình sẽ hướng dẫn thêm phần monitoring một vài thiết bị đơn giản.<br>
# 1. Chuẩn bị
 + Switch.
 + Router mikrotik.
 + PC chạy Win & Linux <br>
# 2. Monitor router mikrotik with zabbix.<br>
   Đầu tiên, đăng nhập vào mikrotik, sau đó lựa chọn:<br>
   IP ->  SNMP -> Enable SNMP -> Đặt tên cho Trap community<br>
   ![](https://images.viblo.asia/e42abe44-5f64-40e3-bba5-596b6dbf5869.png)<br>
   Tiếp theo ssh vào server zabbix,<br>
   Thực thi dòng lệnh sau:<br>
  ` root@framgia:~# snmpwalk -v 2c -c public 172.16.20.1`<br>
  172.16.20.1 -> Đây là IP của router.<br>
     ![](https://images.viblo.asia/a59a50c8-9490-4707-98f8-3cd7898e72c3.PNG) <br>
     Chờ cho nó chạy 1 tí:<br>
     ![](https://images.viblo.asia/c38a1b2c-5b73-4dff-bb74-2e2c128c7c34.PNG)<br>
     Sau khi chạy xong, ta vào giao diện web của zabbix, tạo host để monitor router mikrotik<br>
     ![](https://images.viblo.asia/7bf2e790-165b-4dfe-8125-ebe03b3f2713.png)<br>
     Lại tiếp tục chờ khoảng 20-30s. <br>
     Tại mục Availability, <br>
     Status: Enable + giao thức SNMP được bật thì -> OK<br>
     ![](https://images.viblo.asia/a87f3b56-e42a-4c99-8c8c-ee22b68dad94.png)<br>
     Check xem data đã đổ về chưa ?<br>
     Monitoring -> Latest data -> Search host -> Last check.<br>
     ![](https://images.viblo.asia/4a904992-3b3d-44f5-839e-dbb056658996.png)<br>
     Cơ bản thế là OK, tuy nhiên để xem trực quan thì ta tạo thêm screen để mình dể nhìn:<br>
     Monitoring -> Screens  -> Create Screen.<br>
     ![](https://images.viblo.asia/a2014ff8-0d5d-4c07-b08e-4c98ab790002.png)<br>
     Lựa chọn những thành phần cần monitor cho phù hợp.<br>
     Kết quả thành công sẽ thế này.<br>
     ![](https://images.viblo.asia/d13514f1-708e-45d9-ad18-62ba2f8efad4.PNG)<br>
#    3. Monitor Switch  with zabbix.<br>
   Đối với những thiết bị mạng, nguyên tắc ta chỉ cần tìm hiểu SNMP, cách monitor thì đa phần giống nhau cả.<br>
   Như thiết bị  switch dưới đây:<br>
   Ta login vào switch, vào mode config -> thực thi 2 dòng lệnh dưới đây:<br>
`   Sw-Core(config)#snmp-server enable traps` <br>
   -> enable traps<br>
    `Sw-Core(config)#snmp-server community public ro`<br>
    -> đặt tên cho comunity là: "public", tên này sẽ dùng trên con server zabbix.<br>
   ![](https://images.viblo.asia/03fba859-7de3-4b38-bc5a-5e8117dbb4be.PNG)<br>
   Check lại xem SNMP đã enable hay chưa ?<br>
   ![](https://images.viblo.asia/010e1781-4fac-4b75-869a-20d59da84c49.PNG)<br>
   OK, ta vào lại Server Zabbix, thực thi dòng lệnh này:<br>
 `  root@framgia:/etc/zabbix# snmpwalk -v 2c -c public 172.16.20.254`
   <br>
   172.16.20.254 -> Đây là IP của Switch. <br>
   Chờ cho nó chạy 1 tí, khoảng 30-45s<br>
   ![](https://images.viblo.asia/851b8c75-95b4-4f73-b05c-84b4b5147c71.PNG)<br>
   Vào lại giao diện zabbix để check<br>
   Kết quả như hình bên dưới là OK:<br>
   ![](https://images.viblo.asia/de5cb21b-acfe-4ce5-a9f9-4a73876d42ef.png)
   Ta cũng nên tạo screen để giám xác cho trực quan.<br>
   Cách tạo thì như bên trên đã hướng dẫn.<br>
   Kết quả:<br>
   ![](https://images.viblo.asia/bca1a2e3-0b3a-4f3c-82da-fd14329f29e2.PNG)
#    4 . Monitor OS Windows  with zabbix.<br>
   Thiết bị mạng OK rồi, tiếp theo sẽ là phân hướng dẫn monitor trên OS Windows<br>
   Ta vào trang này, sau đó download zabbix_agent về máy.<br>
   https://www.zabbix.com/download_agents<br>
   giải nén thư mục, ta được 2 fie như hình bên dưới:<br>
   ![](https://images.viblo.asia/6025469b-ee3e-472e-9ace-d0c0064e168a.png)<br>
   Ta vào đường dẫn: C:\zabbix\conf<br>
   Update lại file config,<br>
   Line 86: Đặt IP Server Zabbix vào đây.<br>
   ![](https://images.viblo.asia/3b622e02-06ef-479e-91d0-f7261dfc79ed.png)<br>
   Bật PowerShell hoặc cmd bằng quyền admin, sau đó chạy các dòng lệnh:<br>
   ![](https://images.viblo.asia/e455e537-c94d-4ca0-b146-65380f2fd20d.PNG)<br>
   Ta chờ khoảng 20 - 30s sau đó vào zabbix bằng giao diện web để check<br>
   Tại mục Availability, Status: Enable +  ZBX được bật thì -> OK<br>
   ![](https://images.viblo.asia/fe8e401f-cfc4-411b-904d-867b520d7531.png)<br>
   Tạo screen để monitor,<br>
   ![](https://images.viblo.asia/cc2e3417-1241-4b0c-8aab-b589abe3b001.PNG)<br>
#    5. Monitor OS Linux  with zabbix.<br>
Đầu tiên, login vào máy linux cần monitor.<br>
Sau đó cài đặt Zabbix_agent, trong hình bên dưới OS là ubuntu, nếu OS khác thì lệnh cài đặt cũng sẽ khác.<br>
![](https://images.viblo.asia/89d85317-f95f-4762-ac8c-5fe3c4e43d70.png)<br>
Điều chỉnh 1 tí trong file zabbix_agent.conf<br>
/etc/zabbix/zabbix_agented.conf<br>
Line 71: Update lại IP của Server Zabbix<br>
Line 78: Mở port 10050<br>
![](https://images.viblo.asia/adfdbc32-8646-4cad-9b37-98efd88121ce.png)<br>
Lưu lại, đồng thời restart lại server zabbix agent.<br>
`root@framgia:~# service zabbix-agent restart<br>`
   Check lại kết quả:<br>
![](https://images.viblo.asia/f4564fb4-9dd2-44a4-8deb-35eb7a3ab44e.png)<br>
# 6. Trouble shoot.<br>
Nếu trong trường cảm thấy phát sinh lỗi hay nghi ngờ..<br>
ta có thể check log để xem hiện trạng như thế nào.<br>
SSH vào server zabbix -> Sau đó truy cập log<br>
`root@huylv-zabbix:~# cat /var/log/zabbix/zabbix_server.log `<br><br>

Đối với cài đặt zabbix agent trên Window,<br>
Trường hợp restart server Agent bằng lệnh không được thì ta dùng tay,<br>
![](https://images.viblo.asia/536cd636-0d39-4c4e-93f0-c1b2d9b75567.png)<br>


 Hoặc ta có thể đứng trên Server Zabbix để check xem client đã set-up thành công agent chưa bằng lệnh:<br>
` root@huylv-test05:~# zabbix_get -s 172.16.25.57 -k agent.version`
<br>
Trong đó 172.16.25.57 là IP máy cài agent.<br>
Kết quả thành công:<br>
![](https://images.viblo.asia/6a5f57f8-567d-425d-8238-54a93171cd77.PNG)<br>
   Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai sót có thể góp ý để em(mình) cải thiện. <br><br><br>
   Nguồn tham khảo:<br>
   https://www.zabbix.com/download<br>
   https://docs.vhost.vn/article/h%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-c%C3%A0i-%C4%91%E1%BA%B7t-zabbix-agent-tr%C3%AAn-windows-226.html<br>
   https://www.zabbix.com/documentation/3.0/manual/config/items/itemtypes/snmp<br>
   https://www.youtube.com/watch?v=HKXTVkrwc6k<br>