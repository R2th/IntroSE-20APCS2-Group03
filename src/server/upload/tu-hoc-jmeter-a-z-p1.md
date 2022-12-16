> Series này được viết ra để tổng hợp các kiến thức mình tự học được về JMeter. Hope you enjoy it.
## Cài Đặt Jmeter
* [Download Java JDK](https://www.oracle.com/java/technologies/javase-downloads.html)
* Check java đã cài đặt thành công chưa `java -version` 
* [Download Apache Jmeter](https://jmeter.apache.org/download_jmeter.cgi): Tải bản Binaries
* Start Jmeter: `bin > ApacheJMeter.jar `
## Các thành phần cơ bản của Jmeter
### Test plan
*  Mỗi chương trình chỉ bao gồm 1 test plan, là thành phần lớn nhất trong một test

###  Thread group
* Thread group đại diện một nhóm người dùng ảo. Để thêm Thread Group, chuột phải vào Test Plan chọn `Add --> Thread (Users) --> Thread Group `
* ![image.png](https://images.viblo.asia/ea532038-c3d9-4d4a-96fe-f7ec3682fdef.png)
* Number of Thread (Users): Số lượng user ảo 
* Ramp-up period (Seconds): Tổng time để chạy toàn bộ Thread. Example nếu chọn Number of Thread là 10 và Ramp-up period là 30 thì mỗi thread sẽ chạy trong 3s
* Loop count: Số lần lặp lại 

### Sampler
* Các lệnh thực thi. Ở đây mình ví dụ về HTTP Request - một trong những sampler hay sử dụng nhất
* Để thêm HTTP Request, chuột phải vào Thread Group chọn `Add --> Sampler --> HTTP request`
* ![image.png](https://images.viblo.asia/b2e3615d-c3a3-40c8-b94f-0bcbdbd90227.png)
* Để config HTTP request cần điền các fields: Protocol: http/https, Server Name or IP, Chọn GET/POST/PUT/DELETE, Path và Body Data
* Example 1: Nếu mình muốn gửi một request GET đến https://reqres.in/api/users?page=2 thì mình sẽ config như sau
* * Protocol: https
* * Sername or IP: reqres.in
* * GET
* *  Path: api/users?page=2

### Listener
* Dùng để xem kết quả của Test. Có nhiều dạng Listener. Ở đây mình ví dụ về View Result Tree
* Để thêm Listener. Chuột phải vào Thread Group --> Listener --> View Result Tree
* ![image.png](https://images.viblo.asia/51cea006-3ba9-42d1-aa06-43f2fbd76ac4.png)
* Bạn có thể xem được kết quả của test, response data trả về, thời gian request,...

### Controller
* Như cái tên, Controller dùng để controll các request (Sampler)
* Để thêm Controller, chuột phải Add --> Logic Controller
* Note: Controller chỉ áp dụng cho các request có vị trí thấp hơn nó 
* Một số dạng Controller thường gặp:
* * Loop Controller: Các request sẽ được lặp lại n lần
* * Random Controller: Chạy 1 request ngẫu nhiên trong list request dưới nó
* * Random Order Controller: Chạy các request dưới nó theo thứ tự ngẫu nhiên

### Timer
* Dùng để Delay các request trong một khoảng thời gian
* Áp dụng cho tất cả các request có vị trí thấp hơn hoặc bằng nó
* Để thêm Timer, chuột phải Add --> Timer
* Một số dạng Timer thường dùng:
* Constant Timer: Delay tất cả các Request có vị trí thấp hơn hoặc bằng nó một khoản thời gian cố định (đơn vị miliseconds)

**Note**: Controller và Timer sử dụng để giả lập cho thao tác của các thread group giống người dùng hơn vì người dùng sẽ không phải khi nào cũng thực hiện vào các trang theo đúng thứ tự hay thời gian ở lại giữa các trang cũng sẽ không giống nhau. Cho nên mình cần dùng Controller và Timer để giúp giả lập giống người dùng bình thường hơn. 

Đối với các tooler sử dụng cái này để né các hệ thống detect ra mình là bot
### Config Element
* Được sử dụng để config biến cho Test case. Ở đây mình ví dụ một Config Element hay sử dụng là User Defined Variables
* Để config Element cho Test Plan, chuột phải `Add --> Config Element --> User Defined Variables`
* ![image.png](https://images.viblo.asia/21af8cb7-5f15-4fad-8ab6-0a18621a9977.png)
* Điền tên biến vào cột name, điền giá trị biến vào cột value
* Để sử dụng biến dùng cú pháp {{tên_biến}}
* Example: Ở ví dụ trên, mình có thể config biến page với giá trị bằng 2. Sau đó ở phần Path: thay vì viết api/users?page=2 mình sẽ viết là api/users?page={{page}}
* Tính năng này khá hay ho và được sử dụng rất nhiều trong JMeter. Thông thường URL sẽ được viết dạng biến để khi thay đổi môi trường dev --> stag --> prod thì tester không cần phải đi chỉnh từng request
* Để lấy dữ liệu từ file csv làm data chạy test,  chuột phải `Add --> Config Element --> CSV data set config'
* Tên cột sẽ được JMeter tự hiểu là biến. Bạn thực hiện upload và sử dụng {{tên_cột}} để lấy ra các giá trị trong file csv đó

### Assertion
* Được sử dụng để check test failed hay success
* VD: Theo test case nếu click vào màn home phải xuất hiện hình ảnh a thì mới coi là thành công hoặc nếu response data trả về có order = 10 mới thành công. Ta gọi những điều kiện để check đó là assertion
* Để thêm Assertion. `Chuột phải --> Add --> Assertion`
* Một số loại Assertion thường gặp gồm: Response Assertion và JSON Assertion

[Phần 2: Sử dụng BlazeMeter Record Script cho JMeter](https://viblo.asia/p/tu-hoc-jmeter-p2-su-dung-blazemeter-record-script-cho-jmeter-YWOZrr0rZQ0)