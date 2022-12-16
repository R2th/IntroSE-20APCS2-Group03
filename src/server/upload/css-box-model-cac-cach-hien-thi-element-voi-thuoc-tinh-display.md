## Mở đầu
Đây là bài viết cuối trong series về CSS Box Model của mình. Nếu như các bài viết trước tập trung phân tích sâu về một element và các thuộc tính của nó, thì bài viết này sẽ giúp bạn có cái nhìn bao quát hơn về mối quan hệ giữa các element trên trang web, chúng đẩy nhau hay hút lại với nhau như thế nào, từ đó giúp bạn có thể layout được các element tới những vị trí một cách chính xác nhất.

Bạn có thể theo dõi tất cả bài viết của serie Box model tại đây:

Phần 1: [CSS Box Model - Cơ bản dành cho người mới bắt đầu](https://phucluong.com/css-box-model-co-ban-danh-cho-nguoi-moi-bat-dau/)  
Phần 2: [CSS Box Model và box-sizing: border-box là gì vậy?](https://phucluong.com/css-box-model-box-sizing-border-box-la-gi-vay/)  
Phần 3: [CSS Box Model - Các cách hiển thị element với thuộc tính display](https://phucluong.com/css-box-model-display-block-inline/)

Các bạn theo dõi các bài blog cá nhân của mình tại đây nhé: [https://phucluong.com/](https://phucluong.com/)

## Block và Inline
Có lẽ hầu hết các bạn đều đã quen với 2 loại box cơ bản này rồi: block và inline. Nếu bạn nào không nhận ra chúng, thì có thể các bạn sẽ nhận ra dòng CSS ví dụ như `display: block` và `display: inline`

Vậy block và inline nó khác nhau thế nào, một thẻ `p` nó khác gì một thẻ `span`? Hãy cùng nhau phân tích một chút lý thuyết để hiểu rõ hơn nhé.

**Nếu một element có thuộc tính `display` là `block`, thì nó sẽ:**

* Element sẽ rớt xuống một dòng mới.
* Element sẽ tự nở rộng ra tối đa, cho đến khi nào lấp đầy khoảng trống của container đang chứa nó. Thông thường chúng ta sẽ thấy kết quả là element sẽ có chiều rộng bằng với container cha của nó.
* Các thuộc tính `width` và `height` đều có tác dụng lên element (tất nhiên là để thay đổi chiều rộng và cao của nó).
* Padding, margin và border (nếu có) của element sẽ đẩy các element xung quanh ra xa nó.

Có nhiều thẻ mặc định đã là block rồi, ví dụ như `p`, `h1`, `h2`, `div`, nên mặc định các thẻ đó sẽ biểu hiện với các tính chất như mô tả bên trên. Đương nhiên khi chúng ta gọi là "mặc định", điều đó có nghĩa là chúng ta có thể thay đổi.

**Tiếp theo, nếu một element có thuộc tính `display` là `inline`, thì nó sẽ:**

* Element sẽ không rớt xuống dòng mới trên trang.
* Các thuộc tính `width` và `height` sẽ không có tác dụng, nên nếu bạn cố gắng gán kích thước cho các inline element thì sẽ vô ích thôi.
* Padding, margin, border ở hướng dọc (top và bottom) vẫn có tác dụng nhưng sẽ không làm đẩy các inline element khác ra xa nó.
* Padding, margin, border ở hướng ngang (left và right) vẫn có tác dụng và vẫn sẽ đẩy các inline box khác ra xa nó.

Một ví dụ đơn giản là dễ thấy nhất:

{@embed: https://www.youtube.com/embed/y-Zs89uEqZo}


#### Block direction và Inline direction

Nếu nói về block và inline mà không nói về hướng mà chúng được sắp đặt thì hơi thiếu sót. Tuy nhiên vấn đề này cũng có nhiều thứ để bàn (nằm ngoài mục đích của bài viết), nên mình chỉ nêu vài ý cơ bản ở đây.

Mặc định khi bạn vào một trang web, thì hầu hết chúng có `writing-mode` là `horizontal-tb`, có nghĩa là content sẽ được sắp xếp từ trái sang phải (horizontal) và từ trên xuống dưới (tb: top bottom). Thường thì chúng ta ít để ý đến điều này, vì ngôn ngữ tiếng Việt và tiếng Anh đều đi theo hướng như vậy.

Với block direction, các block sẽ được sắp xếp chồng lên nhau chiều dọc (element sau nằm dưới element trên). Còn với inline direction, các element sẽ được sắp xếp cạnh nhau theo hàng ngang.

![Hướng sắp xếp của các box khi writing-mode là horizontal (chiều ngang)](https://images.viblo.asia/188581c4-6025-49f4-9cfa-e29272f539cb.png)

Bổ sung với mục đích tham khảo: với `writing-mode` là vertical thì hướng của các block sẽ đi theo chiều ngang. Tuy nhiên bản chất cách hoạt động của nó cũng không thay đổi.

![Hướng sắp xếp của các box khi writing-mode là vertical (chiều dọc)](https://images.viblo.asia/ecb6d90a-d533-4c34-906c-37b1ee520554.png)


## Thuộc tính hiển thị bên trong (inner) và ngoài (outer)
Bạn có biết một element tồn tại 2 loại thuộc tính hiển thị là bên trong và bên ngoài không? Khi bạn viết `display: block;`, có 2 thứ sẽ diễn ra:

* **Outer:** bạn đang khai báo rằng element của bạn là một **block** khi tương tác với các element xung quanh.
* **Inner:** bạn đang khai báo rằng các element con trực tiếp của nó sẽ được layout theo cách bình thường như mô tả ở trên (gọi là normal flow)

![Inner và outer của display: block](https://images.viblo.asia/02df37e3-5b3a-46fb-9ac6-5d2a6abaace5.jpg)

Bạn có thấy lạ lẫm không? Một ví dụ khác, khi bạn viết `display: flex;`, cũng có 2 thứ sẽ diễn ra:

* **Outer:** bạn đang khai báo rằng element của bạn là một **block** khi tương tác với các element xung quanh.
* **Inner:** bạn đang khai báo rằng các element con trực tiếp của nó sẽ trở thành các flex item và được layout dựa trên các quy tắc của flexbox.

![Inner và outer của display: flex](https://images.viblo.asia/bc8ac769-b888-42f2-a643-aa1063ad6c23.jpg)

## Ví dụ
Hãy cùng xem qua một ví dụ đơn giản sau nhé:

![Một element với thuộc tính display là inline.](https://images.viblo.asia/06394f89-3fca-45f5-99de-a8f5aaee189c.png)


``` html
<p>Lorem ipsum dolor sit amet, <span class="child">consectetur adipiscing</span> elit. Integer sed pellentesque justo...</p>
<p>Aliquam nulla nisl, rutrum id lacus quis, tempor efficitur magna...</p>
```

``` css
.child {
  background-color: lightblue;
  width: 100px;
  height: 100px;
  padding: 50px;
  margin: 50px 0;
}
```

Ở ví dụ trên, thẻ `span` mặc định là một inline box, vì thế:

* Nó nằm cùng dòng với các content khác
* Width và height hoàn toàn bị bỏ qua. Lưu ý code CSS không lỗi trong trường hợp này, nó chỉ không có tác dụng mà thôi.
* Với padding là 50px, bạn thấy nó đẩy các chữ xung quanh ra xa theo chiều ngang, nhưng chiều dọc thì không đẩy, mặc dù nó vẫn tồn tại (bằng chứng là màu nền của nó)
* Với margin top và bottom là 100px, nó hoàn toàn bị bỏ qua.

Tiếp theo, chúng ta thử chuyển nó về block xem sao:

![Một element với thuộc tính display là block.](https://images.viblo.asia/6d81d654-923a-43f0-b18d-025ffd7a3481.png)

``` css
.child {
  display: block; /* thêm dòng này */
  background-color: lightblue;
  width: 100px;
  height: 100px;
  padding: 50px;
  margin: 50px 0;
}
```

* Vì là block nên nó tự rớt xuống một dòng mới.
* Width và height lúc này có tác dụng.
* Với padding là 50px, bạn thấy nó đẩy các chữ xung quanh ra xa theo cả chiều ngang lẫn chiều dọc.
* Margin lúc này đã có tác dụng.

## display: inline-block
Trong một số trường hợp, bạn sẽ muốn dung hòa các hiệu ứng của block và inline. Chẳng hạn như bạn vẫn muốn tùy chỉnh kích thước của element với `width` và `height`, nhưng bạn vẫn muốn nó nằm inline với các element khác. Với `display: inline-block`, bạn sẽ giúp element có một số tính chất của cả block và inline.

![Một element với thuộc tính display là inline-block.](https://images.viblo.asia/48d61ce2-d39a-493a-8d7a-311af1f56519.png)


## Kết luận
Bài viết cũng khá dài rồi nên mình không muốn trình bày thêm những vấn đề liên quan khác ví dụ như "Margin collapsing". Như bạn đã thấy, kiến thức cơ bản về layout thật ra rất đơn giản nhưng có thể vì không được dạy ở trường đại học (thời của mình) nên rất ít bạn có thể hiểu và áp dụng một cách đúng đắn. Tuy nhiên nó cũng khá đơn giản thôi nên các bạn hãy dành thời gian để hiểu rõ về nó nhé.