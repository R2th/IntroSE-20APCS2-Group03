# 1. MVVM là gì?
* MVVM ( Model - View - ViewModel) là một pattern design được sáng tạo bởi hai kỹ sư của Microsoft là Ken Cooper và Ted Peters với mục đích làm đơn giản việc lập trình sự kiện của giao diện người dùng dựa trên các tính năng đặc biệt của WPF và Silverlight.
    * **Model**: Là các đối tượng giúp truy xuất và thao tác trên dữ liệu thực sự.
    * **View**: Là phần giao diện của người dùng
    * **View Model**: Là phần chứa các logic xử lý data từ model để hiện thị lên view

![](https://images.viblo.asia/27a4c3d3-597d-4e60-b43c-7a8ea0e6c529.jpeg)


## Các ưu điểm của MVVM
1. Giúp tách biệt phần logic và UI có thể dễ dáng thay thế view mà không bị ảnh hưởng tới logic
2. Dễ dàng viết Unit tests
3. Dễ bảo trì
    
# 2. RxSwift là gì?
## 1. Rx là gì?
* Rx hay còn được gọi là ReactiveX là một thư viện giúp xử lí các tác vụ không đồng bộ, các sự kiện cơ bản bằng cách sử dụng tuần tự Observable
* ReactiveX là sự kết hợp của 3 mô hình Observer, Interator và Functional programming
 
## 2. RxSwift là gì?
* RxSwift là 1 phần của ReactiveX (thường gọi là “Rx”) được sử dụng ở rất nhiều ngôn ngữ và platform khác nhau. RxSwift là framework sử dụng cho ngôn ngữ Swift theo kỹ thuật reactive.
* RxSwift sẽ giúp công việc của bạn trở nên đơn giản hơn. Thay cho notifications, một đối tượng khó để test, ta có thể sử dụng signals. Thay cho delegates, thứ tốn rất nhiều code, ta có thể viết blocks và bỏ đi switches/ifs lồng nhau. Ta còn có thể sử dụng KVO, IBActions, filters, MVVM và nhiều tiện ích khác được hỗ trợ mượt mà trong RxSwift.
# 3. Áp dụng RxSwift với MVVM
## Input và output trong ViewModel
*   Input là cái mình nhập vào, tác động vào ( tap button, edit textfield ...)
*   Output là cái mà sẽ thay đổi dựa trên input ( như label, button ...)
    
##  Nguyên tắc áp dụng
* Bên ViewController (VC) có bao nhiêu thành phân input thi bên ViewModel (VM) khai báo bấy nhiêu Variable, hoặc publishSubject.
* VM sẽ nhận tín hiệu, data của input từ VC ( như tap button, edit textfield 
* VM sau khi nhận được tín hiệu để xử lý data đó theo requirement rồi sẽ send back data đến VC bằng cách phát ra các Observable tương ứng
* Output ở VC sẽ subcribe nhưng Observable mà VM cung cấp
## Demo
* Yêu cầu: Lấy dự liệu các trường hợp nhiễm bệnh và tử vong về dịch covid-19 trên toàn thế giới hiện lên TableView 
    *  API được cung cấp tại https://covid19api.com/
### Bắt đầu Code nào!
* **Tạo class chứa API session**:
```
import Foundation
import Alamofire
import RxSwift
import RxCocoa

class APISession {
    public static var shared = APISession()
    
    typealias response = Single<Data>
    
    func callApi() -> response {
        
        let path = "/summary"
        
        return Single.create { [weak self] single in
            let request = AF.request(URL(string: Define.Api.baseUrl + path)!, method: .get, encoding: JSONEncoding.default).validate().responseData { (response) in
                switch response.result {
                case .success(let data):
                    single(.success(data))
                case .failure(let error):
                    single(.error(error))
                }
            }
            return Disposables.create {
                request.cancel()
            }
        }
    }
}

```
* **Trong Phần Model**: Tạo 1 class CountryModel. Ở đây mình dùng Codable để decode từ JSON vào object.
```
import Foundation

// MARK: - CountryModel
struct CountryModel: Codable {
    let global: Global
    let countries: [Country]
    let date: String

    enum CodingKeys: String, CodingKey {
        case global = "Global"
        case countries = "Countries"
        case date = "Date"
    }
}

// MARK: - Country
struct Country: Codable {
    let country, countryCode, slug: String
    let newConfirmed, totalConfirmed, newDeaths, totalDeaths: Int
    let newRecovered, totalRecovered: Int
    let date: String

    enum CodingKeys: String, CodingKey {
        case country = "Country"
        case countryCode = "CountryCode"
        case slug = "Slug"
        case newConfirmed = "NewConfirmed"
        case totalConfirmed = "TotalConfirmed"
        case newDeaths = "NewDeaths"
        case totalDeaths = "TotalDeaths"
        case newRecovered = "NewRecovered"
        case totalRecovered = "TotalRecovered"
        case date = "Date"
    }
}

// MARK: - Global
struct Global: Codable {
    let newConfirmed, totalConfirmed, newDeaths, totalDeaths: Int
    let newRecovered, totalRecovered: Int

    enum CodingKeys: String, CodingKey {
        case newConfirmed = "NewConfirmed"
        case totalConfirmed = "TotalConfirmed"
        case newDeaths = "NewDeaths"
        case totalDeaths = "TotalDeaths"
        case newRecovered = "NewRecovered"
        case totalRecovered = "TotalRecovered"
    }
}

```

* **Trong Phần ViewModel**:  
```
import Foundation
import RxSwift
import RxCocoa

protocol ViewControllerViewModelInputs {
}

protocol ViewControllerViewModelOutPuts {
    var contryResponse: PublishSubject<CountryModel> { get }
    var messageError: PublishSubject<String> { get }
}

protocol ViewControllerViewModelType {
    var inputs: ViewControllerViewModelInputs { get }
    var outputs: ViewControllerViewModelOutPuts { get }
}

class ViewControllerViewModel: ViewControllerViewModelType, ViewControllerViewModelInputs, ViewControllerViewModelOutPuts {
    
    var inputs: ViewControllerViewModelInputs { return self }
    var outputs: ViewControllerViewModelOutPuts { return self }
    private var disposeBag = DisposeBag()

    //MARK: - ViewControllerViewModelInputs
    
    //MARK: - ViewControllerViewModelOutPuts
    
    var contryResponse = PublishSubject<CountryModel>()
    
    var messageError = PublishSubject<String>()
    
    func handleLogin() {
        let handleLoginObserver = APISession.shared.callApi()
        handleLoginObserver.subscribe { (response) in
            do {
                switch response {
                case .success(let data):
                    let jsonDecoder = JSONDecoder()
                    let responseModel = try jsonDecoder.decode(CountryModel.self, from: data)
                    self.contryResponse.onNext(responseModel)
                case .error(let error):
                    self.messageError.onNext("Have Error")
                }
            } catch {
                self.messageError.onNext("Have Error")
            }
        }
    }
    
}
```

**Phần tích phần View**: View mình sẽ bao gôm 1 button Load và 1 UITableView. Khi tap vào Button Load sẽ call api và lấy data response về hiện lên UITableView
* Trong View sẽ là:

```
import UIKit
import RxSwift
import RxCocoa

class ViewController: UIViewController {

    @IBOutlet weak var loadButton: UIButton!
    @IBOutlet weak var indicator: UIActivityIndicatorView!
    @IBOutlet weak var tableView: UITableView!
    var viewmodel: ViewControllerViewModelType!
    var disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        indicator.isHidden = true
        let nib = UINib(nibName: "UiTableViewCell", bundle: nil)
        tableView.register(nib, forCellReuseIdentifier: "cell")
        viewmodel = ViewControllerViewModel()
        loadButton.rx.tap
            .asDriver(onErrorDriveWith: Driver.empty())
            .drive(onNext: {[weak self] _ in
                self!.indicator.isHidden = false
                self!.indicator.startAnimating()
                self?.viewmodel.outputs.handleLogin()
            }).disposed(by: disposeBag)
        viewmodel.outputs.contryResponse.subscribe { (event) in
            Observable.of(event.element!.countries).bind(to: self.tableView.rx.items(cellIdentifier: "cell", cellType: UiTableViewCell.self)) { (row, element, cell) in
                cell.backgroundColor = .clear
                cell.statusLabel?.text = "\(element.country): \(element.newConfirmed) - Death: \(element.newDeaths)"
                self.indicator.isHidden = true
            }
            .disposed(by: self.disposeBag)
        }
        viewmodel.outputs.messageError.subscribe { (event) in
            self.showToast(message: event.element ?? "")
        }
    }
}

```