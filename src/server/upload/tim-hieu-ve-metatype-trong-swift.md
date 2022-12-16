# MetaType

Trong Swift, nếu **Type** được dịch theo nghĩa đen là kiểu của một biến, thì **MetaType** là kiểu của kiểu biến. Ví dụ, số 5 có kiểu là `Int`, hay một biến `Int` có thể nhận giá trị là 5. Tuy nhiên, để viết một phương thức trả về dung lượng bộ nhớ mà một kiểu biến chiếm dụng, chúng ta không thể truyền vào giá trị của biến mà cần truyền kiểu của kiểu biến: **MetaType**.

# `.Type` và `.self`

Trong ngôn ngữ Swift, **MetaType** được biểu thị qua thuộc tính `.Type`. Mỗi biến đều có thể mang giá trị: nếu như biến kiểu `Int` có thể mang giá trị 5, thì giá trị mà biến kiểu của kiểu `Int` có thể mang giá trị được biểu thị qua thuộc tính `.self`. Ví dụ, `Int.Type` là kiểu của kiểu `Int`, mang giá trị `Int.self`.

```swift
let int: Int = 5
let intMetaType: Int.Type = Int.self
```

# `AnyClass`
Thuộc tính và phương thức static có thể được truy cập và sử dụng sau khi đã lấy được **MetaType**. Trên thực tế, chúng ta thường xuyên sử dụng **MetaType**, ví dụ một phương thức rất phổ biến của `UITableView`:

```swift
func register(AnyClass?, forCellReuseIdentifier: String)
 
tableView.register(UITableViewCell.self, forCellReuseIdentifier: "cell")
```

Ở đây, `AnyClass` thực ra là một **MetaType**:

```swift
typealias AnyClass = AnyObject.Type
```

Khi chúng ta truy cập đến thuộc tính static, thật ra là chúng ta đã truy cập thông qua **MetaType**, tuy nhiên XCode đã khéo léo giấu chúng đi bằng cách lược bỏ `.self`. Hai cách viết sau là tương đương:

```swift
Int.max
Int.self.max
```

# `type(of:)` và `.self`
Chúng ta đều có thể dùng `type(of:)` và `.self` để lấy giá trị cho **MetaType**:

```swift
let instanceMetaType: String.Type = type(of: "string")
let staticMetaType: String.Type = String.self
```

Điểm khác biệt là hàm `type(of:)` được gọi trên biến, còn `.self` được gọi trên kiểu của biến.

# Protocol
Protocol không phải là một kiểu trong Swift, vì thế không thể trực tiếp truy cập giá trị cho kiểu của Protocol thông qua `.self` mà phải thông qua class hay struct tương thích với Protocol đó:

```swift
struct MyType: MyProtocol { }
let metatype: MyProtocol.Type = MyType.self
```

Vậy thì `.self` trên Protocol có ý nghĩa gì? Đó chính là giá trị của kiểu Protocol của Protocol:

```swift
let protocolMetatype: MyProtocol.Protocol = MyProtocol.self
```

# Ví dụ
Giả sử chúng ta có 2 class khác nhau cùng tương thích một protocol. Chúng ta cần viết hàm khởi tạo object dựa trên kiểu của class.

```swift
protocol ContentCell { }
 
class IntCell: UIView, ContentCell {
    required init(value: Int) {
        super.init(frame: CGRect.zero)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
 
class StringCell: UIView, ContentCell {
    required init(value: String) {
        super.init(frame: CGRect.zero)
    }
    
    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
}
```

Hàm khởi tạo có thể viết theo cách truyền trực tiếp **MetaType**:

```swift
func createCell(type: ContentCell.Type) -> ContentCell? {
    if let intCell = type as? IntCell.Type {
        return intCell.init(value: 5)
    } else if let stringCell = type as? StringCell.Type {
        return stringCell.init(value: "xx")
    }
    return nil
}
 
let intCell = createCell(type: IntCell.self)
```

Hoặc có thể viết theo cách sử dụng generics:

```swift
func createCell<T: ContentCell>() -> T? {
    if let intCell = T.self as? IntCell.Type {
        return intCell.init(value: 5) as? T
    } else if let stringCell = T.self as? StringCell.Type {
        return stringCell.init(value: "xx") as? T
    }
    return nil
}
 
// Now infer the metatype you need to use based on the return type
let stringCell: StringCell? = createCell()
```

Thư viện **Reusable** sử dụng cách tương tự cho phương thức `dequeueReusableCell`:

```swift
func dequeueReusableCell<T: UITableViewCell>(for indexPath: IndexPath, cellType: T.Type = T.self) -> T
    where T: Reusable {
      guard let cell = self.dequeueReusableCell(withIdentifier: cellType.reuseIdentifier, for: indexPath) as? T else {
        fatalError("Failed to dequeue a cell")
      }
      return cell
  }
```

# Tài liệu tham khảo
http://www.programmersought.com/article/6707648244/