CSS Flexbox đã khá là quen thuộc đối với thế giới của front-end developers trong những năm gần đây. Điều này là hết sức dễ hiểu, vì Flexbox đã đem lại một sự tiện lợi cũng như dễ sử dụng để tạo ra các layout hoặc dễ dàng căn chỉnh nội dung nằm bên trong một containers. 

Tuy nhiên, không chỉ có Flexbox thỏa sức tung hoành, mà người ta thường nhắc đến cả CSS Grid - đối thủ của CSS Flexbox. Lý giải cho sự so sánh này là nó đều có thể làm những điều mà Flexbox làm được, thậm chí trong một vài trường hợp nó còn làm tốt hơn cả Flexbox. Tuy vậy CSS Grid cũng tồn tại nhiều bất cập. Vậy hãy tìm hiểu rõ hơn về cả 2 thuộc tính này nhé!
# Một chiều và hai chiều

Lý giải một chút nhé, thế nào là một chiều, thế nào là hai chiều? 
- Một chiều có thể hiểu là ngang (row) HOẶC dọc (column)
- Hai chiều là cả ngang VÀ dọc
<br>

> Flexbox được tạo ra để tạo layout 1 chiều còn Grid thì 2 chiều

Điều này có nghĩa là nếu bạn đang tạo layout cho 1 chiều (ví dụ như 3 button bên trong 1 header) - chiều ngang, thì bạn nên sử dụng Flexbox
![](https://images.viblo.asia/d4ac0aa6-cfb6-4ee3-8dbb-9e8896da2fc5.png)
 
<br>

Trong trường hợp trên thì Flex sẽ giúp code của bạn linh hoạt hơn trong cách style và cũng sẽ dễ maintain hơn nếu về sau có phải điều chỉnh gì. 

<br>

Tuy nhiên nếu bạn định tạo ra một layout ở cả 2 chiều - với cả dọc và ngang - thì chắc chắn bạn nên dùng Grid
![](https://images.viblo.asia/2b7b1eea-6e01-4266-af91-0e167d36fcb4.png)

<br>

Trong trường hợp này thì CSS Grid sẽ giúp cho đoạn markup của bạn đơn giản hơn, dễ quản lý code hơn.
# Content-first và layout-first
Một điểm khác nhau nữa giữa Flex và Grid đó là Flexbox thì lấy content làm nền tảng còn đối với Grid thì sẽ là layout. Nghe có vẻ hơi trừu tượng, vậy nên hãy xem ví dụ dưới đây để dễ hiểu hơn nhé:

Chúng ta sẽ lấy lại ví dụ header ở trên. Đây là đoạn HTML:

```
<header>
    <div>Home</div>
    <div>Search</div>
    <div>Logout</div>
</header>
```

Trước khi chúng ta đến phần Flex thì hãy xem qua đoạn HTML trên hoạt động ra sao nhé: 
![](https://images.viblo.asia/a6bd871f-e776-4b9a-922a-ca525fd1cf2e.png)

Bỏ qua các styling không liên quan như màu sắc của chữ và background,... thì chúng ta sẽ tới thẳng đoạn CSS:

**Flexbox header**
<br>
Chỉ với 1 dòng code đơn giản sau, bạn có thể căn chỉnh 3 item trong header đứng trên cùng một hàng:
```
header {
    display: flex;
}
```

![](https://images.viblo.asia/1b5e58e9-69d8-4ab9-9b63-2adad35cb2bb.png)

Để dịch chuyển phần 'logout' button sang phía bên tay phải, chúng ta chỉ cần CSS cho element đó với margin như sau:

```
header > div:nth-child(3) {
    margin-left: auto;
}
```

Kết quả là
![](https://images.viblo.asia/01b56ca5-bcc7-486a-8901-c8d0fe20697a.png)

<br>

**Grid header**
<br>
Cũng với ví dụ trên, ta sẽ tạo header với Grid. Tuy Grid được sinh ra không phải để tạo header một chiều như vậy, nhưng nó sẽ là ví dụ trực quan nhất để so sánh giữa Flex và Grid. 
<br>
Chúng ta có thể tạo header bằng rất nhiều cách với CSS Grid, đây là một trong số đó: chia header ra thành 10 cột, mỗi 1 cột sẽ có chiều rộng là 1 fraction.
```
header {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
}
```
Kết quả sẽ i sì với cách làm flexbox ở trên 
![](https://images.viblo.asia/1b5e58e9-69d8-4ab9-9b63-2adad35cb2bb.png)

Lúc này hãy thử mở Chrome inspector để xem kết quả như thế nào nhé:
![](https://images.viblo.asia/45e89381-7163-41b8-8369-362476096661.png)

<br>
Điểm mấu chốt ở đây là gì, chúng ta sẽ phải định nghĩa cột - nghĩa là phần layout trước. Chúng ta bắt đầu phải định nghĩa chiều rộng của cột, sau đó mới đặt phần content vào.
<br>
Cách này buộc chúng ta phải lựa chọn có bao nhiêu cột mà chúng ra muốn chia header ra thành bao nhiêu phần. Điều này cũng là một cản trở so với Flexbox, trừ khi chúng ta thay đổi grid còn không thì vẫn sẽ làm việc với duy nhất 10 cột này thôi.

<br>

Tiếp theo để di chuyển 'logout' button sang phía tay phải, chúng ra sẽ đặt nó vào cột thứ 10 như thế này:
<br>

```
header > div:nth-child(3) {
    grid-column: 10;
}
```

Và khi inspect lên ta sẽ thấy:
![](https://images.viblo.asia/ef8bb020-41d5-45fd-8084-0ea6b1062aa2.png)

<br>
Chúng ta sẽ không cần phải sử dụng margin nữa, bởi vì phần logout button đã được đặt chính xác vào cột thứ 10 của layout rồi. 


# Kếp hợp cả Flex và Grid
Giờ hãy xem cách sử dụng khi kết hợp cả Flexbox và Grid khi đặt ví dụ header trên vào một website như thế nào nhé!
Đây là đoạn markup:
```
<div class="container">
  <header>HEADER</header>
  <aside>MENU</aside>
  <main>CONTENT</main>
  <footer>FOOTER</footer>
</div>
```

Còn đây là CSS
```
.container {
    display: grid;    
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 50px 350px 50px;
}
```
Chúng ta sẽ đặt các items vào grid như thế này:
```
header {
    grid-column: span 12;
}
aside {
    grid-column: span 2;
}
main {
    grid-column: span 10;
}
footer {
    grid-column: span 12;
}
```

Kết quả sẽ là:
![](https://images.viblo.asia/64c2bce9-0c5d-40d4-9b85-ca16898fde81.png)


Giờ chúng ta chỉ việc thêm header mà thôi. Như đã nói ở trên, trường hợp này ta sẽ dùng Flexbox

```
header {
    display: flex;
}
```
Giờ set logout button sang bên phải

```
header > div:nth-child(3) {
    margin-left: auto;
}
```

Kết quả cuối cùng sẽ là:
![](https://images.viblo.asia/b48d3c82-807e-4837-baaf-c7e94e552b77.png)

# Browser support
Trước khi kết thúc, có một điều mà các bạn cần phải lưu ý đó chính là Browser support - trình duyệt hỗ trợ. Đây cũng là một trong những yếu tố khiến bạn quyết định nên sử dụng Flex hay Grid
<br>

**CSS Flexbox**

![](https://images.viblo.asia/0b968fa5-fd22-4933-b939-e13464c2e5b1.png)

<br>


**CSS Grid**

![](https://images.viblo.asia/85a9a0c2-df13-4025-95f5-dc10c0368546.png)

<br>

Dựa theo số liệu của [Caniuse](https://caniuse.com/) ta dễ dàng nhận thấy là Flexbox hỗ trợ cho những trình duyệt ở những phiên bản cũ hơn. Nên nếu bạn có phải support những phiên bản này thì cần phải cân nhắc!

<hr>

Tham khảo: https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf