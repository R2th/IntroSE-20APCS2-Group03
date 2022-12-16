**Gherkin là gì?**



Gherkin là định dạng cho thông số kỹ thuật cucumber. Đây là một ngôn ngữ cụ thể của miền giúp bạn mô tả hành vi nghiệp vụ mà không cần phải đi sâu vào chi tiết thực hiện. Văn bản này hoạt động như tài liệu và bộkhung của các bài kiểm tra tự động của bạn. Gherkin dựa trên Ngữ pháp TreeTop tồn tại trong hơn 37 ngôn ngữ. Do đó, bạn có thể viết cucumber của mình bằng hơn 37 ngôn ngữ .

**Kịch bản này phục vụ hai mục đích chính:**




Tài liệu kịch bản người dùng


Viết một kiểm thử tự động (BDD)

Trong hướng dẫn Gherkin này, bạn sẽ học

Gherkin là gì?
Tại sao cần Gherkin?
Cú pháp của Gherkin
Điều khoản quan trọng được sử dụng trong Gherkin
Ví dụ Gherkin
Thực hành tốt nhất khi sử dụng Gherkin
Ưu điểm và nhược điểm của Gherkin



**Tại sao cần Gherkin?**




Nhu cầu về Gherkin có thể được giải thích dễ dàng bằng các hình ảnh sau

**Trước Gherkin**


![](https://images.viblo.asia/7e9ba40a-4410-44b6-bc28-a862138b8a20.png)
**Sau Gherkin**


![](https://images.viblo.asia/f10177fe-12de-4f87-9238-800e34c96a51.png)
**Cú pháp của Gherkin**



Gherkin là ngôn ngữ hướng dòng giống như YAML và Python. Mỗi dòng được gọi là bước và bắt đầu với từ khóa và kết thúc của các thiết bị đầu cuối với một điểm dừng. Tab hoặc space được sử dụng để thụt lề.

Trong kịch bản này, một nhận xét có thể được thêm vào bất cứ nơi nào bạn muốn, nhưng nó nên bắt đầu bằng dấu #. Nó đọc từng dòng sau khi loại bỏ các từ khóa của Ghrekin như  given, when, then, v.v.

**Các bước Gherkin điển hình trông giống như:**




Các kịch bản  Gherkin: kết nối khái niệm nguyên nhân và kết quả của con người với khái niệm đầu vào / quá trình / đầu ra của phần mềm.

Cú pháp của Gherkin:

Tính năng: Tiêu đề của kịch bản
Geven [Các tiền điều kiện hoặc bối cảnh ban đầu]
When [Sự kiện hoặc Kích hoạt]
Then [đầu ra mong muốn]
Một tài liệu Gherkin có phần extension .feature và chỉ đơn giản là một tệp kiểm thử với phần extension lạ mắt. Cucumber đọc tài liệu của Gherkin và thực hiện một bài kiểm thử để xác thực rằng phần mềm hoạt động theo cú pháp cucumber của Gherkin.

**Điều khoản quan trọng được sử dụng trong Gherkin**





**Feature
Background
Scenario
Given
When
Then
And
But**



Ví dụ về phác thảo kịch bản
Quy ước đặt tên được sử dụng cho tên tính năng. Tuy nhiên, không có quy tắc nào được đặt ra trong Cucumber về tên.

**Feature/tính năng:**



Tệp phải có extension .feature và mỗi tệp tính năng chỉ nên có một tính năng. Từ khóa tính năng có trong Tính năng: và sau lần thêm đó, một khoảng trắng và tên của tính năng sẽ được viết.

**Scenario/Kịch bản:**



Mỗi tệp tính năng có thể có nhiều kịch bản và mỗi kịch bản bắt đầu bằng Kịch bản: theo sau là tên kịch bản.

**Background:**



Từ khóa Background giúp bạn thêm một số bối cảnh vào kịch bản. Nó có thể chứa một số bước của kịch bản, nhưng sự khác biệt duy nhất là nó nên được chạy trước mỗi kịch bản.

**Given:**



Việc sử dụng từ khóa Given là đưa hệ thống về trạng thái quen thuộc trước khi người dùng bắt đầu tương tác với hệ thống. Tuy nhiên, bạn có thể bỏ qua việc viết các tương tác của người dùng trong các bước đã cho nếu được đưa ra trong bước "Precondition".

Cú pháp:

Given
Given - a test step that defines the 'context
Given I am on "/."


**When:**




When: là xác định hành động được thực hiện bởi người dùng.

Cú pháp:

When
A When - a test step that defines the 'action' performed
When I perform "Sign In."
Then:

Việc sử dụng từ khóa 'then' là để xem kết quả sau hành động trong bước when. Tuy nhiên, bạn chỉ có thể xác minh những thay đổi đáng chú ý.

Cú pháp:

Then
Then - test step that defines the 'outcome.'
Then I should see "Welcome Tom."



**And & But**



Bạn có thể có nhiều given when hoặc Then.

Cú pháp:

But
A But - additional test step which defines the 'action' 'outcome.'
But I should see "Welcome Tom."
And - additional test step that defines the 'action' performed
And I write  "EmailAddress" with "Tomjohn@gmail.com."


Given, When, Then,And,  but là các bước kiểm tra. Bạn có thể sử dụng chúng thay thế cho nhau. Trình thông dịch không hiển thị bất kỳ lỗi nào. Tuy nhiên, chúng  chắc chắn sẽ không có ý nghĩa gì khi đọc.
![](https://images.viblo.asia/e455265a-43f6-4d4f-9520-5092932b61c5.png)
Given The login page is opening
When I input username, password and click the Login button 
Then I am on the Homepage



**Ví dụ Gherkin**





**Feature:**  Login functionality of social networking site Facebook. 



**Given:**  I am a facebook user. 


**When:** I enter username as username. 


**And** I enter the password as the password 


**Then** I should be redirected to the home page of facebook 


Kịch bản được đề cập ở trên là một tính năng gọi là đăng nhập người dùng.

Tất cả các từ được in đậm là từ khóa Gherkin.

Gherkin sẽ phân tích từng bước được viết trong tệp định nghĩa bước. Do đó, các bước được đưa ra trong tệp tính năng và tệp định nghĩa bước phải khớp.

Ví dụ 2:

Feature: User Authentication Background:
Given the user is already registered to the website Scenario:
Given the user is on the login page
When the user inputs the correct email address
And the user inputs the correct password
And the user clicks the Login button
Then the user should be authenticated
And the user should be redirected to their dashboard
And the user should be presented with a success message  



**Thực hành tốt nhất khi sử dụng Gherkin**




Mỗi kịch bản nên thực hiện riêng

Mọi tính năng sẽ có thể được thực thi cùng

Các bước thông tin cần được hiển thị độc lập

Kết nối Kịch bản của bạn với yêu cầu của bạn

Theo dõi đầy đủ các kịch bản nên được bao gồm trong một tài liệu yêu cầu

Tạo các  mô-đun và các bước dễ hiểu
Cố gắng kết hợp tất cả các kịch bản chung của bạn


**Ưu điểm và nhược điểm của Gherkin**



Gherkin đủ đơn giản để những người không lập trình hiểu

Các lập trình viên có thể sử dụng nó như một cơ sở rất vững chắc để bắt đầu các bài kiểm tra của họ

Nó làm cho Câu chuyện của người dùng dễ tiêu hóa hơn

Kịch bản Gherkin có thể dễ dàng hiểu được bởi các nhà điều hành và phát triển kinh doanh

Nhắm mục tiêu yêu cầu kinh doanh

Một tỷ lệ đáng kể của các đặc tả chức năng được viết dưới dạng câu chuyện của người dùng

Bạn không cần phải là chuyên gia để hiểu bộ lệnh Gherkin nhỏ

Gherkin liên kết các bài kiểm tra chấp nhận trực tiếp đến các bài kiểm tra tự động

Phong cách viết bài kiểm tra dễ sử dụng lại mã hơn trong các bài kiểm tra khác




**Nhược điểm**



Nó đòi hỏi một mức độ cao của sự tham gia và hợp tác kinh doanh

Có thể không hoạt động tốt trong tất cả các kịch bản

Các bài kiểm tra viết kém có thể dễ dàng tăng chi phí bảo trì kiểm tra




**Tóm lược:**




Gherkin là định dạng cho thông số kỹ thuật của cucumber


Gherkin là ngôn ngữ hướng dòng giống như YAML và Python


Tập lệnh Gherkin kết nối khái niệm nguyên nhân và kết quả của con người với khái niệm  đầu vào / quá trình và đầu ra của phần mềm


Feature, Background, Scenario, Given, When, Then, And But  được sử dụng quan trọng trong Gherkin


Trong  Gherkin cucumber, mỗi kịch bản nên thực hiện riêng


Ưu điểm lớn nhất của Gherkin là đủ đơn giản để những người không lập trình hiểu


Nó có thể không hoạt động tốt trong tất cả các loại kịch bản


Refer: https://www.guru99.com/gherkin-test-cucumber.html