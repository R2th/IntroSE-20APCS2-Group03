# 1. Mở đầu
Xin chào các bạn, hôm nay mình sẽ chia sẻ cho mọi người cách mà mình đang giám sát log hệ thống hiện tại của mình. Cụ thể là 1 website đang xây dựng bằng Laravel, sử dụng hệ quản trị cơ sở dữ liệu là MySQL, dùng máy chủ Nginx.

Mong muốn của mình là khi có bất cứ 1 log vào thì sẽ sử dụng 1 con bot bắn dữ liệu về box Chatwork. TO những người có trách nhiệm để xử lý kịp thời. Việc này cực kì hiệu quả khi ứng dụng của bạn chạy nhiều cron job hay product có nhiều lượt truy cập từ phía người dùng.
Về cơ bản nó sẽ hoạt động như sau.

> 1. Tạo 1 box riêng chỉ dành cho việc notify hệ thống 
> 
> 2.  Monitor file laravel.log khi có phát sinh log error hoặc warning trong file này thì cần bắn notification về box

# 2. Chuẩn bị Bot

Để phục vụ cho việc bắn thông báo về chatwork trước tiên bạn phải biết về chatwork API, bạn phải tạo ra 1 nick chatwork rồi sử dụng token của nó để có thể gửi thông báo về box chat đã. 

Để lấy thông tin API Token bạn chọn `Trang cá nhân => API Setting`. Nhập mật khẩu để lấy thông tin API Token
![](https://images.viblo.asia/da03c3c1-ee2f-4986-9169-9e941c8be128.png)

Ở đây mình có dùng thêm 1 thư viện chatwork do anh @Tran Duc Thang có tên là `ChatworkSDK` để dễ dàng cho việc gửi tin nhắn. 
Tải package thông qua composer
```
composer require wataridori/chatwork-sdk
```
Thêm alias vào file app.php ở thư mục config của laravel
```
'ChatworkSDK' => \wataridori\ChatworkSDK\ChatworkSDK::class,
```
Việc cuối cùng là tạo ra một room chat trên chatwork để thực việc việc lưu trữ thông báo. 
# 3. Triển khai

Vậy coi như đã xong phần setup, giờ mình sẽ tìm đến class `Handler` nằm trong thư mục `app\Exceptions`, thư mục này có 2 hàm chính.

1. `public function report(Exception $exception)`: Report hoặc log một exception.
2. `public function render($request, Exception $exception)`: Render một exception.

Đúng cái mình cần đây rồi, ở đây mình sẽ viết đoạn xử lí gửi thông báo về chatwork ở hàm `render`.

Để cho chuyên nghiệp mình có tạo ra một trait `MonitorExceptionHandlerTrait` nhằm thực hiện việc quản lií và gửi thông báo này.
Mình use MonitorExceptionHandlerTrait trong class Handler
```php
use App\Traits\MonitorExceptionHandlerTrait;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    use MonitorExceptionHandlerTrait;
    ...
    
    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $this->sendExceptionToChatWork($exception);

        return parent::render($request, $exception);
    }
}
```
Ở đây mình gọi đến hàm `sendExceptionToChatWork` từ trait `MonitorExceptionHandlerTrait` nằm trong thư mục App\Traits do mình tự tạo.

Hàm `sendExceptionToChatWork` trong Trait mình xử lí như sau.
```php
<?php
namespace Framgia\Gmt\Traits;

use wataridori\ChatworkSDK\ChatworkSDK;
use wataridori\ChatworkSDK\ChatworkRoom;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use wataridori\ChatworkSDK\Exception\RequestFailException;

trait MonitorExceptionHandlerTrait
{
    /**
     * Send Exception To ChatWork
     *
     * @param \Exception $exception
     *
     * @return mixed
     */
    protected function sendExceptionToChatWork($exception)
    {
        try {
            // If have more case should use switch case
            if ($exception instanceof ValidationException || $exception instanceof AuthenticationException) {
                return false;
            }
            $message = $this->getTemplateMessage($exception);
            ChatworkSDK::setApiKey(config('services.chatwork.api_key'));
            $room = new ChatworkRoom(config('services.chatwork.room_id_sos'));
            $members = $room->getMembers();
            $admins = [];

            foreach ($members as $member) {
                if ($member->role === config('services.chatwork.role.admin')) {
                    array_push($admins, $member);
                }
            }

            return $room->sendMessageToList($admins, $message);
        } catch (RequestFailException $ex) {
            throw $ex->getMessage();
        }
    }

    /**
     * Get Template Message Exception
     *
     * @param \Exception $e
     *
     * @return string
     */
    protected function getTemplateMessage($e)
    {
        return '[info][title]Bug in ' . env('APP_ENV') . '[/title][code]Message: ' . $e->getMessage()
        . ' in file ' . $e->getFile()
        . ' line ' . $e->getLine()
        . '[/code][/info]';
    }
}
```
Mình xin giải thích một chút về logic code.
1. Tất cả những Exception về `ValidationException` và `AuthenticationException` sẽ không bắn log về chatwork để đỡ gây spam
2. Tạo ra 1 template để hiện thị thông báo cho rõ ràng hơn ở hàm `getTemplateMessage`, đảm bảo có thể đọc được lỗi gây ra là gì, dòng bao nhiêu, trên môi trường nào (staging hay product)
3. Set API Key để đảm bảo chatbot có thể thực hiện được việc gửi tin nhắn.
4. Tạo ra room chat sau đó lấy ra thông tin member trong room chat. **Ở đây mình lọc ra những member có role là admin thì mới TO trên chatwork.**
5. Sử dụng hàm `sendMessageToList` để gửi thông báo.

Vậy là xong, bây giờ thì xem thành quả mỗi khi có bug trên hệ thống nhé 
![](https://images.viblo.asia/c2f3c423-3fa2-459a-83d4-baba60816b18.png)
Done, vậy là đã thông báo bug kịp thời từ hệ thống, việc còn lại của bạn là fix bug =)))))))))))))
# 4. Bonus
Hiện tại mình mới chỉ giám sát log của tầng Laravel, trong hệ thống thực tế có thể còn chết bởi tầng Nginx hoặc do Mysql. Để đảm bảo có thể phản hổi được một cách nhanh chóng thiết nghĩ phải tạo thêm 1 service nữa lắng nghe và đọc cái error log này từ hệ thống.

Mình đang nghĩ tới việc dùng node js để đọc những file log này. Về cơ bản ý tưởng sẽ như sau.
> 1. Monitor file error log của Nginx để bắn notification về box, vì sẽ có trường hợp chết ở tầng Nginx chưa vào đến tầng Application (Laravel)
> 2. Setting và Monitor MySQL slow log, phát hiện và tìm ra những câu query chậm (quá 2s chẳng hạn) thì bắn notification về để có thể note lại phục vụ cho việc Refactor
 
 Các bạn biết thêm cách nào có thể để lại ý tưởng bên dưới nha.

# 5. Tài liệu tham khảo
- [Doc Chatwork API](http://download.chatwork.com/ChatWork_API_Documentation.pdf)