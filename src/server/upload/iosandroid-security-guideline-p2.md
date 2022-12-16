# [iOS/Android] Hiển thị privacy policy 
Mức độ cần thiết: bắt buộc

### Rủi ro
Đối với những hệ thống, dịch vụ có lưu giữ thông tin cá nhân, nếu như không biểu hiện rõ mục đích sử dụng và việc có hay không cung cấp thông tin cho người thứ 3, thì sẽ có khả năng mang đến sự nghi ngờ, bất an cho người dùng.

### Giải pháp
Nếu có lưu giữ và sử dụng thông tin cá nhân của người dùng, thì cần hiển thị privacy policy, và có ghi rõ loại thông tin đó là thông tin gì, mục đích sử dụng, và có cung cấp thông tin cho bên thứ 3 hay không.

# [iOS/Android] Chức năng force update
Mức độ cần thiết: bắt buộc

### Rủi ro
Điều gì sẽ xảy ra nếu app thiếu chức năng force update? Trường hợp phát hiện ra app có bug nghiêm trọng, hoặc có vấn đề về security, thì nếu như không có chức năng force update, sẽ không thể bắt buộc người dùng update kịp thời, và tổn thất có thể sẽ lan rộng hơn.

### Giải pháp
Thực hiện check version của app vào thời điểm thích hợp, ví dụ như lúc khởi động lại app, login, hoặc khi request API,.., trường hợp cần version up thì push thông báo update cho người dùng, đồng thời giới hạn sử dụng version đang có vấn đề.

# [iOS/Android] Thuật toán hash
Mức độ cần thiết: bắt buộc

### Rủi ro
Thuật toán hash MD5 và SHA-1 đã được chỉ ra là có vấn đề về tính chất ngăn xung đột (collision resistance), nên không sử dụng.

### Giải pháp
Sử dụng thuật toán SHA-256 khi tạo hash.

# [iOS/Android] Escape input value của người dùng
Mức độ cần thiết: bắt buộc

### Rủi ro
Trường hợp sử dụng input value của người dùng thành giá trị output của app, nếu không thực hiện escape thích hợp, thì sẽ có nguy cơ gặp phải các loại tấn công (injection) dưới đây:

* SQL injection
* JavaScript injection
* OS command injection

### Giải pháp
Thực ra trường hợp tương ứng ít xảy ra với app native, tuy nhiên trong trường hợp sử dụng các giá trị input từ người dùng như dưới đây, thì bằng cách sử dụng escape, validation, hay place holder thích hợp, sẽ tránh được tấn công.

* SQL
* HTML
* OSコマンド

# [iOS] Cache dữ liệu truyền
Mức độ cần thiết: bắt buộc

### Rủi ro
Nếu thực hiện truyền dữ liệu bằng URLSession,..thì dữ liệu truyền bởi OS sẽ bị lưu tự động vào file (cache.db) trong thiết bị. 
Dữ liệu cache này do được lưu bằng plain text, kể cả truyền bằng HTTPS, nên có khả năng cung cấp thông tin có lợi cho kẻ tấn công.

### Giải pháp
Khi tạo URLSession, bằng việc set nil cho URLSessionConfigurationのurlCache, sẽ tránh được việc lưu cache.

```
let config = URLSessionConfiguration.default
config.urlCache = nil
let session = URLSession(configuration: config)
```

Kể cả trường hợp sử dụng URLSessionConfiguration.ephemeral thì cũng có thể tránh được việc lưu cache, nhưng trường hợp này có nhược điểm là sẽ huỷ URLSession, Cookie cũng như thông tin xác thực, nên sẽ có vấn đề nếu sử dụng Cookie để quản lý session.

```
let config = URLSessionConfiguration.ephemeral
let session = URLSession(configuration: config)
```

Lưu ý là dù có set eloadIgnoringCacheData thành cachePolicy của URLRequest thì cũng không tránh được việc lưu vào cache.db

# [iOS/Android] Thông tin của certificate
Mức độ cần thiết: bắt buộc

### Rủi ro
Thông tin người phát hành certificate sử dụng ở chữ ký của app (chữ ký của apk của Android hoặc Provisioning Profile của iOS) có khả năng bị công khai, do đó nếu ghi lên đó thông tin cá nhân như họ tên, địa chỉ email,.. thì sẽ có nguy cơ trở thành mục tiêu tấn công của hacker.

### Giải pháp
Nếu không có yêu cầu đặc biệt nào thì không viết thông tin cá nhân của người phát triển lên thông tin người phát hành certificate, mà thay vào đó ghi tên công ty hoặc địa chỉ email chuyên dùng để làm địa chỉ đại diện.

# [iOS] App Transport Security(ATS)
Mức độ cần thiết: khuyến khích

### Rủi ro
Nếu vô hiệu hoá App Transport Security (ATS) thì đồng nghĩa với việc chấp nhận truyền thông tin bằng phương thức không an toàn như truyền bằng plain text. Bên cạnh đó, có khả năng trong tương lai Apple sẽ bắt buộc hoá việc cài đặt ATS.

### Giải pháp
Nếu phía server có khả năng đáp ứng thì nên cài đặt App Transport Security (ATS).

# [Android] Phương thức truyền thông tin Intent
Mức độ cần thiết: khuyến khích

### Rủi ro
Khi giao nhận thông tin bằng Intent trong quá trình liên kết với app, do parameter của Intent sẽ được xuất ra thành log tiêu chuẩn, cho nên sẽ có nguy cơ app khác nhận được parameter đã gửi.

### Giải pháp
Khi giao nhận thông tin bằng Intent khi liên kết với app, nếu sử dụng putExtra thay vì parameter thì sẽ không xuất ra thành log tiêu chuẩn, vì vậy trường hợp giao nhận các thông tin quan trọng bằng Intent thì nên sử dụng putExtra.


### Tham khảo:
https://qiita.com/alt_yamamoto/items/f67a7ddb6ba13cca7369