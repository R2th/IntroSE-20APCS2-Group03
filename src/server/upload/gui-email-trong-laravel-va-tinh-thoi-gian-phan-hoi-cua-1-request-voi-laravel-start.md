***Xem thêm*** : [***Công nghệ web và dịch vụ trực tuyến***](https://www.tailieubkhn.com/2021/10/cong-nghe-web-va-dich-vu-truc-tuyen.html)
## Tính thời gian phản hồi của 1 request với LARAVEL_START

Các bạn để ý thì trong file `public/index.php` thì có một hằng `LARAVEL_START` được định nghĩa: 

```php
define('LARAVEL_START', microtime(true));
```

Vì thế đây là câu lệnh đầu tiên được thực hiện khi một request được gửi tới từ phía máy khách, nó đánh dấu thời gian bắt đầu nhận request.

Vậy `LARAVEL_START` có thể sử dụng để tính thời gian phản hồi của một request hoặc là thời gian cho tới một thời điểm nào đó.

Để tính thời gian phản hồi chúng có có thể sử dụng kết hợp thêm hàm `terminate` của `Middleware`, tạo một `TerminatingMiddleware` như sau: 

```php
<?php  
  
namespace App\Http\Middleware;  
  
use App\Jobs\LogFileJob;  
use Closure;  
use Symfony\Component\HttpFoundation\Request;  
use Symfony\Component\HttpFoundation\Response;  
use Symfony\Component\HttpKernel\TerminableInterface;  
  
class TerminatingMiddleware implements TerminableInterface  
{  
    protected $startTime;  
  
    /**  
     * Handle an incoming request.     
	 *     
	 * @param \Illuminate\Http\Request $request  
     * @param Closure $next  
     * @return mixed  
     */    
	public function handle(\Illuminate\Http\Request $request, Closure $next)  
    {        
		return $next($request);  
    }  
  
    public function terminate(Request $request, Response $response)  
    {        
		$totalTimeRequest = microtime(true) - LARAVEL_START;
    }
}
```

sau đó thêm `TerminatingMiddleware` vào `$middleware` tại file `app\Http\Kernel.php` để bất cứ request nào cũng đi qua `Middleware` này: 

```php
protected $middleware = [  
    TrustProxies::class,  
    CheckForMaintenanceMode::class,  
    ValidatePostSize::class,  
    TrimStrings::class,  
    ConvertEmptyStringsToNull::class,  
    HandleCors::class,  
    TerminatingMiddleware::class  
];
```

Cuối cùng bạn có thể lưu `$totalTimeRequest` lại đâu đó như database hay log. Nhưng có một vấn đề các bạn cần để ý khi xử lý như những vấn đề liên quan tới hiệu năng khi mà chúng ta thêm vào trong quá trình trả ra response cho người dùng một đoạn xử lý.

## Gửi email sử dụng template mặc định trong Laravel

Khi tạo một mail trong Laravel thì bạn phải viết những file view bằng blade. Việc tự viết sẽ vừa tốn công và cũng có thể không đẹp, để tiết kiệm thời gian chúng ta có thể sử dụng luôn template măc định.

Ví dụ việc dùng blade ([source](https://laravel.com/docs/9.x/mail#configuring-the-sender)): 

```php
/**

* Build the message.

*

* @return $this

*/

public function build()

{

	return $this->from('example@example.com', 'Example')

				->view('emails.orders.shipped');

}
```


Ví dụ về dùng template mặc định: 

```php

public function build(): RegisterEmailSuccessMail  
{  
	 return $this->html((new MailMessage())  
	 	->greeting("Hello")  
	 	->line("Welcome to Helpers")  
	 	->action("Go to", "https://php-laravel-helpers.github.io/")  
	 	->render())  
	 	->subject("This your email");  
}
```