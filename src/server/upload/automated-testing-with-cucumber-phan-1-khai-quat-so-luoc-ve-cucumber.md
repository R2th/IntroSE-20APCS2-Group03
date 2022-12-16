## Đặt vấn đề

Để đảm bảo ứng dụng web luôn hoạt động trên mọi môi trường là một phần thiết yếu của vòng đời phát triển ứng dụng Web. Theo truyền thống, các nhà phát triển thực hiện kiểm thử hồi quy để có thể đảm bảo ứng dụng có thể tương thích với nhiều trình duyệt web, nhưng điều này gây tốn kém về thời gian và nhân lực. Một cách tiếp cận khác, là xây dựng bộ kiểm thử chạy tự động để có thể phát hiện sớm các vấn đề và được phản hồi nhanh chóng.

Bài viết này giúp các bạn có thể hiểu rõ hơn về Cucumber, những lợi ích khi sử dụng Selenium với Cucumber để kiểm thử tự động.

## Cucumber là gì

![](https://images.viblo.asia/e27a062c-dd7b-4d10-a77f-802a663a7830.png)

Cucumber là một công cụ kiểm thử tự động dựa trên việc thực thi các functions được mô tả dướng dạng plain-text, để hỗ trợ cho việc viết Behavior Driven Development(BDD). Nói theo cách khác Cucumber là công cụ phần mềm được sử dụng bởi tester để thực hiện các trường hợp kiểm thử kiểm tra hành vi của phần mềm.

Ban đầu Cucumber chỉ dành riêng cho Ruby nhưng hiện nay  đã hỗ trợ nhiều ngôn ngữ lập trình khác nhau như:  PHP, Java, JavaScript, C# và Python.

Ở Cucumber testing, các trường hợp kiểm thử được viết dưới dạng văn bản theo ngôn ngữ tự nhiên, ai đọc cũng có thể hiểu mà không cần bất kì kiến thức kĩ thuật nào. Ngôn ngữ này được gọi là ngôn ngữ Gherkin.

## Cách Cucumber hoạt động

Cucumber test cases được viết song song với quá trình phát triển phẩn mềm. Các testcase này được gọi là **steps**  trong ngôn ngữ Gherkin.
* Đầu tiên Cucumber đọc các **steps**  được viết bằng ngôn ngữ Gherkin trong  **feature** file.
* Sau đó, nó tìm kiếm **steps** này trong step definition file(  sẽ định nghĩa cách thức hoạt động và assert các kết quả thu được để kiểm tra các step có hoạt động một cách chính xác hay không.) . Nếu trùng khớp thì sẽ thực hiện chạy testcase và cung cấp kết quả pass/fail sau khi chạy xong.

Ngoài ra Cucumber hỗ trợ một số các phương thức helper điển hình như hooks cho phép chúng ta có thể thực các công việc nhất định tại một thời điểm thực thi các test case như trước khi bắt đầu một Scenario hay sau khi kết thúc một Scenario, ..

## Các công cụ phần được Cucumber hỗ trợ

Cucumber hỗ trợ hầu hết các nền tảng phần mềm phổ biến hiện nay, và đó là lý do nó được ưa chuộng hơn so với các công cụ như: JDave, Easyb, JBehave,...Dưới đây là một số các công cụ hỗ trợ:
* Ruby on Rails
* Selenium
* PicoContainer
* Spring Framework
* Watir

## Lợi ích khi sử dụng Cucumber

* Giúp cho các bên liên quan đến dự án (stakeholders,..) có thể theo dõi hoạt động test mà không cần kiến thức kĩ thuật chuyên môn.
* Tập trung vào trải nghiệm của người dùng cuối.
* Cho phép tester dễ dàng tái sử dụng lại code trong các trường hợp kiểm thử.
* Hỗ trợ hầu hết tất cả các ngôn ngữ phổ biến khác nhau như Java.net, JavaScript Ruby, PHP, v.v.
* Dễ cài đặt và sử dụng.

## So sánh Cucumber và Selenium



| Cucumber | Selenium |QTP |
| -------- | -------- |  -------- | 
| Công cụ hỗ trợ Behaviour driven development BDD     | Công cụ hỗ trợ Functional and Performance testing( Selenium Grid)  |Công cụ hỗ trợ Functional and Performance testing|
|Miễn phí                                                                                   | Miễn phí                                                                                                          |Mất phí|
|Hỗ trợ nhiều ngôn ngữ như: Java, Scala, Groovy, Rub, JavaScript,...                                                                                   | Hỗ trợ Java, .Net, Ruby                                                                            |Chỉ hỗ trợ VB script|
|Có sự tham gia của PO/BA, Deverloper, Tester                                                                                   | Chỉ có sự tham gia của tester                       |Chỉ có sự tham gia của tester                       |
|Để test ứng dụng Web , App                                                                                  | Để test ứng dụng Web                                                                                                        |Để test ứng dụng Web, Desktop, và bất kì ứng dụng client-server|
|Ít tin cậy hơn so với Selenium                                                                                   | Đáng tin cậy                                                                                                       |Đáng tin cậy|
|Plugin hoạt động nhanh                                                                                   |Plugin hoạt động chậm hơn Cucumber                                                                                                      |Plugin chậm hơn Selenium|

Trên đây là một số khái niệm cơ bản về Cucumber. Sau bài viết này, mong có thể giúp các bạn có cái nhìn khái quát về Cucumber: Cucumber là gì, cách thức hoạt động ra sao, ưu nhược điểm của nó.

### Tài liệu tham khảo: 
https://www.javatpoint.com/cucumber-vs-qtp, 
https://en.wikipedia.org/wiki/Cucumber_(software)

(Còn tiếp)