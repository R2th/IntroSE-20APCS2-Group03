Chúng ta đều đã biết rằng HTML có thể giúp chúng ta nói chuyện được với các trình duyệt web và nhờ có đó thì chúng ta có thể yêu cầu trình duyệt hiển thị bất kỳ loại nội dung nào mà chúng ta mong muốn. Tuy nhiên sự thật là không có thẻ HTML nào có thể giúp chúng ta nói với các trình duyệt web rằng những nội dung cần được trình bày đẹp mắt như thế này hay như thế kia.

Không có gì đáng thất vọng cả. HTML quá đơn giản. Đơn giản trong cả cách học và cách sử dụng. Chính vì vậy mà ngôn ngữ này không thể giúp chúng ta thực hiện được quá nhiều mục tiêu. Mọi thứ đều có khả năng và giới hạn của riêng nó. Lửa có thể đem lại sự sống và kiến thức, nhưng chúng ta cũng cần tới trí tuệ và sự chữa lành của Nước. Và vì vậy nên... [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) có mặt ở đó để hoàn thiện `HTML`. :D

Ok. Nói chuyện vu vơ vậy đủ rồi. Dưới đây là phiên bản giới thiệu ngắn hơn về CSS. :D

- CSS là một ngôn ngữ đơn giản khác giúp chúng ta nói chuyện được với các trình duyệt web.
- CSS giúp chúng ta biến các trang web trở nên bắt mắt, dễ nhìn, và đẹp đẽ hơn.
- Việc học CSS rất đơn giản và rất rất rất vui. :D :D :D

`Khi chỉ có HTML`
![HTML only](https://images.viblo.asia/4f8cd761-de7f-4cc0-aa05-28e769350e42.jpg)

`Và khi có thêm CSS`
![HTML plus CSS](https://images.viblo.asia/2f5d80a9-aff6-4231-9326-85571afa77b4.jpg)

Ồ... Mình không có ý nói là tấm ảnh chụp màn hình thứ hai trông đẹp hơn so với tấm đầu tiên; Bởi vì mình không có năng khiếu với mấy thứ liên quan tới thiết kế cho lắm. Tuy nhiên thì mình đảm bảo rằng CSS có thể giúp bạn tạo ra các trang web đẹp mắt và có sức sống hơn so với các văn bản HTML đen trắng. :D

> Nếu không có HTML thì sẽ không có website nào tồn tại cả.  
> Nếu không có CSS thì sẽ không có website nào trông đẹp mắt cả.  
> *_Một người sử dụng máy tính*

## Vậy code CSS trông như thế nào?

```style.css
section {
   color: white;
   background-color: crimson;
}

h1 { font-size: 27px; }

p { font-size: 18px; }
```

Bạn có cảm thấy rằng CSS có phần dễ đoán và chi tiết hơn so với HTML không? :D

Để mình giải thích một chút về đoạn code ví dụ ở trên nhé:

- Có 3 khối code CSS trong ví dụ ở trên. Mỗi khối đều có 1 cặp ngoặc xoắn `{}` để nhóm cái gì đó.
- Đứng ngay phía trước các khối `{}` là các `selector` (bộ chọn) - giúp chúng ta chọn ra những phần tử HTML mà chúng ta muốn trang trí.
- Bên trong mỗi khối `{}` có một vài luật CSS giúp chúng ta nói với các trình duyệt nên hiển thị các phần tử HTML đã chọn `như thế nào`. Cụ thể là `màu chữ: trắng`, `màu nền: đỏ thắm`, `cỡ chữ h1: 27px`, `cỡ chữ p: 18px`.
- Mỗi luật CSS đều được kết thúc bằng một dấu chấm phẩy `;` và có hai phần được phân tách bởi dấu hai chấm `:`
- Phần phía bên trái là một `property` (thuộc tính) hiển thị của phần tử HTML được chọn mà chúng ta muốn thay đổi.
- Phần phía bên phải là một `value` (giá trị) mà chúng ta muốn áp dụng cho thuộc tính đó.

> Việc học CSS chỉ đơn giản là thử qua thử lại các `selector`, `property`, và `value` - `bộ chọn`, `thuộc tính`, và `giá trị`.  
> *_Một người sử dụng máy tính*

## Vậy code CSS được đặt ở đâu?

Cái này thì chúng ta nên bắt tay vào viết sẽ dễ hơn giải thích. Bạn hãy thực hiện các bước như sau -

- Dùng Atom để tạo ra 2 tệp đặt trong cùng thư mục.
- Một tệp HTML có tên là `simple.html`.
- Và một tệp CSS có tên là `beauty.css`.

Trong văn bản HTML, ở vị trí ngay trước thẻ đóng `</head>`, bạn hãy tạo một thẻ `<link>` trỏ tới tệp CSS:

```link.html
<link rel="stylesheet" href="beauty.css">
```

Chúng ta sẽ tạo ra một trang đơn với chữ màu trắng và nền màu đỏ -

- Trong văn bản HTML, bạn thêm vào một tiêu đề `h1` với câu này: `Simple is beautiful .`
- Trong tệp CSS... bạn hãy `copy/paste` đoạn code dưới đây. :D

```simple.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>The beauty of Simplicity</title>

      <link rel="stylesheet" href="beauty.css">
   </head>
  
   <body>
      <h1>Simple is beautiful .</h1>
   </body>
</html>
```

```beauty.css
body { background-color: crimson; }

h1 {
   text-align: center;
   color: white;
}
```

Kết quả hiển thị trên trình duyệt web của bạn như thế nào? Mình tin là bạn đã thấy CSS cũng rất dễ đoán. Không có thứ gì quá khó hiểu ở đây cả. CSS chỉ đơn giản như vậy thôi. Bạn đã sẵn sàng để học thêm về các `bộ chọn`, `thuộc tính`, và `giá trị` trong CSS chưa?

Bài viết đầu tiên về CSS của chúng ta kết thúc tại đây nhé. Hẹn gặp lại bạn trong bài tiếp theo.

[[CSS] Bài 2 - Các  Bộ Chọn & Mức Ưu Tiên](https://viblo.asia/p/Do754rV3ZM6)