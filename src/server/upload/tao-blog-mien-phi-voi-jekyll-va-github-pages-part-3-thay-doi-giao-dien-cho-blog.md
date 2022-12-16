Tiếp theo phần 2, ở phần này mình sẽ hướng dẫn các bạn thay đổi giao diện (layout) cho blog.

Để thay đổi giao diện thì cần thay đổi những file nào trong repo?. Đó là 2 file
* _layouts/default.html
* style.scss

![](https://images.viblo.asia/bc84337f-8aa4-4f71-ab6b-5ec974dc359b.png)

# 1: Trong file default.html
Không xóa mất dòng { { content }} sau đây:
![](https://images.viblo.asia/f3cab6f2-ad9d-4897-a9f2-de30ac8766e2.png)
vì đó là thứ gây dựng nên nội dung các bài viết của trang
![](https://images.viblo.asia/e556239c-8857-41f9-be0c-784a64d1e935.png)

Phần này phải thật cẩn thận. Nếu lỡ tay xóa đi, hoặc thêm nội dung khác vào thì nó sẽ không thể hiển thị nội dung bài viết của blog được.

Muốn thay đổi hình thức của nó chỉ cần quấn nó trong thẻ div rồi định dạng cái thẻ div đó với css, chứ đừng thêm class tào lao vào ví dụ như
```
~~ { {   class="xanhdotimvang" content }}~~
```
Add như này thì đúng:
```
<div class="xanhdotimvang">
   { {  content }}
</div>
```

Còn lại thì viết HTML như bình thường
# 2: Chế css trong file style.scss
Nhưng ai không thích hoặc không biết scss thì cứ mạnh dạn viết file .css bình thường không phải sợ, miễn là ném cái file .css đó được gọi đến ở trong file default.html là được.
![](https://images.viblo.asia/56e2ae6d-d304-49a9-82cc-7c73474365db.png)

# 3: Kết
Qua 3 bài viết mình đã hướng dẫn các bạn tạo 1 blog đơn giản sử dụng Github Page và jekyll.
Chúc mọi người thành công.

Ở bài viết sau mình sẽ gặp lại mọi người với một chủ đề khác.