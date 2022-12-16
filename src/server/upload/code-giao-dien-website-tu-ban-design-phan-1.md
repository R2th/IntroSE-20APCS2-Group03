Quá trình tạo markup giao diện từ bản thiết kế nên tiến hành theo các bước sau để triển khai viết khoa học, dễ debug
* Phân tích layout tổng quát, chia thành từng block nhỏ
* Phân tích từng block một gồm các element nào
* Triển khai code từng block

### Vài quy tắc
**1. Từ trên xuống dưới**<br>
**2. Từ ngoài vào trong**<br>
Dùng container hay container-fluid<br>
`.container-fluid` khi được áp dụng cho một phần tử sẽ làm cho phần tử này có chiều rộng 100%<br>
`.container `khi được áp dụng cho một phần tử sẽ làm cho phần tử này có chiều rộng dựa trên kích thước chiều rộng màn hình của các thiết bị<br>
**3. Từ trái sang phải**<br>
Xác định row, columns
### Bước 1. Phân tích layout, xác định các block
Ở bước này, nhìn vào bản thiết kế được Designer tạo thành file Photoshop .psd hoặc trên figma dưới dạng các layout gồm nhiều thành phần ghép vào nhau.<br><br>
Dựa vào đó ta xác định bố cục của một page gồm những thành phần nào để xác định cách triển khai mã nguồn HTML khi code ra page đó<br><br>
Một cách phân tích bố cục layout điển hình như sau:
```html
body
   header
      section.top-bar
      section.nav-bar
   main
      section1
      section2
      ...
   footer
```
### Bước 2. Phân tích từng block
Sau khi đã phân tích được layout chung của trang web và xác định các block lớn tạo nên giao diện cho page đó. Chúng ta đi sâu phân tích các block thành các element nhỏ hơn để code từng element nhỏ đó tạo ra giao diện.<br><br>
Ví dụ như phần header của trang Viblo có giao diện như sau:<br><br>
![](https://images.viblo.asia/1b9c8e3f-43e9-4e56-87d2-5f34c4eea165.png)<br>
Từ bản thiết kế này ta xác định header gồm một thanh navbar, thanh navbar gồm Logo ở bên trái rồi đến phần chọn trang con, phần tìm kiếm và nút bấm menu người dùng<br><br>
Ví dụ về phân tích phân tích layout, phân tích các elements trong từng block của trang Viblo như sau:<br><br>
![](https://images.viblo.asia/a370514d-78d1-4c89-a5c9-ffc4ccf8b92f.png)
### Bước 3. Triển khai viết mã nguồn
Viết mã nguồn để tạo ra giao diện sẽ bao gồm 3 phần chính đó là mã nguồn HTML, CSS (SCSS, SASS), Javascript và Jquery
1. Mã nguồn HTML: sử dụng các thẻ để xác định bộ khung cho page đó
1. Mã nguồn CSS: Sử dụng hệ thống selector (tag, class, id,...) để tạo phong cách và định kiểu cho HTML. Nó có thể điều khiển định dạng của nhiều trang web cùng lúc để tiết kiệm công sức cho người viết web. Nó phân biệt cách hiển thị của trang web với nội dung chính của trang bằng cách điều khiển bố cục, màu sắc, và font chữ.
1. Mã nguồn Js và Jquey: sử dụng dùng để xử lý động cho trang web, điều khiển các hoạt động click, hover, scroll,..các thành phần trong web
#### Viết mã nguồn HTML
Để viết mã nguồn tạo ra bộ khung cho trang web ở đây mình sẽ dùng pug và HTML5 như [bài viết trước đó](https://viblo.asia/p/bat-dau-code-frontend-oOVlYbBo58W) mình đã có nói<br>
Hệ thống các thẻ (tag) mà HTML5 cung cấp các bạn có thể xem ở [w3school](https://www.w3schools.com/html/default.asp). Mình phân nó thành một số nhóm thẻ sau: <br>
* Nhóm thẻ cấu trúc: tạo ra bố cục cho page
* Nhóm thẻ heading: tạo ra phần tiêu đề
* Nhóm thẻ xác định văn bản: tạo nội dung cho page
* Nhóm thẻ danh sách: tạo nội dung kiểu danh sách
* Nhóm thẻ liên kết, media: tạo ảnh, video, liên kết cho page
* Nhóm thẻ tạo bảng: tạo bảng dữ liệu hoặc tạo layout
* Nhóm thẻ liên quan đến form: tạo form nhập liệu

=> Từ các nhóm thẻ này, chúng ta sẽ tạo ra được phần khung. Sau đó chúng ta sẽ viết mã nguồn CSS để biến bản design thành giao diện web
<br><br>***Một số lưu ý khi code HTML tạo bộ khung cho page:***
* Sử dụng thẻ section và div để tạo các block, các element
* Một số block chung nên viết riêng thành một file như sidebar, navbar, header, footer,..
* Xác định name, khai báo class, id đặt tên theo chuẩn BEM khi website gồm nhiều page phức tạp
#### Đặt tên theo chuẩn BEM
BEM là viết tắt của Block-Element-Modifier, là một tiêu chuẩn quy ước đặt tên cho các tên lớp CSS. BEM giúp cho việc code Frontend dễ đọc và dễ hiểu hơn, dễ làm việc và dễ mở rộng cũng như bảo trì khi làm việc với CSS. <br>
Quy ước đặt tên
```css
.block {} /* Block */
.block__element {}  /* Element */
.block--modifier {}  /* Modifier */
```
**1. Block:** Là một thành phần của trang web hay ứng dụng đó, các thành phần của DOM cũng có thể là các block. Block ở đây thường là các thành phần header, body, content, footer. Ví dụ section td bên dưới tập hợp các block sau:
```css
.td__container làm nhiệm vụ cân max width và padding left right
.td__inner làm nhiệm vụ cân padding top bottom và điểm bám cho các element absolute. VD: chỉnh một button…
.td__header chứa Sub-title.
.td__content chứa Headline và Description.
.td__footer chứa button CTA.
```
Các prefix của các class đều là td giúp chúng ta có thể nhận diện section khi muốn update mục tương ứng trong css.

**2. Elements**: Là một thành phần của một block và sẽ không tồn tại độc lập mà không có block vì được đặt bên trong nó, và chúng phụ thuộc vào parent block của nó. Trong BEM, các phần tử được biểu thị bằng dấu gạch dưới kép __.
```css
.td__headline là Text cỡ lớn. Style thường là H1 hoặc H2.
.td__intro, .td__description làm mô tả content.
.td__image chứa ảnh.
.td__button với style riêng cho button trong section này.
```
**3. Modifers**: Được dùng để thao tác thay đổi cách hiển thị trên block hoặc phần tử
Ví dụ mình muốn tạo thêm một block .block__elem khác nữa và muốn làm nổi bật nó thì sẽ thêm một class .block__elem--hightlight để tạo sự khác biệt đó
### Tổng kết
Trên đây, mình đã trình bày các bước đầu tiên để code giao diện từ bản thiết kế. Bài viết tới mình sẽ viết về cách viết mã nguồn css và js, mong các bạn sẽ đón đọc