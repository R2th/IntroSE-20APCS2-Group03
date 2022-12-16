Chào các bạn, lần trước mình đã giới thiệu về việc kết nối 1 thiết bị bluetooth sử dụng coreblue. Bài post này mình sẽ giới thiệu các bạn về cách giao tiếp với thiết bị và nghiên cứu CBCentralManagerDelegate protocal.

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

Bài trước chúng ta đã đến đây, cùng tìm hiểu dòng code trên làm gì nào !!!

Chúng ta có 2 hàm scan và stop scan để bảo thằng CBCentralManager? thực hiện lệnh tìm tất cả thiết bị bluetooth xung quanh(dĩ nhiên là đang để chế độ ON bluetooth) và sau 3 giây sẽ tự động dừng tìm kiếm.
```
 manager?.scanForPeripherals(withServices: [CBUUID.init(string: parentView!.BLEService)], options: nil)
```
Hàm này để chỉ rõ chúng ta chỉ lấy những thiết bị DFRobot Bluno mà chúng ta đã định nghĩa ở MainViewController (DFB0). bạn có thể tìm tất cả các thiệt bị bằng cách dùng 
```
manager?.scanForPeripherals(withServices: nil)
```

Tiếp tục chúng ta cần xác định định nghĩa các method trong CBCentralManagerDelegate protocal. Method didDiscover dùng để thêm các thiết bị tìm thấy vào mảng thiết bị bluetooth chúng ta tìm được. Method CentralManagerDidUpdateState dùng để lấy trạng thái của thiết bị(On/Off).
Method didConnect để thông bao chúng ta đã kết nối với thiết bị thành công, và cuối cùng method didFailToConnect để thông báo lỗi kết nối.
```
    // MARK: - CBCentralManagerDelegate Methods
    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : AnyObject], rssi RSSI: NSNumber) {
        
        if(!peripherals.contains(peripheral)) {
            peripherals.append(peripheral)
        }
        
        self.tableView.reloadData()
    }
    
    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        print(central.state)
    }
    
    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        
        //pass reference to connected peripheral to parent view
        parentView?.mainPeripheral = peripheral
        peripheral.delegate = parentView
        peripheral.discoverServices(nil)
        
        //set the manager's delegate view to parent so it can call relevant disconnect methods
        manager?.delegate = parentView
        parentView?.customiseNavigationBar()
        
        if let navController = self.navigationController {
            navController.popViewController(animated: true)
        }
        
        print("Connected to " +  peripheral.name!)
    }
    
    func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: NSError?) {
        print(error)
    }
``` 

Mảng peripherals sẽ được show ra trong tableview của chúng ta và khi click vào 1 cell trong tableview chúng ta sẽ connect tới thiết bị đó.
```
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        let peripheral = peripherals[indexPath.row]
        
        manager?.connect(peripheral, options: nil)
    }
```

Chúng ta đã tìm hiểu qua CBCentralManagerDelegate protocal, và có thể lấy được thông tin thiết bị, handle lỗi connect trong hàm didFailToConnect, và thực hiện gán gán deletegate cho CBPeripheral trong hàm didConnect. và 
```
    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {\
    }
```
để thông báo khi ta disconnect. 
Mình xin kết thúc tại đây phần tiếp theo mình sẽ giới thiệu các bạn về CBPeripheralDelegate để truyền dữ liệu vào bluetooth và lấy data từ nó. 
phần 1: https://viblo.asia/p/swift-va-bluetooth-40-cho-thiet-bi-deo-tay-thiet-bi-ho-tro-bluetooth-phan-mo-dau-L4x5xGRglBM
Nguồn: https://medium.com/@rickredsix/getting-started-with-ios-swift-and-bluetooth-4-0-for-wearables-hardware-4661b1992bca