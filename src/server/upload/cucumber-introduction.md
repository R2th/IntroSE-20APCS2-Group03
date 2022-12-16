## **1. Cucumber là gì?**
Cucumber là một công cụ kiểm thử tự động dựa trên việc thực thi các functions được mô tả dướng dạng plain-text, mục đích là để support cho việc viết Behavior Driven Development (BDD) của các developers. Điều này có nghĩa rằng kịch bản test unit (scenarios) sẽ được viết trước và thể hiện nghiệp vụ, sau đó source code mới được cài đặt để pass qua tất cả các stories đó.
## **2. Ngôn ngữ Gherkin - Ngôn ngữ của Cucumber**
Ngôn ngữ được cucumber sử dụng là “Gherkin” <br>
Gherkin là 1 ngôn ngữ mà Cucumber đọc ngôn ngữ ấy chuyển thành test. Gherkin khá dễ hiểu, người đọc có thể hiểu kịch bản và hành động mà không cần biết chi tiết chúng được cài đặt như thế nào.
Có 2 quy tắc khi viết Gherkin: <br>
            - Mộ file Gherkin chỉ mô tả cho một featute <br>
            - Source file Gherkin là .feature <br>
Trong Gherkin, mỗi dòng không phải là trống mà phải bắt đầu bằng từ khóa Gherkin, tiếp theo là bất kỳ văn bản nào bạn thích. Các từ khóa chính là: <br>
             - Feature <br>
             - Scenario <br>
             - Given, When, Then, And, But (Steps) <br>
             - Background <br>
             - Scenario Outline <br>
             - Examples <br>
Ngoài ra cũng có một vài từ khóa như là: <br>
            -  """ (Doc Strings) <br>
            - | (Data Tables) <br>
            -  *@ (Tags) <br>
            - # (Comments) <br>

**Cú pháp Gherkin:** <br>
        - Giống như Python và YAML, Gherkin là một ngôn ngữ kịch bản được sử dụng để định nghĩa logic theo cấu trúc. Cũng giống như Ruby, nên thay thế kí tự tab bằng các kí tự space, dòng comment sẽ có kí tự # ở đầu dòng. <br>
        - Bắt đầu một file sẽ là Feature, sau đó đến scenarios và steps. Khi chạy file source “.feature” mỗi step sẽ match với một Ruby code block được định nghĩa sẵn trước đó gọi là “Step Definitions”.
## **3. Ngữ pháp của Gherkin**
Chia đầu vào thành các feature, scenario và step
### **3.1. Feature**
Một tệp tin .feature được mô tả là một tính năng duy nhất của hệ thống, hoặc một khía cạnh cụ thể của một tính năng. Đây chỉ là một cách để cung cấp mô tả cấp cao về tính năng phần mềm và để nhóm các kịch bản liên quan. <br>
Một tính năng có ba yếu tố cơ bản, tính năng: từ khóa, tên (trên cùng một dòng) và một mô tả tùy chọn (nhưng rất khuyến khích) có thể mở rộng nhiều dòng. <br>
Cucumber không quan tâm đến tên hoặc mô tả, mục đích chỉ đơn giản là cung cấp nơi bạn có thể ghi lại các khía cạnh quan trọng của tính năng, chẳng hạn như giải thích ngắn gọn và danh sách các quy tắc kinh doanh (tiêu chí chấp nhận chung). <br>
Ví dụ: 
>     Feature: Multiple site support
### **3.2. Scenario**
Scenario là nòng cốt trong cấu trúc Gherkin. <br>
Các Scenario đều theo cùng một khuôn mẫu: <br>
            - Mô tả một bối cảnh ban đầu <br>
            - Mô tả một sự kiện <br>
            - Mô tả một kết quả mong đợi <br>
            - Các bước thực hiện <br>
Mọi Scenario đều bắt đầu với từ khóa “Scenario:” theo sau bởi một tiêu đề tùy ý. <br>
Mỗi Feature có thể có một hoặc nhiều Scenario, và mỗi Scenario bao gồm một hay nhiều Step. <br>
Ví dụ: 
>      Scenario: feeding a small suckler cow
>        Given the cow weighs 450 kg
>        When we calculate the feeding requirements
>        Then the energy should be 26500 MJ
>        And the protein should be 215 kg
>      
>      Scenario: feeding a medium suckler cow
>        Given the cow weighs 500 kg
>        When we calculate the feeding requirements
>        Then the energy should be 29500 MJ
>        And the protein should be 245 kg
### **3.3. Step**
Feature bao gồm Step như (Givens, Whens, Thens…). <br>
***3.3.1. Givens***  <br>
Được sử dụng để mô tả ngữ cảnh ban đầu của hệ thống. <br>
Mục đích của Given là đưa hệ thống vào một trạng thái đã biết trước khi sử dụng (hoặc hệ thống bên ngoài) bắt đầu tương tác với hệ thống (trong bước When). <br>
Nếu bạn đã làm việc với use case, Givens là điều kiện tiên quyết. <br>
Khi Cucumber thực thi bước Given, nó sẽ cấu hình hệ thống để được một trạng thái rõ ràng như là: tạo, cấu hình các đối tượng hoặc thêm dữ liệu test vào cơ sở dữ liệu. <br>
Ví dụ: 
>      Scenario: feeding a medium suckler cow
>        Given the cow weighs 500 kg
>        When we calculate the feeding requirements
>        Then the energy should be 29500 MJ
>        And the protein should be 245 kg 
***3.3.2. Whens*** <br>
Mục đích của When là để mô tả các sự kiện, hành động chính mà người dùng sử dụng. <br>
'When' được sử dụng để mô tả một sự kiện, hoặc một hành động. Đây có thể là một người tương tác với hệ thống, hoặc nó có thể là một sự kiện được kích hoạt bởi một hệ thống khác. <br>
Ví dụ:
>      Scenario: feeding a medium suckler cow
>        Given the cow weighs 500 kg
>        When we calculate the feeding requirements
>        Then the energy should be 29500 MJ
>        And the protein should be 245 kg 
***3.3.3. Thens*** <br>
Mục đích của Then là quan sát kết quả. Các quan sát phải được liên quan đến các giá trị kinh doanh / lợi ích trong việc mô tả feature. Các quan sát phải kiểm tra đầu ra của hệ thống (một báo cáo, giao diện người dùng, tin nhắn,...) <br>
'Then' được sư dụng để so sánh kết quả thực tế (hệ thống thực sự làm) với kết quả mong đợi (những gì các bước nói hệ thống là nghĩa vụ phải làm). <br>
Ví dụ:
>      Scenario: feeding a medium suckler cow
>        Given the cow weighs 500 kg
>        When we calculate the feeding requirements
>        Then the energy should be 29500 MJ
>        And the protein should be 245 kg 
***3.3.4. And/ But*** <br>
Thay thế cho các từ khóa Given/ When/ Then để làm cho chương trình mạch lạc hơn <br>
Ví dụ: 
>      Scenario: Multiple Givens
>        Given one thing
>        Given an other thing
>        Given yet an other thing
>        When I open my eyes
>        Then I see something
>        Then I don't see something else
  Đoạn mã trên có thể được thay thế như sau:
>        Scenario: Multiple Givens
>        Given one thing
>        And an other thing
>        And yet an other thing
>        When I open my eyes
>        Then I see something
>        But I don't see something else
### **3.4. Background** 
- Cho phép thêm một số ngữ cảnh cho tất cả các Scenario trong feature <br>
- Có chứa một số bước được chạy trước mỗi Scenario <br>
- Có thể hiểu đơn giản giống như điều kiện tiên quyết để thực hiện tất cả các Scenario trong feature <br>
- Được khai báo sau từ khóa “Feature” <br>
Ví dụ: 
>      Feature: Multiple site support
>       
>        Background:
>          Given a global administrator named "Greg"
>          And a blog named "Greg's anti-tax rants"
>          And a customer named "Wilson"
>          And a blog named "Expensive Therapy" owned by "Wilson"
### **3.5. Scenario Outlines** 
Scenario Outlines để gom nhóm các kịch bản có chung các Steps nhưng có nhiều input và output <br>
Examples để thực hiện khai báo các giá trị cho các biến trong Scenario Outlines <br>
Ví dụ:
>      Scenario: eat 5 out of 12
>        Given there are 12 cucumbers
>        When I eat 5 cucumbers
>        Then I should have 7 cucumbers
>       
>      Scenario: eat 5 out of 20
>        Given there are 20 cucumbers
>        When I eat 5 cucumbers
>        Then I should have 15 cucumbers
  Đoạn code trên có thể được thay thế như sau:
>        Scenario Outline: eating
>        Given there are <start> cucumbers
>        When I eat <eat> cucumbers
>        Then I should have <left> cucumbers
>       
>        Examples:
>          | start | eat | left |
>          |  12   |  5  |  7   |
>          |  20   |  5  |  15  |
    
## **4. Tài liệu tham khảo**
https://viblo.asia/p/cucumber-co-ban-ngon-ngu-gherkin-jamoG8ndRz8P <br>
https://cucumber.io/docs/reference#gherkin <br>
http://toolsqa.com/cucumber/cucumber-tutorial/ <br>
http://labs.septeni-technology.jp/bdd/kiem-thu-tu-dong-su-dung-bdd-2/ <br>

Bài viết là những tìm hiểu cơ bản của mình về Cucumber cũng như ngôn ngữ Gherkin. Rất mong nhận được sự góp ý từ tất cả các bạn!
Cám ơn các bạn đã đọc!