Filterizr là một plugin jQuery sử dụng để sắp xếp, lọc và tìm kiếm với hiệu ứng chuyển đổi Transition CSS3 mượt mà, tối ưu hóa hiệu suất cho mobile và rất nhẹ chỉ 8.5 kb nên đây sẽ là lựa chọn hoàn hảo cho việc xây dựng giao diện gallery.

## Cài đặt
### Các trình duyệt hỗ trợ
Sử dụng được trên trên Chrome, IE10+, FireFox, Opera, Safari, iOs và Android.

### Cài đặt 

- Cách 1: Download thư viện hoặc cài qua cdn
```
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/filterizr/1.3.4/jquery.filterizr.min.js"></script>
```

- Cách 2: Cài đặt bằng npm hoặc yarn
```
npm install filterizr
```
Hoặc
```
yarn add filterizr
```

## Cấu hình cơ bản
### HTML
```
<ul class="nav">
    <li data-filter="all"> All </li>
    <li data-filter="1"> 1 </li>
    <li data-filter="2"> 2 </li>
    ...
</ul>
<ul class="nav">
<div class="filter">
    <div class="filter--item" data-category="1" data-sort="Red">...</div>
    <div class="filter--item" data-category="1" data-sort="Blue">...</div>
    ...
</div>
```

### Javascript
```
<script>
    $(function () {
        $('.filter').filterizr();
    });
</script>
```

## Một số option của filterizr

***animationDuration**
- Là thời gian chuyển hiệu ứng CSS3.

***callbacks**
- Là hàm gọi các function callback.

***onFilteringStart**
- Là các sự kiện xảy ra khi quá trình lọc(filter) đã bắt đầu.

***onFilteringEnd**
- Là các sự kiện xảy ra khi quá trình lọc(filter) đã kết thúc.

***onShufflingStart**
- Là các sự kiện xảy ra khi quá trình xáo trộn(shuffle) đã bắt đầu.
- 
***onShufflingEnd**
- Là các sự kiện xảy ra khi quá trình xáo trộn(shuffle) đã kết thúc.

***onSortingStart**
- Là các sự kiện xảy ra khi quá trình sắp xếp(sort) đã bắt đầu.

***onSortingEnd**
- Là các sự kiện xảy ra khi quá trình sắp xếp(sort) đã kết thúc.

***controlsSelector**
- Trong trường hợp cần phải có nhiều hơn một đối tượng Filterizr trên cùng một trang thì bạn cần thiết lập các điều khiển khác nhau cho chúng.

***delay**
- Đo bằng mili giây và được sử dụng để đặt giá trị của thuộc tính trễ chuyển tiếp của mỗi sự kiện. Giá trị của độ trễ được tăng dần theo giá trị độ trễ cho mỗi sự kiện để tạo ra phiên bản hiệu ứng mượt hơn.

***setupControls**
- Nếu được đặt thành true thì Filterizr sẽ tự tìm và phát hiện, thiết lập các điều khiển lọc, xáo trộn và sắp xếp. Trong trường hợp bạn có nhiều Filterizrs trong gallery của mình, thì để thành false và thiết lập các sự kiện riêng, sử dụng API công khai, để tránh gây nhiễu cho các điều khiển của Filterizrs.

***selector**
- Bộ chọn của container gallery.

***layout**
- Theo mặc định, bố trí cho các mục có cùng chiều rộng và chiều cao. Các giá trị có thể khác là: 
+ 'packed' cho bố cục các item có chiều rộng và chiều cao khác nhau.
+ 'sameWidth' cho bố cục các item có cùng chiều rộng nhưng chiều cao khác nhau. 
+ 'sameHeight' để bố trí các item có cùng chiều cao nhưng chiều rộng khác nhau. 
+ 'horizontal' để bố trí các mục được đặt theo chiều ngang. 
+ 'vertical' để bố trí các mục được đặt theo chiều dọc.

***filter**
- Giá trị mặc định có thể được sử dụng cho một bộ sưu tập chưa được lọc. Để khởi tạo thư viện được lọc, hãy đặt thuộc tính 'all' trước khi khởi tạo Filterizr.

***delayMode**
- Xác định mức độ trễ cho việc chuyển đổi giữa các item.
+ 'progressive' : Luỹ tiến.
+ 'alternate' : Thay thế.
+ '0' : Giá trị của delayMode không có sự khác biệt .

***filterInCss**
- Là đối tượng có các thuộc tính CSS, được viết giống như cách bạn viết nó cho hàm .css () của jQuery. Đây là quá trình chuyển đổi css khi các mục của bạn đang được lọc.

## Ví dụ
{@embed: https://codepen.io/kylie-kriss/pen/ymyemv}