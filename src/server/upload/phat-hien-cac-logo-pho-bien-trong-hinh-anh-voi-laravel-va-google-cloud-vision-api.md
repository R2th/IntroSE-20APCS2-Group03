# **1.Introduction**
Hôm nay mình sẽ giới thiệu đến mọi người chức năng **Detecting Logos** của **API Google Cloud Cloud Vision**,  giúp chúng ta phát hiện các logo phổ biến trong các hình ảnh của mình bằng **Laravel**.
Để đọc thêm về **Detecting Logos** thì các bạn truy cập ở đây nhé [ **Detecting Logos**](https://cloud.google.com/vision/docs/detecting-logos?hl=vi)
# **2.Prerequisites**
 Để sử dụng bản dùng thử free API cloud thì bạn làm theo hướng dẫn ở  đây nhé [create API KEY](https://viblo.asia/p/xay-dung-ung-dung-trich-xuat-van-ban-tu-hinh-anh-voi-laravel-va-google-cloud-vision-api-4P85634LKY3)
# **3.Getting Started**
Sau khi đã hoàn thành việc tạo **API KEY** ở trên, thì chúng ta tiến hành tạo 1 project ứng dụng của mình:
```
composer create-project --prefer-dist laravel/laravel detect-logo-project "5.7.*"
```

![](https://images.viblo.asia/b4e626b4-a675-4096-aea1-8fb3604401f7.png)

Sau khi chúng ta tạo xong project, di chuyển đến thư mục chứa project và chạy lệnh sau để cài đăt [package google-cloud-vision-php](https://github.com/wapnen/google-cloud-vision-php)

```
composer require wapnen/google-cloud-vision-php
```

![](https://images.viblo.asia/b0a43f4d-b4f1-483f-96a0-bbdd05528f58.png)

Setting **GOOGLE CLOUD KEY API** bạn lấy được ở lúc tạo **API KEY** vào file .env như sau:
```
GOOGLE_CLOUD_KEY=your_api_key
```
Tiến hành tạo 1 controller để xử lý phát hiện logo:

```
php artisan make:controller DetectLogoController
```
Khai báo trong file **routes/web**
```
Route::get('/upload', 'DetectLogoController@upload')->name('detect.upload');
Route::post('/detect', 'DetectLogoController@detect')->name('detect.detect');
```

Tạo view hiển thị form upload hình ảnh **upload.blade**.php
```
<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{__('Image to text converter with Laravel and Google Cloud Vision')}}</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <!-- Styles -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
          integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
</head>
<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">{{ __('DETECT LOGO Project') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</nav>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Detect logo with Laravel and Google Cloud Vision') }}</div>
                <div class="card-body">
                    @if (session('error'))
                        <div class="alert alert-danger">{{ session('error') }}</div>
                    @endif
                    <form role="form" method="POST" action="{{ route('detect.detect') }}"
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
Cập nhật logic xử lý cho **DetectLogoController**:
```
<?php

namespace App\Http\Controllers;

use Exception;
use GoogleCloudVision\GoogleCloudVision;
use GoogleCloudVision\Request\AnnotateImageRequest;
use Illuminate\Http\Request;

class DetectLogoController extends Controller
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
     * detect logo
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function detect(Request $request)
    {
        try {
            if ($request->file('image')) {
                $fileName = time() . '.' . request()->image->getClientOriginalExtension();
                $request->image->move(public_path('images'), $fileName);
                $output = imagecreatefromjpeg(public_path("images/{$fileName}"));
                $image = base64_encode(file_get_contents(public_path("images/{$fileName}")));

                $request = new AnnotateImageRequest();
                $request->setImage($image);
                $request->setFeature("LOGO_DETECTION");

                $gcvRequest = new GoogleCloudVision([$request], env('GOOGLE_CLOUD_KEY'));
                $responses = $gcvRequest->annotate();
                $results = $responses->responses[0]->logoAnnotations;

                foreach ($results as $logo) {
                    $vertices = $logo->boundingPoly->vertices;
                    $x1 = $vertices[0]->x;
                    $y1 = $vertices[0]->y;
                    $x2 = $vertices[2]->x;
                    $y2 = $vertices[2]->y;
                    imagerectangle($output, $x1, $y1, $x2, $y2, 0x00ff00);
                }

                header('Content-Type: image/jpeg');
                imagejpeg($output);
                imagedestroy($output);
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
```
Tiến hành upload 1 ảnh có chứa logo, đây là link ảnh mình đã sử dụng để test. 

![](https://images.viblo.asia/86680fc3-2623-4ec1-89c5-09ffb6cb04a8.jpg)

![](https://images.viblo.asia/975dc9ac-9997-425b-9f5e-2aa6a4b092d5.png)

Kết quả sau khi đã xử lý:

![](https://images.viblo.asia/a3ee1a1d-b84e-40de-a7ae-cd4b0ba00a3e.png)
# **5.Conclusion**
Hy vọng bài viết này sẽ giúp ích cho các bạn khi cần phát hiện các logo phổ biến trong các hình ảnh nào đó, thông qua bài viết này các bạn có thể sử dụng  [Detecting Faces](https://cloud.google.com/vision/docs/detecting-faces?hl=vi) để nhận dạng khuôn mặt trong hình ảnh của bạn!