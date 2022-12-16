## Thuộc tính **`@discardableResult`** trong Swift: bỏ qua các giá trị trả về 

> Trong khi viết các phương thức trong Swift, bạn thường rơi vào các tình huống mà đôi khi bạn muốn bỏ qua giá trị trả về, còn trong các trường hợp khác bạn muốn biết giá trị trả về. Thuộc tính **`@discardableResult`** cho phép chúng ta kích hoạt cả hai trường hợp mà không phải xử lý các cảnh báo gây phiền nhiễu hoặc thay thế bằng dấu gạch dưới. Nó là một tính năng nhỏ trong Swift 

### 1. Khi nào bạn nên sử dụng thuộc tính discardableResult

Điều quan trọng là phải suy nghĩ xem trường hợp này có nên quyết định sử dụng thuộc tính `@discardableResult` hay không. Vì thật dễ dàng để thêm thuộc tính để cảnh báo trong ví dụ sau biến mất. Nó có thể là một cảnh báo khó chịu xuất hiện ở nhiều nơi trong suốt dự án của bạn: 

![](https://images.viblo.asia/832e3668-f0e2-421a-a421-a8376558cb08.png)

Tuy nhiên, không phải lúc nào cũng là quyết định đúng đắn khi chỉ cần thêm thuộc tính `@discardableResult` . Trong ví dụ trên, tốt hơn là buộc người dùng xử lý giá trị kết quả của phương thức APIProvider:

```
enum APIProvder {
    static func updateName(_ name: String) -> Result<User, Error> {
        // .. Handle API endpoint, example result:
        return .success(User(name: name))
    }
}
```

Kết quả cũng có thể là một lỗi trong trường hợp mà nó rất quan trọng để nói với người dùng rằng đã xảy ra sự cố. Vì thế cho nên hãy quyết định method của bạn xem nó có quan trọng để xử lý kết quả hay không.

### 2. Cách sử dụng discardableResult trong Swift

Ví dụ trên với cảnh báo: "kết quả có thể được giải quyết mà không có kết quả", có thể loại bỏ cảnh báo bằng cách sử dụng dấu gạch dưới làm tên thuộc tính:

```
final class UpdateNameViewController {
    func didEnterName(_ name: String) {
        /// The underscore makes the warning go away.
        _ = APIProvder.updateName(name)
    }
}
```

Tuy nhiên, việc có nhiều tên thuộc tính gạch dưới trong suốt các dự án của bạn cũng không thực sự clean code cho lắm. Do đó, tốt hơn hết là sử dụng từ khóa `@discardableResult` trước định nghĩa phương thức của bạn:

```
enum APIProvder {
    @discardableResult static func updateName(_ name: String) -> Result<User, Error> {
        // .. Handle API endpoint, example result:
        return .success(User(name: name))
    }
}
```

Thuộc tính `@discardableResult` cho phép bạn sử dụng giá trị trả về nếu bạn muốn trong khi bạn có thể quyết định bỏ qua nó. Điều này giữ cho code của bạn clean và loại bỏ bất kỳ cảnh báo nào liên quan đến nó trong dự án của bạn.

### 3. Kết luận 

Thuộc tính `@discardableResult` có thể ít được biết đến nhưng thực sự hữu ích để ẩn các cảnh báo trỏ đến các giá trị trả về không được sử dụng. Chỉ cần thêm `@discardableResult` vào phương thức của bạn và các cảnh báo sẽ biến mất. Quyết định cẩn thận cho từng method xem có quan trọng để xử lý giá trị trả về hay không. Trong một số trường hợp, có thể tốt hơn là buộc người dùng xử lý kết quả trong phương thức.

Vậy là bài viết của mình đến đây là hết 😁. Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn.

Cảm ơn các bạn đã theo dõi bài viết. 😃