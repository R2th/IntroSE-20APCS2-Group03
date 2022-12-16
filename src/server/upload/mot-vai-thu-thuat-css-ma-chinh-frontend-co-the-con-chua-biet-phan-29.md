![](https://images.viblo.asia/d0e5d2d2-f675-48df-bf92-f317e8e3b627.jpg)

Hello xin chào mọi người, mình đã trở lại và tiếp tục với phần 29 của series về [Một vài thủ thuật CSS mà chính Frontend có thể còn chưa biết](https://viblo.asia/s/mot-vai-thu-thuat-css-ma-chinh-frontend-co-the-con-chua-biet-bq5QL7RJlD8)

Bắt đầu thôi nào!

### 1.  `:focus-visible` hữu ích thế này mà không biết

Chắc hẳn ở đây nhiều bạn đã từng làm về Frontend và đã từng dùng CSS để reset đi style của trạng thái `focus` trên các elements kiểu như `button` hay là `input` đúng không?

Tại sao bạn lại làm như vậy nhỉ?

1. Vì bạn nghĩ nó không đẹp.
2. Vì bạn QA bắt lỗi :smiley: 
3. Hoặc là khách hàng của bạn không thích hiệu ứng như vậy.

Nhưng bạn không biết rằng, mình đang mắc 1 sai lầm.

Bởi vì, đối với 1 Web Developer thì phải luôn nhớ quy tắc này

> Tất cả mọi thành phần tương tác trên trang đều phải có style cho trạng thái focus. Nó sẽ giúp cho những người dùng bàn phím biết được họ đang tab đến đâu trên trang rồi.

Đây là 1 tiêu chuẩn của Accessibility (a11y) mà đối với Frontend như tụi mình cần đặc biệt chú ý.

Chắc nhiều Frontend cũng đã và đang từng dùng Bootstrap, hẳn là bạn đã từng "xuống tay" loại đi hiệu ứng `focus` trên cái `button` hay `input` nhỉ? Và bạn đã từng viết đoạn code cho dự án kiểu như này

```css
.btn:focus {
    box-shadow: none; // Vì trong Bootstrap sử dụng box-shadow style cho trạng thái focus
    /* Ở đây có thể bạn đã viết thêm CSS gì đó nữa, miễn là bạn đang muốn :focus vào không có cái hiệu ứng border "đáng ghét" kia */
}
```

Thì đối chiếu với quy tắc ở trên, bạn đã vô tình xóa đi hiệu ứng khi người dùng sử dụng bàn phím, họ ấn **tab** và họ không biết con chuột đang trỏ đến thành phần nào trên trang cả.

Nhưng bạn cũng đừng lo lắng, vì từ giờ sẽ có `:focus-visible` giúp bạn xử lý issue này 1 cách dễ dàng.

Viết lại đoạn code xóa hiệu ứng `focus` cho `button` của `Bootstrap` ở trên lại như này nhé

```css
.btn:focus:not(:focus-visible) {
    box-shadow: none;
}
```

Demo bên dưới, bạn hãy thử kiểm tra với 2 thao tác là **dùng chuột bấm vào button** (mouse users) và **dùng bàn phím bấm tab** (keyboard users) để thấy sự khác biệt nhé

SỬ DỤNG `:focus`
{@codepen: https://codepen.io/tinhh/pen/GRqVKQR}

SỬ DỤNG `:focus-visible`
{@codepen: https://codepen.io/tinhh/pen/qBNzvKO}

Tóm lại, `:focus-visible` là pseudo-class giúp phân biệt hành động focus dựa vào cách sử dụng của người dùng là mouse hay keyboard.

Tuy nhiên, theo như kiểm tra trên [CanIUse](https://caniuse.com/?search=focus-visible) cho đến thời điểm hiện tại của bài viết này thì vẫn chưa support trên Safari và IE. Cho nên bạn có thể tiếp cận 2 phương án xử lý sau:

1. Cứ để như vậy, trình duyệt nào có support thì gọi là Progressive Enhancement (tạm dịch là **Cải Tiến Tăng Dần**)
2. Sử dụng `polyfill`(https://github.com/WICG/focus-visible)

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible
- https://css-tricks.com/the-focus-visible-trick/
- https://github.com/WICG/focus-visible
- https://caniuse.com/?search=focus-visible

### 2. Google Fonts hỗ trợ `font-display` thì có gì vui?

![](https://images.viblo.asia/dbabcadd-dc2d-4b96-81b8-8fc5abf3d446.png)

Cách đây hơn 1 năm trong cộng đồng Web Developer, đặc biệt là các Frontend  Dev chia sẻ rầm rộ trên Twitter về việc Google Fonts nay đã hỗ trợ `font-display` gắn ở URL như query string.

```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
```

`display=swap` chính là query string được gắn thêm vào đường dẫn nhúng Google Fonts vào trang web của bạn.

Nhưng là 1 Frontend, liệu bạn có biết **"Vì sao cộng đồng lại vui mừng khi Google Fonts hỗ trợ font-display không?"**

Chuyện là từ khi CSS3 xuất hiện, khái niệm Web Fonts ra đời, cho phép nhúng các tên fonts theo ý muốn và đảm bảo ở máy của user cũng sẽ nhìn thấy được font này, đem lại 1 sự trải nghiệm đồng nhất.

Và chúng ta có cách sử dụng như dùng `@font-face` hay là `import đường dẫn font` từ Google Fonts.

Vấn đề của web fonts thường là **không nhẹ**, dẫn đến việc tải font và hiển thị trên trang web là 1 vấn đề nữa. Hãy xem qua 1 hình vẽ mô tả khá trực quan về cơ chế tải web fonts của trình duyệt.

![](https://images.viblo.asia/89f87066-8b5e-448c-890e-0c4232674beb.png)

Như hình trên thì bạn đang sử dụng font có tên `Roboto` (nó khá quen thuộc nhỉ :smile: )

Tiến trình diễn ra như sau:

1. Ở lần đầu load vào, trang web của bạn sẽ không nhìn thấy text nào cả (hiện tượng **invisible text**)
2. Sau 1 khoảng thời gian thì trang web sẽ load font fallback, tức font mặc định được khai báo trong `font-family`, cũng như là có sẵn ở máy local của bạn.
3. Khi web font Roboto được tải xong rồi, thì sẽ hiển thị thay thế cho font mặc định.

Và quá trình trên được gọi là hiện tượng `FOIT` (Flash of Invisible Text).

Với kiểu tải font như trên gây ra nhiều trải nghiệm không tốt cho người dùng. Nên thời gian sau đó, cộng đồng đã tìm ra 1 cách khác, cách này sẽ loại bỏ step 1 đi, thay vào đó là font mặc định hiển thị ngay lập tức. Và kỹ thuật đó có tên là `FOUT` (Flash of Unstyled Text) **(tuy nhiên kỹ thuật này cần phải sử dụng thêm 1 đoạn code JavaScript)**.

Cho đến khi `font-display` xuất hiện, là 1 thuộc tính trong CSS cho phép sử dụng `@font-face` với kỹ thuật tải web font `FOUT` mà **không cần đến JavaScript nữa**.

Tiếp theo đó là Google Fonts cũng đã implement tích hợp cách gọi `font-display` vào URL bằng param `display=`. Và bạn để ý mà xem, khi vào Google Fonts lấy đường dẫn của 1 font bất kỳ, code được generate ra mặc định là `&display=swap`, bởi vì `swap` là giá trị được implement theo kỹ thuật `FOUT`. 

Tương tự thế, nếu bạn không muốn dùng `&display=swap` thì có thể dùng `&display=block`, `block` là implement theo kỹ thuật `FOIT` (ẩn text lần đầu load vào).

Qua tip này, hi vọng bạn sẽ hiểu sơ sơ về các khái niệm `FOIT`, `FOUT`, `font-display`, `&display=swap` khi đọc các bài viết hay nghe ai đó nói về Web Fonts.

#### Đọc hiểu thêm

- https://font-display.glitch.me/
- https://twitter.com/addyosmani/status/1128548064287952896
- https://www.zachleat.com/web/fout-vs-foit

### 3. `:fullscreen` giúp viết CSS khi đang ở trong chế độ fullscreen

Nếu như làm những trang web về media như Youtube, chắc chắn bạn sẽ rất cần pseudo class `:fullscreen` này. 

Vì bình thường khi ở trong chế độ fullscreen, bạn sẽ không viết được thêm CSS nào cả. Bạn muốn `thay đổi màu của text`? Thuộc tính `color` cũng chẳng thể nào tác động được. Và cho dù bạn dùng JavaScript để thêm class khi vào chế độ fullscreen thì cũng không thể dùng class đó viết CSS thêm được. CƠ BẢN LÀ KHÔNG ĐƯỢC :smiley:  nếu như không có sự hỗ trợ của `:fullscreen`.

Demo dưới đây, sử dụng `:fullscreen` mình đã style cho thẻ `p` đổi từ `black` sang `white` trong fullscreen mode nè.

{@codepen: https://codepen.io/tinhh/pen/QWEewQe}

Và không chỉ là `color`, bạn còn có thể CSS cho nhiều thuộc tính khác nữa.

#### Đọc hiểu thêm

- https://developer.mozilla.org/en-US/docs/Web/CSS/:fullscreen
- https://tympanus.net/codrops/css_reference/fullscreen/

# Tổng kết

Hi vọng mọi người sẽ tăng thêm skill CSS với 3 tips trên.

Nếu thấy thích thì Upvote, thấy hay thì Clip bài này của mình nhé! ^^

P/s: Tiêu đề câu view thôi nhé! Anh em Frontend pro rồi đừng chém em ạ!