Bất cứ khi nào chúng ta xây dựng ứng dụng iOS, câu hỏi này luôn luôn xuất hiện trong đầu chúng ta, chọn mô hình nào cho project mới. Mô hình được sử dụng nhiều nhất trong iOS là MVC. Hầu hết các developer đều sử dụng MVC cho project của họ. Những project nhỏ hoạt động tốt với MVC. Nhưng khi size của project tăng lên, nó bắt đầu khiến cho source code của bạn lộn xộn.

Tôi luôn luôn tìm mô hình tốt để sử dụng, nhưng chúng ta không nên tuân thủ nghiêm ngặt một mô hình trong dự án của mình. Không phải mô hình nào cũng đủ tốt để cung cấp cho bạn mọi thứ. Mỗi mô hình đều có ưu và nhược điểm. Nếu chúng ta có quá nhiều modules, chúng ta có thể quyết định mô hình theo modules. Một vài modules phù hợp tốt với MVVM, nhưng có thể modules mới không hoạt động tốt với MVVM, vì vậy chúng ta có thể sử dụng các mô hình thay thế như MVP, VIPER. Vì vậy, chúng ta không nên hoàn toàn dựa vào một mô hình duy nhất, thay vào đó, chúng ta có thể kiểm tra nó theo modules cũng được.

Có rất nhiều bài viết có sẵn trên internet giải thích định nghĩa, ưu và nhược điểm của MVVM, Vì vậy tại đây tôi sẽ tập trung nhiều hơn vào việc triển khai thực tế thay vì chỉ đọc định nghĩa.

# Bắt đầu

Trong project này, chúng ta xây dựng một ứng dụng đơn giản sử dụng MVVM. Trong hầu hết các ứng dụng của chúng ta, chúng ta có một ViewController, lấy dữ liệu từ server, và hiển thị nó trong UI. Chúng ta sẽ thực hiện hành vi tương tự sử dụng MVVM. 

Đây là kết quả mong đợi của chúng tôi ở bài viết này.

![](https://images.viblo.asia/1b48ca42-8b54-4365-81b7-cd9fd17daac1.png)

Tại đây, chúng ta sẽ sử dụng một dummy web service có sẵn trên internet

http://dummy.restapiexample.com/api/v1/employees

Web service này cung cấp cho chúng ta 1 list data nhân viên và chúng ta sẽ show nó lên tableview.

# Tổng quan về thành phần và vai trò
**View Controller:** Chỉ thực hiện những thứ liên quan đến UI — Show/get thông tin, một phần của view layer 

**ViewModel:** Nhận thông tin từ VC, xử lý tất cả những thông tin này và gửi lại nó cho VC. 

**Model**: Đây là những model của bạn, không có gì nhiều ở đây. Nó giống với model trong mô hình MVC, nó được sử dụng bởi ViewModel và update bất cứ khi nào ViewModel gửi update mới.

Hãy cấu trúc code của chúng ta và tạo ra những file được yêu cầu trong những group tương ứng của chúng. Vì vậy chúng ta tạo ra 3 file, mỗi file trong một group (Model, ViewModel, APIService)

![](https://images.viblo.asia/a584fbb3-a6bc-4b02-9867-52d4d548c961.png)

# Model

Model đại diện cho dữ liệu đơn giản, Nó đơn giản nắm giữ dữ liệu và không làm bất cứ thứ gì liên quan tới logic. Bạn có thể nói một cách đơn giản đó là một cấu trúc dữ liệu mà chúng ta mong đợi từ API của chúng ta.

Tại đây chúng ta có thể kiểm tra response cho URL trên và chúng ta sẽ tạo một class model cho response này. Bạn có thể tạo một model của riêng mình hoặc ngược lại bạn có thể sử dụng bất kỳ model online nào.

```
// MARK: - Employee
struct Employees: Decodable {
    let status: String
    let data: [EmployeeData]
}

// MARK: - EmployeeData
struct EmployeeData: Decodable {
    let id, employeeName, employeeSalary, employeeAge: String
    let profileImage: String

    enum CodingKeys: String, CodingKey {
        case id
        case employeeName = "employee_name"
        case employeeSalary = "employee_salary"
        case employeeAge = "employee_age"
        case profileImage = "profile_image"
    }
}
```

Flow ứng dụng sẽ như thế này:
1. ViewController sẽ được gọi và View sẽ có một tham chiếu tới ViewMdoel
2. View sẽ nhận một vài hành động của user và View sẽ gọi ViewModel
3. ViewModel sẽ request APIService và APIService gửi response ngược lại cho ViewModel
4. Khi chúng ta nhận được một response, ViewModel thông báo cho View thông qua binding 
5. View sẽ update UI với data

Bây giờ, chúng ta sẽ bắt đầu viết code theo trình tự. Đầu tiên ViewController sẽ được gọi và từ ViewController chúng ta gọi class ViewModel. Chúng ta không binding chúng bây giờ, việc đó để làm sau. 

![](https://images.viblo.asia/ffc8d1db-0f86-4104-9377-9db0750e8b6e.png)

# ViewModel
ViewModel là thành phần chính của mô hình này. ViewModel không biết View là gì và những gì View làm. Điều này làm cho mô hình này dễ kiểm tra hơn và loại bỏ sự phức tạp từ view. 

Trong ViewModel chúng ta sẽ gọi APIService và lấy data từ server

![](https://images.viblo.asia/c1f6bb43-5900-430d-aafa-46bb195bfee5.png)

Khi chúng ta viết code trong class ViewModel, nó sẽ cho bạn một số lỗi vì chúng ta chưa triển khai class API Service. Vì vậy bây giờ chúng ta sẽ triển khai class API Service 

# API Service
API Service là một class đơn giản, nơi mà chúng ta lấy data nhân viên sử dụng URLSession. Bạn có thể sử dụng bất kỳ networking model nào. Từ class ViewModel của chúng ta, chúng ta sẽ gọi API Service.

```
import Foundation

class APIService :  NSObject {
    
    private let sourcesURL = URL(string: "http://dummy.restapiexample.com/api/v1/employees")!
    
    func apiToGetEmployeeData(completion : @escaping (Employees) -> ()){
        URLSession.shared.dataTask(with: sourcesURL) { (data, urlResponse, error) in
            if let data = data {
                
                let jsonDecoder = JSONDecoder()
                
                let empData = try! jsonDecoder.decode(Employees.self, from: data)
                    completion(empData)
            }
        }.resume()
    }
}
```

Khi chúng ta nhận được response trong ViewModel. Bây giờ là lúc chúng ta thực hiện binding giữa ViewController và ViewModel

# MVVM Bindings
MVVM binding đóng vai trò quan trọng trong project của chúng ta. Cách chúng ta giao tiếp giữa ViewModel và ViewController rất quan trọng. Chúng ta có thể binding bằng nhiều cách.

```
import Foundation

class EmployeesViewModel : NSObject {
    
    private var apiService : APIService!
    private(set) var empData : Employees! {
        didSet {
            self.bindEmployeeViewModelToController()
        }
    }
    
    var bindEmployeeViewModelToController : (() -> ()) = {}
    
    override init() {
        super.init()
        self.apiService =  APIService()
        callFuncToGetEmpData()
    }
    
    func callFuncToGetEmpData() {
        self.apiService.apiToGetEmployeeData { (empData) in
            self.empData = empData
        }
    }
}
```

Chúng ta tạo ra một thuộc tính trong ViewModel tên là **bindEmployeeViewModelToController**

```
var bindEmployeeViewModelToController : (() -> ()) = { }
```

Thuộc tính này cần để gọi từ ViewController.

Chúng ta tạo ra những thuộc tính khác trong ViewModel tên **empData** thuộc kiểu Employees (Model) cái mà giữ lại kết quả từ APIService và thông báo cho View rằng đã có sự thay đổi.

```
private(set) var empData : Employees! {

     didSet {

          self.bindEmployeeViewModelToController()

     }

}
```

empData được set thành response nhận được từ API Service, bằng cách sử dụng thuộc tính observer, ngay khi chúng ta nhận được giá trị là response của API, didSet của empData sẽ được gọi và chúng ta đã gọi bindEmployeeViewModelToController() bên trong didSet của empData.

Khi chúng ta nhận được data từ ViewModel tới View, bây giờ là lúc chúng ta update UI

# View
Để nhận data từ ViewModel, chúng ta link thuộc tính ViewModel bên trong ViewController

```
self.employeeViewModel.bindEmployeeViewModelToController = {

     self.updateDataSource()

}
```

```
import UIKit

class ViewController: UIViewController {
    
    
    @IBOutlet weak var employeeTableView: UITableView!
    
    private var employeeViewModel : EmployeesViewModel!
    
    private var dataSource : EmployeeTableViewDataSource<EmployeeTableViewCell,EmployeeData>!
    

    override func viewDidLoad() {
        super.viewDidLoad()
        callToViewModelForUIUpdate()
    }
    
    func callToViewModelForUIUpdate(){
        
        self.employeeViewModel =  EmployeesViewModel()
        self.employeeViewModel.bindEmployeeViewModelToController = {
            self.updateDataSource()
        }
    }
    
    func updateDataSource(){
        
        self.dataSource = EmployeeTableViewDataSource(cellIdentifier: "EmployeeTableViewCell", items: self.employeeViewModel.empData.data, configureCell: { (cell, evm) in
            cell.employeeIdLabel.text = evm.id
            cell.employeeNameLabel.text = evm.employeeName
        })
        
        DispatchQueue.main.async {
            self.employeeTableView.dataSource = self.dataSource
            self.employeeTableView.reloadData()
        }
    }
    
}
```

Để cập nhật giao diện, bạn có thể viết code TableView trong ViewController, nhưng để cho ViewController bớt lộn xộn, chúng ta sẽ tách rời class EmployeeTableViewDataSource extend từ UITableViewDataSource.

```
import Foundation
import UIKit

class EmployeeTableViewDataSource<CELL : UITableViewCell,T> : NSObject, UITableViewDataSource {
    
    private var cellIdentifier : String!
    private var items : [T]!
    var configureCell : (CELL, T) -> () = {_,_ in }
    
    
    init(cellIdentifier : String, items : [T], configureCell : @escaping (CELL, T) -> ()) {
        self.cellIdentifier = cellIdentifier
        self.items =  items
        self.configureCell = configureCell
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        items.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
         let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as! CELL
        
        let item = self.items[indexPath.row]
        self.configureCell(cell, item)
        return cell
    }
}
```

Như tôi đã nói với mỗi mô hình đều có ưu và nhược điểm, nếu chúng ta có rất nhiều ưu điểm khi sử dụng MVVM thì cũng có một số nhược điểm như sau:
* Với người mới bắt đầu, MVVM rất khó để triển khai
* Những ứng dụng UI đơn giản, MVVM có thể là quá mức cần thiết, MVC là đủ
* Với những ứng dụng lớn, việc bind data sẽ phức tạp, vì vậy debug sẽ khó hơn

# Kết luận
Tại đây, chúng ta đã hoàn thành việc xây dựng một ứng dụng đơn giản sử dụng mô hình MVVM, Hi vọng điều này sẽ hữu ích. Cảm ơn các bạn

Đây là một bài viết khá hay, hữu ích và dễ hiểu mà mình đọc được trong lúc bắt đầu tìm hiểu về MVVM trong swift. Mọi người có thể tham khảo bài viết gốc tại [đây](https://medium.com/flawless-app-stories/mvvm-in-ios-swift-aa1448a66fb4) nhé