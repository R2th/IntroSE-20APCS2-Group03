# I. Lời mở đầu
Chào mọi người, vừa rồi mình được giao một task liên quan đến việc kéo nội dung trong file doc và tải các ảnh trên google drive rồi upload lên database của hệ thống. Nên hôm nay mình có tổng hợp lại một số thứ mình tìm hiểu được để chia sẻ với anh em, kiến thức còn hạn hẹp chưa đủ sâu nên có gì mọi người cùng góp ý để mình hoàn thiện bài viết tốt nhất nhé.
Trong bài viết này mình sẽ hook vào google drive api để get được thông tin, export được từ file doc => file html rồi insert vào database, tải ảnh từ google drive rồi đưa vào database.
Không dài dòng mình bắt đầu luôn.

# II. Thực hiện
**1. Create a new project** 

  Mình xin phép bỏ qua bước cài đặt  project laravel vì có rất nhiều bài nói về bước này rồi. Mình sẽ để link cài đặt ở phía duới
    
[ https://laravel.com/docs/master/installation](https://laravel.com/docs/master/installation)
    
**2. Create Google Drive Application**

Để lưu trữ file trên Google Drive, bạn cần lấy đủ 4 thông tin bên trên. Để có thông tin chi tiết về cách lấy API ID, secret và refresh token, bạn tham khảo hướng dẫn sau:
  * [Lấy Client ID and Secret](https://github.com/ivanvermeyen/laravel-google-drive-demo/blob/master/README/1-getting-your-dlient-id-and-secret.md)
  
Add user test vào project, vì khi mới tạo project thì đang ở trạng thái là test. Mục này rất quan trọng nếu không add user test sẽ không thể connect được api. Sau đó làm tiếp theo các bước:
![](https://images.viblo.asia/e28fd4c0-5be9-4801-a1bc-c435395cd85a.png)

  * [Lấy Refresh Token](https://github.com/ivanvermeyen/laravel-google-drive-demo/blob/master/README/2-getting-your-refresh-token.md)
  * [Lấy ID thư mục lưu trữ](https://github.com/ivanvermeyen/laravel-google-drive-demo/blob/master/README/3-getting-your-root-folder-id.md)
  
**3. Configure Google Service**

Mình sử dụng package [Flysystem Adapter for Google Drive](https://github.com/nao-pon/flysystem-google-drive)

* Cài đặt package cho Google Drive API V3
`composer require nao-pon/flysystem-google-drive:~1.1`
Mình khuyên các bạn nên sử dụng API V3, vì V3 đã có nhiều thay đổi tốt hơn V2 đồng thời nhiều hàm cũng được loại bỏ bớt các parameter không quá cần thiết. Trên doc của google V3 thì chưa có Samples cho PHP nhưng vì cơ bản V2 và V3 PHP cũng không có gì thay đổi nhiều nên bạn có thể hoàn toàn sử dụng và tham khảo lại doc PHP của V2. Một điều nữa để khuyên bạn nên dùng V3 là ở trong package vừa cài đặt trên tác giả cũng ghi rõ *For Google Drive API V2 "Deprecated" .

* Sau khi cài đặt package xong, chúng ta cần:
Thêm `GoogleDriveServiceProvider::class` vào `providers` trong file `config/app.php`

```
'providers' => [
    // ...
    App\Providers\GoogleDriveServiceProvider::class,
    // ...
],
```

Thêm `google` disk vào `config/filesystems.php`:

```
'google' => [
            'driver' => 'google',
            'clientId' => env('GOOGLE_DRIVE_CLIENT_ID'),
            'clientSecret' => env('GOOGLE_DRIVE_CLIENT_SECRET'),
            'refreshToken' => env('GOOGLE_DRIVE_REFRESH_TOKEN'),
            'folderId' => env('GOOGLE_DRIVE_FOLDER_ID'),
        ],
```

* Cập nhật file .env
Thêm ClientID, ClientSecret, RefreshToken mà bạn vừa thực hiện các bước ở trên vào file env

```
FILESYSTEM_CLOUD=google
GOOGLE_DRIVE_CLIENT_ID=XXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
GOOGLE_DRIVE_CLIENT_SECRET=XXXX_ByGjXXXXX
GOOGLE_DRIVE_REFRESH_TOKEN=XXXXXXXXXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXT1J1S5-Bv51KAUWR49M6jKmOXXXXXXXXXXX
```

**4. Create GoogleServiceProvider**

Bạn tạo file GoogleServiceProvider trong thư mục Providers

```
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class GoogleDriveServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        \Storage::extend('google', function ($app, $config) {
            $client = new \Google_Client();
            $client->setClientId($config['clientId']);
            $client->setClientSecret($config['clientSecret']);
            $client->refreshToken($config['refreshToken']);

            return new \Google_Service_Drive($client);
        });
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
```

Giờ chúng ta code thôi !!!

**5. Get files**

Để get files thì chúng ta cần có `fileId` của file trên google drive. Việc get files này thì có thể get được tất cả các loại file từ định dạng image, doc, excel.

```
$driveService = Storage::disk('google');
$file = $driveService->files->get($fileId);
```

Kết quả trả về là collection:
![](https://images.viblo.asia/2f22c6e3-3b4a-433a-9833-8788a98545b8.png)

**6. Get list files**

Để get list files từ một folder cụ thể. `$folderId` sẽ là ID của folder chứa các files mà bạn muốn lấy về.
```
$driveService = Storage::disk('google');
        $query = "'" . $folderId . "' in parents and trashed=false";

        $optParams = [
            'fields' => 'nextPageToken, files(id, name)',
            'q' => $query
        ];

        $results = $driveService->files->listFiles($optParams);
```

Kết quả trả về:
![](https://images.viblo.asia/a45e98ad-d74e-483f-9788-01ecce3e85ed.png)

Nếu bạn muốn kết quả trả về là một list file luôn thì sử dụng `$results->getFiles()`. Trong kết quả trả về có đầy đủ thông tin của file.

**7. Download files**

Để download file mình vẫn sử dụng method `files->get()` nhưng thêm một parameter `array('alt' => 'media')`.` alt=media` cho máy chủ biết rằng nội dung đang được yêu cầu tải xuống. Sau đó sử dụng` getBody()->getContents()` để lấy được file. 
Để tài xuống file từ api thì bạn cần ít nhất quyền truy cập đọc vào file ý. Tham khảo thêm về [downloadfiles](https://developers.google.com/drive/api/v3/manage-downloads) . 
Bạn có thể download được cả file image, doc, excel... nhé.

 ```
$file = $driveService->files->get($file->id, array(
                    'alt' => 'media'));
$file =  $file->getBody()->getContents();

// save file to Storage
Storage::put($file);
```

**8. Export files**

Để export file bạn cần lưu ý chỉ export được những file định dạng docs, excel. Với những file là docx sẽ không thể export được. Bạn có thể tham khảo các định dạng được [export](https://developers.google.com/drive/api/v3/ref-export-formats).
Đoạn code dưới của mình là export file đọc sang dạng html. 
    
```
 $driveService = Storage::disk('google');
$nameFile = $driveService->files->get($fileId)->name;
$file = $driveService->files->export($fileId, 'text/html', array(
    'alt' => 'media'));
$content = $file->getBody()->getContents();
$path = 'files/' . $nameFile . '.html';
Storage::put($path, $content);
```

Đến đoạn này là bạn đã có 1 file html có thể cầm file insert vào database rồi.

# III. Kết luận
Trên đây, mình đã giới thiệu với các bạn 1 vài thao tác cơ bản để lưu trữ file với Google Drive như: get file, download file, lấy danh sách file, export file. Để có thể tìm hiểu về các thao tác khác như: tạo thư mục, tạo file trong thư mục, đổi tên thư mục, xóa thư mục, ... bạn có thể [tham khảo thêm tại đây](https://developers.google.com/drive/api/v3/about-sdk).

Hy vọng, bài viết này của mình sẽ giúp ích cho các bạn xử lý file lưu trữ trên Google Drive. Bài viết này còn nhiều thiếu xót mong các bạn góp ý để mình hoàn thiện thêm

Cám ơn các bạn đã đọc bài viết.
# IV. Tài liệu tham khảo
* [https://github.com/nao-pon/flysystem-google-drive](https://github.com/nao-pon/flysystem-google-drive)
* [https://viblo.asia/p/luu-tru-file-voi-google-drive-trong-laravel-Qbq5QgXmZD8](https://viblo.asia/p/luu-tru-file-voi-google-drive-trong-laravel-Qbq5QgXmZD8)