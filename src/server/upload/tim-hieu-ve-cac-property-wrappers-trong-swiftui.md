### Giới thiệu

Có thể nói từ khi được Apple giới thiệu SwiftUI được coi như một xu hướng tương lai trong việc thiết kế UI trong iOS App. Vậy trong SwiftUI có các property wrappers nào, trong bài viết này chúng ta cùng tìm hiểu nhé!

### Property wrappers

@AppStorage: đọc và ghi các giá trị từ UserDefaults, đồng nghĩa với việc nó sở hữu dữ liệu của nó.

@Binding: refers đến loại dữ liệu được tạo bởi một view khác, việc thay đổi cũng dẫn tới sự thay đổi tại nguồn dữ liệu, đồng nghĩ với việc nó không sở hữu dữ liệu của nó.

@Environment: cho phép đọc dữ liệu từ system như: màu sắc, tuỳ chọn trợ năng, bộ sưu tập đặc điểm nhưng bạn cũng có thể thêm các keys riêng nếu bạn muốn, đồng nghĩ với việc nó không sở hữu dữ liệu của nó.

@EnvironmentObject: đọc object được shared mà chúng ta đặt nó vào **environment**, đồng nghĩ với việc nó không sở hữu dữ liệu của nó.

@FetchRequest: tạo các fetch request trong Core Data fetch, nó sở hữu dữ liệu của nó.

@FocusedBinding: được thiết kế để theo dõi giá trị của key **window**  dụ như textfield đã được selected..., nó không sở hữu dữ liệu của nó

@FocusedValue: là phiên bản giản đơn của **@FocusedBinding** nó không unwrap giá trị ràng buộc của bạn, nó không sở hữu dữ liệu của nó

@GestureState: lưu trữ các giá trị được liên kết với **gesture** đang được thực hiện, như là khi bạn swipe, nó sở hữu dữ liệu của nó.  

@NSApplicationDelegateAdaptor: sử dụng để tạo và đăng ký class như là app delegate cho macOS app , nó sở hữu dữ liệu của nó.  

@UIApplicationDelegateAdaptor: sử dụng để tạo và đăng ký class như là app delegate cho iOS app , nó sở hữu dữ liệu của nó. 

@ObservedObject: refers tới instance của external class  conforms tới ObservableObject protocol , nó không sở hữu dữ liệu của nó. 

@Published: được đính kèm với các thuộc tính trong ObservableObject và nói với SwiftUI là sẽ refresh các view chức property này khi nó thay đổi, nó sở hữu dữ liệu của nó.

@SceneStorage: cho phép lưu và khôi phục một lượng nhỏ dữu liệu, nó sở hữu dữ liệu của nó. 

@State: cho phép thao tác một số lượng nhỏ loại dữ liệu cục bộ trong view, nó sở hữu dữ liệu của nó. 

### Storing temporary data

Khi nói đến việc lưu trữ dữ liệu trong ứng dụng, property wrapper đơn giản nhất là @State. Nó được sử dụng để lưu trữ các giá trị local ví dụ: int, bool,...
 @Binding được sử dụng cho dữ liệu đơn giản mà bạn muốn thay đổi nhưng dữ liệu đó được tạo ở một nơi khác.

Có một biến thể của @State được gọi là @GestureState, đặc biệt để theo dõi các cử chỉ đang hoạt động **gesture**.

Với các mục đích nâng cao hơn - tức là xử lý các lớp hoặc chia sẻ dữ liệu ở nhiều nơi - bạn không nên sử dụng @State và @Binding, bạn nên tạo đối tượng của mình ở đâu đó bằng @StateObject, sau đó sử dụng nó trong view khác với @ObservedObject. 

Nếu bạn muốn tìm cách handle dữ liệu từ view tới view, bạn có thể sử dụng @EnvironmentObject.

### Storing long-term data

@AppStorage: sử dụng mỗi khi đọc, ghi giá trị từ UserDefaults.

@SceneStorage: quản lý các trạng thái của app: đóng, mở, reload...

@FetchRequest: sử dụng để thao tác với CoreData

### Reading environment data
@Environment : sử dụng để đọc nhiều loại dữ liệu như bộ sưu tập đặc điểm nào hiện đang hoạt động, cho dù họ đang sử dụng màn hình 2x hay 3x, múi giờ... Nó cũng có một số hành động ứng dụng đặc biệt, chẳng hạn như xuất tệp và mở URL trong trình duyệt web.

@ScaledMetric: cho phép điều chỉnh kích thước giao diện người dùng của mình dựa trên cài đặt Dynamic Type của người dùng.

### Application handling

Nếu bạn cần truy cập vào các method và thuộc tính cũ của UIApplicationDelegate and NSApplicationDelegate, bạn nên sử dụng @UIApplicationDelegateAdaptor và @NSApplicationDelegateAdaptor


###  Kết Luận

SwiftUI xuất hiện với nhiều điểm mới, nhất là khả năng binding dữ liệu từ lớp data tới lớp View cũng như giữ các view với nhau.

Nguồn: https://www.hackingwithswift.com/quick-start/swiftui/all-swiftui-property-wrappers-explained-and-compared