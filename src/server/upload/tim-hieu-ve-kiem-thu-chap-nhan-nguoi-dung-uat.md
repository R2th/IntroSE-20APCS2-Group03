![](https://images.viblo.asia/9ae6cee2-dd93-4bed-9993-5c206874c2e3.png)

# Khái niệm kiểm thử chấp nhận
Trước khi tìm hiểu về kiểm thử chấp nhận người dùng (`User Acceptance Testing` - **UAT**), ta cần biết thế nào là kiểm thử chấp nhận (`Acceptance Testing` - **AT**). Kiểm thử chấp nhận là một quá trình mà sẽ kiểm tra xem các yêu cầu đặc tả kỹ thuật và tài liệu hợp đồng có được đáp ứng hay không.

**ISTQB** định nghĩa kiểm thử chấp nhận như sau:
> Formal testing with respect to user needs, requirements, and business processes conducted to determine whether a system satisfies the acceptance criteria and to enable the user, customers or other authorized entity to determine whether to accept the system.
> 
> — Standard Glossary of Terms used in Software Testing —

Tức là các thử nghiệm chính thức liên quan đến yêu cầu của người dùng và quy trình nghiệp vụ được tiến hành để xác định xem một hệ thống có thỏa mãn các tiêu chí chấp nhận hay không và cho phép người dùng, khách hàng hoặc tổ chức được ủy quyền khác xác định có chấp nhận hệ thống đó hay không.

Kiểm thử chấp nhận bao gồm các loại phổ biến sau:
* Kiểm thử chấp nhận người dùng (**UAT**)
* Kiểm thử người dùng cuối (`End-user testing`)
* Kiểm thử chấp nhận vận hành (`Operational Acceptance Testing` - **OAT**)

# Giới thiệu về kiểm thử chấp nhận người dùng
Kiểm thử chấp nhận người dùng là một loại kiểm thử chấp nhận. Nó là một quá trình mà xác nhận rằng một giải pháp hoặc phần mềm đã tạo ra có đáp ứng được cho việc sử dụng của người dùng cuối hay không. 
Kiểm thử chấp nhận người dùng là quá trình diễn ra vào giai đoạn cuối của chu trình kiểm thử, sau khi các giai đoạn kiểm thử chức năng (`Functional Testing`), kiểm thử tích hợp (`Integration Testing`) và kiểm thử hệ thống (`System Testing`) kết thúc. Và ngay sau khi qua được giai đoạn **UAT** thì sản phẩm sẽ sẵn sàng để đưa vào sử dụng thực tế (`production`).

![](https://images.viblo.asia/76d2bdbe-78cc-4794-9994-001a6bb622a3.png)

# Lý do cần áp dụng kiểm thử chấp nhận người dùng
Mặc dù khi qua được 3 bước kiểm thử chức năng, kiểm thử tích hợp và kiểm thử hệ thống, kiểm thử chấp nhận sẽ có thể trở nên dư thừa. Tuy nhiên lý do chúng ta không nên bỏ qua bước kiểm thử này là bởi vì:
1. Các lập trình viên dựa vào các đặc tả yêu cầu để phát triển phần mềm. Tuy nhiên đây lại phần mềm được dựng theo "cách hiểu" của cá nhân họ về các yêu cầu mà có thể không phải là những thứ mà người dùng thực sự cần.
2. Các yêu cầu thay đổi ngay trong quá trình triển khai dự án không được truyền đạt hiệu quả cho các lập trình viên.

# Kiểm thử chấp nhận người dùng và mô hình chữ V
Mô hình chữ V (**V-Model**) là mô hình mà trong các giai đoạn kiểm thử sẽ đi cùng với một giai đoạn phát triển phần mềm, hoặc có thể nói hai quá trình phát triển và kiểm thử hoạt động song song.  
Trong mô hình này, kiểm thử chấp nhận người dùng sẽ tương ứng với giai đoạn phân tích yêu cầu.

![](https://images.viblo.asia/d0c41844-ab41-4bf1-bcf7-cbb9efdfaaa7.png)

Kiểm thử chấp nhận người dùng cần thỏa mãn các điều kiện sau để có thể tiến hành:
* Yêu cầu nghiệp vụ phải có sẵn
* Mã nguồn chương trình cần phải được phát triển đầy đủ
* Các quá trình kiểm thử chức năng, kiểm thử tích hợp và kiểm thử hệ thống phải được hoàn thành
* Không có các lỗi dừng chương trình đột ngột, hay các lỗi nghiêm trọng trong quá trình kiểm thử tích hợp hệ thống trước đó
* Chỉ có các lỗi về thẩm mỹ mới có thể được bỏ qua trước khi quá trình kiểm thử chấp nhận diễn ra
* Hoàn thành kiểm thử hồi quy mà không có lỗi lớn xảy ra
* Tất cả các lỗi phải được báo cáo và sửa trước khi kiểm thử chấp nhận bắt đầu
* Hoàn thành ma trận truy xuất nguồn gốc cho tất cả các bộ kiểm thử
* Môi trường cho kiểm thử chấp nhận phải sẵn sàng để sử dụng
* Có thông báo sẵn sàng cho kiểm thử chấp nhận từ nhóm kiểm thử hệ thống.

# Quy trình kiểm thử chấp nhận người dùng
Kiểm thử chấp nhận được diễn ra tại máy khách, và được thực hiện bởi người dùng dự định sẽ sử dụng hệ thống hoặc phần mềm. Quy trình kiểm thử chấp nhận sẽ bao gồm các bước như sau:

![](https://images.viblo.asia/3ff15308-35e0-4f75-bcbb-ca0fc1c5a6d2.png)

### Bước 1: Phân tích các yêu cầu nghiệp vụ
Một trong những việc làm quan trọng nhất của quá trình kiểm thử chấp nhận là xác định và xây dựng các kịch bản thử nghiệm. Các kịch bản này được lấy từ các tài liệu sau:
* Bản tuyên ngôn của dự án (`Project Charter`)
* Các trường hợp sử dụng theo nghiệp vụ (`Business Use Cases`)
* Các sơ đồ quy trình hoạt động của chương trình (`Process Flow Diagram`)
* Tài liệu yêu cầu nghiệp vụ (`Business Requirements Document` - **BRD**)
* Các đặc tả yêu cầu hệ thống (`System Requirements Specification` - **SRS**)

### Bước 2: Tạo kế hoạch 
Kế hoạch kiểm thử cho kiểm thử chấp nhận sẽ được sử dụng để xác minh và đảm bảo ứng dụng/chương trình đáp ứng được các yêu cầu nghiệp vụ của nó. Nó sẽ ghi lại các tiêu chí nhập vào và xuất ra cho kiểm thử chấp nhận, kịch bản kiểm thử, cách tiếp cận các trường hợp kiểm thử và thời gian kiểm thử.

### Bước 3: Xác định các kịch bản và trường hợp kiểm thử (Test Scenarios and Test Cases)
Ở bước này sẽ xác định các kịch bản kiểm thử liên quan đến quy trình nghiệp vụ cấp cao và tạo các trường hợp kiểm thử (test cases) với các bước kiểm thử rõ ràng. Các trường hợp kiểm thử phải đầy đủ bao gồm hầu hết các kịch bản của kiểm thử chấp nhận. Các trường hợp sử dụng theo nghiệp vụ là đầu vào để tạo ra các trường hợp kiểm thử.

### Bước 4: Chuẩn bị dữ liệu cho việc kiểm thử
Các dữ liệu dùng cho kiểm thử chấp nhận nên là các dữ liệu thực tế mà người dùng sẽ sử dụng. Chúng ta nên xáo trộn dữ liệu, chẳng hạn như ghép cặp ngẫu nhiên các bộ dữ liệu với nhau để giúp tăng tính bảo mật và riêng tư.   
Bên cạnh đó, người kiểm thử cũng sẽ cần phải làm quen với các luồng cơ sở dữ liệu.

### Bước 5: Tiến hành kiểm thử và ghi lại các kết quả
Bước này sẽ tiến hành kiểm thử theo các tài liệu, quy trình và dữ liệu sẵn có. Các lỗi xảy ra sẽ được ghi lại và tiến hành kiểm tra lại sau khi đã được sửa.

Có thể áp dụng các công cụ quản lý kiểm thử cho bước này, chẳng hạn như [JIRA](https://www.atlassian.com/software/jira), [Klaros](https://www.klaros-testmanagement.com), [qTest](https://www.tricentis.com/products/agile-dev-testing-qtest/agile-test-management-qtest-manager/) ....

### Bước 6: Xác nhận việc đã đáp ứng các mục tiêu nghiệp vụ
Các chuyên viên phân tích nghiệp vụ (`Business Analysist` - **BA**) hoặc người kiểm thử chấp nhận cần thông báo qua mail về việc kết thúc quá trình. Đến lúc này, sản phẩm đã sẵn sàng để đưa vào sử dụng trong thực tế (`production`).

Các tài liệu bàn giao của quá trình kiểm thử chấp nhận bao gồm các kế hoạch kiểm thử, kịch bản kiểm thử, trường hợp kiểm thử (`test cases`), kết quả kiểm thử và nhật ký ghi lại lỗi.

Để đảm bảo sẵn sàng cho sử dụng thực tế (`production`), kiểm thử chấp nhận cần đảm bảo các điều sau:
* Không có các lỗi nghiêm trọng còn đang mở
* Quy trình nghiệp vụ hoạt động ổn định
* Người tiến hành kiểm thử chấp nhận đã đăng xuất khỏi tất cả các tài khoản và các bên liên quan.

# Một số vấn đề liên quan đến kiểm thử chấp nhận
Để tăng tỉ lệ thành công của kiểm thử chấp nhận (**UAT**), ta có thể xem xét các vấn đề sau:
* Chuẩn bị sớm các kế hoạch kiểm thử chấp nhận trong vòng đời của dự án
* Chuẩn bị các checklists đầy đủ trước khi tiến hành kiểm thử chấp nhận
* Thực hiện Pre-UAT trong giai đoạn kiểm thử hệ thống
* Đặt kì vọng và xác định rõ phạm vi của kiểm thử chấp nhận
* Chỉ kiểm thử với vai trò người dùng cuối và không lặp lại quá trình kiểm thử hệ thống
* Kiểm thử với dữ liệu sẽ dùng trong thực tế, không sử dụng dữ liệu giả
* Có tư duy của một người dùng bất kỳ khi tiến hành kiểm thử
* Cần có quá trình phản hồi trước khi kết thúc kiểm thử chấp nhận và chuyển sang giai đoạn sử dụng thực tế.

# Kết luận
Trên đây là một số tìm hiểu của mình về quá trình kiểm thử chấp nhận người dùng (`User Acceptance Testing` - **UAT**). Bên cạnh các vấn đề này, kiểm thử chấp nhận người dùng còn có nhiều vấn đề liên quan khác thì mình sẽ tiếp tục tìm hiểu và đưa vào các bài viết tiếp theo. Cảm ơn mọi người đã đọc bài viết ^^.

# Tài liệu tham khảo
* https://www.softwaretestinghelp.com/what-is-user-acceptance-testing-uat
* https://www.guru99.com/user-acceptance-testing.html
* https://topdev.vn/blog/uat-user-acceptance-testing
* https://en.wikipedia.org/wiki/Acceptance_testing