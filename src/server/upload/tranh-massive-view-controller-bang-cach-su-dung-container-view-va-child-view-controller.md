* Chắc hẳn các bạn đã rất quen với từ ViewController khi lập trình iOS. Nó thực chất là một thành phần cơ bản để xây dựng lên ứng dụng iOS.
Trong mô hình MVC thì nó đóng vai trò thành phần trung gian giữa View và Model. Nắm bắt được sự thay đổi từ model và update lên view. Và theo chiều ngược lại thì view nhận tương tác và thông báo tới ViewController và ViewController tiến hành thao tác với model.

![](https://images.viblo.asia/024f9f26-baec-4943-8d78-3ff600d9e665.png)

Bắt đầu bằng hình ảnh thế thôi.

* Với mỗi một lập trình viên iOS thì bất cứ ai cũng đã nhiều lần đau đầu với vấn đề MassiveViewController, nó có nghĩa là gì, nghĩa là bạn viết quá nhiều code trong ViewController dẫn tới nó lộn xộn, dài, thậm chí vài chục nghìn dòng code. Cứ thế bạn code có thể bạn nhớ, nhưng khi người sau vào maintain thì bạn ăn chửi là cái chắc, có khi code ngon vẫn ăn chửi =))

* Vậy khi bạn gặp vấn đề này thì bạn sẽ quay ra đổ lỗi cho mô hình MVC, xong lại áp dụng các mô hình khác như MVVM, MVP hay VIPER. Thật chớ trêu, sau vài ngày các bạn áp dụng nó, có người thì khen nó hay, có người thì lại cảm thấy MVC vẫn tốt =)) thật buồn cười đúng không?

* Thực ra mỗi mô hình thì đều có ưu điểm và nhược điểm của nó. Trong bài viết này mình vẫn tiếp tục trung thành với MVC và ngoài việc các bạn dùng mô hình khác để cải thiện hay để tránh vấn đề massive view controller thì mình xin chia sẻ một góc nhìn khác, hay đó là cách khác để giảm tải cho view controller của bạn.

* Đơn giản lắm, các bạn chỉ cần search với keywork: ContainerView và ChildViewController trong iOS thôi. Vậy điều đó có nghĩa là khi màn hình của bạn các control quá phức tạp, mỗi control lại có chức năng riêng, khi đó thay vì bạn viết tất cả trong 1 view controller thì bạn hãy tách riêng ra các view controller khác. Để làm được điều này bạn cần nhúng view controller vào một view controller chung. Vậy tức là một màn hình của màn có thể chứa nhiều view controller. Hay cũng có nghĩa là một view controller có thể chứa nhiều view controller. Và để nhúng được thì cần sử dụng container view.

* Để hiểu rõ vấn đề trên, các bạn có thể tìm đọc nguyên tắc SRP (Single Responsibility Principle). Tức là bản thân mỗi thằng nó phải có trách nhiệm riêng của nó

![](https://images.viblo.asia/65af3135-7955-4e73-8ed1-0787099b158a.png)

* Hãy xem ví dụ ảnh trên, nó gồm có 
    * Một danh sách phim
    * Danh sách các option cho phép filter
    * Action xoá filter

* Với ví dụ này, đơn giản nếu bản chỉ viết và sử dụng 1 view controller thì đảm bảo bạn sẽ gặp vấn đề massive controller  và nó trở nên rắc rối. Vậy để giải quyết nó thì đây là lúc bạn nên sử dụng container view và child view controller rồi đó.

* Với giao diện trên thì chúng ta có thể tạo ra 3 view controller tương ứng như sau
    * Một view controller chứa các option để filter
    * Một view controller chứa danh sách các phim đã filter
    * Một view controller phục vụ cho mục đích chứa 2 view controller trên và phần clear filter.

![](https://images.viblo.asia/bc06bd47-accb-4d15-9252-e1f60afa6d54.png)

### 1. Movie list view controller
- Mục đích của controller này là hiển thị danh sách movies.
- Kế thừa từ một table view controller và lắng nghe didSet để reload khi có data
```swift
class VBMovieListViewController: UITableViewController {
    
    var movies = [Movie]() {
        didSet {
            tableView.reloadData()
        }
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return movies.count
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        tableView.deselectRow(at: indexPath, animated: true)
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        return cell
    }
    
}
```
### 2. Danh sách các option để filter movies.
- Nhiệm vụ là hiển thị bộ lọc gồm 3 thành phần tương ứng 3 section
    - genre
    - rating
    - duration

```swift
class VBFilterListViewController: UITableViewController {
    
    var filters = [Filter]()
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return filters.count
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return filters[section].filters.count
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return filters[section].title
    }
    
    override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        // callback
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
        return cell
    }
    
}
```

### 3. Kết nối, giao tiếp giữa các view controller
- Tới đây bạn đã có 2 view controller làm nhiệm vụ hiển thị option filter và kết quả các movies đã filter.
- Bạn cần có phần callback để có thể giao tiếp với view controller chung
```swift
protocol VBFilterListViewControllerDelegate: class {
    func filterVBListViewController:didSelect:
    func filterVBListViewController:didDeselect:
    func filterVBListViewControllerDidClearFilters:
}
```
- Mình lấy ví dụ như thế này.
    - Select một option
    - Unselect một option
    - Clear option

### 4. View controller chung
```swift
import UIKit
 
class VBContainerViewController: UIViewController {
    
    @IBOutlet weak var filterListCV: UIView!
    @IBOutlet weak var movieListCV: UIView!
    
    var optionVC: VBFilterListViewController!
    var moviesVC: VBMovieListViewController!
    
    let movies...
    
    private func setupChildViewControllers() {
        // Load VBFilterListViewController from storyboard -> filterListVC
        addChild(childController: filterListVC, to: filterListCV)
        self.filterListVC = filterListVC
        // set delegate
        
        // Tương tự việc load VBFilterListViewController -> Load VBMovieListViewController
    }
    
    @IBAction func didTouchUpInsideClearFilter(_ sender: Any) {

    }
 
}
 
extension VBContainerViewController: VBFilterListViewControllerDelegate {
 
    // Implement
    func filterVBListViewController:didSelect:
    func filterVBListViewController:didDeselect:
    func filterVBListViewControllerDidClearFilters:
    
}
```

### Tổng kết:
Vậy nếu làm như trên bạn sẽ tách biệt toàn bộ code cũng như giao diện sang các view controller riêng biệt, điều quan trọng bạn phải làm là code callback hoặc delegate mục đích để giao tiếp với view controller chính.
Vậy nhé. Trên đây cũng là một phần hay góc nhìn khác để giảm tải và tránh vấn đề massive view controller.