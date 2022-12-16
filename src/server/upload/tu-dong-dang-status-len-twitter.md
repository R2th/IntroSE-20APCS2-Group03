Hôm nay mình xin giới thiệu cách tự động đăng bài lên twiter sử dụng php:
## Tạo token twiter
- đầu tiền bạn vào https://apps.twitter.com/ nhập mốt số thông tin cần thiết mà twiter yêu cầu để tạo một ứng dụng, khi bạn tạo xong nó sẽ chỗ ta một số token như sau:

![](https://images.viblo.asia/14570be4-300e-4a8a-9b05-eb9f4811990e.png)

Chú ý những chỗ mình bôi vàng nhé

```
- Consumer Key (API Key):
- Consumer Secret (API Secret)
- Access Token
- Access Token Secret
```

>> Chú ý khi tạo xong chưa có access token và access token secret thì bạn cần kéo xuống dưới để gennerate token này ra.

Giữ 4 cái key này lại chúng ta sẽ phải dùng ở phần sau:

## Cài đặt thư viện về:

- Nếu bạn code php thuần, hoặc project không hỗ trợ composer thì vào link https://github.com/J7mbo/twitter-api-php/blob/master/TwitterAPIExchange.php download file  TwitterAPIExchange.php về projec của bạn.
- Nếu có hỗ trợ composer như laravel chẳng hạn, bạn có thể cài đặt bằng cách: `composer require j7mbo/twitter-api-php`

## Code Thôi nào

### Setting key

Từ 4 cái key lấy được ở bước một chúng ta cần setup như sau:
```
require_once('TwitterAPIExchange.php'); // dùng use nếu sử dụng class
$settings = array(
    'oauth_access_token' => "oauth_access_token",
    'oauth_access_token_secret' => "oauth_access_token_secret",
    'consumer_key' => "consumer_key",
    'consumer_secret' => "consumer_secret"
);
```

### Upload image
- ảnh được upload lên theo dạng base64, khi upload lên api sẽ trả về cho chúng ta một cái key (id của ảnh) có thể được sử dụng sau này:
```
$requestMethod = 'POST';
$url = 'https://upload.twitter.com/1.1/media/upload.json';
$file = file_get_contents(__DIR__ . '/twitter_image3.jpg');
$media_data = base64_encode($file);
$params = array(
    'media_data' => $media_data,
    'possibly_sensitive' => false,
);
$twitter = new TwitterAPIExchange($settings);
echo $twitter->request($url, $requestMethod, $params);
```

### Up status có ảnh

```
$params = array(
    'status' => "This is test twiter auto",
    'media_ids' => 978072673317081088,
    'possibly_sensitive' => false,
);
$url = 'https://api.twitter.com/1.1/statuses/update.json';
$requestMethod, = 'POST'
 $twitter = new TwitterAPIExchange($settings);
 echo $twitter->request($url, $requestMethod, $params);
```

Chú ý mỗi status nên cách nhau khoảng 5 phút để tránh spam

### Get timeline status

1. Của User khác
```
$url    = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
$method = 'GET';
$params = '?user_id=3232926711';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->request($url, $requestMethod, $params);
```
2. Của chính mình

```
$url    = 'https://api.twitter.com/1.1/statuses/retweets_of_me.json';
$method = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->request($url, $requestMethod, $params);
```

> Nếu không call được cần check lại permission bạn đã cấp đủ chưa trong phần một nhé

Trên đây là một vài api hay dùng, ngoài ra api của twiter còn rất nhiều như update, delete status/ảnh
Các bạn có thể tham khảo thêm ở đây: https://developer.twitter.com/en/docs/api-reference-index