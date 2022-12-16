Trong bài viết này, chúng ta sẽ nói về một số thẻ hỗ trợ tạo ra các phần tử sử dụng để vẽ các giao diện đồ họa linh động như các đồ thị hay giao diện của các ứng dụng phức tạp. Bên cạnh đó thì chúng ta cũng sẽ có một phần giới thiệu ngắn về các thuộc tính tự tạo để gắn vào các phần tử HTML. Các thuộc tính này được sử dụng để lưu trữ các dữ liệu dùng trong các phần mềm mà chúng ta sẽ xây dựng trên nền trình duyệt web.

## Các thẻ hỗ trợ đồ họa `<canvas>` và `<svg>`

Thẻ `<canvas>` (giấy vẽ) được sử dụng để tạo ra một container cho người viết code có thể vẽ các giao diện đồ họa phức tạp bằng JavaScript. Các `object` mô tả phần tử `<canvas>` trong JavaScript cung cấp các phương thức dựng sẵn để hỗ trợ vẽ các đường, khối vuông, khối tròn, chữ, và in nội dung ảnh vào khung `<canvas>`.

Các `<canvas>` sẽ được hiển thị như các phần tử `<img>` trong trang web với kiểu container là `inline-block`. Sau khi đã được trình duyệt web hiển thị xong nội dung, các `<canvas>` cũng có thể được người dùng lưu lại dưới dạng tệp ảnh `.png`.

Do mục đích sử dụng đặc định là vẽ nội dung bằng JavaScript nên các `<canvas>` thường được tạo ra kèm theo `id` để dễ tham chiếu từ code JavaScript.

```japan.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Japan</title>
   <link rel="stylesheet" href="japan.css">
</head>
<body>
   <canvas id="the-canvas"></canvas>
</body>
</html>
```

`japan.css`
```css
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

body {
   padding: 30px 15px;
   background: lightgray;
}

#the-canvas {
   display: block;
   margin: 0 auto;
   background: white;
   box-shadow: 9px 12px 6px gray;
}
```

`japan.js`
```js
var canvas = document.getElementById('the-canvas');
var context = canvas.getContext('2d');

var circle = new Path2D();
circle.arc(360, 240, 150, 0, 2 * Math.PI);

context.stroke(circle);
context.fillStyle = 'crimson';
context.fill(circle);
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/OJzNjej)

Trong khi `<canvas>` được sử dụng để tạo ra nội dung đồ họa với kích thước tĩnh với số lượng điểm ảnh không thay đổi sau khi khởi tạo `pixel based`; Thì `<svg>` ở mặt khác lại được thiết kế để trình bày các đối tượng đồ họa dạng Vector - thường được tạo ra bởi các phần mềm thiết kế đồ họa như [Inkscape](https://inkscape.org/) hay [Illustrator](https://en.wikipedia.org/wiki/Adobe_Illustrator) và có thể được lưu lại với định dạng tệp `.svg`.

Khác với các ảnh `pixel based`, các đối tượng đồ họa vector không có kích thước hiển thị cố định, mà thay vào đó được định nghĩa bởi các vector tương quan. Các vector này sẽ được thu phóng linh động trên các khung ảnh với kích thước khác nhau bất kể lớn hay nhỏ cũng sẽ đều cho kết quả hiển thị mượt mà, không có hiện tượng vỡ nét, hay bị nhòe như các ảnh `pixel based` khi được hiển thị trên khung ảnh lớn hơn.

Để làm được điều này thì các tệp `.svg` thực hiện lưu trữ thông tin định nghĩa các đối tượng trong khung ảnh bằng code `XML` có cú pháp tương đồng với `HTML`. Do đó chúng ta có thể trích xuất code `XML` từ các tệp thiết kế đồ họa và nhúng vào trang web để sử dụng.

Trong trường hợp sử dụng `<svg>`, ngoài tiện ích về chất lượng hiển thị thì trình duyệt web cũng sẽ tạo ra các `object` mô tả các đối tượng đồ họa giống với các object `Element` mô tả các phần tử HTML; Và chúng ta có thể gắn các hàm xử lý sự kiện tương tác với người dùng. Điều này thuận tiện hơn rất nhiều so với việc xác định vị trí người dùng click chuột trên `<canvas>`.

```vietnam.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Việt Nam</title>
   <link rel="stylesheet" href="vietnam.css">
</head>
<body>
   <div id="the-flag">
      <svg width="720" height="480">
         <rect x="0" y="0" width="720" height="480" fill="crimson" />
         <polygon points="360,90 240,390 540,195 180,195 480,390" fill="yellow" />
      </svg>
   </div>
</body>
</html>
```

```vietnam.css
* {
   box-sizing: border-box;
   margin: 0;
   padding: 0;
}

body {
   padding: 30px 15px;
   background: lightgray;
}

#the-flag {
   display: block;
   width: 720px;
   height: 480px;
   margin: 0 auto;
   box-shadow: 6px 12px 9px gray;
}
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/rNpeGva)

## Các thuộc tính tự tạo `data-*`

HTML cho phép chúng ta định nghĩa các thuộc tính có tên dạng `data-*` để lưu trữ dữ liệu vào các object `Element` mô phỏng các phần tử. Giá trị của các thuộc tính này có thể được truy xuất và sử dụng trong code CSS và JavaScript. Điều này cho phép chúng ta tạo ra các giao diện người dùng có khả năng tương tác linh động hơn và cung cấp trải nghiệm sử dụng tốt hơn. Đồng thời, với phương thức lưu trữ dữ liệu này, chúng ta có thể tạo ra các ứng dụng với tính năng phong phú trên nền trình duyệt web mà không cần tương tác thường xuyên với máy chủ web.

Một ứng dụng khác của các thuộc tính `data-*`, đó là trong các framework cung cấp các thành phần với khả năng tùy biến mạnh mẽ như [Bootstrap](https://getbootstrap.com/) hay [Foundation](https://get.foundation/), chúng ta có thể gặp các thuộc tính `data-*` được sử dụng làm các tham số trạng thái cho nhiều thành phần tương tác.

Ví dụ điển hình là trong Bootstrap, một số thành phần có thể được tắt tính năng hỗ trợ tương tác với người dùng màn hình cảm ứng bằng cách thêm vào thuộc tính `data-bs-touch="false"` (hoặc `true` nếu muốn hỗ trợ). Điều này cung cấp cho người sử dụng framework một giao diện triển khai đơn giản mà không cần viết thêm code JavaScript để tùy chỉnh các tính năng hỗ trợ.

```article.html
<!doctype html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta http-equiv="X-UA-Compatible" content="IE=edge">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>An article</title>
</head>
<body>
   <article id="article" data-post-id="1001">
      <h1>
         [HTML] Bài 9 - Các thẻ hỗ trợ đồ họa & Các thuộc tính tự tạo
      </h1>
      <p>
         Trong bài viết này, chúng ta sẽ nói về một số thẻ hỗ trợ tạo 
         ra các phần tử sử dụng để vẽ các giao diện đồ họa linh động
         như các đồ thị hay giao diện của các ứng dụng phức tạp. Bên 
         cạnh đó thì chúng ta cũng sẽ có một phần giới thiệu ngắn về
         các thuộc tính tự tạo để gắn vào các phần tử HTML...
      </p>
   </article>

   <script src="article.js"></script>
</body>
</html>
```

```article.js
var article = document.getElementById('article');
var postId = article.dataset.postId;
console.log(postId);
// result: '1001'
```

Bài viết giới thiệu về các thẻ hỗ trợ đồ họa và các thuộc tính tự tạo của chúng ta đến đây là kết thúc. Đây cũng là bài viết cuối cùng của `Sub-Series HTML` trong [Tự Học Lập Trình Web Một Cách Thật Tự Nhiên](https://viblo.asia/s/Wj53OQQP56m). Mình hy vọng rằng ở thời điểm này bạn đã cảm thấy hoàn toàn tự tin để có thể tự tìm hiểu những kiến thức HTML bổ trợ khi cần thiết. Series HTML của chúng ta đã đi qua các thẻ phổ biến nhất đang được sử dụng trong các framework hiện tại. Để tiện cho việc tra cứu và sử dụng các thẻ HTML khác khi cần đến, bạn có thể lưu lại 2 liên kết tham khảo sau:

- [Tài liệu hướng dẫn tự học HTML của W3schools](https://www.w3schools.com/html/)
- [Tài liệu hướng dẫn tự học HTML của MDN](https://developer.mozilla.org/en-US/docs/Web/HTML)