Hôm nay mình sẽ giới thiệu view debug được tích hợp trong Xcode.Trước tiên các bạn tải source code: 
https://github.com/lehuudungle/CloudyDemo
# 1.	Exploring the View Debugger
Hãy mở project Clody example. Cloudy lấy data từ Dark Sky API and sẽ show cho người dùng thấy thời tiết hiện tại  và và các ngày tiếp theo.

![](https://images.viblo.asia/4147f88e-a11b-4cac-a90c-c8dce643c3af.jpg)

Run Cloudy trong simulator và click vào Debug View Hierarchy
hoặc trên navigation các bạn chọn :

![](https://images.viblo.asia/b394127a-6289-44c7-87e0-29bd61c2bf0e.jpg)

<br>Ngoài ra còn có một tuỳ chọn ít được biết đến để gỡ lỗi phân cấp khung nhìn của ứng dụng .Các bạn cho tạm  dừng ứng dụng , mở class RootViewControll.swift và thêm **breakpoint** trên dòng 152. Chạy lại ứng dụng , ứng dụng bị gián đoạn tại điểm breakpoint dòng 152(Nghĩa là phần giao diện chỉ hiển thị đến dòng này bị dừng lại).Mở **Debug Navigator** bên trái, click menu **View process in different ways** và select **View UI Hierarchy**.


![](https://images.viblo.asia/bc73fefc-fca0-4cd8-8d34-6f79b782fb19.jpg)

# 2.	Debug Navigator
**Debug Navigator** sẽ hiển thị danh sách các phân cấp của cấu trúc phân cấp chế độ xem. Nó sẽ hiển thị các mối quan hệ giữa các khung nhìn trong hệ thống phân cấp và sẽ hiển thị view controller nào quản lý view nào.

![](https://images.viblo.asia/b87640f5-f43f-409b-8198-a5dea5e4d6eb.jpg)

Khi nhìn vào hệ thống phân cấp của bộ điều khiển các bạn sẽ nhìn thấy ngay lớp **RootViewController** chứa 2 bộ điều khiển con đó là lớp **DayViewController** và 1 lớp **WeakViewController**.

-	Thanh bộ loc ở dưới cùng của hệ thống phân cấp chế độ xem là một công cụ  thuận tiện để tìm chế độ xem( tìm 1 UILabel, 1 Button ...).Bộ lọc văn bản cho phép bạn lọc phân cấp chế độ xem dựa trên  một số tiêu chí, bao gồm tên lớp , text của label hoặc button, thậm chí các địa chỉ ô nhớ của đối tượng. 
-	
![](https://images.viblo.asia/141738be-1223-4b01-9001-8dfb81878db9.jpg)

Các nút bên phải của bộ lọc văn bản được bật theo mặc định. Khi nút 
**Show primary views** được bật sẽ ẩn chế độ xem là chế độ xem của hệ thống. Ví dụ:
Một UIButton quản lý  một thể hiện UILabel để hiển thị tiêu đề của button, Khi click nút  **Show primary views**  thì UILabel đó sẽ bị ẩn trong cấu trúc phân cấp chế độ .


Nút kế bên là nút **Show only displayed views** được bật thì các view đang được set IsHiden sẽ bị ẩn đi , nếu bỏ click **Show only displayed views** thì các view đang được set isHiden  là true sẽ được hiển thị trên chế độ xem(Như hình dưới thì **activity indicator view** được hiện lên)

![](https://images.viblo.asia/8df1d25a-98a8-4b56-8bb6-c2713721c82b.png)

# 3.Main Window

**Main window** Xcode sẽ show trung tâm của trình gỡ lỗi chế độ xem, hiển thị 2 hoặc 3 chiều không gian của hệ thống phân cấp. Chúng ta có thể xoay cấu trúc phân cấp khung nhìn để thay đổi góc và các view controller ở dưới của main window.

![](https://images.viblo.asia/795e6ce5-ceee-412d-969f-92626b7afd59.jpg)

<br>**Với thanh trượt bên trá**i: chúng ta có thể điều chỉnh khoảng cách giữa các chế độ xem của hệ thống phân cấp. Điều này rất hữu ích nếu bạn đang làm việc với hệ thống phân cấp phức tạp với hàng chục hoặc hàng trăm view.
* 	**Show Clipped Content**: Sẽ hiển các view bị cắt của ô xem bảng.
![](https://images.viblo.asia/16ea3c8b-fc02-47b3-94c6-22e359a84516.png)
Ví dụ:  Khi click vào  Show Clipped Content
Thì title  “January 20” ở ngoài khung nhìn của màn hình device sẽ được hiển thị.
* **Show Constraints**: Sẽ show contraints của 1 view bất kỳ các bạn double click vào view cần xem.

![](https://images.viblo.asia/fdec43b3-3226-411f-be31-96f2e1bd225b.jpg)

* **Adjust the view model**:  mặc định nó sẽ ở chế độ **Wireframes and Content**s. Nó có 3 chế độ:   **Contents**, **Wireframes**, and **Wireframes** **and** **Contents**.
Nhưng phần lớn khi debug view chúng ta muốn xem cả phần khung và cả content.

* **Orient to 2D/3D**: bạn có thể chuyển đổi 2 chiều hoặc 3 chiều của chế độ xem phân cấp. chế độ 3d thường được sử dụng nhiều hơn nhưng đôi khi có thể dễ dàng gỡ lỗi hơn với chế độ 2d. Ví dụ: để kiểm tra liên kết của một số chế độ xem.

![](https://images.viblo.asia/bcd8717b-d957-490d-9638-70732a5e5cec.jpg)

* 	Tiếp theo là 3 nút: -, =, +: Đấy là các nút để phóng to, thu nhỏ chế độ xem.

-	**Tranh trượt bên phải**: được sử dụng để tập trung vào một tập hợp con của hệ thống phân cấp chế độ xem. Điều này rất hữu ích nếu bạn đang làm việc với hệ thống phân cấp phức tạp và muốn bỏ qua chế độ xem mà bạn không quan tâm.

![](https://images.viblo.asia/c28a2e63-b882-45e2-b729-18e890715bc5.jpg)

<br>Có cách thuận tiện hơn để bạn tập trung vào 1 tập hợp con của hệ thống phân cấp chế độ xem( 1 view cụ thể, 1 label cụ thể) bằng cách Double Click phần tử đó .

Để quay về bao quát toàn view của hệ thống bạn click nút **Unfocus** trong Debug Navigator ở bên trái.
![](https://images.viblo.asia/550eacf4-303f-4909-8e55-8da2f5d0974a.png)

-	Nhấn chuột phải vào 1 view trong cửa sổ chính bạn có thể in ra phần mô tả của view đó trên console giống hệt lệnh “po” của 	LLDB. Trong dự án ,khi mình làm 1 cái task  về UI, một người bạn của mình đã chỉ cho mình cách này, nó giúp mình xem thông tin của frame đó là bao nhiêu , cái này khá hữu ích.



![](https://images.viblo.asia/75b270d0-c243-4372-9cee-ce2c502ee3a2.jpg)

<br>Ngoài ra của có 1 số tuỳ chọn như là Hide Views in Front hoặc Hide Views Behind.

Giả sử khi bạn chọn 1 label trong chế độ xem chính , bạn có để ấn tổ hợp phím Shift+Command+D để xem phần tử đó trong hệ thống phân cấp của Debug Navigator.

![](https://images.viblo.asia/74dbef14-4821-497f-aa7b-b7e19b35a5cf.png)

# 4.Object and Size Inspectors

Khi bạn chọn 1 view bất kỳ trên cửa sổ chính, và click vào “**Show the Object Inspectors** ” sẽ cho bạn thấy 1 loạt các thông tin của phần tử đó.
Nếu bạn chọn view UITableViewCell trên cửa sổ chính mà view này được custom từ 1 class thì bạn có thể điều hướng đến đoạn class custom view này.

![](https://images.viblo.asia/b25bd62d-8938-4f4f-b00a-bc562b8f46fe.png)

<br>Các thông tin được hiển thị trong **Object Inspector** rất thuận tiện để có cái nhìn tổng quát nhanh về các các thuộc tính của 1 thành phần, rất hữu ích để gỡ lỗi các vấn đề giao diện.

**Object Inspector** cũng rất thuận tiện cho việc gỡ view controller . Nếu bạn chon 1 view controller sẽ cho các bạn trình điều khiển khung nhìn cha và con của nó. 

![](https://images.viblo.asia/36b74364-0c88-4da1-8571-ad1f07eb6ff1.jpg)

# 5. Size inspector
Phần Size inspector tóm tắt các layout attributes của 1 view được chọn  cũng như frame, bounds và constraints.Một List các contrains đặc biệt hữu ích để debug các vấn đề liên quan đến Auto layout.
        ![](https://images.viblo.asia/919f18c8-2bf3-45ff-a0a4-f9b503edb2b4.jpg)
        
# 6. Tài liệu tham khảo: 
https://cocoacasts.com/debugging-applications-with-xcode-view-and-view-controller-debugging