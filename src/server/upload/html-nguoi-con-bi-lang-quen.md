![](https://images.viblo.asia/36c8e5c5-e379-4c7d-bccd-c26d037ec133.jpg)

> HTML được ví như là bộ xương của bất cứ một giao diện website nào. “Bộ xương” này sẽ giúp chúng ta xác định bố cục trên mỗi website và đánh dấu lại các phần đó bằng các thẻ (tag) nhất định, sau đó nó sẽ tự xác định mỗi đối tượng được đánh dấu mang một vài trò riêng trong website. 

Quan trọng vậy nhưng HTML như một đứa trẻ bị bỏ rơi khi mọi người lại chú ý vẻ đẹp của CSS và Javascript hơn. Bây giờ chúng ta hãy tạo những điều khác biệt để đưa HTML về lại vị trí trung tâm, bằng cách viết code sạch, dễ dàng trong việc duy trì, phát triển và sử dụng tối ưu thuộc tính của HTML5. Hiểu tất cả các tag cơ bản và để html hiển thị chính xác trong các trình duyệt được hỗ trợ  cũng là những điều cần phải làm.

Thay vì hỏi phải làm như thế nào thì chúng ta bắt đầu nào.

### DOCTYPE
Bắt đầu của một file index.html chắc chắn bạn phải khai báo DOCTYPE.

!DOCTYPE chỉ cho trình duyệt web biết được phiên bản ngôn ngữ đánh dấu (markup language) nào được sử dụng trong trang web và đây không phải là một tag trong HTML.

```html
<!DOCTYPE html>
```

Bạn cũng có thể sử dụng như sau:

```html
<!doctype html>
```

### Optional tags
Tag `<html>` có nhiệm vụ khai báo cho trình duyệt biết rằng những nội dung bên trong cặp tag này là HTML. Và nó phải bao bọc toàn bộ nội dung website, không bao gồm <!DOCTYPE>.
```html
<!DOCTYPE html>
<html>
    <head>
        <!-- head definitions go here -->
    </head>
    <body>
        <!-- the content goes here -->
    </body>
</html>
```

### Thẻ đóng
Bạn phải luôn luôn cân nhắc việc đóng các tag của mình vì một số trình duyệt sẽ gặp sự cố khi hiển thị trang của bạn. Tuy nhiên, bạn nên dùng thẻ đóng để dễ đọc và những lý do khác.
```html
<div id="example">
  <img src="example.jpg" alt="example" />
  <a href="#" title="test">example</a>
  <p>example</p>
</div>
```
Trên là tất cả các thẻ hợp lệ nhưng bên cạnh html cũng có bảng bất quy tắc với các thẻ không cần thẻ đóng là:
```html
<br>, <hr>, <img>, <input>, <link>, <meta>,
<area>, <base>, <col>, <command>, <embed>, <keygen>, <param>, <source>, <track>, <wbr>
```
> Lưu ý: Đây là trường hợp ngoại lệ không cần thẻ đóng, với các thẻ bình thường bắt buộc phải có thẻ đóng.
### Charset
Thiết lập đầu tiên đó là charset được đặt ngay trong phần` <head>`.
```html
<head>
  <meta charset="utf-8">
  <title>This is a super duper cool title, right 😃?</title>  
</head>
```
Thuộc tính charset trong tag `<meta>` có nhiệm vụ khai báo cho trình duyệt biết bảng mã ký tự siêu văn bản bên trong tài liệu là gì. Và hiện nay hầu hết chúng ta đều sử dụng bảng mã `UTF-8` cho tất cả ngôn ngữ bao gồm các ngôn ngữ tiếng latin, chữ Hán – Nôm và các ngôn ngữ đọc từ phải sang trái (Right to Left – RTL).
### Ngôn ngữ
Bạn nên xác định ngôn ngữ cho trang web của bạn, điều này thực sự quan trọng đối với hỗ trợ trình duyệt và công cụ tìm kiếm. Nên khai báo ngôn ngữ chính cho mỗi trang web với các thuộc tính `lang` bên trong thành phần `<html>` như sau:
```html
<html lang="en">
...
</html>
```
### Tiêu đề
Không bao giờ, không bao giờ, bỏ qua thẻ tiêu đề. Nếu không có thẻ tiêu đề sẽ rất khó khăn cho khả năng truy cập và người dùng sẽ không bao giờ sử dụng trang web của bạn vì họ không thể tìm thấy nó 2 giây sau khi mở nó và 20 tab nữa sau đó 😁 (tab trình duyệt sẽ không có gì để hiển thị).
```html
<head>
  <meta charset="utf-8">
  <title>Web page</title>  
</head>
```
### Base tag
Đây là một tag thực sự hữu ích nên được sử dụng thận trọng. Tag `<base>` định một địa chỉ mặc định hoặc một mục tiêu mặc định cho tất cả các liên kết trên một trang. 
```html
<base href="http://www.example.com/" />
```
Như trên,` href="#internal"`sẽ được hiểu là `href="http://www.example.com/#internal"`.

Hoặc `href="example.org"`sẽ được giải thích là `href="http://www.example.com/example.org"`.
### Description
Sẽ siêu hữu ích cho các công cụ tìm kiếm khi họ thu thập dữ liệu trang web của bạn.
```html
<meta name="description" content="HTML ">
```
### Semantic tags
Mặc dù bạn có thể tạo một page chỉ bằng tag `div`, nhưng điều đó không có nghĩa là bạn nên làm như thế. `Semantic HTML` mang lại mô tả rõ ràng ý nghĩa về cấu trúc của phần tử đó đối với các trình duyệt và lập trình viên. Các tag như `p`, `section`, `h{1-6}`, `main`, `nav`, vv.. là tất cả semantic tags. Nếu bạn sử dụng tag `p`, người dùng sẽ biết điều này thể hiện một đoạn văn bản và trình duyệt biết cách thể hiện chúng.

Dưới đây, HTML5 cung cấp các phần tử semantic mới để xác định từng phần khác nhau của một trang web:
```html
<article>, <aside>, <details>, <figcaption>, <figure>, <footer>, <header>, <main>, <mark>, <nav>, <section>, <summary>, <time>
   ```
### hr không nên được sử dụng để định dạng
`<hr>`không phải là một yếu tố định dạng, vì vậy hãy ngừng sử dụng nó để định dạng nội dung của bạn. Trong HTML5, tag này sử dụng để tách nội dung bên trong trang . Một cách sử dụng hợp lý `<hr>` có thể trông như thế này:
```html
<p>Paragraph a</p>
<p>Paragraph b</p>
<p>Paragraph c</p>
<hr>
<p>Paragraph d</p>
```
### Tránh code dài trên một dòng
Khi bạn sử dụng một HTML, nếu có một dòng code quá dài bạn sẽ phải trượt thanh cuộn sang phải hoặc sang trái để có thể đọc hết dòng code đó. Điều này không hay chút nào. Hãy cố gắng tránh những dòng code dài hơn 80 ký tự.
### Sử dụng nháy kép cho các giá trị thuộc tính
HTML5 cho phép bạn gán giá trị cho các thuộc tính mà không cần dấu ngoặc.Nhưng chúng tôi khuyên bạn nên sử dụng dấu nháy kép cho các giá trị thuộc tính:
* Nếu giá trị chứa dấu cách.
* Lúc dùng dấu nháy kép, lúc không điều này tạo một thói quen không tốt cho người lập trình.
* Để giá trị trong dấu ngoặc sẽ dễ đọc và phân biệt hơn.
```html
<div class="topNav">
    <img src="hi.png" alt="hello">
    <p>456-354-343</p>
</div>
```
Tránh những trường hợp như thế này:
```html
<img alt="super funny meme" src='/img/meme.jpg'>
```
Bạn nên sử dụng đồng nhất dấu nháy:
```html
<img alt="super funny meme" src="/img/meme.jpg">
```
### Hãy cẩn thận khi bạn sử dụng thuộc tính title
Các thuộc tính title là một công cụ mạnh mẽ có thể giúp đưa thêm thông tin bổ sung cho nội dung trong thẻ.Những thông tin này thường được hiển thị như một tooltip khi người dùng di chuột vào nội dung thẻ. Tuy nhiên, nó không thể hoán đổi với các thuộc tính khác như alt trên hình ảnh.
Tham khảo thêm [ở đây](https://html.spec.whatwg.org/multipage/dom.html#the-title-attribute) .
### Bỏ qua các giá trị boolean
Khi nói đến việc có các giá trị boolean cho các thuộc tính, bạn nên bỏ qua các giá trị đó vì chúng không thêm bất kỳ giá trị nào và cũng làm tăng trọng số đánh dấu của bạn.
### Nói không với inline style
Inline được sử dụng cho một thẻ HTML xác định. `<style>` attribute được dùng để style một HTML tag xác định. Sử dụng  bằng cách này không được khuyến khích, vì mỗi tag HTML cần được styles độc lập. Quản lý website sẽ rất khó nếu bạn chỉ sử dụng inline style.
# Tổng kết
Đây chỉ là một phần nhỏ kiến thức HTML mình muốn chia sẻ, dứoi đây có các tài liệu để bạn đọc thêm và tìm hiểu sâu hơn:
* [HTML best practices on GitHub](https://github.com/hail2u/html-best-practices)
* [W3C school HTML style guide](https://www.w3schools.com/html/html5_syntax.asp)

Cảm ơn bạn đã dành thời gian đọc bài viết!