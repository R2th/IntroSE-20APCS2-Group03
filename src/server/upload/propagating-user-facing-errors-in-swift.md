Hầu hết tất cả các phần mềm đều có điểm chung là đến một lúc nào đó, chúng sẽ gặp phải một số dạng lỗi. Mặc dù một số lỗi có thể là kết quả code sai, giả định không chính xác hoặc không tương thích hệ thống - cũng có nhiều loại lỗi hoàn toàn bình thường, là một phần hợp lệ trong hoạt động của 1 phần mềm.
Một thách thức với các lỗi như vậy là làm thế nào để truyền tải và trình bày chúng cho người dùng, điều này có thể thực sự khó khăn, ngay cả khi chúng ta bỏ qua các nhiệm vụ như tạo thông báo lỗi. Nó rất phổ biến khi thấy các ứng dụng hiển thị một thông báo chung chung ”An error occurred” cho bất kể lỗi nào xảy ra, hoặc throw các highly technical debugging cho người dùng - đó không phải là trải nghiệm người dùng tuyệt vời.
Vì vậy, trong bài viết này, chúng ta hãy xem xét một vài kỹ thuật có thể giúp việc truyền runtime errors đến người dùng của chúng ta đơn giản hơn rất nhiều và cách sử dụng một số kỹ thuật đó có thể giúp chúng tôi trình bày các thông báo lỗi phong phú hơn mà không phải thêm nhiều phức tạp trong mỗi UI implementation.
## An evolution from simple to complex
Khi bắt đầu xây dựng một tính năng mới, nó có thể là một điều kiện tốt để bắt đầu đơn giản nhất có thể - điều này giúp chúng ta tránh tối ưu hóa sớm, bằng cách khám phá structure và abstractions phù hợp nhất.
Khi nói đến việc hiển thị lỗi, cách triển khai đơn giản có thể giống như ví dụ sau - trong đó chúng ta cố gắng load danh sách các cuộc hội thoại trong một số dạng ứng dụng nhắn tin, sau đó chuyển bất kỳ lỗi nào gặp phải sang private method `handle`:
```
class ConversationListViewController: UIViewController {
    private let loader: ConversationLoader
    
    ...

    private func loadConversations() {
        // Load our list of converstions, and then either render
        // our results, or handle any error that was encountered:
        loader.loadConverstions { [weak self] result in
            switch result {
            case .success(let conversations):
                self?.render(conversations)
            case .failure(let error):
                self?.handle(error)
            }
        }
    }
}
```
Ví dụ, `handle` method của chúng ta có thể tạo ra một UIAlertController để hiển thị lỗi đã truyền error’s localizedDescription cho người dùng, cùng với một nút Retry - như thế này:
```
private extension ConversationListViewController {
    func handle(_ error: Error) {
        let alert = UIAlertController(
            title: "An error occured",
            message: error.localizedDescription,
            preferredStyle: .alert
        )
        
        alert.addAction(UIAlertAction(
            title: "Dismiss",
            style: .default
        ))

        alert.addAction(UIAlertAction(
            title: "Retry",
            style: .default,
            handler: { [weak self] _ in
                self?.loadConversations()
            }
        ))

        present(alert, animated: true)
    }
}
```
Mặc dù cách tiếp cận ở trên (hoặc một cái gì đó tương tự, chẳng hạn như sử dụng custom error child view controller, thay vì alert view) là cực kỳ phổ biến, nhưng nó đi kèm với một vài nhược điểm đáng kể.
Trước hết, vì chúng ta trực tiếp đưa ra bất kỳ lỗi nào gặp phải khi load danh sách model, rất có thể chúng ta sẽ hiển thị code-level implementation details cho người dùng - điều này không tốt - và thứ hai, chúng ta luôn hiển thị nút bấm Retry, bất kể việc thử lại có thực sự mang lại kết quả khác hay không.
Để giải quyết hai vấn đề đó, chúng ta có thể cố gắng làm cho các lỗi của chúng ta chi tiết hơn và được xác định rõ hơn, ví dụ như bằng cách define một enum NetworkError chuyên dụng mà chúng ta đảm bảo có các message phù hợp cho từng trường hợp:
```
enum NetworkingError: LocalizedError {
    case deviceIsOffline
    case unauthorized
    case resourceNotFound
    case serverError(Error)
    case missingData
    case decodingFailed(Error)
}
```
Sau đó, nếu chúng ta quay lại và thêm ConversationLoader với sự hỗ trợ cho error enum mới, chúng ta sẽ kết thúc với một error API hợp nhất hơn nhiều mà các thành phần UI khác nhau của chúng ta sẽ có thể sử dụng để xử lý lỗi theo cách chính xác hơn:
```
class ConversationLoader {
    typealias Handler = (Result<[Conversation], NetworkingError>) -> Void
    
    ...

    func loadConverstions(then handler: @escaping Handler) {
        ...
    }
}
```
Tuy nhiên, thực hiện xử lý lỗi theo cách chính xác thì nói dễ hơn làm và thường dẫn đến một tấn mã phức tạp cần được viết riêng cho từng tính năng hoặc trường hợp sử dụng - vì mỗi phần của code base của chúng ta có thể sử dụng một bộ lỗi khác nhau.
Ví dụ, ở đây, ta có thể thấy `handle` method trước đó của chúng ta trở nên phức tạp như thế nào, một khi chúng ta đã bắt đầu tùy chỉnh cách chúng ta trình bày các lỗi tùy thuộc vào loại lỗi gặp phải:
```
private extension ConversationListViewController {
    func handle(_ error: NetworkingError) {
        let alert = UIAlertController(
            title: "An error occured",
            message: error.localizedDescription,
            preferredStyle: .alert
        )
        
        alert.addAction(UIAlertAction(
            title: "Dismiss",
            style: .default
        ))

        // Here we take different actions depending on the error
        // that was encontered. We've decided that only some
        // errors warrant a "Retry" button, while an "unauthorized"
        // error should redirect the user to the login screen,
        // since their login session has most likely expired:
        switch error {
        case .deviceIsOffline, .serverError:
            alert.addAction(UIAlertAction(
                title: "Retry",
                style: .default,
                handler: { [weak self] _ in
                    self?.loadConversations()
                }
            ))
        case .resourceNotFound, .missingData, .decodingFailed
            break
        case .unauthorized:
            return navigator.logOut()
        }

        present(alert, animated: true)
    }
}
```
Mặc dù những điều trên rất có thể sẽ giúp trải nghiệm người dùng được cải thiện, như hiện tại chúng ta đang điều chỉnh việc trình bày từng lỗi theo những gì người dùng có thể làm một cách hợp lý - Nhưng duy trì sự phức tạp đó trong mỗi tính năng thì không tốt , vì vậy hãy xem liệu chúng ta có thể tìm ra giải pháp tốt hơn không.
## Using the power of the responder chain
Một cách để cải thiện cách các lỗi liên quan đến UI được hiển thị trong một ứng dụng là sử dụng responder chain.
Responder chain là một hệ thống mà UIKit và AppKit đều có (mặc dù cách triển khai của nó khác nhau giữa hai framework). là cách tất cả các loại sự kiện hệ thống - từ touchs, đến keyboard events, đến input focus - được xử lý. Bất kỳ `UIResponder` subclass nào (chẳng hạn như `UIView` và `UIViewController`) đều có thể tham gia vào responder chain và hệ thống sẽ tự động thêm tất cả các view và view controller vào nó ngay khi chúng được thêm vào view hierarchy.
Trên iOS, responder chain bắt đầu tại app's `AppDelegate`, và đi xuyên suốt view hierarchy của chúng ta cho đến khi đến được topmost view của chúng ta - có nghĩa là, theo nhiều cách, nó là một công cụ lý tưởng để sử dụng cho các tác vụ như hiển thị lỗi.
Vì vậy, hãy xem làm thế nào chúng ta có thể di chuyển code xử lý lỗi và code hiển thị lỗi sang responder chain - bằng cách mở rộng `UIResponder` bằng một method, theo mặc định, di chuyển bất kỳ lỗi nào chúng ta gửi lên chuỗi đó thông qua chain bằng cách sử dụng `next` property của nó:
```
extension UIResponder {
    // We're dispatching our new method through the Objective-C
    // runtime, to enable us to override it within subclasses:
    @objc func handle(_ error: Error,
                      from viewController: UIViewController,
                      retryHandler: @escaping () -> Void) {
        // This assertion will help us identify errors that were
        // either emitted by a view controller *before* it was
        // added to the responder chain, or never handled at all:
        guard let nextResponder = next else {
            return assertionFailure("""
            Unhandled error \(error) from \(viewController)
            """)
        }

        nextResponder.handle(error,
            from: viewController,
            retryHandler: retryHandler
        )
    }
}
```
Do phần lớn việc thông báo lỗi dựa trên giao diện người dùng có khả năng bắt nguồn từ các view controllers, vì vậy ta sẽ mở rộng `UIViewController` với convenience API sau để tránh phải tự pass `self` mỗi lần chúng ta muốn xử lý lỗi:
```
extension UIViewController {
    func handle(_ error: Error,
                retryHandler: @escaping () -> Void) {
        handle(error, from: self, retryHandler: retryHandler)
    }
}
```
Việc sử dụng API mới của chúng ta giờ đây gần như đơn giản như gọi private `handle` method mà trước đây chúng ta đã sử dụng trong ConversationListViewController:
```
class ConversationListViewController: UIViewController {
    ...

    func loadConversations() {
        loader.loadConverstions { [weak self] result in
            switch result {
            case .success(let conversations):
                self?.render(conversations)
            case .failure(let error):
                self?.handle(error, retryHandler: {
                    self?.loadConversations()
                })
            }
        }
    }
}
```
Với hệ thống thông báo lỗi mới của chúng ta, giờ đây chúng ta có thể triển khai error handling code của mình ở bất kỳ đâu trong responder chain - cả hai đều mang lại cho chúng ta rất nhiều tính linh hoạt và cũng cho phép chúng ta tránh yêu cầu mỗi bộ view controller tự thực hiện xử lý lỗi của riêng nó.
## Generic error categories
Tuy nhiên, trước khi chúng ta có thể sử dụng đầy đủ hệ thống xử lý lỗi mới của mình, chúng ta sẽ cần một cách chung chung hơn một chút để xác định các lỗi khác nhau - nếu không chúng ta sẽ kết thúc bằng việc triển khai khá lớn với việc cần thực hiện nhiều type casting các loại lỗi khác nhau.
Một cách để thực hiện điều đó là tạo ra một tập hợp các error category - ví dụ bằng cách sử dụng enum và specialized `CategorizedError` protocol:
```
enum ErrorCategory {
    case nonRetryable
    case retryable
    case requiresLogout
}

protocol CategorizedError: Error {
    var category: ErrorCategory { get }
}
```
Bây giờ tất cả những gì chúng ta phải làm để phân loại một lỗi là làm cho nó conform với protocol trên, như thế này:
```
extension NetworkingError: CategorizedError {
    var category: ErrorCategory {
        switch self {
        case .deviceIsOffline, .serverError:
            return .retryable
        case .resourceNotFound, .missingData, .decodingFailed:
            return .nonRetryable
        case .unauthorized:
            return .requiresLogout
        }
    }
}
```
Cuối cùng, chúng ta sẽ mở rộng `Error` với API tiện lợi màllll sẽ cho chúng tôi truy xuất một `ErrorCategory` từ bất kỳ lỗi nào, như thế này
```
extension Error {
    func resolveCategory() -> ErrorCategory {
        guard let categorized = self as? CategorizedError else {
            // We could optionally choose to trigger an assertion
            // here, if we consider it important that all of our
            // errors have categories assigned to them.
            return .nonRetryable
        }

        return categorized.category
    }
}
```
Với những điều đã nêu ở trên, giờ đây chúng ta có thể viết code xử lý lỗi theo cách hoàn toàn có thể sử dụng lại mà không mất bất kỳ độ chính xác nào. Trong trường hợp này, chúng ta sẽ làm điều đó bằng cách mở rộng `AppDelegate` của chúng ta (nằm ở đầu responder chain) với cách thực hiện sau:
```
extension AppDelegate {
    override func handle(_ error: Error,
                         from viewController: UIViewController,
                         retryHandler: @escaping () -> Void) {
        let alert = UIAlertController(
            title: "An error occured",
            message: error.localizedDescription,
            preferredStyle: .alert
        )

        alert.addAction(UIAlertAction(
            title: "Dismiss",
            style: .default
        ))

        switch error.resolveCategory() {
        case .retryable:
            alert.addAction(UIAlertAction(
                title: "Retry",
                style: .default,
                handler: { _ in retryHandler() }
            ))
        case .nonRetryable:
            break
        case .requiresLogout:
            return performLogout()
        }

        viewController.present(alert, animated: true)
    }
}
```
Ngoài thực tế là hiện tại chúng tôi có một triển khai xử lý lỗi duy nhất có thể được sử dụng để show bất kỳ lỗi nào gặp phải bởi bất kỳ view controllers nào, sức mạnh của responder chain là chúng ta cũng có thể dễ dàng chèn mã xử lý cụ thể hơn vào bất cứ đâu trong chuỗi đó.
Ví dụ: nếu gặp phải lỗi yêu cầu logout (chẳng hạn như authorization error) trên màn hình login, có lẽ chúng ta muốn hiển thị thông báo lỗi, thay vì cố gắng đăng xuất người dùng. Để thực hiện điều đó, chúng ta chỉ cần thực hiện `handle` trong view controller đó, thêm custom error handling và sau đó chuyển bất kỳ lỗi nào mà chúng ta không muốn xử lý ở cấp độ đó cho superclass - như thế này:
```
extension LoginViewController {
    override func handle(_ error: Error,
                         from viewController: UIViewController,
                         retryHandler: @escaping () -> Void) {
        guard error.resolveCategory() == .requiresLogout else {
            return super.handle(error,
                from: viewController,
                retryHandler: retryHandler
            )
        }

        errorLabel.text = """
        Login failed. Check your username and password.
        """
    }
}
```
Mặc dù có một số yếu tố khác mà chúng ta có thể muốn tính đến khi xử lý lỗi (như tránh xếp chồng nhiều cảnh báo lên nhau hoặc tự động thử lại một số thao tác thay vì hiển thị lỗi), sử dụng responder chain để truyền tải các lỗi cho người dùng - vì nó cho phép chúng tôi viết code xử lý lỗi nghiêm trọng mà không phải truyền bá code đó trên tất cả các triển khai UI khác nhau của chúng ta.
## From UIKit to SwiftUI
Tiếp theo, chúng ta hãy xem cách chúng ta có thể đạt được một setup tương tự như setup dựa trên UIKit mà chúng ta vừa khám phá, nhưng trong SwiftUI. Mặc dù SwiftUI không có responder chain thực tế, nhưng nó có các cơ chế khác cho phép chúng ta truyền thông tin lên và xuống thông qua view hierarchy.
Để bắt đầu, chúng ta hãy tạo một `ErrorHandler` protocol mà chúng ta sẽ sử dụng để xác định các trình xử lý lỗi khác nhau. Khi được yêu cầu xử lý lỗi, chúng ta cũng sẽ cấp cho mỗi handler quyền truy cập vào View mà lỗi đã gặp phải, cũng như LoginStateController được sử dụng để quản lý trạng thái đăng nhập của ứng dụng và giống như trong triển khai dựa trên UIKit của chúng ta, chúng ta 'sẽ sử dụng `retryHandler` closure để cho phép các hoạt động thất bại được thử lại:
```
protocol ErrorHandler {
    func handle<T: View>(
        _ error: Error?,
        in view: T,
        loginStateController: LoginStateController,
        retryHandler: @escaping () -> Void
    ) -> AnyView
}
```
Tiếp theo, chúng ta sẽ viết một default implementation của protocol trên, điều này (giống như khi sử dụng UIKit) sẽ đưa ra alert view cho từng lỗi đã gặp - bằng cách chuyển đổi các tham số đã truyền của nó thành internal `Presentation` model, sau đó sẽ được wrapped trong giá trị Binding và được sử dụng để present `Alert` - như thế này:
```
struct AlertErrorHandler: ErrorHandler {
    // We give our handler an ID, so that SwiftUI will be able
    // to keep track of the alerts that it creates as it updates
    // our various views:
    private let id = UUID()

    func handle<T: View>(
        _ error: Error?,
        in view: T,
        loginStateController: LoginStateController,
        retryHandler: @escaping () -> Void
    ) -> AnyView {
        guard error?.resolveCategory() != .requiresLogout else {
            loginStateController.state = .loggedOut
            return AnyView(view)
        }

        var presentation = error.map { Presentation(
            id: id,
            error: $0,
            retryHandler: retryHandler
        )}

        // We need to convert our model to a Binding value in
        // order to be able to present an alert using it:
        let binding = Binding(
            get: { presentation },
            set: { presentation = $0 }
        )

        return AnyView(view.alert(item: binding, content: makeAlert))
    }
}
```
Lý do chúng ta cần một Presentation model là vì SwiftUI yêu cầu một giá trị là `Có thể nhận dạng` để có thể hiển thị alert cho nó. Bằng cách sử dụng `UUID` riêng của handler’s của chúng ta làm định danh (như chúng ta đã làm ở trên), chúng ta sẽ có thể cung cấp cho SwiftUI một stable identity cho mỗi alert mà chúng ta tạo, ngay cả khi nó cập nhật và re-renders views.
Bây giờ, chúng ta sẽ triển khai `Presentation` model đó, cùng với private `makeAlert` method mà chúng ta gọi ở trên và default `ErrorHandler` implementation của chúng ta sẽ hoàn tất:
```
private extension AlertErrorHandler {
    struct Presentation: Identifiable {
        let id: UUID
        let error: Error
        let retryHandler: () -> Void
    }
    
    func makeAlert(for presentation: Presentation) -> Alert {
        let error = presentation.error

        switch error.resolveCategory() {
        case .retryable:
            return Alert(
                title: Text("An error occured"),
                message: Text(error.localizedDescription),
                primaryButton: .default(Text("Dismiss")),
                secondaryButton: .default(Text("Retry"),
                    action: presentation.retryHandler
                )
            )
        case .nonRetryable:
            return Alert(
                title: Text("An error occured"),
                message: Text(error.localizedDescription),
                dismissButton: .default(Text("Dismiss"))
            )
        case .requiresLogout:
            // We don't expect this code path to be hit, since
            // we're guarding for this case above, so we'll
            // trigger an assertion failure here.
            assertionFailure("Should have logged out")
            return Alert(title: Text("Logging out..."))
        }
    }
}
```
Điều tiếp theo mà chúng ta cần là một cách để chuyển error handler hiện tại xuống thông qua view hierarchy của chúng ta, điều thú vị là hướng ngược lại so với cách chúng ta triển khai mọi thứ bằng cách sử dụng UIKit responder chain. Mặc dù SwiftUI có feature APIs để truyền lên (như hệ thống tùy chọn mà chúng ta đã sử dụng để thực hiện đồng bộ hóa giữa các chế độ xem trong phần hai của [part two of “A guide to the SwiftUI layout system”](https://www.swiftbysundell.com/articles/swiftui-layout-system-guide-part-2/#geometry-preferences-and-layout-dependencies), nhưng việc truyền các đối tượng và thông tin xuống dưới thường phù hợp hơn với SwiftUI highly declarative nature.
Để thực hiện điều đó, hãy sử dụng environment system của SwiftUI, cho phép chúng ta thêm các key objects và values vào overall environment  của view hierarchy - mà bất kỳ view hoặc modifier nào cũng có thể có được.
Đầu tiên, chúng ta sẽ xác định `EnvironmentKey` để lưu trữ error handler hiện tại và sau đó chúng ta sẽ mở rộng EnvironmentValues type với một computed property để truy cập vào nó - như thế này:
```
struct ErrorHandlerEnvironmentKey: EnvironmentKey {
    static var defaultValue: ErrorHandler = AlertErrorHandler()
}

extension EnvironmentValues {
    var errorHandler: ErrorHandler {
        get { self[ErrorHandlerEnvironmentKey.self] }
        set { self[ErrorHandlerEnvironmentKey.self] = newValue }
    }
}
```
Vì chúng ta đã tạo một instance của `AlertErrorHandler` - default environment value, chúng ta không cần phải xử lý error handler khi xây dựng các views - ngoại trừ khi chúng ta muốn override default handler cho một tập hợp con của hierarchy của chúng tôi (như chúng ta đã làm cho màn hình đăng nhập của chúng ta khi sử dụng UIKit). Để làm cho việc overrides trở nên đơn giản hơn, ta sẽ tạo convenience API cho nó:
```
extension View {
    func handlingErrors(
        using handler: ErrorHandler
    ) -> some View {
        environment(\.errorHandler, handler)
    }
}
```
Với những điều đã nêu ở trên, giờ đây chúng ta có tất cả mọi thứ cần thiết để xử lý lỗi. Để cho phép mọi view dễ dàng phát ra các lỗi mà người dùng gặp phải, hãy sử dụng view modifier system của SwiftUI, để đóng gói tất cả logic cần thiết để kết nối một lỗi và retry handler với error handling system mà chúng ta đã xây dựng ở trên:
```
struct ErrorEmittingViewModifier: ViewModifier {
    @EnvironmentObject var loginStateController: LoginStateController
    @Environment(\.errorHandler) var handler

    var error: Error?
    var retryHandler: () -> Void

    func body(content: Content) -> some View {
        handler.handle(error,
            in: content,
            loginStateController: loginStateController,
            retryHandler: retryHandler
        )
    }
}
```
Mặc dù chúng ta chỉ đơn giản có thể sử dụng view modifier mới trực tiếp trong các views, nhưng chúng ta cũng có thể tạo convenience API cho nó, ví dụ như sau:
```
extension View {
    func emittingError(
        _ error: Error?,
        retryHandler: @escaping () -> Void
    ) -> some View {
        modifier(ErrorEmittingViewModifier(
            error: error,
            retryHandler: retryHandler
        ))
    }
}
```
Ở đây, một cái gì đó trông giống như trong một phiên bản SwiftUI được viết lại của `ConversationListViewController` của chúng ta từ trước đó :
```
class ConversationListViewModel: ObservableObject {
    @Published private(set) var error: Error?
    @Published private(set) var conversations: [Conversation]
    ...
}

struct ConversationListView: View {
    @ObservedObject var viewModel: ConversationListViewModel

    var body: some View {
        List(viewModel.conversations, rowContent: makeRow)
            .emittingError(viewModel.error, retryHandler: {
                self.viewModel.load()
            })
            .onAppear(perform: viewModel.load)
            ...
    }

    private func makeRow(for conversation: Conversation) -> some View {
        ...
    }
}
```
## Conclusion
Khi xử lý các lỗi mà người dùng gặp phải, chẳng hạn như các lỗi gặp phải trong code UI, nó thường là một ý tưởng tốt để đưa ra một số dạng hệ thống hoặc kiến trúc cho phép chúng ta truyền các loại lỗi đó sang cơ chế xử lý trung tâm.
Khi sử dụng UIKit hoặc AppKit, điều đó có thể được thực hiện bằng responder chain, trong khi các ứng dụng dựa trên SwiftUI có thể chọn sử dụng môi trường hoặc preferences system hoặc bằng cách sử dụng một cách tiếp cận đơn hướng nào đó cho cả việc phát ra lỗi và các sự kiện khác.

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/articles/propagating-user-facing-errors-in-swift/