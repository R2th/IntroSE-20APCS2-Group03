# Tìm hiểu về chữ kí số và QRCode trong Ruby On Rails

## Chữ kí số là gì?
**Chữ kí số**  là thông tin đi kèm dữ liệu nhằm giúp xác thực tính toàn vẹn của dữ liệu đó
## QRCode là gì?
**QR** là  từ  viết tắt  của  **Quick Response**  (“Mã phản hồi nhanh”) hay còn  gọi là mã vạch  ma trận (matrix-barcode) là  dạng mã  vạch  hai  chiều  (2D) được phát  triển vào năm  1994 
bởi công ty  Denso Wave,  Nhật  Bản. Mã QR (QR code) có  thể  được đọc bởi máy đọc mã vạch hay ĐTTM có chức năng chụp ảnh với phần mềm để quét mã vạch, trong đó sử dụng
thuật toán sửa lỗi [Reed-Solomon](https://vi.wikipedia.org/wiki/K%E1%BB%B9_thu%E1%BA%ADt_s%E1%BB%ADa_l%E1%BB%97i_Reed%E2%80%93Solomon).

**QR code** gồm những module màu đen, được xắp xếp theo những quy luật nhất định trong một ô vuông có nền  trắng. Sự  tổ hợp  những module này đã mã hóa cho rất nhiều loại dữ liệu, bao gồm: link dẫn đến trang web,  hình ảnh, thông tin, chi  tiết về sản phẩm, quảng cáo cho sản phẩm.

![](https://images.viblo.asia/e8e205ed-d6c8-4fd6-95f5-c236fff24949.jpg)

Các QR code nhỏ  nhất là  21x21  pixel, và lớn nhất là  177x177, mỗi mẫu có  kích thước khác nhau đó được gọi là một phiên bản.

**Khả năng sửa lỗi**
| Chuẩn | Sửa lỗi |
| -------- | -------- |
| L     | 7%     | 
| M | 15% |
| Q | 25% |
| H | 30% | 

**Khả năng lưu trữ dữ liệu**
| Loại dữ liệu | Lưu trữ |
| -------- | -------- |
| Numberic     | 7,089 ký tự    | 
| Alphanumeric | 4,296 ký tự |
| Nhị phân | 2,953 bytes |
| Kanji/Kana | 1,817 ký tự |

**Các loại định dạng dữ liệu QR code có khả năng mã hóa**
- Địa chỉ URL 
- Văn bản (Text) 
- Hình ảnh (Images) 
- Số điện thoại 
- Tin nhắn (SMS) 
- Thông tin liên hệ (Contact details) 
- Vị trí địa lý (Geo-location) 
- Mật khẩu truy cập Wifi 
- Địa chỉ email
-  Thông tin cá nhân trên mạng xã hội
-  Thông tin sự kiện (Events)
-  Địa chỉ download, …
## Kết hợp chữ kí số và QRCode để xác thực tính toàn vẹn của dữ liệu
### Quá trình tạo ra QRCode ứng dụng chứ kí số

**Bước 1:** Rút trích thông tin đặc trưng của Văn bản; 

**Bước 2:** Tạo QR code từ: các thông tin đặc trưng,  kết hợp  với chữ  ký  số của  đơn  vị phát hành Văn bản; 

**Bước 3:** In QR code lên Văn bản; 

**Bước 4:** Người dùng sử dụng thiết bị đọc mã vạch hoặc ĐTTM có phần mềm được thiết kế riêng trong việc xác thực QR code này. 

***Có thể hình dung rõ hơn thông qua sơ đồ sau***

![](https://images.viblo.asia/c986df94-51ce-407b-8bba-bd6b7f1f2f4a.png)

### Quá trình xác thực QRCode
**Bước 1:** Sử dụng  đầu đọc mã vạch hay  ĐTTM để quét QR  code trên  tài  liệu cần  xác minh. Trích ra DS và SI của Văn bản; 

**Bước 2:** Giải mã DS bằng  cách sử dụng  hàm giải mã DPK của thuật toán RSA, kết hợp với khóa công khai (QK) của đơn vị phát hành văn bản (được lưu trữ tại Root-CA). Ta có DecValue: DQK(DS,QK); 

**Bước 3:** Dùng hàm H() để băm thông tin SI, ta có EncValue: H(SI); 

**Bước  4:** Đối  chiếu  cặp  giá  trị  DecValue và EncValue; nếu khớp nhau thì QR code này là hợp pháp (nghĩa là  văn bản  này có  giá trị  pháp lý  và được cấp bởi một cơ quan có thẩm quyền).

***Có thể hình dung rõ hơn thông qua sơ đồ sau***

![](https://images.viblo.asia/1b185851-bd69-4953-b734-6775c3f6accd.png)

## Demo ứng dụng đơn giản với Ruby On Rails
Đầu tiên để thuận tiện cho việc demo, ở đây mình dùng `gem 'rqrcode'` để phục vụ cho việc tạo chữ kí số

Trong file `Gemfile` thêm dòng `gem 'rqrcode'` sau đó lưu lại và chạy lệnh `bundle install` để cài đặt

Tạo 1 controller để thực hiện demo, ở đây mình tạo controller tên là `ren_qrcodes_controller.rb`.

Trong method `index` của `RenQrcodesController` tiến hành tạo ra cặp khóa bí mật và khóa công khai như sau
```ruby
private_key = OpenSSL::PKey::RSA.new(512)

@public_key = private_key.public_key
```

Sử dụng `private_key` để mã hóa dữ liệu và tạo chữ kí số, sử dụng `public_key` để giải mã

Tiến hành tạo chữ kí số cho dữ liệu với `private_key` (ở đây mình sử dụng luôn họ và tên)

```ruby
digital_signature = ren_digital_signature(private_key, "truongvanphong")

def ren_digital_signature(private_key, information)
  
    private_key.sign(OpenSSL::Digest::SHA256.new, information)`
  
 end 
 ````

Sau khi thu được chữ kí số, sử dụng `gem 'rqrcode'` để tạo ra mã QRCode tương ứng
```ruby
@qrcode = RQRCode::QRCode.new(digital_signature)
```

Ta thu được object có dạng như sau

![](https://images.viblo.asia/d718edc6-5d07-4cc7-8e09-598a0f22167e.png)

Lúc này file `ren_qrcodes_controller.rb` hoàn chỉnh là

![](https://images.viblo.asia/2570347e-d70a-44c6-96f2-d772b01212b0.png)

Tiến hành đổ dữ liệu ra view trong file `app/views/ren_qrcodes/index.html.erb` như sau

![](https://images.viblo.asia/926c70c9-c1f5-4e4d-9221-3b0ffcf88ecd.png)

Định dạng thêm css cho view để show ra qrcode:

![](https://images.viblo.asia/fc688c81-2515-45d6-84d8-48a8480caaeb.png)

Xong ~
Bây giờ vào trang `http://localhost:3000/ren_qrcodes` để xem kết quả ta được

![](https://images.viblo.asia/61bd6a22-a7d4-4c42-9014-98d24ca97eb2.png)

Sử dụng smartphone để scan thử ta được 

![](https://images.viblo.asia/784e6df6-4924-4bc8-8ac8-cc4e69cfba00.png)

Có thể thấy rằng hầu hết các kí tự đều không hỗ trợ =)) , bởi vì trên thực tế sẽ có những phần mềm riêng biệt để nhận biết các mã QRCode có độ phức tạp cao như trên.
Để cho tường minh hơn thì có thể thay bằng:
```ruby
@qrcode = RQRCode::QRCode.new("digital_signature")
```

sau đó scan thử thì thu được text là "digital_signature"  tương ứng.

Tuy nhiên về cơ bản thì vẫn theo một quy trình là: Văn bản -> chữ kí số -> QRCode -> chữ kí số

**Vậy làm thế nào để xác thực được tính toàn vẹn của dữ liệu thông qua chữ kí số ?**

Điều này đã được mô tả ở trên (Quá trình xác thực QRCode), `gem 'rqrcode'` cung cấp cho chúng ta một method `verify` sử dụng `public_key` để xác thực có thể được mô tả trong hàm sau:
```ruby
def check_valid_input(signature, information)

   @public_key.verify(OpenSSL::Digest::SHA256.new, signature, information)

end
```
method này trả về `true` nếu dữ liệu toàn vẹn, trả về `false` nếu không toàn vẹn

**************************************************

Bài viết này chỉ dừng lại ở mức độ tìm hiểu vì vậy kiến thức còn nhiều thiếu sót, rất mong nhận được sự góp ý của mọi người

**********
Tài liệu tham khảo

https://github.com/whomwah/rqrcode

https://www.researchgate.net/publication/277311597_Advanced_Security_Algorithm_Using_QRCode_Implemented_for_an_Android_Smartphone_System_A_QR

https://www.researchgate.net/publication/327837238_Application_of_QR_Code_and_digital_signatures_in_the_process_of_forgery_prevention_for_paper-based_diplomas_and_certificates