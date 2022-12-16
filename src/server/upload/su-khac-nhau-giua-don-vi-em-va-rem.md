Chắc hẳn không ít các bạn khi code web thường hay cân nhắc việc sử dụng đơn vị như thế nào cho hợp lý mà lại hiệu quả. Nào là code trên desktop rồi khi responsive xuống mobile thì bị vỡ layout, cỡ chữ do đơn vị cố định rồi phải chỉnh css từng thành phần…

Ngoài những đơn vị như px, %, vw, vh, pt… thì trong số đó có 2 đơn vị **em** và **rem** luôn làm nhiều bạn nhầm lẫn, chưa nắm rõ nên sử dụng trong việc code khá là khó khăn, trắc trở.

Để giải quyết vấn đề đó nên hôm nay mình xin chia sẻ bài đầu tiên về 2 đơn vị em và rem này nhằm giúp các bạn có thể hiểu rõ và áp dụng chúng vào việc code giao diện ra sao nhé. Trước khi vào demo thì mình xin nhắc lại chút về khái niệm của 2 đơn vị em và rem này nha.

## Khái niệm

**rem**: là đơn vị tham chiếu tỷ lệ so với phần tử gốc của website ở đây là thẻ `html` dựa vào giá trị của thuộc tính **font-size**

**em:** là đơn vị tham chiếu tỷ lệ so với phần tử cha trực tiếp chứa nó hoặc chính nó dựa vào giá trị của thuộc tính là **font-size**
![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/bf5tgz4jzi_diagram-em-vs-rem.jpg)

## Áp dụng thực tế

Mình chắn hẳn nhiều bạn đọc xong và thậm chí coi sơ đồ mà vẫn chưa hiểu lắm. Trước đây mình cũng thế. Và cách tốt nhất để hiểu và nắm rõ chúng đó là bắt tay vào code. Nên ở đây mình có làm 1 demo nho nhỏ để cho các bạn dễ hình dung hơn nè.

Đầu tiên là html như thế này:

```
<html>
 <head><title>Em vs Rem</title></head>
<body>
 <div class="box">
  <div class="em">EM</div>
  <div class="rem">REM</div>
 </div>
</body>
</html>
```

Tiếp đến là css:

```
html {
  font-size: 15px;
}
.box {
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

Ta được kết quả như sau. *Bạn vẫn chưa hiểu ?* Mình có giải thích chi tiết ở bên dưới cho các bạn

{@embed: https://codepen.io/blackzero/pen/MBpGBP}

## Giải thích chi tiết

Đầu tiên mình tạo html layout gồm có 1 `div` có class `box` bọc ngoài và có 2 div bên trong tương ứng với class `em rem`  sau đó mình set cho thẻ `html` có thuộc tính `font-size` là **15px** và lần lượt 2 ô là màu *đỏ xanh* cho các bạn dễ phân biệt.

Cho nên lúc này **1em = 1rem = 15px**. Như các bạn nhìn vào demo ở trên thì 2 ô đều bằng nhau là 10(em-rem) x 15px = 150px của mỗi ô.

*À có chỗ này sẽ có bạn hỏi là "đơn vị em" phụ thuộc vào phần tử cha chứa nó chứ có phải thẻ <html> đâu sao mà 1em = 15px ?*

Mình xin giải thích là vì do lúc này chính nó(*class em*) và phần tử cha chứa nó là thẻ `div` có class `box` mình chưa set thuộc tính `font-size` nên nó sẽ phụ thuộc phần tử lớn hơn ở ngoài đó là thẻ `body` nhưng thẻ `body` cũng chưa set thuộc tính `font-size` nên nó cứ thế lấy ra ngoài cùng cho tới thẻ ` html`. Nên ở trên 1em = 1rem = 15px là theo thẻ `html` đấy.

Tuy nhiên bây giờ mình sẽ set cái thuộc tính `font-size` của thẻ div có class `box` là **20px** thì chắn chắn sẽ có thay đổi. Các bạn nhìn dưới đây nha.

```
.box {
 font-size: 20px;
}
```

{@embed: https://codepen.io/blackzero/pen/gjxdbq}

**Ô màu đỏ** có đơn vị `em` sẽ to hơn ban đầu vì như mình đã nói ở trên là đơn vị `em` phụ thuộc vào giá trị thuộc tính `font-size` của chính nó hoặc phần tử cha trực tiếp chứa nó. Cho nên lúc này ô màu đỏ sẽ có kích thước là **10em x 20px = 200px.**

```
html {
 font-size: 25px;
}
```

Còn **ô màu xanh**(`rem`) do phụ thuộc vào thẻ `html` nên khi mình thay đổi giá trị `font-size` của thẻ `html` sang **25px** thì ô màu xanh cũng sẽ thay đổi kích thước. Và lúc này giá trị của nó sẽ là **10rem x 25px = 250px**. Nhìn vào demo bạn sẽ thấy nó to hơn ban đầu và to hơn ô màu đỏ luôn.

## Lời kết

*Có 1 chi tiết nhỏ mình quên nói đó là nếu mình không set giá trị của thuộc tính `font-size` cho thẻ `html` thì `font-size` mặc định của thẻ `html` là 16px nha.*

Hi vọng với giải thích và ví dụ demo của mình sẽ giúp các bạn dễ dàng hiểu hơn về 2 đơn vị em và rem này. Ở bài viết tiếp theo mình sẽ viết về cách áp dụng chúng vào thực tế nha. Cám ơn các bạn đã đọc bài và chúc các bạn một ngày làm việc tốt lành.

Đọc nhiều bài viết khác về CSS của mình [tại đây](https://evondev.com).