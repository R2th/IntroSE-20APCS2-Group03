Có không ít các bạn khi code web thường sử đơn vị css làm sao để code trên desktop mà khi view trên mobile không bị vỡ layout, cơ chữ do đơn vị cố định cho các element...

 Có một vài đơn vị như **%, px, vw, vh, pt, em, rem**, ... thì có 2 đơn vị luôn làm nhiều  bạn trong đó có cả mình nhầm lần chưa biết cách sử dụng nó vào việc responsive.

Thì để giải quyết vấn đề trên thì mình sẽ chia sẻ 1 chút về cách dùng 2 đơn vị này nhằm giúp các bạn có thể hiểu rõ và áp dụng chúng vào việc code giao diện.

# Khái niệm về đơn vị em và rem
**em:** là đơn vị tham chiếu tỷ lệ so với phần tử cha trực tiếp chứa nó hoặc chính nó dựa vào giá trị của thuộc tính là **font-size**

**rem:** là đơn vị tham chiếu tỷ lệ so với phần tử gốc của website ở đây là thẻ `<html>` dựa vào giá trị của thuộc tính **font-size**

![](https://images.viblo.asia/3ccb7317-3fa6-4366-8190-0dd8b8a6fdd7.jpg)

# Sử dụng thực tế
 
Mình nghĩ là các bạn nhìn vào sơ đồ chắc vẫn chưa hiểu lắm. Mình lần đầu cũng vậy thôi. Và muốn hiểu được nó chúng ta phải bắt tay vào code thôi.

Các bạn hãy xem ví dụ demo nho nhỏ để dễ hình dung nhé.

Đầu tiên là `html` như thế này:

```html
<html>
 <head><title>Cách dùng đơn vị Em vs Rem</title></head>
<body>
 <div class="container">
  <div class="em">EM</div>
  <div class="rem">REM</div>
 </div>
</body>
</html>
```

Tiếp đến là `css`:

```css
html {
  font-size: 15px;
}
.container {
  color: white;
  display: flex;
}
.em {
  width: 10em;
  height: 10em;
  background-color: red;
}
.rem {
  width: 10rem;
  height: 10rem;
  background-color: blue;
}
```

Và đây là kết quả :D

![](https://images.viblo.asia/26e12fc3-8d82-4c5e-910c-3de9b5da00b6.PNG)

# Giải thích chi tiết

Đầu tiên mình tạo html layout gồm có 1 div có class **container** bọc ngoài và có 2 div bên trong tương ứng với class em rem  sau đó mình set cho thẻ `<html>` có thuộc tính **font-size** là **15px** và lần lượt 2 ô là màu đỏ xanh cho các bạn dễ phân biệt.

Cho nên lúc này **1em = 1rem = 15px**. Như các bạn nhìn vào demo ở trên thì 2 ô đều bằng nhau là **10(em-rem) x 15px = 150px** của mỗi ô.

Mình xin giải thích là vì do lúc này chính nó(class em) và  phần tử cha chứa nó là thẻ div có class **container** mình chưa set thuộc tính **font-size** nên nó sẽ phụ thuộc phần tử lớn hơn ở ngoài đó là thẻ `<body>` nhưng thẻ `<body>` cũng chưa set thuộc tính **font-size** nên nó cứ thế lấy ra ngoài cùng cho tới thẻ `<html>`. Nên ở trên **1em = 1rem = 15px** là theo thẻ `<html>` đấy.
    
Tuy nhiên bây giờ mình sẽ set cái thuộc tính **font-size** của thẻ div có class **container** là **20px** thì chắn chắn sẽ có thay đổi. Các bạn nhìn dưới đây nha.

```css
.container {
     font-size: 20px;
}
```

![](https://images.viblo.asia/078e8835-e7a9-41ab-a394-172d43c35134.PNG)


**Ô màu đỏ** có đơn vị em sẽ to hơn ban đầu vì như mình đã nói ở trên là đơn vị em phụ thuộc vào giá trị thuộc tính font-size của chính nó hoặc phần tử cha trực tiếp chứa nó. Cho nên lúc này ô màu đỏ sẽ có kích thước là 10em x 20px = 200px.

```
html {
     font-size: 25px;
}
```

Còn **ô màu xanh(rem)** do phụ thuộc vào thẻ `<html>` nên khi mình thay đổi giá trị font-size của thẻ `<html>` sang 25px thì ô màu xanh cũng sẽ thay đổi kích thước. Và lúc này giá trị của nó sẽ là 10rem x 25px = 250px. Nhìn vào demo bạn sẽ thấy nó to hơn ban đầu và to hơn ô màu đỏ luôn.

# Lời kết

Hi vọng với giải thích và ví dụ demo của mình sẽ giúp các bạn dễ dàng hiểu hơn về 2 đơn vị **em** và **rem** này. Cám ơn các bạn đã đọc và chúc các bạn một ngày làm việc tốt lành.