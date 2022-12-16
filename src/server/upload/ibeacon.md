# iBeacon và cơ chế hoạt động
## iBeacon?
iBeacon là một giao thức được phát triển bởi Apple và được giới thiệu từ iOS 7. iBeacon cho phép các thiết bị điện tử cầm tay sử dụng Bluetooth Low Energy ([BLE](https://en.wikipedia.org/wiki/Bluetooth_Low_Energy)) để tương tác và nhận dữ liệu từ các cảm biến không dây (thường gọi là các beacons). Hãy tưởng tượng bạn đi vào một siêu thị A nơi có đặt các beacons. Ngay lập tức iPhone của bạn sẽ nhận diện và giao tiếp với các beacons, từ đó lấy các thông tin về khuyến mại, giảm giá...và hiển thị trên iPhone. Ngoài ra các nhân viên cũng dễ dàng quản lý được từng khách hàng đang có mặt trong siêu thị. Khoảng cách truyền dữ liệu tối đa của các beacons sẽ phụ thuộc vào vị trí, vật cản trong môi trường. Các beacons tiêu chuẩn có phạm vi xấp xỉ 70m, một số beacons có thể có phạm vi lên tới 450m. Điều này giúp iBeacon trở nên rất tuyệt vời để xây dựng các ứng dụng tracking trong phạm vi hẹp, yêu cầu độ chính xác cao hơn GPS

![](https://images.viblo.asia/40f46c25-1540-4a85-b557-8ac017371c47.jpg)
## Cơ chế hoạt động
iBeacon sử dụng chế độ truyển advertising của BLE (chỉ gửi thông tin một chiều) để gửi một universally unique identifier ([UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)) kèm các byte dữ liệu tới các thiết bị tương thích. Một gói tin truyền đi phải được tuân theo các tiêu chuẩn đã được quy định trước và có độ dài là 47 byte. Các beacons có thể phát tín hiệu theo các chu kỳ từ 20ms tới 10s, chu kỳ càng dài, thời lượng pin càng lâu.

![](https://images.viblo.asia/8dda51f0-90fa-4871-9a52-40628a98e96a.png)
## Thiết bị tương thích
> * iOS devices with Bluetooth 4.0+ (iPhone 4S and later, iPad (3rd generation) and later, iPad Mini (1st generation) and later, and iPod Touch (5th generation) and later).
> * Macintosh computers with OS X Mavericks (10.9) or later and Bluetooth 4.0.
> * Android Devices with Bluetooth 4.0+ and Android OS 4.3+ (e.g. Samsung Galaxy S7/J1 mini Prime, Samsung Galaxy Note 2/3, HTC One, Google/LG Nexus 7 2013 /Nexus 4/Nexus 5, OnePlus One, LG G3).
> * Windows Phone devices with Bluetooth 4.0+ and the Lumia Cyan update or above (reports suggest support is not included with Windows Phone 8.1).
## iBeacon dùng để làm gì?
Với một mạng lưới beacons được setup một cách phù hợp, các cửa hàng, công trình xây dựng, sở thú... có thể biết được chính xác người dùng đang ở đâu. Điều này cho phép người dùng nhận được các thông tin hữu ích liên quan đến cửa hàng, mặt hàng, các giảm giá, .v.v... Công nghệ iBeacon cung cấp một giải pháp mà các hãng có thể giao tiếp với từng khách hàng một cách chính xác hơn các công nghệ hiện có. Hiện nay các nhà sản xuất đã tạo ra rất nhiều loại beacons khác nhau để ứng dụng công nghệ iBeacon, trong bài viết này sẽ sử dụng [Zeacon](https://www.zyyx.jp/service/solution/zeacon.html)

![](https://images.viblo.asia/e5b06bc1-44e8-44ba-bd95-eec0d1bee9ad.png)
# Giao tiếp với Zeacon
```
Trong bài viết này sử dụng Xcode 11 & iOS 13 để đọc và ghi dữ liệu vào Zeacon
```
## Các khái niệm
*Central* là các thiết bị nhận dữ liệu từ beacons (ở đây là iPhone). *Peripheral* là các thiết bị Blutooth sẽ phát ra tín hiệu - chính là các Zeacon. *Advertising Packets* là các gói tin mà một peripheral phát ra. Mỗi gói tin thường rất nhỏ và không thể chứa nhiều thông tin, nên để chia sẻ nhiều dữ liệu hơn, một central sẽ cần connect tới peripheral để đọc dữ liệu từ nó. Dữ liệu của một peripheral được tổ chức thành các *service* và *characteristic*. Service là một tập hợp dữ liệu và các hành vi liên quan mô tả một chức năng cụ thể của peripheral. Một Peripheral có thể có nhiều hơn một service. Characteristic cung cấp thêm các thông tin chi tiết của service. Ví dụ: Một thiết bị smart watch sẽ có các service: đo nhịp tim, theo dõi giấc ngủ, theo dõi hoạt động thể thao...Trong service theo dõi hoạt động thể thao sẽ có các characteristic: đếm bước chân, lượng calo tiêu thụ...
## Scan Zeacon
```
Note: iOS Simulator không hỗ trợ Blutooth, bạn sẽ cần build và run trên một thiết bị thật
```

Import **Core Bluetooth** framework trong **MainViewController.swift**. Bạn sẽ cần khởi tạo 1 CBCentralManager giao tiếp với các peripheral
```swift
import CoreBluetooth

class MainViewController: UIViewController {
    
    var centralManager: CBCentralManager!
    
    override func viewDidLoad() {
        centralManager = CBCentralManager(delegate: self, queue: nil)
    }
}
```
Hầu hết các công việc trong **Core Bluetooth** framework được thực hiện thông qua các delegate. Với central là **CBCentralManagerDelegate** và peripheral là **CBPeripheralDelegate**.
```swift
extension MainViewController: CBCentralManagerDelegate, CBPeripheralDelegate {

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        switch central.state {
            case .unknown:
                print("unknown")
            case .resetting:
                print("resetting")
            case .unsupported:
                print("unsupported")
            case .unauthorized:
                print("unauthorized")
            case .poweredOff:
                print("poweredOff")
            case .poweredOn:
                print("poweredOn")
                centralManager.scanForPeripherals(withServices: nil)
            default: break
        }
    }
    
}
```
Function **centralManagerDidUpdateState( _ : )** sẽ kiểm tra trạng thái bluetooth trước khi bắt đầu scan. Nếu bluetooth bị tắt, hãy bật lại để chắc chắn trạng thái đang là **.poweredOn**. Kết quả sau khi scan sẽ được trả về trong function **didDiscover**
```swift
func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
    print(peripheral)
}
```
```swift
<CBPeripheral: 0x28151c460, identifier = 2C645D6A-35F4-EFA1-584C-1C5750FA5F2C, name = VR-3200-4C1DB4, state = disconnected>
<CBPeripheral: 0x2815001e0, identifier = 7BF9C418-C912-A95A-9C4D-F3A5DDA9D74D, name = VR-3200-4C2A39, state = disconnected>
<CBPeripheral: 0x2815001e0, identifier = C1A1A8C2-1226-7AC0-BF0C-F78898D44150, name = (null), state = disconnected>
```
Rất nhiều peripheral được tìm thấy, một trong số chúng với format name = VR-320*-****** là các Zeacon.
```swift
func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
        guard let name = peripheral.name else {
            return
        }
        if name.match(regex: "^VR-320.+") {
            arrPeripheral.append(peripheral)
        }
    }
```
Bind các giá trị trong **arrPeripheral** vào 1 **UITableView** và hiển thị chúng lên màn hình. Thực hiện connect khi tap vào cell bất kỳ.
```swift
peripheral.delegate = self
centralManager.connect(peripheral, options: nil)
```
Kết quả sau khi thực hiện connect sẽ trả về trong function **didConnect**. Tại đây thực hiện **discoverServices** để tìm các service mà peripheral có
```swift
func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
    peripheral.discoverServices(nil)
}
```
Các service được tìm thấy sẽ được trả về trong function **didDiscoverServices**. Tại đây thực hiện **discoverCharacteristics** để tìm các characteristic tương ứng với mỗi service
```swift
func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
    peripheral.services?.forEach({ (service) in
        print(service)
        peripheral.discoverCharacteristics(nil, for: service)
    })
 }
```
```
<CBService: 0x2839a6640, isPrimary = YES, UUID = 1803>
<CBService: 0x2839a65c0, isPrimary = YES, UUID = 1802>
<CBService: 0x2839a66c0, isPrimary = YES, UUID = Battery>
<CBService: 0x2839a6740, isPrimary = YES, UUID = Device Information>
<CBService: 0x2839a6780, isPrimary = YES, UUID = 5405DB60-38BA-11E4-8928-0002A5D5C51B>
<CBService: 0x2839a6700, isPrimary = YES, UUID = 00001016-D102-11E1-9B23-00025B00A5A5>
```
Các characteristic được tìm thấy sẽ được trả về trong fuction **didDiscoverCharacteristicsFor**. Tại đây sẽ bắt đầu phân tích để lấy về các thông tin mà peripheral gửi đi. Characteristic sẽ chứa một thuộc tính **CBCharacteristicProperties** (.read or .notify) quy định các lấy dữ liệu tương ứng:
```swift
// .read
peripheral.readValue(for: characteristic)
```
```swift
// .notify
peripheral.setNotifyValue(true, for: characteristic)
```
Các giá trị lấy được từ peripheral sẽ trả về trong function **didUpdateValueFor**. Tại đây thực hiện lưu các giá trị và hiển thị lên UI
```
func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
// update UI
}
```

Trên đây là giới thiệu sơ qua về iBeacon. Trong tương lai có thể sẽ có rất nhiều các ứng dụng sử dụng iBeacon đặc biệt trong lĩnh vực IoT.