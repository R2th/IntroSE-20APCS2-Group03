## **1. Kiểm thử chức năng**

Là một quá trình bao gồm một số tham số kiểm tra như giao diện người dùng, API, kiểm tra cơ sở dữ liệu, kiểm tra bảo mật, kiểm tra máy khách và máy chủ và các chức năng cơ bản của trang web. Kiểm thử chức năng rất thuận tiện và nó cho phép người dùng thực hiện cả kiểm thử thủ công và tự động. Nó được thực hiện để kiểm tra các chức năng của từng tính năng trên trang web.

Hoạt động kiểm tra dựa trên web bao gồm:

### a. Kiểm tra liên kết

Kiểm tra các liên kết trong các trang web của bạn đang hoạt động chính xác và đảm bảo rằng không có liên kết nào bị hỏng.

Các liên kết được kiểm tra sẽ bao gồm:

- Liên kết ngoài trang web

- Liên kết nội bộ

- Liên kết tới các vị trí trong cùng trang

- Liên kết sử dụng để gửi email tới admin/ users

###  b. Kiểm tra Forms
 
Nó bao gồm:

- Kiểm tra các trường của trang hoạt động như mong đợi. Ví dụ: nếu người dùng không nhập vào các trường bắt buộc thì có hiển thị thông báo lỗi hay không?

- Kiểm tra các giá trị mặc định đang được điền.

- Sau khi được gửi, dữ liệu trong các biểu mẫu được gửi đến cơ sở dữ liệu trực tiếp hoặc được liên kết với một địa chỉ email đang hoạt động

- Các form có thân thiện dễ nhìn và dễ thao tác hay không?

### c. Kiểm tra Cookies

 Cookie là các files nhỏ được các trang web sử dụng để chủ yếu ghi nhớ các phiên hoạt động của người dùng nên bạn không cần phải đăng nhập mỗi khi truy cập một trang web. Kiểm tra cookie sẽ bao gồm
 
 • Kiểm tra cookie sẽ bị xóa khi bộ nhớ cache bị xóa hoặc khi chúng hết hạn.
 
• Xóa cookie và kiểm tra xem thông tin đăng nhập được yêu cầu khi bạn truy cập trang web lần sau.

### d. Kiểm tra HTML và CSS

Kiểm tra HTML và css để đảm bảo rằng các công cụ tìm kiếm có thể thu thập dữ liệu trang web của bạn một cách dễ dàng. Điều này sẽ bao gồm:

- Kiểm tra lỗi cú pháp

- Lược đồ màu có thể đọc được

- Tuân thủ tiêu chuẩn. Đảm bảo tuân thủ các tiêu chuẩn như W3C, OASIS, IETF, ISO, ECMA hoặc WS-I.

### e. Kiểm tra business workflow

- Bao gồm:

• Kiểm thử các test case từ khi bắt đằu đến lúc kết thúc, giúp người dùng có thể đi qua theo 1 flow của trang web

• Kiểm thử các test case negative để khi người dùng thực hiện một số bước unexpected thì sẽ thông báo lỗi hoặc có tương tác phù hợp sẽ được hiển thị để người dùng có thể biết khi thao tác.

## 2. Kiểm thử tính khả dụng

Kiểm tra khả năng sử dụng đã trở thành một phần quan trọng của bất kỳ dự án dựa trên web nào. Nó có thể được thực hiện bởi những tester

**Kiểm tra điều hướng trang web:** Menu, nút hoặc Liên kết đến các trang khác nhau trên trang web của bạn phải dễ nhìn thấy và nhất quán trên tất cả các trang

**Kiểm tra nội dung:** Nội dung phải rõ ràng, không có lỗi chính tả hoặc ngữ pháp.

## **3. Kiểm thử giao diện**

3 lĩnh vực sẽ được kiểm thử ở đây là:

**- Ứng dụng, Web Sever và Database Sever**

• **Ứng dụng**: Yêu cầu kiểm thử được gửi chính xác đến Database và đầu ra ở phía client được hiển thị chính xác. Nếu có lỗi trả về thì ứng dụng thì ngay lập tức phải nhận được và cho hiển thị cảnh báo tới người dùng.

• **Web Sever**: là kiểm thử quá trình xử lý tất cả các yêu cầu của ứng dụng mà không xảy ra bất kỳ lỗi nào được trả về.

• **Database Sever**: Đảm bảo các truy vấn được gửi đến cơ sở dữ liệu như kết quả được mong đợi.

Kiểm thử các trường hợp khi kết nối giữa 3 lớp (ứng dụng, web và database) bị ngắt đột ngột do người dùng, hoặc kết nối tới sever bj gián đoạn, bị khởi động lại...

## **4. Kiểm thử Database**

Database là một thành phần quan trọng trong ứng dụng web của bạn và phải kiểm thử kỹ lưỡng. Bao gồm:

•	Nếu có bất kỳ lỗi nào được hiển thị trong khi thực hiện các truy vấn.

•	Tính toàn vẹn dữ liệu được duy trì trong khi tạo, cập nhật hoặc xóa dữ liệu trong database.

•	Kiểm tra thời gian phản hồi của các truy vấn và tinh chỉnh lại nếu cần thiết.

•	Kiểm tra dữ liệu lấy từ database của bạn được hiển thị chính xác trong ứng dụng

## 5. Kiểm thử đám đông

Bạn sẽ chọn một số lượng lớn người (đám đông) để thực hiện các bài kiểm tra mà nếu không thì sẽ thực hiện một nhóm người được chọn trong công ty. Kiểm tra nguồn lực cộng đồng là một khái niệm thú vị và giúp làm sáng tỏ nhiều khiếm khuỵểt chưa được chú ý.

## 6. Kiểm thử Độ tương thích

Kiểm tra khả năng tương thích đảm bảo rằng ứng dụng web hiển thị chính xác trên các thiết bị khác nhau. Bao gồm:

**Kiểm tra khả năng tương thích của trình duyệt:**

Cùng một trang web trong các trình duyệt khác nhau sẽ hiển thị khác nhau. Bạn cần kiểm tra xem ứng dụng web của mình có được hiển thị chính xác trên các trình duyệt hay không, JavaScript, AJAX và xác thực đang hoạt động tốt. Bạn cũng có thể kiểm tra khả năng tương thích trên trình duyệt di động.

Việc hiển thị các phần tử web như nút, trường văn bản, v.v. thay đổi theo sự thay đổi trong Hệ điều hành. Đảm bảo trang web của bạn hoạt động tốt với nhiều hệ điều hành khác nhau như Windows, Linux, Mac và các trình duyệt như Firefox, Internet Explorer, Safari, v.v

## 7. Kiểm thử hiệu năng (Performance)

Kiểm tra hiệu năng sẽ đảm bảo trang web của bạn hoạt động dưới tất cả các tải. Bao gồm các yêu cầu:

•	Thời gian phản hồi của ứng dụng trang web ở các tốc độ kết nối khác nhau

•	Load test ứng dụng web của bạn để xác định hành vi của nó vẫn hoạt động bình thường vào tầm cao điểm.

•	Stress test trang web của bạn để xác định điểm dừng của nó khi được đẩy vượt quá tải bình thường vào tầm cao điểm sẽ ra sao.

•	Kiểm tra xem nếu có sự cố xảy ra do tải cao điểm, làm thế nào để trang web phục hồi sau sự cố đó.

•	Đảm bảo các kỹ thuật tối ưu hóa như nén zip, bộ đệm phía trình duyệt và máy chủ được bật để giảm thời gian tải.

## 8. Kiểm thử bảo mật

Kiểm thử bảo mật là rất quan trọng đối với mỗi trang web thương mại điện tử lưu trữ thông tin khách hàng hoặc thông tin nhạy cảm đó là thẻ tín dụng. Bao gồm:

•	Gõ trực tiếp URL vào thanh địa chỉ của trình duyệt mà không qua đăng nhập. Các trang nội bộ phải được bảo mật.

•	Sau khi đăng nhập và mở các trang nội bộ, thay đổi url trực tiếp bằng cách đổi tham số ID của trang tới trang thuộc quyền người dùng đã đăng nhập khác. Truy cập phải bị từ chối bởi người dùng nàỵ không thể xem trang thống kê của người dùng khác.

•	Không thể tải xuống các tệp bị hạn chế nếu không có quyền truy cập phù hợp

•	Sessions sẽ tự động bị hủy sau khi người dùng không hoạt động trong một thời gian

•	Nhập các giá trị đầu vào không hợp lệ trong các trường Username, Password thì hệ thống phải báo lỗi.

•	Kiểm tra CAPTCHA cho các đăng nhập tự động

•	Tất cả các phiên giao dịch, các thông báo lỗi, các hành vi cố gắng xâm phạm an ninh phải ghi trong log và lưu tại web server.


## Tài liệu tham khảo
https://kienthuctester.blogspot.com/

https://www.guru99.com/web-application-testing.html

https://www.softwaretestinghelp.com/web-application-testing/