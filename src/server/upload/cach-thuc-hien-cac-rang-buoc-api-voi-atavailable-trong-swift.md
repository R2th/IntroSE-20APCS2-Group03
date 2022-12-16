Bài viết này là một mẹo rất nhanh về cách giúp bạn giới hạn code của mình với một số phiên bản hoặc làm cho nó hoàn toàn không khả dụng trong Swift.

Ví dụ: khi bạn đang phát triển framework, bạn muốn cập nhật việc call API của mình sử dụng async / await chỉ tương thích với iOS 15 trở lên. Điều này có thể được thực hiện bằng cách sử dụng `available` API.

## Vấn đề
Bạn đang phát triển một framework nhưng cần giới hạn một số phần của nó với phiên bản iOS hoặc cao hơn. Và cần làm cho một phần khác của code hoàn toàn không khả dụng.

Hãy cùng xem ví dụ dưới đây:
``` swift
class ExternalFramework {


    public func addByTwo(value: Int) -> Int {
        printTwo()
        return value + 2
    }

    private func printTwo() {
        print("2")
    }

}
```

Code rất đơn giản. Chỉ là một lớp ExternalFramework làm ví dụ về framework ngoài và hai chức năng. Cái đầu tiên trả về  Integer và là public và cái thứ hai chỉ cần in "2" trong console.

Hãy hạn chế việc sử dụng chức năng addByTwo chỉ dành cho iOS 15 trở lên bằng cách sử dụng `available`. Xem hình bên dưới:

![image.png](https://images.viblo.asia/551069cb-29b4-4a0c-ad6b-b2567964576d.png)

Tiếp tục khám phá từng thuộc tính chú thích.

## Thuộc tính Deprecated 
Nếu bạn muốn cảnh báo người dùng của mình rằng API này không còn được dùng cho iOS 11 trở lên, bạn chỉ cần thêm cái này:

```swift
    @available(iOS, deprecated: 11 )
    public func addByTwo(value: Int) -> Int {
        printTwo()
        return value + 2
    }
```

Kết quả là người gọi nhận được cảnh báo khi cố gắng sử dụng hàm:
![image.png](https://images.viblo.asia/39962ca4-40e3-4d20-8c0d-0f8e1dec512f.png)

## Thuộc tính Message 

Thuộc tính `message` bạn phải sử dụng với thuộc tính `deprecated`. Để gửi thông báo cho những người sử dụng API cũ rằng có điều gì đó đã thay đổi và cách họ có thể cập nhật những thay đổi.

```swift
    @available(iOS, deprecated: 11, message: "Use at your own risk" )
    public func addByTwo(value: Int) -> Int {
        printTwo()
        return value + 2
    }
```

![image.png](https://images.viblo.asia/e9299b22-9102-4f0c-b733-e5ff965bdf18.png)

## Thuộc tính Introduced
Khi bạn muốn hạn chế khả năng sử dụng chức năng với @available, về cơ bản, bạn cần cung cấp hai thứ về cơ bản: platform và version được hỗ trợ tối thiểu.

`@available(platform name, platform version)`

Ví dụ: nếu bạn muốn rằng chức năng của bạn chỉ hoạt động trong iOS 12 trở lên. Bạn có thể làm được việc này:
    
```swift
    @available(iOS, introduced: 12)
    public func addByTwo(value: Int) -> Int {
        printTwo()
        return value + 2
    }
```

Bằng cách này, bạn có thể giới hạn những người có thể sử dụng chức năng của bạn. Nhưng điều gì sẽ xảy ra nếu bạn cố gắng sử dụng một phương pháp mà phiên bản iOS của bạn không tương thích?
![image.png](https://images.viblo.asia/c199244e-1b9c-4dbf-a747-349dd9cb63d5.png)

Xcode cung cấp cho bạn ba lựa chọn thay thế cho điều này.Việc đầu tiên là thực hiện kiểm tra #avaliable:

```swift
let externalFramework = ExternalFramework()
if #available(iOS 15, *) {
    externalFramework.addByTwo(value: 100)
} else {
    // Fallback on earlier versions
}
```

Phương thức thứ hai : sử dụng @available(iOS 15, ) vào phương thức  gọi của hàm externalFramework.addByTwo. 
Và cách cuối là bạn thêm @available(iOS 15, )  vào đầu class đó

## Thuộc tính Renamed
Khi bạn cần một API framework để thay đổi tên, chỉ cần thêm thuộc tính đã đổi tên vào một hàm deprecated như sau:
```swift
     @available(iOS, deprecated: 11, renamed: "addByForSureTwo")
    public func addByTwo(value: Int) -> Int {
        printTwo()
        return value + 2
    }
```

Xcode rất tiện dụng khi bạn sử dụng điều này vì nó đã đề xuất sửa thành phương thức mới, ngay cả khi phương thức đó không tồn tại.

![image.png](https://images.viblo.asia/c0c6fb48-a4fe-47ca-bf24-bae6e1a1d237.png)

## Thuộc tính Unavailable
Và thuộc tính cuối cùng, nếu bạn không muốn người dùng của mình sử dụng API, thuộc tính này là dành cho bạn! Bạn thậm chí có thể hiển thị một thông báo cho người dùng.

```swift
@available(iOS, unavailable, message: "This API will be supported and could not be used anymore")
public func addByTwo(value: Int) -> Int {
    printTwo()
    return value + 2
}
```

![image.png](https://images.viblo.asia/6e3ae0f2-1042-4b28-b127-10e10bd9c6b0.png)

## Kết luận
Luôn luôn tốt nếu biết các lựa chọn thay thế để viết API tuyệt vời. 
Hi vọng qua bài viết này sẽ giúp bạn tạo ra các đoạn code hoàn hảo và bảo mật.

Nguồn: https://holyswift.app/how-to-do-apis-constraints-with-available-in-swift