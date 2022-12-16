> Một thách thức khi đề cập đến tính đồng thời trên các nền tảng của Apple là giao diện người dùng của ứng dụng. Phần lớn, việc cập nhật giao diện người dùng chỉ có thể được thực hiện trên main thread . Vì vậy, bất cứ khi nào chúng ta thực hiện bất kỳ loại công việc nào trên background thread (trực tiếp hoặc gián tiếp), thì chúng ta luôn phải đảm bảo quay trở lại hàng đợi chính trước khi truy cập bất kỳ thuộc tính, phương thức hoặc hàm nào liên quan đến việc hiển thị giao diện người dùng của chúng ta. Về lý thuyết, điều đó nghe có vẻ đơn giản. Trên thực tế, việc vô tình thực hiện cập nhật giao diện người dùng trên hàng đợi background rất phổ biến - điều này có thể gây ra trục trặc hoặc thậm chí đặt ứng dụng ở trạng thái không nhất quán hoặc không xác định, do đó có thể dẫn đến crash và các lỗi khác.

> Rất may, Swift 5.5 đang giới thiệu những gì có thể sẽ trở thành một giải pháp mạnh mẽ hơn và gần như hoàn toàn tự động đề giải quyết vấn đề rất phổ biến này, đó chính là **MainActor** . **MainActor** là một thuộc tính mới cung cấp một trình thực thi, thực hiện các tác vụ của nó trên main thread. Sử dụng thuộc tính `@MainActor` sẽ giúp bạn đảm bảo giao diện người dùng của mình luôn được cập nhật trên main thread.

### 1. MainActor là gì?

Như tên gọi của nó :rofl: , hiểu nôm na **MainActor** là một "diễn viên chính" duy nhất toàn cục thực hiện các tác vụ của mình trên main thread. Nó được sử dụng cho các thuộc tính, phương thức, instances và các closures để thực hiện các nhiệm vụ trên main thread và nó kế thừa giao thức `GlobalActor`.

### 2. Tìm hiểu về Global Actor 

Global Actors có thể được coi là các `Singletons`:  chỉ có duy nhất một instance. Hiện tại, các Global Actor chỉ hoạt động bằng cách cho phép thử nghiệm đồng thời. Bạn có thể làm như vậy bằng cách thêm giá trị sau vào flag `“Other Swift Flags”`  trong phần build settings của Xcode:

```
-Xfrontend -enable-experimental-concurrency
```

Khi đã kích hoạt, chúng ta có thể xác định Global Actor của riêng mình như sau:

```
@globalActor
actor EvalActor {
    static let shared = EvalActor()
}
```

Thuộc tính được chia sẻ là một yêu cầu của giao thức `GlobalActor`  và đảm bảo có một instance `Global Actor` duy nhất. Sau khi được định nghĩa, bạn có thể sử dụng global actor trong suốt dự án của mình:

```
@EvalActor
final class EvalFetcher {
    // ..
}
```

### 3. Làm thế nào để sử dụng MainActor trong Swift?

Một global actor có thể được sử dụng với các thuộc tính, phương thức, closures và instance. Ví dụ: chúng ta có thể thêm thuộc tính main actor vào một view model để làm cho nó thực hiện tất cả các tác vụ của nó trên main thread:

```
@MainActor
final class HomeViewModel {
    // ..
}
```

Trong các trường hợp khác, chúng ta có thể muốn xác định các thuộc tính riêng lẻ với một global actor:

```
final class HomeViewModel {
    
    @MainActor var images: [UIImage] = []

}
```

Đánh dấu thuộc tính `images` với thuộc tính `@MainActor` để đảm bảo rằng nó chỉ có thể được cập nhật từ main thread:

![](https://images.viblo.asia/05b79be9-d04c-4616-ad1c-3d9f0690c35e.png)


Các phương thức riêng lẻ cũng có thể được đánh dấu bằng thuộc tính:

```
@MainActor func updateViews() {
    // Perform UI updates..
}
```

Và ngay cả các closure cũng có thể được đánh dấu để thực hiện trên main thread:

```
func updateData(completion: @MainActor @escaping () -> ()) {
    /// Example dispatch to mimic behaviour
    DispatchQueue.global().async {
        async {
            await completion()
        }
    }
}
```

### 4. Sử dụng trực tiếp MainActor

MainActor trong Swift đi kèm với extension để sử dụng trực tiếp:

```
@available(macOS 12.0, iOS 15.0, watchOS 8.0, tvOS 15.0, *)
extension MainActor {

    /// Execute the given body closure on the main actor.
    public static func run<T>(resultType: T.Type = T.self, body: @MainActor @Sendable () throws -> T) async rethrows -> T
}
```

Điều này cho phép chúng ta sử dụng **MainActor** trực tiếp từ bên trong các phương thức, ngay cả khi chúng ta không xác định bất kỳ phần thân nào của nó bằng cách sử dụng thuộc tính global actor:


```
async {
    await MainActor.run {
        // Perform UI updates
    }
}
```

Nói cách khác,  chúng ta không có nhu cầu thực sự để sử dụng `DispatchQueue.main.async` nữa.

### 5. Khi nào chúng ta nên sử dụng thuộc tính MainActor?

Trước Swift 5.5, bạn có thể đã xác định nhiều câu lệnh điều phối để đảm bảo các tác vụ đang chạy trên main thread. Một ví dụ như sau:

```
func fetchData(completion: @escaping (Result<[UIImage], Error>) -> Void) {
    URLSession.shared.dataTask(with: URL(string: "..some URL")) { data, response, error in
        // .. Decode data to a result
        
        DispatchQueue.main.async {
            completion(result)
        }
    }
} 
```

Trong ví dụ trên, chúng ta khá chắc chắn rằng cần phải có một dispatch. Tuy nhiên, dispatch có thể không cần thiết trong các trường hợp khác vì chúng ta đã ở trên main thread. Làm như vậy sẽ dẫn đến một dispatch bổ sung có thể đã bị bỏ qua.

Dù bằng cách nào đi nữa, trong những trường hợp đó, việc xác định các thuộc tính, phương thức, instance hoặc closures là main actor để đảm bảo các tác vụ đang thực hiện trên main thread là rất hợp lý. Ví dụ, chúng ta có thể viết lại ví dụ trên như sau:

```
func fetchData(completion: @MainActor @escaping (Result<[UIImage], Error>) -> Void) {
    URLSession.shared.dataTask(with: URL(string: "..some URL")!) { data, response, error in
        // .. Decode data to a result
        let result: Result<[UIImage], Error> = .success([])
        
        async {
            await completion(result)
        }
    }
}
```

Khi chúng ta đang làm việc với một closure do actor xác định, chúng ta cần sử dụng kỹ thuật async await để gọi vào closure của chúng ta. Sử dụng thuộc tính `@MainActor` ở đây cho phép trình biên dịch Swift tối ưu hóa hiệu suất code của chúng ta.

### 6. Chọn chiến lược phù hợp

Điều quan trọng là chọn chiến lược phù hợp với các actor. Trong ví dụ trên, chúng ta quyết định đặt việc closure là một actor, có nghĩa là bất kỳ ai đang sử dụng phương thức của chúng ta, thì lệnh gọi lại hoàn thành sẽ được thực hiện bằng MainActor. Trong một số trường hợp, điều này có thể không có ý nghĩa nếu phương thức yêu cầu dữ liệu cũng được sử dụng từ một nơi không quan trọng để xử lý lệnh gọi lại hoàn thành trên main thread.

Trong những trường hợp đó, tốt hơn hết là khiến những người triển khai chịu trách nhiệm gửi đến đúng hàng đợi:

```
viewModel.fetchData { result in
    async {
        await MainActor.run {
            // Handle result
        }
    }
}
```

### 7. Kết luận

Theo thời gian, khi hầu hết code không đồng bộ của chúng ta đã được di chuyển sang hệ thống đồng thời mới của Swift. MainActor hy vọng sẽ ít nhiều loại bỏ việc chúng ta phải gửi các update UI của mình theo cách thủ công trên main queue. Tất nhiên, điều đó không có nghĩa là chúng ta không còn phải xem xét các vấn đề về luồng và các vấn đề đồng thời khác khi thiết kế API và kiến trúc của chúng ta, nhưng ít nhất vấn đề rất phổ biến đó là vô tình thực hiện update UI trên hàng đợi background tại một số điểm hy vọng sẽ trở thành một vấn đề của quá khứ.

Hy vọng rằng, điều này sẽ giúp bạn trong việc code hiệu quả hơn 😍.

Vậy là bài viết của mình đến đây là hết 😁. Cảm ơn các bạn đã theo dõi bài viết. 😃