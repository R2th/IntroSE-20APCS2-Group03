## Mở đầu
 Tôi là 1 kỹ sư công nghệ thông tin mới ra trường. Trong thời gian học Đại học, từ năm 1 tới năm 4, tôi đi làm thêm tại TSUTAYA (chuỗi cửa hàng bán sách, video...v.v nổi tiếng bên Nhật). 
Tôi mới tốt nghiệp và đang trong quá trình tìm việc, nên đã bỏ công việc làm thêm. Tuy nhiên, vì đã gắn bó với TSUTAYA suốt 4 năm, nên trước khi rời đi, tôi muốn để lại cái gì đó với nơi thân thuộc này. Chính vì vậy, tôi đã viết 1 chiếc App để support cho công việc ở cửa hàng.

## Về chiếc App tôi đã phát triển

App tôi phát triển là Web App giúp quản lý hạn sử dụng của đồ ăn.
Kỹ thuật mà tôi sử dụng là: kết hợp giữa Next.js và Firebase.

### Bối cảnh phát triển App
Việc của tôi ở TSUTAYA là: Quản lý thực phẩm. 
Trong thời gian làm việc, tôi gặp chút vấn đề trong việc quản lý hạn sử dụng của thực phẩm.
Khi đó, tôi quản lý hạn sử dụng bằng cách ghi ngày tháng ra một quyển sổ.

* Việc này có những bất tiện sau:
* Không thể sort thời hạn theo thứ tự
* Vì quản lý bằng giấy, nên sẽ cồng kềnh, lộn xộn
* Mỗi khi muốn check xem: Đã quá hạn sử dụng chưa? sẽ phải đi xem chỗ này chỗ kia => Rất là tốn công

Ngoài ra,  không có ai chịu trách nhiệm quản lý quyển sổ ghi chép này; format ghi chép cũng khác nhau tùy theo người ghi, nên nó rất ít khi được sử dụng.

### Các phần cấu thành của App
App tôi viết đang được cấu thành như dưới đây.

![](https://images.viblo.asia/e8acdb0f-9f74-4167-80be-82777cbb5225.jpeg)


Sau khi nhập hàng, sẽ nhập và đăng ký thông tin sản phẩm lên web page đã tạo bằng Next.js. Thông tin sẽ được lưu vào Firestore.
Việc check hạn sử dụng: dùng Google Pub/Sub. Vào 12h đêm, sẽ thực hiện check hạn sử dụng của các sản phẩm đã đăng ký lên Firestore trong Functions.

### Các điểm tôi đã cải tiến

Điểm cải tiến đầu tiên của app này là: **Thông báo hạn sử dụng bằng LINE Bot.**
Bằng cách này, dù người quản lý có bị quên sản phẩm, thì vẫn được bot nhắc nhở => Rất tuyệt vời phải không?

Điểm thứ hai là **design thú vị hơn** nhiều so với dự kiến.
Thông thường các web page, web app sử dụng cho nghiệp vụ nào đó sẽ khá là đơn giản, không có gì hấp dẫn.
Tuy nhiên, app tôi làm lần này không phải là *cái gì bắt buộc phải làm* khi thực hiện công việc. Nó chỉ mang tính chất là sơ đồ hệ thống hóa, giúp nâng cao hiệu quả công việc hơn. Dù không sử dụng app này thì công việc vẫn được tiến hành bình thường, không gặp khó khăn trở ngại gì.  Điều này dẫn tới thách thức: Tôi phải làm thiết kế làm sao cho app trở nên thú vị, khiến cho các nhân viên muốn dùng nó hơn. Chính vì thế, tôi đã thu thập nhiều idea, và chọn design như dưới đây.

Form nhập thông tin sản phẩm.

![](https://images.viblo.asia/7c876a87-b7ab-4c2d-854e-0aee380736fe.png)


Danh sách sản phẩm 
![](https://images.viblo.asia/c455cbc8-a08c-455d-9bef-6d45e0412d6e.png)


Các ảnh trên là web page mà tôi đã tạo.
Design tôi có tham khảo xu hướng neumorphism.
Ngoài ra, tôi dùng luôn nhân vật mà tôi yêu thích để làm icon.

Điểm thứ 3 mà tôi đã cải thiện trong app này đó là **tốc độ hiển thị của Web page**.
Điều này là việc hiển nhiên, nhưng rõ ràng: Nếu mất quá nhiều thời gian để hiển thị, thì người dùng sẽ không muốn xem trang Web. 


![](https://images.viblo.asia/c8bf000b-10ab-4bc8-9294-3785103d47a1.png)


ảnh trên là kết quả đo tốc độ rendering bằng tool có tên Lighthouse.
Giá trị trong ảnh là giá trị tham khảo, tuy nhiên mục Performance đang đạt 100 điểm.
Điều này có nghĩa là: Tốc độ hiển thị của web đang đạt mức tốt.

## Kết bài
Với việc phát triển app này, tôi đã giải quyết triệt để 3 bất cập khi quản lý bằng sổ giấy.
App tôi viết đang được sử dụng tại 6 chi nhánh, khá hữu ích trong việc cải tiến công việc.
Bản thân tôi, dù đã bỏ việc tại TSUTAYA, không còn liên quan trực tiếp gì tới những người làm việc tại đó nữa. Tuy vậy, thông qua app này, tôi vẫn có thể kết nối với họ. Tôi rất vui vì điều đó.

Link bài gốc:  https://sal.vn/TVyjT2