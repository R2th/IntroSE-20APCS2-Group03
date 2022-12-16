![](https://images.viblo.asia/bc8495eb-a39e-4374-8ef6-463b9e67a136.png)

# Thay đổi App icon kiểu động

Từ iOS 10.3, Apple đã ra mắt một tính năng cực kỳ thú vị, đó là cho phép lập trình viên có thể thay đổi app icon bên trong code. Mặc dù chúng ta chưa thể khiến cho app icon có thể hoạt động tương tự như ứng dụng Đồng hồ mặc định của iOS, tuy nhiên nó vẫn thực sự tuyệt vời. Hãy cùng xem nó hoạt động như thế nào:

## Lý thuyết 

Trong [tài liệu của Apple](https://developer.apple.com/documentation/uikit/uiapplication/2806818-setalternateiconname?language=swift), có ba thứ mà chúng ta cần lưu tâm, đó là:

```
var supportsAlternateIcons: Bool { get }
var alternateIconName: String? { get }
func setAlternateIconName(String?, completionHandler: ((Error?) -> Void)? = nil)
```

* **supportsAlternateIcons**: là một thuộc tính readonly kiểu Boolean, dùng để quyết định liệu ứng dụng có cho thể hỗ trợ việc thay đổi icon kiểu động hay không. Để giá trị của nó là **true**, chúng ta cần cài đặt nó trong file *Info.plist*, chúng ta sẽ tạm thời đề cập đến nó sau. 

* **alternateIconName** cũng là một thuộc tính readonly, dùng để xác định tên của icon động đang được hiển thị. Lưu ý rằng giá trị của thuộc tính này sẽ là nil nếu ứng dụng đang hiển thị icon chính (primary icon).

* **setAlternateIconName** là một phương thức cho phép chúng ta setup icon hiển thị cho ứng dụng. Nếu ta truyền vào một giá trị ***nil***, nghĩa là ứng dụng sẽ hiển thị icon chính.

Để tìm hiểu chi tiết hơn, các bạn có thể đọc tài liệu của Apple tại [đây](https://developer.apple.com/documentation/uikit/uiapplication/2806815-supportsalternateicons?language=swift) 

Khi đã nắm rõ một số khái niệm cơ bản, hãy cùng mở Xcode lên và bắt đầu nào:

## Chuẩn bị

Trước tiên, chúng ta chuẩn bị ba ảnh icon cho ứng dụng với tên gọi như sau: “*pichu.png*”, “*pikachu.png*”, và cuối cùng là “*raichu.png*”.

**Lưu ý: icon sẽ không sử dụng được nếu chúng ta đặt nó vào Image Assest, mà chúng ta phải đặt chúng vào thư mục bên trong project**, giống như ảnh dưới đây: 

![](https://images.viblo.asia/d1768079-6a92-4955-bf62-43ea0ecc8e3a.png)

Tiếp theo, chúng ta tiến hành cài đặt trong file *Info.plist*:

1. Thêm "*Icon files (iOS 5)*" vào bên trong "*Information Property List*".
2. Thêm một thuộc tính đặt tên là *CFBundleAlternateIcons*, có kiểu Dictionary vào "*Icon files (iOS 5)*".
3. Thêm vào *CFBundleAlternateIcons* 3 Dictionary và đặt tên chúng lần lượt là “*pichu*”, “*pikachua*”, và “*raichu*”.
4. Ứng với mỗi dictionary bên trên, chúng ta thêm các thuộc tính có tên *UIPrerenderedIcon* và *CFBundleIconFiles*, sau đó tiến hành thêm giá trị cho nó.

Để biết thêm chi tiết, bạn có thể xem thêm tại [Apple’s Core Foundation Keys Page. ](https://developer.apple.com/library/archive/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html)

Sau đây là file *Info.plist*:

![](https://images.viblo.asia/6733a43e-d44f-43fd-bce2-822d0ab81e87.png)

## Implement

Giả sử chúng ta có ba button trên màn hình, mỗi khi người dùng nhấn vào mỗi một button, thì ứng dụng sẽ tự động cài đặt và hiển thị ba icon tương ứng với mỗi button kể trên. Sau đây là đoạn code mẫu

```
// change app icon to "pichu"
@IBAction func pichuButtonDidTap(_ sender: UIButton) {
  changeIcon(to: "pichu")
}

// change app icon to "pikachu"
@IBAction func pikachuButtonDidTap(_ sender: UIButton) {
  changeIcon(to: "pikachu")
}

// change app icon to "raichu"
@IBAction func raichuButtonDidTap(_ sender: UIButton) {
  changeIcon(to: "raichu")
}

func changeIcon(to iconName: String) {
  // 1
  guard UIApplication.shared.supportsAlternateIcons else {
    return
  }

  // 2
  UIApplication.shared.setAlternateIconName(iconName, completionHandler: { (error) in
    // 3
    if let error = error {
      print("App icon failed to change due to \(error.localizedDescription)")
    } else {
      print("App icon changed successfully")
    }
  })
}
```


Sau đây là một số giải thích cho đoạn code trên:

```
 guard UIApplication.shared.supportsAlternateIcons else {
    return
  }
```
1. Bước đầu tiên chúng ta cần kiểm tra xem liệu ứng dụng có hỗ trợ thay đổi icon kiểu động hay không?

```
UIApplication.shared.setAlternateIconName(iconName, completionHandler: { (error) in
```
2. Chuyển đổi icon cho ứng dụng bằng cách truyền vào tên ảnh đã được cài đặt trong file *Info.plist*


```
if let error = error {
      print("App icon failed to change due to \(error.localizedDescription)")
    } else {
      print("App icon changed successfully")
    }
```
3. Sau khi ảnh icon được thay đổi, hiển thị kết quả hoặc báo lỗi.

Các bạn có thể tham khảo video demo tại[ đây ](https://www.youtube.com/watch?v=_Ea8VemmmDE)

# Tổng kết
Trên đây tôi vừa đề cập đến một điểm mới trong iOS 10.3 đó là cho phép ứng dụng của bạn có thể tự động thay đổi icon mà không cần phải update qua Apple Store. 
Chúng ta có thể áp dụng tính năng hữu ích này vào việc cho phép ứng dụng thay đổi icon phù hợp với một số ngày lễ, tết, hoặc thậm chí dùng để chơi khăm người dùng bằng cách chuyển đổi icon giống với ứng dụng Facebook, Youtube để gây lú. Khá thú vị đúng không nào