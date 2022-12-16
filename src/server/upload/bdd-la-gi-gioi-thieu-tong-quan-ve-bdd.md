# **1.BDD là gì**
BDD (Behavior Driven Development) là một quá trình phát triển phần mềm dựa trên phương pháp Agile(phát triển phần mềm linh hoạt).

Dựa vào requirement các kịch bản test (Scenarios) sẽ được viết trước dưới dạng ngôn ngữ tự nhiên và dễ hiểu nhất sau đó mới thực hiện cài đặt source code đễ pass qua tất cả các stories đó.

Những kịch bản test này được viết dưới dạng các feature file và đòi hỏi sự cộng tác từ tất cả các thành viên tham gia dự án hay stakeholder.
  
# **2.Một số nguyên tắc của BDD**

BDD được viết dưới dạng plain text language gọi là Gherkin.

### Các quy tắc khi viết Gherkin:

- File lưu dưới dạng extension là .feature.

- Mỗi một file .feature thường gồm một chức năng duy nhất.

- Một chức năng bao gồm nhiều kịch bản khác nhau với danh sách các bước.

### Cú pháp của Gherkin

Một file feature bằng Gherkin được trình bày dưới dạng như sau:

![](https://images.viblo.asia/498e1d2a-3f55-4e2c-ba55-066a35ee61f9.png)
   
   Ý nghĩa của các từ khóa
   
  - *Feature*: Là một đoạn text mô tả ngắn gọn về chức năng thực hiện
  
  - *Background*:
     Cho phép thêm một số ngữ cảnh cho tất cả các Scenario trong feature
     Có chứa một số bước được chạy trước mỗi Scenario
     Có thể hiểu đơn giản giống như điều kiện tiên quyết để thực hiện tất cả các Scenario trong feature
     Được khai báo sau từ khóa “Feature”
     
  - *Scenario*:
     Từ khóa bắt đầu trước mỗi kịch bản, tiếp theo là tiêu đề của kịch bản sẽ thực hiện
     Mỗi kịch bản bao gồm một hoặc nhiều bước
     
  - *Given*: Mô tả điều kiện tiên quyết để thực hiện 1 Scenario
  
  - *When*: Mô tả các hành động chính (Steps) mà người dùng thực hiện
  
  - *Then*: Mô tả kết quả đầu ra mong muốn của Scenario
  
  - *And/ But*: Thay thế cho các từ khóa Given/ When/ Then để làm cho chương trình mạch lạc hơn
   
 # **3.Ưu/nhược điểm khi sử dụng BDD**
  
##   Ưu điểm
  
  - Giúp xác định đúng yêu cầu của khách hàng: do tài liệu dựa theo hướng ngôn ngữ tự nhiên nên bất kì đối tượng nào cũng hiểu được, nên khi đọc tài liệu này khách hàng có thể dễ dàng biết được lập trình viên có đang đi đúng hướng họ mong muốn không.
  
  - Là tài liệu sống của dự án: tài liệu luôn được cập nhật khi có bất kì thay đổi nào, nên tất cả thành viên không bị miss thông tin trong quá trình phát triển dự án.
  
 - Giảm bớt những case không hợp lý, hoặc không thể làm được tại thời điểm hiện tại: khi viết tài liệu cần ít nhất 1 developer, 1 QA, 1 BA do đó có thể thảo luận case nào không hợp lý, case nào không thể thực hiện tại thời điểm hiển tại trước khi bắt đầu code chức năng.
 
 ## Nhược điểm
 
- Yêu cầu hiểu sâu về số lượng lớn các khái niệm, vì vậy muốn tiếp cận với BDD thì yêu cầu developers cần hoàn toàn hiểu rõ về TDD.

- Vì nó là một khái niệm, biến nó thành một kỹ thuật thực hành hoặc kết nối nó với một bộ công cụ có nghĩa là hủy hoại nó.

Tài liệu tham khảo: https://labs.septeni-technology.jp/bdd/kiem-thu-tu-dong-su-dung-bdd-2/
https://blog.testlodge.com/what-is-bdd/