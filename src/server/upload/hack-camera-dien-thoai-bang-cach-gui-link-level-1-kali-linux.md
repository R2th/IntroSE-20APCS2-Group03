Chào các bạn, lại là mình đây :v:  Như thường lệ hôm nay là cuối tuần, và mình sẽ chia sẻ những chiêu trò trick hay ho. Nhưng lần này sẽ là bên linux cho đổi gió nhé.
- Như title của bài post thì lần này mình sẽ hướng dẫn các bạn "hách" camera điện thoại (android hay iOS, máy tính đều được nha). Mình sẽ dùng tiện ích có tên là saycheese nha, nếu bạn không biết saycheese là gì thì có thể đọc tiếp bên dưới.
###      :writing_hand: **Lưu ý :** Chỉ sử dụng nhằm mục đích học hỏi, giáo dục. Không nên sử dụng vào những việc khác nhé. 

-----
# 1. Giới thiệu Saycheese
*  Là 1 tiện ích dùng để sử dụng webcam trên linux.
*  Hết rồi  =))) (ngắn gọn đúng không).
# 2. Chuẩn bị
1. Máy tấn công
    - Máy ảo hoặc máy thật Kali Linux.
    - Internet ( tất nhiên rồi :sweat_smile: ).
2. Máy nạn nhân
    - Android hoặc iOS đều được, miễn là có trình duyệt web :v
    - Có 1 số máy sẽ không hiện lên popup yêu cầu quyền truy cập, vậy nên bạn phải dụ dỗ nạn nhân coppy bỏ sang chrome hoặc safari.
# 3. Tiến hành
- Đầu tiên các bạn sẽ mở Terminal lên và cd đến đường dẫn bạn cần lưu tiện ích, sau đó git clone theo địa chỉ https://github.com/Anonymous3-SIT/saycheese.git

    - `git clone https://github.com/Anonymous3-SIT/saycheese.git`

 ![](https://images.viblo.asia/ebc2995d-0bb5-48c0-874d-0958f13a73e0.png) 
 *Sau khi liệt kê ra các folder bằng lệnh ls các bạn sẽ thấy có thêm folder saycheese.*
- Cd đến folder saycheese
    - `cd saycheese/` -> di chuyển đến folder saycheese
    - `ls` -> liệt kê ra các file trong folder saycheese
![](https://images.viblo.asia/77a2f99e-34e1-4505-acc3-2dcf2708cf42.png)
- Bạn có thể mở file saycheese bằng google hoặc firefox để xem màn hình đầu tiên sẽ như thế nào.
    - `goole-chrome saycheese.html `
    - `hoặc firefox saycheese.html`
![](https://images.viblo.asia/04901b05-b60a-400d-9050-9f709d72d29c.png)

![](https://images.viblo.asia/e7c34f6c-cea1-4fa5-b28b-9838ae29d4ce.png)
- Như bạn thấy, web sẽ yêu cầu chấp nhận quyền truy cập camera
- Bạn cần edit lại bằng blabla gì gì đó cho nạn nhân tin và chấp nhận bằng cách edit thẳng trong file html trong folder saycheese hoặc có thể mở file sửa trực tiếp trong Terminal bằng lệnh nano.
    - `nano saycheese.html`
    - Sau đó bạn sẽ đưa con trỏ chuột xuống cuối file sửa các dòng chữ  ở thẻ p hoặc bất cứ đâu mà bạn muốn.
![](https://images.viblo.asia/a85f95c0-5bdb-421b-9320-c78d54a1d510.png)
- Sau khi sửa xong thì ấn Ctrl + X sau đó ấn phím Y rồi Enter để lưu lại file.

- Trong thư mục lúc nãy, bạn sẽ tìm thấy một tập lệnh shell có tên là **saycheese.sh**, đây là tập lệnh bạn cần chạy để khởi chạy công cụ. 
- Sử dụng lệnh  để khởi chạy giao diện của saycheese.
    - `bash saycheese.sh`
    - Sau đó chọn option số 2 để sử dụng Server Ngrok tạo link hack camera điện thoại cho bạn.
![](https://images.viblo.asia/8174a364-18d0-4d6e-9805-8746380ad6ff.png)
![](https://images.viblo.asia/077d40ef-fbcd-4fc7-9cae-1e1cfab73cfa.png)
- Quá trình này có thể mất khoảng 10s - 30s. Sau khi thực hiện xong, bạn sẽ thấy trên màn hình hiển thị Direct link: https://xxxx.ngrok.io. Hãy copy link này và gửi cho nạn nhân để truy cập.

- Bây giờ, khi nạn nhân truy cập vào liên kết, chỉ cần nạn nhân Cho phép cho truy cập camera thì saycheese sẽ bắt đầu hack camera điện thoại và gửi về máy của mình.
![](https://images.viblo.asia/29eacb79-5c69-4006-b2d2-86d49028c5b9.jpg)
- Bạn sẽ nhận được cả IP của máy nạn nhân và hình gửi về.
![](https://images.viblo.asia/0692e2f7-5af7-4a48-bcf6-f0cf368acfba.png)
- Ảnh sẽ được lưu ở trong folder saycheese.
![](https://images.viblo.asia/85f95b27-5b4a-4353-bafd-e92df78a91c9.png)
# 4. Kết bài
- Vậy là mình đã hướng dẫn xong quá trình hack camera điện thoại qua kali linux. Bài viết sẽ có nhiều sơ sót, các bạn có thể đóng góp ý kiến thêm để các bài viết sau tốt hơn ạ.
Chúc các bạn thành công!!!
# 5. Tham Khảo
- Nguồn Kali Linux : https://www.kali.org/
- Nguồn GitHub: https://github.com/Anonymous3-SIT/saycheese