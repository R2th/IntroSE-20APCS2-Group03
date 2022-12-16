## Kiểm thử website là gì?
Kiểm thử web là tên gọi được đặt cho một quá trình kiểm thử phần mềm chủ yếu vào việc kiểm tra các vận dụng web. Ứng dụng web cần được kiểm tra hoàn toàn trước khi đi vào hoạt động, điều này có thể giúp giải quyết các vấn đề trong vận dụng website trước khi tiếp xúc với người dùng như các vấn đề về tính năng, bảo mật, các vấn đề dịch vụ web, các vấn đề tích hợp và khả năng xử lý lưu lượng truy cập, trong quá trình kiểm thử website, cần cố gắng phát hiện ra lỗi có thể xảy ra trong nền tảng nhằm giải quyết kịp thời.
![](https://images.viblo.asia/1e09df0d-53e3-4bca-8cbf-fb118efc5b42.jpg)
Hiểu theo một cách đơn giản thì kiểm thử web chính là kiểm tra xem ứng dụng website có chứa những lỗi tiềm tàng nào không, trước khi chính thức mang website đi vào sử dụng. Đây là một công việc liên quan đến lập trình web app, các khâu cần kiểm thử đó là bảo mật, tính năng, khả năng xử lý lưu lượng, hiệu suất trang website.

Nhu cầu dùng internet của mọi người ngày càng tăng cao, thành ra việc thiết kế web (ứng dụng web) cũng phát triển rất mạnh mẽ. Website ngày càng đóng vai trò quan trọng trong thương mại điện tử, bàn luận thông tin, tiêu khiển, thư giãn, giới thiệu,… mong muốn thiết kế web có hiệu suất sử dụng cao, thì khi sau thiết kế xong, cần phải kiểm thử trang web đó thật cẩn thận, chặt chẽ. Hôm nay ATP SOFOFTWARE sẽ gửi đến các bạn các khâu trong quy trình kiểm thử website.

## Quy trình kiểm thử website cần làm
### Functionality Testing – Kiểm thử chức năng website
Trong kiểm thử chức năng ( Functionality Testing) chúng ta cần test từng thành phần hoạt động có giống như mong muốn hay không, vì vậy nó còn được gọi là “kiểm thử các thành phần”. Kiểm thử chức năng giúp test các tính năng của thành phần ứng dung, về cơ bản là để kiểm tra các chức năng được đề cập trong tài liệu mô tả tính năng cũng giống như kiểm tra xem ứng dụng phần mềm có giải quyết được kỳ vọng của người sử dụng hay không.

Các hoạt động kiểm thử này bao gồm:
1. Kiểm thử liên kết
Đây là bước kiểm tra tất cả các liên kết hỏng trên website và tất cả các liên kết đang hoạt động chính xác, bạn có thể kiểm tra các liên kết khác nhau trên website của mình:

* Liên kết nội bộ
* Liên kết ngoài
* Liên kết mail
* Liên kết anchor

2. Kiểm thử web form
Đây là phần thiết yếu của bất kỳ kiểm thử website nào, mục tiêu chính của kiểm thử web form là lấy thông tin từ người sử dụng và lưu trữ vào cơ sở dữ liệu đồng thời tương tác với lượng dữ liệu ấy. Dưới đây là các trường hợp kiểm thử được nhắc tới trong kiểm thử web form:

* Điều đầu tiên là kiểm tra tính hợp lệ trên mỗi field của form, dưới đây là hai loại Validation cần được xem xét – “Client side” và “Server side” validations.
* Kiểm tra các giá trị mặc định.
* Kiểm tra tất cả các field bắt buộc.
* Kiểm tra nếu người dùng không nhập vào một field bắt buộc cần hiển thị một thông báo.
* Thêm và sửa thông tin bằng cách sử dụng form.
* Thứ tự các tab trên web form.
* Kiểm tra các giá trị mặc định của field.
* Form cần được định dạng tối ưu khả năng đọc.
* Kiểm tra số âm.

3. Kiểm thử cookie
Cookie là tập tin chứa thông tin hệ thống của người dùng, các tệp này được lưu ở vị trí mong muốn và được sử dụng bởi các trình duyệt. Các session đăng nhập, thông tin được lưu lại trong cookie (như session) và có thể được truy xuất cho các trang website. Người dùng có thể kích hoạt hoặc vô hiệu Cookies trong các tùy chọn trình duyệt, kiểm thử để test xem cookie có được lưu trữ trong máy của họ ở định dạng mã hóa hay không.

* Kiểm tra ứng dụng bằng cách vô hiệu cookies .
* Kiểm tra ứng dụng sau khi hỏng các cookies.
* Kiểm tra hành vi của ứng dụng sau khi xóa tất cả cookie trên website.
* Kiểm tra cookie có hoạt động trên nhiều duyệt khác nhau hay không.
* Kiểm tra cookie cho đăng nhập xác thực có hoạt động hay không.
* Kiểm tra hành vi của ứng dụng sau khi xoá cookie (session) bằng cách xoá bộ nhớ cache hoặc sau khi cookie hết hạn.
* Kiểm tra đăng nhập vào ứng dụng sau khi xóa cookie (session).

4. Kiểm thử HTML và CSS
Kiểm thử này kiểm tra xem các công cụ tìm kiếm có thể thu thập dữ liệu trang web của bạn mà không xảy ra bất kỳ lỗi nào, bạn nên kiểm tra tất cả các lỗi cú pháp, màu sắc và tuân thử theo tiêu chuẩn như W3C, ISO, ECMA, IETF, WS-I, OASIS.

Quy trình nghiệp vụ bao gồm:

* Kiểm tra luồng xử lý đảm bảo sự hoàn chỉnh của website.
* Kiểm tra các màn hình theo như tài liệu yêu cầu.

### Usability testing – Kiểm thử khả năng sử dụng website
Đóng một vai trò quan trọng trong bất kỳ ứng dụng web, Usability testing đảm bảo kiểm tra tất cả các test case xuất phát từ người dùng. Bao gồm:

1. Kiểm tra điều hướng website
* Tất cả các tùy chọn như UI/UX, menu, liên kết hoặc các button trên website phải hiển thị và có thể truy cập.
* Điều hướng trang web dễ dàng sử dụng .
* Nội dung hướng dẫn phải rõ ràng và phải đáp ứng được mục đích.
* Tất cả tùy chọn trên header, footer và các điều hướng trái / phải phải nhất quán trên mỗi trang.
2. Kiểm tra nội dung website
* Nội dung trang web phải không bị mắc lỗi chính tả hoặc lỗi ngữ pháp trong nội dung.
* Tích hợp Alt trong hình ảnh và phải không có ảnh hỏng.
* Xác nhận tính hợp lệ tất cả giao diện người dùng.
* Thực hiện theo một số tiêu chuẩn về xây dựng nội dung trên trang web.
* Tất cả nội dung phải rõ ràng và dễ hiểu.
* Màu tối gây bất bình cho người sử dụng, vì vậy tránh sử dụng theme màu tối.
* Kích thước hình ảnh phải phù hợp, Anchor test phải hoạt động bình thường…

![](https://images.viblo.asia/06541bb3-58fe-4741-a0e7-f11c5b69e9a8.png)

### Kiểm thử sự tương thích
Đảm bảo làm thế nào vận dụng làm việc trong các môi trường được hỗ trợ, sử dụng ứng dụng web trên các hệ điều hành khác nhau, khả năng tương thích của trình duyệt, khả năng tính toán của phần cứng, cơ sở dữ liệu và khả năng xử lý băng thông mạng. Kiểm thử tương thích đảm bảo rằng “ứng dụng web có hiển thị đúng trên các thiết bị khác nhau không?”. Điều này sẽ bao gồm:
![](https://images.viblo.asia/09686d78-b34c-4648-a10e-194182d9c0f6.jpg)

Một thiết kế website chuyên nghiệp phải đảm bảo sự tương thích trên mọi trình duyệt. Vì vậy, Kiểm thử website về sự tương thích đảm bảo làm thế nào để ứng dụng làm việc trong các môi trường được hỗ trợ. Sử dụng ứng dụng web trên các hệ điều hành khác nhau. Khả năng tương thích của trình duyệt, khả năng tính toán của phần cứng, cơ sở dữ liệu và khả năng xử lý băng thông mạng…Kiểm thử tương thích giúp đảm bảo các ứng dụng thiết kế trang web có  hiển thị đúng trên các thiết bị hay không. Bạn cần đảm bảo rằng các ứng dụng của bạn đang được hiển thị cũng như kiểm tra AJAX, JavaScript và xác thực hoạt động chính xác.

### Kiểm thử cơ sở dữ liệu
Độ tin cậy của dữ liệu là một phần cần thiết trong việc kiểm thử cơ sở dữ liệu. Do vậy, đối với các ứng dụng website nên được check một cách kỹ lưỡng. Các hoạt động test bao gồm:
* Kiểm tra nếu các truy vấn được thực hiện mà không xảy ra lỗi.
*  Thêm mới, cập nhật hoặc xoá dữ liệu trong cơ sở dữ liệu nên duy trì tính toàn vẹn của dữ liệu.
*  Truy vấn dữ liệu không nên mất quá nhiều thời gian.
*  Kiểm tra việc load dữ liệu và kết quả nhận được với các câu truy vấn dài.
*  Dữ liệu nhận được trên cơ sở dữ liệu và hiển thị trên website có chính xác hay không.

![](https://images.viblo.asia/2b3331e3-395c-492b-a815-bc6d7f96a286.png)

### Kiểm thử giao diện
Kiểm thử giao diện chủ yếu có ba việc cần được kiểm tra: website Server, Application server và Database server. Đảm bảo rằng toàn bộ các thông tin liên lạc giữa các server này phải được thực hiện đúng, xác minh kết nối giữa các máy chủ được xây dựng lại hoặc bị mất, test xem có bất kỳ xung đột giữa lúc ứng dụng đang hoạt động, trả về bất kỳ lỗi từ website server hoặc database server đến application server sau đó được xử lý và cuối cùng là hiển thị kết quả tới người dùng.
![](https://images.viblo.asia/a119bf56-8e6e-478f-ba85-bde604cf3ccc.png)

*  Web server: kiểm tra xem tất cả các yêu cầu web có đang được chấp nhận và không yêu cầu nào bị từ chối hoặc bị rò rỉ.
*  Application server: kiểm tra xem yêu cầu có đang gửi đúng đến server, lỗi có được bắt và hiển thị cho người quản trị.
*  Database server: kiểm tra kết quả truy vấn cơ sở dữ liệu.
### Kiểm thử hiệu năng website
Kiểm thử website làm việc dưới lượt tải nặng, được phân thành hai phần: kiểm tra tần suất, kiểm tra lượt tải. Bao gồm:
![](https://images.viblo.asia/a5a40850-d074-4eed-81a7-526193102b83.jpg)

*  Kiểm tra thời gian phản hồi của website với tốc độ kết nối khác nhau.
*  Kiểm tra website có xử lý được nhiều yêu cầu người dùng vào cùng một thời điểm.
*  Kiểm tra website có hoạt động tốt trong thời điểm lượt tải cao.
*  Kiểm tra dữ liệu đầu vào lớn từ người dùng.
*  Kiểm tra hành vi của website khi kết nối với cơ sở dữ liệu.
*  Kiểm tra các phương pháp tối ưu hóa như giảm thời gian tải bằng cách bật bộ nhớ cache trên trình duyệt và phía máy chủ, nén gzip…

### Kiểm thử bảo mật website
Được thực hiện để đảm bảo rằng có bất kỳ rò rỉ thông tin nào về mã hoá dữ liệu hay không. Trong website thương mại điện tử, kiểm thử bảo mật đóng một vai trò rất quan trọng, nếu thông tin an toàn thì kiểm tra xem làm thế nào để lưu trữ các thông tin nhạy cảm như thẻ tín dụng, thanh toán hóa đơn…Các hoạt động kiểm tra sẽ bao gồm:
![](https://images.viblo.asia/ddd68d59-dd1d-4bd0-bae5-131009333314.png)

*  Kiểm tra truy cập trái phép vào các trang an toàn, nếu người dùng thay đổi từ “https” sang “http” thì thông báo thích hợp sẽ được hiển thị và ngược lại.
*  Kiểm tra việc truy cập các trang internal, nếu đăng nhập được yêu cầu thì người dùng nên được chuyển hướng đến trang đăng nhập hoặc thông báo thích hợp sẽ được hiển thị.
*  Các thông tin liên quan đến giao dịch, thông báo lỗi, cố gắng đăng nhập nên được ghi vào file log.
*  Kiểm tra các tệp tin có bị hạn chế tải xuống hay không.
*  Kiểm tra các thư mục web hoặc tập tin web có thể truy cập được trừ khi không được cấu hình để tải xuống.
*  Kiểm tra CAPTCHA đã được thêm vào và hoạt động bình thường cho đăng nhập để tự động ngăn chặn các đăng nhập hay chưa.
*  Kiểm tra việc cố truy cập thông tin bằng cách thay đổi tham số trong chuỗi truy vấn. Ví dụ: nếu bạn đang chỉnh sửa thông tin và trên URL bạn thấy UserID = 123, hãy thử thay đổi các giá trị tham số này và kiểm xem ứng dụng có cung cấp thông tin người dùng khác không, nên từ chối hiển thị cho trường hợp này để ngăn chặn việc xem thông tin người dùng khác.
*  Kiểm tra session hết hạn sau thời gian được xác định nếu người dùng không thao tác trên website.
*  Kiểm tra user/password không hợp lệ.

Như vậy, kiểm thử website thực sự rất quan trọng đối với các tester cũng như một công ty lập trình, một công ty thiết kế website chuyên nghiệp cần phải có quy trình test chi tiết, đầy đủ để đảm bảo sản phẩm của mình ít phát sinh lỗi nhất trong quá trình vận hàn. Dù là bạn thiết kế website bán hàng, thiết kế website giới thiệu, hay bất kỳ loại website nào thì mục tiêu cuối cùng là phục vụ tốt khách hàng. Nếu không kiểm tra kỹ lưỡng mà lại xuất bản trang website, app ra cộng đồng thì rõ ràng sẽ mang đến trải nghiệm không tốt cho người dùng. Do vậy, việc kiểm thử website cũng như hiểu được các quy trình kiểm thử website là những kiến thức cần thiết bạn cần phải hiểu.