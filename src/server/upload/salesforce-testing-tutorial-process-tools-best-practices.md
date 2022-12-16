Tiếp nối bài viết https://viblo.asia/p/salesfore-la-gi-5-ly-do-khien-cac-ong-chu-lua-chon-no-Qpmlew7MKrd hôm nay mình sẽ chuyển sang chủ đề "Salesforce Testing Tutorial: Process, Tools, Best Practices"

![](https://images.viblo.asia/0de0b955-49bd-423f-9bf2-1beaf736a071.png)
# 1: Types of Salesforce Testing
### Manual Testing: 
Test manual của salesforce bao gồm kiểm tra Ứng dụng Salesforce.com bằng các phương pháp thủ công. Nhóm QA có thể sử dụng kiểm thử thủ công để thực hiện test functional , test happy path, test integration, test regression, and test system.
### Automated Testing:
Test automated liên quan đến chương trình máy tính để kiểm tra ứng dụng Salesforce.com hoặc Force.com. Các công cụ kiểm tra tự động như Selenium, Assure Click, QTP, v.v ... được sử dụng.

# 2: Levels of Testing in Salesforce
![](https://images.viblo.asia/c4293b6f-2ed4-4dec-aba3-25408b79d2b3.png)

### Unit Testing
* Process của unit testing được thực hiện bởi các nhà phát triển Apex. Nó liên quan đến việc viết các lệnh trong code của họ để tự động kiểm tra phạm vi của nó.
* Nó giúp bạn đánh giá có bao nhiêu records data được thực hiện, để code chạy thành công trong môi trường đó.
* Để triển khai code Apex vào môi trường product, tỷ lệ code của bạn phải ở mức tối thiểu 78%

### System Testing
* Nó được thực hiện bởi một nhóm chuyên gia tư vấn của Salesforce
* Liên quan đến các quy trình kỹ thuật của hệ thống thử nghiệm từ đầu đến cuối
* Liên quan đến kịch bản thử nghiệm dựa trên các đầu ra cụ thể
* Cho phép bạn khắc phục sự cố với các quy tắc tự động trong hệ thống như quy trình làm việc, validation, assignment, v.v

### UAT Testing

* Nó được thực hiện bởi users sẽ sử dụng ứng dụng
* Cho phép kiểm tra các chức năng của hệ thống
* Thử nghiệm UAT theo kịch bản thử nghiệm dựa trên những gìvấn đề xảy ra đối với ứng dụng đó
* Đầu ra mong muốn phải được khách hàng xác nhận rằng hệ thống phù hợp với yêu cầu của họ

### Production Testing
* Nó là sự lặp lại của thử nghiệm hệ thống trên môi trường production
* Production testing trong salesfore cho phép bạn kiểm tra xem cấu hình và code đã được triển khai chính xác từ sandbox tới production hay chưa
* Nếu còn thời gian trước khi deploy, thì client sẽ chạy qua các tập lệnh UAT một lần nữa.

### Regression Testing

* Mục tiêu chính của kiểm tra hồi quy là kiểm tra xem các bản phát hành code và config có ảnh hưởng đến các quy trình người dùng hiện có của hệ thống không
* Nó sẽ được tiến hành sau khi cải tiến hoặc được fix để deploy tới production.
* Người dùng cung cấp một danh sách các thay đổi có thể ảnh hưởng đến quy trình hiện tại của họ

# 3: Salesforce Testing Process

Quá trình thử nghiệm của Salesforce giống như mọi ứng dụng dựa trên web thông thường. Tester cần clear spec về các feature được xây dựng trong quá trình kiểm tra. Nó giúp họ tập trung vào mã cutomized đó thay vì các tính năng Salesforce tích hợp.

Developer và tester nên sử dụng môi trường Sandbox (Test Enriovnment) cho từng mục đích của mình. Code của môi trường Sandbox được depoy tới môi trường production từ code của môi trường Sandbox. Người ta cho rằng người kiểm tra QA có kiến thức và hiểu biết cơ bản về các thuật ngữ được sử dụng trong Salesforce.

# 4: Salesforce Testing challenges

![](https://images.viblo.asia/6b940bc6-f0e8-4339-8ad2-a6aee003007c.png)

Salesfore testing không phải là một quá trình dễ dàng. Có nhiều thử thách đã phải đối mặt trong quá trình thử nghiệm. Một số trong số họ là:

* Đây không phải là một nhiệm vụ dễ dàng để kiểm tra các tính năng nâng cao như Visualforce, Salesforce hoặc Service Cloud Console.
* Bạn cần tạo lại tất cả các thử nghiệm cổ điển của mình cho Lightning UI
* Một số chức năng tiêu chuẩn mặc dù không được sử dụng, không thể loại bỏ
* Kiểm tra GUI không hoạt động khi chuyển sang môi trường test
* Automated test nên làm việc trong tất cả các môi trường test của bạn
* Các sự cố xảy ra trong khi tạo bộ định vị trường cho màn hình Salesforce vì một số ID trường khác nhau giữa các Tổ chức

# 5: Best practice for Salesforce testing

* Run test như người dùng thực
* Test data nên được chuẩn bị cho validating để report function
* Phương pháp kiểm tra phải bao gồm:  functional testing, UI testing, regression testing, and system integration testing.
* Automation testing phải được thực hiện bằng các công cụ như Selenium và HP Unified Functional tests
* Salesforce tester nên xem xét bao gồm positive and negative flows
* Vai trò người dùng phải được xây dựng và kiểm tra bằng Workflows
*
![](https://images.viblo.asia/001050f6-82df-44fa-bee8-30e0ef5ccecd.png)

# 6: SalesForce Test Automation Tools

Dưới đây, được đưa ra là các công cụ kiểm tra Salesforce được sử dụng rộng rãi:

* Selenium web driver
* HP Unified Functional Testing (UFT)
* Cucumber
* Force.com IDE (Eclipse-based)
* Change Sets (Cloud Deploy)
* Ant/force.com migration tool
* Workday
 
Nguồn https://www.guru99.com/salesforce-testing-tutorial.html