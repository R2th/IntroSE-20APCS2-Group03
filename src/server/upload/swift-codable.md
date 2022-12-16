Bản thân mình là một người không thích dùng thư viện thứ ba, thường trong các project mình luôn cố gắng tự viết theo thư viện thuần. Nếu bạn cũng là người như vậy thì hãy tiếp tục đọc bài nhé :stuck_out_tongue_winking_eye:.

Để có thể ```parse JSON``` trong ```Swift``` đến giờ mình biết là có hai thư viện mà nhiều người dùng là ```SwiftyJSON``` và ```ObjectMapper``` nhưng nếu không thích cài qua Cocoapods hoặc Carthage thì hãy sử dụng của apple cung cấp thôi,  đó là ```Codable```

Codable là alias của 2 protocols: ```Decodable``` & ```Encodable```, Codable protocol được sử dụng để chuyển  JSON data object thành một class hoặc struct trong Swift, quá trình này được gọi là Decoding bởi vì JSON data được giải mã (decoding) thành một format mà Swift hiểu được. Codable cũng có thể mã hóa (encoding) Swift objects thành JSON.

### Swift Codable basic
Chúng ta sẽ đi vào ví dụ đầu tiên của Swift Codable, mục tiêu sẽ là convert đoạn JSON sau sang Swift object (struct)
```Swift
let jsonString = """
{
    "first_name": "Ngo",
    "last_name": "Viet Anh",
    "country": "Viet Nam",
    "age": 20
}
"""
```

##### Cách làm: 
Đối với các JSON có dạng đơn giản thế này,  chỉ cần tạo một struct conform Codable protocol cho chính xác, sau đó dùng JSONDecoder() để decode về instance là được.
Note: Nếu không cần encode thì chỉ cần conform protocol Decodable là đủ.

```Swift
struct Person: Codable {
    var first_name: String = ""
    var last_name: String = ""
    var country: String = ""
    var age: Int = 0
}

// Convert json string to data
var data = Data(jsonString.utf8)
let decoder = JSONDecoder()
// Decode json with dictionary
let personEntity = try? decoder.decode(Person.self, from: data)
if let personEntity = personEntity {
    print(personEntity)
    /// Person(first_name: "Ngo", last_name: "Viet Anh", country: "Viet Nam", age: 20)
}
```

##### Đối với dạng array như này
```
[{
    "first_name": "Ngo",
    "last_name": "Viet Anh",
    "country": "Viet Nam",
    "age": 20
},
{
    "first_name": "Dang",
    "last_name": "Thanh Dat",
    "country": "Viet Nam",
    "age": 69
}]
```
Thì chỉ cần thêm array chỗ decode là được
```Swift
let personEntity = try? decoder.decode([Person].self, from: data)
```

### Swift Codable manual encode decode
Đối với json như này
```Swift
let jsonString = """
{
    "person_detail": {
        "first_name": "Ngo",
        "last_name": "Viet Anh",
        "country": "Viet Nam",
        "age": 20
    }
}
"""
```
Để xử lý thì chúng ta làm như sau
```Swift
struct PersonData: Codable {
    
    struct Person: Codable {
        var first_name: String = ""
        var last_name: String = ""
        var country: String = ""
        var age: Int = 0
    }
    
    var person_detail: Person
}

var data = Data(jsonString.utf8)
let decoder = JSONDecoder()
// Decode json with dictionary
let personEntity = try? decoder.decode(PersonData.self, from: data)
if let personEntity = personEntity {
    print(personEntity.person_detail)
}
```

### Swift Codable coding key
Trong đa số các trường hợp thì client sẽ sử dụng json format mà server đã định sẵn, do đó có thể gặp các kiểu json có format như trên, nhưng nếu để Struct có thể codable được thì cần phải define properties dạng person_detail, first_name. Điều này vi phạm vào coding convention của Swift. Trong trường hợp này chúng ta sử dụng Coding key để mapping giữa properties của Struct và key của JSON.

```Swift
struct Person {
    
    var firstName: String = ""
    var lastName: String = ""
    var country: String = ""
    var age: Int = 0
    
    enum PersonKeys: String, CodingKey {
        case person = "person_detail"
    }
    enum PersonDetailKeys: String, CodingKey {
        case firstName = "first_name"
        case lastName = "last_name"
        case country
        case age
    }
}
```
##### Để decode
```Swift

extension Person: Decodable {
    init(from decoder: Decoder) throws {
        let personContainer = try decoder.container(keyedBy: PersonKeys.self)
        
        let personDetailContainer = try personContainer.nestedContainer(keyedBy: PersonDetailKeys.self, forKey: .person)
        firstName = try personDetailContainer.decode(String.self, forKey: .firstName)
        lastName = try personDetailContainer.decode(String.self, forKey: .lastName)
        country = try personDetailContainer.decode(String.self, forKey: .country)
        age = try personDetailContainer.decode(Int.self, forKey: .age)
    }
}
```

##### Trong trường hợp cần encode để gửi lên server thì
```Swift
extension Person: Encodable {
    func encode(to encoder: Encoder) throws {
        var personContainer = encoder.container(keyedBy: PersonKeys.self)
        var personDetailContainer = personContainer.nestedContainer(keyedBy: PersonDetailKeys.self, forKey: .person)

        try personDetailContainer.encode(firstName, forKey: .firstName)
        try personDetailContainer.encode(lastName, forKey: .lastName)
        try personDetailContainer.encode(country, forKey: .country)
        try personDetailContainer.encodeIfPresent(age, forKey: .age)
    }
}

let encoder = JSONEncoder()
// Encode instance to Data
if let personEntity = personEntity {
    let personData = try? encoder.encode(personEntity)
    if let personData = personData {
        print(personData)
        ///91 bytes
    }
}
```

Tuy hơi dài nhưng việc tự build như này trong cũng nguy hiểm quá nhỉ :joy:


Với những điều trên hi vọng bạn sẽ hiểu và cảm thấy thoải mái khi dùng Codable. Bài viết đầu có nhiều thiếu sót, mong mọi người giúp đỡ.

Nguồn: https://nhathm.com/swift-codable-1-24d7d95584f1