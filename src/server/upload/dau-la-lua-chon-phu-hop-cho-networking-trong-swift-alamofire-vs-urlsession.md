Alamofire và URLSession đều là những framework giúp chúng ta xử lí mạng trong Swift. Điểm khác nhau cơ bản nhất chúng ta biết đó chính là URLSession API là một phần của foundation framework, được phát triển và implement sẵn có bởi Apple, trong khi đó Alamofire cần phải được thêm từ bên ngoài vào thì mới có thể sử dụng. Không ít người cho rằng việc bổ xung thêm framework chỉ để giải quyết những việc đơn giản như xử lí mạng là không cần thiết, trong khi đó việc xây dựng nên một hệ thống xử lí mạng toàn diện chỉ với URLSession API là hoàn toàn có thể với công nghệ hiện giờ. Tuy nhiên mỗi framework điều có nhưng điểm mạnh yếu của riêng nó, trong bài viết này chúng ta hãy cùng tìm hiểu sự khác biệt này và khi nào thì nên thêm Alamofire như một external dependency. 
![](https://images.viblo.asia/fbd7063f-08f1-4474-8f07-1add4668b3c8.png)

## I. Alamofire là gì?

Trong khi URLSession có thể được tìm thấy implement trong source của Apple, chúng ta sẽ phải tới github để tìm [Alamofire](https://github.com/Alamofire/Alamofire). Đây là một open source framework (- hoàn toàn miễn phí và được đóng góp xây dựng bởi cộng đồng) thuộc sở hữu của [Alamofire Software Foundation](https://github.com/Alamofire/Foundation). Nó là một trong những framework nổi tiếng và được sử dụng rộng rãi nhất trên nền tảng ngôn ngữ Swift. Alamofire có thể dễ dàng bảo trì, syntax dễ hiểu và dễ sử dụng. (Cái tên Alamofire bắt nguồn từ tên loài hoa [Alamo Fire flower](https://aggie-horticulture.tamu.edu/wildseed/alamofire.html), đây là loài hoa đại diện cho bang Texas của Mỹ).

## II. Giữa Alamofire và URLSession, cái nào tốt hơn?
Dù cho việc bất tiện trong việc phải thêm external dependence vào project, đa số dev đều ưa dùng Alamorefire hơn cả. Alamofire cũng đã được quảng cáo là “Elegant Networking in Swift”: làm việc với mạng một cách thanh lịch trong Swift, nó được xây dựng trên cơ sở URLSession với mục đích giúp xây dựng hệ thống xử lí mạng đơn giản và dễ dàng hơn.

### 1. Một số tính năng dễ dàng implement hơn với Alamorefire
Alamofire tích hợp rất nhiều logic để xử lý với network request. Điều này có thể giúp bạn tiết kiệm thời gian hơn rất nhiều so với việc tự xây dựng từ những gì có sẵn. Danh sách các tính năng được public trên doc của Alamofire tương đối nhiều, chúng ta sẽ quan tâm đến những tính năng đặc biệt có ích: TLS Certificate and Public Key Pinning và  Dynamically Adapt and Retry Requests. Việc implement chức năng certificate pinning sẽ tốn kha khá thời gian, nhưng Alamofire đã xử lý việc này giúp chúng ta. Về Request Trying, khi request bị fail vì authenticate fail chả hạn, chúng ta có thể dễ dàng refresh lại authentication token và gọi lại request y hệt mà không cần phải implement thêm gì.

Ngoài những chức năng hữu ích trên, syntax để sử dụng Alamofire cũng rất đơn giản và dễ dàng implement đúng như lời quảng cáo, điều này tiệt kiệm cho chúng ta rất nhiều thời gian và công sức.

### 2. Xây dựng network request
Giả dụ chúng ta có một API tạo ra một bảng với tên là "World Record". Với Alamofire, syntax sẽ rất đơn giản:

```
AF.request("https://api.mywebserver.com/v1/board", method: .get, parameters: ["title": "World Records"])
    .validate(statusCode: 200..<300)
    .responseDecodable { (response: DataResponse) in
        switch response.result {
        case .success(let board):
            print("Created board title is \(board.title)") // World Records
        case .failure(let error):
            print("Board creation failed with error: \(error.localizedDescription)")
        }
}
```

Trong khi đó, để đạt được kết quả tương tự với URLSession API thì cần phải xử lý nhiều hơn một chút:

```
enum Error: Swift.Error {
    case requestFailed
}

// Build up the URL
var components = URLComponents(string: "https://api.mywebserver.com/v1/board")!
components.queryItems = ["title": "World Records"].map { (key, value) in
    URLQueryItem(name: key, value: value)
}

// Generate and execute the request
let request = try! URLRequest(url: components.url!, method: .get)
URLSession.shared.dataTask(with: request) { (data, response, error) in
    do {
        guard let data = data,
            let response = response as? HTTPURLResponse, (200 ..< 300) ~= response.statusCode,
            error == nil else {
            // Data was nil, validation failed or an error occurred.
            throw error ?? Error.requestFailed
        }
        let board = try JSONDecoder().decode(Board.self, from: data)
        print("Created board title is \(board.title)") // World Records
    } catch {
        print("Board creation failed with error: \(error.localizedDescription)")
    }
}
```

Qua đây ta có thể thấy Alamofire đã đơn giản hoá mọi việc đi rất nhiều:
*  Request được khởi tạo chỉ sau một bước initializer.
*  Các parameter được encode mặc định.
*  Việc xác nhận hoàn thành chỉ trong một dòng code đơn giản.

Đây có thể là lý do chính tại sao đa số developer ưa thích sử dụng Alamofire hơn. Trong khi sử dụng URLSession sẽ yêu cầu bạn phải xử lý nhiều bước nhưng vẫn phải đảm bảo việc nâng cấp và bảo trì, Alamofire đã cũng cấp tất cả những thứ ta cần.

### 3. Thêm vào một dependency mới có thể phiền toái đến mức nào?
Dù thế nào chúng ta cũng phải cẩn thận khi thêm vào một external dependcy vì có thể tiềm ẩn những nguy cơ ngoài ý muốn. Nếu vô tình thêm và sử dụng một framework từ lâu không cong được bảo trì và nâng cấp, khả năng cao bạn sẽ roi vào hoàn cảnh bế tắc khi không thể tiếp tục nâng cấp app của mình khi apple liên tục cho ra những phiên bản iOS mới.
Đối với Alamofire, chúng ta hông phải lo về vấn đề đó bởi nó được liên tục bảo trì, nâng cấp, kiểm định và sử dụng.

## III. Kết luận
Alamofire cũng thường được đem ra so sánh với [AFNetworking](https://github.com/AFNetworking/AFNetworking), nền tảng xây dựng networking của Objective-CC. Vào thời điểm đó, networking không phải là một việc dễ dàng cho đến khi URLSession API ra đời cùng iOS 7. Chính vì vậy cho nên nười ta sẽ ưu tiên chọn AFNetworking. Ngày nay với URLSession API, việc xử lý network request đã đơn giản đi rất nhiều. Dù sao đi nữa, chính bạn cũng có thể tự mình xây dựng nên một hệ thống networking có riêng mình dựa trên URLSession. Hệ thống này cần phải được kiểm thử và có tiềm năng phát triển song song cùng với project của bạn. Nếu bạn muốn một hệ thống đơn giản, dễ sử dụng và dễ bảo trì nâng cấp thì hãy đến với Alamofire.

Cám ơn mọi người đã theo dõi bài viết này!

Ref: 

https://github.com/Alamofire/Alamofire

https://github.com/Alamofire/Foundation

https://developer.apple.com/documentation/foundation/urlsession

https://medium.com/swift-programming/alamofire-vs-urlsession-a-comparison-for-networking-in-swift-c6cb3bc9f3b8

https://www.reddit.com/r/iOSProgramming/comments/6q24ao/urlsession_vs_alamofire/

https://stackoverflow.com/questions/36470840/what-is-the-advantage-of-using-alamofire-over-nsurlsession-nsurlconnection-for-n