- Một trong những đặc điểm hữu dụng của Swift là quản lý những điểm mạnh và phức tạp của nó dưới những cấu trúc lập trình đơn giản. Lấy ví dụ như vòng lặp for-loop hoặc như switch-case, về cơ bản thì chúng hoạt động giống nhau trong các ngôn ngữ lập trình khác, nhưng tìm hiểu kỹ càng hơn thì chúng có nhiều công dụng hơn là những gì ta đã thấy qua.
- Pattern matching là một trong những điểm mạnh kể trên, đặc biệt là là việc tích hợp nó vào nhiều khía cạnh khác nhau của Swift. Trong bài viết này chúng ta sẽ cùng điểm qua một vài đặc điểm hữu dụng kể trên và thấy pattern matching giúp chúng ta có thể dử dụng những coding-style để nâng cao sự thuận tiện cũng như ngắn gọn hơn như thế nào.
# 1/ Iterative patterns.
- Để tìm hiểu pattern này chúng ta sẽ cùng nhau tìm hiểu một messaging-app, nơi mà chúng ta sẽ làm việc với những func nơi xảy ra những vòng lặp để làm việc với các message trong list để xóa một tin nhắn được đánh dấu bời người dùng. Hiện tại thì chúng ta sẽ cùng implemented để sử dụng vòng lặp cơ bản **for-loop** với những điều kiện (**if-statement**) như sau:
```swift 
func deleteMarkedMessages() {
    for message in messages {
        if message.isMarked {
            database.delete(message)
        }
    }
}
```
- Đoạn code trên vẫn hoạt động bình thường nhưng có thể chúng ta sẽ gặp những bình luận góp ý về việc sử dụng nhiều kiểu khai báo. Ở đây chúng ta sẽ sử dụng nhiều hơn các functional để **filter** array của chúng ta để lọc những message được đánh dấu và cho phép func database.delete cho từng element của collection đã được filter.
```swift
func deleteMarkedMessages() {
    messages.filter { $0.isMarked }
            .forEach(database.delete)
}
```
- Chúng ta đã có một cách tiếp cận hoàn toàn khác nhưng phụ thuộc vào quy định chung cũng như cách sử dụng **functional programing** team bạn mà solution trên đơn giản hay phức tạp. Ở khía cạnh performance đánh giá thì solution thứ 2 cũng yêu cầu chúng ta cần đến 2 array được truyền vào(1 cho bộ lọc và 1 để tiến hành func delete) nhiều hơn so với chỉ 1 như solution đầu tiên.
- Ở solution thứ 2 chúng ta có nhiều cách để optimize( vd như sử dụng func composition hay lazy collection, cả 2 cách trên đều đều cho chúng ta cái nhìn kỹ hơn ở phần tới của bài viết này) , chúng ta có thể có một đánh giá chính xác giữa 2 cách trên.
- Việc sử dụng từ khóa **where**, chúng ta có thể biến pattern này gần giống với nguyên mẫu việc sử dụng **for-loop, if-statement** lồng nhau nhưng đơn giản, dễ sử dụng hơn:
```swift
func deleteMarkedMessages() {
    for message in messages where message.isMarked {
        database.delete(message)
    }
}
```
- Đây là một tip nhỏ cho chúng ta- những người sử dụng Swift. Vòng lặp for-loop không chỉ phù hợp với pattern matching bằng việc sử dụng từ khóa **where** mà nó có thể làm việc với element mà chúng ta định nghĩa riêng.
- Ví dụ ở đây là chúng ta làm việc trên một game giữa những component match-making. Để có một model các match, chúng ta sử dụng **struct** bao gồm start-date của match và một array optional Player
```swift
struct Match {
    var startDate: Date
    var players: [Player?]
}
```
- Tiếp đó chúng ta muốn có một list tất cả các player đang ở trong trận đấu không bao gồm các vị trí trống. Để làm được điều đó, chúng ta phải duyệt qua array players và loạt bỏ các giá trị nil - chúng ta có thể thực hiện công việc chuyển đổi này bằng cách sử dụng **compactMap** hoặc sử dụng **if-statement** lồng nhau như trên. Hãy cảm ơn pattern matching, chúng ta có thể làm tất cả công việc trên với **for case let**:
```swift
func makePlayerListView(for players: [Player?]) -> UIView {
    let view = PlayerListView()

    for case let player? in players {
        view.addEntryForPlayer(named: player.name,
                               image: player.image)
    }

    return view
}
```
- Đoạn code trên trông có vẻ hơi dị chút, có thể chúng ta thường nhìn thấy từ khóa case trong **switch-statement** hoặc khai báo **enum**. Nếu chúng ta suy nghĩ một chút ở đây, đoạn code trên thực hiện rất nhiều công việc trong đó từ việc unwraped **Optional<Wrapped>** để có thể có những giá trị thực khi nào từ khóa case không phải độc quyền của **switch-statement**.

# 2/ Switching on optionals

- Tiếp tục với chủ đề **optional** - khi chúng ta triển khai các model. Thông thường chúng ta có thể sử dụng **enum** để biểu diễn từng state riêng biệt. Lấy ví dụ ở đây, chúng ta có thể theo cách biểu diễn **enum** các state loading của data: 
```swift 
enum LoadingState {
    case none
    case loading
    case failed(Error)
}
```
- Tuy nhiên, **enum** bên trên bao gồm 1 case là **none**, một case mà nó không thực sự là một loading-state mà giống 1 trường hợp ngoại lệ của state. Case này ở đây là một phương án dự phòng, vậy chúng ta cùng nhau cải tiến nó đôi chút:
``` swift 
enum LoadingState {
    case loading
    case failed(Error)
}
```
- Với thay đổi nhỏ ở trên, bây giờ chúng ta có thể sử dụng **LoadingState**? khi chúng ta biểu diễn 1 optional-loading state. Việc làm trên là phù hợp ngoại trừ việc sẽ khiến value khó xử lý hơn với việc chúng ta phải unwraped lần đầu giá trị optinal đó khi sử dụng **switch**.
- Cảm ơn thay với pattern-matching chúng ta cũng có thể để dấu ? đằng sau mỗi enum case trong swith-statement để có thể xử lý các trường hợp nil như sau:
```swift 
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

# 3/ Declarative error handling.
- Tiếp theo, chúng ta sẽ cùng xem cách thức Swift pattern matching có thể để chúng ta implement nhiều cách error handling hiện đại và dễ sử dụng ra sao. Error handling code có thể dễ dàng trở nên phức tạp ngoại trừ việc chúng ta sủ dụng generic cho bất kỳ loại error nào.
- Ví dụ chúng ta cùng handle 4 loại group riêng biệt của error có thể xảy ra khi chúng ta tiến hành request network:
    - Error result từ user không có kết nối internet.
    - Token truy cập của user bị hết hạn
    - Các nỗi khác của network
    - Các loại lỗi khác.
- Hơn cả việc implement sử dụng **if else statement**, với các điều kiện chồng nhau để kiểm tra, chúng ta có thể sử dụng nhiều cách để phù hợp với pattern(implement tất cả logic ở từng khai báo)trong trường hợp này là **switch-case statement:**
```swift 
func handle(_ error: Error) {
    switch error {
    // Matching against a group of offline-related errors:
    case URLError.notConnectedToInternet,
         URLError.networkConnectionLost,
         URLError.cannotLoadFromNetwork:
        showOfflineView()
    // Matching against a specific error:
    case let error as HTTPError where error == .unauthorized:
        logOut()
    // Matching against our networking error type:
    case is HTTPError:
        showNetworkErrorView()
    // Fallback for other kinds of errors:
    default:
        showGenericErrorView(for: error)
    }
}
```
- Bây giờ dễ coi hơn rồi nhưng vẫn cong một điều ở vấn đề trên là chúng ta cần tiến hàng phân loại cho case thứ 2( khi so sánh với **HTTPError**) trong khi ở case thứ 1 chúng ta có thể trực tiếp trực tiếp sử dụng **URLError**.Tại sao lại như vậy?
- Đầu tiên có thể thấy là các loại **Foundation** error được nhận dạng đặc biệt với trình compiler - tất cả được xử lý ngầm. Chúng ta sẽ tìm hiểu ở phần tiếp theo.

# 4/ Under the hood with custom matching.
- Trong khi Swift pattern được kích hoạt qua các syntax cụ thể khác nhau(như** case let**), các logic phù hợp cho các pattern với trình complier hoặc với chính Swift. Cũng như các tính tăng **low-level** khác, logic được triển khai bằng mã Swift bình thường trong thư viện chuẩn(standar library.)
- Ngoại trừ việc Swift sử dụng nhiều toán tử ~= để thực hiện pattern matching, điều đó cho phép chúng ta xác định tình trạng quá tải của các phương thức để cho phép nhiều các chứ năng đi kèm theo đó.
- Để định danh chính xác problem **HTTPError** không được xác định trước đó bằng cách sử dụng URLError như trên thì hãy cùng define các pattern phù hợp hơn với **Error** với **Equatable** error như sau:
```swift 
func ~=<E: Error & Equatable>(rhs: E, lhs: Error) -> Bool {
    return (lhs as? E) == rhs
}
```
- Với các điều trên, chúng ta có thể sử dụng cú pháp đơn giản để xác định các error của chúng ta.
```swift
func handle(_ error: Error) {
    switch error {
    case URLError.notConnectedToInternet,
         URLError.networkConnectionLost,
         URLError.cannotLoadFromNetwork:
        showOfflineView()
    case HTTPError.unauthorized:
        logOut()
    case is HTTPError:
        showNetworkErrorView()
    default:
        showGenericErrorView(for: error)
    }
}
```
- Một điều bổ sung là chúng ta không implement toán tử ~= để liên kết các loại **HTTPError**, chúng ta có thể sử dụng cùng một syntax như trên để liên kết các loại Equatable error trong code của chúng ta,
 
# 5/ Tổng kết:
- Pattern matching thực sự rất hữu dụng không chỉ cho phép chúng ta tùy chọn nhiều hơn về syntax như cách chúng ta sử dụng vòng lặp **for-loop, swift statement** mà còn giàm thiểu số dòng code để thực hiện các logic trên. Điều đó đồng nghĩa code sẽ trở nên chặt chẽ và dễ kiểm soát hơn.
- Mặc dù có nhiều cách khác để sử dụng pattern matching trong Swift mà bài viết chưa có thể nêu ra nhưng tôi hy vọng đã cung cấp cho các bạn một số ý tưởng về các tùy chọn khi sử dụng pattern matching để áp dụng trong các tình huống khác nhau. Thank you and see you next time.