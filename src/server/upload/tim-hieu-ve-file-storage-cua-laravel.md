## Xem thêm tại: [Tìm hiểu về File Storage của Laravel](https://vantien.net/lap-trinh/php/laravel/tim-hieu-ve-file-storage-cua-laravel/)
# Giới thiệu
- Laravel cung cấp cho người dùng một giải pháp để quản lý file cực kỳ tiện lợi và hữu ích - đó là [File Storage](https://vantien.net/lap-trinh/php/laravel/tim-hieu-ve-file-storage-cua-laravel/). Tính năng này bạn hoàn toàn có thể dùng trên các Framework khác vì nó là một package của Frank de Jonge. Bạn có thể xem package [tại đây](https://github.com/thephpleague/flysystem).
- Với File Storage bạn có thể thao tác với các file ở local, Rackspace Cloud Storage và cả Amazon S3.

# Config
* Bạn có thể config File Storage tại file `config/filesystems.php`.
* Driver mà Laravel hỗ trợ: "local", "ftp", "sftp", "s3", "rackspace".
### Local
* Để sử dụng và download các file trên web, bạn cần phải chạy lệnh sau để tạo ra một symbolic link trong thư mục public của Laravel: `php artisan storage:link`. 
* Mặc định, nó sẽ link đến đường dẫn `storage/app/public`. Bạn có thể config đường dẫn mà nó link đến tại dòng: `'root' => storage_path('app/public')`.
* Để thao tác với thao trên web, bạn có thể dụng: `asset('storage/filename');`.
* Để thao tác với file local, bạn có thể dùng `Storage::disk('local')->put('file.txt', 'Contents');`. Vì mặc định laravel sẽ dùng local nên bạn chỉ cần sử dụng Storage::put('file.txt', 'Contents');
### S3 driver
Để lưu file lên Amazon S3 bạn cần install thêm package đó là:
```
Amazon S3: league/flysystem-aws-s3-v3 ~1.0`
```

Sau khi cài xong package, bạn cần config các thông số trong `config/filesystems.php`:
```php
's3' => [
    'driver' => 's3',
    'key' => env('AWS_ACCESS_KEY_ID'),
    'secret' => env('AWS_SECRET_ACCESS_KEY'),
    'region' => env('AWS_DEFAULT_REGION'),
    'bucket' => env('AWS_BUCKET'),
    'url' => env('AWS_URL'),
],
```

### FTP Driver
Bạn có thể sử dụng FTP Driver mà không cần thêm package giống như ở trên. Tuy nhiên, mặc định FTP sẽ không có sẵn trong `config/filesystems.php`. Để sử dụng FTP bạn phải thêm vào `config/filesystems.php`:
```php
'ftp' => [
    'driver'   => 'ftp',
    'host'     => 'ftp.example.com',
    'username' => 'your-username',
    'password' => 'your-password',

    // Optional FTP Settings...
    // 'port'     => 21,
    // 'root'     => '',
    // 'passive'  => true,
    // 'ssl'      => true,
    // 'timeout'  => 30,
],
```
# Thao tác với các disk
Như đã nói ở trên, mặc định ổ đĩa sẽ là local vì vậy nếu bạn muốn thao tác với Amazon S3 bạn sẽ cần sử dụng phương thức disk.

### Mặc định:
```php
Storage::put('avatars/1', $fileContents);
```
### S3:
```php
Storage::disk('s3')->put('avatars/1', $fileContents);
```
### Rackspace
```php
Storage::disk('rackspace')->put('avatars/1', $fileContents);
```

# Thao tác với các file

### Để lấy nội dung file:
```php
$contents = Storage::get('file.jpg');
```
### Để kiểm tra file có tồn tại không
```php
Storage::exists('file.jpg');
```
### Để lấy URL của file
```php
$url = Storage::url('file1.jpg');
```
### Lưu tạm file (chỉ hỗ trợ s3 và rackspace)
```php
$url = Storage::temporaryUrl(
    'file1.jpg', now()->addMinutes(5)
);
```
### File Metadata
Bạn có thể lấy thông tin của 1 file bằng cách sử dụng: 
```php
Storage::getMetaData('file.txt');
```
Lấy size:
```php
$size = Storage::size('file1.jpg');
```
Lấy thời gian thao tác cuối
```php
$time = Storage::lastModified('file1.jpg');
```
### Copy và moving file
```php
Storage::copy('old/file1.jpg', 'new/file1.jpg');
Storage::move('old/file1.jpg', 'new/file1.jpg');
```

# Upload file
Chắc hẳn bạn đã từng làm qua tính năng upload file, hay ít nhất là upload avatar cho user hoặc thumbnail cho sản phẩm chẳng hạn. Laravel hỗ trợ bạn làm điều này một cách dễ dàng thông qua Request:
```php
$path = $request->file('avatar')->store('public/avatars');
```

Hoặc thông qua Storage:
```php
$path = Storage::putFile('avatars', $request->file('avatar'));
```
**Lưu ý: mặc định với cách này Laravel sẽ lưu file dưới 1 unique name. Bạn có thể lấy filename bằng cách sử dụng:**
```
$request->file('avatar')->hashName();
```

### Upload dưới tên khác
Như cách ở trên thì Laravel sẽ tự động thêm tên cho file mà không trùng tên với các file có sẵn. Nhưng bạn cũng có thể lưu file với một tên tùy ý bằng cách sử dụng:
```php
$path = $request->file('avatar')->storeAs(
    'avatars', $request->user()->id
);
```
Hoặc
```php
$path = Storage::putFileAs(
    'avatars', $request->file('avatar'), $request->user()->id
);
```
### Upload vào ổ đĩa khác
Ví dụ bạn muốn upload lên Amazon S3:
```php
$path = $request->file('avatar')->store(
    'avatars/'.$request->user()->id, 's3'
);
```
# Xóa file
Bạn có thể xóa file bằng cách sử dụng:
```
Storage::delete('file.jpg'); // Xóa 1 file
Storage::delete(['file1.jpg', 'file2.jpg']); // Xóa nhiều file
```
Hoặc xóa file trên Amazone S3:
```php
Storage::disk('s3')->delete('folder_path/file_name.jpg');
```

# Thao tác với thư mục
### Lấy các file trong thư mục
```php
$files = Storage::files('path');
```
### Lấy tất cả các file con trong thư mục cùng với tất cả các file trong các thư mục con
```php
$files = Storage::allFiles('path');
```
### Tạo thư mục
```php
Storage::makeDirectory('ten-thu-muc');
```
### Xóa thư mục
```php
Storage::deleteDirectory($directory);
```

> Nguồn: https://laravel.com/docs/5.5/filesystem