Chatbot là một chương trình máy tính tương tác với người dùng bằng ngôn ngữ tự nhiên dưới một giao diện đơn giản, âm thanh hoặc dưới dạng tin nhắn.
Chatbot giúp người dùng có thể tương tác với website cuả bạn một cách thân thiện hơn.

### BotMan là gì?
BotMan là 1 framework agnostic của PHP Chatbot và được thiết kế để đơn giản hóa việt phát triển các botchat trên nhiều nền tảng messaging khác nhau như Slack, Telegram, Microsoft Bot Framework, Nexmo, HipChat, Facebook Messenger, WeChat...
>Trong IT, `agnostic` là 1 thuật ngữ dùng để đề cập đến 1 cái gì đó có thể tương tác giữa nhiều hệ thống khác nhau.
### BotMan Studio là gì?
BotMan Studio là 1 package của BotMan và Laravel cung cấp các công cụ để kiểm tra, triển khai các trình điều khiển web và các công cụ hổ trợ cài đặt và cấu hình dễ dàng hơn.
BotMan Studio cung cấp một danh sách drivers giúp bạn có thể tương tác với chatbot thông qua Facebook Messenger, slack ...

# Cài đặt BotMan
### Yêu cầu
Đang sử dụng phiên bản PHP >= 7.1.3

Đã cài đặt Laravel global thông qua composer.

### Cài đặt trình cài đặt BotMan thông qua composer.
```rust
composer global require "botman/installer"
```
# Tạo BotMan project
Tạo project Botman và laravel sử dụng composer
```shell
composer create-project --prefer-dist botman/studio TestBotMan
```
Sau khi chạy xong thì 1 thư mục mới tên là `TestBotMan` bao gồm các thành phần cần thiết để làm việc với BotMan Studio và Laravel.
# Chạy thử Chatbot
Sau khi cài đặt thành công, bạn có thể dùng thử ngay ứng dụng chatbot bằng cách vào thư mục mà bạn đã tạo project. Mở terminal lên và chạy lệnh sau để start server php.
```markdown
php artisan serve
```
Sau đó bạn vào trình duyệt và gõ địa chỉ local `http://127.0.0.1:8000` và sẽ thấy màn hình sau xuất hiện.
![](https://images.viblo.asia/b6964ef2-dfa7-4315-93be-3f48a3136b24.png)

BotMan Studio cung cấp BotMan web driver cho phép bạn phát triển và kiểm tra chatbot cục bộ đó là tinker.
Bạn có thể sử dụng tinker bằng cách truy cập vào địa chỉ `http://127.0.0.1:8000/botman/tinker`, và sẽ thấy một khung chat đơn giản viết bằng Vuejs giúp bạn có thể giao tiếp ngay với bot của minh. Thử gõ `hi` hoặc `start conversation` vào ô input bạn sẽ thấy kết quả sau.
![](https://images.viblo.asia/25f6ca05-41b0-4ace-81d9-02439162155f.png)

# Hearing Messages
Mở file `routes/botman.php` ra bạn sẽ thấy đoạn code sau.
```php
<?php
use App\Http\Controllers\BotManController;

$botman = resolve('botman');

$botman->hears('Hi', function ($bot) {
    $bot->reply('Hello!');
});
$botman->hears('Start conversation', BotManController::class.'@startConversation');
```

### Basic Commands
Chatbot sử dụng cú pháp 
```php
$botman->hears('Hi', function ($bot) {
    $bot->reply('Hello');
});
```
để lắng nghe đoạn message mà bạn gửi đến và thực hiện 1 hành động nào đó. Bạn có thể chỉ định các lệnh này bằng cách cung cấp một chuỗi mà chatbot của bạn sẽ lắng nghe, theo sau là một chuỗi các hoạt động được thực thi khi message gửi đến khớp với chuỗi mà bạn cung cấp. Ở đoạn code trên, khi message nhập vào là `Hi` thì sẽ được chatbot lắng nghe và trả lời `Hello`.

Ngoài ra, bạn củng có thể tạo các controller và gọi các phương thức trong đó tương tự như route/web của Laravel
```php
class ChatBotController extends Controller
{
    public function handle($bot) {
        $bot->reply('Hello World');
    }
}
```
```php
use App\Http\Controllers\ChatBotController;

$botman->hears('hello', ChatBotController::class.'@handle');
```
### Command parameters 
Đôi khi bạn sẽ cần phải nắm bắt các phần thông tin mà người dùng bot của bạn cung cấp. Ví dụ như tên người dùng... 
```perl
$botman->hears('call me {name}', function ($bot, $name) {
    $bot->reply('Your name is: '.$name);
});
```
Khi người dùng nhập vào `call me Thành` thì chatbot sẽ trả lời là `Your name is: Thành`.

Dĩ nhiên là bạn có thể định nghĩa nhiều tham số.
```perl
$botman->hears('call me {name} the {adjective}', function ($bot, $name, $adjective) {
    $bot->reply('Hello '.$name.'. You truly are '.$adjective);
});
```
Các tham số luôn luôn nằm trong `{}` và chỉ bao gồm các kí tự chữ cái.

### Matching Regular Expressions
Nếu các command parameters không đủ linh hoạt thì có thể sử dụng biểu thức chính quy.

Ví dụ, bạn chỉ muốn bot của mình lắng nghe các chữ số.
```shell
$botman->hears('I want ([0-9]+)', function ($bot, $number) {
    $bot->reply('You will get: '.$number);
});
```
Cũng giống như command parameters, mỗi nhóm Regular Expressions sẽ được xử lý riêng. Vì vậy, bạn phải chia Regular Expressions thành các nhóm riêng biệt với nhau bằng cặp dấu `()`.
```perl
$botman->hears('I want ([0-9]+) portions of (Cheese|Cake)', function ($bot, $amount, $dish) {
    $bot->reply('You will get '.$amount.' portions of '.$dish.' served shortly.');
});
```
# Tạo một conversation đơn giản. 
Khi sử dụng chatbot không ai lại muốn sử dụng với các đoạn chat đơn lẻ như trên mà thay vào đó bạn sẽ sử dụng những đoạn hội thoại giúp người dùng có thể giao tiếp với chatbot thân thiện hơn. BotMan Studio cung cấp `conversations` giúp làm được điều đó một cách dễ dàng.
### Bắt đầu Conversation
Bạn có thể bắt đầu conversation của mình bằng cách gọi phương thức `startConversation` trong hàm callback.
```html
$botman->hears('Hello', function($bot) {
    $bot->startConversation(new DemoConversation);
});
```
Sau đó vào thư mục `app\Conversations` và tạo file `DemoConversation.php` và dán đoạn code sau vào.
```php
<?php

namespace App\Conversations;

use Illuminate\Foundation\Inspiring;
use BotMan\BotMan\Messages\Incoming\Answer;
use BotMan\BotMan\Messages\Outgoing\Question;
use BotMan\BotMan\Messages\Outgoing\Actions\Button;
use BotMan\BotMan\Messages\Conversations\Conversation;

class DemoConversation extends Conversation
{
    protected $firstname;

    protected $email;

    public function askFirstname()
    {
        $this->ask('Hello! What is your firstname?', function(Answer $answer) {
            // Save result
            $this->firstname = $answer->getText();

            $this->say('Nice to meet you '.$this->firstname);
            $this->askEmail();
        });
    }

    public function askEmail()
    {
        $this->ask('One more thing - what is your email?', function(Answer $answer) {
            // Save result
            $this->email = $answer->getText();

            $this->say('Great - that is all we need, '.$this->firstname);
        });
    }

    public function run()
    {
        // This will be called immediately
        $this->askFirstname();
    }
}

```

Tất cả các bot conversations muốn sử dụng được thì cần phải extent từ abstract Conversation và implements phương thức `run`.
Doạn code trên tạo 1 conversation đơn giản để thu thập tên và email người dùng

![](https://images.viblo.asia/27730881-b293-45dd-adbb-873a070f46ad.gif)
Khi bạn xây dựng nhiều cuộc hội thoại hơn, có lẽ bạn cũng muốn kết nối chúng với nhau, bạn có thể bắt đầu một conversation khác bằng cách sử dụng hàm `startConversation`.
```
public function askEmail()
{
	$this->ask('One more thing - what is your email?', function(Answer $answer) {
		// Save result
		$this->email = $answer->getText();

		$this->say('Great - that is all we need, '.$this->firstname);

		$this->bot->startConversation(new Demo2Conversation());
	});
}
```
### Asking Questions
BotMan cung cấp cho bạn hai cách để đặt câu hỏi cho người dùng. 
**Sử dụng chuỗi**
```php
public function askUser()
{
    $this->ask('How are you?', function (Answer $response) {
        $this->say('Cool - you said ' . $response->getText());
    });
}
```
**Sử dụng Question object**
```php
public function askForDatabase()
{
    $question = Question::create('Do you need a database?')
        ->fallback('Unable to create a new database')
        ->callbackId('create_database')
        ->addButtons([
            Button::create('Of course')->value('yes'),
            Button::create('Hell no!')->value('no'),
        ]);

    $this->ask($question, function (Answer $answer) {
        // Detect if button was clicked:
        if ($answer->isInteractiveMessageReply()) {
            $selectedValue = $answer->getValue(); // will be either 'yes' or 'no'
            $selectedText = $answer->getText(); // will be either 'Of course' or 'Hell no!'
        }
    });
}
```
Có thể sử dụng các Question object để tạo các tin nhắn có chứa các button để tương tác với người dùng. Khi truyền Question object vào trong phương thức ask() thì đối tượng Answer được trả về sẽ có 1 phương thức tên là `isInteractiveMessageReply()` để phát hiện khi người dùng nhập tin nhắn hoặc tương tác với các button tạo bởi Question.
### Asking For Images, Videos, Audio or Location
Với botman thì bạn củng có thể dễ dàng để bot của minh nhận Images, Videos, Audio hoặc Location.

Có thể sử dụng phương thức `askForImages` để hỏi người dùng bot của bạn một câu hỏi và chỉ chấp nhận một hoặc nhiều hình ảnh làm câu trả lời.
```php
public function askPhoto()
{
    $this->askForImages('Please upload an image.', function ($images) {
        // $images contains an array with all images.
    });
}
```
Hàm callback lại sẽ nhận được một mảng chứa tất cả hình ảnh mà người dùng đã gửi cho bot. Theo mặc định, nếu người dùng không gửi lên hình ảnh hợp lệ, câu hỏi sẽ được lặp lại.

Nhưng bạn củng có thể  cấu hình cho bot nhận thêm message string bằng cách thêm một hàm callback làm tham số thứ 3.

```javascript
// ...inside the conversation object...
public function askPhoto()
{
    $this->askForImages('Please upload an image.', function ($images) {
        //
    }, function(Answer $answer) {
        // This method is called when no valid image was provided.
    });
}
```
Các phương thức `askForVideos`, `askForAudio`, `askForLocation` củng tương tự như phương thức `askForImages`.
```php
public function askVideos()
{
    $this->askForVideos('Please upload a video.', function ($videos) {
        // $videos is an array containing all uploaded videos.
    });
}

public function askAudio()
{
    $this->askForAudio('Please upload an audio file.', function ($audio) {
        // $audio is an array containing all uploaded audio files.
    });
}

public function askLocation()
{
    $this->askForLocation('Please tell me your location.', function (Location $location) {
        // $location is a Location object with the latitude / longitude.
    });
}
```
> Bài này mình chỉ giới thiệu cách sử dụng BotMan trong laravel và 1 vài cú pháp đơn giản. Bài sau mình sẽ hướng dẩn cách sử dụng Facebook Driver để kết nối chatbot của bạn với Facebook Message.
> 
> Tài liệu tham khảo: https://botman.io/2.0/welcome