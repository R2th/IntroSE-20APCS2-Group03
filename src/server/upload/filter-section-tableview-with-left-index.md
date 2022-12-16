# Giới thiệu:
* Trong bài viết này tôi sẽ hướng dẫn các bạn tạo ra một bảng mục lục bên phải của TableView, bảng mục lục này sẽ hiển thị theo thứ tự của bảng chữ cái hoặc con số. Nơi user có thể tap vào và TableView sẽ tự động scroll đến vị trí của section theo chữ cái được chọn giống như ứng dụng danh bạ của IOS. Ta sẽ tạo một tableview hiển thị danh sách tên các loại xe, và chữ cái đầu tiên tên của các chiếc xe sẽ dùng để tạo chỉ mục bên phải. 

![](https://images.viblo.asia/9ba3faa4-c7ce-4073-9df4-826db4a912a5.png)

# Thực hiện:
* Mở Xcode lên và tạo một project mới.

![](https://images.viblo.asia/0811ab5f-5b18-4332-ace2-69268e0a4740.png)

* Chúng ta điền đầy đủ thông tin cho project và khởi tạo.

![](https://images.viblo.asia/aa9f86c5-4f61-4f0f-aa3b-72ad7eb53d53.png)


* Di chuyển đến storyboard và xóa ViewController mặc định. Chúng ta tạo một TableViewController mới. Click vào TableViewCell và di chuyển đến Attributes Inspector, set giá trị Identifier của tableViewCell là "Cell"

![](https://images.viblo.asia/9e2f5989-4807-43a2-93d9-d00f7b4d271a.png)
* Storyboard lúc này sẽ trông như thế này 

![](https://images.viblo.asia/da420416-e51e-4ab0-b308-dffa865972c6.png)

* Tiếp theo , chúng ta tạo một class TableViewController kế thừa từ UITableView để sử dụng cho Table View Controller trong storyboard. 

![](https://images.viblo.asia/0c632b4c-d1e2-41fd-b3db-4e1af7af2812.png)

![](https://images.viblo.asia/887e4b85-c563-4ef4-a060-1243e99c26c6.png)

* Ta bắt đầu viết code để khởi tạo index. Đầu tiên ta khởi tạo các properties sau trong class TableViewController

```
var carsDictionary = [String: [String]]()
var carSectionTitles = [String]()
var cars = [String]()

```
* Ta thêm phần tử vào mảng cars trong viewDidLoad().

```
override func viewDidLoad() {
    super.viewDidLoad()
    
    cars = ["Audi", "Aston Martin","BMW", "Bugatti", "Bentley","Chevrolet", "Cadillac","Dodge","Ferrari", "Ford","Honda","Jaguar","Lamborghini","Mercedes", "Mazda","Nissan","Porsche","Rolls Royce","Toyota","Volkswagen"]
    
    // 1
    for car in cars {
        let carKey = String(car.prefix(1))
            if var carValues = carsDictionary[carKey] {
                carValues.append(car)
                carsDictionary[carKey] = carValues
            } else {
                carsDictionary[carKey] = [car]
            }
    }
    
    // 2
    carSectionTitles = [String](carsDictionary.keys)
    carSectionTitles = carSectionTitles.sorted(by: { $0 < $1 })
}
```

1. Dòng for này sẽ duyệt qua mảng cars lấy chữ cái đầu tiên của các phần tử làm key cho carsDictionary, sau đó thêm các phần tử có chữ cái đầu tiên của tên xe vào trong mảng trùng với key của carsDictionary.
2. Ở đây ta sẽ lấy list Key từ carsDictionary gán vào carSectionTitles và sorted chúng lại theo thứ tự.

* Tiếp theo, ta sẽ sử dụng delegate của UITableView:
```
override func numberOfSections(in tableView: UITableView) -> Int {
    // 1
    return carSectionTitles.count
}

override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    // 2
    let carKey = carSectionTitles[section]
    if let carValues = carsDictionary[carKey] {
        return carValues.count
    }
        
    return 0
}

override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    // 3
    let cell = tableView.dequeueReusableCell(withIdentifier: "Cell", for: indexPath)
      
    // Configure the cell...
    let carKey = carSectionTitles[indexPath.section]
    if let carValues = carsDictionary[carKey] {
        cell.textLabel?.text = carValues[indexPath.row]
    }

    return cell
}
```

1. numberOfSections sẽ được return theo số phần tử của carSectionTitles
2. numberOfRowsInSection sẽ được return tổng số phần tử tên các loại xe có trong các section của carsDictionary.
3. Set tên của các loại xe có trong từng section index của carsDictionary vào thuộc tính textLabel của TableViewCell.

* Để hiển thị header title của mỗi section, sử dụng hàm tableview(_:titleForHeaderInSection:).
```
override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
    return carSectionTitles[section]
}

```


* Để thêm index TableView bên phải, ta sử dụng hàm sectionIndexTitles(for:).
```
 override func sectionIndexTitles(for tableView: UITableView) -> [String]? {
    return carSectionTitles
}
```

Buid và Run để xem thành quả.

![](https://images.viblo.asia/477cad2a-a5f4-4902-bfce-f4cb677c217d.png)


* References:https://www.ioscreator.com/tutorials/indexed-table-view-ios-tutorial-ios11