Hiện tại, ScrollView trong SwiftUI không thể tùy biến nhiều. Một tính năng có thể thiếu, là tính năng làm mới nội dung của nó khi kéo view xuống để refresh. May mắn thay, bằng cách sử dụng view preferences, chúng ta có thể quản lý để thêm hành vi đó.

Để áp dụng hành vi này, chúng tôi sẽ cần sử dụng *RefreshableScrollView* thay vì *ScrollView* trực tiếp. Chúng ta sẽ có một biến liên kết boolean để cho biết nếu mô hình đang tải thêm dữ liệu. Các *RefreshableScrollView* sẽ thay đổi các ràng buộc là true, khi view cần refresh. Và model sẽ đưa nó trở lại false, khi refresh đã kết thúc.

```
RefreshableScrollView(refreshing: self.$model.loading) {                
    // Scrollable contents go here
    ...
}
```

```
class MyModel: ObservableObject {
    @Published var loading: Bool = false {
        didSet {
            if oldValue == false && loading == true {                
                // Do async stuff here
                ...

                // When finished loading (must be done on the main thread)
                self.loading = false
            }
        }
    }
}
```

### RefreshableScrollView Implementation ### 

Để thực hiện điều khiển refresh, đầu tiên chúng ta cần tìm cách lấy phần bù scroll của ScrollView. Đây là nơi View Preferences trở nên tiện dụng.

Để có được sự bù đắp, chúng tôi sẽ đặt hai chế độ invisible views. Một cái sẽ ở đầu nội dung scroll ( MovingView()) và cái còn lại được cố định ở đầu ScrollView ( FixedView()). Sự khác biệt ở vị trí Y của chúng, sẽ là phần bù cuộn.
```
struct RefreshableScrollView<Content: View>: View {
    
    ...
    
    var body: some View {
        return VStack {
            ScrollView {
                ZStack(alignment: .top) {
                    MovingView()
                    
                    VStack { self.content }.alignmentGuide(.top, computeValue: { d in (self.refreshing && self.frozen) ? -self.threshold : 0.0 })
                    
                    SymbolView(height: self.threshold, loading: self.refreshing, frozen: self.frozen, rotation: self.rotation)
                }
            }
            .background(FixedView())
            .onPreferenceChange(RefreshableKeyTypes.PrefKey.self) { values in
                self.refreshLogic(values: values)
            }
        }
    }

    ...
}
```

Các chế độ view này chỉ phục vụ một mục đích, đặt ưu tiên với vị trí riêng của chúng:

```
struct MovingView: View {
    var body: some View {
        GeometryReader { proxy in
            Color.clear.preference(key: RefreshableKeyTypes.PrefKey.self, value: [RefreshableKeyTypes.PrefData(vType: .scrollViewTop, bounds: proxy.frame(in: .global))])
        }.frame(height: 0)
    }
}
struct FixView: View {
    var body: some View {
        GeometryReader { proxy in
            Color.clear.preference(key: RefreshableKeyTypes.PrefKey.self, value: [RefreshableKeyTypes.PrefData(vType: .scrollViewContainer, bounds: proxy.frame(in: .global))])
        }
    }
}
```

Lưu ý rằng đáng lẽ có thể đạt được kết quả tương tự, bằng cách sử dụng một chế độ xem và gọi proxy(.frame(in: .named()). Thật không may, dường như có một lỗi với các không gian tọa độ được đặt tên tại thời điểm này và đó là lý do tại sao chúng ta cần hai quan điểm tham khảo riêng biệt.

### Refreshing Feedback

Chúng tôi sẽ kiểm tra độ lệch cuộn để xác định thời tiết chúng tôi đã vượt qua một ngưỡng nhất định ngoài đỉnh. Nếu chúng ta có, một làm mới nội dung sẽ kích hoạt. Chúng tôi cũng muốn hiển thị một mũi tên hoạt hình cung cấp cho chúng tôi một số phản hồi về khoảng cách từ điểm kích hoạt chúng tôi đang ở. Và một khi chúng ta đã đạt được nó, thay thế mũi tên bằng Chỉ báo hoạt động. Mũi tên và chỉ báo hoạt động được thực hiện bên trong SymbolView:

```
struct SymbolView: View {
    var height: CGFloat
    var loading: Bool
    var frozen: Bool
    var rotation: Angle
    
    
    var body: some View {
        Group {
            if self.loading { // If loading, show the activity control
                VStack {
                    Spacer()
                    ActivityRep()
                    Spacer()
                }.frame(height: height).fixedSize()
                 .offset(y: -height + (self.loading && self.frozen ? height : 0.0))
            } else {
                Image(systemName: "arrow.down") // If not loading, show the arrow
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: height * 0.25, height: height * 0.25).fixedSize()
                    .padding(height * 0.375)
                    .rotationEffect(rotation)
                    .offset(y: -height + (loading && frozen ? +height : 0.0))
            }
        }
    }
}

```

Tất cả logic để tính toán khi ngưỡng được vượt qua và mũi tên phải được xoay bao nhiêu, được thực hiện trong  .onPreferenceChange() :

```
// Calculate scroll offset
let movingBounds = values.first { $0.vType == .movingView }?.bounds ?? .zero
let fixedBounds = values.first { $0.vType == .fixedView }?.bounds ?? .zero
self.scrollOffset  = movingBounds.minY - fixedBounds.minY
self.rotation = self.symbolRotation(self.scrollOffset)

// Crossing the threshold on the way down, we start the refresh process
if !self.refreshing && (self.scrollOffset > self.threshold && self.previousScrollOffset <= self.threshold) {
    self.refreshing = true
}
if self.refreshing {
    // Crossing the threshold on the way up, we add a space at the top of the scrollview
    if self.previousScrollOffset > self.threshold && self.scrollOffset <= self.threshold {
        self.frozen = true
    }
} else {
    // remove the sapce at the top of the scroll view
    self.frozen = false
}
// Update last scroll offset
self.previousScrollOffset = self.scrollOffset
```

Cũng lưu ý rằng chúng tôi đang sử dụng .alignmentGuide() trên nội dung ScrollView, để tạm thời thay thế chúng, trong khi quá trình làm mới đang diễn ra.

### Conclusion

Trong bài viết này, chúng ta đã tìm thấy một ứng dụng khác sử dụng View Preferences. Hy vọng chúng ta có thể làm quen nhiều hơn với SwiftUI.

Bài viết được dịch theo [bài viết cùng tên ScrollView – Pull to Refresh.](https://swiftui-lab.com/scrollview-pull-to-refresh/)