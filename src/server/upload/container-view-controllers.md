Massive View Controllers là một cơn ác mộng của các nhà phát triển iOS.  Trong bài đăng này, mình muốn giới thiệu một cách để khắc phục tính trạng đó nhưng thường bị bỏ qua, đó chính là sử dụng Container View Controllers.

### Ôm quá nhiều trách nhiệm
Hãy nhìn vào giao diện người dùng dưới đây. Nửa trên là bảng các quốc gia có tọa độ vĩ độ và kinh độ. Nửa dưới là chế độ xem bản đồ iOS. Khi người dùng chọn một vị trí trong table view, chúng ta sẽ hiển thị nó trong bản đồ.

![](https://images.viblo.asia/eb65a307-54dd-4bc2-9b6c-ab8dddcfb038.png)

Đây là một ứng dụng đơn giản nhưng có rất nhiều tương tác xảy ra giữa table view data source và map view. Đây là thời điểm tuyệt vời để sử dụng container view controllers và chia ứng dụng của chúng ta thành một parent view controller và hai child view controller:
- Parent view controller sẽ quản lý cây giao diện(view hierarchy) và giao tiếp giữa các child view controller.
- Child view controller đầu sẽ xử lý danh sách quốc gia.
- Child view controller thứ hai sẽ hiển thị vị trí quốc giá đó lên bản đồ.

### Sử dụng Storyboard
Đây là Storyboard khởi đầu của chúng ta với parent view controller được nhúng trong navigation controller. Table view controller liệt kê các vị trí để người dùng chọn và có một delegate protocol để gửi lại vị trí đó cho parent view controller. Map view controller giữ MKMapView để hiển thị vị trí được truyền tới từ parent view controller.

![](https://images.viblo.asia/234aef7e-3505-4fc7-8c1d-7ce127695e7e.png)

Mục đích là để các root view của child controller xuất hiện trên parent view controller. Sử dụng Interface Builder kéo hai container views từ  Xcode Object Library vào root view của parent view controller:

![](https://images.viblo.asia/d7cc162d-cdec-4e61-b8f7-ea75c3535ff0.png)

Interface Builder tạo hai kết nối tới hai child view controller

![](https://images.viblo.asia/4c46ff1b-b724-4123-9cc4-64da2d2dddfa.png)

Sau khi xoá hai liên kết này, kéo điều khiển từ container view phía trên sang  location table view controller và chọn nhúng segue:

![](https://images.viblo.asia/83edf616-e6d4-461f-bd87-5ac49f81ccef.png)

Tương tự với view ở dưới và map view controller.

### Container View Constraints
Bước tiếp theo là tạo một số Auto layout constrant cho container view của chúng ta. Ở đây mình thêm hai view vào vertical stack view

![](https://images.viblo.asia/ca9ae1d9-5987-4533-a0af-8ae010c5d8de.png)

Stack view chia đều diện tích cho hai child view. Dưới đây là bố cục giao diện:

![](https://images.viblo.asia/6fa211a8-29f5-4a8f-b75b-2c210f2b8b5e.png)

**Truy cập vào Child Controllers**
Thuộc tính childViewControllers của UIViewController là một mảng read-only của child view controllers. Chúng ta có thể sử dụng trong viewDidLoad của parent view controller để lấy các tham chiếu đến các phần tử con và set delegate:

```
private var locationTableViewController: LocationTableViewController?
private var mapViewController: MapViewController?

override func viewDidLoad() {
  super.viewDidLoad()

  guard let locationController = childViewControllers.first as? LocationTableViewController else  {
    fatalError("Check storyboard for missing LocationTableViewController")
  }

  guard let mapController = childViewControllers.last as? MapViewController else {
    fatalError("Check storyboard for missing MapViewController")
  }

  locationTableViewController = locationController
  mapViewController = mapController
  locationController.delegate = self
}
```

Ngoài ra, chúng ta có thể sử dụng prepare(for segue: sender:) được gọi cho cả hai embed segues mà chúng ta đã tạo trong storyboard:

```
override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
    let destination = segue.destination
    if let locationController = destination as? LocationTableViewController {
      locationTableViewController = locationController
      locationController.delegate = self
    }

    if let mapController = destination as? MapViewController {
      mapViewController = mapController
    }
}
```

**Thêm và xoá child views**
Storyboards giúp dễ dàng thiết lập static container views nhưng nếu bạn muốn tự động thêm và xóa child view controller thì sao? Mình sẽ xóa các container view và embed segues khỏi Storyboard và tạo lại cùng một thiết lập bằng code.

MasterViewController của mình hiện có stack view và biến lazy khởi tạo hai child view controller từ Storyboard khi được truy cập lần đầu:

```
private let topStackView = UIStackView()
private lazy var locationTableViewController: LocationTableViewController = ...
private lazy var mapViewController: MapViewController = ...
```

Trong phương thức viewDidLoad của bộ parent view controller, mình thiết lập stack view và thêm hai child view controller:

```
override func viewDidLoad() {
    super.viewDidLoad()
    setupStackView()

    addContentController(locationTableViewController, to: topStackView)
    addContentController(mapViewController, to: topStackView)
    locationTableViewController.delegate = self
}
```

Mình sẽ bỏ qua việc thiết lập stack view. Điều thú vị là các bước để thêm child view controller mà mình đã thu thập thành một phương thức nhỏ:

```
private func addContentController(_ child: UIViewController, to stackView: UIStackView) {
    addChildViewController(child)
    stackView.addArrangedSubview(child.view)
    child.didMove(toParentViewController: self)
}
```

Có ba bước cần làm:

1. Tạo mối quan hệ parent - child bằng cách gọi phương thức addChildViewContaptor của parent và truyền child view controller làm tham số.
2. Thêm root view của child controller vào parent container view và thiết lập các constraint.
3. Gọi phương thức  didMove(toParentViewController:) của child controller.

Trong trường hợp cần xoá child view controller, chúng ta sẽ làm theo như sau: 

```
private func removeContentController(_ child: UIViewController, from stackView: UIStackView) {
    child.willMove(toParentViewController: nil)
    child.view.removeFromSuperview()
    child.removeFromParentViewController()
}
```

Chúng ta đảo ngược các bước so với thao tác thêm ở trên:

1. Gọi phương thức willMove (toParentViewControll:) của chil view controller và truyền nil làm tham số.
2. Xóa child view controller khỏi cây giao diện của parent controller.
3. Gọi phương thức removeFromParentViewControll của child view controller.

Tham khao: https://useyourloaf.com/blog/container-view-controllers/