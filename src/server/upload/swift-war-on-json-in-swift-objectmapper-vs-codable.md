### 1. Mapping:
**Mapping** (Ánh xạ) là một phép toán trong đó mỗi phần tử của một tập hợp nhất định (domain) được liên kết với một hoặc nhiều phần tử của tập hợp thứ hai.

### Mapping trong Swift:

Thông thường khi một ứng dụng tương tác với API hoặc đôi khi là dữ liệu static phía dưới local, thực chất ta đang thao tác với các kiểu dữ liệu khác nhau như JSON hoặc plist hoặc đôi khi là một số format khác. Ta sẽ ánh xạ những objects class với dữ liệu JSON để có thể thiết lập các quy trình liên quan đến Business. Trong Swift có các thư viện phổ biến để phân tích (parsing) và ánh xạ (mapping) JSON với những model objects:

- **JSON Serialization**
- **Swifty JSON**
- **Codable**
- **ObjectMapper**

Trong đó, **JSON Serialization** và **Codable** là những thư viện do Apple phát triển, còn **Swifty JSON** và **ObjectMapper** là những thư viện do bên Thứ Ba phát triển.

Trong bài viết này, ta sẽ tìm hiểu về hai trong số những thư viện parsing và mapping phổ biến nhất đó là **ObjectMapper** và **Codable**.

### 2. ObjectMapper:
**ObjectMapper** Là một framework có thể convert JSON sang objects (và ngược lại). Phân tích và ánh xạ JSON có thể thực hiện một cách dễ dàng hơn và nhanh hơn khi sử dụng **ObjectMapper**.

Để có thể sử dụng **ObjectMapper**, ta cần triển khai Mappable protocol:
```
public protocol BaseMappable {
    mutating func mapping(map: Map) {}
}

public protocol Mappable: BaseMappable {
    init?(map: Map)
}
```

Để sử dụng **ObjectMapper**:
1. Objects cần được kế thừa và mở rộng từ Mappable.
2. Objects cần triển khai **mapping** function trong đó ta sẽ xác định những thuộc tính nào của JSON được gán cho những thuộc tính của object.
3. Thuộc tính phải được khai báo dưới dạng biến **optional**.

### 3. Codable:
**Codable** là một giao thức được giới thiệu trong thư viện Swift 4 Standard. Nó cung cấp 3 loại:
- Encodable protocol: sử dụng để mã hóa.
- Decodable protocol: sử dụng để giải mã.
- Codable protocol: sử dụng để mã hóa và giải mã.
```
typealias Codable = Encodable & Decodable
```

Để sử dụng **Codable**:
1. Để mã hóa và giải mã các kiểu custom thì cần phải sử dụng **Codable** protocol.
2. Các kiểu custom phải có thuộc tính kiểu **Codable**.
3. Kiểu **Codable** bao gồm các kiểu dữ liệu như Int, Double, String, URL, Data.
4. Những thuộc tính khác như array, dictionary là các **Codable** nếu chúng bao gồm các kiểu **Codable**.

### 4. Sự khác biệt giữa ObjectMapper và Codable:

| OBJECTMAPPER | CODABLE |
| -------- | -------- |
| Đây là framework do bên thứ ba phát triển.| Đây là giải pháp trong Swift được Apple phát triển.|
| **ObjectMapper** có hỗ trợ chuyển đổi kiểu dữ liệu.|  Trong **Codable** ta cần sử dụng thư viện bên ngoài để chuyển đổi kiểu dữ liệu.|
|**ObjectMapper** được cho là nhanh hơn **Codable** (hoặc chính xác hơn JSON Encoder/Decoder).|**Codable** có thể chậm hơn **ObjectMapper**.|
| Thêm những dependency vào trong project của bạn.| Loại bỏ sự phụ thuộc vào bên thứ ba trong quá trình parsing và mapping.|
| Cập nhật sẽ không được khuyến khích khi sử dụng **ObjectMapper** với những Swift version vừa mới phát hành.|  Vì nó là một giải pháp native cho nên các bản update mới luôn có sẵn trong Foundation Framework.|
|**ObjectMapper** là giao thức được kế thừa từ giao thức BaseMappable | **Codable** là giao thức kết hợp giữ hai giao thức khác nhau: Encodable & Decodable|
| Cần phải cập nhật version tương ứng sử dụng CocoaPods hoặc những trình quản lý dependency khác.|Không cần cập nhật vì **Codable** đã có sẵn trong Foundation framework. |
|Cần phải định nghĩa mapping cho tất cả các trường với key tương ứng trong JSON.|Tự động sinh ra các phương thức mã hóa và phương thức khởi tạo nếu các trường có cùng tên với keys trong JSON, do đó sẽ sinh ra ít code hơn. Nếu các trường của model object khác so với JSON keys, ta cần phải define các keys thành các enums sử dụng CodingKey protocol.|

### 5. Ví dụ:
Giả sử ta có Customer object, Address object và Company object.
```
class Customer {
    var id: Int?
    var name: String?
    var username: String?
    var email: String?
    var phone: String?
    var company: Company?
    var address: Address?
}

class Company {
    var name: String?
    var catchPhrase: String?
    var bs: String?
}

class Address {
    var street: String?
    var suite: String?
    var city: String?
    var zipcode: String?
}
```

Ta tiếp nhận JSON từ API, sau đó tiến hành parsing và mapping những model objects này sử dụng **ObjectMapper** và **Codable** để phục vụ cho luồng Business Logic.

#### Sử dụng ObjectMapper
```
class Customer: Mappable 
{
    var id: Int?
    var name: String?
    var username: String?
    var email: String?
    var phone: String?
    var address: Address?
    var company: Company?
    
    required init?(map: Map) { }
    
    func mapping(map: Map)
    {
        id <- map["id"]
        name <- map["name"]
        username <- map["username"]
        email <- map["email"]
        phone <- map["phone"]
        company <- map["company"]
        address <- map["address]
    }
}
```

```
class Address: Mappable
{
    var street: String?
    var suite: String?
    var city: String?
    var zipcode: String?
    
    required init?(map: Map) { }
    
    func mapping(map: Map) 
    {
        street <- map["street"]
        suite <- map["suite"]
        city <- map["city"]
        zipcode <- map["zipcodeForAddress"]
    }
}
```

```
class Company: Mappable
{
    var name: String?
    var catchPhrase: String?
    var bs: String?
    
    required init?(map: Map) { }
    
    func mapping(map: Map) 
    {
        name <- map["name"]
        catchPhrase <- map["catchPhrase]
        bs <- map["bs"]
    }
}
```

#### Sử dụng Codable
```
class Customer: Codable 
{
    var id: Int?
    var name: String?
    var username: String?
    var email: String?
    var phone: String?
    var company: Company?
    var address: Address?
}
```

```
class Address: Codable
{
    var street: String?
    var suite: String?
    var city: String?
    var zipcode: String?
    
    private enum CodingKeys: String, CodingKey 
    {
        case street
        case suite
        case city
        case zipcode = "zipCodeForAddress"
    }
    
    func encode(to encoder: Encoder) throws {
        var container = encode.container(KeyedBy: CodingKeys.self)
        try street.encode(street, forKey: .street)
        try suite.encode(suite, forKey: .suite)
        try city.encode(city, forKey: .city)
        try zipcode.encode(zipcode, forKey: .zipcode)
    }
    
    required init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        self.street = try container.decode(String?.self, forKey: .street)
        self.suite = try container.decode(String?.self, forKey: .suite)
        self.city = try container.decode(String?.self, forKey: .city)
        self.zipcode = try container.decode(String?.self, forKey: .zipcode)
    }
}
```

```
class Company: Codable 
{
    var name: String?
    var catchPhrase: String?
    var bs: String?
}
```

Như bạn có thể thấy trong Address class ta phải xác định các custom keys vì trường *zipcode* khác so với *zipCodeForAddress*.

### 6. Kết luận:
Có thể thấy **Codable** tối ưu hơn và là cách tốt hơn để mapping những đối tượng trong Swift. Đây còn là một giải pháp native trong Swift và loại bỏ việc sử dụng thư viện thứ ba. Tuy nhiên thì **ObjectMapper** lại có phần phổ biến hơn vì nó dễ đọc hơn và cũng có hỗ trợ cho Alamofire. Trong thời gian tới, chúng ta mong đợi sẽ thấy nhiều hơn việc sử dụng **Codable** trong cộng đồng iOS Developers trong việc phân tích và ánh xạ.

**Materials:** https://medium.com/@qamar_37318/war-on-json-in-swift-object-mapper-vs-codable-e0598a64c746