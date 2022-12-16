# 1.  Internet of Things là gì?
Internet of Things phổ biến được gọi là IoT là mạng bao gồm các thiết bị, phương tiện, tòa nhà hoặc bất kỳ thiết bị điện tử được kết nối khác. Sự kết nối này tạo điều kiện cho việc thu thập và trao đổi dữ liệu, 4 thành phần phổ biến của hệ thống IoT là:
1. Sensor
2. Application
3. Network
4. Backend (Data Center)

IOT là kết nối của các thiết bị nhúng có thể nhận dạng với cơ sở hạ tầng Internet hiện có. Nói một cách đơn giản, chúng ta có thể nói rằng IOT là một kỷ nguyên của "Thông minh", các sản phẩm được kết nối giao tiếp và truyền một lượng lớn dữ liệu và tải nó lên đám mây.

Bài viết sẽ đề cập đến vấn đề sau:
1. IOT Testing là gì?
2. Các loại type trong IOT
3. Tiến trình kiểm thử IOT Testing
4. Thách thức trong kiểm thử IOT
5. Một số tip
6. Một số tool
7. Kết luận

# 2.  IOT Testing là gì?
Thử nghiệm IOT là một loại kiểm thử để kiểm tra các thiết bị IOT. Ngày nay nhu cầu loại hình kiểm thử này ngày càng tăng nhằm cung cấp dịch vụ tốt hơn và nhanh hơn song song với nhu cầu truy cập, tạo, sử dụng và chia sẻ dữ liệu từ bất kỳ thiết bị nào. Các hệ thống IOT cần cung cấp cái nhìn sâu sắc và khả năng kiểm soát tốt khi các thiết bị IOT kết nối với nhau nên kiểm thử IOT rất quan trọng.
# 3.  Các loại test type trong IOT
![](https://images.viblo.asia/d41feffe-493c-45a8-b812-115e10b6d644.png)

Thử nghiệm cho các thiết bị IoT xoay quanh Security, Analytics, Device, Networks, Processors, Operating Systems, Platforms và Standards

## Usability Testing:
Có rất nhiều thiết bị có hình dạng và các yếu tố hình thức khác nhau được sử dụng bởi người dùng. Hơn nữa, nhận thức cũng thay đổi từ người dùng này sang người dùng khác. Đó là lý do tại sao kiểm tra khả năng sử dụng của hệ thống là rất quan trọng trong thử nghiệm IoT.
## Compatibility Testing:
Có rất nhiều thiết bị có thể được kết nối qua hệ thống IOT. Các thiết bị này có cấu hình phần mềm và phần cứng đa dạng. Do đó, sự kết hợp có thể là rất lớn. Do đó, việc kiểm tra tính tương thích trong hệ thống IOT là rất quan trọng.
## Reliability and Scalability Testing:
Độ tin cậy và khả năng mở rộng rất quan trọng để cải thiện khả năng kiểm tra IOT bao gồm mô phỏng các cảm biến bằng cách sử dụng các công cụ virtualization và công nghệ
## Data Integrity Testing:
Điều quan trọng là kiểm tra tính toàn vẹn dữ liệu trong thử nghiệm IOT vì nó liên quan đến lượng dữ liệu lớn và ứng dụng của nó.
## Security testing:
Trong môi trường IOT, có nhiều người dùng đang truy cập một lượng lớn dữ liệu. Do đó, điều quan trọng là xác thực người dùng thông qua xác thực, có kiểm soát quyền riêng tư dữ liệu như một phần của kiểm tra bảo mật.
## Performance Testing:
Kiểm tra hiệu suất là quan trọng để tạo ra cách tiếp cận chiến lược để phát triển và thực hiện kế hoạch kiểm tra IOT.



| Các loại phần tử IOT | Sensor | Application |Network | Backend (Data Center) |
| -------- | -------- | -------- | -------- | -------- |
| Functional Testing     | True     | True     |False     | False     |
| Usability Testing    | True     | True     |False     | False     |
| Security Testing    | True     | True     |True     | True     |
| Performance Testing    | Text     | True     |True     | True     |
| Compatibility Testing    | True     | True     |False     | Text     |
| Services Testing   | False     | True     |True     | True     |
| Operational Testing     | True     | True     |False     | Text     |
# 4.  Tiến trình kiểm thử IOT Testing
![](https://images.viblo.asia/10d8407f-08b4-4436-9d87-7434cdbaa9e1.png)
# 5.  Thách thức trong kiểm thử IOT
* Bạn cần kiểm tra cả mạng và liên lạc nội bộ
* Bảo mật là một mối quan tâm lớn trong nền tảng IOT vì tất cả các tác vụ được vận hành bằng Internet.
* Sự phức tạp của phần mềm và hệ thống có thể che giấu lỗi có trong công nghệ IOT
* Các cân nhắc về tài nguyên như các hạn chế về bộ nhớ, sức mạnh xử lý, băng thông, tuổi thọ pin, v.v.
# 6.  Một số tip
* Kiểm thử hộp xám nên được sử dụng với kiểm tra IOT vì nó cho phép thiết kế trường hợp kiểm thử hiệu quả. Điều này cho phép bạn biết hệ điều hành, kiến ​​trúc, phần cứng của bên thứ ba, kết nối mới và giới hạn thiết bị phần cứng.
* Hệ điều hành thời gian thực rất quan trọng để cung cấp khả năng mở rộng, mô đun hóa, kết nối, bảo mật, điều này rất quan trọng đối với IOT
* Kiểm tra IoT nên được tự động hóa.
# 7.  Một số tool
Hai công cụ kiểm tra IOT hiệu quả nhất là:

* **1.Shodan**

Shodan là một công cụ kiểm tra IOT mà bạn có thể sử dụng để khám phá thiết bị nào của bạn được kết nối với Internet. Nó cho phép bạn theo dõi tất cả các máy tính có thể truy cập trực tiếp từ Internet.

Download link: https://www.shodan.io/

**2. Thingful**

Thingful là một công cụ tìm kiếm cho Internet of Things. Nó cho phép khả năng tương tác an toàn giữa hàng triệu đối tượng thông qua Internet. Công cụ kiểm tra IOT này cũng để kiểm soát cách sử dụng dữ liệu và trao quyền để đưa ra các quyết định có giá trị và quyết định hơn.

Download link: https://www.thingful.net
# 8.  Kết luận
* IOT là kết nối của các thiết bị nhúng có thể nhận dạng với cơ sở hạ tầng Internet hiện có.
* Sự phức tạp của phần mềm và hệ thống có thể che giấu lỗi có trong công nghệ IOT
* Kiểm thử hộp xám nên được sử dụng với kiểm tra IOT vì nó cho phép thiết kế trường hợp kiểm thử hiệu quả.
* Kiểm tra IoT đảm bảo rằng người dùng có được trải nghiệm người dùng được cải thiện trên tất cả các thiết bị IOT được kết nối.
* Vì không có kế hoạch kiểm tra, một phần của các thuộc tính cần kiểm tra không thể đo lường được. Vì vậy, lỗi / lỗi có thể không được phát hiện dễ dàng.

Nguồn: https://www.guru99.com/iot-testing-challenges-tools.html