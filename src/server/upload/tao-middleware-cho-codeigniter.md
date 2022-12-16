## Giới Thiệu
CodeIgniteI (CI) là một PHP MVC framework ra mắt từ khá lâu, bao gồm các chức năng và thư viện cơ bản của một framework. Mặc dù hiện tại framework này không còn phổ biến, nhưng nó vẫn phù hợp cho những bạn mới tìm hiểu về Framework và mô hình MVC trong PHP.

Gần đây, mình đang làm một dự án liên quan đến CI, nên đã viết một vài thư viện phục vụ cho dự án. Trong bài viết này mình sẽ chia sẻ cách tạo middleware cho CodeIgniter.

Ví dụ chúng ta có một Controller là Home, các middleware là auth (kiểm tra người dùng đã đăng nhập chưa) và is_admin (kiểm tra người dùng có phải là admin không).

## Tạo middleware library
```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Middleware
{
    protected $middlewares = [];
    protected $tmp_middlewares = [];

    private $ci;

    public function __construct()
    {
        $this->ci = &get_instance();
    }

    /**
     * Middleware
     *
     * @param array|string $middleware Middleware
     */
    public function add()
    {
        $args = func_get_args();

        if (count($args) >= 1 && is_array($args[0])) {
            $args = $args[0];
        }

        $middlewares = $args;

        if (!empty($this->tmp_middlewares)) {
            $this->middlewares = array_merge($this->middlewares, $this->tmp_middlewares);
            $this->tmp_middlewares = [];
        }

        if (!is_array($middlewares)) {
            $middlewares = [$middlewares];
        }

        foreach ($middlewares as $_middleware) {
            if (!is_string($_middleware)) {
                show_error('Invalid middlware!');
            }

            if (strpos($_middleware, ':') !== false) {
                list($method, $params) = explode(':', $_middleware);

                if (!method_exists($this->ci, $method)) {
                    show_error(sprintf(
                        'Middleare %s does not exists!',
                        $method
                    ));
                }

                if (strpos($params, ',') !== false) {
                    $params = explode(',', $params);
                } else {
                    $params = [$params];
                }
            } else {
                $method = $_middleware;
                $params = [];
            }

            $except = $only = [];

            $this->tmp_middlewares[] = compact('method', 'params', 'except', 'only');
        }

        return $this;
    }

    public function only()
    {
        $this->add_filter('only', func_get_args());
    }

    public function except()
    {
        $this->add_filter('except', func_get_args());
    }

    private function add_filter($type, $args)
    {
        if (count($args) >= 1 && is_array($args[0])) {
            $value = $args[0];
        } else {
            $value = $args;
        }

        if (!empty($this->tmp_middlewares)) {
            foreach ($this->tmp_middlewares as $_middleware) {
                $this->middlewares[] = array_merge($_middleware, [
                    $type => $value,
                ]);
            }
        }

        $this->tmp_middlewares = [];
    }

    public function handle()
    {
        $middlewares = array_merge($this->middlewares, $this->tmp_middlewares);

        if (empty($middlewares)) {
            return;
        }

        $method = $this->ci->router->method;

        foreach ($middlewares as $middleware) {
            // check except method
            if (!empty($middleware['except'])
                && in_array($method, $middleware['except'])
            ) {
                continue;
            }

            // check only method
            if (!empty($middleware['only'])
                && !in_array($method, $middleware['only'])
            ) {
                continue;
            }

            call_user_func_array([$this->ci, $middleware['method']], $middleware['params']);
        }
    }
}
```

## Autoload middleware
Thêm `Middleware` library vào `application/config/autoload.php`
```php
$autoload['libraries'] = [
    'middleware',
];
```

## Tạo middleware functions
Chúng ta sẽ tạo các middleware function ở My_Controller.php trong thư mục appication/core.
```php
<?php

class MY_Controller extends CI_Controller
{
    public function auth()
    {
        if ($this->session->has_userdata('user_id')) {
            return;
        }

        redirect('/home/login');
    }

    public function guest()
    {
        if (!$this->session->has_userdata('user_id')) {
            redirect('/home');
        }

        return;
    }

    public function is_admin()
    {
        if ($this->session->has_userdata('is_admin')) {
            return;
        }

        redirect('/home');
    }
}
```

## Hook
CodeIgniter có một cơ chế gọi là hook. Hook cho phép chạy các function trong các giai đoạn xử lý của CI.
Đối với middleware, mình sử dụng hook **post_controller_constructor** - chạy ngay sau khi controller được khởi tạo, và trước khi gọi đến method.

Để tạo hook, tạo file Controller_hooks.php trong thư mục application/hooks
```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Controller_hooks
{
    public function middleware()
    {
        $ci = &get_instance();

        $ci->middleware->handle();
    }
}
```

Để cài đặt hook, mở file application/config/hooks.php
```php
$hook['post_controller_constructor'][] = [
        'class' => 'Controller_hooks',
        'function' => 'middleware',
        'filename' => 'Controller_hooks.php',
        'filepath' => 'hooks',
        'params' => []
];
```

## Gọi middleware vào controller
```php
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends MY_Controller
{
    public function __construct()
    {
        parent::__construct();

        $this->middleware->add('auth')->only('index');
        $this->middleware->add('guest')->only('login');
        $this->middleware->add('auth', 'is_admin')->only('dashboard');
    }

    public function index()
    {
        // Trang hiển thị khi người dùng đã đăng nhập
    }

    public function login()
    {
        // Trang hiển thị cho người dùng chưa đăng nhập
    }

    public function dashboard()
    {
        // Trang hiển thị cho admin
    }
}
```

## Kết
Trên đây là cách viết middleware đơn giản cho CI. Hi vọng bài viết sẽ có ích cho bạn!