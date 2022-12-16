# Vì sao chúng ta cần localStorage
Nói đến HTTP, nó là dạng kết nối stateless, nghĩa là khi đóng một ứng dụng web, lần truy cập sau mọi thứ bị reset lại như ban đầu.
localStorage đơn giản là nó giúp dev chúng ta lưu lại một vài thông tin ở phía trình duyệt của user, để lần sau truy cập ta có thể truy xuất các thông tin này.
Cookie không đủ xài
Cookie là một dạng file text lưu trên máy tính của user, link đến từng domain. Một vài giới hạn của cookie
Tất cả request đến domain, đều sẽ nhét cái cookie này vào trên header
Tối đa có 4KB dung lượng
# Sử dụng localStorage trên trình duyệt hỗ trợ HTML5
Cú pháp để set, get, delete giá trị của localStorage
*  
* // set
* localStorage.setItem(‘tentui’,’luubinhan’);
*  
* // get
* Var tentui = localStorage.setItem(‘tentui’);
* // -> luubinhan
*  
* // delete
* localStorage.removeItem(‘tentui’);
# Làm việc trên object
Vì khi lưu chúng ta chỉ có thể đưa string vào trong localStorage, để đưa một object
![](https://images.viblo.asia/1ee1e2c3-d8fa-47db-bbc9-32f8bf693fe6.png)
# Thông tin lưu xuống localStorage
* Để cache những dữ liệu lớn, tốn thời gian để load.
* Lưu lại trạng thái của giao diện user đã custom, có thể lưu cả một đoạn HTML xuống localStorage
# Ưu điểm của HTML Web Storage :
HTML Web Storage có thể lưu trữ một lượng data lớn từ 2MB tới 10MB. Giới hạn này phụ thuộc vào browser, protocol (HTTP hoặc HTTPS).

        * Web Storage an toàn hơn: người dúng khó mà có thể tìm ra file lưu Web Storage để sửa data. Tuy vậy thì chúng ta vẫn có thể sửa data Web Storage khi F12 trên trình duyệt.
        * Web Storage cũng lưu trữ ở dưới local nhưng nó không bao giờ được gửi tới web server vì vậy mà không ảnh hưởng tới băng thông.
        * Data được lưu trữ trên một trình duyệt nên không thể truy xuất trên trình duyệt khác.
        * Data được lưu trữ dưới dạng chuỗi JSON.
        * Web Storage là tính năng của HTML5 nhưng nó hỗ trợ đến cả những phiên bản trình duyệt cũ mà hiện tại ít ai dùng.

# Ứng dụng của Web Storage
        * Dùng để lưu những data của user mà được sử dụng nhiều lần trên các phiên làm việc khác nhau (một phiên làm việc được tính là một lần đóng mở tab).
        * Dùng cho các ứng dụng SPA ( Single page application). Thông thường khi xử lí dữ liệu thao tác của user trên 1 page thì chúng ta lưu vào biến javascript. Còn nếu muốn share dữ liệu giữa các page thì có thể dùng Web Storage. Ví dụ lưu thông tin đăng nhập của user, lưu thông tin giỏ hàng, …
        * Không dùng Web Storage để lưu các dữ liệu quan trọng như mật khẩu người dùng, …



`~~tham khao : https://devtg.com/su-dung-localstorage-tren-website-nhu-the-nao-46616.html~~`