# 1. API REST là gì?

API (Application Programming Interface) là một tập hợp các thường trình, các giao thức và các công cụ được sử dụng cho việc xây dựng các ứng dụng phần mềm dựa trên web.

Nói cách khác, nó là một tập hợp các lệnh được sử dụng bởi những chương trình riêng lẻ khác nhau giúp giao tiếp trực tiếp và sử dụng chức năng của nhau để có được thông tin.

REST ( Representational State Transfer) là một kiểu kiến trúc và là một cách tiếp cận cho việc giao tiếp trong sự phát triển của dịch vụ Web. Nó đã trở thành một sự lựa chọn hợp lý để xây dựng API. REST cho phép người sử dụng kết nối và tương tác với dịch vụ Đám mây (cloud services) một cách hiệu quả.


*Ví dụ: Trang web Google có thể có API cho các chức năng khác nhau như tìm kiếm, dịch thuật, lịch, vv*

Nói chung, API giống như bên dưới,  có tên máy chủ, đường dẫn .., v.v.

```
http://<server name>/v1/export/Publisher/Standard_Publisher_Report?format=csv
```

Có 4 phương thức chủ yếu liên quan đến Kiểm thử API là GET, POST, Delete và PUT.


* GET- Phương thức GET được sử dụng để lấy thông tin từ một máy chủ nhất định sử dụng một URI nhất định. Trong yêu cầu GET, nó chỉ lấy dữ liệu và không có bất cứ tác động nào khác lên dữ liệu. 

* POST- Một yêu cầu POST được sử dụng để tạo ra một thực thể mới. Nó cũng có thể được sử dụng để gửi dữ liệu đến máy chủ. 

*Ví dụ: Thông tin khách hàng, tải lên tệp, v.v ... bằng các biểu mẫu HTML.

* PUT- Tạo một thực thể mới hoặc cập nhật một thực thể hiện có.

* Delete- Loại bỏ tất cả các thực thể hiện tại mà mục điêu yêu cầu được cung cấp bởi một URI.

Trong  bài viết này, chúng ta sẽ  cùng tìm hiểu về 

* API REST là gì?

* Cách kiểm thử API REST.

* Các bước để kiểm thử API REST.

* Xác nhận kết quả.

* Công cụ kiểm thử API REST.

* Những thách thức đối với kiểm thử API.

# 2. Cách kiểm thử API REST

Kiểm thử API yêu cầu một ứng dụng nhằm tương tác với API. Để kiểm thử API, cần hai thứ

* Công cụ / Khung kiểm thử để điều khiển API
* Viết mã lệnh của  bạn để kiểm tra API


API REST có thể được kiểm thử bởi các công cụ như:

* Advanced Rest Client
* Postman-Rest Client
* Curl trong Linux

Ở đây chúng ta sẽ sử dụng Advanced Rest Client, dưới đây là các bước thực hiện kiểm thử cùng với  Advanced Rest Client.

**Cài đặt Advanced Rest Client**

Truy cập Cửa hàng trực tuyến của Google Chrome

![](https://images.viblo.asia/e16d18fd-22a4-40b7-a8c7-7fd9e5bc9ecf.png)

Tìm kiếm "Advanced Rest Client" hoặc trực tiếp vào https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo  và Cài đặt tiện ích mở rộng

Chọn biểu tượng "Advanced Rest Client" trong phần ứng dụng của chrome - chrome: // apps /

Sau khi cài đặt xong, hãy làm theo các bước dưới đây để Kiểm thử API RESTful

# 3. Các bước để kiểm tra API REST

Ở đây chúng ta đang sử dụng phần mở rộng Rest Client trong trình duyệt chrome. Để hiểu một cách rõ ràng hơn, chúng ta đang sử dụng API giả lập "http://ip.jsontest.com/."

**Bước 1):** Khởi chạy tiện ích mở rộng sau khi được cài đặt thành công.

![](https://images.viblo.asia/feaa9eb8-fbe2-4296-9910-f7ae777dae57.png)

**Bước 2):** Nhập URL của API vào .

![](https://images.viblo.asia/4751fdcc-ac0e-4331-baf1-bfdf44296a6c.png)

**Bước 3):** Chọn kiểu phương thức HTTP - ví dụ: "POST"

![](https://images.viblo.asia/f020c08b-4fe2-411a-b05d-fced7902fa09.png)

**Bước 4):** Cung cấp Tiêu đề (nếu cần), trong ô nhập Tiêu đề. Đôi khi chúng ta cần đưa ra tiêu đề như :

```
Content-Type: application/json
X-User-Type: standard
```

![](https://images.viblo.asia/f50c08fc-fa95-4678-8d29-2701fc7dbfeb.png)

**Bước 5): Dưới Payload, đưa vào phần nội dung yêu cầu của API ở dạng các cặp key-value**

*Ví dụ : {{"key1": "value1", "key2": "value2"}.*

Nếu đó là API POST, thì chúng ta cần truyền phần nội dung hoặc tham số.

**Bước 6):** Cài đặt kiểu nội dung được yêu cầu.

*Ví dụ: application/json*

**Bước 7):** Nhấn nút gửi. Sau khi nhấp vào nút "gửi", sẽ thấy phản hồi giống như thế này.

![](https://images.viblo.asia/c72f8676-39f3-47e8-8e70-3585e8d2154e.png)

Ở đây, chúng ta đã sử dụng phương thức "POST", theo cách tương tự, chúng ta có thể sử dụng các phương thức còn lại như GET, PUT, DELETE, v.v.

# 4. Xác nhận kết quả

Chủ yếu, để kiểm thử API Web, chúng ta cần kiểm tra mã phản hồi, thông báo phản hồi và nội dung phản hồi.

Dưới đây là các mã phản hồi khác nhau, có thể gặp phải trong khi Kiểm thử API.

![](https://images.viblo.asia/7a62a4f4-b074-4312-b1c7-3499524ebb92.png)

# 5. Công cụ kiểm thử API REST
* JMeter ( https://www.guru99.com/jmeter-tutorials.html)
* Advanced REST client (https://chrome.google.com/webstore/category/extensions)
* Fiddler (https://www.telerik.com/download/fiddler)

# 6. Những thách thức đối với kiểm thử API

Các vấn đề thú vị dành cho người kiểm thử :

1. Để đảm bảo rằng việc kiểm thử khai thác được sự thay đổi các tham số thông qua lời gọi API có thể xác minh  được chức năng cũng như chỉ ra các lỗi. Nó bao gồm việc khai thác điều kiện biên và gán tham số dùng chung
2. Tạo sự kết hợp thú vị của giá trị tham số  cho các lời gọi có hai hoặc nhiều tham số

3. Xác định nội dung mà theo đó các lệnh gọi API phải được thực hiện. Có thể bao gồm cài đặt các điều kiện môi trường bên ngoài (thiết bị ngoại vi, tệp, v.v.) cũng như dữ liệu được lưu trữ bên trong có ảnh hưởng đến API

4. Trình tự  lợi gọi API theo thứ tự mà hàm sẽ được thực thi

5.  Làm cho API tạo ra kết quả hữu ích từ các lời gọi liên tiếp.

# Kết luận

API (Application Programming Interface) là một tập hợp các thường trình, các giao thức và các công cụ được sử dụng cho việc xây dựng các ứng dụng phần mềm dựa trên web.

Có 4 phương thức chủ yếu liên quan đến Kiểm thử API là GET, POST, Delete và PUT.

Chúng ta cần kiểm tra mã phản hồi, thông báo phản hồi và nội dung phản hồi trong kiểm thử API.

# Tài liệu tham khảo 
https://www.guru99.com/testing-rest-api-manually.html