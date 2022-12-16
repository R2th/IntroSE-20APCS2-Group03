Hôm nay mình sẽ giới thiệu cho các bạn thêm một cách khác để quản lý cấu hình ứng dụng. 

Trước đây mình đã từng viết một bài giới thiệu các cách thông thường để cài đặt cấu hình ứng dụng. Các bạn có thể tham khảo [tại đây](https://viblo.asia/p/quan-ly-cac-moi-truong-khac-nhau-trong-du-an-XL6lAPLmZek). Hôm nay sẽ là một cách thức khác theo mình thì nó khá hay để các bạn quản lý cấu hình. Đó là cách sử dụng protocol.

Về định nghĩa thì theo Apple có nói thế này:

> A protocol defines a blueprint of methods, properties, and other requirements that suit a particular task or piece of functionality. The protocol can then be adopted by a class, structure, or enumeration to provide an actual implementation of those requirements. Any type that satisfies the requirements of a protocol is said to conform to that protocol.


### Tạo protocol
- File > New > File… và đặt tên **SettingsManageable**
```
protocol SettingsManageable {
 
}
```
- Trên đây là chúng ta khai báo 1 protocol, một protocol cũng có thể thực hiện như một extension, các bạn có thể xem:

```
extension SettingsManageable where Self: Codable {
 
}
```

- Nó thực sự rất quan trọng, đặt biệt là điều kiện `where Self: Codable`, thực tế thì nó chính là điều kiện để các bạn có thể custom cho các loại settings khác nhau đó.
- Nhưng tạo sao lại phải là Codable? Thực ra bạn sẽ cần mã hoá và giải mã các thuộc tính bất kì kiểu nào (float, string, int, number...) và nó nằm trong file plist.

### Định nghĩa và implement các yêu cầu của protocol
- Đây cũng là phần rất thú vị, chúng ta sẽ triển khai tất cả các phương thức cho cả class, struct... cho phép update, tự động load các setting... Từ giờ trở đi, đối với mỗi phương thức mà chúng tôi sẽ xác định trong protocol, chúng tôi sẽ cung cấp việc triển khai tương ứng trong phần mở rộng của protocol

```
protocol SettingsManageable {
    func settingsURL() -> URL
}
```
- Đây là phần khai báo, còn phần implement sẽ như sau:
```
extension SettingsManageable where Self: Codable {
    func settingsURL() -> URL {
        let cachesDirectory = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
        return cachesDirectory.appendingPathComponent("\(Self.self).plist")
    }
}
```
- Thực ra nó chỉ là load file plist thôi. Các bạn có thể để ý tên file là `(Self.self).plist` thì đây chính là chỗ để chúng ta custom. Ví dụ các bạn hãy hình dung ra rằng có nhiều setting, mỗi setting là 1 file plist. Vậy khi load file setting thì cần đường dẫn tới file, class nào implement tương ứng cho setting đó sẽ override hàm này và trả ra file plist tương ứng với setting đó.

### Lưu và update
- Mã hoá các thuộc tính trong plist
- Ghi xuống file

```
protocol SettingsManageable {
    ...
 
    func update() -> Bool
}
```

- Chúng ta call update nhằm mục đích update các thuộc tính được lưu trữ trong file setting và output nó là kết quả của việc update có thành công hay không.

```
func update() -> Bool {
    do {
        let encoded = try PropertyListEncoder().encode(self)
        return true
    } catch {
        print(error.localizedDescription)
        return false
    }
}
```

- Để có thể write thì các bạn có thể làm như sau:

```
do {
    let encoded = try PropertyListEncoder().encode(self)
    try encoded.write(to: settingsURL())
    return true
}
```

- Chỉ với một vài dòng code quan trọng ta đã có thể thực hiện encode và ghi vào file danh sách các thuộc tính. Toàn bộ các phương thức sẽ trông như sau:

```
func update() -> Bool {
    do {
        let encoded = try PropertyListEncoder().encode(self)
        try encoded.write(to: settingsURL())
        return true
    } catch {
        print(error.localizedDescription)
        return false
    }
}
```

- Ngoài ra có cách viết khác nếu bạn không muốn sử dụng block `do-catch`

```
func update() throws {
    let encoded = try PropertyListEncoder().encode(self)
    try encoded.write(to: settingsURL())
}
```

### Load file setting

- Đầu tiên chúng ta cần kiểm tra sự tồn tại của file setting
- Load content của file setting
- Và cuối cùng cần phải decode các thuộc tính của file setting
- Chúng ta cần phải có khai báo 
```
protocol SettingsManageable {
    ...
 
    mutating func load() -> Bool
}
```

- Và implement 3 bước mình đã nêu bên trên.

```
mutating func load() -> Bool {
    if FileManager.default.fileExists(atPath: settingsURL().path) {
        do {
            let fileContents = try Data(contentsOf: settingsURL())
            self = try PropertyListDecoder().decode(Self.self, from: fileContents)
            return true
        } catch {
            print(error.localizedDescription)
            return false
        }
    }
}
```

### Khởi tạo setting
- Khai báo phương thức load setting từ file
```
protocol SettingsManageable {
    ...
 
    mutating func loadUsingSettingsFile() -> Bool
}
```
- Và cài đặt nó
```
mutating func loadUsingSettingsFile() -> Bool {
    guard let originalSettingsURL = Bundle.main.url(forResource: "\(Self.self)", withExtension: "plist")
     else { return false }
}
```
- Các bạn hãy để ý tên file nhé, để custom các setting khác nhau thì tên file cũng phải tương ứng. Như ở đây là Self.self đó và extension là plist vì nó là file plist
- Khi làm việc với file plist thì các bạn nên chú ý một điều. File bạn tạo ra trên source code ấy, mỗi lần build nó sẽ copy file đó vào main bundle. Lần sau sẽ đè lần trước nên các bạn cần xử lý copy file vào nơi nào đó và đó nó thay vì đọc file copy main bundle kia.

```
do {
    if !FileManager.default.fileExists(atPath: settingsURL().path) {
        try FileManager.default.copyItem(at: originalSettingsURL, to: settingsURL())
    }
 
} catch {
    print(error.localizedDescription)
    return false
}
```


### Xoá setting 
- Nó cũng rất đơn giản cũng bao gồm khai báo và implement

```
protocol SettingsManageable {
    ...
 
    func delete() -> Bool
}

func delete() -> Bool {
    do {
        try FileManager.default.removeItem(at: settingsURL())
        return true
    } catch {
        print(error.localizedDescription)
        return false
    }
}
```

* Trên đây chỉ là một số tiện ích mình nêu ra để implement. Nhưng mục đích chính của mình là chia sẻ để các bạn biết thêm cách quản lý setting cho ứng dụng của bạn ngoài các cách quản lý setting thông thường đang áp dụng ở các dự án. Khi đã có protocol rồi thì việc khai báo và implement sẽ trở lên rất đơn giản.
* Nếu có gì thắc mắc cần trao đổi các bạn vui lòng comment bên dưới nhé.