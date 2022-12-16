Khi nói đến việc gọi completion handlers cho các hoạt động không đồng bộ, quy ước được thiết lập trong cộng đồng nhà phát triển Apple từ lâu là chỉ đơn giản là thực thi các hành động trên bất kỳ `DispatchQueue` nào.
Ví dụ: khi sử dụng API `URLSession` để thực hiện lệnh get dữ liệu từ network, completion handler đính kèm của chúng ta sẽ được thực thi trên một hàng đợi được quản lý nội bộ bởi chính URLSession:
```
let task = URLSession.shared.dataTask(with: url) {
    data, response, error in

    // This code will be executed on an internal URLSession queue,
    // regardless of what queue that we created our task on.
    ...
}
```
Quy ước trên được cho là hoàn toàn có ý nghĩa về mặt lý thuyết - vì nó khuyến khích chúng ta viết asynchronous code không bị block và vì nó có xu hướng giảm chi phí liên quan đến việc chuyển giữa các hàng đợi khi không cần thiết. Tuy nhiên, nó cũng thường dẫn đến các loại lỗi khác nhau nếu chúng ta không cẩn thận.
Đó là bởi vì, vào cuối chu kỳ phát triển, phần lớn code trong đại đa số các ứng dụng sẽ không theo thread-safe. Tạo một class, function hoặc một loại chuỗi triển khai thread-safe khác thường liên quan đến khối lượng công việc hợp lý, đặc biệt là khi nói đến code liên quan đến giao diện người dùng, vì tất cả các core UI frameworks của Apple (bao gồm cả UIKit và SwiftUI) chỉ có thể an toàn khi được sử dụng từ main thread.
## Remembering to dispatch UI updates on the main queue
Hãy xem một ví dụ, trong đó chúng ta đã tạo một `ProductLoader` sử dụng API `URLSession` đã đề cập ở trên để load một `Product` nhất định dựa trên ID của nó:
```
class ProductLoader {
    typealias Handler = (Result<Product, Error>) -> Void

    private let urlSession: URLSession
    private let urlResolver: (Product.ID) -> URL
    
    ...

    func loadProduct(withID id: UUID,
                     completionHandler: @escaping Handler) {
        let task = urlSession.dataTask(with: urlResolver(id)) {
            data, response, error in

            // Decode data, perform error handling, and so on...
            ...
            
            handler(result)
        }

        task.resume()
    }
}
```
Lớp trên tuân theo quy ước đã thiết lập đó là không gửi lệnh gọi `CompleteHandler` của nó trên bất kỳ queue cụ thể nào và thay vào đó chỉ đơn giản gọi closure trong completion handler của chính nó, lần lượt được `URLSession` gọi trên internal background queue đã đề cập trước đó. 
Do đó, bất cứ khi nào chúng ta sử dụng `ProductLoader` trong bất kỳ loại code nào liên quan đến giao diện người dùng, chúng ta cần nhớ luôn gửi rõ ràng mọi kết quả cập nhật giao diện người dùng trên main `DispatchQueue` - ví dụ như sau:
```
class ProductViewController: UIViewController {
    private let productID: Product.ID
    private let loader: ProductLoader
    private lazy var nameLabel = UILabel()
    private lazy var descriptionLabel = UILabel()
    
    ...

    func update() {
        loader.loadProduct(withID: productID) { [weak self] result in
            DispatchQueue.main.async {
                switch result {
                case .success(let product):
                    self?.nameLabel.text = product.name
                    self?.descriptionLabel.text = product.description
                case .failure(let error):
                    self?.handle(error)
                }
            }
        }
    }
}
```
Việc phải nhớ thực hiện các loại lệnh gọi `DispatchQueue` ở trên trong các asynchronous closures có thể không thực sự là một vấn đề lớn trong thực tế, vì đó là điều mà chúng ta phải làm cực kỳ thường xuyên khi phát triển ứng dụng cho các nền tảng của Apple , vì vậy nó không phải là thứ mà chúng ta có thể quên.
Ngoài ra, nếu chúng ta quên thêm lệnh gọi đó (hoặc nếu ai đó mới bắt đầu phát triển ứng dụng và chưa tìm hiểu về khía cạnh đó), thì Main Thread Checker của Xcode sẽ nhanh chóng kích hoạt một trong các warning màu tím của nó ngay khi chúng ta chạy bất kỳ code nào vô tình gọi một main queue-only API từ một background thread.
Tuy nhiên, điều gì sẽ xảy ra nếu chúng ta không sử dụng closures? Ví dụ: hãy tưởng tượng rằng `ProductLoader` của chúng ta thay vì sử dụng delegate pattern, và thay vì gọi một completion handler, thay vào đó nó sẽ gọi một delegate method bất cứ khi nào nó hoàn thành một trong các hoạt động của nó:
```
class ProductLoader {
    weak var delegate: ProductLoaderDelegate?
    ...

    func loadProduct(withID id: UUID) {
        let task = urlSession.dataTask(with: urlResolver(id)) {
            [weak self] data, response, error in

            guard let self = self else { return }

            // Decode data, perform error handling, and so on...
            ...
            
            self.delegate?.productLoader(self,
    didFinishLoadingWithResult: result
)
        }

        task.resume()
    }
}
```
Nếu bây giờ chúng tôi quay lại `ProductViewController` của mình và cập nhật nó cho phù hợp, thì không còn rõ ràng rằng call site (triển khai delegate protocol của nó trong trường hợp này) đang xử lý kết quả của một hoạt động không đồng bộ, điều này khiến nhiều khả năng chúng ta quên thực hiện cập nhật giao diện người dùng không đồng bộ trên main thread.
Vì vậy, mặc dù Xcode vẫn sẽ cung cấp cho chúng ta runtime error khi phương thức sau được gọi (và các cập nhật giao diện người dùng của chúng ta được thực hiện trên background queue), nhưng không rõ ràng là việc triển khai nó không chính xác chỉ bằng cách nhìn vào nó:
```
extension ProductViewController: ProductLoaderDelegate {
    func productLoader(
        _ loader: ProductLoader,
        didFinishLoadingWithResult result: Result<Product, Error>
    ) {
        switch result {
        case .success(let product):
            nameLabel.text = product.name
            descriptionLabel.text = product.description
        case .failure(let error):
            handle(error)
        }
    }
}
```
Mặc dù vậy, delegate pattern không còn hợp thời như trước nữa, nhưng vấn đề trên chắc chắn không phải là duy nhất đối với kiểu particular pattern đó. Trên thực tế, nếu bây giờ chúng ta xem xét phiên bản rất hiện đại, `Combine` dựa trên `ProductLoader` của chúng ta và view controller được liên kết của nó - chúng ta có thể thấy rằng nó có cùng vấn đề với delegate-based implementation của chúng ta -  UI updates sẽ được thực hiện trên background queue:
```
class ProductLoader {
    ...

    func loadProduct(withID id: UUID) -> AnyPublisher<Product, Error> {
        urlSession
            .dataTaskPublisher(for: urlResolver(id))
            .map(\.data)
            .decode(type: Product.self, decoder: JSONDecoder())
            .eraseToAnyPublisher()
    }
}

class ProductViewController: UIViewController {
    ...
    private var updateCancellable: AnyCancellable?

    func update() {
        updateCancellable = loader
            .loadProduct(withID: productID)
            .convertToResult()
            .sink { [weak self] result in
                switch result {
                case .success(let product):
                    self?.nameLabel.text = product.name
                    self?.descriptionLabel.text = product.description
                case .failure(let error):
                    self?.handle(error)
                }
            }
    }
}
```
Vì vậy, tóm lại, bất kể pattern nào mà chúng ta chọn để triển khai các hoạt động không đồng bộ của mình, luôn có nguy cơ chúng ta quên gửi UI updates theo trên main thread.
## Explicit queue injection
Vậy làm cách nào để có thể khắc phục sự cố trên? Nó thậm chí còn đáng để sửa hay chúng ta chỉ nên giả định rằng mọi nhà phát triển Swift với một số kinh nghiệm nhất định sẽ luôn nhớ đảm bảo rằng các  UI updates của họ sẽ được thực hiện trên main queue?
Tôi nghĩ rằng bất kỳ API nào cũng không nên dựa vào việc người gọi của nó ghi nhớ (hoặc thậm chí biết) các quy ước nhất định - những quy ước đó lý tưởng nên được đưa vào chính thiết kế API. Rốt cuộc, một cách khá chắc chắn để đảm bảo rằng một API không bao giờ bị sử dụng sai cách là làm cho nó không thể (hoặc ít nhất là rất khó) làm như vậy - bằng cách tận dụng các công cụ như type system của Swift để xác thực từng lệnh gọi ở compile time.
Một cách để làm điều đó trong trường hợp này là luôn gọi completion handlers trên main queue, điều này sẽ loại bỏ hoàn toàn nguy cơ có bất kỳ call site nào của chúng ta vô tình thực hiện UI updates trên background queue:
```
class ProductLoader {
    ...

    func loadProduct(withID id: UUID,
                     completionHandler: @escaping Handler) {
        let task = urlSession.dataTask(with: urlResolver(id)) {
            data, response, error in

            ...

            DispatchQueue.main.async {
    completionHandler(result)
}
        }

        task.resume()
    }
}
```
Tuy nhiên, pattern trên cũng có thể gây ra các vấn đề, đặc biệt nếu chúng ta đang tìm cách sử dụng `ProductLoader` trong các ngữ cảnh mà chúng ta muốn tiếp tục thực thi trên background queue theo cách không bị chặn.
Vì vậy, dưới đây là một phiên bản năng động hơn nhiều, vẫn sử dụng main queue làm mặc định cho tất cả các lệnh gọi completion handlers, nhưng cũng cho phép đưa vào một `DispatchQueue` rõ ràng - cho phép chúng ta linh hoạt để cả hai sử dụng `ProductLoader` trong các môi trường đồng thời hoạt động cách xa main thread và trong UI code, tất cả đều giảm đáng kể nguy cơ thực hiện UI updates trên queue sai:
```
// Completion handler-based version:

class ProductLoader {
    ...

    func loadProduct(
        withID id: UUID,
        resultQueue: DispatchQueue = .main,
        completionHandler: @escaping Handler
    ) {
        let task = urlSession.dataTask(with: urlResolver(id)) {
            data, response, error in

            ...

            resultQueue.async {
    completionHandler(result)
}
        }

        task.resume()
    }
}

// Combine-based version:

class ProductLoader {
    ...
    
    func loadProduct(
        withID id: UUID,
        resultQueue: DispatchQueue = .main
    ) -> AnyPublisher<Product, Error> {
        urlSession
            .dataTaskPublisher(for: urlResolver(id))
            .map(\.data)
            .decode(type: Product.self, decoder: JSONDecoder())
            .receive(on: resultQueue)
            .eraseToAnyPublisher()
    }
}
```
Tất nhiên, pattern trên thực sự dựa vào việc chúng ta nhớ thêm `resultQueue` argument đó vào từng APIs không đồng bộ của chúng ta (chúng ta cũng có thể triển khai nó như một tham số trình khởi tạo thay thế), nhưng ít nhất bây giờ chúng ta không phải nhớ luôn sử dụng `DispatchQueue.main.async` tại mọi call site nữa - mà cá nhân tôi nghĩ là một chiến thắng lớn.
## Conclusion
Mặc dù không có cái gọi là API hoàn toàn chống lỗi và việc phát triển ứng dụng cho bất kỳ loại nền tảng nào sẽ luôn liên quan đến việc học và ghi nhớ một số quy ước nhất định, nếu chúng ta có thể làm cho các API mà chúng ta thiết kế trong ứng dụng của riêng mình trở nên dễ sử dụng ( hoặc càng khó sử dụng sai) càng tốt, thì điều đó có xu hướng dẫn đến các code base mạnh và dễ sử dụng.
Mặc định gọi completion handler trên main queue có thể chỉ là một phần nhỏ trong số đó, nhưng nó có thể là một phần khá quan trọng, đặc biệt là trong các code base sử dụng nhiều hoạt động không đồng bộ dẫn đến UI updates.

Hy vọng bài viết sẽ có ích với các bạn.

Reference: https://www.swiftbysundell.com/articles/deciding-what-queue-to-run-a-completion-handler-on/