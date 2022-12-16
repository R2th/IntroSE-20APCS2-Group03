Tiếp tục loạt bài hướng dẫn tìm bug wordpress plugin trong phần 2 này mình trình bày tổng quan wordpress plugin và phân tích một plugin đơn giản để hiểu hơn về chúng.

Nếu chưa cài môi trường hoặc chưa biết dùng wordpress thì đọc lại bài trước [hướng dẫn tìm bug wordpress plugin (phần 1)](https://viblo.asia/p/huong-dan-tim-bug-wordpress-plugin-phan-1-LzD5dabeKjY).

Tại sao wordpress lại có tính năng plugin?

Wordpress có nguyên tắc cốt lõi đó là không bao giờ sửa đổi core wordpress. Vì sau mỗi lần cập nhật phiên bản mới wordpress sẽ ghi đè nên core. Do đó những tính năng mà người dùng sửa core wordpress mà có sẽ bị mất hoặc hệ thống bị lỗi sau khi cập nhật. 

Wordpress cho phép ta tạo các plugin từ đơn giản đến phức tạp không khác gì ta sửa code core wordpresss.

# Cấu trúc wordpress plugin
Thông thường toàn toàn bộ code plugin sẽ được nằm trong một thư mục để dễ dàng quản lý. Nếu code không có nhiều thì plugin có thể chỉ là một file duy nhất.

Hình dưới là plugin được tạo ra bởi nhiều file.

![](https://images.viblo.asia/7cd9678e-8245-418b-af53-1c0f330a1e7d.png)

Hình dưới là plugin được tạo ra bởi một file.

![](https://images.viblo.asia/d489c5ba-2c50-45ec-bbd9-60634b2d9677.png)

Dù plugin được tạo ra từ nhiều file hay một file thì chúng đều cần một file **index**. File này chỉ cho wordpress biết nó là một plugin.

File index này gồm 2 thành phần:
+ **Plugin header**: Là phần chú thích nằm trên cùng của file index. Cung cấp thông tin cho wordpress.
+ **Code**: Code xử lý của plugin.

```php
/**
 * Plugin Name: YOUR PLUGIN NAME
 */
 
 function hello_world() {
     echo "Hello World";
 }
 
 hello_world();
```

# Plugin header
Plugin header là thành phần không thể thiếu của một plugin. Nó chứa các trường cần thiết giúp wordpress nhận biết được đâu là code plugin đâu không phải. Plugin header tối thiểu phải chứa trường sau
```php
/**
 * Plugin Name: YOUR PLUGIN NAME
 */
```

Trường **Plugin Name** giúp cho wordpress tìm được plugin và hiển thị chúng lên trang web quản trị. Ngoài trường đó ra thì plugin header còn nhiều trường khác nữa.

+ **Plugin Name**: (required) The name of your plugin, which will be displayed in the Plugins list in the WordPress Admin.
+ **Plugin URI**: The home page of the plugin, which should be a unique URL, preferably on your own website. This must be unique to your plugin. You cannot use a WordPress.org URL here.
+ **Description**: A short description of the plugin, as displayed in the Plugins section in the WordPress Admin. Keep this description to fewer than 140 characters.
+ **Version**: The current version number of the plugin, such as 1.0 or 1.0.3.
+ **Requires at least**: The lowest WordPress version that the plugin will work on.
+ **Requires PHP**: The minimum required PHP version.
+ **Author**: The name of the plugin author. Multiple authors may be listed using commas.
+ **Author URI**: The author’s website or profile on another website, such as WordPress.org.
+ **License**: The short name (slug) of the plugin’s license (e.g. GPLv2). More information about licensing can be found in the WordPress.org guidelines.
+ **License URI**: A link to the full text of the license (e.g. https://www.gnu.org/licenses/gpl-2.0.html).
+ **Text Domain**: The gettext text domain of the plugin. More information can be found in the Text Domain section of the How to Internationalize your Plugin page.
+ **Domain Path**: The domain path lets WordPress know where to find the translations. More information can be found in the Domain Path section of the How to Internationalize your Plugin page.
+ **Network**: Whether the plugin can only be activated network-wide. Can only be set to true, and should be left out when not needed.

Bây giờ, ta sẽ xem plugin header của plugin **Hello Dolly**

```bash
vim /var/wwww/wp-content/plugins/hello.php
```

![](https://images.viblo.asia/9f7d4aba-fcdd-4fb5-9b17-2a9bea57892f.png)

Plugin header của file `hello.php` chứa các trường:
+ Plugin Name: Tên của plugin.
+ Plugin URI: Link đến trang chủ của plugin.
+ Description: Mô tả về plugin.
+ Version: phiên bản hiện tại của plugin.
+ Author URI: Link đến profile của tác giả.

Bây giờ ta cùng xem những trường này sẽ hiển thị như nào trên trang web.

![](https://images.viblo.asia/e9056edd-caef-45f6-8829-3a145ea52208.png)

# Hook
Hook được sửa dụng trong wordpress để tương tác hoặc thay đổi tính năng của core wordpress. Trong wordpress có 2 loại hook đó là: Actions và Filters.

**Actions** cho phép lập trình viên thêm dữ liệu hoặc thay đổi cách thức hoạt động của worpdress. Actions sẽ được thự thi nếu sự kiện xảy ra trong lúc wordpress core, plugins, themes đang thực thi. Hàm callback của actions thực thi và không có kết quả trả về.

**Filters** cho phép lập trình viên thay đổi dữ liệu trong lúc wordpress core, plugins, themes đang thực thi. Hàm callback nhận đầu vào là một viết sau đó sửa đổi chúng và trả lại cho chương trình. Hàm callback của fiters nên có kết quả trả về để filters có thể hoạt động bình thường.

# Phân tích plugin Hello Dolly
Tiếp đến, cùng mình tìm hiểu plugin Hello Dolly để hiểu rõ hơn về cấu trúc cũng như cách hoạt động của một plugin.

```php
<?php
/**
 * @package Hello_Dolly
 * @version 1.7.2
 */
/*
Plugin Name: Hello Dolly
Plugin URI: http://wordpress.org/plugins/hello-dolly/
Description: This is not just a plugin, it symbolizes the hope and enthusiasm of an entire generation summed up in two words sung most famously by Louis Armstrong: Hello, Dolly. When activated you will randomly see a lyric from <cite>Hello, Dolly</cite> in the upper right of your admin screen on every page.
Author: Matt Mullenweg
Version: 1.7.2
Author URI: http://ma.tt/
*/

function hello_dolly_get_lyric() {
	/** These are the lyrics to Hello Dolly */
	$lyrics = "Hello, Dolly
Well, hello, Dolly
It's so nice to have you back where you belong
You're lookin' swell, Dolly
I can tell, Dolly
You're still glowin', you're still crowin'
You're still goin' strong
I feel the room swayin'
While the band's playin'
One of our old favorite songs from way back when
So, take her wrap, fellas
Dolly, never go away again
Hello, Dolly
Well, hello, Dolly
It's so nice to have you back where you belong
You're lookin' swell, Dolly
I can tell, Dolly
You're still glowin', you're still crowin'
You're still goin' strong
I feel the room swayin'
While the band's playin'
One of our old favorite songs from way back when
So, golly, gee, fellas
Have a little faith in me, fellas
Dolly, never go away
Promise, you'll never go away
Dolly'll never go away again";

	// Here we split it into lines.
	$lyrics = explode( "\n", $lyrics );

	// And then randomly choose a line.
	return wptexturize( $lyrics[ mt_rand( 0, count( $lyrics ) - 1 ) ] );
}

// This just echoes the chosen line, we'll position it later.
function hello_dolly() {
	$chosen = hello_dolly_get_lyric();
	$lang   = '';
	if ( 'en_' !== substr( get_user_locale(), 0, 3 ) ) {
		$lang = ' lang="en"';
	}

	printf(
		'<p id="dolly"><span class="screen-reader-text">%s </span><span dir="ltr"%s>%s</span></p>',
		__( 'Quote from Hello Dolly song, by Jerry Herman:' ),
		$lang,
		$chosen
	);
}

// Now we set that function up to execute when the admin_notices action is called.
add_action( 'admin_notices', 'hello_dolly' );

// We need some CSS to position the paragraph.
function dolly_css() {
	echo "
	<style type='text/css'>
	#dolly {
		float: right;
		padding: 5px 10px;
		margin: 0;
		font-size: 12px;
		line-height: 1.6666;
	}
	.rtl #dolly {
		float: left;
	}
	.block-editor-page #dolly {
		display: none;
	}
	@media screen and (max-width: 782px) {
		#dolly,
		.rtl #dolly {
			float: none;
			padding-left: 0;
			padding-right: 0;
		}
	}
	</style>
	";
}

add_action( 'admin_head', 'dolly_css' );
```

Đầu tiên là phần **Plugin Header** phần này mình đã nói ở phần trên nên mình không nhắc lại nữa. Tiếp đến mình sẽ đi đến phần code của plugin. Đây là plugin với mục đích giành cho người mới tiếp cận plugin wordpress nên code của nó rất đơn giản và không có gì.

Đoạn code trên không dài và cũng rất dễ hiểu, code gồm 2 hàm `hello_dolly_get_lyric` và `dolly_css`.

+ `hello_dolly_get_lyric`: Lấy ngẫu nhiên một dòng trong lời bài hát Hello Dolly và hiển thị ra.
+ `dolly_css`: Chính sửa CSS cho nội dung hiển thị ra.

Tiếp đến ta để ý thấy có 2 dòng code: `add_action( 'admin_notices', 'hello_dolly' );`, `add_action( 'admin_head', 'dolly_css' );`. Hai dòng này đăng ký hook khi có sự kiện tương ứng xảy ra thì hàm đăng ký sẽ được thực thi.

Giải thích ý nghĩa:
+ `add_action( 'admin_notices', 'hello_dolly' );`: Hàm `hello_dolly` thực hi khi sự kiện **admin_notices** được gọi.
+ `add_action( 'admin_head', 'dolly_css' );`: Hàm `dolly_css` thực thi khi sự kiện **admin_heade** được gọi.

Ý nghĩa hook:

+ **admin_notices**: Hiển thị thông báo trên màn hình admin
+ **admin_head**: Hiển thị HTML trong `<head>` của HTML.

Để biêt được nhiều các sự kiện hơn hãy vào link: https://codex.wordpress.org/Plugin_API/Action_Reference

Cùng xem kết quả trên web khi plugin này hoạt động.

![](https://images.viblo.asia/a8b1315c-5690-42da-8c68-7ddb6d01b629.png)

# Trang cài đặt của plugin
Ngoài những plugin đơn giản như ví dụ trên thì hầu hết các plugin đều có nhiều tính năng khác nhau. Để quản lý những tính năng này thì bản thân plugin đã tạo ra trang quản lý để thực hiện cài đặt và cấu hình tương ứng với nhu cầu của người dùng.

![](https://images.viblo.asia/a73efc6e-d817-4c75-8f62-1c13a8c2af1c.png)

Hình trên là menu của plugin Ajax Load More (cho phép cuộn vô hạn như facebook).

Với từng plugin khác nhau menu sẽ khác nhau và các chức năng cũng khác nhau. Khi muốn cài đặt hay chỉnh sửa những gì liên quan đến plugin thì ta vào menu tương tứng của plugin để thực hiện cho phù hợp.

Ngoài tạo ra một menu riêng thì plugin có thể tạo một mục con trong mục **Settings** của wrodpress. Trong này cũng chứa các cài đặt cho plugin đó.

Phần 2 của loạt bài hướng dẫn tìm bug worpdress xin dừng ở đây. Hẹn các bạn trong bài thứ 3 (Tìm bug SQL injection).