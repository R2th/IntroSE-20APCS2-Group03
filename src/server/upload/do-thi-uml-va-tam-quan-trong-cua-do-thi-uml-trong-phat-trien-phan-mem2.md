Ở bài viết lần này mình sẽ chia sẻ thêm về  loại đồ thị UML là Biểu đồ tuần tự và Biểu đồ hoạt động
## 1. Biểu đồ tuần tự
### 1.1 Khái niệm
- Biểu đồ tuần tự là biểu đồ dùng để biểu diễn luồng dữ liệu của 1 UC theo trình tự thời gian
- Các thành phần trong biểu đồ tuần tự bao gồm: Các đối tượng / Thông điệp / Thời gian
+ Cách biểu diễn các đối tượng
![](https://images.viblo.asia/6dfef48b-4bc8-48b6-ad96-d49a4e4e76d9.png)

+ Cách biểu diễn thông điệp(message)
Mỗi thông điệp được qui định bằng một mũi tên giữa đường sống (lifeline) của 2 đối tượng
![](https://images.viblo.asia/9cd3158d-7be2-44c5-b813-822ff527a4a1.png)

+ Thời gian ở đây được biểu diễn chính bằng các đường lifeline đi liền với các thông điệp được gửi đi

### 1.2 Chức năng
- Giúp xác định sự tương tác giữa các đối tượng trong 1 UC
- Đem đến cái nhìn tổng quan cho kịch bản hoạt động của 1 UC

### 1.3 Các script trong biểu đồ tuần tự
- Biểu diễn vòng Loop 
![](https://images.viblo.asia/1cca7ff0-e2e1-49af-9fdf-0c9743cc180f.png)

- Biểu diễn các điều kiện If...Else
![](https://images.viblo.asia/5c8f0356-becf-4056-8c35-ac1e9a5a9943.png)

### 1.4 Phân tích ví dụ về biểu đồ tuần tự
Giả sử ta có kịch bản cho UC đăng nhập được trình bày dưới dạng bảng sau:
![](https://images.viblo.asia/c537194b-d60e-4ab4-a819-3696932f2161.png)

Hình dưới đây cho ta cái nhìn về ví dụ của biểu đồ tuần tự mô tả cho UC đăng nhập vào hệ thống
![](https://images.viblo.asia/f0c3c007-bb44-4180-b43e-33e0d0cf2135.png)

Có thế thấy trong biểu đồ trên có các đối tượng sau:
*   Các đối tượng:
    + Actor: Admin
    + Entity: Form đăng nhập / Control Đăng nhập (xử lí và kiểm tra thông tin đăng nhập) / Tai khoan (ở đây là DB table)
*  Luồng sự kiện chính: 
 1. Admin mở form đăng nhập 
 2. Input vào các thông tin về Username/Password
 3. Click button Đăng nhập
 4. Sau khi submit data sẽ được gửi lên để kiểm tra với dữ liệu được lưu trong DB và trả về kết quả

## 2. Biểu đồ hoạt động
### 2.1 Khái niệm
- Là một loại biểu đồ giúp ta nắm bắt được hành động cũng như kết quả của UC tùy theo sự biến đổi trạng thái của các đối tượng
-  Các hành động của biểu đồ hoạt động được thể hiện trong các luồng

### 2.2 Chức năng
Biểu đồ hoạt động có thể được sử dụng cho nhiều mục đích khác nhau
- Nắm bắt được hành động sẽ phải thực thi khi một thủ tục được thực hiện
- Chỉ ra được cách thức các hành động được thực thi, tính liên kết, tương quan và tương tác giữa chúng

### 2.3 Các thành phần của một biểu đồ hoạt động
* Một biểu đồ hoạt động bao gồm các thành phần như sau:
     - Trạng thái (State)
     - Các hành động (Activity)
     - Sự chuyển tiếp (Transition) được tạo ra khi có các thủ tục, thao tác được hoàn tất
* Mỗi biểu đồ hoạt động sẽ gắn liền với 1 UC
* Một số kí hiệu trong biểu đồ hoạt động
     - Activity: một qui trình đã được định nghĩa, được thể hiện bằng hình chữ nhật bo tròn cạnh
     - Synchronisation bar: cho phép mở hoặc đóng các nhánh chạy song song trong tiến trình
     - Guard condition: Các biểu thức logic mang giá trị True/False. Được thể hiện trong ngoặc vuông
     - Decision point: Kí hiệu hình thoi

### 2.4 Ví dụ về biểu đồ hoạt động
Cùng với Kịch bản đăng nhập đã được đưa ra ở trên chúng ta cùng phân tích ví dụ về biểu đồ hoạt động như sau:
![](https://images.viblo.asia/00eba7f3-fdcc-4945-95f1-2cfa0b6e9a91.png)

- Phân tích luồng sự kiện chính
   * Sự kiện 1: Đăng nhập
     + Step 1: User access vào màn hình đăng nhập
     + Step 2: Input *Username/Password*
     + Step 3: Sau khi click vào button Đăng nhập, hệ thống sẽ check Guard condition* [Kiem tra hop le]* nhằm xác định xem username/password có đúng hay không
     + Step 4: Ở Decision point: 
         
         +True => Cho phép User truy cập hệ thống => Kết thúc sự kiện
                                                
         +False  => Quay lại Activity *Nhap tai khoan va mat khau*
                                                
  *  Sự kiện 2: Quên mật khẩu
     - Trong trường hợp người dùng quên mật khẩu: Click vào button Quên mật khẩu
Result trả về là Hệ thống sẽ gửi Username/Password về email mà User đã đăng kí trước đó
 
       => Kết thúc sự kiện
 
##  3. Kết luận
Mỗi loại biểu đồ UML sẽ mang đến một chức năng riêng trong quá trình phân tích thiết kế hệ thống. Điều quan trọng là chúng ta xác định được đối tượng cần được miêu tả và muốn miêu tả lại khía cạnh nào của đối tượng. Từ đó xác định chính xác loại biểu đồ UML nên sử dụng