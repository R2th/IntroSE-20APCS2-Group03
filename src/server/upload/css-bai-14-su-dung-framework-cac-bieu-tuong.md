Trong bài viết này, chúng ta sẽ nói về việc sử dụng `framework` để tăng tốc độ xây dựng trang web mà chúng ta ấp ủ. Bên cạnh đó, chúng ta cũng sẽ nói về việc sử dụng các biểu tượng để hỗ trợ tạo ra giao diện người dùng trực quan hơn. Những công cụ mới này sẽ thay đổi cách mà bạn viết code rất nhiều đấy.

## Framework là cái gì?

Ngay từ những bài viết đầu tiên, chúng ta đã được gặp rất nhiều công cụ miễn phí và hữu ích tuyệt vời như: Trình soạn thảo code Atom của Github Inc., Nền tảng blog miễn phí host Github Pages, Host ảnh miễn phí PostImage, Host audio, video, như SoundCloud và YouTube v.v.... Và bây giờ thì chúng ta sẽ bổ sung thêm một vài thứ nữa vào danh sách. :D

Một `framework` là một bộ code `miễn phí` (thực ra cũng có những framework tính phí
nhưng mình không sử dụng nên không giới thiệu ở đây :D) - được phát triển và chia sẻ bởi các nhà phát triển phần mềm có kinh nghiệm để giúp mọi người thực hiện công việc xây dựng trang web hay phần mềm thuận lợi hơn.

Hãy thử tưởng tượng là bạn là một `code star` (một nhà phát triển phần mềm rất rất giỏi) và bạn đã xây dựng xong cũng như tối ưu code cho các thành phần phổ biến thường thấy trong các trang web như: Thanh điều hướng `navbar`, Các danh sách đóng/mở `dropdown`, Slide ảnh, v.v... Và bây giờ thì bạn muốn chia sẻ bộ code của bạn với mọi người bằng cách cho phép tải về tệp CSS mà bạn đã viết xong và một tài liệu về các đoạn mã HTML ví dụ.

Như vậy lúc này mình sẽ có thể tải về tệp CSS của bạn và nhúng vào trong các văn bản HTML mà mình đang xây dựng và copy/paste một vài đoạn mã HTML từ các ví dụ trong tài liệu mà bạn cung cấp. Lúc này mình đã ngay lập tức có được các thành phần mà mình muốn xây dựng cho trang web của mình và chỉ việc bổ sung thêm một tệp CSS thứ hai để ghi đè một số thuộc tính để điều chỉnh phong cách hiển thị cho phù hợp với thiết kế mà mình đã nghĩ ra. Kết quả là trang web của mình trông vẫn rất khác so với trang web của bạn.

```framework.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Framework</title>

      <link rel="stylesheet" href="framework.css">
      <link rel="stylesheet" href="override.css">
   </head>
   <body>
      <nav class="navbar">
         <!-- một vài liên kết -->
      </nav>
   </body>
</html>
```

Trong đoạn mã HTML phía trên, hãy giả định rằng `.navbar` là một thành phần đã được code CSS xong trong `framework.css` với `padding` tốt, đã `responsive`, và có màu nền sáng. Bây giờ thì mình muốn ghi đè màu nền thành tone màu tối để phù hợp với thiết kế của mình. Việc mình cần làm lúc này chỉ đơn giản là viết 1 dòng code trong tệp `override.css`.

```override.css
.navbar {
   background-color: Black;
}
```

Đó chính là lý do vì sao mọi người đang chia sẻ và sử dụng các `framework`. Nó khá dễ hiểu phải không? :D

## Nên bắt đầu với Framework nào?

Có tới hàng tá các `framework` CSS ở ngoài đó, mà có khi là vào khoảng vài ngàn bộ nếu bạn Google một cách nghiêm túc. Tuy nhiên, bạn có thể bắt đầu với cái phổ biến nhất có tên là [Bootstrap](http://getbootstrap.com/). `Framework` này cung cấp đầy đủ các thành phần phổ biến giúp bạn có thể xây dựng một trang web `responsive` rất nhanh chóng. Sau khi đã quen với việc sử dụng tài liệu và áp dụng một `framework` để tạo ra vài trang web, bạn có thể thử những bộ `framework` khác để tìm ra chính xác thứ thực sự được tạo ra dành cho bạn. Từ phong cách code, phong cách trang trí mặc định, phong cách lập tài liệu, và cả thần tượng code tạo ra `framework` đó v.v....

Bản thân mình thì đặc biệt ưa thích [Foundation của Zurb](https://get.foundation/) về khả năng tùy biến và [Pure CSS của Yahoo](https://purecss.io/) về thiết kế tối giản và cực nhẹ. Tuy nhiên thì cũng như đa số mọi người tự học code web, mình đã khởi đầu với `Bootstrap` bởi sự phổ biến và  thông dụng của nó.

Bạn có thể tự học `Bootstrap` bằng cách sử dụng trang web chính thức của `framework` này - [getbootstrap.com](http://getbootstrap.com/). Ở đây chúng ta cũng sẽ thực hiện một vài bài viết về `Bootstrap`, tuy nhiên thì mình không có ý định tạo ra một bộ tài liệu `Bootstrap` khác bằng tiếng VIệt. Mục đích của các bài viết về `Bootstrap` sắp tới chỉ là để chúng ta làm quen với việc sử dụng tài liệu của `Bootstrap` và áp dụng một cách đơn giản nhất vào việc xây dựng một trang web. Hy vọng rằng bạn sẽ tiếp tục tham gia cùng mình trong hành trình tự học cách sử dụng `Bootstrap` đơn giản nhất:

[[Bootstrap] Bài 1 - Làm Thế Nào Để Bootstrap Một Trang Web?](https://viblo.asia/p/L4x5xAy1KBM)

Bạn có thể bắt đầu đọc các bài viết về `Bootstrap` ngay ở thời điểm này mặc dù Sub-Series CSS của chúng ta vẫn còn một vài bài viết nữa mới kết thúc. Tính cho tới thời điểm hiện tại thì lộ trình tự học CSS cơ bản của chúng ta chỉ còn một chút kiến thức cơ bản nữa về việc tạo ra các hiệu ứng chuyển đổi dành cho các thành phần tương tác với người dùng và các hoạt ảnh.

## Sử dụng các biểu tượng

Cộng đồng các nhà phát triển web cũng rất yêu thích [Font Awesome](http://fontawesome.io/), một `framework` CSS và tập font biểu tượng. `Framework` này có thể giúp chúng ta nhanh chóng chèn thêm các biểu tượng vào các thành phần xây dựng giao diện người dùng như các nút nhấn, các liên kết mạng xã hội, v.v....

Việc sử dụng `Font Awesome` cũng rất đơn giản và dễ hiểu vì vậy nên chúng ta có thể thực hiện một ví dụ ngay bây giờ. Đầu tiên thì chúng ta cần nhúng tệp CSS của `Font Awesome` vào văn bản HTML với dòng code này:

```html
`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
crossorigin="anonymous" referrerpolicy="no-referrer" />`
```

Sau đó thì trong code HTML, ở bất kỳ vị trí nào mà bạn muốn chèn một biểu tượng vào thì bạn chỉ cần tạo một phần tử `<i class="tên-biểu-tượng"></i>` với tên class của được cung cấp tại trang web chính thức của `framework` - [fontawesome.com](https://fontawesome.com/icons)

```html
<i class="fa-brands fa-youtube"></i>
```

Bây giờ chúng ta sẽ thử tạo ra một phần chân trang web với các liên kết tới các mạng xã hội để sử dụng cho trang web của bạn.

```footer.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A simple footer</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
crossorigin="anonymous" referrerpolicy="no-referrer" />
      <link rel="stylesheet" href="footer.css">
   </head>
   <body>
      <footer>
         <a href="#">
            <i class="fa-brands fa-linkedin"></i>
         </a>
         <a href="#">
            <i class="fa-brands fa-twitter-square"></i>
         </a>
         <a href="#">
            <i class="fa-brands fa-github-square"></i>
         </a>
         <a href="#">
            <i class="fa-brands fa-facebook-square"></i>
         </a>
         <a href="#">
            <i class="fa-brands fa-youtube-square"></i>
         </a>
      </footer>
   </body>
</html>
```

```footer.css
* {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
}

footer {
   font-size: 30px;
   text-align: center;

   padding: 60px 0;

   background: Black;
}

footer > a {
   text-decoration: none;

   display: inline-block;
   padding: 15px;
   
   color: White;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/eYyNNQG)

## Một cách khác để nhúng thêm các tệp CSS

Như bạn đã thấy thì kể từ thời điểm này trở đi rất có khả năng là chúng ta sẽ sử dụng nhiều hơn 1 tệp CSS cho một trang web đơn. Các tệp CSS trong các thẻ `<link>` đứng trên sẽ có thể hỗ trợ cho các tệp CSS trong các thẻ `<link>` ở phía dưới. Và CSS có cung cấp cho chúng ta một phương thức khác để nhúng thêm một tệp CSS hỗ trợ vào một tệp CSS khác. Đó là chúng ta có thể sử dụng cú pháp `@import` ở phần mở đầu của tệp CSS ghi đè các thành phần cho tệp kia cung cấp.

Giả sử chúng ta đang có một tệp `framework.css` và một tệp `override.css` như trong ví dụ đầu tiên. Trường hợp thứ nhất là khi chúng ta tải tệp `framework.css` về máy tính và đặt trong cùng thư mục với tệp `override.css`. Lúc này chúng ta có thể `@import` tệp `framework.css` vào phần đầu của tệp `override.css` như thế này:

```override.css
@import "framework.css";

/* code CSS tùy chỉnh viết ở đây... */
```

Trong trường hợp muốn sử dụng tệp `framework.css` đang lưu trữ online ở đâu đó khác, chúng ta có thể sử dụng cú pháp `@import url()`:

```override.css
@import url("https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css");

/* code CSS tùy chỉnh viết ở đây... */
```

Đây không phải là phương thức bắt buộc và chúng ta hoàn toàn có thể sử dụng các thẻ `<link>` thay vì cú pháp `@import`. Tuy nhiên mình muốn giới thiệu cú pháp `@import` ở đây vì tính năng này khá tuyệt khi bạn muốn viết một `framework` riêng để sử dụng và chia sẻ với mọi người. Lúc này code CSS mà bạn cần quản lý sẽ khá nhiều và nên được chia thành các tệp nhỏ tương ứng với mỗi thành phần giao diện người dùng. Ví dụ như `navbar.css`, `dropdown.css`, `carousel.css`, v.v...

Lúc này nếu muốn cung cấp cho mọi người cách sử dụng đơn giản thì bạn có thể tạo ra một tệp CSS đại diện cho `framework` kiểu như `yourname.framework.css`. Các tệp CSS sử dụng cho các thành phần giao diện có thể được đặt trong một thư mục tên là `component` bên cạnh tệp CSS đại diện. Sau đó tất cả sẽ được `@import` vào tệp CSS đại diện bằng các lệnh `@import`.

```yourname.framework.css
@import "component/navbar.css";
@import "component/dropdown.css";
@import "component/carousel.css";
/* v.v... */
```

Như vậy người dùng sẽ có 2 lựa chọn là sử dụng một thẻ `<link>` để nhúng tệp CSS đại diện có đầy đủ các thành phần dựng sẵn. Hoặc nhúng từng thành phần trong thư mục `component` để sử dụng.

Bài viết giới thiệu về việc sử dụng `framwork` và `icons` của chúng ta đến đây là kết thúc. Trong bài tiếp theo, chúng ta sẽ thảo luận về việc sử dụng các hiệu ứng chuyển đổi cho các thành phần tương tác với người dùng.

[[CSS] Bài 15 - Cách Tạo Các Hiệu Ứng Chuyển Tiếp](https://viblo.asia/p/E375zAEJlGW)