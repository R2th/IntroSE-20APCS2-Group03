Trong xu thế nhà nhà người người chuyển sang áp dụng RxSwift vào các dự án của mình.
Hôm nay tôi sẽ giới thiệu với các bạn cách sử dụng RxDataSource để thay đổi những chiếc TableView của mình thành phong cách RxSwift
# Tại sao
Việc ghi các nguồn dữ liệu dạng table và dạng collection view thật tẻ nhạt và chán chường. Có một số lượng lớn các phương thức Delegate cần được triển khai cho trường hợp đơn giản nhất có thể.
RxSwift giúp giảm bớt một số gánh nặng với cơ chế ràng buộc dữ liệu đơn giản:
        1. Biến dữ liệu của bạn thành một chuỗi Observable Liên kết dữ liệu với tableView / collectionView bằng cách sử dụng một trong số các cách:
        2. Bind data vào TableView của bạn bằng một trong các funtion: 
        `
        rx.items(dataSource:protocol<RxTableViewDataSourceType, UITableViewDataSource>)
        rx.items(cellIdentifier:String)
        rx.items(cellIdentifier:String:Cell.Type:_:)
        rx.items(_:_:)
        `
        
        `
        let data = Observable<[String]>.just(["first element", "second element", "third element"])

                data.bind(to: tableView.rx.items(cellIdentifier: "Cell")) { index, model, cell in
              cell.textLabel?.text = model
           }
        .disposed(by: disposeBag)
    `
  Điều này hoạt động tốt với các tập dữ liệu đơn giản nhưng không xử lý tốt các trường hợp bạn cần liên kết các tập dữ liệu phức tạp với nhiều phần hoặc khi bạn cần thực hiện hoạt ảnh khi thêm / sửa đổi / xóa các mục.
  Đây chính xác là các trường hợp sử dụng mà RxDataSources giúp giải quyết. 
  Với RxDataSources, thật dễ dàng chỉ cần viết

```
let dataSource = RxTableViewSectionedReloadDataSource<SectionModel<String, Int>>(configureCell: configureCell)
Observable.just([SectionModel(model: "title", items: [1, 2, 3])])
    .bind(to: tableView.rx.items(dataSource: dataSource))
    .disposed(by: disposeBag)
```

# Như thế nào

Giả sử chúng ta có một cấu trúc:
```
struct CustomData {
  var anInt: Int
  var aString: String
  var aCGPoint: CGPoint
}
```

1. Khởi đầu với việc định nghiã một struct conform protocol `SectionModelType`
. Định nghĩa alias `Item`: Là kiểu của item sẽ được đưa vào các section
. Khai báo property `items`:  là một array các `Item`

```
struct SectionOfCustomData {
  var header: String    
  var items: [Item]
}
extension SectionOfCustomData: SectionModelType {
  typealias Item = CustomData

   init(original: SectionOfCustomData, items: [Item]) {
    self = original
    self.items = items
  }
}
```
2. Tạo một object `dataSource` và pas `SectionOfCustomData` cho nó :
```
let dataSource = RxTableViewSectionedReloadDataSource<SectionOfCustomData>(
  configureCell: { dataSource, tableView, indexPath, item in
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
    cell.textLabel?.text = "Item \(item.anInt): \(item.aString) - \(item.aCGPoint.x):\(item.aCGPoint.y)"
    return cell
})
```
3. Customize closures trong dataSource:
```
dataSource.titleForHeaderInSection = { dataSource, index in
  return dataSource.sectionModels[index].header
}

dataSource.titleForFooterInSection = { dataSource, index in
  return dataSource.sectionModels[index].footer
}

dataSource.canEditRowAtIndexPath = { dataSource, indexPath in
  return true
}

dataSource.canMoveRowAtIndexPath = { dataSource, indexPath in
  return true
}
```
4. Định nghĩa data như là một Observable các đối tượng CustomData và bind nó vào tableView
```
let sections = [
  SectionOfCustomData(header: "First section", items: [CustomData(anInt: 0, aString: "zero", aCGPoint: CGPoint.zero), CustomData(anInt: 1, aString: "one", aCGPoint: CGPoint(x: 1, y: 1)) ]),
  SectionOfCustomData(header: "Second section", items: [CustomData(anInt: 2, aString: "two", aCGPoint: CGPoint(x: 2, y: 2)), CustomData(anInt: 3, aString: "three", aCGPoint: CGPoint(x: 3, y: 3)) ])
]

Observable.just(sections)
  .bind(to: tableView.rx.items(dataSource: dataSource))
  .disposed(by: disposeBag)
```

Và như vậy là chúng ta đã thành công chuyển đổi TableView thành RxSwift
Chúc các bạn thành công áp dụng vào dự án của mình