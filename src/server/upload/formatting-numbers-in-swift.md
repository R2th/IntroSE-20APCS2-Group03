- `Number` là một `type` quan trọng mà chúng ta gặp rất nhiều trong công việc lập trình hàng ngày. Chúng ta bứt gặp `number` ở khắp mọi nơi từ tính toán kích thước, bố cục cho `UI` cho đến `conditional` của các `event`.

- Làm việc với `number` là một trong công việc chính mà máy tính được tạo ra nhưng đôi khi để con người có thể giao tiếp được với máy tính thì `number` phải được chuyển về các `format` mà con người có thể đọc hiểu để đảm bảo tính chính xác cũng như chặt chẽ theo yêu cầu.

## 1/ Solving the decimal problem:
- Nếu yêu cầu đơn giản chúng ta có thể sử dụng `string literal` để khởi tạo `number` từ dạng `String` như sau:

```swift
let a = String(42) // "42"
let b = String(3.14) // "3.14"
let c = "\(42), \(3.14)" // "42, 3.14"
```

- Phương pháp hoạt động tốt và dễ tiếp cận và cho phép chúng ta hoàn toàn kiểm soát các giá trị của `number`, nhưng để tăng tính cơ động trong mục đích sử dụng chúng ta có thể cần các phương thức cũng như định dạng khác khi làm việc với các giá trị `number` thay đổi liên tục.

- Để lấy ví dụ chúng ta sẽ triển khai `type` `Metric` cho phép chúng ta liên kết `type` `Double` với các `name`, `value`, `description`:

```swift
struct Metric: Codable {
    var name: String
    var value: Double
}

extension Metric: CustomStringConvertible {
    var description: String {
        "\(name): \(value)"
    }
}
```

- Để cho `number` dạng `Double` có thể dễ đọc hơn ta có thể chuyển nó từ `Double` sang dạng `String` bằng cách có thể tùy chỉnh vị trí thập phân để có thể đảm bảo `output` ra luôn nhất quán:

```swift
extension Metric: CustomStringConvertible {
    var description: String {
        let formattedValue = String(format: "%.2f", value)
        return "\(name): \(formattedValue)"
    }
}
```

- Chúng ta gặp vấn đề ở đây khi nếu `number` là dạng số nguyên thì `output` cũng vẫn sẽ hiển thị dấu thập phân, ví dụ như `number` `42` sẽ cho ra `output` là `42.00`.

- Cách giải quyết vấn đề này là chúng ta sẽ lọc và bỏ bớt các `number` sau dấu thập phân nếu chúng là `0` như sau:

```swift
extension Metric: CustomStringConvertible {
    var description: String {
        var formattedValue = String(format: "%.2f", value)

        while formattedValue.last == "0" {
            formattedValue.removeLast()
        }

        if formattedValue.last == "." {
            formattedValue.removeLast()
        }

        return "\(name): \(formattedValue)"
    }
}
```

- Đoạn `code` trên hoạt động có vẻ ổn nhưng chưa gọn gàng lắm và đây không phải là một hướng tiếp cận cho tất cả trường hợp sử dụng, vì trong các ngôn ngữ khác nhau sẽ có các phương thức biểu diễn `number` khác nhau và chúng ta không thể cứ xử lý các trường hợp cá biệt cho từng ngôn ngữ được.

## 2/ Using NumberFormatter:

- Sử dụng `NumberFormatter` trong `Foundation` để giải quyết vấn đề trên của `number` sau dấu thập phân như `DateFormatter` định dạng các giá trị `Date` là một lựa chọn tốt hơn vì `NumberFormatter` đã cung cấp cho chúng ta đầy đủ các công cụ cần thiết để chúng ta làm việc với `number`.

- Với `NumberFormatter` chúng ta có thể làm việc với từng `number` có thập phân hay không có thập phân và hiển thị `number` chính xác đến từng số sau dấu thập phân mà chúng ta mong muốn như `42`, `42.1`, `42.22`:

```swift
extension Metric: CustomStringConvertible {
    var description: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2

        let number = NSNumber(value: value)
        let formattedValue = formatter.string(from: number)!
        return "\(name): \(formattedValue)"
    }
}
```

- Một lợi ích nữa chúng ta nhận được khi sử dụng `NumberFormatter` là nó sẽ tự động sử dụng `Locale` mà chúng ta đang sử dụng để định dạng. Ví dụ như ở một số quốc gia `number`  `69969.69` sẽ được định dạng thành `69 969,69` thay vì `69,969.69`. Các trường hợp phức tạp trên chúng ta đều có thể xử lý dễ dàng và tự động.

- Không phải trong tất cả các trường hợp chúng ta đều có thể sử dụng `Locale` , chúng ta cần tùy chỉnh thêm `decimalSeparator` và `groupingSeparator` nhưu sau:

```swift
extension Metric: CustomStringConvertible {
    var description: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        formatter.decimalSeparator = "."
formatter.groupingSeparator = ""

        ...
    }
}
```

- Trong trường hợp này chúng ta muốn các định dạng `formatting` của chúng ta phải tuân theo từng khu vực đang sử dụng. Chúng ta cần tạo thêm `static` `property` cho chúng ta có thể sử dụng lại các `Metric` `value`:

```swift
extension Metric: CustomStringConvertible {
    private static var valueFormatter: NumberFormatter = {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.maximumFractionDigits = 2
        return formatter
    }()

    var formattedValue: String {
        let number = NSNumber(value: value)
        return Self.valueFormatter.string(from: number)!
    }

    var description: String {
        "\(name): \(formattedValue)"
    }
}
```

## 3/ Domain-specific numbers:

- Tùy thuộc vào kiểu `app` mà chúng ta đang làm việc cùng mà chúng ta sẽ có cơ hội đối diện với `domain-specific`. Trong trường hợp đó chúng ta sẽ cần phải có thêm các `description` của `number` hơn là chỉ với `value` của nó:

- Chúng ta làm việc với `shopping app` và chúng ta sử dụng `Double` để biểu diễn `Price` `struct` để mô tả giá sản phẩm:

```swift
struct Product: Codable {
    var name: String
    var price: Price
    ...
}

struct Price: Codable {
    var amount: Double
    var currency: Currency
}

enum Currency: String, Codable {
    case eur
    case usd
    case sek
    case pln
    ...
}
```

- Câu hỏi được đặt ra ở đây là làm thế nào chúng ta có thể định dạng `instance` `Price` cho từng `user` ở từng quốc gia khác nhau với `Locale` khác nhau:

- Đây là một trường hợp mà `NumberFormatter` tỏ ra vô cùng hữu dụng bao gồm cả việc `full-support` cho `Locale` cũng như việc có thể tùy chỉnh `numberStyle` và `currency` như sauL

```swift
extension Price: CustomStringConvertible {
    var description: String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .currency
        formatter.currencyCode = currency.rawValue
        formatter.maximumFractionDigits = 2

        let number = NSNumber(value: amount)
        return formatter.string(from: number)!
    }
}
```

- Kết quả chúng ta nhận được ở đây sẽ là định giá cho từng quốc gia sử dụng `Locale` khác nhau, ví dụ như `price` `3.14` ở Sweden sử dụng đơn vị tiền tệ là `SEK` sẽ được hiển thị như sau
  - **Sweden**: `3,14 kr`
   - **Spain**: `3.14 SEK`
   - **US**: `SEK 3.14`
   - **France**: `SEK 3,14`
- Bên cạnh `price` chúng ta thường gặp trường hợp các giá trị `number` hiển thị theo các thông số đo lường. Ví dụ như chúng ta muốn tập trung vào vận tốc cao nhất đạt được của một chiếc xe như `topSpeed`:

```swift
struct Vehicle {
    var name: String
    var price: Price
    var topSpeed: Double
    ...
}
```

- Trong trường hợp này thì để đo lường một cách chính xác `topSpeed` thì `Double` không phải là lựa chọn tối ưu mà thay vào đó chúng ta có thể sử dụng luôn `Measurement` với một `phantom type` là `UnitSpeed`:

```swift
struct Vehicle {
    var name: String
    var price: Price
    var topSpeed: Measurement<UnitSpeed>
    ...
}

```

- Trong khi khởi tạo `Vehicle` `instance` chúng ta có thể sẽ phải chỉ định rõ đơn vị đo lường cho `topSpeed` để tránh sự mơ hồ. Do `Measurement` có sẵn `formatter` nên chúng ta có thể dễ dàng xử lý vấn đề này:

```swift
extension Vehicle {
    var formattedTopSpeed: String {
        let formatter = MeasurementFormatter()
        return formatter.string(from: topSpeed)
    }
}
```

- Chúng ta cần ghi nhớ rằng khi sử dựng `Measurement` chúng ta sẽ đồng thời sử dụng `encoded` và `decoded` nên chúng ta sẽ cần `Codeable` để `Measurement` để đảm bảo khi giá trị chúng ta có thể không nằm trong `JSON` mà chúng ta có thể `download` từ `app server`. Trường hợp này chúng ta sẽ cần thêm các đơn vị đo lường đã được thống nhất để quá trình `decoded` hoạt động tốt:

```swift
extension Vehicle: Codable {
    private enum CodingKeys: CodingKey {
        case name, price, topSpeed, ...
    }

    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)

        // Decoding all other properties
        ...

        topSpeed = try Measurement(
            value: container.decode(Double.self, forKey: .topSpeed),
            unit: .kilometersPerHour
        )
    }
    
    // Encoding implementation
    ...
}
```

- Chúng ta bây giờ có thể sử dụng các `property wrapper` để đóng gói sự chuyển đổi giữa `Double` và `Measurement` với một `type` duy nhất:

```swift
@propertyWrapper
struct KilometersPerHour {
    var wrappedValue: Measurement<UnitSpeed>
}

extension KilometersPerHour: Codable {
    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()
        let rawValue = try container.decode(Double.self)

        wrappedValue = Measurement(
            value: rawValue,
            unit: .kilometersPerHour
        )
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(wrappedValue.value)
    }
}
```

- Tốn bao công giờ chúng ta thu hoặc lợi ích naofm chúng ra giờ có thể đánh dấu `topSpeed` `property` với `@KilometersPerHour`:

```swift
struct Vehicle: Codable {
    var name: String
    var price: Price
    @KilometersPerHour var topSpeed: Measurement<UnitSpeed>
    ...
}
```

- Chúng ta giờ đã đảm bảo cho việc sử dụng một cách an toàn và hiệu quả cho `Measurement` từ triển khai trên phục vụ cho việc định dạng và chuyển đổi thích họp cho các tính năng chúng ta cần khi phát triển `app` khi `encoding` và `decoding` `data model`.