![](https://images.viblo.asia/b0b70906-3102-4410-803b-017938779611.jpg)

Việc patch lại tệp tin APK để tạo ra phiên bản ứng dụng Android mới hoạt động theo cách chúng ta mong muốn cũng không còn xa lạ nữa rồi. Qua việc patch apk chúng tra có thể thay đổi nhỏ trong cách kiểm tra và xử lý dữ liệu của ứng dụng, đơn giản như bỏ qua việc kiểm tra thiết bị root, hay SSL pinning. Thậm chí chúng ta còn tạo ra được một phần mềm mã độc giả mạo ứng dụng gốc nữa. Về patch apk thì mình cũng đã có một bài viết tại link sau: https://viblo.asia/p/tim-hieu-dang-ctf-reverse-android-dich-nguoc-va-patch-file-apk-Eb85okv252G

Bên cạnh việc cần có kiến thức về Android, biết đọc và sửa được mã Smali ra thì quá trình patch một tệp tin apk cũng khá phức tạp. Chúng ta sẽ cần đi qua **5 bước** với **3 công cụ**: decompile tệp tin apk bằng công cụ apktool => tìm kiếm tệp tin Smali cần sửa => sửa code Smali => build lại tệp tin apk mới => ký tệp tin apk.

Giờ đây, với công cụ APK Editor Pro, chúng ta có thể decompile và patch apk ngay trên thiết bị Android, và chỉ cần dùng duy nhất 1 công cụ mà thôi.

![](https://images.viblo.asia/2540a115-69ae-4cb1-8395-cd30800127e0.png)

Chúng ta sẽ tìm hiểu về công cụ này qua việc làm một đề CTF ngay sau đây.

![](https://images.viblo.asia/d16adf6d-497d-4580-8ccb-1522d53ba364.png)

# Giao diện chính
Giao diện chính của công cụ có 3 chức năng chính là:
- Lựa chọn tệp tin APK: chọn tệp tin APK lưu trữ trong bộ nhớ ngoài.
- Lựa chọn tệp tin APK từ ứng dụng cài trên thiết bị: ứng dụng cài đặt từ CHplay sẽ được lưu lại trong thư mục cố định trên thiết bị, công cụ sẽ tìm và mở tệp tin APK tại đây.
- Cài đặt công cụ: một số cài đặt, tuy nhiên các tuỳ chỉnh tại đây không có nhiều tác dụng lắm, do đó chúng ta có thể bỏ qua phần cài đặt cũng được.

![](https://images.viblo.asia/7de52b4b-70d5-46aa-9c0c-93db33d6ef31.png)

# Lựa chọn tệp tin APK từ bộ nhớ ngoài
Đối với bộ nhớ ngoài, chúng ta có thể chọn tệp tin APK từ hai nơi:
- Bộ nhớ ngoài của thiết bị: thường thấy nhất là thư mục `/storage/emulated/0/Download` - nơi lưu những tệp tin tải về từ trình duyệt và một số ứng dụng.
- Thẻ nhớ ngoài

![](https://images.viblo.asia/7611914d-ac41-4227-bd9f-d1b81c4e2739.png)

Mặc định sẽ được lựa chọn từ bộ nhớ ngoài của thiết bị, nếu muốn chọn tệp tin APK trong thẻ nhớ thì chúng ta sẽ nhấn vào biểu tượng hình thẻ nhớ ở góc trên bên phải màn hình. Ở đây mình chạy ứng dụng demo trên máy ảo Android - Genymotion nên sẽ không có thẻ nhớ để truy cập thử.

# Lựa chọn tệp tin APK từ ứng dụng cài trên thết bị
Chúng ta có thể lọc các phần mềm để dễ dàng tìm thấy ứng dụng mong muốn hơn. Để truy cập bộ lọc chúng ta nhấn dấu 3 chấm ở góc trên bên phải màn hình.

![](https://images.viblo.asia/43d11ec0-da2e-4a0a-af8e-8eb8756c8252.png)

Ở đây mình sẽ thử làm việc với ứng dụng PicoCTF. Sau khi chọn ứng dụng thì sẽ có 4 lựa chọn:
- Chỉnh sửa toàn bộ: chỉnh sửa mã nguồn ứng dụng
- Chỉnh sửa đơn giản: thay đổi nội dung một số tệp tin
- Chỉnh sửa các thông tin cơ bản của ứng dụng
- Chỉnh sửa các tệp tin XML

Sau đây chúng ta sẽ tìm hiểu toàn bộ các chế độ này.

# Các chế độ chỉnh sửa
## Chế độ chỉnh sửa tệp tin XML
![](https://images.viblo.asia/84c6a0fd-30bb-4824-b80c-1b07d83fe6f4.png)

Trong chế độ này, chúng ta chỉ có thể xem và chỉnh sửa các tệp tin XML, VD như: AndroidManifest, /res/drawable,...

![](https://images.viblo.asia/74409781-affb-4c7e-bd42-68c7ce9ac088.png)

## Chế độ chỉnh sửa thông tin cơ bản của ứng dụng
![](https://images.viblo.asia/e05e807c-11dc-4918-88df-7cec4cebe94d.png)

Ở chế độ này, chúng ta có thể chỉnh sửa được:
- Biểu tượng
- Tên ứng dụng
- Địa điểm cài đặt ứng dụng
- Thông tin phiên bản
- Thông số SDK

![](https://images.viblo.asia/db332f45-d2a2-4165-ac8b-7bfa7f36bc0c.png)

## Chế độ chỉnh sửa đơn giản
![](https://images.viblo.asia/b896ba48-4769-487f-b43c-1082eed4fad2.png)

Ở chế độ này chúng ta vẫn chưa chỉnh sửa được gì nhiều, tuy nhiên đã có thể tác động nhiều hơn tới hoạt động của ứng dụng. Chúng ta đã có thể chỉnh sửa toàn bộ tệp tin và dữ liệu mặc định gồm:
- Các thư viện
- Các tệp tin dữ liệu
- Hình ảnh
- Âm thanh

![](https://images.viblo.asia/2791899d-d0db-494b-bffc-95055a0813c3.png)

![](https://images.viblo.asia/fd91a75d-8414-4ef8-ace3-ba435a3e94b9.png)

## Chế độ chỉnh sửa toàn bộ
![](https://images.viblo.asia/61dfb617-cbad-40b1-a405-7f85654b6af6.png)

Đây là chế độ hoàn chỉnh nhất, cho phép tác động sâu nhất vào hoạt động của ứng dụng. Với chế độ này chúng ta có thể dịch ngược tệp tin DEX sang các tệp mã Smali. Sau khi chọn chế độ chỉnh sửa toàn bộ thì chúng ta sẽ chọn Giải mã toàn bộ tệp tin để tiện cho việc chỉnh sửa mã nguồn ứng dụng.

![](https://images.viblo.asia/de30d41a-b48a-4b7b-a499-abf59708296a.png)

Sau khi chọn xong thì tệp tin APK sẽ được giải mã và chia thành 3 tab:
- String: các xâu ký tự sử dụng bởi ứng dụng, dữ liệu này thường xuất hiện trong tệp tin strings.xml
- Files: duyệt toàn bộ tệp tin của ứng dụng, bao gồm các tài nguyên và mã nguồn.
- Manifest: một phần dữ liệu trong tệp tin AndroidManifest.xml

![](https://images.viblo.asia/3550e94d-f5b0-478d-b3cb-e7d3081bd68a.png)

![](https://images.viblo.asia/997ed665-18a6-419c-a503-b45fe59b907d.png)

![](https://images.viblo.asia/5af6443d-9cf1-4af0-a3a4-cc111437cf22.png)

Đặc biệt, ở trong tab "Files", khi click vào nút "Smali" thì APK Editor Pro sẽ chuyển đổi các tệp tin Dex thành mã nguồn Smali để chúng ta tiến hành chỉnh sửa.

![](https://images.viblo.asia/98423fe0-962e-4f16-a9e4-3a7da7cac16d.png)

![](https://images.viblo.asia/fe2a0456-d27a-4f8e-add7-9b0594d5a0fe.png)

### Demo patch app
Ở bài CTF này, khi bấm vào nút sẽ hiện lên dòng chữ **`don't wanna`**, để hoàn thành bài CTF chúng ta sẽ cần sửa code smali để khi nhấn nút sẽ hiện ra flag. 

![](https://images.viblo.asia/e03dbcc3-491a-485d-8cbe-f95d7de8d5c5.png)

Cụ thể là đổi mã nguồn sao cho khi sự kiện nhấn nút xảy ra sẽ gọi làm **`yep()`** thay vì gọi làm **`nope()`**. Tệp tin cần chỉnh sửa là FlagstaffHill.smali 

![](https://images.viblo.asia/cfcc98b1-a27f-404b-97d2-884349403412.png)

![](https://images.viblo.asia/249861ac-e539-40fb-ba51-569179476ba1.png)

Sửa hàm **`nope()`** trong sự kiện nhấn nút thành hàm **`yep()`**.

![](https://images.viblo.asia/c5253d66-fb42-4ab4-b0b3-45141003936e.png)

Sau khi sửa thì chúng ta sẽ nhấn vào biểu tượng lưu ở thanh bên dưới. Biểu tượng này sẽ tự động sáng lên ngay khi chúng ta thực hiện chỉnh sửa mã nguồn.

Khi đã hoàn tất chỉnh sửa thì chúng ta sẽ nhấn vào nút "build" ở góc trên bên phải màn hình để tạo ra ứng dụng mới.

![](https://images.viblo.asia/fcfacc47-4b51-48f4-aaaf-1ae735792d74.png)

Quá trình tạo ứng dụng mới sẽ được thực hiện tự động, ký ứng dụng tự động, chúng ta chỉ cần ngồi chờ thôi. Chúng ta cũng có thể thay đổi chữ ký sử dụng trong bước ký ứng dụng trong phần cài đặt của APK Editor Pro.

![](https://images.viblo.asia/6979fa56-e6bc-4f20-a5fb-f6ee4516916d.png)

Sau khi hoàn tất chúng ta có thể tiến hành cài đặt ứng dụng mới vào thiết bị, tuy nhiên cần xoá ứng dụng cũ đi trước khi cài đặt ứng dụng mới. Việc xoá ứng dụng hiện tại và cài đặt ứng dụng mới đều có thể thực hiện qua các nút ở thanh dưới cùng.

![](https://images.viblo.asia/fe09f4b8-e3e3-473a-9541-3e25908ffbe3.png)

Kết quả ứng dụng sau khi sửa mã nguồn smali:

![](https://images.viblo.asia/bbba1529-3547-46cd-b231-7c05a377f815.png)

Như vậy chúng ta đã thành công patch một ứng dụng Android bằng công cụ APK Editor Pro.