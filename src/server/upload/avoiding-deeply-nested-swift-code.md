Code style và structure được cho là hai trong số những chủ đề khó nhất trong lập trình nói chung. Không phải vì chúng yêu cầu bất kỳ kỹ năng cụ thể hoặc kinh nghiệm trong xây dựng phần mềm nào, mà bởi vì họ rất tự chủ về bản chất. Những gì một người có thể xem là code có cấu tốt và dễ đọc nhất trên thế giới, một người khác có thể thấy khó hiểu và phức tạp.
Tuy nhiên, có một vài kỹ thuật có thể được sử dụng để làm cho code mà chúng ta viết dễ tiếp cận hơn với người khác. Trong bài viết này, chúng ta hãy xem một vài kỹ thuật như vậy.
## Early returns and code extraction
Hãy bắt đầu bằng cách xem xét một ví dụ tương đối đơn giản về cách sử dụng trả về sớm trong các hàm có thể có tác động khá lớn đến khả năng đọc tổng thể của code của chúng ta - ngay cả khi không có bất kỳ thay đổi nào đối với cách biểu thức được tạo ra hoặc cách API của được thiết kế.
Ví dụ, giả sử chúng ta đã extend một `DocumentLibraryViewController` bằng một method ngắn nhưng hữu ích để filter một mảng các tài liệu chỉ bao gồm những tài liệu mà người dùng hiện tại chưa đọc và có thể truy cập được:
```
extension DocumentLibraryViewController {
    func unreadDocuments(from list: [Document]) -> [Document] {
        list.filter { document in
            if user.accessLevel >= document.requiredAccessLevel {
                if !user.readDocumentIDs.contains(document.id) {
                    if document.expirationDate > Date() {
                        return true
                    }
                }
            }
    
            return false
        }
    }
}
```
Mặc dù đoạn code trên hoạt động như dự định, nhưng thực tế là nó bị lõm khá nhiều với việc gây khó khăn cho việc hiểu logic của function. Chúng ta có thể khắc phục điều đó bằng cách sử dụng câu lệnh `guard`  để thay vào đó thoát ra khỏi method của chúng ta càng sớm càng tốt - như thế này:
```
extension DocumentLibraryViewController {
    func unreadDocuments(from list: [Document]) -> [Document] {
        list.filter { document in
            guard user.accessLevel >= document.requiredAccessLevel else {
                return false
            }
    
            guard !user.readDocumentIDs.contains(document.id) else {
                return false
            }
    
            return document.expirationDate > date
        }
    }
}
```
Mặc dù logic của chúng ta vẫn giống hệt nhau, nhưng giờ đây, nó dễ dàng hơn một chút để nhanh chóng có được cái nhìn tổng quan về các điều kiện thực tế của function - vì hiện tại chúng được liệt kê từ trên xuống dưới ở cùng mức độ indentation.
Ngoài việc làm cho mã của chúng ta dễ đọc và dễ hiểu hơn đối với người khác, một lợi ích chính của việc thực hiện cấu trúc lại ở trên là nó thường cho phép chúng ta khám phá những cách mới để chúng ta có thể cải thiện cấu trúc tổng thể của code hơn nữa.
Ví dụ, vì hai trong số ba điều kiện của function của chúng ta hoạt động trên một `Document` instance, chúng ta có thể chuyển các điều kiện đó sang một extension riêng - điều này không chỉ giúp code đó được đọc và kiểm tra một cách dễ dàng hơn, nó còn cho phép chúng ta sử dụng lại nó:
```
extension Document {
    func isAccessible(for user: User, date: Date = .init()) -> Bool {
        guard user.accessLevel >= requiredAccessLevel else {
            return false
        }

        return expirationDate > date
    }
}
```
Vì method `unreadDocuments(from:) `của chúng ta đang hoạt động trực tiếp trên một mảng documents - và chỉ yêu cầu `User` instance và `Date` instance - chúng ta cũng có thể chọn trích xuất nó từ `DocumentLibraryViewController` và thay vì triển khai nó trong một extension trên bất kỳ `Sequence` nào có chứa các `Document`, như thế này:
```
extension Sequence where Element == Document {
    func unread(for user: User, date: Date = .init()) -> [Document] {
        filter { document in
            guard document.isAccessible(for: user, date: date) else {
                return false
            }

            return !user.readDocumentIDs.contains(document.id)
        }
    }
}
```
Với các tinh chỉnh ở trên, giờ đây, chúng ta không chỉ mô hình hóa logic của chúng ta thành các chức năng riêng biệt có thể được sử dụng và kiểm tra độc lập, chúng ta có thể dễ dàng sử dụng như thế này:
```
let unreadDocuments = allDocuments.unread(for: user)
```
## Untangling nested logic branches
Tuy nhiên, không phải tất cả logic có thể được mô hình hóa như một chuỗi các điều kiện boolean đơn giản - đôi khi chúng ta cần xử lý một lượng lớn states và permutations, có thể yêu cầu chúng ta phân nhánh logic của mình thành một số câu lệnh `if` và `else`.
Ví dụ: ở đây, chúng ta đang làm việc trên `ProductViewController` sử dụng private `update` method để populate ra các views của nó sau khi nhận được mô hình `Product` mới. Vì overall state mà UI của chúng ta sẽ kết thúc phụ thuộc vào một số yếu tố - chẳng hạn như liệu người dùng có đăng nhập hay không, nếu có giảm giá nào không, v.v. 
```
class ProductViewController: UIViewController {
    private let sessionController: SessionController
    private lazy var descriptionLabel = UILabel()
    private lazy var favoriteButton = UIButton()
    private lazy var priceView = PriceView()
    private lazy var buyButton = UIButton()
    
    ...

    private func update(with product: Product) {
        if let user = sessionController.loggedInUser {
            if let discount = product.discount(in: user.region) {
                let lowerPrice = product.price - discount
                priceView.amountLabel.text = String(lowerPrice)
                priceView.discountLabel.text = String(discount)
            } else {
                priceView.amountLabel.text = String(product.price)
                priceView.discountLabel.text = ""
            }

            if user.favoriteProductIDs.contains(product.id) {
                favoriteButton.setTitle("Remove from favorites",
                    for: .normal
                )
            } else {
                favoriteButton.setTitle("Add to favorites",
                    for: .normal
                )
            }

            favoriteButton.isHidden = false
        } else {
            favoriteButton.isHidden = true
            priceView.amountLabel.text = String(product.price)
            priceView.discountLabel.text = ""
        }

        priceView.currencyLabel.text = product.currency.symbol
        descriptionLabel.text = product.description
    }
}
```
Thoạt nhìn, có vẻ như ở trên là điều tốt nhất mà chúng ta có thể làm với số lượng điều kiện và trạng thái riêng biệt mà chúng ta cần xử lý - nhưng, giống như trước đó, một khi chúng ta bắt đầu chia nhỏ việc thực hiện thành các phần riêng biệt, chúng ta sẽ có khả năng khám phá những cách tiếp cận mới.
Để bắt đầu, chúng ta sẽ di chuyển tất cả logic ràng buộc sản phẩm của chúng ta vào một private extension cho `Product`. Bằng cách đó, chúng ta có thể thực hiện các tính toán đó một cách cô lập và chỉ cần trả về các giá trị đại diện cho trạng thái hiện tại mà ứng dụng của chúng ta đang ở - như thế này:
```
// By keeping this extension private, we're able to implement
// logic that's specific to our product view within it:
private extension Product {
    typealias PriceInfo = (price: Double, discount: Double)

    func priceInfo(in region: Region?) -> PriceInfo {
        guard let discount = region.flatMap(discount) else {
            return (price, 0)
        }

        return (price - discount, discount)
    }

    func favoriteButtonTitle(for user: User) -> String {
        if user.favoriteProductIDs.contains(id) {
            return "Remove from favorites"
        } else {
            return "Add to favorites"
        }
    }
}
```
Tiếp theo, chúng ta sẽ gói gọn tất cả các tính toán view state của chúng ta trong một loại dành riêng. Chúng ta sẽ gọi nó là `ProductViewState`, vì mục đích duy nhất của nó là represent state hiện tại của product view của chúng ta theo kiểu read-only. Chúng ta sẽ khởi tạo nó với một `Product` và một optional `User` và sau đó sẽ tính toán trạng thái hiện tại của chúng ta bằng cách sử dụng private `Product` API mà chúng ta vừa triển khai:
```
struct ProductViewState {
    // By making all of our properties constants, the compiler
    // will generate an error if we forget to assign a value to
    // one of them (including those that are optionals):
    let priceText: String
    let discountText: String
    let currencyText: String
    let favoriteButtonTitle: String?
    let description: String

    init(product: Product, user: User?) {
        let priceInfo = product.priceInfo(in: user?.region)
        priceText = String(priceInfo.price)
        discountText = priceInfo.discount > 0 ? String(priceInfo.discount) : ""
        currencyText = product.currency.symbol
        favoriteButtonTitle = user.map(product.favoriteButtonTitle) ?? ""
        description = product.description
    }
}
```
Với hai phần ở trên, bây giờ chúng ta có thể quay lại `update` method của view controller của chúng ta và đơn giản hóa nó. Đã qua tất cả các câu lệnh `if` và `else` lồng nhau, và chúng tôi không còn có bất kỳ duplicate  assignments nào cho cùng một thuộc tính. Thêm vào đó, việc triển khai của chúng ta giờ đây có thể dễ dàng được đọc từ trên xuống dưới, vì chúng ta đã trích xuất tất cả các điều kiện ra quyết định thành các chức năng nhỏ hơn, riêng biệt:
```
class ProductViewController: UIViewController {
    ...

    private func update(with product: Product) {
        let state = ProductViewState(
            product: product,
            user: sessionController.loggedInUser
        )

        priceView.amountLabel.text = state.priceText
        priceView.discountLabel.text = state.discountText
        priceView.currencyLabel.text = state.currencyText

        favoriteButton.setTitle(state.favoriteButtonTitle, for: .normal)
        favoriteButton.isHidden = (state.favoriteButtonTitle == nil)

        descriptionLabel.text = state.description
    }
}
```
Giống như khi trước đây chúng ta trích xuất các phương thức liên quan đến `Document` của mình thành các API riêng biệt, một lợi ích lớn của kiểu tái cấu trúc ở trên là nó giúp cho unit test trở nên đơn giản hơn rất nhiều - vì tất cả logic của chúng ta giờ được cấu trúc như các hàm thuần túy có thể được phát triển riêng lẻ.
## SwiftUI views
Cuối cùng, chúng ta hãy xem cách chúng ta có thể sử dụng một số kỹ thuật tương tự ở trên khi xây dựng các views bằng SwiftUI.
Do [SwiftUI’s DSL](https://www.swiftbysundell.com/articles/the-swift-51-features-that-power-swiftuis-api/) sử dụng các closures để đóng gói việc xây dựng các views khác nhau, nên nó rất dễ kết thúc với việc triển khai heavily indented, ngay cả khi xây dựng list view tương đối đơn giản - chẳng hạn như:
```
struct EventListView: View {
    @ObservedObject var manager: EventManager

    var body: some View {
        NavigationView {
            List(manager.upcomingEvents) { event in
                NavigationLink(
                    destination: EventView(event: event),
                    label: {
                        HStack {
                            Image(event.iconName)
                            VStack(alignment: .leading) {
                                Text(event.title)
                                Text(event.location.name)
                            }
                        }
                    }
                )
            }
            .navigationBarTitle("Upcoming events")
        }
    }
}
```
Mặc dù có vẻ như loại `code pyramid` ở trên là không thể tránh khỏi khi làm việc với các views SwiftUI lồng nhau, một lần nữa một số cách mà chúng ta có thể làm đơn giản hóa code của chúng ta trong trường hợp này.
Giống như cách trước đây chúng ta trích xuất các phần trong logic thành các loại và hàm riêng biệt, chúng ta cũng có thể làm điều tương tự ở đây - ví dụ bằng cách tạo một loại chuyên dụng để hiển thị các hàng xuất hiện trong danh sách trên. Vì các views SwiftUI chỉ là các lightweight descriptions về UI của chúng ta, điều đó thường có thể được thực hiện bằng cách đơn giản là chuyển code được đề cập sang loại View-conforming type mới - như thế này:
```
struct EventListRow: View {
    var event: Event

    var body: some View {
        HStack {
            Image(event.iconName)
            VStack(alignment: .leading) {
                Text(event.title)
                Text(event.location.name)
            }
        }
    }
}
```
Ngoài việc tạo các kiểu view độc lập, sử dụng các private factory methods cũng có thể là một cách tuyệt vời để tách view SwiftUI thành các phần riêng biệt. Ví dụ: ở đây, cách thức chúng ta có thể định nghĩa một method wrap một instance của loại `EventListRow` mới trong `NavigationLink`, giúp cho nó sẵn sàng để được hiển thị trong danh sách của chúng ta:
```
private extension EventListView {
    func makeRow(for event: Event) -> some View {
        NavigationLink(
            destination: EventView(event: event),
            label: {
                EventListRow(event: event)
            }
        )
    }
}
```
Điều thú vị là, chỉ với hai điều chỉnh ở trên, giờ đây chúng ta có thể xóa gần như tất cả các indentation khỏi `EventListView` - bằng cách chuyển method `makeRow` ở trên thành  [first class function](https://www.swiftbysundell.com/clips/1/) khi tạo `List`, như sau:
```
struct EventListView: View {
    @ObservedObject var manager: EventManager

    var body: some View {
        NavigationView {
            List(manager.upcomingEvents, rowContent: makeRow)
                .navigationBarTitle("Upcoming events")
        }
    }
}
```
## Conclusion
Mặc dù có vẻ như một lượng lớn indentation là không thể tránh khỏi trong một số phần nhất định của code base, nhưng thực tế hiếm khi xảy ra - vì thường có nhiều cách tiếp cận mà chúng ta có thể thực hiện để cấu trúc logic của mình theo cách không chỉ làm giảm lượng indentation cần thiết, nhưng cũng làm cho tổng thể logic của chúng ta dễ theo dõi hơn.
Khi chúng ta bắt đầu gỡ rối một đoạn code được indented nhiều, có khả năng chúng ta sẽ khám phá các cách mới để cấu trúc, tái sử dụng và kiểm tra mã đó - điều này có thể giúp tái cấu trúc một cách rất tự nhiên và gọn gàng, cải thiện khả năng kiểm tra tổng thể của một code base.

Nhưng một lần nữa, không phải tất cả các indentation đều đáng bị loại bỏ, nhưng hy vọng bài viết này đã cung cấp cho bạn một số hiểu biết về cách tiếp cận các loại nhiệm vụ tái cấu trúc và bảo trì này.

Reference: https://www.swiftbysundell.com/articles/avoiding-deeply-nested-swift-code/