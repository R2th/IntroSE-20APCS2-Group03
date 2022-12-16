## Kiểm thử web là gì?
Kiểm thử web , hoặc kiểm thử trang web là kiểm tra ứng dụng web hoặc trang web của bạn để tìm các lỗi tiềm ẩn trước khi nó được đưa vào hoạt động và người dùng có thể truy cập được. Kiểm thử chức năng, khả năng sử dụng, bảo mật, khả năng tương thích, hiệu suất của ứng dụng web hoặc trang web.

Trong giai đoạn này, các vấn đề như bảo mật ứng dụng web, hoạt động của trang web, quyền truy cập của nó đối với người dùng và khả năng xử lý lưu lượng truy cập sẽ được kiểm tra.

## Cách kiểm thử Ứng dụng Web
Trong Kỹ thuật phần mềm, các loại / kỹ thuật kiểm thử sau có thể được thực hiện tùy thuộc vào yêu cầu kiểm tra web của bạn.

### 1. Functionality Testing - Kiểm thử chức năng của một trang web
Kiểm thử chức năng của một trang web là một quá trình bao gồm một số tham số như giao diện người dùng, API, kiểm tra cơ sở dữ liệu, kiểm tra bảo mật, kiểm tra máy khách và máy chủ và các chức năng cơ bản của trang web. Kiểm thử chức năng rất thuận tiện và nó cho phép người dùng thực hiện cả kiểm thử thủ công và tự động. Nó được thực hiện để kiểm tra các chức năng của từng tính năng trên trang web.

Hoạt động kiểm thử dựa trên web bao gồm:

**Kiểm tra** tất cả **các liên kết** trong các trang web của bạn đang hoạt động chính xác và đảm bảo rằng không có liên kết nào bị lỗi. Các link được kiểm tra sẽ bao gồm:

* Outgoing links
* Internal links
* Anchor Links
* MailTo Links

**Test Forms - Các biểu mẫu kiểm thử** đang hoạt động như mong đợi. Điều này sẽ bao gồm-

* Kiểm tra kịch bản trên form đang hoạt động như mong đợi. 

  Ví dụ - nếu người dùng không điền vào trường bắt buộc trong form, thông báo lỗi sẽ được hiển thị.
* Kiểm tra các giá trị mặc định đang được điền
* Sau khi được gửi, dữ liệu trong các form được gửi đến cơ sở dữ liệu trực tiếp hoặc được liên kết với một địa chỉ email đang hoạt động
* Form được định dạng tối ưu để dễ đọc hơn


Kiểm tra **Cookie** đang hoạt động như mong đợi. Cookie là các tệp nhỏ được các trang web sử dụng chủ yếu để ghi nhớ các phiên hoạt động của người dùng, do đó bạn không cần phải đăng nhập mỗi khi truy cập một trang web. Kiểm tra cookie sẽ bao gồm

* Các cookie (phiên) sẽ bị xóa khi bộ nhớ cache bị xóa hoặc khi chúng hết hạn.
* Xóa cookie (phiên) và kiểm tra xem thông tin đăng nhập được yêu cầu khi bạn truy cập trang web lần sau.

Kiểm tra **HTML và CSS** để đảm bảo rằng các công cụ tìm kiếm có thể thu thập dữ liệu trang web của bạn một cách dễ dàng. Điều này sẽ bao gồm

* Kiểm tra lỗi cú pháp - Syntax Errors.
* Color Schemas có thể đọc.
* Tuân thủ tiêu chuẩn. Đảm bảo tuân thủ các tiêu chuẩn như W3C, OASIS, IETF, ISO, ECMA hoặc WS-I.

Kiểm tra **business workflow** - Điều này sẽ bao gồm

* Kiểm tra các kịch bản quy trình làm việc / kinh doanh từ đầu đến cuối của bạn, điều này sẽ đưa người dùng đi qua một loạt các trang web để hoàn thành.
* Cũng thử nghiệm các tình huống tiêu cực, chẳng hạn như khi người dùng thực hiện một bước không mong muốn, thông báo lỗi hoặc trợ giúp thích hợp sẽ hiển thị trong ứng dụng web của bạn.

> **Các công cụ có thể được sử dụng : QTP , IBM Rational, Selenium**

## 2. Usability testing - Kiểm thử khả năng sử dụng :
Kiểm thử khả năng sử dụng hiện đã trở thành một phần quan trọng của bất kỳ dự án dựa trên web nào. Nó có thể được thực hiện bởi những Tester như bạn hoặc một nhóm nhỏ tập trung tương tự như đối tượng mục tiêu của ứng dụng web.

### Kiểm tra Điều hướng trang web :

Menu, button hoặc Link đến các trang khác nhau trên trang web của bạn phải dễ nhìn thấy và nhất quán trên tất cả các trang

### Kiểm tra các nội dung :

* Nội dung phải rõ ràng, không có lỗi chính tả hoặc ngữ pháp.
* Hình ảnh nếu có phải chứa "alt"

> **Các công cụ có thể được sử dụng : Chalkmark, Clicktale, Clixpy và Feedback Army**

## 3. Interface Testing - Kiểm thử giao diện :

Ba lĩnh vực sẽ được kiểm tra ở đây là - Ứng dụng, Web và Cơ sở dữ liệu

* **Ứng dụng**: Các yêu cầu được gửi chính xác đến Cơ sở dữ liệu và kết quả đầu ra ở phía Client được hiển thị chính xác. Các lỗi nếu có phải được ứng dụng phát hiện và chỉ được hiển thị cho quản trị viên chứ không phải người dùng cuối.
* **Web** : Web thử nghiệm đang xử lý tất cả các yêu cầu ứng dụng mà không có bất kỳ sự từ chối dịch vụ nào.
* **Cơ sở dữ liệu**: Đảm bảo các truy vấn được gửi đến cơ sở dữ liệu cho kết quả mong đợi.

**Phản hồi của hệ thống** khi **không thể thiết lập kết nối giữa ba lớp** (Ứng dụng, Web và Cơ sở dữ liệu) và thông báo thích hợp được hiển thị cho người dùng cuối.
> **Các công cụ có thể được sử dụng : AlertFox, Ranorex**

## 4. Database Testing - Kiểm thử cơ sở dữ liệu:
Cơ sở dữ liệu là một thành phần quan trọng của ứng dụng web của bạn và bạn phải tập trung để kiểm tra nó một cách kỹ lưỡng. Các hoạt động kiểm thử sẽ bao gồm-

* Kiểm tra xem có lỗi nào được hiển thị trong khi thực hiện truy vấn không
* Tính toàn vẹn của dữ liệu được duy trì trong khi tạo, cập nhật hoặc xóa dữ liệu trong cơ sở dữ liệu.
* Kiểm tra thời gian phản hồi của các truy vấn và tinh chỉnh chúng nếu cần thiết.
* Dữ liệu thử nghiệm được truy xuất từ cơ sở dữ liệu được hiển thị chính xác trong ứng dụng web của bạn
> **Các công cụ có thể được sử dụng : QTP , Selenium**

## 5. Compatibility testing - Kiểm thử khả năng tương thích.
Kiểm thử khả năng tương thích đảm bảo rằng ứng dụng web của bạn hiển thị chính xác trên các thiết bị khác nhau. Điều này sẽ bao gồm-

**Kiểm tra tính tương thích của trình duyệt** : Cùng một trang web trong các trình duyệt khác nhau sẽ hiển thị khác nhau. Bạn cần kiểm tra xem ứng dụng web của mình có được hiển thị chính xác trên các trình duyệt hay không, JavaScript, AJAX và xác thực đang hoạt động tốt. Bạn cũng có thể kiểm tra khả năng tương thích của trình duyệt di động .

Việc hiển thị các phần tử web như button, text fields, v.v. thay đổi theo sự thay đổi trong Hệ điều hành . Đảm bảo trang web của bạn hoạt động tốt với nhiều hệ điều hành khác nhau như Windows, Linux, Mac và các trình duyệt như Firefox, Internet Explorer, Safari, v.v.

> **Các công cụ có thể được sử dụng : NetMechanic**

## 6. Performance Testing - Kiểm thử hiệu suất:
Điều này sẽ đảm bảo trang web của bạn hoạt động dưới mọi tải. Các hoạt động Kiểm thử phần mềm sẽ bao gồm nhưng không giới hạn -

* Thời gian phản hồi của ứng dụng trang web ở các tốc độ kết nối khác nhau
* Kiểm tra tải - Load test ứng dụng web của bạn để xác định hành vi của nó trong điều kiện tải bình thường và cao điểm
* Kiểm tra căng thẳng - Stress test trang web của bạn để xác định điểm ngắt của nó khi được đẩy lên quá tải bình thường vào thời gian cao điểm.
* Kiểm tra xem có sự cố xảy ra do tải cao điểm hay không, làm cách nào để trang web phục hồi sau sự kiện như vậy
* Đảm bảo các kỹ thuật tối ưu hóa như nén gzip, trình duyệt và bộ đệm ẩn phía máy chủ được bật để giảm thời gian tải
> **Các công cụ có thể được sử dụng : Loadrunner , JMeter**

## 7. Security testing - Kiểm thử bảo mật:
Kiểm thử bảo mật là rất quan trọng đối với trang web thương mại điện tử lưu trữ thông tin khách hàng nhạy cảm như thẻ tín dụng. Hoạt động kiểm thử sẽ bao gồm-

* Kiểm tra quyền truy cập trái phép vào các trang an toàn không được phép
* Các tệp bị hạn chế sẽ không thể tải xuống được nếu không có quyền truy cập thích hợp
* Các phiên kiểm tra sẽ tự động bị ngắt sau khi người dùng không hoạt động trong thời gian dài
* Khi sử dụng chứng chỉ SSL, trang web phải chuyển hướng lại các trang SSL được mã hóa.
>  **Các công cụ có thể được sử dụng : Babel Enterprise, BFBTester và CROSS**

## 8. Crowd Testing - Kiểm thử đám đông:
Bạn sẽ chọn một số lượng lớn người (đám đông) để thực hiện các bài kiểm tra mà nếu không sẽ được thực hiện bởi một nhóm người được chọn trong công ty. Thử nghiệm nguồn lực cộng đồng là một khái niệm thú vị và sắp ra mắt và giúp làm sáng tỏ nhiều khiếm khuyết chưa được chú ý.

> **Các công cụ có thể được sử dụng : Những người như bạn và tôi !!!.**

## Kết luận.
Là một người kiểm thử web, điều quan trọng cần lưu ý là kiểm thử web là một quá trình khá gian khổ và bạn chắc chắn sẽ gặp phải nhiều trở ngại. Một trong những vấn đề lớn bạn sẽ phải đối mặt tất nhiên là áp lực về thời hạn .Hãy chắc chắn rằng bạn lên kế hoạch cho công việc của mình và biết rõ ràng những gì mong đợi ở bạn. Tốt nhất hãy xác định tất cả các nhiệm vụ liên quan đến kiểm thử web của bạn và sau đó tạo một biểu đồ công việc để ước tính và lập kế hoạch chính xác ..



> *Bài viết được dịch lại từ nguồn: https://www.guru99.com/web-application-testing.html*