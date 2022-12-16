Một lợi ích lớn của swift's type system là nó cho phép chúng ta loại bỏ rất nhiều sự mơ hồ khi nói đến việc xử lý các giả trị và kết quả của các hoạt động khác nhau. Với những tính năng như generics và associated enum values, chúng ta có thể dễ dàng tạo các types cho phép tận dùng trình biên dịch để đảm bảo rằng chúng ta đang xử lý các giá trị và kết quả một cách chính xác. Ví dụ như là Result type và trong khi nó chưa được xây dựng trong thư viện chuẩn, nó là một kiểu rất phổ biến trong nhiều dự án swift khác nhau. Trong bài viết này, chúng ta sẽ tìm hiểu nhiều phiên bản khác nhau của result type và một số điều thú vị mà nó cho phép chúng ta làm khi kết hợp với một số tính năng của Swift.
## The problem
Khi ta thực hiện nhiều loại hoạt động, nó thường có kết quả là thành công hoặc thất bại. Trong Objective-C, cách duy nhất để mô hình hóa hai kết quả này là gộp một giá trị và một lỗi trong kết quả. Tuy nhiên, khi chuyển sang Swift, vấn đề với cách tiếp cận này trở nên khá rõ ràng - vì cả giá trị lẫn lỗi đều phải là optional:
```
func load(then handler: @escaping (Data?, Error?) -> Void) {
    ...
}
```
Vấn đề là việc xử lý kết quả của load method ở trên trở nên khá phức tạp. Ngay cả khi error parameter là nil, trình biên dich sẽ không đảm bảo rằng dữ liệu chúng ta đang tìm kiếm thực sự ở đó. Tất cả có thể là nil, Điều này sẽ đặt mã của chúng ta ở trạng thái lạ.
## Separate states
Sử dụng Result type để giải quyết vấn đề này bằng cách chuyển từng kết quả thành hai trạng thái riêng biệt, bằng cách sử dụng enum chứa một trường hợp cho mỗi trạng thái - một cho thành công và một cho thất bại
```
enum Result<Value> {
    case success(Value)
    case failure(Error)
}
```
Bằng cách tạo ra result type generic, nó có thể tái sử dụng trong nhiều ngữ cảnh khác nhau, trong khi vẫn giữ được full type một cách an toàn. Nếu bây giờ chúng ta cập nhật load method để sử dụng result type trên, chúng ta có thể thấy mọi thứ trở nên rõ ràng hơn nhiều
```
func load(then handler: @escaping (Result<Data>) -> Void) {
    ...
}
```
Không chỉ sử dụng result để cải thiện độ an toàn biên dịch code của chúng ta, nó còn khuyến khích chúng ta luôn thêm xử lý lỗi thích hợp bất cứ khi nào chúng ta gọi API
```
load { result in
    switch result {
    case .success(let data):
        // Handle the loaded data
    case .failure(let error):
        // Error handling
    }
}
```
Bây giờ chúng ta đã làm cho code rõ ràng hơn và cũng đã loại bỏ sự không rõ ràng trong source code trước, dẫn đến API dễ sử dụng hơn nhiều
## Typed errors
Xét về mặt type safety, chúng tôi vẫn có thể thực hiện được nhiều thứ hơn nữa. Trong lần lặp trước của chúng ta, trường hợp thất bại của enum Result của chúng ta chứa một giá trị lỗi có thể là bất kỳ kiểu nào phù hợp với giao thức Lỗi của Swift. Điều đó mang lại cho chúng ta rất nhiều sự linh hoạt nhưng việc này khó có thể biết chính xác lỗi nào có thể gặp phải.
Một cách để giải quyết vấn đề đó là làm cho giá trị lỗi liên quan cũng là một generic type:
```
enum Result<Value, Error: Swift.Error> {
    case success(Value)
    case failure(Error)
}
```
Bằng cách đó, chúng ta hiện được yêu cầu xác định loại lỗi mà người dùng API có thể mong đợi. Ví dụ, hãy cập nhật load method của chúng ta sử dụng result type mới của chúng ta:
```
typealias Handler = (Result<Data, LoadingError>) -> Void

func load(then handler: @escaping Handler) {
    ...
}
```
Việc thêm thông tin loại bổ sung vào loại kết quả của chúng ta có một số lợi ích tốt - ví dụ, nó cho phép chúng tôi xử lý cụ thể tất cả các lỗi có thể xảy ra tại call site, như sau
```
load { [weak self] result in
    switch result {
    case .success(let data):
        self?.handle(data)
    case .failure(let error):
        // Since we now know the type of 'error', we can easily
        // switch on it to perform much better error handling
        // for each possible type of error.
        switch error {
        case .networkUnavailable:
            self?.showErrorView(withMessage: .offline)
        case .timedOut:
            self?.showErrorView(withMessage: .timedOut)
        case .invalidStatusCode(let code):
            self?.showErrorView(withMessage: .statusCode(code))
        }
    }
}
```
Việc xử lý lỗi như chúng ta thực hiện ở trên có vẻ như quá mức cần thiết, nhưng nó "buộc" chính mình vào thói quen xử lý lỗi theo cách thức như vậy thường có thể tạo ra trải nghiệm người dùng đẹp hơn nhiều - vì người dùng thực sự muốn được thông báo về những gì đã xảy ra thay vì nhìn thấy màn hình lỗi chung và chúng ya thậm chí có thể thêm hành động thích hợp cho từng lỗi.
Tuy nhiên, với hệ thống lỗi hiện tại của Swift, nó không phải lúc nào cũng thực tế để có được một strongly typed, có thể đoán trước được trong mọi hoạt động. Đôi khi, chúng tôi cần sử dụng các API và hệ thống cơ bản có thể tạo ra bất kỳ lỗi nào, vì vậy chúng tôi cần một số cách để có thể cho hệ thống biết rằng result type của chúng ta cũng có thể chứa bất kỳ lỗi nào.
Rất may, Swift cung cấp một cách rất đơn giản để thực hiện điều đó - sử dụng NSError từ Objective-C. Bất kỳ lỗi Swift nào cũng có thể được tự động chuyển đổi thành một NSError, mà không cần đến optional type casting. Thậm chí còn tốt hơn nữa, là chúng ta thậm chí có thể yêu cầu Swift chuyển đổi bất kỳ lỗi nào thành NSError, làm cho nó đơn giản để truyền nó đến một completion handle:
```
class ImageProcessor {
    typealias Handler = (Result<UIImage, NSError>) -> Void

    func process(_ image: UIImage, then handler: @escaping Handler) {
        do {
            // Any error can be thrown here
            var image = try transformer.transform(image)
            image = try filter.apply(to: image)
            handler(.success(image))
        } catch let error as NSError {
            // When using 'as NSError', Swift will automatically
            // convert any thrown error into an NSError instance
            handler(.failure(error))
        }
    }
}
```
## Throwing
Đôi khi chúng tôi không thực sự muốn chuyển sang một kết quả, nhưng thay vì móc nó trực tiếp vào *do, try, catch error* của Swift. Tin tốt là vì bây giờ chúng tôi có loại kết quả chuyên dụng, chúng ta có thể dễ dàng mở rộng nó để thêm các API tiện lợi - Ví dụ dưới đây cho phép chúng ta trả lại giá trị hoặc sử dụng một lần gọi duy nhất:
```
extension Result {
    func resolve() throws -> Value {
        switch self {
        case .success(let value):
            return value
        case .failure(let error):
            throw error
        }
    }
}
```
Phần extension ở trên thực sự có thể trở nên hữu ích cho test, khi chúng tôi không thực sự muốn thêm bất kỳ code hoặc điều kiện nào. Dưới đây là ví dụ trong đó chúng ta test SearchResultsLoader bằng cách sử dụng mocked, synchronous, network engine - và bằng cách sử dụng phương pháp giải quyết mới của chúng ta
```
class SearchResultsLoaderTests: XCTestCase {
    func testLoadingSingleResult() throws {
        let engine = NetworkEngineMock.makeForSearchResults(named: ["Query"])
        let loader = SearchResultsLoader(networkEngine: engine)
        var result: Result<[SearchResult], SearchResultsLoader.Error>?

        loader.loadResults(matching: "query") {
            result = $0
        }

        let searchResults = try result?.resolve()
        XCTAssertEqual(searchResults?.count, 1)
        XCTAssertEqual(searchResults?.first?.name, "Query")
    }
}
```
## Decoding
Chúng tôi cũng có thể tiếp tục thêm nhiều extension cho các hoạt động phổ biến khác. Ví dụ: nếu ứng dụng của chúng ta xử lý rất nhiều với JSON, chúng ta có thể sử dụng cùng một type constraint để cho phép bất kỳ giá trị Kết quả nào mang Dữ liệu được giải mã trực tiếp - bằng cách thêm extension sau:
```
extension Result where Value == Data {
    func decoded<T: Decodable>() throws -> T {
        let decoder = JSONDecoder()
        let data = try resolve()
        return try decoder.decode(T.self, from: data)
    }
}
```
Với cách trên, chúng ta có thể dễ dàng giải mã bất kỳ loaded data hoặc throw nếu gặp phải lỗi - trong chính loading operation hoặc trong khi giải mã:
```
load { [weak self] result in
    do {
        let user = try result.decoded() as User
        self?.userDidLoad(user)
    } catch {
        self?.handle(error)
    }
}
```
## Conclusion
Sử dụng result type có thể là một cách tuyệt vời để giảm sự mơ hồ khi xử lý các giá trị và kết quả của các hoạt động không đồng bộ. Bằng cách thêm các API sử dụng các extension, chúng ta cũng có thể giảm bớt bản mẫu và làm cho việc thực hiện các thao tác phổ biến dễ dàng hơn khi làm việc với các kết quả.
Một điều có thể là một thách thức đối với các result type trong trạng thái hiện tại, khi nhiều framework hoặc mô-đun xác định một loại result type của riêng chúng và cuối cùng chúng ta phải chuyển đổi giữa chúng trong ứng dụng của chúng ta. Một giải pháp cho vấn đề này là thêm một result type vào thư viện chuẩn, tất cả các framework và ứng dụng có thể sử dụng để xử lý các kết quả một cách thống nhất.
Hy vọng bài viết sẽ có ích với các bạn.

Nguồn: https://www.swiftbysundell.com/posts/the-power-of-result-types-in-swift