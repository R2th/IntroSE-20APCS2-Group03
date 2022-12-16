# Child Themes
 Sử dụng Child Themes cho phép bạn thay đổi hoặc chỉnh sửa theo tuỳ ý của bạn với theme gốc mà không lo việc update phiên bản của theme gốc. Để hiểu child theme làm việc thế nào việc đầu tiên chúng tâ cần biết rõ quan hệ giữa parent theme và child theme
## Thế nào là Parent Theme?

Parent theme là 1 theme hoàn chỉnh bao gồm toàn bộ các file template yêu cầu của 1 theme chuẩn wordpress, và các tài nguyên mà theme đó có thể hoạt động.
Thế nào là Child Theme?

Như phần tổng quan đã nói, thì child theme thừa kế toàn bộ những gì mà parent theme có từ các chức năng và giao diện, và nó có thể tuỳ chỉnh bất cứ thành phần nào theo ý người sử dụng. Theo cách này, các tuỳ chỉnh nằm tách biệt với parent theme và sẽ không ảnh hưởng tới việc update parent theme về sau.

### Child themes:

*  Làm cho sửa đổi của bạn linh hoạt và có thể nhân rộng;
*  Giữ tuỳ chỉnh tách biệt với chức năng của theme gốc
*  Cho phép theme gốc update mà không ảnh hưởng tới các tuỳ chỉnh của bạn
*  Cho phép tận dụng tối đa tài nguyên của theme gốc
*  Tiết kiệm thời gian phát triển
*  Là cách tuyệt vời để học cách phát triển 1 themes trong wordpress

**Chú ý:** Nếu bạn đang tạo 1 tuỳ chỉnh mở rộng - ngoài các file **templates** và **style** - thì tạo trong **parent theme** sẽ tốt hơn so với tạo trong **child theme**. Tạo trong **parent theme** cho phép bạn tránh được các vấn đề liên quan đến các function không dùng đến nữa về sau, việc này cân nhắc với từng trường hợp cụ thể.
Làm thế nào để tạo 1 child theme.

### 1. Tạo folder cho child theme

Đầu tiên ta tạo 1 thư mục trong **wp-content/themes** , **child theme** có tên giống hệt với **parent theme** nhưng sẽ kèm theo **-child** ở đằng sau.

### 2. Tạo 1 file stylesheet: style.css

Bước 2, bạn tạo 1 file **style.css**, chứa các thông tin như của 1 theme thông thường.
```php	
/*
 Theme Name:   abc child
 Theme URI:    http://example.com/abc-child/
 Description:  ABC Child Theme
 Author:       No Name
 Author URI:   http://example.com
 Template:     abc
 Version:      1.0.0
 License:      GNU General Public License v2 or later
 License URI:  http://www.gnu.org/licenses/gpl-2.0.html
 Tags:         light, dark, two-columns, right-sidebar, responsive-layout, accessibility-ready
 Text Domain:  abc-child
*/
```
The following information is required:
*   **Theme Name** –bắt buộc khai báo
*   **Template** –tên của theme cha, ở đây đang dùng parent theme là **abc**

Child theme chỉ yêu cầu có khai báo trong **style.css** để nhận biết nhưng ** function.php** cũng cần thiết để có thể thiết lập cho việc này.

### 3. Enqueue stylesheet
	
```php
<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
    wp_enqueue_style( 'parent-style', get_template_directory_uri() . '/style.css' );
 
}
?>
```

Nếu **childe theme** chứa code CSS bạn cần add chúng vào, thiết lập 'parent-style' độc lập để đảm bảo rằng style trong **child theme** sẽ load sau đó.
 
```php
<?php
add_action( 'wp_enqueue_scripts', 'my_theme_enqueue_styles' );
function my_theme_enqueue_styles() {
 
    $parent_style = 'parent-style'; // This is 'twentyfifteen-style' for the Twenty Fifteen theme.
 
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}
?>
```

Giống như việc active các theme thông thường bạn vào ** Administration Screen > Appearance > Themes**. Bạn sẽ thấy tên child theme bạn vừa tạo và active để sử dụng.

**Thêm file templates**

Khác với file **functions.php**, bất cứ file **template** nào bạn add vào **child theme** sẽ ghi đè lên **parent theme**. Trong hầu hết các trường hợp, tốt nhất tạo một bản 1 bản mẫu copy mà bạn muốn thay đổi từ **parent theme**, khi muốn thay đổi 1 file template trong parent theme, bạn cóp file đấy sang child theme và tiến hành sửa đổi ở đây.

**Sử dụng functions.php**

Không giống như **style.css**, **funcitons.php** của **child theme** không ghi đè lên file trong **parent theme**. Thay vào đó, nó sẽ được load thêm vào **functions.php** của **parent theme**. (cụ thể hơn, nó được load ngay trước **parent theme**)

Cấu trúc của file **functions.php** rất đơn giản, giống như 1 file php thông thường:

```php
<?php // Opening PHP tag - nothing should be before this, not even whitespace
 
// Custom Function to Include
function my_favicon_link() {
    echo '<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />' . "\n";
}
add_action( 'wp_head', 'my_favicon_link' );
```

### Referencing or Including Other Files

Khi bạn cần phải include file khác vào bên trong cấu trúc thư mục, bạn cần sử dụn get_stylesheet_directory(). Từ style.css trong thư mục parent theme, get_stylesheet_directory() trỏ tới thư mục trong child theme của bạn  (không phải trong parent theme). TĐể tham chiếu đến thư mục này bạn sử dung get_template_directory() để thay thế.

Dưới đây là ví dụ sử dung **get_stylesheet_directory()** khi tham chiếu đến thư mục tham chiếu ở thư mục trong child theme:

```php
<?php require_once( get_stylesheet_directory(). '/my_included_file.php' ); ?>
```
Sử dung get_stylesheet_directory_uri() để hiển thị hình ảnh được lưu trữ bên trong thư mục /images bên trong thư mục của child theme.

```
<img src="<?php echo get_stylesheet_directory_uri(); ?>/images/my_picture.png" alt="" />
```
không như **get_stylesheet_directory()**, cung cấp đường dẫn của file , **get_stylesheet_directory_uri()** cung cấp URL, được sử dụng với các tài nguyên front-end.

### Add vào hàng đợi Styles and Scripts

wp sẽ không tự động add các style và scripts trong child theme mà nó sử dụngwp_enqueue_scripts() để đưa vào hàng đợi và add vào sau.

```php
<?php
add_action( 'wp_enqueue_scripts', 'my_plugin_add_stylesheet' );
function my_plugin_add_stylesheet() {
    wp_enqueue_style( 'my-style', get_stylesheet_directory_uri() . '/style.css', false, '1.0', 'all' );
}
```

# Kết luận
Trên đây là cơ bản về cách tạo 1 theme child trong wordpress và các kế thừa template trong theme child, các bạn hãy tự tạo cho mình 1 theme child để tránh việc mất mát code khi update theme gốc nhé :D