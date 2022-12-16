## 1. Test Scenario là gì?

Kịch bản kiểm thử – Test Scenario bao gồm tất cả các chức năng có thể được kiểm thử. Test Scenario cũng được gọi là Test Condition hoặc Test Possibility.Là một bộ test case để đảm bảo rằng luồng nghiệp vụ đã được kiểm tra từ đầu đến cuối. Có thể là các thử nghiệm độc lập hoặc một loạt các thử nghiệm nối tiếp nhau, mỗi thử nghiệm phụ thuộc vào đầu ra của thử nghiệm trước đó

Test Scenario trả lời cho câu hỏi ***‘Những cái gì sẽ được kiểm tra’*** và Test Case thì trả lời cho câu hỏi ***‘Thực hiện kiểm thử như thế nào’***
![](https://images.viblo.asia/4f44793b-a1d0-4697-ba6f-a6f395dec0b6.png)


## 2. Tại sao phải tạo Test Scenario?
Tại mỗi level kiểm thử chúng ta sẽ có những quan điểm test hay các file report khác nhau. Ở giai đoạn System test chúng ta cần test toàn bộ hệ thống và để thực hiện quy trình này chúng ta có thể viết dưới dạng Scenario


![](https://images.viblo.asia/365d9a91-9e00-476d-ab15-b435ddf01ea6.png)


Cần tạo test Scenario vì: 

* Tạo các kịch bản kiểm thử đảm bảo hoàn thành Test Coverage
* Kịch bản kiểm thử có thể được thông qua bởi các bên liên quan khác nhau như Nhà phân tích nghiệp vụ (BA), Developers, Khách hàng để đảm bảo ứng dụng được kiểm thử kỹ lưỡng và đảm bảo rằng phần mềm đang hoạt động tốt.
* Kịch bản kiểm thử như một công cụ nhanh chóng để xác định effort kiểm thử, dựa theo đó tạo ra đề xuất cho khách hàng hoặc tổ chức về nguồn lực lao động.
* Kịch bản kiểm thử giúp xác định các giao dịch đầu cuối quan trọng nhất hoặc xác định việc sử dụng các ứng dụng phần mềm trong thực tế.
* Để nghiên cứu chức năng đầu cuối, Kịch bản kiểm thử là rất quan trọng.


## 3. Sự khác biệt Test case và Test Scenario



| Test case | Test scenario | 
| -------- | -------- | 
|  Test case bao gồm tập hợp các giá trị đầu vào, điều kiện tiên quyết thực hiện, kết quả mong đợi   |    Test scenario không có gì ngoài phương thức kiểm thử  | 
|   Test case thể hiện từng hành động đơn lẻ của người sử dụng  |     Test scenario thể hiện một chuỗi các hành động được liên kết với nhau | 
|   Test case bao gồm tập hợp giá trị đầu vào và đầu ra của hệ thống  |    Scenario là một luồng hoạt động  | 

## 4. Chú ý khi tạo Test scenario

* Mỗi kịch bản kiểm thử phải được gắn với tối thiểu một yêu cầu trong dự án.
* Trước khi tạo kịch bản kiểm thử xác minh nhiều yêu cầu cùng một lúc, hãy đảm bảo đã có kịch bản kiểm thử cho mỗi yêu cầu riêng lẻ.
* Tránh tạo các kịch bản kiểm thử quá phức tạp, nhiều yêu cầu kéo theo.
* Số lượng kịch bản có thể lớn và tốn kém để bao phủ tất cả. Dựa trên những ưu tiên của khách hàng, chỉ chạy các kịch bản kiểm thử được chọn.

## 5. Template mẫu Test scenario
![](https://images.viblo.asia/3733ce5b-f743-4434-8ef7-54220986c747.png)


***Link tài liệu tham khảo:***

https://www.guru99.com/test-scenario.html

https://www.softwaretestingclass.com/what-is-difference-between-test-cases-vs-test-scenarios/