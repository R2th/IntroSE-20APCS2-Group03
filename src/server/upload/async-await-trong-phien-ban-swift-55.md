WWDC21 đã kết thúc, nghĩa là phiên bản beta Swift 5.5 đầu tiên sắp ra mắt và nó đi kèm với một loạt các cải tiến - async / await,  actors, throwing properties và nhiều cải tiến khác.
Hôm nay tôi sẽ giới thiệu đến bạn những thay đổi rất hay liên quan đến việc thực thi các đoạn code bất đồng bộ.

### Async / Await

SE-0296 giới thiệu các hàm không đồng bộ (async) vào Swift, cho phép chúng ta chạy bất đồng bộ các đoạn code đồng bộ. 
Điều này được thực hiện theo hai bước: đánh dấu các hàm không đồng bộ bằng từ khóa không đồng bộ mới, sau đó gọi chúng bằng từ khóa await, tương tự như các ngôn ngữ khác như C # và JavaScript. Để xem async / await giúp ngôn ngữ như thế nào, sẽ hữu ích khi xem cách chúng ta đã giải quyết vấn đề tương tự trước đây. Các trình xử lý hoàn thành thường được sử dụng trong mã Swift để cho phép chúng ta gửi lại các giá trị sau khi một hàm trả về, nhưng chúng có cú pháp phức tạp như bạn sẽ thấy.
Ví dụ: nếu chúng tôi muốn viết mã lấy 100.000 bản ghi thời tiết từ máy chủ, xử lý chúng để tính nhiệt độ trung bình theo thời gian, sau đó tải kết quả trung bình trở lại máy chủ, chúng ta có thể đã viết như sau:

```
func fetchWeatherHistory(completion: @escaping ([Double]) -> Void) {
    // Complex networking code here; we'll just send back 100,000 random temperatures
    DispatchQueue.global().async {
        let results = (1...100_000).map { _ in Double.random(in: -10...30) }
        completion(results)
    }
}

func calculateAverageTemperature(for records: [Double], completion: @escaping (Double) -> Void) {
    // Sum our array then divide by the array size
    DispatchQueue.global().async {
        let total = records.reduce(0, +)
        let average = total / Double(records.count)
        completion(average)
    }
}

func upload(result: Double, completion: @escaping (String) -> Void) {
    // More complex networking code; we'll just send back "OK"
    DispatchQueue.global().async {
        completion("OK")
    }
}
```

Tôi đã thay thế mã networking thực tế bằng các giá trị giả vì phần networking không liên quan ở đây. Điều quan trọng là mỗi hàm trong số đó có thể mất một khoảng thời gian để chạy, vì vậy thay vì chặn việc thực thi hàm và trả về giá trị trực tiếp, thay vào đó, chúng tôi sử dụng lệnh đóng hoàn thành để chỉ gửi một thứ gì đó trở lại khi chúng tôi đã sẵn sàng. Khi nói đến việc sử dụng mã đó, chúng ta cần gọi chúng từng cái một trong một chuỗi, cung cấp các kết thúc hoàn thành cho từng cái để tiếp tục chuỗi, như sau:

```
fetchWeatherHistory { records in
    calculateAverageTemperature(for: records) { average in
        upload(result: average) { response in
            print("Server response: \(response)")
        }
    }
}
```

Hy vọng rằng bạn có thể thấy các vấn đề với cách tiếp cận này: 
- Các hàm đó có thể gọi completionHandler của chúng nhiều lần hoặc quên gọi nó hoàn toàn. 
- Cú pháp tham số` @escaping (String) -> Void` có thể khó đọc. 
- Tại trang web cuộc gọi, chúng tôi kết thúc với cái gọi là kim tự tháp của sự diệt vong, với mã ngày càng thụt vào cho mỗi trình completionHandler.
-  Cho đến khi Swift 5.0 thêm loại `Result`, việc gửi lại lỗi với các completionHandler đã khó hơn. 
Từ Swift 5.5, giờ đây chúng ta có thể dọn dẹp các hàm của mình bằng cách đánh dấu chúng là không đồng bộ trả về một giá trị thay vì dựa vào các trình xử lý hoàn thành, như thế này:

```
func fetchWeatherHistory() async -> [Double] {
    (1...100_000).map { _ in Double.random(in: -10...30) }
}

func calculateAverageTemperature(for records: [Double]) async -> Double {
    let total = records.reduce(0, +)
    let average = total / Double(records.count)
    return average
}

func upload(result: Double) async -> String {
    "OK"
}
```

Điều đó đã loại bỏ rất nhiều cú pháp xung quanh việc trả về các giá trị không đồng bộ, nhưng tại call site, nó thậm chí còn rõ ràng hơn:

```
func processWeather() async {
    let records = await fetchWeatherHistory()
    let average = await calculateAverageTemperature(for: records)
    let response = await upload(result: average)
    print("Server response: \(response)")
}
```

Như bạn có thể thấy, tất cả các dấu đóng và thụt lề đã biến mất, tạo nên thứ đôi khi được gọi là "straight line code” - ngoài các từ khóa await, nó trông giống như mã đồng bộ. Có một số quy tắc đơn giản, cụ thể về cách hoạt động của các hàm không đồng bộ:

- Các hàm đồng bộ không thể chỉ gọi trực tiếp các hàm không đồng bộ - điều đó sẽ không hợp lý, vì vậy Swift sẽ gây ra lỗi. 
- Các hàm không đồng bộ có thể gọi các hàm không đồng bộ khác, nhưng chúng cũng có thể gọi các hàm đồng bộ thông thường nếu cần. 
- Nếu bạn có các hàm không đồng bộ và hàm đồng bộ có thể được gọi theo cùng một cách, Swift sẽ ưu tiên chọn hàm nào phù hợp với ngữ cảnh hiện tại của bạn - nếu call site hiện không đồng bộ thì Swift sẽ gọi hàm không đồng bộ, nếu không nó sẽ gọi hàm đồng bộ.

Điểm cuối cùng đó là quan trọng, bởi vì nó cho phép các tác giả thư viện cung cấp cả phiên bản đồng bộ và không đồng bộ của mã của họ mà không cần phải đặt tên cho các hàm không đồng bộ một cách đặc biệt. Việc bổ sung async / await hoàn toàn phù hợp cùng với try / catch, có nghĩa là các hàm async và trình khởi tạo có thể tạo ra lỗi nếu cần. Điều kiện duy nhất ở đây là Swift thực thi một thứ tự cụ thể cho các từ khóa và thứ tự đó được đảo ngược giữa call site và chức năng. Ví dụ: chúng tôi có thể có các hàm cố gắng tìm nạp một số người dùng từ một máy chủ và lưu vào bộ nhớ, cả hai hàm này đều có thể không thành công bằng cách tạo ra các lỗi:

```
enum UserError: Error {
    case invalidCount, dataTooLong
}

func fetchUsers(count: Int) async throws -> [String] {
    if count > 3 {
        // Don't attempt to fetch too many users
        throw UserError.invalidCount
    }

    // Complex networking code here; we'll just send back up to `count` users
    return Array(["Antoni", "Karamo", "Tan"].prefix(count))
}

func save(users: [String]) async throws -> String {
    let savedUsers = users.joined(separator: ",")

    if savedUsers.count > 32 {
        throw UserError.dataTooLong
    } else {
        // Actual saving code would go here
        return "Saved \(savedUsers)!"
    }
}
```

Khi nói đến việc gọi chúng, thứ tự của các từ khóa được lật để `try await` thay vì `await try`, như thế này:

```
func updateUsers() async {
    do {
        let users = try await fetchUsers(count: 3)
        let result = try await save(users: users)
        print(result)
    } catch {
        print("Oops!")
    }
}
```

Vì vậy, "asynchronous, throwing" trong định nghĩa hàm, nhưng "throwing, asynchronous" tại call site - hãy nghĩ về nó như là mở một ngăn xếp. Không chỉ `try await` đọc tự nhiên hơn một chút so với  `await try`, mà còn phản ánh nhiều hơn những gì đang thực sự xảy ra: chúng tôi đang đợi một số công việc hoàn thành và khi hoàn thành, nó có thể kết thúc. 
Với tính năng async / await hiện có trong chính Swift, kiểu `Result` được giới thiệu trong Swift 5.0 trở nên ít quan trọng hơn nhiều vì một trong những lợi ích chính của nó là cải thiện trình xử lý hoàn thành. Điều đó không có nghĩa là `Result` là vô dụng, vì đây vẫn là cách tốt nhất để lưu trữ kết quả của một hoạt động để đánh giá sau này. 
Quan trọng: Làm cho một hàm không đồng bộ không có nghĩa là nó chạy đồng thời một cách kỳ diệu với mã khác, có nghĩa là trừ khi bạn chỉ định cách khác gọi nhiều hàm không đồng bộ sẽ vẫn chạy chúng tuần tự. Tất cả các hàm không đồng bộ mà bạn đã thấy cho đến nay lần lượt được gọi bằng các hàm không đồng bộ khác, điều này có chủ đích: được thực hiện bởi bản thân đề xuất Swift Evolution này không thực sự cung cấp bất kỳ cách nào để chạy mã không đồng bộ từ một ngữ cảnh đồng bộ. 

### Async/await: sequences

SE-0298 giới thiệu khả năng lặp qua các chuỗi giá trị không đồng bộ bằng cách sử dụng giao thức `AsyncSequence` mới. Điều này hữu ích cho những nơi khi bạn muốn xử lý các giá trị theo trình tự khi chúng có sẵn thay vì tính toán trước tất cả chúng cùng một lúc - có lẽ vì chúng mất thời gian để tính toán hoặc vì chúng chưa có sẵn.
Sử dụng `AsyncSequence` gần giống như sử dụng `Sequence`, ngoại trừ các kiểu của bạn phải tuân theo `AsyncSequence` và `AsyncIterator`, và phương thức `next ()` của bạn phải được đánh dấu là không đồng bộ. Khi đến lúc trình tự của bạn kết thúc, hãy đảm bảo rằng bạn gửi lại `nil` từ `next ()`, giống như với Trình tự.
Ví dụ: chúng tôi có thể tạo một chuỗi DoubleGenerator bắt đầu từ 1 và nhân đôi số của nó mỗi khi nó được gọi:

```
struct DoubleGenerator: AsyncSequence {
    typealias Element = Int

    struct AsyncIterator: AsyncIteratorProtocol {
        var current = 1

        mutating func next() async -> Int? {
            defer { current &*= 2 }

            if current < 0 {
                return nil
            } else {
                return current
            }
        }
    }

    func makeAsyncIterator() -> AsyncIterator {
        AsyncIterator()
    }
}
```

Mẹo: Nếu bạn chỉ xóa “async” khỏi mọi nơi nó xuất hiện trong mã đó, bạn có một `Sequence` hợp lệ thực hiện chính xác cùng một việc - đó là mức độ tương tự của hai chuỗi này. Khi bạn có trình tự không đồng bộ của mình, bạn có thể lặp lại các giá trị của nó bằng cách sử dụng` for await` trong ngữ cảnh không đồng bộ, như sau:

```
func printAllDoubles() async {
    for await number in DoubleGenerator() {
        print(number)
    }
}
```

Giao thức AsyncSequence cũng cung cấp các triển khai mặc định của nhiều phương thức phổ biến, chẳng hạn như map (), compactMap (), allSatisfy (), v.v. Ví dụ: chúng tôi có thể kiểm tra xem trình tạo của chúng tôi có xuất ra một số cụ thể như sau hay không:

```
func containsExactNumber() async {
    let doubles = DoubleGenerator()
    let match = await doubles.contains(16_777_216)
    print(match)
}
```