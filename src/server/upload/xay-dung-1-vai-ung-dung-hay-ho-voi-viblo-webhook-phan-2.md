# Mở đầu
Ở [Phần 1](https://viblo.asia/p/xay-dung-1-vai-ung-dung-hay-ho-voi-viblo-webhook-phan-1-ByEZkxoylQ0) Mình đã nói về việc viblo có chức năng webhook. Webhook này sẽ send 1 payload về server của chúng ta mỗi khi có bài viết mới từ tác giả mà bạn following (We will send JSON payload when the authors you are following publish a new post). Và mình đã có làm 2 chức năng : Tự động lưu lại các link bài viết  và Tự động thông báo lên chatwork.

Ở phần này mình sẽ thực hiện chức năng Tự động share bài viết lên fanpage Facebook khi có bài viết mới của tác giả mình đang follow.

# Tự động share bài viết lên fanpage Facebook

## Cài đặt Dependencies
Thêm 2 package hỗ trợ việc giao tiếp với facebook. Thêm laravel/socialite và facebook/graph-sdk vào file composer.json file: 

```composer.json
    "require": {
        "facebook/graph-sdk": "^5.6",
    },
```

Và chạy lệnh : 

```
composer install
```

## Bước 1: Tạo một Facebook App.

Các bạn có thể vào trang https://developers.facebook.com để tạo 1 facebook app. ở đây mình đã tạo sẵn 1 app. 

![](https://images.viblo.asia/58ab17e6-919e-48fc-ae9b-2106f95f65e1.png)

Ngoài ra mình cũng có tạo một [fanpage](https://www.facebook.com/codesimple/) để test. 

## Bước 2: Lấy token và id page
Để có thể đăng bài hay quan lý panpage thì bạn cần phải có token của facebook đối với fanpage đó bạn có thể vào trang https://developers.facebook.com/tools/explorer để tạo:

![](https://images.viblo.asia/1153311a-3a2b-4393-95ff-0057ae00ad79.png)

Ở phần `Facebook App` mình chọn đến app mình vừa tạo. 
phần `User or page` bạn chọn fanpage bạn đang quản lý và muốn đăng. Ở phần `permission` bạn cần tối thiểu 2 quyền là : `manage_pages` và `publish_page` nhé. Sau đó submit và copy lại `Access Token`


Tiếp theo là lấy id page. thì mình làm theo các bước hướng dẫn của fb : 
1. From News Feed, click Pages in the left side menu.
2. Click your Page name to go to your Page.
3. Click About in the left column. If you don't see About in the left column, click See More.
4. Scroll down to find your Page ID below More Info.

![](https://images.viblo.asia/031eec6c-7701-4cfe-9332-ef6789371de2.png)

ok. mình đã có id và token của page mình muốn đăng rồi. Mình lưu lại 2 thông số này vào file .env

```.env
    FACEBOOK_PAGE_ID = page_id
    FACEBOOK_PAGE_TOKEN = page_token
```

## Bước 3: Tạo job đăng lên fanpage mỗi khi có bài viết mới

Chạy lệnh  `php artisan make:job SendToFacebook` để tạo ra job.

Tiến hành viết code: 

```App\Jobs\SendToFacebook.php
<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Facebook\Exceptions\FacebookSDKException;
use Facebook\Facebook;

class SendToFacebook implements ShouldQueue
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
    public function handle(Facebook $fb)
    {
        $pageId = env('FACEBOOK_PAGE_ID');
        $pageToken = env('FACEBOOK_PAGE_TOKEN');

        try {
            $post = $fb->post('/' . $pageId . '/feed', array('message' => $this->getTemplateMessage()), $pageToken);
     
            $post = $post->getGraphNode()->asArray();
        } catch (FacebookSDKException $e) {
            dd($e); // handle exception
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
        return $title .' => của Tác giả '. $authorName . ' ' . $url;
    }
}


```

## Bước 4: Dispatch job vừa tạo trong controller

Ở phần trước mình có dispatch 2 job `SavePost` và `SendToChatwork` . nay mình thêm job vừa viết nữa là `SendToFacebook` 

```PostController.php
<?php

namespace App\Http\Controllers;

use App\Jobs\SavePost;
use App\Jobs\SendToChatwork;
use App\Jobs\SendToFacebook;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $payload = $request->all();
        $post = $payload['data']['post'];

        dispatch(new SavePost($post));
        dispatch(new SendToChatwork($post));
        dispatch(new SendToFacebook($post));
    }
}

```
## Bước 5: Test
Mình thử ấn nút Test ở https://viblo.asia/settings/webhooks xem có gì xảy ra không nhé!

Và kết quả là : 
![](https://images.viblo.asia/252fac55-4c6a-4b76-aad2-60a3fd04f870.png)

Mỗi khi có bài viết mới từ tác giả mình đang theo dõi trên viblo là lập tức sẽ được share lại lên fanpage của chính mình. :+1::+1::+1::heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes::heart_eyes:

# Kết luận
Vậy là mình đã viêt xong chức năng  tự động share bài lên Facebook. Nếu thấy hay thì cho mình 1 upvote ạ. Thân ái và quyết thắng. 😍😍😍😍