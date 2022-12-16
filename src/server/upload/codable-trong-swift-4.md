Như chúng ta đều biết, để hỗ trợ mã hóa và giải mã các đối tượng trong iOS, một class phải adopt NSCoding protocol và implement các phương thức của nó:

* init(coder:) - Trả về một đối tượng được khởi tạo từ dữ liệu chưa được giải mã đã cho.
* encode(with:) - Mã hóa đối tượng bằng cách sử dụng một bộ mã hóa.

Ví dụ:

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

init(coder:) và encode(with:) phải bao gồm code cho mỗi thuộc tính cần được mã hóa hoặc giải mã. Đó dường như là một công việc buồn tẻ khi phải viết lặp đi lặp lại nhưng dòng code mà chỉ thay đổi keyword cho từng thuộc tính khác nhau.

## Codable với Swift 4

Trong phiên bản Swift 4 mới nhất của mình, Apple đã giới thiệu 1 cách thức mới để mã hóa và giải mã dữ liệu một cách dễ dàng khi công bố 1 bộ protocols mới:

1. Encodable - dùng cho mã hóa
1. Decodable - dùng cho giải mã
1. Codable - dùng cho cả mã hóa và giải mã

Chúng hỗ trợ cho cả class, struct và enum. Chúng ta cùng xem chúng có thể làm được gì nhé.

### Encodable Protocol

Một type có thể mã hóa chính nó thành một dạng dữ liệu để có thể sử dụng bên ngoài (JSON, plist,...). Nó được sử dụng bởi các types có thể được mã hóa.

Nó chứa một phương thức duy nhất:

encode(to:) - Mã hóa giá trị này vào bộ mã hóa đã cho.

### Decodable Protocol

Một type có thể giải mã chính nó từ một dữ liệu bên ngoài thành một đối tượng để dùng trong úng dụng. Nó được sử dụng bởi các type có thể được giải mã.

Nó cũng chứa một phương thức duy nhất:

init(from:) - Khởi tạo một đối tượng bằng cách giải mã dữ liệu từ bộ giải mã đã cho.

### Codable Protocol

Một type có thể chuyển đổi chính nó vào và ra khỏi một dạng dữ liệu bên ngoài. Nó được sử dụng bởi type có thể được mã hóa và giải mã. Nó bao gồm các phương thức được khai báo trong cả Encodable cũng như Decodable.

### Codable Type

Để mã hóa và giải mã một type tùy chỉnh, chúng ta cần làm cho nó có thể mã hóa được. Cách đơn giản nhất để tạo một type mã hóa là khai báo các thuộc tính của nó bằng các type cũng có khả năng Codable.

1. Các types có khả năng Codable: String, Int, Double, Data, URL,...
2. Array, Dictionary, Optional là Codable nếu chúng cũng bao gồm Codable types.

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

Như vậy chúng ta đã biết được Codable là gì, bây giờ chúng ta sẽ tiếp tục tìm hiểu cách sử dụng chúng để mã hóa hoặc giải mã một type tùy chỉnh như thế nào nhé.

### Encoding — JSONEncoder

Bạn có thể sử dụng JSONEncoder để chuyển đổi codable type của bạn sang data. Phương thức encode của JSONEncoder trả về một đoạn mã hóa JSON của codable type.

```
let photoObject = Photo(title: "Hibiscus", url: URL(string: "https://www.flowers.com/hibiscus")!, isSample: false, metaData: ["color" : "red"], type: .flower, size: Size(width: 200, height: 200))
let encodedData = try? JSONEncoder().encode(photoObject)
```

Chỉ 1 dòng code bạn đã có được JSON mã hóa chứa thông tin của một photo. Thật đơn giản phải không nào!

### Decoding — JSONDecoder

Cũng giống như JSONEncoder, Apple cũng cung cấp JSONDecoder để giúp chúng ta giải mã ngược trở lại từ JSON sang một đối tượng codable type. Phương thức decode(_:from:) của JSONDecoder trả về một đối tượng codable type được giải mã từ JSON.

```
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

Tất cả chỉ có vậy thôi. Bạn chỉ cần 2 bước để mã hóa và giải mã một Codable Type:

1. Conform type tùy chỉnh của bạn theo Codable protocol.
2. Sử dụng JSONEncoder/JSONDecoder để mã hóa/giải mã sang đối tượng tùy chỉnh của bạn.

## Lựa chọn thuộc tính để Encode và Decode - CodingKeys

Với việc thực hiện 2 bước trên, chúng ta đã có thể mã hóa/giải mã từ JSON sang object và ngược lại. Tuy nhiên, nếu làm như vậy thì chúng ta sẽ thực hiện mã hóa toàn bộ các thuộc tính có trong đối tượng hoặc mã hóa/giải mã keyword và tên thuộc tính trùng nhau. Trong thực tế, không phải lúc nào chúng ta cũng mong muốn như vậy. Và để giải quyết vấn đề này, Apple cũng đã cung cấp 1 giải pháp cho nó bằng việc sử dụng enum CodingKeys.

Codable types có thể khai báo lồng vào một enum đặc biệt là CodingKeys - nó tuân thủ theo CodingKey protocol. Khi enum này được khai báo, các case của nó là danh sách các thuộc tính phải được đưa vào khi các đối tượng của codable type được mã hóa hoặc giải mã.

Ví dụ trong đoạn code dưới đây, thuộc tính format sẽ không được mã hóa/giải mã vì nó không nằm trong CodingKeys, và thuộc tính title, url sẽ sử dụng keyword "name" và "link" để mã hóa/giải mã.

```
struct Photo: Codable
{    
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

## Mã hóa và giải mã thủ công

Trong một số trường hợp, cấu trúc của Codable Type của bạn khác với cấu trúc dữ liệu mã hóa, ví dụ như dưới đây:

```
struct Photo: Codable
{
    var title: String
    var size: Size
    
    enum CodingKeys: String, CodingKey
    {
        case title = "name"
        case size
    }
}

struct Size: Codable
{
    var width: Double
    var height: Double
}
```

Khi bạn mã hóa một đối tượng Photo được khai báo như trên thì đoạn JSON nhận được sẽ có dạng giống như sau:

```
{
    "size":{
               "width":150,
               "height":150
           },
    "name":"Apple"
}
```

Nhưng bạn lại không muốn "width" và "height" được lồng trong "size" như JSON dưới đây:

```
{
    "title":"Apple",
    "width":150,
    "height":150
}
```

Trong trường hợp này, bạn cần cung cấp logic riêng cho việc mã hóa và giải mã theo các bước sau:

1. Cập nhật enum CodingKeys bao gồm cả width và height keys thay vì size.
2. Xóa conformance Codable từ Photo.
3. Tạo một Photo extension conform Encodable và implement phương thức encode(to:)
4. Tạo một Photo extension conform Decodable và implement phương thức init(from:)

```
struct Photo
{
    var title: String
    var size: Size
    
    enum CodingKeys: String, CodingKey
    {
        case title = "name"
        case width
        case height
    }
}

extension Photo: Encodable
{
    func encode(to encoder: Encoder) throws
    {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(title, forKey: .title)
        try container.encode(size.width, forKey: .width)
        try container.encode(size.height, forKey: .height)
    }
}

extension Photo: Decodable
{
    init(from decoder: Decoder) throws
    {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        title = try values.decode(String.self, forKey: .title)
        let width = try values.decode(Double.self, forKey: .width)
        let height = try values.decode(Double.self, forKey: .height)
        size = Size(width: width, height: height)
    }
}
```

Trên đây là tất cả về Codable protocols và cách sử dụng nó. Hy vọng bài viết trên sẽ hữu ích cho bạn!

Nguồn: https://hackernoon.com/everything-about-codable-in-swift-4-97d0e18a2999