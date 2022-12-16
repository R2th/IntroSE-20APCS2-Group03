# **1.Introduction**
Hôm nay mình sẽ giới thiệu đến mọi người chức năng **Web detection tutorial** của **API Google Cloud Cloud Vision**,  nó sử dụng Google Image Search để tìm kiếm các thực thể trong ảnh của bạn để so khớp và các ảnh tương tự có sẵn trên web. API sẽ trả về một danh sách các thuộc tính và URL liên quan đến hình ảnh như sau:

* full Matching Images
* partial Matching Images
* pages With Matching Images
* visually Similar Images

Để đọc thêm về **Web detection tutorial** thì các bạn truy cập ở đây nhé ! [ **Web detection tutorial**](https://cloud.google.com/vision/docs/internet-detection?authuser=2&hl=vi)
# **2.Prerequisites**
 Để sử dụng bản dùng thử free API cloud thì bạn làm theo hướng dẫn ở  đây nhé [create API KEY](https://viblo.asia/p/xay-dung-ung-dung-trich-xuat-van-ban-tu-hinh-anh-voi-laravel-va-google-cloud-vision-api-4P85634LKY3)
# **3.Getting Started**
Sau khi đã hoàn thành việc tạo **API KEY** ở trên, thì chúng ta tiến hành tạo 1 project ứng dụng của mình, ở đây mình dùng **Laravel**
```
composer create-project --prefer-dist laravel/laravel web-detect-project "5.7.*"
```

Sau khi chúng ta tạo xong project, di chuyển đến thư mục chứa project và chạy lệnh sau để cài đăt [package google-cloud-vision-php](https://github.com/wapnen/google-cloud-vision-php)

```
composer require wapnen/google-cloud-vision-php
```

Setting **GOOGLE CLOUD KEY API** bạn lấy được ở lúc tạo **API KEY** vào file .env như sau:
```
GOOGLE_CLOUD_KEY=your_api_key
```

Tiến hành tạo 1 controller để xử lý detect:

```
php artisan make:controller WebDetectController
```
Khai báo trong file **routes/web**
```
Route::get('/upload', 'WebDetectController@upload')->name('web.upload');
Route::post('/annotations', 'WebDetectController@detect')->name('web.detect');
```

Tạo view hiển thị form upload hình ảnh **upload.blade**.php
```
<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{__('Web Detect with Laravel and Google Cloud Vision')}}</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <!-- Styles -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{ __('Web Detect Project') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</nav>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Search the web for more data on your image with Laravel and Google Cloud Vision') }}</div>
                <div class="card-body">
                    @if (session('error'))
                        <div class="alert alert-danger">{{ session('error') }}</div>
                    @endif
                    <form role="form" method="POST" action="{{ route('web.detect') }}"
                          enctype="multipart/form-data">
                        @csrf
                        <div class="form-group row">
                            <label for="email"
                                   class="col-sm-4 col-form-label text-md-right">{{ __('Upload image') }}</label>
                            <div class="col-md-6">
                                <input id="image" type="file"
                                       class="form-control{{ $errors->has('image') ? ' is-invalid' : '' }}" name="image"
                                       value="{{ old('image') }}" required autofocus>
                                @if ($errors->has('image'))
                                    <span class="invalid-feedback">
                                              <strong>{{ $errors->first('image') }}</strong>
                                          </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group row mb-0">
                            <div class="col-md-8 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Detect') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous">
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous">
</script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
        integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T"
        crossorigin="anonymous">
</script>
</html>
```
Cập nhật logic xử lý cho **WebDetectController**:
```
<?php

namespace App\Http\Controllers;

use Exception;
use GoogleCloudVision\GoogleCloudVision;
use GoogleCloudVision\Request\AnnotateImageRequest;
use Illuminate\Http\Request;

class WebDetectController extends Controller
{
    /**
     * display Form
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function upload()
    {
        return view('upload');
    }

    /**
     * detect image
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
   public function detect(Request $request)
    {
        try {
            if ($request->file('image')) {
                $image = base64_encode(file_get_contents($request->file('image')));

                $request = new AnnotateImageRequest();
                $request->setImage($image);
                $request->setFeature("WEB_DETECTION");

                $gcvRequest = new GoogleCloudVision([$request], env('GOOGLE_CLOUD_KEY'));
                $responses = $gcvRequest->annotate();

                $result = [
                    'full Matching Images' => $responses->responses[0]->webDetection->fullMatchingImages[0]->url,
                    'pages With Matching Images' => $responses->responses[0]->webDetection->pagesWithMatchingImages[0]->url,
                    'visually Similar Images' => $responses->responses[0]->webDetection->visuallySimilarImages[0]->url
                ];

                echo json_encode($result);
            }
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
```
# **4.Testing**
Run server:
```
php artisan serve
http://127.0.0.1:8000/upload
```

Upload [image](http://2.bp.blogspot.com/-3QFcsa0kJFE/TjLxF5MgbHI/AAAAAAAADZE/mp6gmJbmZDo/s400/puente+25.jpg) để test thôi nào!

![](https://images.viblo.asia/6b96e90d-6304-4478-9420-14c1c21b458f.png)

Kết quả sau khi đã xử lý
```
{
full Matching Images: "http://ekladata.com/Lt57p90HirciLKcOAGFxiz3Sa-M.jpg",
pages With Matching Images: "http://wikimapia.org/2135836/25-de-Abril-Bridge-former-Ponte-Salazar",
visually Similar Images: "https://www.portugalresident.com/wp-content/uploads/bfi_thumb/5407694024_2da87766e9_b-32kmgjlrmrspty0r3ato3sgnko44j96tr9pq4zm5t1ep2l8xq.jpg"
}
```