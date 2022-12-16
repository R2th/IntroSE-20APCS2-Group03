Trên thực tế chúng ta rất hay gặp những đường link được rút gọn có dạng https://goo.gl/xyz, đó là nền tẳng link rút gọn của google, nhưng hiện tại google sẽ bỏ domain goo.gl này đi, họ thông báo chỉ support firebase shorter url mà thôi.
Khi vào trang của của goo.gl bạn sẽ nhận đc thông báo sau:

> Starting March 30, 2018, we will be turning down support for goo.gl URL shortener. From April 13, 2018 only existing users will be able to create short links on the goo.gl console. You will be able to view your analytics data and download your short link information in csv format for up to one year, until March 30, 2019, when we will discontinue goo.gl. Previously created links will continue to redirect to their intended destination. Please see this blog post for more details.

## Tạo app trên google firebase

Đầu tiên bạn vào trang https://console.firebase.google.com/u/0/ rồi tạo một app cho mình:

![](https://images.viblo.asia/8558534f-e911-4082-b216-16c1d478a4f7.png)

Sau đó điền tên project, đồng ý với điều khoản của google để tạo app.

![](https://images.viblo.asia/232b3592-fd7d-47d9-a91a-130d8ea0be95.png)

Cuối cùng bạn vào trang quản trị project của mình, tiếp theo click vào button setting, chọn project setting sẽ nhìn thấy key api bạn cần:

![](https://images.viblo.asia/e654ce2a-52c4-4b21-b2ce-7891f1b4223e.png)

bạn lấy key này đặt vào config của mình:

Tiếp theo vào `Dynamic Links` điền vào subdomain bạn muốn sử dụng, ở đây mình điền là `viblo` sẽ dc link short là `viblo.page.link`, cái này sẽ được sử dụng ở phần sau.

## Create short link

Trong bài viết này mình sửa dụng php + laravel làm ví dụ, với framework hay ngôn ngữ khác cách làm cũng tương tự.

function tạo link khá đơn giản như sau:

```php
  public static function makeShortUrl($fullUrl)
    {
        try {
            $client = New GuzzleHttp\Client();
            $apiShorter = 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=' . config('shorty.api_key');

            $data = $client->post($apiShorter, [
                'headers' => [
                    'Content-Type' => 'application/json'
                ],
                'json' => [
                    'dynamicLinkInfo' => [
                        'dynamicLinkDomain' => 'viblo.page.link',
                        'link' => $fullUrl
                    ],
                    'suffix' => [
                        'option' => 'SHORT'
                    ]
                ]
            ]);

            $data = $data->getBody()->getContents();

            return json_decode($data)->shortLink;
        } catch (\Exception $exception) {
            \Log::debug($exception);
        }

        return null;
    }
```

> Trong function này mình sử dụng ` "guzzlehttp/guzzle": "^6.2",` bạn cần add nó vào composer.json sau đó chạy install để lấy thư viện này về.

> Thay ` config('shorty.api_key')` bằng key của bạn lấy dc ở trên

> `viblo.page.link` là link bạn tạo ở phần 1.

> Khi tạo thành công nó sẽ trả cho bạn một đường link rút gọn có dạng `viblo.page.link/omCi`

## Lấy số lượng click từ short link

Phần này mình cũng tìm hiểu khá nhiều, nhưng chưa có cách nào lấy dc số lượng click từ google firabase ngay lập tức, mà phải chạy job để nó lấy về theo ngày mà thôi, như google thông báo là cần tới 24 -> 36h để cập nhập số click vào

Trong phần này mình sử dụng thư viện google client, bạn có thể tham khảo cách cài và lấy key ở đây: https://developers.google.com/people/quickstart/php

- Tạo một job có tên là GetClick có nội dung như sau:

```php
<?php

namespace App\Console\Commands;

use App\Models\Link;
use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;

class GetClick extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firebase:getClick';

    protected $mainFireBaseApi = 'https://firebasedynamiclinks.googleapis.com/v1/';

    const LIMIT = 300; // lấy số lượng mỗi lần chạy

    const DURATIONS_DAY = 1; // lấy theo ngày

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'get click from google firebase';

    /**
     * Create a new command instance.
     *
     * @return void
     */

    protected $shortUrl;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     */
    public function handle()
    {
        $this->getLink();
    }

    public function getLink()
    {
        Link::select(['short_url', 'id'])
            ->orderBy('id', 'desc')
            ->chunk(self::LIMIT, function ($items) {
                $arr = [];
                foreach ($items as $key => $item) {
                    $totalClick = $this->getClickFromFireBase($item->short_url);
                    if (!$totalClick) {
                        continue;
                    }

                    $arr[$key]['link_id'] = $item->id;
                    $arr[$key]['total_click'] = $totalClick;
                }

                if (!empty($arr)) {
                    $this->saveClick($arr);
                }
            });
    }

    public function getClickFromFireBase($short_url)
    {
        $client = new \Google_Client();
        $client->addScope(\Google_Service_FirebaseDynamicLinks::FIREBASE);
        $client->setAuthConfig(config_path('key.json')); // key này bạn sẽ lấy dc trong hướng dẫn của google client phía bên trên
        $client->fetchAccessTokenWithAssertion();

        $authorization = 'Authorization: Bearer ' . $client->getAccessToken()['access_token'];
        $url = $this->mainFireBaseApi . urlencode($short_url) . '/linkStats?durationDays=' . self::DURATIONS_DAY;
        \Log::debug('====== get click from url ======', [$url]);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $ret = curl_exec($ch);

        if (!$clicks = json_decode($ret, true)) {
            \Log::debug('====== not have click ======', [$ret]);
            return 0;
        }

        $totalClick = 0;
        foreach ($clicks['linkEventStats'] as $click) {
            if ($click['event'] == 'CLICK') {
                $totalClick += $click['count'];
            }
        }

        return $totalClick;
    }

    public function saveClick($data)
    {
        \Log::debug('====== count click ======', $data);
        DB::table('clicks')->insert($data);
    }
}
```

Giả sử ở đây mình có bảng links (id, short_url) và bang clicks(link_id, total_click)

> Chạy file này bằng lệnh `php artisan firebase:getClick` .
> Firebase sẽ lấy được lượng click đến từ mobile (android, IOS), pc ...


## Tham khảo.

- https://developers.google.com/people/quickstart/php
- https://firebase.google.com/docs/dynamic-links/rest