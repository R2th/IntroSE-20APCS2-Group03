Chào mọi người, mình có chút nghiên cứu về cách convert từ trang web sang PDF qua khá nhiều tool linux, package nhưng có nhiều vấn đề như CSS không apply, giao diện bị bể, ... và mình đã tìm thấy HeadlessChrome làm mình khá ấn tượng. 

Nay mình muốn chia sẻ lại với mọi người chút kinh nghiệm sau khi sài HeadlessChrome, mời mọi người cùng theo dõi nhé.
## I. Ý tưởng
Về phần ý tưởng tại sao mình lại dùng HeadlessChrome thì có nguyên nhân là tool này được phát triển bởi Google, thực chất ra đó chính là core của Chrome được chuyển đổi thành dòng lệnh để khởi tạo. 

Vậy nên mình sẽ generate ra command tương ứng để xử lý convert từ trang web thành file PDF.

Các bạn có thể tìm hiểu tại: [Headless Chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)

## II. Chuẩn bị
Trong phạm vi bài viết này, mình có sử dụng: 
- Laravel
- google-chrome cho ubuntu hoặc google-chrome-stable cho (linux server)

## III. Cài đặt
### 3.1 Google-chrome-stable
Thông thường các bạn dùng ubuntu thì sẽ cài google chrome rồi nên mình sẽ hướng dẫn cài đặt google-chrome-stable trên linux server:

Các bạn mở terminal và thực hiện chạy các commands dưới đây:
```
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add - 
sudo sh -c 'echo "deb https://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
sudo apt-get update
sudo apt-get install google-chrome-stable
```
OK, như vậy đã cài đặt xong google-chrome
### 3.2 Init Laravel project
Việc cài đặt laravel quá dễ dàng rùi, các bạn có thể vào [Install laravel](https://laravel.com/docs/5.8/installation) để cài đặt nhé
```
composer create-project --prefer-dist laravel/laravel laravel58 "5.8.*"
```
Và start laravel serve lên:
```
php artisan serve
```
Sau đó chúng ta mở browser và truy cập http://127.0.0.1:8000 sẽ thấy trang chủ quen thuộc laravel:
![Laravel demo](https://images.viblo.asia/8cf0e16a-f000-434f-acc2-076f58f71f30.png)

### 3.3 Set env
Để chạy được chrome command thì bạn cần phải khai báo bin PATH của chrome, mình sẽ set nó ra file `.env`:
```
#Đối với ubuntu
BIN_CHROME_PATH=/usr/bin/google-chrome

#Đối với linux server
BIN_CHROME_PATH=/opt/google/chrome/google-chrome
```

## IV. Code xử lý
### 4.1 Route
- File `web.php`:
```
Route::get('/', function () {
    return view('home');
});
Route::post('process', 'HomeController@convert')->name('pdf.convert');
```

### 4.2 Controller
- File `HomeController.php`:
```
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function convert(Request $request)
    {
        try {
            $url = $request->url;

            //Cần thêm http cho domain thì mới request được
            $domain = $this->addHttp($url);
            $domainOrigin = $this->getDomainOrigin($url);
            $descPath = public_path($domainOrigin . '.pdf');

            $binPath = env('BIN_CHROME_PATH');
            $command = "$binPath '--print-to-pdf'='$descPath' '--headless' '--disable-gpu' '--incognito' '--enable-viewport' '$domain'";
            
            //Full command: /usr/bin/google-chrome '--print-to-pdf'='/var/www/html/laravel58/public/google.com.pdf' '--headless' '--disable-gpu' '--incognito' '--enable-viewport' 'http://google.com' 
            exec($command, $output);

            return asset($domainOrigin . '.pdf');
        } catch (\Exception $e) {
            return redirect()->back();
        }
    }

    private function addHttp($url)
    {
        $parsed = parse_url($url);
        if (empty($parsed['scheme'])) {
            $url = 'http://' . ltrim($url, '/');
        }

        return $url;
    }

    private function getDomainOrigin($domain)
    {
        $domain = trim($domain);

        $domain = str_replace(["https://", 'http://', 'http://www.', 'https://www.', 'www.'], '', $domain);
        $domain = strtolower(explode('/', $domain)[0]);

        return $domain;
    }
}
```

### 4.3 View
- File `home.blade.php`:
```
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>
</head>
<body>
<div class="flex-center position-ref full-height">
    <div class="content">
        <form action="{{route('pdf.convert')}}" method="post">
            {{csrf_field()}}

            <input type="text" name="url" placeholder="www.example.com">
            <button>Convert</button>
        </form>
    </div>
</div>
</body>
</html>

```
## V. Kết quả
![Convert webpage to pdf](https://images.viblo.asia/3a4acd89-2c92-4305-8330-32a9af487389.gif)

Thật dễ dàng phải không nào :heart_eyes:
Như vậy, mình đã hướng dẫn xong cho các bạn cách convert từ 1 trang web sang PDF rất nhanh chóng, chỉ trong 10'. Hy vọng các bạn sẽ làm được nó.
Thanks you.

### Tài liệu tham khảo
1. [https://developers.google.com/web/updates/2017/04/headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome)
2. [https://github.com/DaanDeSmedt/PHPHeadlessChrome](https://github.com/DaanDeSmedt/PHPHeadlessChrome)