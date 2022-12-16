![image.png](https://images.viblo.asia/2cba74bc-ede4-41e8-b957-240206f2e979.png)
### 1. Java là gì ?
* Rất đơn giản, Java là một ngôn ngữ lập trình, để lập trình các ứng dụng (web app, android app...)
* Java được phát triển bởi Sun Microsystem vào năm 1995.
* Java là ngôn ngữ lập trình hướng đối tượng.

### 2. Java được sử dụng để làm gì ?
* Lập trình các ứng dụng cho các thiết bị android (android app): ứng dụng trên điện thoại di động, máy tính bảng..., thiết bị sử dụng hệ điều hành android
* Lập trình các ứng dụng web (web app): có thể một trong những trang web bạn truy cập hằng ngày được lập trình bằng Java.
* Lập trình các ứng dụng trên hệ điều hành window (win app): ứng dụng trên máy tính, thiết bị sử dụng hệ điều hành microsoft window.
* Phát triển nhiều loại ứng dụng khác nhau: Cơ sở dữ liệu, mạng, Internet, viễn thông, giải trí,...

### 3. Đặc điểm cơ bản của Java
#### 3.1 Java là ngôn ngữ lập trình hướng đối tượng.
* Mọi thực thể trong chương trình đều là một đối tượng (1 class xác định)
* Các biến, hàm đều nằm trong một class nào đó

#### 3.2 Đơn giản
* Loại bỏ con trỏ
* Loại bỏ lệnh goto
* Không cho phép đa kế thừa (chuyển sang sử dụng interface)

#### 3.3 Độc lập nền
* Khác với các ngôn ngữ lập trình khác, thay vì biên dịch mã nguồn thành mã máy hoặc thông dịch mã nguồn khi chạy, Java được thiết kế để biên dịch mã nguồn thành bytecode, bytecode sau đó sẽ được môi trường thực thi (runtime environment).
=> Do đó một chương trình viết bằng Java có thể chạy trên nhiều thiết bị, nhiều hệ điều hành khác nhau, với điều kiện ở đó có cài sẵn máy ảo Java.

#### 3.4 Mạnh mẽ
* Quá trình cấp phát, giải phóng bộ nhớ được thực hiện tự động.
* Yêu cầu chặt chẽ khi khai báo dữ liệu, ép kiểu dữ liệu.
* Tự động phát hiện lỗi lúc biên dịch.
* Không sử dụng con trỏ hoặc các phép toán con trỏ.

#### 3.5 Đa nhiệm
* Java hỗ trợ lập trình đa luồng (multithreading): cho phép hoạt động đa tiến trình, tiểu trình có thể chạy song song cùng một thời điểm và có thể tương tác với nhau.

#### 3.6 Cơ chế thu gom rác tự động
* Khi các đối tượng được tạo ra trong Java, chúng sẽ được JRE  tự động cấp phát không gian bộ nhớ cho các đối tượng trên heap.


#### 3.7 Tính an toàn và bảo mật
##### 3.7.1 Tính an toàn
* Ngôn ngữ lập trình Java yêu cầu chặt chẽ về kiểu dữ liệu.
* Dữ liệu phải được khai báo tường minh.
* Không sử dụng con trỏ và các phép toán với con trỏ.
* Java kiểm soát chặt chẽ việc truy nhập đến mảng, chuỗi. Không cho phép sử dụng các kỹ thuật tràn. Do đó các truy nhập sẽ không vượt quá kích thước của mảng hoặc chuỗi.
* Quá trình cấp phát và giải phóng bộ nhớ được thực hiện tự động.
* Cơ chế xử lý lỗi giúp việc xử lý và phục hồi lỗi dễ dàng hơn.

##### 3.7.2 Tính bảo mật
Java cung cấp một môi trường quản lý chương trình với nhiều mức khác nhau: 
* Mức 1 : Chỉ có thể truy xuất dữ liệu cũng như phương phức thông qua giao diện mà lớp cung cấp.
* Mức 2 : Trình biên dịch kiểm soát các đoạn mã sao cho tuân thủ các quy tắc của ngôn ngữ lập trình Java trước khi thông dịch.
* Mức 3 : Trình thông dịch sẽ kiểm tra mã byte code xem các đoạn mã này có đảm bảo được các quy định, quy tắc trước khi thực thi.
* Mức 4: Java kiểm soát việc nạp các lớp vào bộ nhớ để giám sát việc vi phạm giới hạn truy xuất trước khi nạp vào hệ thống.

### 4. Các thành phần của Java SE Platform
Java Platform gồm có 3 thành phần chính:
* Java Virtual Machine (Java VM): Máy ảo Java.
* Java Application Programming Interface (Java API).
* Java Development Kit (JDK) gồm trình biên dịch, thông dịch, trợ giúp, soạn tài liệu... và các thư viện chuẩn.