Xin chào các bạn ,lần  trước mình có viết một bài sử dụng các API seting cho slick thì hôm nay như đã hứa mình sẽ viết về các sự kiện (event) trong slick. Điều này giúp chúng ta control slide theo ý muốn cũng như việt get dữ liệu một cách dễ dàng hơn.

Cũng như lần trước chúng ta cần một list danh sách html và css cho đề mô lần này. Bên cạnh đó các bạn nên xem lại bài viết trước của mình để có thể hiểu rõ hơn về Slick https://viblo.asia/p/cach-su-dung-slick-ORNZqGJb50n.

Không thể thiếu đó là phần demo các bạn có thể xem demo[ tại đây ](https://tr.you84815.space/slick/events/afterChange.html)

### 1.afterChange
Kích hoạt sau khi slide chạy qua 1 item.<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , currentSlide (item hiện tại mà slick đang show ) <br>
**Ví dụ**:<br>
```js 
$(document).ready(function(){
  $('.slider').on('afterChange', function(event, slick, currentSlide){
    $('.result').text('afterChange : ' + (currentSlide + 1));
  });
  $('.slider').slick();
});
```

Sự kiện sẽ kích hoạt sau khi ta click vào slick ở đây ta có thể thêm các sự kiện hoặc thay đổi nội dung cho các thẻ khác trong project của chúng ta.
Và đừng quên tạo setting cho class sau đó
```js 
  $('.slider').slick();
```
### 2.beforeChange
Ngược lại với **afterChange**  sự kiện sẽ kích hoạt trước khi slick chạy qua item khác trong bản demo link trên tôi có đưa cho các bạn nếu ta để ý kĩ thì thẻ `<div class="result"></div>`  thay đổi trước khi qua 1 item khác.<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , currentSlide (item hiện tại mà slick đang show ) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('afterChange', function(event, slick, currentSlide){
    $('.result').text('afterChange : ' + (currentSlide + 1));
  });
  $('.slider').slick();
});
```
### 3.breakpoint
Sự kiện này giúp ta điều chỉnh được kích thước của thông qua việc responsive bằng API setting mà bài trước mình có nói.<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , breakpoint (kích thước hiện tại của class slide ) <br>
**Ví dụ**:<br>
Ta có phần setting như [bài trước](https://viblo.asia/p/cach-su-dung-slick-ORNZqGJb50n) mình đã nói:
```js
$('.slider').slick({
    respondTo: 'slider',
    slidesToShow: 5,
    responsive: [{
      breakpoint: 640,
      settings: {
        slidesToShow: 5
      }
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 320,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  ```
  Với các kích thước khác nhau cho từng responsive theo kích thước màn hình như vậy. Giả sử người dùng muốn dự án của mình  điều chỉnh được kích thước của slide đó sao cho vừa mắt khung làm việc của mình thì **breakpoint** sẽ giúp bạn trong điều này.
```js
$('.js-600').on('click', function() {
    $('.slider').css('width', '600px');
    $('.slider').slick('slickSetOption', {}, true);
  });
  $('.js-450').on('click', function() {
    $('.slider').css('width', '450px');
    $('.slider').slick('slickSetOption', {}, true);
  });
  $('.js-300').on('click', function() {
    $('.slider').css('width', '300px');
    $('.slider').slick('slickSetOption', {}, true);
  });
```
Khi yêu cầu sự kiện slick ta phải set css lại kích cỡ cho slide bằng css sau đó setOption cho đó để khớp với css ta vừa set ( **slickSetOption** sự kiện này được nói bên **method** bài này mình sẽ viết sau nhé). Kích thước của slide sẽ thay đổi và **breakpoint** setting trên show item phù hợp.
### 4.destroy
Destroy show toàn bộ item, hay nói cách khác là hủy show slide<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class) <br>
**Ví dụ**:<br>
```js
$('.js-unslick').on('click', function() {
  $('.slider').slick('unslick');
});
```
Bùm slick biến mất.
### 5.edge
Thông báo giới hạn của slick<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class), direction (giới hạn :bên trái, bên phải, bên trên, bên dưới) <br>
**Ví dụ**:<br>
Nếu có giới hạn thì không thể thiếu khi chúng ta phải setting Slick **infinite**: false
```js
$(document).ready(function(){
  $('.slider').on('edge', function(event, slick, direction){
    $('.result').text('edge : ' + direction);
  });
  $('.slider').slick({
    infinite: false,
  });
});
```
### 6.init
Sự kiện được kích hoạt sau khi Slick được khởi tạo lưu ý nếu dùng event này bạn cần đặt nó trước khi gán class cho slick  `$('.slider').slick()` <br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('init', function(event, slick){
    $('.result').text('init : tôi được khởi tạo trước anh ý');
  });
  $('.slider').slick();
});
```
### 7.reInit
Xảy ra bất cứ khi nào slick được tái khởi tạo. Ví dụ khi đang xem ở rất xa ở môt item nào đó bạn muốn xem lại trang đầu tiên hay bối cảnh xung quang đầu tiên khi bắt đầu xem trang web, thì event này giúp bạn điều đó.<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('init', function(event, slick){
    $('.result').text('init : bấm vào đi tôi sẽ khởi tạo lại từ ban đầu');
  });
  $('.slider').slick();
});
```
### 8.lazyLoaded
Sự kiện xảy ra sau khi một hình ảnh được tải. Sự kiện sẽ sảy ra một lần khi bạn lướt qua lần các item và lần tiếp theo event này sẽ không được gọi<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class), image(hình ảnh biến này các bạn thử log ra xem nó thuộc kiểu typeOf gì nhé hihihi) ,imageSource (địa chỉ hình ảnh trong source code) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('lazyLoaded', function(event, slick, image, imageSource){
    $('.result').text('lazyLoaded : ' + imageSource + 'vị trí tôi đây');
  });
  $('.slider').slick({
    lazyLoad: 'ondemand',
  });
});
```
`lazyLoad: 'ondemand'` các bạn còn nhớ trong setting không. Tải một lại hình khi đi được một vòng của slide.
### 8.lazyLoadError
Sự kiện xảy ra sau khi tải hình ảnh thất bại. Điều này giúp ta biết được ảnh nào không load được khi chạy.<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class), image(hình ảnh biến này các bạn thử log ra xem nó thuộc kiểu typeOf gì nhé hihihi) ,imageSource (địa chỉ hình ảnh trong source code) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('lazyLoadError', function(event, slick, image, imageSource){
    $('.result').text('lazyLoadError : ' + imageSource + ' vị trí tôi đây nhưng mà không có gì huhuhuh');
  });
  $('.slider').slick({
    lazyLoad: 'ondemand',
  });
});
```
À mà quên không biết tại sao cần phải setting API **lazyLoad: 'ondemand',** mình bí chỗ này bạn nào biết commend mình với, (chắc liên quan gì đến thư viện với event lazyLoad)
### 9.setPosition
Sự kiện xảy ra mỗi khi vị trí được load lại .<br>
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class), direction (giới hạn :bên trái, bên phải, bên trên, bên dưới) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('setPosition', function(event, slick, direction){
    $('.result').text('setPosition : tôi được set lại này');
  });
  $('.slider').slick();
});
```
Sự kiện diễn ra sau khi vị trí các item được load lại. Thử F12 bên demo để hiểu rõ đoạn text của class result sẽ load lại 
### 10.swipe
Sự kiện xảy ra khi trượt slide của bạn, nên nhớ lướt nhé không click bấm để chạy slide
**Đối số** : slick (đối tượng slick được gán cho thẻ  đó) , event (gán sự kiện cho class), direction (giới hạn :bên trái, bên phải, bên trên, bên dưới) <br>
**Ví dụ**:<br>
```js
$(document).ready(function(){
  $('.slider').on('swipe', function(event, slick, direction){
    $('.result').text('swipe : ' + direction + 'lướt tôi đi kahahaha');
  });
  $('.slider').slick();
});
```
Thôi tái bút đây các bạn