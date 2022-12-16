Sau thanh điều hướng và phần hiển thị nội dung giới thiệu qua về trang web, thành phần tiếp theo mà chúng ta sẽ bổ sung vào trang chủ là phần hiển thị nội dung chính với các trích đoạn nội dung từ những bài viết mới nhất. Người dùng có thể đọc qua tiêu đề và những trích đoạn nội dung này để quyết định nhấn vào liên kết chuyển hướng tới trang đơn bài viết tương ứng.

## Bổ sung component/main

Khu vực hiển thị nội dung chính dạng này còn được sử dụng trong các trang đơn danh mục để hiển thị tập trung chỉ các trích đoạn của những bài viết mới nhất thuộc danh mục đó. Vì vậy nên chúng ta sẽ tạo thêm một `component` mới với tên là `main.ejs`.

```structure.txt
[view]
.  |
.  +-----[component]
.           |
.           +-----meta.ejs
.           +-----topnav.ejs
.           +-----header.ejs
.           +-----script.ejs
.           |
.           +-----main.ejs
```

Nội dung của mỗi khối trích đoạn `entry` sẽ chỉ đơn giản là bao gồm tiêu đề, văn bản nội dung ngắn, và liên kết dẫn tới bài viết tương ứng.

```view/component/main.ejs
<main id="main">
   <div class="container">

      <section class="entry">
         <h2> Bài Viết Thứ 1001 </h2>
         <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting 
            industry. Lorem Ipsum has been the industry's standard dummy text 
            ever since the 1500s, when an unknown printer took a galley of 
            type and scrambled it to make a type specimen book. It has survived 
            not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged...
         </p>
         <a href="#"> Đọc tiếp </a>
      </section>
   
      <section class="entry">
         <h2> Bài Viết Thứ 1000 </h2>
         <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, 
            making it over 2000 years old. Richard McClintock, a Latin professor 
            at Hampden-Sydney College in Virginia, looked up one of the more 
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and 
            going through the cites of the word in classical literature, discovered 
            the undoubtable source...
         </p>
         <a href="#"> Đọc tiếp </a>
      </section>
   
      <!-- copy/paste thêm một số .entry nữa ở đây -->
      
   </div><!-- .container -->
</main>
```

## Bổ sung code CSS

Tiêu đề của các `entry` được hiển thị nhỏ hơn so với nội dung chính và chỉ cần đủ tương phản để nổi bật so với đoạn văn bản ngắn đi kèm. Ở đây mình vẫn sẽ sử dụng `line-height` với mật độ hiển thị khá kín kẽ so với đoạn văn bản thông thường. Liên kết điều hướng vẫn sẽ có một chút hiệu ứng `hover` nhẹ.

```structure.txt
[public]
.  |
.  +-----[css]
.          |
.          +-----[component]
.          |        |
.          |        +-----base.css
.          |        +-----topnav.css
.          |        +-----header.css
.          |        |
.          |        +-----main.css
.          |
.          +-----style.css
```

```public/css/component/main.css
#main {
   color: black;
   background: white;
   border-bottom: 1px solid lightgray;
}

#main {
   padding: 45px 0;
}

.entry {
   padding: 27px 0;
}

.entry:not(:first-child) {
   border-top: 1px solid lightgray;
}

.entry h2 {
   font-size: 1.618em;
   line-height: 1.2;
}

.entry p {
   margin: 18px 0;
}

.entry a {
   color: black;

   display: inline-block;
   height: 42px;
   line-height: 42px;
}

.entry a:hover {
   text-decoration: none;
}
```

```public/css/style.css
@import "./component/base.css";
@import "./component/topnav.css";
@import "./component/header.css";
@import "./component/main.css";
```

Chạy test để xem kết quả hiển thị mẫu.

```CMD|Terminal.io
npm test

Server Started
```

![](https://images.viblo.asia/071240f7-fa17-4aff-8813-b2d291087274.png)

## Cung cấp tham số data

Dữ liệu mà `component` này cần sử dụng là một mảng các `object` chứa thông tin về tiêu đề, trích đoạn văn bản ngắn, và liên kết tới bài viết. Do đó chúng ta có thể tạo một khóa duy nhất cho mảng dữ liệu là `entry-list` và định nghĩa một `type` riêng cho các `object` trong mảng này là một `class` có tên `Entry`.

```view/type/Data.js
const Data = class extends Map {
   constructor() {
      super();

      /* --- meta.ejs */
      /* --- topnav.ejs */
      /* --- header.ejs */

      /* --- main.ejs */
      this.set("entry-list", []);

      return this;
   }
}; // Data

module.exports = Data;
```

```view/type/Entry.js
const Entry = class extends Map {
   constructor() {
      super();

      this.set("title", "Tiêu đề bài viết")
          .set("excerpt", "Đoạn văn bản nội dung ngắn...")
          .set("url", "#");

      return this;
   }
}; // Entry
```

Thao tác lặp qua mảng dữ liệu được cung cấp và tạo ra các phần tử HTML thì chúng ta đã quá quen thuộc rồi.

```view/component/main.ejs
<main id="main">
   <div class="container">

   <% for (var entry of data.get("entry-list")) { %>
      <section class="entry">
         <h2> <%= entry.get("title") %> </h2>
         <p> <%= entry.get("excerpt") %> </p>
         <a href="<%= entry.get("url") %>"> Đọc tiếp </a>
      </section>
   <% } %>

   </div><!-- .container -->
</main>
```

Bây giờ thì chúng ta cần giả lập dữ liệu truy vấn được từ đâu đó và truyền vào `view` và chạy `test` để kiểm tra hoạt động của code `template` mới viết.

```express-blog/data.js
const Data = require("./view/type/Data");
const Category = require("./view/type/Category");
const Entry = require("./view/type/Entry");

var data = new Data()

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
   TopNav ...
*/

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
   Main
*/

var entry1 = new Entry()
   .set("title", "Bài Viết Thứ 1001")
   .set("excerpt", "Nội dung trích đoạn mở đầu bài viết thứ 1001 ...")
   .set("url", "/article/view/1000");

var entry2 = new Entry()
   .set("title", "Bài Viết Thứ 1000")
   .set("excerpt", "Nội dung trích đoạn mở đầu bài viết thứ 1001 ...")
   .set("url", "/article/view/999");

data.set("entry-list", [
   entry1,
   entry2
]);

module.exports = data;
```

```CMD|Terminal.io
npm test

Server Started
```

![](https://images.viblo.asia/17b6cf47-694e-4814-91a9-7bc534080829.png)

Như vậy là chúng ta đã thực hiện xong những thành phần chính trong trang chủ blog. Về phần chân trang web thì đây không hẳn là nội dung quá quan trọng và chúng ta sẽ để dành thời gian cho các `layout` khác. Bây giờ thì chúng ta sẽ quay lại với Sub-Series ExpressJS một chút để viết một `route` xử lý cho yêu cầu xem trang chủ và tản mạn về tổng quan kiến trúc của bộ code `express-blog` mà chúng ta đang viết.

[[ExpressJS] Bài 7 - Viết Code Điều Hành Blog Cá Nhân (Tiếp Theo)](https://viblo.asia/p/E375zAr2lGW)

Và trong bài viết tiếp theo của Sub-Series EJS, chúng ta sẽ bắt đầu thảo luận về nhóm `layout` hiển thị nội dung các trang bài viết là `article`.

[[EJS] Bài 6 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/aWj53xnYK6m)