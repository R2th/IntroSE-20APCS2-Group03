Ở phần trước chúng ta đã biết khái niệm kiểm thử là gì, và một vài loại kiểm thử của Website. Ở phần này chúng ta cùng tìm hiểu nốt 2 loại kiểm thử là Performance testing và Security testing.

### 5. Performance testing - Kiểm thử hiệu năng

![](https://images.viblo.asia/849145ae-a0f4-4f0b-92c4-9d861ac4c4e5.jpg)
*Nguồn: bizflycloud*

Performance Testing là một loại kiểm thử nhằm xác định mức độ đáp ứng, băng thông, độ tin cậy và/hoặc khả năng mở rộng của hệ thống dưới một khối lượng làm việc/truy cập nhất định. Kiểm thử hiệu năng website nên bao gồm:
* Web load testing
* Web Stress testing


**Web Load testing:** Bạn cần phải xác định được - Nếu có nhiều người đồng thời cùng truy cập vào một màn hình, thì hệ thống có thể duy trì sự ổn định được không?. Trang web phải xử lý  được nhiều yêu cầu của người dùng cùng một thời điểm, dữ liệu đầu vào lớn, kết nối đồng thời với DB, những trang cụ thể phải tải nội dung nặng.. v.v.

**Web Stress testing:** Stress dịch thô là áp lực, trong phương pháp kiểm thử này bạn cần duy trì những áp lực cần thiết lên trang web của bạn dựa vào giới hạn mà website đang có từ tài liệu. 

Ví dụ trang web của bạn chịu được trọng tải 100 người sử dụng, thì bạn cần test đồng thời 100 người cùng truy cập và hoạt động trên website mình và đảm bảo rằng không có lỗi gì xảy ra với từng thao tác của mỗi user.

Stress test được thực hiện nhằm phá vỡ trang web bằng cách gây áp lực và kiểm tra xem hệ thống phản ứng thế nào với những áp lực đó và cách nó hồi phục như thế nào. Những áp lực thường được đặt vào những trang web thường xuyên có lượng truy cập lớn, đăng nhập đăng ký, trang chủ... 

Trong kiểm thử hiệu năng website, nên được thực hiện trên nhiều môi trường khác nhau như: những trình duyệt khác nhau, những hệ điều hành khác nhau, phần cứng khác nhau... 

**Connection speed:** Kiểm thử kết nối của trang web trên nhiều kết nối internet khác nhau như: Dial-up, ADSL... Nên lưu ý khi kiểm thử hiệu năng website trên các tốc độ truy cập internet khác nhau.


LƯU Ý:

**Load:** 
1. Số lượng người truy cập cùng một thời điểm.
2. Kiểm tra truy cập ở cao điểm và cách hệ thống website đối mặt với nó.
3. Một lượng lớn dữ liệu kết nối từ người dùng.

**Stress:**
1. Tải website liên tục.
2. Hiệu suất của CPU, bộ nhớ, truy cập file...



### 6. Security Testing - Kiểm thử bảo mật

Sau đây là một số trường hợp cần kiểm tra trong kiểm thử bảo mật mà bạn nên biết:

* Kiểm tra xem truy cập trực tiếp liên kết nội bộ bằng URL mà không cần đăng nhập thì có thể truy cập hay không (Dùng URL trực tiếp để truy cập ẩn danh).
* Thử truy cập liên kết nội bộ của người dùng khác xem có được không. Ví dụ: bạn đăng nhập vào hệ thống và có profile là /uid12345. Sau đó bạn dùng tài khoản khác có uid khác và thử truy cập vào /uid12345 xem có được không. Theo kinh nghiệm cho thấy rất nhiều bug xảy ra với vấn đề này.
* Thử nhập dữ liệu xấu, không đúng ở những trường user name / password / tìm kiếm thử xem hệ thống xử lý như thế nào. Và hãy chắc chắn là không có những lỗi như lộ dữ liệu kín của người dùng khác ra khung tìm kiếm.
* Những đường dẫn thư mục hoặc file cá nhân không thể truy cập trực tiếp từ URL.
* Kiểm tra mã CAPTCHA có thể vượt qua mà không cần nhập hoặc xác nhận không.
* Kiểm tra chứng chỉ SSL có được chứng thực cho website không.
* Tất cả những giao dịch, thông báo lỗi, cố gắng vi phạm bảo mật đều được ghi log lại trên Server hoặc đâu đó.

![](https://images.viblo.asia/dbfb6038-554d-40d3-a80e-a0aeaade488f.png)
Nguồn: qacamp

Lý do chính để kiểm thử bảo mật của web là xác định ra được các lỗ hổng tiềm ẩn và sửa chữa chúng. 
* Kiểm tra các kết nối mạng.
* Kiểm tra các lỗ hổng.
* Mật khẩu có thể bị bẻ khóa không.
* Xem lại Log từ server để đối phó với từng lỗi nhỏ về rò rỉ bảo mật.
* Xác nhận tính toàn vẹn của dữ liệu người dùng.
* Dò được virus gây hại cho hệ thống.


quan trọng của hệ thống, nhất là đối với những trang web sử dụng dữ liệu cá nhân của người dùng. Bất kỳ sơ hở nào cũng có thể gây tổn hại lớn cho website cũng như người dùng, ảnh hưởng tới bộ mặt và tổn hại của website. Nên kiểm tra bảo mật cần được tuân thủ theo một hệ thống quy tắc rõ ràng và đầy đủ.

---

Phần 1: https://viblo.asia/p/kiem-thu-website-la-gi-p1-WAyK8ono5xX

---

Nguồn: https://www.softwaretestinghelp.com/web-application-testing/

https://viblo.asia/p/su-khac-nhau-giua-performance-test-load-test-va-stress-test-gGJ59gQJZX2