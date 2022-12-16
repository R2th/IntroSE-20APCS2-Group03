**Giới thiệu về kiểm tra giao diện:**

Khi một ứng dụng hoặc một phần mềm hoặc một trang web được phát triển, thì có một số thành phần của nó. Những thành phần đó có thể là máy chủ, cơ sở dữ liệu, v.v.

Kết nối tích hợp và tạo điều kiện cho việc giao tiếp giữa các thành phần này được gọi là Giao diện.

Nói một cách đơn giản, giao diện là một phần mềm bao gồm một bộ lệnh, thông điệp, v.v. 

*Hướng dẫn này cung cấp cho bạn một cái nhìn tổng quan đầy đủ về kiểm tra giao diện cùng với nhu cầu, loại, chiến lược, danh sách kiểm tra và một số công cụ của nó trong điều kiện đơn giản để làm phong phú thêm kiến thức của bạn về khái niệm.*

![](https://images.viblo.asia/4d2e1bef-fc83-4e5a-bd7b-c04c3c20002d.jpg)

### **Giới thiệu**

Đối với một máy tính, một giao diện có thể là các API, dịch vụ web, vv Việc giao tiếp giữa các thành phần khác nhau của phần mềm hoặc ứng dụng hoặc trang web có thể ảnh hưởng đến hiệu suất tổng thể, do đó giao tiếp này nghĩa là giao diện cũng cần được kiểm tra và xác minh.

**Việc kiểm tra được thực hiện để xác minh chức năng giao diện được gọi là Kiểm tra giao diện.**

![](https://images.viblo.asia/9dfb0196-7050-4b14-9cc1-5a0717e01fb1.jpg)

**Hai thành phần phổ biến của kiểm tra Giao diện bao gồm:**

Giao diện máy chủ web và máy chủ ứng dụng.

Giao diện máy chủ cơ sở dữ liệu và máy chủ ứng dụng.

**Khi nào và Tại sao chúng ta nên kiểm tra một giao diện?**

![](https://images.viblo.asia/20a5b5ac-c637-4c72-a95c-fe68c9ebc349.jpg)

**Được đề cập dưới đây là 3 giai đoạn kiểm tra Giao diện trong vòng đời của Giao diện:**

*1) Cấu hình và phát triển:*

Khi giao diện được cấu hình và khi quá trình phát triển bắt đầu, các cấu hình cần được xác minh theo yêu cầu.

*2) Xác nhận:*

Khi quá trình phát triển hoàn thành, giao diện cần được xác thực và xác minh, điều này có thể được thực hiện như là một phần của thử nghiệm đơn vị.

*3) Bảo trì:*
Khi toàn bộ phần mềm đã sẵn sàng, triển khai và làm việc, thì giao diện cần phải được theo dõi về hiệu suất của nó và bất kỳ vấn đề mới nào được giới thiệu do những thay đổi được thực hiện hoặc làm giảm hiệu suất.

Khi chúng tôi bắt đầu phát triển một giao diện, chúng tôi cần đảm bảo rằng chúng tôi không giới thiệu bất kỳ lỗi nào trong mã của chúng tôi và do đó các thử nghiệm cần phải được chạy trên giao diện để xác minh rằng việc thêm mã mới không tiêm bất kỳ lỗi mới nào. Điều này sẽ giúp bạn xác định xem giao diện có bị lỗi hay không và theo yêu cầu.

Một khi chúng tôi hài lòng với giao diện, chúng tôi xác nhận nó cho luồng công việc, dữ liệu dự định, vv Chúng tôi có thể chạy hiệu suất, kiểm tra dữ liệu khổng lồ và kiểm tra giao diện đáp ứng tốt như thế nào. Điều này sẽ tiết kiệm rất nhiều thời gian sẽ được chi cho việc sửa lỗi sau này.

**Tóm lại, kiểm tra Giao diện được thực hiện để:**

- Để kiểm tra xem thực thi máy chủ có đúng không.
- Xử lý lỗi được thực hiện đúng cách và các thông báo lỗi thích hợp được hiển thị cho các truy vấn được thực hiện bởi ứng dụng hoặc phần mềm.
- Để kiểm tra kết quả khi kết nối với máy chủ được đặt lại.
- Để kiểm tra khía cạnh bảo mật khi các thành phần giao tiếp với nhau.
- Để kiểm tra tác động của thất bại mạng trên giao tiếp giữa các thành phần.


#### Các loại kiểm tra giao diện
- Kiểm tra giao diện về cơ bản được thực hiện trên lớp nhắn tin của kiến trúc hệ thống. Nó chủ yếu liên quan đến việc kiểm tra REST API hoặc dịch vụ web SOAP với định dạng JSON hoặc XML.

**Kiểm tra giao diện thường bao gồm các thực tiễn sau:**

- **Kiểm tra đơn vị**: Kiểm tra chức năng của từng hoạt động riêng lẻ (trong một hàm).
- **Kiểm tra chức năng** :  Kiểm tra chức năng của các kịch bản rộng hơn liên quan đến việc tạo trường hợp thử nghiệm, xác thực, hồi quy, v.v.
- **Tải thử nghiệm**: Xác nhận hiệu suất dưới tải, chủ yếu là bằng cách sử dụng các trường hợp thử nghiệm chức năng.
- **Kiểm tra an ninh** : Thử nghiệm cơ chế bảo mật và nó bao gồm thử nghiệm thâm nhập cũng như việc chứng thực kiểm soát truy cập, mã hóa, vv
- **Phát hiện lỗi thời gian chạy**: Theo dõi ứng dụng cho các sự cố như cuộc đua thời gian chạy, rò rỉ tài nguyên, v.v.
- **Kiểm tra quy trình làm việc**: Việc này được thực hiện để đảm bảo nếu công cụ giao diện xử lý luồng công việc của bạn như mong đợi.
- **Hệ thống cá nhân**: Thử nghiệm này được thực hiện để xác minh tính cá nhân của từng hệ thống. Giống như hệ thống thanh toán và hệ thống quản lý khoảng không quảng cáo sẽ có thể hoạt động riêng lẻ.

*Bài viết được tham khảo tại: http://www.softwaretestinghelp.com/what-is-interface-testing/*