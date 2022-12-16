Đây là một bài viết về quá trình làm CTF của mình về CTF challenge ở một [blog post](https://ivrodriguez.com/mobile-ctf/) khá hay. Nó có thể xem là một xuất phát điểm cực kì hợp lí cho những người bắt đầu chân ướt chân ráo chơi CTF như mình. Tổng quan thì bài CTF này có 3 version với độ khó tăng dần, đi lần lượt qua các kĩ thuật căn bản nhất trong iOS CTF như đọc hệ thống file, reverse, sử dụng hàm... Nào cùng đi vào chi tiết hơn nhé:
## Version 1 (5 flag)
### Flag 1
Đầu tiên, sau khi cài đặt app này thông qua side loading, thứ duy nhất mình thấy là một trang login mà không có button login.

![](https://images.viblo.asia/3e1a6dd5-8788-4482-8c12-756bbdbdd83d.PNG)

OK, có vẻ chưa thể khai thác được gì ở trang này đâu, nên mình thử tìm kiếm trong các file của app này xem sao.

Khởi động passionfruite
```
passionfruit
```
![](https://images.viblo.asia/23247991-ab47-471e-9f04-472a6c05ad67.png)

Passionfruit  mặc định sẽ chạy trên cổng 31337. OK đi tới giao diện của passionfruite nào.
![](https://images.viblo.asia/4197fbab-f4d2-45ff-bddc-bc13b475cbeb.png)

Ở đây, ta thấy passionfruit có thể tracking toàn bộ app trong iphone kết nối tới. Giờ chọn app CTF chúng ta đang test (Handbook app).

![](https://images.viblo.asia/39bea450-cc93-4667-a7d3-7f6e0bb7ad7c.png)

Đây là giao diện trang general của passionfruit chứa các thông tin chung chung của app. Ta sẽ đi tìm kiếm các từ khoá flag ở trong các thông tin này đầu tiên.

![](https://images.viblo.asia/0c6138fe-d33d-44c7-8bbc-d2b2bd046364.png)

Ở đây, ta thấy được một flag được lưu trong file `Info.plist` .
```
flag-EC840814-CEBA-4731-8620-CB991D850B14
```

### Flag 2
Tiếp theo, đi thêm một chút vào app Bundle, mình tìm thấy một file catalog Assets.car. Sau khi dump lỗi dung của nó với `assetutil`, mình có các thông tin sau:

![](https://images.viblo.asia/df9ebcd3-ac5d-4739-9eec-d29829c46483.png)

Thế là ít nhất cũng đoán được có một flag liên quan tới file này trong ảnh flag@3x.png. Tiếp theo là lấy ra thế nào, vì mình cũng chả rành mấy loại file này lắm. 

Sau một thời gian tìm kiếm thì mình tìm thấy [repo này](https://github.com/insidegui/AssetCatalogTinkerer) trên github. Tải Asset Catalog Tinkerer về và cài đặt rồi dùng app này mở file Assets.car, mình xem được ảnh chứa flag:

![](https://images.viblo.asia/02721287-e5d6-437f-802c-5bc5f424af6f.png)

nhưng mà nó nhỏ quá và không extract ra được. Sau đó mình tìm tới một repo khác là [acextract](https://github.com/bartoszj/acextract). Dùng repo này có thể lấy ra được các tài nguyên luôn thay vì chỉ view như ở trên. Đơn giản tải acextract về và chạy command sau là mình đã lấy được ảnh:
```Bash
chmod +x acextract2
mkdir out
./acextract2  -i Assets.car -o out
```
Và đây là ảnh xuất ra thư mục out mình tạo:

![](https://images.viblo.asia/dfe6c0e4-8091-41e1-b548-3086efbdf04f.png)

### Flag 3

Cũng trong phần payload của app, thử extract strings trong binary của app (Vì app không có mã hoá), mình thu được flag tiếp theo:

![](https://images.viblo.asia/25b4bef6-0658-4e14-979f-06fff010901f.png)

Ở đây, mình tìm kiếm theo từ khoá là "flag" và thu được kết quả như trên. Có 2 nhóm thông tin là 

![](https://images.viblo.asia/c7504458-656c-42f3-b765-5e895b4c3c14.png)

và 

![](https://images.viblo.asia/88f504fc-ec56-466d-9980-9ad5cd2da9c3.png)

thì phần thứ nhất là tên của các hàm có trong binary (trong LoginViewController). Có thể thấy khi mà dump file này ra, hoặc trực tiếp bằng passionfruit:

![](https://images.viblo.asia/d3d831af-ac5d-4bcf-b8ce-ec4325d6c4fe.png)

Cái thứ 2 chính là flag với `%@-%@-%@-%@-%@-%@` là format của flag.

Vậy flag ta thu được sẽ là

```
flag-9861DA53-C08C-47C4-84D6-B48463AB738A
```

### Flag 4
Tiếp theo, cũng trong Payload của app, đi vào `Main.storyboardc` ta thấy có 2 tệp `.nib`. Unpack chúng bằng [editnib](https://github.com/szhu/editnib), đi vào trong `BYZ-38-t0r-view-8bC-Xf-vdC.nib`, mình thấy có 3 tệp `.nib` khác. Thử extract các string trong từng tệp, mình tìm thấy chiếc flag thứ 4:

![](https://images.viblo.asia/69981491-d806-4a0e-9c69-aba0ef373472.png)

Flag:
```
flag-5932744F-4810-4A6C-BD8F-66FF3E115ED6
```

### Flag 5
Quay lại flag 3, ở phần trên mình có nói về các hàm có trong app. Trong đó có một hàm đáng chú ý khi có tên `flag`.  Mình sử dụng `radare2` để tìm nhanh các đoạn strings trong code:

![](https://images.viblo.asia/a8343e04-2c91-443a-ab45-d116c7403b19.png)

Quả nhiên nó được gán trong code. Dấu `.` ở cuối nghĩa là nó vẫn còn dài nữa so với phần hiển thị nên search thêm lần nữa để hiển thị hết flag:

![](https://images.viblo.asia/68fd8ec7-004a-4969-bb81-95f4367e16ba.png)

Vì format của flag là `flag-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` nên flag thu được sẽ là:

```
flag-BD570736-D304-400A-A6B7-F61B02173428
```

### Conclusion
Theo  mình đánh giá thì đây là một bài ctf cơ bản, giúp làm quen với cấu trúc của iOS, các tool cũng như một vài kĩ thuật căn bản. Bài này chưa yêu cầu các kĩ thuật cao về reverse hay debug nhiều mà tập trung vào cấu trúc file hơn. Thậm chí có thể giải xong bài này  mà không thực sự cần chạy nó trên simulator hay iPhone. Dù sao nó cũng là xuất phát điểm tương đối tốt cho những người bắt đầu học về iOS (như mình) :))

## Version 2

## Flag 1

Khi mở app lên, ta sẽ thấy một form đăng nhập

![](https://images.viblo.asia/e6c533e3-c22d-4170-b0c4-6d94cad2abfa.png)

Bấm vào Enter sẽ dẫn tới một trang, có vẻ chứa thông điệp mã hoá

![](https://images.viblo.asia/2c800966-50a1-4108-ab85-b66e78f6bcbd.png)


Vì mình không giỏi crypto lắm nên cứ để đó đã. Cái làm mình chú ý là passionfruit ghi lại log một cú gọi API. Bắt bằng burp thì mình có request:

```http
GET /analytics HTTP/1.1
Host: ctf.ivrodriguez.com
Accept: */*
Accept-Language: en-us
Connection: close
Accept-Encoding: gzip, deflate
User-Agent: Headbook/1 CFNetwork/1121.2.2 Darwin/19.2.0
```

Response trả về là một file text chứa flag:

```http
HTTP/1.1 200 OK
Server: nginx/1.14.0 (Ubuntu)
Date: Thu, 09 Apr 2020 07:05:40 GMT
Content-Type: application/octet-stream
Content-Length: 42
Connection: close
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sat, 10 Mar 2018 20:44:54 GMT
ETag: W/"2a-16211a8c0d5"

flag-4056CEF3-DCCB-4D9B-9D0E-64428E9A50E3
```

### Flag 2

Có vẻ ở giao diện chưa khai thác được gì hơn nên mình dùng IDA phân tích code một chút. Trong này, tìm kiếm từ khoá flag, mình thấy có một đoạn khá hay:

```
Good thing this flag is encrypted: Ov630qDn5AbOWX4JIUUeurVdgNdsjqiaM8ywYCT2Yj1eiMcT/MEPJJ5W9icdC5qb
```

Và "tình cờ" trong AppDelegate cũng có một hàm là `decryptText`. Thế là đơn giản gọi hàm này với input là đoạn mã hoá kia mình có được flag:

![](https://images.viblo.asia/f623cef4-0681-47d1-8b0f-0a1eea05ccf7.png)


### Flag 3

Vẫn trong code của IDA tạo ra, mình thử gọi hết các hàm của app thì có hàm `[TextHandler mainFunc]` được dùng để in ra flag

![](https://images.viblo.asia/8df31c8a-129f-43cd-b791-fcb56d5f768c.png)


### Flag 4

// Flag này mình chưa tìm được hi vọng được mọi người chỉ cách giải

### Flag 5

// Flag này mình cũng chưa thấy luôn (dead)

### Conclusion
Bài này là một bài nâng cao hơn một chút so với version 1. Nó vẫn tập trung vào các kĩ thuật căn bản tiếp theo trong khi làm CTF iOS như cách gọi hàm, reverse cơ bản, chặn bắt gói tin. Cũng giống version 1, đây là một xuất phát điểm tốt để tiến hành học iOS.

**Ngoài ra**, vẫn còn một version 3 của tác giả nâng cao hơn nữa mình sẽ làm khi có thời gian.