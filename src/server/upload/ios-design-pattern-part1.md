### Nội dung

- Giới thiệu vể iOS Design pattern
- MVC - The King of design patterns
- The Single Pattern
- The Facade design pattern
- The Decorator Design Pattern

### Giới thiệu

Với người mới bắt đầu lập trình thì khi mới bắt đầu họ thường thắc mắc: làm thế nào để tổ chức một chương trình với cấu trúc tốt, dễ dàng thay đổi và  mở rộng. Với mỗi ngôn ngữ đều có các chuẩn chung trong quá trình thiết kế phần mềm chúng ta gọi đó là Design patterns. Thật vậy Design pattern giúp chúng ta giải quyết rất nhiều vấn đề khi phát triển phần mềm như: viết code dễ để đọc hiểu, tái sử dụng hoặc có thể thay đổi các thành phần trong code mà không có quá phức tạp, ít ảnh hưởng tới toàn bộ.
Trong bài biết này chúng ta sẽ cùng tìm hiểu về các design patterns phổ biến trong iOS như:
- Khởi tạo: Singleton.
- Cấu trúc: MVC, Decorator, Adapter, Facade.
- Hành vi: Observer, Adapter, Memento

**Nào chúng ta cùng bắt đầu!**

### MVC - The King of design patterns

**Model - View - Controller (MVC)** là một trong những design pattern thường hay sử dụng và nhiều người biết đến nhất, nó phân loại đối tượng theo những quy tắc chung và khuyến khích chia code theo chức năng của từng thành phần.
Trong đó:

**Model**: Là dối tượng có vai trò định nghĩa, tổ chức trữ và thao tác trực tiếp với dữ liệu.

**View:** Là đối tượng chịu trách nhiệm về hiển thị giao diện hay nói cách khác đó là tầng mà người dùng quan sát và tương tác trực tiếp.

**Controller:** Là bộ điều kiển trung gian có vai trò quản lý, điều phối tất cả công việc. Nó truy cập dữ liệu từ Model và quyết định hiển thị nó trên View. Khi có một sự kiện được truyền xuống từ View, Controller quyết định cách thức xử lý: có thể là tương tác với dữ liệu, thay đổi giao diện trên View...
Một cách cài đặt tốt nhất theo nguyên tắc design pattern này đó là mỗi một object sẽ rơi vào một trong những thành phần này.

Dưới đây là hình ảnh minh họa về sự giao tiếp giữa các thành phần trong mô hình MVC:

![](https://images.viblo.asia/33527041-a595-42ec-ad29-3fd7606e74c7.png)


Tất cả các phần được tách biệt và có thể dùng lại. Ví dụ khi View không dựa trên một Model cụ thể, nó hoàn toàn có thể tái sử dụng với một Model khác để hiển thị dữ liệu khác.

**Làm thế nào để sử dụng MVC pattern?**

Đầu tiên bạn cần đảm bảo chắc ràng mỗi class trong project của bạn là một trong các thành phần của MVC.
Tiếp theo bạn cần tạo 3 nhóm  để quản lý code tương ứng với mỗi thành phần của MVC. Tất nhiên bạn có thể có các nhóm khác nhưng phần chính của ứng dụng sẽ được chứa trong 3 nhóm này. Dưới đây là hình ảnh về cấu trúc dự án theo mô hình MVC:

![](https://images.viblo.asia/ff8465c5-90aa-4f6a-8803-ec8f5502af3d.png)


### The Single Pattern

Ý tưởng của **Singleton design pattern** là tạo ra một lần và sử dụng mãi mãi. Nó đảm bảo rằng chỉ có duy nhất instance của 1 class và mọi đối tượng trong dự án đều có thể truy cập vào instance này.

**Làm thế nào để sử dụng Single pattern?**

![](https://images.viblo.asia/2b5ec224-eb25-4c4f-b25a-f54c7f5371fe.png)


Theo như trên chúng ta có class tên là Logger với một thuộc tính và hai phương thức là sharedInstance và init.
Đầu tiên khi thực hiện gọi SharedInstance, nếu thuộc tính instance chưa được cài đặt, tiến hành cài đặt  instance mới của class đó  và trả về.
Tiếp theo bạn gọi SharedInstance, instance ngay lập tức được trả về mà không cần bất kì cài đặt nào. Lôgic này đảm bảo việc chỉ có duy nhất một insance tồn tại tại một thời điểm.
 Dưới đây là đoạn code ví dụ về việc tạo một  singleton instance

```Swift
 //1
class var sharedInstance: LibraryAPI {
  //2
  struct Singleton {
    //3
    static let instance = LibraryAPI()
  }
  //4
  return Singleton.instance
}
```

### The Facade design pattern


**Facade design pattern** cung cấp một  interface cho một hệ thống con phức tạp. Người dùng chỉ cần quan tâm đến interface và tương tác với nó chứ không cần quan tâm đến chi tiết việc sử lý yêu cầu của mình.

![](https://images.viblo.asia/773ede68-04c8-4250-87f8-bbca910714d5.png)

Nhìn vào hình minh họa trên chúng ta có thể thấy là tầng interface(người dùng tương tác với API) không hề thay đổi khi người dùng họ chọn lấy dữ liệu từ remoteServer hay từ database. Nó chỉ khác nhau về cách implementation chức năng tương ứng của API mà thôi: API thay vì trỏ tới RemoteServer, nó sẽ trỏ sang database...

**Làm thế nào để sử dụng Facade Pattern?**

![](https://images.viblo.asia/3a3cfd90-6976-4754-8dfe-9e8864a8042a.png)

Chúng ta có PersistencyManager làm nhiệm vụ lưu dữ liệu ở local và HTTPClient để xử lý dữ liệu. LibaryAPI đóng vai trò là mặt ngoài và tương tác với Other code(các class khác). Các class ngoài sẽ chỉ biết tới LibraryAPI và các service mà nó expose. Việc implementation tương ứng sẽ do LibraryAPI quyết định và tương tác với PersistencyManager và HTTPClient.

### The Decorator Design Pattern

Ý tưởng của **Decorator design pattern** là tự động thêm các  hành vi và tính năng của object mà không cần thay đổi code của nó. Nó là một sự lựa chọn thay thế cho Subclassing(Trong Subclassing bạn cần thay đổi hành vi của class bằng việc wrap nó với một object khác).

Trong swift, có 2 cách implementation nổi tiếng cho  pattern này là **Extensions** và **Delegation**.

#### Extensions

**Extensions** cho phép  thêm các function mới vào các class, structure, enumeration mà không cần phải subclass. Nghĩa là bạn có thể thêm các method của bạn vào Cocoa classes như là UIView hoặc UIImage... Đặc biệt là phương thức mới sẽ được thêm vào ngay tại thời điểm complie và có thể thực hiện giống như các methods thông thường của class bởi vì extension không tạo instance của class nó mở rộng.

**Làm thế nào để sử dụng Extensions?**

Tưởng tượng bạn có một Album object bạn muốn hiển thị nó trong một table view.

![](https://images.viblo.asia/727640d3-bf84-4761-ac53-1f4a84f00329.png)


Album là một  Model object do đó nó không quan tâm việc làm thế nào bạn hiển thị dữ liệu. Bạn cần mở rộng code để thêm function vào Album class nhưng không thay đổi trực tiếp vào class.
Bạn sẽ tạo extension tên là AlbumExtensions để mở rộng Album class. Nó sẽ định nghĩa phương thước mới trả về kiểu dữ liệu structure để dễ dàng sử dụng ở UITableView. Dữ liệu sẽ giống như hình minh họa dưới đây:

![delegate2-480x67.png](/uploads/91273dae-44cc-41d7-a6c8-db404fe1f787.png)

Dưới đây là nội dung của file AlbumExtensions.swift

```Swift
extension Album {
  func ae_tableRepresentation() -> (titles:[String], values:[String]) {
    return (["Artist", "Album", "Genre", "Year"], [artist, title, genre, year])
  }
}
```

#### Delegation

**Delegation** là cơ chế trong đó một đối tượng hoạt động thay mặt cho hoặc tương tác với một đối tượng khác. Có thể nói là nó đơn giản chỉ là subclass một object và override lại phương thức cần thiết nhưng chú ý rằng với subclass thì bạn chỉ có thể subclass từ một class duy nhất. Do đó nếu bạn muốn một object là delegate của hai hay nhiều object khác, bạn sẽ không thể làm được nếu dùng subclassing.

**Làm thế nào để sử dụng Delegation?**

Dưới đây là hình ảnh minh họa quá trình tạo UItableView

![](https://images.viblo.asia/3161cd27-c0ec-4fc5-92bd-bf4b25bbc1db.png)

Dưới đây là đoạn code sử dụng delegate của UITableView

```Swift
extension ViewController: UITableViewDataSource {
  func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    if let albumData = currentAlbumData {
      return albumData.titles.count
    } else {
      return 0
    }
  }

  func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
    let cell:UITableViewCell = tableView.dequeueReusableCellWithIdentifier("Cell", forIndexPath: indexPath)
    if let albumData = currentAlbumData {
      cell.textLabel!.text = albumData.titles[indexPath.row]
			cell.detailTextLabel!.text = albumData.values[indexPath.row]
    }
    return cell
  }
}
extension ViewController: UITableViewDelegate {
}
```

Ở đây chỉ ra rằng ViewController sẽ phù hợp với giao thức UITableViewDataSource và UITableViewDelegate. UITableView đảm bảo rằng các phương thức bắt buộc được cài đặt bởi delegate của nó.

Trong đó:

**tableView(_:numberOfRowsInSection:)** trả về số row được hiển thị trong table view

**tableView(_:cellForRowAtIndexPath:)** khởi tạo và trả về đối tượng cell tương ứng với row của table view

### Tổng kết

Thông  qua bài viết này, chúng ta hiểu thêm về các design pattern thường sử dụng trong iOS. Trong khi hầu hết các developer đồng ý là design pattern rất quan trọng nhưng dường như lại không chú ý nhiều về design pattern khi viết code.

Design pattern giúp cuộc sống của developer dễ dàng hơn và code của bạn trở nên tốt hơn!

##### _Nguồn:_

[https://developer.apple.com/library/ios/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html](https://developer.apple.com/library/ios/documentation/General/Conceptual/DevPedia-CocoaCore/MVC.html)

[_http://www.raywenderlich.com/46988/ios-design-patterns_](http://www.raywenderlich.com/46988/ios-design-patterns)

[_http://www.raywenderlich.com/86477/introducing-ios-design-patterns-in-swift-part-1_](http://www.raywenderlich.com/86477/introducing-ios-design-patterns-in-swift-part-1)