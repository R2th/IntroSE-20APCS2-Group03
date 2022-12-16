Trong bài viết này, chúng ta sẽ đề cập đến một cách đơn giản về sử dụng IP intelligence để 
phát hiện các kết nối không mong muốn và bảo vệ chống lại các yêu cầu không an toàn.
#### What is IP Intelligence
Khi hầu hết mọi người nghe thấy trí IP intelligence, điều bạn nghĩ đến là định vị người dùng từ địa chỉ IP của họ. Nhưng không dừng lại ở đó. IP intelligence  có thể được sử dụng để thực hiện nhiều thứ. Ví dujL:
*  Nội dung cá nhân hóa.
*  Phòng chống gian lận.
*  Tra cứu múi giờ.
*  Chuyển hướng ngôn ngữ...
*  
 Ở trên chỉ là 1 trong số ít hữu ích có thể dùng  IP intelligence.
 
Xây dựng một dịch vụ có thể làm tất cả những điều được liệt kê ở trên có thể mất rất nhiều thời gian và nguồn lực. Vi vậy ở bài viết này mình sẽ sử dụng ứng dụng bên ngoài [IPAPI](https://ipapi.com/documentation) 
 
 ##### Getting Started
 Chúng ta sẽ được xây dựng như một middleware trung gian cho ứng dụng , có nghĩa là một yêu cầu đến ứng dụng sẽ chuyển qua bộ lọc này và từ chối các tác nhân  bị nghi ngờ là không tốt.
 
  ##### Create project laravel
  Chúng ta sẽ chạy comand say để tạo mới project laravel. 
  ```
  composer create-project laravel/laravel firewall --prefer-dist
  ```
  Sau khi comand chạy xong bạn sẽ thấy một khóa bí mật có cấu trúc: `86ebc30b4adfc508e48bf1b489140fe3`. Và bạn cần thêm nó vào file `.env`
  
  ```
  IPAPI_ACCESS_KEY=86ebc30b4adfc508e48bf1b489140fe3
  ```
  Tiếp theo bạn cần mở file `config/services.php` & thêm giá trị sau:
  ```
  'ip' => [
      'key' => env('IPAPI_ACCESS_KEY'),
  ],
  ```
  
  Bạn cần cài thêm package `GuzzleHttp` cái này sẽ sử dụng khi bạn tạo một request đến  IPAPI’s của máy chủ.
  ```
  composer require guzzlehttp/guzzle
  ```
Sau đó bạn có thể xây dựng một ứng dụng trung gian.

#### Making a Request to IPAPI’s Server

Vì vậy, IPAPI cung cấp hai endpoints để chúng ta sử dụng.
* api.ipapi.com/api/<ip> nơi mà chúng ta cung cấp Ip muốn kiểm tra.
* api.ipapi.com/check sẽ đoán địa chỉ IP đến và đưa ra phản hồi (tốt hơn là các yêu cầu đến từ trình duyệt.)
Chúng ta sẽ quan tâm đến cái đầu tiên bởi vì sử dụng cái thứ hai sẽ lấy IP của máy chủ của chúng ta thay vì yêu cầu đến. Vì vậy bằng cách sử dụng cái đầu tiên,  chúng ta có thể nắm bắt IP của người dùng và chuyển tiếp nó tới IPAPI.

> Chúng ta có sẽ tạo 1 yêu cầu như:
    
```
GET https://api.ipapi.com/api/161.185.160.93?access_key=86ebc30b4adfc508e48bf1b489140fe3

```
Phản hồi trả về sẽ có dạng như sau:
```
{
    "ip": "161.185.160.93",
    "hostname": "161.185.160.93",
    "type": "ipv4",
    "continent_code": "NA",
    "continent_name": "North America",
    "country_code": "US",
    "country_name": "United States",
    "region_code": "NY",
    "region_name": "New York",
    "city": "Brooklyn",
    "zip": "11238",
    "latitude": 40.676,
    "longitude": -73.9629,
    "location": {
        "geoname_id": 5110302,
        "capital": "Washington D.C.",
        "languages": [
            {
                "code": "en",
                "name": "English",
                "native": "English"
            }
        ],
        "country_flag": "http://assets.ipapi.com/flags/us.svg",
        "country_flag_emoji": "🇺🇸",
        "country_flag_emoji_unicode": "U+1F1FA U+1F1F8",
        "calling_code": "1",
        "is_eu": false
    },
    "time_zone": {
        "id": "America/New_York",
        "current_time": "2018-09-24T05:07:10-04:00",
        "gmt_offset": -14400,
        "code": "EDT",
        "is_daylight_saving": true
    },
    "currency": {
        "code": "USD",
        "name": "US Dollar",
        "plural": "US dollars",
        "symbol": "$",
        "symbol_native": "$"
    },
    "connection": {
        "asn": 22252,
        "isp": "The City of New York"
    },
    "security": {
        "is_proxy": false,
        "proxy_type": null,
        "is_crawler": false,
        "crawler_name": null,
        "crawler_type": null,
        "is_tor": false,
        "threat_level": "low",
        "threat_types": null
    }
}
```
Chúng ta có thể thấy rằng IPAPI làm rất nhiều việc cho chúng ta.
 Tuy nhiên, đối với phạm vi bài viết này chúng ta quan tâm đến `security` về phản hồi.
 ```
 ...
     "security": {
         "is_proxy": false,
         "proxy_type": null,
         "is_crawler": false,
         "crawler_name": null,
         "crawler_type": null,
         "is_tor": false,
         "threat_level": "low",
         "threat_types": null
     } ...
 ```
 
 ##### Creating Our Middleware
Middleware là các cơ chế nằm giữa một yêu cầu đến và ứng dụng của bạn. Bạn có thể tìm hiểu thêmvề  [Middleware](https://laravel.com/docs/master/middleware) tại trang chủ của Laravel. Giúp bạn tìm hiểu kỹ hơn về middleware. 
    
Bây giờ chúng ta sẽ duy chuyển đến root của ứng dụng và chạy 
    
```
php artisan make:middleware IPFirewall
```
    
Sau khi chạy xong file config sẽ được tạo ra: `app/Http/Middlewares/IPFirewall.php` vợi nội dung như sau:
    
```
    
<?php
   
   namespace App\Http\Middleware;
   
   use Closure;
   
   class IPFirewall
   {
     /**
      * Handle an incoming request.
      *
      * @param  \Illuminate\Http\Request  $request
      * @param  \Closure  $next
      * @return mixed
      */
     public function handle($request, Closure $next)
     {
       return $next($request);
     }
   }

```

Vì vậy, để bảo vệ máy chủchúng ta có thể làm điều này:
```
public function handle($request, Closure $next)
{
    $ip = $request->ip();

    $key = config('services.ip.key');
    $url = "http://api.ipapi.com/api/{$ip}?access_key={$key}&security=1";

    // make request
    $client = new Client;
    $response = $client->request('GET', $url);
    $data = json_decode((string) $response->getBody(), true);

    if (!array_key_exists('security', $data)) {
        return false;
    }

    return $data['security']['threat_level'] === 'high' ? abort(403) : $next($request);
}
```

Từ yêu cầu trên có những lưu ý sau:
* Trước tiên chúng tôi nhận địa chỉ IP đến của người dùng 
* Sau đó, chúng ta xây dựng yêu cầu của chúng tôi để gửi tới IPAPI,
* Khi chúng tôi nhận được phản hồi từ IPAPI, chúng tôi sẽ kiểm tra xem phản hồi bảo mật có tồn tại không
* Sau đó, nếu mức độ đe dọa yêu cầu cao, chúng ta  hạn chế quyền truy cập của người dùng.
##### Improving for Performance
Các giải pháp trên không phải là thực hiện tốt nhất . Bởi vì điều này có nghĩa là yêu cầu sẽ chậm lại cho mỗi yêu cầu đến ứng dụng của chúng ta.
Bởi vậy Laravel có một class cache, chúng ta có thể sử dụng điều đó cho lợi thế của mình bằng cách sử dụng chúng

```
public function handle($request, Closure $next)
{
    $ip = $request->ip();
    $insecureRequest = Cache::remember("firewall_$ip", function() use ($ip) {
        // build parameters
        $key = config('services.ip.key');
        $url = "http://api.ipapi.com/api/{$ip}?access_key={$key}&security=1";
        // make request
        $client = new Client;
        $response = $client->request('GET', $url);
        $data = json_decode((string) $response->getBody(), true);
        if (!array_key_exists('security', $data)) {
            return false;
        }
        return $data['security']['threat_level'] === 'high' ?? false;
    });
    return $insecureRequest ? abort(403) : $next($request);
}
```


Khi gọi Cache::remember() sẽ báo cho Laravel tìm nạp một giá trị từ bộ đệm, nếu nó không tồn tại, nó sẽ chạy closure và trả lại giá trị closure vào bộ đệm.
Sử dụng địa chỉ IP làm khóa duy nhất, trước tiên, Laravel sẽ cố gắng tìm nạp trạng thái  IP. Nếu đó là yêu cầu được coi là một yêu cầu không an toàn, thì Laravel hủy bỏ. Mặt khác, yêu cầu được cho phép thông qua và chúng tôi chỉ cần thực hiện kiểm tra mỗi lần một lần.
Tài liệu tham khảo:

https://ipapi.com/documentation

https://scotch.io/tutorials/understanding-laravel-middleware

https://scotch.io/tutorials/protecting-laravel-sites-with-ip-intelligence

Bài viết của mình đến đây là hết hẹn gặp lại các bạn trong các bài viết tiếp theo. :)