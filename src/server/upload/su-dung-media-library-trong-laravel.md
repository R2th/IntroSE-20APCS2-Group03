## 1. Giới thiệu:
- Laravel medialibrary là một packet có thể giúp xử lý `media` trong `Laravel`. Nó có thể sắp xếp các tệp của bạn trên nhiều hệ thống, tạo hình thu nhỏ, tối ưu hóa hình ảnh và hơn thế nữa. <br>
- Hiện tại `medialibrary` mới ra phiên bản chính mới, v9, bổ sung rất nhiều tính năng tuyệt vời như hình ảnh đáp ứng, các thành phần vue để hỗ trợ tải lên, ...<br>
## 2. Media collections:
- `Media collections` đã tồn tại ra mắt rất nhiều phiên bản khác nhau nhưng đều cung cấp phần cơ bản là:  <br>
- Chúng cho phép bạn đưa các loại file khác nhau vào `collection` của riêng chúng.

- Ví dụ: <br>
``` 
  $newsItem = News::find(1);
  $newsItem->addMedia($pathToImage)->toMediaCollection('images'); 
  $newsItem->addMedia($pathToAnotherImage)->toMediaCollection('images');
  $newsItem->addMedia($pathToPdfFile)->toMediaCollection('downloads');
  $newsItem->addMedia($pathToAnExcelFile)->toMediaCollection('downloads');
```
- Cách lấy tất các `media` của `model`:
```
// will return media instances for all files in the images collection
$newsItem->getMedia('images');

// will returns media instance for all files in the downloads collection
$newsItem->getMedia('downloads');
```
## 3. New functionalities:
- Trong v7, `media collections` có thể không chỉ là một cái tên để nhóm các file. Bằng cách xác định `media collections` trong model của mình, bạn có thể thêm một số action nhất định vào `collection`.<br>
- Để bắt đầu với `media collections`, hãy thêm một chức năng có tên `registerMediaCollections` vào model đã chuẩn bị của bạn. Bên trong chức năng đó, bạn có thể sử dụng `addMediaCollection` để bắt đầu một `media collection`.
```
// in your model

public function registerMediaCollections()
{
    $this->addMediaCollection('my-collection')
        //add options
        ...

    // you can define as much collections as needed
    $this->addMediaCollection('my-other-collection')
        //add options
        ...
}
```
- Kết quả: 
```
$yourModel->addMedia('beautiful.jpg')->toMediaCollection('only-jpegs-please');
```
- Thao tác này sẽ trả về một ngoại lệ: `Spatie\MediaLibrary\Exceptions\FileCannotBeAdded\FileUnacceptableForCollection`.
```
$yourModel->addMedia('ugly.ppt')->toMediaCollection('only-jpegs-please');
```
## 4. Using a specific disk:
- Bạn có thể đảm bảo rằng các file được thêm vào`colection` sẽ được tự động thêm vào một `disk` nhất định.
```
// in your model

public function registerMediaCollections()
{
    $this
       ->addMediaCollection('big-files')
       ->useDisk('s3');
}
```
- Khi thêm file vào `colection` của tôi, tệp đó sẽ được lưu trữ trên `disk s3`.
```
$yourModel->addMedia($pathToFile)->toMediaCollection('big-files');
```
- Bạn vẫn có thể chỉ định tên `disk` theo cách thủ công khi thêm media. Trong ví dụ này, file sẽ được lưu trữ trên `disk` thay thế thay vì `s3`.
```
$yourModel->addMedia($pathToFile)->toMediaCollection('big-files', 'alternative-disk');
```
## 5. Single file collections:
- Nếu bạn muốn một `collection` chỉ chứa một `file`, bạn có thể sử dụng `singleFile` trên `collection`. Một trường hợp sử dụng tốt cho điều này sẽ là `collection` hình đại diện trên mô hình `user`. Trong hầu hết các trường hợp, bạn muốn `user` chỉ có một hình đại diện.
 ```
// in your model

public function registerMediaCollections()
{
    $this->addMediaCollection('avatar')
             ->singleFile();
}
```
- Lần đầu tiên bạn thêm`file` vào `collection`, file đó sẽ được lưu trữ như bình thường.
```
$yourModel->add($pathToImage)->toMediaCollection('avatar');
$yourModel->getMedia('avatar')->count(); // returns 1
$yourModel->getFirstUrl('avatar'); // will return an url to the `$pathToImage` file
```
- Khi thêm `file` khác vào một tập hợp `file`, `file` đầu tiên sẽ bị xóa.
```
// this will remove other files in the collection
$yourModel->add($anotherPathToImage)->toMediaCollection('avatar');
$yourModel->getMedia('avatar')->count(); // returns 1
$yourModel->getFirstUrl('avatar'); // will return an url to the `$anotherPathToImage` file
```
## 6. Registering media conversions:
 - Trước tiên, bạn nên đọc phần chuyển đổi hình ảnh trước khi đọc các đoạn sau.
 - Thông thường các chuyển đổi hình ảnh được đăng ký bên trong chức năng `registerMediaConversions` trên model của bạn. Tuy nhiên, chuyển đổi hình ảnh cũng có thể được đăng ký bên trong `media collection`.
 ```
 public function registerMediaCollections()
{
    $this
        ->addMediaCollection('my-collection')
        ->registerMediaConversions(function (Media $media) {
            $this
                ->addMediaConversion('thumb')
                ->width(100)
                ->height(100);
        });
}
```
- Khi thêm một hình ảnh vào `collection` của tôi, một hình thu nhỏ vừa với kích thước 100x100 sẽ được tạo.
```
$yourModel->add($pathToImage)->toMediaCollection('my-collection');

$yourModel->getFirstMediaUrl('thumb') // returns an url to a 100x100 version of the added image.
```
- Hãy xem phần xác định chuyển đổi để tìm hiểu tất cả các chức năng bạn có thể sử dụng cho `addMediaConversion`.
## 7. Nguồn tham khảo:
- Cám ơn các bạn đã dành thời gian để cùng nhau tìm hiểu về `media collections`. <br>
- Bên dưới là `link` mình đã tham khảo để hoàn thành bài viết:
- https://freek.dev
- https://spatie.be/docs/laravel-medialibrary/v7/introduction
- https://github.com/spatie/laravel-medialibrary