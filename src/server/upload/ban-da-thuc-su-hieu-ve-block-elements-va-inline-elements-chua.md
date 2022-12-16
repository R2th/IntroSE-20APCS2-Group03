Chào các bạn!

Ngay khi đọc tiêu đề bài viết cũng đã nói rõ mục đích của bài viết hôm nay rồi. Khái niệm **Block Elements** và **Inline Elements** đối với nhiều bạn còn khá lạ tuy nhiên thực tế thì các bạn vẳn dụng nó hàng ngày, chỉ có điều các bạn không biết mà thôi.
Có rất nhiều bạn sẽ nhầm **Block Elements** và **Inline Elements**  với **display: block** và **display: inline**. Thực tế, kết quả sau khi sử dụng **Block Elements** và **Inline Elements**  hay **display: block** và **display: inline** không khác gì nhau về mặt hiển thị tuy nhiên bản chất của chúng lại khác nhau hoàn toàn, đừng nhầm lẫn nhé.

**Block Elements** và **Inline Elements** là chỉ những phần tử trong HTML còn **display: block** và **display: inline** thuộc về Css.
Đi vào thực tế, chúng ta có thể nói rằng: các phần tử trong HTML được phân chia làm 2 loại: **Block elements (Các phần tử khối)** và **Inline elements (Các phần tử nội tuyến)**. 
Vậy tại sao lại cần phân chia thành **Block Elements** và **Inline Elements**? Đơn giản là để các bạn tiết kiệm thời gian viết css, tiết kiệm tài nguyên mà thôi.
Và bây giờ chúng ta cùng đi sâu vào tìm hiểu 2 loại elements này nhé.

## Block Elements

Các Block element (phần tử khối) khi hiển thị trên trình duyệt chúng sẽ tự động thêm các ngắt dòng (line break) vào phía trước và phía sau nó. Hiểu một cách đơn giản là khi gọi 2 block elements ra thì mỗi element sẽ chiếm 1 dòng và width của các element này sẽ full luôn dòng đó.

![](https://images.viblo.asia/97f72cee-1ab1-4a11-b6cb-7bdd6f39ada6.png)

```
<div style="border: 1px solid blue">Xin chào Viblo</div>

<p style="border-bottom: 2px solid red">Cùng tìm hiểu về block element và inline element.</p>
```

Danh sách tất cả các Block element (theo mặc định) của HTML5:


| Col 1 | Col 2 | Col 3 |
| -------- | -------- | -------- |
| <address>     |  <figcaption>   | <hgroup>    |
|   <article>   |  <figure>   | hr    |
|   <aside>   | <footer>    |   <li>  |
|   <blockquote>   |  <form>   |  <main>   |
|   <details>   | <h1> - <h6>    |  <nav>   |
|   <dialog>   |  <ol>   |  p   |
|  <dd>    |  div  | pre  |
| <dl>     |  <section>   |  <table> |
|    <dt>    |  <fieldset>   | <header>    |
|   <ul>   |     |     |

Vậy nếu muốn các block element này nằm song song nhau trên cùng 1 row thì làm thế nào? Câu trả lời vô cùng đơn giản. Bạn có thể sử dụng các properties **display** sau nhé:
```
- display: inline
- display: inine-block
- display: flex
- display: grid
- display: table
- display: table-cell
```
Hoặc có thể sử dụng **float: left|right** cũng được nhé.
    
## Inline Elements

Trái ngược với **Block Elements** thì ta lại có **Inline Elements**.
Các Inline element (phần tử nội tuyến) thường xuất hiện trong một đoạn văn (sentence), khi hiển thị trên trình duyệt nó không tự động thêm các ngắt dòng (line break) vào phía trước và phía sau của nó.
    
![](https://images.viblo.asia/a5311183-c5d2-4a6c-9b56-6fec227808b1.png)

    
```
<a href="#" style="border: 1px solid blue;">Xin chào Viblo</a>

<span style="border-bottom: 2px solid red;">Đây là inline element.</span>
```

Danh sách tất cả các Inline element


| Col 1 | Col 2 | Col 3 |Col 4 | Col 5 | Col 6 | Col 7 |
| -------- | -------- | -------- |-------- | -------- | -------- | -------- |
| <a> | <abbr> |<acronym>  | <b>| <bdo> | <big> | <button>|
| <cite> |<code>  | <dfn> |<em> | <i> | <img> |<input> |
|<kbd> |<label>  | <map> |<object> | <output> | <q> |<samp> |
| <script> | <select> |  <small>| <span>| <strong> | <sub> |<sup> |
|<textarea>  |<time>  | <tt> | <var>|  |  | |
    
Cũng tương tự như block element, nếu như muốn các block inline này có bản chất giống như block element thì chỉ cần thêm 1 dòng css như dưới là xong.

```
display: block
```
   
Như vậy về cơ bản thì bài viết này giúp các bạn hiểu đúng được bản chất của các element mình đang dùng. Hiểu được bản chất của chúng, bạn sẽ dễ dàng sử dụng chúng đúng mục đích, tiết kiệm thời gian css, nâng cao performance cho web hoặc app của chính các bạn. Chúc các bạn thành công!