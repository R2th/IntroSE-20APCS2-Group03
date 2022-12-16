Dạo gần đây mình có làm 1 task cắt HTML, CSS và mình cảm thấy nó khá là thú vị. HTML và CSS thì chắc chắn chẳng xa lạ gì với mấy đứa biết code, nhưng khi thực sự bắt tay vào làm mới thấy phát sinh rất nhiều vấn đề, và thay vì phải mò mẫm như mình, mình sẽ hướng dẫn các bạn step-by-step để biến một file PSD thành giao diện web với HTML, CSS. 

Bài viết này chỉ sử dụng CSS3 và HTML5, không sử dụng bất kì frameworks nào khác như Bootstrap hay Zurb Foundation. Sử dụng framework lẽ dĩ nhiên nhanh hơn nhiều, nhưng nếu CSS thuần bạn ngon rồi, thì dùng hay ko dùng framework chỉ là chuyện nhỏ, bạn sẽ không bị phụ thuộc vào nó.

Đây là trang web mà hôm nay chúng ta sẽ làm
![](https://images.viblo.asia/25d98255-0b9f-4a71-bf74-8197044bff9f.png)

Để bắt đầu, hãy download file PSD ở [đây](https://s3.amazonaws.com/storage.blog.thesiteslinger.com/archive/2011/05/design.zip), sau đó mở nó trong PTS.

![](https://images.viblo.asia/5ba1da38-dfa9-4f96-9150-ff66d218c717.png)

Tạo một thư mục với tên project mà bạn thích. Tại đây, tạo 2 thư mục: css (cho các file css) và images (cho ảnh).

Tiếp theo, mở phần mềm để code và tạo 2 file. File đầu tiên là index.html. Đây là giao diện chính của trang web, để nó ở thư mục gốc. Tạo file style.css trong thư mục css, đây là nơi chúng ta sẽ viết css để định dạng giao diện cho file index.html.

Giờ thì bắt đầu với những dòng đầu tiên mà file HTML nào cũng phải có:
```html:html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Insight</title>
  <link rel="stylesheet" href="css/style.css">
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>

<body>
    Sample text
</body>
```
Trong đoạn code trên có 1 đoạn `<!--[if lt IE 9]>...`, nó sẽ cần thiết khi mà dùng các trình duyệt cũ như IE8 trở xuống. Nếu không quan tâm đến trình duyệt có thể bỏ qua.

Giờ mở file index.html trên trình duyệt, bạn sẽ thấy 1 dòng chữ "Sample text".

Giờ nhìn vào design và thử chia nó thành các phần. Phía trên cùng, bạn sẽ thấy 1 thanh màu đen với logo và navigation menu. Bạn có thể gọi nó là `.header`. Tiếp theo là một khối bức ảnh và dòng chữ quảng cáo, hãy gọi nó là `.hero`. Sau đó là một khoảng màu trắng với nội dung chính, chúng ta có thể gọi nó là `.middle` (hoặc bất cứ tên nào bạn thích). Cuối cùng cũng là dưới cùng _ `.footer`.

Giờ hãy bắt đầu với các khối chính
```html:html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Insight</title>
  <link rel="stylesheet" href="css/style.css">
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>

<body>
    <header class="header">
        <div class="container">
            header is here
        </div>
    </header>

    <div class="hero">
        <div class="container">
            hero content is here
        </div>
    </div>

    <main class="middle">
        <div class="container">
            middle content is here
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            footer is here
        </div>
    </footer>
    </body>
</html>
```
Thêm style cho nó. Đầu tiên, sử dụng [Eric Meyer tool](https://meyerweb.com/eric/tools/css/reset/) để reset toàn bộ thuộc tính của các thẻ tag. Chỉ cần copy và dán vào đầu file CSS (tin mình đi, cái này không thừa tí nào đâu, mấy cái margin, padding mặc định làm mình muốn phát điên). Sau đó thêm đoạn này, bạn có thể đọc về nó rõ hơn ở [đây](https://css-tricks.com/inheriting-box-sizing-probably-slightly-better-best-practice/):
```css
html {
  box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
```
Giờ, bỏ các gạch chân ở thẻ `<a>`, và lưu ý là đừng bao giờ tự động thêm gạch chân dù là `:hover`, `:active`,... nếu không được yêu cầu.
```css
a {
    text-decoration: none;
}
```
Giờ mở PTS và đo chiều rộng của trang, dùng "Rectangular Marquee Tool" hoặc ấn `M`.

![](https://images.viblo.asia/ccd48aad-0991-4de4-bae8-e10b4eeb0c5c.png)

Theo bảng thông tin hoặc điểm trỏ chuột vào chúng ta thấy được chiều rộng là 1140px, nó cũng là chiều rộng của `.container`.

Nếu nhìn kĩ hơn, bạn có thể nhận ra phần header và footer có cùng background. Ẩn grid đi bằng cách ấn `Ctrl + H` và phóng to design lên để tìm phần tử được lặp lại. Chọn và copy nó bằng cách ấn `Ctrl + Shift + C`.

![](https://images.viblo.asia/cf7165c5-a135-4eb2-abdc-e359c70849e4.png)

Sau đó tạo 1 file mới, dán phần vừa copy vào, và lưu nó bằng cách ấn `Ctrl + Alt + Shift + S`, chọn lưu vào thư mực images với tên bg-texture.jpg. Tiếp theo enable Eyedropper Tool và click vào footer. Giờ bạn đã có mã màu của khối màu tối, chúng ta sẽ set `background-color` cho nó, trong trường hợp bg-texture.jpg chưa được tải lên. 

![](https://images.viblo.asia/a7fbb186-f4de-4f63-a4c8-4d791b62e0fa.png)

Thêm vào file css:
```css
.container {
    width: 1140px;
    margin: 0 auto;
}

.header,
.footer {
    background: #15181f url(../images/bg-texture.jpg) repeat;
    color: #fff;
}

.middle {
    background: #fff;
}
```
Giờ refresh trình duyệt, đây là những gì bạn thấy:

![](https://images.viblo.asia/1a4e1568-5fa1-4827-b27f-31724a64a737.png)

Giờ lưu bức ảnh ở khối `.hero` và đặt tên bg-hero.jpg. Đo chiều cao của bức ảnh đã lưu (465px) và thêm vào file css
```css
.hero {
    background: #333 url(../images/bg-hero.jpg) no-repeat 50% 50%;
    background-size: cover;
    height: 465px;
}
```
Giờ bạn đã thêm bức ảnh đó vào giữa khối `.hero` bằng cách setting 50% - 50%. Thuộc tính `background-size: cover` yêu cầu trình duyệt kéo bức ảnh tới kích thước tối đa theo chiều rộng hoặc chiều cao, nó sẽ giúp bức ảnh ko bị méo.

Đây sẽ là những gì bạn nhìn thấy

![](https://images.viblo.asia/0b6cd1c2-d8a2-49a5-b8f5-2a4478b325d8.png)

Giờ tiếp tục với phần header. Lưu ảnh logo và đặt tên logo.png. Phần code HTML cho header sẽ như thế này:
```html:html
<header class="header">
    <div class="container">
        <div class="logo"><img src="images/logo.png" height="25" width="81" alt=""></div>
        <div class="slogan">your nice slogan</div>
        <nav>
            <ul class="nav">
                <li class="how-it-works"><a href="#">How it works</a></li>
                <li class="sign-up"><a href="#">Sign up</a></li>
                <li class="login"><a href="#">Login</a></li>
            </ul>
        </nav>
    </div>
</header>
```
Quay lại trình duyệt

![](https://images.viblo.asia/701e2c78-72c4-44a1-b1f3-f1804305ae4f.png)

Giờ là lúc tạo style cho các phần tử này. Đo khoảng cách phía trên giữa logo và đầu trang trong PTS, thêm css:
```css
.logo {
    float: left;
    margin: 19px 17px 0 0;
}
```
Giờ đến slogan

![](https://images.viblo.asia/2af7bd6e-faf4-4e60-912e-c909e4241df9.png)

Font chữ là "Time New Roman", size 16px, in nghiêng và màu trắng với opacity 35%.
```css
.slogan {
    float: left;
    margin-top: 22px;
    font: italic 16px "Times New Roman", Times, Georgia, serif;
    color: rgba(255, 255, 255, .35);
}
```
Tiếp theo đến phần navigation. Mỗi phần tử có một icon riêng. Để tiết kiệm thời gian tải trang, hãy tạo 1 sprite (chứa nhiều ảnh) từ các icon, trình duyệt sẽ chỉ phải load 1 ảnh thay vì 3 ảnh. Để làm được điều đó, tạo 1 file mới trong PTS và ném các icon vào đấy. Lưu dưới tên nav-icons.png.

![](https://images.viblo.asia/7da3a282-9427-4acb-85ac-809962f5cb6a.png)

Tiếp theo là viết css cho phần menu. Bạn cần set menu bên tay trái nên chúng ta sẽ sử dụng `float: right`. Các thẻ `<li>` mặc định là sẽ xếp hàng dọc , chúng ta có thể cho nó thành 1 dòng bằng cách thêm `float: left` (hoặc là sử dụng `display: inline-block`). Ngăn cách giữa các item trong menu có 1 đường kẻ màu xám, nên thêm `border-left: 1px solid #2c323` cho mỗi item.
```css
.nav {
    float: right;
}
.nav li {
    float: left;
    border-left: 1px solid #2c323d;
}
.nav a {
    display: block;
    line-height: 62px;
}
```
Kết quả thế này

![](https://images.viblo.asia/658ceda6-2baf-4924-ac60-0bf34999063a.png)

Như bạn thấy, các thành phần đã ở đúng vị trí của nó, nhưng header và background lại bị mất. Đó là do thuộc tính float của các thành phần bên trong header. Bạn chỉ cần sửa 1 chút phần `.container` bởi vì nó là phần tử cha của những phần tử đang được dùng `float`
```css
.container:after {
    content: "";
    display: table;
    clear: both;
}
```
Mọi thứ lại hoạt động bình thường

![](https://images.viblo.asia/6de3a1c4-630a-45b3-a3b6-1feed81b3ce0.png)

Giờ thêm stype cho menu
```css
.nav a {
    color: #fff;
    display: block;
    line-height: 62px;
    padding: 0 24px 0 53px;
}
```
Còn 1 điều cần lưu ý là font chữ, click vào text link để xem font chữ. Nhưng nếu trong máy bạn không có font chữ đấy thì sao? Đừng lo lắng, click vào đấy nó sẽ báo cho bạn là bạn đang thiếu font chữ gì, nhớ click nhiều chỗ trên design để xem luôn kiểu chữ và độ dày nhé

![](https://images.viblo.asia/7bf9e609-f107-48f2-af9d-2ec1bea79524.png)

Giờ vào trang [Google fonts direction](https://fonts.google.com/) và tìm font đó

![](https://images.viblo.asia/6c239955-1a92-4783-bd86-2700fb80993d.png)

chọn kiểu

![](https://images.viblo.asia/4084a85d-d5b0-41df-9875-938c5b943db9.png)

![](https://images.viblo.asia/d9b7764f-bb5b-4feb-8437-9b8f3b0f6e57.png)

Giờ chỉ cần copy cái link này và dán vào trong `<head>`
```html:html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Insight</title>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/style.css">
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
</head>
```
Giờ bạn có thể sử dụng font này trong file Css với thuộc tính `font-family: 'Open Sans', sans-serif`. Vì nó là font chính của trang nên có thể để luôn vào thẻ `<body>`
```css
body {
    font: 16px 'Open Sans', Arial, Helvetica, sans-serif;
    color: #55606e;
}
```
Giờ refresh lại trình duyệt để thấy sự khác biệt. Được 1/3 rồi đấy, không khó nhỉ? :)

![](https://images.viblo.asia/26a2a737-1cdf-40e1-9f51-7cb538088c4e.png)

Thêm một chút hiệu ứng khi di chuột vào menu
```css
.nav a:hover {
    background-color: #13151a;
}
```
Giờ thêm icon cho các item trong menu bằng cách dùng pseudo-element
```css
.nav a:after {
    content: '';
    background: url(../images/nav-icons.png) no-repeat;
    position: absolute;
    top: 22px;
    left: 24px;
}
```
Mỗi item trong menu thì lại có icon riêng, nên chúng ta cần tìm ra vị trí và size của từng icon, dễ nhất là dùng [tool này](http://www.spritecow.com/). Upload ảnh lên, click vào icon, nó sẽ trả về size và vị trí của icon đó.

![](https://images.viblo.asia/8656540e-f09b-498c-a003-9a1d8e3b7132.png)

Copy các giá trị và dán vào file CSS
```css
.nav .how-it-works a:after {
    background-position: 0 -1px;
    width: 19px;
    height: 18px;
}
.nav .sign-up a:after {
    background-position: -24px -1px;
    width: 19px;
    height: 18px;
}
.nav .login a:after {
    background-position: -47px -1px;
    width: 14px;
    height: 17px;
}
```
Vậy là xong cái menu

![](https://images.viblo.asia/56f228dc-2478-4695-a65e-cfad63cf8c55.png)

Tiếp tục với phần `.hero`. Thêm nội dung HTML trước.
```html:html
<div class="hero">
    <div class="container">
        <h1>Don't ignore your dreams</h1>
        <p><strong>The 5 regrets</strong> paint a portrait of post-industrial man, who shrinks himself into a shape that fits his circumstances, then turns dutifully till he stops.</p>
        <a href="#" class="btn btn-green">See how it works</a>
        <a href="#" class="btn btn-blue">Join us</a>
    </div>
</div>
```
Đo size và độ dày của text, lề và line height trong PTS. Tất cả text đều màu trắng và căn giữa nên có thể thêm `color: #fff; text-align: center;` vào `.hero`
```css
.hero {
    background: #333 url(../images/bg-hero.jpg) no-repeat 50% 50%;
    background-size: cover;
    height: 465px;
    color: #fff;
    text-align: center;
    padding-top: 31px;
}

.hero h1 {
    font-size: 52px;
    font-weight: bold;
    margin: 0 0 30px;
}
.hero p {
    font-size: 22px;
    line-height: 36px;
    font-weight: 600;
    max-width: 715px;
    margin: 0 auto 51px;
}
.hero p strong {
    font-weight: 700;
}
```
![](https://images.viblo.asia/5783fd07-df76-480d-85f1-a3a170b17bf2.png)

Giờ là cách tạo ra button. Mình đã tạo button bằng thẻ tag `<a>` với class chung là `.btn`, và class riêng cho 2 màu là `.btn-green` và `.btn-blue` cho mỗi màu.
```css
.btn {
    display: inline-block;
    border-radius: 4px;
    line-height: 50px;
    color: #fff;
    font-weight: 600;
    font-size: 18px;
    line-height: 50px;
    padding: 0 55px;
    margin: 0 11px;
}
.btn-green {
    background-color: #83c129;
    box-shadow: 0 4px 0 #518719;
}
.btn-blue {
    background-color: #068fd5;
    box-shadow: 0 4px 0 #046b9f;
}
```
Sử dụng `border-radius` để bo tròn góc và `box-shadow` để đổ bóng cho button.

![](https://images.viblo.asia/6f9e329b-1048-4beb-801d-bc78e935e395.png)

Giờ đến phần footer.  Thêm classs `.column` cho từng cột, mỗi cột thêm tiêu đề bằng thẻ `<div>` và danh sách các link.
```html:html
<footer class="footer">
    <div class="container">
        <nav class="footer-nav">
            <div class="column">
                <div class="title">MAIN</div>
                <ul>
                    <li><a href="#">Start Here</a></li>
                    <li><a href="#">Portfolio</a></li>
                    <li><a href="#">Meet Us</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div class="column">
                <div class="title">COMPANY</div>
                <ul>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Jobs</a></li>
                    <li><a href="#">Directory</a></li>
                </ul>
            </div>
            <div class="column">
                <div class="title">ONE MORE</div>
                <ul>
                    <li><a href="#">Meetups</a></li>
                    <li><a href="#">Handbook</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">API</a></li>
                    <li><a href="#">Equipment</a></li>
                </ul>
            </div>
            <div class="column">
                <div class="title">THE LAST ONE</div>
                <ul>
                    <li><a href="#">Meetups</a></li>
                    <li><a href="#">Handbook</a></li>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">API</a></li>
                    <li><a href="#">Equipment</a></li>
                </ul>
            </div>
        </nav>
    </div>
</footer>
```
Thêm margin phía trên và phía dưới footer và thêm style cho tiêu đề và danh sách
```css
.footer {
    padding: 36px 0;
}

.footer-nav {
    float: left;
}
.footer-nav .column {
    float: left;
    width: 136px;
}
.footer-nav .title {
    font-size: 12px;
    margin-bottom: 15px;
    font-weight: bold;
}
.footer-nav ul {
    font-size: 12px;
}
.footer-nav ul li {
    margin-bottom: 7px;
}
.footer-nav a {
    color: #8e959c;
}
```
![](https://images.viblo.asia/bbe857b7-ab5c-4c35-baf8-91fa8aff1f86.png)

Còn phải thêm icon của các mạng xã hội. Bạn có thể cắt nó từ bức ảnh và dán vào code hoặc sử dụng background-image cho link, nhưng tiện nhất là dùng icon font. Để làm được điều này, sử dụng [tool sau](https://www.perfecticons.com/)

![](https://images.viblo.asia/e1ec696d-e316-4f5d-8a23-67e389ebc696.png)

Chọn icon bạn cần, chọn size, màu sắc, link đến đâu. Tiếp theo click vào button socicon.zip để download file. Giờ bạn đã có 1 folder font mới trong project, giải nén chúng, sau đó copy HTML, dán vào ngay sau thẻ `nav.footer-nav`. Chỉnh lại size cho phù hợp với design trong `.soc li a`.

![](https://images.viblo.asia/7ecad654-e263-4a53-bc5c-1cf102f04a25.png)

Bổ sung nốt phần copyright
```html:html
<div class="copyright">
    <p>© 2013 be happy<br>
        <a href="#">Privacy Policy</a> <a href="#">Terms of Service</a>
    </p>
</div>

// style.css
.copyright {
    clear: right;
    text-align: right;
    line-height: 20px;
    font-size: 12px;
    color: #8e959c;
}
.copyright a {
    color: #8e959c;
    margin-left: 8px;
}
```
![](https://images.viblo.asia/b2e8b8e3-c924-4094-89d1-08ea4f2f8d93.png)

Phù, dài quá phải không, sắp xong rồi, chịu khó đọc tiếp nhé. Giờ ta sẽ bắt tay vào phần cuối cùng là phần nội dung chính của trang.

![](https://images.viblo.asia/d68debbe-f7fa-4c3c-bde3-f2b6b3adf47e.png)

Nếu nhìn kĩ 3 khối này, sẽ thấy nó giống nhau, chỉ khác nội dung. Vì vậy chúng ta chỉ cần tạo 1 khối, thêm style cho nó, nhân nó lên và thêm nội dung cần thiết. Lưu các bức ảnh trong 3 khối dưới dạng jpg. Giờ, viết HTML và dán những bức ảnh vừa lưu vào. Tạo `div.blocks` và dán 3 khối `div.block` bên trong.
```html:html
<div class="blocks">
    <div class="block">
        <div class="image"><img src="images/photo1.jpg" height="180" width="319" alt=""></div>
        <div class="person">
            <div class="photo"><img src="images/person1.jpg" height="50" width="50" alt=""></div>
            <div class="text">
                <div class="phrase">You neglect your friends</div>
                <div class="info">Valerie Adams. Moldova. 19.</div>
            </div>
        </div>
    </div>
</div>
```
Một lần nữa, chúng ta thêm `float: left` để 3 khối xếp hàng ngang và nhớ thêm `clearfix` cho thằng cha. 
```css
.container:after,
.blocks:after {
    content: "";
    display: table;
    clear: both;
}
```
Đo độ rộng mỗi khối nhỏ là 351px và khoảng cách giữa các khối là 43px. Chúng ta sẽ set `margin-left` trừ khối đầu tiên.
```css
.blocks .block {
    float: left;
    width: 351px;
    margin-left: 43px;
}
.blocks .block:first-child {
    margin-left: 0;
}
```
Thêm `border` và `margin` phía ngoài các khối nhỏ, thông số cụ thể xem trong PTS, có một chút bo tròn nhỏ ở góc nên cần cả `border-radius`. 
```css
.blocks .block {
    float: left;
    width: 351px;
    margin-left: 43px;
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #d9dbdf;
}
.blocks .block:first-child {
    margin-left: 0;
}

.blocks img {
    vertical-align: top;
}

.blocks .image {
    margin-bottom: 13px;
}
.blocks .photo {
    float: left;
}
.blocks .text {
    float: right;
    width: 258px;
}
.blocks .phrase {
    color: #454e5c;
    margin-bottom: 2px;
    font-weight: 600;
}
.blocks .info {
    color: #8e959c;
    font-size: 14px;
}
```
Gần xong, còn thiếu vài cái đường gạch ngang phía dưới mỗi khối

![](https://images.viblo.asia/76112e50-de57-4176-8ebb-f7825069c081.png)

Để thêm được cái này, ta lại sử dụng pseudo-selector :after và :before.
```css
.blocks .block:after,
.blocks .block:before {
    content:'';
    height: 3px;
    border-radius: 0 0 4px 4px;
    border: 1px solid #e1e2e5;
    border-top: 0;
    position: absolute;
}
.blocks .block:after {
    bottom: -4px;
    left: 3px;
    right: 3px;
}
.blocks .block:before {
    bottom: -7px;
    left: 6px;
    right: 6px;
}
```
Giờ F5 và xem kết quả

![](https://images.viblo.asia/d6b54fb0-0770-4c78-bbff-090658f3b92a.png)

Đến khối tiếp theo, ở đây cũng có 3 phần, mỗi phần lại có 1 bức ảnh hình tròn cùng với tiêu đề và ngày. Làm tương tự giống như cái trên. Lấy bức ảnh từ pts và biến nó thành hình tròn bằng cách sử dụng `border-radius: 50%`.  Ta sẽ gọi khối to nhất bên ngoài là `div.news`, mỗi khối bên trong là `div.one`, và nhớ đừng quên thêm `clearfix`.
```html:html
<div class="news">
        <div class="one">
            <div class="img"><a href="#"><img src="images/news1.jpg" height="89" width="89" alt=""></a></div>
            <div class="text">
                <time>Oct 18</time>
                <p><a href="#">I would like to avoid making these mistakes.</a></p>
            </div>
        </div>
        <div class="one">
            <div class="img"><a href="#"><img src="images/news2.jpg" height="89" width="89" alt=""></a></div>
            <div class="text">
                <time>Oct 8</time>
                <p><a href="#">But how do you avoid mistakes you make by default?</a></p>
            </div>
        </div>
        <div class="one">
            <div class="img"><a href="#"><img src="images/news3.jpg" height="89" width="89" alt=""></a></div>
            <div class="text">
                <time>Oct 2</time>
                <p><a href="#">Ideally you transform your life so it has other defaults.</a></p>
            </div>
        </div>
    </div>

 // style.css

.news {
    border-top: 2px solid #e7e7e7;
    border-bottom: 2px solid #e7e7e7;
    padding: 31px 0;
    margin-bottom: 30px;
}
.news .one {
    float: left;
    width: 352px;
    margin-left: 42px;
}
.news .one:first-child {
    margin-left: 0;
}

.news .img {
    float: left;
    width: 98px;
    text-align: center;
}
.news .text {
    float: right;
    width: 234px;
    padding-top: 4px;
}
.news img {
    border-radius: 50%;
}
.news time {
    font-size: 14px;
    color: #abb1bb;
}
.news p {
    margin: 4px 0 0;
}
```
Kết quả

![](https://images.viblo.asia/fd57e1b0-9f59-4688-9171-2c5814c36794.png)

Còn khối cuối cùng ta sẽ dùng `<ul>` cho danh sách các ảnh và thẻ `<div class="title">` cho phần tiêu đề. Ở đây có 1 cái hiệu ứng là khi di vào ảnh nó sẽ hiện rõ ra, nhưng khi lưu ảnh bạn vẫn phải lưu độ trong suốt 100% nhé, ta sẽ dùng thuộc tính opacity cho cái này. 
```html:html
<div class="featured">
    <div class="title">Featured on:</div>
    <ul>
        <li><a href="#"><img src="images/logo-new-texas-times.png" height="28" width="262" alt=""></a></li>
        <li><a href="#"><img src="images/logo-wooden.png" height="29" width="147" alt=""></a></li>
        <li><a href="#"><img src="images/logo-vremya.png" height="22" width="112" alt=""></a></li>
        <li><a href="#"><img src="images/logo-open-book.png" height="29" width="217" alt=""></a></li>
        <li><a href="#"><img src="images/logo-twitter.png" height="29" width="36" alt=""></a></li>
    </ul>
</div>

// style.css
.featured {
padding: 26px 0;
margin-bottom: 34px;
}
.featured * {
    display: inline-block;
    vertical-align: middle;
}
.featured ul li {
    margin-right: 38px;
}
.featured .title {
    margin-right: 20px;
}
.featured a {
    opacity: .5;
}
.featured a:hover {
    opacity: 1;
}
```
Vậy là xong rồi đó, giờ bạn đã biết cách chuyển từ file PSD thành HTML rồi chứ? Tất nhiên mỗi trang 1 kiểu, đây chỉ là 1 ví dụ rất nhỏ và đơn giản để bạn hiểu các bước cần thực hiện. Hy vọng bài viết sẽ giúp ích bạn phần nào, có thể down toàn bộ source code [ở đây](https://s3.amazonaws.com/storage.blog.thesiteslinger.com/archive/2011/05/code.zip) nhé.

Nguồn: https://thesiteslinger.com/blog/tutorial-how-to-code-your-psd-into-a-html-css-layout