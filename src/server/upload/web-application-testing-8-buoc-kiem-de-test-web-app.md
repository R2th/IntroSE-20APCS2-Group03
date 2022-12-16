Trước khi đi vào chi tiết hơn về loại test web, chúng ta hãy nhanh chóng xác định test web nhé.
 
# Web tesing là gì?
Web testing đơn giản là kiểm tra ứng dụng web của bạn để tìm các lỗi tiềm ẩn trước khi được đưa vào đời sống hoặc trước khi code được chuyển vào môi trường sản xuất (môi trường thật).

Trong giai đoạn này, các vấn đề như bảo mật ứng dụng web, chức năng của trang web, khả năng tiếp cận cho người khuyết tật cũng như người dùng thông thường và khả năng xử lý lưu lượng truy cập được kiểm tra.

# Danh sách kiểm tra ứng dụng web:
Một số hoặc tất cả các loại test sau đây có thể được thực hiện tùy thuộc vào yêu cầu test web của bạn.

## 1. Kiểm tra chức năng:
Điều này được sử dụng để kiểm tra xem sản phẩm của bạn có tuân theo các đặc điểm kỹ thuật bạn dự định cho nó cũng như các yêu cầu chức năng mà bạn đã vạch ra cho nó trong tài liệu phát triển của bạn hay không. Hoạt động kiểm tra bao gồm:

Kiểm tra tất cả các liên kết trong các trang web của bạn đang hoạt động chính xác và đảm bảo không có liên kết nào bị hỏng. Các liên kết được kiểm tra sẽ bao gồm:
- Liên kết ngoài
- Liên kết nội bộ
- Anchor Links
- Liên kết MailTo

**Test Forms** đang hoạt động như mong đợi. Bao gồm:

* Kiểm tra kịch bản trên form đang hoạt động như mong đợi. Ví dụ: nếu người dùng không điền vào trường bắt buộc trong form, thông báo lỗi sẽ hiển thị.
* Kiểm tra các giá trị mặc định đang được phổ biến
* Sau khi được gửi, dữ liệu trong form được gửi đến cơ sở dữ liệu trực tiếp hoặc được liên kết với địa chỉ email đang hoạt động
* Form được định dạng tối ưu để dễ đọc hơn

**Test Cookies** đang hoạt động như mong đợi. Cookie là các tệp nhỏ được các trang web sử dụng để chủ yếu nhớ các phiên người dùng đang hoạt động, do đó bạn không cần phải đăng nhập mỗi khi bạn truy cập một trang web. Kiểm tra cookie sẽ bao gồm:

* Kiểm tra cookie (phiên) sẽ bị xóa khi bộ nhớ cache bị xóa hoặc khi chúng hết hạn.
* Xóa cookie (phiên) và kiểm tra thông tin xác thực đăng nhập được yêu cầu khi bạn truy cập trang web lần sau.

**Kiểm tra HTML và CSS** để đảm bảo rằng các công cụ tìm kiếm có thể thu thập thông tin trang web của bạn dễ dàng. Bao gồm:

* Kiểm tra lỗi cú pháp
* Các lược đồ màu có thể đọc được
* Tuân thủ tiêu chuẩn. Đảm bảo các tiêu chuẩn như W3C, OASIS, IETF, ISO, ECMA hoặc WS-I được tuân theo.

**Test business workflow**- Bao gồm:

* Kiểm tra theo workflow end - to - end hoặc kịch bản của bussiness để đưa người dùng thông qua một loạt các trang web để hoàn thành.
* Kiểm tra các tình huống tiêu cực, chẳng hạn khi người dùng thực hiện một bước không mong muốn, thông báo lỗi thích hợp hoặc trợ giúp được hiển thị trong ứng dụng web của bạn.

***Các công cụ có thể được sử dụng: QTP, IBM Rational, Selenium.***

## 2. Kiểm tra khả năng sử dụng (Usability Testing):
**Usability Testing** hiện đã trở thành một phần quan trọng của bất kỳ dự án dựa trên web. Nó có thể được thực hiện bởi những người thử nghiệm (Tester) hoặc một nhóm tập trung nhỏ tương tự như đối tượng mục tiêu của ứng dụng web.

Test Navigation:

* Các menu, nút hoặc Liên kết đến các trang khác nhau trên trang web của bạn phải dễ dàng hiển thị và nhất quán trên tất cả các trang web

**Kiểm tra nội dung**:
* Nội dung phải dễ đọc không có lỗi chính tả hoặc ngữ pháp.
* Hình ảnh nếu có nên phải chứa một văn bản "alt"

***Các công cụ có thể được sử dụng: Chalkmark, Clicktale, Clixpy and Feedback Army***

## 3. Interface Testing:
Ba lĩnh vực cần kiểm tra ở đây là - Ứng dụng, Web và Máy chủ cơ sở dữ liệu (Database Server)

* Ứng dụng: Yêu cầu kiểm tra được gửi chính xác đến Cơ sở dữ liệu và đầu ra ở phía máy khách được hiển thị chính xác. Sai sót nếu có phải được bắt được bởi ứng dụng và phải được chỉ hiển thị cho người quản trị chứ không phải là người dùng cuối.
* Web Server: Kiểm tra máy chủ Web đang xử lý tất cả các yêu cầu ứng dụng mà không có bất kỳ sự từ chối nào của dịch vụ.
* Database server: Đảm bảo các truy vấn được gửi tới cơ sở dữ liệu sẽ cung cấp kết quả mong đợi.
* Kiểm tra hệ thống phản ứng khi kết nối giữa ba lớp (Ứng dụng, Web và Cơ sở dữ liệu) không thể được thiết lập và thông báo thích hợp được hiển thị cho người dùng cuối.

***Các công cụ có thể được sử dụng: AlertFox, Ranorex***

## 4. Kiểm tra cơ sở dữ liệu:
Cơ sở dữ liệu là một thành phần quan trọng của ứng dụng web và xin nhấn mạnh là phải được đặt để kiểm tra kỹ lưỡng. Các hoạt động kiểm tra sẽ bao gồm:

* Kiểm tra nếu có bất kỳ lỗi nào được hiển thị trong khi thực hiện truy vấn
* Tính toàn vẹn dữ liệu được duy trì trong khi tạo, cập nhật hoặc xóa dữ liệu trong cơ sở dữ liệu.
* Kiểm tra thời gian phản hồi của các truy vấn và tinh chỉnh chúng nếu cần.
* Dữ liệu thử nghiệm được truy xuất từ cơ sở dữ liệu của bạn được hiển thị chính xác trong ứng dụng web của bạn

***Các công cụ có thể được sử dụng: QTP, Selenium***

## 5. Kiểm tra khả năng tương thích.
Kiểm tra khả năng tương thích đảm bảo rằng ứng dụng web của bạn hiển thị chính xác trên các thiết bị khác nhau. Bao gồm:

* Kiểm tra tương thích trình duyệt: Cùng một trang web trong các trình duyệt khác nhau sẽ hiển thị khác nhau. Bạn cần kiểm tra xem ứng dụng web của bạn có đang được hiển thị chính xác trên các trình duyệt, JavaScript, AJAX hay không và xác thực đang hoạt động tốt. Bạn cũng có thể kiểm tra khả năng tương thích với trình duyệt di động.

* Việc hiển thị các yếu tố web như nút, trường văn bản, vv thay đổi với sự thay đổi trong Hệ điều hành. Đảm bảo trang web của bạn hoạt động tốt cho các kết hợp khác nhau của Hệ điều hành như Windows, Linux, Mac và Trình duyệt như Firefox, Internet Explorer, Safari, v.v.**

***Các công cụ có thể được sử dụng: NetMechanic***

## 6. Kiểm tra hiệu suất (Performance Testing):
Điều này sẽ đảm bảo trang web của bạn hoạt động dưới mọi lần tải. Các hoạt động kiểm tra sẽ bao gồm nhưng không giới hạn:

* Thời gian phản hồi ứng dụng trang web ở các tốc độ kết nối khác nhau
* Tải ứng dụng web của bạn để xác định hành vi của nó dưới tải bình thường và cao điểm
* Stress test trang web của bạn để xác định điểm ngắt của nó khi được đẩy ra ngoài tải trọng bình thường vào thời gian cao điểm.
* Kiểm tra xem sự cố có xảy ra do tải trọng cao điểm hay không, cách trang web khôi phục từ sự kiện như vậy
* Đảm bảo các kỹ thuật tối ưu hóa như nén, zip, trình duyệt và bộ nhớ cache phía máy chủ được bật để giảm thời gian tải

***Các công cụ có thể được sử dụng: Loadrunner, JMeter***

## 7. Kiểm tra an ninh (Security testing):
Kiểm tra bảo mật là yếu tố quan trọng đối với trang web thương mại điện tử lưu trữ thông tin khách hàng nhạy cảm như thẻ tín dụng. Hoạt động kiểm tra sẽ bao gồm:

* Kiểm tra không được phép truy cập trái phép vào các trang bảo mật
* Không thể tải xuống các tệp bị hạn chế mà không có quyền truy cập thích hợp
* Các phiên kiểm tra sẽ tự động bị hủy sau khi người dùng không hoạt động kéo dài
* Khi sử dụng chứng chỉ SSL, trang web sẽ chuyển hướng lại đến các trang SSL được mã hóa.

***Các công cụ có thể được sử dụng: Babel Enterprise, BFBTester và CROSS***

## 8. Kiểm tra đám đông:
Bạn sẽ chọn một số lượng lớn người (đám đông) để thực hiện các kiểm tra hoặc sẽ được thực hiện một nhóm người được chọn trong công ty. Kiểm tra cộng đồng là một khái niệm thú vị và mới mẻ và giúp làm sáng tỏ nhiều lỗi không được chú ý.

Công cụ có thể được sử dụng: Người như bạn và tôi !!!. Và có, những trách nhiệm của họ!

Điều này kết luận gần như tất cả các loại kiểm tra trên đều áp dụng cho ứng dụng web của bạn.

Là một Tester- Web, điều quan trọng cần lưu ý là việc kiểm tra web là một quá trình khó khăn và bạn nhất định phải gặp nhiều trở ngại. Một trong những vấn đề lớn mà bạn sẽ phải đương đầu là áp lực về thời gian hoàn thành. Mọi thứ luôn cần thiết ngày hôm qua! Số lần code thay đổi cũng khá gây mệt mỏi. Hãy chắc chắn rằng bạn lập kế hoạch công việc của bạn và biết rõ những gì được mong đợi của bạn. Tốt nhất là xác định tất cả các nhiệm vụ liên quan đến kiểm tra web của bạn và sau đó tạo một biểu đồ công việc cho các ước tính và lập kế hoạch chính xác.

Nguồn: https://www.guru99.com/web-application-testing.html