# Ủy quyền (Authorization) với Postman
Trong tất cả các ví dụ trước, có thể send request hoặc post dữ liệu mà không cần xác thực. Điều này là không phổ biến cho các dịch vụ web hoặc websites.
Có rất nhiều tùy chọn và công nghệ để ủy quyền/xác thực, hãy tìm hiểu một vài trong số chúng.

## Cài đặt ủy quyền trên bộ sưu tập
Trong Postman, bạn có thể thiết lập các biến xác thực cần thiết và cài đặt riêng cho mỗi yêu cầu. Nhưng khi bạn đang kiểm tra API và có một bộ sưu tập, bạn nên thực hiện cài đặt chung cho tất cả các yêu cầu trong bộ sưu tập.
1. Khi bạn mở sidebar trong Postman và di con trỏ qua bộ sưu tập đã lưu, một nút "..." mới sẽ xuất hiện với quyền truy cập vào cài đặt Bộ sưu tập:

![](https://images.viblo.asia/cb72f858-84e6-4a30-a78e-904ec502df42.png)

![](https://images.viblo.asia/a840e81d-1fe1-474d-b1ed-ef8678381f99.png)

2. Chọn "Edit" từ menu "more actions" để vào các cài đặt bộ sưu tập:

![](https://images.viblo.asia/365194e6-2d97-44e7-bbd2-6668c5e22cb1.png)

## Basic Auth
Chọn "Basic Auth" từ danh sách. Xác thực truy cập cơ bản là một phương thức ủy quyền mà bạn có thể đã gặp phải. Trong trình duyệt web của bạn, việc gọi bất kỳ trang hoặc thư mục được bảo vệ bởi Basic Auth nào sẽ tạo ra một cửa sổ bật lên với một hình thức đăng nhập:

![](https://images.viblo.asia/7b67f564-1bb4-4b98-8bde-1c6d8b191177.png)

1. Nhập tên người dùng và mật khẩu như được hiển thị, sau đó nhấp vào Update:

![](https://images.viblo.asia/fbecc206-24b7-472e-b2ab-6c1c1c94c6e7.png)

2. Để kiểm tra cấu hình, hãy tạo một yêu cầu GET đến một trang được bảo vệ:

![](https://images.viblo.asia/82986f8a-5157-435d-a2c9-08238cce06b6.png)

3. Để xác minh rằng cấu hình ủy quyền đang hoạt động, hãy tắt Basic Auth và gửi lại yêu cầu vào cùng một trang
    * Chuyển đến tab Authorization của yêu cầu và chọn "No Auth" từ dropdown:

![](https://images.viblo.asia/b0367144-3b79-412d-8558-492fd55bd3f4.png)

4. Bây giờ máy chủ web sẽ hiển thị lỗi vì yêu cầu không được xác thực, nhưng thư mục yêu cầu xác thực Basic Auth.
5. Sau khi đặt loại Authorization trở về giá trị mặc định "Inherit auth from parent", nhìn vào mã bạn có thể thấy phương thức xác thực này hoạt động bằng cách gửi tiêu đề yêu cầu mới có chứa tên người dùng và mật khẩu ở dạng được mã hóa Base64:

![](https://images.viblo.asia/852e89fe-b949-4d1d-bc05-acf8cef0d208.png)

## Bearer Token
* Bearer Token khá giống với Auth cơ bản, ở chỗ nó sẽ được truyền dưới dạng tiêu đề yêu cầu. Nhưng thay vì "Authorization: Basic", nó sẽ sử dụng "Authorization: Bearer EXAMPLETOKEN"

![](https://images.viblo.asia/b42ed42c-a2e8-4a54-ab13-3398a86be1d9.png)

* Bearer Token là mã thông báo bảo mật ngụ ý rằng bất kỳ bên nào sở hữu nó (một người mang mã hóa trực tuyến) có quyền truy cập vào tài nguyên được bảo vệ. Thông thường, nó sẽ được tạo bởi máy chủ để đáp ứng yêu cầu đăng nhập

Hãy thử nghiệm Bearer Token:
1. Trước khi bạn có thể kiểm tra ủy quyền Bearer Token, trước tiên bạn sẽ phải hoàn tác cài đặt ủy quyền bộ sưu tập. Mặt khác, máy chủ sẽ cố gắng áp dụng Basic Auth cho tất cả các thư mục mà bạn cố truy cập và không thành công, vì chúng không có kết hợp tên người dùng/mật khẩu giống nhau cho các thư mục khác:

![](https://images.viblo.asia/133a0ffa-9db9-4d6a-9e61-4c7fcf4a1139.png)

2. Bây giờ, trước tiên hãy tạo một yêu cầu đăng nhập POST để yêu cầu Bearer Token:

![](https://images.viblo.asia/177fbb9d-cc3a-436c-9b3e-9eca7b0d5b7c.png)

3. Khi bạn nhấp vào Send, mã thông báo "EXAMPLETOKEN" sẽ được hiển thị trong phản hồi.
4. Nếu bạn gửi kết hợp tên người dùng / mật khẩu không hợp lệ, máy chủ sẽ hiển thị cho bạn một biểu mẫu đăng nhập thay thế.
5. Sử dụng mã thông báo được trả lại trong yêu cầu GET mới:

![](https://images.viblo.asia/39c729f3-b985-460b-bf95-e5fb8c55354a.png)

6. Khi bạn gửi yêu cầu này (đừng quên lưu nó vào bộ sưu tập của bạn), phản hồi sẽ cho bạn biết liệu yêu cầu có thành công hay không:

![](https://images.viblo.asia/efd7036a-b5e6-40ea-86ef-463af5ee9bf8.png)

# Kiểm thử trên Postman
Hầu hết các phương pháp kiểm thử từ kiểm thử chức năng trang web cũng có thể được áp dụng cho kiểm tra chức năng API.

## Input validation (negative testing)
Sau khi thử nghiệm cho kết quả mong đợi, hãy thử các giá trị khác nhau trong một yêu cầu:
* Gửi một đoạn văn bản ngẫu nhiên trong một trường date và kiểm tra phản hồi
    * Có một lỗi không mong muốn? 
    * Các dịch vụ web có thể xử lý các thất bại?
* Gửi yêu cầu với các trường bắt buộc bị thiếu hoặc số lượng quá lớn

## Authentication
Làm thế nào là xử lý yêu cầu của API khi bạn không xác thực chính xác? Có một lỗi không mong muốn hoặc thậm chí một vết đống đầu ra?

## Xác minh API được cập nhật cấu trúc dữ liệu
* Khi bạn POST dữ liệu và kiểm tra dữ liệu được cập nhật (trong một yêu cầu GET tương ứng, hoặc thông điệp phản ứng trả lại):
    * Có phải tất cả các đầu vào thực hiện đều thông qua?
    * Là cái gì đó cắt ngắn hoặc bị mất?
* Sau khi xóa một tài nguyên, hãy xác minh rằng nó không tồn tại nữa và đã bị xóa đúng cách

## Xác minh tất cả các giới hạn
Rất nhiều hành động chỉ được phép thực hiện một lần. Hãy chắc chắn rằng các giới hạn không thể bị phá vỡ và không có gì bị phá vỡ khi bạn vẫn cố gắng phá nó. Ví dụ:
* Bạn thường chỉ có thể đánh dấu một địa chỉ giao hàng đang hoạt động tại một cửa hàng trực tuyến
* Bạn chỉ có thể submit đơn hàng (ở bước cuối) một lần

## Hiệu suất (nếu được phép)
Nếu khách hàng không cấm kiểm tra hiệu suất, bạn có thể kiểm tra:
* Điều gì xảy ra khi bạn gửi cùng một yêu cầu nhiều lần trong một khoảng thời gian ngắn, đặc biệt là các yêu cầu lớn
* Các mục liên quan đến hiệu suất khác

## API có hoạt động theo đặc tả không?
Xác minh với tài liệu API API rằng tất cả các yêu cầu hoạt động như được chỉ định.

--Còn tiếp --

Nguồn tham khảo:

Dịch từ: https://www.utest.com/academy/tracks/28/courses/authorization-with-postman