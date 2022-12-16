![](https://images.viblo.asia/cbaafb99-1eca-4ebb-8402-e0b04c32af50.jpg)

Bạn muốn App Icon của bạn trên màn hình thay đổi theo thời gian hay mục đích nào đó mà lại không muốn phải build lại app thì mình làm như thế nào?

Ví dụ:
1. Thay đổi App Icon theo ban ngày, ban đêm.
2. Thay đổi theo sự kiện.
3. Thay đổi dựa trên thao tác người dùng.
4. .... Cùng hàng tỉ dự kiện mà bạn có thể dựa vào đó để làm.

Thật ra thủ thuật này cũng có từ phiên bản iOS 10.3 trở đi, Apple đã cung cấp một chức năng thú vị cho developer là thay đổi App Icon. 
# Apple's API 
Trong tài liệu Apple' API, có 3 điều cần hiểu rõ.

```
var supportsAlternateIcons: Bool { get }

var alternateIconName: String? { get }

func setAlternateIconName(String?, completionHandler: ((Error?) -> Void)? = nil)
```

* **supportsAlternateIcons** là thuộc tính chỉ đọc, thuộc tính này cho biết là app bạn có thể thay đổi App Icon không? 

* **alternateIconName** cũng là thuộc tính chỉ đọc, cho biết tên của icon đang được hiển thị.

* **setAlternateIconName** là hàm cho phép set tên icon, nếu để nil, app sẽ lấy icon chính để hiển thị.

Chi tiết hơn, bạn có thể vào đọc tài liệu của Apple: https://developer.apple.com/documentation/uikit/uiapplication/2806815-supportsalternateicons
# Điều kiện cần thiết
Trước khi tiến hành làm demo, bạn cần có một vài icon để sử dụng cho mục đích thay đổi icon app.

## Bước 1: Chuẩn bị icon

***Một điều lưu ý rằng: không để các tập tin Icon trong Assets, mà để như hình dưới đây.***

Đưa các files icon vào app như sau

![](https://images.viblo.asia/2d7ca7a5-14f6-458a-9dfb-a0ca953d6d8d.png)

## Bước 2: Cài đặt vào info.plist

Đưa các thông tin file icon đó vào info.plist

```
<key>CFBundleIcons</key>
<dict>
    <key>CFBundleAlternateIcons</key>
    <dict>
        <key>Test1</key>
        <dict>
            <key>CFBundleIconFiles</key>
            <array>
                <string>Test1</string>
            </array>
            <key>UIPrerenderedIcon</key>
            <false/>
        </dict>
        <key>Test2</key>
        <dict>
            <key>CFBundleIconFiles</key>
            <array>
                <string>Test2</string>
            </array>
        </dict>
    </dict>
    <key>CFBundlePrimaryIcon</key>
    <dict>
        <key>CFBundleIconFiles</key>
        <array>
            <string>AppIcon60x60</string>
        </array>
    </dict>
</dict>
```

## Bước 3: Coding

Đoạn code để thay đổi App Icon, sử dụng hàm `setAlternateIconName`  của `UIApplication`.
```
UIApplication.shared.setAlternateIconName("<Tên Icon App được set trong info.plist>", completionHandler: { (error) in
    if error != nil {
        print("\(String(describing: error?.localizedDescription))")
    }
})
```

# Screen ở demo app
Trước khi set icon
![](https://images.viblo.asia/27da7a8b-aeff-4f06-a1a9-4ce5466679b5.png)

Màn chính của App
![](https://images.viblo.asia/08392cc8-a590-4ff1-a61a-cfb0d469e173.png)

Khi nhấn vào button Change Icon
![](https://images.viblo.asia/772b35ce-04c9-48c2-b4c8-8b6852031f43.png)

Và đây là kết quả
![](https://images.viblo.asia/c2ebd643-6acf-4a50-80ec-6913ca5e7cdf.png)

Source Code demo:

https://github.com/tranhanhuy/swift-set-AlternateIcon

Nguồn:

https://ashishkakkad.com/2020/03/how-to-set-alternate-icon-for-an-ios-app-programmatically/