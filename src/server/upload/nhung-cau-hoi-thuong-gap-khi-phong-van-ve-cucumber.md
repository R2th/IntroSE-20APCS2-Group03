Dưới đây là những câu phỏng vấn thường gặp để hỏi những tester mới vào nghề cũng như những người đã có kinh nghiệm.

## 1.Thế nào là BDD?

BDD (Behavior Driven Development) là một quá trình phát triển phần mềm dựa trên phương pháp Agile(phát triển phần mềm linh hoạt).

Dựa vào requirement các kịch bản test (Scenarios) sẽ được viết trước dưới dạng ngôn ngữ tự nhiên và dễ hiểu nhất sau đó mới thực hiện cài đặt source code đễ pass qua tất cả các stories đó.

## 2.Cucumber là gì? Ưu điểm của Cucumber?
Cucumber dùng để kiểm tra chức năng được viết dưới dạng plain text( ngôn ngữ tự nhiên), nó được viết bằng ngôn ngữ lập trình Java, Ruby,....

**Ưu điểm:**
* Giúp cho các bên liên quan đến dự án (stakeholders,..) có thể theo dõi hoạt động test mà không cần kiến thức kĩ thuật chuyên môn.
* Tập trung vào trải nghiệm của người dùng cuối.
* Cho phép tester dễ dàng tái sử dụng lại code trong các trường hợp kiểm thử.
* Hỗ trợ hầu hết tất cả các ngôn ngữ phổ biến khác nhau như Java.net, JavaScript Ruby, PHP, v.v.
* Dễ cài đặt và sử dụng.

## 3.Để thực hiện kiểm thử Cucumber cần những file bắt buộc nào?
Cần 2 file bắt buộc đó là:
* Feature(chứa các kịch bản được viết bằng ngôn ngữ tự nhiên).
* Step Definition(sẽ định nghĩa cách thức hoạt động và assert các kết quả thu được để kiểm tra).

## 4.Ngôn ngữ được sử dụng trong file feature?

Ngôn ngữ được sử dụng trong file feature là ngôn ngữ Gherkin. 

Gherkin là định dạng cho thông số kỹ thuật cucumber. Đây là một ngôn ngữ cụ thể của miền giúp bạn mô tả hành vi nghiệp vụ mà không cần phải đi sâu vào chi tiết thực hiện. Văn bản này hoạt động như tài liệu và bộkhung của các bài kiểm tra tự động của bạn. Gherkin dựa trên Ngữ pháp TreeTop tồn tại trong hơn 37 ngôn ngữ. Do đó, bạn có thể viết cucumber của mình bằng hơn 37 ngôn ngữ .

##  5.Thế nào là file support trong Cucumber?

Các file support chứa mã ruby hỗ trợ. Các file trong support tải trước các tệp trong step_definitions, có thể hữu ích cho cấu hình môi trường.

## 6.Thế nào là file feature trong Cucumber?

File feature chứa mô tả cấp cao về kịch bản thử nghiệm bằng ngôn ngữ đơn giản. Nó được gọi là Gherkin là một ngôn ngữ văn bản tiếng Anh đơn giản. Tệp tính năng bao gồm các thành phần sau đây như:

* *Feature*: Là một đoạn text mô tả ngắn gọn về chức năng thực hiện

* *Background*: Cho phép thêm một số ngữ cảnh cho tất cả các Scenario trong feature Có chứa một số bước được chạy trước mỗi Scenario Có thể hiểu đơn giản giống như điều kiện tiên quyết để thực hiện tất cả các Scenario trong feature Được khai báo sau từ khóa “Feature”

* *Scenario*: Từ khóa bắt đầu trước mỗi kịch bản, tiếp theo là tiêu đề của kịch bản sẽ thực hiện Mỗi kịch bản bao gồm một hoặc nhiều bước

* *Given*: Mô tả điều kiện tiên quyết để thực hiện 1 Scenario

* *When*: Mô tả các hành động chính (Steps) mà người dùng thực hiện

* *Then*: Mô tả kết quả đầu ra mong muốn của Scenario

* *And/ But*: Thay thế cho các từ khóa Given/ When/ Then để làm cho chương trình mạch lạc hơn

## 7.Nêu một ví dụ cách viết scenario?

```
Feature:Front site - Login function
  Scenario: Login successfully with valid front account
    Given User navigates to Login page of front site
    When User enters valid account at front site
    And User enters valid password at front site
    And User clicks on Login button at front site
    Then User login successfully into front site
```

## 8.Thế nào là Scenario Outline trong file feature?
Scenario Outline tương tự như scenario nhưng được thực thi cho nhiều bộ dữ liệu có chung thao tác, như ví dụ dưới đây:

```
  Scenario Outline: Login successfully with valid front account
    Given Admin navigates to Login page of front site
    When Admin is on Login page of front site
    And Admin enters valid account as <account> at front site
    And Admin enters valid password as <password> at front site
    And Admin clicks on Login button at front site
    Then Admin should be access front site successfully
    Examples:
      | account       | password          |
      | abc           | 123456            |
      |bcd            |5678901            |
```

## 9.Step Definition là gì?

Step Definition ánh xạ các bước *test case* trong các file feature thành mã. Nó thực hiện các bước trên ung dụng đang thử nghiệm và kiểm tra kết quả so với kết quả dự kiến. Để thực hiện *step definition*, nó phải khớp với thành phần đã cho trong một *file feature*.

## 10.Sự khác biệt giữa Jbehave và Cucumber?

Jbehave và Cucumber là 2 framework khác nhau, Jbehave dựa trên câu truyện, còn Cucumber dựa trên tính năng. Một tính năng là tập hợp các câu chuyện, được thể hiện từ quan điểm của một bên liên quan của dự án cụ thể.

JBehave là một Java framework thuần túy trong khi Cucumber dựa trên Ruby. 


## 11.Selenium là gì?

Selenium là một công cụ tự động hóa, được sử dụng rộng rãi để Kiểm tra chức năng của ứng dụng dựa trên web. Selenium hỗ trợ các ngôn ngữ khác nhau như ruby, java, python C #, v.v.

## 12.Vì sao nên sử dụng Cucumber với Selenium?

Cucumber và Selenium là hai công nghệ phổ biến. Nhiều tổ chức sử dụng Selenium để thử nghiệm chức năng. Các tổ chức đang sử dụng Selenium muốn tích hợp Cucumber với Selenium vì Cucumber giúp những người không hiểu kĩ thuật có thể đọc và hiểu luồng ứng dụng.

Tài liệu tham khảo: https://career.guru99.com/top-15-cucumber-interview-questions/