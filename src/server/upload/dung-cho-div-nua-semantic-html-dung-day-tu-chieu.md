Tag `<div>` đã tồn tại trong nhiều thập kỷ, là một dạng Block-level Element nó giúp định dạng một phần của trang web. Cụ thể nó được sử dụng để tạo ra một khu vực kiểu block nào đó trên một website, đơn giản là tập hợp các phần tử giống nhau trên website vào một khu vực. Tag `<div>` như một đứa con cưng của HTML vì chúng ta đều yêu thích các tag `<div>` của mình. Rất dễ dàng để xem qua các trang web và chúng ta sẽ thấy các tag `<div>` đã hiện diện như thế này trong căn nhà của bạn:

```html
<div class="container" id="header">
    <div class="header header-main">Title</div>
    <div class="site-navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </div>
</div>
<div class="container" id="main">
    <div class="title-1">
        Tag div
    </div>
    <div class="home-content">
        <div class="home-section">
            <div class="title-2">
                Part 1: Content 1
            </div>
        </div>
        <div class="home-section">
            <div class="title-2">
                Part 2: Content 2
            </div>
        </div>
    </div>
</div>
<div class="container" id="footer">
    Contact us!
    <div class="contact-info">
        <p class="email">
            <a href="sun@example.com">sun@example.com</a>
        </p>
        <div class="street-address">
            <p>16 Ly Thuong Kiet St.</p>
            <p>Da Nang City</p>
        </div>
    </div>
</div>
```
Đoạn code trên bạn đã thấy gì, đã có quá nhiều  `div` được sử dụng. Sử dụng quá nhiều thẻ div hơn mức cần thiết thì bạn đã làm cho code HTML của mình không được “sạch đẹp”. Sau này có phải sửa chữa cũng khó khăn và khó quản lý. Đặc biệt khi bạn làm việc với nhóm mà khi họ nhìn vào code HTML của bạn viết mà không hiểu được ý đồ thiết kế của bạn hay các thành phần trên trang như thế nào. Stop! Đừng quá lạm dụng nó khi có nhiều điều còn tuyệt vời hơn thế. 

![](https://images.viblo.asia/8eb8d187-f999-4d70-853a-cfff88e13a45.jpg)

HTML5 đã hổ trợ cho chúng ta một bộ các semantic HTML5 cung cấp các phần tử semantic mới để xác định từng phần khác nhau của một trang web. Chắc hẳn đây không phải là điều gì mới mẻ nhưng tôi muốn chia sẻ lại cho những bạn đang bắt đầu như tôi.



##### Vậy "semantic" là gì?

Semantic HTML là cách viết HTML mà sử dụng các tag HTML ứng với nội dung được chứa trong nó chứ không phải sử dụng các tag theo cách mà chúng ta muốn nội dung trong đó được hiển thị. 

*Ví dụ về phần tử non-semantic (phần tử không có ngữ nghĩa):*` <div>` và `<span>` – Không có mô tả rõ ràng về nội dung bên trong phần tử.

*Ví dụ về phần tử semantic (phần tử có ngữ nghĩa) :*` <form>`, `<table>`, và `<img>` – Đưa ra các mô tả rõ ràng về nội dung bên trong phần tử .
    
> Và bạn cũng có thể tham khảo HTML5 cũng đã định nghĩa tag div như thế nào [tại đây](https://html.spec.whatwg.org/multipage/grouping-content.html#the-div-element). Nó chỉ dùng để bọc những nội dung có liên quan đến nhau lại và khi không tìm được tag thích hợp để bọc phần nội dung đó thì div sẽ là phương án cuối cùng.

Bây giờ hãy cũng nhau tìm hiểu về semantic nhiều hơn nhé! Đầu tiên là sử dụng các semantic trong cấu trúc chính qua cấu trúc siêu kinh điển sau:
```html
<div class="container" id="header">...</div>
<div class="container" id="main">
    ...
    <div class="article-section">...</div>
    ...
</div>
<div class="container" id="footer">...</div>
```
 Chúng ta vẫn thường chia bố cục thành 3 phần:  header, main, footer, sau đó chia các khu vực đó thành các section khi cần thiết. Nhưng HTML5 đã hổ trợ cho chúng ta các semantic rất hữu dụng và rõ ràng: `<header>`, `<main>`, `<footer>`, và `<section>`.
### ` <header>` và `<footer>`
Đây là hai anh em sinh đôi, chúng giống nhau về quy tắc nơi chúng được sử dụng, chỉ là một người đầu và người cuối chiến tuyến.
    
Element `<header>` xác định phần đầu của một trang tài liệu hay phần đầu của một đoạn. Nó được sử dụng như một containter chứa nội dung giới thiệu hoặc mở đầu.

Element `<footer>` xác định phần cuối của một trang tài liệu hay phần cuối của một đoạn. Thường nó sẽ chứa thông tin như thông tin về tác giả, thông tin bản quyền, liên kết kết tới điều khoản sử dụng, thông tin liên hệ…

Bạn có thể sử dụng một hoặc nhiều phần tử `<header>` và `<footer>` trong một tài liệu.
### `<main>`


Tag `<main>` dùng để chứa nội dung chính của trang, nó sẽ không chứa các thông tin như <header>, <footer>, <aside>,... hoặc những gì thuộc phần intro.
    
Vùng nội dung chính của tài liệu bao gồm nội dung duy nhất cho tài liệu đó và loại trừ nội dung được lặp lại trên một tập hợp các tài liệu như liên kết điều hướng trang web, thông tin bản quyền, logo và biểu ngữ trang web và biểu mẫu tìm kiếm (trừ khi chức năng chính của tài liệu hoặc ứng dụng là một hình thức tìm kiếm).
    
Vì vậy, `<main>` là nơi bạn đặt nội dung các phần quan trọng của trang, cũng là lý do người dùng tìm đến trang của bạn.

Không giống như `<header>` và `<footer>`, tag `<main>` được dùng đúng 1 lần duy nhất, nghĩa là nó không thể được sử dụng nhiều lần trong một document.

Nào chúng ta hãy cùng nhìn thành quả sau khi sử dụng các tag vừa mới giới thiệu nào. "Sạch sẽ!"
```html
<header>
    <h1>Heading 1</h1>
    ...
</header>
<main>
    <h2>Heading 2</h2>
    ...
</main>
<footer>
    Contact us!
    <div class="contact-info">sun@example.com</div>
</footer>
```
    
### `<section>`
    
Element `<section>` xác định một phần có trong tài liệu, được sử dụng để đánh dấu một thành phần độc lập (có thể là một phần tử văn bản, một ảnh, một `<div>`...) có trong văn bản. Hiểu một cách đơn giản `<section>` giống như một công-ten-nơ chứa hàng và bạn có thể để bất cứ loại hàng nào bên trong nó.

```html
<section class="start-period">
    <h1>Information ...</h1>
    <i class="icon-start"></i>
    <p>Xin chào, tôi là abc...</p>
</section>

<section class="grow-period">
    <h1>Contact</h1>
    <i class="icon-rocket"></i>
    <p>Cảm ơn bạn đã biết đến tôi, hãy liên hệ...</p>
</section>
```
 
Đến đây, chúng ta đã có một cấu trúc vững chắc cho mình rồi. Thay vì chỉ lướt qua document toàn là  `<div>` thì chúng ta đã đánh dấu rõ ràng khu vực nội dung chính của trang gồm header, footer, main và section. Nhưng chắc chắn còn nhiều semantic HTML hơn chúng ta cần biết và sử dụng, tiếp tục nhé!

### `<article>`
    
Element `<article>` được sử dụng cho các nội dung độc lập và chứa nội dung của riêng nó. Nội dung bên trong `<article>` có ý nghĩa riêng biệt và có thể độc lập với các nội dung khác của trang web như tin tức, comment, nội dung quảng cáo...
    
Một `<article>` cũng có thể có các element `<header>`, `<footer>` và `<section>`, vì vậy bạn thực sự có thể sử dụng nó để nhúng một đoạn tài liệu đầy đủ với tất cả cấu trúc mà nó cần trong một trang khác.
    
```html
<article>
    <header>
        <h1>Heading 1</h1>
    </header>
    <section>
        <header>
            <h2>Heading 2</h2>
        </header>
        <!-- content -->
    </section>
    <section>
        <header>
            <h2>Heading 3</h2>
        </header>
        <!-- content -->
    </section>
</article>
```
### `<nav>`
    
Element `<nav>` được sử dụng để định nghĩa một tập các liên kết điều hướng trong trang như menu. `<nav>` thường sử dụng cho global menu, local link, topic path, pager link,...Các phần tử <nav> được dùng cho một khối lượng lớn các liên kết điều hướng. Tuy nhiên, không phải tất cả các liên kết điều hướng trong một tài liệu cần đặt trong phần tử <nav>!
```html
<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/archive">Archive</a>
</nav>
```
### `<aside>`
    
Tag `<aside>` định nghĩa nội dung bên ngoài nội dung chính. Khi một` <aside>` sử dụng trong `<article>` thì nội dung trong `<aside>` liên quan đến `<aside>`.
```html
<article>
   <h1> Xin chào mọi người </h1>
   <p> Trang web giúp bạn chọn và mua quà tặng </p>
   <aside>
      <p> Quà tặng được chuyển đến khách hàng trong khoảng 24h </p>
   </aside>
</article>
```
    
Ngoài các semantic được giới thiệu trong bài viết thì còn rất nhiều các semantic tiện ích khác, bạn hãy tìm hiểu tiếp nhé! 
    
 ##### Tham khảo
*     https://www.w3schools.com/html/html5_semantic_elements.asp
*     https://www.lifewire.com/why-use-semantic-html-3468271
*     https://dev.to/kenbellows/stop-using-so-many-divs-an-intro-to-semantic-html-3i9i
*     https://html.com/semantic-markup/