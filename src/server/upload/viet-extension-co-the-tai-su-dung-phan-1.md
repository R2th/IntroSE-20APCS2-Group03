Có thể cho rằng một trong những tính năng mạnh mẽ và thú vị nhất của Swift là cách nó cho phép chúng ta mở rộng bất kỳ type hoặc protocol nào với chức năng mới. Điều đó không chỉ cho phép ta tôi điều chỉnh phần code gốc để phù hợp với từng dự án, nó còn mở ra nhiều cơ hội khác nhau để viết các extension có thể được sử dụng lại qua nhiều trường hợp và các dự án khác.

Trong bài này, hãy cùng mình xem một vài ví dụ về việc đó, cũng như một bộ nguyên tắc khi bạn viết một extension để có thể sử dụng trong nhiều hoàn cảnh khác nhau.

### Tạo extension tổng quát thông qua abstractions

Khi bạn viết code hàng ngày, một điều rất phổ biến là đối với từng tính năng và phần chức năng mới thì chúng ta thường triển khai code vào những đối tượng cụ thể. Điều đó không có gì sai, trên thực tế, nó giúp chúng ta tránh được việc khái quát hóa sớm và thường cho phép chúng ta lặp lại nhanh hơn nhiều bằng cách ban đầu chỉ tập trung vào một trường hợp sử dụng duy nhất.

Ví dụ, chúng ta đang làm việc với trình soạn thảo văn bản để viết bài - và để cải thiện hiệu suất ứng dụng của chúng ta trong các tình huống nhất định thì ta viết hàm sau để cho phép ứng dụng dễ dàng lưu trữ một bài viết nhất định vào disk, lưu ý rằng đây chỉ là đoạn code ví dụ.

```
extension Article {
    func cacheOnDisk() throws {
        let folderURLs = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )

        let fileName = "Article-\(id).cache"
        let fileURL = folderURLs[0].appendingPathComponent(fileName)
        let data = try JSONEncoder().encode(self)
        try data.write(to: fileURL)
    }
}
```

Viết extension cho các type cụ thể ở trên có thể là một cách tuyệt vời để vừa giảm trùng lặp mã, vừa giúp thực hiện các tác vụ phổ biến dễ dàng hơn. Tuy nhiên,  việc đó đôi khi cũng có thể là một cơ hội bị bỏ lỡ để làm cho code của chúng ta ít bị tách rời và linh hoạt hơn. Trong trường hợp cụ thể này, khả năng rất cao là chúng ta sẽ không chỉ muốn lưu trữ các phiên bản Article mà còn các loại đối tượng khác - điều mà đoạn code hiện tại của chúng ta không thể đáp ứng được, giả sử chúng ta muốn cache thêm đối tượng User thay vì chỉ mỗi Article.

Khi tìm cách khái quát hóa một extension cụ thể, đầu tiên có vẻ như nó bị gắn chặt với một đối tượng duy nhất mà chúng ta định thực hiện viết hàm mở rộng. Ví dụ, chức năng cache trên của chúng ta sử dụng tên của Article và thuộc tính id của nó để tạo thành từng tên tệp. Tuy nhiên, về mặt khái niệm, thực sự không có gì khác về hai phần dữ liệu đó mà cụ thể là các Article - mỗi loại đều có tên và bất kỳ loại nào cũng có thể có thuộc tính id, vì vậy chúng ta có thể làm cho extension đó có thể sử dụng lại và tính khái quát cao hơn.

Hãy bắt đầu bằng cách review lại chức năng cache của chúng ta có yêu cầu thực sự là gì:

Để có thể mã hóa từng giá trị thành JSON, chúng ta có thể dùng bất cứ kiểu nào miễn là nó thoả mãn Encodable protocol.
Chúng ta cũng cần các đối tượng đó có một thuộc tính id,  để có thể tạo ra giá trị duy nhất dùng để cache.
Để mô hình hóa hai yêu cầu đó theo cách khái quát và không bị ràng buộc với bất kỳ đối tượng cụ thể nào, chúng ta sẽ sử dụng Encodable làm mục tiêu cho extension của mình và sau đó chúng ta sẽ thêm một ràng buộc loại chung để chỉ định rằng phương thức lưu trữ của chúng ta chỉ có thể đã gọi các loại cũng tuân thủ Identifiable - một giao thức khác, cung cấp cho chúng ta thuộc tính id mà chúng ta cần:

```
extension Encodable where Self: Identifiable {
    // We also take this opportunity to parameterize our JSON
    // encoder, to enable the users of our new API to pass in
    // a custom encoder, and to make our method's dependencies
    // more clear:
    func cacheOnDisk(using encoder: JSONEncoder = .init()) throws {
        let folderURLs = FileManager.default.urls(
            for: .cachesDirectory,
            in: .userDomainMask
        )

        // Rather than hard-coding a specific type's name here,
        // we instead dynamically resolve a description of the
        // type that our method is currently being called on:
        let typeName = String(describing: Self.self)
        let fileName = "\(typeName)-\(id).cache"
        let fileURL = folderURLs[0].appendingPathComponent(fileName)
        let data = try encoder.encode(self)
        try data.write(to: fileURL)
    }
}
```

Vậy là chúng ta đã chuyển đổi phương thức lưu trữ của chúng ta ban đầu từ rất cụ thể sang một phương pháp hoàn toàn có thể tái sử dụng - và vì extension mới của chúng ta chỉ phụ thuộc vào các giao thức và trừu tượng được xác định bởi thư viện chuẩn của Swift, giờ đây chúng ta cũng có thể chia sẻ nó tới các project khác dễ dàng.

Tham khảo: https://www.swiftbysundell.com/articles/writing-reusable-swift-extensions/#generalizing-through-abstractions