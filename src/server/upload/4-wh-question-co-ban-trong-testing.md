**1.What is testing ?**

![](https://images.viblo.asia/8ebf99dd-70a7-454c-9a2f-318282a40db6.jpg)

Testing là một quy trình đánh giá một hệ thống, nó giúp cho việc xác định các thành phần có thỏa mãn với yêu cầu đặc tả hay không. Hiểu một cách đơn giản, testing là việc thực hiện chạy một hệ thống nhằm tìm ra các lỗi hoặc các phần bị thiếu so với yêu cầu thực tế đặt ra.

Theo ANSI/IEEE 1059 standard, Testing có thế được định nghĩa như một quy trình phân tích phần mềm để phát hiện ra các điểm khác biệt giữa hiện trạng và các điều kiện bắt buộc (đó chính là defects/errors/bugs) ngoài ra cũng để đánh giá các chức năng, đặc điểm của phần mềm đó.

**2.Who does Testing ?**

![](https://images.viblo.asia/a144a1d5-d396-47c5-afea-be9159f79671.jpg)

Điều này phụ thuộc vào quy trình cũng như sự liên kết với các bên liên quan trong dự án. Trong ngành IT hiện nay, rất nhiều các công ty lớn có một đội chuyên trách với nhiệm vụ đánh giá sự phát triển của phần mềm dựa vào các yêu cầu từ khách hàng cũng như thị trường. Hơn thế nữa, đội phát triển cũng đảm nhận cả việc testing mà chúng thường được gọi là Unit Testing. Trong phần lớn các trường hợp, các chuyên gia sẽ được sẽ được phân công vào quá trình kiểm thử hệ thống tương ứng với năng lực của họ:

- Kiểm thử viên phần mềm.
- Lập trình viên phần mềm.
- Trưởng nhóm/ Quản lý dự án.
- Người dùng cuối.

Các công ty khác nhau sẽ có sự phân công nhiệm vụ kiểm thử phần mềm cho các nhân viên khác nhau nhưng chủ yếu sẽ dựa trên kinh nghiệm và kiến thức của họ mà chia ra các vị trí như: Software Tester, Software Quality Assurance Engineer, QA Analyst ...

Nhìn chung việc kiểm thử phần mềm mọi lúc mọi nơi trong vòng đời phát triển phần mềm thực sự là không hề khả thi, 2 phần tiếp theo chúng ta sẽ cùng tìm hiểu về việc khi nào bắt đầu việc kiểm thử và nó kết thúc khi nào.

![](https://images.viblo.asia/52c1bba5-7c69-43e1-8832-e2061b377bb6.png)

**3.When to Start Testing ?**

Quá trình kiểm thử được thực hiện sớm sẽ giúp làm giảm giá thành cũng như thời gian cho việc phải khắc phục các lỗi trong phần mềm để có thể bàn giao được cho khách hàng. Trong vòng đời phát triển phần mềm, quá trình kiểm thử có thể được bắt đầu từ giai đoạn thu thập các yêu cầu và được tiếp diễn đến lúc phần mềm được hoàn thành và triển khai.

Tất nhiên việc bắt đầu quá trình testing còn phụ thuộc vào mô hình phát triển phần mềm đang được sử dụng. Ví dụ như đối với mô hình thác nước, quá trình testing sẽ được thực hiện vào giai đoạn kiểm thử nhưng đối với mô hình gia tăng thì quá trình kiểm thử sẽ được thực hiện ở cuối mỗi module và khi phần mềm được hoàn thành.

Quá trình kiểm thử được hoàn thành ứng với mỗi giai đoạn trong vòng đời phát triển phần mềm như sau:

- Đối với giai đoạn thu thập yêu cầu, việc hoàn thành phân tích và xác minh chính là việc hoàn thành kiểm thử ở giai đoạn này. 
- Đối với giai đoạn thiết kế, việc hoàn thành kiểm tra thiết kế với mục đích cải tiến chính là việc hoàn thành kiểm thử ở giai đoạn này.
- Khi hoàn thành quá trình lập trình, việc kiểm tra lại bởi lập trình viên cũng chính là việc kiểm thử ở giai đoạn này.

**4. When to Stop Testing ?**

Thật khó để có thể xác định được là khi nào thì ngừng quá trình kiểm thử, có thể hiểu nếu cứ thực hiện liên tục thì việc kiểm thử là một quá trình không bao giờ kết thúc và không ai có thể khẳng định là có thể kiểm thử được 100% phần mềm hay hệ thống nào đó. Tuy nhiên dựa vào các yếu tố sau chúng ta có thể cân nhắc để dừng quá trình kiểm thử:

- Deadlines cho quá trình kiểm thử.
- Hoàn thành hết các testcases.
- Hoàn thành các chức năng và độ bao phủ của code ở những điểm nhất định.
- Tỉ lệ bug ở dưới mức cho phép và không có bug nào nghiêm trọng được phát hiện.
- Quyết định của quản lý.

Đây có thể coi là 4 câu hỏi cơ bản nhất đối với những người mới bắt đầu tìm hiểu ngành nghề testing này, còn đối với những người trong nghề thì càng phải nắm vững 4 câu hỏi này như kim chỉ nam để không bao giờ đi chệch hướng cũng như có thể dẫn dắt, định hướng cho những người mới vào. Bên cạnh đó thì đây cũng như những nét phác họa tổng quan nhất để mọi người có thể hình dung được một ngành nghề không phải là mới nhưng cũng không được nhiều người biết đến trong xã hội hiện nay.

Link tham khảo:
https://www.tutorialspoint.com/software_testing/software_testing_overview.htm