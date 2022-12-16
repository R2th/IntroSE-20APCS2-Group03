# 1. Giới thiệu về Sortable

Sortable là một thư viện của jQuery cho phép sắp xếp các object bằng giao diện kéo thả trực quan. Tính năng này đã được ra đời từ khá lâu và ngày càng được ưa chuộng trong các ứng dụng web vì chúng được tạo ra với mục đích là tạo nên sự thân thiện vs người dùng.

Sortable hỗ trợ sắp xếp trong 1 list và trao đổi giữa các list với nhau. Ngoài ra, Sortable còn hỗ trợ disabled các items đặc biệt.

Dưới đây là hình ảnh demo

![](https://images.viblo.asia/6b222bb6-f50c-4f86-af48-10ef28a0924e.gif)


# 2. Cài đặt

Để cài đặt được Sortable thì chúng ta chỉ cần download thư viện jQuery UI qua url http://jqueryui.com/download/ vì chúng đã được tích hợp trong Jquery rồi

Sau đó chúng ta chỉ cần link js và css vào trong trang web là được

```
<link rel="stylesheet" href="jquery-ui.min.css">
<script src="jquery-ui.min.js"></script>
```

Sortable được hỗ trợ trong các trình duyệt dưới đây:
* Firefox >= 3.5
* Chrome
* IE > 7
* Safari >= 6
* Opera
* Konqueror

# 3. Cách sử dụng

# 3.1 Kéo thả trong 1 list

Dưới đây mình sẽ tạo 1 list các books. Chúng ta sẽ có thể kéo thả các item lên xuống trong list này

```
<ul id="sortable_books">
    <li>Book 1</li>
    <li>Book 2</li>
    <li>Book 3</li>
    <li>Book 4</li>
    <li>Book 5</li>
    <li>Book 6</li>
</ul>
```

Trong file js chúng ta sẽ thêm như sau:

```
$(function() {
    $('#sortable_books').sortable();
});
```

Oke vậy là chúng ta đã tạo được một ví dụ đơn giản cho sortable rồi. Chúng ta cùng tìm hiểu thêm các chức năng tiếp theo nào

# 3.2 Kéo thả trong nhiều list khác nhau

Trong một số trường hợp chúng ta cần phải sắp xếp các item từ list này vs item của list khác, vì vậy để làm được điều đó thì chúng ta cùng đi xây dựng 2 danh sách book như sau:

```
<ul id="sortable_book1" class="sortable">
  <li>Book 1</li>
  <li>Book 2</li>
  <li>Book 3</li>
  <li>Book 4</li>
  <li>Book 5</li>
  <li>Book 6</li>
</ul>
 
<ul id="sortable_book2" class="sortable">
  <li>Book 7</li>
  <li>Book 8</li>
  <li>Book 9</li>
  <li>Book 10</li>
  <li>Book 11</li>
  <li>Book 12</li>
</ul>
```

Và chúng ta chỉ cần sửa lại trong file js như sau:

```
$(function() {
    $( 'sortable_book1, #sortable_book2' ).sortable({
      connectWith: 'stable'
    });
});
```

Giờ thì chúng ta có thể dễ dàng sắp xếp các item trong 2 danh sách với nhau rồi

# 3.3 Disabled các items đặc biệt

Trong trường hợp có một số item bị disabled có vị trí cố định thì ta chỉ có thể sắp xếp được các item không bị disabled. chúng ta cùng xem ví dụ sau:

```
<ul id='sortable'>
  <li>Item 1</li>
  <li class="ui-disabled">(I'm not sortable or a drop target)</li>
  <li class="ui-disabled">(I'm not sortable or a drop target)</li>
  <li>Item 4</li>
</ul>
```
```
$( function() {
    $( '#sortable' ).sortable({
      items: 'li:not(.ui-disabled)'
    });
});
```

Trong trường hợp có một số items bị disabled không có vị trí cố định thì ta chỉ có thể sắp xếp xen kẽ các items khác nhưng không thể kéo thả các items bị disabled được. Chúng ta cùng xem tiếp ví dụ sau:

```
<ul id='sortable'>
  <li>Item 1</li>
  <li class="ui-disabled">(I'm not sortable or a drop target)</li>
  <li class="ui-disabled">(I'm not sortable or a drop target)</li>
  <li>Item 4</li>
</ul>
```
```
$( function() {
    $( '#sortable' ).sortable({
      cancel: '.ui-disabled'
    });
});
```

# 4. Tài liệu tham khảo
https://johnny.github.io/jquery-sortable/
http://jqueryui.com

Hy vọng qua bài viết này mình mong có thể giúp thêm được các bạn được phần nào khi làm việc với sắp xếp các item trong list. Chúc các bạn thành công!