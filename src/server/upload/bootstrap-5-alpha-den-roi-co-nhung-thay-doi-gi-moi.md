Chào các bạn!

Các bạn cũng không lạ gì với blog của mình nữa, đa phần là viết về bootstrap. Và bài này cũng không ngoại lệ. Tuy nhiên, thay vì nói về cách sử dụng các component trong Bootstrap 3, Bootstrap 4 hoặc so sánh về sự khác nhau giữa 2 version này thì bài này mình sẽ nói về version Bootstrap mới toanh: **Bootstrap 5 alpha**. Tất nhiên là alpha rồi vì đã có bản chính thức đâu. Và chúng ta cùng đi tìm hiểu xem **Bootstrap 5 alpha** có những đặc điểm gì mới so với Bootstrap 4 nhé.

Ở version 5 này đã loại bỏ đi những phần lỗi thời, không phù hợp để người dùng có thể dễ dàng tiếp cận hơn. Có 2 điểm vô cùng nổi bật:
- Bootstrap 5 loại bỏ hoàn toàn jQuery
- Không hỗ trợ Internet Explorer nữa.
Thay vào đó, bootstrap 5 được xây dựng các công cụ thân thiện hơn, tập trung để cải tiến, nâng cao chất lượng code bằng Javascript, các variable CSS sẽ linh hoạt hơn, dễ sử dụng hơn.

## Giao diện mới

Xây dựng home page nhỏ gọn hơn, không để full-width như cũ mà sẽ khiến home page ít giống với app hơn, hiển thị nhiều content hơn. Ngoài ra, phần sidebar cũng được nâng cấp, có thể thu gọn - mở rộng để xem các component bên bên trong. Như vậy người dùng sẽ dễ dàng tiếp nhận với các nội dung hơn.

![](https://images.viblo.asia/d9c1af58-14fc-46a4-bd66-e2801b04926e.png)

Các bạn có thể trải nghiệm trực tiếp tại [Customize docs](https://getbootstrap.com/docs/5.0/getting-started/introduction/) nhé.


## jQuery and JavaScript

Như đã nói ở trên, đột phá trong version 5 này là **loại bỏ hoàn toàn jQuery ra khỏi Bootstrap**. Nếu như các bản trước đây phụ thuộc quá nhiều vào jQuery thì ở version mới này người dùng sẽ được trải nghiệm 1 bootstrap hoàn toàn mới: **Say no with jQuery**. Việc này khiến cho những dự án được xây dựng với Bootstrap 5 sẽ nhẹ hơn, tốc độ tải trang có thể được cải thiện.

Bootstrap 5 thực hiện một số thay đổi và cải tiến cho JavaScript, tập trung vào chất lượng code và thu hẹp khoảng cách giữa bootstrap 4 và bootstrap 5.

Một sự thay đổi lớn nữa, ở v5 này sẽ loại bỏ phần lớn plugin Button trong việc chuyển đổi trạng thái (toggle states), thay vào đó các toggle button được thay thế bởi Checkbox và Radio button là chủ yếu.

## Tùy biến CSS

Bootstrap 5 đã hỗ trợ tốt hơn với CSS custom properties (nhờ không chơi với IE nữa đấy!). Ví dụ component **.table** sẽ có những biến cục bộ để style một cách dễ dàng hơn như sau:

```
.table {
  --bs-table-bg: #{$table-bg};
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: #{$table-striped-color};
  --bs-table-striped-bg: #{$table-striped-bg};
  --bs-table-active-color: #{$table-active-color};
  --bs-table-active-bg: #{$table-active-bg};
  --bs-table-hover-color: #{$table-hover-color};
  --bs-table-hover-bg: #{$table-hover-bg};

  // Styles here...
}
```

Bảng màu đã được mở rộng và tích hợp sẵn trong v5 và độ tương phản màu cũng được cải thiện nhiều. Như vậy người dùng có thể dễ dàng tùy chỉnh giao diện của ứng dụng hơn, tiếp cận với bootstap v5 dễ dàng hơn.

![](https://images.viblo.asia/a46cf86c-7808-48be-871c-ec2f1c3105e2.png)

## Updated forms

Toàn bộ các phần thuộc về Form đều được gom vào 1 nhóm và được hiển thị như 1 menu ở left sidebar

![](https://images.viblo.asia/42189184-d45c-41a3-9042-7e6b9c936325.png)


Checkbox, radio, file, range v.v., có thể tùy chỉnh một cách thống nhất trên các trình duyệt và hệ điều hành.

```
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
  <label class="form-check-label" for="flexCheckDefault">
    Default checkbox
  </label>
</div>

<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
  <label class="form-check-label" for="flexRadioDefault1">
    Default radio
  </label>
</div>

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
```

Đọc thêm về Form tại đây nhé: [Updated forms](https://getbootstrap.com/docs/5.0/forms/overview/)

## Các tiện ích API

Đội ngũ phát triển đã triển khai các tiện ích API hoàn toàn mới vào trong Bootstrap 5.

```
$utilities: () !default;
$utilities: map-merge(
  (
    // ...
    "width": (
      property: width,
      class: w,
      values: (
        25: 25%,
        50: 50%,
        75: 75%,
        100: 100%,
        auto: auto
      )
    ),
    // ...
    "margin": (
      responsive: true,
      property: margin,
      class: m,
      values: map-merge($spacers, (auto: auto))
    ),
    // ...
  ), $utilities);
```

Với cách tiếp cận dựa trên API, đội ngũ phát triển đã tạo một ngôn ngữ và cú pháp trong Sass để người dùng có thể tạo các tiện ích riêng cho chính mình một cách nhanh chóng đồng thời có thể sửa đổi hoặc xóa những tiện ích được cung cấp mặc định.

## Cải thiện hệ thống grid

Hệ thống Grid đã được trang bị 1 bộ mặt mới với các thay đổi

- Thêm một tầng grid mới là xxl
- Class .gutter bị thay thế bằng utilities .g* giống như utilities margin/padding.
- Các tùy chọn layout cho form bị that thế bằng hệ thống grid mới.
- Thêm vào các class cho khoảng cách theo chiều dọc.
- Cột sẽ không còn được đặt mặc định giá trị postion: relative .

```
<div class="row g-5">  
  <div class="col">...</div>
  <div class="col">...</div>
  <div class="col">...</div>
</div>  
```

Ngoài những cải tiến trên ở bản alpha hiện tại thì sẽ còn nhiều thứ có thể được thêm trong các phản alpha sau này: RTL, offcanvas, nhúng SVG vào HTML thay vì CSS,...

Như vậy, về cơ bản chúng ta cũng thấy được ở bản Bootstrap 5 sẽ có rất nhiều thứ mới lạ cho chúng ta khám phá và trải nghiệm. Cùng chờ xem nhé!