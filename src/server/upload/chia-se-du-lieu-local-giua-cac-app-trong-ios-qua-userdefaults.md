# Đặt vấn đề?
Đọc tiêu đề thì hẳn mọi người đã đoán được vấn đề mình muốn đề cập rồi. Đó là việc chia sẻ một số dữ liệu được lưu ở trong App qua một App khác bằng UserDefaults. Kĩ thuật này không có gì gọi là quá mới mẻ tại thời điểm này. 

Cụ thể các bạn cũng đã thấy, rất nhiều ứng dụng đã áp dụng, có thể không sử dụng phương pháp này nhưng cũng sẽ sử dụng phương pháp khác.

Một số ứng dụng đã hiện thực:

![](https://images.viblo.asia/37ed16ee-bc94-4adf-8d93-7d55a38d5e0c.jpg)

![](https://images.viblo.asia/377d4380-9bdc-484a-82cd-b5b758397d41.jpg)

# Làm thế nào để làm điều đó?
iOS SDK phát hành đầu tiên đã hỗ trợ làm điều đó. Đó chính là `UserDefault`.  Có lẻ nhiều bạn nghĩ rằng UserDefault chỉ dùng để lưu trữ một số thông tin trong App. Và đúng thật, thoạt nhìn sơ lược, cứ nghĩ UserDefault chỉ làm được ở mức như vậy. 

Nhưng không, UserDefault làm được hơn thế nữa, ngoài việc lưu trữ còn có thể chia sẻ thông tin giữa các App. 

# Chia sẻ dữ liệu một app group

Để biết thêm, hãy tham khảo: [Tài liệu của Apple](https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html#//Apple_ref/doc/uid/TP40014214-CH21-SW1)

Cách sử dụng Nhóm ứng dụng: https://github.com/pgpt10/Today-Widget

## Tạo App Group

Vào phần Target của project, mục Signing & Capabilities. Hãy add App Group

![](https://images.viblo.asia/4eefce0a-c17d-4241-a11f-cb5bb0189b46.png)

![](https://images.viblo.asia/6251ca38-8e71-41f8-bbbb-9355de677798.png)

## Suite Name

```
extension UserDefaults {
    static var shared: UserDefaults? {
        return UserDefaults(suiteName: "___ Chính Group Name ___")
    }
}
```

## Sử dụng UserDefaults
### • Lưu giá trị
```
if let userDefaults = UserDefaults.shared {
    userDefaults.set("test 1" as AnyObject, forKey: "key1")
    userDefaults.set("test 2" as AnyObject, forKey: "key2")
    userDefaults.synchronize()
}
```

### • Lấy giá trị
```
if let userDefaults = UserDefaults.shared {
    let value1 = userDefaults.string(forKey: "key1")
    let value2 = userDefaults.string(forKey: "key2")
}
```

## App screen
Mình có viết 2 ứng dụng simple cùng sử dụng chung một group name để chia sẻ dữ liệu thông qua User Default.

Ứng dụng 1: đơn giản chỉ có một button, khi tap vào button thì tăng số đếm lên.

Ứng dụng 2: Hiện thị con số được Tap ở ứng dụng 1.

Và dưới đây là thành quả.

![](https://images.viblo.asia/f7a3982a-4e76-4ee4-ba08-12870abc7359.png)

# Kết
Từ idea trên, chúng ta có thể làm được nhiều điều hơn thế nữa. Hy vọng một bài viết đơn giản, giúp cho mọi người dễ hiểu hơn.

Nguồn:
https://developer.apple.com/library/archive/documentation/General/Conceptual/ExtensibilityPG/ExtensionScenarios.html#//Apple_ref/doc/uid/TP40014214-CH21-SW1