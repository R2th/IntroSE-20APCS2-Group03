Ở phần [Bắt đầu phát triển iOS Apps với Swift part 6.1 : Tạo Table View](https://viblo.asia/p/bat-dau-phat-trien-ios-apps-voi-swift-part-61-tao-table-view-4dbZNELqKYM) chúng ta đã học được các kiến thức cơ bản như:
* Tạo được màn hình storyboard thứ 2
* HIểu được các thành phần cơ bản của table view
* Tạo và thiết kết custom table view cell

Ở Phần 6.2 này chúng ta sẽ cùng nhau tìm hiểu thêm về:
* Vai trò của table view delegates và nguồn data (data resources)
* Sử dụng mảng để lưu trữ và làm việc với data
* Hiển thị dynamic data trên table view
Đây đề là những kiến thức rất quan trọng để làm việc với table view trong tương lai.
Nào, chúng ta bắt tay vào tìm hiểu nhé.

Ở 6.1 chúng ta đã thêm ảnh vào project rồi.
Mở đầu 6.2 sẽ là cách kết nối UI của table cell với Code
# Kết nối UI của table cell với Code
Chúng ta cần tạo các [outlet](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW55) kết nối prototype ở storyboard  với source code tương ứng với table view cell ở file `MealTableViewCell.swift` để có thể hiển thị dynamic data ở table view cell ở phần sau.

**Cách kết nối views tới code của `MealTableViewCell.swift.`**

1. Ở storyboard, chọn lable ở table view cell
2. Mở assistant editor cho dễ quan sát

![](https://images.viblo.asia/9e1af982-410d-4cb6-a19e-a57d85e7e048.png)

3. Chuyển chế độ xem từ Preview sang Automatic > MealTableViewCell.swift.
4. Tìm class MealTableViewCell
```Swift
class MealTableViewCell: UITableViewCell {
```
Thêm dòng comment để add properties
```Swift
//MARK: Properties
```
5. Control-drag từ lable vào editor

![](https://images.viblo.asia/9f0b5467-d014-49d2-81a1-1c5dfa6b65e1.png)

6. Ở dialog vừa xuất hiện, gõ Name là `nameLabel`. Để các lựa chọn còn lại default

![](https://images.viblo.asia/3b5d3553-47a0-4d92-ac34-1d12cdd491da.png)

7. Click Connect
8. Làm tương tự với image view, Name là `photoImageView`
9. Tương tự với phần rating, Name đặt là `ratingControl`
10. Chúng ta sẽ có các outlets như dưới đây
```Swift
@IBOutlet weak var nameLabel: UILabel!
@IBOutlet weak var photoImageView: UIImageView!
@IBOutlet weak var ratingControl: RatingControl!
```

# Load dữ liệu ban đầu
Để hiển thị dữ liệu thật ở mỗi table cell, chúng ta cần viết code để load data ra. Nhưng ở thời điểm hiện tại, chúng ta mới chỉ tạo ra được data model quản lý từng món ăn (`Meal`) mà thôi. Chúng ta còn cần thêm một controller để quản lý list các món ăn (`Meal List`) nữa, và controller đó sẽ là một subclass của view controller, có kết nối với màn hình meal list, đồng thời có reference tới các data model (meal model) tương ứng được hiển thị trên UI.

Các tạo subclass của `UITableViewController`
1. Chọn  File > New > File (hoặc tổ hợp Command-N).
2. Ở top của dialog hiện ra, chọn iOS, và chọn Cocoa Touch Class.
3. Click Next.
4. Ở Class field, chọn Meal.
5. Ở “Subclass of” field, chọn UITableViewController.
6. Đảm bảo là “Also create XIB file” không được chọn.
XIB files là cách cũ hơn để controller quản lý views. Lần này chúng ta không cần dùng tới.
7. Language option để Swift.
8. Click Next. Để các phần còn lại default
9. click Create.
Xcode sẽ tạo ra file MealTableViewController.swift, đây là nơi lưu giữ source code của custom subclass chúng ta vừa tạo ra.

Ở custom subclass này chúng ta có thể định nghĩa các property để lưu trữ list các Meal objects. Và `Array` chính là cấu trúc [thư việc chuẩn Swift](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/DevelopiOSAppsSwift/GlossaryDefinitions.html#//apple_ref/doc/uid/TP40015214-CH12-SW111) chuẩn bị để quản lý list này.

**Load dữ liệu ban đầu**
1. Chuyển từ assistant editor sang Standar editor
2. Mở file `MealTableViewController.swift`
3. Thêm mảng meals
```Swift
//MARK: Properties

var meals = [Meal]()
```
4. Thêm function để load data ví dụ lên Meal list
```Swift
//MARK: Private Methods
 
private func loadSampleMeals() {
    
}
```
5. Thêm các ảnh cho data ví dụ
```Swift
let photo1 = UIImage(named: "meal1")
let photo2 = UIImage(named: "meal2")
let photo3 = UIImage(named: "meal3")
```
6. Tạo 3 meal objects tương ứng
```Swift
guard let meal1 = Meal(name: "Caprese Salad", photo: photo1, rating: 4) else {
    fatalError("Unable to instantiate meal1")
}
 
guard let meal2 = Meal(name: "Chicken and Potatoes", photo: photo2, rating: 5) else {
    fatalError("Unable to instantiate meal2")
}
 
guard let meal3 = Meal(name: "Pasta with Meatballs", photo: photo3, rating: 3) else {
    fatalError("Unable to instantiate meal2")
}
```
7. Thêm 3 object đó vào mảng meals
```Swift
meals += [meal1, meal2, meal3]
```
8. Ở `viewDidLoad()`, thêm vào dòng lệnh gọi hàm load data ví dụ
```Swift
// Load the sample data.
loadSampleMeals()
```
Hiện tại hàm `viewDidLoad()` sẽ có dạng
```Swift
override func viewDidLoad() {
    super.viewDidLoad()
    
    // Load the sample data.
    loadSampleMeals()
}
```
và hàm `loadSampleMeals()` sẽ có dạng
```Swift
private func loadSampleMeals() {
    
    let photo1 = UIImage(named: "meal1")
    let photo2 = UIImage(named: "meal2")
    let photo3 = UIImage(named: "meal3")
    
    guard let meal1 = Meal(name: "Caprese Salad", photo: photo1, rating: 4) else {
        fatalError("Unable to instantiate meal1")
    }
    
    guard let meal2 = Meal(name: "Chicken and Potatoes", photo: photo2, rating: 5) else {
        fatalError("Unable to instantiate meal2")
    }
    
    guard let meal3 = Meal(name: "Pasta with Meatballs", photo: photo3, rating: 3) else {
        fatalError("Unable to instantiate meal2")
    }
    
    meals += [meal1, meal2, meal3]
}
```

# Hiển thị dữ liệu
Để hiển thị dynamic data, table view cần 2 thành phần quan trọng: đó là `data resource` và `delegate`.  Data resource như tên của nó, cung cấp cho table view dữ liệu nó cần để hiển thị. Trong khi đó, Delegate giúp table view quản lý việc user chọn cell, điều chỉnh chiều cao của cell và các đặc trưng khác phục vụ quá trình hiển thị dữ liệu. 2 thành phần được mặc định cung cấp cho UITableViewController và các subclass của nó. Công việc của chúng ta chỉ là implement nó một các hợp lý để dữ liệu được show theo đúng yêu cầu ban đầu.
Có 3 method cho data resource là
```Swift
func numberOfSections(in tableView: UITableView) -> Int
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell
```
Method đầu tiên `numberOfSections(In:)` quy định số lượng section trong table, hay nói cách khác là số lượng group trong table. Trong app của chúng ta chỉ có một group duy nhết nên cũng không cần chỉnh sửa quá nhiều

**Để phân chia số section ở table view**
1. Tìm tới method `numberOfSections(In:)`
```Swift
override func numberOfSections(in tableView: UITableView) -> Int {
    // #warning Incomplete implementation, return the number of sections
    return 0
}
```
2. Trả về 1 thay vì 0, bỏ qua phần warning
```Swift
override func numberOfSections(in tableView: UITableView) -> Int {
    return 1
}
```

Method thứ 2, `tableView(_:numberOfRowsInSection:)` chỉ định số rows của table ở mỗi section. App chúng ta có một section thôi, vì vậy số lượng meal trong section này cũng là số meal trong cả table view của chúng ta luôn

**Trả về số lượng rows ở table view**
1. Tìm hàm `tableView(_:numberOfRowsInSection:) `
```Swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // #warning Incomplete implementation, return the number of rows
    return 0
}
```
2. Trả về số lượng rows thích hợp (chính bằng số lượng item trong array `meals.count`)
```Swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    return meals.count
}
```

Method cuối cùng `tableView(_:cellForRowAt:)` chỉ định số lượng cell cho mỗi row. Ở app của chúng ta, mỗi row chỉ hiển thị đúng 1 cell thôi.

**Cài đặt và hiện thị cells ở table view**
1. Uncomment method `tableView(_:cellForRowAt:)`
```Swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)
    
    // Configure the cell...
    
    return cell
}
```
dequeueReusableCell là method cho phép sử dụng lại các cell khi user scroll, thay vì tạo cell mới và xoá cell cũ.

2. Chỉ định identifiler là prototype cell chúng ta đã set ở storyboard (MealTableViewCell)
```Swift
// Table view cells are reused and should be dequeued using a cell identifier.
let cellIdentifier = "MealTableViewCell"
```
3. Update lại cellIdentifier ở dòng code thứ 2
```Swift
let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath)
```
4. Đảm bảo việc setting cell thành công
```Swift
guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? MealTableViewCell  else {
    fatalError("The dequeued cell is not an instance of MealTableViewCell.")
}
```
5. Lấy meal từ mảng meals
 ```Swift
// Fetches the appropriate meal for the data source layout.
let meal = meals[indexPath.row]
```
6. Config các cell vào nơi comment được đặt ` // Configure the cell...`
 ```Swift
cell.nameLabel.text = meal.name
cell.photoImageView.image = meal.photo
cell.ratingControl.rating = meal.rating
```
Method `tableView(_:cellForRowAt:)` giờ đây sẽ có dạng
 ```Swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    
    // Table view cells are reused and should be dequeued using a cell identifier.
    let cellIdentifier = "MealTableViewCell"
    
    guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? MealTableViewCell  else {
        fatalError("The dequeued cell is not an instance of MealTableViewCell.")
    }
    
    // Fetches the appropriate meal for the data source layout.
    let meal = meals[indexPath.row]
    
    cell.nameLabel.text = meal.name
    cell.photoImageView.image = meal.photo
    cell.ratingControl.rating = meal.rating
    
    return cell
}
```

Bước cuối cùng để hiển thị dữ liệu lên là kết nối code đã định nghĩa ở `MealTableViewController.swift` tới màn hình meal list

**Trỏ Table View Controller tới file `MealTableViewController.swift`**
1. Mở storyboard
2. Chọn table view controller bằng cách click vào Screne dock

![](https://images.viblo.asia/70bb0ff9-7aa0-4cde-8e00-3a37f62896df.png)

3. Open Identify inspector
4. Ở Class field, chọn `MealTableViewController`
5. Run thử app và chúng ta sẽ thấy data ví dụ được load lên bởi hàm `viewDidLoad()`

![](https://images.viblo.asia/dbc269d4-9aba-46e3-8009-5ad038b9a739.png)

# Chỉnh sửa màn hình Meal Detail
Để từ màn hình meal list chuyển qua meal detail, chúng ta sẽ loại bỏ một vài phần code thừa trước đó (vì trước đó chúng ta đã thêm vào để hiển thị detail trước khi có meal list)

**Xoá bỏ code thừa**
1. Mở storyboard và tìm màn hình meal detail scene

![](https://images.viblo.asia/1d81ac74-111b-4b2d-afe5-5ce0b19bb66d.png)

2. Xoá bỏ label `Meal Name`
3. Mở `ViewController.swift`
4. Xoá code setting label
```Swift
mealNameLabel.text = textField.text
```
5. Bỏ outlet tương ứng
```Swift
@IBOutlet weak var mealNameLabel: UILabel!
```

**Sửa tên ViewController.swift file**
1. Chọn file `ViewController.swift`, ấn Return key.
2. Đổi tên thành `MealViewController.swift.`. Return
3. Tìm nơi định nghĩa class
```Swift
class ViewController: UIViewController, UITextFieldDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
```
4. Đổi tên class đó thành `MealViewController`
 ```Swift
class MealViewController: UIViewController, UITextFieldDelegate, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
```
5. Sửa luôn cả comment ở top cho đúng
6. Mở storyboard
7. Chọn view controller bằng cách click vào sence dock
8. Mở Identify inspector
9. Ở đâu ta cũng phải thay tên class từ `ViewController` sang `MealViewController`

![](https://images.viblo.asia/79a51e44-57c5-4932-8ad6-cdadc4e38277.png)

10. Chạy app và test kết quả!

# Kết
Trong phần này chũng ta đã tạo được custom view cell. Gắn model object vào table view controller. Đưa sample data vào model và hiển thị được dynamic data trên table view.
Trong phần tiếp theo chúng ta sẽ setting để có thể điều hướng giữa các màn hình trong app.