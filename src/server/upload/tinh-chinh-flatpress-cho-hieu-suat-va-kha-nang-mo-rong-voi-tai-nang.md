[FlatPress](http://flatpress.org/home/) được hiểu nôm na là một công cụ viết blog nhẹ, dễ cài đặt. Đơn giản và rõ ràng, chỉ cần PHP. Không cần cơ sở dữ liệu.
#### Bắt đầu với bài toán Cache lại các đoạn HTML:
Với ý tưởng ban đầu là sử dụng [memcache](http://php.net/manual/en/book.memcache.php) để giữ các trang HTML trong bộ nhớ và phục vụ các trang đó thay vì tạo HTML mỗi khi bài đăng trên blog được yêu cầu. Ý tưởng đơn giản, nhưng vì không muốn trải qua các hoạt động thiết lập memcache trong [MAMP](https://www.mamp.info/en/) . Vậy nên ở đây, ta sử dụng [APC](http://php.net/manual/en/ref.apc.php) vì nó không yêu cầu thiết lập và thể kích hoạt tiện ích mở rộng APCU trên webhost.

Nhìn vào [index.php](https://github.com/flatpressblog/flatpress/blob/master/index.php) , ta có thể thấy rằng phương thức [Smarty :: display ()](https://www.smarty.net/docsv2/en/api.display.tpl) đã được sử dụng để kết xuất và xuất nội dung của một trang / bài đăng. Đơn giản nhưng hiệu quả.

```
function index_display() {
	...
	$smarty->display($module);
	...	
}
```

Và đương nhiên, thủ thuật ở đây là sử dụng method [Smarty :: fetch](https://www.smarty.net/docsv2/en/api.fetch.tpl) thay thế, lưu bộ đệm và cung cấp đầu ra được lưu trong bộ nhớ cache theo yêu cầu. Khóa bộ nhớ cache được dựa trên `$ _SERVER ['REQUEST_URI']`.
Vâng, cách tiếp cận này đã làm việc. Theo một cách nào đó. Tuy nhiên, nó chỉ hoạt động trong trường hợp ta đang lưu các bài đăng trên blog. Mọi thứ khác như danh sách danh mục, trang chủ, sơ đồ trang web, v.v ... chỉ được lưu trữ một phần. Vì một số lý do, chỉ một phần của HTML được tạo ra bởi Smarty và phần còn lại - nó đã được gửi tới trình duyệt từ một số phần khác của code.
#### Xử lý: thêm Cache Handler cho Smarty
Vì vậy, ta sẽ thử một cách tiếp cận khác bằng cách triển khai [Smarty Cache Handler](https://www.smarty.net/docsv2/en/section.template.cache.handler.func.tpl) sẽ hoạt động rõ ràng với FlatPress và ít nhất theo lý thuyết ta sẽ không phải lo lắng về phần còn lại của base code. Vâng, cache handler đã hoạt động ... chỉ cho các trang blog post. Điều này chỉ ra rằng FlatPress đang làm điều gì đó xấu sâu bên trong lõi của nó.

#### Tất cả đều thất bại - Vậy thực sự ta muốn đạt được điều gì?
* thực hiện thay đổi tối thiểu nhất có thể
* chỉ tăng tốc các bài đăng phổ biến nhất 

Hãy cùng thay đổi đoạn mã `index_display ()` ban đầu

```
function index_display() {
  global $smarty, $fp_config;
  
  $loggedIn = user_loggedin();
  $cacheKey = 'ikb' . $_SERVER['REQUEST_URI'];
  $content = apc_fetch($cacheKey);
  
  if ($content === false || $loggedIn) {
      $module = index_main();
      
      $content = $smarty->fetch($module);
      if (($module == 'comments.tpl' || $module == 'single.tpl') && !$loggedIn) {
        apc_store($cacheKey, $content, 3600);
      }
      unset($smarty);
      do_action('shutdown');
  }
  
  echo $content;
}
```

Logic cực kỳ đơn giản. Trước tiên, kiểm tra được thực hiện đối với dữ liệu bộ nhớ cache bị thiếu hoặc người dùng quản trị viên đã đăng nhập. Khi cả hai điều kiện này không thành công, tức là chúng ta có dữ liệu và người dùng không đăng nhập, dữ liệu được lưu trong bộ nhớ cache được trả về trình duyệt. Tuy nhiên, khi một trong những điều kiện này được đáp ứng, chúng ta sẽ xử lý yêu cầu và tạo một trang bằng Smarty. Sau đó, nếu yêu cầu dành cho một bài đăng trên blog (mô-đun là comments.tpl hoặc single.tpl ) và chúng ta không phải là người dùng đã đăng nhập, chúng ta sẽ lưu kết quả vào bộ đệm. Kết quả cũng được trả về trình duyệt.

#### plugin PostViews

Tiếp theo, nếu mà bạn đang sử dụng plugin PostViews, đếm số lượt xem mà bài đăng trên blog nhận được. Vậy thì plugin sẽ này không bao giờ được kích hoạt cho các bài đăng được lưu trong bộ nhớ cache, nên số lượt xem không được cập nhật. Boo. 

Ta có thể giải quyết loại kịch bản này bằng cách [sửa đổi PostViews để sử dụng pixel theo dõi](https://www.igorkromin.net/index.php/2015/11/30/updating-the-flatpress-postviews-plugin-to-use-a-tracking-pixel/) .

Ta có thể thay đôi  method `plugin_postviews_track()`

```
function plugin_postviews_track($content) {
	global $smarty;
	$id = $smarty->get_template_vars('id');
	$shortId = shorturl_toBase(str_replace('-', '', str_replace('entry', '', $id)), 62);
	
	return $content . 
        '<iframe src="/'.PLUGINS_DIR.'postviews/v.php?v='.$shortId.'" width="1" height="1" style="border:0; display:block;"></iframe>';
}
```

và trong `v.php`

```
/* output a single character page with caching turned off */
header("Cache-Control: no-cache, no-store, must-revalidate"); /* HTTP 1.1. */
header("Pragma: no-cache"); /* HTTP 1.0. */
header("Expires: 0"); /* Proxies. */
echo "#";
```

Ý tưởng ở đây là ta gắn thêm iframe 1x1 vào bài đăng trên blog để kích hoạt plugin lượt xem bài đăng để tăng số lượng bài đăng. Điều này không lý tưởng, nhưng vì ta đang tìm kiếm một giải pháp nhanh chóng và dễ dàng nên nó hoạt động tốt. (Lý tưởng là các lượt xem bài đăng phải được ghi lại bởi hệ thống cốt lõi, không phải nội dung bên ngoài trang.)

Đó là mức độ thay đổi tinh chỉnh. Thực sự không phải là một số lượng lớn code! Thời gian lớn nhất ở đây là cố gắng tìm ra lý do tại sao FlatPress không hoạt động tốt với template đầu ra. Đó vẫn là một bí ẩn mà ta sẽ để lại cho đội FlatPress.

#### Bài học kinh nghiệm

Cái số 1 tránh xa điều này là - bộ nhớ cache càng nhiều càng tốt và tránh xử lý không cần thiết trong các ứng dụng web. Điều này trở nên đặc biệt quan trọng khi lưu trữ các ứng dụng trong các dịch vụ như App Engine nơi bạn được lập hóa đơn dựa trên các tài nguyên bạn sử dụng.

Và # 2 là - dù nhỏ, 'hackey', những thay đổi có thể có tác động tích cực rất lớn và bạn không nên né tránh chúng trong những trường hợp phù hợp.