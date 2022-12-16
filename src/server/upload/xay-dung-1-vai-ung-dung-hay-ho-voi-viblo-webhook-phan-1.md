# Giới thiệu
  Chào các bạn , Hôm nay rảnh dỗi ngồi lướt viblo thì thấy  viblo có chức năng webhook. Các bạn có thể tham khảo chức năng đó ở đây https://viblo.asia/settings/webhooks, Tất nhiên là phải đăng nhập trước nhé. Webhook này sẽ send 1 payload về server của chúng ta mỗi khi có bài viết mới từ tác giả mà bạn following (We will send JSON payload when the authors you are following publish a new post). Vì vậy mình có ý tưởng xây dựng 1 ứng dụng có các chức năng cơ bản sau:
# Các chức năng của ứng dụng
Khi có bài viết mới từ tác giả mà mình following thì ứng dụng sẽ: 
### 1. Tự động lưu lại các link bài viết (Phần 1)
Chức năng này cho phép chúng ta lưu lại các link bài viết của những người mà ta tâm đắc (following). Giúp nhanh chóng trong việc tìm kiếm và tránh bị trôi bài. Cũng có thể coi đây như 1 ứng dụng để lữu chữ các link hay hưu ích. Lưu ý là mình chỉ lưu link thôi nhé . không crawl dữ liệu của bài viết để tôn trong tác giả.
### 2. Tự động thông báo lên chatwork (Phần 1)
Ở đây mình sẽ tạo 1 con bot để thông báo realtime đến chatwork  mỗi khi có bài viết từ tác giả mình yêu thích. Và có khi mình lại là người view đầu tiên (hanhphuc) :heart_eyes::heart_eyes::heart_eyes:
### 3. Tự động thông báo lên slack (Phần 2)
Như chức năng số 2 nhưng là trên slack.
### 4. Tự động share bài viết lên Facebook (Hoàn thành OKR) (Phần 2)
Và con người ai có gì tốt đẹp cũng muốn khoe với bạn bè, sống ảo trên facebook cả. Và có link hay thì mình cũng muốn  share lên Facebook biết đâu bạn bè mình cũng hứng thú với bài đó thì sao.:+1::+1::+1:

Ở phần 1 này mình sẽ làm 2 chức năng đầu tiên. 2 chức năng tiếp theo mình sẽ viết tiếp ở phần 2 nhé !
# Setup Viblo webhook
Đâu tiên mình truy cập vào trang https://viblo.asia/settings/webhooks để setup.

![](https://images.viblo.asia/9c0fd25c-ff65-42ba-8e85-dfc6e73bbbda.png)

Target Url : là enpoint mà mà viblo sẽ gửi payload đến mỗi khi có bài viết mới. Ở đây mình dùng https://localhost.run/ để tạo url ảo kết nối đến localhost ở máy mình. và enpoint là `/get-post-viblo`.

Vậy là xong .chúng ta xem qua cấu trúc của payload : 

```json
{
    "action": "new_post",
    "receiver": { //Thông tin của mình
        "id": 1,
        "username": "username",
        "name": "fullname"
    },
    "data": {
        "post": { // Thông tin của bài post
            "url": "https://viblo.asia/p/hash_post",
            "title": "this is post title",
            "author": { // Thông tin của tác giả
                "id": 1,
                "username": "username",
                "name": "fullname"
            },
            "published_at": 1576719727000 // Thời gian public
        }
    }
}
```
# Cài đặt Dependencies 
Vì có làm việc với chatwork lên mình sẽ cái đặt thư viện `ChatworkSDK`  
```
composer require wataridori/chatwork-sdk
```
# Migrate dữ liệu
Tiếp theo mình tạo bảng để lưu trữ link bài viết: 

Mình chạy lệnh:
```
php artisan make:model Models/Post -m
```

Để tạo ra model và migration cho bảng post

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('author_id');
            $table->string('author_name');
            $table->string('author_username');
            $table->string('title');
            $table->string('url');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
```

File model :

```Models/Post.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'author_id',
        'author_name',
        'author_username',
        'title',
        'url',
    ];
}

```

Vậy là xong và không quên chạy lệnh 

```
php artisan migrate
```
Để tạo bảng.
# Tạo bot chatwork
Để phục vụ cho việc bắn thông báo về chatwork . Mình tạo ra 1 nick chatwork rồi sử dụng token của nó để có thể gửi thông báo về box chat .

Để lấy thông tin API Token bạn chọn Trang cá nhân => API Setting. Nhập mật khẩu để lấy thông tin API Token 
![](https://images.viblo.asia/17d199b2-edaa-41e4-a7d5-dccfec6621eb.png)

Sau đó mình tạo ra box chat và add nick real của mình vào.

![](https://images.viblo.asia/4818c75a-6f46-43fb-b34d-a88a2d3f1a49.png)


Sau khi lấy được token và id room thì mình thêm 2 biến này ở trong file .env

```.env
CHATWORK_API_KEY=
CHATWORK_ROOM_ID=
```

CHATWORK_API_KEY: là key mình vừa lấy được.

CHATWORK_ROOM_ID: là ID box chat mình vừa tạo ra.
# Triển khai
Tiếp theo mình sẽ tạo ra 2 job để thực hiện 2 chức năng là lưu vào db và thông báo trên chatwork:

```
php artisan make:job SavePost
```

Job này để thực hiện lưu link bài post vào db:

```App/Jobs/SavePost.php
<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SavePost implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $post;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($post)
    {
        $this->post = $post;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $author =  $this->post['author'];

        Post::create([
            'author_id' => $author['id'],
            'author_name' => $author['name'],
            'author_username' => $author['username'],
            'title' => $this->post['title'],
            'url' => $this->post['url'],
        ]);
    }
}

```

Tiếp theo là Job `SendToChatwork`
```
php artisan make:job SendToChatwork
```

```App/Jobs/SendToChatwork.php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use wataridori\ChatworkSDK\ChatworkSDK;
use wataridori\ChatworkSDK\ChatworkRoom;
use wataridori\ChatworkSDK\Exception\RequestFailException;

class SendToChatwork implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $post;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($post)
    {
        $this->post = collect($post);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            $message = $this->getTemplateMessage();
            ChatworkSDK::setApiKey(env('CHATWORK_API_KEY'));
            $room = new ChatworkRoom(env('CHATWORK_ROOM_ID'));
            $members = $room->getMembers();

            return $room->sendMessageToAll($message);
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
    protected function getTemplateMessage()
    {
        $authorName = $this->post['author']['name'];
        $title = $this->post['title'];
        $url = $this->post['url'];
        return '[info][title] Có bài viết mới từ ' . $authorName . '[/title][code]Bài viết: ' . $title
        . ' Link ' . $url
        . '[/code][/info]';
    }
}

```

Vậy là xong :joy::joy::joy::joy:

Tiếp theo mình chỉ cần dispatch 2 Job này ở controller nữa là xong

```App/Http/Controllers/PostController.php
<?php

namespace App\Http\Controllers;

use App\Jobs\SavePost;
use App\Jobs\SendToChatwork;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $payload = $request->all();
        $post = $payload['data']['post'];

        dispatch(new SavePost($post));
        dispatch(new SendToChatwork($post));
    }
}

```
# Thành quả
Mình thử ấn nút Test ở https://viblo.asia/settings/webhooks xem có gì xảy ra không nhé! 

Và Data đã thêm được vào db: 

![](https://images.viblo.asia/a142ca46-442f-4e95-8ac7-7566f20cb17e.png)

Và chatwork cũng gửi thông báo có bài viết mới cho mình: 

![](https://images.viblo.asia/74050a5a-a667-4d15-9189-2e18287f04b5.png)

# Kết luận

Vậy là mình đã viêt xong 2 chức năng cho ứng dụng của mình. ở phần sau mình sẽ làm thêm chức năng thông báo qua slack và tự động share bài lên Facebook. Nếu thấy hay thì cho mình 1 upvote ạ. nếu có góp ý xin để lại comment. gạch đá cũng xin nhận ạ . :heart_eyes::heart_eyes::heart_eyes::heart_eyes: