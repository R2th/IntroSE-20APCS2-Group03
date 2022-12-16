Trong thực tế hiện nay, hầu như bất cứ trang web nào, đều sẽ được làm theo hướng responsive, hiểu đơn giản là có thể hiển thị đẹp trên mọi thiết bị, mọi kích thước màn hình. Vậy thì làm thế nào để tạo ra 1 trang web responsive, mình cùng tìm hiểu trong bài viết này nhé!

Có 3 yếu tố quan trọng mà mình nghĩ bạn cần tìm để làm 1 trang web responsive, đó là:
* CSS units
* Flexbox
* Media query

Trong bài viết này, chúng ta sẽ đi sâu tìm hiểu về `em` vs `rem`, khái niệm cơ bản về flexbox, media query, và 1 số ví dụ thực tế.
# CSS Unit
Khái niệm đầu tiên và cơ bản nhất về việc xây dựng 1 trang web responsive là đơn vị mà chúng ta dùng để set giá trị cho các thuộc tính. 

Có 3 loại đơn vị chính trong CSS là: đơn vị tuyệt đối, đơn vị phần trăm, đơn vị tương đối.
## Đơn vị tuyệt đối
Đơn vị tuyệt đối còn được gọi là đơn vị cố định, là dù ở bất kì kích thước màn hình nào, nó vẫn sẽ có 1 kích thước như vậy. `px` là đơn vị phổ biến nhất trong CSS, ngoài ra thì còn có `pt`, `pc`, `in`, `cm`, `mm`,... tuy nhiên các đơn vị này chủ yếu dùng khi cần in ấn. Ngày xưa, `px` chỉ hiểu đơn giản là 1 pixel trên màn hình, tuy nhiên giờ CSS đã sử dụng 1 thứ gọi là pixel tham chiếu, giúp cho nó có kích thước cố định, không phụ thuộc vào độ phân giải màn hình.
## Phần trăm
Đơn vị phần trăm giống như tên của nó, thường dùng để xác định tỉ lệ phần trăm so với phần tử cha của nó. Ví dụ như ta có
```
.box {
    width: 500px;
}

// phần tử con của .box
.box__item {
    width: 80%; 
    // => tương đương với width: 400px;
}
```
Khi ta dùng đơn vị phần trăm với `width`, `margin` hay `padding`, nó đều sẽ tính theo tỉ lệ phần trăm với chiều rộng của phần tử cha của nó. Chúng ta thường dùng đơn vị này để xác định chiều rộng của phần tử, vì nó rất linh hoạt, phù hợp với web responsive.

Ví dụ chúng ta có thiết kế sau:
![](https://images.viblo.asia/b3736753-647d-466c-9539-f7cb461578af.png)

Nếu chúng ta set chiều rộng của container (vùng chứa toàn bộ nội dung) là một con số cố định, ví dụ 500px, thì nó sẽ chỉ đẹp khi kích thước lớn hơn 500px. Trong trường hợp này, ta sử dụng đơn vị phần trăm, có thể 100% hoặc nhỏ hơn:
```
.container { 
    width: 70%; 
    ...
}
```
Ở đây ta đã set nó có độ rộng 70% so phần phần tử cha, nên nó sẽ thay đổi khi ta thay đổi kích thước màn hình.
![](https://images.viblo.asia/418b2d37-ae08-450e-91bd-11f3ba099756.jpeg)

Tuy nhiên, lại có 1 vấn đề, nếu chúng ta đặt 1 ảnh có kích thước lớn hơn 70% vào bên trong, nó sẽ bị thế này
![](https://images.viblo.asia/cc9f5454-c13f-458f-9feb-4b62a8772631.png)
Đối với ảnh thì trừ khi set kích thước cho nó, còn không nó sẽ hiển thị đúng kích thước thực. Cái này thì cũng đơn giản thôi, mình sẽ set kích thước cho chính cái ảnh bằng kích thước thằng cha của nó
```
.img { 
    width: 100%;
}
```
Giờ hình ảnh cũng đã tự động thay đổi kích thước theo kích thước màn hình
![](https://images.viblo.asia/177cabf6-0e3f-4276-bf06-5c79b9a7101b.jpeg)
**Kích thước tối đa và kích thước tối thiểu**
Đối với cách làm trên, hình ảnh chắc chắn sẽ không vượt ra ngoài khung nội dung, tuy nhiên nếu hình ảnh thực tế lại nhỏ hơn thì sao? Nó sẽ bị phóng to ra và làm giảm chất lượng. Để tránh điều này, ta sử dụng `max-width`
```
.img { 
    max-width: 100%;
}
```
Có nghĩa là kích thước tối đa của bức ảnh sẽ là bằng kích thước cha của nó, còn nhỏ hơn thì sẽ giữ nguyên. Tương tự ta cũng có `min-width`, `max-height`, `min-height`.
## Đơn vị tương đối
Các đơn vị tương đối sẽ phụ thuộc vào các kích thước khác, có thể là font-size (`em`, `rem`), hoặc kích thước view-port (`vw`, `vh`). Trong bài viết này mình sẽ giới thiệu 2 đơn vị có liên quan đến font-size là `em` và `rem`.
### Đơn vị `em`
Khi định nghĩa font-size của 1 phần tử, nếu bạn sử dụng đơn vị `em` thì nó sẽ phụ thuộc vào font-size thằng cha của nó. Ví dụ:
```
<body> 
        <div class="container">
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
            </ul>
        </div>
</body>
```
```
body { 
    font-size: 25px; ...
}

ul { 
    /* 1.5em = 25 * 1.5 = 37.5  */ 
    font-size: 1.5em;
}
```
Ở đây `ul` sẽ có font-size được tính toán dựa trên font-size cha của nó là `body`, và cũng sẽ áp dụng cho các thẻ `li` ở trong. Lưu ý là `em` phụ thuộc vào thằng cha trực tiếp của nó, nên trong ví dụ này, nếu ta set font-size khác cho `container`, thì `ul` sẽ được tính toán font-size dựa theo `container`.
**Hiệu ứng xếp tầng của `em`**
Một trong những lý do mình không thích dùng `em` là do hiệu ứng xếp tầng của nó. Như trong ví dụ trên, nếu ta lại set font-size cho thẻ `li`, thì sẽ gặp vấn đề như này
```
body { 
    font-size: 25px; ...
}

ul { 
    font-size: 1.5em;
}

li {
 	font-size: 1.5em;  
    /* 1.5em = 25 * 1.5 * 1.5 = 56.25px  */ 
}
```
`li` sẽ to 56.25px :scream: 
### Đơn vị `rem`
Như bạn đã thấy `em` có thể sẽ gây nhầm lẫn khi nó lấy kích thước theo cha trực tiếp của nó và gây ra hiệu ứng xếp tầng. Vì vậy ta có `rem` là viết tắt của Root Em, có nghĩa là nó chỉ liên quan đến font-size của phần tử root, là phần tử `html`.  Vì vậy nếu dùng `rem` cho bất cứ phần tử nào cũng sẽ chỉ tính toán theo font-size của `html`, giúp dễ kiểm soát hơn.

**Vậy có nên sử dụng `em` không?**

Nếu ta sử dụng `em` cho font-size, nó sẽ tính theo phần tử cha, nhưng nếu sử dụng cho `margin` hay `padding`, nó sẽ tính dựa theo font-size của chính phần tử đó. Cách này khá là hữu ích, vì khi ta tăng font-size, cũng sẽ đồng thời tăng `margin` và `padding` của nó.

**Tổng hợp lại một chút về cách nên sử dụng nhé:**
* font-size => `rem`
* padding và margin => `em`
* width => `em` hoặc `%`

# Flexbox
Sau khi đã nắm rõ về các đơn vị cũng như khi nào nên sử dụng chúng, chúng ta sẽ chuyển sang tìm hiểu về flexbox, thứ sẽ giúp chúng ta responsive siêu dễ dàng. :sunglasses:

Tất cả các phần tử có giá trị `display` mặc định là `block` hoặc `inline`, khi ta chuyển sang `display: flex`, nó sẽ bắt đầu xếp cạnh nhau.

![](https://images.viblo.asia/236e6cce-740a-4b53-b5c7-4b982ca53738.png)

Để giải thích về flex thì khá là dài và cũng đã có nhiều bài viết về nó, nên mình sẽ chỉ đưa ra 1 ví dụ khá phổ biến mà hình hay gặp cho thấy sự linh hoạt của flex
![](https://images.viblo.asia/473626e0-e7d8-43da-a1d2-488c84ac3ada.png)

Để làm được thế này thì rất đơn giản thôi, chỉ cần set cho phần tử cha của nó
```
.cards {
    display: flex;
    margin-right: 30px;
}
```
Trên mobile, các card sẽ phải xếp thành 1 hàng dọc, thì chỉ cần thêm:
```
@media screen and (max-width: 480px) {
    .cards {
        flex-direction: column;
        margin-right: 0;
        margin-bottom: 20px;
    }
}
```
![](https://images.viblo.asia/7c5aca57-59b1-47d7-83fa-a62b8947f9a8.png)

Vậy còn trường hợp vẫn trên PC, nhưng kích thước không đủ để hiện thị hết cả 3 card thì sao?  Bạn chỉ cần thêm thuộc tính `flex-wrap: wrap`, nó sẽ tự động xuống dòng nếu không đủ chỗ.

Một ví dụ nhỏ nhưng cũng đủ thấy sự linh hoạt của flex rồi nhỉ. Ở ví dụ trên, khi CSS cho mobile, mình có sử dụng  từ khóa`@media`, để biết nó là gì và sử dụng như thế nào, mình cùng sang phần sau nhé!
# Media queries
Media queries dùng để khai báo các quy tắc CSS chỉ áp dụng trong các trường hợp cụ thể, thường được dùng nhiều nhất để áp dụng CSS cho các khoảng kích cỡ màn hình khác nhau.

Cú pháp media queries là
```
@media media-type and (media-features) { some CSS }
```
 `media-type` thì vì làm web nên thực ra mình cũng ít dùng đến cái này, nó sẽ bao gồm
* all => cho tất cả các loại media, nếu không khai báo gì cũng được hiểu mặc định là cái này
* print => cho máy in
* screen => cho màn hình máy tính, tablet, điện thoại
* speech => cho trình đọc màn hình

`media-features` thì hỗ trợ chủ yếu 4 thuộc tính sau:
* width: độ rộng của viewport
* height: độ cao của viewport
* resolution: độ phân giải của màn hình 
* orientation: hướng của thiết bị (giành cho các thiết bị di động, chúng ta có thể xoay ngang và xoay dọc) 

Đối với `width` và `height`, chúng ta có 1 số các khoảng thông dụng như sau
* 320px — 480px: điện thoại di động
* 481px — 768px: iPads, Tablets
* 769px — 1024px: màn hình nhỏ, laptops
* 1025px — 1200px: Desktops, màn hình lớn
* 1201px and more —  màn hình rất lớn, TV

Cũng hiểu kha khá kiến thức cơ bản rồi đó, giờ mình đi vào một ví dụ thực tế nhé!
# Ví dụ về responsive
Một trong những thứ mà bất cứ trang web nào cũng có là header, thử responsive cho header nhé. Bắt đầu với HTML
```
<header>
  <div class="container container-nav">
    <div class="site-title">
      <h1>Living the social life</h1>
      <p class="subtitle">A blog exploring minimalism in life</p>
    </div>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About me</a></li>
        <li><a href="#">Recent posts</a></li>
      </ul>
    </nav>
  </div>
</header>
```
Tiếp theo chúng ta sẽ dùng flexbox, media queries, và vài thứ khác để css cho nó
```
body {
  margin: 0;
}

.container {
  width: 90%;
  max-width: 900px;
  margin: 0 auto;
}

.container-nav {
  display: flex;
  justify-content: space-between;
}

nav ul {
  display: flex;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 675px) {
  .container-nav {
    flex-direction: column;
  }
    
  header {
    text-align: center;
  }
}
```
Giờ xem kết quả nhé!
![](https://images.viblo.asia/01054c6f-e5a4-4e13-b09c-1e06b45f3202.gif)

Thường trong thực tế thì trên SP sẽ ẩn phần menu đi cơ, hiện 1 cái hay gọi là hamburger icon (vì nhìn 3 lớp như hamburger :rofl:), xong click vào mới mở menu ra, nhưng trong phạm vi bài viết không thể đưa quá nhiều thứ vào, nếu bạn có chỗ nào chưa hiểu hay muốn biết thêm gì cứ comment cho mình nha! :wink:

Nguồn tham khảo:
https://www.freecodecamp.org/news/how-to-start-thinking-responsively/
https://www.freecodecamp.org/news/css-media-queries-breakpoints-media-types-standard-resolutions-and-more/