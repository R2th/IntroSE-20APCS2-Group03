# 1. MindStorm là gì?
![](https://images.viblo.asia/0dc4ccb5-be25-4619-b0d0-e8c55f74ac18.gif)
![](https://images.viblo.asia/970c5311-6c11-4462-8b4f-1a0574cf9b24.gif)
![](https://images.viblo.asia/1fb4212c-d5aa-43e0-b8f2-42f1d16f4eba.gif)


Chắc hẳn trong chúng ta ai cũng đã từng trải qua tuổi thơ với những khối đồ chơi LEGO, nơi mà chúng ta thoả sức sáng tạo ra các mô hình thú vị, hay đơn giản là lắp ráp những đồ vật chúng ta thích, hơn thế nữa, chắc hẳn chúng ta đã từng muốn chúng có thể chuyển động được.

Và để làm được điều đó, LEGO đã tạo ra **LEGO MindStorms EUV3**, một phiên bản phát triển từ bộ LEGO NXT. Để giúp chúng ta có thể lập trình và phát triển những cỗ máy, những con robot được lắp ráp từ lego một cách dễ dàng hơn, linh hoạt hơn so với những phiên bản trước đó.

![](https://images.viblo.asia/81e970d5-8689-4e19-b672-719f4aac28aa.png)


# 2. Tại sao lại sử dụng Lego MindStorm EUV3?

Sức mạnh của hệ thống Lego nằm ở chỗ nó có thể sử dụng lại. Cùng một khối nhưng hôm nay nó có thể là 1 cánh tay của robot, ngày mai chúng ta có thể sử dụng nó làm chân của một con vật, và ngày sau nữa nó có thể là 1 khối của thấp Eiffel

# 3. Bộ Lego MindStorm cơ bản

Với Lego MindStorm EUV3 gồm có: 
- 3 động cơ Servo
- 5 cảm biến ( Gyro, Ultrasonic, Color, 2 Touch )
- và các linh kiện pin, dây sạc, ...

![](https://images.viblo.asia/c73444ea-5bef-4ddf-a7b5-75090668c4ca.png)

### 3.1 EV3 Brick

![](https://images.viblo.asia/90264715-7340-409f-afb6-6e097992cae3.png)

**1.** Gồm các chức năng: back, dừng chương trình hoặc tắt bộ não

**2.** Gồm các chức năng: lựa chọn mục cần chọn, chạy chương trình, mở bộ não

**3.** Tương tự các phím điều khiển

Các bạn có thấy 4 tab nằm ngang được hiển thị trên màn hình, mình sẽ đi từ trái qua: 
- tab 1: Hiển thị các chương trình đã chạy gần đây
- tab 2: Các file được lưu theo project
- tab 3: Port View
- tab 4: Setting

![](https://images.viblo.asia/32bea91b-706d-4ce5-86b5-078dbc735737.png)

Tương tự Brick có 3 trạng thái để báo cho ta biết những trường hợp như code lỗi hay chạy thành công.

- Red = Startup, Updating, Shutdown
-  Red pulsing = Busy
- Orange = Alert, Ready
- Orange pulsing = Alert, Running
- Green = Ready
- Green pulsing = Running Program


### 3.2 Ports, Sencors, và các Motors

**Ports**

Một bộ não có 8 port tương đương với 1, 2, 3, 4 và A, ,B, C, D

Các bạn nên nhớ đó là với các port là chữ số thì sẽ kết nối giữa bộ nào và các sencors, còn các port là chữ thì sẽ kết nối giữa bộ não và các động cơ.

Ngoài ra bộ não còn được trang bị cả khe cắm usb, sd card để chạy các chương trình có sẵn, ...

![](https://images.viblo.asia/8074248c-abd7-4e74-8da1-a2c278a1cd64.png)


**Motors**

- Large Motor: có khả năng quay 160 - 170 vòng/phút , sử dụng bộ đếm số vòng quay (tacho feedback) cực kì chính xác cho phép bạn điều khiển động cơ với sai số < 1 độ.
- Medium Motor: động cơ servo loại trung bình có khả năng quay 240 - 250 vòng/phút nhanh hơn rất nhiều với động cơ lớn, vì vậy thường được gắn làm tay để có sức nâng lớn hơn.


**Sencors**

- Ultrasonic sencor: bằng cách tạo ra sóng âm, sóng âm được phát ra gặp vật thể sẽ phản xạ lại, cảm biến đo khoảng cách EUV3 sẽ tiếp nhận các sóng âm phản xạ và đo lường khoảng cách từ Robot cho tới vật cản phía trước. Ultrasonic sencor có thể đo với khoảng cách từ 1cm - 250cm với sai số dưới 1cm.
- Color sencor: bằng cách nhận biết 8 màu khác nhau cũng như để thử nghiệm phản xạ ánh sáng của các màu sắc. Nó tương tự như switch case trong lập trình ấy các ông à :v: 
- Touch sencor: là một cảm biến đơn giản nhưng cực kỳ chuẩn xác trong việc phát hiện lúc nào chiếc nút màu đỏ trên cảm biến được ấn và thả ra. Với Touch sencor bạn có thể cho Robot thực hiện các lệnh bất kỳ mỗi khi chiếc nút được ấn, xây dựng Robot tìm đường khi chạm có thể rẽ trái hoặc phải, hoặc làm đàn guitar, piano :v, ..., đó là tuỳ các bạn sử dụng nó như nào
- Gyro Sencor: thiết kế giúp đo lương chuyển động quay của robot và thay đổi phương hướng của nó. Có thể đo góc độ tạo nên sự cân bằng cho robot.

Trên đây là mình giới thiệu qua cơ bản về MindStorm và các bộ phận của nó, phần sau mình sẽ đi qua về phần lập trình ra sao, thank for watching :hugs:.