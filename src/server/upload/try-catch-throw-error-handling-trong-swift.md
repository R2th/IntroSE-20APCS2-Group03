> Try catch trong swift kết hợp với throwing lỗi giúp bạn có thể xử lý tốt bất kỳ lỗi nào trong code của mình. Một phương thức có thể được định nghĩa là throwing, về cơ bản có nghĩa là nếu có gì sai, nó có thể thông báo có lỗi đã xảy ra. Để bắt lỗi này, chúng ta cần triển khai một câu lệnh gọi là do-catch.
Không phải lúc nào cũng bắt buộc phải sử dụng câu lệnh do-catch với method throwing. Hãy  cùng tìm hiểu sâu hơn về chúng. 

### 1. Tạo method throwing bằng cách sử dụng từ khóa throws 

Tạo một method throwing bằng cách thêm từ khóa throws vào một method ngay trước câu lệnh return.
Trong ví dụ này, chúng tôi sử dụng một method để cập nhật tên cho người dùng của một người dùng có định danh cụ thể.

```
func update(name: String, forUserIdentifier userIdentifier: String) {
    // This method is not throwing any errors
}

func update(name: String, forUserIdentifier userIdentifier: String) throws {
    // The throws keyword makes that this method cán throw an error
}
```

Khi gọi một method throwing, bạn có thể gặp lỗi sau:
```
Call can throw but is not marked with ‘try’
```

Điều này có nghĩa là bạn phải sử dụng từ khóa try trước một đoạn code có thể gây ra lỗi.

```
try update(name: "Antoine Eval", forUserIdentifier: "VALKY2412")
```

### 2. Throwing initializer trong Swift

Một điều tuyệt vời là bạn cũng có thể tạo một trình khởi tạo **Throwing**. Điều này đặc biệt hữu ích khi bạn muốn xác thực các thuộc tính để khởi tạo một đối tượng nhất định. Ví dụ: bạn có thể muốn xác thực tên người dùng trước khi tạo đối tượng *User*.

```
struct User {
    enum ValidationError: Error {
        case emptyName
        case nameToShort(nameLength: Int)
    }

    let name: String

    init(name: String) throws {
        guard !name.isEmpty else {
            throw ValidationError.emptyName
        }
        guard name.count > 2 else {
            throw ValidationError.nameToShort(nameLength: name.count)
        }

        self.name = name
    }
}

let user = try User(name: "Antoine Eval")
```

### 3. Xử lý lỗi trong Swift bằng câu lệnh do-catch

Để bắt lỗi trong Swift, chúng ta cần sử dụng câu lệnh do-catch. Ví dụ sau sử dụng cá thể User được xác định trước đó.

```
do {
    let user = try User(name: "")
    print("Created user with name \(user.name)")
} catch {
    print("User creation failed with error: \(error)")
}

// Prints: User creation failed with error: emptyName
```

Lỗi emptyName được đưa ra do tên người dùng được cung cấp trống. Kết quả là khối catch được gọi. Như bạn thấy, chúng ta có thể sử dụng thuộc tính lỗi cục bộ để in ra lỗi đã mắc. Khối bắt chỉ được gọi khi xảy ra lỗi.

### 4. Catching một loại lỗi cụ thể

Vì chúng ta không thể chỉ định loại lỗi sẽ được thông báo bởi một method, chúng ta phải tính đến các loại lỗi khác nhau có thể được tạo ra. Do đó, bạn muốn bắt và xử lý các loại lỗi cụ thể trong một câu lệnh catch riêng. 

Trong ví dụ sau, chúng ta đã triển khai method cập nhật tên. Method này hiện có thể throw cả lỗi xác thực người dùng và lỗi cơ sở dữ liệu được trả ra từ method `fetchUser`.

```
func fetchUser(for identifier: String) throws -> User {
    // Fetches the user from the database
}

func update(name: String, forUserIdentifier userIdentifier: String) throws {
    guard !name.isEmpty else {
        throw User.ValidationError.emptyName
    }
    var user = try fetchUser(for: userIdentifier)
    user.update(name)
    user.save()
}
```

Sẽ rất tuyệt nếu bạn bắt được lỗi trong các khối được tách biệt để hiển thị một cảnh báo khác nếu chỉ mỗi tên không hợp lệ. Có một số cách để làm điều này:

```
do {
    try update(name: "Antoine Eval", forUserIdentifier: "VALKY2412")
} catch User.ValidationError.emptyName {
    // Called only when the `User.ValidationError.emptyName` error is thrown
} catch User.ValidationError.nameToShort(let nameLength) where nameLength == 1 {
    // Only when the `nameToShort` error is thrown for an input of 1 character
} catch is User.ValidationError {
    // All `User.ValidationError` types except for the earlier catch `emptyName` error.
} catch {
    // All other errors
}
```

Có 1 số điều cần làm rõ ở đây:

* Thứ tự catching là quan trọng. Trong ví dụ này, đầu tiên chúng ta catch cụ thể là emptyName, sau đó là tất cả các User.ValidationError khác. Nếu chúng ta hoán đổi hai thứ tự này, lệnh bắt emptyName cụ thể sẽ không bao giờ được gọi.

* `where` có thể được sử dụng để lọc các giá trị lỗi. Trong ví dụ này, chúng ta chỉ thích bắt các đầu vào tên có độ dài cụ thể là 1 ký tự.

* Sử dụng từ khoá `is` chúng ta có thể bắt lỗi của một loại cụ thể.

* Việc đóng bắt cuối cùng sẽ bắt tất cả các lỗi khác.

Cũng có những trường hợp mà bạn gặp hai hoặc nhiều loại lỗi cụ thể. Trong trường hợp này, bạn có thể sử dụng danh sách trong câu lệnh catch của mình:

```
do {
    try update(name: "Antoine Eval", forUserIdentifier: "VALKY2412")
} catch User.ValidationError.emptyName, User.ValidationError.nameToShort {
    // Only called for `emptyName` and `nameToShort`
} catch {
    // All other errors
}
```

Lưu ý ở đây rằng chúng ta đã loại bỏ paramater nameToShort. Đây là điều bạn luôn có thể làm khi làm việc với enums nếu bạn không quan tâm đến giá trị được liên kết.

### 5. Sử dụng try? với một method throwing

Nếu bạn không quan tâm đến việc phát hiện bất kỳ lỗi nào, bạn cũng có thể quyết định sử dụng `try?`. Dấu chấm hỏi đằng sau từ khóa `try` về cơ bản cho biết rằng chúng ta không quan tâm đến lỗi có thể xảy ra.

```
let user = try? User(name: "")
print(user?.name) // Prints "nil" if an error occurred upon init.
```

Giá trị sẽ là một cá thể User tùy chọn hoặc nil và lỗi được đưa ra hoàn toàn bị bỏ qua.

### 6. Sử dụng try! với một method throwing

Nếu bạn muốn ứng dụng của mình không thành công ngay lập tức, bạn có thể dùng `try!` với method throwing. Về cơ bản, điều này sẽ làm ứng dụng của bạn bị lỗi giống như một thông báo lỗi nghiêm trọng.

```
let user = try! User(name: "")
print(user.name)
```

Điều này sẽ dẫn đến lỗi sau vì đầu vào tên trống:

```
Fatal error: ‘try!’ expression unexpectedly raised an error: User.ValidationError.emptyName
```

### 7. Kết luận

Error handling trong Swift rất tốt. Nó cho phép bạn viết code có thể đọc được đồng thời xử lý những luồng không hài lòng. Bằng cách có thể bắt các loại lỗi cụ thể hoặc sử dụng từ khóa `where`, chúng ta có thể linh hoạt xử lý các tình huống cụ thể nếu cần. 

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃