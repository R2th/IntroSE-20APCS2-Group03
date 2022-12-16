Cách tốt nhất đề giải thích nó là bắt đầu với một ví dụ sẽ làm bạn khó hiểu và có thể sẽ hoạt động không như bạn mong đợi.
Sau đó chúng ta sẽ xem xét kĩ hơn về cách tính giá trị đặc hiệu mà selector sẽ được ưu tiên.

Đây là một list đơn giản và không có thứ tự:

```html
<ul id="summer-drinks">
  <li>Whiskey and Ginger Ale</li>
  <li>Wheat Beer</li>
  <li>Mint Julip</li>
</ul>
```
Bây giờ bạn muốn chỉ định một đồ uống thành yêu thích trong danh sách đồ uống của bạn và thay đổi nó về style một ít. Bạn cần một hook cho điều này nên bạn sẽ áp dụng nó thông qua một class name cho nó.

```html
<ul id="summer-drinks">
   <li class="favorite">Whiskey and Ginger Ale</li>
   <li>Wheat Beer</li>
   <li>Mint Julip</li>
</ul>
```
Bây giờ bạn hãy mở file CSS của bạn và styling cho class mới:

```css
.favorite {
  color: red;
  font-weight: bold;
}
```

Sau đó bạn nhìn xem nó làm việc thế nào, nhưng **nó không làm việc**! Một cái gì đó đang gây ra vấn đề ở đây.

Đi sâu hơn vào file CSS, bạn sẽ thấy điều này:

```css
ul#summer-drinks li {
   font-weight: normal;
   font-size: 12px;
   color: black;
}
```

Vấn đề nằm ở ngay đó. Hai CSS selectors khác nhau đang nói cho đoạn text đó có color và font-weight gì. Nhưng chỉ có một lệnh cho font-size nên rõ ràng cái đó sẽ có hiệu lực. Không có xung đột gì ở đây cả nhưng trình duyệt cần quyết định một trong những lệnh đó để áp dụng và hiển thị chúng. Nó làm bằng cách tuân theo một bộ quy tắc tiêu chuẩn.

Tôi nghĩ rằng điều này sẽ gây chút khó khăn cho người mới bắt đầu bởi vì họ chưa hoàn toàn nhận ra điều này. Họ có lẽ nghĩ vì class .favorite **nằm sâu hơn trong CSS** hoặc bởi vì nó **gần với chữ hơn** trong HTML :v sẽ là kẻ chiến thắng.

Trong thực tế, thứ tự của các selectors trong CSS sẽ đóng vai trò chính và quy tắc "từ trên xuống" sẽ được áp dụng khi giá trị đặc hiệu là giống nhau. Cho ví dụ:

```css
favorite {
   color: red;
}
.favorite {
   color: black;
}
```

Ở dây nó sẽ có màu black... Nhưng chúng ta đang lạc đề :v

Vấn đề ở đây là **chúng ta muốn nó cụ thể để nó có ý nghĩa** với mọi ví dụ mà chúng ta có. Ngay cả với ví dụ đơn giản được trình bày ở trên, Cuối cùng bạn cũng sẽ thấy chỉ cần sử dụng class name nhằm tới mục tiêu "favorite drink" là không thay đổi hoặc sẽ không an toàn ngay cả khi nó hoạt động . Sẽ thông mình hơn nếu sử dụng điều này :

```css
ul#summer-drinks li.favorite {
  color: red;
  font-weight: bold;
}
```

Đó là những là mà tôi đang gọi là " cụ thể để nó có ý nghĩa". Bạn thực sự có thể "cụ thể" hơn khi sử dụng kiểu dạng như thế này:

```css
html body div#pagewrap ul#summer-drinks li.favorite {
  color: red;
  font-weight: bold;
}
```

Nhưng nó sẽ là code Css của bạn khó đọc và không mang lại lợi ích thực tế. Một cách khác để tăng giá trị đặc hiệu cho class ".favorite" của bạn là sử dụng **important**!

```css
.favorite {
  color: red !important;
  font-weight: bold !important;
}
```

Tôi đã từng nghe nói rằng !important giống như một trò lừa về tinh thần trong css. Quả thực là như vậy, và bạn có thể buộc ý chí của mình vượt qua các khó khăn trong css bằng cách sử dụng nó. Nhưng !important áp đặt rằng sẽ tăng mạng tính đặc hiệu trên selector và từ đó sẽ vượt qua được các style khác.

!important có thể dễ dàng sử dụng sai nếu hiểu nhầm. Nó là cách tốt để giữ cho code của bạn sạch hơn, trong các ví dụ mà bạn biết các elements với các class selector cụ thể nên sử dụng style nhất quán **bất kể nó là gì**. Ngược lại, không nên sử dụng trick để ghi đè lên style của một element nào đó thay vì tìm ra cách CSS được viết và hoạt đông theo tác giả ban đầu.

Một ví dụ kinh điển là:

```css
last {
   margin-right: 0 !important;
}
```
Tôi thường sử dụng nó trong các tình huống có nhiều khối nối, cho khối cuối cùng bên phải trong một row. Điều đó đảm bảo chắc chắn khối cuối cùng không có bất kì right margin nào điều này sẽ giúp nó nằm sát nề phải so với cha mẹ nó. Mỗi khối có thể có các Css selector cụ thể để thêm right margin cho chúng, nhưng !important sẽ phá vỡ điều đó và làm cho class nhìn đơn giản và clear hơn.

# Tính giá trị đặc hiệu CSS

Tại sao cố gắng đầu tiên của chúng ta để thay đổi color và font-weight thất bại? Như chúng ta đã học, đó là bởi vì chúng ta đơn giản chỉ dụng class name có giá trị đặc hiệu thấp hơn selector khác. Css áp dụng các trọng số đặc hiệu khác cho **id** và **class**. Trong thực tế một Id có giá trị cao hơn nhiều! Vì vậy không thể một class có thể vượt qua được id.

Chúng ta hãy xem cách các con số thực sự được tính toán:
![](https://images.viblo.asia/69693cb5-3b1f-420a-ab65-11abdf28df54.png)
Nói cách khác:

* Nếu phần tử có inline styling, tự động đó sẽ thắng (1,0,0,0 điểm)
* Mỗi ID áp dụng (0,1,0,0 điểm)
* Mỗi class (hoặc pseudo-class hoặc attribute selector) áp dụng (0,0,1,0 điểm)
* Với mỗi tham chiếu trực tiếp element có (0,0,0,1 điểm)

Nói chung, bạn có thể đọc giá trị như các con số, như 1,0,0,0 là "1000", Vì thế nó rõ ràng sẽ thắng độ đặc hiệu 0,1,0,0 hoặc "100". Dấu phẩy ở đây thực sự để nhắc nhở chúng ta rằng nó không phải thực sự là "base 10". Về mặt kĩ thuật bạn có thế có giá trị như 0,1,13,4 và "13" không tràn ra như "base 10".

# Tính toán một cách đơn giản

![](https://images.viblo.asia/fe111c50-5b18-4b4f-b37a-1d171feeabb8.png)
![](https://images.viblo.asia/355c3a06-2635-4a02-9db7-29065b1cda8d.png)
![](https://images.viblo.asia/70fd49ce-f4d5-4272-8e7a-943fdb6e9e42.jpg)

**Update**: :not() sort-of-pseudo-class không thêm giá trị đặc hiệu vào chính nó. Chỉ những gì bên trong parent là được thêm giá trị đặc hiệu.

![](https://images.viblo.asia/b39328bd-a06b-45e6-b16a-6262ffbbfd31.png)
![](https://images.viblo.asia/4cf3242f-f632-40cc-b015-19c3ccad8175.png)

# Chú ý quan trọng
* Selector phổ cập (*) không có giá trị đặc hiệu (0,0,0,0)
* Pseudo-elements (e.g. :first-line) có giá trị (0,0,0,1) không giống như anh em của chúng psuedo-class có giá trị (0,0,1,0)
* pseudo-class :not() không thêm tính đặc hiệu của chính nó, Chỉ cái gì bên trong dấu () mới được thêm tính đặc hiệu.
* Thêm **!important** sẽ làm nó auto win :v. Nó sẽ ghi đè ngay cả inline style. Chỉ cần !important là có thể ghi đè mọi thứ. !important được khai báo sau trong CSS với giá trị bằng hoặc lớn hơn. Bạn có thể nghĩ nó sẽ thêm (1,0,0,0,0) tới giá trị đặc hiệu.

# Nguồn tham khảo

[css-tricks](https://css-tricks.com/specifics-on-css-specificity/)