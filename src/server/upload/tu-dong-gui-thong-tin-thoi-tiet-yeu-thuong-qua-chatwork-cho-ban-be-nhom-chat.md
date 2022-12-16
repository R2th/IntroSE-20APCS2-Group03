Mỗi sáng thức dậy bạn có muốn nhận được tin nhắn "yêu thương", thông tin thời tiết từ một ai đó hay gửi đi cho ai đó. Bạn là lập trình viên vậy tại sao bạn không thử tự động mỗi sáng thử gửi cho ai đó các thông tin này (hoặc có thể gửi cho chính mình để tự sướng)! Haizz 
# 1. Chuẩn bị
Ý tưởng thực hiện chức năng tự động như thế này là khá đơn giản
> 1. Bạn sẽ xây dựng 1 command bằng laravel để gửi các msg qua chatwork bằng cách sử dụng các API được cung cấp bởi chatwork
> 2. Bạn setting cron job để chạy tự động nó vào mỗi sáng (có thể setting trên máy tính cá nhân và treo 24/24 :D)
- Thực hiện xây dựng lệnh (command) để gửi các message (mssg) cho chúng ta. Mình lựa chọn Laravel 5.8
- Tiếp theo là các API. Một API lấy các thông tin về thời tiết và API về chatwork để có thể gửi dữ liệu đi.
- Cron job. Một server chạy Job giúp thực hiện việc gửi msg đúng giờ :D
# 2. Tìm hiểu API
## 2.1. API chatwork
- Token hiểu một cách đơn giản nhất nó đại diện cho username và passwork để bạn có thể sử dụng các chức năng cần đăng nhập từ hệ thống. Do đó bạn cần phải có token thì mới gọi được các API mà trước đó yêu cầu bạn đăng nhập.
- Lấy API Token: Ấn vào `Trang cá nhân => API Setting.` Sau đó nhập mật khẩu để lấy được API Token thôi :D
![](https://images.viblo.asia/d2f1e497-6dac-4130-ba65-3957f8470012.png)
- Tài liệu http://download.chatwork.com/ChatWork_API_Documentation.pdf
- Để hiểu kỹ hơn mình test thử 1 API gửi msg cho bạn xem :D. Mình sử dụng API gửi msg (trang 25)
```php
curl -X POST -H "X-ChatWorkToken: Your API token" -d "body=Hello+Chatwork%21&self_unread=0"
"https://api.chatwork.com/v2/rooms/{room_id}/messages"
```
Với 
```
Token là cái bạn đã lấy ở trên
body: Nội dung tin nhắn
room_id: Phòng mà bạn sẽ gửi msg (room_id lấy ngay trên đường link URL của chatwork)
```
Kết quả là mình đã gửi được msg thành công :D
![](https://images.viblo.asia/df5afdb2-332a-4cf7-ab0e-edbef3182f71.png)
## 2.2. API thời tiết
- Với thời tiết, mình lấy API ở trang [accuweather.com](https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/daily/1day/%7BlocationKey%7D)
- Tương tự như chatwork, bạn cũng cần lập tài khoản để lấy Token. 
- Một lưu ý nữa với trang này, bạn cần tạo thêm 1 app nữa để có thể lấy được thông tin Token. Có Token, mọi thứ là ez :D
```
http://dataservice.accuweather.com/forecasts/v1/daily/1day/{locationKey}
```
locationKey Hà Nội là **353412**. Kết quả test sẽ lấy được đầy đủ các thông tin cho bạn dùng =))
![](https://images.viblo.asia/685ba9de-e14e-45be-adbc-895b617b8b98.png)

# 3. Thực hiện

## 3.1. Taọ ứng dụng laravel thôi
```
composer create-project --prefer-dist laravel/laravel selfhappy
cd selfhappy
```
Cài đặt package hỗ trợ việc lấy dữ liệu chatwork API
```
composer require wataridori/chatwork-sdk
```
Thêm alias vào app.php
```
'ChatworkSDK' => \wataridori\ChatworkSDK\ChatworkSDK::class,
```

## 3.2. Tạo command
```
php artisan make:command SendLoveMessage
```
Đăng ký command vào kernel.php
```php
/**
 * The Artisan commands provided by your application.
 *
 * @var array
 */
protected $commands = [
    SendLoveMessage::class,
];
```
Phần xử lý dữ liệu. Đầu tiên chúng ta cần lấy thông tin về room mà chúng ta muốn gửi dữ liệu. Sau đó ta sẽ gửi dữ liệu bằng API của chatwork
- Lấy thông tin về room
```php
ChatworkSDK::setApiKey(config('services.chatwork.api_key'));
$room = new ChatworkRoom(config('services.chatwork.room_id'));
```
- Lấy dữ liệu API thời tiết. Như phần hướng dẫn ở trên, ta đã có URL để lấy được dữ liệu. Chi tiết PHP có hỗ trợ xử lý curl này
https://www.php.net/manual/en/curl.examples.php

Ta sẽ có hàm lấy dữ liệu từ API thời tiết như sau
```php
public function getWeatherForeCastInformationJSON()
{
    $ch = curl_init();

    // set url
    curl_setopt($ch, CURLOPT_URL, "http://dataservice.accuweather.com/forecasts/v1/daily/1day/353412?apikey=kDJ6a6fH9jAPQUUeUSiqoSbA0Yf78AzN&language=vi&metric=true");

    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    // $output contains the output string
    $weatherInfor = json_decode(curl_exec($ch));

    // close curl resource to free up system resources
    curl_close($ch);

    return $weatherInfor;
}
```
- Có dữ liệu thời tiết rồi, giờ tạo msg để gửi thôi :D
```php
public function makeLoveMsg($weatherInfor)
{
    $loveMsg = "Dự báo thời tiết hôm nay có thể nắng, có thể mưa mà cũng có thể không nắng không mưa!!";

    if (property_exists($weatherInfor, 'Headline') && (property_exists($weatherInfor, 'DailyForecasts'))) {
        $header = $weatherInfor->Headline;
        $forecast = $weatherInfor->DailyForecasts;

        $text = $header->Text;
        $minTemperature = $forecast[0]->Temperature->Minimum->Value;
        $maxTemperature = $forecast[0]->Temperature->Maximum->Value;
        $dayWeather = $forecast[0]->Day->IconPhrase;
        $nightWeather = $forecast[0]->Night->IconPhrase;

        $loveMsg = <<<LOVEMSG
Thời tiết chung: {$text}
Nhiệt độ thấp nhất: {$minTemperature}
Nhiệt độ cao nhất: {$maxTemperature}
Nhiệt độ trong ngày: {$minTemperature} - {$maxTemperature}
Thời tiết ban ngày: {$dayWeather}
Thời tiết buổi tối: {$nightWeather}
LOVEMSG;
    }

    return $loveMsg;
}
```
- Ok kết hợp lại thành hàm handle() nào
```php
/**
 * Execute the console command.
 *
 * @return mixed
 */
public function handle()
{
    $weatherInfor = $this->getWeatherForeCastInformationJSON();

    ChatworkSDK::setApiKey(config('services.chatwork.api_key'));
    $room = new ChatworkRoom(config('services.chatwork.room_id'));

    $room->sendMessageToAll($this->makeLoveMsg($weatherInfor));
}
```
- Test thôi, chạy thử nào
```
php artisan send:love-msg
```
Và đây là kết quả nick thứ 2 của tôi nhận được
![](https://images.viblo.asia/c2591a17-6e40-46fd-9608-0975175c522d.png)
(Sáng nay mưa dông sấp mặt thật :3)
## 3.3. Task schedule
Mọi việc đã xong xuôi, công việc cuối cùng của chúng ta là cài đặt làm sao cho nó chạy tự động mà không cần "cơm" gõ lệnh như trên. Để thực hiện việc này bạn có thể sử dụng [Task Schedule](https://laravel.com/docs/5.8/scheduling) trong Laravel
- Đầu tiên bạn thêm job vào cho hệ thống
```
$ crontab -e
```
Thêm dòng lệnh sau vào 
```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```
Cron này sẽ gọi lệnh Laravel mỗi phút. Khi lệnh schedule:run được thực thi, Laravel sẽ xem command được setup và chạy cho đến khi hết
- Bước cuối, sửa hàm schedule trong Kernel để chạy theo kế hoạch thôi: (5h50 mỗi sáng nhé)
```php
/**
 * Define the application's command schedule.
 *
 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
 * @return void
 */
protected function schedule(Schedule $schedule)
{
     $schedule->command('send:love-msg')
         ->dailyAt("05:50");
}
```
* Một lưu ý nhỏ là khi setting `dailyAt`, bạn phải đưa `timezone` mysql về Việt Nam nhé. Chỉnh sửa trong file `app/config`
 ```
 'timezone' => 'Asia/Ho_Chi_Minh',
 ```
* Bạn cũng có thể thêm các tin nhắn khác cho phong phúc nội dung của mình (ví dụ check nhiệt độ nếu <20 có thể thêm nhắc nhở "Sóng phát thanh nói ngày mai lạnh lắm, vân vân và mây mây" =)))
* Mình thì áp dụng cái này để 2 nick chatwork của mình trao yêu thương với nhau (ahuhuhihi)

Chúc các bạn thành công!!
# Tài liệu tham khảo
* [Task Schedule](https://laravel.com/docs/5.8/scheduling)
* [Artisan Console](https://laravel.com/docs/5.8/artisan)
* [Chatwork API](http://download.chatwork.com/ChatWork_API_Documentation.pdf)
* [Weather API](https://developer.accuweather.com/)
* Link github: https://github.com/minhnv2306/selfhappy/pull/1