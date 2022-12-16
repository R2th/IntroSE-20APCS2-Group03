Xin chào các bạn,<br><br>
Đối với một front-end deverloper thì chắc hẳn CSS đã trở nên quen thuộc với nhiều ưu điểm như cú pháp đơn giản, dễ tiếp cận, dễ học, … phải không nào? Nhưng nó cũng có những nhược điểm là khá tĩnh, tức là các thành phần khai báo hoàn toàn độc lập với nhau, khó có thể sử dụng lại các thuộc tính giống nhau. Điều này dẫn đến bất cập là khó quản lý khi thiết kế một website lớn với nhiều đoạn mã CSS hơn. Bạn hãy tưởng tượng xem, khi file của bạn có hàng ngàn dòng CSS mà cần thay đổi thì thật là phức tạp phải không? Trong bài viết này, mình xin chia sẻ đến bạn giải pháp tối ưu để khắc phục vấn đề trên, đó chính là CSS Preprocessors (tiền xử lý CSS).<br><br>
Chúng ta cùng đi lần lượt tìm hiểu về CSS preprocessors nhé !<br><br>
<h3>1.	Css preprocessor – nó là gì?</h3>
<br>
Đầu tiên, chúng ta phải  hiểu nó là gì đã. Vậy, CSS  preprocessors -  nó là gì?<br><br>
CSS Preprocessors được Việt hóa bằng một cái tên rất hoành tráng: “ngôn ngữ tiền xử lý CSS”. Đây là một ngôn ngữ kịch bản mở rộng của CSS và được biên dịch thành cú pháp CSS giúp bạn viết CSS nhanh hơn và có cấu trúc rõ ràng hơn. Nó có nhiệm vụ giúp bạn logic hóa và cấu trúc các đoạn mã CSS để cho CSS tiến đến gần hơn với một ngôn ngữ lập trình.<br><br>
Hiểu đơn giản CSS preprocessors là một ngôn ngữ kịch bản mở rộng của CSS. Nó cho phép developer viết mã từ một ngôn ngữ nào đó, ngôn ngữ đó ở đây chính là SASS/SCSS, LESS hay một ngôn ngữ tương tự, sau đó biên dịch nó thành CSS.
<br><br>
<h3>2.	Tại sao nên sử dụng CSS preprocessors?</h3>
<br>
Qua mục đầu tiên, chúng ta đã tìm hiểu được sơ bộ cái khái niệm của CSS preprocessors, vậy tại sao một lập trình viên front-end lại nên sử dụng chúng? Để hiểu được tại sao, trước hết chúng ta cùng đi qua một vài quy tắc mà CSS preprocessors có nhé, những quy tắc này một phần lý giải cho việc vì sao ta nên sử dụng đó!
<br><br>
<h4>2.1 Một vài quy tắc</h4>
<br>
<b>- Quy tắc xếp chồng: </b>
<br>
Bạn hãy thử nhìn đoạn code sau:<br><br>

```
// SASS
header
  margin-bottom: 20px;
  nav
    height: 30px;
  a
    color: white;
```
Sau khi biến dịch chúng ta sẽ thu được code CSS như sau:<br>
```
header {
  margin-bottom: 20px;
}
    
header nav {
  height: 30px;
}
    
header a {
  color: white;
}
```
Thật dễ dàng hơn trong việc viết css phải không nào, với cách viết này bạn dễ dàng tổ chức lại các dòng code CSS theo hệ thống phân cấp HTML. Điều này giúp bạn thuận tiện trong việc định dạng và bảo trì style hơn.
<br><br>
<b>- Biến:</b>
<br>
Biến được dùng để lưu trữ những giá trị mà bạn đã xác định là sẽ sử dụng nhiều lần trong suốt quá trình style của mình như các mã màu, font chữ, giá trị border, shadows hay bất kì giá trị nào mà bạn muốn. Với SASS kí hiệu $ được sử dụng để định nghĩa biến.
<br><br>
```
$blue-color: blue;  /* create variable for all links */
$padding: 20px;  /* create variable for padding */

nav {
  padding: $padding;
}
.sidebar a {
  color: $blue-color;
}
```
<br>
<b>- Quy tắc mixin:</b>
<br>
Mixin được hiểu tương tự như một function trong các ngôn ngữ lập trình khác, cái mà bạn có thể truyền giá trị vào, xử lý và trả ra kết quả. Chúng được định nghĩa nhằm mục đích dễ dàng gọi ra và sử dụng nhiều lần trong website chỉ bằng một dòng cú pháp đơn giản. 
<br>
Ví dụ về sử dụng mixin như sau:
<br><br>

```
// SASS
=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius: $radius
  -ms-border-radius: $radius
  border-radius: $radius

.box
   +border-radius(10px)
 
 ------------------------------------------
 
 // CSS nhận được sau khi compile
.box
   -webkit-border-radius: 10px
   -moz-border-radius: 10px
   -ms-border-radius: 10px
   border-radius: 10px
```
<br>

<h4>2.2 Sự lợi hại của CSS preprocessors</h4>
<br>
Thông qua các quy tắc đã nêu bên trên, ta đã phần nào thấy được những mặt tích cực và vượt trội của ngôn ngữ tiền xử lý CSS so với CSS thuần túy. Sự lợi hại của CSS preprocessors được mình tổng hợp như sau:
<br><br>
<b>- Tiết kiệm thời gian viết code:</b> Với các quy tắc mở rộng, CSS preprocessors giúp bạn có thể tái cấu trúc lại mã nguồn CSS một cách logic và rõ ràng. Từ đó tránh được việc viết đi viết lại một đoạn code, tiết kiệm thời gian viết code, tăng năng suất và nhanh chóng hoàn thành sản phẩm.
<br><br>
<b>- Dễ dàng bảo trì và phát triển CSS:</b> Xã hội không ngừng đổi mới và website cũng không ngừng phát triển. Nhưng nếu bạn cứ thêm CSS vào khi cần thì về lâu dài rất khó quản lý tập tin CSS và gây khó khăn khi bạn cần thiết kế lại website hay nâng cấp nó. Vì sẽ có nhiều đoạn CSS bị trùng hoặc không được sắp xếp đúng cách. Các CSS preprocessors giúp bạn tạo ra các biến trong CSS và sử dụng nhanh chóng. Ngoài ra nó cũng giúp bạn dễ dàng viết CSS cho nhóm vùng chọn tốt hơn, dễ dàng bảo trì về sau cũng như dễ dàng viết CSS thêm cho các phần tử khác có cùng đối tượng.
<br><br>
<b>- Các tập tin CSS được tổ chức một cách rõ ràng:</b> Để thuận tiện cho việc quản lý và phát triển file CSS về sau, bạn cần phải xây dựng được một cấu trúc khoa học, rõ ràng và dễ truy vấn. Bạn có thể chia nhỏ thành nhiều file CSS khác nhau ứng với mỗi công dụng của nó. Ví dụ file <b>button.scss</b> sẽ chứa code CSS cho thành phần button, <b>block.scss</b> sẽ chứa code CSS cho thành phần là các khối block, ... Việc chia nhỏ ra các file như vậy giúp code được phân tách rõ ràng cho từng phần, sau này khi  ta muốn sửa chữa, thay đổi hay viết thêm CSS thì điều đó trở nên đơn giản hơn rất nhiều thay vì viết tập trung hết code vào chung một file CSS. 
<br><br>
<h3>3. Những mặt hạn chế của CSS preprocessors</h3>
<br>
 Theo [cuộc thăm dò ý kiến của Chris Coyier] trên CSS-Trick, một nửa số người được hỏi đã và đang sử dụng CSS preprocessors (chủ yếu là SASS/SCSS và LESS). Điều này đồng nghĩa với việc một nửa trong số họ viết CSS mà không dùng CSS. Nhưng với một tỷ lệ sử dụng cao như vậy không có nghĩa là CSS preprocessors không có những "mặt tối" của nó. Và trong phần cuối cùng của bài viết này, chúng ta hãy đề cập tới những điểm chưa tốt của các ngôn ngữ này nhằm có cái nhìn khách quan hơn khi đưa ra quyết định lựa chọn chúng.
<br><br>

Có rất nhiều bài viết đã nói về bất cập của các ngôn ngữ tiền xử lý CSS như khó khăn khi phải học mới một ngôn ngữ hay các cú pháp ngặt nghèo, ... Nhưng cá nhân mình cho rằng khi bạn bắt đầu học CSS preprocessors tức là bạn đã phải có một lượng kiến thức nhất định về CSS và JS (JS là optional, không nhất thiết phải biết trước khi học CSS preprocessors). Mà những CSS preprocessors như SASS/SCSS hay LESS giờ đây đều cải tiến cú pháp rất giống với CSS và JS (mình sẽ đề cập ở các bài viết sau)  nên rất dễ hiểu và nó sẽ không gây khó khăn khi học. Vì vậy trong mục này mình chỉ nêu ra 2 điểm chính vẫn là khiếm khuyết của CSS preprocessors.
<br><br>

<h4>3.1 Khó khăn trong việc debug</h4>
Bộ tiền xử lý (preprocessors) có một bước biên dịch LESS hay SCSS ra CSS, các lỗi cú pháp của bạn được chỉ ra trong bước này và khi quá trình biên dịch thành công ra file CSS là bạn có thể chạy được ngay. Nhưng điểm bất cập chính là bạn không thể debug những lỗi mà trong các ngôn ngữ lập trình khác như C hay Java, ... gọi là "lỗi runtime" - lỗi trong quá trình chạy dẫn đến kết quả sai.
Điều này làm cho nhiều người mới học, thậm chí có chút ít kinh nghiệm với ngôn ngữ tiền xử lý này trở nên khó khăn khi phải fix bug. Hiện nay đã có một số công cụ giúp chúng ta có thể khắc phục vấn đề này như là Source maps và các công cụ tương tự.  Nhưng vấn đề cài đặt khó khăn và việc chỉ tương thích với một số trình duyệt hiện đại cũng là trở ngại lớn khi sử dụng các công cụ này. May thay các developer tool ở mỗi trình duyệt cho phép ta sửa trực tiếp CSS trên đó, nên khi có "lỗi runtime" chúng ta vẫn có thể viết CSS và suy ngược thành CSSS hay LESS.
<br><br>

<h4>3.2 Sự biên dịch làm chậm quá trình phát triển và ảnh hưởng tới hiệu năng hệ thống</h4>

Biên dịch là một bước bắt buộc có với các ngôn ngữ tiền xử lý CSS. Quá trình này diễn ra khá lâu do thuật toán của bộ biên dịch. Điều này là một trong những yếu tố gây khó khăn khi phát triển.
Mặt khác, với các quy tắc viết code ưu việt hơn CSS, file source code của CSS preprocessors sẽ nhỏ hơn rất nhiều,  nhưng chú ý rằng, sau khi biên dịch, "bộ mặt thật" của nó là CSS được "hiện nguyên hình". Và lúc này, file CSS của chúng ta lớn hơn rất nhiều so với file code SCSS hay LESS. 
Điều này dẫn đến tải lớn, làm chậm hiệu năng của web, vì vậy khi code chúng ta nên chú ý điểm này.
<br>
<h3>Kết luận</h3>
Tóm lại, sau khi đã đi tìm hiểu nhanh về khái niệm cũng như sự lợi hại và các khuyết điểm của các ngôn ngữ tiền xử lý CSS, ta có thể thấy được rằng các CSS preprocessors có những điểm ưu việt, vượt trội hơi rất nhiều so với CSS thuần mà ta vẫn biết. Điều đó được thể hiện ở cú pháp, các quy tắc mới và thực nghiệm. Tuy rằng chúng vẫn còn những hạn chế như khó khăn khi debug hay làm chậm hệ thống, nhưng các công cụ hỗ trợ debug và sự phát triển của ngôn ngữ tiền xử lý CSS trong tương lai đang hứa hẹn một sự chuyển mình đáng hy vọng.
<br>
Trong bài viết tới, mình sẽ đi sâu hơn về CSS preprocessors, đặc biệt là SASS/SCSS và LESS để có thể ứng dụng chúng vào trong các dự án thực tế.
<br><br>
Xin chào các bạn và hẹn gặp lại vào một tương lai không xa!!!
<br><br>
<b>References:</b>

* https://htmlmag.com/article/an-introduction-to-css-preprocessors-sass-less-stylus
* https://jaketrent.com/post/cons-css-preprocessors/
* https://adamsilver.io/articles/the-disadvantages-of-css-preprocessors/
* https://css-tricks.com/poll-results-popularity-of-css-preprocessors/