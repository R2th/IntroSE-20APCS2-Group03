## 1. Giới thiệu

Trình duyệt Web là phần mềm được sử dụng nhiều nhất hiện nay. Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách chúng vận hành, chúng ta sẽ hiểu được những gì xảy ra khi bạn gõ google.com vào thanh địa chỉ và tới khi bạn thấy trang Google được hiện ra trên trình duyệt.

### Các trình duyệt mà chúng ta sẽ đề cập 

Có 5 loại trình duyệt chính được sử dụng trên desktop hiện nay, là Chrome, Internet Explorer, Firefox, Safari và Opera. Trên mobile, các trình duyệt chính là Android Browser, iPhone, Opera Mini và Opera Mobile, UC Browser, và các phiên bản Chrome, ngoại trừ trình duyệt Opera, tất cả đều được dựa theo WebKit. Tôi sẽ lấy ra các ví dụ từ các mã nguồn mở trình duyệt của Firefox và Chrome, Safari ( chỉ có 1 phần là mã nguồn mở ). 

Dựa theo thống kê của StatCounter vào tháng 6 / 2013, thì Chrome, Firefox và Safari chiếm khoảng 71% thời gian sử dụng trình duyệt trên desktop trên toàn cầu. Với mobile, Android Browser, iPhone và Chrome cũng chỉ chiếm khoảng 54%.

### Chức năng chính của trình duyệt 

Chức năng chính của một trình duyệt là biểu diễn tài nguyên web mà bạn đã chọn, thông qua việc yêu cầu server trả về và hiển thị trên cửa sổ trình duyệt. Tài nguyên này luôn là một tài liệu HTML, nhưng cũng có thể là một file PDF, ảnh hay một vài nội dung khác. Vị trí của tài nguyên này được chỉ định bởi người dùng bằng cách sử dụng URI (Uniform Resource Identifier).

Cách trình duyệt thông dịch và hiển thị các file HTML được dựa theo các quy tắc HTML và CSS. Các quy tắc này được xây dựng bởi tổ chức W3C (World Wide Web Consortium), đó là tổ chức tiêu chuẩn cho web. Những năm gần đây, các trình duyệt chỉ tuân thủ một phần các quy tắc này và tự phát triển thêm các công cụ mở rộng riêng. Điều đó dẫn đến các vấn đề tương thích cho các tác giả của các trang web. Ngày này, rất ít trình duyệt tuân thủ các quy tắc tiêu chuẩn đó.

Giao diện người dùng của các trình duyệt có nhiều điểm chung. Đó là:

- Thanh địa chỉ dùng để nhập URI 
- Có các button Back và Forward 
- Có chức năng Bookmarking 
- Refresh và có button ngăn chặn refresh hay dừng việc tải các tài liệu đang chạy.
- Nút Home để chuyển đến trang home của bạn

Nhưng giao diện của các trình duyệt không được yêu cầu tuân thủ theo các quy tắc chính thức nào, nó chỉ dựa theo kinh nghiệm nhiều năm và bắt chước lại các trình duyệt khác. Các đặc điểm của HTML5 cũng không định nghĩa các thành phần UI mà một trình duyệt phải có, nhưng có chứa một vài thành phần chung. Đó là thanh địa chỉ, thanh trạng thái và thanh công cụ. Ngoài ra, cũng có các tính năng chỉ duy nhất trên một trình duyệt, vd như quản lý download trên Firefox.

### Cấu trúc phân cấp của trình duyệt 

Các thành phần chính của một trình duyệt là:

1. Giao diện người dùng:

Nó bao gồm thanh địa chỉ, button back / forward, menu bookmark, ... Mọi thứ mà trình duyệt hiển thị, ngoại trừ cửa sổ chứa trang mà bạn yêu cầu.

2. Engine trình duyệt (Browser engine): 

Sắp xếp các công việc giữa tầng UI và engine render 

3. Rendering engine:

Chịu trách nhiệm cho việc hiển thị nội dung được yêu cầu. VD, nếu nội dung yêu cầu là HTML, rendering engine sẽ phân giải HTML và CSS, và sẽ hiển thị nội dung được phân giải lên màn hình. 

4. Networking: 

Với các lời gọi network như các yêu cầu HTTP thì sử dụng các cách thực thi khác nhau cho các nền tảng khác nhau đằng sau một interface platform độc lập.

5. UI backend: 

Thường dùng để vẽ các widget cơ bản như các box và window. Quá trình này sẽ sử dụng một interface chung, không phụ thuộc một platform nào cả. Ẩn bên dưới là sử dụng các hàm giao diện người dùng của hệ điều hành.

6. Bộ thông dịch Javascript:

Dùng để phân giải và chạy code Javascript.

7. Lưu trữ dữ liệu:

Đây là tầng lưu trữ, trình duyệt cần lưu lại tất cả dữ liệu local , VD như cookies. Các trình duyệt cũng hỗ trợ các công cụ lưu trữ khác như localStorage, IndexedDB, WebSQL và FileSystem. 

![](https://images.viblo.asia/39a028d2-a0bb-4bbe-913e-b078fd3cd586.png)

Có 1 điểm quan trọng cần lưu ý đó là các trình duyệt như Chrome sẽ chạy nhiều instance cho việc rendering engine, mỗi instance là cho từng tab. Mỗi tab sẽ chạy một tiến trình riêng biệt.

## 2. Rendering engine

Nhiệm vụ của rendering engine đó là render, hiển thị nội dung được yêu cầu lên màn hình trình duyệt.

Mặc định là render engine hiển thị các tài liệu HTML và XML và ảnh. Nó có thể hiển thị thêm các loại dữ liệu khác bằng cách sử dụng thêm plug-ins hay extension (các công cụ mở rộng). VD, để hiển thị tài liệu PDF thì sử dụng plugin PDF viewer. Tuy nhiên, trong phần này chúng ta sẽ tập trung chính vào vấn đề, đó là hiển thị HTML và ảnh đã được định dạng bằng CSS.

### Rendering engines

Các trình duyệt khác nhau sử dụng các rendering engines khác nhau: Internet Explorer dùng Trident, Firefox dùng Gecko, Safari sử dụng WebKit. Chrome và Opera ( từ phiên bản 15 ) sử dụng Blink, 1 bản được lấy từ WebKit.

WebKit là rendering engine mã nguồn mở, được sử dụng đầu tiên như một engine cho nền tảng Linux và được chỉnh sửa bởi Apple để hỗ trợ cho Mac và Window. Xem [webkit.org](http://webkit.org/) để biết thêm chi tiết.

### Flow chính

Rendering engine bắt đầu lấy nội dung của tài liệu được yêu cầu từ tầng network. Nó sẽ mất 8kB.

Sau đó, sẽ thực hiện flow cơ bản:

![](https://images.viblo.asia/a053cc8e-d4e3-4e03-9e2c-9a58a6c3d2c2.png)

Công cụ kết xuất sẽ bắt đầu phân tích cú pháp tài liệu HTML và chuyển đổi các phần tử thành các nút DOM trong một cây được gọi là "cây nội dung" (content tree). Công cụ sẽ phân tích cú pháp dữ liệu kiểu, cả trong các tệp CSS bên ngoài và trong các phần tử kiểu. Thông tin tạo kiểu cùng với hướng dẫn trực quan trong HTML sẽ được sử dụng để tạo một cây khác: `render tree`.

`render tree` chứa các hình chữ nhật với các thuộc tính trực quan như màu sắc và kích thước. Các hình chữ nhật theo đúng thứ tự hiển thị trên màn hình.

Sau khi xây dựng render tree, nó sẽ trải qua một quá trình "bố cục" (layout). Điều này có nghĩa là cung cấp cho mỗi nút tọa độ chính xác nơi nó sẽ xuất hiện trên màn hình. Giai đoạn tiếp theo là vẽ - render tree sẽ được duyệt và mỗi nút sẽ được vẽ bằng cách sử dụng lớp phụ trợ giao diện người dùng.

Điều quan trọng là phải hiểu rằng đây là một quá trình dần dần. Để có trải nghiệm người dùng tốt hơn, công cụ kết xuất sẽ cố gắng hiển thị nội dung trên màn hình càng sớm càng tốt. Nó sẽ không đợi cho đến khi tất cả HTML được phân tích cú pháp trước khi bắt đầu xây dựng và bố trí render tree. Các phần của nội dung sẽ được phân tích cú pháp và hiển thị, trong khi quá trình tiếp tục với phần còn lại của nội dung được gửi đến từ mạng.

Trong phần sau, chúng ta sẽ đề cập rõ hơn về các flow trong quá trình render 

Tài liệu tham khảo: https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/