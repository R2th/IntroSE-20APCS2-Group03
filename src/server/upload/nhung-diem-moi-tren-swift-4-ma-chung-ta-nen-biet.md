### Giới thiệu

![](https://images.viblo.asia/b7087562-4551-4fa6-893c-00201175ccef.png)

  Swift 4 là bản release mới nhất của Apple, được đưa ra vào mùa thu năm 2017. Swift 4 ngoài tương thích với Swift3 thì còn có những tính năng mới tuyệt vời.
  
  **Nào chúng ta cùng tìm hiểu nhé!**
  
### Swift4 vs Xcode9 ?

Swift 4 được cài đặt mặc định khi chúng ta dùng Xcode 9, bạn có thể download bản mới nhất của Xcode 9 từ trang chủ Apple developer [ tại đây](https://developer.apple.com/xcode/) 

Xcode 9 là bản cập nhật với việc cải thiện về tốc độ nhất là đối với những dự án với lượng tập tin lớn. Xcode9 sử dụng trình biên dịch tương tự để xây dựng mã Swift 3 hiện có và cập nhật mã Swift 4. 

Bạn nên thử các tính năng mới của Swift 4 trên playground, các example, hoặc sửa chúng trong các tình huống khác nhau để hiểu rõ vấn đề hơn.

### Migrating to Swift 4?

Việc migration từ Swift3 sang Swift4 sẽ đơn giản hơn rất nhiều nếu so với từ 2.2 sang 3 vì hầu hết các phần thay đổi là thêm vào mà không cần phải sửa nhiều như khi lên swift3. Vì Swift migration tool đã làm hết các công việc này giúp chúng ta. Xcode9 support đồng thời các version swift: Swift 4, 3, 3.2. Chúng ta có thể dễ dàng thay đổi bằng việc chọn Target -> Build Setting -> Swift Language Version -> chọn version Swift.

### API Changes

#### Strings

Một trong những cải tiến của Swift4 là String được coi là collection nên chúng ta không cần tới thuộc tính charators như ở Swift 3.0. 
Chúng ta cùng theo dõi ví dụ in từng ký tự trong String dưới đây:

**Swift3:**

```Swift
let myDog = "Milu 🐶 "
for character in myDog.charators {
  print("character")
}
```

**Swift4:**

```Swift
let myDog = "Milu 🐶"
for character in myDog {
  print("character")
}
```

Các ưu điểm từ Sequence và Collection, String cũng được kế thừa như: 

```Swift
myDog.count       // 6
myDog.isEmpty     // false
myDog.dropFirst() // "ilu 🐶"

// Filter out any none ASCII characters
myDog.filter { char in
  let isASCII = char.unicodeScalars.reduce(true, { $0 && $1.isASCII })
  return isASCII
} // "Milu "
```

#### Dictionary and Set

##### Sequence Based Initialization

Chúng ta có thể tạo dictionary từ mảng key-value 

```Swift
let nearestStarNames = ["Proxima Centauri", "Alpha Centauri A", "Alpha Centauri B", "Barnard's Star", "Wolf 359"]
let nearestStarDistances = [4.24, 4.37, 4.37, 5.96, 7.78]

// Dictionary from sequence of keys-values
let starDistanceDict = Dictionary(uniqueKeysWithValues: zip(nearestStarNames, nearestStarDistances)) 
// ["Wolf 359": 7.78, "Alpha Centauri B": 4.37, "Proxima Centauri": 4.24, "Alpha Centauri A": 4.37, "Barnard's Star": 5.96]
```

##### Duplicate Key Resolution 

Bạn có thể xử lý việc khởi tạo dictionary bị lặp lại key, điều này sẽ giúp tránh cho việc ghi đè cặp key-value

```Swift
// Random vote of people's favorite stars
let favoriteStarVotes = ["Alpha Centauri A", "Wolf 359", "Alpha Centauri A", "Barnard's Star"]

// Merging keys with closure for conflicts
let mergedKeysAndValues = Dictionary(zip(favoriteStarVotes, repeatElement(1, count: favoriteStarVotes.count)), uniquingKeysWith: +) // ["Barnard's Star": 1, "Alpha Centauri A": 2, "Wolf 359": 1]
```

Đoạn code trên đã giúp ta xử lý việc lặp key "Alpha Centauri A" trong dictionary.

##### Filtering

Cả Dictionary và Set bây giờ đều có khả năng filter kết quả vào object mới:

```Swift
// Filtering results into dictionary rather than array of tuples
let closeStars = starDistanceDict.filter { $0.value < 5.0 }
closeStars // Dictionary: ["Proxima Centauri": 4.24, "Alpha Centauri A": 4.37, "Alpha Centauri B": 4.37]
```

##### Dictionary Mapping 

Dictionary nhận được phương thức rất hữu ích cho việc mapping giá trị trực tiếp:

```Swift
// Mapping values directly resulting in a dictionary
let mappedCloseStars = closeStars.mapValues { "\($0)" }
mappedCloseStars // ["Proxima Centauri": "4.24", "Alpha Centauri A": "4.37", "Alpha Centauri B": "4.37"]
```

##### Dictionary Default Values

Thông thường, khi truy cập Dictonary thường có giá trị mặt định là nil trong trường hợp không tồn tại. Với Swift4, điều này trở nên rõ ràng hơn, chúng ta cùng tìm hiểu ví dụ dưới đây:

```Swift
// Subscript with a default value
let siriusDistance = mappedCloseStars["Wolf 359", default: "unknown"] // "unknown"

// Subscript with a default value used for mutating
var starWordsCount: [String: Int] = [:]
for starName in nearestStarNames {
  let numWords = starName.split(separator: " ").count
  starWordsCount[starName, default: 0] += numWords // Amazing 
}
starWordsCount // ["Wolf 359": 2, "Alpha Centauri B": 3, "Proxima Centauri": 2, "Alpha Centauri A": 3, "Barnard's Star": 2]
```

Trước đây trong trường hợp này, chúng ta cần dùng if-let cồng kềnh. Trong Swift 4 chỉ đơn giản là sử dụng một dòng duy nhất.

### API Additions
Bây giờ chúng ta sẽ xem các tính năng thêm mới của của Swift 4 nhé! 

#### Archival and Serialization
Để seriallize và archive kiểu custom types do chúng ta tạo ra ở bản cũ khá loằng ngoằng. Với kiểu class ta cần subclass NSObject và thực thi NSCoding protocol, kiểu giá trị như struc hay enum chúng ta cần thực hiện các bước như tạo sub object có thể kế thừa NSObject, NSCoding ... 
Swift 4 giải quyết vấn đề này bằng cách mang serialization tới tất cả 3 kiêu type của Swift

```Swift
struct CuriosityLog: Codable {
  enum Discovery: String, Codable {
    case rock, water, martian
  }

  var sol: Int
  var discoveries: [Discovery]
}

// Create a log entry for Mars sol 42
let logSol42 = CuriosityLog(sol: 42, discoveries: [.rock, .rock, .rock, .rock])
```

Trong ví dụ này chúng ta có thể thấy rằng để object Swift có thể Ecode và decode chúng ta chỉ cần thực thi Codable protocol. Để encode object ta cần truyền object này tới encoder.

```Swift
let jsonEncoder = JSONEncoder() // One currently available encoder

// Encode the data
let jsonData = try jsonEncoder.encode(logSol42)
// Create a String from the data
let jsonString = String(data: jsonData, encoding: .utf8) // "{"sol":42,"discoveries":["rock","rock","rock","rock"]}"
```

Bước cuối cùng là decode dữ liệu vào object cụ thể:

```Swift
let jsonDecoder = JSONDecoder() // Pair decoder to JSONEncoder

// Attempt to decode the data to a CuriosityLog object
let decodedLog = try jsonDecoder.decode(CuriosityLog.self, from: jsonData)
decodedLog.sol         // 42
decodedLog.discoveries // [rock, rock, rock, rock]
```

#### Key-Value Coding

Swift 4 ta có thể tạo reference key paths tới instance

```Swift
struct Lightsaber {
  enum Color {
    case blue, green, red
  }
  let color: Color
}

class ForceUser {
  var name: String
  var lightsaber: Lightsaber
  var master: ForceUser?

  init(name: String, lightsaber: Lightsaber, master: ForceUser? = nil) {
    self.name = name
    self.lightsaber = lightsaber
    self.master = master
  }
}

let sidious = ForceUser(name: "Darth Sidious", lightsaber: Lightsaber(color: .red))
let obiwan = ForceUser(name: "Obi-Wan Kenobi", lightsaber: Lightsaber(color: .blue))
let anakin = ForceUser(name: "Anakin Skywalker", lightsaber: Lightsaber(color: .blue), master: obiwan)
```

Ta vừa tạo ra vài instances của ForceUser bằng cách set name, lightsaber và master. Để tạo key path ta làm như sau:

```Swift
// Create reference to the ForceUser.name key path
let nameKeyPath = \ForceUser.name

// Access the value from key path on instance
let obiwanName = obiwan[keyPath: nameKeyPath]  // "Obi-Wan Kenobi"
```

Ở đây ta tạo key path cho thuộc tính name của ForceUser, sau đó sử dụng key path này :

```Swift
// Use keypath directly inline and to drill down to sub objects
let anakinSaberColor = anakin[keyPath: \ForceUser.lightsaber.color]  // blue

// Access a property on the object returned by key path
let masterKeyPath = \ForceUser.master
let anakinMasterName = anakin[keyPath: masterKeyPath]?.name  // "Obi-Wan Kenobi"

// Change Anakin to the dark side using key path as a setter
anakin[keyPath: masterKeyPath] = sidious
anakin.master?.name // Darth Sidious

// Note: not currently working, but works in some situations
// Append a key path to an existing path
//let masterNameKeyPath = masterKeyPath.appending(path: \ForceUser.name)
//anakin[keyPath: masterKeyPath] // "Darth Sidious"
```

#### Multi-line String Literals

Swift 4 đã hỗ trợ đối với text có nhiều dòng:

```Swift
let star = "⭐️"
let introString = """
  A long time ago in a galaxy far,
  far away....

  You could write multi-lined strings
  without "escaping" single quotes.

  The indentation of the closing quotes
       below deside where the text line
  begins.

  You can even dynamically add values
  from properties: \(star)
  """
print(introString) // prints the string exactly as written above with the value of star
```

#### One-Sided Ranges

Ở Swift 3 ta bắt buộc phải có start, end index, nhưng ở Swift 4 ta chỉ cần 1 index là có thể tạo được sub array:

```Swift
// Collection Subscript
var planets = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]
let outsideAsteroidBelt = planets[4...] // Before: planets[4..<planets.endIndex]
let firstThree = planets[..<4]          // Before: planets[planets.startIndex..<4]
```

#### Pattern Matching

Một trong những ưu điểm của one-sided ranges là parten matching:

// Pattern matching

```Swift
func temperature(planetNumber: Int) {
  switch planetNumber {
  case ...2: // anything less than or equal to 2
    print("Too hot")
  case 4...: // anything greater than or equal to 4
    print("Too cold")
  default:
    print("Justtttt right")
  }
}

temperature(planetNumber: 3) // Earth
```

### Kết Luận

Có thể nói swift4 có ưu điểm rất lớn về việc cải thiện hiệu năng và tương thích với swift 3. Kể từ khi ra đời, Swift luôn được tiếp tục phát triển với các bản cập nhật. Hi vọng Swift sẽ tiếp tục phát triển và mang tới những điều mới vẻ và tuyệt vời hơn nữa.

##### _Nguồn:_
[https://developer.apple.com/xcode/)
[https://www.raywenderlich.com/163857/whats-new-swift-4)
[https://themindstudios.com/blog/swift-4-vs-swift-3-differences/)