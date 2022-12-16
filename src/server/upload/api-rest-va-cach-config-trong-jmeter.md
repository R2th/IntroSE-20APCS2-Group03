Mở đầu bài viết là định nghĩa

***1. API REST là gì?***
- REST là một kiểu cấu trúc (architectural style) cung cấp API thông qua internet để xử lý các hoạt động CRUD trên dữ liệu. REST tập trung vào việc truy cập các tài nguyên được đặt tên thông qua một giao diện duy nhất. Thay vì sử dụng XML để tạo request, REST dựa vào một URL đơn giản. 
- Trong một số trường hợp, phải cung cấp thông tin bổ sung theo những cách đặc biệt, nhưng hầu hết các Web Services sử dụng REST đều dựa hoàn toàn vào việc thu lại các thông tin cần thiết bằng phương pháp URL. REST có thể sử dụng bốn hình thái HTTP khác nhau (GET, POST, PUT và DELETE) để thực hiện các tasks.

***2. Ưu điểm của API REST so với API SOAP***
- REST cho phép nhiều định dạng dữ liệu khác nhau trong khi SOAP chỉ cho phép XML. 
- REST sử dụng chuẩn HTTP nên nó đơn giản hơn nhiều so với trước đây.
- REST có hiệu suất tốt hơn và khả năng mở rộng.
- REST hoàn toàn có thể sử dụng SOAP web services để thực hiện.

***3. Config API REST trên JMeter***

Với 1 giao diện Jmeter thì chỉ có 1 Test Plan

**Bước 1:** Add Thread Group

Thực hiện thao tác sau: Chuột phải vào Test Plan chọn Add => chọn Tiếp Threads (Users) => chọn tiếp Thread Group.

![Buoc1-Add-Thread-Group-5.png](https://images.viblo.asia/d62f6052-8482-4ad1-b6d6-8ecffa902bb5.png)

**Bước 2:** Add HTTP Request Sampler

Sau khi add thành công Thread Group ở bước 1, tiếp tục chọn Thread Group và chuột phải, chọn Add =>  chọn Sampler => sau đó chọn HTTP Request (đây là nơi chứa body của API REST).

![Buoc2-Add-HTTP-Request-Sampler-6.png](https://images.viblo.asia/984a2d8d-4538-4d59-ae16-3ea02f8e9cc0.png)

**Bước 3:**  Add HTTP Header Manager

Chuột phải vào HTTP Request chọn Add => tiếp tục chọn Config Element => chọn HTTP Header Manager.

![v.png](https://images.viblo.asia/51c30d80-dd97-47bd-a492-0911b4492b0b.png)

**Bước 4:** Add View Results Tree Listener

- Bước cuối cùng để kiểm tra kết quả sau khi config và chạy API.
- Thêm Listener ( View Result Tree) bằng cách chọn Thread Group => chuột phải chọn Add => chọn Listener => click vào View Results Tree.

![Buoc4-Add-View-Results-Tree-Listener-7.png](https://images.viblo.asia/46936e95-0887-473f-9cb1-e0759a4be1ea.png)

**Bước 5:**  Thiết lập body của API REST với thông tin API đầu vào ở trang bất kì như sau: (thông tin ở ví dụ là data fake) tùy theo thực tế cần truyền đúng thông tin API đầu vào.

– Method : POST

– Request: thông tin cần điền

– Response: thông tin kết quả mong muốn

– Protocol: HTTPS

– Server Name/IP domain: api.octoperf.com

– Path:  /public/users/login

![2021.png](https://images.viblo.asia/938e9775-1f24-470f-883d-88861a6051f9.png)

Tiếp theo chúng ta config body data, trong HTTP Request click Body data để add chuỗi JSON insert data

![43.png](https://images.viblo.asia/7197031c-9728-4d64-a18a-e593826d842e.png)

Cuối cùng thiết lập Header và chạy thử

![45.png](https://images.viblo.asia/2695c3e0-528f-4d43-a402-5d731ec220a5.png)

Sau khi chạy xong, click View Results Tree để xem kết quả

Ví dụ dưới đây là truyền thông tin Body data không chính xác. 
![78.png](https://images.viblo.asia/3b047213-77e3-4d10-94db-dbbd55b0a25e.png)

- Tab Request: nơi hiển thị thông tin của request đã gửi lên server (request header và request data)
-  Tab Response data: nơi chứa thông tin server trả về.

Trường hợp config thành công thì mọi người cùng thực hành với API thực tế nhé.

Để tìm hiểu thêm về cách request API như thế nào, response thành công và thất bại khi nào, cách config tham số mong các bạn hãy đón chờ ở bài viết tiếp theo
Chúc mọi người thành công với việc config 1 API REST .

Tham khảo từ nguồn: https://sal.vn/1x55wm