# I. Giới thiệu

Khi làm việc lưu trữ data trong iOS, chúng ta thường nghĩ ngay đến CoreData. Ngoài CoreData, iOS/OSX còn cung cấp cho chúng ta một cách lưu trữ khác: NSKeyedArchiver / NSKeyedUnarchiver. Nếu so sánh giữa CoreData và NSKeyedArchiver / NSKeyedUnarchiver thì CoreData tỏ ra ưu việt hơn rất nhiều, nó nhanh hơn, cung cấp khả năng mô hình hoá Entity, khả năng query data,… tuy nhiên trong 1 số tình huống nhất định, NSKeyedArchiver / NSKeyedUnarchiver lại là giải pháp tốt hơn cho việc lưu trữ. Ví dụ như chúng ta chỉ cần đơn giản là lưu lại object, và lôi ra sử dụng sau đó chẳng hạn. 


Qúa trình lưu trữ sử dụng NSKeyedArchiver / NSKeyedUnarchiver sẽ diễn ra như sau:
* chuyển đổi object từ các dạng thông thường (Int, Double, String,…) hoặc phức tạp (class, array, dictionary,…) sang dạng NSData/Data bằng NSKeyedArchiver / NSKeyedUnarchiver
* lưu NSData/Data vào file/UserDefault

Trong bài viết này, tôi sẽ giới thiệu về NSCoding và Codable, 2 protocol bắt buộc phải dùng khi các bạn sử dụng NSKeyedArchiver / NSKeyedUnarchiver để biến object thành data.

# II. Nội dung
## 1. NSCoding

Đầu tiên, các bạn mở Xcode, tạo 1 project playground mới.
Bây giờ, giả sử chúng ta có Class như sau:

```Swift
class Person {
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
}

let person = Person(name: "Viblo", age: 2)
```

Khi muốn lưu data của instance person vào UserDefault, chúng ta sẽ làm như sau:

```Swift
UserDefaults.standard.set(person, forKey: "person")
```

Build thử playground, chúng ta sẽ gặp phải bug crash, nội dung log trên console như sau:

libc++abi.dylib: terminating with uncaught exception of type NSException

Ok, tất nhiên là phải lỗi, không lỗi thì bài viết này chẳng có tí tác dụng nào rồi :D. Để lưu object vào UserDefault, chúng ta cần tuân thủ 3 rule sau:
* 1. Data phải thuộc một trong số các loại data cơ bản: Int, Float, Double, String, Boolean, Date
* 2. Nếu data là dạng Array, Dictionary, tất cả các key và value của nó phải tuân theo rule số 1
* 3. Nếu data là dạng Class, Array, Dictionary phức tạp, nó cần phải tuân theo NSCoding/Codable protocol, và cần  NSKeyedArchiver / NSKeyedUnarchiver để chuyển sang Data


Class Person đã không tuân theo rule số 3, vì thế chúng ta sẽ bị crash khi chạy App. Để tuân thủ theo rule 3, chúng ta thêm code cho class Person như sau:
```Swift
class Person: NSObject, NSCoding { // 1
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    enum Key: String {
        case name
        case age
    }
    // 2
    required init(coder aDecoder: NSCoder) {
        name = aDecoder.decodeObject(forKey: Key.name.rawValue) as? String ?? ""
        age = aDecoder.decodeInteger(forKey: Key.age.rawValue)
    }
	// 3
    func encode(with aCoder: NSCoder) {
        aCoder.encode(name, forKey: Key.name.rawValue)
        aCoder.encode(age, forKey: Key.age.rawValue)
    }
}

let person = Person(name: "Viblo", age: 2)
```

Bên trên, chúng ta lần lượt làm các việc:
* 1: để class Person thừa kế từ NSObject, và extend protocol NSCoding. Nguyên nhân phải thừa kế từ NSObject là do protocol NSCoding yêu cầu như vậy, các bạn không làm vậy thì compile time không có lỗi, nhưng runtime App sẽ crash
* 2: hàm khởi tạo, cũng là hàm decode data của NSCoding. Đây là hàm bắt buộc khi conform NSCoding protocol
* 3: hàm encode của NSCoding, hàm này được gọi khi save data. Đây cũng là hàm bắt buộc khi conform NSCoding protocol

Tiếp theo, để lưu lại và lấy ra instance person vào UserDefault, chúng ta làm như sau:

```Swift
if let data = try? NSKeyedArchiver.archivedData(withRootObject: person, requiringSecureCoding: false) {
    UserDefaults.standard.set(data, forKey: "data")
}

if let savedData = UserDefaults.standard.object(forKey: "data") as? Data {
    if let decodedPerson = try? NSKeyedUnarchiver.unarchiveTopLevelObjectWithData(savedData) as? Person {
        let person = decodedPerson
    }
}
```

Bên trên, chúng ta lần lượt dùng 
* NSKeyedArchiver.archivedData() để biến instance person thành dạng Data và lưu lại
* và NSKeyedUnarchiver.unarchiveTopLevelObjectWithData() để chuyển đổi data trở lại thành instance của class Person.

Ok, vậy là chúng ta đã hiểu cách sử dụng NSCoding và cách dùng NSKeyedArchiver  để lưu trữ data. UserDefault chỉ là 1 chỗ lưu, các bạn hoàn toàn có thể lưu data ra file cũng được.

## 2. Codable

Chúng ta sẽ tiếp tục tìm hiểu về Codable. Về cơ bản, Codable là phiên bản được viết bằng Swift của NSCoding. Chức năng của cả 2 protocol là như nhau, nhưng Codable mang lại nhiều lợi thế hơn NSCoding. Chúng ta xét ví dụ dưới đây:

```Swift
struct People: Codable { // 1
    var name: String
    var age: Int
    
    init(name: String, age: Int) {
        self.name = name
        self.age = age
    }
    
    enum Key: String, CodingKey { // 2
        case name
        case age
    }
    // 3
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: Key.self)
        name = try container.decode(String.self, forKey: .name)
        age = try container.decode(Int.self, forKey: .age)
    }
    // 4
    func encode(to encoder: Encoder) throws {
        var container = encoder.container(keyedBy: Key.self)
        try container.encode(name, forKey: .name)
        try container.encode(age, forKey: .age)
    }
}
```

Thoạt nhìn, có thể thấy cách sử dụng Codable và NSCoding tương đối giống nhau: 
* đều adopt Codable/NSCoding protocol
* đều có 2 hàm encode và init (decode) để mã hoá và giải mã

Tuy nhiên, nếu nhìn kỹ hơn, chúng ta sẽ nhận ra nhiều điểm khác biệt
* 1. Person là class, còn People là struct. Bên trên khi tìm hiểu về NSCoding, chúng ta đã biết để sử dụng NSCoding thì phải thừa kế từ NSObject, tức là bắt buộc phải là class. Trong khi đó Codable cho chúng ta khả năng dùng struct. Swift khuyến khích chúng ta dùng struct hơn, vì vậy dùng Codable là hợp lý hơn rồi.
* 2. Enum Key phải adopt từ CodingKey protocol, để quá trình mã hoá/giải mã ở các hàm bên dưới được an toàn hơn
* 3. Hàm giải mã định nghĩa type sẽ trả về trong parameter, chúng ta không phải cast type như đối với NSCoding
* 4. Việc encode cũng cần thông qua containter, instance của struct KeyedEncodingContainer. Việc này sẽ làm cho code an toàn hơn, tránh bị lỗi trong runtime phase.

Đó, viết code với Codable rõ ràng hơn, hướng Swift hơn, tránh được các bug xảy ra trong quá trình runtime. 

Chưa hết, việc sử dụng NSKeyedArchiver / NSKeyedUnarchiver với Codable cũng an toàn hơn. Việc chuyển đổi từ dạng instance People sang Data được thực hiện bằng PropertyListEncoder,  nên nếu chỉ cần lưu vào UserDefault chúng ta có thể bỏ qua  NSKeyedArchiver / NSKeyedUnarchiver và làm như sau:

```Swift
let people = People(name: "Sun", age: 8)

do {
    let data = try PropertyListEncoder().encode(people)
    UserDefaults.standard.set(data, forKey: "people")
} catch {
    print("error encode data")
}

if let data = UserDefaults.standard.data(forKey: "people") {
    do {
        let people = try PropertyListDecoder().decode(People.self, from: data)
        print(people)
    } catch {
        print("Retrieve Failed")
    }
}
```

Trong đoạn code bên trên, các phần encode/decode đều sử dụng hàm try/catch để bắt exception, không để App bị crash trong quá trình runtime. 

# III. Kết luận

Trên đây chúng ta đã cùng nhau tìm hiểu về cách sử dụng NSCoding và Codable trong iOS. Hi vọng bài viết này mang lại thông tin hữu ích cho các bạn. Cảm ơn các bạn đã theo dõi bài viết này, have a nice day ^_^.