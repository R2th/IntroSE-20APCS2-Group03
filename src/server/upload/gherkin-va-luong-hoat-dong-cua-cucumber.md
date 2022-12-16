## Behaviour Driven Development
Behavior driven development (BDD) là một cách tiếp cận để phát triển phần mềm, thu hẹp khoảng cách giữa khách hàng và đội phát  triển phần mềm. BDD giúp các nhóm trong một dự án phần mềm có thể giao tiếp với nhau một cách chính xác hơn và phát hiện sớm các  khiếm khuyết của phần mềm. Nó giúp tạo ra các yêu cầu của dự án phần mềm mà tất cả mọi người trong quá trình phát triển phần mềm có thể hiều được tránh việc hiểu nhầm các yêu cầu của dự án, giảm thiểu các chi phí sửa chữa, khắc phục các lỗi do vấn đề thu thập yêu cầu thiếu chính xác. 

BDD có thể được chia thành 2 giai đoạn chính là Deliberate Discovery và Test-Driven Development.
Trong quá trình Deliberate Discovery tập trung vào việc thu thập các yêu cầu của dự án bằng cách hợp tác làm việc giữa các bên. Tất cả mọi người trong dự án cùng nhau đưa ra các ví dụ, các kịch bản cũng như các vấn đề của hệ thống trước khi bắt tay vào quá trình phát triển. Các ví dụ, kịch bản được tạo ra dưới sự hợp tác của tất cả mọi người, nó được viết bằng một loiaj ngôn ngữ dễ hiểu dễ đọc đảm bảo cho mọi người đểu có khả năng hiểu được giúp cho mỗi người có cái nhìn chính xác nhất đối với hệ thống cũng như  làm tài liệu về cách thức hoạt động của hệ thống và có thể sử dụng làm các kịch bản cho việc kiểm thử chấp thuận (acceptance test).

Quá trình thứ 2 là Test-Driven Development là một kỹ thuật trong phát triển phần mềm, ở đó các test case tự động được định nghĩa trước khi bắt tay vào code.
![](https://images.viblo.asia/3b220987-ac69-4a34-8e92-18afa6f05c64.png)
Trong BDD, TDD thường được thể hiện bằng cách sử dụng thông qua Example Mapping.  Các ví dụ, kịch bản thường được viết bởi PO hay BA của dự án là những người không trực tiếp thực hiện việc code phát triển phần mềm, tuy nhiên là người nắm được rõ nhất các yêu cầu của dự án. Gherkin là một loại cú pháp đơn giản có thể mô tả các kịch bản, ví dụ bằng ngôn ngữ tự nhiên và Cucumber là một công cụ có thể thực hiện  Example Mapping trong BDD.

## Gherkin
Gherkin là một loại cú pháp thường được sử dụng để mô tả các ví dụ, kịch bản trong BDD. Nó là một tập hợp các từ khóa đặc biệt để đưa ra cấu trúc, các hành vi thực hiện dựa trên ngôn ngữ tự nhiên. Các từ khóa của Gherkin có hỗ trợ nhiều loại ngôn ngữ khác nhau. Bạn có thể tìm kiếm các từ khóa Gherkin theo các ngôn ngữ [tại đây](https://cucumber.io/docs/gherkin/reference/#overview)
Một số từ khóa phổ biến thường được sử dụng trong Gherkin như:

*  Feature
*  Rule
*  Scenario
*  Given, When, Then, And, But
*  Bacground
*  Scenario OutLine
*  Examples

#### Feature
Mỗi một tệp văn bản Gherkin thường được dùng để mô tả một tính năng trong phần mềm. Trong một văn bản Gherkin phải được bắt đầu bằng một từ khóa Feature tiếp theo đó là một đoạn văn bản để mô tả ngắn gọn về tính năng đó thường được mô tả bằng các [User story](https://hocvienagile.com/agipedia/user-story/) gồm các thông tin như tác nhân hoạt động của tính năng này là ai, tác nhân đó cần gì ở tính năng này, tính năng này tạo ra nhằm phục vụ mục đích gì.

Ví dụ: 
```gherkin
Feature: Show admin dashboard
    As a admin
    I want to show admin dashboard
    In order to take actions to manage website.

Scenario:
    ..........................................
```

Phần mô tả sau từ khóa Feature kết thúc khi gặp một trong các từ khóa ở đầu một dòng như Rule, Scenario,  Scenario Outline, ...

#### Rule
Rule là một từ khóa tùy chọn được dùng khi muốn bổ sung một số các luật cần tuân thủ trong một tính năng, nó là một phần mở rộng giúp cho tệp văn bản Gherkin trở nên chặt chẽ hơn. 
Ví dụ: 
```gherkin
Feature: Show admin dashboard
    As a admin
    I want to show admin dashboard
    In order to take actions to manage website.

Rule: 
    - Admin can see dashboard
    - Normal user can not see dashboard
Scenario:
    ..........................................
```

#### Scenario
Một Scenario là một kịch bản chứa nhiều bước (steps) mô tả các bước hoạt động một phần chức năng  của phần mềm. Trong một Scenario có thể chứa nhiều steps. Một Sceario thường được mô tả theo mấu:

*  Mô tả điều kiện đã có sẵn (Given steps)
*  Mô tả hành động của tác nhân (When steps)
*  Mô tả kết quả mong đợi sau hành động (Then steps)

#### Given, When, Then, And, But
Là các từ khóa được sử dụng để bắt đầu mỗi một bước trong Scenario.
Ví dụ: 
```gherkin
Scenario: Show admin dashboard
    Given user see login screen 
    When user signed in with admin account
    Then user should see admin dashboard
```

Từ khóa Given thường được sử dụng để mô tả một trạng thái đã biết, từ khóa When dùng để mô tả hành động của người dùng tương tác với phần mềm và từ khóa Then giúp thể hiện kết quả thu được sau khi thực hiện hành động. Có thể sử dụng thêm các từ khóa And, But để cho Scenario dễ đọc và gần với ngôn ngữ tự nhiên hơn.

Các bạn có thể tham khảo thêm các từ khóa và các cú pháp Gherkin chi tiết hơn tại đây [Gherkin keywords](https://cucumber.io/docs/gherkin/reference/#keywords)

## Luồng hoạt động của Cucumber
Cucumber hoạt động dựa trên cơ chế Example Mapping. Các tệp văn bản Gherkin được viết và lưu dưới định dạng file .feature và lưu trong thư mục features/ Khi thực hiện test với Cucumber, Cucumber sẽ được các file .feature trong thư mục features/ và tìm kiếm, thực hiện test lần lượt các steps đã được định nghĩa trong các tệp văn bản Gherkin.

Mỗi step được định nghĩa sẽ được match với một  [step definition](https://cucumber.io/docs/cucumber/step-definitions/) thông qua các biểu thức (expressions)  trong các file steps.* . Việc quản lý các step definitions hoàn toàn có thể được tạo trong cùng một file tuy nhiên nó sẽ làm khó khăn trong việc quản lý vì vậy ta thường chia step definations ra nhiều file dựa trên các chức năng hay các tác nhân khác nhau để thuận tiện hơn trong việc quản lý. Trong step definition ta sẽ định nghĩa cách thức hoạt động và assert các kết quả thu được để kiểm tra các step có hoạt động một cách chính xác hay không.

Ví dụ: 
```javascript
    Given(/user see login screen/, function () {
        // Test Code
        ........................................
    });
        When(/user signed in with admin account/, function () {
        // Test Code
        ........................................
    });
```

Ngoài ra Cucumber hỗ trợ một số các phương thức helper điển hình như hooks cho phép chúng ta có thể thực các công việc nhất định tại một thời điểm thực thi các test case như trước khi bắt đầu một Scenario hay sau khi kết thúc một Scenario, ...

## Tài liệu tham khảo
[Cucumber](https://cucumber.io/)

[cucumberjs](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md)