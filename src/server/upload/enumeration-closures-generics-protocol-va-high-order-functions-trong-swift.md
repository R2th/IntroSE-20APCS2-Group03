Ở đây, chuỗi bài viết này sẽ hướng dẫn các bạn về Swift, chứ không phải iOS như thường lệ. Chúng ta sẽ cùng nhau khám phá một vài điểm hay, kỹ thuật mà bạn có thể áp dụng để lập trình tốt hơn. Swift được thiết kế với cấu trúc an toàn, trong sáng và chúng ta sẽ tận dụng một vài tính năng đặc biệt của Swift để đạt được mục tiêu này.

Để bắt đầu, hãy mở Xcode và tạo một Playground mới. Chúng ta không cần phải tạo một project mới, chỉ cần một Playground là đủ rồi.

## Enumerations
Nếu như bạn chưa biết, thì enumerations, hay enums, là một kiểu giá trị đặc biệt trong Swift cho phép bạn thể hiện nhiều trường hợp, hoặc khả năng. Enum tương đương với Boolean ở điểm giá trị enum có thể là nhiều trường hợp. Bool thì chỉ có thể là đúng hoặc sai, nhưng enum thì lại bất kỳ trường hợp nào mà bạn muốn đặt ra.

Giả sử file Playground của bạn đã sẵn sàng, chúng ta khai báo một enum như sau:

```
enum DownloadStatus {
    case downloading
    case finished
    case failed
    case cancelled
}
```

Như bạn đã thấy thì, khai báo một enum rất dễ dàng. Ở ví dụ trên, chúng ta đã khai báo một enum có tên là DownloadStatus với 4 case, downloading, finished, failed, và cancelled. 

```
var currentStatus = DownloadStatus.downloading
```

Khi khai báo một enum, tên thực sự của enum đó nên được bắt đầu bằng chữ viết hoa và ở dạng số ít. Việc tuân thủ theo những quy định ngữ pháp và code convention là rất quan trọng.Thêm vào đó, các enum case thường bắt đầu bằng chữ cái thường

Bây giờ thì bạn đã biết enums là gì rồi, hãy tìm hiểu cách sử dụng chúng. Swift cho phép chúng ta switch giữa các enum như sau:

```
let currentStatus = DownloadStatus.downloading
 
switch currentStatus {
case .downloading:
    print("Downloading...")
    
case .finished:
    print("Just finished the download...")
    
case .failed:
    print("Failed to download the file...")
    
case .cancelled:
    print("The download is cancelled...")
}
```

Đoạn code trên cho phép chúng ta viết những câu lệnh điều kiện mạnh mẽ hơn những dòng if đơn thuần. Trình biên dịch sẽ bắt chúng ta xử lý từng trường hợp trong enum tại khối lệnh switch, đảm bảo ko bỏ sót trường hợp nào. Từ đó tăng tính an toàn cho code.

Cho đến thời điểm này, bạn có thể nghĩ rằng enum không thực sự thêm điều gì mới mẻ cho Swift.Đúng là nó có thể khiến code của chúng ta an toàn hơn, nhưng bạn cũng có thể sử dụng một chuỗi String hoặc vài biến Bools cho dữ liệu được lưu trữ bởi enum. Bây giờ, hãy cùng nhìn vào một trong những tính năng mạnh mẽ nhất của enum: associated values. Associated value cho phép chúng ta lưu trữ thêm dữ liệu ở bên trong enum. Hãy khai báo một enum mới có tên là WeatherCondition, bao gồm các tình trạng thời tiết và một vài thông tin bổ sung:

```

enum Cloud {
    case cirrus
    case cumulus
    case altocumulus
    case stratus
    case cumulonimbus
}
 
enum WeatherCondition {
    case sunny(temperature: Float)
    case rainy(inchesPerHour: Float)
    case cloudy(cloudType: Cloud, windSpeed: Float)
}
```

Ở ví dụ này, chúng ta thực chất đã khai báo 2 enums: Cloud và WeatherCondtion. Đừng quá chú ý vào enum Cloud, thay vào đó, tai enum WeatherCondition, chúng ta khai báo 3 case, và mỗi case lưu trữ một vài dàng thông tin bên ngoài enum đó. Ở case sunny, chúng ta lưu một biến Int là temperature. Ở case rainy, chúng ta lưu một biến Float là inchesPerHour..vv

Và theo bạn thấy thì, giá trị associated value cho phép chúng ta lưu thêm thông tin tại enum một cách dễ dàng:

```
let currentWeather = WeatherCondition.cloudy(cloudType: .cirrus, windSpeed: 4.2)
```

Chúng ta có thể switch  tại associated value enum cases, như những case bình thường.
```

switch currentWeather {
case .sunny(let temperature):
    print("It is sunny and the temperature is \(temperature).")
    
case .rainy(let inchesPerHour):
    print("It is raining at a rate of \(inchesPerHour) inches per hour.")
    
case .cloudy(let cloudType, let windSpeed):
    print("It is cloudy; there are \(cloudType) clouds in the sky, and the wind speed is \(windSpeed).")
}
```

Đến đây thì các bạn đã nhìn được giá trị thật sự mà enums mang cho chúng ta. Nó có thể khiến code của chúng ta an toàn hơn, rõ ràng hơn và súc tích hơn. Có thể bạn đã biết về enums, nhưng chưa để ý đến associated value và những lợi ích nó mang lại, hay làm cách nào để switch giữa chúng. Đừng lo, hãy cứ kếp hợp chúng lại với nhau và bạn sẽ thấy sự tiện ích đến không ngờ mà chúng mang lại.

## Closures và Higher Order Functions
Một trong những tính năng đặc biệt của Swift là closure, hay còn gọi là block ở Objective-C. Tuy nhiên, closure mạnh mẽ hơn block rất nhiều. Chúng ta có thể hiểu closure là một function không có tên, và là kiểu First Class, có nghãi là chúng có thể được gán vào một biến như các kiểu khác, đồng thời cũng có thể được truyền vào trong function.

Một closure được trình bày theo dạng (parameters) -> returnType. Ví dụ, một closure lấy một biến String và một biến float làm parameter và trả về void sẽ được viết như sau: (String, Float) -> Void. Bạn có thể viết function và lấy closure như một parameter:

```
func myFunction(_ stringParameter: String, closureParameter: (String) -> Void) {
    closureParameter(stringParameter)
}
```

Function trên lấy một biến String và một closure làm parameter và sau đó nó gọi đến closure, cung cấp một String parameter tới closure đó:

```
myFunction("Hello, world!", closureParameter: {(string) in
    print(string) //prints "Hello, world!"
})
```

Ở trường hợp này, chúng ta truyền closure cho function giống như truyền một parameter bình thường. Sau đó, bên trong function, chúng ta gọi đến closure như gọi một function bình thường. Ví dụ ở dưới cho ta thấy rằng closure giống hệt như một function, một function không có tên.

Chúng ta còn có thể sử dụng cú pháp trailing closure để làm cho closure trở nên đẹp và trong sáng hơn. 

```
myFunction("Hello, world!") {(string) in
    print(string) //prints "Hello, world!"
}
```

Cú pháp Trailing closure xóa những dấu ngoặc xung quanh parameter closure ở function, nhưng với điều kiện nó phải là paremeter cuối cùng. 

Nhờ vào sự mạnh mẽ của closure, mà thư viện chuẩn Standard Library của Swift đã cung cấp một loạt những High Order Function (HOFs). Đơn giản là HOFs là những function lấy function khác làm parameter. HOFs hiện diện chủ yếu ở những kiểu collection type như Array, Dictionary, Set, và chúng cung cấp những function như map, filter, forEach, reduce, and flatMap

### Map
Đầu tiên là với map. 

```
let mapNumbers = [1, 2, 3, 4, 5]
let doubledMapNumbers = mapNumbers.map { $0 * 2 }
print(doubledMapNumbers) //prints [2, 4, 6, 8, 10]
```

Đoạn code trên là ví dụ của hàm  map Như bạn thấy thì thật dễ đang để nhân từng phần tử trong mảng  mapNumber  bằng hàm map.  Với hàm này bạn có thể tiết kiệm được rất nhiều thời gian cũng như số lượng code phải viết.

Hàm map lấy một closure làm input với một parameter cùng kiểu với phần tử của mảng được truy vấn đến, đồng thời trả lại một giá trị cùng kiểu. Ở trường hợp này, parameter không có tên, và chúng ta có thể đặt nó là $0, tương tự với  $1, $2, $3,  cho các phần tử tiếp theo.

Bên cạnh đó, chúng ta có thể để ý là closure không có giá trị trả về. Với những closure một dòng, chúng ta không cần sử dụng từ khoá return. Cuối cùng là sử dụng trailiing closure, cho phép chúng ta tối giản được khối lượng dòng code.

```
let doubledMapNumbers = mapNumbers.map( {(number) in
    return number * 2
})
```

Như bạn đã thấy thì Swift cung cấp cho chúng ta rất nhiều cách để làm ngắn gọn closure, làm cho code trở nên sáng sủa dễ nhìn hơn.

### Filter
Tiếp theo, chúng ta hãy tạo một array mới có tên là filterNumbers.

```
let filterNumbers = [1, 2, 3, 4, 5]
let filteredNumbers = filterNumbers.filter { $0 > 3 }
print(filteredNumbers) //prints [4, 5]
```

Ở ví dụ này, chúng ta lọc mảng filterNumbers. chỉ giữ lại những phần tử nào lớn hơn 3. 

### forEach

```
let forEachNumbers = [1, 2, 3, 4, 5]
forEachNumbers.forEach { print($0) } //prints one item of the array on each line
```

Thay vì sử dụng từng vòng for rối rắm, chúng ta sử dụng forEach, chỉ với 2 dòng code.

### Reduce

```
let reduceNumbers = [1, 2, 3, 4 ,5]
let reducedNumber = reduceNumbers.reduce(0) { $0 + $1 }
print(reducedNumber) //prints 15
```

Reduce được sử dụng để làm giảm số lượng phần tử của một collection type xuống thành 1 giá trị. Ở đây chúng ta dồn tất cả các số vào thành một giá trị và lưu trong mảng reduceNumber.

Parameter mà chúng ta cung cấp cho hàm reduce là một initial value. Reduce bắt đầu với initial value và thực thi tác vụ đặc biệt cho từng phần tử trong mảng.

```
0 + 1 + 2 + 3 + 4 + 5 is 15, which is why print(reducedNumbers) gives you 15.
```

### flatMap
Cuối cùng là  flatMap . Ở đây mảng của chúng ta có một chút khác biệt là có chứa cả phần tử nil. 

```
let flatMapNumbers = [1, nil, 2, nil, 3, nil, 4, nil, 5]
let flatMappedNumbers = flatMapNumbers.flatMap { $0 }
print(flatMappedNumbers) //prints [1, 2, 3, 4, 5]
```

flatMap lọc qua mảng, sử dụng closure làm input để điều phối các phần tử. Kết quả trả về chỉ tồn tại giá trị non-nil.flatMap  rất hữu dụng trong tác vụ lọc bỏ những phần tử nil trong mảng. 

Như vậy là qua bài viết trên, tôi đã giới thiệu được cho các bạn một vài tính năng rất hay và nổi bật của Swift, hy vọng sẽ giúp ích cho các bạn. Happy coding !

Nguồn bài viết: http://www.appcoda.com/mastering-swift/