## Table View cơ bản
Trường hợp điển hình, bạn muốn hiển thị một danh sách các mục cùng loại: ví dụ, một danh sách các thành phố, như bạn đã thấy trong các phần trước. Sử dụng cell bình thường để hiển thị gần như không phải thiết lập gi cả. 
Xem ví dụ dưới đây:
```
@IBOutlet var tableView: UITableView!
func bindTableView() {
  let cities = Observable.of(["Lisbon", "Copenhagen", "London", "Madrid",
"Vienna"])
  cities
  .bind(to: tableView.rx.items) {
      (tableView: UITableView, index: Int, element: String) in
      let cell = UITableViewCell(style: .default, reuseIdentifier:
"cell")
      cell.textLabel?.text = element
return cell }
  .disposed(by: disposeBag)
}
```

Và. Đó là tất cả. Bạn thậm chí không cần thiết lập UITableViewDataSource cho UIViewController.
Đây là cái nhìn tổng quát về những gì đang diễn ra:
* tableView.rx.items là một hàm binder hoạt động trên các chuỗi observable của
các phần tử (giống Observable <[String]>).
* Ràng buộc này tạo ra một đối tượng ObserverType vô hình subscribe vào sequence của bạn
 và set datasource, delegate cho tableView.
* Khi một mảng mới của các phần tử truyền vào, các ràng buộc sẽ reloads
tableView.
* Để có được cell cho mỗi mục, RxCocoa gọi closure của bạn với các detail(và date) để row được reload.

Rất đơn giản để sử dụng. Nhưng nếu bạn muốn xử lý khi người dùng select thì sao? 
Một lần nữa, framework hỗ trợ điều này:
```
tableView.rx
  .modelSelected(String.self)
  .subscribe(onNext: { model in
    print("\(model) was selected")
  })
  .disposed(by: disposeBag)
```

Phần mở rộng của modelSelected(_ :) trả về một observable phát ra một object model (phần tử được biểu diễn bởi cell) mỗi khi người dùng chọn nó. 
Một biến thể (itemSelected()) cùng với IndexPath của mục đã chọn.

RxCocoa cung cấp một số observable:
* modelSelected(), modelDeselected(), itemSelected(), itemDeselected() kích hoạt lựa chọn mục.
* accessoryButtonTapped() kích hoạt sự kiện button tap
* itemInserted(), itemDeleted(), itemMoved() kích hoạt các sự kiện callback trong chế độ chỉnh sửa bảng
* willDisplayCell(), didEndDisplayingCell() kích hoạt mỗi lần callback có liên quan đến UITableViewDelegate.

## Nhiều loại cell
Nó gần như là dễ dàng với nhiều loại cell. Cách tốt nhất để xử lý nó là sử dụng một enum với dữ liệu liên quan. Bằng cách này, bạn có thể xử lý nhiều loại cell khác nhau như bạn cần, gắn kết bảng với một observable mảng của kiểu enum.

```
enum MyModel {
  case textEntry(String)
  case pairOfImages(UIImage, UIImage)
}
let observable: Observable<[MyModel]> = Observable.of([
    .textEntry("Paris"),
    .pairOfImages(UIImage(named: "EiffelTower.jpg"), UIImage(named:
"LeLouvre.jpg")),
    .textEntry("London"),
    .pairOfImages(UIImage(named: "BigBen.jpg"), UIImage(named:
"BuckinghamPalace.jpg"))
])
```

Để liên kết nó với bảng, sử dụng một closure signature khác nhau và tải một cell khác tùy thuộc vào phần tử được phát ra. Code trông như thế này:

```
observable.bind(to: tableView.rx.items) {
  (tableView: UITableView, index: Int, element: MyModel) in
    let indexPath = IndexPath(item: index, section: 0)
    switch element {
    case .textEntry(let title):
      let cell = tableView.dequeueReusableCell(withIdentifier:
"titleCell", for: indexPath)
      cell.titleLabel.text = title
      return cell
    case .pairOfImages(let firstImage, let secondImage):
      let cell = tableView.dequeueReusableCell(withIdentifier:
"pairOfImagesCell", for: indexPath)
       cell.leftImage.image = firstImage
       cell.rightImage.image = secondImage
       return cell
} }
```

Vấn đề không phải là mã nhiều hơn trước. Sự phức tạp duy nhất là đối phó với nhiều loại dữ liệu trong việc observable các mảng của các đối tượng, mà bạn có thể giải quyết bằng cách sử dụng một enum. 

Swift có tuyệt vời không?

## Cung cấp chứ năng bổ sung
Mặc dù TableViews và CollectionViews do RxCocoa điều khiển không cần bạn thiết lập delegate cho ViewController của mình, nhưng bạn có thể làm như vậy để cung cấp chức năng bổ sung không được phần mở rộng RxCocoa quản lý.

Trong trường hợp của UICollectionView, bạn có thể muốn UIViewController của bạn như UICollectionViewDelegate. 

Nếu bạn ràng buộc điều này trong nib hoặc storyboard, RxCocoa sẽ làm: nó sẽ thiết lập chính nó như là delegate thực tế, sau đó chuyển tiếp các callbacks của bạn lên ViewController thực hiện.

Ví dụ: khi sử dụng UICollectionView với cách thủ công, bạn thường cần triển khai collectionView(_: layout: sizeForItemAt :) để tính lại kích thước mục. 

Nếu bạn kết nối CollectionView với ViewController với tư cách là delegate của nó, sau đó sử dụng RxCocoa ràng buộc để quản lý nội dung, bạn không có gì quá đặc biệt để làm. RxCocoa sẽ xử lý các chi tiết.

Nếu bạn đã ràng buộc UICollectionView của bạn với RxCocoa và muốn thêm CollectionViewDelegate cho ViewController của bạn, bạn có thể chỉ cần sử dụng lệnh này này:
```
tableView.rx.setDelegate(myDelegateObject)
```

Extension của talbe sẽ làm và chuyển tiếp đối tượng của bạn, tất cả các phương thức ủy nhiệm mà nó thực hiện. 

Sẽ không trực tiếp thiết lập đối tượng của bạn như là TableView hoặc CollectionView delegate sau khi liên kết nó với RxCocoa. 

Điều này sẽ ngăn chặn một số hoặc tất cả các ràng buộc giúp hoạt động chính xác.

## RxDataSources
RxCocoa xử lý những gì TableView và CollectionView cần. Tuy nhiên, bạn có thể muốn triển khai nhiều tính năng nâng cao như chèn và xóa hoạt ảnh, tải lại các phần và cập nhật từng phần (diff), tất cả đều có hỗ trợ chỉnh sửa cho cả UITableView và UICollectionView.

Sử dụng RxDataSources đòi hỏi nhiều công việc hơn để tìm hiểu cách viết của nó, nhưng cung cấp các tính năng mạnh mẽ, nâng cao hơn. 
Thay vì một mảng dữ liệu đơn giản, nó yêu cầu bạn cung cấp nội dung bằng cách sử dụng các đối tượng phù hợp với giao thức SectionModelType. 

Mỗi phần chính nó chứa các đối tượng thực tế. Đối với các phần có nhiều loại đối tượng, hãy sử dụng kỹ thuật enum được hiển thị ở trên để phân biệt các loại.

Sức mạnh của RxDataSources nằm trong thuật toán khác mà nó sử dụng để xác định những gì được thay đổi trong model và tùy chọn tạo hiệu ứng thay đổi. 

Bằng cách áp dụng giao thức AnimatableSectionModelType, section model của bạn có thể cung cấp chi tiết về hoạt ảnh mà nó muốn thực hiện để chèn, xóa và cập nhật.

Cuối cùng, mời các bạn tham khảo và tra cứu tại https://github.com/RxSwiftCommunity/RxDataSources và các ví dụ kèm theo để tìm hiểu thêm về tính năng nâng cao này! 

Cảm ơn các bạn đã theo dõi.