Note:
*  Link bài dịch: https://medium.com/swift-programming/alamofire-vs-urlsession-a-comparison-for-networking-in-swift-c6cb3bc9f3b8

Alamofire và URLSession đều giúp bạn tạo những request network trong Swift. URLSession API là một phần của foundation framework. Trong khi Alamofire cần phải được thêm vào như một phần phụ thuộc bên ngoài. Nhiều developer nghi ngờ liệu có cần thêm phụ thuộc vào một thứ cơ bản như networking trong Swift. Cuối cùng, hoàn toàn có thể thực hiện một networking layer với API URLSession, cái mà ngày nay có sẵn.

Blog này so sánh cả hai framework và tìm ra khi nào cần thêm Alamofire như một phụ thuộc bên ngoài.

# Alamofire là gì
![](https://images.viblo.asia/bbaa7aaf-ffdd-47af-9025-51216be593d9.png)

URLSession có thể được tìm thấy trong Foundation framework tiêu chuẩn. Chúng ta phải lên Github để tìm [Alamofire](https://github.com/Alamofire/Alamofire). Nó là một framework mã nguồn mở và được sở hữu bởi [Alamofire Software Foundation](https://github.com/Alamofire/Foundation). Framework này rất phổ biến, bạn có thể đọc những số liệu thống kê ngay tại thời điểm bài viết này đang được viết:
*  164 người đóng góp
*  Hơn 30K sao
*  42 triệu người tải xuống theo thống kê của CocoaPods và hơn 600 nghìn ứng dụng đang sử dụng nó

Các số liệu thống kê này cho thấy nó là một trong những framework Swift phổ biến nhất hiện có. Nó là một framework duy trì tốt, thường được sử dụng sẽ giúp bạn triển khai networking trong ứng dụng của bạn.

> Alamofire được đặt theo tên của loài hoa Alamo Fire, một biến thể lai của Bluebonnet, loài hoa chính thức của bang Texas.

# So sánh Alamofire và URLSession
Tôi đã hỏi những người follow tối trên Twitter rằng họ thích sử dụng cái gì hơn: Alamofire hay URLSession. Link tại [đây](https://twitter.com/twannl/status/1089142858848894976?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1089142858848894976%7Ctwgr%5E&ref_url=https%3A%2F%2Fcdn.embedly.com%2Fwidgets%2Fmedia.html%3Ftype%3Dtext2Fhtmlkey%3Da19fcc184b9711e1b4764040d3dc5c07schema%3Dtwitterurl%3Dhttps3A%2F%2Ftwitter.com%2Ftwannl%2Fstatus%2F1089142858848894976image%3Dhttps3A%2F%2Fi.embed.ly%2F1%2Fimage3Furl3Dhttps253A252F252Fpbs.twimg.com252Fprofile_images252F940988966362320897252F3Sez5sy8_400x400.jpg26key3Da19fcc184b9711e1b4764040d3dc5c07).

![](https://images.viblo.asia/d3ecfcfb-46eb-4b54-8280-219dba3072ad.png)

Nó chỉ ra rằng có một sự tách biệt rõ ràng giữa các developer thích sử dụng Alamofire hoặc URLSession. Một câu hỏi lớn tại đây là liệu họ chỉ thích nó hay liệu họ thực sự chọn theo framework của sự lựa chọn tốt.

Alamofire đang được quảng cáo như "Elegant Networking in Swift" điều này cho thấy một chút ý định của nó. Nó là một lớp trên của URLSession với mục tiêu là làm cho các tính năng mạng chung dễ dàng triển khai hơn.

# Các tính năng dễ thực hiện hơn với Alamofire
Alamofire chứa nhiều logic bổ sung ngoài việc xây dựng một networking request.  Những tính năng này có thể tạo ra sự khác biệt và đôi khi có thể giúp bạn tiết kiệm rất nhiều thời gian so với việc tự xây dựng chúng.

Danh sách các tính năng được quảng cáo trên repository readme của họ rất dài, từ đó chỉ một vài trong số chúng thực sự mang lại giá trị:
* Certificate. Cái mà có thể mất một chút thời gian để sắp xếp và xây dựng.
* Retrying Requests. Ví dụ khi một request bị lỗi xác thực, bạn có thể dễ dàng refresh lại token authentication của mình, và gọi lại request tương tự mà không cần chạm vào code.

Ngoài những tính năng này, cú pháp để xây dựng một request dễ sử dụng hơn rất nhiều. Nó giúp bạn tiết kiệm rất nhiều code, làm cho việc xác thực và xử lý lỗi đơn giản hơn rất nhiều.

Thường được coi là một lợi thế là trình quản lý khả năng tiếp cận mạng. Tuy nhiên, kể từ iOS 12, chúng ta cũng có thể sử dụng [API NWPathMonitor](https://developer.apple.com/documentation/network/nwpathmonitor) mới .

# So sánh việc xây dựng một network request
Giả sử có một API cho phép chúng ta tạo mới một bảng với title "New York Highlights". Đối với điều này, sử dụng code Alamofire một cách dễ dàng
```
AF.request("https://api.mywebserver.com/v1/board", method: .get, parameters: ["title": "New York Highlights"])
    .validate(statusCode: 200..<300)
    .responseDecodable { (response: DataResponse) in
        switch response.result {
        case .success(let board):
            print("Created board title is \(board.title)") // New York Highlights
        case .failure(let error):
            print("Board creation failed with error: \(error.localizedDescription)")
        }
}
```
 
 Làm tương tự với URLSession yêu cầu công việc nhiều hơn một chút.
```
enum Error: Swift.Error {
    case requestFailed
}

// Build up the URL
var components = URLComponents(string: "https://api.mywebserver.com/v1/board")!
components.queryItems = ["title": "New York Highlights"].map { (key, value) in
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
        print("Created board title is \(board.title)") // New York Highlights
    } catch {
        print("Board creation failed with error: \(error.localizedDescription)")
    }
}
```
Điều này cho thấy sức mạnh thực sự của Alamofire như một framework giúp cho rất nhiều thứ đơn giản hơn:
* Một request được xây dựng với một trình khởi tạo duy nhất
* Bộ mã hoá URL đang mã hoá các thông số theo mặc định
* Việc xác thực được thực hiện inline với một one-liner đơn giản và chuyển đổi thành một strongly typed error nếu việc xác thực lỗi.  Enum result response sẽ trả về lỗi này bên trong trường hợp lỗi này.
* Một generic completion callback giúp dễ dàng giải mã response thành  kiểu "Bảng" mà chúng tôi đã custom. 

Đây chỉ có thể là lý do để bạn chọn Alamofire và nó làm cho cuộc sống của bạn dễ dàng hơn. Với việc sử dụng URLSession bạn có thể kết thúc việc tạo vỏ bọc cho mình, điều này yêu cầu maintenance và testing. Lúc đầu, đây có vẻ là một quyết định tốt hơn so với việc thêm một phụ thuộc mới, nhưng khi các dự án phát triển, networking layer của riêng bạn phát triển dễ dàng và trở nên phức tạp hơn.

# Thêm Alamofire như một phụ thuộc sẽ tệ như thế nào?
Hãy làm rõ rằng bạn phải cẩn thận khi thêm phụ thuộc bên ngoài vào dự án của mình. Khi nó không được duy trì, đã thử nghiệm hoặc chưa sử dụng nhiều, nó có thể thêm rủi ro cho dự án của bạn. Cuối cùng, bạn có thể phải tự mình tiếp tục phát triển.

Trong trường hợp của Alamofire, bạn không thực sự phải lo lắng về điều đó. Framework được duy trì, thử nghiệm và sử dụng tốt. Framework này khá nhỏ và làm cho việc viết những request network dễ dàng và clear hơn. 

# Kết luận: Làm thế nào để đưa ra quyết định?
Alamfore thường được so sánh với AFNetworking, framework Objective-C tương đương cho networking. Vào thời điểm đó, làm việc với networking khó khăn hơn rất nhiều do không có URLSession, cái mà chỉ tồn tại từ iOS7. Vì thế, rõ ràng hơn là chọn một framework như AFNetworking để làm cuộc sống của bạn dễ dàng hơn.

Ngày nay, nhìn vào các API URLSession có sẵn, việc xây dựng network request dễ dàng hơn rất nhiều. Tuy nhiên, làm như vậy có thể sẽ giúp bạn hướng tới việc xây dựng layer networking của bạn trên top của URLSession. Lớp này cần được kiểm tra và có khả năng phát triển theo hướng phức tạp hơn khi dự án của bạn phát triển.

Với suy nghĩ đó, thực tế là Alamofire được bảo trì tốt và được sử dụng bởi rất nhiều dự án, bạn có thể tiết kiệm cho mình rất nhiều rắc rối và thời gian bằng cách thêm Alamofire làm phụ thuộc.