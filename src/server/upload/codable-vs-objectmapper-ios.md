Gần đây, Tôi đã thử nghiệm với giao thức Codable của Swift như một cách để ánh xạ JSON. Codable đã được thêm vào trong Swift 4 như một cách để cho phép các đối tượng tự chuyển đổi. Bản thân Codable chỉ là một kiểu của Decodable và Encodable.
```
typealias Codable = Decodable & Encodable
```

Đối với bài đăng này, tôi sẽ tập trung vào phần Decodable.

# So Sánh
Trước đây, tôi đã sử dụng ObjectMapper rất nhiều nhưng vì Codable hiện đã được tích hợp vào Swift nên tôi muốn so sánh cả hai. Các tính năng mà tôi muốn so sánh là:
* Validation 🕵️
* Custom Transformation (mapping into custom types, e.g. mapping a JSON string into a regex) 🤖
* Error handling ⚠️

```
{
  "config": {
    "emails": {
      "feedback": "email@email.com"
    },
    "rewriter": {
      "regex": "^(https?://)(?:m|www)((?:\\.[a-z]+)?\\.bbc(?:(?:\\.co\\.uk)|(?:\\.com)))/sport?(?:/amp)?(?:/0)?(.*?)/?((?:\\?.*)?(?:#.*)?)$",
      "output": "$1m$2/sport$3$4"
    },
    "router": {
      "rules": [{
        "regex": "^https://ssl(?:\\.[a-z]+)?\\.bbc\\.(?:co\\.uk|com)/id/register",
        "event": "bbc-id-register"
      }]
    }
  }
}
```

Dữ liệu có cấu trúc JSON khá đơn giản nhưng JSON có một vài biểu thức chính quy mà tôi muốn được ánh xạ tới NSRegularExpression, không phải là một chuỗi

# ObjectMapper
Các struct cần thiết để ánh xạ mô hình JSON này với ObjectMapper như sau.

```
struct Config: ImmutableMappable {
    
    let emails: [String: String]?
    let rewrite: RewriterConfig
    let router: RouterConfig
    
    init(map: Map) throws {
        emails = try? map.value("emails")
        rewrite = try map.value("rewriter")
        router = try map.value("router")
    }
}

struct RewriterConfig: ImmutableMappable {
 
    let output: String
    let regex: NSRegularExpression
    
    init(map: Map) throws {
        output = try map.value("output")
        regex = try map.value("regex", using: RegexTransformer())
    }
}

struct RouterConfig: ImmutableMappable {
    
    let rules: [RouterRuleConfig]
    
    init(map: Map) throws {
        rules = try map.value("rules")
    }
}

struct RouterRuleConfig: ImmutableMappable {
    
    let event: String
    let regex: NSRegularExpression
    
    init(map: Map) throws {
        event = try map.value("event")
        regex = try map.value("regex", using: RegexTransformer())
    }
}
```

Tất cả các quy tắc đều tuân thủ giao thức ImmutableMappable, có nghĩa là cần một hàm tạo lấy đối tượng Map và bắn ra lỗi nếu ánh xạ không thành công.

### Validation
Để thực hiện **validation**, bạn có thể sử dụng **Optionals**. Trong ví dụ này, chúng tôi đã quyết định ứng dụng có thể hoạt động mà không có các địa chỉ email này để các email là optional. `map.values ("email")` bắn lỗi nếu khóa không đúng hoặc không thể được chuyển sang đúng kiêu dữ liệu. Chúng tôi sử dụng **try?** để ghi lại lỗi và chỉ biến nó thành giá trị nil nếu có lỗi.

### Custom Transformation
ObjectMapper supports custom transformations out of the box, and it’s very straight forward.

```
class RegexTransformer: TransformType {
    typealias Object = NSRegularExpression
    typealias JSON = String
    
    func transformFromJSON(_ value: Any?) -> NSRegularExpression? {
        guard let regexString = value as? String else { return nil }
        
        return try? NSRegularExpression(pattern: regexString, options: [])
    }
}
```

Ở đây, chúng ta chỉ thực hiện giao thức TransformType và phương thức TransformFromJSON. Phương thức nhận vào parameter **Any** và cast sang String và sau đó sử dụng **try?** để chuyển đổi String thành NSRegularExpression.
This transformer sẵn sàng để tái sử dụng ở bất cứ đâu.

### Error Handling
Để kiểm tra xử lý lỗi, tôi sẽ sử dụng tệp JSON với `output` key missing.

```
{
    "emails": {
        "feedback": "email@email.com"
    },
    "rewriter": {
        "regex": ".*"
    },
    "router": {
        "rules": [{
            "regex": "^https://ssl(?:\\.[a-z]+)?\\.bbc\\.(?:co\\.uk|com)/id/register",
            "event": "bbc-id-register"
        }]
    }
}
```

Khi chạy qua ObjectMapper, chúng tôi nhận được một thông báo lỗi.

```
Got an error while mapping.
- reason: Cannot cast to 'String'
- location: Config.init(map:):30
- key: output
- currentValue: nil
```

# Codable
Codable triển khai cũng tương tự

```
struct CodableConfig: Decodable {
    
    let emails: [String: String]?
    let rewriter: CodableRewriter
    let router: CodableRouter
    
    private enum CodingKeys: String, CodingKey {
        case emails
        case rewriter
        case router
    }
}

struct CodableRewriter: Decodable {
    
    let regex: NSRegularExpression
    let output: String
    
    private enum CodingKeys: String, CodingKey {
        case regex
        case output
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let string = try container.decode(String.self, forKey: .regex)
        regex = try NSRegularExpression(pattern: string, options: [])
        output = try container.decode(String.self, forKey: .output)
    }
}

struct CodableRouter: Decodable {
    
    let rules: [CodableRules]
    
    private enum CodingKeys: String, CodingKey {
        case rules
    }
}

struct CodableRules: Decodable {
    let regex: NSRegularExpression
    let event: String
    
    private enum CodingKeys: String, CodingKey {
        case regex
        case event
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        let string = try container.decode(String.self, forKey: .regex)
        regex = try NSRegularExpression(pattern: string, options: [])
        event = try container.decode(String.self, forKey: .event)
    }
}
```
Codable rất giống với ObjectMapper mặc dù các khóa được định nghĩa là enum sử dụng giao thức CodingKey.
Có một tính năng thực sự hay khi sử dụng Codable trong đó initialiser có thể được tạo nếu các case enum giống với type maping.

### Validation
Codable hoạt động chính xác như objectmapper
Trình khởi tạo bắn ra một lỗi nếu có error mapping. Một lần nữa, sử dụng **Optionals** ở đây để quyết định cách tốt nhất để xử lý lỗi.

### Custom Transformation
Bạn sẽ nhận thấy trong đoạn mã trên, tất cả sẽ rõ ràng hơn khi code đang cố gắng ánh xạ tới NSRegularExpression. Chúng ta đột nhiên phải thực hiện initialiser `init(from decoder: Decoder)` và lấy KeyedDecodingContainer từ Decoder.

Sử dụng thư viện CodableExtensions, giờ đây chúng ta có thể đơn giản hóa code của mình để trông giống với ObjectMapper.

```
import CodableExtensions

struct CodableRules: Decodable {
    let regex: NSRegularExpression
    let event: String
    
    private enum CodingKeys: String, CodingKey {
        case regex
        case event
    }
    
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        regex = try container.decode(.regex, transformer: RegexCodableTransformer())
        event = try container.decode(.event)
    }
}
```

RegexCodableTransformer cũng rất giống với những gì chúng ta đã có trước đây với ObjectMapper

```
import Foundation

public class RegexCodableTransformer: DecodingContainerTransformer {
    
    public typealias Input = String
    public typealias Output = NSRegularExpression
    
    public init() {}
    
    public func transform(_ decoded: Input) throws -> Output {
        return try NSRegularExpression(pattern: decoded, options: [])
    }
}
```

### Error Handling
Tôi sử dụng cùng một tệp JSON để so sánh xử lý lỗi như trước đây. Lỗi trông như sau:
```
keyNotFound(config_spike.CodableRewriter.(CodingKeys in _4D474241C6D85B5C48988D77CA644850).output, Swift.DecodingError.Context(codingPath: [config_spike.CodableConfig.(CodingKeys in _4D474241C6D85B5C48988D77CA644850).rewriter], debugDescription: "No value associated with key output (\"output\").", underlyingError: nil))
```

# Kết luận
Có nhiều điểm tương đồng hơn nhiều so với sự khác biệt giữa hai phương pháp. Nếu các phép biến đổi là quan trọng thì ObjectMapper sẽ hoạt động tốt. Tuy nhiên, một trong những động lực chính để chuyển đổi là chuyển sang tiêu chuẩn mà Apple đã tạo ra mà không phải mang vào thư viện khác.
Nếu các phép biến đổi là quan trọng, bằng cách thêm một vài giao thức, bạn có thể có cùng hành vi với Codable
Tôi đã quyết định chuyển sang Codable ngay bây giờ cho tất cả các tính năng. Tôi chắc chắn rằng có những tính năng đã bỏ qua trong danh sách này nhưng tôi đã chọn những tính năng quan trọng nhất đối với tôi.

Tham khảo tại: https://medium.com/you-dont-know-swift/codable-vs-objectmapper-af5fe8e8efd5