### **1. Giới thiệu**

API Testing là một trong những xu hướng nóng nhất của Software Testing trong những năm gần đây và vẫn tiếp tục phát triển. Thay vì chỉ được test bởi các developer, API Testing hiện đang là một phần chung giữa nhiều nhóm trong team. Bài viết này sẽ cung cấp một hướng dẫn toàn diện về cách thực hiện API Testing & WebService với Katalon Studio.

### **2. Làm thế nào để chạy API Testing và Webservice trên Katalon studio**

**Tạo project mới và cài đặt API Testing**

**Bước 1: Tạo một project mới**

Chuyển đến **File → New → Project**. Nhập tên project và vị trí của nó để bắt đầu một project mới.

![](https://images.viblo.asia/abd39b21-58aa-464f-8cd8-ec8e30e5a45d.png)

**Bước 2: Cấu trúc project**

* **Object Repository**: là nơi chứa các Web service endpoints với tất cả thông tin như request method, URL, header, content, và authentication.
* **Test Cases**: là nơi chứa tất cả các testcase.
* **Test Suites**: là nơi chứa tất cả các testsuite, chưa tập hợp các testcase.
* **Test Suite Collection**: là tập hợp các testsuite.

![](https://images.viblo.asia/a0cc00b6-5d79-4ff0-85ee-167901514a32.png)

**Bước 2: Tạo mới RESTful endpoint ở Object Repository**

Chuyển đến **Object Repository → New → Web Service Request**

![](https://images.viblo.asia/3763596d-c441-449b-8a4a-12adcea49855.png)

![](https://images.viblo.asia/d48390e0-9bb9-430b-b5b5-06c120cdcf26.png)

Có một số điểm quan trọng cần phải chú ý trong RESTful API:

1. **Request method**: Bạn có thể chọn một method như: GET, POST, PUT, or DELETE. Method cần phải khớp với URL. Ví dụ ta tạo một test case cho public API từ Jira Cloud. Trong trường hợp này, bạn nên chọn method GET và nhập thông tin một ticket ID tồn tại.

2. **Request URL**: Tiếp theo request method, “request URL” cho ta biết địa chỉ của API chúng ta cần test.

![](https://images.viblo.asia/b6fdcec7-87cb-4f9e-b3f9-065328b7c5c0.png)

3. **Authorization**: Là cơ chế bảo mật của API.

    * Click “OK.” Tiếp theo chúng ta sẽ nhập thông tin đầy đủ của RESTful test đầu tiên.
    * Ví dụ request có Basic Authorization, Basic Authorization yêu cầu username và password. Đừng quên click ‘Update to HTTP Header’ để update vào ‘HTTP Header’.

![](https://images.viblo.asia/971f4d6b-126a-4489-8315-fb879c723aea.png)

![](https://images.viblo.asia/971f4d6b-126a-4489-8315-fb879c723aea.png)

4. **Verification**: Là nơi để bạn định nghĩa các assertion để chắc rằng API sẽ trả về thông tin đúng.

5. **Variables**: Để API của bạn có thể linh động chúng ta cần phải có dữ liệu. Trong Katalon Studio, mỗi phần của request chúng ta đều có thể tham số hóa. Chúng ta có thể tham số cho: URL, authentication, HTTP Header, và HTTP Body theo data-driven testing. Ví dụ

![](https://images.viblo.asia/b542fed4-dce1-4c57-b51b-226b694d9b92.png)

6. **Formatter**: Response sẽ tự động hiển thị ở format: JSON, XML, HTML, và JavaScript.

**Bước 4: Tạo mới test case với request vừa tạo**

Một request có thể được thêm vào một test case với Web service built-in keywords. Có nhiều keywords có thể sử dụng để gửi quét và để verify response, và đưa request vào những flow test lớn hơn.

![](https://images.viblo.asia/6ab107c7-3e2e-4b8b-86a1-0c0f1df0e906.png)

Như test case nào chúng ta có thể gọi request và verify steps từ test case như sau:

![](https://images.viblo.asia/a161afc6-523a-4afc-8e04-a6a076838c95.png)

Test case có thể chạy như một test case bình thường trong Katalon Studio. Mỗi verify step có thể được xem trong log.

![](https://images.viblo.asia/8b2b3e9a-6426-4b73-ac12-167c4c0b9eb4.png)

**Bước 5: Thêm một test case vào test suite**

Một test case có thể được add vào test suite qua thao tác kéo thả hoặc click **Add test case**. Một test case có thể được add vào test suite, chúng ta có thể chạy test suite bằng click nút Run.

![](https://images.viblo.asia/cb88fd11-c996-4583-9bcf-718e483eee65.png)

### 3. Kết thúc

Bây giờ chúng ta đã hoàn thành việc tạo project về test REST API và Webservice, mong rằng bài viết sẽ giúp các bạn thật nhiều. Xin trân trọng cảm ơn.

**Tài liệu tham khảo**
- https://medium.com/katalon-studio/api-testing-guide-and-beginners-tips-soap-rest-8d33bf56225c
-  https://www.toolsqa.com/katalon-studio/rest-api-webservices-testing-with-katalon-studio/