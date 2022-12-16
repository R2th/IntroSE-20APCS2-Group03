Swift 5.0 là phiên bản chính tiếp theo của Swift và mang lại sự ổn định cho ABI từ lâu. Tuy nhiên, đó không phải là tất cả: một số tính năng mới quan trọng đã được triển khai, bao gồm chuỗi thô, trường hợp enum trong tương lai, loại Kết quả, kiểm tra bội số nguyên và hơn thế nữa

Như các bạn đã biết thì Swift 5 sắp ra mắt chính thức trong thời gian tới với một số feature mới được thêm. Bao gồm Raw String, future enum cases, Result Type... 

**I. Result Type**

Result Type sinh ra giúp chúng ta xử lý errors đơn giản hơn, rõ ràng hơn đặc biệt là làm việc với API. 

Result Type phần nào cũng giống với enum khi có hai trường hợp: Success và Failure. 

Bây giờ ta thử viết một request đến server nhưng với URL không hợp lệ. Trước tiên ta viết một enum để kiểm tra trường hợp này như sau: 

```
enum NetworkError: Error {
    case badURL
}
```

Ta viết một function trong đó tham số đầu tiên là URL để request và thứ hai là một closure để xử lý khi việc tiến hành với API hoàn thành. Trong closure này ta sẽ có output là Result với 2 case : Nếu success sẽ có kết quả trả về là số lượng bài viết trong viblo của bạn. Còn nếu failure ta sẽ xử lý các case error với enum NetworkError. 

```
func fetchMyPostCount(from urlString: String, completionHandler: @escaping (Result<Int, NetworkError>) -> Void)  {
    guard let url = URL(string: urlString) else {
        completionHandler(.failure(.badURL))
        return
    }

    // complicated networking code here
    print("Fetching \(url.absoluteString)...")
    completionHandler(.success(5))
}
```

Và để kiểm tra xem function call API này hoạt động thế nào thì ta kiểm tra giá trị mà Result trả về là success hay failure ta viết như sau : 

```
fetchMyPostCount(from: "https://www.viblo.asia") { result in
    switch result {
    case .success(let count):
        print("\(count) unread messages.")
    case .failure(let error):
        print(error.localizedDescription)
    }
}
```

Có một số lưu ý nữa về Result đó là. Result có một method get () trả về giá trị success nếu nó tồn tại hoặc throw error theo cách khác. Điều này cho phép bạn chuyển đổi Result thành một throw call như thế này:

```
fetchMyPostCount(from: "https://www.viblo.asia") { result in
    if let count = try? result.get() {
        print("\(count) unread messages.")
    }
}
```


Tiếp theo, thay vì sử dụng một enum lỗi cụ thể mà bạn đã tạo, bạn cũng có thể sử dụng Error protocol. Vì vậy, thay vì sử dụng Result <Int, NetworkError> bạn có thể sử dụng Result <Int, Error>. Mặc dù điều này có nghĩa là bạn mất đi sự an toàn của các throw types, nhưng bạn có khả năng liệt kê được nhiều loại lỗi khác nhau, tuỳ thuộc từng trường hợp.


**II. Raw String**

Thông thường chúng ta viết một String trong dấu ngoặc kép ví dụ : 

`let yourFeel = "Tôi yêu Viblo" `

Nhưng với raw string bạn sẽ khai báo như sau: 

l`et yourfeel = #"Tôi yêu Viblo"#`

Raw string cũng làm việc được với dấu ngoặc chéo ngược : \

`let keypaths = #"Swift keypaths such as \Person.name hold uninvoked references to properties."#`

Gán các kiểu khác vào cùng String như sau: 

```
let answer = 42
let dontpanic = #"The answer to life, the universe, and everything is \#(answer)."#
```

Multi line với raw string rất đơn giản và hiệu quả :D .  Ta viết #"" ở bắt đầu String và kết thúc bằng ""#

```
let multiline = #"""
The answer to life,
the universe,
and everything is \#(answer).
"""#
```

Còn một số điều thú vị trong Swift 5 mà tôi cần phải tìm hiểu kỹ trước khi muốn chia sẻ cho các bạn. Các bạn hãy chờ tôi ở phần II nhé. 
Để dùng thử Swift 5 các bạn hãy vào https://developer.apple.com/download/ để tải xcode 10.2 beta nhé. Chúc các bạn có trải nghiệm vui vẻ !