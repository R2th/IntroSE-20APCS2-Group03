Nếu bạn là một Android dev, có lẽ bạn cũng không còn lạ lẫm với framework Espresso của Google sử dụng cho automation test. Là một công cụ nguồn mở, nó rất dễ dàng cho các nhà phát triển sử dụng cũng như là tuỳ biến cho việc thực hiện automation test.

Nhưng trước khi thảo luận về lợi ích của Espresso, chúng ta cần hiểu rõ những khó khăn mà các Android dev gặp phải khi cố gắng test ứng dụng của họ trong suốt quá trình build/dev/test.
* Mỗi bản build cần được test sau khi thay đổi code được thực hiện.
* Sự phụ thuộc vào các máy chủ từ xa và các máy trạm khác để kiểm tra làm chậm quá trình.
* Unit test và functional test cần phải dễ thực hiện từ IDE.
* Các ứng dụng cần được kiểm tra bằng API của Android OS mới nhất hỗ trợ các tính năng nền tảng và phiên bản hệ điều hành mới nhất.
* Testing cần phải chạy tốt trên cả trình giả lập và thiết bị thực.

Trước những thách thức này, ta rõ ràng tại sao việc áp dụng automation test Espresso lại mang lại hiệu quả cao. Mặc dù Espresso là một test framework dựa trên thiết bị, nó có nhiều lợi ích cho dev. Espresso dễ dùng và nó cung cấp rất nhiều annotations và assertions hưu ích.

Dưới đây là bốn lợi ích chính của việc sử dụng Espresso:
### 1. Quy trình làm việc của Espresso rất đơn giản để sử dụng
Cách thức hoạt động của Espresso là cho phép các nhà phát triển xây dựng bộ thử nghiệm dưới dạng APK độc lập có thể được cài đặt trên các thiết bị đích cùng với ứng dụng đang thử nghiệm và được thực thi rất nhanh.
### 2. Phản hồi nhanh và đáng tin cậy cho các nhà phát triển
Khi các nhà phát triển đang cố gắng tăng tốc triển khai, Espresso cung cấp cho họ phản hồi nhanh về các thay đổi code của họ để họ có thể chuyển sang tính năng tiếp theo hoặc sửa lỗi; có một test framework mạnh mẽ và nhanh chóng đóng một vai trò quan trọng.

Espresso không yêu cầu bất kỳ máy chủ nào để remote với thiết bị như [Appium](http://appium.io/). Thay vào đó nó chạy song song với ứng dụng và cung cấp kết quả kiểm tra rất nhanh cho nhà phát triển.
### 3. Giảm thiểu việc tiến trình test bị ảnh hưởng bới các yếu tố khó kiểm soát
Bởi vì Espresso cung cấp một phương pháp thực hiện đồng bộ, độ ổn định của chu kỳ kiểm tra là rất cao. Có một cơ chế tích hợp sẵn trong Espresso, trước khi chuyển sang các bước tiếp theo trong thử nghiệm, xác nhận rằng Element hoặc Object thực sự được hiển thị trên màn hình. Điều này giúp loại bỏ việc thực hiện kiểm tra khỏi bị ảnh hưởng khi đối mặt với lỗi “objects not detected” và các lỗi khác.
### 4. Áp dụng Espresso không khó
Áp dụng automation test với Espresso khá dễ dàng. Nó dựa trên Java và Junit, đây là bộ kỹ năng cốt lõi cho Android dev nào. Bởi vì Espresso hoạt động trơn tru trong IDE Android Studio, nên không có thiết lập nào ảnh hưởng đến chu trình phát triển phần mềm

Tất nhiên, ngoài những điều trên, cộng đồng lớn do Google cung cấp luôn thúc đẩy framework Espresso và điều đó tạo điều kiện giúp giảm thiểu thời gian tiếp cận với người mới.

Tìm hiểu thêm bằng cách sử dụng tờ Espresso Cheat bên dưới:
![](https://images.viblo.asia/f63403a0-b50e-445c-9ed3-e5a9f07e4ebe.png)

Perfecto đang hỗ trợ cho Android Studio IDE khả năng cài đặt và khởi chạy bộ thử nghiệm Espresso (APK) trên các thiết bị thực trên đám mây trên nhiều địa điểm và điều kiện người dùng. Để biết thêm thông tin, vui lòng tham khảo [Cộng đồng Perfecto](https://developers.perfectomobile.com/) và tìm kiếm cho Android Android Studio, hoặc Es Espresso.

refer: https://dzone.com/articles/4-benefits-of-using-the-espresso-test-automation-t