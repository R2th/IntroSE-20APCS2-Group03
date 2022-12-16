Việc xây dựng một Wordpress Theme là rất dễ dàng với template tags. Bạn chỉ cần thêm the_title() để hiển thị tiêu đề trang hoặc bài viết, thêm the_content() để hiển thị nội dung của trang hoặc bài viết. Còn rất nhiều template tags trong Wordpress để bạn có thể hiển thị bất cứ thứ gì.
Nhưng để hiển thị những thứ cụ thể trong theme của bạn thì bạn cần tạo ra các template tags của riêng mình. Trong bài hướng dẫn này, chúng ta sẽ bắt đầu với việc tạo những template tags không quá phức tạp. Hãy bắt đầu với những nguyên tắc cơ bản nhé.
##  Template Tag Cơ Bản
Nếu bạn xem Wordpress Core bạn sẽ thấy rằng hầu hết các template tags là các hàm PHP với một vài tham số.
Để tạo template tag , bạn có thể viết một hàm PHP trong file functions.php đặt trong theme của bạn. Ví dụ: 
```
function my_template_tag() {
  echo 'This is my template';
}
```
Sau đó trong bạn có thể gọi nó ra giao diện bằng cách thêm đoạn code sau: 
```
<?php my_template_tag() ;?>
```
![](https://images.viblo.asia/2acb6b78-f120-47b4-bd7d-b700d82d4441.jpg)
Đoạn code trên sẽ hiển thị ra những gì viết trong hàm my_template_tag().
Tạo một  WordPress Template thực sự đơn giản. Được rồi, bây giờ chúng ta hãy xem một ví dụ cao cấp hơn một chút.
## Page View Count Template Tag
Trong ví dụ này, chúng ta sẽ tạo một template tags sẽ hiển thị số lượt xem cho mỗi bài đăng và trang.
Đầu tiên tạo một function có tên the_view(). Chẳng hạn.
```
function the_view() { 
 
} 
```
Chúng ta sẽ đặt function trong bài viết nên chúng ta cần lấy ID của bài viết. Nó có thể được lấy ra bằng hàm get_the_ID().
```
function the_view() { 
  $id = get_the_ID();
} 
```
Sau đó, chúng ta có thể sử dụng một hàm để lấy số lượt xem từ  WordPress.com Stat bằng cách sử dụng stats_get_csv ();. Hàm này chấp nhận một số tham số .
```
function the_view() {
  $id = get_the_ID();
  $page_view = stats_get_csv('postviews', 'days=-1&post_id='.$id.'');
}
```
Trong đoạn mã trên, vì chúng ta đặt tham số ngày thành -1, nên chúng ta sẽ truy xuất số lượt xem của post ID  đã cho ngay từ đầu, từ khi plugin WordPress.com Stat được kích hoạt.
Sau đó chúng ta chỉ việc echo ra số lượt views.
```
function the_view() {
  $id = get_the_ID();
  $page_view = stats_get_csv('postviews', 'days=-1&post_id='.$id.'');
  echo $page_view[0]['views'];
}
```
Vậy là đoạn code cho việc hiển thị số lượt xem đã xong. Để hiển thị nó , bạn chỉ cần dùng hàm the_view() và đặt nó trong file cần hiển thị.
![](https://images.viblo.asia/277d7064-ab73-4425-9d90-2e61cff51dcb.jpg)