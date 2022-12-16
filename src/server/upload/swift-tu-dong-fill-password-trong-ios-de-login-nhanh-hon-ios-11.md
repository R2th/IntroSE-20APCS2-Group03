![](https://images.viblo.asia/7186d600-b971-4ef4-aa27-7c3db1f51954.png)
Bạn có thể xem các trình duyệt máy tính như Chrome hay Safari đưa ra đề xuất và tự động điền password. Nó khá tiện. 
Từ iOS 11 trở lên tự động điền password đã được giới thiệu lại WWDC.
Bất kỳ các control nào sử dụng UITextInput như UITextField hay UITextView đều sử dụng được tính năng này.

Dữ liệu người dùng được lưu trong thiết bị, đồng bộ với iCloud keychain và sẽ có sẵn với tất cả thiết bị dùng cùng một iCloud.

## Làm thế nào để kích hoạt tự động fill password?
UITextFiled hoặc UITextView tuân thủ protocol UITextInput như đã đề cập trước đó. 
UITextInput sử dụng UIKeyInput và UIKeyInput tuân thủ protocol UITextInputTraits. 
UITextInputTraits có một biến var optional là textContentType sẽ cung cấp cho bàn phím thêm thông tin về tài liệu văn bản. 

![](https://images.viblo.asia/73ac1bac-4cbd-4feb-be82-054ec9f89688.png)

Cho đến iOS 11, có sẵn các textContentTypes sau:
```
extension UITextContentType {
    @available(iOS 10.0, *)
    public static let name: UITextContentType

    @available(iOS 10.0, *)
    public static let namePrefix: UITextContentType

    @available(iOS 10.0, *)
    public static let givenName: UITextContentType

    @available(iOS 10.0, *)
    public static let middleName: UITextContentType

    @available(iOS 10.0, *)
    public static let familyName: UITextContentType

    @available(iOS 10.0, *)
    public static let nameSuffix: UITextContentType

    @available(iOS 10.0, *)
    public static let nickname: UITextContentType

    @available(iOS 10.0, *)
    public static let jobTitle: UITextContentType

    @available(iOS 10.0, *)
    public static let organizationName: UITextContentType

    @available(iOS 10.0, *)
    public static let location: UITextContentType

    @available(iOS 10.0, *)
    public static let fullStreetAddress: UITextContentType

    @available(iOS 10.0, *)
    public static let streetAddressLine1: UITextContentType

    @available(iOS 10.0, *)
    public static let streetAddressLine2: UITextContentType

    @available(iOS 10.0, *)
    public static let addressCity: UITextContentType

    @available(iOS 10.0, *)
    public static let addressState: UITextContentType

    @available(iOS 10.0, *)
    public static let addressCityAndState: UITextContentType

    @available(iOS 10.0, *)
    public static let sublocality: UITextContentType

    @available(iOS 10.0, *)
    public static let countryName: UITextContentType

    @available(iOS 10.0, *)
    public static let postalCode: UITextContentType

    @available(iOS 10.0, *)
    public static let telephoneNumber: UITextContentType

    @available(iOS 10.0, *)
    public static let emailAddress: UITextContentType

    @available(iOS 10.0, *)
    public static let URL: UITextContentType

    @available(iOS 10.0, *)
    public static let creditCardNumber: UITextContentType

    @available(iOS 11.0, *)
    public static let username: UITextContentType

    @available(iOS 11.0, *)
    public static let password: UITextContentType
}
```

Hai textContentTypes cuối cùng được thêm vào trong iOS 11 là tên người dùng và mật khẩu.

Chỉ cần đặt textContentType cho mỗi textField.

```
usernameTF.textContentType = .username
passwordTF.textContentType = .password
```

Bạn cũng có thể thiết lập từ storyboard. Trong UITextInputTraits ở phần kiểm tra thuộc tính:
![](https://images.viblo.asia/73d8eef6-e3e2-4061-9fa5-aeefbc0f280f.png)

Biên dịch và chạy ứng dụng. 
Nhấp vào trường nhập văn bản và bạn sẽ thấy bàn phím có biểu tượng chìa khóa bên cạnh. 
![](https://images.viblo.asia/d68c0692-70e7-4e31-a409-122fafc66f92.jpeg)

Nhấn vào biểu tượng chìa khóa và nó sẽ yêu cầu xác thực. Nếu thiết bị có TouchID, nó sẽ yêu cầu xác thực touchID.

> Lưu ý: Khi màn hình xác thực được gọi, ứng dụng sẽ chuyển sang trạng thái không hoạt động. 
Bạn không nên đóng màn hình đăng nhập với các trường văn bản khi ứng dụng không hoạt động.

Sau khi xác thực, HĐH sẽ hiển thị danh sách các mật khẩu đã lưu mà bạn có thể chọn mật khẩu phù hợp với ứng dụng. 
Sau đó nó sẽ tự động fill vào tất cả các trường textField tương ứng với textContentType được cung cấp.

## Ứng dụng có thể dự đoán password chính xác thay vì bắt người dùng chọn mật khẩu từ danh sách không?

VÂNG CÓ THỂ!. Nếu bạn là người dùng iOS, chắc có thể bạn đã thấy điều này:
![](https://images.viblo.asia/8696a0c2-98e9-4c32-9f13-4ec20fc19a8f.png)

Vì vậy, trước đây HĐH liệt kê tất cả các mật khẩu được lưu trong keychain vì nó không biết rằng ứng dụng này được liên kết với một tên miền. 
Để khắc phục điều này, phải kích hoạt các miền liên quan trong xcode setting.

Trong Setting Xcode → Capabilites → Associated Domains, thêm tên miền trang web của bạn. 
Tên miền phải được bắt đầu bằng từ khóa webcredentials: bởi vì chúng tôi đang sử dụng dịch vụ webcredentials và điều này rất quan trọng. 
Ví dụ: webcredentials: facebook.com

Nó sẽ trông giống như thế này:
![](https://images.viblo.asia/44f7f16e-f8e0-4743-97d8-dadf7b3304be.png)

Đây là tất cả những gì chúng ta cần làm để nói với iOS rằng ứng dụng được liên kết với một trang web. 
Bây giờ chúng tôi cần trang web đồng ý và quay lại ứng dụng để iOS có thể thiết lập kết nối hai chiều.

Hãy xem bài viết khác của tôi về Universal Links trong iOS giải thích về cách thiết lập tệp AASA. Tôi không giải thích nó ở đây. 
Chỉ cần lưu ý rằng các liên kết phổ biến sử dụng tiền tố applinks: thay vì tiền tố webcredentials:

Nội dung tệp AASA sẽ trông như thế này:
![](https://images.viblo.asia/b19901d4-9466-46f4-87a9-3ddad8d50759.png)
> source: wwdc 2017 session 206
> 
Đây là một tệp json với mảng chuỗi số để nhận dạng ứng dụng của ứng dụng trực tuyến.

ID ứng dụng về cơ bản là teamID, theo sau là ký tự dấu chấm (.) Và sau đó là ID gói ứng dụng.

Tệp json này phải được đặt trong thư mục .well-known hoặc trong thư mục root trang web của bạn.
![](https://images.viblo.asia/bd544e61-d79e-4ec1-90b8-2c9c30b1aa79.png)

Biên dịch và chạy ứng dụng. 
Nếu mọi thứ đều phù hợp và thông tin web được chia sẻ có dữ liệu cụ thể cho miền của bạn, nó sẽ được hiển thị phía trên bàn phím như ở trên.

## Làm thế nào để thêm / xóa / sửa mật khẩu?
Trong iOS 11, tính năng này được thêm vào Settings của thiết bị.
![](https://images.viblo.asia/efa7fba3-bf84-45e0-bc37-33cfe4d16879.png)
> click vào Accounts & passwords and Authenticate
> 
![](https://images.viblo.asia/c62999a1-f35e-4b0b-be11-5184e9172a85.png)
> Add/delete/modify password ở đây.

Vậy là hoàn thành quá trình fill mật khẩu vào ứng dụng của bạn.
Nguồn: https://medium.com/@abhimuralidharan.