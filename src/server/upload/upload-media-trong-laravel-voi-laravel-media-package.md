Laravel Media là 1 package giúp dễ dàng đính kèm file với eloquent models.  Nó sẽ tạo ra một model riêng biệt dùng để quản lý image và có thể upload bất kỳ loại file nào, từ file jpeg đến file zip.
# Cài đặt
Cài đặt thông qua composer
```
composer require optix/media
```
Sau đó chạy lệnh
```
php artisan vendor:publish --provider="Optix\Media\MediaServiceProvider"
```

Tạo database và sửa config trong file .env

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=media
DB_USERNAME=root
DB_PASSWORD=thanh2212
```

Sau đó chạy các lệnh sau để clear cache và tạo bảng trong database.
```
php artisan config:cache

php artisan migrate
```


# Sử dụng
### Upload media

Sử dụng class `Optix\Media\MediaUploader` để xử lý upload.
Mặc định, class này sẽ upload các file vào thư mục được chỉ định trong `config/media.php` ở trong storage/app. Nó sẽ lưu 2 phiên bản của file, một phiên bản giống file góc va một phiên bản chúng ta có thể tùy chỉnh lại. 

```
$file = $request->file('file');

// Default usage
$media = MediaUploader::fromFile($file)->upload();

// Custom usage
$media = MediaUploader::fromFile($file)
    ->useFileName('custom-file-name.jpeg') //tên file sau khi được upload lên
    ->useName('Custom media name')  //tên record được lưu trong DB
    ->upload();
```

### Liên kết media với model
Để liên kết một model với media thi bạn phải use` HasMedia` trong model đó.
```
use Optix\Media\HasMedia;

class Post extends Model
{
    use HasMedia;
}
```

Xử lý lưu hình với model
```
$post = Post::first();

// To the default group
$post->attachMedia($media);

// To a custom group
$post->attachMedia($media, 'custom-group');
```

Khi chạy lệnh migrate ở trên thì có 2 bảng được tạo ra, một bảng lưu thông tin media được upload lên và 1 bảng đa hình `mediables` dùng đê lưu quan hệ giưa các record trong bảng media với các record trong các bảng khác.

### Hủy liên kết media với model
Để hủy quan hệ thì ta có thể sử dụng các lệnh sau.

```
// Detach all the media
$post->detachMedia();

// Detach the specified media
$post->detachMedia($media);

// Detach all the media in a group
$post->clearMediaGroup('your-group');
```

Trong trườn hợp muốn xóa media thì có thể dùng như các thông thường mới model. Nó sẽ xóa tệp và các liên kết của tệp đó với các model khác.
```
Media::first()->delete();
```

### Truy xuất media
```
// All media in the default group
$post->getMedia();

// All media in a custom group
$post->getMedia('custom-group');

// First media item in the default group 
$post->getFirstMedia();

// First media item in a custom group
$post->getFirstMedia('custom-group');

// Url of the first media item in the default group
$post->getFirstMediaUrl();

// Url of the first media item in a custom group
$post->getFirstMediaUrl('custom-group');
```

### Các thao tác với Images
Package này cung cấp 1 số API để thao tác với image dễ dàng. Bạn có thể tự định nghĩa 1 conversions khi gán media vào 1 nhóm, nó tương tự như sử dụng thư viện intervention/image.

Ex: Đang kí 1 conversion ở phương thức boot() của AppServiceProvider.
```
use Intervention\Image\Image;
use Optix\Media\Facades\Conversion;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Conversion::register('thumb', function (Image $image) {
            return $image->fit(64, 64);
        });
    }
}
```

Sử dụng

```
class Post extends Model
{
    use HasMedia;
    
    public function registerMediaGroups()
    {
        $this->addMediaGroup('gallery')
             ->performConversions('thumb');
    }
}
```

hoặc
```
$post->getFirstMediaUrl('gallery', 'thumb');
```

Laravel Media giúp chúng ta quản lý viêc upload file trong laravel dễ dàng linh động hơn, bạn có thể thảm khảo kĩ hơn qua tại [đây](https://github.com/optixsolutions/laravel-media)