Bài này của tác giả Payal Gupta mình dịch từ link https://hackernoon.com/everything-about-codable-in-swift-4-97d0e18a2999 

Như chúng ta đã biết, để hỗ trợ việc mã hóa và giải mã cho đối tượng trong IOS, 1 class phải adopt protocol NSCoding và thực hiện các method của nó:
1. **init(coder:)**--Trả về 1 đối tượng được khởi tạo từ dữ liệu đã được mã hóa
2. **encode(with:)**--Mã hóa đối tượng sử dụng 1 bộ mã hóa

**Ví dụ:**

```
class City: NSObject, NSCoding
{
    var name: String?
    var id: Int?
    
    required init?(coder aDecoder: NSCoder)
    {
        self.name = aDecoder.decodeObject(forKey: "name") as? String
        self.id = aDecoder.decodeObject(forKey: "id") as? Int
    }
    
    func encode(with aCoder: NSCoder)
    {
        aCoder.encode(self.name, forKey: "name")
        aCoder.encode(self.id, forKey: "id")
    }
}
```

*incode(coder:)* và *encode(with:)* phải chứa code dành cho mỗi thuộc tính mà cần được mã hóa hoặc giải mã 😲

Được rồi, dường như bạn sẽ phải viết rất nhiều đoạn code dư thừa, mà chỉ với việc thuộc tính name bị thay đổi. **Copy Paste...Copy Paste..!!!**😕😴

Nhưng tại sao ta nên làm thế? 🙇‍♀️nếu thuộc tính name giống như từ khóa name và ta không có 1 giải pháp đặc biệt hiệu quả nào, tại sao *NSCoding* không giải quyết tất cả vấn đề của chính nó 🤷‍♀️ Tại sao ta phải viết rất nhiều code như thế ? Khoongg !!! 

OMG...!!! Vấn đề khác 🤦‍♀️. Nó không hỗ trợ cho *struct* và *enums*. 👺 Và điều ấy nghĩa là ta phải tạo class mọi lúc khi ta cần sử dụng dữ liệu 1 cách tuần tự, bất kể chúng ta không có bất kỳ yêu cầu cho lớp đặc biệt nào 🤒

Thật là lãng phí thời gian 🤢. Cứu tôi..!!!🙏

Được thôi !!! Đừng lo lắng. *Apple* ở đây để giải cứu bạn lần nữa 🤠

# Điều gì mới ở Swift4?

Ở phiên bản Swift4, Apple đã công bố 1 cách mới trong việc mã hóa và giải mã dữ liệu 🤓 bằng cách xác nhận kiểu dữ liệu mà bạn tùy chỉnh đơn giản với giao thức
1. **Encodable** - dành cho mã hóa
2. **Decodable** - dành cho giải mã
3. **Codable** - dành cho cả mã hóa và giải mã

Nó cung cấp hỗ trợ cho class, struct và enum rất tốt.
Nào, cùng xem có điều gì chúng ta đang chờ đợi

### Encodable Protocol
1 loại mà có thể mã hóa chính nó thành kiểu đại diện khác. Nó được dùng trở thành loại mà có thể mã hóa.
Nó chứa 1 single method:
*encode(to:)*  - Mã hóa giá trị vào bộ mã hóa đã cho

### Decodable Protocol
1 loại mà có thể mã hóa chính nó từ 1 kiểu đại diện khác. Nó được dùng bởi lại có thể mã hóa được
Nó chỉ chứa 1 method đơn giản:
*init(from:)* — Tạo ra 1 instance mới bởi việc mã hóa từ bộ mã hóa đã cho

### Codable Protocol
1 loại có thể chuyển đổi chính bản thân nó từ 1 kiểu biển diễn external. Nó được sử dụng bởi loại đồng thời có thể mã hóa và giải mã

`typealias Codable = Decodable & Encodable`
Nó bao gồm các phương thức khai báo trong cả Encodable và Decodable

Bạn sẽ được tìm hiểu về encode(to:) và init(from:) ở trong các phần sắp tới 👽.

### Codable Type
Để mã hóa và giải mã 1 kiểu custom, chúng ta cần làm cho nó thành kiểu có thể mã hóa được

Cách đơn giản nhất để tạo một kiểu mã hóa là khai báo các thuộc tính của nó bằng kiểu có sẵn có thể mã hóa Codable.
1. Built-in Codable types — String, Int, Double, Data, URL
2. Array, Dictionary, Optional are Codable if they contain Codable types

```
struct Photo: Codable
{
    //String, URL, Bool and Date conform to Codable.
    var title: String
    var url: URL
    var isSample: Bool
    
    //The Dictionary is of type [String:String] and String already conforms to Codable.
    var metaData: [String:String]
    
    //PhotoType and Size are also Codable types
    var type: PhotoType
    var size: Size
}

struct Size: Codable
{
    var height: Double
    var width: Double
}

enum PhotoType: String, Codable
{
    case flower
    case animal
    case fruit
    case vegetable
}
```

### Encoding — JSONEncoder
Bạn có thể sử dụng JSONEncoder để chuyển đổi kiểu mã hóa thành Data 

JSONEncoder’s encode(_:) phương thức mã hóa của JSONEncoder(_:) trả về một biểu diễn được mã hóa JSON của kiểu mã hóa được

```swift
let photoObject = Photo(title: "Hibiscus", url: URL(string: "https://www.flowers.com/hibiscus")!, isSample: false, metaData: ["color" : "red"], type: .flower, size: Size(width: 200, height: 200))
let encodedData = try? JSONEncoder().encode(photoObject)
```
### Decoding — JSONDecoder
Cũng giống như JSONEncoder, JSONDecoder có thể được sử dụng để giải mã dữ liệu JSON của bạn trở thành kểu codeable.

JSONDecoder’s decode(_:from:) hàm trả về một kiểu giá trị mà bạn chỉ định, được giải mã từ một đối tượng  JSON .

```swift

let jsonString = """
{
    "type":"fruit",
    "size":{
               "width":150,
               "height":150
           },
    "title":"Apple",
    "url":"https:\\/\\/www.fruits.com\\/apple",
    "isSample":true,
    "metaData":{
                  "color":"green"
               }
}
"""
if let jsonData = jsonString.data(using: .utf8)
{
    let photoObject = try? JSONDecoder().decode(Photo.self, from: jsonData)
}
```

Chính là nó, đây là cách bạn có thể encode/decode Codable Type. Chỉ với  2 bước:

1. Tuân theo loại tùy chỉnh của bạn thành Codable protocol
2. Sử dụng JSONEncoder/JSONDecoder để encode/decode đối tượng bạn tùy chính


### Choosing Properties to Encode and Decode — CodingKeys
Sẽ có 1 vài câu hỏi  ❓❓xuât shienej trong tâm trí của bạn: 

1. Điều gì sẽ xảy ra nếu tôi muốn bỏ qua 1 số thuộc tính của loại Codeable từ quá trình serialization ?
2. Làm thể nào để encode/decode nếu 1 số key 🔑 bên trong dữ liệu serialized data không chuẩn xác với tên thuộc tính của kiểu Codable ?

Well, Apple cung cấp giải pháp cho điều đó — enum CodingKeys.

Các kiểu mã hoá có thể khai báo một liệt kê lồng nhau đặc biệt có tên là CodingKeys phù hợp với giao thức CodingKey. Khi enumeration có mặt, các trường hợp của nó là danh sách các thuộc tính có thẩm quyền phải được đưa vào khi các thể hiện của một kiểu mã hoá được mã hóa hoặc giải mã.

1 vài điều về CodingKeys:

1. Nó phải có Raw Type — String và phù hợp với giao thức CodingKey.

2. Tên của các cases enum phải chính xách  💯 tên thuộc tính của Codable Type.

3. Trả lời cho câu hỏi 1 ✅— Bỏ qua các thuộc tính từ CodingKeys nếu bạn muốn bỏ chúng khỏi quá trình mã hóa/ giải mã. Thuộc tính bị bỏ qua từ CodingKeys cần một giá trị mặc định

4.Trả lời cho câu hỏi 2 ✅ — Raw Value là điều bạn cần nếu tên thuộc tính của Codable Type không khớp với các khóa trong dữ liệu được tuần tự hóa. Cung cấp các khóa thay thế bằng cách chỉ định Chuỗi làm loại giá trị thô cho liệt kê CodingKeys. Chuỗi bạn sử dụng làm giá trị thô cho mỗi trường hợp liệt kê là tên khóa được sử dụng trong quá trình mã hóa và giải mã.

**Example:**

Trong đoạn mã dưới đây

1. var format: String = “png” đã được bỏ qua từ CodingKeys và do đó được cung cấp 1 giá trị mậc định

2. Properties title and url được đổi tên thành tên và liên kết bằng cách sử dụng raw value in CodingKeys — case title = “name” and case url = “link”

```
struct Photo: Codable
{
    //...Other properties (described in Code Snippet - 1)...
    
    //This property is not included in the CodingKeys enum and hence will not be encoded/decoded.
    var format: String = "png"
    
    enum CodingKeys: String, CodingKey
    {
        case title = "name"
        case url = "link"
        case isSample
        case metaData
        case type
        case size
    }
}
```

**Đã kết thúc phần 1, hẹn gặp các bạn phần 2 mình sẽ tiếp tục nói về chủ để này.**