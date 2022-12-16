## Đừng chần chừ.
Nếu bạn đang đọc bài này và chưa setup billing alarm cho tài khoản aws. Thì tôi thành thật khuyên bạn nên đi tạo ít nhất là 1 cái ngay sau khi đọc bài này. Nếu bạn vẫn chưa có tài khoản aws thì hãy đọc bài này để biết cách tạo tài khoản aws đi còn chờ gì nữa. 
1. Login vào màn hình aws console bằng tài khoản aws của bạn

![](https://images.viblo.asia/f224e1bd-d58c-4837-82af-94ca8087d0c6.png)

Chọn phần My Billing Dashboard
2. Bạn chọn tiếp phần mục Preferences và tích chọn vào phần Receive Billing Alert.

![](https://images.viblo.asia/d1b24aa2-81ee-4974-9227-6286287511c7.png)

3. Sau đó bạn nhấn tiếp vào mục Manage Billing Alert ở trên để vào màn hình quản lý Billing Alert. Hoặc có thể truy cập từ CloudWatch -> Alarm -> Billing.
Tiếp đó bấm chọn Create Alarm
![](https://images.viblo.asia/79eec0b4-b2a3-4c63-a6eb-560b20771c34.png)

4. Nhập vào số tiền đến hạn mức mà bạn muốn amazon gửi thông báo. Mình thường để là 10$. Vừa đủ to để không bị thông báo suốt, mà vừa đủ nhỏ để số tiền vẫn trong tầm kiểm soát. 
Tiếp theo nhập vào email mà bạn muốn nhận thông báo từ aws.
Phần Additional settings để nguyên không sửa.
Bấm Create Alarm
![](https://images.viblo.asia/690b37ad-1c44-4c4c-8a48-2d1f88e0080e.png)

5. Sau khi bấm Create Alarm nếu bạn chưa dùng email đã nhập cho Aws notification lần nào thì aws sẽ gửi mail yêu cầu bạn xác nhận trước khi có thể sử dụng. 
Bạn chỉ cần vào mail kiểm tra và bấm Confirm subscription là ổn.
![](https://images.viblo.asia/1f8b007b-48d1-467c-bdcc-1a98be54e7be.png)
![](https://images.viblo.asia/ac225865-1b5f-43e5-9db4-bb5dcf9bdf23.png)

6. Hoàn thành
Đợi 1 lúc cho đến khi Status của Billing Alarm của bạn thay đổi từ INSUFFICIENT_DATA thành OK, là Bill Alarm của bạn đã sẵn sàng làm việc rồi đấy.
![](https://images.viblo.asia/55fa824b-3d86-4545-9997-91f54b39a20a.png)
## Kết. 
Đơn giản nhưng hiệu quả, bạn hãy tạo ngay Billing Alarm ngay khi bắt đầu sử dụng AWS để đảm bảo an toàn cho túi tiền của mình nhé.