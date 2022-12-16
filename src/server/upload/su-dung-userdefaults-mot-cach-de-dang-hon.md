## 1. Vấn đề khi làm việc với UserDefaults
Là một nhà phát triển ứng dụng iOS, chúng ta có thể sử dụng UserDefaults mọi lúc để lưu và truy xuất dữ liệu lưu ở local.

```
// This is how you save a value
UserDefaults.standard.set("123", forKey: "userID")
// This is how you read it
let userID = UserDefaults.standard.string(forKey: "userID")
```

Tuy nhiên, việc tương tác với UserDefaults trong một dự án lớn có thể gặp rủi ro và các lỗi sau có thể xảy ra:
* Sai key
* Sai kiểu dữ liệu
* Trùng key

### Sai key 
Chúng ta có thể lưu một giá trị bằng một key nhưng lại cố gắng lấy ra giá trị đó bằng một khóa khác.
```
UserDefaults.standard.set("123", forKey: "userID")
...
let userID = UserDefaults.standard.string(forKey: "UserID")
```
Vì key có phân biệt chữ hoa chữ thường nên `userID` khác với `UserID`. Đây có vẻ là một lỗi dễ tránh, nhưng trong một dự án lớn có nhiều khóa, nó hoàn toàn có thể xảy ra.

### Sai kiểu dữ liệu
Mỗi lần chúng ta tương tác với UserDefaults, chúng ta phải nhớ loại giá trị chúng tôi đang lưu để lấy ra.
Ví dụ bên dưới có lỗi vì chúng ta đang lưu userID dưới dạng String nhưng sau đó chúng ta lại truy xuất nó dưới dạng Int.
```
UserDefaults.standard.set("123", forKey: "userID")
...
let userID = UserDefaults.standard.int(forKey: "userID")
```
Một lần nữa, điều này có vẻ như dễ dàng phát hiện trong một đoạn code nhỏ, nhưng trong một dự án lớn, nó vẫn có thể xảy ra.

### Trùng key
Chúng ta có thể quên rằng chúng ta đang sử dụng một key nhất định cho một giá trị trong một phần của dự án và quyết định sử dụng chính key đó cho một giá trị khác.
```
let currentUserID = "123"
UserDefaults.standard.set(currentUserID, forKey: "userID")

// and then in another file of our project 
let messageRecipientUserID = "456"
UserDefaults.standard.set(messageRecipientUserID, forKey: "userID")
```

## 2. Cách giải quyết
Chúng ta có thể cải thiện để giải quyết cả 3 vấn đề được thảo luận ở trên không?
Tất nhiên là có, chúng ta có thể giải quyết với `computed properties`

> In addition to stored properties, classes, structures, and enumerations can define computed properties, which do not actually store a value. Instead, they provide a getter and an optional setter to retrieve and set other properties and values indirectly. — The Swift Programming Language

> Tạm dịch: Ngoài các thuộc tính được lưu trữ, những class, struct và enum có thể định nghĩa các thuộc tính được tính toán, không thực sự lưu trữ một giá trị. Thay vào đó, chúng cung cấp `getter` và `optional setter` để truy xuất và thiết lập các thuộc tính và giá trị khác một cách gián tiếp.

Hãy để thêm phần extension sau vào dự án
```
extension UserDefaults {
var userID: String? {
        get {
            return string(forKey: #function)
        }
        set {
            set(newValue, forKey: #function)
        }
    }
}
```

Thuộc tính tính toán `userID` không lưu trữ bất kỳ giá trị nào trong instance hiện tại của UserDefaults. Thay vào đó, nó cung cấp một getter (lấy ra giá trị từ bộ nhớ local) và một setter (lưu giá trị vào bộ nhớ local).

### #function là gì?
Nó là một từ khóa đặc biệt và được tự động thay thế bằng tên của hàm chứa nó.
Trong ví dụ này, nó được thay thế bằng String `"userID"`.
Điều này sẽ đảm bảo key sử dụng để lưu (và truy xuất) giá trị vào UserDefaults chính là tên của thuộc tính chúng ta đã khai báo.

### Kiểm tra
Hãy cùng chạy thử
```
UserDefaults.standard.userID = "123"
if let userID = UserDefaults.standard.userID {
    print(userID)
}
> 123
```
Trông rất ngắn gọn đúng không :100:

Lúc này 3 vấn đề ở trên đã được giải quyết:
* Sai key: đã được sửa vì getter và setter đều sử dụng key chính là tên của thuộc tính
* Sai kiểu dữ liệu: đã được sửa vì mỗi thuộc tính đều có 1 type lúc khai báo
* Trùng key: đã được sửa vì không thể khai báo 2 biến trùng tên

## 3. Kết luận
Khi sử dụng cách này, chúng ta sẽ không phải lo lắng về các chi tiết cấp thấp.
Rất hữu dụng trong các dự án lớn đúng không :thumbsup:

Nguồn: https://medium.com/swlh/a-type-safe-userdefaults-in-swift-45a5cfc54b1b