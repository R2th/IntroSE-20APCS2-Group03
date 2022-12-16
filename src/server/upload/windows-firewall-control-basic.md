Hôm nay mình sẽ trình bày bài viết về  tool  Windows Firewall Control cơ bản. <br>
1. Chuẩn bị. <br>
 '- PC hoặc laptop <br> 
 '- Download tool tại trang:  https://www.binisoft.org/wfc.php <br>
2. Cài đặt. <br>
 '- Phần này cũng khá cơ bản, các bạn download về, install ... lựa chọn options phù hợp... next next. <br>
3. Sử dụng tool.
Đây là giao diện khi các bạn đã cài đặt hoàn tất phần mềm. <br>
![](https://images.viblo.asia/cde80d3e-907c-428d-8577-1e2111fea72d.PNG)<br>

Windows Firewall Control cung cấp bốn chế độ lọc có thể được chuyển đổi chỉ bằng một cú nhấp chuột:  <br> <br>
High Filtering - Tất cả kết nối ra và vào đều bị chặn.  <br> 
Medium Filtering - Các kết nối ra không phù hợp với quy tắc sẽ bị chặn. Chỉ các chương trình mà bạn cho phép mới có thể bắt đầu các kết nối ra ngoài. <br>
Low Filtering - Các kết nối ngoài không phù hợp với quy tắc được cho phép. Người dùng có thể chặn các chương trình mà anh ta không muốn cho phép bắt đầu các kết nối ra ngoài. <br>
No Filtering - Tường lửa Windows bị tắt. Tránh sử dụng cài đặt này trừ khi bạn có một tường lửa khác đang chạy trên máy tính của bạn. <br>
<br>
Windows Firewall Control không thực hiện bất kỳ bộ lọc gói nào và không chặn hoặc cho phép bất kỳ kết nối nào. <br>
Điều này được thực hiện bởi Windows Firewall dựa trên các quy tắc tường lửa hiện có. <br>
Trong trường hợp bài viết này, mình sẽ mức độ lọc như bên dưới: <br>
![](https://images.viblo.asia/8f83f853-a58c-474c-81b2-9d1a2e64447e.png) <br>
Tiếp tục qua tab notification lựa chọn Display <br>
![](https://images.viblo.asia/4c94ee05-7e21-4664-b688-55ffe63e3592.png) <br>
Qua tab Options tick chọn Shell Intergration <br>
![](https://images.viblo.asia/5ef4b176-4fea-4ad7-a386-e5faab89c955.png) <br>
Mục đích có thể allow/deny rules cho app 1 cách đơn giản nhất <br>
Example:<br>
![](https://images.viblo.asia/9b0ad691-a7e2-4255-b1b7-bc2b57356083.png) <br>
<br>
Qua tab Rules -> lựa chọn Outbound <br>
Check lại status <br>
![](https://images.viblo.asia/fc25aa32-9b68-4cd2-b081-82d7e13e283c.PNG) <br>
Phía trên là phần tinh chỉnh phù hợp,
Tiếp theo là 1 trong những tính năng mình thấy hay và muốn chia sẽ,
Với Windows Firewall Control này, mình có thể lọc, check những app trên máy đang remote từ đâu đến đâu, sử dụng giao thức gì, port, PID... <br>
Quay trở lại phần mềm, ta nhìn góc phải sẽ thấy thông báo hiện ra <br>
Thông báo sẽ list ra tất cả những phần mềm trên máy đang có dấu hiệu remote <br>
Example: <br>
Đây là máy của mình, <br>
IP: 172.16.32.118 <br>
Có 7 app đang remote, một trong những app đó là: XenCenter . <br>
Đang remote từ 172.16.32.118 đến 172.16.x.x  <br>
Chúng ta có thể check xem có đúng như vậy không <br>
![](https://images.viblo.asia/b4ac1074-58b7-4bd5-ad2a-a25965a3aa14.png)<br> 
chưa hết, <br>
ví dụ như 1 app khác, <br>
ta thấy IP remote nó đang remote ra bên ngoài <br>
![](https://images.viblo.asia/31a86287-3241-494d-ab66-5ecddb837d29.png)<br>
Ta click trực tiếp vào IP đấy để whois, xem nó thuộc về ISP nào luôn <br>
Kết quả. <br>
![](https://images.viblo.asia/aa517bd7-fa69-4c23-bad3-294ce2993754.png) <br>
Thật tuyệt vời phải không nào :#) <br>
.... <br>
Rules ở phần mềm này, các bạn có thể check bằng cách click vào như hình bên dưới <br>
![](https://images.viblo.asia/ae679d2d-177a-42fe-a8e6-e9a42755d5b3.png) <br>
![](https://images.viblo.asia/3a7cafd7-3aae-4ca9-9f20-1d68fe8f7433.png) <br>
ta có thể lọc, tạo, allow .... <br>
Ngoài ra, phần mềm còn cho phép các bạn check phần mềm có bao nhiêu % là dính virrus... <br>
Các bạn đọc thêm và tìm hiểu nhé <br>

Tới đây là kết thúc. <br>
Cảm ơn các bạn, anh (chị) đã đọc bài - bài viết còn basic, nếu có sai xót có thể góp ý để em(mình) cải thiện. <br>