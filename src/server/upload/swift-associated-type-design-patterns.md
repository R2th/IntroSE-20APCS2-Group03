Swift là một ngôn ngữ lập trình đa dạng , bạn có thể phát triển theo Object-Oriented, Aspect-Oriented, Procedural, Functional or POP . Mình chỉ đề cập đến một vài kiểu như vừa rồi ngoài ra vẫn còn rất nhiều những kiểu khác nữa . Cái cuối cùng mình nhắc đến “ POP “ đó chính là protocol-oriented programming .

Mọi thứ đã thay đổi tại [WWDC 2015](https://developer.apple.com/videos/play/wwdc2015/408/) nơi mà Dave Abrahams đã nói về khái niệm này và *new way of thinking*. Ông đã nói rằng :

> **New way of thinking:**
> 
> The next 40 minutes are about putting aside your usual way of thinking about programming. What we’re going to do together here won’t necessarily be easy, but I promise you if you stick with me, that it’ll be worth your time.

Trong cùng năm đó, [Alexis Gallagher đã trình bày một bài thuyết trình](https://www.youtube.com/watch?v=XWoNjiSPqI8) ông cố gắng giải quyết một số khó khăn gặp phải khi làm việc với Associated Type trong Swift . Đây không phải là một khái niệm dễ hiểu, cũng đã có rất rất nhiều bài viết nói về vấn đề này .

Sau một thời gian khá trật vật để có thể clear được khái niệm này , mình tổng hợp lại hôm nay mình sẽ chia sẻ cho các bạn hy vọng rằng sẽ giúp các bạn hiểu rõ hơn về Associated Type .


**Định nghĩa về Associated Type  :**

*associatedtype* là một *protocol generic placeholder* cho một kiểu chưa được xác định yêu cầu cụ thể hóa việc áp dụng tại thời điểm Compile .

**Các vấn đề được giải quyết  của Associated Types :**

+ Associated Types được giới thiệu để giải quyết vấn đề *rich multi type abstraction* mà hướng đối tượng không có .
+ Được thiết kế để giải quyết việc thực thi *generic protocol* đặc biệt là khi độ phức tạp tăng lên rất nhiều với sự gia tăng của các type generic .
+ An toàn , dễ maintain và khiến cho ngôn ngữ clean hơn .

**Lợi ích của Associated Types :**

+ Tránh rò rỉ chi tiết việc thự thi ,thường được yêu cầu phải được chỉ định nhiều lần. 
+ Associatedtype giữ mối quan hệ đa dạng giữa Type và Types
+ Chỉ định đúng và chính xác Type của một object với một protocol sub-typing mà không làm mất định nghĩa Type 
+ Cung cấp mối quan hệ mà bạn không thể gắn vào một object 
+ Tuân theo một bộ sưu tập đồng nhất , giúp cải thiện thời gian biên dịch với những đoạn code tĩnh được tối ưu hoá 

*Điểm bất lợi của Associated Types là nó khá khó để tiếp cận và chỉ dùng được trong protocol .*

**Làm việc với Associated Types:**

Khai báo protocol với associated types khá đơn giản , chúng ta có thể xem đoạn code dưới đây :

```
protocol TableViewCell {
    ///Unknown `Concrete Type` declared as `T`
    associatedtype T
    /// A function that accepts the unknown `Concrete Type`
    /// as it's parameter
    func configure(_ model: T)
}
```

Chúng ta có thể dễ dàng thực hiện adopt protocol  như sau :

```
class Detail {
    /// `Concrete Type` that will replace the `T`
}

class ExtendedDetail {
    /// Potential `Concrete Type` that will replace the `T`
}

class Cell: TableViewCell {
    /// `associatedtype` adoption
    typealias T = Detail
    /// now the compiler knows and reuires
    /// to inject only `Detail` into the `func`
    func configure(_ model: T) {
        /// Configure your cool cell :)
    }
}
```

Để phân biệt rõ ràng associatedType là gì . Như đã nói trước đó , nó là *generic placeholders* nhưng không phải kiểu *generic* . Bạn cũng có thể gọi nó là tham số đa hình .

Hãy xem đoạn code sau :

```
/// usage 
let extendend = ExtendedDetail()
let detail = Detail()
let detailCell = Cell()
/// This will error
detailCell.configure(extendend)
/// This will be successful.
detailCell.configure(detail)
```

Trong đoạn code trên , ứng dụng sẽ báo lỗi ở dòng thứ 6 với nội dung như sau :

> Cannot convert value of type ‘ExtendedDetail’ to expected argument type ‘Cell.T’ (aka ‘Detail’)

Lỗi này là bởi vì khi adopt protocol chúng ta được yêu cầu chỉ rõ *Concrete Type* và chúng ta đã làm nó bằng cách khai báo *typealias T = Detail* do đó chức năng của chúng ta đã biết tại thời điểm *Concrete Type* được biên dịch và đó là lý do tại sao nó báo lỗi nếu chúng ta cố gắng sử dụng ExtendendDetail thay vì Detail  .

Hãy thêm đoạn thực thi cho ExtendedCell adopt cùng protocol nhưng sử dụng Concrete Type khác :

```
class Cell: TableViewCell {
    /// `associatedtype` adoption
    typealias T = Detail
    /// now the compiler knows and reuires
    /// to inject only `Detail` into the `func`
    func configure(_ model: T) {
        /// Configure your cool cell :)
    }
}

class ExtendedCell: TableViewCell {
    /// `associatedtype` adoption
    typealias T = ExtendedDetail
    /// now the compiler knows and reuires
    /// to inject only `Detail` into the `func`
    func configure(_ model: T) {
        /// Configure your cool cell :)
    }
}

/// usage
let extendend = ExtendedDetail()
let detail = Detail()
let detailCell = Cell()
let extendendDetailCell = ExtendedCell()

let cells: [TableViewCell] = [extendendDetailCell, detailCell]
```

Xa hơn nữa , nếu chúng ta quyết định tạo một collection cho TableViewCell như được hiển thị ở đoạn code bên trên , do đó thông báo lỗi xuất hiện tại dòng 27 

> Protocol ‘TableViewCell’ can only be used as a generic constraint because it has Self or associated type requirements

Giải pháp duy nhất cho lỗi này nó có tên gọi là Type Erasure . Trước khi đưa ra giải pháp chúng ta hãy cùng xem khái niệm này nghĩa là gì ?

**Type Erasure Definition:**

*Type erasure đề cập đến quá trình compile-time  Theo đó các annotation explicit type được xoá khỏi chương trình , trước khi nó được thực thi lúc  run-time.*

Có ba patterns mà chúng ta có thể áp dụng để giải quyết vấn đề generic constraints requirement :

+ Constrained Type Erasure: xoá 1 kiểu nhưng giữ cho nó 1 ràng buộc .
+ Unconstrained Type Erasure : xoá 1 kiểu mà không có ràng buộc cho nó .
+ Shadow Type Erasure: xoá 1 kiểu bằng cách nguỵ trang một kiểu

Mình sẽ lấy ví dụ cho cách đầu tiên .

**Constrained Type Erasure:**

Parttem này thêm một initializer constraint trên wrapper class để đảm bảo rằng generic type được đưa vào khớp với associatedtype : 

```
/// Rows `Interface`
protocol Row {
    /// PAT Placeholder for unknown Concrete Type `Model`
    associatedtype Model
    /// Recieves a parameter of Concrete Type `Model`
    func configure(with model: Model)
}
/// Concrete Type `Product`
struct Product { }
/// Concrete Type `Item`
struct Item { }

//MARK: - Constrained Type Erasure
/// Wrapper `AnyRow`
struct AnyRow<I>: Row {
    private let configureClosure: (I) -> Void
    /// Initialiser guaratees that `Model`
    /// should be a `Type` of `I`
    init<T: Row>(_ row: T) where T.Model == I {
        /// Matches the row `configure` func
        /// to the private the `configureClosure`
        configureClosure = row.configure
    }
    /// Conforming to `Row` protocol
    func configure(with model: I) {
        configureClosure(model)
    }
}
/// `ProductCell`
class ProductCell: Row {
    typealias Model = Product
    let name: String

    init(name: String) {
        self.name = name
    }
    /// Conforming to `Row` protocol
    func configure(with model: Model) {
        print("PATs PlaceHolder is now `Product` Concrete Type)")
        print("This will now be configured based on \(type(of: self))")
    }
}
/// `ProductDetailsCell`
class ProductDetailsCell: Row {
    typealias Model = Product
    let name: String
    let category: String

    init(name: String, category: String) {
        self.name = name
        self.category = category
    }
    /// Conforming to `Row` protocol
    func configure(with model: Model) {
        print("PATs PlaceHolder is now `Product` Concrete Type)")
        print("This will now be configured based on \(type(of: self))")
    }
}
/// Usage of PAT for Homogeneous Requirement
let productCell = ProductCell(name: "product-name")
let productDetailsCell = ProductDetailsCell(name: "product-name", category: "ABC-HT")
/// We get only a `Homogeneous` Collection Type
let cells: [AnyRow<Product>] = [AnyRow(productCell), AnyRow(productDetailsCell)]
let product = Product()
cells.forEach { cell in cell.configure(with: product) }
```

Trong đoạn code trên mình đã sử dụng AnyRow xáo bỏ Type requirement khi adopt protocol Row . Nhìn kỹ dòng 20 chúng ta thấy rằng có ràng buộc với hàm init sử dụng lệnh where T.Model == I . Điều này cũng buộc chúng ta vào Type collection đồng nhất như ở dòng 64 .

Ở bài viết này mình hy vọng rằng bạn sẽ hiểu được cách sử dụng Associated Type cung như là cách sử dụng nó . Hẹn gặp lại các bạn trong bài viết tới .
Thanks for watching <3 !

Bài viết được tham khảo tại https://medium.com/@bobgodwinx/swift-associated-type-design-patterns-6c56c5b0a73a .