Điều tách biệt SwiftUI khỏi các UI framework trước đây của Apple không chỉ là cách các view và các UI components khác được xác định mà còn là cách view-level state được quản lý trong một ứng dụng.
Thay vì sử dụng delegate, datasource hoặc bất kỳ state management patterns khác thường thấy trong các frameworks bắt buộc như UIKit và AppKit - SwiftUI cung cấp một số property wrappers cho phép chúng ta khai báo chính xác cách dữ liệu được observed,  rendered và mutated bởi view của chúng ta.
Trong bài viết này, hãy xem xét kỹ hơn từng property wrappers đó, cách chúng liên quan với nhau và cách chúng tạo nên các phần khác nhau của overall state management system trong SwiftUI.
## State properties
Vì SwiftUI chủ yếu là một UI framework (mặc dù nó bắt đầu có được các API để xác định các higher-level constructs, như apps và scenes), declarative design của nó không nhất thiết phải ảnh hưởng đến toàn bộ model và data layer của một ứng dụng - nhưng thay vì chỉ là state bị ràng buộc trực tiếp vào các views khác nhau của chúng ta.
Ví dụ: giả sử chúng ta đang làm việc trên `SignupView` cho phép người dùng đăng ký tài khoản mới trong một ứng dụng, bằng cách nhập `username` và địa chỉ `email`. Sau đó, chúng tôi sẽ sử dụng hai giá trị đó để tạo thành `User` model, model này được chuyển đến `handler` closure - cung cấp cho chúng tôi ba phần của state:
```
struct SignupView: View {
    var handler: (User) -> Void
    var username = ""
    var email = ""

    var body: some View {
        ...
    }
}
```
Vì chỉ hai trong số ba thuộc tính đó - `username` và `email` - thực sự sẽ được sửa đổi theo view của chúng ta và vì hai phần state đó có thể được private, chúng ta sẽ đánh dấu cả hai bằng cách sử dụng State property wrapper của SwiftUI - như sau:
```
struct SignupView: View {
    var handler: (User) -> Void
    
    @State private var username = ""
    @State private var email = ""

    var body: some View {
        ...
    }
}
```
Làm như vậy sẽ tự động tạo kết nối giữa hai giá trị đó và chính view của chúng ta - nghĩa là view của chúng ta sẽ được re-rendered mỗi khi một trong hai giá trị đó được thay đổi. Trong `body`, chúng ta sẽ bind từng thuộc tính trong số hai thuộc tính đó với một `TextField` tương ứng để làm cho chúng có thể chỉnh sửa được - cung cấp cho chúng ta cách triển khai sau:
```
struct SignupView: View {
    var handler: (User) -> Void

    @State private var username = ""
    @State private var email = ""

    var body: some View {
        VStack {
            TextField("Username", text: $username)
            TextField("Email", text: $email)
            Button(
                action: {
                    self.handler(User(
                        username: self.username,
                        email: self.email
                    ))
                },
                label: { Text("Sign up") }
            )
        }
        .padding()
    }
}
```
Vì vậy, `State` được sử dụng để đại diện cho internal state của view SwiftUI và để tự động cập nhật dạng xem khi state đó được thay đổi. Do đó, để giữ các thuộc tính được `State`-wrapped properties `private`, điều này đảm bảo rằng chúng sẽ chỉ bị thay đổi trong phần view body (cố gắng thay đổi chúng ở nơi khác sẽ thực sự gây ra lỗi runtime crash).
## Two-way bindings
Nhìn vào code sample ở trên, cách chúng ta chuyển từng thuộc tính của mình vào TextField là bằng cách đặt tiền tố cho các tên thuộc tính đó bằng `$`.Đó là bởi vì chúng takhông chỉ chuyển các giá trị `String` thuần túy vào các TextField đó, mà còn liên kết với chính các `State`-wrapped properties.
Để khám phá chi tiết hơn điều đó có nghĩa là gì, bây giờ hãy giả sử rằng chúng ta muốn tạo một view cho phép người dùng chỉnh sửa thông tin profile mà họ đã nhập ban đầu khi đăng ký. Vì chúng ta hiện đang tìm cách sửa đổi các giá trị external state, thay vì chỉ những giá trị private, chúng ta sẽ mark `username` và `email` của mình là Binding:
```
struct ProfileEditingView: View {
    @Binding var username: String
    @Binding var email: String

    var body: some View {
        VStack {
            TextField("Username", text: $username)
            TextField("Email", text: $email)
        }
        .padding()
    }
}
```
Điều thú vị là các bindings không chỉ giới hạn ở các single built-in values, chẳng hạn như Strings hoặc integers, mà có thể được sử dụng để liên kết bất kỳ giá trị Swift nào với một trong view của chúng ta. Ví dụ: đây là cách chúng ta thực sự có thể chuyển chính model `User` của mình vào `ProfileEditingView`, thay vì chuyển hai giá trị `username` và `email` riêng biệt:
```
struct ProfileEditingView: View {
    @Binding var user: User

    var body: some View {
        VStack {
            TextField("Username", text: $user.username)
            TextField("Email", text: $user.email)
        }
        .padding()
    }
}
```
Cũng giống như cách chúng tôi đặt tiền tố `State` and `Binding`-wrapped properties bằng `$` khi chuyển chúng vào các trường hợp `TextField` khác nhau, chúng ta có thể làm điều tương tự khi kết nối bất kỳ giá trị `State` nào với thuộc tính `Binding` mà chúng tôi cũng đã tự define.
Ví dụ: đây là cách triển khai của `ProfileView` theo dõi model `User` bằng thuộc tính `State`-wrapped property, sau đó chuyển một liên kết đến model đó khi hiển thị một instance của ProfileEditingView dưới dạng một sheet - sẽ tự động đồng bộ hóa bất kỳ thay đổi nào của người dùng:
```
struct ProfileView: View {
    @State private var user = User.load()
    @State private var isEditingViewShown = false

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Username: ")
                .foregroundColor(.secondary)
                + Text(user.username)
            Text("Email: ")
                .foregroundColor(.secondary)
                + Text(user.email)
            Button(
                action: { self.isEditingViewShown = true },
                label: { Text("Edit") }
            )
        }
        .padding()
        .sheet(isPresented: $isEditingViewShown) {
            VStack {
                ProfileEditingView(user: self.$user)
                Button(
                    action: { self.isEditingViewShown = false },
                    label: { Text("Done") }
                )
            }
        }
    }
}
```
Vì vậy, `Binding`-marked property cung cấp kết nối hai chiều giữa một view đã cho và một state property được xác định bên ngoài view đó, và cả `State` and `Binding`-wrapped properties có thể được chuyển dưới dạng binding bằng cách đặt tiền tố tên thuộc tính của chúng bằng `$`.
## Observing objects
Điểm chung của cả State và Binding là chúng xử lý các giá trị được quản lý trong chính SwiftUI view hierarchy. Tuy nhiên, mặc dù chắc chắn có thể xây dựng một ứng dụng giữ tất cả các state của nó trong các view khác nhau - đó thường không phải là một ý tưởng hay về mặt kiến trúc và tách biệt các mối quan tâm và có thể dễ dàng dẫn đến việc view của chúng ta trở nên khá lớn và phức tạp.
Rất may, SwiftUI cũng cung cấp một số cơ chế cho phép chúng ta kết nối các external model objects với các view khác nhau. Một cơ chế như vậy là giao thức `ObservableObject`, khi được kết hợp với `ObservedObject` property wrapper, cho phép chúng ta thiết lập các liên kết với các loại tham chiếu được quản lý bên ngoài view layer của chúng ta.
Ví dụ: hãy cập nhật `ProfileView` mà chúng ta đã xác định ở trên - bằng cách chuyển trách nhiệm quản lý model `User` của chúng ta ra khỏi view và sang một đối tượng mới, dedicated object. Bây giờ, có một số phép ẩn dụ khác nhau mà chúng ta có thể sử dụng để mô tả một đối tượng như vậy, nhưng vì chúng ta đang tìm cách tạo ra một loại sẽ điều khiển một instance của một trong các model của chúng ta - hãy làm cho nó trở thành model controller phù hợp với protocol `ObservableObject` của SwiftUI:
```
class UserModelController: ObservableObject {
    @Published var user: User
    ...
}
```
Với loại ở trên, bây giờ chúng ta hãy quay lại `ProfileView` và làm cho nó observe một instance của `UserModelController` mới dưới dạng `ObservedObject`, thay vì sử dụng `State`-wrapped property để theo dõi model User. Điều thực sự gọn gàng là chúng ta vẫn có thể dễ dàng bind model đó với `ProfileEditingView` của chúng ta, giống như trước đây, vì các ObservedObject-wrapped properties cũng có thể được chuyển đổi thành các bindings - như thế này:
```
struct ProfileView: View {
    @ObservedObject var userController: UserModelController
    @State private var isEditingViewShown = false

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("Username: ")
                .foregroundColor(.secondary)
                + Text(userController.user.username)
            Text("Email: ")
                .foregroundColor(.secondary)
                + Text(userController.user.email)
            Button(
                action: { self.isEditingViewShown = true },
                label: { Text("Edit") }
            )
        }
        .padding()
        .sheet(isPresented: $isEditingViewShown) {
            VStack {
                ProfileEditingView(user: self.$userController.user)
                Button(
                    action: { self.isEditingViewShown = false },
                    label: { Text("Done") }
                )
            }
        }
    }
}
```
Tuy nhiên, sự khác biệt quan trọng giữa triển khai mới và triển khai dựa trên State mà chúng ta đã sử dụng trước đây, là `UserModelController` hiện cần được đưa vào `ProfileView` như một phần của trình khởi tạo của nó.
Lý do cho điều đó, ngoài việc nó “buộc” chúng ta phải thiết lập một dependency graph được xác định rõ ràng hơn trong code, mà còn là một thuộc tính được mark bằng `ObservedObject` không bao hàm bất kỳ hình thức sở hữu nào đối với đối tượng mà thuộc tính đó trỏ đến đến.
Vì vậy, trong khi những thứ như sau có thể compile thành công, nó có thể gây ra các runtime issues - vì phiên bản `UserModelController` được lưu trữ trong view của chúng ta có thể bị phân bổ khi view của chúng ta được tạo lại trong quá trình cập nhật (vì view của chúng ta hiện là chủ sở hữu chính của nó):
```
struct ProfileView: View {
    @ObservedObject var userController = UserModelController.load()
    ...
}
```
Để khắc phục sự cố trên, Apple đã giới thiệu một property wrapper mới như một phần của iOS 14 và macOS Big Sur có tên `StateObject`. Một thuộc tính được đánh dấu bằng `StateObject` hoạt động giống hệt như một `ObservedObject` - với việc bổ sung SwiftUI sẽ đảm bảo rằng bất kỳ đối tượng nào được lưu trữ trong một thuộc tính như vậy sẽ không vô tình bị release khi  framework tạo lại các instance mới của mộtview khi hiển thị lại nó:
```
struct ProfileView: View {
    @StateObject var userController = UserModelController.load()
    ...
}
```
Mặc dù về mặt kỹ thuật, chỉ có thể sử dụng `StateObject` từ bây giờ - tôi vẫn khuyên bạn nên sử dụng `ObservedObject` khi quan sát các đối tượng bên ngoài và chỉ sử dụng `StateObject` khi xử lý các đối tượng thuộc sở hữu của chính một view. Hãy coi `StateObject` và `ObservedObject` là kiểu tham chiếu tương đương với `State` và `Binding`, hoặc các phiên bản SwiftUI của strong và weak properties.
## Observing and modifying the environment
Cuối cùng, hãy xem cách enviroment system của SwiftUI có thể được sử dụng để chuyển các phần state khác nhau giữa hai view không được kết nối trực tiếp với nhau. Mặc dù thường dễ dàng tạo ràng buộc giữa view chính và một trong các view con của nó, việc chuyển một đối tượng hoặc giá trị nhất định xung quanh trong toàn bộ hệ thống view hierarchy có thể khá phức tạp - và đó chính xác là loại vấn đề mà enviroment hướng tới giải quyết.
Có hai cách chính để sử dụng enviroment của SwiftUI. Một là bắt đầu bằng cách xác định EnvironmentObject-wrapped property trong view muốn truy xuất một đối tượng nhất định - ví dụ như cách `ArticleView` này truy xuất một đối tượng `Theme` có chứa thông tin màu:
```
struct ArticleView: View {
    @EnvironmentObject var theme: Theme
    var article: Article

    var body: some View {
        VStack(alignment: .leading) {
            Text(article.title)
                .foregroundColor(theme.titleTextColor)
            Text(article.body)
                .foregroundColor(theme.bodyTextColor)
        }
    }
}
```
Sau đó, chúng ta phải đảm bảo cung cấp đối tượng enviroment (ví dụ `Theme` trong trường hợp này) trong một trong các view cha của nó và SwiftUI sẽ đảm nhận phần còn lại. Điều đó được thực hiện bằng cách sử dụng công cụ sửa đổi `environmentObject`, ví dụ như thế này:
```
struct RootView: View {
    @ObservedObject var theme: Theme
    @ObservedObject var articleLibrary: ArticleLibrary

    var body: some View {
        ArticleListView(articles: articleLibrary.articles)
            .environmentObject(theme)
    }
}
```
Cách thứ hai để sử dụng enviroment system của SwiftUI là xác định một custom `EnvironmentKey`  - sau đó có thể được sử dụng để gán và truy xuất các giá trị đến và từ loại `EnvironmentValues`:
```
struct ThemeEnvironmentKey: EnvironmentKey {
    static var defaultValue = Theme.default
}

extension EnvironmentValues {
    var theme: Theme {
        get { self[ThemeEnvironmentKey.self] }
        set { self[ThemeEnvironmentKey.self] = newValue }
    }
}
```
Với những điều trên, giờ đây chúng ta có thể đánh dấu thuộc tính `theme` của view bằng cách sử dụng trình `Environment` property wrapper (chứ không phải là EnvironmentObject) và chuyển vào key path của environment key mà chúng ta muốn truy xuất giá trị:
```
struct ArticleView: View {
    @Environment(\.theme) var theme: Theme
    var article: Article

    var body: some View {
        VStack(alignment: .leading) {
            Text(article.title)
                .foregroundColor(theme.titleTextColor)
            Text(article.body)
                .foregroundColor(theme.bodyTextColor)
        }
    }
}
```
Một sự khác biệt đáng chú ý giữa hai phương pháp trên là phương pháp dựa trên key yêu cầu chúng ta xác định một giá trị mặc định tại thời điểm biên dịch, trong khi phương pháp dựa trên EnvironmentObject giả định rằng một giá trị như vậy sẽ được cung cấp trong thời gian chạy.

Hy vọng bài viết sẽ có ích với các bạn

Reference: https://www.swiftbysundell.com/articles/swiftui-state-management-guide/