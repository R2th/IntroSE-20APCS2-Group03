### Giới thiệu

Today extension xuất hiện từ iOS 8, đây là một cách để bạn chia sẻ chức năng của ứng dụng với các ứng dụng khác hoặc bản thân hệ điều hành.
Một trong những loại tiện ích này là Today extension, còn được gọi là Widget. Các tính năng này cho phép bạn trình bày thông tin trong Trung tâm thông báo và Màn hình khóa và là một cách tuyệt vời để cung cấp thông tin tức thời và cập nhật mà người dùng quan tâm. Tiện ích mở rộng hôm nay cũng có thể xuất hiện trên màn hình Tìm kiếm và nhanh chóng action trên màn hình Home. Trong bài viết này, chúng ta sẽ viết Today extension cập nhật giá thị của Bitcoin dựa trên Dollar Hoa Kỳ.

**Nào chúng ta cùng tìm hiểu nhé!**

### Giới thiệu về Bitcoin

Nếu bạn không quen thuộc với Bitcoin, giải thích ngắn gọn là nó là một đồng tiền kỹ thuật số. Bên cạnh việc sử dụng nó cho giao dịch peer-to-peer và mua bán, giao dịch Bitcoin cho phép người dùng trao đổi nó, và tiền tệ như US Dollar và Euro.
Là một đồng tiền tương đối mới, giá trị thị trường biến động theo từng phút; đã có những đỉnh núi và đáy khổng lồ trong cuộc đời ngắn ngủi của nó. Vì vậy, thông qua Today extension vì các nhà đầu tư sẽ dễ dàng theo dõi liên tục.

### Giới thiệu về Crypticker

Đầu tiên bạn cần một ứng dụng chính để mở rộng. Crypticker là một ứng dụng đơn giản hiển thị giá Bitcoin hiện tại, sự khác biệt giữa giá của ngày hôm qua và giá hiện tại, cũng như biểu đồ lịch sử giá cả. Biểu đồ bao gồm 30 ngày lịch sử; gõ hoặc vuốt ngón tay của bạn trên biểu đồ cho thấy giá chính xác cho một ngày cụ thể trong quá khứ.
Extension sẽ chứa tất cả các tính năng này. 

### BTC Widget

[Tải xuống](https://koenig-media.raywenderlich.com/uploads/2017/01/crypticker-starter.zip) dự án bắt đầu Crypticker để bắt đầu. Dự án chứa toàn bộ ứng dụng Crypticker như mô tả ở trên, nhưng xin lưu ý rằng hướng dẫn này sẽ không tập trung vào sự phát triển của ứng dụng chứa.
Xây dựng và điều hành dự án để xem những gì bạn đang bắt đầu với:

![](https://viblo.asia/uploads/61725f28-d53b-4c89-8755-cff53968d57d.png)

Ứng dụng trông rất giống với ảnh chụp màn hình ở trên, dữ liệu được hiển thị sẽ phụ thuộc vào thị trường Bitcoin hiện nay như thế nào.

Đối với những người không quen thuộc, BTC là viết tắt cho Bitcoin; giống như USD đồng nghĩa với đồng đô la Mỹ. Today extension sẽ hiển thị phiên bản được thu nhỏ của chế độ xem chính của Crypticker. Do đó, tên của nó sẽ là BTC Widget .
Vào cuối hướng dẫn, Tiện ích mở rộng Hôm nay của bạn sẽ trông giống như sau:

![](https://viblo.asia/uploads/aed9e25a-f806-41b3-9757-8c71e73c773f.png)

### Add a Today Extension target

Các phần mở rộng được đóng gói như một tập tin nhị phân riêng biệt từ ứng dụng chính của chúng. Vì vậy, bạn sẽ cần thêm Today Extension targer  vào dự án Crypticker.

Trong Trình chuyển hướng Dự án của Xcode, hãy chọn dự án Crypticker và thêm một mục tiêu mới bằng cách chọn Editor \ Add Target ... Khi trình chọn mẫu xuất hiện, hãy chọn iOS \ Application Extension , và sau đó là Today Extension . Nhấp vào Tiếp theo .

![](https://viblo.asia/uploads/c20cc647-41e7-450c-bf11-85b8ed554119.png)

Đặt tên sản phẩm là BTC Widget , và xác minh rằng Swift là ngôn ngữ, dự án là Crypticker và Embed in Application cũng là Crypticker . Nhấp vào Kết thúc .

![](https://viblo.asia/uploads/a5892596-5f78-460d-b599-98788af550bc.png)

Khi được nhắc, kích hoạt chương trình BTC Widget. Như văn bản chỉ ra, một lược đồ Xcode sẽ được tạo cho bạn.
Xin chúc mừng! BTC Widget bây giờ sẽ xuất hiện trong danh sách mục tiêu của bạn.

![](https://viblo.asia/uploads/40724a51-c527-4967-927a-58bb03cf13ea.png)

Đảm bảo bạn chọn BTC Widget , sau đó là tab General , và sau đó nhấn nút + trong phần Khung và Thư viện Liên kết.

![](https://viblo.asia/uploads/eebff5ae-874f-4f26-a807-4e3896a3a225.png)

Chọn CryptoCurrencyKit.framework và nhấp vào Thêm .

Tại thời điểm này, bạn đã sẵn sàng để bắt đầu triển khai phần mở rộng.
Chú ý bây giờ có một nhóm trong trình điều khiển dự án được đặt tên theo mục tiêu mới của bạn, BTC Widget . Đây là nơi mã của Bộ phận tiếp thị mở rộng ngày hôm nay được nhóm, theo mặc định.
Mở rộng nhóm và bạn sẽ thấy có bộ điều khiển chế độ xem, tệp sơ đồ câu chuyện và tệp Info.plist. Cấu hình mục tiêu của nó cũng cho nó tải giao diện của nó từ MainInterface.storyboard, trong đó có một điều khiển xem đơn với lớp thiết lập để TodayViewController.swift 

![](https://viblo.asia/uploads/829cf4c6-cedf-436a-8eb4-8aab5f5dced1.png)

Bạn sẽ nhận thấy một số tệp tin bạn có thể mong đợi bị thiếu trong mẫu Tiện ích mở rộng Hôm nay; giống như một đại diện ứng dụng chẳng hạn. Hãy nhớ rằng các tiện ích mở rộng ngày hôm nay chạy bên trong ứng dụng máy chủ lưu trữ khác, do đó chúng không đi qua vòng đời ứng dụng truyền thống.
Về bản chất, vòng đời của phần mở rộng ngày hôm nay được ánh xạ tới vòng đời của TodayViewController. Ví dụ, phương thức viewDidLoad của TodayViewController được gọi khi widget được khởi chạy, giống như application(_:didFinishLaunchingWithOptions:) được gọi khi khởi chạy ứng dụng chính.
Mở MainInterface.storyboard . Bạn sẽ thấy một cái nhìn rõ ràng với nhãn Hello World .
Đảm bảo rằng lược đồ BTC Widget được chọn trong thanh công cụ của Xcode và xây dựng và chạy. Thao tác này sẽ khởi chạy Trình mô phỏng iOS và mở Trung tâm thông báo, từ đó sẽ khởi chạy tiện ích của bạn. Trung tâm Thông báo có hiệu quả ứng dụng máy chủ lưu trữ cho Today extension. 

![](https://viblo.asia/uploads/96033f16-78ac-4643-acf4-2bb299bd2f1d.png)


### Build the Interface

Mở file MainInterface.storyboard và sau đó chúng ta sẽ setup các constain cho các đối tượng UI. Đặt chế độ xem lên cao 110pt và rộng 320pts trong Trình kiểm tra kích thước . Đây là kích thước widget mặc định của iPhone. 

![](https://viblo.asia/uploads/b445dcdf-631d-4741-b3d7-411bd7eb080b.png)

![](https://viblo.asia/uploads/19eb20fe-6fcd-4fee-a88d-028807fd31d1.png)

![](https://viblo.asia/uploads/2584745e-d929-4944-a463-0c82fa34d603.png)

Sau đó chúng ta sẽ thêm một số đoạn code xử lý trong file TodayViewController.swift

```Swift
override func viewDidLoad() {
  super.viewDidLoad()
  lineChartView.delegate = self
  lineChartView.dataSource = self
  
  priceLabel.text = "--"
  priceChangeLabel.text = "--"
}
```

```Swift
 override func viewDidAppear (_ hoạt hình: Bool) {
   super.viewDidAppear (hoạt hình)
  
   fetchPrices {lỗi trong
     nếu lỗi == nil {
       self.updatePriceLabel ()
       self.updatePriceChangeLabel ()
       self.updatePriceHistoryLineChart ()
     }
   }
 }
```

Bây giờ là lúc để xem những gì bạn có cho đến nay. Chọn lược đồ BTC Widget. Xây dựng và chạy.
Nếu Trung tâm Thông báo không xuất hiện, hãy vuốt xuống từ đầu màn hình để kích hoạt nó.
Nếu tiện ích không xuất hiện trong Trung tâm thông báo, bạn sẽ cần thêm thông tin đó qua trình đơn Chỉnh sửa. Ở phía dưới cùng của nội dung lượt xem hôm nay, bạn sẽ thấy nút Chỉnh sửa. Nhấn nút để hiển thị menu của tất cả các Tiện ích mở rộng hôm nay được cài đặt trên hệ thống. Ở đây bạn có thể kích hoạt, vô hiệu hóa và sắp đặt lại chúng như mong muốn. Bật Widget BTC nếu chưa.

![](https://viblo.asia/uploads/f9d2d0ba-4a32-4057-850a-7600e23d65dd.png)

Câu hỏi đặt ra là bây giờ chúng ta muốn thay đổi chiều cao thì Widget thì làm thế nào?

Chúng ta thêm đoạn code vào hàm **viewDidLoad** như sau: 

```Swift
 extensionContext? .widgetLargestAvailableDisplayMode = .expanded
```

Điều này sẽ giúp chúng ta thay đổi chiều cao của Widget thông qua việc select nút "show more" hoặc "show less". Ngoài ra phần xử lý dưới đây sẽ giúp hệ thống hiểu được chính xác kích thước chúng ta muốn thay đổi.

```Swift
func widgetActiveDisplayModeDidChange(_ activeDisplayMode: NCWidgetDisplayMode, withMaximumSize maxSize: CGSize) {
  let expanded = activeDisplayMode == .expanded
  preferredContentSize = expanded ? CGSize(width: maxSize.width, height: 200) : maxSize
}
```

![](https://viblo.asia/uploads/d2dca89b-734e-4577-b70c-f0c1f980ffc2.png)

### Kết Luận

Today extension cung cấp cho người dùng những trải nghiệm tốt nhất, trong khi người dùng không cần phải mở ứng dụng nhiều lần. Vì vậy các ứng dụng sẽ hiển thị thông tin thông qua Today extension ngày càng trở nên phổ biến hơn.

##### _Nguồn:_

[https://www.raywenderlich.com/150953/today-extension-tutorial-getting-started](https://www.raywenderlich.com/150953/today-extension-tutorial-getting-started)