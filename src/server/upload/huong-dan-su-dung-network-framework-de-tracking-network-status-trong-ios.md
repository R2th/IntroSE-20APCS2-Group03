# I. Giới thiệu

Ở thời điểm hiện tại, rất nhiều ứng dụng iOS sử dụng mạng để gửi/nhận data tử server, tương tác với server trở thành một phần không thể thiếu của đa số ứng dụng iOS. Vì vậy, việc kiểm tra kết nối mạng là một nhu cầu cần thiết, bởi sẽ có nhiều tình huống chúng ta muốn kiểm tra mạng trước khi gửi/nhận data.

Trước iOS 12, tất cả thông tin về network có thể được lấy thông qua SCNetworkReachability API, API này đã cũ, vì vậy chúng ta sẽ phải viết code theo hơi hướng C, khó viết hơn và code không được đẹp cho lắm. Từ iOS 12, Apple đã giới thiệu Network framework, một framework hoàn toàn mới, dễ sử dụng hơn, hơi hướng ngôn ngữ Swift hiện đại. 

Trong bài viết này, tôi sẽ hướng dẫn các bạn sử dụng network framework để tracking network status, để ứng dụng có thể biết được lúc nào có mạng/không có mạng, và khi có mạng thì mạng đang dùng là wifi hay cellular

# II. Nội dung

## 1. Tạo project

Đầu tiên, chúng ta tạo project như bao project bình thường khác, đặt tên NetworkTutorial, ngôn ngữ Swift.

Tiếp theo, chúng ta vào Main.storyboard, thêm:
* 1 UITableView
* 1 UITableViewCell, đặt Identifier cho cell là TableViewCell
* 1 UIButton, đặt title cho button
* thêm layout constraint cho tableView và button

Những bước này đều là những bước rất cơ bản, nên tôi sẽ không hướng dẫn chi tiết. Sau khi làm xong các bước trên chúng ta sẽ được View Controller như trong hình dưới đây

![](https://images.viblo.asia/6bd2625a-d337-4bce-a040-0d5b5617a141.png)

Kế tiếp, chúng ta kéo tạo IBOutlet và IBAction cho tableView và button như sau:
```Swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var trackingButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }
    
    @IBAction func handleTrackingButtonClicked(_ sender: Any) {
        
    }
}
```

## 2. Tạo network tracking class

Chúng ta tạo 1 file swift mới với tên NetworkManager và nội dung như sau:

```Swift
import Foundation
// 0
import Network

class NetworkManager {
	// 1
    static let shared = NetStatus()
    // 2
    var monitor: NWPathMonitor?
    // 3
    var isMonitoring = false
    // 4
    var didStartMonitoringHandler: (() -> Void)?
    // 5
    var didStopMonitoringHandler: (() -> Void)?
    // 6
    var netStatusChangeHandler: (() -> Void)?
}
 ```
Bên trên, chúng ta lần lượt làm các bước:
* 0. Import framework Network để sử dụng các API của framework này
* 1. Khai báo singleton shared cho class
* 2. Class NWPathMonitor là một class của Network framework. Tiền tố NW là viết tắt của network. Class NWPathMonitor có nhiệm vụ observe trạng thái của network
* 3. Thêm property tracking trạng thái monitoring
* 4. 5. 6. các callback handler khi thay đổi trạng thái của network

Tiếp theo chúng ta thêm các hàm sau để bắt đầu tracking network:
```Swift
	func startMonitoring() {
		// 1
        guard !isMonitoring else { return }
        // 2
        monitor = NWPathMonitor()
		// 3
        let queue = DispatchQueue(label: “NetworkNamager”)
		// 4
        monitor?.start(queue: queue)
        //5
        monitor?.pathUpdateHandler = { _ in
            self.netStatusChangeHandler?()
        }
        // 6
        isMonitoring = true
        didStartMonitoringHandler?()
    }
```
Chúng ta lần lượt làm các bước:
* 1. Kiểm tra trạng thái hiện tại, nếu đang tracking rồi thì return
* 2. khởi tạo instance monitor
* 3. Tạo queue để thực hiện tracking network trong queue đó
* 4. Bắt đầu tracking network
* 5. Trigger callback handler netStatusChangeHandler khi network status thay đổi
* 6. Thay đổi trạng thái của flat isMonitoring, trigger callback handler cho  didStartMonitoringHandler

Để stop tracking network, chúng ta thêm code sau:
```Swift
	func stopMonitoring() {
        guard isMonitoring, let monitor = monitor else { return }
        monitor.cancel()
        self.monitor = nil
        isMonitoring = false
        didStopMonitoringHandler?()
    }
```
Đoạn code trên rất đơn giản nên tôi sẽ không giải thích gì thêm.

Thêm code sau để giải phóng memory khi class deinit:
```Swift
	deinit {
        stopMonitoring()
    }
```
## 3. Lấy các network data từ tracking manager

Bên trên chúng ta đã viết code để start/stop tracking network, bây giờ chúng ta sẽ thêm code để lấy các giá trị từ việc tracking network

### a. Trạng thái connect internet
Để biết hiện tại device có được kết nối với internet (wifi, cellular) hay không, chúng ta thêm code sau:
```Swift
	var isConnected: Bool {
        guard let monitor = monitor else { return false }
        return monitor.currentPath.status == .satisfied
    }
```
Chúng ta kiểm tra status của monitor phải thoả mãn bằng satisfied thì là có mạng. satisfied là 1 case của enum Status thuộc Network framework. Các bạn có thể tìm hiểu nhiều hơn về enum này [tại đây](https://developer.apple.com/documentation/network/nwpath/status)

### b. Các phương pháp kết nối khả dụng
Để lấy các loại kết nối khả dụng (wifi, cellular), chúng ta làm như sau:
```Swift
	var availableInterfacesTypes: [NWInterface.InterfaceType]? {
        guard let monitor = monitor else { return nil }
        return monitor.currentPath.availableInterfaces.map { $0.type }
    }
```
Network framework cung cấp cho chúng ta function availableInterfaces để lấy toàn bộ các InterfaceType. InterfaceType là enum của Network framework, gồm các case wifi, cellular, wiredEthernet,… Các bạn có thể tìm hiểu thêm về InterfaceType [tại đây](https://developer.apple.com/documentation/network/nwinterface/interfacetype)

### c. Phương pháp kết nối hiện tại

Để biết hiện tại device đang kết nối loại mạng nào (wifi hay cellular) chúng ta thêm code như sau:
```Swift
	var interfaceType: NWInterface.InterfaceType? {
        guard let monitor = monitor else { return nil }
        
        return monitor.currentPath.availableInterfaces.filter {
            monitor.currentPath.usesInterfaceType($0.type)
        }.first?.type
    }
```
Trong code trên, chúng ta lấy ra các mạng khả dụng, rồi filter mạng đang được sử dụng để có được kết quả.

### d. Kiểm tra network đang sử dụng có đắt hay không (isExpensive)

Theo tài liệu của Apple [tại đây](https://developer.apple.com/documentation/network/nwpath/2998722-isexpensive) thì việc sử dụng cellular hoặc Personal Hotspot được coi là expensive. Để kiểm tra chúng ta thêm code như sau:
```Swift
	var isExpensive: Bool {
        return monitor?.currentPath.isExpensive ?? false
    }
```
## 4. Sử dụng Network manager trong project

Dưới đây là đoạn code demo trong file ViewController.swift, sử dụng NetworkManager để tracking và lấy ra status hiện tại của mạng

```Swift
import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var tableView: UITableView!
    
    @IBOutlet weak var trackingButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // 1
        NetworkManager.shared.didStartMonitoringHandler = { [unowned self] in
            self.trackingButton.setTitle("Stop Tracking", for: .normal)
        }
        
        NetworkManager.shared.didStopMonitoringHandler = { [unowned self] in
            self.trackingButton.setTitle("Start Tracking", for: .normal)
            self.tableView.reloadData()
        }
        
        NetworkManager.shared.netStatusChangeHandler = {
            DispatchQueue.main.async { [unowned self] in
                self.tableView.reloadData()
            }
        }
        
        tableView.dataSource = self
    }
    
    
    @IBAction func handleTrackingButtonClicked(_ sender: Any) {
		// 2
        if !NetworkManager.shared.isMonitoring {
            NetworkManager.shared.startMonitoring()
        } else {
            NetworkManager.shared.stopMonitoring()
        }
    }
}

// MARK: - UITableViewDataSource
extension ViewController: UITableViewDataSource {
    func numberOfSections(in tableView: UITableView) -> Int {
        return 3
    }
    
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        if section == 1 {
			// 3
            return NetworkManager.shared.availableInterfacesTypes?.count ?? 0
        }
        
        return 1
    }
    
    
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        switch section {
        case 0:
            return "Status"
        case 1:
            return "Connection"
        case 2:
            return "Expensive?"
        default:
            return nil
        }
    }
    
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TableViewCell", for: indexPath)
        
        switch indexPath.section {
        case 0:
			// 4
            cell.textLabel?.text = NetworkManager.shared.isConnected ? "Connected" : "Not Connected"
            cell.accessoryType = NetworkManager.shared.isConnected ? .checkmark : .none
        case 1:
			// 5
            if let interfaceType = NetworkManager.shared.availableInterfacesTypes?[indexPath.row] {
                cell.textLabel?.text = "\(interfaceType)"
                // 6
                if let currentInterfaceType = NetworkManager.shared.interfaceType {
                    cell.accessoryType = (interfaceType == currentInterfaceType) ? .checkmark : .none
                }
            }
        case 2:
			// 7
            cell.textLabel?.text = NetworkManager.shared.isExpensive ? "YES" : "NO"
            cell.accessoryType = NetworkManager.shared.isExpensive ? .checkmark : .none
        default:
            break
        }
        
        return cell
    }
    
    
    func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
        return 44.0
    }
}
```
Trong đoạn code trên:
* 1. Implement callback handler cho các action start, stop và change status của NetworkManager
* 2. Implement action start/stop tracking network
* 3. Hiển thị list available network trong section 1, vì vậy chúng ta count availableInterfacesTypes
* 4. Check trạng thái hiện tại của mạng xem có mạng hay không
* 5. Hiển thị danh sách các mạng có thể kết nối
* 6. Hiển thị checkmark cho mạng đang kết nối
* 7. Hiển thị mạng đang kết nối có expensive hay không

Đến đây project của chúng ta đã hoàn thành, các bạn build chạy project trên device thật để có mạng cellular. Kết quả chúng ta sẽ được như hình sau

![](https://images.viblo.asia/ce932b36-4eb0-438d-8590-8b50d2589e5b.PNG)
# III. Kết luận

Trên đây tôi đã giới thiệu đến các bạn về Network framework và cách implement các features của framework này để tracking network trên device. Hi vọng bài viết này sẽ giúp ích được cho các bạn trong quá trình tìm hiểu và làm việc với network.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)