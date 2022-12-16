Core Bluetooth framework đã cung cấp rất nhiều khả năng để điều khiển các hoạt động bluetooth ở phía central, phần còn lại của vấn đề là do cách ta thực hiện. Ứng dụng có quyền lợi và nghĩa vụ phải thực thi các hoạt động với vai trò central như tìm kiếm và kết nối các thiết bị, khai phá và tương tác với dữ liệu của remote peripheral. Bài hôm nay cung cấp guideline và các best practice để làm mấy cái việc này sao cho đúng, đặc biệt là khi ta phát triển ứng dụng cho iOS, cái chợ của nó có tỉ lệ reject rất cao.

# Chú ý tới cách ta sử dụng sóng điện từ và điện năng tiêu thụ

Khi phát triển ứng dụng tương tác qua Bluetooth, ta cần phải nhớ rằng Bluetooth tương tác giữa các thiết bị sử dụng sóng điện từ để truyền dẫn các tín hiệu qua không khí. Vì tất cả các thể loại kết nối không dây đều cần sử dụng sóng điện từ, chưa kể đến việc còn các ứng dụng khác sử dụng bluetooth, nên ta cần phải xử lý sao cho app của ta sử dụng ít nhất có thể.
Tối thiểu hóa việc sử dụng sóng điện từ đặc biệt quan trọng khi phát triển ứng dụng cho iOS, bởi vì sóng điện từ sẽ làm hao pin. Nhớ các guideline sau đây sẽ giúp app thực thi tốt hơn và đỡ tốn pin nhất.


## Chỉ scan thiết bị khi cần đến

Khi ta gọi `scanForPeripherals(withServices:options:)` của `CBCentralManager` để tìm kiếm các thiết bị remote peripheral, thiết bị central của ta sẽ sử dụng sóng điện từ để lắng nghe cho tới khi ta chỉ định nó dừng lại.
Vì thế nên hãy dừng việc tìm kiếm ngay sau khi tìm được thiết bị cần thiết. Sử dụng `stopScan()` của `CBCentralManager`.

## Bật CBCentralManagerScanOptionAllowDuplicatesKey chỉ khi nào cần thiết

Các thiết bị remote peripheral có thể gửi ra nhiều gói tin advertising mỗi giây. Khi ta quét các thiết bị sử dụng `scanForPeripherals(withServices:options:)`, mặc định hàm này sẽ hợp nhất nhiều gói tin advertising tìm thấy được của một peripheral vào thành một discover event duy nhất. Ta có thể thay đổi việc thực thi mặc định này bằng việc cung cấp `CBCentralManagerScanOptionAllowDuplicatesKey` scan option khi gọi hàm. 
Khi làm thế, bất cứ khi nào central nhận được một gói tin từ peripheral thì sẽ sinh ra một discovery event, dù lặp hay không. Việc cho phép các gói tin lặp lại như thế này sẽ có ích trong một số trường hợp nhất định, ví dụ như việc khởi tạo kết nối tới peripheral cần dựa trên khoảng cách giữa hai thiết bị (đo bằng giá trị RSSI của gói tin nhận được). Tuy nhiên ta phải lưu ý rằng sẽ ảnh hướng tới pin và hiệu năng app. Chỉ bật option này lên khi thật cần thiết cho những trường hợp cụ thể.

## Khai phá dữ liệu của peripheral một cách khôn ngoan

Một peripheral có thể cung cấp rất nhiều service và characteristic. Ta chỉ nên tìm kiếm những service và characteristic nào app thực sự cần vì việc discover tất cả service và characteristic sẽ gây ảnh hưởng xấu đến tuổi thọ pin và hiệu năng app.

Ví dụ, giả sử rằng ta đang kết nối tới một thiết bị có rất nhiều service, nhưng app của ta chỉ cần 2 trong số các service đó. Ta có thể tìm kiếm và discover chỉ 2 service này thôi bằng việc truyền vào các UUID của các service đó vào hàm `discoverServices(_:)` của `CBPeripheral`, ví dụ như sau:
```
peripheral.discoverServices([firstServiceUUID, secondServiceUUID])
```
Sau khi tìm được service cần thiết, ta làm tương tự cho characteristic, chỉ lấy các characteristic cần thiết bằng việc truyền UUID vào hàm `discoverCharacteristics(_:for:)` của `CBPeripheral`.

## Chỉ subscribe các characteristic thường xuyên thay đổi giá trị

Như mô tả trong chapter 2, có hai cách để ta có thể nhận được giá trị của một characteristic:
- Lấy trực tiếp giá trị của characteristic bằng việc gọi hàm `readValue(for:)` mỗi khi cần.
- Hoặc subscribe giá trị bằng việc gọi `setNotifyValue(_:for:)` để nhận notification khi giá trị characteristic thay đổi.

Best practise là hãy chỉ subscribe những characteristic với những giá trị thay đổi thường xuyên. Tác dụng nói chung vẫn chỉ là để tránh việc hao tổn sóng điện từ gây kém tuổi thọ pin.

## Ngắt kết nối các thiết bị mà ta đã lấy đủ dữ liệu cần thiết

Ta có thể giảm thiểu việc sử dụng sóng điện từ bằng việc ngắt kết nối với các peripheral khi kết nối đã không còn cần thiết. Ta nên ngắt kết nối với peripheral trong 2 trường hợp sau:
- Tất cả các characteristic mà ta subscribe đã ngừng gửi notification. (Ta có thể check bằng việc kiểm tra thuộc tính `isNotifying` của characteristic.
- Ta đã có đủ dữ liệu cần thiết từ peripheral.
Trong cả hai trường hợp, ta cần hủy bất kì subscription nào đang có trước khi ngắt kết nối với peripheral. Ta có thể hủy bằng việc gọi hàm `setNotifyValue(_:for:)`, chỉ định tham số đầu tiên là `false`. Ta ngắt kết nối với peripheral bằng việc gọi hàm `cancelPeripheralConnection(_:)` trong `CBCentralManager`, như sau:
```
myCentralManager.cancelPeripheralConnection(peripheral)
```
> **Chú ý**: hàm `cancelPeripheralConnection(_:)` là non-blocking, và các lệnh của `CBPeripheral` mà còn đang chờ thực thi có thể dừng hoặc chưa dừng. Bởi vì các app khác có thể vẫn còn kết nối với peripheral, việc ta hủy bỏ kết nối này không đảm bảo rằng liên kết vật lý ngay lập tức sẽ ngắt. Về khía cạnh app, ta xem như là peripheral đã được ngắt kết nối, và central manager object khi đó sẽ gọi hàm `centralManager(_:didDisconnectPeripheral:error:)` từ delegate của nó.

# Việc kết nối lại với peripheral

Sử dụng CoreBluetooth framework, có ba cách để ta có thể kết nối lại với peripheral:
- Nhận về danh sách các peripheral đã biết (các peripheral đã từng kết nối tới trong quá khứ) sử dụng hàm `retrievePeripherals(withIdentifiers:)`. Nếu peripheral ta đang cần có trong danh sách, ta thử bật kết nối với nó.
- Nhận về danh sách các thiết bị hiện tại đang kết nối với hệ thống sử dụng hàm `retrieveConnectedPeripherals(withServices:)`. Nếu peripheral ta đang cần có trong danh sách, ta bật kết nối với nó.
- Quét các peripheral sử dụng `scanForPeripherals(withServices:options:)`. Nếu tìm thấy thì kết nối với nó.

Dựa trên các trường hợp khác nhau, ta có thể ko muốn rằng cứ phải quét lại peripheral mỗi lần ta muốn kết nối với nó. Thay vào đó, ta có thể sẽ muốn kết nối lại sử dụng các cách khác trước. Hình dưới đây thể hiện workflow sử dụng lần lượt 3 cách trên khi ta muốn kết nối lại với peripheral.

[Figure 5-1  A sample reconnection workflow](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/CoreBluetooth_concepts/Art/ReconnectingToAPeripheral_2x.png)

> Chú ý: Số lượng cách kết nối lại mà ta quyết định thử, và thứ tự mà ta thực hiện có thể thay đổi dựa trên các trường hợp mà app đang cố gắng hoàn thành. Ví dụ ta có thể hoàn toàn không sử dụng cách thứ nhất, hoặc có thể dùng hai cách đầu tiên.

## Nhận về danh sách các peripheral đã biết
Vào lần đầu tiên ta discover một peripheral, hệ thống sẽ sinh ra một UUID để định danh peripheral đó. Sau khi có UUID, ta có thể lưu lại (dùng NSUserDefaults chẳng hạn), và sau đó sử dụng để kết nối lại với peripheral đó bằng việc truyền UUID vào hàm `retrievePeripherals(withIdentifiers:)` của `CBCentralManager`. Ví dụ dưới đây mô tả cách sử dụng phương thức này để kết nối lại với peripheral ta đã từng kết nối.

Khi app chạy, gọi `retrievePeripherals(withIdentifiers:)`, truyền vào một mảng bao gồm các UUID của peripheral mà ta đã từng discover và từng kết nối tới, như sau:
```
knownPeripherals = myCentralManager.retrievePeripherals(withIdentifiers: savedIdentifiers)
```
Central manager sẽ thử kết hợp các UUID mà ta cung cấp với các UUID trước đây và trả về kết quả là một mảng của `CBPeripheral`. Nếu không tìm thấy cái nào, mảng sẽ rỗng và ta nên thử cách khác. Nếu mảng không rỗng, hiển thị UI cho phép người dụng chọn sẽ kết nối với peripheral nào.

Sau khi người dùng chọn peripheral, ta kết nối với peripheral bằng cách gọi hàm `connect(_:options:)` trong `CBCentralManager`. Nếu thiết bị có sẵn để kết nối, central manager sẽ gọi hàm `centralManager(_:didConnect:)` từ delegate khi việc kết nối lại thành công.

> **Chú ý**: Một peripheral có thể ko có sẵn để kết nối do một vài lý do nào đó, có thể là bị nằm ngoài vùng phủ sóng. Thêm vào đó, một số thiết bị Bluetooth có sử dụng cơ chế đánh địa chỉ random thay đổi theo chu kì. Do đó, thậm chí khi thiết bị ở ngay gần, địa chỉ của thiết bị đã thay đổi so với lần cuối khi được discover bởi app. 
> 
> Trong trường hợp này, `CBPeripheral` object mà ta đang cố kết nối tới không còn tương ứng với thiết bị thật. Và bất khả kháng, ta phải quét lại peripheral sử dụng hàm `scanForPeripherals(withServices:options:)`

## Nhận về danh sách các peripheral đang kết nối với thiết bị
Một cách để kết nối lại với peripheral đó là kiểm tra xem pheripheral ta cần có đang kết nối với hệ thống không (có thể là do một ứng dụng khác). Ta làm việc này bằng cách gọi hàm `retrieveConnectedPeripherals(withServices:)` của `CBCentralManager`, nó sẽ trả lại một mảng các `CBPeripheral` của các thiết bị đang kết nối với hệ thống.

Bởi vì có thể có nhiều hơn một thiết bị đang kết nối với hệ thống, ta có thể truyền vào UUID để chỉ lấy các peripheral mà có service được định danh bằng UUID mà ta truyền vào. Nếu không có peripheral nào đang kết nối với hệ thống, mảng sẽ rỗng và ta nên thử các cách khác để kết nối lại. Nếu mảng không rỗng, hiện UI lên cho người dùng chọn peripheral nào sẽ kết nối tới.

Giả sử rằng người dùng tìm thấy và chọn một peripheral mong muốn, ta thực thi kết nối bằng việc gọi hàm `connect(_:options:)` của `CBCentralManager`. (Mặc dù thiết bị đã kết nối với hệ thống, tuy nhiên ta vẫn phải kết nối với app của ta để thực thi việc khai phá và tương tác với nó). Khi kết nối thành công, central manager sẽ gọi hàm `centralManager(_:didConnect:)` từ delegate.

-----
Trên đây là các best practice khi thực thi app đóng vài trò là central và tương tác với các thiết bị peripheral. Hy vọng sẽ giúp ích cho bạn!

-----
*Dịch và tham khảo từ [Core Bluetooth Programming Guide](https://developer.apple.com/library/content/documentation/NetworkingInternetWeb/Conceptual/CoreBluetoothconcepts/AboutCoreBluetooth/Introduction.html)*