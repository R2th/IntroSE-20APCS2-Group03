Bài viết này nằm trong loạt bài viết về những kiến thức cơ bản về Test mà những developer cần có trong quá trình phát triển phần mềm, dựa trên tài liệu của tổ chức ISTQB.

# Các mô hình phát triển phần mềm
Test không tồn tại độc lập, mà có quan hệ mật thiết với việc phát triển phần mềm. Khi mô hình vòng đời của phát triển phần mềm khác thì sẽ có những phương pháp Test cũng khác nhau.

## Mô hình chữ V
 ![](https://images.viblo.asia/33a1c585-fee2-49a3-96be-43ac04400ce7.png)
Mô hình chữ V có nhiều biến thể khác nhau, nhưng đối với mô hình chữ V phổ biến nhất hiện nay, thì  sẽ có 4 cấp bậc Test, tương ứng với 4 cấp bậc phát triển phần mềm.
+ Component Test (Unit Test)
+ Integration Test
+  System Test
+  Acceptance testing

 Trên thực tế thì tuỳ vào đặc tính của các dự án mà các cấp bậc hoặc chủng loại Test có thể thay đổi. Chẳng hạn như sau Component Test có thể thêm vào Component Integration Test, sau System Test có thể làm System Integration Test.
 
## Mô hình Iterative/Incremental Development
Trong mô hình này, phần mềm được tạo ra bằng cách lặp đi lặp lại các cycle phát triển. Các cycle này bao gồm định nghĩa, thiết kế, xây dựng và Test, được thực hiện trong một thời gian ngắn hơn. Các mô hình Prototyping, RAD, RUP, Agile thuộc loại này. Các cấp độ Test có nêu ở trên sẽ được thực hiện trong các cycle phát triển (thường gọi là iteration).

## Test tồn tại như thế nào trong các mô hình phát triển?
Đối với mô hình nào đi nữa thì cũng cần thực hiện các điều sau đây.
+ Phải có hoạt động Test đối với mỗi hoạt động phát triển
+ Đối với các cấp bậc Test phải có mục đích riêng của nó
+ Đối với mỗi cấp bậc Test, việc phân tích và thiết kế Test nên được thực hiện trong khi tiến hành hoạt động phát triển tương ứng
+ Khi nhận được tài liệu, kể cả bản nháp thì cũng nên tiến hành review ngay

# Các cấp độ Test
## Component Test
Test base:
+ Định nghĩa Component
+ Bản thiết kế
+ Source code

Đối tượng Test:
+ Component
+ Program
+ Database model

Component Test sẽ thực hiện Test các đơn vị có thể tách riêng ra như class, object, program, module ... Khi tách riêng ra khỏi hệ thống chung, chúng ta có thể sứ dụng stab, driver, simulator để Test các đơn vị đó. Component Test bao gồm Test tính năng, Test phi tính năng, Test cấu tạo đơn vị, ... Testcase sẽ được tạo ra dựa vào bản định nghĩa Component, bản thiết kế, data model, ...

Thông thường Component Test thường được thực hiện tại các môi trường có UnitTest framework hoặc công cụ Debug. Các bug tìm ra thường được sửa ngay khi đó.
Cũng có một cách Test Component, được gọi là Test first hay Test Driven Development, mà trước khi viết code, Testcase sẽ được tạo ra và cho tự động hoá chúng.

## Integration Test
Testbase:
+ Bản thiết kế phần mềm hay hệ thống
+ Architecture
+ Workflow
+ Usercase

Đối tượng Test:
+ Việc xây dựng database của subsystem
+ Infrastructure
+ Giao diện
+ Cấu thành dữ liệu của hệ thống

Integration Test kiểm tra giao diện giữa các component, giao diện giữa các system, sự kết hợp với các bộ phận bên ngoài system như OS, File System, phần cứng, ... 
Integration Test có một số cấp bậc khác nhau. Ở Component Integration Test, chúng ta sẽ kiểm tra sự kết hợp giữa các Software Component, được thực hiện sau Component Test. Ở System Integration Test, chúng ta sẽ kiểm tra sự kết hợp với phần cứng hay các hệ thống khác.

Phạm vi Integration Test càng rộng thì việc tìm ra nguyên nhân của lỗi càng khó, dẫn tới việc sửa lỗi sẽ mất nhiều thời gian hơn. Để có thể tìm ra sớm và xử lý nhanh lỗi, không nên chỉ thực hiện Integration Test một lần (kiểu bigbang) mà nên thực hiện từng phần một một cách có hệ thống.

Ở giai đoạn này chúng ta sẽ chỉ tập trung vào sự kết hợp giữa các componentent, system, bởi vì việc Test hoạt động riêng biệt của các đơn vị đó đã được thực hiện tại Component Test.

## System Test
Testbase:
+ Bản định nghĩa phần mềm hay hệ thống
+ Usecase
+ Bản định nghĩa tính năng
+ Bản báo cáo phân tích rủi ro

Đối tượng Test:
+ Manual
+ Dữ liệu cấu thành nên hệ thống

System Test là những Test liên quan đến hoạt động của toàn bộ hệ thống. Để làm giảm tối thiểu nguy cơ xảy ra sự cố khi hoạt động, môi trường dùng để Test càng gần với môi trường sẽ được dùng để vận hành sản phẩm càng tốt. Cấp độ Test này thường được thực hiện bởi một đơn vị Test độc lập.

## Acceptance testing
Testbase:
+ Bản định nghĩa System
+ Usecase
+ Business process
+ Bản báo cáo phân tích rủi ro

Đối tượng Test:
+ Bản hướng dẫn sử dụng
+ Bản báo cáo
+ Dữ liệu cấu thành

Acceptance testing thường được thực hiện bởi người dùng hoặc khách hàng. Mục đích chính của cấp bập Test này không phải là tìm ra lỗi, mà là kiểm tra xem hệ thống có vận hành được không.

Thông thường có các hình thức sau đây.
+ User Acceptance Testing : kiểm tra xem hệ thống có thể sử dụng được không, được thực hiện bới user
+ Operational Acceptance Testing  :  do người quản lí hệ thống thực hiện
+ Alpha Test, Beta Test: được thực hiện trong trường hợp cần những phản hồi của người dùng trước khi công khai hệ thống. Alpha Test được thực hiện trong tổ chức, công ty phát triển sản phẩm (tuy nhiên không phải là team phát triển sản phẩm), còn Beta Test được thực hiện bởi khách hàng, hoặc những người có khả năng thành khách hàng.

Trên đây là sự tồn tại của Test trong quá trình phát triển sản phẩm, dựa trên phần 2 trong tài liệu của ISTQB. Phần tiếp theo của loạt bài viết này mình sẽ nói về Các chủng loại của Test.