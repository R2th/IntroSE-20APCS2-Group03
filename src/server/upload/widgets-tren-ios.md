Apple gần đây đã bắt đầu với hỗ trợ các widget  cho iOS. Chúng cung cấp thông tin tối thiểu nhưng hữu ích cho người dùng mà không cần truy cập vào ứng dụng.

Bài viết này nhằm mục đích giới thiệu thế giới Widget mới này. Chúng ta sẽ khám phá rộng rãi về WidgetKit SDK và hiểu các thành phần và quy trình xây dựng widget. Bạn sẽ cần phải làm quen với SwiftUI vì việc xây dựng các widget sẽ sử dụng SwiftUI. Vì một widget không phải là một ứng dụng về bản chất thực sự của nó, nó không sử dụng App Delegates hay Navigation Stack. Hơn nữa, một widget chỉ tồn tại với một ứng dụng mẹ, nó không phải là một thực thể độc lập. Tóm lại, widget cung cấp cho người dùng các thông tin nhanh của ứng dụng. OS tự động refresh widget vào khoảng thời gian được đặt trước.



##### Requirements
Đầu tiên, để bắt đầu với các widget, chúng ta cần có:
1. Mac OS 10.15.5 hoặc mới hơn.
1. Xcode 12 trở lên.

# Setup
Như đã đề cập trước đây, một widget không thể tồn tại nếu không có ứng dụng mẹ. Vì vậy, trước tiên hãy tạo một Single View App. Đối với tùy chọn Life Cycle, tôi đang chọn vòng đời SwiftUI, điều này sẽ sử dụng quy ước mới của attribute @main để xác định điểm bắt đầu trong code. Sau khi hoàn tất, bây giờ chúng ta cần thêm một widget extension mới sẽ chứa code cho widget của chúng ta.

`Select File -> New -> Target -> Widget extension.`
![](https://images.viblo.asia/f3a51ca0-b8eb-422e-95a0-b83c23ea4f74.png)

Đặt cho widget bất kỳ tên nào bạn muốn, đảm bảo rằng bạn bỏ chọn tùy chọn ‘Include Configuration Intent’. Tôi sẽ giải thích điều này sau.
![](https://images.viblo.asia/33d62ccc-11d8-40f4-a86c-75ff2a4f1c60.png)

Tiếp theo, nhấp vào Finish và bạn sẽ thấy một cửa sổ bật lên yêu cầu bạn active widget extension scheme, nhấp vào active, vậy là xong.
![](https://images.viblo.asia/f1002e88-319d-4ea6-a4fb-ae4e467e5059.png)

Bây giờ, chọn Swift File trong widget extension, bạn sẽ thấy rằng Xcode đã tạo hầu hết khung code. Điều hướng đến struct của Widget, nó sẽ là tên của tệp widget bạn đã nhập trong quá trình thiết lập. Bạn sẽ nhận thấy attribute ‘@main’ cho struct này, cho biết rằng đây là điểm bắt đầu cho tiện ích con của bạn.

```
       StaticConfiguration(kind: kind, provider: Provider()) { entry in
           Static_WidgetEntryView(entry: entry)
               .frame(maxWidth: .infinity, maxHeight: .infinity)
               .background(Color.black)
       }
       .configurationDisplayName("My Widget")
       .description("This is an example widget.")
```


**Kind**: identifier cho widget, có thể được sử dụng để thực hiện cập nhật hoặc thực hiện truy vấn. 

**Nhà cung cấp**: giá trị này thuộc loại ‘TimelineProvider’, là datasource cho widget. Nó chịu trách nhiệm xác định dữ liệu nào cần được hiển thị trên widget tại các thời điểm khác nhau. 

**Nội dung**: Đây là dạng xem SwiftUI sẽ được hiển thị cho người dùng.

### Hỗ trợ các kích thước khác nhau của Widget
WidgetKit hỗ trợ ba kích thước, cụ thể là nhỏ, vừa và lớn. Sử dụng tùy chọn 'ManagedFamilies' trong khi khởi chạy tiện ích con của bạn để xác định kích thước nào bạn muốn hỗ trợ, theo mặc định, tất cả các kích thước đều được bật.

`supportedFamilies([.systemSmall, .systemMedium, .systemLarge])`

Given that users can choose from three sizes for the widget, we would need to incorporate the UI for the widget likewise, to have the best look and feel for each size. In our View file, we need to be able to determine which size family has been selected by the user in order to change the UI in line with it. For this, widget kit provides an environment variable of the family size selected. We could then set up the UI based on the selected size.

Do người dùng có thể chọn từ ba kích thước cho tiện ích con, chúng ta cũng cần kết hợp UI cho Widget đó để có giao diện đẹp nhất cho từng kích thước. Trong View, chúng ta cần có thể xác định họ kích thước nào đã được người dùng chọn để thay đổi UI phù hợp với nó.

```
struct Static_WidgetEntryView : View {
    var entry: Provider.Entry

    @Environment(\.widgetFamily) var family

    @ViewBuilder
    var body: some View {

        switch family {
        case .systemSmall:
            ViewForSystemSmall(entry: entry)
        case .systemMedium:
            ViewForSystemMedium(entry: entry)
        case .systemLarge:
            ViewForSystemLarge(entry: entry)
        @unknown default:
            fatalError()
        }
    }
}
```

### The TimeLine Provider
The struct Provider là kiểu ‘TimelineProvider’, cung cấp 3 methods:
```
1. func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ())
2. func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ())
3. func placeholder(in context: Context) -> SimpleEntry
```


Một để cung cấp Placeholder cho tiện ích con, thứ hai để cung cấp snapshot và thứ ba để trả về current timeline.

Snapshot được sử dụng bởi Hệ điều hành khi yêu cầu return 1 view nhanh nhất có thể mà không cần tải bất kỳ dữ liệu nào hoặc thực hiện requets mạng. Nó được sử dụng trong thư viện Widget, cho phép người dùng xem trước widget trước khi thêm nó vào màn hình chính.

Hàm getTimeline, phương thức này định cấu hình những gì widget cần hiển thị tại các thời điểm khác nhau. Timeline về cơ bản là một array các objects tuân theo protocol TimelineEntry. Ví dụ: nếu bạn quyết định tạo một widget để đếm ngược những ngày còn lại cho một sự kiện cụ thể. Bạn sẽ cần tạo một số view bắt đầu từ ngày hiện tại cho đến deadline.

![](https://images.viblo.asia/ac4d6074-edef-4c22-b660-ea0468e87d95.png)

Đây cũng là nơi bạn có thể thực hiện bất kỳ network calls không đồng bộ nào. Widget có thể thực hiện network calls để tìm nạp dữ liệu hoặc có thể sử dụng một vùng chứa được chia sẻ từ ứng dụng máy chủ chính để thu thập dữ liệu. Tiện ích sẽ hiển thị dữ liệu sau khi completion được gọi.

### Timeline Reload Policy

Để quyết định thời điểm hệ điều hành cần cập nhật lên set các view tiếp theo, hệ điều hành sử dụng 'TimelineReloadPolicy'. Chính sách reload ‘.atEnd’ chỉ định rằng Hệ điều hành sẽ tải lại các timeline entries khi không còn mục nào nữa. Bạn sẽ thấy rằng tôi đã tạo một timeline cách nhau một phút. Năm entries của view được thêm vào, bằng cách này Widget sẽ cập nhật sau mỗi phút và hiển thị thời gian cho phù hợp. Sau khi thời lượng 5 phút trôi qua, phương thức ‘getTimeline’ được gọi để truy xuất  set các views tiếp theo. TimelineReloadPolicy cũng cung cấp các tùy chọn như ‘after (date)’ và ‘never’, để cập nhật dòng thời gian sau một ngày cụ thể và không bao giờ cập nhật dòng thời gian tương ứng.

```
struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date())
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []

        //enteries are separated by a minute
        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}
```

Chạy project, trên màn hình chính, nhấn và nhấp vào dấu ‘+’ ở trên cùng bên trái. Từ danh sách các tùy chọn, chọn widget của bạn, sau đó bạn có thể chọn kiểu widget mà bạn muốn thêm và nhấp vào 'Thêm Widget'. Bạn sẽ thấy tiện ích hiển thị thời gian hiện tại.

### Dynamic Widget Configuration

Cho đến nay widget của chúng ta ít nhiều vẫn ở trạng thái tĩnh, người dùng không thể tương tác với widget hoặc xác định những gì widget hiển thị trong thời gian chạy. Bằng cách sử dụng Configuration Intent, chúng ta có thể làm cho Widget của mình trở nên động. Ban đầu khi thiết lập project, chúng ta đã bỏ chọn tùy chọn ‘Include Configuration Intent’ để làm cho Widget có thể tùy chỉnh, bây giờ chúng ta hãy xem cách chúng ta có thể làm cho Widget của mình tương tác hơn. Với mục đích của cuộc trình diễn này, chúng ta sẽ thiết lập widget của mình để cho phép người dùng chọn từ danh sách các tùy chọn, trong trường hợp này là danh sách các thành phố.

### Setup for a custom intent

1) Chúng ta cần tạo custom intent definition, chúng ta sẽ sử dụng ‘SiriKit Intent Definition’ cho việc này. Nhấp vào tùy chọn menu File, chọn tùy chọn New File và tiến hành chọn ‘SiriKit Intent Definition’, đặt tên cho nó, tôi đang đặt tên là ‘CityNamesIntent’.

![](https://images.viblo.asia/ddf56dd8-9acf-4501-babb-6c1fb0136a8e.png)

2) Chọn tệp Intent mới tạo, bây giờ chúng ta cần thêm một Intent mới. Để thực hiện việc này, hãy nhấp vào biểu tượng ‘+’ ở dưới cùng bên trái, chọn New Intent, đặt tên là CityNames. Tiếp theo trong phần Custom Intent section ở bên phải, hãy đặt danh mục thành ‘View’ và đảm bảo rằng tùy chọn ‘ntent is eligible for widgets’ được chọn.

![](https://images.viblo.asia/7dcd3987-8ff4-4658-9735-1ec5d45d89a8.png)

3) Với Intent mới được thêm vào, bây giờ chúng ta cần xác định các thuộc tính mà Intent sẽ xử lý. Trong trường hợp của chúng ta, một enum đơn giản cho các tên thành phố là đủ. Nhấp lại vào biểu tượng ‘+’, chọn ‘New Enum’. Nhấp vào enum mới được tạo để truy cập các thuộc tính của nó. Trong phần Cases, nhấp vào biểu tượng ‘+’ để thêm giá trị vào enum, tôi đã thêm các tên thành phố khác nhau như bạn có thể thấy. 

4) Cuối cùng, quay lại Custom Intent CityName mà chúng ta đã tạo, trong phần parameter, nhấp vào biểu tượng ‘+’ ở dưới cùng và thêm một parameter mới, đặt tên cho nó là cities. Cung cấp Tên hiển thị thích hợp và trong ‘type’, hãy chọn CityNamesEnum mà chúng ta đã tạo trước đó. Với điều đó, custom intent definition của chúng ta hiện đã hoàn thành. Tuy nhiên, Widget của chúng ta cần có thể truy cập Intent này để chúng ta sử dụng nó. Để hiển thị Intent cho Widget của chúng ta, hãy chuyển đến Project Targets và trong Supported Intents, chọn intent mà chúng tôi đã tạo. Bây giờ chúng ta cần cập nhật Widget của mình từ cấu hình Static thành Intent configuration. Đối với điều này, trước tiên chúng ta hãy tạo một provider instance mới. Tạo struct ‘ConfigurableProvider’ thuộc loại IntentTimelineProvider. Chúng ta xác định ba hàm tương tự như chúng ta đã làm trong trường hợp của TimelineProvider, thay đổi đáng chú ý ở đây là việc bổ sung tham số ‘configuration’, thuộc loại CityNamesIntent mà chúng ta đã xác định. Configuration parameter hiện có thể được truy cập để lấy giá trị do người dùng chọn và cập nhật hoặc sửa đổi dòng thời gian của bạn theo đó.

```
struct ConfigurableProvider: IntentTimelineProvider {

    typealias Entry = SimpleEntry

    typealias Intent = CityNamesIntent

    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date())
    }

    func getSnapshot(for configuration: CityNamesIntent, in context: Context, completion: @escaping (SimpleEntry) -> Void) {
        let entry = SimpleEntry(date: Date())
        completion(entry)
    }

    func getTimeline(for configuration: CityNamesIntent, in context: Context, completion: @escaping (Timeline<SimpleEntry>) -> Void) {
        var entries: [SimpleEntry] = []

        let currentDate = Date()
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .minute, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate)
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}
```

Một điều cuối cùng cần cập nhật là thay đổi định nghĩa của Widget của chúng ta từ Static sang IntentConfiguration. Dưới Static_Widget definition, hãy thêm một IntentConfiguration mới, chúng ta nhận thấy rằng nó yêu cầu một intent instance, hãy cung cấp CityNameIntent tại đây. Đối với nhà cung cấp, hãy sử dụng ConfigurableProvider mà chúng ta đã tạo. Phần còn lại vẫn giữ nguyên.

```
@main
struct Static_Widget: Widget {
    let kind: String = "Static_Widget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind,
                            intent: CityNamesIntent.self,
                            provider: ConfigurableProvider(),
                            content: { entry in
                                Static_WidgetEntryView(entry: entry)
                                .frame(maxWidth: .infinity, maxHeight: .infinity)
                                .background(Color.black)
                            })
            .configurationDisplayName("My Widget")
            .description("This is an example widget.")
            .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
    }
}
```

Với điều đó, Widget của chúng ta hiện có thể configurable. Chạy ứng dụng, nhấn và giữ widget và chọn Edit Widget, bạn sẽ thấy một danh sách với các tên thành phố mà chúng ta đã cung cấp. Khi bất kỳ lựa chọn nào được thực hiện, bạn có thể truy cập giá trị đã chọn trong Provider và theo đó thay đổi view.

![](https://images.viblo.asia/71549704-a376-4b23-9f0a-e808ee3b343d.png)

Nguồn tham khảo: [Widgets on iOS](https://medium.com/swlh/widgets-on-ios-e0156a2e7239)