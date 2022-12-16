# Sử dụng NewRelic để giám sát ứng dụng và cơ sở hạ tầng
1. Cài đặt newrelic trong ROR
2. Kiểm tra hiệu suất trang
3. Theo dõi theo trình duyệt
10.  Kết

## 1. Cài đặt newrelic trong ROR
* Để sử dụng newrelic các bạn có thể truy cập vào trang https://newrelic.com/ để đăng kí một tài khoản 
* Tiếp theo truy cập vào your profile -> Add your data -> Ruby
*  Newrelic sử dụng khóa đã được cấp phép cho tài khoản sau đó tạo ra một file cấu hình sau đó chúng ta đặt vào thư mục config để thu thập dữ liệu thống kê
*   Bước tiếp thêm các cài đặt để newrelic lấy được data
    * Đầu tiên là đặt tên dự án của bạn để dễ quản lý nếu bạn có nhiều dự án, về cách đặt tên và các ảnh hưởng khi đổi tên có thể tham khảo tại [đây](https://docs.newrelic.com/docs/agents/manage-apm-agents/app-naming/name-your-application)
    * Tiếp theo bạn cần cài đặt gem newrelic và chạy bundle install
    * Tải file cấu hình mà newrelic đã tạo ra sau đó đặt vào thư mục config/
    * Khởi động lại ứng dụng của bạn để gửi dữ liệu tới newrelic
    * Nhấn nút kiểm tra dữ liệu của bạn và xem kết quả
   ![](https://images.viblo.asia/7fa85046-4382-4662-9934-a355a053f74c.png)
## 2. Kiểm tra hiệu suất trang
- Để kiểm tra hiệu suất của trang các bạn vào browser -> chọn appcuar bạn -> Page views
- Tại đây newrelic cung cấp cái nhìn tổng quan hiệu suất trang web của bạn
- Các bạn có thể tùy chọn sắp xếp cho phép xem chi tiết theo phần trăm tải trang, thời gian tải trung bình hoặc thông lượng bao gồm chi tiết thời gian, các vết trình duyệt hoặc phiên đã có.
- Thông tin tóm tắt ở phần bên tay trái màn hình 
    * Liệt kê các lượt xem dưới dạng URL, điều này dễ dàng xác định lượt xem trang của người dùng dựa vào url.
    * Để xem chi tiết các bạn có thể di chuyển vào vị trí trên biểu đồ bao gồm thời gian request nhỏ nhất, lớn nhất, tổng thời gian xử lý,...
Giải thích: 
    * Màu đen: Thời gian chờ giữa máy chủ web và mã ứng dụng. Nếu nó có số lượng lớn cho thấy một máy chủ ứng dụng bận.
    * Màu tím : Thời gian cho mã ứng dụng 
    * Màu nâu: Độ trễ mạng hoặc thời gian chờ một phản hổi 
    * Màu vàng: Phân tích cú pháp HTML được đo bằng sự kiện DOMContent của trình duyệt
    * Màu xanh lam: Thời gian để hiển thị HTML, chạy JavaScript và tải các hình ảnh. Được đo lường bởi sự kiện load của trình duyệt .
![](https://images.viblo.asia/4cd745f7-a818-4c16-af86-b6bbbdea6cf0.png)

## 3. Theo dõi theo trình duyệt
- Ở tab này newrelic cho phép theo dõi các trình duyệt về người dùng cuối bao gồm các trình duyệt như Google Chrome, Mozilla Firefox, Microsoft Internet Explorer, và Apple Safari
- Nó mô tả thời gian tải trung bình trên các trình duyệt và thiết bị
- Một số tác vụ trong trang này: 
    * Để xem thông tin tóm tắt về trình duyệt tại một thời điểm cụ thể cần di chuột qua bất kì khu vực nào trên biểu đồ
    * Để ẩn dữ liệu trên biểu đồ cần chọn màu với tiêu đề tương ứng trên chú giải của biểu đồ
    * Để xem thông tin chi tiết của một trình duyệt cụ thể cần chọn tên trong danh sách đã liệt kê hoặc vị trí của nó trên biểu đồ
    ![](https://images.viblo.asia/108365b6-5d43-4e56-840a-a1707fff2152.png)
    
## 4. Chi tiết các trình duyệt cụ thể
- Chi tiết cụ thể bao gồm phân tích theo phiên bản và thời gian tải trang trung bình.
- Các màu sắc thể hiện trong biểu đồ tương tự với page views
    * Màu đen: Thời gian chờ giữa máy chủ web và mã ứng dụng. Nếu nó có số lượng lớn cho thấy một máy chủ ứng dụng bận.
    * Màu tím : Thời gian cho mã ứng dụng 
    * Màu nâu: Độ trễ mạng hoặc thời gian chờ một phản hổi 
    * Màu vàng: Phân tích cú pháp HTML được đo bằng sự kiện DOMContent của trình duyệt
    * Màu xanh lam: Thời gian để hiển thị HTML, chạy JavaScript và tải các hình ảnh. Được đo lường bởi sự kiện load của trình duyệt .
![](https://images.viblo.asia/ea414e32-2a7c-4cf8-a9b8-ec61e49d93ce.png)

## 5. Kết
Đây là một số tính năng trong newrelic mình tìm hiểu được, các bạn có thể tìm hiểu và tham khảo thêm cách sử dụng tại [đây](https://docs.newrelic.com/)