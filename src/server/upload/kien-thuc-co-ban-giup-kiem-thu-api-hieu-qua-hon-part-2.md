### Phương pháp tiếp cận của API Testing.

* Hiểu chức năng của chương trình API và xác định rõ ràng phạm vi của chương trình.
* Áp dụng các kỹ thuật kiểm thử như lớp tương đương, phân tích giá trị biên và đoán lỗi để viết testcase cho kiểm thử API.
* Các tham số đầu vào cho API cần được xác định một cách thích hợp.
* Thực hiện testcase và so sánh expected results and actual results.

### Khác nhau giữa API Testing và Unit Testing

| Unit testing | 	API testing |
| -------- | -------- | 
| Do Developer thực hiện   | Do Tester thực hiện  | 
| Lần lượt từng chức năng được kiểm thử   | Các chức năng liên quan đến nhau được kiểm thử |
| Developer có thể truy cập vào source code  | Tester có thể truy cập vào source code |
| Kiểm tra cả UI | Chỉ kiểm tra các hàm API |
|Chỉ các chức năng cơ bản được kiểm thử  | Tất cả các chức năng được kiểm thử |
|Giới hạn phạm vi |  Phạm vi rộng hơn |
|Thường được chạy trước khi build |  Thường được chạy sau khi build |

### Vài điểm cần chú ý trong API Testing:

* Testcase nên được chia thành nhóm theo loại kiểm thử
* Phần đầu mỗi testcase, nên khai báo các API được gọi
* Các tham số được liệt kê đầy đủ trong các testcase
* Đặt độ ưu tiên cho các hàm API được gọi để dễ dàng test hơn
* Mỗi testcase nên độc lập, và tránh bị phụ thuộc
* Phải chú ý trong xử lý các chức năng gọi một lần như xóa, đóng cửa sổ....
* Trình tự gọi các hàm API nên được thực hiện và có kế hoạch
* Đảm bảo test converage, tạo testcase cho tất cả các kết hợp đầu vào có thể có của API.



### Các tool cho kiểm thử API
Kiểm thử API và Unit đều là kiểm tra source code nên đều có thể sử dụng các công cụ dưới đây:
* SOAPUI
* Runscope
* Postman
* Curl
* Cfix
* Check
* CTESK
* dotTEST
* Eclipse SDK tool- Automated API testing

Mình có tìm hiểu chi tiết hơn về công cụ test API - Advanced Rest Client

Cài đặt: ADvanced Rest Client là một ứng dụng trong trình duyệt Chrome. Bạn chỉ cần vào [link](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo/related) và chọn Cài đặt.

Bước 1: Khởi động Advanced Rest Client

![](https://images.viblo.asia/12f5088f-4852-4e8b-845d-05711dc2424c.png)

Bước 2: Nhập URL của API vào thanh địa chỉ

![](https://images.viblo.asia/b714a394-6680-4cce-b89a-101db9f0b0d6.png)

Bước 3: Chọn phương thức của API. Ví dụ chọn phương thức POST

![](https://images.viblo.asia/a3ba81f8-ccf1-4548-a6a8-15a7c5ea52c1.png)

Bước 4: Thêm Header (nếu bắt buộc). Header thường có dạng sau:

Content-Type: application / json

X-User-Type: standard

![](https://images.viblo.asia/e10f8d4e-c9e2-44f4-8d34-41b0fef031fd.png)

Bước 5: Trong tab Payload, thêm body cho API theo key-value, ví dụ: { "key1": "value1", "key2": "value2"}.

![](https://images.viblo.asia/3d076c53-dbe2-4095-8a4c-69262c8bdf7a.png)

Bước 6: Thiết lập các nội dung yêu cầu như: application / json

Bước 7: Sau khi hoàn thiện, nhấn nút "Send". Bạn sẽ nhận được response trả về giống như sau:

![](https://images.viblo.asia/4a049110-5fef-4fd4-af30-be9bb7d3613a.png)

Trên đây chỉ là một ví dụ sử dụng phương thức POST của API, trong quá trình kiểm thử sẽ gặp thêm nhiều phương thức khác nữa như: GET, PUT, DELETE,...

Trong kiểm thử API chủ yếu kiểm tra response code, response message, và response body.

Dưới đây là các response code khác nhau có thể gặp trong kiểm thử API.

![](https://images.viblo.asia/434f3e46-30eb-46dd-ac71-8fcc54706ce4.png)

### Tại sao kiểm thử API lại quan trọng?

Kiểm thử API có những lợi thế đáng kể sau:

1. Ngăn ngừa sớm những lỗi có thể xảy ra ở ứng dụng.

Nếu một API có những lỗi không được phát hiện, nó có thể không chỉ phá huỷ một ứng dụng duy nhất mà có thể là cả một hệ thống.

Ở tầng giao diện ứng dụng thường sẽ chặn những dữ liệu không hợp lệ, cho nên khi gửi đến server dữ liệu nhận được thường đã hợp lệ. Tuy nhiên, nếu dùng thủ thuật một số dữ liệu không hợp lệ vẫn có thể vượt qua kiểm soát của giao diện, đến khi lưu vào database sẽ làm sai những ràng buộc, có thể gây nên những lỗi nghiêm trọng cho hệ thống. Vì vậy kiểm thử API giúp kiểm tra lại một lần nữa, sàng lọc lại những dữ liệu không hợp lệ bị lọt lưới từ tầng giao diện.

2. Kiểm thử API đang trở thành loại kiểm thử rất phổ biến.

Theo dõi biều đồ bên dưới, có thể thấy kiểm thử API tăng lên rất nhanh trong 10 năm qua.
![](https://images.viblo.asia/f7884998-6975-42f1-bf46-8d5b56bce31c.png)

3. Tiết kiệm thời gian.
Với kiểm thử API chúng ta có thể thực hiện song song để giảm thời gian kiểm thử. Do đó có thể tiết kiệm lên đến 5 lần so với các loại kiểm thử khác.

4. Ngôn ngữ độc lập.
Dữ liệu được trao đổi thông qua XML hoặc JSON và mọi ngôn ngữ đều có thể sử dụng. Ví dụ, khi nhận được một respone ở định dạng JSON thì bạn có thể dễ dàng phân tích dữ liệu với Java, Objective-C, C# hoặc bất kỳ ngôn ngữ nào.

5. Dễ dàng tích hợp

### Thách thức đối với kiểm thử API

* Thử thách chính của kiểm thử API là kết hợp tham số, lựa chọn tham số và trình tự gọi
* Không có giao diện để test nên gặp khó khăn trong việc nhập dữ liệu đầu vào
* Kiểm tra đầu ra trên hệ thống khác là khá khó cho các tester
* Các tester phải nắm rõ các yêu cầu về lựa chọn tham số và phần loại
* Xử lý các ngoại lệ cũng cần phải được kiểm tra
* Các tester cần có kiến thức về lập trình

Bài viết được dịch và tham khảo từ nguồn:
    
    https://www.guru99.com/api-testing.html
    https://www.guru99.com/api-testing-with-qtp-hp-uft.html
    https://www.guru99.com/testing-rest-api-manually.html