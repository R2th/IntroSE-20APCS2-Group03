Tại WWDC21, Apple giới thiệu đến chúng ta cách tiếp cận mới để xử lý, cancel hay điều hướng các tác vụ đồng bộ trong Swift 5.5, và xây dựng dựa trên công cụ async / await mà tôi đã giới thiệu ở phần trước
Hôm nay hãy cùng tôi tìm hiểu về vấn đề này.

Đối với mục đích trình diễn dễ dàng hơn, đây là một vài hàm ví dụ mà chúng ta có thể làm việc - một hàm không đồng bộ để mô phỏng việc tìm nạp một số chỉ số thời tiết nhất định cho một vị trí cụ thể và một hàm đồng bộ để tính toán số nào nằm ở một vị trí cụ thể trong dãy Fibonacci sự nối tiếp:

```
enum LocationError: Error {
    case unknown
}

func getWeatherReadings(for location: String) async throws -> [Double] {
    switch location {
    case "London":
        return (1...100).map { _ in Double.random(in: 6...26) }
    case "Rome":
        return (1...100).map { _ in Double.random(in: 10...32) }
    case "San Francisco":
        return (1...100).map { _ in Double.random(in: 12...20) }
    default:
        throw LocationError.unknown
    }
}

func fibonacci(of number: Int) -> Int {
    var first = 0
    var second = 1

    for _ in 0..<number {
        let previous = first
        first = second
        second = previous + first
    }

    return first
}
```

Cách tiếp cận không đồng bộ đơn giản nhất được giới thiệu bởi structured concurrency  là khả năng sử dụng thuộc tính `@main` để đi ngay vào ngữ cảnh không đồng bộ, được thực hiện đơn giản bằng cách đánh dấu phương thức `main ()` bằng không đồng bộ, như sau:

```
@main
struct Main {
    static func main() async throws {
        let readings = try await getWeatherReadings(for: "London")
        print("Readings are: \(readings)")
    }
}
```

**Mẹo**: Trước khi phát hành, bạn cũng có thể chạy mã không đồng bộ trực tiếp trong `main.swift` mà không cần sử dụng thuộc tính `@main`. 
Những thay đổi chính được giới thiệu bởi structured concurrency được hỗ trợ bởi hai loại mới, `Task` và `TaskGroup`, cho phép chúng tôi chạy các tác vụ đồng thời theo cách riêng lẻ hoặc theo cách phối hợp. 
Ở dạng đơn giản nhất, bạn có thể bắt đầu công việc đồng thời bằng cách tạo một đối tượng `Task` và chuyển cho nó hoạt động bạn muốn chạy. Điều này sẽ bắt đầu chạy trên background ngay lập tức và bạn có thể sử dụng `await` để đợi giá trị hoàn thành của nó quay trở lại. Vì vậy, chúng ta có thể gọi `fibonacci (of :)` nhiều lần trên background, để tính toán 50 số đầu tiên trong chuỗi:

```
func printFibonacciSequence() async {
    let task1 = Task { () -> [Int] in
        var numbers = [Int]()

        for i in 0..<50 {
            let result = fibonacci(of: i)
            numbers.append(result)
        }

        return numbers
    }

    let result1 = await task1.value
    print("The first 50 numbers in the Fibonacci sequence are: \(result1)")
}
```

Như bạn có thể thấy, tôi cần viết `Task {() -> [Int]` một cách rõ ràng để Swift hiểu rằng nhiệm vụ sẽ trả về, nhưng nếu mã tác vụ của bạn đơn giản hơn thì không cần. Ví dụ, chúng tôi có thể đã viết điều này và nhận được kết quả chính xác như sau:

```
let task1 = Task {
    (0..<50).map(fibonacci)
}
```

Một lần nữa, tác vụ bắt đầu chạy ngay sau khi nó được tạo và hàm `printFibonacciSequence ()` sẽ tiếp tục chạy trên bất kỳ chuỗi nào trong khi các số Fibonacci đang được tính toán. 

**Mẹo**: Hoạt động của task của chúng ta là non-escaping clossure vì tác vụ chạy nó ngay lập tức thay vì lưu trữ nó sau này, có nghĩa là nếu bạn sử dụng `Task` bên trong một lớp hoặc một cấu trúc, bạn không cần phải sử dụng `self` để truy cập thuộc tính hoặc phương thức.

Khi nói đến việc đọc các số đã hoàn thành, hãy chờ `task1.value` sẽ đảm bảo việc thực thi `printFibonacciSequence ()` tạm dừng cho đến khi đầu ra của task sẵn sàng, lúc này nó sẽ được trả về. Nếu bạn thực sự không quan tâm đến những gì tasktrả về - nếu bạn chỉ muốn mã bắt đầu chạy và kết thúc bất cứ khi nào - thì bạn không cần phải lưu trữ nhiệm vụ ở bất kỳ đâu. Đối với các thao tác `Task` gây ra lỗi chưa hoàn thành, việc đọc thuộc tính giá trị củ `Task` của bạn cũng sẽ tự động tạo ra lỗi. Vì vậy, chúng ta có thể viết một hàm thực hiện hai phần công việc cùng một lúc sau đó đợi cả hai hoàn thành:

```
func runMultipleCalculations() async throws {
    let task1 = Task {
        (0..<50).map(fibonacci)
    }

    let task2 = Task {
        try await getWeatherReadings(for: "Rome")
    }

    let result1 = await task1.value
    let result2 = try await task2.value
    print("The first 50 numbers in the Fibonacci sequence are: \(result1)")
    print("Rome weather readings are: \(result2)")
}
```

Trong đoạn mã đó, `Task.checkCancellation () `sẽ nhận ra task đã bị hủy và ngay lập tức ném `CancelError`, nhưng điều đó sẽ không đến được với chúng ta cho đến khi ta cố gắng đọc `task.value`. 

**Mẹo**: Sử dụng `task.result `để nhận giá trị Kết quả chứa các giá trị thành công và thất bại của nhiệm vụ. Ví dụ: trong đoạn mã ở trên, chúng tôi sẽ nhận lại một `Result<String, Error>.`.
Điều này không yêu cầu try call vì bạn vẫn cần xử lý trường hợp thành công hoặc thất bại. Đối với công việc phức tạp hơn, thay vào đó bạn nên tạo `task group` - tập hợp các nhiệm vụ làm việc cùng nhau để tạo ra giá trị hoàn thành. Để giảm thiểu nguy cơ các lập trình viên sử dụng nhóm tác vụ theo những cách nguy hiểm, họ không có trình khởi tạo công khai đơn giản. Thay vào đó, các `task group` được tạo bằng các hàm như `withTaskGroup (): `gọi hàm này với nội dung công việc bạn muốn hoàn thành và bạn sẽ được chuyển vào phiên bản nhóm tác vụ để làm việc. Khi ở trong nhóm, bạn có thể thêm công việc bằng phương thức `async ()` và nó sẽ bắt đầu thực thi ngay lập tức.

**Quan trọng**: Bạn không nên cố gắng sao chép` task group` đó bên ngoài phần thân của `withTaskGroup ()` - trình biên dịch không thể ngăn cản bạn, nhưng bạn sẽ tự gây ra vấn đề cho chính mình. Để xem một ví dụ đơn giản về cách hoạt động của các task group - cùng với việc thể hiện một điểm quan trọng về cách chúng sắp xếp các hoạt động của mình, hãy thử làm như sau:

```
func printMessage() async {
    let string = await withTaskGroup(of: String.self) { group -> String in
        group.async { "Hello" }
        group.async { "From" }
        group.async { "A" }
        group.async { "Task" }
        group.async { "Group" }

        var collected = [String]()

        for await value in group {
            collected.append(value)
        }

        return collected.joined(separator: " ")
    }

    print(string)
}
```

Điều đó tạo ra một `task group` được thiết kế để tạo ra một chuỗi khi hoàn thành, sau đó xếp hàng đợi một số closure bằng cách sử dụng phương thức async () của task group. Mỗi clossure đó trả về một string, sau đó được thu thập vào một mảng string, trước khi được nối thành một string duy nhất và được trả lại để in. 

**Mẹo**: Tất cả các tác vụ trong một task group phải trả về cùng một loại dữ liệu, vì vậy đối với những công việc phức tạp, bạn có thể thấy mình cần phải trả về một enum với các giá trị được liên kết để nhận được chính xác những gì bạn muốn. Một giải pháp thay thế đơn giản hơn được giới thiệu trong một đề xuất Async Let Bindings riêng biệt. 

Mỗi lệnh gọi tới `async () `có thể là bất kỳ loại hàm nào bạn thích, miễn là nó dẫn đến một string. Tuy nhiên, mặc dù các` task group` tự động đợi tất cả các nhiệm vụ con hoàn thành trước khi quay trở lại, khi mã đó chạy, nó sẽ hơi khó khăn với những gì nó sẽ in vì các nhiệm vụ con có thể hoàn thành theo bất kỳ thứ tự nào - chúng tôi có khả năng nhận được “ Hello From Task Group A ” thành “ Hello A Task Group From ”. 

Nếu task group của bạn đang thực thi mã có thể `throw`, bạn có thể xử lý lỗi trực tiếp bên trong nhóm hoặc bên ngoài. Tùy chọn thứ hai đó được xử lý bằng một hàm khác, với `ThrowingTaskGroup ()`, hàm này phải được gọi với hàm try nếu bạn chưa tìm thấy tất cả các lỗi mà mình ném ra. Ví dụ: mẫu mã tiếp theo này tính toán các chỉ số thời tiết cho một số vị trí trong một nhóm, sau đó trả về giá trị trung bình tổng thể cho tất cả các vị trí:

```
func printAllWeatherReadings() async {
    do {
        print("Calculating average weather…")

        let result = try await withThrowingTaskGroup(of: [Double].self) { group -> String in
            group.async {
                try await getWeatherReadings(for: "London")
            }

            group.async {
                try await getWeatherReadings(for: "Rome")
            }

            group.async {
                try await getWeatherReadings(for: "San Francisco")
            }

            // Convert our array of arrays into a single array of doubles
            let allValues = try await group.reduce([], +)

            // Calculate the mean average of all our doubles
            let average = allValues.reduce(0, +) / Double(allValues.count)
            return "Overall average temperature is \(average)"
        }

        print("Done! \(result)")
    } catch {
        print("Error calculating data.")
    }
}
```

Trong trường hợp đó, mỗi lệnh gọi tới async () giống hệt nhau ngoài string location được chuyển vào, vì vậy bạn có thể sử dụng một cái gì đó như cho vị trí ở ["London", "Rome", "San Francisco"] {để gọi async () trong một vòng lặp. Nhóm tác vụ có phương thức hủy bỏ () hủy bất kỳ tác vụ nào bên trong nhóm, nhưng sử dụng async () sau đó sẽ tiếp tục thêm công việc vào nhóm. 

Thay vào đó, bạn có thể sử dụng asyncUnlessCancelt () để bỏ qua việc thêm công việc nếu nhóm đã bị hủy - hãy kiểm tra Boolean trả về của nó để xem liệu công việc đã được thêm thành công hay chưa.