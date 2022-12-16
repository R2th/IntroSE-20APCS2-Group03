UserDefaults là một lớp được sử dụng trong hầu hết mọi dự án iOS và macOS. Nó là cách phổ biến nhất để lưu trữ các cặp key-value liên tục. Tôi đã thấy rất nhiều dự án và hầu hết mọi dự án đều có cách riêng để xử lý UserDefaults.
Mặc dù vậy, cách phổ biến nhất là mở rộng UserDefaults để thêm thuộc tính với getters và setters tùy chỉnh.

```
extension UserDefaults {
  private struct Keys {
    let convertSubtitles = "convertSubtitles"
  }

  var convertSubtitles: Bool {
    get { bool(forKey: Keys.convertSubtitles) }
    set { set(newValue, forKey: Keys.convertSubtitles) }
  }
}

UserDefaults.standard.convertSubtitles = false
let shouldConvert = UserDefaults.standard.convertSubtitles
```

Nó trông clean khi bạn sử dụng nó. Tuy nhiên, nếu bạn có nhiều key, nó có thể phát triển rất nhanh và tập tin với tất cả các khóa và thuộc tính trở nên lộn xộn. Để tránh điều đó, chúng ta có thể sử dụng từ khóa Swiftf *#function* nếu tên thuộc tính giống với khóa mà nó sử dụng.  *#function* trả về một Chuỗi có tên của khai báo mà nó xuất hiện.

```
extension UserDefaults {
  var convertSubtitles: Bool {
    get { bool(forKey: #function) }
    set { set(newValue, forKey: #function) }
  }
}

UserDefaults.standard.convertSubtitles = false
let shouldConvert = UserDefaults.standard.convertSubtitles
```

Đôi khi các nhà phát triển tạo ra một cấu trúc bổ sung để tránh viết lại tất cả UserDefaults.standard

```
struct Preferences {
  private let defaults = UserDefaults.standard

  static var convertSubtitles: Bool {
    get { defaults.bool(forKey: #function) }
    set { defaults.set(newValue, forKey: #function) }
  }
}

Preferences.convertSubtitles = false
let shouldConvert = Preferences.convertSubtitles
```

Nó thông minh, đơn giản và sạch sẽ. Vấn đề duy nhất tôi thấy là đôi khi bạn cần một thuộc tính có tên khác với chính khóa đó. *#function* không cho phép nó, vì vậy bạn sẽ phải sử dụng một cái gì đó như *struct Keys.*
Vì vậy, chúng ta có thể làm tốt hơn?  Hãy cùng với nhau tạo ra một phần mở rộng của UserDefaults, nhưng lần này với chuỗi con sẽ lấy một giá trị của loại *DefaultsKey* của riêng chúng ta.

```
let Preferences = UserDefaults.standard

class Defaults {
  fileprivate init() {}
}

class DefaultsKey<ValueType>: Defaults {
  let key: String

  init(_ key: String) {
    self.key = key
  }
}

extension UserDefaults {
  subscript(key: DefaultsKey<Bool>) -> Bool {
    get { return bool(forKey: key.key) }
    set { set(newValue, forKey: key.key) }
  }
}    
```

Một số mã này có thể trông có vẻ dư thừa, nhưng hãy để xem cách chúng ta có thể thêm hỗ trợ cho String. Để làm điều này, chúng tôi chỉ cần thêm một subscript.

```
extension UserDefaults {
  subscript(key: DefaultsKey<String?>) -> String? {
    get { return string(forKey: key.key) }
    set { set(newValue, forKey: key.key) }
  }
}    
```

Khi bạn có đăng ký cho tất cả các loại bạn muốn, việc thêm khóa mới vào UserDefaults cũng dễ dàng như sau:

```
extension Defaults {
  static let convertSubtitles = DefaultsKey<Bool>("convertSubtitles")
}

Preferences[.convertSubtitles] = false
let shouldConvert = Preferences[.convertSubtitles]
```

Cách tiếp cận này dựa trên một  framework có tên *SwiftyUserDefaults*. Tôi thực sự khuyên bạn nên làm quen với nó, đặc biệt là với một tập hợp các bài đăng trên blog Radek, được liệt kê trong phần [này](https://github.com/sunshinejr/SwiftyUserDefaults#more-like-this) .

Bài viết được lược dịch từ  [đây.](https://mateuszkarwat.com/post/user-defaults-in-a-swift-way/) 
Cảm ơn các bạn đã dành thời gian theo dõi!