# **1.Introduction**
**Crop** hình ảnh là cách đơn giản nhất để tái bố cục, tạo điểm nhấn cho bức ảnh. Dưới đây là một số lý do bạn cần crop ảnh. 
* Cắt bớt khuyết điểm
* Tìm kiếm sự cân bằng cho bức ảnh
* Tìm điểm nhấn và khung ảnh mới

Hôm nay mình sẽ giới thiệu đến mọi người API  **Detect crop hints on a local image** của **API Google Cloud Cloud Vision**,  giúp phát hiện các thuộc tính chung của hình ảnh và gợi ý cắt xén cho thích hợp.

Để hiểu thêm về **Detect crop hints on a local image** thì các bạn truy cập ở link sau nhé [Detect crop hints
](https://cloud.google.com/vision/docs/detecting-crop-hints?hl=BG)
# **2.Prerequisites**
 Để sử dụng bản dùng thử free API cloud thì bạn làm theo hướng dẫn ở  đây nhé [create API KEY](https://viblo.asia/p/xay-dung-ung-dung-trich-xuat-van-ban-tu-hinh-anh-voi-laravel-va-google-cloud-vision-api-4P85634LKY3)
# **3.Getting Started**
Sau khi đã hoàn thành việc tạo **API KEY** ở trên, thì chúng ta tiến hành tạo 1 project ứng dụng của mình:
```
composer create-project --prefer-dist laravel/laravel detect-crop-hints-project"5.7.*"
```
Sau khi chúng ta tạo xong project, di chuyển đến thư mục chứa project và chạy lệnh sau để cài đăt [package google-cloud-vision-php](https://github.com/wapnen/google-cloud-vision-php)

```
composer require wapnen/google-cloud-vision-php
```

![](https://images.viblo.asia/b0a43f4d-b4f1-483f-96a0-bbdd05528f58.png)

Setting **GOOGLE CLOUD KEY API** bạn lấy được ở lúc tạo **API KEY** vào file .env như sau:
```
GOOGLE_CLOUD_KEY=your_api_key
```
Tiến hành tạo 1 controller để xử lý detect:
```
php artisan make:controller CropDetectController
```
Khai báo trong file routes/web
```
Route::get('/crop-hints', 'CropDetectController@crop')->name('web.crop');

```
```
<?php

namespace App\Http\Controllers;

use GoogleCloudVision\GoogleCloudVision;
use GoogleCloudVision\Request\AnnotateImageRequest;

class CropDetectController extends Controller
{
    public function crop()
    {
        try {
            $image = base64_encode(file_get_contents('https://2.bp.blogspot.com/-3QFcsa0kJFE/TjLxF5MgbHI/AAAAAAAADZE/mp6gmJbmZDo/s400/puente+25.jpg'));
            $request = new AnnotateImageRequest();
            $request->setImage($image);
            $request->setFeature("CROP_HINTS");

            $gcvRequest = new GoogleCloudVision([$request], env('GOOGLE_CLOUD_KEY'));
            $annotations = $gcvRequest->annotate();
            
            # print the crop hints from the annotation
            if ($annotations) {
                echo json_encode($annotations);
            } else {
                echo json_encode('No crop hints');
            }
        } catch (\Exception $e) {
            echo json_encode($e->getMessage());
        }
    }
}

```
# **4.Testing**
Run server:
```
php artisan serve
```

Ảnh dùng để test mình để ở đây [image](https://2.bp.blogspot.com/-3QFcsa0kJFE/TjLxF5MgbHI/AAAAAAAADZE/mp6gmJbmZDo/s400/puente+25.jpg)

Đây là kết quả mà API phân tích cho chúng ta khi crop hình ảnh trên:

![](https://images.viblo.asia/9c5d7aa5-97d9-4f35-b6c8-fdda3f8fcaa0.png)