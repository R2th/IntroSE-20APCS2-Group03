Kiểm thử phần mềm là một quá trình, để đánh giá chức năng của ứng dụng phần mềm với mục đích tìm phần mềm phát triển có đáp ứng các yêu cầu được chỉ định hay không và xác định các lỗi để đảm bảo rằng sản phẩm không có khiếm khuyết để tạo ra sản phẩm chất lượng. Các giai đoạn của kiểm thử phần mềm:

-   Unit testing
-   Intergration testing
-   System testing
-   Acceptance testing
![](https://images.viblo.asia/9be84b1e-e808-4fc9-89b3-02e05a000ee4.jpg)


**I. Unit testing - Kiểm thử mức đơn vị**
1. Định nghĩa:

-   Một đơn vị phần mềm (Unit) là gì? Một Unit là một thành phần phần mềm nhỏ nhất mà ta kiểm tra được. Nó bao gồm các các hàm (Function), thủ tục (Procedure), lớp (Class), hoặc các phương thức (Method)
-   Kiểm tra đơn vị (Unit testing) được thực hiện để kiểm tra xem các module riêng lẻ của mã nguồn có hoạt động đúng hay không. Tức là kiểm tra từng đơn vị của ứng dụng một cách riêng biệt bởi nhà phát triển trong môi trường của nhà phát triển. Đây là thử nghiệm module. Unit testing là kiểu white box testing
-   Unit testing là kiểu white box testing

2. Mục đích:

-   Để xác định rằng mỗi đơn vị phần mềm được thực hiện như thiết kế.
-   Thử nghiệm đơn vị làm tăng sự tự tin trong việc thay đổi / bảo trì code. Nếu kiểm tra đơn vị tốt được viết và nếu chúng được chạy mỗi khi bất kỳ mã nào được thay đổi, chúng ta sẽ có thể bắt kịp kịp thời mọi lỗi do thay đổi.
-   Chi phí sửa chữa lỗi phát hiện trong khi kiểm tra đơn vị nhỏ hơn so với lỗi phát hiện ở mức cao hơn. So sánh chi phí (thời gian, công sức, sự hỏng hóc, mất thể diện) của một lỗi phát hiện trong quá trình kiểm thử chấp nhận hoặc khi phần mềm đang hoạt động.

**II. Integration Test – Kiểm thử tích hợp**
 1. Định nghĩa:  

 -   Là cấp độ kiểm thử phần mềm trong đó các đơn vị riêng lẻ được kết hợp và thử nghiệm dưới dạng một nhóm. Một dự án phần mềm bao gồm nhiều module phần mềm, được code bởi nhiều người khác nhau. Kiểm thử tích hợp tập trung vào kiểm tra truyền dữ liệu giữa các module (tích hợp các hàm lại với nhau, tích hợp các màn hình lại với nhau theo từng module hay dựa theo chức năng.)

2. Mục đích: 

-   Để lộ các lỗi trong sự tương tác giữa các đơn vị tích hợp. Để tìm ra lỗi trong quá trình tích hợp các thành phần, module lại với nhau. Các trình điều khiển thử nghiệm và các phần tử thử nghiệm được sử dụng để hỗ trợ trong Kiểm thử tích hợp.

3. Các phương pháp tiếp cận:

-   Big bang: Trong kiểm thử tích hợp Big Bang, các module riêng lẻ không được tích hợp cho đến khi tất cả các module sẵn sàng. Sau đó, họ sẽ chạy để kiểm tra xem nó có hoạt động tốt hay không. Trong loại thử nghiệm này, một số nhược điểm có thể xảy ra, các lỗi có thể được tìm thấy ở giai đoạn sau. Sẽ rất khó để tìm ra liệu lỗi có xuất hiện trong giao diện hay trong module.
-   Top Down: Trong kiểm thử tích hợp Top Down, các module mức cao được tích hợp và kiểm tra trước tiên. Tức là kiểm tra từ module chính đến module phụ. Trong loại thử nghiệm này, Stubs được sử dụng làm module tạm thời nếu module chưa sẵn sàng để thử nghiệm tích hợp.
-   Button Up: Trong kiểm thử tích hợp Button Up, các module cấp thấp được tích hợp và kiểm tra trước tiên, tức là kiểm tra từ module phụ đến module chính. Tương tự như Stubs, trình điều khiển ở đây được sử dụng như một module tạm thời để kiểm thử tích hợp.
Sandwich / Hybrid là một cách tiếp cận để kiểm thử tích hợp, đó là sự kết hợp của các phương pháp Top Down và Bottom Up.
 
**III. System Testing – Kiểm thử mức hệ thống**
 1. Định nghĩa:
 
-    Là một mức độ kiểm thử phần mềm, nơi một phần mềm hoàn chỉnh và tích hợp được kiểm tra.
-   Điểm khác nhau then chốt giữa Integration Test và System Test là System Test chú trọng các hành vi và lỗi trên toàn hệ thống, còn Integration Test chú trọng sự giao tiếp giữa các đơn thể hoặc đối tượng khi chúng làm việc cùng nhau. Thông thường ta phải thực hiện Unit Test và Integration Test để bảo đảm mọi Unit và sự tương tác giữa chúng hoạt động chính xác trước khi thực hiện System Test.
-    Kiểm thử hệ thống bao gồm kiểm thử chức năng và phi chức năng.
-   Kiểm thử hệ thống tập trung nhiều hơn vào các chức năng của toàn bộ hệ thống.
-   Các trường hợp kiểm thử hệ thống bao gồm các chức năng của sản phẩm hoàn chỉnh và được thực hiện các trường hợp kiểm thử mức độ cao.
-   Các hành vi của ứng dụng hoàn chỉnh được kiểm tra để đáp ứng các yêu cầu quy định.
Các trường hợp kiểm thử và dữ liệu kiểm thử được thực hiện và các dữ liệu thực tế không được sử dụng trong loại kiểm thử này.

2. Mục đích:

-   Để đánh giá sự tuân thủ của hệ thống với các yêu cầu được chỉ định.
 
**IV. Acceptance Testing - Kiểm thử chấp nhận**
 1. Định nghĩa:
 
-   Là một mức độ kiểm thử phần mềm trong đó một hệ thống được kiểm tra tính chấp nhận.
-   Kiểm thử chấp nhận kiểm thử các chức năng để kiểm tra hành vi của hệ thống bằng cách sử dụng dữ liệu thực tế. Nó cũng được gọi là thử nghiệm người dùng doanh nghiệp.
-   Kiểm thử chấp nhận được thực hiện bởi người dùng cuối để kiểm tra hệ thống được xây dựng để phù hợp với yêu cầu kinh doanh của tổ chức.

2. Mục đích:

-   Đánh giá sự tuân thủ của hệ thống với các yêu cầu kinh doanh và đánh giá xem nó có được chấp nhận cho việc phân phối hay không.
-   Mục tiêu của acceptance testing là xác nhận lại sự tin tưởng vào hệ thống, các đặc tính thuộc về chức năng hoặc phi chức năng của hệ thống. Tìm kiếm lỗi không phải là trọng tâm chính của Acceptance testing. Acceptance testing có thể đánh giá sự sẵn sàng của hệ thống để triển khai và sử dụng, mặc dù không nhất thiết phải là mức cuối cùng của việc kiểm thử.

3. Các loại kiểm thử chấp nhận:

-   Alpha Testing: là một dạng của Acceptance testing. Alpha testing là một nhóm người thực hiện test tại nơi sản xuất phần mềm. Là một dạng của test chấp nhận nội bộ, trước khi phần mềm thực hiện Beta Testing.
-  Beta Testing là hình thức kiểm thử sau Alpha Testing. Nó được thực hiện tại địa điểm của khách hàng, không phải nơi phát triển phần mềm.
 
Tài liệu tham khảo: 

http://softwaretestingfundamentals.com/unit-testing/
http://softwaretestingfundamentals.com/system-testing/
http://softwaretestingfundamentals.com/acceptance-testing/
http://softwaretestingfundamentals.com/integration-testing/