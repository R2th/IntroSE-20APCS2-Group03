**Bài viết hôm nay, mình sẽ hướng dẫn qua các bạn sơ qua về các làm 1 theme cơ bản trong wordpress**

Như các bạn đã biết, wordpress là một cms được dùng khá phổ biến hiện nay để xây dựng các trang blog, bán hàng .... Vậy làm sao để ta có thể dùng wordpress để xây dựng các giao diện trang web theo mục đích của chúng ta và có thể thay đổi linh hoạt các template khác nhau theo từng giai đoạn, theme trong wordpress giúp chúng ta giải quyết vấn đề này. 

## Các file cần có trong 1 theme của wordpress

**- style.css** File này cần thiết cho tất cả các theme, để khai báo thông tin của theme, về tác giả, tên theme ...

**- rtl.css**

   
**- index.php**

**- comments.php**

**- front-page.php**
  
**- home.php**
  
**- single.php**
   
**- single-{post-type}.php**
    
**- page.php**
    
**- category.php**
    
**- tag.php**
    
**- taxonomy.php**
    
**- author.php**
    
**- date.php**
    
**- archive.php**
    
**- search.php**
    
**- attachment.php**
    
**- image.php**
    
**- 404.php**


Về cơ bản thì trong template của 1 theme sẽ chứa các file này (chi tiết cụ thể mình sẽ trình bày ở các loạt bài sau), và tối thiểu sẽ phải có 2 file là:
- **style.css**
- **index.css**

Chúng ta cùng nhau tạo 1 theme đơn giản lấy tên là framgia với 2 file này xem thế nào nhé. Các bạn hãy cài đặt wordpress trên local của bạn sau đó làm theo các bước sau:

### Bước 1: tạo folder theme
Các bạn tạo 1 folder theme **framgia** trong thư mục **themes** của project, sau đó các bạn tạo file **style.css**, và **index.php**.

![](https://images.viblo.asia/3c86b6b1-b405-4fe0-9c03-5e6146645791.png)

### Bước 2: Khai báo theme
Để khai báo theme mới trong wordpress, ta điền thông tin của theme trong file **style.css** với nội dung:

```css
/*
Theme Name: Framgia wordpress
Theme URI: http://wordpress.org/themes/twentythirteen
Author: the Framgia team
Author URI: framgia.com
Description: Framgia simple theme.
Version: 1.0
License: GNU General Public License v2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Tags: black, brown, orange, tan, white, yellow, light, one-column, two-columns, right-sidebar, flexible-width, custom-header, custom-menu, editor-style, featured-images, microformats, post-formats, rtl-language-support, sticky-post, translation-ready
Text Domain: framgia

This theme, like WordPress, is licensed under the GPL.
Use it to make something cool, have fun, and share what you've learned with others.
*/
```

Và bây giờ kiểm tra thành quả, các bạn vào **dashboad** của web, chọn **appearance** sẽ thấy xuất hiện theme các bạn vừa khai báo đó là **Framiga wordpress**

![](https://images.viblo.asia/746dec36-ea51-47b4-9aaf-77bbbac68e1b.png)

Các bạn click **active** để xử dụng theme cho trang web của mình. Như các bạn thấy, hiện tại trên web có 4 theme, khi ta cần xử dụng theme nào ta có thể click active và như vậy trang web của bạn hoàn toàn có thể có diện mạo mới.

### Bước 3: Xử dụng file index.php
Sau khi active theme, bạn trở ra trang chủ sẽ là 1 trang trắng không có nội dung gì, bây giờ ta sẽ xem file index.php sẽ có nhiệm vụ gì.

<br>
Khi trang theme của bạn chỉ chưa file index.php, thì file này có nhiệm vụ sẽ lấy dữ liệu và hiển thị ra màn hình người dùng, có thể hiểu khi chỉ có file này thì mọi tác vụ bạn đều sẽ xử lý ở đây và viết theo hướng thủ tục hay hướng đối tượng thì có thể tùy người code. Ở đây mình sẽ để 1 đoạn code đơn giản để các bạn thấy:

```html
<!DOCTYPE html>
<html>
<body>
<h2><?php echo "HELLO Wordpress Framgia"; ?>"</h2>
<p>This is a paragraph.</p>
<p>This is another paragraph.</p>

</body>
</html>

```

Kết quả :
    ![](https://images.viblo.asia/60de5f9b-3e10-4c1c-8937-77dce4932a0e.png)
    

# Kết luận
Như các bạn đã thấy việc build 1 theme wordpress cũng tương đối đơn giản, rất dễ xử dụng với những bạn mới ra trường, cấu trúc hoàn toàn có thể viết theo hướng thủ tục hoặc hướng đối tượng, mọi trình độ đều có thể viết và làm theo. Ở các bài sau mình sẽ trình bày chi tiết hơn các template trong 1 theme wordpress và hướng dẫn xây dựng 1 trang thương mại điện tử dựa trên wordpress.