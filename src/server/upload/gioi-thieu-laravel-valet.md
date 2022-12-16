# Laravel Valet

## Giới thiệu

Valet là một môi trường ảo để phát triển Laravel giống như Homestead, docker. Không cần cài đặt Apache/Nginx, không cần cấu hình `/etc/hosts` file luôn. 

Laravel Valet cấu hình máy Mac để luôn luôn chạy [Caddy](https://caddyserver.com) ở background khi máy khởi động. Sau đó sử dụng [DnsMasq](https://en.wikipedia.org/wiki/Dnsmasq) để proxy các requests tới tên miền `*.dev` để trỏ tới sites cài đặt trên máy bạn.

Nói cách khác, một môi trường phát triển Laravel siêu nhanh mà chỉ có tiêu tốn có 7MB RAM. Valet không phải là phương án thay thế hoàn toàn cho Vagrant hay Homestead, nhưng cung cấp một giải phương pháp khác khi bạn cần một môi trường cơ bản, thoải mái, yêu cầu tốc độ nhanh hoặc khi sử dụng trên máy bị giới hạn về RAM.

Valet  hỗ trợ nhiều Framework cũng như CMS khác: 

- [Laravel](https://laravel.com)
- [Lumen](https://lumen.laravel.com)
- [Symfony](https://symfony.com)
- [Zend](http://framework.zend.com)
- [CakePHP 3](http://cakephp.org)
- [WordPress](https://wordpress.org)
- [Bedrock](https://roots.io/bedrock)
- [Craft](https://craftcms.com)
- [Statamic](https://statamic.com)
- [Jigsaw](http://jigsaw.tighten.co)
- Static HTML
-  ....

## Cài đặt

**Valet yêu cầu hệ điều hành Mac và [Homebrew](http://brew.sh/). Trước khi tiến hành cài đặt, bạn cần đảm bảo không có ứng dụng nào như Apache hay Nginx đang sử dụng port 80 trên máy.**

- Cài đặt hay cập nhật [Homebrew](http://brew.sh/) lên version mới nhất sử dụng `brew update`.
- Cài PHP sử dụng Homebrew php 7.0  `brew install homebrew/php/php70` or php 7.2 `brew install homebrew/core/php`
- Cài Valet với Composer với câu lệnh `composer global require laravel/valet`. Đảm bảo là `~/.composer/vendor/bin` được đặt vào trong biến môi trường "PATH".
- Chạy câu lệnh `valet install` để tiến hành cấu hình và cài Valet và DnsMasq, và đăng kí Valet daemon để tự động chạy khi hệ thống khởi động lại.

Khi Valet được cài xong, thử ping tới bất cứ tên miền `*.dev` nào trên terminal ví dụ như `ping foobar.dev`. Nếu Valet được cài đặt chuẩn xác thì bạn sẽ thấy domain này trả về ở địa chỉ `127.0.0.1`.

Valet sẽ tự động khởi động daemon của nó mỗi khi máy khởi động lại. Vì thế không cần thiết phải chạy `valet start` hay `valet install` thêm lần nào nữa sau khi Valet cài đặt hoàn thành.

#### Sử dụng với tên miền khác

Mặc định, Valet cung cấp projects sử dụng tên miền `.dev`. Nếu bạn muốn sử dụng tên miền khác, bạn có thể sử dụng câu lệnh `valet domain tld-name`.

Ví dụ, nếu bạn muốn sử dụng `.local` thay vì `.dev`, chạy `valet domain local` và Valet sẽ bắt đầu chạy projects của bạn tại `*.local` một cách tự động.

#### Database

Nếu bạn cần sử dụng database, hãy thử MariaDB bằng lệnh `brew install mariadb` và `brew services start mysql`. Bạn có thể kết nối tới database tại `127.0.0.1` và sử dụng username `root` với mật khẩu là chuỗi rỗng.

## Serving Sites

Khi mà Valet đã được cài, bạn có thể sẵn sàng serving sites. Valet cung cấp hai câu lệnh để bạn có thể serve sites Laravel của bạn: `park` và `link`.

**Câu lệnh `park`**

- Tạo một thư mục mới trên máy Mac, có thể gõ lệnh như `mkdir ~/Sites`. Rồi, `cd ~/Sites`, và chạy `valet park`. Câu lệnh này sẽ đăng kí thư mục đang làm việc thành đường dẫn để Valet tìm kiếm sites.
- Sau đó tạo một site Laravel mới trong thư mục này: `laravel new blog`.
- Mở link `http://blog.dev` trên trình duyệt.

**Tất cả chỉ có vậy.** Lúc này, bất cứ project Laravel nào mà bạn tạo ra trong thư mục "được park" sẽ tự động được serve theo quy tắc tên này `http://tên-thư-mục.dev`.

**Câu lệnh `link`**

Câu lệnh `link` cũng có thể được sử dụng để serve sites Laravel của bạn. Câu lệnh này cũng có ích khi mà bạn chỉ muốn serve một site trong thư mục, chứ không phải toàn thư mục.

- Để sử dụng lệnh này, di chuyển tới một trong những project của bạn và chạy `valet link app-name` trong terminal. Valet sẽ tạo một symbolic link trong `~/.valet/Sites` để trỏ tới thư mục đang làm việc.
- Sau khi chạy lệnh `link`, bạn có thể truy cập vào site trên trình duyệt tại địa chỉ `http://app-name.dev`.

Để xem danh sách tất cả các thư mục được link, chạy lệnh `valet links`. Bạn có thể sử dụng `valet unlink app-name` để huỷ các symbolic link.

**Bảo mật sites với TLS**

Mặc định, Valet serve các site thông qua HTTP thuần. Tuy nhiên, nếu bạn muốn serve site với mã hoá TLS sử dụng HTTP2, thì sử dụng lệnh `secure`. Ví dụ, nếu site của bạn được serve tại địa chỉ `laravel.dev`, bạn nên chạy câu lệnh sau để bảo mật nó:

    valet secure laravel

Để "gỡ bảo mật" một site và quay trở lại sử dụng HTTP, thì sử dụng lệnh `unsecure`. Giống như lệnh `secure`, câu lệnh này nhận tên host mà bạn muốn gỡ chế độ bảo mật:

    valet unsecure laravel

## Chia sẻ sites

Valet thậm chí có câu lệnh để bạn chia sẻ site trên máy của bạn ra ngoài thế giới. để test trên mobile hoặc thiết bị khác chẳng hạn. Không cần thiết phải cài đặt thêm cái gì khi mà Valet đã được cài trên máy.

Để chia sẻ một site, chuyển tới thư mục của site và gõ lệnh `valet share`. Một link public URL sẽ được chèn vào trong clipboard và bạn có thể paste trực tiếp vào trình duyệt. Chỉ có vậy.

Để dừng việc chia sẻ, ấn `Control + C` để huỷ tiến trình.

## Xem logs

Nếu bạn muốn theo dõi tất cả các log cho sites của bạn trên terminal, gõ lệnh `valet logs`. Tất cả các nội dung log mới sẽ hiển thị trên terminal khi có. Đây là một cách khá hữu ích để theo dõi log mà không phải rời khỏi terminal.

## Tạo driver riêng cho Valet

Bạn có thể viết "driver" riêng cho Valet để serve các ứng dụng PHP chạy trên các framework hay CMS mà không được hỗ trợ sẵn bởi Valet. Khi bạn cài Valet, thư mục `~/.valet/Drivers` sẽ được tạo và có chứa một file `SampleValetDriver.php`. File này chứa các ví dụ minh hoạ các viết một driver như thế nào. Việc phát triển một driver chỉ yêu cầu bạn triển khai ba hàm chính: `serves`, `isStaticFile`, và `frontControllerPath`.

Cả ba hàm này đều nhận các giá trị `$sitePath`, `$siteName`, và `$uri` vào trong tham số. Tham số `$sitePath` là đường dẫn đầy đủ tới site đang được serve trên máy, ví dụ `/Users/petehouston/Sites/my-project`. Tham số `$siteName` là phần mảng "host" trên phần tên miền (`my-project`). Còn `$uri` là request URI tới site (`/foo/bar`).

Khi bạn hoàn thiện driver cho Valet, đặt vào trong thư mục `~/.valet/Drivers` sử dụng quy tắc đặt tên `FrameworkValetDriver.php`. Ví dụ nếu bạn viết driver cho WordPress thì tên file phải là `WordPressValetDriver.php`.

Hãy cùng nhau xem một ví dụ để bạn biết cách viết một driver cho Valet như thế nào.

#### Hàm `serves`

Hàm `serves` nên trả về `true` nếu driver của bạn cần xử lý request đến. Nếu không thì hãy trả về `false`. Do đó, bên trong hàm này bạn nên kiểm tra xem nếu như giá trị `$sitePath` có chứa kiểu project mà bạn muốn serve hay không.

For example, let's pretend we are writing a `WordPressValetDriver`. Our serve method might look something like this:

    /**
     * Determine if the driver serves the request.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return void
     */
    public function serves($sitePath, $siteName, $uri)
    {
        return is_dir($sitePath.'/wp-admin');
    }

#### Hàm `isStaticFile`

Hàm `isStaticFile` nên kiểm tra xem request đến một file có phải là "static", ví dụ như file ảnh or CSS. Nếu file là static, hàm cần trả về đường dẫn đầy đủ tới static file đó trên máy. Nếu request đến không phải là yêu cầu tới static file, hàm nên trả về `false`:

    /**
     * Determine if the incoming request is for a static file.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return string|false
     */
    public function isStaticFile($sitePath, $siteName, $uri)
    {
        if (file_exists($staticFilePath = $sitePath.'/public/'.$uri)) {
            return $staticFilePath;
        }

        return false;
    }

> **Note:** Hàm `isStaticFile` chỉ được gọi nếu hàm `serves` trả về `true` cho request đến và request URI không phải là `/`.

#### Hàm `frontControllerPath`

Hàm `frontControllerPath` nên trả về đường dẫn đầy đủ tới "front controller" của ứng dụng, ở đây sẽ là file "index.php" hoặc tương ứng:

    /**
     * Get the fully resolved path to the application's front controller.
     *
     * @param  string  $sitePath
     * @param  string  $siteName
     * @param  string  $uri
     * @return string
     */
    public function frontControllerPath($sitePath, $siteName, $uri)
    {
        return $sitePath.'/public/index.php';
    }

## Các câu lệnh Valet khác

Câu lệnh  | Mô tả
------------- | -------------
`valet forget` | Thực thi câu lệnh này trong một thư mục được "park" để xoá khỏi danh sách được "park".
`valet paths` | Xem tất cả các đường dẫn được "park".
`valet restart` | Khởi động lại Valet daemon.
`valet start` | Khởi động Valet daemon.
`valet stop` | Dừng Valet daemon.
`valet uninstall` | Gỡ hoàn toàn Valet daemon.

## Nguồn
- https://laravel.com/docs/5.6/valet