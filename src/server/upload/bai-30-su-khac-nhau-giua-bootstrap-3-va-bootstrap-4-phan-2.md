Chào các bạn,

Tiếp nối bài viết trước [Sự khác nhau giữa Bootstrap 3 và Bootstrap 4](https://viblo.asia/p/bai-29-su-khac-nhau-giua-bootstrap-3-va-bootstrap-4-phan-1-RnB5pB4JZPG) bài này mình liệt kê tiếp những phần khác cho các bạn cùng tham khảo nhé!


| **Component**	 | **Bootstrap 3** | **Bootstrap 4** |
| -------- | -------- | -------- |
| **Buttons**     |      |      |
|  Styles  |Bao gồm các class .btn-default và .btn-info. Riêng với class .btn-secondary không được sử dụng trong Bootstrap 3.| Giới thiệu tới người sử dụng class .btn-secondary, .btn-light, và .btn-dark. Ngưng sử dụng class .btn-default. Trường hợp đặc biệt là class .btn-info đã bị ngừng sử dụng nhưng sau đó lại được dùng trở lại.   |
|  Outline Buttons  |   Không hỗ trợ.   |   Giới thiệu class .btn-outline-* để style cho các button outline với các màu outline tới người sử dụng.    |
|  Button Sizes  |   Class .btn-xs được sử dụng.   |   Loại bỏ class .btn-xs. Chỉ sử dụng các class .btn-sm và .btn-lg để định nghĩa size co button.  |
|  **Input groups**  | 
|  Classes  |   Bootstrap 3 sử dụng .input-group-addon và .input-group-btn classes.   |   Bootstrap 4 đã loại bỏ 2 class .input-group-addon và .input-group-btn classes. Thay vào đó là 2 class .input-group-prepend và .input-group-append.  Ngoài ra, Bootstrap 4 còn thêm class .input-group-text cho các đoạn text trong group|
|   **Images** |
|  Responsive Images  |   Sử dụng .img-responsive class.   |   Sử dụng .img-fluid class.   |
|  Image Alignment  |   Sử dụng các classes .pull-right, .pull-left, và .center-block  để hỗ trợ việc căn chỉnh ảnh |  Sử dụng .m-x-auto thay vì .center-block  để căn chỉnh. Trong Bootstrap 4 có thể sử dụng các class hỗ trợ responsive như pull-#-right và .pull-#-left hoặc có thể sử dụng các class .text-#-left, .text-#-center, and .text-#-right cho các thành phần cha chứa image cần chỉnh. Ngoài ra có thể sử dụng class .pull-#-none để disable floating (# là các class md, lg, xl). |
|  **Media Objects**  |
|  Classes  |   Bootstrap 3 sử dụng khá nhiều các class khác nhau cho phần media, bao gồm: media, .media-body .media-object, .media-heading, .media-right, .media-left, .media-list và .media-body.   |   Bootstrap 4 chỉ sử dụng duy nhất 1 class .media. Khoảng cách được áp dụng khi sử dụng các class trong phần **spacer utilities**.  Bootstrap 4 sử dụng flexbox cho mọi thành phần nên media cũng  áp dụng flexbox.|
|  **Dropdowns**  |  
| Structure   |  Áp dụng dropdown list (Ví dụ: sử dụng <ul> và <li>) .   |  Dropdown có thể built từ <ul> hoặc <div> bằng cách thêm class .dropdown-item vào <a> hoặc <button>. Tất cả các thành phần này được gói gọn trong trong 1 <div> hoặc <ul> với class .dropdown-menu.   |
|  Menu Headers  |   Thêm class .dropdown-header cho <li> .  |   Thêm class .dropdown-header  cho <h1> hoặc <h2> |
|  Dividers  |Thêm class .divider cho <li> bởi bootstrap 3 sử dụng lists tag để tạo dropdown.     |  Sử dụng class .dropdown-divider cho <div> element.    |
|  Disabled Menu Items  |Sử dụng class .disabled thêm vào <li> element|  Thêm class .disabled cho <a> element.    |
| **Button Groups**   | 
|  Justified?  |   Hỗ trợ justified cho button groups thông qua việc sử dụng class .btn-group-justified.  |   Không hỗ trợ.   |
|  Extra Small?  |   Hỗ trợ sử dụng kích thước nhỏ cho button groups thông qua việc sử dụng class .btn-group-xs.   |  Không hỗ trợ do đã bỏ class .btn-group-xs.    |
| **Navbars** |
| Colors |   Giới hạn phần tùy chọn màu sắc có sẵn trong phần cài đặt   |  Có thêm các option mới  bằng cách sử dụng 2 class .navbar-light và the .navbar-dark. Cho phép sử dụng class .bg-* để trong phần navbars (* ở đây là các màu).  |
| Navbar Alignment |   Sử dụng .navbar-right, .navbar-left class để căn chỉnh các thành phần trong navbar.  |   Không khuyến khích sử dụng các class   pull-#-right và .pull-#-left hoặc .pull-#-none  (# là các class md, lg, xl). Thay vào đó, có thể sử dụng flexbox hoặc các class trong phần spacing utilities.|
| Navbar Forms |   Thêm class .navbar-form cho form nếu sử dụng form trong navbars.   |   Bootstrap 4 không sử dụng class .navbar-form bởi nó không cần thiết nữa.   |
|  Fixed Navbars|   Sử dụng class .navbar-fixed-top hoặc .navbar-fixed-bottom để fix navbar ở top hoặc bottom. |Thay đổi thành sử dụng 2 class .fixed-top và .fixed-bottom để cố định vị trí của navbar ở top hoặc bottom.|

    
Vậy là qua 2 bài, các bạn cũng đã biết được kha khá sự thay đổi, nâng cấp của bootstrap 4 so với bootstrap 3.
Theo như cuối bài phần 1, mình có nói bài này sẽ liệt kê hết các phần khác nhau còn lại giữa bootstrap 3 và bootstrap 4. Tuy nhiên nó còn khá ài, vì vậy mình quyết định cắt sang phần 3. Và phần 3 cũng là phần kết thúc luôn.

Bài viết được tham khảo từ: https://www.quackit.com/bootstrap/bootstrap_4/differences_between_bootstrap_3_and_bootstrap_4.cfm