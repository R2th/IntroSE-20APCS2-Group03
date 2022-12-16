Chào các bạn hôm nay mình sẽ viết phần còn lại về slick. Đó là các methor (phương thức) điều này giúp cho các lập trình viên frondend kiểm soát tốt hơn cũng như control cách hoạt động của slick. Bài trước mình đã viết về event các sự kiện xảy ra cùng với slick nhưng chưa tác động vào cách hoạt động của slick thì methor sẽ giúp chúng ta điều đó.

### 1. slick
Phương thức khởi tạo của slick
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});
```

Ta sẽ truyền các thuộc tính mà chúng ta muốn config từ ban đầu
### 2. slick
Phương thức này huỷ bỏ config slick. Đưa các item về trạng thái không có slide
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  $('.slider').slick('unslick');
});
```

**Before**
<br>
![](https://images.viblo.asia/7dc60d1a-12fd-447e-b20c-23a5eee95ba5.png)
<br>
**After**
<br>
 ![](https://images.viblo.asia/0845af54-b5d8-4448-863c-b35705b2b79c.png)
### 3. slickNext
Phương thức giúp ta điều hướng các button next và prev mà không cần phải sử dụng button mặc định của slick.
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  $('.slider').slick('slickNext');
});
```
![](https://images.viblo.asia/9188e7f8-f036-4ce5-bafb-3670a074080f.png)
<br>
Ngoài việc next bằng button mặc định ta cũng có thể gán sự kiện next cho một button khác. Điều này phục vụ rất tốt cho thiết kế slide theo ý muốn của mình
### 4. slickPrev
Phương thức này tương tự phương thức slickNext
Ví dụ :
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  $('.slider').slick('slickPrev');
});
```

### 5. slickPause, slickPlay
Khi slick ở trạng thái **autoplaySpeed**  slide sẽ chạy liên tục nếu muốn dừng trạng thái này ta sử dụng phương thức slickPause 
Ví dụ :
```js 
$(document).ready(function(){
  $('.slider').slick({
    autoplay: true,
    autoplaySpeed: 500,
  });
});

$('.js-stop').on('click', function() {
  $('.slider').slick('slickPause');
});

$('.js-play').on('click', function() {
  $('.slider').slick('slickPlay');
});
```
**slickPlay**  sẽ huỷ lệnh slickPause
### 5. slickGoTo
slickGoTo sẽ show vị trí item mà ta muốn show
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  $('.slider').slick('slickGoTo', 2, true);
});
```
### 6. slickCienSlide
Trả về vị trí slide hiện tại
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  var currentSlide = $('.slider').slick('slickCurrentSlide');
  $('.result').text('Slide hiện tại là :' + currentSlide );
});
```
### 7. slickAdd
Thêm một slide. Nếu ta thêm một vị trí  cho nó,  nó sẽ thêm tại vị trí đó . Nếu không có chỉ mục nào được cung cấp.<br>
Cụ thể các tham số truyền vào như sau:
```js 
$('.slider').slick('slickAdd', element, index, addBefore);
```
**element**: phần tử được thêm vào .<br>
**index**: vị trí phần tử được thêm vào .<br>
**addBefore**: thêm vào trước hay thêm vào sau vị trí được chọn .<br>
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  $('.slider').slick('slickAdd', '<p>4</p>', 1, true);
});
```
### 8. slickRemove
Xóa slide theo vị trí, các tham số truyền vào tương tự slickAdd
```js 
$('.slider').slick('slickRemove', index, removeBefore);
```
Ví dụ: 
```js 
$(document).ready(function(){
  $('.slider').slick();
});

$('.js-method').on('click', function() {
  $('.slider').slick('slickRemove', 1, true);
});
```
### 9. slickFilter
Lọc các phần tử trong slide, phương thức này cũng khá hay. Cụ thể các tham số như sau :
```js 
$('.slider').slick('slickFilter', filter);
```
Trong đó **filter** là một funtion:
Ví dụ:

```js
$(document).ready(function(){
  $('.slider').slick({
    slidesToShow: 3,
  });
});

$('.js-filter').on('click', function() {
  $('.slider').slick('slickFilter', ':even');
});

$('.js-unfilter').on('click', function() {
  $('.slider').slick('slickUnfilter');
});
```
Trong ví dụ này  nó sẽ lọc những phần tử có vị trí chẵn. ta có thể thêm phần filter bằng các điều kiện khác ( https://stackoverflow.com/questions/47714202/slick-slider-filter-by-class-issue ) như :
```js
 var filter = $(this).data('attribute');
 ```
 
 Ừm cũng khá là nhiều và hữu ích rồi mình mong tất cả các bài viết về slick của mình sẽ giúp các bạn control được slide khi desige. Chúc các bạn thành công