# Giới thiệu
Codable được giới thiệu trong **Swift 4** cung cấp cơ chế chuyển đổi giữa JSON object sang data model và ngược lại.
**Codable** là một typalias củaCodable là một typalias của protocol **Decodable** và **Encodable**. Cơ chế giống như **Serialization** trong ngôn ngữ Java.

Trong bài viết này ta sẽ tập trung vào chức năng **Encodable**.

# Encodable cơ bản
Encodable được sử dụng để chuyển đổi từ data model sang JSON object thông qua JsonEncoder
Ví dụ dưới đây là các bước để chuyển đổi data model sang JSON object
1. Tạo một data model tuân theo Encodable
2. Tạo một đối tượng JsonEncoder và dùng hàm encode(:) để chuyển đổi từ struct Object sang JSON object

```
// MARK: - PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: Date())

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted
let data = try! encoder.encode(photoFeed)

Output: 
{
  "feedKey" : "12345",
  "feedUrl" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg",
  "feedDate" : 610783240.03646898
}
```

# Optional key trong Encodable
JsonEncoder sẽ không thêm key vào JSON object đối với các trường dữ liệu dạng optional và có giá trị **nil**.
Trong ví dụ dưới đây, trường feedDate có kiểu optional và có giá trị **nil**, và sẽ không thêm key này vào đối tượng JSON object.

```
// MARK: - PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date?
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: nil)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)

// OUTPUT:
{
  "feedKey" : "12345",
  "feedUrl" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg"
}
```

# CodingKey
CodingKey cho pheps **JSONEncoder** ánh xạ một trường dữ liệu trong **data model** tương ứng với một key trong JSON Object.
Ví dụ dưới đây ta sẽ tạo ra các Coding Key tương ứng;
- feedKey →feed_key
- feedUrl → feed_url 
- feedDate → feed_date

```
// MARK: - PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date?
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: nil)

let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)

// OUTPUT:
{
  "feedKey" : "12345",
  "feedUrl" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg"
}
```

# Xử lý Nested Data
Đối với các cấu trúc phức tạp, ta chỉ cần khai báo các kiểu dữ liệu thành phần tuân thủ theo **Encodable**
```
// MARK: - PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date?
    let location: Location
    
    struct Location: Encodable {
        var latitude: Double
        var longitude: Double
        
        enum CodingKeys: String, CodingKey {
            case latitude = "lat"
            case longitude = "long"
        }
    }
    
    enum CodingKeys: String, CodingKey {
        case feedKey = "feed_key"
        case feedUrl = "feed_url"
        case feedDate = "feed_date"
        case location = "location"
    }
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: Date(), location: PhotoFeed.Location(latitude: 73.7432861, longitude: 18.6119477))
let encoder = JSONEncoder()
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)

//OUTPUT:
{
  "feed_date" : 610806450.76657605,
  "feed_url" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg",
  "feed_key" : "12345",
  "location" : {
    "lat" : 73.743286100000006,
    "long" : 18.611947700000002
  }
}
```

# Tùy biến cách mã hóa
## OutputFormatting
Giá trị này cho phép tùy cách thức mã hóa và hiển thị đối tượng JSON object như thư tự các key và các ký tự để dễ đọc cho người dùng
1. **prettyPrinted**: Cho phép hiển thị JSON Object dưới dạng dễ đọc với tab và khoảng trống.
2. **sortedKeys**: Cho phép hiển thị JSON Object với các key đã được sắp xếp

## Encoding Strategy
Giá trị này cho phép ta tùy biến cách thức đặt tên key trong JSON Object.
1. useDefaultKeys: sử dụng chính tên trường trong data-model làm key của JSON object.
2. convertFromSnake: chuyển camel-case của trên trường trong data-model sang snake-case để làm key của JSON object.

```
// MARK:- PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date?
    let location: Location
    
    struct Location: Encodable {
        var latitude: Double
        var longitude: Double
        
        enum CodingKeys: String, CodingKey {
            case latitude = "lat"
            case longitude = "long"
        }
    }
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: Date(), location: PhotoFeed.Location(latitude: 73.7432861, longitude: 18.6119477))
let encoder = JSONEncoder()
encoder.keyEncodingStrategy = .convertToSnakeCase
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)

Output:
{
  "feed_date" : 610808974.47951901,
  "feed_url" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg",
  "feed_key" : "12345",
  "location" : {
    "lat" : 73.743286100000006,
    "long" : 18.611947700000002
  }
}
```

3. **custom:** cho phép tùy biến kiểu đặt tên key JSON Object. Ví dụ dưới đây ta sẽ thêm tiền tố photo_ vào tất cả các key của JSON Object
```
// MARK:- PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date?
}

// MARK:- PhotoCodingKeys
struct PhotoCodingKeys: CodingKey {
    
    var stringValue: String
    init?(stringValue: String) {
        self.stringValue = stringValue
    }
    
    var intValue: Int? { return nil }
    init?(intValue: Int) { return nil }
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: Date())
let encoder = JSONEncoder()
encoder.keyEncodingStrategy = .custom({ (keys) -> CodingKey in
    let keyString = keys.last!.stringValue
    let stringValue =  "photo_" + keyString
    return PhotoCodingKeys(stringValue: stringValue)!
})
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)

//OUTPUT
{
  "photo_feedUrl" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg",
  "photo_feedDate" : 610810993.52611899,
  "photo_feedKey" : "12345"
}
```

## Encoding Dates
JSONEncoder hộ trợ các cơ chế khác nhau để mã hóa kiểu dữ liệu Date.
1. **deferredToDate**: Ngày tháng sẽ được lưu dưới dạng số giây tính từ ngày 01/01/2001
2. **iso8601**: Ngày tháng sẽ được lưu dưới dạng chuẩn **iso8601**
```
// MARK:- PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date?
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: Date())
let encoder = JSONEncoder()
encoder.dateEncodingStrategy = .iso8601
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)
// OUTPUT
{
  "feedKey" : "12345",
  "feedUrl" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg",
  "feedDate" : "2020-05-11T04:53:56Z"
}
```

3. **formatted(DateFormatter)**: Ngày tháng sẽ được lưu theo định dạng của DateFormatter. Ví dụ dưới đây ta sẽ lưu ngày tháng của **feedDateTime** theo định dạng **YYY-MM-dd HH:mm:ss**

```
// MARK:- PhotoFeed
struct PhotoFeed: Encodable {
    let feedKey: String
    let feedUrl: String
    let feedDate: Date
    let feedDateTime: Date
}

let photoFeed = PhotoFeed(feedKey: "12345", feedUrl: "https://dummy.url.com/thumbnails/16869828-e75babd8.jpg", feedDate: Date(), feedDateTime: Date().addingTimeInterval(100))
let encoder = JSONEncoder()
let dateFormatter = DateFormatter()
encoder.dateEncodingStrategy = .custom({ (date, myEncoder) in
    guard let key = myEncoder.singleValueContainer().codingPath.last?.stringValue else {
        return
    }
    var container = myEncoder.singleValueContainer()
    switch key {
    case "feedDateTime":
        dateFormatter.dateFormat = "YYY-MM-dd HH:mm:ss"
    default:
        dateFormatter.dateFormat = "YYY-MM-dd"
    }
    let dateString = dateFormatter.string(from: date)
    try? container.encode(dateString)
})
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(photoFeed)
print(String(data: data, encoding: .utf8)!)

//Output:
{
  "feedKey" : "12345",
  "feedDateTime" : "2020-05-11 11:57:29",
  "feedUrl" : "https:\/\/dummy.url.com\/thumbnails\/16869828-e75babd8.jpg",
  "feedDate" : "2020-05-11"
}
```

## Mã hóa Raw Data
JSONEncode hỗ trợ một số cách thức để mã hóa Raw Data.
1. base64: Dữ liệu sẽ được mã hóa dưới dạng Base64
2.  custom((Data, Encoder) : Mã hóa dữ liệu bằng hàm mã hóa của riêng bạn

## Mã hóa các số đặc biệt
Cho phép ta đặt ra các luật để xử lý với trường hợp các số đặc biệt như **NAN** (không phải là số), **+veInfinity** và **-veInfinity**

```
// MARK:- FeedValue
struct FeedValue: Encodable {
    let firstValue: Float
    let secondValue: Float
    let thirdValue: Float
}

let feedValue = FeedValue(firstValue: Float.nan, secondValue: Float.infinity, thirdValue: -Float.infinity)
let encoder = JSONEncoder()
encoder.nonConformingFloatEncodingStrategy = .convertToString(positiveInfinity: "+veInfinity", negativeInfinity: "-veInfinity", nan: "NaN")
encoder.outputFormatting = .prettyPrinted

let data = try! encoder.encode(feedValue)
print(String(data: data, encoding: .utf8)!)

//OUTPUT:
{
  "firstValue" : "NaN",
  "secondValue" : "+veInfinity",
  "thirdValue" : "-veInfinity"
}
```

# Nguồn tham khảo
- https://medium.com/flawless-app-stories/complete-guide-to-codable-encodable-f15b408b8eaa