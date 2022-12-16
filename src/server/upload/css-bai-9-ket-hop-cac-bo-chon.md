Chúng ta không cần phải sử dụng tất cả các công cụ của CSS để có thể tạo ra được một website tốt. Tuy nhiên, nếu như chúng ta biết thêm nhiều công cụ hơn, thì điều đó cũng có nghĩa là chúng ta sẽ có thêm nhiều lựa chọn hơn để thực hiện ý tưởng của mình. Hãy cùng thảo luận thêm về các bộ chọn trong CSS.

## Kết hợp các bộ chọn trong CSS

Nếu như bạn đang thắc mắc là tại sao mình đã không đề cập đến việc kết hợp các bộ chọn từ những bài viết đầu tiên, thì... mình phải nói rằng đây là lỗi của mình. Chỉ đơn giản là mình quên mà thôi. :D

Trong mọi khía cạnh của cuộc sống, cách tự nhiên nhất mà chúng ta học bất kỳ thứ gì, chắc chắn không bao giờ là một lộ trình học tập thẳng tắp. Chặng đường mà chúng ta phải đi qua luôn luôn là các đường xoáy đệ quy liền mạch và tiếp diễn không ngừng.

`Một đường xoáy đệ quy`
![a spiral](https://images.viblo.asia/56f47327-f338-4bd0-b016-e7b4c8a859d7.jpg)

Chúng ta khởi đầu bằng việc học một vài thứ cơ bản và rồi bắt đầu tạo ra thứ gì đó; Sau đó chúng ta lại quay trở lại với những kiến thức trọng tâm để học nhiều thêm một chút nữa,
và tạo ra những thứ mới tốt đẹp hơn một chút; Và cứ như vậy.... Và bây giờ thì chúng ta đang bắt đầu một chu kỳ mới bằng việc học thêm về các bộ chọn CSS. :D

## Lợi ích của việc kết hợp các bộ chọn CSS là gì?

Hãy cùng nhìn lại ví dụ về [thanh điều hướng đơn giản](https://viblo.asia/p/html-css-xay-dung-mot-thanh-dieu-huong-toi-gian-1Je5EApL5nL) của chúng ta.

`topnav.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>A simple navigation bar</title>
      <link rel="stylesheet" href="topnav.css">
   </head>
   <body>
      <nav id="topnav">
         <a id="logo" class="nav-link" href="#">YOUR NAME</a>
         <a class="nav-link" href="#">Link 1</a>
         <a class="nav-link" href="#">Link 2</a>
         <a class="nav-link" href="#">Link 3</a>
         <a class="nav-link" href="#">Link 4</a>
         <a class="nav-link" href="#">Link 5</a>

         <a id="about" class="nav-link" href="#">About You</a>
      </nav>
   </body>
</html>
```

Để trang trí các liên kết, chúng ta đã đặt cho chúng một tên class có tính mô tả khá tốt `nav-link`. Nhưng nếu như bây giờ chúng ta có thêm một thanh điều hướng khác trong trang web thì sao? Bằng việc sử dụng trực tiếp tên class `nav-link` trong code CSS, chúng ta đã khiến tên class này không thể được sử dụng lại vào mục đích khác hay cho các thành phần khác trong trang web.

Thật may mắn, CSS cho phép chúng ta kết hợp các bộ chọn để chọn ra các phần tử chính xác hơn và giúp cho các tên class có thể được tái sử dụng cho nhiều thành phần khác nhau của trang web. Đoạn code dưới đây là một ví dụ về việc kết hợp các bộ chọn trong CSS. Trong ví dụ, có 2 khối code CSS:

- Khối đầu tiên sẽ chỉ chọn những `.nav-link` được đặt bên trong `#topnav`.
- Khối thứ hai sẽ chỉ chọn những `.nav-link` được đặt bên trong `#sidenav`.

`combine.css`
```css
#topnav .nav-link {
   /* styling .nav-link nested inside #topnav */
}

#sidenav .nav-link {
   /* styling .nav-link nested inside #sidenav */
}
```

## Làm thế nào để kết hợp các bộ chọn?

Việc kết hợp các bộ chọn CSS có thể được chia thành 3 kiểu và chúng ta sẽ nói về từng kiểu một:

1. Union & Intersection (Tổng Hợp & Phần Giao)
2. Next Sibling & Followed Siblings (Phần Tử Kế Cận & Các Phần Tử Theo Sau)
3. Children & Decendants (Các Phần Tử Con & Các Phần Tử Kế Thừa)

### 1. Union & Intersection

`Union` của nhiều bộ chọn thường được sử dụng để giảm việc viết lặp code CSS.

Hãy giả định rằng chúng ta muốn áp dụng cùng font chữ cho tất cả các tiêu đề trong trang web của chúng ta. Như vậy, đây sẽ là cách mà chúng ta viết CSS khi không kết hợp các bộ chọn.

`union.css`
```css
h1 { font-family: 'Arial', sans-serif; }
h2 { font-family: 'Arial', sans-serif; }
h3 { font-family: 'Arial', sans-serif; }
h4 { font-family: 'Arial', sans-serif; }
h5 { font-family: 'Arial', sans-serif; }
h6 { font-family: 'Arial', sans-serif; }
```

Đoạn mã được viết lại sau đây có thể đem lại kết quả hiển thị tương tự.

`union.css`
```css
h1, h2, h3, h4, h5, h6 {
   font-family: 'Arial', sans-serif;
}
```

Bằng cách viết tên các bộ chọn liền nhau phân tách bởi các dấu phẩy `,` chúng ta có thể viết các luật CSS được sử dụng chung và giảm được việc lặp code CSS. Và đó là `Union`. Bây giờ hãy cùng nói về `Intersection` (phần giao).

`Intersection` giúp chúng ta chọn lấy các phần tử chính xác hơn bằng cách viết liền tên một bộ chọn đứng ngay trước bộ chọn khác. Ví dụ dưới đây sẽ chỉ chọn các phần tử `<p>` là thành viên của `.exceprt` và ngược lại.

`intersection.css`
```css
p.excerpt {
  color: Gray;
}
```

`intersection.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Intersection</title>
      <link rel="stylesheet" href="intersection.css">
   </head>
   <body>
      <p>Phần tử này sẽ không được chọn.</p>

      <p class="excerpt">Dòng chữ này sẽ có màu xám Gray</p>

      <div class="excerpt">Phần tử này sẽ không được chọn</div>
   </body>
</html>
```

### 2. Next Sibling & Followed Siblings

Để chọn `next sibling`, phần tử kế cận tiếp theo, chúng ta có thể sử dụng một dấu cộng `+` để kết hợp các bộ chọn. Ví dụ dưới đây sẽ chỉ chọn duy nhất phần tử `<p>` đứng ngay sau `#unique`.

`next.css`
```css
#unique + p {
   color: Gray;
}
```

`next.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>The Next Door</title>
      <link rel="stylesheet" href="next.css">
   </head>
   <body>
      <h2>Một tiêu đề</h2>
      <p>Phần tử này sẽ không được chọn.</p>

      <h2 id="unique">Ai đang ở vị trí tiếp theo?</h2>
      <p>Tôi, màu của tôi là xám Gray</p>

      <h2>Một tiêu đề</h2>
      <p>Phần tử này sẽ không được chọn.</p>
   </body>
</html>
```

Nếu như chúng ta thay đổi `#unique` thành `h2` trong code CSS, tất cả 3 phần tử `<p>` đều sẽ được chọn. Trình duyệt web sẽ hiểu rằng chúng ta muốn chọn các phần tử `<p>` đứng ngay sau một phần tử `<h2>`.

Để chọn tất cả các `followed siblings`, các phần tử theo sau, chúng ta có thể sử dụng 1 dấu tidle `~` để kết hợp các bộ chọn. Hãy cùng thay đổi code của chúng ta một chút.

`followed.css`
```css
#unique ~ p {
   color: Gray;
}
```

`followed.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Followed by the Joy</title>
      <link rel="stylesheet" href="followed.css">
   </head>
   <body>
      <h2>Một tiêu đề</h2>
      <p>Phần tử này sẽ không được chọn.</p>

      <h2 id="unique">Ai đang theo sau tôi?</h2>
      <p>Tôi, màu của tôi là xám Gray.</p>

      <h2>Một tiêu đề</h2>
      <p>Tôi nữa, màu của tôi cũng là xám Gray.</p>
   </body>
</html>
```

### 3. Children & Decendants

Để chọn các `children`, các phần tử con, chúng ta có thể sử dụng một dấu lớn `>` để kết hợp các bộ chọn. Ví dụ dưới đây sẽ chỉ chọn các liên kết `<a>` là các phần tử con của `#topnav`, nhưng không chọn hết tất cả các phần tử `<a>` bên trong `#topnav`.

`children.css`
```css
#topnav > a {
   color: Gray;
}
```

`children.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Children</title>
      <link rel="stylesheet" href="children.css">
   </head>
   <body>
      <nav id="topnav">
         <!-- children -->
         <a href="#">Gray</a>
         <a href="#">Gray</a>

         <div><!-- other descendants -->
            <a href="#">Không được chọn</a>
            <a href="#">Không được chọn</a>
            <a href="#">Không được chọn</a>
         </div>
      </nav>
   </body>
</html>
```

Để chọn tất cả các `decendants`, các phần tử xếp chồng của `#topnav`, chúng ta chỉ cần bỏ dấu lớn `>` đã sử dụng.

`decendants.css`
```css
#topnav a {
   color: Gray;
}
```

`decendants.html`
```html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Descendants</title>
      <link rel="stylesheet" href="descendants.css">
   </head>
   <body>
      <nav id="topnav">
         <!-- children -->
         <a href="#">Gray</a>
         <a href="#">Gray</a>

         <div><!-- other descendants -->
            <a href="#">Gray</a>
            <a href="#">Gray</a>
            <a href="#">Gray</a>
         </div>
      </nav>
   </body>
</html>
```

Trong tất cả các ví dụ từ đầu bài viết này, mình đã sử dụng các bộ chọn `id` để giải thích cách hoạt động của code dễ hơn. Tuy nhiên, bộ chọn được sử dụng ở phía trước hoàn toàn có thể là các bộ chọn class hoặc các bộ chọn thông thường.

Bài viết về kết hợp các bộ chọn trong CSS của chúng ta tới đây là kết thúc. Trong bài viết tiếp theo, chúng ta sẽ cùng nói về các class giả định. Các bộ chọn này sẽ giúp chúng ta tạo ra các hiệu ứng tương tác với người dùng trang web. Ví dụ như khi người dùng rê trỏ chuột tới 1 liên kết và màu của liên kết đó sẽ được thay đổi.

[[CSS] Bài 10 - Các Class Giả Định](https://viblo.asia/p/css-bai-10-cac-class-gia-dinh-aWj53xVGK6m)