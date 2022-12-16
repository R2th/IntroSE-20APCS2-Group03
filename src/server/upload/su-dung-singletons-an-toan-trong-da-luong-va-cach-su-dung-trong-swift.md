Khi bắt đầu học trên trường về Design Pattern chúng ta đều biết Singletons Pattern,  một pattern rất dễ sử dụng, và được sử dụng rất nhiều khi phát triển một ứng dụng iOS. Hôm nay tôi sẽ giúp các bạn cách sử dụng Singleton *an toàn* hơn cách các bạn đang dùng

## Cách sử dụng Singletons
> Tư tưởng chính của singleton là đảm bảo chúng ta chỉ tạo ra một instance của type được cho trước. Singletons hoạt động tốt khi có một tài nguyên mà cần được truy cập và quản lý của toàn bộ ứng dụng

Singletons được Apple sử dụng rất nhiều như UIApplication, FileManager, UserDefaults, URLSession,...
```Swift
UIApplication.shared
UserDefaults.standard
FileManager.default
URLSession.shared
DispathQueue.main
```

## Singletons trong Swift

Đây là một cách đơn giản để sử dụng Singleton

```Swift
final class DemoSingleton {
    static let shared = DemoSingleton()
    private var data: [String: Any] = ["FirstData": 1]
    
    private init() {}
    
    func readData(for key: String) -> String? {
        return data[key] as? String
    }
    
    func writeToData(key: String, value: Any) {
        data[key] = value
    }
}
```

Final để class này không thể được kế thừa

```Swift
static let shared = DemoSingleton()
```

Biến shared là một Singleton object của DemoSingleton class, từ khoá static biến thuộc tính này thuộc về class hơn là một instance của class, để có thể sử dụng thuộc tính này toàn bộ ứng dụng

## Vấn đề bất đồng bộ

Trong swift, bất ký variable nào được khai báo với ```let```  là một constant, vì vậy nó là dạng read-only và thread-safe. Ngược lại là ```var``` là có thể thay đổi value, và không thread-safe.

Dictionary ở ví dụ trên là có thể được read bởi nhiều thread mà không có vấn đề gì, nhưng sẽ không an toàn nếu một thread đang thay đổi giá trí trong khi luông khác đọc giá trị đó. Ví dụ singleton trên không ngăn việc đó xảy ra và chúng ta sẽ giải quyết việc này như sau

Chúng ta cần có kiến thức về DispathQueue, các bạn có thể đọc ở đây để hiểu thêm nó: [Apple DispathQueue](https://developer.apple.com/documentation/dispatch/dispatchqueue)

## Sử dụng Singletons an toàn hơn
Tư tưởng rất đơn giản chúng ta sẽ sử dụng ```Serial Dispatch Queues``` 
> **Serial Dispatch Queues** chỉ thực hiện một task một lần. Trong toàn bộ trường hợp, serial queues thường được sử dụng đồng bộ để lấy một giá trị cụ thể hoặc resource

Chúng ta sẽ thay đổi singleton như sau

```Swift
final class DemoSingleton {
    static let shared = DemoSingleton()
    private var data: [String: Any] = ["FirstData": 1]
    private let serialQueue = DispatchQueue(label: "serialQueue")
    
    private init() {}
    
    func readData(for key: String) -> String? {
        var value: String?
        serialQueue.sync {
            value = data[key] as? String
        }
        return value
    }
    
    func writeToData(key: String, value: Any) {
        serialQueue.sync {
            data[key] = value
        }
    }
}
```
Cả việc đọc và ghi được thêm vào serial queue do đó đảm bảo luồng được thực thi an toàn

## Readers-writer lock

> Một Readers-writer lock cho phép việc đọc (read) xảy ra đồng thời (song song), trong khi việc ghi (write) phải có yêu cầu mới truy cập được. Điều này có nghĩa là nhiều thread có thể đọc được data song song nhưng khi thay đổi data thì cần phải có điều kiện an toàn. Khi đang thay đổi data ở một luồng, các luồng khác không thể được đọc hoặc ghi cho đến việc thay đổi hoàn thành

Các bạn có thể đọc thể ở đây: https://en.wikipedia.org/wiki/Readers%E2%80%93writer_lock

**Một barrier:** được sử dụng trong concurrent queue để đồng bộ việc write. Bằng việc thêm barrier flag, nó cho phép việc write là đồng bộ trong khi vẫn giữ việc read xảy ra song song

Để cải thiện năng suất của singleton trên chúng ta sẽ thay đổi như này

```Swift
final class DemoSingleton {
    static let shared = DemoSingleton()
    private var data: [String: Any] = ["FirstData": 1]
    private let concurrentQueue = DispatchQueue(label: "concurrentQueue", attributes: .concurrent)
    
    private init() {}
    
    func readData(for key: String) -> String? {
        var value: String?
        concurrentQueue.sync {
            value = data[key] as? String
        }
        return value
    }
    
    func writeToData(key: String, value: Any) {
        concurrentQueue.async(flags: .barrier) {
            data[key] = value
        }
    }
}
```

-----
Bài viết đến đây là hết rồi, cảm ơn các bạn đã đọc đến đây\
Source:  https://sachithrasiriwardhane.medium.com/thread-safe-singletons-and-their-usage-in-swift-c992d34d85dd