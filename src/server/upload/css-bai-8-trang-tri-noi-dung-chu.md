Chúng ta đã sử dụng thuộc tính `font-size` vài lần để thay đổi kích thước của nội dung văn bản trước đó. Hãy cùng gặp gỡ một vài thuộc tính hỗ trợ trang trí nội dung chữ trong CSS. Sau đó, chúng ta sẽ cùng xây dựng một thanh điều hướng đơn giản.

## Thay đổi phong cách hiển thị chữ

Chúng ta đã sử dụng thuộc tính `font-size` để thay đổi kích cỡ chữ của các nội dung văn bản. Và ở đây là một vài thuộc tính `font` phổ biến khác:

- `font-weight` - hiển thị chữ in đậm/bình thường.
- `font-style` - hiển thị chữ in nghiêng/bình thường.
- `font-family` - chỉ định họ font sử dụng để hiển thị.

Hãy cùng viết một đoạn code CSS để xem các thuộc tính này hoạt động như thế nào. Chúng ta sẽ tạo ra một vài đoạn văn bản:

- Đoạn thứ nhất được in đậm, nhưng không in nghiêng.
- Đoạn thứ hai không in đậm, nhưng được in nghiêng.
- Đoạn cuối cùng sử dụng font `mono-space` thường dùng để hiển thị code.

```font.css
body {
   font-size: 32px;
}

.text-bold {
   font-weight: bold;
   /* font-weight: normal; is set by default */
}

.text-italic {
   font-style: italic;
   /* font-style: normal; is set by default */
}

.font-mono {
   font-family: 'Consolas', 'Monaco', monospace;
}
```

```font.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Font Properties</title>
      <link rel="stylesheet" href="font.css">
   </head>
   <body>
      <p class="text-bold">
         This text looks bold and straight.
      </p>

      <p class="text-italic">
         This text looks thin and italicilized.
      </p>

      <p class="font-mono">
         wHere are you ?<br>
         .I<br>
         .Am<br>
         .!
      </p>
   </body>
</html>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/ExojamV)

Như bạn đã thấy thì chúng ta có thể chỉ định nhiều hơn 1 họ font trong `font-family` để đảm bảo rằng ít nhất có 1 font được tìm thấy và sử dụng.

## Tìm và sử dụng các font miễn phí

Chúng ta có thể sử dụng các font chưa có sẵn trên thiết bị của người dùng bằng cách nhúng các font này vào trang web. Có nhiều trang web đang hỗ trợ chia sẻ các font miễn phí để bạn có thể sử dụng cho thiết kế của mình. Một trong số những trang web đó là [Google Fonts](https://fonts.google.com/).

Đầu tiên thì bạn cần truy cập Google Fonts và tìm một font muốn sử dụng. Sau đó, bạn click chuột vào biểu tượng dấu hình dấu cộng `+` ở góc phía trên bên phải.

![](https://images.viblo.asia/81d23e9e-72d5-4980-9666-38d487a72232.jpg)

Sau đó bạn chọn vào thanh `selected` ở phía dưới của cửa sổ trình duyệt web, copy/paste mã HTML được cung cấp vào trang đơn của bạn.

![](https://images.viblo.asia/80a6c371-50f5-4ea9-92ff-6e91e29248a0.jpg)

Bây giờ thì bạn đã có thể sử dụng font vừa chọn trong code CSS.

```free.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Free Font</title>
      <link rel="stylesheet" href="free.css">
      
      <link href="https://fonts.googleapis.com/css?family=Megrim" rel="stylesheet">
   </head>
   <body>
      <h1>
         Almost before we knew it,<br>
         we had left the ground.
      </h1>
   </body>
</html>
```

```free.css
h1 {
   font-family: 'Megrim', cursive;
}
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/xxpGbXO)

## Trang trí và biến đổi nội dung chữ

Bên cạnh hiệu ứng in đậm và in nghiêng, chúng ta cũng có thể nhấn mạnh một đoạn nội dung chữ bằng cách sử dụng thuộc tính `text-decoration`. Thuộc tính này có thể được sử dụng cùng với 1 trong các giá trị sau:

- `overline` - gạch ngang trên đầu chữ
- `underline` - gạch nang dưới chân chữ
- `line-through` - được dùng để... ~~a train~~
- `none` - xóa các hiệu ứng `decoration` (nếu có)

```deco.css
.text-overline {
   text-decoration: overline;
}

.text-underline {
   text-decoration: underline;
}

.text-linethrough {
   text-decoration: line-through;
}

.no-decoration {
   text-decoration: none;
}
```

```deco.html
<html>
   <head>
      <meta charset="utf-8">
      <title></title>
      <link rel="stylesheet" href="deco.css">
   </head>
   <body>
      <p class="text-overline">heaven</p>
      <p class="text-underline">earth</p>
       <p class="text-linethrough">a train</p>
       <a class="no-decoration" href="#">a link</a>
   </body>
</html>
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/RwxPNMx)

Để đảm bảo rằng kết quả hiển thị cuối cùng của các nội dung chữ được đồng nhất
trong một số phần đặc biệt của trang web ví dụ như thanh điều hướng, chúng ta 
có thể sử dụng thuộc tính `text-transform`. Thuộc tính này có thể được sử dụng 
cùng với một trong các giá trị sau:

- `capitalized` - Chữ Cái Đầu Tiên Của Mỗi Từ Nên Được Viết Hoa
- `lowercase` - tất cả mọi thứ trên thế giới nên được viết chữ thường
- `uppercase` - TẤT CẢ MỌI THỨ TRONG VŨ TRỤ NÊN ĐƯỢC VIẾT IN HOA
- `none` - xóa các hiệu ứng `transform` (nếu có)

## Canh chỉnh chữ và thay đổi chiều cao dòng

Để canh giữa nội dung chữ theo phương ngang, chúng ta có thể sử dụng thuộc tính 
`text-align`. Thuộc tính này có thể được sử dụng với 1 trong 3 giá trị sau:

- `left` - canh sát lề trái (được thiết lập mặc định)
- `center` - canh chính giữa dòng
- `right` - canh sát lề phải

Đưới đây là một ví dụ sử dụng `text-align` với 3 đoạn văn bản:

```align.css
html { font-size: 32px; }

body { font-family: Georgia, serif; }

.text-left { text-align: left; }

.text-center { text-align: center; }

.text-right { text-align: right; }
```

```align.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Align</title>
      <link rel="stylesheet" href="align.css">
   </head>
   <body>
      <p class="text-left">
         when we don't know<br>
         what we want<br>
         we choose Left
      </p>

      <p class="text-center">
         when we just live<br>
         we do not choose
      </p>

      <p class="text-right">
         when we realy know<br>
         what we want<br>
         we choose Right
      </p>
   </body>
</html>
```

[Xem kết quả hiển thị](https://codepen.io/semiarthanoi/full/vYpOEap)

Bên cạnh việc canh chỉnh chữ theo phương ngang, việc kiểm soát chiều cao dòng `line-height` cũng rất quan trọng để giúp cho các nội dung văn bản của chúng ta được hiển thị trực quan, dễ đọc.

Thuộc tính `line-height` thường được sử dụng với một giá trị `px` hoặc `%`. Nếu như bạn sử dụng một giá trị `%`, giá trị này sẽ được tính dựa trên kích thước `font-size` hiện tại của phần tử.

```line.css
html { font-size: 16px; }

body { font-family: Georgia, sans-serif; }

p { line-height: 240%; }
```

```line.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>Line</title>
      <link rel="stylesheet" href="line.css">
   </head>
   <body>
      <p>
         When we don't know what we want, we choose Left.<br>
         When we realy know what we want, we choose Right.<br>
         When we just live, we do not choose.
      </p>
   </body>
</html>
```

[**Xem kết quả hiển thị**](https://codepen.io/semiarthanoi/full/vYpOEQd)

Thuộc tính `line-height` cũng rất hữu dụng khi chúng ta muốn canh giữa nội dung chữ theo phương dọc. Nếu như nội dung chữ chỉ có một dòng thì chúng ta chỉ cần đặt giá trị `line-height` bằng với chiều cao của phần tử HTML đó.

## Xây dựng một thanh điều hướng đơn giản

Vì lý do bài viết hiện tại của chúng ta đã khá dài ở thời điểm hiện tại, mình quyết định di chuyển phần này tới một bài viết tách rời để bạn tiện theo dõi. Vì vậy nên bạn hãy giữ Tab
web này mở và click vào liên kết bên dưới nhé.

[[HTML + CSS] Xây dựng một thanh điều hướng tối giản](https://viblo.asia/p/1Je5EApL5nL)

Bạn đã hoàn thành việc xây dựng thanh điều hướng cho trang web của mình chưa? :D  
Khá dễ dàng phải không? :D

Vẫn còn nhiều công cụ hữu ích khác (các bộ chọn & các thuộc tính) đang chờ đọi chúng ta khám phá. Trong bài viết tiếp theo, chúng ta sẽ gặp lại các bộ chọn của CSS. :D

[[CSS] Bài 9 - Kết Hợp Các Bộ Chọn](https://viblo.asia/p/WAyK8rxWlxX)