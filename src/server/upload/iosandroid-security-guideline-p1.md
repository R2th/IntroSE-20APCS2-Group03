# Mở đầu
Trong bài viết này, mức độ cần thiết (có thực hiện hay không) được đánh giá theo các cấp độ sau:
- Bắt buộc: về cơ bản cần phải thực hiện. Nếu vì nguyên nhân nào đó không thực hiện được phải có sự đồng ý của những người liên quan.
- Nên làm: nếu điều kiện cho phép và không gặp khó khăn thì nên thực hiện
- Không cần làm: nếu không có điều kiện đặc biệt gì thì về cơ bản không cần thực hiện 

# [iOS/Android] Mã hoá thông tin
Mức độ cần thiết：bắt buộc

### Rủi ro
Khi truyền thông tin qua HTTP, dữ liệu sẽ được truyền qua network bằng text thông thường (gọi là plain text), do đó sẽ có nguy cơ bị thất thoát thông tin.

### Giải pháp
Thực hiện truyền dữ liệu qua HTTPS (SSL/TLS)

# [iOS/Android] Kiểm tra SSL certification
Mức độ cần thiết：bắt buộc

### Rủi ro
Nếu bỏ qua việc kiểm thử độ tin cậy của SSL certification được thực hiện trên Webview, hoặc trong quá trình truyền thông tin, thì có nguy cơ bị thay đổi dữ liệu, đánh cắp dữ liệu trong quá trình truyền thông tin, bởi những người quản lý mạng...

### Giải pháp
Trường hợp cần thiết phải vô hiệu hoá kiểm thử độ tin cậy của certification ở môi trường test, thì có thể đổi bằng Build Target(iOS)/ Flavor/BuildType(Android) để có thể vô hiệu hoá cho riêng môi trường test thôi.

# [iOS/Android] Lưu thông tin quan trọng
Mức độ cần thiết：bắt buộc

### Rủi ro:
Do các thông tin được lưu trong thiết bị có thể lấy về được bằng cách sử dụng chức năng backup, nên nếu như chúng ta lưu những thông tin quan trọng như password, hay username bằng plain text trong máy thì sẽ có nguy cơ bị đánh cắp các thông tin này, trong trường hợp thiết bị của chúng ta bị mất,...

### Giải pháp
Khi lưu những thông tin quan trọng như password hay username cần phải mã hoá rồi mới lưu lại.

### iOS
Sử dụng keychain. Việc mã hoá sẽ do OS thực hiện, nên chúng ta không cần phải ghi nhớ thuật toán làm gì.

Ví dụ về sử dụng keychain 

       /// Lưu dữ liệu vào keychain
    @discardableResult
    func saveData(key: String, data: Data) -> Bool {
        var query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: Bundle.main.bundleIdentifier ?? "DefaultService",
            kSecAttrAccount: key
        ]

        if SecItemCopyMatching(query as CFDictionary, nil) == noErr {
            return SecItemUpdate(query as CFDictionary, [kSecValueData: data] as CFDictionary) == noErr
        } else {
            query[kSecValueData] = data
            return SecItemAdd(query as CFDictionary, nil) == noErr
        }
    }

    /// Đọc dữ liệu từ keychain
    func loadData(key: String) -> Data? {
        let query: [CFString: Any] = [
            kSecClass: kSecClassGenericPassword,
            kSecAttrService: Bundle.main.bundleIdentifier ?? "DefaultService",
            kSecAttrAccount: key,
            kSecReturnData: kCFBooleanTrue
        ]

        var dataTypeRef: CFTypeRef?
        if SecItemCopyMatching(query as CFDictionary, &dataTypeRef) == noErr {
            return dataTypeRef as? Data
        } else {
            return nil
        }
    }
    
### Android4.3 trở lên
Sau khi đã mã hoá bằng key get từ Keystore, lưu vào  SharedPreferences,...trong thiết bị.

### Android4.3 trở xuống
Do chưa sử dụng được Keystore với Android 4.3 trở xuống, nên giải pháp là sau khi mã hoá bằng key được generate 1 cách random, chúng ta lưu vào SharedPreferences,...trong thiết bị. Random key được dùng để mã hoá đó cũng cần thiết dùng để giải mã, cho nên cần phải đồng thời lưu vào thiết bị.

# [iOS/Android] Xuất log
Mức độ cần thiết：bắt buộc

### Rủi ro:
Do 1 phần log xuất ra có thể xem được kể cả ở bản build release, do đó có nguy cơ cung cấp thông tin có giá trị về mặt hệ thống cho những kẻ tấn công hệ thống. 

Android
Log xuất ra ở class "android.util.Log" có thể xem được bằng LogCat kể cả ở bản build release 

iOS
Log xuất ra ở NSLog có thể xem được bằng Xcode kể cả ở bản build release 

### Giải pháp
**Android:**

Xuất ra log bằng class đã được tối ưu bằng cách wrap class "android.util.Log"

Ví dụ đơn giản về custom log class:

 ```public class Log {
    public static void d(String tag, String message) {
        if (BuildConfig.DEBUG) android.util.Log.d(tag, message);
    }
}
```

Và có thể sử dụng Proguard để xoá lệnh gọi hàm log được.

Object "assumenosideeffects" của Proguard sẽ xoá lệnh gọi method mà giá trị respon chưa được sử dụng, do đó khi chỉ định proguard-rules.pro như dưới đây thì có thể xoá được hàm log.

```-assumenosideeffects public class android.util.Log {
    public static *** v(...);
    public static *** d(...);
    public static *** i(...);
    public static *** w(...);
    public static *** e(...);
    public static *** wtf(...);
}
```

**iOS:**

**■Objective-C**

Thực hiện xuất log bằng NDLog, vô hiệu hoá NSLog bằng preprocessor ở bản build release.

```
#ifdef PRODUCT
#define NSLog(...)
#endif
```

**■Swift**

Thực hiện xuất log bằng hàm print 

Nếu sử dụng hàm print, sẽ ko thể xuất log xem được trên Xcode ở bản build release, nhưng cũng có thể vô hiệu hoá hàm print cho riêng bản build release.

```
#if PRODUCT
func print(_ items: Any..., separator: String = " ", terminator: String = "\n") {}
#endif
```

# [iOS/Android] Crash report
Mức độ cần thiết：bắt buộc

### Rủi ro:
Nếu không sử dụng những chức năng crash report ví dụ như Crashlytics, thì khi xảy ra hiện tượng crash trên môi trường production sẽ khó biết được nguyên nhân vì sao crash, cũng như chậm trễ trong việc phát hiện ra các vấn đề nghiệm trọng.

Và trường hợp sau khi phát hiện ra crash cũng sẽ khó điều tra ra nguyên nhân do không lấy được các thông tin chi tiết nếu như không có crash report.

### Giải pháp
Sử dụng các chức năng hỗ trợ crash report như Crashlytics, Firebase,...

### Thông tin tham khảo
iOS: sẽ gửi report bằng Crashlytics

Android: 【Android】Firebase Crashlytics

### Tham khảo:
https://qiita.com/alt_yamamoto/items/f67a7ddb6ba13cca7369