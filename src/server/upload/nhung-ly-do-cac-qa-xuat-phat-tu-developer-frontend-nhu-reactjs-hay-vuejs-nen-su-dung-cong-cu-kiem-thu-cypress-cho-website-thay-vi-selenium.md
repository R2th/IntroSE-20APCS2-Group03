### Bảng so sánh những đặc điểm tổng quan cypress và selenium webdriver


| | Selenium webdriver | Cypress |
| -------- | -------- | -------- |
| Phù hợp các loại kiểm thử    | UI     | Integration, UI, (Unit test)     |
| Hỗ trợ các nền tảng trình duyệt    | ![](https://images.viblo.asia/d35b5a01-bf94-4f11-9f2c-71ef07948f32.png)     | ![](https://images.viblo.asia/b864f82e-2ab0-4148-902e-e046e18b3be9.png)     |
| Ngôn ngữ lập trình  |![](https://images.viblo.asia/3548c90f-99f3-41d9-bd08-5e6e9b669bfb.png)|![](https://images.viblo.asia/efb6f7ca-5c95-4f31-a031-115f3f39ace5.png)|
|Tài liệu|![](https://images.viblo.asia/665d2515-d2e6-459e-98e8-a8559b5feef3.png) cực kì khó nhìn|![](https://images.viblo.asia/d32dfd19-a115-48da-b045-ae4c84fde6ad.png)|
|Lịch sử phát triển|Selenium 1 - 2004. Selenium 2 - 2009. Selenium 3 - 2016|cypress bắt đầu từ 2015|
|Kiến trúc|![](https://images.viblo.asia/adbe2d21-c75b-4e21-888b-b64d02f885aa.png) với kiến trúc điều khiển từ xa |![](https://images.viblo.asia/d0c413cd-1adb-4bc2-b8c0-fe31c53204fd.png) dùng trực tiếp trên nền tảng chromium|

### So Sánh tổng hợp
Với ý kiến cá nhân mình rút được những tiêu chí sau:

* Nếu dự án đang chạy reactjs, vuejs hay các công nghệ framework frontend thì việc viết script test case trên cypress là điều phù hợp hơn so với các ngôn ngữ khác như PHP, Java Core...

* Tài liệu sử dụng dễ đọc dễ hiểu là điều cực kì quan trọng ảnh hưởng số lượng người dùng vì cypress làm tốt hơn điều này. 

* Do các trình duyệt web bây giờ không có sự khác biệt nhiều, nếu có là rất nhỏ việc test chạy được trên nền chromium là đủ.

* Những nhược điểm ở senelium webdriver như check ảnh/ video ... thì cypress làm được rất tốt thậm chí tốt thậm chí tốt hơn cả selenium IDE về mặt giao diện khi cần test UI.

* Cypress Setup dễ dàng có thể chia sẻ cho mọi người thấy được kết quả chạy test case, còn selenium thì quá khó khăn để setup

* Cypess có thể làm được cả 3 loại test như test UI hay e2e (người dùng cuối), test tích hợp API thậm chí có thể dùng được Unit test vì Cypress được viết trên nền thư viện `mocha`

* Cypress yêu cầu kĩ năng lập trình cần thiết hơn là selenium và đòi hỏi QA xuất phát điểm là từ developer.

* Cypress có thể chạy test không có giao diện và sẽ ra log kết quả, từ đó có thể tích hợp vào CI/CD khi cần thiết hay tùy mục đích sử dụng.

* Selenium không ghi lại video chạy test UI. Cypress ghi video theo mặc định khi các bài kiểm tra được chạy từ dòng lệnh.

* Cộng đồng thì Selenium vẫn đông đảo hơn nhiều so với Cypress.

* Selenium đi qua một vài trang chỉ để đưa ứng dụng vào trạng thái mong muốn. Với Cypress, chúng ta có thể lập trình đưa ứng dụng về trạng thái mong muốn này.

* Cypress cung cấp `spies`, `stubs` và `clock`. Với các `spies` bạn có thể xác minh xem hàm JavaScript đã cho đã được call hay chưa, với đối số nào hoặc bao nhiêu lần. `stubs` cho phép bạn thay đổi hành vi mặc định của các hàm JavaScript và nguồn cấp dữ liệu cho ứng dụng đang kiểm tra dữ liệu mà chúng ta cần. 

* Cypress cho phép bạn có toàn quyền kiểm soát lưu lượng mạng trong trình duyệt. Chúng ta có thể khẳng định rằng trên XMLHttpRequest với một API, xác minh rằng API được gọi với các đối số phù hợp. Chúng ta có thể chặn, thay đổi, trì hoãn hoặc chặn phản hồi từ API. Điều này cho phép chúng ta tạo ra các kịch bản tích hợp khác nhau nhanh nhất có thể.
 
*  Với Cypress, chúng ta có thể phát triển mặc dù chưa có những module sẵn sàng. Chúng ta có thể thực hiện TDD (phát triển theo hướng kiểm tra), tạo các thử nghiệm và trích xuất dữ liệu từ API bị thiếu trong đó, phát triển giao diện người dùng và sau đó chạy thử nghiệm cho đến khi pass. xác minh rằng API được gọi với các đối số thích hợp.

### Kết luận

Theo quan điểm cá nhân việc sử dung cypress là hoàn toàn mang cho chúng ta có cảm giác muốn được viết test hơn là selenium. Về rộng hơn nếu project của bạn sử dụng cypress này thì cần một quy trình khác thay thế selenium và tận dụng nhiều loại test khác nhau để đạt được hiệu quả tốt nhất vì cypress làm được nhiều loại test nên có thể tiết kiệm chí phí nếu quản lý, áp dụng quy trình tốt cho nó, điều này đáng để thử nghiệm trong thời đại vũ bão 4.0 ngày nay.

facebook: https://www.facebook.com/quanghung997