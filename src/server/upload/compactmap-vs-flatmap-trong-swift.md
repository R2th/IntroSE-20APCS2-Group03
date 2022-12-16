## CompactMap:
Method này được sử dụng khi bạn muốn chuyển một array có chứa optinal values sang một array khác không chưa optional values nào (chỉ chứa các non-optional values).

Chúng ta có thể dễ dạng nhận ra sự khác biệt giữa **compactMap** và **map** thông qua ví dụ dưới đây:
```
let numbers = ["1", "2", "three", "///4///", "5"]

let mapped: [Int?] = numbers.map { str in Int(str) }
// ~> [1, 2, nil, nil, 5]

let compactMapped: [Int] = numbers.compactMap { str in Int(str) }
// ~> [1, 2, 5]
```

***Độ phức tạp***: O(m + n) với n là độ dài của chuỗi này và m là độ dài của kết quả 

## FlatMap:
Method này được sử dụng khi bạn muốn trả về một array được làm phẳng (chuyển từ 2 chiều sang 1 chiều). Thật ra flatMap còn có thể thực thi vai trò y hệt compactMap là loại bỏ các phần tử nil (chỉ chứa các non-optional values) nhưng nó bị Apple cho deprecated(không dùng nữa) mà thay bằng compactMap. 

Cùng xem ví dụ bên dưới để hiểu thêm nhé:
* **Làm phẳng array**: theo như mình đọc [Apple docs](https://developer.apple.com/documentation/swift/sequence/2905332-flatmap) thì flatMap thật ra chính là việc bạn map 1 collection hay sequence rồi sau đó **.joined()**
 ```
let numbers = [1, 2, 3, 4]

let mapped = numbers.map { Array(repeating: $0, count: $0) }
// ~> [[1], [2, 2], [3, 3, 3], [4, 4, 4, 4]]

let flatMapped = numbers.flatMap { Array(repeating: $0, count: $0) }
// ~> [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
```
* **filter nil** (deprecated)
```
var myArr = [1, 2, 3, 4, nil, 8, 9]
let a = myArr.flatMap { $0 }
// ~> [1, 2, 3, 4, 8, 9]
``` 

Ngoài ra thì mình đọc qua còn thấy nhiều bạn xài flatMap để parse data sang model.
* **Init method**
```
fileprivate struct Car {
    let id: Int
    let name: String
    let model: String
    
    init?(dictionary: [String:Any]) {
        guard
        let id = dictionary["id"] as? Int,
        let name = dictionary["name"] as? String,
        let model = dictionary["model"] as? String
        else {
            return nil
        }
        self.id = id
        self.name = name
        self.model = model
    }
}
var myCars = dictionaries.flatMap(Car.init)
```


-----

Bài viết tới đây là hết. Qua bài viết mình mong rằng các bạn sẽ nắm được khác nhau giữa **compactMap** và **flatMap** và cũng như là **map**.

Tài liệu tham khảo mình đã xem ở đây: 

 * [Map vs Flatmap trong swift](https://medium.com/@VincentVuVNG/map-vs-flatmap-trong-swift-4cc25a1a54a7)
 * [Apple docs - flatMap](https://developer.apple.com/documentation/swift/sequence/2905332-flatmap)
 * [CompactMap vs flatMap: The differences explained](https://www.avanderlee.com/swift/compactmap-flatmap-differences-explained/)