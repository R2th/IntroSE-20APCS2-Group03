# NWPathMonitor
Với iOS 12, Apple giới thiệu tới các nhà phát triển ứng dụng một framework mới có tên Network framework, mà trong đó NWPathMonitor là một sự thay thế hoàn hảo cho Reachability.

Nếu là một lập trình viên iOS chắc hẳn bạn không còn lạ lẫm với [Reachability](https://developer.apple.com/library/archive/samplecode/Reachability/Introduction/Intro.html), một trong những sample code kinh điển mà hầu hết chúng ta đều sử dụng trong ứng dụng có kết nối Internet của mình. Ngoài ra, nếu thử tìm kiếm trên trang Cocoapods.org với từ khóa Reachability thì cũng có thể tìm thấy không ít các thư viện tương tự được viết lại với đủ các tùy chọn như ARC support hay Swift support.

Trong sự kiện WWDC tháng 6 năm 2018, một framework mới có tên [Network framework](https://developer.apple.com/videos/play/wwdc2018/715/) được giới thiệu dành cho iOS 12 trở đi. Một đối tượng có tên [NWPathMonitor](https://developer.apple.com/documentation/network/nwpathmonitor)  nằm trong framework này đem đến cho chúng ta một cách chính thống để xác định trạng thái kết nối mạng thay vì phải dùng thư viện của bên thư ba như từ trước tới nay.

# Sử dụng

Để sử dụng NWPathMonitor chúng ta chỉ cần import Network và sau đó tạo một đối tượng của NWPathMonitor như sau:

```swift
let monitor = NWPathMonitor()
```

Nếu chỉ quan tâm đến những thay đổi của một network adapter cụ thể ví dụ như WWifi chẳng hạn, chúng ta có thể khởi tạo bằng phương thức [init(requiredInterfaceType:)](https://developer.apple.com/documentation/network/nwpathmonitor/2998734-init) với tham số truyền vào là một kiểu dữ liệu [NWInterface.InterfaceType](https://developer.apple.com/documentation/network/nwinterface/interfacetype) như sau:

```swift
let monitor = NWPathMonitor(requiredInterfaceType: .wifi)
```

Một số Interface Type mà NWPathMonitor có thể theo dõi được bao gồm:
* `cellular`
* `loopback`
* `other` (Dùng cho virtual hoặc chưa xác định network type)
* `wifi`
* `wiredEthernet`

Để nhận được các thay đổi về network state, chúng ta chỉ cần gán callback cho một thuộc tính có tên `pathUpdateHandler`, callback này sẽ được gọi đến bất cứ khi nào có sự thay đổi đối với network, ví dụ như khi điện thoại chuyển từ sử dụng cellular sang wifi. Trong callback có một giá trị trả về có kiểu NWPath giúp chúng ta có thể dễ dàng xác định được trạng thái đã connectd hay chưa:

```swift
monitor.pathUpdateHandler = { path in
    if path.status == .satisfied {
        print("Connected")
    }
}
```

Việc chúng ta khởi tạo NWPathMonitor() không có tham số truyền vào hoặc truyền vào tham số InterfaceType sẽ ảnh hưởng đến việc thuộc tính `status` của đối tượng `NWPath` có phải `satisfied` hay `unsatisfied`.  

Ví dụ: Khi ta khởi tạo monitor với tham số truyền vào là cellular, nhưng trạng thái của network lại thay đổi thành wifi (khi điện thoại được kết nối đến wifi), thì callback của  `pathUpdateHandler` sẽ không được gọi đến và `status` của NWPath sẽ là `unsatisfied`.  Chúng ta có thể kiểm tra giá trị này bất cứ lúc nào thông qua thuộc tính `currentPath` của `NWPathMonitor`. 

Vì vậy, nếu chỉ muốn biết liệu device có đang được kết nối Internet hay không, bất kể đó là kết nối Wifi hay Cellular thì tốt nhất là khởi tạo `NWPathMonitor` bằng phương thức không có tham số truyền vào.

Đối tượng `NWPath` có các thuộc tính mà qua đó chúng ta thể dùng để xác định khá nhiều trạng thái của network. Một trong số đó là một thuộc tính khá thú vị mang tên `isExpensive` dùng để xác định xem network hiện tại có được coi là đắt tiền hay không. Chúng ta cũng có thể kiểm tra xem có hỗ trợ DNS, IPv4 hoặc IPv6 hay không. 
Ngoài ra nếu muốn xem network trước khi bị thay đổi sang network hiện tại là gì chúng ta có thể sử dụng thuộc tính `usedInterfaceType`.

```swift
let isCellular: Bool = path.usesInterfaceType(.cellular)
```

Sử dụng `NWPathMonitor` có một điểm khá tương đồng với cách sử dụng [CLLocationManager](https://developer.apple.com/documentation/corelocation/cllocationmanager) ở chỗ chúng ta cần gọi phương thức `start` để bắt đầu lắng nghe các update và gọi phương thức `stop` khi kết thúc lắng nghe.

```markdown
let queue = DispatchQueue.global(qos: .background)
monitor.start(queue: queue) 
```

Khi đã hoàn tất quá trình lắng nghe sự thay đổi, chúng ta chỉ cần đơn giản gọi phương thức `cancel()`. Lưu ý rằng một khi đã gọi phương thức `cancel()` chúng ta không thể gọi phương thức` start()` được nữa. Thay vào đó chúng ta cần khởi tạo một biến NWPathMonitor mới.

Lưu ý tiếp theo đó là là thuộc tính `currentPath` của `NWPathMonitor` sẽ là `nil` nếu ta truy cập đến nó trước khi phương thức `start` được gọi đến. Trên thực tế nếu chúng ta print biến path được trả về trong callback sau:

```swift
monitor.pathUpdateHandler = { path in
    print(path)
}
```

Thì kết quả sẽ như sau:

```rust
Optional(satisfied (Path is satisfied), interface: en0, scoped, ipv4, ipv6, dns)
```

Điều này cho thấy giá trị NWPath trả về có kiểu `Optional` mặc dù trong API lại chỉ định nó là `non Optional`, suy ra giá trị NWPath trả về là một con trỏ kiểu Objective-C được bridged sang Swift.

# Vấn đề với Captive Portals

Chắc hẳn chúng ta không còn xa lạ với Wifi công cộng trên hồ Gươm, trong bệnh viện, trung tâm thương mại, vv.. thì Captive Portals là một trang web được hiện ra khi chúng ta kết nối đến một Wifi có dạng như vậy, để yêu cầu người dùng phải đăng nhập, hay làm một thao tác gì đó trước khi có thể thực sự  kết nối đến Internet. 

Điều này có thể dẫn đến việc khi điện thoại đang được kết nối đến Wifi dạng này, thì ứng dụng sẽ hoạt động không chính xác thậm chí bi crash - do ứng dụng đang mong muốn trả về JSON từ REST API nhưng thực tế lại nhận được chuỗi HTML từ Captive Portals.

Vậy liệu NWPathMonitor có điểm mạnh nào hơn so với Reachability trong việc kiểm tra tình trạng kết nối Internet hay không?

Enum `NWPath.Status` cung cấp ba trường hợp `satisfied`, `unsatisfied`, và `requiresConnection`. 

Thật không may trong khi tài liệu dành cho developer thì không cho biết các sử dụng của từng trường hợp này, còn nhìn vào framework cũ có tên NetworkExtension, đối tượng NWPathStatus lại còn có thêm một giá trị [`satisfiable`](https://developer.apple.com/documentation/networkextension/nwpathstatus/satisfiable):
| The path is not currently satisfied, but may become satisfied upon a connection attempt. This can be due to a service, such as a VPN or a cellular data connection not being activated.|
| -------- | 

Có thể giá trị `satisfiable` này tương tự với giá trị `requiresConnection` của Enum `NWPath.Status`.

Nhưng may mắn là NWPathMonitor thường chỉ trả về tình trạng mạng là `satisfiable` sau khi người dùng đã thao tác với Captive Portals, nghĩa là sau khi web page được hiển thị và người dùng đã nhấn vào nút xác nhận để kết nối Internet.

Trường hợp không có Captive Portals nào được hiển thị thì sẽ có một Action Sheet hiện ra để người dùng chọn một trong hai lựa chọn: *"Sử dụng mà không có Internet"* hoặc *"Sử dụng một mạng khác"*. 

Nếu người dùng chọn *"Sử dụng mà không có Internet"* thì trạng thái của NWPath mà NWPathMonitor trả về sẽ là `satisfied` cho dù không có kết nối Internet.

![](https://images.viblo.asia/447c448b-3555-4348-b156-5af45733e967.jpeg)

# Tổng kết
Vậy là chúng ta đã vừa nhìn qua về NWPathMonitor, một đối tượng nằm trong Network framework được giới thiệu cùng với iOS 12. Sau đây là một số điểm mạnh và điểm yếu:

### Điểm mạnh

* Được hỗ trợ và phát hành chính chủ Apple
* Không cần phải import code của bên thứ ba như trước đây, chỉ cần `import Network.framework` trên iOS 12
* Trả về status của NWPath là `satisfied` sau khi người dùng kết nối với captive portal.

### Điểm yếu

* Chỉ hỗ trợ iOS 12 trở đi, có nghĩa là với những iOS thấp hơn chúng ta vẫn phải sử dụng các phương thức cũ.
* Tài liệu chưa đầy đủ, có thể xem ở đây để biết thêm chi tiết https://developer.apple.com/documentation/network/nwpathmonitor
* Không thể xác định được khi người dùng kết nối đến captive portal.