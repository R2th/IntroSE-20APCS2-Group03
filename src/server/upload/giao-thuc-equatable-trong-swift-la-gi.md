Đây là bài dịch từ trang [medium.com](https://medium.com), mời các bạn xem bài gốc tại đây: https://medium.com/better-programming/what-is-the-equatable-protocol-in-swift-f3238f6821d6

![](https://images.viblo.asia/f4b29eff-7803-4d01-8eee-72d012e612e3.jpeg)

So sánh các đối tượng bằng nhau trong *Swift* một cách dễ dàng.

Trong hướng dẫn này, chúng ta sẽ cùng tìm hiểu về giao thức **Equatable** trong *Swift* một cách nhanh chóng thông qua các ví dụ trong *Xcode Playground*.

Giao thức **Equatable** cho phép chúng ta cung cấp một tính năng để so sánh các *struct* và *class* mà chúng ta tạo ra trong Swift.
### Bắt đầu
Giả sử chúng ta có một ứng dụng liệt kê các sản phẩm khác nhau mà người dùng có thể mua. Vì vậy, chúng ta tạo ra 2 *struct* `Product` và `ProductCategory`:
```
struct Product {
    let category: ProductCategory
    let identifier: String
    let title: String
    let price: Double
}

struct ProductCategory {
    let id: String
}
```

Và khởi tạo các đối tượng:
```
let shoesCategory = ProductCategory(id: "shoes")
let clothingCategory = ProductCategory(id: "clothing")

let product1 = Product(category: shoesCategory, identifier: "product0001", title: "First product", price: 30.0)
let product2 = Product(category: clothingCategory, identifier: "product0002", title: "Second product", price: 45.0)

```
Bây giờ, nếu chúng ta muốn kiểm tra xem hai sản phẩm này có bằng nhau hay không, chúng ta viết một câu lệnh `if` khá dài như sau đây:
```
if product1.identifier == product2.identifier && product1.category.id == product2.category.id {
    print("Products are the same")
} else {
    print("Products are different")
}
```
Vậy có cách nào khác chúng ta có thể tối ưu hóa quá trình so sánh này không?
### Tuân thủ giao thức Equatable
Để tuân thủ theo giao thức **Equatable**  chúng ta phải thực thi môt phương thức bắt buộc `==`:
```
extension Product: Equatable {
    public static func ==(lhs: Product, rhs: Product) -> Bool {
        return lhs.identifier == rhs.identifier
            && lhs.category.id == rhs.category.id
    }
}
```
Bây giờ, chúng ta có thể dễ dàng so sánh hai sản phẩm mà không cần viết câu lệnh if dài dòng như ở trên nữa:
```
let sampleProduct1 = Product(category: clothingCategory, identifier: "product0003", title: "Test product", price: 30.0)
let sampleProduct2 = Product(category: clothingCategory, identifier: "product0003", title: "Test product", price: 45.0)

if sampleProduct1 == sampleProduct2 {
    print("Products are the same")
} else {
    print("Products are different")
}
```
![](https://images.viblo.asia/8b2e4605-16b8-4689-970c-86a38366c899.png)

### Kết thúc
Nếu bạn hứng thú với các kĩ thuật so sánh khác, vui lòng xem trong bài viết sau về giao thức **Comparable** tại đây:
[Khi nào nên sử dụng giao thức **Comparable** trong Swift](https://medium.com/better-programming/when-to-use-the-comparable-protocol-in-swift-b9f137b07413)

Để tìm hiểu thêm về giao thức **Equatable**, hãy truy cập [tài liệu chính thức của Apple](https://developer.apple.com/documentation/swift/equatable).

Cảm ơn vì đã đọc!