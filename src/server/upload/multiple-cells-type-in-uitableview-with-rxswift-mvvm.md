Xin chào các bạn, như tiêu đề đã nêu, hôm nay mình sẽ hướng dẫn các bạn tạo ra một UITableView chứa nhiều loại cell, hay thậm chí là CollectionView nằm trong một cell. Ví dụ như :
![](https://images.viblo.asia/24c81272-3559-48ae-8b9d-ad78822904d4.png)

Trong hướng dẫn cụ thể này, mình sẽ sử dụng các công nghệ:
- RxSwift
- Mô hình MVVM

# 1. ViewModel 

Đầu tiên, các bạn sẽ định hình xem trong UITableView của các bạn có bao nhiêu loại Cell. Chúng ta sẽ chia ra mỗi loại cell là một section. Thể hiện bằng cách tạo ra enum để rõ ràng cho việc quản lí. Tại ViewModel, chúng ta tạo ra 2 enum:
  
>      enum CellType {
>     case CellType1(Data1)
>     case CellType2(Data2)
>     case CellType3
>     }
>     
>     struct SectionOfCustomData {
>     var header: String
>     var items: [CellType]
>      }


Từ đó thì chúng ta sẽ có input và output tại ViewModel như sau:
    
>     struct Input {
>            let loadTrigger: Driver<Void>
>        }
>        
>        struct Output {
>         let cellDatas: Driver<[SectionOfCustomData]>
>        }
Tất nhiên rồi, hàm transform sẽ cụ thể như sau:
    
    
>     func tranform(_ input: Input) -> Output {
>     
>          let yourData1 = Data() // Data() ở đây chính là model của các bạn, thường là gọi từ API hoặc lấy từ SQL, Realm
>          let yourData2 = Data() // Dữ liệu này dùng cho loại cell thứ 2
>          let yourData3 = Data() // Dữ liệu này dùng cho loại cell thứ 3
>         
>         let dataCell1 = input.loadTrigger
>             .map { _ in
>                 return yourData1.map { item -> CellType in
>                     return CellType.yourData(item)
>                 }
>             }
>             .map { sectionItems in
>                 SectionOfCustomData(header: ""
>                     , items: sectionItems)
>            }
>     
>      let dataCell2 = input.loadTrigger
>             .map { _ in
>                 return yourData2.map { item -> CellType in
>                     return CellType.yourData(item)
>                 }
>             }
>             .map { sectionItems in
>                 SectionOfCustomData(header: ""
>                     , items: sectionItems)
>            }
>     
>      let dataCell3 = input.loadTrigger
>             .map { _ in
>                 return yourData3.map { item -> CellType in
>                     return CellType.yourData(item)
>                 }
>             }
>             .map { sectionItems in
>                 SectionOfCustomData(header: ""
>                     , items: sectionItems)
>            }
>         
>         let sections = Driver.combineLatest(dataCell1, dataCell2, dataCell3) {
>             return [$0, $1, $2]
>         }
>         
>         return Output(cellDatas: sections)
>     }
  Bây giờ ở đầu ra chúng ta đã có đủ dữ liệu để xử lí. Cụ thể ở đây là CellType và dữ liệu của từng loại cell. Tiếp đến sẽ là xử lý ở ViewController
    
# 2. ViewController
Hãy đảm bảo rằng các bạn đã có RxDatasoure, vì chúng ta sẽ dùng RxTableViewSectionedReloadDataSource. Nếu chưa có bạn hãy chạy lại pod sau khi thêm
    
>     pod 'RxDataSources'
    
    
Tại hàm bindViewModel(), chúng ta viết như sau
    
>     let dataSource = RxTableViewSectionedReloadDataSource<SectionModel<String, YourViewModel.CellType>>(
>           configureCell: { dataSource, tableView, indexPath, item in
>             switch item {
>             case .CellType1(let data1):
>              let cell: YourUITableViewCell1 = tableView.dequeueReusableCell(for: indexPath)
>     // các bạn sẽ lấy data1 ở đây, chính là data đã gọi ra ở viewModel
>              return cell
>              case .CellType2(let data2):
>               let cell: YourUITableViewCell2 = tableView.dequeueReusableCell(for: indexPath)
>      //
>              return cell
>           case .CellType3:
>                let cell: YourUITableViewCell3 = tableView.dequeueReusableCell(for: indexPath)
>      // 
>              return cell
>             }
>         })

Mình sẽ giải thích một chút về các đầu ra ở trên:
```
tableView : Đây chính là tableView của các bạn. Tại sao ư, nó sẽ được bind đến ở phía dưới
indexPath: Vẫn là indexPath
item: Đây là data có dạng SectionOfCustomData mà các bạn đã truyền ra ở output trong viewModel
```

Và cuối cùng, đề tableView nhận datasource này, chúng ta thêm đoạn code này ngay bên dưới:
    
>     let input = YourViewModel.Input(loadTrigger: Driver.just(()))
>         let output = viewModel.tranform(input)
>         
>         output.cellDatas
>             .map {
>                 $0.map {
>                     SectionModel(model: $0.header, items: $0.items)
>                 }
>             }
>             .drive(tableView.rx.items(dataSource: dataSource))
>             .disposed(by: disposeBag)
    
Đừng quên đăng kí cho cả 3 loại cell các bạn nhé. Tại viewDidLoad():
    
>      tableView.register(cellType: YourUITableViewCell1.self)
>      tableView.register(cellType: YourUITableViewCell2.self)
>      tableView.register(cellType: YourUITableViewCell3.self)
   
Như vậy chúng ta đã xong. Từ việc truyền dữ liệu kèm theo kiểu cell, đến việc thể hiện lên UITableView.
    
# Ưu điểm:

So với cách cũ là dùng UITableViewDatasource, là khi có nhiều loại cell thì chúng ta phải if, else nhiều lần để detect các loại cell. Thì đối với cách này, dựa vào việc enum có thể truyền đi dữ liệu, nếu có nhiều loại cell thậm chí nhiều loại cell trong 1 section thì chúng ta vẫn có thể detect và truyền dữ liệu dễ dàng chỉ với một switch.
Chúc các bạn thành công!