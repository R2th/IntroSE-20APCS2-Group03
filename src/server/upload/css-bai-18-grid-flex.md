Trong bài này, chúng ta sẽ cùng nói về 2 công cụ hỗ trợ cho tác vụ dàn chỉnh bố cục chính và bố cục bên trong các thành phần của trang web là 2 bộ thuộc tính `grid` và `flex`.

## Các thuộc tính grid

Các thuộc tính `grid` ban đầu được thiết kế dành riêng cho tác vụ dàn chỉnh bố cục chính của trang web. Tuy nhiên do tính trực quan và dễ sử dụng, `grid` đã được phát triển dành cho cả tác vụ canh chỉnh nội dung bên trong các thành phần của trang web.

Đây là một trong những công cụ được thiết kế với 2 giao diện sử dụng `đơn giản` và `linh động` giống như các giá trị màu sắc. Với cách sử dụng đơn giản thì chúng ta có một công cụ dàn trang WYSIWYG - nhìn code ra sao thì kết quả hiển thị sẽ như vậy. Đại loại cũng giống như lúc chúng ta chỉ định màu sắc bằng tên chứ không phải mã HEX, RGBA, hay HSLA.

```grid.css
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

body {
   display: grid;
   grid-template-areas:
      "topnav  topnav  topnav "
      "banner  banner  banner "
      "subnav  subnav  subnav "
      "favlink favlink favlink"
      "article article sidenav"
      "footer  footer  footer ";
   grid-gap: 2px;
}

.topnav {
   grid-area: topnav;
   background: white;
   height: 63px;
}

.banner {
   grid-area: banner;
   background: lightpink;
   height: 210px;
}

.subnav {
   grid-area: subnav;
   background: gray;
   height: 63px;
}

.favlink {
   grid-area: favlink;
   background: royalblue;
   height: 63px;
}

.article {
   grid-area: article;
   background: lightgray;
   height: 1080px;
}

.sidenav {
   grid-area: sidenav;
   background: lightgray;
   height: 1080px;
}

.footer {
   grid-area: footer;
   background: gray;
   height: 420px;
}
```

```grid.html
<nav class="topnav"></nav>
<header class="banner"></header>
<main class="article"></main>
<nav class="subnav"></nav>
<aside class="sidenav"></aside>
<div class="favlink"></div>
<footer class="footer"></footer>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/yLpeJBJ)

Mình tin là dù không nhấn vào xem kết quả hiển thị thì bạn cũng đã hình dung được bố cục của trang web trông như thế nào. Đoạn giá trị mô tả ở thuộc tính `grid-template-areas` là một dạng định nghĩa đơn giản bố cục của trang web. Chúng ta có thể nhìn thấy thanh điều hướng `sidenav` được đặt bên phải phần hiển thị nội dung bài viết `article` và tỉ lệ giữa 2 thành phần này được phản ánh bởi số cột được phân bố là `2 article : 1 sidenav`.

Các thuộc tính liên quan tới `grid` được sử dụng trong ví dụ trên bao gồm:

- `display: grid;` được thiết lập cho container `body` để sử dụng cơ chế dàn chỉnh các thành phần bên trong bằng lưới.
- `grid-template-areas` được sử dụng để mô tả lưới hiển thị với các hàng và các cột, mỗi hàng là một chuỗi giá trị với tên của các ô được đặt tùy ý.
- `grid-gap` được sử dụng để tạo khoảng trống giữa các thành phần bên trong. Nếu được cung cấp 2 giá trị thì giá trị đầu tiên sẽ là khoảng cách giữa các hàng và giá trị thứ hai sẽ là khoảng cách giữa các cột.
- `grid-area` được sử dụng cho các thành phần bên trong container `grid` để gắn thành phần được chọn vào các vùng đã được đặt tên ở `grid-template-areas`.

Trong trường hợp bạn sử dụng `template` với cách chia tỉ lệ phức tạp và không muốn `copy/paste` quá nhiều lần tên của các vùng. Chúng ta có thể chỉ định thêm tỉ lệ giữa các cột trong mỗi hàng bằng thuộc tính `grid-template-colums` và các giá trị chỉ độ dài `px` hay `%`. Ở đây `grid` có hỗ trợ thêm một kiểu đơn vị mới là `fr` (fraction) hay số phần tương quan so với các cột còn lại.

```grid.css
body {
   display: grid;
   grid-template-areas:
      "topnav  topnav "
      "banner  banner "
      "subnav  subnav "
      "favlink favlink"
      "article sidenav"
      "footer  footer ";
   grid-template-columns: 2fr 1fr;
   grid-gap: 2px;
}

/* ... */
```

Ngoài `display: grid;` thì chúng ta còn có `display: inline-grid;` để tạo ra các container `grid` được xem như nội dung văn bản tương tự như chúng ta có `inline-block` trước đó. Tuy nhiên tác vụ canh chỉnh vị trí cho nội dung của các thành phần thì chúng ta có một công cụ khác có phần phù hợp hơn. Đó là các thuộc tính `flex`.

Trước khi nói tới `flex`, chúng ta sẽ thực hiện thêm 1 ví dụ với `grid` để tạo 1 lưới nội dung được sử dụng để trưng bày một nhóm sản phẩm thường được thấy trong các trang web bán hàng. Ở đây chúng ta sẽ phác họa một lưới sản phẩm với 4 cột.

```productlist.css
.productlist {
   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-gap: 2px;
   padding: 30px 15px;
}

.productlist-card {
   height: 210px;
   background: lightgray;
}
```

```productlist.html
<section class="productlist">
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
   <section class="productlist-card"></section>
</section>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/RwxrBjO)

Trong code ví dụ này chúng ta không chỉ định tên các vùng để phân bố nội dung bằng `grid-template-areas` do lưới nội dung có các thẻ sản phẩm tương đồng. Thay vào đó chúng ta chỉ cần chỉ định độ rộng cho mỗi cột và trình duyệt web sẽ hiểu là chúng ta muốn tạo ra 4 cột với tỉ lệ độ rộng như nhau.

Trong trường muốn tìm hiểu về cách sử dụng `grid` nâng cao, bạn có thể sử dụng các liên kết tham khảo dưới đây:

- Module `grid` - [W3schools](https://www.w3schools.com/css/css_grid_container.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) - giới thiệu tổng quan nhóm thuộc tính `grid`.
- `grid-auto-flow` - [W3schools](https://www.w3schools.com/cssref/pr_grid-auto-flow.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-auto-flow) - hướng của dòng chảy chính hiển thị bên trong `grid` container
- `grid-template-areas` - [W3schools](https://www.w3schools.com/cssref/pr_grid-template.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) | 
- `grid-template-columns` - [W3schools](https://www.w3schools.com/cssref/pr_grid-template-columns.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns)
- `grid-template-rows` - [W3schools](https://www.w3schools.com/cssref/pr_grid-template-rows.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows)
- `grid-template` - [W3schools](https://www.w3schools.com/cssref/pr_grid-template.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template) - Cú pháp gộp cho các thuộc tính `template`
- `grid-column-start` - [W3schools](https://www.w3schools.com/cssref/pr_grid-column-start.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)
- `grid-column-end` - [W3schools](https://www.w3schools.com/cssref/pr_grid-column-end.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end)
- `grid-row-start` - [W3schools](https://www.w3schools.com/cssref/pr_grid-row-start.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)
- `grid-row-end` - [W3schools](https://www.w3schools.com/cssref/pr_grid-row-end.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end)
- `grid-column-gap` - [W3schools](https://www.w3schools.com/cssref/pr_grid-column-gap.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap)
- `grid-row-gap` - [W3schools](https://www.w3schools.com/cssref/pr_grid-row-gap.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap)
- `grid-gap` - [W3schools](https://www.w3schools.com/cssref/pr_grid-gap.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/gap) - Cú pháp gộp cho các thuộc tính `gap`
- Hàm `repeat()` - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/repeat()) - Hàm này không được hỗ trợ bởi Internet Explorer. Người dùng của Microsoft được hỗ trợ với trình duyệt Edge mới.

## Các thuộc tính flex

Để bổ trợ cho `grid`, các thuộc tính `flex` được thiết kế để dành cho tác vụ dàn chỉnh nội dung bên trong các thành phần của trang web. Tuy nhiên do đã được hoàn thiện và giới thiệu sớm hơn `grid`, đồng thời có cách thức sử dụng linh hoạt hơn so với các công cụ có mặt từ các phiên bản CSS cũ, `flex` đã được mọi người sử dụng cả trong tác vụ dàn chỉnh bố cục chính của trang web. Ở thời điểm hiện tại thì `grid` đã được hỗ trợ bởi các trình duyệt web được cập nhật gần đây, nên mình muốn giới thiệu `flex` với vai trò được sử dụng trong tác vụ dàn chỉnh nội dung bên trong các thành phần.

Ở đây chúng ta sẽ lấy ví dụ là canh chỉnh bố cục bên trong [thanh điều hướng responsive](https://viblo.asia/p/LzD5dRAEZjY) mà chúng ta đã xây dựng trong một bài viết trước đó. Tuy nhiên khi sử dụng `flex` thì cấu trúc HTML của chúng ta có thay đổi 1 chút. Tổng quan chúng ta sẽ chia thanh điều hướng thành 2 phần chính là logo `.navbar-brand` và khối còn lại là một container `.navbar-nav` bao quanh 2 danh sách liên kết.

```navbar.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
   <link rel="stylesheet" href="navbar.css">
</head>
<body>
   <nav class="navbar">
      <a class="navbar-brand" href="#">N A T U R E</a>
      
      <div class="navbar-nav">
         <!-- 2 khối danh sách liên kết ở đây -->
      </div>
   </nav>
</body>
</html>
```

```navbar.css
/* Reset CSS */

* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

/* Layout .navbar */

.navbar {
   display: flex;
}

.navbar-brand {
   flex-grow: auto;
}

.navbar-nav {
   flex-grow: 1;
}

/* Background */

.navbar a {
   color: white;
}

.navbar-brand {
   background-color: royalblue;
}

.navbar-nav {
   background: black;
}

/* Sizing links */

.navbar-brand {
   padding: 15px 30px;
}

/* Font & Text */

.navbar {
   font-family: Arial, Helvetica, sans-serif;
}

.navbar a {
   text-decoration: none;
}

.navbar-brand {
   font-weight: bold;
}
```

`Kết quả hiển thị`
![](https://images.viblo.asia/b61dbb80-e0a3-4011-8a1b-c12a91154250.png)

Ở đoạn `/* Layout .navbar */`, chúng ta đã sử dụng `flex` để dàn bố cục chính cho `.navbar` với 2 khối bên trong là logo `.navbar-brand` và khối `.navbar-nav`. Thuộc tính `flex-grow` được sử dụng để chia tỉ lệ độ rộng chiếm dụng cho các khối tương quan lẫn nhau. Logo `.navbar-brand` được đặt độ rộng là `auto` và chỉ tự động tạo kích thước hiển thị xung quanh nội dung.

Phần diện tích còn lại được dành cho `.navbar-nav` với `flex-grow: 1;`. Nếu chúng ta đặt tỉ lệ là `1:1` thì mỗi khối sẽ chiếm `50%` chiều rộng của container cha `.navbar`, hoặc `2:1` thì tổng chiều rộng của `.navbar` sẽ được chia làm 3 phần và trong đó `.navbar-brand` sẽ chiếm 2 phần. Thuộc tính này hoạt động giống với giá trị các giá trị `fr` (fraction) sử dụng với `grid` ở phần trước.

Bây giờ chúng ta sẽ bổ sung 2 danh sách liên kết bên trong `.navbar-nav` và tiếp tục sử dụng `flex` để dàn chỉnh bố cục với 1 danh sách ở bên trái và 1 danh sách ở bên phải.

```navbar.html
<nav class="navbar">
   <a class="navbar-brand" href="#">N A T U R E</a>

   <div class="navbar-nav">
      <div>
         <a href="#">Html</a>
         <a href="#">Css</a>
         <a href="#">Bootstrap</a>
         <a href="#">JavaScript</a>
         <a href="#">jQuery</a>
         <a href="#">Jekyll</a>
         <a href="#">Sample</a>
      </div>

      <div>
         <a href="#">Github</a>
         <a href="#">Youtube</a>
         <a href="#">Facebook</a>
      </div>
   </div>
</nav>
```

```navbar.css
/* ... */

/* Layout .navbar-nav */

.navbar-nav {
   display: flex;
   justify-content: space-between;
   padding: 0 15px;
}

/* Sizing links */

.navbar-link {
   display: inline-block;
   padding: 15px;
}
```

Ở bước này chúng ta đã đặt `display: flex` cho `.navbar-nav` để bắt đầu canh chỉnh bố cục bên trong. Tuy nhiên do không chỉ định độ rộng chiếm dụng cho 2 khối bên trong nên các khối này sẽ mặc định thu gọn quanh nội dung giống như `inline-block`. Thuộc tính `justify-content` được sử dụng để dàn chỉnh nội dung của `.navbar-nav` với giá trị `space-between` - có nghĩa là nếu còn khoảng trống thì sẽ đặt ở giữa 2 khối chứ không đặt ở bên phải khối thứ 2. Như vậy bố cục của `.navbar-nav` lúc này có sẽ có dạng:

`[khối liên kết 1] - khoảng trống - [khối liên kết 2]`
![](https://images.viblo.asia/4dcd86a3-df06-4fe8-972b-f2e58780b3f8.png)

Logic hiển thị của `flex` khác với `grid` ở chỗ. Chúng ta không định nghĩa `template` hay bố cục tổng quan rồi gắn các thành phần vào `template`, mà thay vào đó các phần tử bên trong `flex` đều được coi là nội dung `content` hay `items` và được dàn trải với các thuộc tính sắp xếp, canh chỉnh, gần giống như việc canh chỉnh các nội dung văn bản. Và với thuộc tính `flex-grow`, chúng ta có thể khiến các khối nội dung này mở rộng như các khối `block` thông thường hoặc thu gọn giống như các khối `inline-block`.

Điều này khiến cho `flex` trở nên phù hợp hơn so với `grid` khi làm việc ở cấp độ dàn chỉnh gần với các phần tử tạo nội dung chi tiết. Bởi vì thường thì chúng ta sẽ không biết trước kích thước của các nội dung được sử dụng trong các thành phần, ví dụ như các danh sách liên kết dài hay ngắn; Do đó việc phân chia tỉ lệ giữa các thành phần này không thể thực hiện trước ở dạng ước tính mà cần có sự đáp ứng linh hoạt.

Ngoài ra, `flex` vẫn còn những thuộc tính khác nữa hỗ trợ cho thao tác canh chỉnh nội dung của chúng ta trở nên cực kỳ linh động:

- Module `flex` - [W3schools](https://www.w3schools.com/css/css3_flexbox.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) - giới thiệu tổng quan về nhóm thuộc tính `flex`.
- `flex-direction` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex-direction.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction) - chỉ định trục chính để hiển thị nội dung theo phương ngang (mặc định) hoặc theo phương dọc.
- `flex-wrap` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex-wrap.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap) - thiết lập chế độ tự động chuyển dòng hoặc hiển thị tràn container.
- `flex-flow` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex-flow.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-flow) - cú pháp gộp cho `flex-direction` và `flex-wrap`.
- `flex-grow` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex-grow.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-grow) - thiết lập kích thước chiếm dụng cho phần tử con của `flex` container.
- `flex-shrink` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex-shrink.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-shrink) - thiết lập cơ chế thu gọn kích thước cho phần tử con của `flex` container.
- `flex-basis` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex-basis.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-basis) - thiết lập kích thước khởi điểm cho phần tử con của `flex` container.
- `flex` - [W3schools](https://www.w3schools.com/cssref/css3_pr_flex.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) - cú pháp gộp cho `flex-grow`, `flex-shrink`, và `flex-basis`.
- `order` - [W3schools](https://www.w3schools.com/cssref/css3_pr_order.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/order) - thiết lập thủ công thứ tự hiển thị cho phần tử con của `flex` container.
- `justify-content` - [W3schools](https://www.w3schools.com/cssref/css3_pr_justify-content.asp) | [**MDN**](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) - dàn chỉnh nội dung theo phương hiển thị chính `flex-direction`.
- `align-items` - [W3schools](https://www.w3schools.com/cssref/css3_pr_align-items.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) - canh chỉnh nội dung theo phương hiển thị phụ (vuông góc với `flex-direction`).
- `justify-self` - [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-self) - áp dụng cho phần tử con bên trong `flex` container để ghi đè `justify-content` của container cha.
- `align-self` - [W3schools](https://www.w3schools.com/cssref/css3_pr_align-self.asp) | [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-self) - áp dụng cho phần tử con bên trong `flex` container để ghi đè `align-items` của container cha.

Bài viết giới thiệu về 2 nhóm thuộc tính `grid` và `flex` của chúng ta đến đây là kết thúc. Đây cũng là bài viết cuối cùng trong `Sub-Series CSS` của [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m). Mình hy vọng rằng ở thời điểm này bạn đã cảm thấy hoàn toàn tự tin để có thể tự tìm hiểu những kiến thức CSS bổ trợ khi cần thiết.

Thực tế thì Series CSS của chúng ta đã đi qua những công cụ phổ biến nhất của CSS đang được sử dụng trong các `framework` hiện tại. Vì vậy nên khả năng là chỉ khi nào bạn cần làm việc với các bộ code cũ của ai đó khác, thì việc tìm hiểu thêm các nhóm công cụ cũ (ví dụ như `float`) mới trở nên cần thiết. Chúc bạn tự tin và giàu cảm hứng để tạo ra những thiết kế web đẹp và thân thiện với người dùng.