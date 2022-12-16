Trong hầu hết các ứng dụng hiện đại đều có điểm chung là chúng cần mã hóa hoặc giải mã các dạng dữ liệu khác nhau. Cho dù đó là dữ liệu JSON được tải xuống hay các dạng dữ liệu được lưu trữ cục bộ, có thể mã hóa và giải mã một cách đáng tin cậy các data dữ liệu khác nhau là điều cần thiết.

Đó là một phần lớn lý do tại sao API Codable của Swift là một tính năng quan trọng như vậy khi nó được giới thiệu như một phần của Swift 4.0 - và từ đó nó đã phát triển thành một cơ chế mạnh mẽ, tiêu chuẩn cho một số loại encode và decode khác nhau - cả trên Apple's platforms, cũng như cho server-side Swift.

Điều khiến Codable trở nên tuyệt vời là nó được tích hợp chặt chẽ với Swift toolchain, giúp trình biên dịch có thể tự động tổng hợp rất nhiều mã cần thiết để mã hóa và giải mã các giá trị khác nhau. Tuy nhiên, đôi khi chúng ta cần tùy chỉnh cách thể hiện các giá trị của mình khi được serialized. Vì vậy chúng ta hãy xem xét một vài cách khác nhau để chúng ta có thể điều chỉnh Codable và việc triển khai để thực hiện điều đó.

### Changing keys

Hãy bắt đầu với một trong những cách cơ bản để chúng ta có thể tùy chỉnh encode và decode - bằng cách sửa đổi các keys được sử dụng như một phần của biểu diễn nối tiếp của nó. Chúng ta đang làm việc trên một ứng dụng để đọc bài viết và một trong những core data:

```
struct Article: Codable {
    var url: URL
    var title: String
    var body: String
}
```

<BR>

Model đang sử dụng Codable triển khai hoàn toàn tự động , có nghĩa là tất cả các khóa tuần tự hóa của nó sẽ khớp với tên của các thuộc tính của nó. Tuy nhiên, dữ liệu sẽ giải mã Article các giá trị từ - ví dụ JSON được tải xuống từ server - có thể có keys với tên gọi khác, khiến việc giải mã mặc định đó không thành công.

Rất may, điều đó dễ dàng được sửa chữa. Tất cả những gì chúng ta phải làm để tùy chỉnh các keys mà Codable sẽ sử dụng khi decode (hoặc encode) các Article của chúng ta là xác định một CodingKeys enum bên trong nó - và gán các giá trị thô tùy chỉnh cho các trường hợp khớp với các khóa mà chúng ta muốn tùy chỉnh - như thế này :

```
extension Article {
    enum CodingKeys: String, CodingKey {
        case url = "source_link"
        case title = "content_name"
        case body
    }
}
```
<br>
    
Làm như trên cho phép chúng tôi tiếp tục tận dụng triển khai mặc định do trình biên dịch tạo cho công việc mã hóa thực tế, trong khi vẫn cho phép thay đổi tên của các keys sẽ được sử dụng để tuần tự hóa.

Mặc dù kỹ thuật trên rất phù hợp khi chúng tôi muốn sử dụng các tên khóa hoàn toàn tùy chỉnh, nhưng nếu chúng tôi chỉ muốn Codable sử dụng snake_case các phiên bản của tên thuộc tính của chúng tôi (ví dụ như chuyển backgroundColor thành background_color) - thì chúng tôi có thể thay đổi đơn giản bộ giải mã JSON của chúng tôi keyDecodingStrategy:
    
```
var decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
```

Điều tuyệt vời ở hai API trên là chúng cho phép chúng tôi xử lý sự không khớp giữa các mô hình Swift  và dữ liệu sẽ được sử dụng để thể hiện chúng, mà không yêu cầu sửa đổi tên các thuộc tính của.
    
### Ignoring keys
    
Mặc dù nó thực sự hữu ích để có thể tùy chỉnh tên của các khóa mã hóa, đôi khi chúng ta có thể muốn bỏ qua hoàn toàn một số keys nhất định. Ví dụ: bây giờ hãy nói rằng chúng tôi đang làm việc trên mộ note app - và chúng tôi cho phép người dùng nhóm các ghi chú khác nhau lại với nhau để tạo thành một NoteCollection, có thể bao gồm các bản nháp cục bộ:

```
struct NoteCollection: Codable {
    var name: String
    var notes: [Note]
    var localDrafts = [Note]()
}
```

Tuy nhiên, mặc dù thật sự tiện lợi khi localDrafts là một phần trong NoteCollection mô hình  - giả sử rằng chúng ta không muốn những bản nháp đó được đưa vào serializing hoặc deserializing  tuần tự hóa một bộ sưu tập như vậy. Một lý do cho điều đó có thể là để cung cấp cho người dùng một bảng xếp hạng sạch sẽ mỗi khi họ khởi chạy ứng dụng hoặc vì máy chủ của chúng tôi không hỗ trợ các bản nháp.

May mắn thay, điều đó cũng có thể dễ dàng được thực hiện mà không phải thay đổi thực Codablehiện thực tế cho NoteCollection. Nếu chúng ta xác định một CodingKeys enum, giống như trước đây và chỉ cần bỏ qua localDrafts- thì data đó sẽ không được tính đến khi mã hóa hoặc giải mã một NoteCollectiongiá trị:
    
```
extension NoteCollection {
    enum CodingKeys: CodingKey {
        case name
        case notes
    }
}
```

### Creating matching structures
   
Cho đến nay chúng ta chỉ điều chỉnh các keys mã hóa của một loại - và trong khi chúng ta thường có thể đi khá xa chỉ bằng cách làm điều đó, đôi khi chúng ta cần đi xa hơn một chút về tùy chỉnh Codable của mình.

Giả sử rằng chúng tôi đang xây dựng một ứng dụng bao gồm tính năng chuyển đổi tiền tệ - và chúng tôi đang tải xuống tỷ giá hối đoái hiện tại cho một loại tiền tệ nhất định dưới dạng dữ liệu JSON, trông giống như sau:

```
{
	"currency": "PLN",
	"rates": {
		"USD": 3.76,
		"EUR": 4.24,
		"SEK": 0.41
	}
}
```
    
Trong mã Swift của chúng tôi, sau đó chúng tôi muốn chuyển đổi các phản hồi JSON như vậy thành các CurrencyConversion trường hợp - mỗi trường hợp bao gồm một mảng các ExchangeRate entries - one cho mỗi loại tiền:
    
```
struct CurrencyConversion {
    var currency: Currency
    var exchangeRates: [ExchangeRate]
}

struct ExchangeRate {
    let currency: Currency
    let rate: Double
}
```
Tuy nhiên, nếu chúng ta tiếp tục và làm cho cả hai mô hình trên phù hợp với nhau Codable, chúng ta lại kết thúc với sự không khớp giữa mã Swift và dữ liệu JSON mà chúng ta đang tìm cách giải mã. Nhưng lần này, nó không chỉ là vấn đề về tên chính - có sự khác biệt cơ bản về cấu trúc.

Tất nhiên, chúng tôi có thể sửa đổi cấu trúc của các mô hình Swift để khớp chính xác với cấu trúc dữ liệu JSON của chúng tôi - nhưng điều đó không phải lúc nào cũng thực tế. Mặc dù có mã tuần tự hóa chính xác là rất quan trọng, nhưng có một cấu trúc mô hình phù hợp với cơ sở mã thực tế của chúng tôi được cho là quan trọng không kém.

Thay vào đó, hãy tạo một loại chuyên dụng mới - sẽ đóng vai trò là cầu nối giữa định dạng được sử dụng trong dữ liệu JSON của chúng tôi và cấu trúc mã Swift của chúng tôi. Trong loại đó, chúng tôi sẽ có thể gói gọn tất cả logic cần thiết để biến một từ điển JSON về tỷ giá hối đoái thành một loạt các ExchangeRate mô hình - như thế này:


```
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
    
Sử dụng loại trên, giờ đây chúng ta có thể xác định một thuộc tính riêng, tên khớp với khóa JSON được sử dụng cho dữ liệu của nó - và có thuộc tính của chúng ta exchangeRates chỉ hoạt động như một proxy đối diện công khai cho thuộc tính riêng tư đó:
   
```
struct CurrencyConversion: Decodable {
    var currency: Currency
    var exchangeRates: [ExchangeRate] {
        return rates.values
    }
    
    private var rates: ExchangeRate.List
}
```
    
> Lý do các công việc trên là vì các thuộc tính được tính không bao giờ được tính đến khi mã hóa hoặc giải mã một giá trị.


<br>
    
Kỹ thuật trên có thể là một công cụ tuyệt vời khi chúng tôi muốn làm cho mã Swift của chúng tôi tương thích với API JSON sử dụng cấu trúc rất khác - một lần nữa mà không phải thực hiện Codable hoàn toàn từ đầu.
    
### Transforming values
    
Một vấn đề rất phổ biến khi giải mã, đặc biệt là khi làm việc với các API JSON bên ngoài nằm ngoài tầm kiểm soát của chúng tôi, là khi các loại được mã hóa theo cách không tương thích với hệ thống loại nghiêm ngặt của Swift. Ví dụ: dữ liệu JSON mà chúng tôi đang tìm cách giải mã có thể sử dụng các chuỗi để biểu diễn các số nguyên hoặc các loại số khác.

Chúng ta hãy xem một cách có thể cho phép chúng ta đối phó với các giá trị như vậy, một lần nữa theo cách khép kín không yêu cầu chúng ta viết một Codabletriển khai hoàn toàn tùy chỉnh .

Điều cơ bản chúng ta đang tìm kiếm ở đây là chuyển đổi các giá trị chuỗi thành một loại khác - hãy lấy Int như một ví dụ. Chúng ta sẽ bắt đầu bằng cách xác định một giao thức sẽ cho phép chúng ta đánh dấu bất kỳ loại nào StringRepresentable- có nghĩa là nó có thể được chuyển đổi từ và thành một chuỗi đại diện:
    
```
protocol StringRepresentable: CustomStringConvertible {
    init?(_ string: String)
}

extension Int: StringRepresentable {}
```

> Chúng tôi dựa trên giao thức trên của chúng tôi CustomStringConvertible từ thư viện chuẩn, vì điều đó đã bao gồm một yêu cầu thuộc tính để mô tả một giá trị dưới dạng một chuỗi.
    
 <br>
    
Tiếp theo, hãy tạo một loại chuyên dụng khác - lần này cho bất kỳ giá trị nào có thể được hỗ trợ bởi một chuỗi - và nó có chứa tất cả các mã cần thiết để giải mã và mã hóa một giá trị đến và từ một chuỗi:
    
```
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
    
Giống như cách trước đây chúng tôi đã tạo một thuộc tính riêng cho bộ lưu trữ cơ bản, tương thích JSON của chúng tôi, giờ đây chúng tôi có thể làm tương tự cho bất kỳ thuộc tính nào được phụ trợ bởi một chuỗi khi được mã hóa - trong khi vẫn hiển thị dữ liệu đó cho phần còn lại của mã Swift. Đây là một ví dụ về việc làm điều đó đối với thuộc tính của một Video loại numberOfLikes:

```
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

Chắc chắn có một sự đánh đổi ở đây giữa sự phức tạp của việc phải xác định thủ công setters và getters cho một thuộc tính và sự phức tạp của việc phải quay lại Codable triển khai hoàn toàn tùy chỉnh - nhưng đối với các loại như Video cấu trúc trên , chỉ có một thuộc tính cần tùy chỉnh, sử dụng một tài sản sao lưu riêng tư có thể là một lựa chọn tuyệt vời.
    
### Conclusion
    
Như vậy chúng ta đã đi qua một số cách custom Codable để hoạt động trong Swift. Hy vọng chúng sẽ hữu ích trong dự án của bạn.
Bài viết được dịch theo [bài viết cùng tên của Sundell](https://www.swiftbysundell.com/articles/customizing-codable-types-in-swift/).