# 1. Cấp độ kiểm thử phần mềm là gì?
Cấp độ kiểm thử phần mềm là một quá trình trong đó mọi thành phần của phần mềm / hệ thống đều được kiểm tra. 

Mục tiêu chính của kiểm thử hệ thống là đánh giá sự hợp lý, chính xác của hệ thống với các yêu cầu đã ra.

Để kiểm tra hành vi và hiệu suất của quá trình kiểm thử phần mềm, chia thành nhiều cấp độ kiểm thử
![](https://images.viblo.asia/0f68c212-d205-46d6-8aed-4a1fb1d1ad8e.png)

Các cấp độ thử nghiệm này được thiết kế để nhận ra các khu vực bị thiếu và đối chiếu giữa các trạng thái vòng đời phát triển. 

Tất cả các giai đoạn của vòng đời phát triển phần mềm đều trải qua 4 cấp độ kiểm thử này

# 2. Unit testing
**UNIT TESTING** (Kiểm thử đơn vị) là một cấp độ kiểm thử phần mềm trong đó các đơn vị / thành phần riêng lẻ của một phần mềm được kiểm tra (Nó kiểm tra từng module riêng lẻ)

Mục đích là để xác nhận rằng mỗi đơn vị/thành phần của phần mềm thực hiện đúng chức năng.

Ai tiến hành: được thực hiện bởi các nhà phát triển.

Ưu điềm:
* Giảm khiếm khuyết trong các tính năng mới được phát triển hoặc giảm lỗi khi thay đổi chức năng hiện có.
* Giảm chi phí kiểm tra vì các khiếm khuyết được nắm bắt trong giai đoạn rất sớm.
* Cải thiện thiết kế và cho phép tái cấu trúc mã tốt hơn.
* Kiểm tra đơn vị, khi được tích hợp với bản dựng cũng cho chất lượng của bản dựng.

Vòng đời unit testing
![](https://images.viblo.asia/bd49008e-784f-466d-9ccf-443c376c764d.jpg)

# 3. Integration testing
**Integration testing** (Kiểm thử tích hợp) là một cấp độ kiểm thử phần mềm trong đó các đơn vị riêng lẻ được kết hợp và kiểm tra thành một nhóm (Nó kiểm tra luồng dữ liệu từ một module đến các module khác)

Mục đích của cấp độ thử nghiệm này là để lộ các lỗi trong sự tương tác giữa các đơn vị tích hợp


Khi nào: được thực hiện sau kiểm thử đơn vị

Ai tiến hành: Được thực hiện bởi bản thân các nhà phát triển hoặc người kiểm tra độc lập

# 4. System testing 
**System testing** (Kiểm thử hệ thống) là một cấp độ kiểm thử phần mềm thực hiện trên một phần mềm hoàn chỉnh và tích hợp.

Nó cho phép kiểm tra sự tuân thủ của hệ thống theo yêu cầu, kiểm tra sự tương tác tổng thể của các thành phần. 

Kiểm tra hệ thống thường xuyên nhất là kiểm tra cuối cùng để xác minh rằng hệ thống đáp ứng các đặc điểm kỹ thuật. Kiểm tra hệ thống đánh giá cả nhu cầu chức năng và phi chức năng để thử nghiệm.

Khi nào: Được thực hiện sau  integration testing và trước acceptance testing

Ai tiến hành: Được thực hiện bởi Người kiểm tra độc lập

# 5. Acceptance testing
**Acceptance testing** (Kiểm thử chấp nhận) là một mức độ kiểm thử, hệ thống được kiểm tra khả năng chấp nhận ( liên quan đến nhu cầu, yêu cầu của người dùng và quy trình kinh doanh được tiến hành). 

Mục đích chính của thử nghiệm này là để xác định xem hệ thống có đáp ứng các tiêu chí chấp nhận hay không và cho phép người dùng, khách hàng hoặc đơn vị được ủy quyền khác xác định có chấp nhận hệ thống hay không

Khi nào: Được thực hiện cuối cùng, sau system testing và trước khi làm cho hệ thống có sẵn để sử dụng thực tế.

Ai tiến hành: 
* Kiểm tra chấp nhận nội bộ (Còn được gọi là Kiểm tra Alpha) được thực hiện bởi các thành viên của tổ chức đã phát triển phần mềm nhưng không liên quan trực tiếp đến dự án (Phát triển hoặc Kiểm tra). Thông thường, đó là các thành viên của Quản lý sản phẩm, Bán hàng và / hoặc Hỗ trợ khách hàng.
* Kiểm tra chấp nhận bên ngoài được thực hiện bởi những người không phải là nhân viên của tổ chức phát triển phần mềm.
    - Kiểm tra chấp nhận khách hàng được thực hiện bởi các khách hàng của tổ chức đã phát triển phần mềm. Họ là những người yêu cầu tổ chức phát triển phần mềm. [Đây là trong trường hợp phần mềm không thuộc sở hữu của tổ chức đã phát triển nó.]
    - Kiểm tra chấp nhận người dùng (Còn được gọi là Thử nghiệm Beta) được thực hiện bởi người dùng cuối của phần mềm. Họ có thể là chính khách hàng hoặc khách hàng của khách hàng.
  
  # Phần kết luận:
* Cấp độ kiểm thử phần mềm là một quá trình trong đó mọi đơn vị hoặc thành phần của phần mềm / hệ thống đều được kiểm tra.
* Mục tiêu chính của kiểm tra hệ thống là đánh giá sự tuân thủ của hệ thống với các nhu cầu đã chỉ định.
* Trong Kỹ thuật phần mềm, bốn cấp độ kiểm thử chính là Kiểm thử đơn vị, Kiểm thử tích hợp, Kiểm tra hệ thống và Kiểm tra chấp nhận

# Tài liệu tham khảo
https://www.guru99.com/levels-of-testing.html

https://www.tutorialspoint.com/software_testing_dictionary/unit_testing.htm