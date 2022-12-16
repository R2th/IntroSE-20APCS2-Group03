**Bài viết này là một phần trong loạt series "Bảo mật dữ liệu trong Android":**

**1.Mã hóa trong Android (Phần 1)**

**2.Mã hóa trong Android (Phần 2)**

**3.Mã hóa dữ liệu lớn**

**4.Vector khởi tạo**

**5.Khóa không hợp lệ**

**6.Vân tay**

**7.Xác nhận thông tin thực**

 

Đầu tiên, muốn tìm hiểu về vấn đề bảo mật, chúng ta cần phải biết những điều cơ bản của Cryptography - mật mã: các loại thuật toán (đối xứng, bất đối xứng), các loại mật mã, các loại khóa...Khi đã biết những vấn đề cơ bản đó, việc tìm hiểu bài viết này sẽ giúp chúng ta thấy cách mã hóa hoạt động như thế nào trong Android.

**Nội dung bài viết:**
* Kiến trúc mật mã Java
* Android Key Store
* Sample code
* What's Next
* Các mẹo bảo mật

## 1. Kiến trúc mật mã trong Java

Android xây dựng trên kiến trúc mã hóa Java (JCA), cung cấp API cho chữ ký số, chứng chỉ, mã hóa, tạo và quản lý khóa.

![](https://images.viblo.asia/68ad9a3c-f2a2-4774-bae6-a314ee942098.png)

**KeyGenerator** - cung cấp API công khai để tạo các khóa mật mã đối xứng.

**KeyPairGenerator** - một lớp công cụ có khả năng tạo khóa riêng và khóa chung liên quan đến việc sử dụng thuật toán mà nó được khởi tạo.

**SecretKey** - một khóa bí mật (đối xứng). Mục đích của lớp này là nhóm tất cả các khóa bí mật (ví dụ: SecretKeySpec).

**PrivateKey** - một khóa riêng (không đối xứng). Mục đích của lớp này là nhóm tất cả các khóa riêng (ví dụ: RSAPrivateKey).

**PublicKey** - khóa công khai. Lớp này không chứa phương thức hoặc hằng số. Nó chỉ phục vụ để nhóm tất cả cáclớp khóa công khai (ví dụ: RSAPublicKey).

**KeyPair** - lớp này vai trò giống như một ràng buộc cho một cặp khóa (khóa chung và khóa riêng). Nó không thực thi bất kỳ bảo mật nào và, nên được xử lý như PrivateKey.

**SecureRandom** - tạo các số giả ngẫu nhiên an toàn bằng mật mã. Tôi sẽ không đề cập nó trực tiếp trong loạt bài này, nhưng nó được sử dụng rộng rãi bên trong các thành phần KeyGenerator, KeyPairGenerator và các khóa triển khai.

**KeyStore** - cơ sở dữ liệu với cơ chế bảo vệ dữ liệu được bảo mật tốt, được sử dụng để lưu, nhận và xóa các khóa. Yêu cầu mật khẩu đầu vào và mật khẩu cho mỗi một khóa. Nói cách khác, đây là tệp được bảo vệ mà bạn cần tạo, đọc và cập nhật (với API được cung cấp).

**Certificate**  - chứng chỉ được sử dụng để xác nhận và lưu các khóa bất đối xứng.

**Cipher** - cung cấp quyền truy cập vào việc triển khai các mật mã mã hóa để mã hóa, giải mã, gói, hủy ghép và ký.

**Provider**  - xác định một tập hợp các triển khai có thể mở rộng, API độc lập. Provider  là các nhóm thuật toán khác nhau hoặc các tùy chỉnh của họ. 

## 2. Android Key Store

Trong phiên bản Android 18, AndroidKeyStore đã được giới thiệu:

> The Android Key Store system lets you store cryptographic keys in a container to make it more difficult to extract from the device.

> Once keys are in the key store, they can be used for cryptographic operations with the key material remaining non-exportable.

> Moreover, it offers facilities to restrict when and how keys can be used, such as requiring user authentication for key use or restricting keys to be used only in certain cryptographic modes.


AndroidKeyStore là implement của JCA, trong đó:

* Không yêu cầu mật khẩu KeyStore (all)
* Key chính không bao giờ đi vào tiến trình ứng dụng
* Key chính có thể được ràng buộc với phần cứng an toàn (Vùng tin cậy được)
* Các khóa bất đối xứng có sẵn từ 18+
* Các khóa đối xứng có sẵn từ 23+

Trước Android 18, bạn sẽ cần tạo một tệp ở đâu đó trong bộ lưu trữ thiết bị cục bộ hoặc bên ngoài của bạn, nơi lưu giữ tất cả các khóa của bạn (và nó thực sự dễ dàng được tìm thấy và giải nén). Nhưng với AndroidKeyStore bạn không cần tạo bất cứ thứ gì, hệ thống sẽ quản lý mọi thứ cho bạn:

* Nếu thiết bị hỗ trợ môi trường thực thi tin cậy (TEE), các khóa của bạn sẽ được lưu ở đó (tùy chọn an toàn nhất);
* Nếu thiết bị không hỗ trợ TEE, các khóa sẽ được lưu trữ trong môi trường phần mềm mô phỏng, được cung cấp bởi hệ thống.

Trong cả hai trường hợp, các khóa của bạn sẽ tự động bị xóa khỏi hệ thống sau khi xóa ứng dụng. Ngoài ra khóa chính sẽ không bao giờ được lộ ra, ngay cả với bạn (chúng ta sẽ thấy điều này sau). Chúng ta sẽ chỉ làm việc với các khóa references, được lấy từ KeyStore System Service.

## 3. Sample code

Cách tốt nhất để chứng minh các API hoạt động là phát triển project mẫu, với các trường hợp thực tế bạn có thể gặp phải trong quá trình phát triển ứng dụng của riêng mình.
Vì bài viết này nằm trong series tìm hiểu về bảo mật dữ liệu trong Android nên tôi xin phép được đươc link của project mẫu từ tác giả của bài viết đã tham khảo lên đây.

https://github.com/temyco/security-workshop-sample

Bạn hãy thử vào tìm hiểu xem project đó hoạt động như thế nào nhé.

## 4. What's next

Trong bài viết tiếp theo về Bảo mật dữ liệu trong Android (Phần 2) chúng ta sẽ tìm hiểu:

> Cách làm việc với key guard, cách tạo và quản lý khóa mật mã và cách mã hóa và giải mã dữ liệu trong Android.
 
## 5. Các mẹo bảo mật

> Đặt điện thoại của bạn ở chế độ khóa sau một thời gian nhàn rỗi và phải có yêu cầu xác thực để mở khóa. Nếu có thể, hãy sử dụng thứ gì đó mạnh hơn việc dùng 4 chữ số PIN để mở khóa.

> Thiết bị di động là một cánh cổng mở cho sự riêng tư, bí mật và tiền bạc của tất cả mọi người. Hãy cẩn thận những ứng dụng bạn chọn để cài đặt và đặc biệt chú ý đến những quyền mà mỗi ứng dụng đang yêu cầu. Chẳng hạn, nó là bất hợp lý nếu một ứng dụng thời tiết yêu cầu quyền truy cập vào ảnh của bạn???

> Tạo mật khẩu đủ mạnh và phức tạp và thay đổi chúng thường xuyên và không bao giờ sử dụng lại mật khẩu trên một trang web hoặc tài khoản khác.


Linh bài viết gốc: https://proandroiddev.com/secure-data-in-android-encryption-in-android-part-1-e5fd150e316f