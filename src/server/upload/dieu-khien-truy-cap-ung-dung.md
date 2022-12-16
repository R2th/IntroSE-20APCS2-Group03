Nếu như Xác thực (authentication) là pha đảm bảo an toàn đầu tiên mà hệ thống cần kiểm soát khi người dùng mới đăng nhập, nhằm đảm bảo sự chính danh thì điều khiển truy cập (AC: access control) là pha thứ hai quyết định xem người dùng có thể làm gì và như thế nào trong ngôi nhà hệ thống này

Nội dung bài viết tập trung trả lời các câu hỏi:

* Giải quyết bài toán: Một user U khi đăng nhập vào hệ thống có được thực hiện sửa, xem thông tin của một đối tượng O hay không? (Một người dùng có quyền user có được phép tạo category hay không?)
* Quản lý các hành vi của một user đăng nhập vào hệ thống như thế nào?
* Ma trận điều khiển truy cập
* Phân quyền trong Laravel

## 1. Tổng quan về kiểm soát truy cập?

Ta hãy coi một hệ thống cơ bản sẽ bao gồm các thành phần sau:
* U: tập người dùng hoặc nhóm người dùng
* O: tập tài nguyên hệ thống (các đối tượng trong hệ thống)
* R: tập các quyền, các hành động tác động lên đối tượng

Một cơ chế điều khiển truy cập cụ thể (AC mechanism) sẽ quyết định toàn bộ câu chuyện cho phép và chia sẻ tài nguyên dựa các quyền này như thế nào? Hơn nữa việc kiểm soát hệ thống sẽ đảm bảo nguyên tắc tối thiếu đặc quyền trong CNTT (Principle of least priviledge)

## 2. Khái niệm ma trận điều khiển truy cập 

Khái niệm ma trận truy cập (Access Control Matrix – ACM) là công cụ hình thức cơ bản để thể hiện trạng thái bảo vệ hệ thống một cách chi tiết và chính xác. Nó cung cấp thông tin chi tiết và chính xác rằng, tại thời điểm đang xét, một tài nguyên nào đó có thể truy cập bởi một user nào đó với những quyền cho phép cụ thể xác định nào đó. 

*Đơn giản hóa, hãy coi nó như một “bảng tham chiếu” để hệ thống xem user nào đó được thực hiện các quyền gì trên đối tượng O. Trước khi người dùng thực hiện tác động R lên đối tượng O trong hệ thống,  hệ thống sẽ kiểm tra ACL này xem có được phép hay không?*

Tùy thuộc vào thứ tự các thành phần này mà ta có các mô hình kiểm soát truy cập khác nhau
* ACL: O x U x L
* CL: U x O x R
* ACT: U x R x O

Ta xét các cách tạo ACL của một hệ thống bao gồm 2 user Joe và Sam, tài nguyên hệ thống bao gồm file 1, file 2, tập quyền bao gồm đọc và ghi
* ACL: **O x U x L**

Cài này có lẽ được sử dụng phổ biến nhất và thay vì gọi ma trận điều khiển truy cập, người ta sử dụng luôn khái niệm ACL cho mọi người dễ hình dùng. Về cơ bản, các thông tin của nó sẽ như sau:
| FIle 1 | File 2 
| -------- | -------- | -------- |
| Joe: Read     | Joe: Read     |
| Joe: Write     | Sam: Read     |
| Joe: Own     | Sam: Write     |
| Joe: Own     | Sam: Own     |


* CL: danh sách năng lực (capability list)  **U x O x R**

Joe: 

File 1/Read, File 1/Write,

File 1/Own, File 2/Read

Sam:

File 2/Read, File 2/Write

File 2/Own

* ACT (Access Control Triples) **U x R x O**

| U  | R | O
| -------- | -------- | -------- |
| Joe     | Read   | File 1
| Joe     | Write   | File 1
| Joe     | Own   | File 1
| Joe     | Read   | File 2
| Sam     | Read   | File 2
| Sam     | Write   | File 2
| Sam     | Own   | File 2

Tùy vào ứng dụng mà bạn có thể chọn một trong các ma trận trên làm bảng để "ánh xạ truy cập" cho ứng dụng của mình

## 3. Mô hình điều khiển truy cập

Sau khi đã xác định được sử dụng ma trận nào, việc tiếp theo là các bạn cần xác định mô hình áp dụng trong hệ thống. Mô hình này hiểu đơn giản là bạn sẽ tạo ma trận trên như thế nào? 

### 3.1. Điều khiển truy cập tùy nghi (Discretinary Access Control – DAC)

Với mô hình này, chủ sở hữu có thể cấp quyền đối với các đối tượng mà họ tạo ra. Nói một cách đơn giản, chủ thể tạo ra đối tượng sẽ tác động vào ma trận điều khiển truy cập. Mô hình này được sử dụng trong họ các hệ điều hành nhân UNIX

### 3.2. Điều khiển truy cập bắt buộc (Mandatory Access Control – MAC)

Thay vì chủ thế gán các quyền đối tượng do họ tạo ra, với mô hình MAC, hệ thống sẽ gán các quyền cho các đối tượng và bắt buộc người dùng phải theo phép gán này. Các đối tượng và người dùng sẽ được gán các mức bảo mật khác nhau. Một người dùng chỉ được phép tác động lên đối tượng nếu có mức bảo mật cao hơn

Mô hình này thường được sử dụng trong các đối tượng, các người dùng có quan hệ cấp bậc (như quân đội)
### 3.3. Điều khiển truy cập dựa trên vai trò (Role-Based Access Control)

Mô hình này thể hiện sự tương tác, vận động giữa các tập U các người dùng (users), tập P các quyền truy cập khai thác (Permissions) và tập R các vai trò hay vị trí công việc. Tập S các phiên làm việc (sessions) thể hiện khả năng đăng nhập khác nhau có thể xảy ra của một người dùng mà có nhiều vai trò khác nhau

Sơ đồ quan hệ cơ bản như sau:

![](https://images.viblo.asia/7c8f465e-ec8e-4c81-a911-fac4f899d66c.png)

Thiết kế database tương ứng:

![](https://images.viblo.asia/cf9539a3-f7c3-4c57-8e1b-c4306a886622.png)

Tùy trường hợp bạn muốn quản lý như thế nào để lựa chọn thiết kế database phù hợp, đây có thể coi là tất cả các lớp để quản lý các phiên và quyền. Nhìn vào database ta thấy bảng permissions sẽ tương đương với vai trò ACL. Mỗi khi thực hiện hàng động nào đó (sửa thông tin user, sửa thông tin category ...) hệ thống sẽ check xem người dùng có được phép thực hiện chức năng đó không trong bảng này.

## 4. Phân quyền trong Laravel
Trong Laravel sử dụng Gate và Policies để thực hiện chức năng phần quyền trong hệ thống. Ta xây dựng các cơ sở dữ liệu để làm ACL, sau đó sử dụng Gate và Policies để đọc và kiểm tra các quyền trong ACL (bảng permissions) xem hành động đó có được thực hiện bởi user hay không?

Về cơ bản, hãy coi gate và policy giống như route và controller trong Larvel. Chi tiết thông tin [Gate và Polocies](https://laravel.com/docs/5.6/authorization)

## 5. Tổng kết

* Trên đời tồn tại một thứ là ACL (Access control list) hay ma trận điều khiển truy cập để kiểm soát việc phân quyền của hệ thống. Một ma trận như vậy gồm 3 thành phần U, O và R
* Mô hình điều khiển truy cập: DAC, MAC, RBAC
* Gate && Policies là phần hỗ trợ phân quyền trong Larvel

## Tài liệu tham khảo

* Giáo trình “Cơ sở An toàn thông tin” – thầy Nguyễn Khanh Văn – Đại học Bách Khoa Hà Nội
* Database: https://www.mind-it.info/2010/01/09/nist-rbac-data-model/
* https://www.slideshare.net/tuoitrecomvn/slide-6-ppt