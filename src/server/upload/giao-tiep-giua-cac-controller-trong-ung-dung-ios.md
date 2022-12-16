Một vấn đề phổ biến mà chúng ta thường gặp phải khi phát triển các ứng dụng iOS, là cách cho phép liên lạc giữa các bộ điều khiển của chúng ta.
Ba mẫu phổ biến trong các ứng dụng iOS bao gồm:
1. Delegation
2. Notification
3. Observation

Chúng ta sẽ đi tìm hiểu về từng loại một ngay sau đây.
# 1. Delegaton
  Khi mới bắt đầu lập trình IOS, có thể bạn sẽ thấy rất nhiều việc sử dụng Delegate trong SDK. 
Delegate pattern không phải là một mẫu cụ thể cho iOS, nhưng tùy thuộc vào nền tảng lập trình bạn đã có, có thể không rõ ràng về những lợi thế mà pattern này cung cấp và tại sao nó có vẻ được sử dụng thường xuyên.
    Bản chất của Delegation là tạo ra một protocol mô tả những gì mà delegation cần phải làm. Điều này cho phép phía controller gọi các phương thức đó.
    Bất kì kiểu đối tượng nào cũng có thể tạo ra các delegate 
##  Ưu điểm:
   *  Cú pháp chặt chẽ, tất cả các phương thức thực hiện được định nghĩa trong protocol
   *  Có cảnh báo lỗi nếu có phương thức không được triển khai 
   *  Dễ dàng theo dõi và hiêu được luồng của ứng dụng
   *  Có thể tạo nhiều protocol với 1 controller bằng cách tạo nhiều delegate
   *  Có thể dùng để chuyển dữ liệu qua lại
 ## Nhược điểm:
   * Code tương đối dài, cần xác định protocol, tạo biến delegate, và triển khai các phương thức của protocol
   * Giới hạn với quan hệ kiểu 1-1
# 2. Notification
Trong ứng dụng IOS, có một vài khái niệm về "Notification Center", nó là một đối tượng thông báo cho các đối tượng khác lắng nghe các thông báo
Nó cho phép chúng ta thực hiện được mục tiêu giao tiếp giữa 1 controller với các đối tượng khác một cách đơn giản hơn.
Về cơ bản, phương pháp này là một đối tượng sử dụng một khóa , cho phép các đối tương khác theo dõi các sự kiện xảy ra
Các đối tượng khác không cần biết về controller, nó chỉ nhận thông báo qua khóa
## Ưu điểm:
   * Dễ dàng triển khai với ít dòng lệnh
   * Có thể có nhiều đối tượng phản ứng với 1 thông báo
   * Controller có thể truyền dữ liệu đến các nơi đăng kí thông báo
## Nhược điểm:
   * Không có thời gian biên dịch để kiểm tra để đảm bảo rằng các thông báo được xử lý chính xác bởi các đối tượng đăng kí
   * Cần phải hủy đăng ký với notificaiton center nếu đối tượng đã đăng ký trước đó của bạn được deallocated
   * Cần có bên thứ ba cần thiết để quản lý liên kết giữa bộ điều khiển và đối tượng quan sát.
   * Cả 2 bên cần biết rõ và chính xác về tên của notification và từ khóa
# 3.Observation
Key value observing (KVO) là một pattern trong đó một đối tượng có thể quan sát giá trị các thuộc tính của đối tượng khác.
Hai cách ở trên phù hợp với giao tiếp giữa các Controller, còn với KVO phù hợp hơn với các đối tượng.
Đây cũng là 1 cách giữ cho các đối tượng đồng bộ với nhau hơn. Tuy nhiên chỉ nhận đc thay đổi của thuộc tính chứ không sử dụng được với hàm hay các hành động khác
## Ưu điểm:
   * Cung cấp một cách đơn giản đồng bộ giữa 2 đối tượng
   * Cho phép chúng ta phản ứng khi có thay đổi của thuộc tính khác mà chúng ta không có quyền thay đổi
   * Có thể cung cấp cho chúng ta giá trị trước và sau thay đổi của đối tượng quan sát
   * Sủ dụng key path để truy xuất nên có thể truy xuất vào các đối tượng lồng nhau
## Nhược điểm:
   * Do việc dăng kí quan sát sử dụng các chuỗi kí tự nên không có cảnh báo lỗi khi chạy
   * Nếu biến được quan sát bị refactor sẽ làm việc quan sát mất chính xác
   * Phải sử dụng câu lệnh rẽ nhánh nếu 1 đối tượng quan sát nhiều thuộc tính của đối tượng khác
   * Cần xóa quan sát khi mà đối tượng kia được giải phóng
# 4. Tổng kết
Ở trên đã nêu cơ bản về khái niệm, ưu nhược điểm của từng loại. Dựa vào đó mà các bạn sẽ lựa chọn cho mình một phương pháp phù hơp nhất cho mình

Tài liệu tham khảo: https://shinesolutions.com/2011/06/14/delegation-notification-and-observation/