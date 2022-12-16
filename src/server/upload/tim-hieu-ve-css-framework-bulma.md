## Mở đầu:
  Mấy bữa nay đang lướt web thấy có giới thiệu framework bulma  này, được mọi người giới thiệu gọn nhẹ và dễ sử dụng, nên mình mới tìm hiểu thử và hôm nay xin viết 1  bài viết giới thiệu sơ qua với các bạn.
 
-  Trang chủ của nó đây mọi người, được tận **42, 7k** star:
  https://github.com/jgthms/bulma
  
  - Mọi người cũng có thể xem đánh giá sơ qua
  https://www.slant.co/topics/150/~best-css-framework
  
  
## Cùng tìm hiểu nào mọi người ơi:
  Đầu tiên cần khai báo file css vào header, chỉ cần 1 file này thui, vì nó khá nhẹ và chỉ được viết bằng css để giúp ta viết code dễ dàng và nhanh chóng hơn (và sẽ **KHÔNG** có file javascript nào cả)
``` 
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css">

hoặc 
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css">
```

All file chưa bundle trên github cho mọi người muốn tham khảo ạ:
https://github.com/jgthms/bulma/blob/master/css/bulma.css

### 1. Syntax common:
Nó có các class rất dễ nhớ, ví dụ như muốn style 1 buttton thì base classname của nó là "button", hay "card" tương ứng cho component card. 
Ngoài ra, khi muốn thay đổi style tương ứng, ta có thể sử dụng các tiền tố `is-` hoặc `-has` 

*Ví dụ:*
``` html
<a class="button">
  Button
</a>

<a class="button is-primary">
  Button
</a>


<a class="button is-primary">
  Button
</a>
<a class="button is-link">
  Button
</a>
<a class="button is-info">
  Button
</a>
<a class="button is-success">
  Button
</a>
<a class="button is-warning">
  Button
</a>
<a class="button is-danger">
  Button
</a>
```

= > Kêt quả đây được như thế này
![](https://images.viblo.asia/9c7f3bde-52d7-4015-ae39-82b8f4150b55.JPG)

### 2> Hệ thống component/Element:
Nó  có hệ thống component ta thường gặp nhất (ngoài button mình đã ví dụ ở trước đó):

** **Breadcrumb**
``` html
<nav class="breadcrumb" aria-label="breadcrumbs">
  <ul>
    <li><a href="#">Bulma</a></li>
    <li><a href="#">Documentation</a></li>
    <li><a href="#">Components</a></li>
    <li class="is-active"><a href="#" aria-current="page">Breadcrumb</a></li>
  </ul>
</nav>
```

![](https://images.viblo.asia/de747114-f515-43c9-8c97-930f71f2a440.JPG)

** **Card**
```html
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">John Smith</p>
        <p class="subtitle is-6">@johnsmith</p>
      </div>
    </div>

    <div class="content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Phasellus nec iaculis mauris. <a>@bulmaio</a>.
      <a href="#">#css</a> <a href="#">#responsive</a>
      <br>
      <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
    </div>
  </div>
</div>
```
![](https://images.viblo.asia/c821838e-e249-4aae-af44-d4b45d63163c.JPG)

 ** **Pagination**
```html
<nav class="pagination" role="navigation" aria-label="pagination">
  <a class="pagination-previous">Previous</a>
  <a class="pagination-next">Next page</a>
  <ul class="pagination-list">
    <li>
      <a class="pagination-link" aria-label="Goto page 1">1</a>
    </li>
    <li>
      <span class="pagination-ellipsis">&hellip;</span>
    </li>
    <li>
      <a class="pagination-link" aria-label="Goto page 45">45</a>
    </li>
    <li>
      <a class="pagination-link is-current" aria-label="Page 46" aria-current="page">46</a>
    </li>
    <li>
      <a class="pagination-link" aria-label="Goto page 47">47</a>
    </li>
    <li>
      <span class="pagination-ellipsis">&hellip;</span>
    </li>
    <li>
      <a class="pagination-link" aria-label="Goto page 86">86</a>
    </li>
  </ul>
</nav>
```
![](https://images.viblo.asia/ac3378d3-10ea-485a-b0ca-4c1deb8e8c47.JPG)

Những ví dụ trên là những ví dụ với style đơn giản, bạn cũng có thể thêm các class có sẵn được nó xây dựng để tạo nên những component đẹp đẽ nhé.

Đồng thời, nó có rất nhiều component và element khác như: table, menu/message,block,box, icon, delete, progress, notification hay form(input, textarea,...) ,... mà mình không liệt kê được tất cả

=====
**CHÚ Ý:**

- Một số component khác hay dùng như modal hay dropdown, các bạn phải thêm JS để điều khiển việc đóng mở (active hay không) thông qua việc thêm/xóa class (ví dụ: is-active với modal như ví dụ dưới đấy)

```html
<div>
        <button id="js-open-modal" class="button is-round">click open modal</button>
        <div class="modal">
            <div class="modal-background"></div>
            <div class="modal-content">
                <!-- Any other Bulma elements you want -->
                Demo
            </div>
            <button class="modal-close is-large" aria-label="close"></button>
        </div>
    </div>
```

```js
var buttonModal = document.getElementById('js-open-modal')

buttonModal.addEventListener("click", () => {
  
  var modal = document.getElementsByClassName('modal')[0]
  modal.classList.add('is-active')
})
```

=> Phải làm như vậy nó chỉ support style mà thôi, cũng chính điều này mà giúp nó dễ dàng tích hợp với các thư viện khác(Vue, Angular, React,...)

### 3> column và layout:
** **Column căn bản:**
- Để việc dựng layout dễ dàng hơn, nó cũng xây dựng bộ class của nó. Layout đơn giản nhất với container là `columns`, còn các children tương ứng là `column` 
```html
<div class="columns">
  <div class="column">
    First column
  </div>
  <div class="column">
    Second column
  </div>
  <div class="column">
    Third column
  </div>
  <div class="column">
    Fourth column
  </div>
</div>
```
![](https://images.viblo.asia/8184d72a-0c44-45f8-bd32-7d5cf20150ff.JPG)

- Với ví dụ trên thì mỗi div .column sẽ có width = 30%, nếu bạn muốn size khác nhau bạn có thể dùng các class tương ứng như các hình dưới đây:
![](https://images.viblo.asia/12b07e26-99c0-4932-88a6-b12a8d39bcca.JPG)
hay
![](https://images.viblo.asia/8b43c980-f9fe-4531-be30-b93624667552.JPG)
(tham khảo thêm tại: https://bulma.io/documentation/columns/sizes/)

** **Responsize**

- Ta có thể dùng các class như `is-mobile` hay `is-desktop`,.. vào sau container (class `column` ). Bạn có thể xem ví dụ sau:

``` html
<div class="columns is-desktop">
  <div class="column">1</div>
  <div class="column">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
</div>
```
==>  Kết quả: trên desktop sẽ có 4 cột mỗi cột có width 25%, còn ở tablet trở xuống thì mỗi cột sẽ full width

- Còn bạn muốn style cho từng row thì sẽ như thế này
```html
<div class="columns is-mobile">
  <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
    <code>is-three-quarters-mobile</code><br>
    <code>is-two-thirds-tablet</code><br>
    <code>is-half-desktop</code><br>
    <code>is-one-third-widescreen</code><br>
    <code>is-one-quarter-fullhd</code>
  </div>
  <div class="column">2</div>
  <div class="column">3</div>
  <div class="column">4</div>
  <div class="column">5</div>
</div>
```
Bạn xem hình này cho dễ hình dung nhé:
![](https://images.viblo.asia/59a9ecfd-c5e0-43f6-9207-0cea171b2bd2.JPG)

Ngoài ra còn có 1 số vấn đề và khoảng cách giữa các row bạn có thể xem tại https://bulma.io/documentation/columns/gap/, hay khi lồng nhau: https://bulma.io/documentation/columns/nesting/. Hay 1 số option khác: https://bulma.io/documentation/columns/options/ . Mình viết không hay mà dài quá cũng không hay ạ@@!

Mình bổ sung chút: chủ đề layout cũng được giới thiệu khá kỹ tại đây ạ: https://bulma.io/documentation/layout/container
### 4> Một số vấn đề: custom hay tích hợp vơi thư viện thứ 3
*****Customize**

Bạn có thể tích hợp dễ dàng với sass, webpack, sass-cli. Và bạn cũng có thể dùng 1 số  class mà không cần import tất cả các file: như giới thiệu nó có 39 file sass, bạn chỉ cần import 1 trong số chúng (bắt buột phải import utli all). 
Ví dụ bạn chỉ muốn dùng hệ thống grid của nó:
```scss
@import "bulma/sass/utilities/_all.sass"
@import "bulma/sass/grid/columns.sass"
```
hay chỉ muốn dùng component button
```scss
@import "bulma/sass/utilities/_all.sass"
@import "bulma/sass/elements/button.sass"
```

Ngoài ra, bạn có thể dễ dàng custom lại vì nó có hệ thống varible, color, function, mixin đa dạng

*****Tích hợp thư viện ngoài**

Rất dễ dàng, đơn giản và nhẹ nhàng vì nó chỉ có 1 file css hoặc các file sass (nếu bạn muốn import 1 số file cần thiết) !!


## Kết luận:
Qua bài giới thiệu trên, bạn chắc cũng có 1 số đánh giá sơ qua về nó:
- Modern: Vì dựa vào flexbox.
- 100% responsive:  phù hợp cả mobile và desktop.
- Dễ dàng học, syntax đơn giản và component cũng đủ dùng
- Dễ dàng custom: và với hơn 300 SASS variables hay việc chia module, bạn có thể dễ dàng tương tác với nó
- Dễ dàng tích hợp với thư viện ngoài vì nó không có file js nào cả

Cảm ơn các bạn đã đọc bài viết của mình. Đây là các link mình tham khảo:
- Trang chủ: https://bulma.io/
- File sách mẫu: https://bleedingedgepress.com/book_excerpts/01E9D1/creating_interfaces_with_bulma_sample.pdf
- 1 số bài viết: https://scotch.io/bar-talk/get-to-know-bulma-my-current-favorite-css-framework#toc-bulma-syntax, https://www.freecodecamp.org/news/learn-bulma-in-5-minutes-ec5188c53e83/, https://medium.com/free-code-camp/free-course-level-up-with-bulma-css-d82dcb4b980a