![](https://images.viblo.asia/ae87b957-f016-45c0-9c29-34b34a9b3262.png)

# 1. Giới thiệu  MoMo:
- MoMo Payment Platform API là giải pháp thanh toán cho các đơn vị kinh doanh, cho phép khách hàng sử dụng tài khoản Ví MoMo để thanh toán các dịch vụ trên nhiều nền tảng khác nhau: Desktop Website, Mobile Website, Mobile Application, POS, Pay In Bill, Web In App MoMo.

# 2. Các phương thức thanh toán của:
- **Cổng thanh toán MoMo (All In One)**: Áp dụng cho đối tác có thanh toán trên nền tảng Website, Mobile, Smart TV, ...
- **Thanh toán App-In-App**: Áp dụng cho đối tác có ứng dụng di động (Android/iOS) muốn mở trực tiếp ứng dụng MoMo để thanh toán.
- **Thanh toán POS**: Áp dụng cho đối tác có hệ thống bán hàng bằng máy POSS. Thu ngân dùng máy scan đẻ quét **"MÃ THANH TOÁN"** trên app MoMo để thanh toán.
- **Thanh toán QR Code**: Đối tác tạo QR code để theo định dạng MoMo cung cấp, khách hàng chỉ cần dùng app MoMo để quét mã và thanh toán.

Trong bài viết này mình sẽ sử dụng cổng thanh toán MoMo All In One.

# 3. Quy trình tích hợp:
- Thực hiện đăng ký business account tại https://business.momo.vn/.
- Sau khi đăng ký account, môi trường mặc định của account là môi trường **Test**.
- Bạn cần thực hiện đăng ký đầy đủ thông tin để đưa account lên môi trường **Production**.
- Đối với từng loại môi trường, MoMo API cung cấp cho bạn các thông tin sau để cấu hình và sử dụng MoMo API
    1. **Partner Code**: Thông tin để định danh tài khoản doanh nghiệp.
    2. **Access Key**: Cấp quyền truy cập vào hệ thống MoMo.
    3. **Secret Key**: Dùng để tạo chữ ký điện tử **signature**.
    4. **Public Key**: Sử dụng để tạo mã hóa dữ liệu bằng thuật toán RSA.

- Khi gọi Sử dụng MoMo API ta sẽ gọi tới 2 end point sau tùy theo môi trường:
    1. **Môi trường test**: https://test-payment.momo.vn
    2. **Môi trường production**: https://payment.momo.vn

# 4. Security:
- MoMo sử dụng chữ ký điện tử và mã hóa dữ liệu để xác thực dữ liệu đầu vào và ra trên mỗi yêu cấu HTTP Request và HTTP Response.
- Tham khảo source code tại [GitHub của MoMo](https://github.com/momo-wallet/payment/tree/master/ruby).

## a. Chữ ký điện tử:
- `signature`  là chuỗi ký tự được tạo ra từ một thuật toán cho trước, sử dụng để kiểm tra tính đúng đắn của dữ liệu trên đường truyền giữa hai hệ thống.
- Ví dụ
    ```ruby
    digest = OpenSSL::Digest.new('sha256')
    signature = OpenSSL::HMAC.hexdigest(digest, serectkey, rawSignature)
    ```
- MoMo sử dụng thuật toán [SHA256](https://ruby-doc.org/stdlib-2.4.0/libdoc/openssl/rdoc/OpenSSL/HMAC.html) để tạo singature cho data của mỗi request.
- **serectkey** là `SECRET_KEY` của business account đã đăng ký với MoMo.
- **rawSignature** là chuỗi được tạo từ data của order cần được thanh toán bởi MoMo theo cặp `key=value` và được nối lại với nahu bằng `&`, ví dụ: `key1=value1&key2=value2`.

## b. Mã hóa RSA:
- Mã hóa RSA là thuật toán mã hóa công khai để bảo vệ thông tin trên đường truyền.
- Đối tác sử dựng `PUBLIC_KEY` của business account đã đăng ký với MoM để mã hóa data của order cần được thanh toán bởi MoMo.
- MoMo sử dụng `PRIVATE_KEY` ứng với `PUBLIC_KEY` để giải mã và kiểm tra dữ liệu đã được mã hóa.

# 5. Cổng thanh toán MoMo (All In One):
## a. Giới thiệu:
- MoMo AIP Payment là giải pháp thanh toán của MoMo áp dụng trên nhiều nền tảng khác nhau chỉ trong 1 API duy nhất.
- Đối với môi trường **TEST** bạn có thể download app **MoMo TEST** và thực hiện thanh toán hoặc sử dụng account test do MoMo cung cấp sẵn.
    | Thành công | Hạn mức 20.000.000 | Hạn mức 5.000.000 | Không thành công |
    | ------------- | ------------- | ------------- | ------------- |
    | 0917003003 | 0919100100 | 0918002000 | 0916005000  |
    | 0917030000 | 0919100010 | 0918002020 | 0916005050  |
    | 0917030003 | 0919100001 | 0918002200 | 0916005500  |
    | 0917030030 | 0919010100 | - | - |
    | 0917030300 | 0919010010 | - | - |
    | 0917300300 | 0919100101 | - | - |
- Mật khẩu: `000000`.
- Mã xác thực: `000000`.
- Thông tin chi tiết xem tại [Thông tin Testing](https://developers.momo.vn/#/docs/testing_information) của MoMo.

## b. Sơ đồ xử lý:
- Thực hiện thanh toán với MoMo thông qua cổng thanh toán AIO trên web theo các bước sau:
    1. User click buttton thanh toán trên màn hình Web.
    2. Server gửi request lên MoMo.
    3. Momo trả HTTP Response về Server.
    4. Nếu request chứa data hợp lệ thì MoMo trả HTTP Response có **errorCode** là 0 là **payUrl**.
    5. Server thực hiện redirect đến **payUrl** của MoMo để user thực hiện thanh toán.
    6. Kết quả thanh toán được MoMo gửi đến **returnUrrl** và **notifyUrl** của server.
    7. Server nhận kết quả thanh toán và update order.
    8. Nếu request của bước 2 chứa data không hợp lệ thì tại bước 3 MoMo trả HTTP Response có **errorCode** khác 0 và **message** chứa nội dung lỗi.

- Để thực hiện thanh toán với cổng thanh toán AIO, gửi request lên end point của MoMo.
    ```ruby
    POST /gw_payment/transactionProcessor
    ```

## c. Data request lên MoMo:
- Các data cần gửi lên MoMo để thực hiện thanh toán thông qua cổng thanh toán AIO bao gồm.
    | Attribute |Description|
    | ------------- | ------------- |
    | partnerCode | PARTNER_CODE lấy từ business account đăng ký với MoMo |
    | accessKey | ACCESS_KEY lấy từ business account đăng ký với MoMo |
    | requestId | Định danh mỗi yêu cầu |
    | amount | Số tiền cần thanh toán |
    | orderId | Mã đơn hàng cần thanh toán (cần đảm bảo tính duy nhất) |
    | returnUrl | Trang web mà MoMo sẽ redirect về sau khi user thực hiện thanh toán xong <br>cần cung cấp cả domain và path của Url (ví dụ: https://example.com/orders/1) |
    | notifyUrl | Trang web mà MoMo sẽ gửi data về thông qua IPN sau khi user thực hiện thanh toán xong <br>cần cung cấp cả domain và path của Url (ví dụ: https://example.com/orders/1) |
    | requestType | **captureMoMoWallet** |
    | signature | Chữ ký điện tử để kiểm tra thông tin |
    | extraData | Thông tin bổ sung cho order theo định dạng **<key>=<value>;<key>=<value>**<br>mặc định là **""**|
- Tham khảo [tài liệu của MoMo](https://developers.momo.vn/#/docs/aio/?id=ph%c6%b0%c6%a1ng-th%e1%bb%a9c-thanh-to%c3%a1n) để biết thêm chi tiết.
- Tham khảo [Momo::ApplicationSerrvice](https://github.com/thanhlt-1007/payment_momo/blob/master/app/services/momo/application_service.rb) để xem ví dụ với Rails.
- Mình sử dụng [Momo::RequestSignatureService](https://github.com/thanhlt-1007/payment_momo/blob/master/app/services/momo/request_signature_service.rb) để tạo **signature**.

## d. returnUrl và notifyUrl:
- Là 2 url của Server mà MoMo sẽ gửi HTTP Response chứa kết quả thông tin thanh toán.
- Với **returnUrl** MoMo sẽ gửi qua method **GET**, redirect từ MoMo về returnUrl sau khi user thực hiện thanh toán xong.
- Với **notifyUrl** MoMo sẽ gửi qua method **POST**, MoMo thực hiện IPN để gửi data về notifyUrl sau khi user thực hiện thanh toán xong.
- Với **returnUrl** và **notifyUrl** thực hiện kiểm tra data nhận về từ MoMo có khớp với data gửi lên MoMo hay không và update orders thông qua [Momo::ConfirmOrrderService](https://github.com/thanhlt-1007/payment_momo/blob/master/app/services/momo/confirm_order_service.rb) và [Momo::UpdateOrrderService](https://github.com/thanhlt-1007/payment_momo/blob/master/app/services/momo/update_order_service.rb).
- Tránh trường hợp user tự gõ url để update order mà không thông qua thanh toán MoMo.
- Trong [code mẫu](https://github.com/thanhlt-1007/payment_momo/blob/master/app/controllers/momo/payments_controller.rb) **returnUrl** ứng với `MoMo::PaymentsController#show` và **notifyUrl** ứng với `MoMo::PaymentsController#update`
- `MoMo::PaymentsController#create` thực hiện gọi MoMo AIO API thông qua [Momo::SendRequestService](https://github.com/thanhlt-1007/payment_momo/blob/master/app/services/momo/send_request_service.rb) và redirect về payUrl để thực hiện thanh toán trên MoMo.
- Ta cần sử dụng cả **returnUrl** và **notifyUrl** để tránh trường hợp MoMo không redirect về **returnUrl** (do timeout, user tắt trình duyệt) thì server vẫn nhận được data thông qua **notifyUrl**.

## e. Data mà MoMo trả về:
- Các data cần gửi lên MoMo để thực hiện thanh toán thông qua cổng thanh toán AIO bao gồm.
    | Attribute |Description|
    | ------------- | ------------- |
    | partnerCode | PARTNER_CODE lấy từ business account đăng ký với MoMo |
    | accessKey | ACCESS_KEY lấy từ business account đăng ký với MoMo |
    | requestId | Định danh mỗi yêu cầu |
    | amount | Số tiền cần thanh toán |
    | orderId | Mã đơn hàng cần thanh toán (cần đảm bảo tính duy nhất) |
    | returnUrl | Trang web mà MoMo sẽ redirect về sau khi user thực hiện thanh toán xong <br>cần cung cấp cả domain và path của Url (ví dụ: https://example.com/orders/1) |
    | notifyUrl | Trang web mà MoMo sẽ gửi data về thông qua IPN sau khi user thực hiện thanh toán xong <br>cần cung cấp cả domain và path của Url (ví dụ: https://example.com/orders/1) |
    | requestType | **captureMoMoWallet** |
    | signature | Chữ ký điện tử để kiểm tra thông tin |
    | extraData | Thông tin bổ sung cho order theo định dạng **<key>=<value>;<key>=<value>**<br>mặc định là **""**|

# 6. Màn hình demo:
![](https://images.viblo.asia/16988be9-948c-4bad-8932-2e5f0ae0a12d.gif)