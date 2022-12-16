Bài viết này là một phần của bài viết [[JavaScript] Bài 13 - Event & Listener](https://viblo.asia/p/RnB5pA0wKPG) trong [Series Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m).

Trong bài viết này, chúng ta sẽ cùng xây dựng một thanh điều hướng phụ đơn giản thường được đặt ở bên cạnh khối hiển thị nội dung chính của trang web. Bên cạnh đó, chúng ta sẽ thử bổ sung một tính năng đơn giản giúp người dùng lọc nhanh danh sách các liên kết bằng cách nhập từ khóa vào một ô nhập liệu ở phần đầu của thanh điều hướng.

[Xem kết quả dự kiến](https://codepen.io/semiarthanoi/full/WNdpBMw)

## 1. Chuẩn bị code HTML

Vẫn như thường lệ thì chúng ta sẽ khởi đầu với một khuôn mẫu HTML cơ bản chưa có nội dung. :D

```sidenav.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <!-- Tabbar -->
   <title>Sidenav w/ Filter</title>
   <link rel="icon" type="image/x-icon" href="/images/favicon.ico">
   <!-- StyleSheet -->
   <link rel="stylesheet" href="sidenav.css">
</head>
<body>
   <!-- Start coding here... -->
   <!-- JavaScript -->
   <script src="sidenav.js"></script>
</body>
</html>
```

Trước hết chúng ta cần dàn bố cục chính của trang web để thể hiện được vị trí mà thanh điều hướng phụ `sidenav` của chúng ta sẽ được đặt trên trang. Ở đây để tiết kiệm thời gian cho nội dung chính cần quan tâm là khối `sidenav` nên chúng ta sẽ chọn một bố cục đơn giản với -

- Một thanh điều hướng chính `topbar`
- Một khối hiển thị nội dung chính `main`
- Sau đó tới thanh điều hướng `sidenav`
- Và cuối cùng là phần chân trang web `footer`.

```sidenav.html
<nav class="topnav">T o p - N a v i g a t i o n - B a r</nav>
<article class="main">M a i n - C o n t e n t</article>
<aside class="sidenav">
   <!-- Code `sidenav` viết ở đây -->
</aside>
<footer class="footer">F o o t e r</footer>
```

Cụ thể hơn về khối `.sidenav`, chúng ta có các thành phần chính là -

- Một `form` nhập liệu `.sidenav-filter` được sử dụng để người dùng nhập từ khóa và lọc nhanh các liên kết liên quan.
- Các danh sách liên kết `.sidenav-nav` tương ứng với các hạng mục nội dung của trang web.

Và để thiết lập khoảng cách giữa các thành phần với khung `.sidenav` được đồng đều thì chúng ta sẽ đặt tất cả vào trong một `.container` tiện ích chung.

```sidenav.html
<aside class="sidenav">
   <div class="container">
      <!-- Ô Nhập Từ Khóa -->
      <div class="sidenav-filter">
         <input id="sidenav-input"  type="text" placeholder="Tìm bài viết ....">
         <button id="sidenav-button">&lt;</button>
      </div>
      <!-- Danh Sách Liên Kết - 1 -->
      <div class="sidenav-navlist">
         <span class="sidenav-header">HTML</span>
         <a class="sidenav-link" href="#" data-tag="html,begin">Tạo Một Trang Web</a>
         <a class="sidenav-link" href="#" data-tag="html,image,link">Chèn Ảnh & Liên Kết</a>
         <!-- 1001 liên kết nữa ở đây :D -->
         <a class="sidenav-link" href="#" data-tag="html,graphic,data">Các Thẻ Đồ Họa & Dữ Liệu</a>
      </div>
      <!-- Danh Sách Liên Kết - N -->
      <div class="sidenav-navlist">
         <span class="sidenav-header">CSS</span>
         <a class="sidenav-link" href="#" data-tag="css,begin">CSS Là Cái Gì?</a>
         <a class="sidenav-link" href="#" data-tag="css,selector,priority">Bộ Chọn & Ưu Tiên</a>
         <!-- 1001 liên kết nữa ở đây :D -->
         <a class="sidenav-link" href="#" data-tag="css,grid,flex">Grid & Flex</a>
      </div>
   </div><!-- .container -->
</aside>
```

Ở đây `form` nhập từ khóa `.sidenav-filter` của chúng ta sẽ bao gồm 2 thành phần là một ô nhập liệu `#sidenav-input` và một nút nhấn `#sidenav-button` để xóa nội dung đã nhập. Tuy nhiên chúng ta không sử dụng thẻ `<form>` mà dùng `<div>` vì không cần chuyển yêu cầu của người dùng tới máy chủ web nào cả. :D

Tiếp đến là các danh sách liên kết `.sidenav-nav` với mỗi danh sách sẽ bao gồm một tiêu đề của hạng mục nội dung `.sidenav-header` và các liên kết tới các bài viết `.sidenav-link`. Ở đây chúng ta sử dụng thuộc tính `data-*` để gắn các từ khóa của bài viết với các liên kết. Và khi người dùng nhập từ khóa để tìm kiếm, nếu từ khóa vừa nhập xuất hiện trong tiêu đề của liên kết hoặc trong `data-tag` thì chúng ta sẽ để liên kết hiển thị bình thường. Trong trường hợp còn lại thì liên kết sẽ được ẩn đi để làm ngắn danh sách và người dùng có thể lọc được bài viết liên quan.

Bạn có thể tạo ra nhiều danh sách liên kết để có thể dễ dàng chạy thử tính năng của bộ lọc. Dưới đây là tập các liên kết bạn có thể copy/paste để sử dụng.

```links.html
<!-- Danh mục HTML -->
<a class="sidenav-link" href="#" data-tag="html,begin">Tạo Một Trang Web</a>
<a class="sidenav-link" href="#" data-tag="html,image,link">Chèn Ảnh & Liên Kết</a>
<a class="sidenav-link" href="#" data-tag="html,embed,content">Các Nội Dung Nhúng</a>
<a class="sidenav-link" href="#" data-tag="html,container">Các Thẻ Container</a>
<a class="sidenav-link" href="#" data-tag="html,list,table">Danh Sách & Bảng Biểu</a>
<a class="sidenav-link" href="#" data-tag="html,text,format">Các Thẻ Định Dạng Chữ</a>
<a class="sidenav-link" href="#" data-tag="html,input,form">Nhập Liệu & Biểu Mẫu</a>
<a class="sidenav-link" href="#" data-tag="html,input,other">Các Thành Phần Nhập Liệu</a>
<a class="sidenav-link" href="#" data-tag="html,graphic,data">Các Thẻ Đồ Họa & Dữ Liệu</a>
<!-- Danh mục CSS -->
<a class="sidenav-link" href="#" data-tag="css,begin">CSS Là Cái Gì?</a>
<a class="sidenav-link" href="#" data-tag="css,selector,priority">Bộ Chọn & Ưu Tiên</a>
<a class="sidenav-link" href="#" data-tag="css,color,length">Màu Sắc & Kích Thước</a>
<a class="sidenav-link" href="#" data-tag="css,container,type">Các Kiểu Container</a>
<a class="sidenav-link" href="#" data-tag="css,background">Thuộc Tính Background</a>
<a class="sidenav-link" href="#" data-tag="css,border">Thuộc Tính Border</a>
<a class="sidenav-link" href="#" data-tag="css,position">Thuộc Tính Position</a>
<a class="sidenav-link" href="#" data-tag="css,text,content">Nội Dung Chữ</a>
<a class="sidenav-link" href="#" data-tag="css,selector,combine">Kết Hợp Bộ Chọn</a>
<a class="sidenav-link" href="#" data-tag="css,pseudo,class">Class Giả Định</a>
<a class="sidenav-link" href="#" data-tag="css,width,height">Width & Height</a>
<a class="sidenav-link" href="#" data-tag="css,margin,padding">Margin & Padding</a>
<a class="sidenav-link" href="#" data-tag="css,media,query">Truy Vấn Thiết Bị</a>
<a class="sidenav-link" href="#" data-tag="css,framework,icon">Frameworks & Icons</a>
<a class="sidenav-link" href="#" data-tag="css,transition">Hiệu Ứng Chuyển Tiếp</a>
<a class="sidenav-link" href="#" data-tag="css,animation">Hoạt Ảnh Tự Tạo</a>
<a class="sidenav-link" href="#" data-tag="css,function,variable">Hàm & Biến</a>
<a class="sidenav-link" href="#" data-tag="css,grid,flex">Grid & Flex</a>
<!-- Danh mục Bootstrap -->
<a class="sidenav-link" href="#" data-tag="bootstrap,begin">Bootstrap Là Cái Gì?</a>
<a class="sidenav-link" href="#" data-tag="bootstrap,component,utility">Components & Utilities</a>
<a class="sidenav-link" href="#" data-tag="bootstrap,content,layout">Content & Layout</a>
<!-- Danh mục JavaScript -->
<a class="sidenav-link" href="#" data-tag="javascript,js,begin">JavaScript Là Cái Gì?</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,type,variable">Kiểu & Biến</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,function,scope">Hàm & Vùng</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,object,everything">Object & Everything</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,document,event">Document & Event</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,conditional">Cấu Trúc Điều Kiện</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,collection,looping">Collection & Looping</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,window,request">Window & Request</a>
<a class="sidenav-link" href="#" data-tag="javascript,js,library,framework">Library & Framework</a>
<!-- Danh mục jQuery -->
<a class="sidenav-link" href="#" data-tag="jquery,begin">jQuery Là Cái Gì?</a>
<a class="sidenav-link" href="#" data-tag="jquery,selector,method">Bộ Chọn & Thao Tác</a>
<a class="sidenav-link" href="#" data-tag="jquery,effect,request">Hiệu Ứng & Yêu Cầu</a>
<!-- Danh mục Sample -->
<a class="sidenav-link" href="#" data-tag="sample,html,css,navbar,simple">Navbar Đơn Giản</a>
<a class="sidenav-link" href="#" data-tag="sample,html,css,navbar,responsive">Navbar Responsive</a>
<a class="sidenav-link" href="#" data-tag="sample,html,css,carousel,simple">Carousel Đơn Giản</a>
<a class="sidenav-link" href="#" data-tag="sample,html,css,javascript,js,dropdown,simple">1001 Dropdown</a>
```

![](https://images.viblo.asia/6e9f9450-61ee-400f-a935-e3e97ea7544d.png)

Bây giờ thì chúng ta đã có thể bắt đầu viết code CSS và JavaScript được rồi. :D

## 2. Viết code CSS cho .sidenav

Ở đây chúng ta vẫn sẽ xuất phát với thao tác `reset CSS` căn bản.

```sidenav.css
   /* Reset CSS */

* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}
```

### 2.1 Dàn chỉnh bố cục chính của trang

Để nhanh chóng dàn chỉnh bố cục chính của trang web và định hình khu vực sử dụng khối điều hướng phụ `.sidenav` thì chúng ta có thể sử dụng [nhóm thuộc tính `grid`](https://viblo.asia/p/naQZRRwvZvx). Từ kết quả dự kiến thì chúng ta sẽ đặt màu nền tối cho thanh điều hướng `.topnav` và khối chân trang web `.footer`; Và khối `.sidenav` sẽ có viền bên phải màu xám để phân tách với khối hiển thị thông tin chính `.main`

```sidenav.css
   /* Templating */

body {
   /* --- aligning */
   display: grid;
   grid-template:
      "topnav  topnav "
      "sidenav main   "
      "footer  footer "
      / 300px  1fr;
}

.topnav {
   /* --- coloring */
   color: white;
   background: black;
   /* --- sizing */
   width: 100%;
   height: 54px;
   /* --- positioning */
   grid-area: topnav;
}

.sidenav {
   /* --- coloring */
   background: white;
   border-right: 2px solid lightgray;
   /* --- positioning */
   grid-area: sidenav;
}

.main {
   /* --- coloring */
   background: white;
   /* --- positioning */
   grid-area: main;
}

.footer {
   /* --- coloring */
   color: white;
   background: black;
   /* --- sizing */
   height: 450px;
   /* --- positioning */
   grid-area: footer;
}
```

![](https://images.viblo.asia/9a59fd0e-df7a-4593-8730-c93239acb056.png)

Như vậy là chúng ta đã có được bố cục chính của trang web với 4 khối được đặt ở các vị trí như trong kết quả dự kiến. Tuy nhiên để có thêm nhiều cảm hứng hơn và tiếp tục công việc thì chúng ta có thể thực hiện thao tác canh chỉnh đơn giản cho phần nội dung chữ tạm thời của các khối `.topbar`, `.main`, và `.footer`. :D

```sidenav.css
   /* Mockup Content */

.topnav {
   /* --- content */
   font-family: 'Noto Serif', 'Times New Roman', serif;
   font-size: 18px;
   font-weight: bold;
   /* --- aligning */
   text-align: center;
   line-height: 54px;
   word-spacing: 18px;
}

.main {
   /* --- content */
   font-size: 90px;
   /* --- aligning */
   text-align: center;
   padding-top: 108px;
}
```

![](https://images.viblo.asia/4190a00f-c5df-4030-8008-98ce9a1f86e7.png)

Bây giờ chúng ta đã có cảm giác gì đó như thể là công việc sắp hoàn thành rồi. Chỉ còn mỗi cái `.sidenav` nữa là xong thôi. :D

### 2.2 Bộ lọc .sidenav-filter

Để bắt đầu viết code cho khối `.sidenav` thì chúng ta sẽ tạo `padding` cơ bản cho `.container` dùng chung trong các thành phần của trang web. Container này thường được sử dụng cho tất cả các thành phần của trang web để tạo một khoảng `padding` cơ bản để tách nội dung khỏi 2 cạnh của container cha ở bên ngoài.

Trong trường hợp khác, nếu container cha có chiều rộng `rất lớn` ví dụ như phần hiển thị nội dung bài viết `.main`, thì container này còn được sử dụng để giới hạn độ rộng của dòng chữ ở khoảng `~ 700-800px`, giúp đảm bảo người dùng sẽ có trải nghiệm đọc tốt hơn và dễ theo dõi nội dung ở các thời điểm đọc hết dòng và chuyển tới đầu dòng tiếp theo.

```sidenav.css
   /* Common Container */

.container {
   /* --- sizing */
   display: block;
   max-width: 720px;
   padding: 0 15px;
   /* --- positioning */
   margin: 0 auto;
}
```

Thành phần đầu tiên là bộ lọc `.sidenav-filter`. Các tác vụ cần thực hiện của chúng ta về cơ bản vẫn chia làm 2 phần như trên.

- Thiết lập màu sắc, kích thước, và canh chỉnh vị trí của các phần tử.
- Thiết lập font chữ cho nội dung và canh chỉnh vị trí của nội dung.

Phần công việc đầu tiên thì chúng ta cần đảm bảo tổng chiều rộng của ô nhập liệu `#sidenav-input` và nút nhấn `#sidenav-button` là `100%` của container cha `.container`. Do nút nhấn `#sidenav-button` có nội dung rất ngắn, chúng ta sẽ chỉ định chiều rộng và chiều cao cố định. Sau đó sử dụng hàm `calc()` để thiết lập độ rộng tương quan cho ô nhập liệu `#sidenav-button`.

Tuy nhiên còn một vấn đề nhỏ nữa đó là 2 thành phần này đều là các khối `inline-block` và với kích thước font mặc định thì trình duyệt web sẽ đặt 2 khối này cách nhau một khoảng nhỏ chừng `~5px`. Do đó chúng ta cần giảm khoảng cách này đi bằng cách sử dụng thuộc tính `word-spacing` cho `.sidenav-filter` hoặc `.sidenav-filter > .container`.

```sidenav.css
   /* Sidenav Filter */

.sidenav-filter {
   /* --- coloring */
   background: royalblue;
   /* --- positioning */
   margin: 24px 0;
   /* --- aligning */
   word-spacing: -5px;
}

#sidenav-input {
   /* --- coloring */
   border: 1px solid royalblue;
   /* --- sizing */
   width: calc(100% - 48px);
   height: 45px;
}

#sidenav-input::placeholder {
   color: lightgray;
}

#sidenav-button {
   /* --- coloring */
   color: white;
   background: royalblue;
   border: 1px solid royalblue;
   /* --- sizing */
   width: 48px;
   height: 42px;
   /* --- */
   cursor: pointer;
}
```

Sau khi đã có một khối `.sidenav-filter` lấp đầy chiều rộng của container cha bên ngoài, chúng ta cần thực hiện thiết lập phong cách hiển thị và canh chỉnh cho nội dung chữ bên trong ô nhập liệu và nút nhấn.

```sidenav.css
   /* Filter's Content */

#sidenav-input {
   /* --- content */
   font-size: 16px;
   /* --- aligning */
   line-height: 45px;
   padding: 0 15px;
}

#sidenav-button {
   font-size: 18px;
   font-weight: bold;
}
```

![](https://images.viblo.asia/cd7c9972-656e-4e9c-9973-3e643838af2a.png)

## 2.3 Các danh sách liên kết .sidenav-navlist

Để khiến cho các tiêu đề danh mục `.sidenav-header` và các liên kết `.sidenav-link` hiển thị theo danh sách dọc thì chúng ta chỉ cần đặt kiểu container cho tất cả các phần tử là `block` thay vì mặc định đang là `inline`. Tuy nhiên chúng ta có thể cân nhắc thêm việc đẩy các liên kết lui về phía bên phải một nút để các danh mục được nổi bật hơn. :D

Ngoài ra thì chúng ta còn một lưu ý quan trọng khác đó là cần phải tạo thêm 1 thẻ trạng thái `.hidden` để biểu thị cho trạng thái liên kết được ẩn đi khi không phù hợp với từ khóa người dùng nhập vào bộ lọc.

```sidenav.html
   /* Sidenav Navlist */

.sidenav-header,
.sidenav-link {
   display: block;
   padding: 9px 15px;
}

.sidenav-link {
   padding-left: 39px;
}

.sidenav-link {
   color: royalblue;
}

.sidenav-link:hover {
   color: dodgerblue;
}

.sidenav-link.hidden {
   display: none;
}
```

![](https://images.viblo.asia/fc655b98-ea00-493d-b1dd-dffbeabf441e.png)

Sau khi chúng ta đã có các danh sách liên kết hiển thị thẳng hàng ngay ngắn, việc cần làm là hoàn thiện phong cách hiển thị của nội dung chữ.

```sidenav.css
   /* Navlist's Content */

.sidenav-navlist {
   counter-reset: nthLink;
}

.sidenav-navlist > .sidenav-link::before {
   counter-increment: nthLink;
   content: counter(nthLink) ". ";
}

.sidenav-header,
.sidenav-link {
   font-family: 'Noto Sans', Arial, sans-serif;
   text-decoration: none;
}

.sidenav-header {
   font-weight: bold;
}
```

Cuối  cùng là bổ sung thêm 1 chút `padding` cho `.sidenav` để nội dung bên trong cách cạnh trên và dưới thêm 1 chút.

```sidenav.css
   /* Extra Padding */

.sidenav {
   padding-top: 15px;
   padding-bottom: 39px;
}
```

![](https://images.viblo.asia/789ac22e-cc8c-4f5a-b0c7-a715facb6a5d.png)

Như vậy là công việc viết code CSS cho thanh điều hướng phụ của chúng ta đã hoàn tất. Chúng ta bắt đầu viết code JavaScript để bổ sung tính năng lọc danh sách đi thôi. :D

## 3. Viết code JavaScript cho .sidenav-filter

Trước khi bắt tay vào viết code, chúng ta cần điểm lại một vài yếu tố chính của tính năng này. :D

- Đối với ô nhập liệu `#sidenav-input`, khi người dùng nhấn một phím nào đó để nhập một chữ cái, chúng ta cần thực hiện lọc danh sách ban đầu để ẩn đi những liên kết không phù hợp. Và mỗi khi người dùng xóa đi một chữ cái, chúng ta cũng cần thực hiện thao tác lọc danh sách ban đầu để cho hiện lại những liên kết phù hợp với từ khóa.
- Đối với nút nhấn `#sidenav-button` dùng để xóa nội dung trong ô nhập liệu thì chúng ta chỉ cần cho hiện lại đầy đủ tất cả các danh sách. Hoặc một cách làm khác là chúng ta cứ xóa nội dung trong ô nhập liệu sau đó kích hoạt một sự kiện nhấn phím cho `#sidenav-input` để giả định là người dùng thao tác nhấn phím xóa ký tự. Như vậy cũng hợp lý phải không? :D

Việc viết code xử lý cho nút nhấn `#sidenav-button` thì chắc là không có gì để chúng ta phải băn khoăn quá nhiều ở thời điểm hiện tại. Tuy nhiên hãy nói thêm một chút về đối tượng chính ở đây là ô nhập liệu `#sidenav-input`. 

Giả sử chúng ta đang ở thời điểm người dùng đã nhập một vài từ khóa nào đó và đã có khoảng 1/2 số liên kết không phù hợp được ẩn đi. Bây giờ khi người dùng nhấn thêm một phím nào đó để xóa hoặc thêm một ký tự, thì code của chúng ta sẽ cần làm những việc sau -

- Truy vấn tất cả các liên kết `.sidenav-link` - bao gồm cả những liên kết đang hiện và đang ẩn.
- Lọc ra những liên kết phù hợp với đoạn từ khóa đang có trong ô nhập liệu `#sidenav-button`.
- Tiếp tục lọc ra những liên kết đang bị ẩn trong tập kết quả phù hợp.
- Sau đó xóa bỏ class `.hidden` để những liên kết này được hiển thị lại.

Một cách xử lý khác đó là chúng ta sẽ làm việc với 2 nhóm liên kết `đang ẩn` và `đang hiện` riêng biệt -

- Truy vấn 2 nhóm liên kết `đang ẩn` và `đang hiện` lưu vào 2 biến khác nhau.
- Ở nhóm liên kết đang ẩn, lọc ra những liên kết phù hợp với đoạn từ khóa.
- Xóa class `.hidden` để cho các liên kết phù hợp hiện trở lại.
- Ở nhóm liên kết đang hiện, lọc ra những liên kết `không` phù hợp với đoạn từ khóa.
- Thêm class `.hidden` để ẩn những liên kết `không` phù hợp đi.

Cho dù là phương án xử lý nào đi chăng nữa thì chúng ta vẫn sẽ phải làm việc với đầy đủ danh sách liên kết ban đầu. Và thực hiện tới 2 lần lặp để kiểm tra tính phù hợp của các liên kết với đoạn từ khóa trong `#sidenav-input`. Nguyên do là cả 2 phương cách xử lý vấn đề này đều xuất phát từ thao tác khách quan tác động lên trạng thái của tập hợp các liên kết `.sidenav-link`.

```
[#sidenav-input]
   "Khi từ khóa thay đổi, tôi sẽ tìm tới tất cả 
   các liên kết và thực hiện kiểm tra từng liên kết 
   để thiết lập trạng thái ẩn/hiện của liên kết đó."
```

Bây giờ chúng ta hãy thử nhìn vấn đề theo một cách khác. Giả sử chúng ta có thể chia khối công việc cần làm cho các liên kết tự thực hiện chứ không tác động chỉnh sửa can thiệp vào từ đâu đó khác. Khi có một sự kiện người dùng được phát động, mỗi liên kết sẽ tự kiểm tra xem nội dung của mình có phù hợp với đoạn từ khóa hay không. Và sau đó tự điều chỉnh trạng thái `ẩn/hiện` một cách chủ quan. Như vậy sẽ thật tuyệt. :D

```
[.sidenav-link]
   "Khi nào từ khóa thay đổi thì chỉ cần thông báo cho 
    chúng tôi thôi. Mỗi thành viên trong nhóm sẽ tự 
    tìm đến #sidenav-input để kiểm tra xem mình có 
    phù hợp không và tự điều chỉnh trạng thái ẩn/hiện."
```

Nếu có thể viết code triển khai logic chủ quan cho các liên kết như vừa nói, chúng ta sẽ không cần phải sàng lọc các tập kết quả nhiều lần để phân loại các liên kết. Lối tư duy này có vẻ như không yêu cầu khả năng phỏng đoán kết quả lọc các danh sách và dường như sẽ có ít khả năng để chương trình xảy ra lỗi hơn. Vậy chúng ta sẽ thử viết code xử lý theo hướng tư duy vừa thảo luận nhé - `Các liên kết sẽ tự thực hiện kiểm tra tính phù hợp với đoạn từ khóa trong ô nhập liệu và tự điều chỉnh trạng thái ẩn/hiện nếu cần thiết.` :D

### 3.1 Tổng quan các hàm xử lý chính

Đầu tiên chúng ta sẽ chuẩn bị phần khung của chương trình - 

- Các liên kết `.sidenav-link` sẽ được gắn hàm xử lý sự kiện `updateVisibility` để tự kiểm tra từ khóa và cập nhật trạng thái hiển thị mỗi khi nhận được thông báo `nội dung trong ô nhập liệu đã được cập nhật`.
- Ô nhập liệu `#sidenav-input` sẽ được gắn hàm xử lý `notifyAllLinks` để thông báo sự kiện cho các liên kết là `nội dung trong ô nhập liệu đã được cập nhật`.
- Nút nhấn `#sidenav-button` sẽ được gắn hàm xử lý `clearInput` để khi nhận được click thì xóa nội dung trong ô nhập liệu. Sau đó gắn thêm hàm xử lý `notifyAllLinks` để thông báo sự kiện cho các liên kết là `nội dung trong ô nhập liệu đã được cập nhật`.

```sidenav.js
   /* Event Listeners */

const updateVisibility = function(event) {};
const notifyAllLinks = function(event) {};
const clearInput = function(event) {};

   /* Start Program */

void function() {
   // --- Links Binding
   var sidenavLinkArray = queryAllLinks();
   var bindListener = (link) => link.addEventListener('input:updated', updateVisibility);
   sidenavLinkArray.forEach(bindListener);
   // --- Input Binding
   var sidenavInput = document.querySelector('#sidenav-input');
   sidenavInput.addEventListener('keyup', notifyAllLinks);
   // --- Button Binding
   var sidenavButton = document.querySelector('#sidenav-button');
   sidenavButton.addEventListener('click', clearInput);
   sidenavButton.addEventListener('click', notifyAllLinks);
} ();
```

Như vậy là chúng ta đã có phần khung chương trình với 3 hàm xử lý sự kiện chính được gắn vào các phần tử tương ứng. Ở đoạn gắn hàm xử lý sự kiện cho các liên kết, chúng ta đã tạo ra một tên sự kiện mới là `input:updated`. Và hàm xử lý sự kiện của các liên kết sẽ được kích hoạt nếu như chúng ta gửi tới các liên kết một object `new Event('input:updated')`.

Tức là các sự kiện click chuột `new Event('click')` do trình duyệt tạo ra tại nút nhấn `#sidenav-button`, và các sự kiện nhấn và nhả phím `new Event('keyup')` tại vị trí của ô nhập kiệu `#sidenav-input`, sẽ được code của chúng ta phiên dịch thành duy nhất một kiểu sự kiện chính đó là `new Event('input:updated')` có nghĩa là `ô nhập liệu đã được cập nhật` và chuyển cho các liên kết tự xử lý. :D

### 3.2 Viết code cho các hàm xử lý sự kiện

Bây giờ chúng ta sẽ viết code chi tiết cho các hàm xử lý sự kiện. Có lẽ là chúng ta nên xuất phát từ hàm phiên dịch các sự kiện sang `input:updated` đi. :D

```sidenav.js
const notifyAllLinks = function(
   event = new Event()
) {
   // --- Translate Event
   var inputEvent = new Event('input:updated');
   // --- Notify All Links
   var sidenavLinkArray = queryAllLinks();
   sidenavLinkArray.forEach((link) => link.dispatchEvent(inputEvent));
};
```

Rồi... xong. Ở đây trong phần thân hàm, chúng ta không quan tâm tới sự kiện `event` nhận được là kiểu gì, `click` hay `keyup`. Thay vào đó chỉ đơn giản là bất kỳ khi nào hàm xử lý này được kích hoạt ở vị trí ô nhập liệu `#sidenav-input` hoặc nút nhấn `#sidenav-button` thì chúng ta hiểu rằng `nội dung của ô nhập liệu đã được cập nhật`. Mặc dù nội dung đó có thể thay đổi hoặc không nhưng công việc của hàm xử lý này chỉ đơn giản là thông báo cho `tất cả các liên kết` rằng `input:updated`.

Kế đến sẽ là hàm `clearInput` bởi tác vụ này rất đơn giản. Ở đây chúng ta sẽ chỉ xóa nội dung của ô nhập liệu chứ không thực hiện bất kỳ thao tác nào khác. Công việc thông báo cho các liên kết là nhiệm vụ của hàm `notifyAllLinks`. :D

```sidenav.js
const clearInput = function (
   event = new Event()
) {
   var sidenavInput = document.querySelector('#sidenav-input');
   sidenavInput.value = '';
};
```

Cuối cùng là hàm xử lý sự kiện quan trọng nhất `updateVisibility` - mỗi liên kết sẽ tự mò tới `#sidenav-input` để xem chuỗi từ khóa trong ô nhập liệu, và kiểm tra xem mình có phù hợp không; Sau đó tự ra quyết định ẩn đi hay hiển thị.

```sidenav.js
const updateVisibility = function (
   event = new Event()
) {
   // --- Check Keywords 
   var theLink = event.target;
   var keywords = document.querySelector('#sidenav-input').value;
   var linkMatchesKeywords = checkIfLinkMatchesKeywords(theLink, keywords);
   // --- Update Visibility
   if (linkMatchesKeywords)
      showLink(theLink);
   else
      hideLink(theLink);
};
```

Ở cấp độ của các hàm `EventListener`, chúng ta vẫn thường xử lý việc phân tích sự kiện và ra quyết định về việc cần thực hiện tiếp theo. Sau đó công việc cần thực hiện bằng cách thao tác trên các `object Element` nên được xử lý chi tiết ở các hàm tác vụ phụ `Subsequent Tasks` và các hàm tiện ích `Utility Functions`. Và ở đây chúng ta cũng sẽ thực hiện như vậy với một khung xử lý chính và ủy thác 2 thao tác `ẩn/hiện` cho 2 hàm `hideLink/showLink`.

###  3.3 Viết code cho các hàm xử lý tác vụ phụ

Tuy nhiên, ở vị trí công việc được ủy thác xuống 2 hàm `hideLink/showLink`, chúng ta chưa biết liên kết đó `đang ẩn` hay `đang hiện`; Do đó các hàm này sẽ cần phải thực hiện thao tác kiểm tra trạng thái hiện tại của liên kết, rồi mới thực hiện tác động lên phần tử HTML nếu cần thiết.

```sidenav.js
   /* Subsequent Tasks */

const showLink = function(
   link = new Element()
) {
   var linkIsHidden = link.className.includes('hidden');
   if (linkIsHidden)
      elementRemoveClass(link, 'hidden');
   else
      {  /* do nothing */  }
};

const hideLink = function(
   link = new Element()
) {
   var linkIsHidden = link.className.includes('hidden');
   if (linkIsHidden)
      {  /* do nothing */  }
   else
      elementAddClass(link, 'hidden');
};
```

### 3.4 Viết các hàm tiện ích hỗ trợ

Cuối cùng là viết các hàm tiện ích hỗ trợ đã được gọi nhưng chưa có code triển khai. :D

```sidenav.js
   /* Utility Functions */

const queryAllLinks = function () {
   var allSidenavLinks = document.querySelectorAll('.sidenav-link');
   var sidenavLinkArray = Array.from(allSidenavLinks);
   return sidenavLinkArray;
};

const checkIfLinkMatchesKeywords = function (
   theLink = new Element(),
   keywords = ''
) {
   keywords = keywords.toLowerCase();
   // --- Get Link's Info
   var title = theLink.textContent.toLowerCase();
   var tagList = theLink.dataset.tag.toLowerCase();
   // --- Check If Matches
   var titleIncluded = title.includes(keywords);
   var tagListIncluded = tagList.includes(keywords);
   // --- Final Result
   return titleIncluded || tagListIncluded
};

const elementAddClass = function(
   element = new Element(),
   theClass = ''
) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.concat(theClass);
   element.className = newClassArray.join(' ');
};

const elementRemoveClass = function(
   element = new Element(),
   theClass = ''
) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.filter((oneClass) => (oneClass != theClass));
   element.className = newClassArray.join(' ');
};
```

## 4. Tổng kết code của một sidenav đơn giản

Xin chúc mừng! Bạn đã hoàn thành công việc xây dựng một thanh điều hướng phụ đơn giản có hỗ trợ tính năng lọc nhanh các danh sách liên kết. Để hoàn thiện hơn nữa thì bạn có thể xử lý thêm code `responsive` cho `.sidenav`. Công việc này đã quá quen thuộc từ khi chúng ta cùng [xây dựng một thanh điều hướng `responsive`](https://viblo.asia/p/LzD5dRAEZjY) cách đây rất lâu, khi mà chúng ta còn chưa biết tới JavaScript. :D

Mục đích của chúng ta trong bài viết này là thử triển khai logic xử lý sự kiện theo phương cách hành động chủ quan đứng từ vị trí của các phần tử HTML cần phải thay đổi để đáp ứng với sự kiện. Thay vì xử lý theo phương thức hành động khách quan tác động lên các phần tử HTML cần thay đổi từ phía bên ngoài.

Nếu bạn đã cảm thấy quen với lối tư duy này, bạn có thể viết lại đoạn tương tác giữa nút nhấn `#sidenav-button` và ô nhập liệu `#sidenav-input`. Cách thức xử lý này sẽ rất có ích khi bạn xây dựng một thứ gì đó hơi cồng kềnh. Khi đó code logic hiển thị của mỗi thành phần sẽ được lưu ở một tệp riêng đại diện cho thành phần đó, và có thể được phát động sự kiện từ bất kỳ đâu mà không phải viết lặp lại các phần rải rác của code logic hiển thị này ở các tệp khác. Như vậy việc soát lỗi và chỉnh sửa cũng sẽ trở nên dễ dàng và thuận lợi hơn rất nhiều. :D

```sidenav.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <!-- --- -->
   <title>Sidebar w/ Filter</title>
   <!-- --- -->
   <link rel="stylesheet" href="sidenav.css">
</head>
<body>
   <!-- Topnav -->
   <nav class="topnav">T o p - N a v i g a t i o n - B a r</nav>
   <!-- Main Area -->
   <article class="main article">M a i n - C o n t e n t</article>
   <!-- Sidenav -->
   <aside class="sidenav">
      <div class="container">
         <div class="sidenav-filter">
            <input id="sidenav-input" type="text" placeholder="Tìm bài viết ....">
            <button id="sidenav-button">&lt;</button>
         </div>
         <!-- --- -->
         <div class="sidenav-navlist">
            <span class="sidenav-header">HTML</span>
            <a class="sidenav-link" href="#" data-tag="html,begin">Tạo Một Trang Web</a>
            <a class="sidenav-link" href="#" data-tag="html,image,link">Chèn Ảnh & Liên Kết</a>
            <a class="sidenav-link" href="#" data-tag="html,embed,content">Các Nội Dung Nhúng</a>
            <a class="sidenav-link" href="#" data-tag="html,container">Các Thẻ Container</a>
            <a class="sidenav-link" href="#" data-tag="html,list,table">Danh Sách & Bảng Biểu</a>
            <a class="sidenav-link" href="#" data-tag="html,text,format">Các Thẻ Định Dạng Chữ</a>
            <a class="sidenav-link" href="#" data-tag="html,input,form">Nhập Liệu & Biểu Mẫu</a>
            <a class="sidenav-link" href="#" data-tag="html,input,other">Thành Phần Nhập Liệu</a>
            <a class="sidenav-link" href="#" data-tag="html,graphic,data">Đồ Họa & Dữ Liệu</a>
         </div>
         <!-- --- -->
         <div class="sidenav-navlist">
            <span class="sidenav-header">CSS</span>
            <a class="sidenav-link" href="#" data-tag="css,begin">CSS Là Cái Gì?</a>
            <a class="sidenav-link" href="#" data-tag="css,selector,priority">Bộ Chọn & Ưu Tiên</a>
            <a class="sidenav-link" href="#" data-tag="css,color,length">Màu Sắc & Kích Thước</a>
            <a class="sidenav-link" href="#" data-tag="css,container,type">Các Kiểu Container</a>
            <a class="sidenav-link" href="#" data-tag="css,background">Thuộc Tính Background</a>
            <a class="sidenav-link" href="#" data-tag="css,border">Thuộc Tính Border</a>
            <a class="sidenav-link" href="#" data-tag="css,position">Thuộc Tính Position</a>
            <a class="sidenav-link" href="#" data-tag="css,text,content">Nội Dung Chữ</a>
            <a class="sidenav-link" href="#" data-tag="css,selector,combine">Kết Hợp Bộ Chọn</a>
            <a class="sidenav-link" href="#" data-tag="css,pseudo,class">Class Giả Định</a>
            <a class="sidenav-link" href="#" data-tag="css,width,height">Width & Height</a>
            <a class="sidenav-link" href="#" data-tag="css,margin,padding">Margin & Padding</a>
            <a class="sidenav-link" href="#" data-tag="css,media,query">Truy Vấn Thiết Bị</a>
            <a class="sidenav-link" href="#" data-tag="css,framework,icon">Frameworks & Icons</a>
            <a class="sidenav-link" href="#" data-tag="css,transition">Hiệu Ứng Chuyển Tiếp</a>
            <a class="sidenav-link" href="#" data-tag="css,animation">Hoạt Ảnh Tự Tạo</a>
            <a class="sidenav-link" href="#" data-tag="css,function,variable">Hàm & Biến</a>
            <a class="sidenav-link" href="#" data-tag="css,grid,flex">Grid & Flex</a>
         </div>
         <!-- --- -->
         <div class="sidenav-navlist">
            <span class="sidenav-header">Bootstrap</span>
            <a class="sidenav-link" href="#" data-tag="bootstrap,begin">Bootstrap Là Cái Gì?</a>
            <a class="sidenav-link" href="#" data-tag="bootstrap,component,utility">Components & Utilities</a>
            <a class="sidenav-link" href="#" data-tag="bootstrap,content,layout">Content & Layout</a>
         </div>
         <!-- --- -->
         <div class="sidenav-navlist">
            <span class="sidenav-header">JavaScript</span>
            <a class="sidenav-link" href="#" data-tag="javascript,js,begin">JavaScript Là Cái Gì?</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,type,variable">Kiểu & Biến</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,function,scope">Hàm & Vùng</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,object,everything">Object & Everything</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,document,event">Document & Event</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,conditional">Cấu Trúc Điều Kiện</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,collection,looping">Collection & Looping</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,window,request">Window & Request</a>
            <a class="sidenav-link" href="#" data-tag="javascript,js,library,framework">Library & Framework</a>
         </div>
         <!-- --- -->
         <div class="sidenav-navlist">
            <span class="sidenav-header">jQuery</span>
            <a class="sidenav-link" href="#" data-tag="jquery,begin">jQuery Là Cái Gì?</a>
            <a class="sidenav-link" href="#" data-tag="jquery,selector,method">Bộ Chọn & Thao Tác</a>
            <a class="sidenav-link" href="#" data-tag="jquery,effect,request">Hiệu Ứng & Yêu Cầu</a>
         </div>
         <!-- --- -->
         <div class="sidenav-navlist">
            <span class="sidenav-header">Sample</span>
            <a class="sidenav-link" href="#" data-tag="html,css,navbar,simple">Navbar Đơn Giản</a>
            <a class="sidenav-link" href="#" data-tag="html,css,navbar,responsive">Navbar Responsive</a>
            <a class="sidenav-link" href="#" data-tag="html,css,carousel,simple">Carousel Đơn Giản</a>
            <a class="sidenav-link" href="#" data-tag="html,css,javascript,js,dropdown,simple">1001 Dropdown</a>
         </div>
      </div><!-- .container -->
   </aside>
   <!-- Footer -->
   <footer class="footer">F o o t e r</footer>
   <!-- JavaScript -->
   <script src="sidenav.js"></script>
</body>
</html>
```

```sidenav.css
/* @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&family=Noto+Serif:wght@400;700&display=swap'); */

   /* Reset CSS */

* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

   /* Templating */

body {
   /* --- aligning */
   display: grid;
   grid-template:
      "topnav  topnav "
      "sidenav main   "
      "footer  footer "
      / 300px  1fr;
}

.topnav {
   /* --- coloring */
   color: white;
   background: black;
   /* --- sizing */
   width: 100%;
   height: 54px;
   /* --- positioning */
   grid-area: topnav;
}

.sidenav {
   /* --- coloring */
   background: white;
   border-right: 2px solid lightgray;
   /* --- positioning */
   grid-area: sidenav;
}

.main {
   /* --- coloring */
   background: white;
   /* --- positioning */
   grid-area: main;
}

.footer {
   /* --- coloring */
   color: white;
   background: black;
   /* --- sizing */
   height: 450px;
   /* --- positioning */
   grid-area: footer;
}

   /* Mockup Content */

.topnav {
   /* --- content */
   font-family: 'Noto Serif', 'Times New Roman', serif;
   font-size: 18px;
   font-weight: bold;
   /* --- aligning */
   text-align: center;
   line-height: 54px;
   word-spacing: 18px;
}

.main {
   /* --- content */
   font-size: 90px;
   /* --- aligning */
   text-align: center;
   padding-top: 108px;
}

.footer {
   /* --- content */
   font-family: 'Noto Serif', 'Times New Roman', serif;
   font-size: 45px;
   /* --- aligning */
   text-align: center;
   line-height: 450px;
   word-spacing: 21px;
}

   /* Common Container */

.container {
   /* --- sizing */
   display: block;
   max-width: 720px;
   padding: 0 15px;
   /* --- positioning */
   margin: 0 auto;
}

   /* Extra Padding */

.sidenav {
   padding-top: 15px;
   padding-bottom: 39px;
}

   /* Sidenav Filter */

.sidenav-filter {
   /* --- coloring */
   background: royalblue;
   /* --- positioning */
   margin: 24px 0;
   /* --- aligning */
   word-spacing: -5px;
}

#sidenav-input {
   /* --- coloring */
   border: 1px solid royalblue;
   /* --- sizing */
   width: calc(100% - 48px);
   height: 45px;
}

#sidenav-input::placeholder {
   color: lightgray;
}

#sidenav-button {
   /* --- coloring */
   color: white;
   background: royalblue;
   border: 1px solid royalblue;
   /* --- sizing */
   width: 48px;
   height: 42px;
   /* --- */
   cursor: pointer;
}

   /* Filter's Content */

#sidenav-input {
   /* --- content */
   font-size: 16px;
   /* --- aligning */
   line-height: 45px;
   padding: 0 15px;
}

#sidenav-button {
   font-size: 18px;
   font-weight: bold;
}

   /* Sidenav Navlist */

.sidenav-header,
.sidenav-link {
   display: block;
   padding: 9px 15px;
}

.sidenav-link {
   padding-left: 39px;
}

.sidenav-link {
   color: royalblue;
}

.sidenav-link:hover {
   color: dodgerblue;
}

.sidenav-link.hidden {
   display: none;
}

   /* Navlist's Content */

.sidenav-navlist {
   counter-reset: nthLink;
}

.sidenav-navlist > .sidenav-link::before {
   counter-increment: nthLink;
   content: counter(nthLink) ". ";
}

.sidenav-header,
.sidenav-link {
   font-family: 'Noto Sans', Arial, sans-serif;
   text-decoration: none;
}

.sidenav-header {
   font-weight: bold;
}
```

```sidenav.js
   /* Utility Functions */

const queryAllLinks = function () {
   var allSidenavLinks = document.querySelectorAll('.sidenav-link');
   var sidenavLinkArray = Array.from(allSidenavLinks);
   return sidenavLinkArray;
};

const checkIfLinkMatchesKeyword = function (
   theLink = new Element(),
   keywords = ''
) {
   keywords = keywords.toLowerCase();
   // --- Get Link's Info
   var title = theLink.textContent.toLowerCase();
   var tagList = theLink.dataset.tag.toLowerCase();
   // --- Check If Matches
   var titleIncluded = title.includes(keywords);
   var tagListIncluded = tagList.includes(keywords);
   // --- Final Result
   return titleIncluded || tagListIncluded
};

const elementAddClass = function(
   element = new Element(),
   theClass = ''
) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.concat(theClass);
   element.className = newClassArray.join(' ');
};

const elementRemoveClass = function(
   element = new Element(),
   theClass = ''
) {
   var classArray = element.className.split(' ');
   var newClassArray = classArray.filter((oneClass) => (oneClass != theClass));
   element.className = newClassArray.join(' ');
};

   /* Subsequent Tasks */

const showLink = function(
   link = new Element()
) {
   var linkIsHidden = link.className.includes('hidden');
   if (linkIsHidden)
      elementRemoveClass(link, 'hidden');
   else
      {  /* do nothing */  }
};

const hideLink = function(
   link = new Element()
) {
   var linkIsHidden = link.className.includes('hidden');
   if (linkIsHidden)
      {  /* do nothing */  }
   else
      elementAddClass(link, 'hidden');
};

   /* Event Listeners */

const updateVisibility = function (
   event = new Event()
) {
   // --- Check Keyword
   var theLink = event.target;
   var keywords = document.querySelector('#sidenav-input').value;
   var linkMatchesKeyword = checkIfLinkMatchesKeyword(theLink, keywords);
   // -- Update Visibility
   if (linkMatchesKeyword)
      showLink(theLink);
   else
      hideLink(theLink);
};

const notifyAllLinks = function(
   event = new Event()
) {
   // --- Translate Event
   var inputEvent = new Event('input:change');
   // --- Notify All Links
   var sidenavLinkArray = queryAllLinks();
   sidenavLinkArray.forEach((link) => link.dispatchEvent(inputEvent));
};

const clearInput = function (
   event = new Event()
) {
   var sidenavInput = document.querySelector('#sidenav-input');
   sidenavInput.value = '';
};

   /* Start Program */

void function() {
   // --- Links Binding
   var sidenavLinkArray = queryAllLinks();
   var bindListener = (link) => link.addEventListener('input:change', updateVisibility);
   sidenavLinkArray.forEach(bindListener);
   // --- Input Binding
   var sidenavInput = document.querySelector('#sidenav-input');
   sidenavInput.addEventListener('keyup', notifyAllLinks);
   // --- Button Binding
   var sidenavButton = document.querySelector('#sidenav-button');
   sidenavButton.addEventListener('click', clearInput);
   sidenavButton.addEventListener('click', notifyAllLinks);
} ();
```

Và bây giờ thì chúng ta cần quay trở lại với bài viết mà chúng ta đang còn dang dở. :D

[[JavaScript] Bài 13 - Event & Listener](https://viblo.asia/p/RnB5pA0wKPG)