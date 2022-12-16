-  `Apple` đã giới thiệu một `API` mới trong `SwiftUI` tại `WWDC21` cho phép chúng ta có thể gắn `action refresh` cho bất kỳ `view` nào. Điều đó đồng nghĩa `Apple` đã hỗ trợ trực tiếp chúng ta cho cơ chế `refresh` rất phổ biến là `pull-to-refresh`. Bài viết này chúng ta sẽ cùng tìm hiểu cơ chế hoạt động của `API` mới này cũng như cùng xây dựng cơ chế `refresh` riêng biệt.

## 1/ Sức mạnh của `async/await`:

- `Apple` đã giới thiệu cho chúng ta một `pattern` đó là `async/await` trong `SwiftUI` để thông báo cho chúng ta biết khi nào `operation``refresh` hoàn tất. Do đó để bắt đầu áp dụng `API` `refreshing` mới  chúng ta sẽ sử dụng từ khóa `async` khi khai báo một `function` để có thể `trigger` mỗi khi `refresh action` tiến hành.

- Giả sử một ứng dụng có tính năng `bookmarking` và chúng tôi đã có `BookmarkListViewModel` chịu trách nhiệm cung cấp `data` cho `UI`. Để cho phép `data` đó được `refresh` chúng ta cần một `method` `reload` hoạt động `asynchorous` lần lượt gọi `DatabaseController` để `fetch` về một `array` các `Bookmark`.

```swift
class BookmarkListViewModel: ObservableObject {
    @Published private(set) var bookmarks: [Bookmark]
    private let databaseController: DatabaseController
    ...

    func reload() async {
        bookmarks = await databaseController.loadAllModels(
            ofType: Bookmark.self
        )
    }
}
```

- Chúng ta đã có một `async function` được gọi để `refresh` `view data`.  Tiếp đó chúng ta sẽ sử dụng `refreshable` trong `BookmarkList` `view` như sau:

```swift
struct BookmarkList: View {
    @ObservedObject var viewModel: BookmarkListViewModel

    var body: some View {
        List(viewModel.bookmarks) { bookmark in
            ...
        }
        .refreshable {
            await viewModel.reload()
        }
    }
}
```

- Với thay đổi trên, `List` `UI` của chúng ta đã hỗ trợ cơ thế `pull-to-refresh`. `SwiftUI` sẽ tự động ẩn và hiển thị `spinner` khi `refresh` đang hoạt động và còn đảm bảo rằng không có hành động `refresh` nào khác hoạt động đồng thời.

- Thêm vào đó `Swift` còn hỗ trợ chúng ta cơ chế `first class function` để chúng ta có thể truyền `method` `reload` từ `viewModel` một cách trực tiếp giúp chúng ta có thể `implementation` một cách gọn nhẹ hơn:

```swift    
struct BookmarkList: View {
    @ObservedObject var viewModel: BookmarkListViewModel

    var body: some View {
        List(viewModel.bookmarks) { bookmark in
            ...
        }
        .refreshable(action: viewModel.reload)
    }
}
```

## 2/ Xử lý error:

- Khi thực hiện action `loading` thì chúng ta thường sẽ phải để tâm nhiều đến việc xử lý `error` vì đây là điều rất dễ xảy ra. Lấy ví dụ cụ thể hơn thì khi `API` `loadAllModels` thực hiện `throws function` thì chúng ta thường kèm theo từ khóa `try` để xử lý bất kỳ `error` nào. Trong `SwiftUI` ta có một cách khác để thực hiện điều đó bằng cách thêm vào trực tiếp từ khóa `throws` khi khai báo `function`:
 
```swift    
class BookmarkListViewModel: ObservableObject {
    ...

    func reload() async throws {
        bookmarks = try await databaseController.loadAllModels(
            ofType: Bookmark.self
        )
    }
}
```
- Tuy nhiên cách làm trên khiến code `BookmarkList` không được thực thi cho đến khi `refreshable` được tùy chỉnh lại đễ hoạt động như `non-throwing async closure`. Để thực hiện điều đó chúng ta cần `wrap` method `reload` lại trong `do/catch` để có thể bắt được `error` khi chúng ta cho hiện thị `ErrorView`.

```swift    
struct BookmarkList: View {
    @ObservedObject var viewModel: BookmarkListViewModel
    @State private var error: Error?

    var body: some View {
        List(viewModel.bookmarks) { bookmark in
            ...
        }
        .overlay(alignment: .top) {
            if error != nil {
    ErrorView(error: $error)
}
        }
        .refreshable {
            do {
    try await viewModel.reload()
    error = nil
} catch {
    self.error = error
}
        }
    }
}
```

- Cách triển khai trên chưa thực sự tối ưu để có thể đóng gói tất cả `state` của chúng ta(bao gồm `error`) trong `viewModel`. Chúng ta cần di chuyển `do/catch` lên trên trong `viewModel` như sau:

```swift    
class BookmarkListViewModel: ObservableObject {
    @Published private(set) var bookmarks: [Bookmark]
    @Published var error: Error?
    ...

    func reload() async {
        do {
            bookmarks = try await databaseController.loadAllModels(
                ofType: Bookmark.self
            )
            error = nil
        } catch {
            self.error = error
        }
    }
}
```

- Chúng ta đã làm cho  `view` của chúng ta trở nên đơn giản hơn hẳn vì method `reload` giờ có thể `throw error` dễ dàng và chi tiết hơn nhiêu vì nó là một phần trong `viewModel`.  Nhưng ở đây chúng ta sẽ cần thêm một  error `property` để có thể sử dụng hiển thị  các `error` xảy ra vì nhiều lý do khác:

```swift   
struct BookmarkList: View {
    @ObservedObject var viewModel: BookmarkListViewModel

    var body: some View {
        List(viewModel.bookmarks) { bookmark in
            ...
        }
        .overlay(alignment: .top) {
            if viewModel.error != nil {
                ErrorView(error: $viewModel.error)
            }
        }
        .refreshable {
            await viewModel.reload()
        }
    }
}
```

### 3/ Tự tùy chỉnh logic refreshing:

- Chúng ta sữ tự thực hiện tùy chỉnh cơ chế `refresh` như sau. Khi chúng ta được truyền cho một `RefreshAction` có `value`, chúng ta sẽ cần `set` `property` `isPerforming` thành `true` khi mà `action` `refresh` đang tiến hành cũng như cho phép chúng ta theo dõi `state` của các `UI` `refreshing` chúng ta mong muốn:

```swift    
class RefreshActionPerformer: ObservableObject {
    @Published private(set) var isPerforming = false

    func perform(_ action: RefreshAction) async {
        guard !isPerforming else { return }
        isPerforming = true
        await action()
        isPerforming = false
    }
}
```

- Công việc tiếp theo chúng ta thực hiện là xây dựng `RetryButton` cho phép chúng ta có thể `Retry` khi mà action `refresh` kết thúc hoặc xảy ra lỗi. Chúng ta sẽ cần một `refresh` `enviremonet value` ở đây cho phép chúng ta có thể `access` bất kỳ `RefreshAction` nào được `inject` trong `view hierachy` để sử dụng `refreshable`. Chúng ta có thể truyền bất kỳ action nào một `instance` mới `RefreshActionPerformer` như sau:

```swift
struct RetryButton: View {
    var title: LocalizedStringKey = "Retry"
    
    @Environment(\.refresh) private var action
    @StateObject private var actionPerformer = RefreshActionPerformer()

    var body: some View {
        if let action = action {
            Button(
                role: nil,
                action: {
                    await actionPerformer.perform(action)
                },
                label: {
                    ZStack {
                        if actionPerformer.isPerforming {
                            Text(title).hidden()
                            ProgressView()
                        } else {
                            Text(title)
                        }
                    }
                }
            )
            .disabled(actionPerformer.isPerforming)
        }
    }
}
```

- Thực tế thì việc `SwiftUI` cho phép chúng ta có thể thêm vào `action` thông qua biến `enviremonet` là một quyền năng rất mạnh mẽ - tương đương việc chúng ta có thể tự `define` một `action` riêng lẻ để có thể sử dụng cho bất kỳ view nào trong `view hierachy`. Khi không có sự thay đổi nào trong `BookmarkList` view, nếu chúng ta chỉ thêm một `RetryButton` vào trong `ErrorView` thì nó cũng tiến hành action `refreshing` y như UI `List` vì đơn giản là `action` này có thể sử dụng cho bất kỳ view nào trong `view-hierachy`:

```swift
struct ErrorView: View {
    @Binding var error: Error?

    var body: some View {
        if let error = error {
            VStack {
                Text(error.localizedDescription)
                    .bold()
                HStack {
                    Button("Dismiss") {
                        self.error = nil
                    }
                    RetryButton()
                }
            }
            .padding()
            .background(Color.red)
            .foregroundColor(.white)
            .cornerRadius(10)
        }
    }
}
```