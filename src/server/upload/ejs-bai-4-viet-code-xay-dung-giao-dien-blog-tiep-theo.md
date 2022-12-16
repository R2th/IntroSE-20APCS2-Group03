Thành phần tiếp theo trong trang chủ của blog là khối `header` với thông tin giới thiệu tổng quan.

## Bổ sung component/header

Đây cũng là thành phần được sử dụng chung cho các trang đơn khác như các trang danh mục và các trang bài viết. Do đó chúng ta sẽ tạo một `component` mới với tên tương ứng là `header.ejs`.

```structure.txt
[view]
.  |
.  +-----[component]
.           |
.           +-----meta.ejs
.           +-----topnav.ejs
.           +-----script.ejs
.           |
.           +-----header.ejs
```

Ở đây chúng ta sẽ chỉ sử dụng thiết kế đơn giản với 1 tiêu đề và 1 đoạn nội dung giới thiệu ngắn.

```view/component/header.ejs
<header id="header">
   <div class="container">
      <h1> Chào Bạn. Mình Là Kei. </h1>
     
     <p>
        Đây là trang blog cá nhân đơn giản được xây dựng trên nền NodeJS 
        với sự hỗ trợ của ExpressJS và EJS. Ở đây mình chia sẻ một những
        kiến thức lập trình web căn bản theo lộ trình học tập tự nhiên.
     </p>
   </div><!-- .container -->
</header>
```

## Bổ sung code CSS

Trong trường hợp sử dụng cho các trang bài viết, chúng ta cần dự trù là tiêu đề và đoạn thông tin giới thiệu sơ lược sẽ khá dài. Do đó ở đây mình tạm đặt `line-height` cho `heading` với mật độ hiển thị các dòng gần nhau.

```structure.txt
[public]
.  |
.  +-----[css]
.  |       |
.  |       +-----base.css
.  |       +-----topnav.css
.  |       +-----header.css
.  |
.  +-----style.css
```

```base.css
/* --- Reset CSS */
/* --- Basic Typography */

/* --- Common Container */

.container {
   max-width: 900px;
   padding: 0 27px;
   margin: 0 auto;
}
```

```header.css
#header {
   color: black;
   background: white;
   border-bottom: 1px solid lightgray;

   padding: 90px 0;
}

#header h1 {
   font-size: 4.236em;
   line-height: 1;
}

#header p {
   font-size: 1.382em;
   margin-top: 27px;
}
```

```style.css
@import "./component/base.css";
@import "./component/topnav.css";
@import "./component/header.css";
```

Chạy `test` để xem kết quả hiển thị mẫu.

```CMD|Terminal.io
npm test

Server Started
```

![](https://images.viblo.asia/fe7d0c66-0e3f-443a-99f8-9e297aee4524.png)

## Cung cấp tham số data

Do `header.ejs` còn được sử dụng chung với các trang đơn khác là `category` và `article`. Chúng ta sẽ không biết trước tiêu đề được sử dụng là tên danh mục hay tên bài viết. Do đó chúng ta sẽ chỉ đơn giản là cung cấp một tham số bằng khóa `heading` của `data`. Tương tự thì với đoạn mô tả ngắn chúng ta sẽ sử dụng tham số là khóa `description`.

```view/component/header.ejs
<header id="header">
   <div class="container">
      <h1 class="heading"> <%= data.get("heading") %> </h1>
      <p class="description"> <%= data.get("description") %> </p>
   </div><!-- .container -->
</header>
```

```view/type/Data.js
const Data = class extends Map {
   constructor() {
      super();

      /* --- meta.ejs */
      this.set("title", "The Blog");

      /* --- topnav.ejs */
      this.set("logo-text"    , "L O G O")
          .set("category-list", []       );

      /* --- header.ejs */
      this.set("heading"    , "Tiêu đề chính")
          .set("description", "Giới thiệu ngắn về trang đơn...");

      return this;
   }
}; // Data

module.exports = Data;
```

Chạy `test` để kiểm tra hoạt động của code `template`.

```CMD|Terminal.io
npm test

Server Started
```

![](https://images.viblo.asia/186eb544-710c-4836-9264-64c08d40b38b.png)

Lúc này tiêu đề và đoạn mô tả ngắn đã được sử dụng từ các giá trị mặc định của `class Data` cung cấp.
Bạn có thể viết code giả lập dữ liệu truy vấn được ở đâu đó trong tệp `data.js` để thử thay đổi nội dung
hiển thị nếu cảm thấy cần thiết.

Trong bài viết tiếp theo, chúng ta sẽ bổ sung khu vực `main` hiển thị các đoạn giới thiệu ngắn tới những
bài viết mới nhất.

[[EJS] Bài 5 - Viết Code Xây Dựng Giao Diện Blog (Tiếp Theo)](https://viblo.asia/p/gGJ59r7jKX2)