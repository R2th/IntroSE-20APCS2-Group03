- Có một điểm chung mà hầu hết các app mobie ngày nay đều có là data trong app có thể **encode** hoặc **decode** thành các dạng dự liệu khác nhau. Mặc dù dữ liệu dạng **JSON** đã được download từ network hoặc một dạng dữ liệu đã được xử lý để có thể lưu trữ cục bộ thì việc có thể encode hoặc decode thành các dạng data khác là rất cần thiết cho công việc code Swift.
- Đó là lý do tại sao Swift's **Codeable** API đã được giới thiệu là một tính năng mới trong **Swift** 4.0 - và kể từ đó nó đã phát triển mạnh mẽ trờ thành tiêu chuẩn cho việc encode hoặc decode khác nhau trên các nền tảng điều hành của Apple cũng như cho **server-side** trên swift.
- Những lí do trên khiến **Codeable** trở nên hữu dụng và được tích hợp chặt chẽ với Swift - trình biên dịch giờ có thể tự động tổng hợp rất nhiều code cần thiết để **encode** và **decode** các loại data khác nhau. Tuy nhiên đôi khi chúng ta cần tùy chỉnh các giá trị value và biểu diễn chúng nên hãy cùng tìm hiểu các con đường khác nhau để có thể tùy chỉnh **Codeable** phục vụ công việc này:

## 1/ Changing keys:
- Hãy bắt đầu với một ví dụ đơn giản chúng ta có thể thùy chỉnh cách mà type được **encode** và **decode** bằng cách thay đổi key đã được sử dụng trong các công việc nối tiếp nhau:
```swift
struct Article: Codable {
    var url: URL
    var title: String
    var body: String
}
```
- **Model** của chúng ta sử dụng chế độ **auto-sythesized Codeable** nghĩa là thứ tự các key sẽ phải khớp với tên của property. Tuy nhiên data chúng ta sẽ **decode** value của **Article** từ mẫu **JSON** ví dụ download từ server có thể sẽ hơi khác nên việc decode sẽ thất bại.
- Rất may là lỗi này rất dễ sửa. Tất cả chúng ta sẽ tùy chỉnh key để **Codeable** sẽ sử dụng khi encode hoặc decode các instance **Article** để định nghĩa enum **CodingKeys** để có thể gán **raw value** tùy chình cho **case** khớp với **key** chúng ta mong muốn tùy chỉnh:
```swift
extension Article {
    enum CodingKeys: String, CodingKey {
        case url = "source_link"
        case title = "content_name"
        case body
    }
}
```
- Kỹ thuật trên phù hợp khi chúng ta muốn sử dụng **key-name** tùy chỉnh, nếu chúng ta chỉ muốn **Codeable** sử dụng snake_case cho **property-name** sau đó chúng ta có thể thay đổi để bộ giải mã **JSON** bằng việc thay thế **keyDecodingStrategy**:
```swift
var decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
```

## 2/ Ignoring keys:
- Trong trường hợp chúng ta muốn bỏ qua một số key nhất định thì chúng ta cần có một phương pháp khác để làm việc với **Codeable**. Cùng xem xét ví dụ chúng ta làm việc với note app chúng ta có thể cho phép người dùng nhóm các note khác nhau thành 1 **NoteCollection**, bao gồm các note nháp được lưu cục bộ:
```swift
struct NoteCollection: Codable {
    var name: String
    var notes: [Note]
    var localDrafts = [Note]()
}
```
- Tuy nhiên, vì một lý do là server không support bản nháp nên để cung cấp cho người dùng một bản sắp xếp trật tự thì chúng ta sẽ không muốn đưa các bản nháp đó để **serializing** hoặc **deserializing**.
- May mắn là chúng ta cũng có thể dễ dàng hoàn thành việc đó mà không thay đổi **Codeable** implementation cho NoteCollection. Nếu chúng ta định nghĩa **CodingKeys** enum. Như trên chúng ta chỉ cần bỏ qua **localDrafts** thì thuộc tính đó sẽ không được gọi khi **encode** và **decode** các value cho **NoteCollection**:
```swift
extension NoteCollection {
    enum CodingKeys: CodingKey {
        case name
        case notes
    }
}
```
## 3/ Tạo các structure phù hợp:
- Hay cùng build một app bao gồm tính năng chuyển đổi các giá trị tiền tệ đã được cung cấp tỷ giá dưới dạng **JSON**.
```swift
{
    "currency": "PLN",
    "rates": {
        "USD": 3.76,
        "EUR": 4.24,
        "SEK": 0.41
    }
}
```
- Trong code swift, khi muốn chuyển đổi các response từ **JSON** thành các **CurrencyConversion** instance - mỗi instance bao gồm một mảng các **ExchangeRate** cho mỗi giá trị hiện tại:
```swift
struct CurrencyConversion {
    var currency: Currency
    var exchangeRates: [ExchangeRate]
}

struct ExchangeRate {
    let currency: Currency
    let rate: Double
}
```
- Tuy nhiên,nếu chúng ta tiếp tục và muốn 2 struct trên phù hợp với **Codeable**, chúng ta lần nữa gặp phải tình trạng không khớp giữa key và **JSON** data mà chúng ta cần tìm cách **decode**. Tại thời tiểm này, vấn đề không chỉ ở **key-name** mà còn sự thay đổi trong cấu trúc.
- Chúng ta có thể thay đổi cấu trúc code **Swift** để phù hợp với cấu trúc dữ liệu **JSON** - nhưng không phải lúc nào chúng ta cũng có thể làm được cách này. Mặc dù mã **serialization** chính xác là rất quan trọng nhưng có một cấu trúc code phù hợp với thực tế cũng quan trọng không kém.
- Thay vì tạo mới, chúng ta sẽ tùy chỉnh **type** để nó đóng vai trò cầu nối giữa định dạng **JSON** sử dụng với cấu trúc Swift. Chúng ta có thể gói gọn tất cả logic cần thiết để biến một **JSON** dictionary về tỷ giá thành một mảng các **ExchangeRate**:
```swift
private extension ExchangeRate {
    struct List: Decodable {
        let values: [ExchangeRate]

        init(from decoder: Decoder) throws {
            let container = try decoder.singleValueContainer()
            let dictionary = try container.decode([String : Double].self)

            values = dictionary.map { key, value in
                ExchangeRate(currency: Currency(key), rate: value)
            }
        }
    }
}
```
- Sử dụng type bên trên chúng ta có thể định nghĩa private property để phù hợp **JSON** key sử dụng cho data và có các property **exchangeRates** hoạt động như một proxy cho các private property:
```swift
struct CurrencyConversion: Decodable {
    var currency: Currency
    var exchangeRates: [ExchangeRate] {
        return rates.values
    }

    private var rates: ExchangeRate.List
}
```
- Kỹ thuật trên rất hữu dụng khi chúng là muốn code Swift phù hợp với JSON API để sử dụng các structure khác nhau mà không cần implement Codeable từ đầu.

## 4/ Tranforming values:
- Có 1 vấn đề rất phổ biến trong công việc **decode**, đặt biệt khi làm việc với **JSON** **API** có thể ngoài tầm kiểm soát của chúng ta khi các loại encode không theo cách chúng ta mong muốn và không tương thích với các hệ thống code swift.
- Điều cơ bản chúng ta muốn làm ở đây là chuyển đổi các giá trị string thành một loại khác, ví dụ như Int. Chúng ta sẽ bắt đầu bằng việc xác định một **protocol** cho phép chúng ta có thể đánh dấu bất ký loại type nào là **StringRepftimeable** có nghĩa là nó được chuyển đổi từ và thành một chuỗi string đại diện:
```swift
protocol StringRepresentable: CustomStringConvertible {
    init?(_ string: String)
}

extension Int: StringRepresentable {}
```
- Tiếp đó chúng ta khởi tạo một type chuyên dụng khác, lần này là là cho bất kỳ value có thể hỗ trợ vơi một chuỗi, có chứa tất cả các code cần để **decode** và **encode** từ một value đến một string:
```swift
struct StringBacked<Value: StringRepresentable>: Codable {
    var value: Value

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let string = try container.decode(String.self)

        guard let value = Value(string) else {
            throw DecodingError.dataCorruptedError(
                in: container,
                debugDescription: """
                Failed to convert an instance of \(Value.self) from "\(string)"
                """
            )
        }

        self.value = value
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(value.description)
    }
}
```
- Giống như cách chúng ta đã tạo một **private property** cho lưu trữ cơ bản phù hợp **JSON**, chúng ta có thể làm tương tự với bất kỳ property nào mà app hỗ trợ khi encode trong khi vẫn hiển thị dữ liệu cho phần còn lại swift.
```swift
struct Video: Codable {
    var title: String
    var description: String
    var url: URL
    var thumbnailImageURL: URL

    var numberOfLikes: Int {
        get { return likes.value }
        set { likes.value = newValue }
    }

    private var likes: StringBacked<Int>
}
```