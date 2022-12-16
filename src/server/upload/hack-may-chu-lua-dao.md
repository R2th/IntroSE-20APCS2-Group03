# Ngữ cảnh
Tôi được một tin nhắn mời tham gia việc nhẹ lương cao trực tuyến, đang thất nghiệp nên tôi vào kết bạn. Sau một thời gian tìm hiểu biết đây là lừa đảo nên tôi quyết định tấn công máy chủ này. Toàn bộ quá trình tìm hiểu và chi tiết chiêu trò lừa đảo tôi để ở [youtube](https://www.youtube.com/watch?v=9myTKRr1qho&ab_channel=b%C3%B3ngbay) , ở đây tôi xin đi sâu hơn vào kỹ thuật.

# Thu thập thông tin
Máy chủ deploy ở Zenlayer co data center ở Hà Nội và HCM  ![location](https://images.viblo.asia/f053cfaa-8d34-4007-8e36-ad994d41e164.png)

Frontend viết bằng vuejs template của China ![frontend](https://images.viblo.asia/037831f4-5085-4667-a7ab-0f69e4442c1f.png)

Payload gửi và nhận từ vue được encrypt ![encrypt](https://images.viblo.asia/3002d71e-b3c7-4125-b5ec-a656e5f4db7f.png)

webserver là  [Tengine](https://tengine.taobao.org/) là được viết lại dựa theo nginx bởi taobao

# Phương thức tấn công
Đa số lừa đảo muốn ăn nhanh lẹ nên quá trình đăng ký tài khoản rất nhanh và ít có các phương thức xác thực, nên lựa chọn tấn công DDoS là ưu tiên của tôi. Tôi thử đăng ký số diện thoại 0000000001 cũng được.

Giờ là lúc tạo payload: cách encrypt chắc nằm đâu đó trong đống JS đã bị minify và obfuscate, chuyện đó không khó với chrome (cám ơn google), bạn có thể tạo breakpoint debug trước lúc frontend gửi request để truy ngược lại.
Hàm `setT` tuy để trong file tên là zepto.all.js - một thư viện hỗ trợ ajax tuởng vô thưởng vô phạt nhưng lại call hàm encrypt  `options.data=g.d.e(keyWords,JSON.stringify(options.data));`
![Screen Shot 2022-10-09 at 19.46.45.png](https://images.viblo.asia/2da140ab-3619-4772-a36c-d667e276a00f.png)

`Keywords` chính là key để mã hoá cũng được lưu tại đây ![Screen Shot 2022-10-09 at 19.49.51.png](https://images.viblo.asia/ff354ad1-3f16-4c95-8a15-85b6661579c5.png)

Và `g.d.e()`  là hàm encrypt với cách viết hy vọng làm nản lòng người đọc.
![Screen Shot 2022-10-09 at 19.54.36.png](https://images.viblo.asia/a2bbbcbb-e98e-44b8-83be-3fb2e0240976.png)

Tôi copy đoạn `setT` và các dependency ra và test thử single request, mọi thứ ổn tôi deploy một nodejs đăng ký random 1000 tài khoản rồi cho pm2 start lại process mãi mãi. 
Server nghẽn, bảo trì rồi nó chặn IP nodejs của tôi, tôi dùng tor để luân chuyển IPs, sau đó nó chỉ cho đăng ký 3 tài khoản cho 1 IP. 
Tôi tìm ra endpoint nạp tiền nó không chặn, nó lại bị đơ tiếp nhưng sau một thời gian nó chặn 1 dải blockIP cho tất cả endpoint.

![F73B6B3A-7C05-47DE-B7AE-326FC53471D2_1_105_c.jpeg](https://images.viblo.asia/4262d6ef-7104-4838-bf20-766da4ceb31e.jpeg)

Sau một thời gian quay lại thăm, nó không chặn nữa !? Tôi đoán nhóm bảo trì hệ thống này làm việc không có version control, lần deploy gần đây nhất đã xoá công sức của người trước. Nhóm lừa đảo làm việc khá cục bộ, người của bộ phận này thường không biết bộ phận khác làm gì, cách tổ chức này không hiệu quả về mặt công việc nhưng khá an toàn cho chóp bu.
Xin cảm ơn các bạn đã đọc, lần tiếp theo tôi sẽ tiếp cận nhóm lừa đảo tinh vi hơn.

# References
* target: https://gy708.com
* github: https://github.com/quabongbay/ais
* youtube: https://www.youtube.com/watch?v=9myTKRr1qho&ab_channel=b%C3%B3ngbay