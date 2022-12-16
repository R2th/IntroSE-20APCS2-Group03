## Giới thiệu
Một website dạng bình thường không cần lưu trữ quá nhiều hình ảnh, video hay các tệp tin khác thì bạn có thể lưu trữ luôn ngay trên hosting, server của mình. Nhưng một số website đặc thù cần lưu trữ một lượng lớn tệp tin mà hosting, server không đáp ứng được thì bắt buộc phải sử dụng dịch vụ bên thứ 3 để lưu trữ.<br>
**Amazon S3 (Simple Storage Service)** là một dịch vụ tuyệt vời để lưu trữ tệp tin phổ biến nhất trong công nghệ điện toán đám may hiện nay, nó lưu trữ tệp tin như một object trong các bucket <br>
Bài viết này, mình xin giới thiệu với các bạn cách sử dụng AWS S3 để lưu trữ file trong các dự án Laravel
## Cấu hình AWS S3
### Tạo tài khoản riêng cho S3
Để quản lý S3, ta nên tạo một tài khoản riêng chỉ để quản lý S3 để dễ dàng quản lý hơn <br>
Đăng nhập vào AWS Console bằng tài khoản tạo bằng Gmail. Sau đó chọn My Security Credentials <br>
Màn hình AIM hiện ra, click tạo User. Điền tên tài khoản sẽ quản lý S3 như hình<br>
![](https://images.viblo.asia/2f84083d-8906-404c-9483-81cb71bfdfd6.PNG)
PS: Chọn programe thì chỉ tạo ra access_key để truy cập S3<br>
       Chọn dòng tiếp theo sẽ tạo mật khẩu để đăng nhập vào Console<br>
Sau đó click Next, hiện ra màn hình set quyền chọn S3FullAccess
![](https://images.viblo.asia/223afcdd-3516-4a1c-80f8-d97aa9139d54.PNG)
Sau đó click Next 2 lần là đã tạo tài khoản thành công
![](https://images.viblo.asia/9634c1ff-76c8-4e48-b508-cac4724bd660.PNG)
Các thông tin được tạo ra gồm có<br>
* Đường dẫn dạng `Account ID.signin.aws.amazon.com`<br>
* Account và Password để đăng nhập AWS S3<br>
* AWS_ACCESS_KEY_ID:<br>
* AWS_SECRET_ACCESS_KEY:<br> 
### Tạo bucket
Đăng nhập vào AWS S3 bằng tài khoản đã tạo
![](https://images.viblo.asia/187e6f7f-dcfb-485f-ad1c-d20c712cb0a9.PNG)
Các bạn vào trang https://aws.amazon.com/s3/ để đăng ký tài khoản<br>
Sau đó vào https://console.aws.amazon.com/console tìm và chọn S3<br>
Chọn create bucket<br>
![](https://images.viblo.asia/5bc46997-3731-4f7d-aa43-7543a2cc08bb.png)
Chọn next, có một số dịch vụ bạn có thể chọn enable nó lên, không thì bỏ qua và tiếp tục bấm next<br>
Để mặc định và tiếp tục bấm next, nó sẽ tự tạo bucket cho mình<br>
Sau đó, chọn vào quản lý bucket vừa tạo để set quyền truy cập vào file sẽ xử lý<br>
Access for bucket owner: List objects, Write objects, Read bucket permissions <br>
Public access Everyone: List objects
## Sử dụng S3 để lưu trữ file trong Laravel
### Thiết lập file .env
```php
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=
AWS_BUCKET=
AWS_URL=
FILESYSTEM_DRIVER=s3
```
### Thiết lập filesystems.php
```php
'cloud' => env('FILESYSTEM_CLOUD', 's3'),

'disks' => [
     ...

    's3' => [
        'driver' => 's3',
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => 'us-east-1',
        'bucket' => env('AWS_BUCKET'),
        'url' => env('AWS_URL'),
    ],

],
```
### Cài thư viện
Như trên docs của laravel có ghi là để sử dụng S3 driver bạn sẽ phải cài thư viện `league/flysystem-aws-s3-v3` Mở terminal lên và chạy
```php
composer require league/flysystem-aws-s3-v3
```
### Các thao tác sử dụng
Mình đã tạo một project để demo. Các bạn có thể tham khảo mã nguồn [Tại đây](https://github.com/tuananh97/quickstart)<br>

Thao tác upload file lên S3
```php
    public function postUpload(StoreImage $request)
    {
        $path = Storage::disk('s3')->put('images/originals', $request->file, 'public');
        $request->merge([
            'size' => $request->file->getClientSize(),
            'path' => $path
        ]);
        $this->image->create($request->only('path', 'title', 'size'));
        return back()->with('success', 'Image Successfully Saved');
    }
```
Hiển thị file ra view
```php
<th><img width="100px" src="{{$image->url}}"></th>
```
Thao tác xóa file trên S3
```php
public function destroy(Image $image)
{
    $path = $image->path;
    $image->delete();
    Storage::disk('s3')->delete($image->path);
    return back()->with('success', 'Image Successfully Saved');
}
```
## Tài liệu tham khảo
[Dùng Amazon S3 để lưu trữ file trong Laravel](http://pinlaz.com/vi/dung-amazon-s3-upload-file-trong-laravel_73.html)<br>
[Giới thiệu về filesystem storage trong Laravel](http://agitech.com.vn/vn/bai-viet/website/93-gioi-thieu-ve-filesystem-storage-trong-laravel)<br>
[Laravel: Upload file to AWS S3 in 20 minutes challenge](https://www.youtube.com/watch?v=A88dYXdOB8Q)