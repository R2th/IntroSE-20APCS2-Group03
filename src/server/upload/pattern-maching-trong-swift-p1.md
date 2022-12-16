Một khía cạnh cực kì hay trong thiết kế Swift là cách nó quản lý để che giấu phần lớn sự phức tạp của nó đằng sau các cấu trúc lập trình đơn giản. Thực hiện một cái gì đó như vòng lặp for hoặc câu lệnh Switch - Ở bề nổi thì cả hai đều hoạt động giống như các ngôn ngữ khác - nhưng ở phía dưới thì hóa ra chúng mạnh hơn nhiều so với vẻ đơn giản của nó

Pattern matching là một trong số đó, đặc biệt nếu xem xét cách mà nó tích hợp vào nhiều khía cạnh khác nhau của ngôn ngữ. Tuần này, chúng ta hãy xem xét một vài khía cạnh trong số đó - và cách kết hợp Pattern matching để có thể  giúp code của bạn ngắn gọn và đẹp hơn.

### Iterative patterns
Giả sử chúng ta đang xây dựng một ứng dụng nhắn tin và chúng ta đang làm việc với một chức năng tìm và lọc tất cả các tin nhắn trong danh sách và xóa những tin nhắn đã được đánh dấu bởi người dùng. Hiện tại, chúng ta có thể sử dụng vòng for với if lồng bên trong như dưới:

```
func deleteMarkedMessages() {
    for message in messages {
        if message.isMarked {
            database.delete(message)
        }
    }
}
```

Cách ở trên chắc chắn là chạy được, nhưng chúng ta có thể làm nó gọn hơn nữa bằng cách sử dụng functional được hỗ trợ sẵn. Đầu tiên là lọc ra những tin nhắn được đánh dấu bởi người dùng và sau đó là sử dụng hàm xoá cho từng phần từ được lọc ra.

```
func deleteMarkedMessages() {
    messages.filter { $0.isMarked }
            .forEach(database.delete)
}
```

Và chúng ta lại có một đoạn code hoàn toàn hợp lệ thực hiện công việc xoá tin nhắn được chọn bởi người dùng, nhưng - tùy thuộc vào sở thích của team và sự quen thuộc với functional programming- giải pháp thứ hai có thể phức tạp hơn một chút. Từ góc độ hiệu năng, nó cũng yêu cầu chúng ta thực hiện hai lần đi qua mảng (một để lọc và một để áp dụng chức năng xóa) thay vì chỉ một lần duy nhất - như trong cách ban đầu.

Mặc dù có nhiều cách để tối ưu hóa việc triển khai thứ hai (ví dụ: bằng cách sử dụng function composition hay lazy collections, cả hai cách này sẽ xem xét kỹ hơn trong các bài viết sắp tới) - hóa ra pattern matching có thể cho phép chúng ta đạt được sự cân bằng khá tốt giữa hai cách.

Sử dụng mệnh đề where, chúng ta có thể đính kèm một pattern để match trực tiếp với vòng lặp ban đầu của chúng ta, để có thể loại bỏ câu lệnh if lồng nhau đó - và cả hai làm cho việc triển khai của chúng ta trở nên đơn giản hơn nhiều - như thế này:

```
func deleteMarkedMessages() {
    for message in messages where message.isMarked {
        database.delete(message)
    }
}
```

Và đó chỉ là phần nổi của tảng băng chìm. Vòng lặp for không chỉ có thể khớp với một pattern bằng cách sử dụng mệnh đề where, nó cũng có thể làm như vậy trong định nghĩa element của chính nó.
Ví dụ, chúng ta đang làm một game có chức năng tìm kiếm người chơi online để tạo phòng. Model phòng của chúng ta sẽ như bên dưới với Players là mảng của optional Player - trong đó nil có nghĩa là chỗ đó vẫn trống và người chơi có thể tham gia vào phòng.

```
struct Match {
    var startDate: Date
    var players: [Player?]
}
```

Bây giờ, giả sử chúng ta muốn đưa ra một danh sách tất cả những người chơi hiện đang trong một trận đấu, không bao gồm giá trị nil. Để làm điều đó, chúng ta cần lặp lại qua mảng người chơi và loại bỏ tất cả các giá trị nil - có thể được thực hiện bằng cách chuyển đổi mảng bằng compactMap hoặc sử dụng câu lệnh if lồng nhau (giống như trước đây) - nhưng nhờ có pattern matching, nó cũng có thể được thực hiện bằng cách sử dụng cú pháp *for case let* như ở dưới:

```
func makePlayerListView(for players: [Player?]) -> UIView {
    let view = PlayerListView()

    for case let player? in players {
        view.addEntryForPlayer(named: player.name,
                               image: player.image)
    }

    return view
}
```
    
Ban đầu, đoạn code ở trên có thể trông hơi lạ, đặc biệt là vì nhiều developer thưởng chi gặp *case* keyword trong *switch* hoặc trong khai báo *enum*. Nhưng nếu chúng ta nghĩ về nó, thì ở trên thực sự tuân theo cùng một loại logic - vì tất cả các optionals thực ra là các giá trị của Optional<'Wrapped'>, và vì Swift pattern matching không phải chỉ có trong câu lệnh switch.


### Switching  optionals 

Tiếp tục chủ đề về optionals - khi mô hình hóa các trạng thái, một cách rất phổ biến là sử dụng một enum để biểu diễn từng trạng thái riêng biệt mà một đối tượng hoặc hoạt động có thể xảy ra. Ví dụ: chúng ta có thể sử dụng enum sau đây để biểu thị trạng thái tải một số dạng dữ liệu:
    
```
enum LoadingState {
    case none
    case loading
    case failed(Error)
}
```

Tuy nhiên, enum ở trên của chúng ta hiện bao gồm một trường hợp gọi là *none*, nó không thực sự là một trạng thái loading nhưng nhiều nhà phát triển vẫn cho vào đề phòng thiếu trường hợp. Và vì chúng ta đã có một cách tích hợp để thể hiện sự thiếu giá trị trong Swift - đó là *optionals* thì trạng thái này bị dư thừa. Vì vậy, hãy để giảm bớt enum LoadingState của chúng ta:

```
enum LoadingState {
    case loading
    case failed(Error)
}
```

Với sự thay đổi ở trên, chúng ta sẽ sử dụng LoadingState? khi muốn hiện thị một trạng thái optional - có vẻ hợp lí, nhưng sẽ khiến chúng ta phải xử lý phức tạp hơn một chút vì chúng ta sẽ phải *unwrap optional* trước khi có thể dùng *switch*.
Rất may, Swift pattern matching một lần nữa giải cứu chúng ta, giống như cách chúng ta sử dụng *?* sau biến *Player* ở ví dụ trên khi bạn muốn xử lý các phần từ trong mảng *optional*.  Chúng ta có thể đặt dấu *?* sau mỗi enum case trong câu lệnh switch để có thể xử lý cả hai trường hợp nil và có giá trị như dưới: 

```
extension ContentViewController: ViewModelDelegate {
    func viewModel(_ viewModel: ViewModel,
                   loadingStateDidChangeTo state: LoadingState?) {
        switch state {
        case nil:
            removeLoadingSpinner()
            removeErrorView()
            renderContent()
        case .loading?:
            removeErrorView()
            showLoadingSpinner()
        case .failed(let error)?:
            removeLoadingSpinner()
            showErrorView(for: error)
        }
    }
}
```

Đoạn code ở trên không chỉ thực sự tiện lợi mà còn giảm số lượng câu lệnh và điều kiện mà chúng ta cần theo dõi, bằng cách biến tất cả mã xử lý trạng thái của chúng ta thành một câu lệnh switch duy nhất 👍

Tham khảo: https://www.swiftbysundell.com/posts/pattern-matching-in-swift?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter