Đối với một ***dev*** việc tối ưa bộ nhớ ***Ram*** là cực kỳ quan trọng. Mà để tối ưu được bộ nhớ của ***Ram***, chúng ta nên hiểu về cớ chế quản lý bộ nhớ (memory management) trong swift.
# Memory Allocatiom -  Phân bổ bộ nhớ

Có 3 nơi để phân bổ bộ nhớ:
- Static memory - Bộ nhớ tĩnh - Không bao giờ thay đổi khi app chạy
- Stack allocated memory - Phân bổ vùng nhớ theo ngăn xếp - ***Kiểu LIFO***
- Heap allocated memory - Phân bổ vùng nhớ động - ***Cớ chế ARC***

### Stack allocated memory
- Mỗi một ***thread*** sẽ có một ***stack*** riêng.
- Các ***Value type*** (kiểu giá trị) và tên ***biến***, ***func*** sẽ được lưu vào ***stack*** . Việc giải phóng bộ nhớ sẽ được diễn ra tự động.
- Về cơ bản stack lưu trữ dữ liệu ít hơn hẳn heap.
### Heap allocated memory
- Chỉ có một ***heap*** cho một app
- Các ***property***, ***instance***  của ***Reference type*** (kiểu tham chiếu) và sự liên kết giữa các ***object*** sẽ được lưu vào ***heap***. Bộ nhớ sẽ tồn tại đến khi ***reference count = 0***,  programmer có thể thay đổi số ***reference count***
- Bộ nhớ của heap có thể nới rộng trong quá trình chạy app.
- Sự khác biệt giữa swift và các ngôn ngữ khác chính là tại đây, với ***cơ chế ARC***.

![](https://images.viblo.asia/a0e83a4d-44b2-4b18-ba6f-8c7193c95d39.png)

Tham khảo: https://stackoverflow.com/questions/79923/what-and-where-are-the-stack-and-heap

# ARC - Automatic Reference Counting

***ARC*** là cơ chế quản lý bộ nhớ trong ***swift***, tự động đếm số lượng ***reference count*** và giải phóng bộ nhớ khi reference count = 0.

Để kiểm tra ô nhớ đã được giải phóng hay chưa. Swift cung cấp thêm hàm ***deinit***, hàm này sẽ được chạy trước khi ô nhớ được giải phóng. Bởi vậy trong ***class*** mới có hàm ***deinit*** còn ***struct*** thì không. 

- Mặc đinh một tham chiếu sẽ là strong - liên kết mạnh
- Còn như này ![](https://images.viblo.asia/a7b9f47b-762e-4341-a628-9fe144fb22b6.png) sẽ là weak - liên kết yếu.

Weak để làm gì vậy, nó khác gì so với strong.  Ở phần 2 mình sẽ giải thích điều này.


> ***lưu ý*** :  Object là một thể hiện của một class.
> 
> Vòng đời của một Object: 
> - Cấp phát vùng nhớ
> - Hàm khởi tạo init
> - Sử dụng Object
> - Deinit
> - Huỷ vùng nhớ