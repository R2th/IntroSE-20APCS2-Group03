*Requirements Traceability Matrix - RTM là gì? Traceability Test Matrix bao gồm những loại nào? Tạo Requirement Traceability Matrix như thế nào? Lợi thế của Requirement Traceability Matrix là gì? Mời mọi người cùng đọc bài viết này để hiểu rõ hơn về Requirements Traceability Matrix nhé.*

# 1. Traceability Matrix - TM (Ma trận truy xuất nguồn gốc) là gì?

Traceability Matrix là một tài liệu liên quan đến bất kỳ tài liệu “two-baseline” nào đòi hỏi mối quan hệ nhiều-nhiều để kiểm thử tính đầy đủ của mối quan hệ.

Traceability Matrix được sử dụng để theo dõi các yêu cầu và để kiểm thử các yêu cầu dự án hiện tại được đáp ứng.

# 2. Requirements Traceability Matrix - RTM (Ma trận truy xuất nguồn gốc yêu cầu) là gì?

Requirement Traceability Matrix nắm bắt tất cả các yêu cầu do khách hàng hoặc nhóm developer đề xuất và khả năng truy xuất nguồn gốc trong một tài liệu được đưa ra khi kết thúc vòng đời.

Nói cách khác, đó là một tài liệu ánh xạ và theo dõi yêu cầu của người dùng với các test cases. Mục đích chính của Requirement Traceability Matrix là để thấy rằng tất cả các test cases được đảm bảo không có chức năng nào bị bỏ lỡ trong khi thực hiện kiểm thử phần mềm.

# 3. Các thông số trong Requirement Traceability Matrix

*Các thông số bao gồm:*

* ID
* Rủi ro
* Loại yêu cầu và mô tả
* Yêu cầu để thiết kế đặc điểm kỹ thuật
* Test cases kiểm thử đơn vị
* Test cases kiểm thử tích hợp
* Test cases kiểm thử hệ thống
* Test cases kiểm thử chấp nhận người dùng
* Theo dõi để kiểm thử kịch bản

# 4. Các loại Traceability Test Matrix

### 1. Forward traceability (Truy xuất nguồn gốc xuôi)

Được sử dụng để kiểm thử xem dự án có tiến triển theo hướng mong muốn và cho đúng sản phẩm hay không, đảm bảo rằng mỗi yêu cầu được áp dụng cho sản phẩm và từng yêu cầu được kiểm thử kỹ lưỡng. Nó ánh xạ các yêu cầu để kiểm thử các trường hợp.

### 2. Backward or reverse traceability (Truy xuất nguồn gốc ngược)

Được sử dụng để đảm bảo liệu sản phẩm hiện tại có đi đúng hướng hay không. Mục đích của Backward or reverse traceability là để xác minh rằng chúng ta không mở rộng phạm vi của dự án bằng cách thêm code, các thành phần thiết kế, kiểm thử hoặc công việc khác không được chỉ định trong các yêu cầu. Nó ánh xạ các test cases theo yêu cầu.

### 3. Bi-directional traceability (Truy xuất nguồn gốc hai chiều)

Đảm bảo rằng tất cả các yêu cầu được bao phủ trong các test case, phân tích tác động của sự thay đổi trong các yêu cầu bị ảnh hưởng bởi lỗi trong sản phẩm và ngược lại.

# 5. Cách tạo Requirement Traceability Matrix

Chúng ta hãy hiểu khái niệm Requirement Traceability Matrix thông qua dự án ngân hàng Guru99.

Trên cơ sở Tài liệu yêu cầu nghiệp vụ (Business Requirement Document - BRD) và Tài liệu yêu cầu kỹ thuật (Technical Requirement Document - TRD), tester bắt đầu viết test cases.

Giả sử, bảng sau đây là Tài liệu yêu cầu nghiệp vụ (BRD) cho dự án ngân hàng Guru99.

Kịch bản là Customer sẽ có thể đăng nhập vào trang web ngân hàng Guru99 với user id và password chính xác trong khi Manager có thể đăng nhập vào trang web thông qua trang đăng nhập của Customer.

![](https://images.viblo.asia/d8d724af-bf46-440e-b3f1-7c4c42091f28.jpg)

*Bảng dưới đây là Tài liệu Yêu cầu Kỹ thuật (TRD)*

![](https://images.viblo.asia/d496e53d-4a54-4866-a88e-ebf03fe840a2.jpg)

**Lưu ý**: Các đội QA không ghi lại BRD và TRD. Ngoài ra, một số công ty sử dụng Tài liệu yêu cầu chức năng (FRD) tương tự như Tài liệu yêu cầu kỹ thuật nhưng quá trình tạo Traceability Matrix vẫn giống nhau.

### Tạo kiểm thử RTM

* **Bước 1**: Test case là: Xác minh đăng nhập, khi nhập đúng ID và mật khẩu, sẽ đăng nhập thành công.

![](https://images.viblo.asia/7fd06529-a5ea-4dff-8fb1-e579b9b0ac0c.jpg)


* **Bước 2**: Xác định Yêu cầu kỹ thuật mà test case này đang xác minh: Yêu cầu kỹ thuật là T94 đang được xác minh.

![](https://images.viblo.asia/8d6ff51b-7617-4d83-aa57-037be75cafa2.jpg)


* **Bước 3**: Lưu ý Yêu cầu kỹ thuật (T94) trong test case này.

![](https://images.viblo.asia/4f17153b-aa9f-4f45-8a16-2b9119c95c31.jpg)


* **Bước 4**: Xác định Yêu cầu nghiệp vụ mà TR (Yêu cầu kỹ thuật-T94) được xác định

![](https://images.viblo.asia/5b7c19d3-7364-48c0-9284-de8821ef0c69.jpg)


* **Bước 5**: Lưu ý BR (Yêu cầu nghiệp vụ) trong Test Case

![](https://images.viblo.asia/997103bd-b97b-4f74-bec5-a2774f8510e3.jpg)


* **Bước 6**: Thực hiện các bước trên cho tất cả các Test Case. Sau đó lấy 3 cột đầu tiên từ bộ kiểm thử của bạn. RTM trong kiểm thử đã hoàn thành.

![](https://images.viblo.asia/3b149024-552e-4550-9fa8-07eca41f3494.jpg)


# 6. Lợi thế của Requirement Traceability Matrix

* Requirement Traceability Matrix xác nhận phạm vi kiểm thử 100%.

* Requirement Traceability Matrix nhấn mạnh bất kỳ yêu cầu thiếu hoặc tài liệu không nhất quán.

* Requirement Traceability Matrix cho thấy các lỗi tổng thể hoặc trạng thái thực thi với trọng tâm là các yêu cầu nghiệp vụ.

* Requirement Traceability Matrix giúp phân tích hoặc ước tính tác động đối với công việc của nhóm QA liên quan đến việc xem xét lại hoặc làm việc lại trên các test cases.


**Bài dịch và tham khảo từ nhiều nguồn: http://www.guru99.com/traceability-matrix.html và https://www.tutorialspoint.com/trace-your-requirements-with-a-traceability-matrix-rtm**