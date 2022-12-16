-  Kiểm thử phần mềm (Software Testing) được phân loại thành 2 loại: Functional Testing (Kiểm thử theo chức năng)  và Non- Functional Testing (Kiểm thử phi chức năng).

-  Chúng ta sẽ cùng tìm hiểu xem sự khác nhau giữa chúng là gì nhé!

![](https://images.viblo.asia/d1caba3c-36c8-4097-bfa3-c89615285cab.png)

## A, Functional Testing 

### **I. Functional Testing ( Kiểm thử chức năng) là gì?**
![](https://images.viblo.asia/8ec61bf3-90bd-4a2a-b315-a7577ddfd5ab.png)

- **Functional testing ( Kiểm thử chức năng)** là  kiểm tra chức năng của một phần mềm hoặc một ứng dụng đang được thử nghiệm.
-  Nó kiểm tra hành vi của phần mềm được thử nghiệm dựa trên yêu cầu của khách hàng, một tài liệu gọi là đặc tả phần mềm hoặc Đặc tả yêu cầu **( Requirement Specification)** được sử dụng làm hướng dẫn để kiểm tra ứng dụng.
- Một dữ liệu ( test data) thử nghiệm được dựa trên tài liệu  và một bộ Test Case được chuẩn bị. Phần mềm đó sẽ được kiểm thử trong môi trường thực tế để kiểm tra xem kết quả thực tế ( Actual Result)  có đồng bộ với kết quả mong đợi ( Expected Result)  hay không. Kỹ thuật này được gọi là Kỹ thuật Hộp đen **( Black Box Technique)** và chủ yếu được thực hiện thủ công **(Manual Test)** và cũng rất hiệu quả trong việc tìm lỗi.

### **II. Các loại Functional Testing:**
**1. Smoke Testing:**
- Loại thử nghiệm này được thực hiện trước khi thử nghiệm hệ thống thực tế để kiểm tra xem các chức năng quan trọng có hoạt động tốt để thực hiện thử nghiệm rộng rãi hơn không.
-  Điều này sẽ giúp tiết kiệm thời gian cài đặt lại bản build mới và tránh thử nghiệm thêm nếu các chức năng quan trọng không hoạt động. Đây là một cách tổng quát để kiểm tra ứng dụng.

**2. Sanity Testing:**
- Đây là một loại thử nghiệm trong đó:
<br> + Chỉ có một chức năng cụ thể hoặc một lỗi (bug) được fix để kiểm tra xem chức năng đó có hoạt động tốt hay không ?
<br> + Và xem liệu có vấn đề nào khác do những thay đổi trong các thành phần liên quan.

**3. Integration Testing:**
- Kiểm thử tích hợp được thực hiện khi hai hoặc nhiều chức năng hoặc thành phần của phần mềm được tích hợp để tạo thành một hệ thống. 
- Về cơ bản, nó kiểm tra hoạt động đúng của phần mềm khi các thành phần được hợp nhất để hoạt động như 1 luồng.

**4. Regression Testing:**
- Kiểm tra hồi quy được thực hiện khi nhận bản build phần mềm sau khi fix những bug được tìm thấy trong lần test ban đầu ( test round 1). 
- Nó xác minh xem các bug đã thực sự được fix hay chưa và kiểm tra xem toàn bộ phần mềm có hoạt động tốt với các thay đổi hay không.

**5. Localization Testing:**

![](https://images.viblo.asia/24aa4f3d-ffd0-4a75-bf70-98ca3208d5b5.png)

- Đây là một quá trình thử nghiệm để kiểm tra chức năng của phần mềm, khi nó được chuyển đổi thành một ứng dụng sử dụng ngôn ngữ khác theo yêu cầu của khách hàng.

- **Ví dụ**:  Giả sử một trang web đang hoạt động tốt trong thiết lập ngôn ngữ tiếng Anh và bây giờ nó được chuyển thành thiết lập ngôn ngữ Tây Ban Nha. Những thay đổi trong ngôn ngữ cũng có thể ảnh hưởng đến giao diện và chức năng chung của người dùng. Thử nghiệm được thực hiện để kiểm tra những thay đổi này được gọi là thử nghiệm Localization Testing (Bản địa hóa).

**6. User Acceptance Testing**
- Trong thử nghiệm Acceptance Testing (Chấp nhận người dùng), ứng dụng được kiểm tra dựa trên sự thoải mái và chấp nhận của người dùng bằng cách xem xét tính dễ sử dụng của họ.
- Người dùng cuối thực tế hoặc khách hàng được cung cấp phiên bản dùng thử trong thiết lập văn phòng của họ để kiểm tra xem phần mềm có hoạt động theo yêu cầu của họ trong môi trường thực hay không. Thử nghiệm này được thực hiện trước khi ra mắt cuối cùng và cũng được gọi là Thử nghiệm Beta hoặc thử nghiệm người dùng cuối (end - user).

## B/ Non-Functional Testing
### **I, Non-Functional Testing ( Kiểm thử Phi chức năng) là gì?**
![](https://images.viblo.asia/3c5cccbc-72eb-48b2-b5a0-891f20837e5a.jpg)

- Kiểm thử Phi chức năng là 1 loại kiểm thử liên quan đến các vấn đề như Hiệu suất, Bảo mật, Giao diện người dùng.... của phần mềm. 
- Nó được thiết kế để kiểm thử mức độ sẵn sàng của một hệ thống theo các tham số phi chức năng mà không được giải quyết bằng kiểm thử chức năng.
- Vi dụ như:  Kiểm thử xem có bao nhiêu người có thể đăng nhập đồng thời vào một phần mềm.
- Việc kiểm tra loại này bằng tay ( manual test)  là không khả thi, do đó chúng ta phải sử dụng tool để thực hiện chúng: LoadRunner, JMeter ...
### II, Các loại Non-Functional Testing
**1. Performance Testing:**

**#1) Load Testing:**

![](https://images.viblo.asia/763afabe-7672-40b0-addf-6d0457a37606.png)

- Một ứng dụng dự kiến sẽ xử lý một khối lượng công việc cụ thể được kiểm tra về thời gian đáp ứng (response time) của nó trong một môi trường thực tế .
-  Nó được kiểm tra khả năng hoạt động chính xác trong thời gian quy định và có thể xử lý tải.

**#2) Stress Testing:**
- Trong thử nghiệm Stress, ứng dụng được nhấn mạnh với khối lượng công việc tăng thêm để kiểm tra xem nó có hoạt động hiệu quả không và có thể xử lý ứng suất theo yêu cầu.
- Ví dụ: Kiểm tra một trang web khi người dùng truy cập đang ở mức cao nhất. Có thể có một tình huống mà khối lượng công việc vượt quá đặc điểm kỹ thuật. Trong trường hợp này, trang web có thể bị lỗi, chậm hoặc thậm chí bị sập.

**#3) Volume Testing**
- Volume testing (hay còn được gọi là kiểm thử khối lượng) là một thử nghiệm hiệu suất phi chức năng, nơi mà phần mềm phải chịu một lượng lớn dữ liệu. Nó cũng được gọi là flood testing
- Khối lượng thử nghiệm được thực hiện để phân tích hiệu suất của hệ thống bằng cách tăng khối lượng dữ liệu trong cơ sở dữ liệu.
- Với sự trợ giúp của Khối lượng thử nghiệm, tác động đến thời gian phản ứng và tình trạng của hệ thống có thể được nghiên cứu khi tác động bởi khối lượng dữ liệu lớn.

- Ví dụ: thử nghiệm tình trạng của trang web âm nhạc khi có hàng triệu người dùng tải bài hát xuống.

**#4) Endurance Testing:**
- Trong thử nghiệm Độ bền, độ bền của phần mềm được kiểm tra với lưu lượng tải lặp lại và nhất quán theo mô hình có thể mở rộng. Nó kiểm tra sức bền của phần mềm khi được tải với khối lượng công việc phù hợp.


 Tất cả các loại thử nghiệm này được sử dụng để làm cho phần mềm hoạt động không có lỗi và không gặp sự cố trong bất kỳ tình huống thời gian thực nào bằng cách giải quyết các vấn đề và tìm giải pháp phù hợp cho một sản phẩm chất lượng.
 
**2. Usability Testing:**
- Trong loại thử nghiệm này, Giao diện người dùng được kiểm tra về tính dễ sử dụng và xem mức độ thân thiện với người dùng

**3. Security Testing:**
- Kiểm tra bảo mật là để kiểm tra mức độ an toàn của phần mềm liên quan đến dữ liệu qua mạng khỏi cuộc tấn công độc hại. Các lĩnh vực chính được kiểm tra trong thử nghiệm này bao gồm ủy quyền, xác thực người dùng và quyền truy cập của họ vào dữ liệu dựa trên các vai trò như quản trị viên, người điều hành và cấp độ người dùng.

## C. Sự khác nhau giữa Functional Testing và Non - Functional Testing:



| Functional Testing  (  Kiểm thử chức năng ) | Non - Functional Testing (Kiểm thử phi chức năng) | 
| -------- | -------- |
| Là kiểm tra các hoạt động (operations) và hành động (actions) của một Ứng dụng|Là kiểm tra các hành vi (behavior) của 1 Ứng dụng       |
|Được thực hiện dựa vào tài liệu nghiệp vụ của dự án. |Đươc thực hiện dựa trên yêu cầu Hiệu suất và mong đợi của Khách hàng.|
|Là kiểm tra xem kết quả thực tế có hoạt động theo kết quả mong đợi hay không|Là kiểm tra thời gian đáp ứng (response time) và tốc độ (speed) của phần mềm trong các điều kiện cụ thể.|
|Nó được thực hiện bằng tay. ( Manual test)<br> Ví dụ: Phương pháp kiểm tra hộp đen. (Black box testing )|Nó được thực hiện bằng các công cụ tự động <br> Ví dụ: Loadrunner, Jmeter...|
|Nó kiểm tra theo yêu cầu của khách hàng.|Nó kiểm tra theo mong đợi của khách hàng.|
|Phản hồi (Feedback)  của khách hàng giúp giảm các yếu tố rủi ro của sản phẩm.|Phản hồi của khách hàng (Feedback) có giá trị hơn đối với thử nghiệm phi chức năng vì nó giúp cải thiện và cho phép người thử nghiệm biết được sự mong đợi của khách hàng.|
| Kiểm thử ( thực hiện test) các chức năng của phần mềm.|Kiểm tra hiệu năng (performance) của chức năng của phần mềm.|
|Bao gồm các loại Testing sau: <br> Unit testing <br> Integration testing <br> System Testing <br> Acceptance Testing|Bao gồm các loại Testing sau: <br> Performance testing <br> Load Testing<br> Stress testing<br> Volume testing<br> Security testing<br> Installation testing<br> Recovery testing|
|Ví dụ: Trang Login phải hiển thị textbox để nhập Username và Password |Ví dụ: Kiểm tra xem trang Login có được tải sau 5 giây không|

Trên đây là những kiến thức và sự khác nhau giữa Functional Testing và Non - Functional Testing. Mình hy vọng rằng nó sẽ giúp các bạn hiểu biết hơn và làm việc hiệu quả hơn nhé!

Nguồn tham khảo: https://link.sun-asterisk.vn/UiGJxy