Laradock hiện tại đang được sử dụng khá phổ biến bởi tính linh hoạt cũng như độ phủ về mặt setting cho nhu cầu làm về Website, cũng như ngôn ngữ PHP đa phần chúng ta bắt gặp khá nhiều. Khi bạn cần bất kỳ service nào chỉ đơn giản hãy cài đặt nó từ 1 cấu hình có sẵn và chỉ phải sửa tham số riêng theo server với project của bạn mà thôi.

Một phần mà chúng ta gẫn như luôn phải cài đặt đó là vấn đề bảo mật SSL, trong Laradock mặc định thì cấu hình này tạm ẩn đi trong thời gian đầu vẫn đang ở thời kỳ development. Vậy làm sao chúng ta có thể build dự án mình với chuẩn SSL ngay khi dưới local? Bởi nếu bạn làm sớm hơn thì quá trình test chính là lúc phát hiện lỗ hổng kịp thời, tránh tình huống đáng tiếc trên production ập đến. Ok chúng ta cùng nhau tìm hiểu cách thức triển khai SSL dưới local sẽ như nào nhé! Nhưng trước hết bạn cần cài đặt Laradock rồi đó, nếu mà chưa thì bạn đọc nhanh bài viết trước của mình [Bước Đầu Dùng Laradock](https://viblo.asia/p/dung-laradock-de-dang-trong-laravel-project-Qbq5QaAE5D8) rồi tiếp tục nhé, nó cũng không tốn nhiều thời gian đâu. :cowboy_hat_face:

### 1. Generate SSL Local

Thông thường sau khi đã có những config cơ bản cho nginx, mysql, code laravel đã xong và bạn mở browser lên rồi nhập : http://localhost:8880 thì thấy kết quả như hình dưới phải không nào?

![](https://images.viblo.asia/1a6d3e08-d283-4c30-bd32-df78a811a610.jpg)


Điều đó cho thấy site của bạn đã làm việc tốt.


Nhưng khi thay đổi đường dần thành :  https://localhost:8843 thì lúc này lại ra kết quả như hình dưới. Nghĩa là nó không thể kết nối tới địa chỉ này được. 

![](https://images.viblo.asia/c9ea936b-d1b5-4c10-be9a-22172d2c0da7.jpg)


Bạn chỉ cần chỉnh sửa một chút ở đoạn code đã bị comment ở trong folder nginx/default.conf của Laradock :

```
  listen 443 ssl;
  ssl_certificate     /path/to/vietlaradock.local.crt;
  ssl_certificate_key /path/to/vietlaradock.loca.key;
```
  
 Phần khoanh đỏ là chỗ cần sửa.
 
 ![](https://images.viblo.asia/ba857998-8eb4-47e3-96bb-dac1ce7a33bf.jpg)
 
 Tuy nhiên sau đó truy cập lại địa chỉ trên thì chúng ta thấy thông báo lỗi bảo mật, mà không giống như các trang web khác khi vào bạn sẽ thấy biểu tượng chiếc ổ khóa được đóng lại có màu xám ở trên cùng. 
 Và bây giờ chúng ta sẽ tạo riêng cho site dưới local một cặp khóa gồm file key và certificate file nha.
 
 Bạn có 2 cách làm dưới đây để lựa chọn việc generate SSL key nhé:
 
 **Cách 1:**
 
 Chạy git clone code về và chạy tiếp 2 lệnh như command dưới đây. 
 
 Tiếp theo bạn nhập 1 số thông tin của câu hỏi hiển thị và nó sẽ tự generate key cho bạn.
 
```
 git clone https://github.com/tbson/localca

cd localca

chmod +x generate

./generate localhost
```

**Cách 2:**

Bạn sẽ tự làm luôn cho nó có cảm giác "Phê" tùy từng bạn nha, :joy: Nếu như gấp quá thì thôi chọn cách số 1 cho nó speed up !

- Tạo private key cho domain local bạn muốn: ví dụ : vietlaradock.local (cái này bạn chỉnh sửa tùy ý nhé. Chỉ cần lát nữa link đường dẫn trong file config vào đúng là được)

`openssl genrsa -out vietlaradock.local.key 2048`

- Tạo Certificate Signing Request cho chính cái key ở trên:

`openssl req -new -key vietlaradock.local.key -out vietlaradock.local.csr`

- Tiếp theo là tạo file Signed certificate

Trước hết tạo 1 file cài đặt : **vietlaradock.local.ext**

Bạn dùng nano hay vim để mở file đó lên rồi nhập nội dung như sau :

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = vietlaradock.local
```

Chỗ DNS bạn có nhập cho nhiều domain không vấn đề gì, khi bạn có nhiều sites

Tiếp theo trong terminal bạn chạy lệnh :

```
openssl x509 -req -in vietlaradock.local.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial \
-out vietlaradock.local.crt -days 1825 -sha256 -extfile vietlaradock.local.ext
```

**Lưu ý:** 

2 file sau khi tạo xong **vietlaradock.local.key** và **vietlaradock.local.crt** Bạn để em nó ở đâu thì lấy địa chỉ chỗ ở hiện tại và ghi lại vào file **nginx/default.conf** này nhé :

```
  listen 443 ssl;
  ssl_certificate     /etc/nginx/ssl/vietlaradock.local.crt;
  ssl_certificate_key /etc/nginx/ssl/vietlaradock.loca.key;
```

Không là site bạn nó không là vẫn bị thông báo lỗi bảo mật đó. Như mình thì để luôn ở trong folder setting mặc định của laradock **/etc/nginx/ssl**


Vậy là bạn đã có các yếu tố cần thiết rồi đó, sang tiếp bước số 2 luôn thôi.

### 2. Cài đặt trình duyệt nhận ra certificate 

Bước này bạn cần import private key vào trong trình duyệt để khi bạn nhập địa chỉ domain nó sẽ nhận ra site của bạn và đánh dấu là địa chỉ tin cậy, lúc này site của bạn sẽ không còn thông báo bảo mật nữa.

**1. Chrome :**

Đối với Chrome, các bạn vào Setting > Security > Manage certificate  => chọn tab Authorities. Import file localca.pem trong folder localca phía trên, chọn Trust this certificate for identifying websites

*Như hình ảnh dưới đây.* Bạn chọn nút Import vào link tới file private key của bạn tạo ở bước trên.

![](https://images.viblo.asia/db5b4d3c-938e-4046-889c-69f6254b3966.png)

**2. Firefox:**

Đối với Firefox, các bạn thực hiện như sau. Chọn Preferences. Search từ Certificate. Chọn View Certificates > Authorities > Import. Các bạn lại import file localca.pem vào và chọn Trust this CA to indentify websites.

Cũng import key của bạn vào như mục trong ảnh dưới:

![](https://images.viblo.asia/00ae5051-680d-4876-a0ef-55d1e229ee7d.png)


**Kết quả:**

Bây giờ bạn quay lại browser mở Chrome hoặc Firefox lên nhập https://localhost:8843 để kiểm tra thành quả nhé.

Hoặc nếu không muốn nhập như kia mà nhập luôn tên domain cho xịn :

Edit file `sudo vi /etc/hosts`

Nhập `127.0.0.1   vietlaradock.local`

Giờ bạn sẽ gõ vào trình duyệt là :` https://vietlaradock.local`

Lúc này bạn không còn thấy thông báo lỗi bảo mật gì nữa. Thay vào đó là một cái khóa đóng kín (Đối với Chrome) còn Firefox là cái khóa với màu xanh (**Good Secure**) 

### 3. Tổng kết

Với những thông tin trên mình hy vọng sẽ mang đến sự hữu ích cho bạn đang cần tìm cách cài đặt SSL bảo mật cho website của mình. Bạn có thể test ngay trên môi trường local mà không phải chờ đến lúc deploy lên production, mua 1 key SSL về rồi mới test được lỗ hổng bảo mật của site bạn. 

Nếu bạn có gì chưa hiểu có thể thoải mái để lại comment hoặc chia sẻ thêm kinh nghiệm của bạn để mình bổ sung vào bài viết được hoàn thiện hơn. :smiley: