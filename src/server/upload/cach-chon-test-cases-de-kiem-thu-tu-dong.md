Hiện nay kiểm thử tự động đang rất phổ biến. Hầu hết các project đang dịch các test case manul sang automated để cải thiện hiệu năng và phạm vi che phủ. Một trong những bước đầu tiên trong kiểm thử tự động là chọn ra những test case phù hợp để automated.

Automation không áp đảo hay thay thế hoàn toàn được manual testing. Giống như manual, automation cần có một chiến lược với lập kế hoạch, giám sát và kiểm soát thích hợp.  Automation khi được thực hiện chính xác, có thể trở thành một tài sản của team, project và cuối cùng là tổ chức.

### Dưới đây là một vài lợi thế của automation:
* Thực hiện các task như smoke tests và regression tests.
* Chuẩn bị test data
* Giúp thực hiện các test cases liên quan đến logic phức tạp
* Test cases đa nền tảng ( các hệ điều hành khác nhau, browser khác nhau...)
* Dễ dàng thực hiện các test case khó thực hiện bằng manual
* Số lần lặp lại việc thực hiện test case không được biết

### Bằng kinh nghiệm và tham khảo một số tài liệu, tôi sẽ chia sẽ một vài bước chọn test case phù hợp cho automated.

**Bước 1**
Xác định các tham số mà bạn sẽ dựa trên test case 
* Test case thực hiện với bộ data khác nhau
* Test case thực hiện với các trình duyệt khác nhau
* Test case thực hiện với các môi trường khác nhau
* Test case thực hiện với logic phức tạp
* Test case liên quan đến lượng dự liệu lớn
* Test case có nhiều phụ thuộc
* Test case yêu cầu data đặc biệt

**Bước 2**
Chia mỗi ứng dụng thành các modules. Mỗi modules, phân tích và xác định test case nên được automated dựa vào các tham số. 

![](https://images.viblo.asia/bcb007f2-aa59-4ea7-9874-9cf0369e4588.jpg)

Y - Yes
N - No
Tương tự với tất cả các module, list này dùng để xác định các test case automation.

**Bước 3**
Hợp nhất à nhóm số lượng test case cho mỗi module

![](https://images.viblo.asia/012a304f-8c3b-4d35-bb2d-4f4241e3c42b.jpg)

**Bước 4**
Xác định chi tiết thời gian so sánh giữa manual và automation

![](https://images.viblo.asia/6e13b742-5118-486a-9652-9ce283809410.jpg)

Hi vọng sau bài viết này chúng ta sẽ có được cái nhìn khách quan và chủ động trong những test case của mình

Reference: https://www.softwaretestinghelp.com/manual-to-automation-testing-process-challenges/