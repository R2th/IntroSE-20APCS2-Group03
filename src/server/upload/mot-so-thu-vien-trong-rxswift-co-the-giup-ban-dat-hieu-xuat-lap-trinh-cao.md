# Một số thư viện trong RxSwift có thể giúp bạn đạt hiệu xuất lập trình cao
![](https://images.viblo.asia/a315e5aa-fe46-40f8-ac24-be9e79cec573.jpg)
Chắc hẳn các tín đồ IOS ít nhiều được nghe qua RxSwift.
RxSwift là một Extension của ReactiveX được viết bằng ngôn ngữ Swift. Nó là sự kết hợp của Observer Pattern, Iterator Pattern và Functional Programing. RxSwift giúp cho công việc trở nên đơn giản hơn. RxSwift giúp tối giản và hạn chế việc sử dụng các Notifications và Delegate Pattern đi kèm với các câu lệnh if/else và các block code lồng nhau phức tạp trong code.
RxSwift tiện lợi tuy nhiên chúng ta có thể làm tăng hiệu xuất lập rình bằng cách sử dụng thêmm một số thư viện. Các thư viện sẽ gúp cho việc xử lí code đơn giản và nhẹ nhàng hơn. Chúng ta sẽ đi vào tìm hiểu một số thư viện như thế:

## [Then](https://cocoapods.org/pods/Then)
Là một thư viện được phát triển bởi Suyeol Jeon trên [cocoapods](https://cocoapods.org/pods/Then) và được đánh giá hơn 1800 sao trên githubs.
đây là một thư viện khá tiện dụng bao gồm 3 hàm chính đó là:
1. then()
2. do()
3. with()

Với then bạn có thể tác động tới mọi lớp con của một NSObject
``` Swift
let instance = MyType().then {
  $0.really = "awesome!"
}
```

với do bạn có thể tác động tới một dối tượng và thực hiện ít thao tác đánh máy hơn. Vi dụ bạn có thể tác động đến các thông số của một đối tượng tableView trong viewController:
``` Swift
tableView.do {
            $0.delaysContentTouches = false
            $0.contentInset = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
            $0.register(cellType: FeaturedTableViewCell.self)
            $0.register(cellType: HeaderTableViewCell.self)
            $0.register(cellType: TopicTableViewCell.self)
            $0.rowHeight = UITableView.automaticDimension
            $0.estimatedRowHeight = 500
            $0.dataSource = self
            $0.delegate = self
        }
```

sử dụng with khi bạn copy các kiểu giá trị:
``` Swift
let table = table().with {
            $0.height = 5
            $0.leg = 4
        }
```
## [NSObject+Rx](https://github.com/RxSwiftCommunity/NSObject-Rx)

Là thư viện phát triển bởi Ash Furrow lưu trữ các biến hay các thành phần cần thiết của Rx để bạn khỏi phải khởi tạo lại code nhiều lần gây trung lặp. Chắc hạn nếu bạn code RX chắc bạn đã nhiều lần gặp đoạn code tương tự code sau:
```Swift
class MyObject: Whatever {
	let disposeBag = DisposeBag()

	...
}
```

và sử dụng sau khi output như sau:
```Swift
        output.loading
            .drive(rx.isLoading)
            .disposed(by: disposeBag)
        
        output.refreshing
            .drive(tableView.refreshing)
            .disposed(by: disposeBag)
        
        output.loadingMore
            .drive(tableView.loadingMore)
            .disposed(by: disposeBag)
        
```

và NSObject+Rx giúp bạn giảm thiểu điều đó bằng từ khoá "rx"  như sau:
```Swift
        output.loading
            .drive(rx.isLoading)
            .disposed(by: rx.disposeBag)
        
        output.refreshing
            .drive(tableView.refreshing)
            .disposed(by: rx.disposeBag)
```

## [ Reusable ](https://cocoapods.org/pods/Reusable)
Một mixin Swift để sử dụng UITableViewCells, UICollectionViewCells và UIViewControllers theo cách an toàn, mà không cần thao tác reuseIdentifiers String-typed của họ. Thư viện này cũng hỗ trợ UIView tùy ý được tải thông qua một XIB sử dụng một cuộc gọi đơn giản để loadFromNib (). Đây là thư viện cực kì hữu hiệu mà không phải chỉ riêng RxSwift. Là thư viện do Olivier Halligon phát triển lên và được ứng dụng và chào đón khá nhiều bởi các lập trình viên.
cách sử dụng khá đơn giản. ví dụ khi khai báo Cell cho tableview:

```Swift
// Example of what Reusable allows you to do
final class MyCustomCell: UITableViewCell, Reusable { /* And that's it! */ }
tableView.register(cellType: MyCustomCell.self)
let cell: MyCustomCell = tableView.dequeueReusableCell(for: indexPath)
```
điền tên cell vào prototyped trong storyboad vậy là bạn dã có thể sử dụng. Quá đơn giản phải k nào..?
ngoài các thư viện trên ra còn một số thư viện như **[RxDataSources](https://cocoapods.org/pods/RxDataSources)** hay **[validator](https://cocoapods.org/pods/Validator)** ..... cũng giúp ích khá nhiều trong quá trình code của bạn....

### Trên đây chỉ là một số thư viện mà trong quá trình lập trình và tìm hiểu, học hỏi mình rút ra được, có nhiều thiếu xót hi vọng nếu có gi bổ sung các bạn có thể comment bên dưới để cải thiện trong các bài viết tiếp theo.