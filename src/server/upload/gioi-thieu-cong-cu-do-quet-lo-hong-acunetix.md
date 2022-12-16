**Trong việc pentest hay exploit một ứng dụng bên cạnh dựa trên cái đầu của người thực hiện thì việc sử dụng một công cụ dò quét tốt cũng không thể thiếu. Đối với nhiều lỗ hổng phổ biến thì lượng payload để khai thác một hacker nắm giữ có thể không nhiều được như các công cụ, ví dụ như với riêng lỗ hổng SQL Injection thì SQL MAP có được một lượng payload khổng lồ mà hiếm có người khai thác nào có được nhiều hơn. Và trong bài viết này sẽ giới thiệu với các bạn một công cụ để thực hiện việc pentest Web có thể sẽ được thực hiện dễ dàng hơn – Acunetix.**

Acunetix Web Vulnerbility Scanner là một công cụ kiểm tra bảo mật ứng dụng web tự động kiểm tra các ứng dụng web để tìm kiếm lỗ hổng bảo mật như SQL Injection, hay Cross-Site Scripting (XSS),... Nói chung, Acunetix quét bất kỳ trang web hoặc ứng dụng web nào có thể truy cập thông qua trình duyệt web và sử dụng giao thức HTTP / HTTPS.

# Acunetix hoạt động như thế nào?
Theo document của Acunetix thì công cụ này được hoạt động theo luồng chính sau:
1.  Acunetix DeepScan phân tích toàn bộ trang web bằng cách truy vết tất cả các liên
kết trên trang web, bao gồm các liên kết được xây dựng động bằng JavaScript và
các liên kết được tìm thấy trong tệp robots.txt và sitemap.xml (nếu có). Kết quả là
một bản đồ của trang web, mà Acunetix sẽ sử dụng để khởi chạy các kiểm tra được
nhắm mục tiêu đối với từng phần của trang web.

![](https://images.viblo.asia/4c039f5b-25fb-4bc9-8117-7e20ab3cb6b0.png)

2.  Nếu Acunetix AcuSensor Technology (kỹ thuật hỗ trợ dò quét mã nguồn của
Acunetix) được cài đặt, bộ thu thập (sensor) sẽ lấy danh sách tất cả các tệp có trong
thư mục ứng dụng web và thêm các tệp mà trình thu thập thông tin không tìm thấy
vào đầu ra của trình thu thập thông tin. Các tệp như vậy thường không được trình
thu thập thông tin phát hiện vì chúng không thể truy cập được từ máy chủ web
hoặc không được liên kết thông qua trang web chẳng hạn như web.config.
3.  Sau quá trình thu thập dữ liệu, máy quét sẽ giả lập như một hacker, tự động khởi
chạy một loạt các kiểm tra lỗ hổng trên mỗi trang được tìm thấy. Acunetix cũng
phân tích từng trang cho những nơi có thể nhập dữ liệu và sau đó thử tất cả khả
năng đầu vào độc hại. Đây là Giai đoạn quét tự động. Nếu AcuSensor Technology
được bật, các mẫu kiểm tra lỗ hổng bổ sung sẽ được đưa ra đối với trang web.

![](https://images.viblo.asia/a08a2d50-7457-4804-8128-e7dacf487f50.png)

4. Các lỗ hổng được xác định được hiển thị trong Scan Result. Các thông tin về lỗ
hổng như data trong một request POST được sử dụng, mục bị ảnh hưởng, phản hồi HTTP của máy chủ và các thông tin khác được cung cấp chi tiết trong mỗi cảnh báo lỗ hổng. Các thông tin này trong hầu hết trường hợp có thể giúp cho người quản trị có thể dựng lại kịch bản tấn công và dễ dàng vá lỗi hơn, ví dụ như trong lỗ hổng sau của một website.

![](https://images.viblo.asia/bc315f7c-6fdd-42b7-a845-6875780fbdb2.jpg)

5. Nếu AcuSensor Technology được sử dụng, các chi tiết như số dòng mã nguồn dẫn đến lỗ hổng được liệt kê. Các khuyến nghị về cách khắc phục lỗ hổng cũng được hiển thị
6. Sau khi việc dò quét hoàn tất, Acunetix có thể tạo ra các báo cáo như  Executive Summary, Developer report hay các báo cáo tuân theo các tiêu chuẩn PCI DSS hoặc ISO 270001
#  Đánh giá
Cuối cùng của bài viết mình sẽ đưa ra một số ưu điểm và nhược điểm mà trong quá trình sử dụng mình nhận thấy.

### 1. Ưu điểm

* Giao diện website trực quan, dễ sử dụng.
* Có lượng mẫu thử khổng lồ.
* Có kịch bản khai thác tốt, hỗ trợ phát hiện được hầu hết các lỗ hổng web phổ biến.
* Báo cáo cho các lỗ hổng rất chi tiết, cụ thể.
* Giữ lại lịch sử, kết quả rò quét.

### 2. Nhược điểm
* Trong quá trình quét rất tốn RAM và bộ nhớ.
* Khi quét trang web lớn tốn nhiều thời gian, chưa hỗ trợ chức năng tạm dừng, phải chờ đến khi quét xong.
* Là công cụ có phí, không công bố mã nguồn.
* Khó để có thể nghiên cứu sâu, tận dụng nhưng module có sẵn của nó để hỗ trợ cho việc xây dựng một công cụ của bản thân.