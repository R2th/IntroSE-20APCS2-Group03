# **1. Database Testing là gì?**
Data testing là kiểm tra lược đồ, bảng, trigger, ... của cơ sở dữ liệu kiểm tra. Nó có thể liên quan đến việc tạo các truy vấn phức tạp để load/stress test dữ liệu và kiểm tra phản ứng của nó. Nó kiểm tra tính toàn vẹn và tính nhất quán của dữ liệu.
# **2. Sự khác biệt cơ bản giữa User Interface và Data Testing**
### 2.1. User Interface
- Loại thử nghiệm này còn được gọi là thử nghiệm Giao diện người dùng hoặc kiểm tra Front-end.
- Loại thử nghiệm này chủ yếu đề cập đến tất cả các mục có thể kiểm tra được mở cho người dùng về người xem và tương tác như Biểu mẫu, Trình diễn, Biểu đồ, Menus, và Báo cáo,... (tạo qua VB, VB.net, VC ++, Delphi - Frontend Tools)
- Loại thử nghiệm này bao gồm xác nhận hộp văn bản, chọn danh sách thả xuống, lịch và nút, điều hướng từ trang này sang trang khác, hiển thị hình ảnh cũng như nhìn và cảm nhận của ứng dụng tổng thể.
- Tester phải có kiến thức sâu rộng về các yêu cầu kinh doanh cũng như việc sử dụng các công cụ phát triển và cách sử dụng khuôn khổ và công cụ tự động hóa.
### 2.2. Data Testing
- Loại thử nghiệm này còn được gọi là kiểm tra Back-end hoặc kiểm tra dữ liệu.
- Loại thử nghiệm này chủ yếu đề cập đến tất cả các mục kiểm tra được thường ẩn từ người dùng cho người xem. Chúng bao gồm các quy trình nội bộ và lưu trữ như Assembly, DBMS như Oracle, SQL Server, MYSQL, v.v.
- Loại thử nghiệm này bao gồm việc xác nhận các giản đồ, các bảng cơ sở dữ liệu, các cột, các phím và chỉ mục, các thủ tục lưu trữ, các trình khởi tạo, xác nhận máy chủ cơ sở dữ liệu, xác nhận việc sao chép dữ liệu.
- Tester để có thể thực hiện kiểm tra ngược lại phải có nền tảng vững chắc trong máy chủ cơ sở dữ liệu và các khái niệm ngôn ngữ truy vấn có cấu trúc.
# **3. Các loại Database Testing**
![](https://images.viblo.asia/677c8c2c-aad7-4230-bee8-968a0475029a.png)

### 3.1. Structural Testing
* Là kiểm tra cấu trúc của hệ thống hay thành phần
* Còn được gọi là kiểm tra hộp trắng vì trong kiểm tra kết cấu sẽ quan tâm đến những gì đang xảy ra bên trong hệ thống / ứng dụng '
* Trong Structural Testing, tester phải có kiến thức về việc thực hiện nội bộ của mã. Ở đây các xét nghiệm yêu cầu kiến thức về cách phần mềm được thực hiện, nó hoạt động như thế nào.
* Chủ yếu được thực hiện ở cấp độ Unit test
* Các loại Structural Testing là:
- Statement testing
Example: <br>
                    READ A <br>
                    READ B <br>
                    C  = A  +  2 * B <br>
                    IF C> 50 THEN <br>
                    PRINT “large C” <br>
                    ENDIF <br>
                    => 100% statement coverage: A = 20, B = 25 <br>
- Decision (Branch) testing <br>
Example: <br>
                    z = 0; <br>
                    if (a > b) then <br>
                    z = 12; <br>
                    x = 72 / z <br>
                    Statement coverage may miss bugs <br>
                    One test needed for statement coverage <br>
                             (a = 5, b = 4)  => Passes <br>
                    Select inputs to force each decision to execute both possible ways (T/F) <br>
                    Now two test cases are needed for coverage <br>
                             (a = 5, b = 4)  => Passes <br>
                             (a = 4, b = 5)  => Finds bug <br>
- Condition testing <br>
- Path testing <br> 
Example: <br>
                    READ A <br>
                    READ B <br>
                    C  = A  +  2 * B <br>
                    IF C> 50 THEN <br>
                    PRINT “large C” <br>
                    ENDIF <br>
                    Path coverage:<br>
                    Path 1: 1, 2, 3, 4, 5, 6, 7 <br>
                    A = 20, B = 25 <br>
                    Path 2: 1, 2, 3, 4, 6 <br> 
                    A = 20, B= 10 <br>
                    ![](https://images.viblo.asia/5f73d201-d1cb-4f87-aa62-e7d9df1a4e88.png)
                    
### 3.2. Functional Testing
Việc kiểm tra Function database như được xác định bởi yêu cầu đặc điểm kỹ thuật cần đảm bảo hầu hết các giao dịch và hoạt động được thực hiện bởi người dùng cuối là phù hợp với yêu cầu kỹ thuật.
Sau đây là các điều kiện cơ bản cần được quan sát để xác nhận cơ sở dữ liệu.
- Cho dù trường đó là bắt buộc trong khi cho phép các giá trị NULL trên trường đó.
- Cho dù độ dài của mỗi trường có kích thước phù hợp không?
- Cho dù tất cả các lĩnh vực tương tự có cùng tên trên bảng?
- Cho dù có bất kỳ lĩnh vực tính toán hiện tại trong database?
Quá trình này đặc biệt là xác nhận hợp lệ các ánh xạ trường từ quan điểm của người dùng cuối. Trong kịch bản cụ thể này, người thử sẽ thực hiện một hoạt động ở mức cơ sở dữ liệu và sau đó sẽ điều hướng tới mục giao diện người dùng có liên quan để quan sát và xác nhận liệu các xác nhận hợp lệ có được thực hiện hay không.
Các điều kiện ngược lại, theo đó đầu tiên một hoạt động được thực hiện bởi người kiểm tra tại giao diện người dùng và sau đó cùng được xác nhận từ phía sau kết thúc cũng được coi là một lựa chọn hợp lệ.
### 3.3. Non-functional Testing
**3.3.1. Performance Testing**
- Là kiểm tra hiệu suất xác định hoặc xác nhận tốc độ, khả năng mở rộng, hoặc tính ổn định của hệ thống hoặc ứng dụng đang thử.
- Hiệu suất chủ yếu liên quan đến việc đạt được thời gian đáp ứng các mục tiêu hiệu suất cho dự án hoặc sản phẩm. Thời gian đáp ứng của một quá trình chuyển đổi cá nhân là một yêu cầu thực hiện điển hình.

**3.3.2. Load Testing**

- Thử nghiệm tập trung vào việc xác định hoặc xác nhận các đặc tính hoạt động của hệ thống hoặc ứng dụng đang được kiểm tra khi phải chịu tải công việc và tải trọng dự kiến trong quá trình sản xuất.
Liên kết với nhiều người sử dụng hệ thống

**3.3.3. Stress Testing**
Thử nghiệm tập trung vào việc xác định hoặc xác nhận các đặc tính hoạt động của hệ thống hoặc ứng dụng đang được kiểm tra khi chịu các điều kiện căng thẳng khác, chẳng hạn như: <br>
        Người dùng đồng thời tối đa <br>
        Bộ nhớ hạn chế <br> 
        Không đủ dung lượng đĩa <br>
        
**3.3.4. Volume Testing**
Khối lượng thử nghiệm đề cập đến việc thử nghiệm một ứng dụng phần mềm với số lượng dữ liệu nhất định. Số tiền này có thể là kích thước cơ sở dữ liệu hoặc nó cũng có thể là kích thước của một tập tin được tải lên hệ thống

***Tài liệu tham khảo:*** <br>
https://www.guru99.com/data-testing.html#2 <br>
Cám ơn mọi người đã đọc!