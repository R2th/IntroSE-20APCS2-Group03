Lưu khi trước khi bắt tay vào cấu hình là bạn nên kiểm tra với nhà mạng hoặc nhà cung cấp sản phẩm GW040 xem firmware hiện tại có hỗ trợ mode bride không? Phải đảm bảo rằng GW040 có thể cấu hình ở mode Bride. Nhiều sản phẩm "thấy " mode bride nhưng không hề sử dụng chế độ này.

**Phần 1: Cấu hình mode bride trên GW040. Nên cài ip tĩnh trước khi đăng nhập vào cấu hình.**

**Bước 1:** sử dụng ip gateway đăng nhập vào gw040

**Bước 2:** Vào Network Settings -> WAN -> Add 
![](https://images.viblo.asia/1f874f4c-598d-4f8c-b23f-cefe7cf4b233.png)

Lưu ý: Vlan ID cần kiểm tra lại với nhà mạng xem Vlan ID nào nhà mạng cho phép sử dụng. Nhập sai Vlan ID nhà mạng thì không thể kết nối internet.
![](https://images.viblo.asia/b6619fd3-1d20-4ee2-b678-ac500c08d35d.png)

**Bước 3:** Vào Network Settings -> LAN -> Disable DHCP Server
![](https://images.viblo.asia/573b4b25-76fb-4c6e-8b23-b2a79a33a19b.png)

**Bước 4:** Vào Network Settings -> Wireless -> Tắt Enable Wireless
![](https://images.viblo.asia/c101dddc-4d07-41a2-99b6-90a90c297aaf.png)

**Bước 5:** Vào Advanced Features -> Interface Grouping -> Add
![](https://images.viblo.asia/93516505-a65f-47e4-8829-d21b09254798.png)

Điền **Group Name:** "tùy ý "
Chọn **WAN Interface use in the grouping** đúng với tên Interface của Bridge ở bước 2. Như trong bài này là veip0.4
Chọn **lan1.0** ( đây sẽ là cổng chuyển tiếp internet từ GW040 tới Vigor2960 và khi cấu hình xong bắt buộc sẽ cắm dây LAN từ port lan1.0 vào WAN của Vigor2960 ). Lần sau khi muốn cắm dây lan giữa laptop và GW040 để cấu hình lại buộc sẽ sử dụng lan2.0 với địa chỉ tĩnh mới có thể đăng nhập được.
![](https://images.viblo.asia/47e4ec07-3557-44d3-8a18-dd7ff2532a95.png)

**Phần 2: Cấu hình PPPoE trên Vigor**

**Bước 1**: Cắm LAN từ lan1.0 của GW040 vào WAN1 của Vigor2960. Và cắm LAN giữa lan1 của Vigor2960 với laptop.

**Bước 2**: đăng nhập theo gateway 192.168.1.1 để vào giao diện cấu hình tài khoản, mật khẩu có thể là admin: admin

**Bước 3**: Chọn tới WAN rồi thêm cấu hình như hình sau
![](https://images.viblo.asia/9f854217-5d79-4cbe-9c16-7c274e4f8044.png)

và Apply lại.
Tiếp tục chọn sang tab PPPoE 
![](https://images.viblo.asia/90f69adf-3c5b-4707-ad6e-cfafec730642.png)

cũng Apply lại.

Lưu ý Username và Password phần này sẽ được nhà mạng cung cấp, chỉ cần điền sao cho đúng. Đợi khoảng 1' cho hệ thống update lại.
Chọn lại Online Status kiểm tra wan1 có IP và trạng thái up là đã thành công.

***Cám ơn mọi người đã đọc bài viết của mình và khi đọc xong xin cho mình ý kiến phản hồi. Bài viết sau có hay hơn chính là nhờ vào các ý kiến phản hồi của các bạn. Mình xin cám ơn.***