> Result enum đã có kể từ Swift 5 và cho phép chúng ta xác định trường hợp thành công và thất bại. Kiểu này rất hữu ích để xác định kết quả của một hoạt động khả dụng mà chúng ta muốn xác định cả giá trị và kiểu lỗi đầu ra.

Thư viện Swift tiêu chuẩn bổ sung nhiều chức năng hơn cho kiểu kết quả. Chuyển đổi giữa cả hai trường hợp là một mô hình phổ biến nhưng chúng ta có thể tận dụng các tiện ích mở rộng hiện có để làm đẹp code của mình, thậm chí nhiều hơn thế. Hãy cùng đi tìm hiểu một số ví dụ code để thấy được các khả năng sẵn có của nó nào :grin:

### 1. Cách sử dụng Result enum trong Swift
Trước khi bắt đầu sử dụng Result enum, chúng ta nên biết định nghĩa về nó:

```
enum Result<Success, Failure> where Failure : Error {

    /// A success, storing a `Success` value.
    case success(Success)

    /// A failure, storing a `Failure` value.
    case failure(Failure)
}
```

Như bạn có thể thấy, nó có hai trường hợp được xác định:

* Một trường hợp Success là loại generic `Success`. Đây có thể là bất kỳ loại nào, bao gồm cả `Void`

* Một trường hợp Failure là loại generic `Failure` phải tuân theo  protocol `Error`. Nói cách khác, nó phải là một loại lỗi

Hai trường hợp này cho phép chúng ta xác định kết quả thành công và thất bại của một hoạt động có thể thất bại.

Lấy ví dụ sau, trong đó chúng ta xác định một phương thức để tìm nạp các số chẵn từ một tập hợp nhất định và một loại lỗi tiềm ẩn

```
/// Define the potential error cases.
enum EvenNumberError: Error {
    case emptyArray
}

/// A method capable of fetching even numbers from a given collection.
func evenNumbers(in collection: [Int]) -> Result<[Int], EvenNumberError> {
    /// If the given collection is empty, return a failure instead.
    guard !collection.isEmpty else {
        return .failure(EvenNumberError.emptyArray)
    }
    
    /// The collection has items, fetch all even numbers.
    let evenNumbers = collection.filter { number in number % 2 == 0 }
    return .success(evenNumbers)
}
```

Phương thức nhận một tập hợp các số làm đầu vào và trả về kết quả enum dưới dạng giá trị trả về. Trong phương pháp này, trước tiên chúng ta kiểm tra xem bộ sưu tập đã được lấp đầy chưa. Nếu không, chúng ta trả về trường hợp lỗi với đúng trường hợp lỗi `emptyArray`. Trong trường hợp chúng ta tìm thấy số, chúng ta trả về tất cả các số chẵn.

Sử dụng phương thức này như sau:

```
/// Create an array of numbers for our example.
let numbers: [Int] = [2,3,6,8,10]
let emptyArray = [Int]()

print(evenNumbers(in: emptyArray)) // Prints: failure(EvenNumberError.emptyArray)
print(evenNumbers(in: numbers)) // Prints: success([2, 6, 8, 10])
```

Việc chuyển vào một mảng trống sẽ trả về kết quả không thành công trong khi một tập hợp các số được trả về chỉ với các số chẵn. Đây là một ví dụ đơn giản về cách bạn có thể sử dụng kiểu **Result**.

Một mẫu phổ biến để sử dụng **Result** là chuyển đổi qua hai trường hợp:

```
switch evenNumbers(in: numbers) {
case .success(let evenNumbers):
    print("Even numbers found: \(evenNumbers)")
case .failure(let error):
    print("Fetching even numbers failed with \(error)")
}
```

Lợi ích của việc sử dụng kiểu trả về kết quả:

* Xác định ngữ cảnh bằng cách nói với những người triển khai phương thức của bạn rằng nó có thể thất bại
* Loại lỗi  `Failure` xác định các lỗi tiềm ẩn có thể xảy ra
* Thay vì trả về `Error` và giá trị kết quả tùy chọn, giờ đây, chúng ta có thể chỉ cần chuyển đổi hai trường hợp và nhận một giá trị unwrapped

Để làm rõ điểm cuối cùng, mình muốn chia sẻ cho bạn một ví dụ code về cách chúng ta có thể triển khai ví dụ trên mà không có Result enum:

```
func oldEvenNumbers(in collection: [Int]) -> (EvenNumberError?, [Int]?) {
    /// If the given collection is empty, return a failure instead.
    guard !collection.isEmpty else {
        return (EvenNumberError.emptyArray, nil)
    }
    
    /// The collection has items, fetch all even numbers.
    let evenNumbers = collection.filter { number in number % 2 == 0 }
    return (nil, evenNumbers)
}

let evenNumbersResult = oldEvenNumbers(in: numbers)
if let error = evenNumbersResult.0 {
    print(error)
} else if let result = evenNumbersResult.1 {
    print(result)
}
```

Rõ ràng, phần mở rộng trên một mảng số nguyên sẽ là một triển khai tốt hơn nhưng điều này chỉ để chứng minh việc sử dụng result enum. Trên thực tế, nếu bạn nhìn vào việc triển khai URLSession hiện tại, chúng ta nhận được một lệnh gọi lại với cả optional error và data response:

```
func dataTask(with request: URLRequest, completionHandler: @escaping (Data?, URLResponse?, Error?) -> Void) -> URLSessionDataTask
```

Sẽ rõ ràng hơn nhiều nếu nó được xác định bằng cách sử dụng enum result:

```
func dataTask(with request: URLRequest, completionHandler: @escaping (_ result: Result<Data, Error>) -> Void) -> URLSessionDataTask
```

Đó là lý do để biết rằng Result enum rất hữu ích trong Swift :satisfied:.

### 2. Chuyển đổi một giá trị
Thư viện Swift tiêu chuẩn định nghĩa các phương thức trên enum Result để biến đổi giá trị kết quả. Điều này bao gồm cả việc chuyển đổi kiểu lỗi và giá trị.

Điều này rất tốt khi bạn muốn kết hợp nhiều loại lỗi khác nhau thành một:

```
enum CommonErrorType: Error {
    case otherError(error: Error)
}

let result = evenNumbers(in: numbers).mapError { (evenNumberError) -> CommonErrorType in
    return CommonErrorType.otherError(error: evenNumberError)
}
```

Hoặc khi bạn muốn map giá trị kết quả và trả về các chuỗi thay thế:
```
let evenNumberStringsResult = evenNumbers(in: numbers).map { (numbers) -> [String] in
    return numbers.map { String($0) }
}
```

Đôi khi, bạn muốn map giá trị kết quả bằng cách sử dụng một phương thức có thể bị fail. Trong trường hợp này, chúng ta có thể sử dụng phương thức `flatMap` cho phép chúng ta map `Success` thành `Failure`.

```
let firstEvenNumberResult = evenNumbers(in: numbers).flatMap { (evenNumbers) -> Result<Int, EvenNumberError> in
    guard let firstEvenNumber = evenNumbers.first else {
        return .failure(EvenNumberError.emptyArray)
    }
    return .success(firstEvenNumber)
}
```

Vì thuộc tính `first` có thể là `nil`, chúng ta muốn có thể trả lại `Error.emptyArray` một lần nữa để bắt  failure đó. Kiểu trả về mới xác định giá trị  `Success` của một số nguyên duy nhất, đại diện cho số chẵn đầu tiên nếu được tìm thấy.

Chúng ta có thể làm tương tự đối với dòng failure. Trong một số trường hợp, bạn muốn trả về giá trị mặc định khi một thao tác không thành công. Bạn có thể thực hiện việc này bằng cách sử dụng phương thức `flatMapError`:

```
let fallbackEvenNumbers = [2,4,6,8,10]
let defaultNumbersResult = evenNumbers(in: []).flatMapError { (error) -> Result<[Int], EvenNumberError> in
    if error == .emptyArray {
        return .success(fallbackEvenNumbers)
    }
    return .failure(error)
}
print(defaultNumbersResult)
```

Các phương thức chuyển đổi này rất tốt để viết code clean hơn, xử lý tất cả các luồng tiềm ẩn trong một hoạt động có thể bị fail.

### 3. Chuyển đổi một throwing method thành một Result enum 

Trường hợp sử dụng phổ biến là chuyển đổi một throwing method hiện có thành một kiểu kết quả. Điều này cho phép bạn di chuyển các phương thức mà bạn không tự kiểm soát, chẳng hạn như các phương thức phụ thuộc của bên thứ ba.

Lấy ví dụ sau về throwing method, tạo ra các số lẻ của một tập hợp:

```
func oddNumbers(in collection: [Int]) throws -> [Int] {
    guard !collection.isEmpty else {
        throw EvenNumberError.emptyArray
    }
    
    /// The collection has items, fetch all uneven numbers.
    let oddNumbers = collection.filter { number in number % 2 == 1 }
    return oddNumbers
}
```

Chúng ta có thể sử dụng throwing method này trong trình khởi tạo kết quả như sau:

```
let oddNumbersResult = Result { try oddNumbers(in: numbers) }

switch oddNumbersResult {
case .success(let oddNumbers):
    print("Found odd numbers: \(oddNumbers)")
case .failure(let error):
    print("Finding odd numbers failed with \(error)")
}
```

Một lỗi do phương thức `oddNumbers(in:)` ném ra sẽ trả về trường hợp failure trong khi fetch thành công sẽ tạo ra giá trị trả về trường hợp success.

### 4. Chuyển đổi một Result thành một Throwing Expression

Chúng ta có thể chuyển kết quả thành một throwing expression. Đôi khi, bạn không muốn xử lý rõ ràng cả hai trường hợp. Ví dụ: khi bạn đang thực hiện nhiều phương thức ném.

Trong trường hợp này, bạn có thể sử dụng phương thức `get ()` để unwrap giá trị  success hoặc throw ra lỗi failure bên trong:

```
let numbers: [Int] = [2,3,6,8,10]
let evenNumbersResultValue = try evenNumbers(in: numbers).get()
print(evenNumbersResultValue) // Prints: 2, 6, 8, 10
```

### 5.Kết luận 

Kiểu Result enum trong Swift là một cách dễ đọc để xác định hai kết quả của một hoạt động có thể thất bại. Nó làm rõ cả loại success và failure, cho người triển khai biết điều gì sẽ xảy ra. Bên cạnh việc chuyển đổi qua cả hai trường hợp, bạn có thể sử dụng các phương thức như `map`, `flatMap`, `mapError` và `get ()` để code của bạn clean hơn.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃