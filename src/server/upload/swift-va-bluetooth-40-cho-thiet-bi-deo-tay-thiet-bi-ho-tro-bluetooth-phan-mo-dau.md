Bài viết này sẽ hướng dẫn bạn kết nối với một thiết bị iOS (iPhone / iPad / iPod) có Bluetooth 4.0  và bảng phát triển DFRobot Bluno Beetle, như được hiển thị bên dưới:
![](https://images.viblo.asia/05c5af15-9720-456e-8199-148a7e6ba223.png)
Bảng "development board "này thực sự là một Bảng mạch Arduino với IC Bluetooth 4.0 (TI CC2540). IC Bluetooth đọc và ghi dữ liệu vào Atmega328p (Arduino Core) thông qua UART. IC Bluetooth cũng thực hiện chức năng của USB-UART trong bo mạch, có nghĩa là IC này cũng có thể sử dụng bàn điều khiển nối tiếp Arduino Ide tựa để gửi / nhận dữ liệu đến Trung tâm Bluetooth 4.0,  1 "Serial-BLE Adapter".

Bắt tay vào làm nào!!!

Trước tiên, chúng ta sẽ tạo dự án riêng cho demo này . Tạo một dự án mới trong XCode và chọn Single Application, chúng ta sẽ sử dụng Swift . Khi dự án được tạo, chúng ta cần đảm bảo rằng dự án bao gồm CoreBluetooth Framework vì đó là những gì chúng ta sẽ sử dụng để kết nối với thiết bị. Vì vậy, hãy truy cập vào  ‘Build Phases’  trong project settings để đảm bảo CoreBluetooth.framework được thêm vào trong ‘Link Binary with Libraries’.
![](https://images.viblo.asia/6b91db90-9af2-4bb0-ab08-c09f930d55b0.png)
Trong dự án , bạn nên có file ViewController.swift, chúng ta cần đổi tên file này thành MainViewController.swift và bên trong file này, thay đổi tên từ ViewController thành MainViewController. Chúng ta cũng cần thêm một file khác, vì vậy hãy tiếp tục và nhấp vào File -> New -> File (hoặc CMD + N) và chọn ‘‘Swift File". Đặt cho file mới này là ‘ScanTableViewControll.swift.

Tiếp theo là cấu hình storyboard,  Chúng sẽ gồm Navigation Controller với Rootview là MainViewController . Định nghĩa Segue giữa 2 view MainViewContronller và ScanTableViewController sẽ là "scan-segue". 
![](https://images.viblo.asia/5a692ef0-a5cb-48f1-b688-83b20a112572.png)
Tại MainViewController chúng ta sẽ import UIKit và CoreBluetooth phúc vụ cho việc scan các thiết bị đang bật bluetooth và ngắt kết nối với chúng.
```
import UIKit
import CoreBluetooth
class MainViewController: UIViewController, CBCentralManagerDelegate, CBPeripheralDelegate {
    var manager:CBCentralManager? = nil
    var mainPeripheral:CBPeripheral? = nil
    var mainCharacteristic:CBCharacteristic? = nil
    
    let BLEService = "DFB0"
    let BLECharacteristic = "DFB1"
    
    @IBOutlet weak var recievedMessageText: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        manager = CBCentralManager(delegate: self, queue: nil);
        
        customiseNavigationBar()
    }
    
    func customiseNavigationBar () {
        
        self.navigationItem.rightBarButtonItem = nil
        
        let rightButton = UIButton()
        
        if (mainPeripheral == nil) {
            rightButton.setTitle("Scan", for: [])
            rightButton.setTitleColor(UIColor.blue(), for: [])
            rightButton.frame = CGRect(origin: CGPoint(x: 0,y :0), size: CGSize(width: 60, height: 30))
            rightButton.addTarget(self, action: #selector(self.scanButtonPressed), for: .touchUpInside)
        } else {
            rightButton.setTitle("Disconnect", for: [])
            rightButton.setTitleColor(UIColor.blue(), for: [])
            rightButton.frame = CGRect(origin: CGPoint(x: 0,y :0), size: CGSize(width: 100, height: 30))
            rightButton.addTarget(self, action: #selector(self.disconnectButtonPressed), for: .touchUpInside)
        }
        
        let rightBarButton = UIBarButtonItem()
        rightBarButton.customView = rightButton
        self.navigationItem.rightBarButtonItem = rightBarButton
        
    }
    
       // MARK: Button Methods
    func scanButtonPressed() {
        performSegue(withIdentifier: "scan-segue", sender: nil)
    }
    
    func disconnectButtonPressed() {
        //this will call didDisconnectPeripheral, but if any other apps are using the device it will not immediately disconnect
        manager?.cancelPeripheralConnection(mainPeripheral!)
    }
```
Trong đoạn mã trên, bạn sẽ nhận thấy rằng các nút mà chúng ta thêm vào thanh điều hướng gọi scanButtonPression () hoặc disconnectButtonPression (). Function đầu tiên, scanButtonPression chỉ đơn giản là kích hoạt ‘scan-segue’ segue đưa người dùng đến ScanTableView. Phương thức disconnectButtonPression () sẽ chỉ gọi cancelPeripheralConnection () trên CBCentralManager với mainPerextal được truyền cho nó. Điều này sẽ dẫn đến việc thiết bị Bluetooth bị ngắt kết nối.
Chúng ta cũng cần ghi đè chuẩn bị cho segue để chúng tôi có thể thực hiện một số thiết lập trước khi chúng ta đi đến ScanTableView. Đầu tiên, chúng ta kiểm tra xem chúng có đang chạy trong đúng segue không( tránh crash ), sau đó chúng ta nhận được một tham chiếu đến ScanTableViewController. Cuối cùng, chúng ta sẽ đặt delegate của CBCentralManuber vào controller mới để lấy được thông tin mà chúng ta đã lấy được từ  ScanTableViewController ( delegate partern )
```
override func prepare(for segue: UIStoryboardSegue, sender: AnyObject?) {
        
        if (segue.identifier == "scan-segue") {
            let scanController : ScanTableViewController = segue.destinationViewController as! ScanTableViewController
            
            //set the manager's delegate to the scan view so it can call relevant connection methods
            manager?.delegate = scanController
            scanController.manager = manager
            scanController.parentView = self
        }
        
    }
```
Mở file ScanTableViewController, chúng ta cũng cần import CoreBluetooth tại đây và vì view này có TableView trong đó, chúng ta kế thừa UITableViewContronller cũng như CBCentralManagerDelegate. Khởi tạo 1 một mảng để giữ các thiết bị ngoại vi được quét, một optional cho CBCentralManager được truyền từ MainViewController và một optional cho chính MainViewController.
Tiếp theo, chúng ta có thể để viewDidLoad () như bên dưới nhưng dưới đây chúng ta cần xác định một số phương thức để tuân thủ protocal của TableView; đầu tiên là phương thức numberOfSections trong đó chúng ta chỉ cần trả về 1 vì chúng ta chỉ có một phần. Phương thức thứ hai là phương thức numberOfRowsInSection trong đó chúng ta cần trả về số lượng thiết bị Bluetooth trong mảng thiết bị Bluetooth. Cuối cùng, chúng ta xác định cellForRowAt nơi chúng ta sẽ định cấu hình các Cell, ở đây chúng ta sử dụng mã định danh cho Cell mà chúng ta đã xác định trong bảng Storyboard  "scanTableCell" và chúng ta đặt thuộc tính văn bản của Cell thành tên thiết bị Bluetooth.
```
import UIKit
import CoreBluetooth
class ScanTableViewController: UITableViewController, CBCentralManagerDelegate {
    
    var peripherals:[CBPeripheral] = []
    var manager:CBCentralManager? = nil
    var parentView:MainViewController? = nil
    
    override func viewDidLoad() {
        super.viewDidLoad()    
    }
    
    // MARK: - Table view data source
    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return peripherals.count
    }
    
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "scanTableCell", for: indexPath)
        let peripheral = peripherals[indexPath.row]
        cell.textLabel?.text = peripheral.name
        
        return cell
    }
```

Cuối cùng chúng ta cần CoreBluetooth gọi scan device để lấy danh sách thiết bị. 
```
override func viewDidAppear(_ animated: Bool) {
        scanBLEDevices()
    }
    // MARK: BLE Scanning
    func scanBLEDevices() {
        manager?.scanForPeripherals(withServices: [CBUUID.init(string: parentView!.BLEService)], options: nil)
        
        //stop scanning after 3 seconds
        DispatchQueue.main.after(when: .now() + 3.0) {
			self.stopScanForBLEDevices()
        }
    }
    
    func stopScanForBLEDevices() {
        manager?.stopScan()
    }
```
Và dừng Scan sau 3 giây. Và đây là kết quả.
![](https://images.viblo.asia/e7330aba-b05e-4725-ac80-d3f5ee69b16b.jpeg)
Mình xin kết thúc phần này tại đây, phần tiếp theo mình sẽ thực hiện việc kết nối 1 thiết bị, thực hiện các thao tác gửi và nhận dữ liệu.
nguồn: https://medium.com/@rickredsix/getting-started-with-ios-swift-and-bluetooth-4-0-for-wearables-hardware-4661b1992bca