# Theo kèm với Iphone 12 ứng dụng IDE của apple Xcode 12 và ios 14 có gì mới ?
Sự kiện giới thiệu sản phẩm mới của apple luôn được phần lớn mọi người ngóng chờ quan tâm đặc biệt là với những i fan năm nay là sự xuất hiện của iphone 12 với thiết kế mang nhiều hứa hẹn dự là cơn sốt sẽ vẫn còn kéo dài (Chỗ này là mình hít frame chút). Apple không chỉ luôn đưa ra sản phẩm mới mà những firmware apple vẫn luôn hỗ trợ cập nhật cho những version củ hơn của mình.
![](https://images.viblo.asia/9d40e50c-ae0a-4597-814e-6e75acb62df2.jpg)
Trong khi mải đắm chìm trong sản phẩm mới của apple thì chắc hẳn bạn vẫn chưa quên sự kiện được những đi vơ lôp bơ cho nhà táo háo hức hằng năm là sự kiện WWDC với sự giới thiệu về ios 14 với nhiều tính năng vượt chội như giao diện hoàn toàn mới, Back-tap,  Picture in Picture, ... và thứ mình quan tâm nhất là sự cập nhật cùng với version ios là Xcode 12 - IDE mà chắc thời gian mình nhìn vào còn nhiều hơn cả nhìn mặt người yêu trong một ngày. Vậy Xcode 12 và ios 14 đối với develop có gì mới cập nhật chúng ta cùng đi mổ xẻ cái hầy :v 

##  Xcode 12
### Đầu tiên thế nào là tàu nhanh switch chế độ dark mode trên simulator
Để chuyển chế độ dark mode trên simulator, hãy chọn Features → Toggle Appearance (mới trong Xcode 12). 
Hoặc trong Xcode, khi ứng dụng của bạn  run debugger chọn Environment Overrides trên debug bar sẽ có popup suất hiện cho phép bạn switch chế độ
![](https://images.viblo.asia/206bdfa8-c0c3-4461-84c6-7cfdec5e5ed8.png)

### IBDesignable 
Nếu code của bạn sử dụng @IBDesignable và không thể compile khi bạn hiển thị view trong nib editor, một thông báo Build Failed notification sẽ xuất hiện ở Attributes inspector và hướng dẫn cho bạn vắn tắt lỗi đã sảy ra.
### VECTOR IMAGES
Tệp hình ảnh trong asset catalog có thể là tệp vector-based PDF hoặc là SVG (Với Xcode 12) . Theo mặc định, hình ảnh vector-based  sẽ được tự động thay đổi kích thước để có độ phân giải cho device xử dụng ảnh X2 và X3 bởi vì nó là ảnh vector. Khi bạn lựa chọn Preserve Vector Data ảnh sẽ được tự động thay đổi và đảm bảo vẫn giữ độ sắc nét.
Ngoài ra chú ý trong việc sử dụng icon mặc định trong IDE vì một số không khả dụng trên ios 13 hoặc một số có tên khác nhau trong ios 13 và 14 có thể dẫn đến gây cho app của bạn bị crash.

### View Debugger

Với cập nhật mới trên Xcode 12 bạn có thể export debug hierarchy và lưu lại. Bằng cách Chọn File → Export View Hierarchy.
Và mở tệp kết quả để xem lại trong cửa sổ trình gỡ lỗi bằng Xcode.
![](https://images.viblo.asia/1a793aff-3479-44d6-9232-ef03d5368621.png)

Trình gỡ lỗi View (“View Debugger”) có thể hiển thị các lớp Editor → Show Layers.
![](https://images.viblo.asia/770d7fbd-f08e-4c6a-a18a-03cdd6d85404.png)

Tính năng mới trong Xcode 12, trong UI test, XCTOSSignpostMetric cho phép bạn theo dõi hiệu  việc kéo và giảm tốc thanh cuộn bằng cách đo tỷ lệ animation “hitches”, cũng như tốc độ khung hình, giữa các lệnh gọi os_signpost;

## IOS 14
### UICollectionView
iOS 14 UICollectionViewCell có thuộc tính contentConfiguration và backgroundConfiguration (“Apple’s Cell Configuration Architecture”).  Apple muốn thay thế sử dụng như trước textLabel hay detailTextLabel thì có thể setup thông qua contentConfiguration
```swift
    let cell = tableView.dequeueReusableCell(
    withIdentifier: self.cellID, for: indexPath)
    var config = cell.defaultContentConfiguration()
    config.textProperties.color = .red
    config.text = "Hello there! \(indexPath.row)"
    cell.contentConfiguration = config
    return cell
```

Điểm mới trong iOS 14, collection view có thể dùng hầu hết các tính năng giống table view. Các cell của nó có thể trông giống như các cell của table view, bao gồm accessory views, thao tác vuốt, v.v. Collection view này được gọi là List. Đây là một tính năng bố cục thành phần. Toàn bộ bố cục hoặc một phần của nó có thể là một List.

```swift
    private let cellId = "Cell"
    override func viewDidLoad() {
        super.viewDidLoad()
        let config = UICollectionLayoutListConfiguration(appearance: .plain)
        let layout = UICollectionViewCompositionalLayout.list(using: config)
        self.collectionView.collectionViewLayout = layout
        self.collectionView.register(UICollectionViewListCell.self, forCellWithReuseIdentifier: self.cellId)
    }
```


IOS 14, collection view còn có thể được phân cấp. Bạn có thể làm cho bất kỳ collection view nào hoạt động theo thứ bậc và việc hiển thị sẽ dễ dàng với một phần là danh sách, vì mọi thứ đều được định cấu hình tự động cho bạn. Minh hoạ rõ hơn bạn có thể hiểu sẽ có dạng phân cấp như sau
```
Pep
    Manny
    Moe
    Jack
```
Việc cấu hình mình sẽ không đề cập chi tiết nếu bạn muốn tìm hiểu hơn thì có thể search với UICollectionViewDiffableDataSource.

### UISplitViewController
Tính năng mới trong iOS 14, UISplitViewController đã được đại tu hoàn toàn, mang đến cho nó một kiến trúc cải tiến. Trong iOS 14, split view controllers có thể có hai hoặc thậm chí ba phần tử con mà các chế độ view có thể xuất hiện đồng thời. (Ứng dụng Danh bạ của Apple là một ví dụ trong đó bộ điều khiển chế độ view phân tách có ba chế độ view con.) 


### UIColorPickerViewController
iOS 14, một color picker được cung cấp. Nó là một view controller chứ không phải là một View. Để sử dụng tạo một UIColorPickerViewController, gán cho nó một delegate, đặt supportsAlpha của nó nếu muốn (mặc định là true, nghĩa là người dùng có thể chọn màu không có màu) và present view controller.

### UIDatePicker

iOS 14, giao diện hiển thị đã được thay thế hoàn toàn. Giao diện cũ trông giống như một UIPickerView, nhưng bạn có thể không nhận được giao diện đó trừ khi bạn đặt preferredDatePickerStyle của date picker thành .wheels. Trong giao diện mới :
* Compact: 

Giao diện date picker chỉ là một dòng văn bản. Khi người dùng chạm vào nó, nó sẽ mở rộng để hiển thị toàn bộ giao diện.

![](https://images.viblo.asia/260399be-cd17-4bdf-861c-81281e6e7da6.png)

* Inline:

Giao diện bộ chọn ngày đầy đủ được hiển thị mọi lúc.
![](https://images.viblo.asia/e8015b21-b632-4d33-8ab1-e09b159883ba.png)


Ngoài ra bạn có thể chụp nhanh nội dung dưới dạng PDF với createPDF(configuration:completionHandler:), và bạn có thể xuất nội dung dưới dạng web archive với
createWebArchiveData(completionHandler:)

## Tổng kết

Trong bài viết này là một số tính năng mình đã mầy mò được trong trong Xcode 12 và đó chưa phải là tất cả trong bản cập nhật vừa rồi. Cảm ơn bạn đã theo dõi và đọc bài viết. Bài viết vẫn chưa thực sự là đầy đủ vì chỉ nằm trên góc nhìn của mình rất vui nếu bạn có góp ý thêm về chức năng bạn cảm thấy hữu ích trong bản Xcode 12 nhé.