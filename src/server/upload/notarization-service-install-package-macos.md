Bài viết hôm nay mình sẽ giới thiệu cách để tạo 1 file .pkg của macos và verify với notarizartion service của Apple để có thể install app từ bên ngoài Mac Apple Store.

# 1. Developer ID Certificates
Bạn có thể nhận được nhiều chứng chỉ từ Chương trình nhà phát triển. Theo mặc định, bạn nhận được chứng chỉ 'Nhà phát triển Mac', bạn có thể sử dụng chứng chỉ này để xây dựng và thử nghiệm cục bộ ứng dụng của mình.

Để phân phối tệp nhị phân (ứng dụng và công cụ dòng lệnh) bên ngoài App Store, bạn cần chứng chỉ 'Developer ID Application’ certificate'. Để ký gói trình cài đặt để phân phối bên ngoài Mac App Store, bạn cần chứng chỉ 'Developer ID Installer'.

Chúng tôi sẽ cần cả hai loại chứng chỉ ID nhà phát triển, chứng chỉ đầu tiên để ký vào công cụ dòng lệnh và chứng chỉ thứ hai để ký và công chứng gói trình cài đặt.

Nếu bạn chưa tạo chúng, bạn có thể làm như vậy trong Xcode hoặc trong Cổng thông tin nhà phát triển. Nếu bạn đã có chứng chỉ nhưng trên một máy Mac khác, bạn cần xuất chúng và nhập lại chúng trên máy Mac mới. Tạo chứng chỉ mới có thể làm mất hiệu lực của các chứng chỉ hiện có! Cẩn thận.

Khi bạn đã tạo hoặc nhập các chứng chỉ trên máy làm việc của mình, bạn có thể xác minh sự hiện diện của chúng trong Terminal bằng:

`security find-identity -p basic -v`

Lệnh này sẽ liệt kê tất cả các chứng chỉ có sẵn trên máy Mac này. Kiểm tra để đảm bảo rằng bạn có thể thấy chứng chỉ ‘Developer ID Application’ certificate’ và ‘Developer ID Installer’. Nếu bạn là thành viên của nhiều nhóm, bạn có thể thấy nhiều chứng chỉ cho mỗi nhóm.

Sau đó, bạn có thể xác định các chứng chỉ (hoặc 'danh tính') bằng số hex dài hoặc bằng tên mô tả, ví dụ:  "Developer ID Installer: Bla bla bla (ABCD123456)"

Mã mười ký tự ở cuối tên là ID nhóm nhà phát triển của bạn. Hãy ghi chú lại nó. Nếu bạn là thành viên của nhiều nhóm nhà phát triển, bạn có thể có nhiều chứng chỉ ID nhà phát triển và ID nhóm sẽ giúp bạn phân biệt chúng.

# 2. Application Specific Password cho Developer Account

Apple yêu cầu Tài khoản nhà phát triển phải được bảo vệ bằng xác thực hai yếu tố. Để cho phép quy trình công việc tự động yêu cầu xác thực, bạn có thể tạo mật khẩu dành riêng cho ứng dụng.

Tạo mật khẩu dành riêng cho ứng dụng mới trong cổng Apple ID cho tài khoản nhà phát triển của bạn.

Hỗ trợ của Apple: [Sử dụng mật khẩu dành riêng cho ứng dụng](https://support.apple.com/en-us/HT204397)

Bạn sẽ chỉ được hiển thị mật khẩu khi bạn tạo nó. Tạo ngay 'Mục mật khẩu mới' trong Chuỗi khóa của bạn với các trường sau:

Tên mục chuỗi khóa: Developer-altool
Tên tài khoản: email tài khoản nhà phát triển của bạn
Mật khẩu: mật khẩu dành riêng cho ứng dụng mà bạn vừa tạo
Điều này sẽ tạo một mục mật khẩu dành riêng cho nhà phát triển mà chúng tôi có thể truy cập một cách an toàn từ các công cụ.

Nếu muốn, bạn cũng có thể lưu trữ mật khẩu dành riêng cho ứng dụng trong một trình quản lý mật khẩu khác, nhưng các công cụ Xcode có một tùy chọn đặc biệt để sử dụng Keychain.

# 3. Thay đổi Install Build Location
1. trong cùng một chế độ xem như trên, hãy nhập ‘Bản dựng cài đặt’ vào trường tìm kiếm, thao tác này sẽ hiển thị cài đặt ‘Vị trí sản phẩm bản dựng lắp đặt’
2. nhấp đúp vào giá trị trong cột Dự án (biểu tượng màu xanh), điều này sẽ mở ra một cửa sổ bật lên
3. thay đổi giá trị thành $ SRCROOT / build / pkgroot

![](https://images.viblo.asia/935dd69f-d82e-46d1-9060-feb8f1c7e16e.png)

# 4. Build pkg

Công cụ dòng lệnh có thể được ký, nhưng không được công chứng trực tiếp. Tuy nhiên, bạn có thể công chứng tệp zip, dmg hoặc pkg có chứa Công cụ dòng lệnh. Ngoài ra, người dùng và quản trị viên cài đặt công cụ của bạn sẽ dễ dàng hơn nhiều khi nó có trong gói cài đặt thích hợp.

Chúng tôi có thể sử dụng thư mục pkgroot làm trọng tải của chúng tôi để xây dựng gói trình cài đặt:


```
pkgbuild --root build/pkgroot \
           --identifier "com.example.hello" \
           --version "1.0" \
           --install-location "/" \
           --sign "Developer ID Installer: Bla bla bla (ABCD123456)" \
           build/hello-1.0.pkg
```

# 5. Notarizing Installer Package

```
xcrun altool --notarize-app \
             --primary-bundle-id "com.example.com" \
             --username "username@example.com" \
             --password "@keychain:Developer-altool" \
             --asc-provider "ABCD123456" \
             --file "build/hello-1.0.pkg"
```

username: là email tài khoản nhà phát triển của bạn.
asc-provider: ID Nhóm gồm mười chữ số của bạn. Nếu bạn chỉ là thành viên trong một nhóm, bạn không cần cung cấp thông tin này.
@keychain: yêu cầu altool lấy mật khẩu dành riêng cho ứng dụng từ một mục chuỗi khóa có tên Developer-altool. (Nhớ chúng ta đã tạo trước đó chứ?)

Việc này sẽ tốn một lúc. Khi lệnh đã tải thành công pkg lên Máy chủ công chứng của Apple, lệnh đó sẽ trả về RequestUUID. Yêu cầu công chứng của bạn sẽ được xếp hàng đợi và cuối cùng được xử lý. Bạn có thể kiểm tra trạng thái yêu cầu của mình với:

```
xcrun altool --notarization-info "Your-Request-UUID" \
             --username "username@example.com" \                                    
             --password "@keychain:Developer-altool"  
```

Apple cũng sẽ gửi email đến tài khoản nhà phát triển của bạn khi quá trình hoàn tất. Điều này hiếm khi mất hơn một hoặc hai phút. Khi quá trình hoàn tất, bạn có thể chạy lệnh thông tin công chứng ở trên để biết một số chi tiết. Thông tin sẽ bao gồm một liên kết chứa nhiều thông tin hơn, có thể hữu ích khi yêu cầu của bạn bị từ chối.

Lưu ý rằng các liên kết thông tin sẽ hết hạn sau 24 giờ hoặc lâu hơn. Bạn nên sao chép bất kỳ thông tin nào bạn muốn lưu giữ lâu hơn.



-----

Chỉ với những đoạn command đơn giản đã có thể công chứng ứng dụng của bạn. Và người dùng có thể tải và cài đặt từ bên ngoài Mac Store mà không nhận phải bất cứ thông báo nguy hiểm nào.