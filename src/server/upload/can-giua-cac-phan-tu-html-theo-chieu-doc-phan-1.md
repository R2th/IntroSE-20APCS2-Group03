Bài viết được dịch từ bài [Vertical centering of elements in HTML](http://www.web-plus-plus.com/Articles/vertical-centering-elements-html) xuất bản ngày 18/01/2015 trên trang [Web++](http://www.web-plus-plus.com/).

Phần 2: https://viblo.asia/p/can-giua-cac-phan-tu-html-theo-chieu-doc-phan-2-XL6lAxNBZek


-----


# Mở đầu

Việc căn các phần tử HTML theo chiều dọc, cụ thể là việc căn giữa, là một ví dụ cổ điển về một thứ gì đó trông có vẻ đơn giản nhưng trên thực tế lại rất phức tạp. Rất nhiều lập trình viên web phải khổ sở với nó, và không phải chỉ các lập trình viên trẻ cảm thấy như vậy. Ví dụ, tôi tìm thấy 6 câu hỏi thường gặp trên Stack Overflow về vấn đề này:

[căn giữa theo chiều dọc các phần tử nằm trong 1 div](http://stackoverflow.com/questions/79461/vertical-alignment-of-elements-in-a-div) (tháng 9 năm 2008)

[Căn theo chiều dọc các chữ nằm bên cạnh một ảnh?](http://stackoverflow.com/questions/489340/vertically-align-text-next-to-an-image) (tháng 1 năm 2009)

[Cách căn một ảnh theo chiều dọc bên trong div](http://stackoverflow.com/questions/7273338/how-to-vertically-align-an-image-inside-div) (tháng 9 năm 2011)

[Cách căn giữa chữ theo chiều dọc bên trong div bằng CSS?](http://stackoverflow.com/questions/8865458/how-to-align-text-vertically-center-in-div-with-css) (tháng 1 năm 2012)

[Liệu có thể căn chữ theo chiều dọc bên trong một div?](http://stackoverflow.com/questions/9249359/is-it-possible-to-vertically-align-text-within-a-div) (tháng 2 năm 2012)

[Cách căn các checkbox và label của chúng một cách nhất quán và cross-browsers](http://stackoverflow.com/questions/306252/how-to-align-checkboxes-and-their-labels-consistently-cross-browsers) (tháng 7 năm 2014)

Lí do của vấn đề này là không có duy nhất một cách căn các phần tử HTML theo chiều dọc, nhưng vẫn có 1 hoặc 2 phương pháp chưa được hỗ trợ hoàn toàn bởi các trình duyệt trên các nền tảng, cộng thêm một vài cách xử lý bằng mẹo và xấu xí. Điều khó hiểu nhất là CSS cung cấp một thuộc tính tên 'vertical-align' nhưng vì nhiều lí do mà nó có thể hoặc không thể hoạt động với một phần tử cụ thể trong những trường hợp cụ thể.

Rất nhiều các bài viết trên diễn dàn, các bài hỏi đáp và các bài blog viết về việc căn giữa; thậm chí còn tồn tại các trang chỉ có mục đích là trợ giúp cho việc này. Vậy thì tại sao tôi lại quyết định đóng góp thêm bài viết của mình? Chủ yếu bởi vì thông tin sẽ bị lỗi thời vô cùng nhanh chóng trong thế giới điên cuồng của chúng ta, đặc biệt trong thế giới lập trình siêu điên cuồng này. Thậm chí một bài viết thực sự tốt nhưng được viết từ 2 hay 3 năm trước thì gần như đã lỗi thời ở thời điểm hiện tại, do đó cần tới những bài viết mới hơn.

Bài viết này sẽ giải thích nhiều phương pháp căn giữa các phần tử HTML bao gồm những phương pháp hiện đại nhất, xem xét các ưu nhược điểm của chúng và trình bày cách sử dụng các phương pháp này trong các trường hợp phổ biến nhất.

# Các phương pháp căn giữa bằng mẹo

Tôi gọi các phương pháp sau là "mẹo" vì một số lí do. Đầu tiên, chúng không rõ ràng. Về mặt logic, khi một lập trình viên muốn căn giữa một phần tử bên trong phần tử cha, anh ta sẽ tìm kiếm thứ gì đó chứa từ 'align', 'center' hay tương tự thế. Tuy nhiên những phương pháp này lại sử dụng các thuộc tính như 'line-height' hay 'position', bản chất không liên quan tới việc căn chỉnh nhưng có thể được sử dụng để làm vậy. Thứ hai, các phương pháp này cần phải xử lý trên pixel và do vậy chúng không hoạt động tốt với cách thiết kế responsive.

![](http://www.web-plus-plus.com/Images/Articles/vertical-centering-elements-html/AlignCSSCaricature.png)

## Mẹo sử dụng line-height

Ý tưởng của phương pháp này rất đơn giản. Tất cả những gì chúng ta cần làm là gán giá trị line-height của phần tử chứa chữ bằng với giá trị chiều cao của phần tử đó. Mặc định, khoảng trống phía trên và bên dưới chữ có chiều cao bằng nhau nên chữ sẽ được căn giữa theo chiều dọc.

```html
<div class="center-text">Hello World!</div>
```

```css
.center-text {
  width: 400px;
  height: 120px;
  font-size: 24px;
  line-height: 120px;
  text-align: center;
  background-color: #fafafa;
  border: solid 1px lightgray;
}
```

{@embed: https://jsfiddle.net/hieuns/rtyf2c6v/embedded/result}

Như bạn có thể thấy, phương pháp này có tác dụng, nhưng tồn tại một hạn chế 'nhỏ': nó chỉ có tác dụng với một dòng chữ, với nhiều dòng thì không. Phương pháp này không phải là một phương pháp tốt.

## Mẹo sử dụng absolute bên trong relative position

Phương pháp này dựa trên thuộc tính 'margin: auto' được dùng để căn giữa một phần tử bên trong phần tử cha của nó. Tuy nhiên, độ rộng và chiều cao của phần tử con cần được xác định cụ thể như ví dụ bên dưới:

```html
<div class="cnt-div">
  <img src="cat.jpg" />
</div>
```

```css
.cnt-div {
  position: relative;
  width: 400px;
  height: 120px;
  background-color: #fafafa;
  border: solid 1px lightgray;
}
.cnt-div > img {
  position: absolute;
  width: 64px;
  height: 64px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

{@embed: https://jsfiddle.net/hieuns/5qcjpm9y/embedded/result}

Ở đây chúng ta căn giữa thành công một ảnh bên trong div tương đối dễ dàng. Phương pháp này có thể áp dụng cho các hộp thoại (ví dụ vậy) có độ rộng cố định, nhưng với các nội dung động mà chúng ta không biết kích cỡ của chúng thì sao?

## Mẹo sử dụng padding và margin

Dĩ nhiên chúng ta có thể chỉnh vị trí của các phần tử HTML bằng cách thay đổi padding và margin và có rất nhiều lời gợi ý sử dụng chúng để căn giữa. Tuy nhiên, như mẹo trước, phương pháp này chỉ ổn với các nột dung tĩnh và rất có vấn đề với các nội dung động. Hơn nữa, khai báo kích thước bằng pixel quá nhiều sẽ gây ra những vấn đề nghiêm trọng với thiết kế responsive do ["một pixel không phải một pixel"](http://www.quirksmode.org/blog/archives/2010/04/a_pixel_is_not.html) trên các thiết bị di động.

Giờ chúng ta hay xem tiếp 2 phương pháp phổ biến và đáng tin cậy hơn.

# Căn giữa sử dụng display table

Chào mừng bạn tới thời đại tệ hại của HTML4 khi phương pháp dàn trang chủ yếu là sử dụng table! Chỉ có một thứ hoạt động tốt là: việc căn chỉnh theo chiều dọc. Khi thế giới cuối cùng cũng đã chuyển sang sử dụng HTML5, một việc được mong đợi từ lâu, và bắt đầu sử dụng các phương pháp dàn trang tốt hơn thì đột nhiên phát hiện ra là tính năng căn chỉnh theo chiều dọc này bị thiếu mất. Tuy vậy, không có điều gì có thể ngăn chúng ta sử dụng table mà không cần tới table! Cho phép tôi giới thiệu tới bạn 3 giá trị của thuộc tính display của CSS: **table**, **table-row** và **table-cell**. Giờ thì bất cứ phần tử HTML nào cũng có thể hoạt động như table, row và cell.

Trên thực tế, việc giả lập dàn trang bằng table trên HTML5 và CSS3 còn tốt hơn dàn trang bằng table gốc. Đầu tiên, bạn không cần thiết phải phụ thuộc vào toàn bộ cấu trúc của table: table chứa các row, row chứa các cell. Bạn có thể dùng row nếu muốn, nhưng bạn hoàn toàn có thể đặt 'table-cell' trực tiếp bên trong 'table'. Tuy nhiên vẫn cần tới 'table'.

Thứ hai, row trong table thật thì chỉ cho phép căn chỉnh theo chiều dọc và cell chỉ cho phép căn chỉnh theo chiều ngang nhưng 'display: table-cell' thì cho phép cả hai.

Do vậy, để căn giữa một nội dung bên trong div, chúng ta có thể hiển thị div đó như 'table' và bao nội dung của div đó bên trong một phần tử nữa, ví dụ như span, và phần tử đó được hiển thị như một 'table-cell'.

```html
<div class="tbl-div">
  <span>It's no problem to center<br />multiple lines of text</span>
</div>

<div class="tbl-div">
  <span><img src="cat.jpg" /></span>
</div>
```

```css
.tbl-div {
  display: table;
  width: 400px;
  height: 120px;
  background-color: #ffe6cc;
  border: solid 1px lightgray;
}
.tbl-div > span {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
```

{@embed: https://jsfiddle.net/hieuns/edt40xkw/embedded/result}

Ưu điểm của phương pháp này khi so sánh với các mẹo bên trên là nó rõ ràng. Nó đơn giản, phổ biến và có thể sử dụng với bất cứ phần tử bao đóng và được bao đóng nào. Bạn không cần phải biết trước nội dung; bạn không cần phải xử lý với các kích thước cố định, v..v..

Tuy nhiên phương pháp này có một số nhược điểm. Đầu tiên, cần phải chèn thêm một phần tử vào cấu trúc DOM. Sau này, chúng ta sẽ thấy rằng trong một số trường hợp cụ thể, điều này sẽ khiến số lượng code tăng lên đáng kể. Thứ hai, ở mức khái niệm thì chúng ta đang sử dụng mẫu dàn trang dựa trên table đã lỗi thời và điều này không được tuyệt vời cho lắm.

# Căn giữa sử dụng Flexible Box Layout model

Phương pháp căn chỉnh dựa trên table ở trên nhìn về quá khứ, trong khi phương pháp sử dụng flexible box thì hướng tới tương lai. Được phát minh vào năm 2009, [CSS Flexible Box Layout model](http://www.w3.org/TR/css3-flexbox/) vẫn là bản nháp nhưng các trình duyệt hiện đại đã hỗ trợ ở mức cơ bản. Tôi rất khuyến khích bạn [tìm hiểu thêm](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) về flexible layout, ở đây chúng ta sẽ tập trung vào mục đích chính của mình.

Flexible box model cung cập một khái niệm tự mô tả mới và đặc biệt là cung cấp những sự nhìn nhận mới về các khái niệm 'alignment' và 'justification'. Thuộc tính '**justify-content**' định nghĩa cách các phần tử được đặt dọc theo trục chính (main axis) và thuộc tính '**align-item**' định nghĩa cách các phần tử được đặt dọc theo trục cắt (cross axis). Những điều này có nghĩa là gì?

Trục chính và trục cắt phụ thuộc vào giá trị của thuộc tính '**flex-direction**', giá trị đó có thể là '**row**' (mặc định), '**reverse-row**', '**column**' hoặc '**reverse-column**'. Với 2 giá trị đầu, trục chính nằm ngang và trục cắt nằm dọc; và ngược lại, với 2 giá trị cuối, trục chính nằm dọc và trục cắt nằm ngang... có vẻ phức tạp nhỉ?

Đừng lo! Sau khi tìm hiểu kỹ về flexible model, bạn sẽ quen với tất cả các khái niệm này. Để sử dụng flexible box với mục đích căn giữa các phần tử, bạn có thể sử dụng quy tắc sau: **justify horizontally, align vertically**.

Giải thích thì hơi phức tạp, nhưng sử dụng thì rất đơn giản:

```html
<div class="flex-div">
  It's no problem to center<br />multiple lines of text
</div>

<div class="flex-div"><img src="cat.png" /></div>
```

```css
.flex-div {
  display: flex;
  width: 400px;
  height: 120px;
  justify-content: center;
  align-items: center;
  background-color: #f0fff0;
  border: solid 1px lightgray;
}
```

{@embed: https://jsfiddle.net/hieuns/v2k8u6nt/embedded/result}

Phương pháp này còn đơn giản và thanh lịch hơn phương pháp căn chỉnh dựa trên table ở trên. Code rất ngắn và rõ ràng, không cần thêm phần tử và kết quả thậm chí còn chính xác hơn. Vậy thì tại sao chúng ta còn chưa sử dụng phương thức này và quên đi các phương pháp tiền nhiệm? Câu trả lời rất đơn giản: tính tương thích.

# Vấn đề tương thích với các trình duyệt

Theo như thông tin trên trang [Can I Use](http://caniuse.com/#search=table-cell), display table được hỗ trợ đầy đủ bởi hầu hết các trình duyệt trên mọi nền tảng. Sự hỗ trợ dành cho flex box thì [thiếu đầy đủ](http://caniuse.com/#search=flex) hơn. Internet Explorer 10 chỉ hỗ trợ một phần và yêu cầu sử dụng vendor prefix; Safari cũng yêu cầu dùng vendor prefix; và cuối cùng, Opera Mini vẫn chưa hỗ trợ.

Cân nhắc tính tương thích và đối tượng hỗ trợ, các lập trình viên có thể quyết định khi nào thì sử dụng flex box và khi nào thì sử dụng phương pháp dàn trang dựa trên table cho đến khi đặc tả của flexible model được hoàn thiện.

*(còn tiếp)*