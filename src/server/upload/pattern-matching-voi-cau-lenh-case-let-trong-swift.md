Pattern Matching là việc kiểm tra xem trong một chuỗi hay cấu trúc dữ liệu có chứa một thành phần nào đó hay không. Trong Swift, Pattern Matching được thực hiện qua câu lệnh `case let` với nhiều kiểu cấu trúc dữ liệu khác nhau.

# Enums
Pattern Matching cực kỳ hiệu quả khi sử dụng với enums:
```python
enum State<Data> {
    case loading
    case loaded(Data)
    case failed(Error)
}

switch state {
case .loading:
    renderLoading()
case let .loaded(shows) where shows.isEmpty:
    renderEmptyView()
case let .loaded(shows):
    render(shows)
case let .failed(error):
    render(error)
}
```
Khi sử dụng câu lệnh `switch` đối với enums có giá trị đính kèm (associated values), có thể dùng câu lệnh `case let` để kiểm tra trường hợp và gán giá trị cho một biến. Hơn nữa, có thể lọc giá trị đính kèm thông qua câu lệnh `where`.

# Optionals
Bản chất của Optional trong Swift là enum có hai trường hợp, vì vậy sử dụng case let đối với optional tương tự như đối với enum.
```swift
let value: Int? = 10

switch value {
case let value? where value > 10:
    print("greater than ten")
case let .some(value):
    print(value)
case .none:
    print("none")
}
```
Trong trường hợp `.some(value)`, có thể viết dưới dạng `value?`.

# Tuples
Pattern Matching cũng có thể được sử dụng hiệu quả trên cấu trúc dữ liệu tuple.
```swift
let auth = (username: "majid", password: "veryStrongPassword")

switch auth {
case ("admin", "admin"): 
    renderAdmin()
case let (_, password) where password.count < 6:
    renderShortPasswordMessage()
case let (username, password):
    renderUserProfile(username, password)
}
```

# Câu lệnh điều kiện
`case let` cũng có thể sử dụng lồng ghép với các câu lệnh điều kiện:
```javascript
if case let .loaded(shows) = state, shows.isEmpty {
    renderEmptyView()
}
```
, hoặc:
```javascript
guard case let .loaded(shows) = state, shows.isEmpty else {
    // Do something here
}
```

# Câu lệnh lặp
Ngoài sử dụng trong các cấu trúc rẽ nhánh, có thể sử dụng `case let` trong cả các vòng lặp:
```swift
let stateHistory: [State<[Show]>] = [.loaded([]), .loading]
for case let .loaded(shows) in stateHistory where shows.count > 2 {
    // Do something here
}
```

# Tài liệu tham khảo
https://swiftwithmajid.com/2019/02/06/pattern-matching-with-case-let/