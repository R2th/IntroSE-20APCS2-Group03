Trạng thái bài đăng là một trong những cách thức để bạn đánh dấu bài đăng của mình đang trong tình trạng nào. Mặc định [WordPress](https://tuandc.com/cat/thu-thuat-wordpress) có các trạng thái như: Bản nháp, chờ duyệt hoặc đã đăng. Nếu bạn muốn có thêm nhiều tùy chọn, bạn có thể sử dụng các Plugin hoặc đơn giản hơn là tự code. Trong bài này mình sẽ hướng dẫn bạn cách để tạo thêm nhiều trạng thái tùy chỉnh trong WordPress nữa nhé. Các bài viết được tổng hợp tại [tuandc.com](https://tuandc.com/)


Tạo thêm trạng thái bài viết trong WordPress bằng Plugin

Nếu bạn là người ưa thích sử dụng Plugin thì có rất nhiều Plugin có thể cho bạn lựa chọn. Một trong những Plugin tốt nhất để dùng cho việc này đó là Edit Flow.

Sau khi cài đặt và kích hoạt, bạn truy cập vào phần cài đặt và nhấn “Edit Statuses” của Custom Statuses để tiến hành tùy chỉnh cho trạng thái.

Đến đây thì bạn có thể dễ dàng thêm và tùy chỉnh trạng thái nhé.
 
Lưu ý là đây chỉ là những trạng thái bình thường, không kèm với các tính năng, vì nó phải được theme hỗ trợ nữa.

Tạo thêm trạng thái bài viết trong WordPress không dùng Plugin

Tình trạng sử dụng quá nhiều Plugin khiến website của bạn trở nên chậm chạp và đôi khi kém an toàn nữa, thông thường mình chỉ sử dụng những plugin lớn như Woocomerce, LiteSpeed,…. còn những tính năng nhỏ mình thường chịu khó code. Việc thêm trạng thái bài viết cũng có thể code với một vài đoạn, dưới đây mình sẽ chia sẻ cho bạn đoạn mã đó.

Đầu tiên là đăng ký một loại trạng thái với code như sau:
```php
// Registering custom post status
function tdc_custom_post_status() {
   register_post_status('rejected', array(
       'label' => _x('Từ chối', 'post'),
       'public' => false,
       'exclude_from_search' => false,
       'show_in_admin_all_list' => true,
       'show_in_admin_status_list' => true,
       'label_count' => _n_noop('Từ chối <span class="count">(%s)</span>', 'Từ chối <span class="count">(%s)</span>'),
   ));
}
add_action('init', 'tdc_custom_post_status');
```
Tiếp theo là chèn trạng thái này vào để sử dụng:
```php
add_action('admin_footer-post.php', 'tdc_append_post_status_list'); // Fired on post edit page
add_action('admin_footer-post-new.php', 'tdc_append_post_status_list');

function tdc_append_post_status_list() {
  global $post;
  $complete = '';
  $label = '';
  if ($post -> post_type == 'post') {
     if ($post -> post_status == 'rejected') {
        $complete = 'selected=\"selected\"';
        $label = '<span id=\"post-status-display\"> Từ chối</span>';
     }
     echo ' <script>
    jQuery(document).ready(function($) {
       $("select#post_status").append("<option value=\"rejected\" '.$complete.'>Từ chối</option>");
       $(".misc-pub-section label").append("'.$label.'");
    }); </script>';
  }
}
```
Bây giờ kiểm tra xem nhé:

Bạn có thể sử dụng hàm `get_post_status` để kiểm tra trạng thái post. Bạn cũng có thể sử dụng trong `WP_Query` để truy vấn lấy ra các post với trạng thái phù hợp.

```php
<?php
  if ( get_post_status ( $ID ) == 'rejected' ) {
     echo 'Bài viết bị từ chối';
  }
?>
```

# Nguồn: [Tạo thêm trạng thái bài viết trong WordPress không dùng Plugin](https://tuandc.com/thu-thuat-wordpress/tao-them-trang-thai-bai-viet-trong-wordpress-khong-dung-plugin.html)