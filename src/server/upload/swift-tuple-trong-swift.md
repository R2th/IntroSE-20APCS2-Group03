Hai năm trước, khi tôi bắt đầu với iOS, tôi không biết tuple là gì, tại sao và nơi tôi sẽ sử dụng chúng. 

Trong vài tuần sau đó, tôi mới nhận ra rằng tôi đang sử dụng chúng ở mọi nơi mà tôi không biết điều đó.

Ví dụ nhỏ:
```
func willDoNothing() {}
```

Đôi khi thậm chí vô tình bạn chạy func mà không làm gì. Trình biên dịch return() một tuple rỗng.

Swift đang ánh xạ trả về void trong tuples.

Tuples không có một định nghĩa chính thức, không rõ ràng, nhưng dễ tạo và rất dễ sử dụng.

Tuy nhiên nó cũng có những nhược điểm, chúng không thể implement các method và protocol. 
Và giống như mọi tuple khác, bạn không thể thay đổi type của nó.

Đây là một ví dụ cơ bản:
```
let client = (fullName: "SomeName", isActive: Bool, age: Int)
// Bạn sẽ truy cập thuộc tính như này
fullNameTextField.text = client.fullName
```

```
let bankClient = (clientType: "Company", isPremiumClient: true)
switch bankClient {
case let(type, false):
print("client type is \(type) and it is not a premium client" )
default:
break
}
// hoặc bạn có thể bỏ qua các yếu tố của tuple
switch bankClient {
case let (type, _):
print("client type is \(type)" )
default:
break
}
```

Đây là một chủ đề nâng cao với closure:

Ngay cả khi bạn không thể thêm method vào tuple, bạn có thể thêm closure:
```
let client = (name: "John", bankNumber: "01234567890", cardType: "Visa", withdrawalAmount: { (cash: Double) in
print("amount \(cash)")
})
```

Thành thật mà nói, tôi còn không nhớ ngay cả khi đã làm điều này trong các tình huống thực tế, nhưng tôi biết điều này sẽ hiệu quả, nhưng có một vấn đề với closure và tuple với nhau. 
Bạn không thể truy cập một số phần tử theo cách này:

```
print("my name is \(client.name, client.withdrawalAmount)")
// mã này sẽ không được biên dịch 
```

## Vậy chúng được sử dụng nhiều nhất ở đâu?

Khi bạn cần một func sẽ trả về nhiều kiểu giá trị.

Trong thực tế. Có lẽ bạn sẽ không viết điều gì như thế này:

```
func someClient() -> (name: String, age: Int, havePremiumAccount: Bool) {
return ("John", 27, true) 
}
```

Nhưng trong ít nhất 50% ứng dụng, bạn sẽ có một cái gì đó như thế này:

```
func fetchBankClient(id: Int) -> (client: Client, havePremiumAccount: Bool, accountNumber: String) {
///    
} 
let client = fetchBankClient(id: 1054)
// sau đó bạn có thể sẽ cập nhật giao diện với dữ liệu này hoặc tạo một số lệnh gọi API để gửi một số dữ liệu đến máy chủ.
Một cái gì đó như thế này:
if client.havePremiumAccount == true {
showFastCreditView = true
}
```

Điều này thật tuyệt, nhưng swift thậm chí còn có cách tốt hơn để làm điều này
```
let (client, havePremiumAccount, accountNumber) = fetchBankClient(5)
// trong swift này được gọi là destructuring tuple.
// Bây giờ có 3 biến mới mà bạn có thể truy cập dễ dàng hơn.
// Và nó có vẻ dễ đọc hơn.
```

Tóm tắt điều này, trong hầu hết các trường hợp, bạn sẽ sử tuple làm loại kết quả trả về của lệnh call API, escaping closure.

```
func getClients(objectToPass: Object, completion:@escaping (SomeType, Error) → ReturnType)
```

## Typealias và tuples:
Tuple rất tốt cho chức năng này.

Tuples có thể rất dài và có thể lặp lại nhiều lần trong cùng một method. 

Khi mà tuple được lặp lại nhiều lần chúng ta sẽ sử dụng đến typealias.

Ví dụ:
```
typealias UserDestination = (destination:(latitude: Double, longitude: Double))
func showOnMap() -> UserDestination {
}
```

Ví dụ thực tế:

```
protocol URLSessionProtocol {
typealias DataTaskResult = (Data?, URLResponse?, Error?) -> ()
func dataTask(request: URLRequest, completionHandler: @escaping
DataTaskResult) -> URLSessionDataTask
}
```

Một cái gì đó khác nữa mà tôi có thể đề cập là một tuple optional:
```
let client : (String, Bool)? = ("Milos", true)
// this tuple is optional tuple
let client: (String, Bool?) = ("Milos", nil)
// this tuple have optional elements 
```

**Cuối cùng là mẹo kiểm tra phỏng vấn có thể được thực hiện với tuple và chắc chắn bạn sẽ nhận được nhiều điểm hơn :)**
Chúng ta đều biết về thử nghiệm fizzbuzz. Bạn sẽ nhận được một dãy số và bạn sẽ cần kiểm tra số nào chia hết cho hai số còn lại, trong hầu hết các trường hợp là 3 và 5.

```
let numbers = [Int]()
for i in 1...100 {
numbers.append(i)
}

func fizzBuzz(number: Int) {
    switch (number % 3 == 0, number % 5 == 0) {
    case (true, false):
        print("Fizz")
    case (false, true):
        print("Buzz")
    case (true, true):
        print("FizzBuzz")
    case (false, false):
        return
    }
}
for i in numbers {
fizzBuzz(i)
}
```

## Phần kết luận
Tôi hy vọng bạn thích điều này, nếu có bất cứ điều gì không rõ ràng về điều này, hoặc bạn có một cái gì đó tuyệt vời hoặc thực sự nâng cao về chủ đề này xin vui lòng bình luận.

Nguồn: Medium