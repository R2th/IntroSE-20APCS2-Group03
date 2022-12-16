Việc thêm các tính năng mới vào một ứng dụng hoặc framework thường bao gồm việc thêm các arguments mới vào các hàm hiện có. Chúng tôi có thể cần một cách mới để tùy chỉnh một hoạt động phổ biến hoặc để thực hiện một chút tinh chỉnh cho một hàm nào đó, để có thể tích hợp tính năng mới với phần code đã có sẵn.
Mặc dù hầu hết các thay đổi như vậy có vẻ bình thường, nhưng nếu chúng ta không cẩn thận, theo thời gian sẽ dẫn đến mở rộng phạm vi của một hàm một cách đáng kể, vượt xa những gì nó được thiết kế ban đầu - có một chút không rõ ràng và cồng kềnh để sử dụng.
Trong bài viết này, chúng ta hãy xem xét cách xử lý các hàm như vậy và cách đơn giản hóa các hàm bằng cách giảm số đối số.
## Growing pains
Hãy bắt đầu bằng cách xem xét một ví dụ. Ở đây chúng tôi có một chức năng để hiển thị user profile:
```
func presentProfile(animated: Bool) {
    ...
}
```
Rất đơn giản. Tuy nhiên, theo thời gian, vì các tính năng mới được thêm vào ứng dụng - chúng ta có thể thấy cần thêm nhiều tùy chọn hơn vào chức năng trên - chuyển đổi những gì ban đầu cực kỳ đơn giản thành một thứ phức tạp hơn nhiều:
```
func presentProfile(animated: Bool,
                    duration: TimeInterval = 0.3,
                    curve: UIViewAnimationCurve = .easeInOut,
                    completionHandler: (() -> Void)? = nil) {
    ...
}
```
Hàm trên không phải là xấu (nó tuân theo các Swift API design conventions hiện đại nhất), nhưng nó bắt đầu trở nên hơi khó hiểu, và nó thiếu sự đơn giản của phiên bản gốc của nó. Nó cũng dễ dàng theo một xu hướng ở đây - Chức năng trên có khả năng không ngừng phát triển, như các tính năng mới chắc chắn cũng sẽ yêu cầu các tùy chọn mới tương tự.
## Reducing ambiguity
Một lý do phổ biến mà các hàm có danh sách đối số dài có thể khó hiểu hơn là vì chúng thường bắt đầu trở nên mơ hồ. Nếu chúng ta xem xét kỹ hơn trong ví dụ hiện tại của chúng ta, chúng ta có thể thấy rằng bây giờ có thể gọi nó bằng một sự kết hợp các đối số không thực sự hợp lý. Ví dụ: disable animation và điều chỉnh thời gian hiển thị animation:
```
presentProfile(animated: false, duration: 2)
```
Nó rất không rõ ràng đối với các chức năng dự kiến sẽ làm trong trường hợp này. Trong trường hợp animated flag là false thì duration argument không còn cần thiết nữa
Hãy cố gắng giảm bớt sự mơ hồ và sự nhầm lẫn bằng cách giảm độ dài của danh sách đối số của hàm của chúng ta - mà không làm mất bất kỳ chức năng nào. Thay vì có tất cả các animation option như top-level arguments, chúng ta sẽ đóng gói chúng thành một Animation configuration struct - như sau:
```
struct Animation {
    var duration: TimeInterval = 0.3
    var curve = UIViewAnimationCurve.easeInOut
    var completionHandler: (() -> Void)? = nil
}
```
Với code ở trên, chúng ta có thể giảm tất cả bốn đối số trước đó thành một đối số duy nhất - làm cho nó có thể trở về một chức năng đơn giản tương tự như ban đầu đã có:
```
func presentProfile(with animation: Animation? = nil) {
    ...
}
```
nếu animation là nil, sẽ không có animatuib nào được thực hiện. Không còn mơ hồ và không có danh sách đối số dài nữa.
## Composition
Một vấn đề phổ biến khác với các danh sách đối số dài là chúng ta kết thúc với các hàm làm quá nhiều việc, làm cho việc implement của chúng trở nên khó đọc và khó maintain. Ví dụ: ở đây, chúng tôi có một hàm load danh sách bạn bè của người dùng được đối sánh bởi search quẻy, đồng thời bao gồm các tùy chọn để sắp xếp và lọc:
```
func loadFriends(matching query: String,
                 limit: Int?,
                 sorted: Bool,
                 filteredByGroup group: Friend.Group?,
                 handler: @escaping (Result<[Friend]>) -> Void) {
    ...
}
```
Mặc dù có thể thực sự thuận tiện khi có một hàm thực hiện mọi thứ chúng ta cần, nhưng cho các hàm như vậy rất có thể trở thành lộn xộn và lỗi do logic phức tạp với nhiều code paths khác nhau tùy thuộc vào sự kết hợp của các đối số.
Thay vào đó, hãy giảm phạm vi của loadFriends để chỉ bao gồm việc load danh sách bạn bè, mà không có bất kỳ tính năng phân loại hoặc lọc nào. Bằng cách đó, nó có thể trở nên đơn giản hơn, dễ dàng hơn để kiểm tra. Do sắp xếp và lọc rất cụ thể về ngữ cảnh, chúng tôi sẽ ủy quyền các hoạt động đó cho caller của hàm,như sau:
```
loadFriends(matching: query) { [weak self] result in
    switch result {
    case .success(let friends):
        self?.render(friends.filtered(by: group).sorted())
    case .failure(let error):
        self?.render(error)
    }
}
```
Thay vì có một hàm chứa tất cả chức năng chúng ta cần, chúng ta có thể trộn và kết hợp các hàm khác nhau để đạt được kết quả mong muốn - giống như cách chúng ta sử dụng API sorted() và hàm tiện ích filter(by :) của chúng ta ở trên. Trong khi đó có thể dẫn đến một số code trùng lặp nhỏ ở đây và ở đó, chúng ta thường kết thúc với một giải pháp linh hoạt hơn nhiều mà không dựa vào một điểm trung tâm cho tất cả các loại logic.
## Extraction
Cuối cùng, chúng ta hãy xem cách chúng ta có thể trích xuất long arguments list thành một kiểu mới, chuyên dụng. Ví dụ, giả sử chúng tôi có extension trên UIViewController cho phép chúng ta present dialog cho người dùng từ bất cứ nơi nào trong ứng dụng:
```
extension UIViewController {
    func presentDialog(withTitle title: String,
                       message: String,
                       acceptTitle: String,
                       rejectTitle: String,
                       handler: @escaping (DialogOutcome) -> Void) {
        ...
    }
}
```
Chúng ta đang đối phó với một danh sách đối số khá dài, mà dự kiến sẽ tiếp tục phát triển vì chúng ta có thể cần phải present dialog phức tạp hơn. Chúng ta có thể refactor bằng cách sử dụng nhiều extension của UIViewController, nhưng nó cũng có thể phát triển lộn xộn theo thời gian khi chúng ta thêm vào API UIViewController với rất nhiều chức năng present dialog.
Thay vào đó, hãy thử di chuyển các chức năng trên vào loại riêng của nó, chuyên dụng. Trong trường hợp này, chúng ta sẽ tạo một struct gọi là DialogPresenter, nó sẽ chứa các thuộc tính cho tất cả các tùy chọn mà trước đây là các đối số - như sau:
```
struct DialogPresenter {
    typealias Handler = (DialogOutcome) -> Void

    let title: String
    let message: String
    let acceptTitle: String
    let rejectTitle: String
    let handler: Handler

    func present(in viewController: UIViewController) {
        ...
    }
}
```
Mặc dù extesion rất tốt nhưng khi chúng ta đang xử lý một task rất cụ thể - như present dialog như ví dụ ở trên - Sử dụng loại chuyên dụng giúp clear code hơn. Nó cũng giúp dễ dàng hơn trong việc define type aliases (như chúng ta làm ở *Handler* ở trên) và định nghĩa convenience APIs như extensions trực tiếp trên DialogPresenter type thay vì định nghĩa extensions ở UIViewController:
```
extension DialogPresenter {
    init(title: String, handler: @escaping Handler) {
        self.title = title
        self.handler = handler
        message = ""
        acceptTitle = "Yes".localized
        rejectTitle = "No".localized
    }
}
```
Trong khi chúng ta có thể muốn giữ cho các extensions đơn giản, thì việc trích xuất extensions có danh sách đối số dài thành các kiểu chuyên dụng có thể là một lựa chọn tuyệt vời.
Danh sách đối số dài và phức tạp thường là kết quả của nhiều thay đổi diễn ra trong một khoảng thời gian dài và thật dễ dàng để mọi thứ không thể kiểm soát và khó bảo trì đúng cách. Ngay cả API được thiết kế hoàn hảo nhất nhanh chóng bị hỏng nếu phạm vi của nó phát triển quá nhiều. 
Hy vọng bài viết sẽ có ích với các bạn.