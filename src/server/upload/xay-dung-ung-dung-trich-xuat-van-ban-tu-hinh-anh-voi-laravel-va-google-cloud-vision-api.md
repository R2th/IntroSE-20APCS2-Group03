# **1.Introduction**
Bạn đã bao giờ tự hỏi làm thế nào để trích xuất văn bản từ một hình ảnh chưa? chắc ẳn ai trong chúng ta cũng sẽ sử dụng các tool online hoặc sử dụng các extension, package, phần mềm để làm điều này, như mình thì đang dùng extension  **Project Naptha** của trình duyệt **chrome** để xử lý nhanh gọn vấn đề này, nhưng đôi khi kết quả  trả về không như mong đợi, thôi thì ta tự xây dựng ứng dụng cho mình vậy! 

Trong bài viết này, mình sẽ hướng dẫn cho bạn cách trích xuất văn bản trực tiếp từ hình ảnh thông qua  **API Google Cloud Cloud Vision**.  API mạnh mẽ này còn cho phép chúng ta thực hiện các chức năng phổ biến khác như:

* Phát hiện các logo phổ biến.
* Khả năng phát hiện tất cả các loại áp dụng cho một hình ảnh.
* Chạy Safe Search Detection để gắn cờ cho các hình ảnh có chứa nội dung người lớn hoặc bạo lực.

Bạn muốn đọc thêm tài liệu về Api này thì truy cập tại đường link sau: [google cloud vision api](https://cloud.google.com/vision/)

# **2.Prerequisites**
* Để sử dụng bản dùng thử free API cloud thì bạn làm theo hướng dẫn ở [đây](https://techmaster.vn/posts/35060/Ho%C3%A0ng%20Quang%20Huy) , Điều quan trọng ở đây là bạn cần phải khai báo một phương thức thanh toán (Payment method), chẳng hạn thông qua VISA để kiểm tra đảm bảo các thông tin bạn khai báo là chính xác. 1$ sẽ bị trừ khỏi tài khoản của bạn, nhưng google sẽ trả lại bạn 1$ sau đó vài phút.
* Tiếp theo tạo 1 Google cloud console project tại [đây](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project)
* Tạo 1 API KEY Google cloud console project để call API này, Nhấn vào [đây](https://cloud.google.com/docs/authentication/api-keys?hl=en&visit_id=636888672435545194-3013023238&rd=1) để xem cách tạo API KEY của bạn.
* Enable API KEY vừa tạo theo link [này](https://cloud.google.com/vision/docs/before-you-begin)

Sau khi cac bạn đã get được API KEY thì có thể test thử xem nó đã ok chưa nhé, sử dụng curl:
```
curl -v -s -H "Content-Type: application/json" \
    https://vision.googleapis.com/v1/images:annotate?key=API_KEY \
    --data-binary @request.json
```
Nếu nó trả về như thế này thì ok rồi đấy:
![](https://images.viblo.asia/4521f9c4-a6a2-4984-a3ea-71c847ceac81.png)
# **3.Getting Started**
Sau khi đã hoàn thành việc tạo API KEY ở trên, thì chúng ta tiến hành tạo 1 project ứng dụng của mình, ở đây mình dùng  **laravel**

```
composer create-project --prefer-dist laravel/laravel ocr-project "5.7.*"
```

![](https://images.viblo.asia/2efdaaea-3762-4f7b-a05f-27dcf9b9c82a.png)
Sau khi chúng ta tạo xong project, di chuyển đến thư mục chứa project và chạy lệnh sau để cài đăt package [google-cloud-vision-php](https://packagist.org/packages/wapnen/google-cloud-vision-php)

```
composer require wapnen/google-cloud-vision-php
```
Setting **GOOGLE CLOUD KEY API**  bạn lấy được ở lúc tạo API KEY vào file **.env** như sau:
```
GOOGLE_CLOUD_KEY=your_api_key
```
Tiến hành tạo 1 controller để xử lý trích xuất hình ảnh:
```
php artisan make:controller AnnotationController
```
Khai báo trong file **routes/web**
```
Route::get('/annotate', 'AnnotationController@displayForm');
Route::post('/annotate', 'AnnotationController@annotateImage');
```

Tạo view hiển thị form upload hình ảnh **annotate.blade.php**
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
    <a class="navbar-brand" href="#">{{ __('OCR Project') }}</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</nav>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Image to text converter with Laravel and Google Cloud Vision') }}</div>
                <div class="card-body">
                    <form role="form" method="POST" action="/annotate" enctype="multipart/form-data">
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
                                    {{ __('Convert') }}
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

Cập nhật logic xử lý cho **AnnotationController**:
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GoogleCloudVision\GoogleCloudVision;
use GoogleCloudVision\Request\AnnotateImageRequest;
use Exception;

class AnnotationController extends Controller
{
    /**
     * display Form
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function displayForm()
    {
        return view('annotate');
    }

    /**
     * annotate Image
     *
     * @param Request $request
     */
    public function annotateImage(Request $request)
    {
        try {
            if ($request->file('image')) {
                $image = base64_encode(file_get_contents($request->file('image')));

                $request = new AnnotateImageRequest();
                $request->setImage($image);
                $request->setFeature("TEXT_DETECTION");

                $gcvRequest = new GoogleCloudVision([$request], env('GOOGLE_CLOUD_KEY'));
                $response = $gcvRequest->annotate();

                echo json_encode(["description" => $response->responses[0]->textAnnotations[0]->description]);
            }
        } catch (Exception $e) {
            echo json_encode(["code" => $e->getCode(), "errors" => $e->getMessage()]);
        }
    }
}
```
# **4.Testing**
Run server:
```
php artisan serve
```
Tiến hành upload 1 ảnh có chứa text, đây là link  [ảnh](https://pixabay.com/illustrations/quote-history-friends-memories-1342706/) mình đã sử dụng để text.
![](https://images.viblo.asia/5a199b7c-395b-4c69-8277-2fe2b945c10f.jpg)
![](https://images.viblo.asia/9a0b773c-d8bc-4551-b4d2-45cf7e372915.png)
Kết quả sau khi đã xử lý:
![](https://images.viblo.asia/f5342416-a06b-4274-aed0-654f419de586.png)
# **5.Conclusion**
Hy vọng bài viết này sẽ giúp ích cho các bạn khi cần trích xuất văn bản từ 1 hình ảnh nào đó, ngoài ra API này còn nhiều chức năng khác nữa, ở phần sau mình sẽ tìm hiểu thêm các chức  năng còn lại của nó! Anh em nào cần API KEY để test thử thì comment phía dưới mình share cho! (^_^).
Hẹn gặp lại!