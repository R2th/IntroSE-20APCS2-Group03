Trong khi phát triển các ứng dụng, chúng ta đều sẽ phải giải quyết các bài toàn liên quan đến việc lưu trữ dữ liệu trên app. Đối với app IOS, chúng ta có rất nhiều  cách để lưu trữ dữ liệu, tuy nhiên việc lựa chọn cách nào để sử dụng cũng là một vấn đề. Ví dụ, trên app của chúng ta cần giải quyết bài toán là cho phép người dùng chọn ngôn ngữ mà họ muốn hiển thị ? Với bài toán này thì chúng ta sẽ cần lưu lại dữ kiện đó là "ngôn ngữ" mà người dùng chọn. Với bài toàn này thì chúng ta không cần sử dụng đến CoreData, Realm... Đối với các dữ liệu đơn giản, không có rằng buộc với các mối quan hệ thì chúng ta có thể sử dụng UserDefaults để lưu lại. Vậy làm sao để sử dụng UserDefaults một cách hiệu quả và đơn giản?

### Sử dụng UserDefaults
Thông thường, các dev mới thường sẽ sử dụng luôn như sau: 
```
//store
UserDefaults.standard.set("en", forKey: "currentLanguage")
//retriece
 UserDefaults.standard.string(forKey: "currentLanguage")
//Remove
 UserDefaults.standard.removeObject(forKey: "currentLanguage")
```
Tuy nhiên, khi nhìn vào cách sử dụng ở trên, chúng ta có thê thấy rằng key "currentLanguage" đang bị lặp lại quá nhiều. Trong trường hợp chúng ta cần sử dụng key này để lấy dữ liệu tại nhiều chỗ khác nhau thì có thể dẫn đến trường hợp gõ nhầm key. Vì vậy, chúng ta thường sẽ tạo ra một biến trong file Const để sử dụng lại.
```
struct Const {
    static let currentLanguage = "currentLanguage"
}

UserDefaults.standard.set("en", forKey: Const.currentLanguage)
```
Vậy với cách sử dụng như trên đã thực sự tối ưu chưa? Đã thực sự đơn giản chưa?
### Extension UserDefaults
Thay vì khởi tạo một const để sử dụng làm key cho mỗi lần thao tác với dữ liệu trong UserDefaults, chúng ta có thể tạo ra một struct "Key" bên trong của UserDefaults để đảm bảo rằng chỉ các giá trị được tạo ra bên trong KEY mới có thể thao tác được với dữ liệu.
Ở đây mình sẽ khởi tạo một struct có tên là Key, đồng thơi tạo ra 3 func để thao tác với dữ liệu thông qua parameter là Key: 
```
extension UserDefaults {
    
    public struct Key {
        fileprivate let name: String
        public init(_ name: String) {
            self.name = name
        }
    }
    
    public func getValue(for key: Key) -> Any? {
        return object(forKey: key.name)
    }
    
    public func setValue(_ value: Any?, for key: Key) {
        set(value, forKey: key.name)
    }
    
    public func removeValue(for key: Key) {
        removeObject(forKey: key.name)
    }
}
```
Vậy ở đây, chúng ta khởi tạo và sử dụng Key như thế nào?
Ở đây mình tạo ra một extension của UserDefaults.Key sau đ
```
extension UserDefaults.Key {
    static let currentLanguage = UserDefaults.Key("currentLanguage")
}
```
Tiếp đó, cách sử dụng sẽ đỡn giản như sau:
```
//store
UserDefaults.standard.setValue("en, for: .currentLanguage)
//retrieve
UserDefaults.standard.getValue(for: .currentLanguage)
//remove
UserDefaults.standard.removeValue(for: .currentLanguage)
```
### Kết
Cảm ơn các bạn đã đọc qua bài viết của mình, hy vọng nó có thể giúp ích được cho ai đó.