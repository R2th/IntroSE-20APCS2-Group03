Trong bài viết này, chúng ta sẽ nói về các thẻ HTML được gọi chung chung là `container` - dịch nôm na có nghĩa là thùng chứa - và công dụng của các thẻ này.

Vậy `container` có nghĩa là một cái gì đó có chứa một cái gì đó khác ở bên trong nó. Hình như `<p></p>` mà chúng ta đã biết có thể chứa các phần tử khác như các liên kết và hình ảnh. Và `<a></a>` cũng có thể làm điều tương tự.

Đúng là như vậy rồi. Tuy nhiên trong bài này chúng ta sẽ nói về những `container` lớn hơn kìa. Những `container` này sẽ không mô tả một kiểu nội dung đặc trưng như văn bản hay hình ảnh, mà thay vào đó lại được sử dụng để nhóm các phần tử HTML để tạo ra các thành phần mang tính bố cục của trang web - ví dụ như thanh điều hướng, khu vực hiển thị nội dung chính, phần chân trang web, ...

Và dưới đây là những thẻ `container` phổ biến mà bạn có thể chọn để cấu trúc nên trang web của mình -

1| `<nav></nav>` - Tên viết đầy đủ là `navigation` - đại ý nói là bạn có thể dùng thẻ này để nhóm các liên kết điều hướng chính của website. Bạn có thể có nhiều hơn một thanh điều hướng trong một trang web đơn và người ta thường dùng thẻ này cho thanh điều hướng chính ở đầu trang, thanh điều hướng phụ ở bên cạnh, và cả chỉ mục của một bài viết nữa.

2| `<header></header>` - Container này được sử dụng để nhóm các nội dung giới thiệu. Như chúng ta thường thấy phần nội dung nổi bật trên trang chủ của các trang web thì sẽ có một tiêu đề cỡ chữ lớn, một đoạn chữ mô tả, logo, rồi các thứ liên quan tới thương hiệu của trang web đó...

3| `<article></article>` - Là một bài viết - được W3C định nghĩa là một khối nội dung hoàn chỉnh, độc lập, không phụ thuộc vào bất kỳ thành phần nào khác trong trang. Ví dụ điển hình là một bài blog, một post FB, v.v...

4| `<section></section>` - Có nghĩa là một phân đoạn - là một khối nội dung không được đầy đủ như `article`. Thẻ này thường được dùng để tạo ra các trích đoạn ngắn giới thiệu về các bài viết - bao gồm một tiêu đề, vài dòng chữ mô tả, và một cái link `Đọc tiếp`.

5| `<main></main>` - Nếu như một trang đơn không phải là một `article` và có chứa một danh sách các trích đoạn giới thiệu thì chúng ta nên nhóm tất cả các `section` đó bằng `main`.

6| `<aside></aside>` - Mình đoán là bạn đã từng nhìn thấy nhiều trang web có một cột điều hướng
được đặt ở bên cạnh khu vực hiển thị nội dung chính. Là nó đấy. Chính là `container` này.

7| `<footer></footer>` - Một khối nội dung được đặt ở phần chân trang web - thường thì sẽ là các thông tin về bản quyền thiết kế, nhà tài trợ hoặc sở hữu, các liên kết tham khảo, v.v...

8| `<div></div>` - Tên đầy đủ là `division` - có nghĩa là `chia tách`. Thẻ này không có ý nghĩa gì đối với cấu trúc của một trang web nhưng lại là `container` được sử dụng nhiều nhất. Khi mà chúng ta không biết nên lựa chọn `container` nào trong số đã liệt kê trước đó thì đây chính là lựa chọn đơn giản nhất.

## Thử xem các container hoạt động

Hãy lấy ví dụ là chúng ta đang tạo ra một trang web đơn giản có vài liên kết điều hướng ở trên cùng, một vài `section` để giới thiệu gì đó, và một `footer` ghi thông tin bản quyền sáng tạo. Chúng ta cũng giả định luôn là thanh điều hướng sẽ có màu nền tối và chữ màu trắng, các `section` thì được đặt trên một hình nền đẹp, và phần `footer` cũng sẽ có màu nền tối đi kèm chữ trắng.

Tới đây thì code HTML của chúng ta sẽ trông có dạng như thế này.

```atree.html
<nav>
   <a href="#">A T R E E</a>
   <a href="#about">About</a>
   <a href="#work">Work</a>
   <a href="#contact">Contact</a>
</nav>

<main>
   <section id="about">
      <h1>Hi! I'm a tree.</h1>
      <p>I love light, earth and water.</p>
   </section>

   <section id="work">
      <h2>I'm an oxygen producer.</h2>
      <p>I produce oxygen to make life better.</p>
   </section>

   <section id="contact">
      <h2>You can find me somewhere outhere.</h2>
      <p>Yes, I also have an email address: atree@email.com</p>
   </section>
</main>

<footer>
   Copyright Nature @ Universe
</footer>
```

`Kết quả`
![](https://images.viblo.asia/0212730e-4e63-430f-8eda-e9c1d0cf9023.png)

Kết quả hiển thị trên trình duyệt của bạn tốt chứ? Nếu không giống như trong hình minh họa ở phía trên thì... Thật xin lỗi bạn. :D Mình quên chưa nói cho bạn biết rằng những thẻ `container` này sẽ chỉ thực hiện công việc nhóm các phần tử HTML với nhau chứ không tạo ra hiệu ứng hiển thị nào khác cả.

Bạn hãy thêm dòng code này vào phần đầu của văn bản HTML và làm mới Tab trên trình duyệt web xem thế nào nhé.

```html
<link rel="stylesheet" href="https://codenart.github.io/css/atree.css">
```

Lần này thì kết quả thế nào? Bạn có nhìn thấy phép màu nào xảy ra không? :D  
Đó là CSS!

## CSS là cái gì? Tại sao chúng ta lại cần CSS?

Có một vài điều rất quan trọng mà mình muốn nói với bạn ngay từ bài viết đầu tiên nhưng kỳ thực là tại vì mình đãng trí quá nên quên mất.

HTML chỉ có thể giúp chúng ta nói với trình duyệt rằng chúng ta muốn hiển thị `cái gì`; Còn về việc bảo trình duyệt trình bày những nội dung đó `như thế nào` thì chúng ta lại cần tới sự hỗ trợ của CSS nữa. CSS cũng là một ngôn ngữ rất đơn giản được thiết kế để giúp chúng ta nói chuyện được với các trình duyệt web thôi. Không có gì cao siêu cả đâu.

Và bởi vì ở thời điểm hiện tại, chúng ta đã biết cách sử dụng những thẻ HTML phổ biến; Đây chính là thời điểm hoàn hảo để chúng ta bắt đầu học CSS. Các bài viết về HTML vẫn sẽ được tiếp tục thực hiện song song tại đây. Tuy nhiên thì mình khuyến khích bạn nên sử dụng các bài viết HTML tiếp theo ở dạng tham khảo thông tin khi cần thiết chứ không cần đọc tuần tự hết đâu. Bởi vì như vậy bạn sẽ cảm thấy nhàm chán lắm, mình đảm bảo đấy. :D

Bởi vì việc học HTML chỉ có vậy thôi. Thử một vài thẻ HTML và làm mới Tab trên trình duyệt web. Còn học CSS thì lại khác. Chúng ta sẽ thử một vài code CSS và làm mới Tab trên trình duyệt web.

Ồ... từ từ đã... hình như việc học CSS cũng không hẳn là có gì khác lắm so với HTML. :D Nhưng mà mình hứa với bạn là việc học CSS sẽ thú vị hơn nhiều. :D

Còn một điều quan trọng nữa mà mình muốn nói với bạn về HTML `container`. Cho mình xin thêm 30s để hoàn thành bài hướng dẫn này đã nhé. Sau đó chúng ta sẽ bắt đầu bài học CSS đầu tiên.

## Những container lớn nhất

Đúng vậy, có một vài `container` đặc biệt mà mình đã không nói đến trong phần đầu tiên. Bạn hãy thực hiện thao tác này:

- Tạo một tệp HTML mới và lưu tệp ngay với tên là `index.html`.
- Đưa cho Atom thần chú mới này: `ht`

`Poof!`
```index.html
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title></title>
   </head>
   <body>
      
   </body>
</html>
```

Đây là biểu mẫu HTML cơ bản và biểu mẫu này được sử dụng làm tiêu chuẩn cho bất kỳ văn bản HTML nào.

Những ví dụ trước đó của chúng ta đều hoạt động tốt là bởi vì các trình duyệt web hiện đại đều có một tính năng thông minh - tự động giúp chúng ta áp dụng biểu mẫu này và đặt tất cả nội dung code của chúng ta vào bên trong cặp thẻ `<body></body>`.

Cặp thẻ `<head></head>` được sử dụng để nhóm các phần tử HTML cung cấp các thông tin bổ sung liên quan tới trang web của chúng ta cho các trình duyệt. Những phần tử này sẽ không được hiển thị trên bề mặt của trang web nhưng sẽ âm thầm giúp ích cho trang web của chúng ta theo nhiều cách khác nhau.

Kế đến là một cặp thẻ `<title></title>` giúp chúng ta đặt tên cho trang đơn và hiển thị tên này trên Tab.

Cuối cùng là cặp thẻ `<html></html>` - đây là `container` gốc của văn bản HTML. Tuy nhiên thì nó không có gì đặc biệt đâu - chỉ là một cái gì đó giống với một cái `<div></div>` mà thôi.

Thẻ đơn `<!doctype html>` ở trên cùng sẽ giúp chúng ta nói với trình duyệt là: `văn bản này là HTML`. Chúng ta không cần phải lần mò chi tiết về thẻ này đâu. Câu chuyện của nó thuộc về lịch sử của các ngôn ngữ đánh dấu; Và tốt nhất là chúng ta cứ nên để yên cái lịch sử đó ở phần đầu của các văn bản HTML là được.

Bài viết về các HTML `container` của chúng ta đến đây là kết thúc. Hãy nghỉ giải lao một chút và cùng bắt đầu bài học CSS đầu tiên.

[Ludovico Einaudi - The Mountain](https://www.youtube.com/watch?v=wTeRQ16O798)

[[CSS] Bài 1 - CSS Là Cái Gì? Tại Sao Chúng Ta Lại Cần CSS?](https://viblo.asia/p/gAm5yEnV5db)

[[HTML] Bài 5 - Danh Sách & Bảng](https://viblo.asia/p/LzD5dR4oZjY)