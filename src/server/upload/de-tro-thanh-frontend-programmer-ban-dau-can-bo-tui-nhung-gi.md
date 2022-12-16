Trước đây và thậm chí cả hiện tại có rất nhiều người hỏi mình rằng: làm frontend là làm về cái gì, có thú vị không? Sau nhiều năm làm frontend, mình có thể cắt nghĩa cho các bạn hiểu về **Frontend programmer**  là như thế nào.

## Frontend developer đại khái là làm gì?

Nếu như ví 1 website hay 1 phần mềm nào đó giống như cơ thể con người thì chúng ta sẽ có 3 phần như thế này:
- Toàn bộ code chay (không có CSS & JS) sẽ giống như bộ khung xương để nâng đỡ, tạo hình thành 1 website, phần mềm cơ bản nhất.
- Để cơ thể con người có thể cử động, chạy nhảy, nói cười,...thì cần có cơ và gân. Như vậy để web có thể chạy được hay nói cách khác là 1 dynamic web thì chúng ta cần có javascript và các ngôn ngữ lập trình.
- Vậy để xem người đó đẹp hay xấu thì chính là cần da thịt đắp lên. Website, phần mềm cũng thế. Muốn nhìn 1 website sinh động, đẹp mắt hay không thì cần CSS tô điểm thêm.

Như vậy chúng ta có thể hiểu: Frondend dev là người sẽ xử lý những phần tương tác với người dùng một cách trực tiếp - nói tắt là **User Interface**, vì vậy mình hiểu đại khái công việc và kỹ năng cần thiết của dev sẽ tương đương và cần tăng theo những thứ mà người dùng có thể nhận được.

Ví dụ:

- Ở giao diện đăng nhập tài khoản, người dùng cần 2 ô input và 1 nút submit, khi đó frontend dev sẽ chỉ cần kỹ năng cơ bản HTML.
- Tuy nhiên, khi giao diện đó được đặt trong giao diện tổng của trang web, với header, navigation, footer,… thì việc phải nắm được cả CSS là điều đương nhiên.
- Và khi bạn đăng nhập xong, việc trình duyệt không cần load lại mà người dùng đã có thể đăng nhập thành công và truy cập vào nội dung bên trong thì khi đó việc xử lý bất đồng bộ bằng Javascript của bạn là thứ không thể thiếu.

Vậy thì để trở thành Frontend developer từ con số 0, bạn bỏ vào túi của mình những tip gì?

## Túi của Frontend dev nên bỏ gì vào sớm?

### 1. Comment từ khi viết HTML

```
<!-- BEGIN div-header -->
<div id="header">
   <p>Viblo</p>
</div>
<!-- END div-header -->

<!-- BEGIN div-body -->
<div id="body">
   ...
</div>
<!-- END div-body -->

<!-- BEGIN div-footer -->
<div id="footer">
   <p>Footer</p>
</div>
<!-- END div-footer -->
```

Không phải nói nhiều về tác dụng của của viết comment trong code. Khi viết code dài, việc phải đóng bớt các tag lớn là chuyện bình thường, tuy nhiên khi có comment thì mọi thứ trở nên dễ dàng hơn nhiều đúng không.

### 2. Bootstrap hay không Bootstrap?

![](https://images.viblo.asia/8075088d-8a51-475b-8807-31721760be9e.jpg)

Là một framework nổi tiếng nhất về responsive. Độ thuận tiện khi dùng nó là điều đã được chứng minh ở mọi ngóc ngách trên thế giới, miễn xó đó có dev đang ngồi. Thuật ngữ "**Làm theo chuẩn Bootstrap**" cũng không phải là vô căn cứ. Gần như Bootstrap đã trở thành rule khi làm responsive.

Tuy nhiên có bao giờ bạn gặp phải tình cảnh nếu dự án không dùng Bootstrap nữa thì không biết sẽ viết CSS như thế nào chưa? Việc học thành thạo Bootstrap là rất tốt, tuy nhiên hãy cố gắng làm chủ kỹ năng CSS của mình ngay từ đầu. Đừng chỉ vào Bootstrap xem cách họ đặt tên cho class mà hãy F12 lên rồi xem họ đã làm nó như thế nào nhé.

```
<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
```

![](https://images.viblo.asia/f3b7d959-b2af-47dc-b968-712658b6ca2a.jpg)

Đơn giản nhỉ, 3 dòng. Nhưng thực ra cũng không easy lắm đâu, nên nếu muốn custom lại thì hãy thuần thục nó thật tốt.

```
.alert {
    position: relative;
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: .25rem;
}

.alert-primary {
    color: #004085;
    background-color: #cce5ff;
    border-color: #b8daff;
}
```

Một điều nữa, Bootstrap khá là nặng, và khi làm xong thì surprise… trang của bạn chả khác gì trang của người khác. Nên hãy sử dụng Bootstrap một cách đúng đắn nhất nhé, đừng để như hình ở trên thì khi surprise tập 2 là bạn nghỉ việc rồi.

### 3. Semantic Markup

Khi Bootstrap không còn ở trong túi bạn, thì việc làm quen với Semantic Markup sẽ giúp con đường Frontend bớt chông gai hơn.

```
<!-- HTML -->
<!-- Bad Semantics -->
<div class="article">
  <div class="article_title">Title</div>
  <div class="the_content">Content
     <div class="darkbold">text</div> 
     Content
  </div>
</div>

<!-- Good Semantics -->
<article>
  <h1>Title</h1>
  <p>Content
     <b>Text</b> 
     Content
  </p>
</article>
```

Các bạn có thể tìm hiểu thêm về phần này ở bài viết trước của mình nhé:

https://viblo.asia/p/bai-27-tim-hieu-chinh-xac-ve-semantic-element-trong-html5-07LKX2qDlV4

Hãy thử tìm hiểu BEM là gì và thử thay đổi cách đặt tên class của mình theo quy tắc để xem nó có xứng đáng được bạn mang theo bên mình không nhé:

```
<!-- HTML -->
<a class="btn btn--big btn--orange">
    <span class="btn__price">$9.99</span>
    <span class="btn__text">Subscribe</span>
</a>
```

```
<!-- CSS -->
/* Một Block (khối) độc lập */
.btn {}

/* Element (phần tử) con, phụ thuộc vào Block ở trên */
.btn__price {}

/* Modifier (bộ điều chỉnh) thay đổi trạng thái của Block */
.btn--orange {}
.btn--big {}
```

Tối ưu việc viết code HTML và CSS bằng cách sử dụng tag HTML hợp lý và đặt tên class CSS có ý nghĩa là thói quen tốt và không khó để làm quen và học nó nên hãy cố gắng sử dụng từ sớm nhé.

Và nếu muốn biết 1 số mẹo hay khi viết CSS thì các bạn có thể tham khảo thêm bài viết này của mình:

https://viblo.asia/p/bai-12-mot-so-meo-hay-khi-viet-code-css-4P856XWaZY3

### 4. Javascript HTML DOM

Việc học Javascript là điều bắt buộc với một Frontend dev, để master nó và phát triển khi sử dụng với các Framework thực sự là khó. Tuy nhiên hãy cố gắng đi từ căn bản nhất, đừng vội vàng quá với JQuery hay những Framework khác. Và quan trọng đó là hãy hiểu thật kỹ DOM, mọi thứ đi thật xa rồi cũng sẽ trở về DOM.

* DOM document: có nhiệm vụ lưu trữ toàn bộ các thành phần trong tài liệu của website
* DOM element: có nhiệm vụ truy xuất tới thẻ HTML nào đó thông qua các thuộc tính như tên class, id, name của thẻ HTML
* DOM HTML: có nhiệm vụ thay đổi giá trị nội dung và giá trị thuộc tính của các thẻ HTML
* DOM CSS: có nhiệm vụ thay đổi các định dạng CSS của thẻ HTML
* DOM Event: có nhiệm vụ gán các sự kiện như onclick(), onload() vào các thẻ HTML
* DOM Listener: có nhiệm vụ lắng nghe các sự kiện tác động lên thẻ HTML đó
* DOM Navigation: dùng để quản lý, thao tác với các thẻ HTML, thể hiện mối quan hệ cha – con của các thẻ HTML
* DOM Node, Nodelist: có nhiệm vụ thao tác với HTML thông qua đối tượng (Object)

![](https://images.viblo.asia/03d4e6a7-b2ec-4d6b-99b9-28e2bc197031.gif)

### 5. Tìm hiểu sự khác nhau giữa các trình duyệt

![](https://images.viblo.asia/5ec627dc-da7d-4db9-b74b-e4eaca5b96eb.png)

À há, đây là 1 phần khá thú vị. Có lẽ nhiều bạn chưa rõ: trên mỗi trình duyệt sử dụng các nền tảng khác nhau thì hiển thị css sẽ khác nhau một số thứ đấy.

Mình lấy ví dụ:
- Trên IE8 trở xuống sẽ không support HTML5 và CSS3. Để IE8 có thế nhận được HTML5 và CSS3 thì cần phải vài tip nhỏ. Là tip gì thì nếu có thời gian mình sẽ giới thiệu sau nha.
- Hay như IE10 đã support HTML5 và CSS3, tuy nhiên nó lại không nhận flexbox - một property được sử dụng khá nhiều trong CSS3 hiện nay và đặc biệt là trong Bootstrap 4. Khá là cùi bắp nhỉ?
- 1 cái khác. Chẳng hạn như Chrome, Safari và Edge cùng sử dụng chung nền tảng -webkit- nhưng chắc gì chúng đã hiển thị CSS y hệt nhau đâu.

Chính vì vậy, hãy thử code của mình trên các trình duyệt khác nhau, vì không phải người dùng nào cũng có Chrome hay Firefox để vừa làm vừa test như dev đúng không. Đặc biệt, các thuộc tính của CSS3 như **transition** , **transform**,...cần vendor prefixes để làm việc trên nhiều trình duyệt.

Vậy đấy, để trở thành 1 **Frontend programmer** nói dễ mà khó, khó mà dễ. Dễ ở đây là các bạn không cần lo nghĩ về vấn đề làm việc với database - nhỡ tay 1 chút là bay luôn cả cái web. Khó ở đây là các bạn cần phải rèn luyện cho mình tính tỉ mỉ, chi tiết, trau chuốt sao cho web, app phải chạy mượt mà, hiệu ứng đẹp mắt. Nếu bạn không có tính kiên nhẫn thì sẽ rất khó để trở thành frontend developer đấy.

Cám ơn các bạn đã theo dõi.