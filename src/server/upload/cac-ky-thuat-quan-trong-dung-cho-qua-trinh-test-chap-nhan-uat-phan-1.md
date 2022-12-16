**1. Test chấp nhận người dùng (UAT - User Acceptance Test) là gì?**

Những người sở hữu sản phẩm (PO - Product Owners) và những đơn vị kinh doanh nhìn chung làm việc dựa trên những yêu cầu và tập trung vào chúng. Do đó họ sẽ sử dụng những kỹ thuật test dựa trên những yêu cầu và dựa trên những hoạt động trong quá trình test chấp nhận phía người dùng. Bởi vì chúng ta là những tester, chúng ta cũng có thể sử dụng những kỹ thuật này trong quá trình test. Bài viết này sẽ đi giải thích một vài kỹ thuật quan trọng nhất trong số đó. 

Đầu tiên chúng ta sẽ đi trả lời câu hỏi quá trình test chấp nhận người dùng (UAT) là gì. Theo phương thức Agile, nó là một hoạt động test được thực thi bởi những người sở hữu sản phẩm nói chung sau khi quá trình phát triển và test phần mềm hoàn thành. Trong những quá trình waterfall và V-Model, những bài test này nhìn chung được thực hiện bởi những nhà phân tích hoặc những đơn vị kinh doanh. Mục đích của UAT là xác định xem những yêu cầu của người dùng cho những công việc được yêu cầu có được thực hiện chính xác hay không để lấy chứng nhận cho toàn bộ quá trình phát triển và test phần mềm đã được thực hiện.

Một mẫu cho những đầu vào và đầu ra cho quá trình test chấp nhận người dùng được tóm tắt trong bảng bên dưới

![](https://images.viblo.asia/1aac438a-59f8-41b1-a722-2d32b2d426db.png)
 
**2. Các kỹ thuật test quan trọng liên quan đến quá trình UAT**

Trong bài viết sẽ đi vào phân tích 8 kỹ thuật quan trọng nhất liên quan đến quá trình UAT bao gồm:

* User Story Testing (AGILE) - Test AGILE
* Use Case Testing - Test theo trường hợp sử dụng
* Checklist Based Testing - Test dựa trên checklist
* Exploratory Testing - Test khai thác, tìm kiếm.
* Experienced Based Testing - Test dựa trên kinh nghiệm.
* User Journey Test - Test kịch bản người dùng
* Risk-Based Testing - Test dựa trên các rủi ro.
* Heuristic Risk-Based Testing by James Bach - Test dựa trên rủi ro Heuristic được đưa ra bởi James Bach

***2.1. User Story Testing (AGILE)***

Một câu chuyện người dùng (user story) có thể được mô tả như một đặc điểm được yêu cầu cái mà được phát triển trong phần mềm xuất phát từ quan điểm, cách nhìn của người dùng cuối trong chu kỳ phát triển phần mềm agile. Trong một câu chuyện người dùng, chúng ta phải xác định được yêu cầu là gì, nguyên nhân tại sao có yêu cầu đó và ai là người đã đưa ra yêu cầu. 

Định nghĩa về sự hoàn thành (Definition of Done - DOD) định nghĩa tiêu chuẩn về sự hoàn thành ví dụ như mã nguồn đã hoàn thành, việc test đơn vị (unit test) đã hoàn thành, tất cả việc test đã hoàn thành, quá trình UAT đã hoàn thành, … và những người phát triển, các tester, những người sở hữu sản phẩm sẽ có trách nhiệm thực hiện các DOD đã được đặt ra. 

Những chỉ tiêu để đánh giá tính chấp nhận được của phần mềm cũng nên được diễn đạt rõ ràng bởi người sở hữu sản phầm (POs). Team phát triển cũng có thể giúp PO làm điều này. Ít nhất một kịch bản test cho mỗi tiêu chí đánh giá tính chấp nhận được của sản phẩm nên được chuẩn bị để test một câu truyện người dùng (user story) và các tiêu chí mang tính chấp nhận này phải được test rất cẩn thận.

Đầu vào và đầu ra cần được định nghĩa trước khi bắt đầu quá trình test, bên dưới là ví dụ:

![](https://images.viblo.asia/24a31f15-79d5-4ed2-ae84-e2148bd67567.png)

Bên dưới chúng ta cùng phân tích một câu chuyện người dùng mẫu:

Như một người sở hữu sản phẩm (Người dùng), để quảng bá việc kariyer.net hưởng ứng cuộc vận động, (Nguyên nhân của yêu cầu), tôi muốn có một banner quảng cáo được thêm vào phần banner đầu trên trang chủ của kariyer.net.

**Những nguy cơ:**
* Tốc độ trang chủ có thể giảm
* Một lỗi trong phần ảnh động của banner có thể ảnh hưởng đến sự xuất hiện của trang chủ.
* Việc xóa cookie có thể làm cho banner liên tục hiện ở phía người dùng.
* Chức năng đóng ảnh banner là quan trọng. Nó phải luôn làm việc đúng

**Phân tích chuyên sâu:** Chức năng tải banner có thể ảnh hưởng đến Admin panel.

**Định nghĩa những sự hoàn thành (DOD):**
* Code được viết xong
* Code được review xong
* Những bài test đơn vị (Unit Test) được thực hiện xong.
* Quá trình UAT được thực hiện xong.

**Các chỉ đánh giá tính chấp nhận:**
* Khi trang web được mở, top banner được hiển thị với kích thước 200x200 trong 8 giây, sau đó thu về kích thước 60x60.
* Khi người dùng kích vào banner, trang web nên chuyển đến trang chào mừng. 
* Nếu người dùng vào trang web 4 lần trên cùng 1 máy tính, giá trình bên trong cookie của banner nên là 4 hoặc hơn, khi đó bannner không nên được hiển thị.
* Góc trên bên phải của banner phải có một hình để đóng banner lại và banner sẽ bị đóng khi kích vào hình đó.
* Nếu banner đã được tắt bởi người dùng, nó không nên được hiển thị lại.

Bên dưới là mẫu test case theo các chỉ tiêu chấp nhận được mô tả bên trên:

![](https://images.viblo.asia/aadc3346-b1f3-43b5-9eab-47e14d674968.png)

***2.2. Use Case Testing***

Một trường hợp sử dụng (Use Case) định nghĩa những hoạt động thực thi của người dùng trong hệ thống để thực hiện một mục đích nhất định. Những yêu cầu chức năng của hệ thống của thể được định nghĩa và quản lý sử dụng những use case. Theo cách này, một danh sách những công việc mong muốn được xác định. Những kịch bản test được chuẩn bị bằng cách đưa vào những cân nhắc của đầu vào và đầu ra của những bước xác định bởi người dùng để đạt đến một mục tiêu xác định. Trong quá trình test, kết quả của những bài test được xác định bằng cách so sánh đầu ra mong đợi với đầu ra thực tế.

Khi viết những user-case, nhìn chung ngôn ngữ kinh doanh được yêu thích hơn ngôn ngữ kỹ thuật. Để bao hàm tất cả các yêu cầu, ít nhất một kịch bản test được chuẩn bị cho mỗi yêu cầu. Bằng cách này, mức độ bao phủ test được tăng lên và chúng ta có thể đo được mức độ bao phủ này sử dụng một ma trận dò tìm (traceability matrix). Trong ma trận dò tìm này, chúng ta sáng tạo một bảng ma trận với những kịch bản test và những yêu cầu, và đánh một dấu “X” vào những ô mà kịch bản test đạt được các yêu cầu đặt ra. Mục đích của việc này là để bao quát tất cả các yêu cầu.

![](https://images.viblo.asia/6636cf9e-aa70-4f44-9fa5-dc7c29b246d0.png)

Bên dưới chúng ta cùng tham khảo một testcase mẫu:

**Tên kịch bản test:** Thay đổi mật khẩu thành công với độ phức tạp vừa phải.

**Các bước test:**
* Mở trang chủ
* Chọn vào nut Login
* Đi đến “Profile” và chọn “Account Settings”
* Chọn “Change Password”
* Vào mật khẩu hiện tại và mật khẩu mới (Độ phức tạp ở mức vừa phải)
* Chọn Save 

**Yêu cầu tiên quyết:** các bước trên cần thực hiện với một người dùng đang tồn tại trong hệ thống.

**Dữ liệu test:**
User Name: test@test.com
Current Password: kariyer1234+        New Password: asdf1234

**Mức ưu tiên test:** Cao

**Kết quả mong đợi:** Kết quả được chờ đợi là mật khẩu được thay đổi thành công và thông điệp “Changed succesfully” sẽ hiển thị để thông báo mật khẩu đã được thay đổi thành công. 

![](https://images.viblo.asia/353450ed-8a47-4791-b5d5-d9b84fc3df1f.png)

***3. Liên kết tham khảo***

https://www.swtestacademy.com/software-testing-techniques/