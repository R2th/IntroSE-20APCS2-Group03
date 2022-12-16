### 1. Giới thiệu 

Sử dụng **UISplitViewController** cho phép chia ứng dụng làm hai phần và hiển thị Viewcontroller ở mỗi bên. Nó thường được sử dụng để hiển thị Navigation(thanh điều hướng) ở phía bên trái và DetailView(chế độ xem chi tiết) ở bên phải. Trong bài viết này mình sẽ hướng dẫn các bạn để làm được điều đó :smiley: 

Trong hướng dẫn này, bạn sẽ tạo ra một ứng dụng sử dụng **SplitViewController** để hiển thị danh sách các quái vật từ [Math Ninja](https://apps.apple.com/us/app/math-ninja-hd/id370144476), một trong những trò chơi được phát triển bởi nhóm Razcare. Bạn sẽ sử dụng **SplitViewController** để xử lý điều hướng và hiển thị, cái này thích ứng hoạt động trên cả iPhone và iPad nhé :grin:



![](https://images.viblo.asia/db438ac7-96da-40f1-a66a-fd466b1ece38.png)


### 2. Bắt đầu 
   Đầu tiên hãy tạo mới một Project trong Xcode và chọn **iOS\Application\Single View App**
   
   ![](https://images.viblo.asia/76e13ffb-9d48-42b0-a296-700d3bbc6b6e.png)

   Tên của Project là **MathMonsters**. Để chọn ngôn ngữ **Swift** , bỏ tích các ô trống sau đó ấn            **Next** để hoàn thành việc tạo Project.

   Tiếp đến các bạn mở **Main.storyboard**.
   Xoá màn **ViewController** ban đầu được đặt mặc định bên trong storyboard đi và xoá cả file                  **Viewcontroller.Swift** được reference đến nó.

   Kéo thả một **Split View Controller** vào trong storyboard trống.

   ![](https://images.viblo.asia/76a75985-1616-4322-84f8-6f8dc10dbe8f.png)

   Sau khi kéo xong ở đây chúng ta có được:
   

  * **Split View Controller**: Đây là giao diện gốc của ứng dụng, SplitView sẽ chứa toàn bộ phần còn lại   của ứng dụng.
 * **Navigation Controller**: Là **UINavigationController**, ở đây sẽ là chế độ xem gốc màn  **MasterViewController** của bạn. Nếu bạn nhìn vào màn SplitViewController bạn sẽ thấy có một mối  liên kết segue đến màn **MasterViewController** (ở đây là **RootViewController**). Điều này cho phép bạn tạo toàn bộ hệ thống phân cấp điều hướng ở bên trong màn chính của bạn mà không ảnh hưởng gì đến màn hiển thị chi tiết(**DetailViewController**).
* **ViewController(DetailViewController)**: Màn này sẽ hiển thị toàn bộ chi tiết của những con quái vật, nếu bạn để ý màn này cũng sẽ có một mối liên kết segue đến màn **SplitViewController**.

![](https://images.viblo.asia/eb2d5071-c0ca-462a-95ae-20052b2cb0bf.png)

* **TableViewController(MasterViewController)**: Màn này sẽ hiển thị danh sách quái vật và là màn chính gốc của **UINavigationController**.

  Bây giờ bạn phải cho SplitViewController thành màn xem ban đầu vì bạn đã xoá màn Viewcontroller mặc định lúc đầu bên trong storyboard. 
  
  Chọn **SplitViewController** và mở **Attributes inspector** , tích vào ô **Is Initial View Controller** 
  
  
     ![](https://images.viblo.asia/cc310f8e-53a3-4003-960e-208c992382cd.png)

   Bạn sẽ thấy một mũi tên bên trái màn SplitViewController , điều đó cho thấy rằng màn này đã trở thành    màn xem ban đầu.

   Build và Run ứng dụng của bạn trên ipad giả lập sau đó xoay giả lập sang ngang. Bạn sẽ thấy một màn        SplitViewController trống như sau: 

     ![](https://images.viblo.asia/e098fc5f-6427-4837-b61e-fc3476769cc4.png)

  Bây giờ bạn hãy chạy thử trên bất kỳ giả lập Iphone nào ngoại trừ các iphone Plus (đủ lớn để hoạt động giống iPad) và bạn sẽ thấy rằng nó sẽ hiển thị chế độ xem chi tiết toàn màn hình thay vì hiển thị giống như iPad ở trên. Ở đây nó sẽ cho phép bạn ấn nút quay trở lại trên thanh điều hướng để bật lại màn MasterViewController.
     ![](https://images.viblo.asia/cc57e962-7089-4cc8-8353-2db2f65cf692.png)

   Như vậy chúng ta thấy rằng ở trên iPhone (không phải iPhone Plus) SplitViewController sẽ hoạt động giống như là ứng dụng Master-Detail truyền thống với một NavigationController cho phép đẩy và bật về qua lại. Chức năng này được tích hợp sẵn bên trong nó. Tuyệt phải không nào :laughing::laughing:

###  3. Tạo màn ViewController tuỳ chỉnh 
Bây giờ bạn cần triền khai code để có được dữ liệu để hiển thị.

Chuyển đến **File\New\File…** và chọn **iOS\Source\Cocoa Touch Class**. Đặt tên class là **MasterViewController** và để nó làm lớp con của **UITableViewController**. Bỏ tích ô **Also create XIB file** và để chọn ngôn ngữ là **Swift** . Chọn **Next** sau đó ấn **Create**.

Mở file **MasterViewController.swift**.

Cuộn xuống method `numberOfSections(in:)` và xoá nó đi vì chỉ có một phần được trả về.

Tiếp theo, tìm method `tableView(_:numberOfRowsInSection:)` và triển khai đoạn code sau:
```
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
  return 10
}
```

Cuối cùng, tìm method `tableView(_:cellForRowAt:)` bỏ comment và triển khai đoạn code sau:
```
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
  let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
  return cell
}
```

Bằng cách này bạn sẽ chỉ có 10 hàng trống để hiển thị.

Tiếp đến mở **Main.storyboard** chọn **Root View Controller**. Click vào **Identity inspector** và đổi class thành **MasterViewController**.

Thêm vào đó, bạn cần phải đổi tên định danh cho cell của Tableview nếu không sẽ bị crash app khi chạy.

Bên trong màn **Master View Controller**, chọn **Prototype Cell** và thay đổi **Identifier** thành **Cell**. Thay đổi cell **Style**  thành **Basic**.

![](https://images.viblo.asia/33dd6e25-828f-4cae-be17-55b593323fa7.png)

Thế là xong màn chính bây giờ đến màn chi tiết :grin: :

Chuyển đến **File\New\File…** và chọn **iOS\Source\Cocoa Touch Class**. Đặt tên class là **DetailViewController** và để nó làm lớp con của **UIViewController**. Bỏ tích ô **Also create XIB file** và để chọn ngôn ngữ là **Swift** . Chọn **Next** sau đó ấn **Create**.

Tiếp đến mở **Main.storyboard** chọn **View Controller**. Click vào **Identity inspector** và đổi class thành **DetailViewController**.

Sau đó kéo một **Label** vào giữa màn **DetailViewController** . Autolayout nó ở chính giữa ngang và dọc. 

   ![](https://images.viblo.asia/9dd2baba-0dfa-45f3-aa58-06568ff4eff8.png)


   Chọn **Label** và đổi tên text của nó thành **Hello, World!** để nhận biết nó hoạt động ra sao.

Build và Run ứng dụng, bạn sẽ thấy các màn mà bạn vừa thiết lập 

Trên iPad:
![](https://images.viblo.asia/5d632291-fc97-461a-bd75-00ade474fa97.png)

Trên iPhone:
![](https://images.viblo.asia/1e10a692-564a-49c4-9368-ae9b320ec544.png)

### 4. Khởi tạo dữ liệu 
### 
Việc tiếp theo là bạn cần phải khởi tạo một model cho dữ liệu của bạn để hiển thị .

Đầu tiên hãy tạo một class để đại diện cho quái vật bạn muốn hiển thị. Chuyển đến **File\New\File…**, chọn **iOS\Source\Swift File**, và chọn **Next**. Đặt tên của file là **Monster** và chọn **Create**.

Bạn chỉ cần tạo một class đơn giản với một vài thuộc tính về từng quái vật bạn muốn hiển thị và một vài method để tạo quái vật mới và truy cập hình ảnh của vũ khí mà mỗi quái vật có.

Thêm đoạn code sau vào file **Monster.swift**
```
import UIKit

enum Weapon {
  case blowgun, ninjaStar, fire, sword, smoke
}

class Monster {
  let name: String
  let description: String
  let iconName: String
  let weapon: Weapon
  
  init(name: String, description: String, iconName: String, weapon: Weapon) {
    self.name = name
    self.description = description
    self.iconName = iconName
    self.weapon = weapon
  }
  
  var weaponImage: UIImage {
    switch weapon {
    case .blowgun:
      return UIImage(named: "blowgun.png")!
    case .fire:
      return UIImage(named: "fire.png")!
    case .ninjaStar:
      return UIImage(named: "ninjastar.png")!
    case .smoke:
      return UIImage(named: "smoke.png")!
    case .sword:
      return UIImage(named: "sword.png")!
    }
  }
  
  var icon: UIImage? {
    return UIImage(named: iconName)
  }
}
```

File này xác định một bảng liệt kê theo các loại vũ khí khác nhau, và sau đó là một class chứa thông tin quái vật. Có một trình khởi tạo đơn giản để tạo các instance của `Monster` và một method để có được một hình ảnh tương ứng với vũ khí quái vật.

Vậy là chúng ta đã tạo xong model dữ liệu, việc tiếp theo là kết nối nó với màn chính để hiển thị. :heart_eyes:

### 5. Hiển thị danh sách quái vật 
### 

Mở file **MasterViewControll.swift** và thêm một property mới vào class:
```
let monsters = [
  Monster(name: "Cat-Bot", description: "MEE-OW",
          iconName: "meetcatbot", weapon: .sword),
  Monster(name: "Dog-Bot", description: "BOW-WOW",
          iconName: "meetdogbot", weapon: .blowgun),
  Monster(name: "Explode-Bot", description: "BOOM!",
          iconName: "meetexplodebot", weapon: .smoke),
  Monster(name: "Fire-Bot", description: "Will Make You Steamed",
          iconName: "meetfirebot", weapon: .ninjaStar),
  Monster(name: "Ice-Bot", description: "Has A Chilling Effect",
          iconName: "meeticebot", weapon: .fire),
  Monster(name: "Mini-Tomato-Bot", description: "Extremely Handsome",
          iconName: "meetminitomatobot", weapon: .ninjaStar)
]
```

Việc này đã tạo một mảng quái vật để cho vào tableview

Tìm method  `tableView(_:numberOfRowsInSection:)` và thay thế câu lệnh `return` như sau: 
```
return monsters.count
```

Cái này sẽ trả về số lượng quái vật dựa trên số lượng của mảng trên

Tiếp đến tìm method `tableView(_:cellForRowAtIndexPath:)` và thêm những dòng code dưới đây trước câu lệnh `return`:

```
let monster = monsters[indexPath.row]
cell.textLabel?.text = monster.name
```

Việc này sẽ cấu hình các cell trong tableview theo tên của từng quái vật trong mảng.

Tải xuống và giải nén [gói này](https://koenig-media.raywenderlich.com/uploads/2015/05/MonsterArt.zip). Kéo thư mục chứa những hình ảnh đó vào **Assets.xcassets** trong Xcode.

Build và Run ứng dụng.

Trên iPad:
![](https://images.viblo.asia/7c3c37ef-6d8f-4d81-9d56-fb00b699c00e.png)

Trên iPhone:
![](https://images.viblo.asia/88bfb8ad-e972-4137-9357-a4395b38f01d.png)

### 6. Hiển thị dữ liệu chi tiết 
### 

Mở **Main.storyboard**, chọn **DetailViewController** và xóa **Label** đã cho vào trước đó.

Thêm 2 imageView và 3 Label và Autolayout nó như ảnh sau: 
![](https://images.viblo.asia/2364e5b6-fdf7-4cb8-97af-db3a017b6309.png)

Tiếp theo bạn sẽ phải ánh xạ chúng tới những outlet  

Mở file  **DetailViewController.swift** và thêm các thuộc tính sau vào phần đầu của class:

```
@IBOutlet weak var nameLabel: UILabel!
@IBOutlet weak var descriptionLabel: UILabel!
@IBOutlet weak var iconImageView: UIImageView!
@IBOutlet weak var weaponImageView: UIImageView!

var monster: Monster? {
  didSet {
    refreshUI()
  }
}
```

Tại đây, bạn đã thêm các thuộc tính cho các thành phần UI khác nhau mà bạn vừa thêm trong màn Detail. Bạn cũng đã thêm một thuộc tính cho đối tượng **Monster** mà view controller này sẽ hiển thị.

Tiếp theo, thêm phương thức sau vào lớp:
```
func refreshUI() {
  loadViewIfNeeded()
  nameLabel.text = monster?.name
  descriptionLabel.text = monster?.description
  iconImageView.image = monster?.icon
  weaponImageView.image = monster?.weaponImage
}
```

Bất cứ khi nào bạn chuyển đổi quái vật, bạn sẽ muốn UI tự làm mới và cập nhật các chi tiết được hiển thị trong các outlet. Có thể bạn sẽ thay đổi quái vật và kích hoạt phương thức ngay trước khi view được tải, vì vậy bạn gọi `loadView IfNeeded () ` để đảm bảo rằng view được tải và các outlet của nó được kết nối.

Bây giờ, hãy mở **Main.storyboard**. Bấm chuột phải vào đối tượng **DetailViewController** từ **Document Outline** để hiển thị danh sách các outlet. Kéo từ vòng tròn ở bên phải của mỗi mục vào các view tương ứng với outlet đặt tên để ánh xạ chúng với nhau.


![](https://images.viblo.asia/0fe2085b-78cf-41a9-ac89-3218da000507.png)

Truy cập file **AppDelegate.swift**, tìm method`application(_:didFinishLaunchingWithOptions:) `và triển khai thêm các đoạn code sau 
```
guard let splitViewController = window?.rootViewController as? UISplitViewController,
  let leftNavController = splitViewController.viewControllers.first as? UINavigationController,
  let masterViewController = leftNavController.topViewController as? MasterViewController,
  let detailViewController = splitViewController.viewControllers.last as? DetailViewController
  else { fatalError() }

let firstMonster = masterViewController.monsters.first
detailViewController.monster = firstMonster

return true
```

Một Split view controller có một thuộc tính `viewControllers` mà có Master view controller và Detail view controller bên trong. MasterViewController trong trường hợp của bạn thực ra là bộ điều khiển điều hướng, vì thế cho nên bạn phải thiết lập màn MasterViewController lên đầu. Từ đó, bạn mới có thể cho nó hiển thị danh sách quái vật đầu tiên để điều hướng sang màn chi tiết quái vật.

Build và Run ứng dụng và nếu mọi việc suôn sẻ, bạn sẽ thấy chi tiết quái vật nằm ở  màn bên phải (đối với giả lập iPad).

Trên iPad:
![](https://images.viblo.asia/ce901889-4d2f-4026-9c23-e564853e1960.png)

Trên iPhone:
![](https://images.viblo.asia/b6eb6fbb-a8b3-4866-81f5-3632cebf3dcd.png)

Wow tuyệt vời phải không :grin::heart_eyes:

Oops hình như có gì đó chưa ổn thì phải :scream::scream: đó là do việc chọn một quái vật khác trên màn **MasterViewController** vẫn chưa có thay đổi gì và bạn đã bị mắc kẹt với Cat-Bot mãi mãi. Đó là những gì bạn sẽ xử lý tiếp theo!  :stuck_out_tongue_winking_eye:

### 7. Kết nối màn Master với màn Detail 
### 

Ở đây chúng ta sẽ dùng *delegate* để truyền dữ liệu giữa hai màn.

Mở file **MasterViewController.swift** và thêm **Protocol** lên phía  trên tên class  MasterViewController như sau
```
protocol MonsterSelectionDelegate: class {
  func monsterSelected(_ newMonster: Monster)
}
```

Giao thức này sẽ định nghĩa một method duy nhất `monsterSelected(_:)`. Màn Detail sẽ tiến hành thực hiện method này và màn Master sẽ thông báo cho nó khi một quái vật được lựa chọn. 

Tiếp theo , cập nhật `MasterViewController` để thêm một thuộc tính cho đối tượng tuân thủ giao thức uỷ nhiệm 

```
weak var delegate: MonsterSelectionDelegate?
```

Về cơ bản , điều này nghĩa là đối tượng nào implement Protocol này phải thực hiện những phương thức bên trong nó uỷ nhiệm. Vì vậy bạn muốn `DetailViewController` phải cập nhật khi quái vật được chọn nên bạn cần triển khai delegate này.

Mở file **DetailViewController.swift** và thêm phần extension class vào cuối file:

```
extension DetailViewController: MonsterSelectionDelegate {
  func monsterSelected(_ newMonster: Monster) {
    monster = newMonster
  }
}
```

Bây giờ phương thức uỷ nhiệm đã sẵn sàng, bạn cần gọi nó từ phía màn Master.

Mở file **MasterViewController.swift** và thêm vào phương thức sau:

```
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
  let selectedMonster = monsters[indexPath.row]
  delegate?.monsterSelected(selectedMonster)
}
```

Triển khai phương thức này nghĩa là bạn sẽ nhận được thông báo bất cứ khi nào người dùng chọn một hàng trong tableview. Nó sẽ thông báo cho màn Detail thông qua **delegate**.

Cuối cùng, mở file **AppDelegate.swift**. Trong method `application(_:didFinishLaunchingWithOptions:)` thêm đoạn code dưới đây trước câu lệnh `return `phía cuối cùng.

```
masterViewController.delegate = detailViewController
```

Vậy là chúng ta đã thực hiện xong việc kết nối cuối cùng giữa hai màn :grin:.

Build và Run ứng dụng trên iPad và bây giờ bạn có thể lựa chọn giữa các quái vật như sau:

![](https://images.viblo.asia/ce92e5d2-1974-4902-9ce1-8a8a36d5d105.png)

Quá tuyệt vời phải không nào :grin:. 

Ngoại trừ một vấn đề còn lại là nếu bạn chạy nó trên iPhone, khi chọn quái vật từ màn Master table view sẽ không hiển thị được màn Detail view controller. Vậy nên bạn cần thêm một sửa đổi nhỏ để Split view controller hoạt động được trên cả iPhone và iPad.

Mở file **MasterViewControll.swift**. Tìm method `tableView(_:didSelectRowAt:)`  và thêm đoạn code sau vào phía cuối method. 

```
if let detailViewController = delegate as? DetailViewController {
  splitViewController?.showDetailViewController(detailViewController, sender: nil)
}
```

Đoạn code này chỉ thay đổi hành vi của ứng dụng trên iPhone, khiến bộ điều khiển điều hướng đẩy Detail view controller lên ngăn xếp khi bạn chọn một quái vật mới. Nó không làm thay đổi hành vi khi triển khai  trên iPad, vì trên iPad Detail view controller luôn hiển thị.

Sau khi thực hiện xong thay đổi này, hãy thử chạy trên iPhone và bây giờ nó sẽ hoạt động như chúng ta mong muốn. Như vậy, chỉ thêm một vài dòng code đã giúp bạn có màn SplitViewController đầy đủ chức năng trên cả iPhone và iPad. :heart_eyes::laughing:

![](https://images.viblo.asia/30ec7227-b874-4e37-9735-4cbaab3c5670.png)

### 8. Tổng kết 

* Bạn có thể download toàn bộ project tại [đây](https://koenig-media.raywenderlich.com/uploads/2017/12/MathMonsters_Final.zip)
* Trong bài viết này mình đã giới thiệu cho các bạn về UISplitViewController trong đó có sử dụng Protocol, Delegate và các trạng thái của SplitViewController. Hi vọng bài viết này sẽ có ích cho các bạn. Cảm ơn vì đã đọc bài viết của mình.
* Các kiến thức trong bài viết này mình có tham khảo ở: 
 https://www.raywenderlich.com/265-uisplitviewcontroller-tutorial-getting-started