Từ trước đến nay khi sử dụng framework, mình rất thích sự kế thừa view engine. Nó giúp mình rất nhiều trong việc phân chia layout, cảm giác code rất mạch lạc và tiện lợi. Tò mò và tìm tòi, hôm nay mình xin chia sẻ với mọi người cách tạo ra một template engine siêu "smart" mà đơn giản cho ae. **Let's go**

## Khởi tạo
Đầu tiên, chúng ta hãy tạo một project với cấu trúc như sau:

---

:arrow_right:

---

:arrow_right:

--- 

:arrow_right:

À mà project chỉ đơn giản là một file `template.php` thôi.

```php:template.php
<?php
class Template {
    /**
     * 
     * Thư mục views.
     * 
     */
    private $__directory;
    
    /**
     * 
     * Layout của views.
     * Thuộc tính này sẽ có giá trị là view parent - view cần kế thừa của view đang được gọi. 
     * @default null
     * 
     */
    private $__layout;
    
    /**
     * 
     * Các section của layout. VD: content, sidebar, header, footer,... Nói chung ai dùng fw rồi đều sẽ biết
     * 
     */
    private $__sections;
    
    /**
     * 
     * section hiện tại đang xét.
     * @default null
     * 
     */
    private $__current_section;
    
    /**
     * 
     * Ham khoi tao
     * 
     */
    public function __construct()
    {
        // code
    }
    
    /**
     * 
     * Hàm load view
     * 
     * @param string $view_name Tên view cần load
     * @param array $args Các tham số cần truyền qua view
     * 
     * @return string
     * 
     */
    public function render(string $view_name, array $args)
    {
        // code
    }
    
    /**
     * 
     * Include một view trong một view
     * 
     * @param string $view_name Tên view cần include (giống include file php trong php đó)
     * 
     * 
     */
    public function include(string $view_name)
    {
        // code
    }
    
    /**
     * 
     * Hàm bắt đầu một section
     * 
     * @param string $name Tên của section.
     * 
     */
    public function section(string $name)
    {
        // code
    }
    
    /**
     * 
     * Hàm kết thúc một section
     * 
     */
    public function end()
    {
        // code
    }
    
    /**
     * 
     * Hàm kế thùa layout trong views
     * 
     * @param string $layout Layout cần kế thừa
     * 
     */
    public function layout(string $layout)
    {
        // code
    }
    
    /**
     * 
     * Hàm xác định vị trí section sẽ được render trong file layout view
     * 
     * @param string $name Tên section cần render
     * 
     * 
     */
    public function renderSection(string $name)
    {
        // code
    }
}
```

À code trên chỉ là khởi tạo file class `template.php` , mình đã giải thích kĩ các biến và phương thức trong class Template. Sau đây sẽ code chi tiết từng hàm.

---
## Code
**Hàm khởi tạo**
```php:template.php
public function __construct($directory)
{
    $this->__setDirectory($directory);
    $this->__sections = [];
    $this->__layout = null;
    $this->__current_section = null;
}

/**
 * 
 * Hàm set thư mục views
 * 
 * @param string $directory Thư mục views
 * 
 */
private function __setDirectory(string $directory)
{
    if (!is_dir($directory)) {
        throw new Exception("$directory is not exist");
    }
    $this->__directory = $directory;
}

/**
 * 
 * Hàm kiểm tra đường dẫn của file view
 * 
 * @param string $path Đường dẫn của file. Đuôi file sẽ là .php
 * 
 * @return string 
 * 
 */
private function __resolvePath(string $path)
{
    $file = $this->__directory . '/' . $path . '.php';
    if (!file_exists($file)) {
        throw new Exception("$file is not exist");
    }
    return $file;
}
    
```

---

**Tiếp đến hàm include**. Hàm này cũng khá đơn giản nhưng các bạn cần phải hiểu rõ về `output buffering`. Các bạn có thể tham khảo về buffer tại [php.net](https://www.php.net/manual/en/ref.outcontrol.php)

```php:template.php
/**
 * 
 * Include một view trong một view
 * 
 * @param string $view_name Tên view cần include (giống include file php trong php đó)
 * 
 * 
 */
public function include(string $view_name)
{
    ob_start();

    include_once $this->__resolvePath($view_name);

    $content = ob_get_contents();

    ob_end_clean();

    echo $content;
}
```

Hàm **section** và **end**. Chúng ta sẽ lấy đoạn mã HTML (XML) ở giữa hàm section và end
```php:template.php
/**
 * 
 * Hàm bắt đầu một section
 * 
 * @param string $name Tên của section.
 * 
 */
public function section(string $name)
{
    $this->__current_section = $name;
    ob_start();
}

/**
 * 
 * Hàm kết thúc một section
 * 
 */
public function end()
{
    if (empty($this->__current_section)) {
        throw new Exception("There is not a section start");
    }

    $content = ob_get_contents();

    ob_end_clean();

    $this->__sections[$this->__current_section] = $content;

    $this->__current_section = null;
}
```

Hàm **layout** và **renderSection** lại càng đơn giản.
```php:template.php
/**
 * 
 * Hàm kế thùa layout trong views
 * 
 * @param string $layout Layout cần kế thừa
 * 
 */
public function layout(string $layout)
{
    $this->__layout = $layout;
}

/**
 * 
 * Hàm xác định vị trí section sẽ được render trong file layout view
 * 
 * @param string $name Tên section cần render
 * 
 * 
 */
public function renderSection(string $name)
{
     echo $this->__sections[$name];
}
```
Cuối cùng là hàm **render** một view. Hàm này sẽ gọi đến các hàm section và end trước sau đó sẽ kế thừa layout, cuối cùng trả về một string là file HTML (XML) hoàn chỉnh.
```php:template.php
/**
 * 
 * Hàm load view
 * 
 * @param string $view_name Tên view cần load
 * @param array $args Các tham số cần truyền qua view
 * 
 * @return string
 * 
 */
public function render(string $view_name, array $args)
{
    if (is_array($args)) {
        extract($args);
    }

    ob_start();

    include_once $this->__resolvePath($view_name);

    $content = ob_get_clean();

    if (empty($this->__layout)) {
        return $content;
    }

    ob_clean();

    include_once $this->__resolvePath($this->__layout);

    $output = ob_get_contents();

    ob_end_clean();

    return $output;
}
```

ok. vậy là xong code template engine. Bây giờ test thử xem sao.
## Gọi Template Engine
Đầu tiên ta tạo một file `~/views/layout.php`.
> Lưu ý: trong template engine này, mình sử dụng đuôi file view là **.php**. Các bạn có thể tùy chỉnh đuôi file này trong hàm **__resolvePath** file `template.php` ở trên

```php:~/views/layout.php
<html>
<head>
    <title>Demo</title>
</head>
<body>
    <?php $this->renderSection('sidebar'); ?>
    <br/>
    <?php $this->renderSection('content'); ?>
</body>
</html>

```
Tiếp đến ta tạo một file view `~/views/profile.php`
```php:~/views/profile.php
<?php $this->layout('template') ?>

<?php $this->section('content'); ?>
    <h1>User Profile</h1>
    <p>Hello, <?php echo $name; ?></p>
<?php $this->end(); ?>

<?php $this->section('sidebar'); ?>
    <h2>Sidebar</h2>
<?php $this->end(); ?>
```
Trong file `index.php` (file bạn cần gọi view đó).
```php:~/index.php
<?php

// set thư mục views là ~/views
$template = new Template('/views');
echo $template->render('profile', ['name' => 'Jocelyn']);
```

Ok. Các bạn chạy thử file `~/index.php` và tận hưởng thành quả. 

## Tổng kết
Tự tạo một template engine không khó, quan trọng là các bạn phải hiểu rõ `output buffering` trong PHP.  :kissing_heart: [https://www.php.net/manual/en/ref.outcontrol.php](https://www.php.net/manual/en/ref.outcontrol.php)