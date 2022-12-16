# 1. Exit criteria là gì
Exit criteria hay còn gọi là tiêu chuẩn dừng test là một tài liệu quan trọng dành cho QA bao gồm tập các điều kiện và yêu cầu cần phải đạt được trước khi kết thúc hoạt động kiểm thử.

![](https://images.viblo.asia/258c446c-6ecf-4dcf-aba2-528e79c727b4.jpg)

**Ví dụ:** 

**Exit criteria cho testing phase:**
* Đảm bảo tất cả test plan được thực hiện
* Đảm bảo đáp ứng đủ mức độ bao phủ của requirement
* Đảm bảo không còn bug có priority high hoặc severity là critical
* Các vùng có risk cao đều được test
* Thực hiện các luồng chính với các đầu vào khác nhau nhằm đảm bảo chúng luôn hoạt động tốt
* Hoạt động kiểm thử nằm không bị quá chi phí dự án cho phép
* Hoạt động kiểm thử không bị quá thời gian dự án cho phép
...

**Exit criteria dành cho output:**

* Test plan, test case
* Test log
* Incident report log
* Test sumary report, findings report
* ...

# 2. Tại sao cần Exit criteria
Mục đích của việc kiểm thử không phải là tìm ra lỗi của phần mềm mà để chứng minh rằng phần mềm hoạt động như mong muốn bằng cách phá vỡ hoặc tìm ra những hành vi không như mong đợi. Ngay cả sau khi tìm ra lỗi, bạn vẫn không thể tự tin đảm bảo rằng phần mềm đã hết lỗi. Có một sự thật rằng lỗi trong phần mềm là không có giới hạn. Dù ta có kiểm thử bao nhiêu đi chăng nữa thì vẫn không thể biết được lỗi nào là lỗi cuối cùng. Do đó không thể coi việc tìm ra tất cả các bug trong phần mềm là tiêu chuẩn để kết thúc việc kiểm thử. Ngoài ra, mỗi một dự án còn có giới hạn về thời gian và ngân sách riêng nên cần phải có một bộ điều kiện để quyết định khi nào sẽ dừng test.

![](https://images.viblo.asia/b67779e7-bed8-41c7-a92e-293141eba913.png)

# 3. Exit criteria được xác định khi nào?
Exit criteria được xác định trong giai đoạn lên test plan. Exit criteria thường được xác định cụ thể cho từng test level: unit testing, integration testing, system testing và acceptance testing. 

**Ví dụ:**

**Exit criteria cho Unit testing:**

* Execute thành công các test case.
* Tất cả các bug tìm ra được close.
* Code được hoàn thành.

**Exit criteria cho Integration Testing:**
* Execute thành công integration test.
* Đạt được kết quả mong đợi của stress, performance and load tests.
* Các bug ưu tiên được close.

**Exit criteria cho System testing:**
* Execute thành công system tests.
* Cover đủ các chức năng nghiệp vụ và requeriment.
* Các bug ưu tiên được close.
* Khả năng đáp ứng và phủ hợp của hệ thống với các môi trường, phần cứng và phần mềm khác nhau.

**Exit criteria cho Acceptance testing:**
* Execute thành công  user acceptance tests.
* Nhận được approval từ management để stop UAT.
* Cover đủ các chức năng nghiệp vụ và requeriment.
* Không có bug nghiêm trọng nào còn lại.

# 4. Cách xác định Exit criteria 
Tiêu chuẩn dừng test phụ thuộc vào các yếu tố khác nhau tùy thuộc vào dự án do đó không có exit criteria nào giống nhau cả. Các thông số trong exit criteria cần được định lượng càng nhiều càng tốt. 
Nhìn chung các tiêu chí cần được xem xét khi xác định exit criteria là:
* 100% Requirements Achieved - Bao phủ 100% requeriment
* All Priority Defects Been Closed - Tất cả các lỗi ưu tiên được close
* Maximum Test Coverage Performed - Mức độ corverage tối đa cần đạt được
* Timelines & Budget Being Exhausted - Thời gian và ngân sách tiêu tốn
* Minimal Occurrence of Bugs - Khả năng xuất hiện bug tối thiểu

![](https://images.viblo.asia/9f4635ee-a299-4843-9f52-74c2046bbcb9.png)

## 4.1 Bao phủ 100% requeriment
Sau khi tất cả, requirement là lý do dự án phần mềm được hình thành, phát triển và thực hiện. Các tiêu chí cơ bản để xem việc kiểm thử phần mềm có đang được thực hiện đầy đủ hay không là đảm bảo rằng tất cả các yêu cầu mà khách hàng đã nêu có được đáp ứng hay không. Điều quan trọng là phải mapping từng yêu cầu của người dùng với chức năng trong phần mềm để đảm bảo không bị lack. Khi độ bao phủ requirement đạt 100%, bạn có thể nói rằng phạm vi yêu cầu được thực hiện và điều này có thể được đặt làm điều kiện cơ bản trong tài liệu exit criteria.
## 4.2 Tất cả các lỗi ưu tiên được close
Bạn không thể đảo bảo rằng phần mềm của mình không còn bug. Lỗi vẫn có thể xảy ra tại bất kì thời điểm nào. Lỗi có thể nằm trong các mức độ ưu tiên khác nhau: high, medium hoặc low. Tuy rằng tìm ra lỗi là nhiệm vụ của QA nhưng vẫn cần dừng lại ở mức độ nhất định. Điều quan trọng nhất đó là cần xác định được các bug ưu tiên và đôi khi bạn vẫn phải để lại một vài bug mà ảnh hưởng của nó thực sự không đáng kể đến chất lượng phần mềm được yêu cầu ở thời điểm hiện tại hoặc nó sẽ được fix vào một phase sau đó.
## 4.3 Mức độ corverage tối đa cần đạt được
Cũng giống như sự thật "Bạn không thể đảm bảo rằng phần mềm không còn bug", đảm bảo 100% test coverage là điều không thể. Bạn không thể cứ tiếp tục kiểm thử phần mềm đến khi đạt được cấp độ coverage là 100% vì ngoài chất lượng phần mềm ra, bạn cần phải đảm bảo được dealine deliver và các mốc trong schedule. Một test plan cần phải set up một vài tham số liên quan đến Test Coverage cần đạt được như là > 90% test coverage hoặc >95% số lượng test case pass hoặc số lượng test case fail < 5%...
## 4.4 Thời gian và ngân sách tiêu tốn
Tất cả các dự án đều có thời gian và ngân sách được xác định trước đó và ngay cả giai đoạn kiểm thử cũng có thời gian và ngân sách riêng. Trừ trường hợp có đặc biệt, quá trình kiểm thử không thể thực hiện vượt quá thời gian và ngân sách dự án.

## 4.5. Khả năng xuất hiện bug tối thiểu
Phần mềm càng phức tạp thì càng nhiều bug tiềm ẩn do đó vai trò của QA thực sự quan trọng để tìm ra bug với các độ ưu tiên khác nhau. Nhưng dù là tester thì bạn cũng là con người, bạn không thể tự tin là mình toàn năng để có thể đảm bảo rằng mình bắt được tất cả các lỗi tiền ẩn trong phần mềm nhưng việc bạn phải làm đó là phải giảm tối thiểu khả năng xuất hiện của bug. 

# 5. Kết luận
Việc xác định exit criteria cho quá trình kiểm thử phần mềm là điều cần thiết để giúp test team hoàn thành nhiệm vụ kiểm thử trong thời hạn quy định mà không ảnh hưởng đến năng suất, chất lượng, chức năng và hiệu quả của dự án. Trong giai đoạn cuối của việc kiểm thử, hãy làm mọi thứ một cách đơn giản là trả lời câu hỏi YES, NO với từng mục trong exit criteria để biết được việc kiểm thử có thể kết thúc hay chưa. 

Nguồn:

https://www.thinksys.com/qa-testing/entry-exit-criteria/
https://www.softwaretestinghelp.com/when-to-stop-testing-exit-criteria-in-software-testing/
http://softwaretestingsolution.com/blog/5-checkpoints-define-exit-criteria-software-testing/