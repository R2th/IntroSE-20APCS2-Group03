# Lời nói đầu

Gần đây, mình có gặp một bài toán mà mình nghĩ rằng nó là một bài toán rất thường gặp của các nhà phát triển Web. Trong một project `Laravel`, các user có thể tải lên các file với nhiều kích thước khác nhau và đương nhiên là các file đó nên được mã hóa để đảm bảo tính bảo mật của người dùng.

`Laravel` đã cung cấp [Encryption](https://laravel.com/docs/master/encryption)  cho vấn đề này . Tuy nhiên nó được thiết kế chủ yếu để mã hóa các giá trị  thông thường như số hoặc chữ. Việc mã hóa một file với kích thước nhỏ (Ví dụ như 1 bức ảnh) có thể sử dụng `encrypt` helper cũng ổn nhưng trong quá trình này nội dung của file đã được tại vào bộ nhớ . Nếu file làm việc của bạn là 1 file với dung lượng lớn , hiển nhiên rồi nó sẽ trở thành 1 vấn đề khá nghiêm trọng.

Mình đã tìm kiếm một thư viện hay giải pháp nào đó để giải quyết vấn đề này và đẵ có câu trả lời trên [stackoverflow](https://stackoverflow.com/questions/30742390/encrypting-large-files-in-php-with-openssl) và sử dụng  [php](https://riptutorial.com/php/example/25499/symmetric-encryption-and-decryption-of-large-files-with-openssl) để hiện thực hóa giải pháp mà `stackoverflow` mô tả.

Mình đã quyết định tạo một package được thiết kết cho các project `Laravel` nhăm mục đích cung cấp giải pháp cho việc `encryption/decryption` một cách đơn giản và dễ dàng hơn với cú pháp ngắn gọn và dễ hiểu.

Mình gọi đó là package `FileVault` và bạn có thể nhìn thấy nó trên [Github](https://github.com/soarecostin/file-vault). Nếu bạn muốn bỏ qua bài viết này , thì bạn có thể vào thẳng Repo trên `Github` và bắt đầu với nó. Package đã được bao gồm rất cụ thể các tài liệu để bạn sử dụng nó.

# Hướng dẫn.
Trong bài hướng dẫn này, mình sẽ trình bày tất các bước bạn cần để mà hóa 1 file kích thước lớn trong 1 project mới của laravel .

Đầu tiên, hiển nhiên rồi bạn cần tạo một project mới và chúng ta sẽ gọi nó là `security-app` với câu lện sau :
```
laravel new security-app
```

Tại thời điểm viết bài này , chúng ta sử dụng ` Laravel v6.5.2` nhé mọi người.

Bởi vì mình đã sử dụng `Laravel installer`, nên mình đã có một applicaiton có sẵn key được tạo và add trong file `.env`. Nếu bạn sử dụng một cách khác để cài đặt thì đừng quên việc tạo app key cho project nhé. Sử dụng câu lệnh :
```
 php artisan key:generate
```

Bời vì mình sử dụng [ Laravel Valet](https://laravel.com/docs/6.x/valet), nên mình đã được auto tạo ra domain `security-app.test` để làm việc. Nếu bạn không sử dụng nó hoặc dùng 1 môi trường phát triên khác thì bạn nhớ cần add  local domain để test nhé .


ok, tiếp sau đó chúng ta cài đặt `laravel/ui` package nhé :
```
composer require laravel/ui — dev
```

Và mình sẽ dùng `bootstrap` và `auth` luôn nhé :
```
php artisan ui bootstrap --auth
```

Và cuối cùng là compile tất cả mọi thứ vừa setup :
```
npm install && npm run dev
```

Và đương nhiên ta cũng không thể quên việc config database trong `.env` file và chạy lệnh :
```
php artisan migrate
```

ok, đến hiện tại chũng ta có thể khởi tạo người dùng và đăng nhập để vào user dashboard .

**Note:** Mục đích của bài viết này chỉ là demo nên mình sẽ khởi tạo form đơn giản cho việc upload file nhưng trong app của bạn , bạn nên quan tâm để việc sử dụng một cách tinh tế hơn upload function. Với những file quá lớn, bạn có thể suy nghĩ đển giải phải chia nhỏ file và upload lên server.

Một package rất tốt (theo quan điểm của bản thân mình) bạn có thể sư dụng cho vấn đề này đó là [ pion/laravel-chunk-upload](https://packagist.org/packages/pion/laravel-chunk-upload).

`Laravel` auth đã khơi tạo cho chúng ta `/home` route . Nó được định nghĩa trong `HomeController` và sử dụng `home.blade.php` view file.

Việc của chúng ta hiện tại là edit file view `home.blade.php` và add một form để upload image lên nhé :
```
<form action="{{ route('uploadFile') }}" method="post" enctype="multipart/form-data" class="my-4">
    @csrf

    <div class="form-group">
        <div class="custom-file">
            <input type="file" class="custom-file-input" id="userFile" name="userFile">
            <label class="custom-file-label" for="userFile">Choose a file</label>
        </div>
    </div>

    <button type="submit" class="btn btn-primary">Upload</button>

    @if (session()->has('message'))
        <div class="alert alert-success mt-3">
            {{ session('message') }}
        </div>
    @endif
</form>
```

Giờ thì khởi tạo route nào :
```
Route::post(‘/home’, ‘HomeController@store’)->name(‘uploadFile’);
```

Và tạo method mới bên trong `HomeController`. Method này sẽ lưu trữ file đã upload trong cá thư mục con được định danh thông qua user id của user đó. Trong trương hợp này sẽ là `storage/app/files/{user-id}`

```
/**
* Store a user uploaded file
*
* @param  \Illuminate\Http\Request $request
* @return \Illuminate\Http\Response
*/
public function store(Request $request)
{
    if ($request->hasFile('userFile') && $request->file('userFile')->isValid()) {
        Storage::putFile('files/' . auth()->user()->id, $request->file('userFile'));
    }
    return redirect()->route('home')->with('message', 'Upload complete');
}
```

Đây chính là nơi mà chúng ta cần đển mã hóa file mà user đã tải lên . Nào hãy cùng lấy package `file-vault` về nào:
```
composer require soarecostin/file-vault
```

Package này sẽ cho phép truy cập vào `FileVault facade` nơi mà sẽ định nghĩa các phương thức để mã hóa và giải mã file cũng như các phương thức để set các thông tin như các key khác nhau để mã hóa cho các file khác nhau hoặc chỉ ra nơi sẽ lưu file .

Chúng ta sẽ sử dụng  phương thức `FileVault::encrypt($file)` để mã hóa các file do user tải lên. Function này sẽ xóa đi file nguyên bản (file của user khi upload lên server) và thay thế nó bằng file có cùng tên tuy nhiên phần mở rộng thì là `.enc`.

Nếu bạn muốn custom lại tên file  thì bạn chỉ cần truyển thêm 1 tham số đầu vào để miêu tả lại tên mà bạn file sẽ được nhận vào `encrypt`. Nếu bạn muốn giữ lại tệp tin gốc thì chỉ cần sử dụng phương thức  `encryptCopy`.

Hiện tại thì method `store` sẽ trông như sau :

```
    /**
     * Store a user uploaded file
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->hasFile('userFile') && $request->file('userFile')->isValid()) {
            $filename = Storage::putFile('files/' . auth()->user()->id, $request->file('userFile'));
            // Check to see if we have a valid file uploaded
            if ($filename) {
                FileVault::encrypt($filename);
            }
        }
        return redirect()->route('home')->with('message', 'Upload complete');
    }
```

Tiếp theo, chúng ta cần tim cách để giai mã và download được các file đã upload lên server nhé.

Việc đầu tiên cần khởi tạo route `downloadFile` và phương thức `downloadFile` bên trong `HomeController`.
```
Route::get(‘/files/{filename}’, ‘HomeController@downloadFile’)->name(‘downloadFile’);
```

```
/**
     * Download a file
     *
     * @param  string  $filename
     * @return \Illuminate\Http\Response
     */
    public function downloadFile($filename)
    {
        // Basic validation to check if the file exists and is in the user directory
        if (!Storage::has('files/' . auth()->user()->id . '/' . $filename)) {
            abort(404);
        }
        return response()->streamDownload(function () use ($filename) {
            FileVault::streamDecrypt('files/' . auth()->user()->id . '/' . $filename);
        }, Str::replaceLast('.enc', '', $filename));
    }
```

Phương thức `downloadFile` sử dụng [ Laravel native streamDownload](https://laravel.com/docs/5.8/responses#file-downloads) . Trong callback, chúng ta gọi đến phương thức `streamDecrypt` của `FileVault facade ` cung cấp, nó sẽ giải mã lại file và trả lại theo từng phần cho phương thức `streamDownload` , cho phép user có thể download file đã giải mã.


ok, vậy là bây giờ chúng ta đã có thể mã hóa một cách rất đơn giản và thuậ tiện rồi. Chúng ta đã vừa hoàn thành việc tạo form cho user uipload, mã hóa file và giải mã chúng khi user yêu cầu download lại file mà bản thân từng tài lên.

Đương nhiên trong các project production chúng ta cần thêm các yếu tổ bảo mật. Và `FileVault` được thiết kế để giúp bạn về vấn đề đó.

Nếu bạn thích bài viết  này và muốn tìm hiểu thêm về cách tải lên và mã hóa tệp bằng Amazon S3, bạn có thể truy cập một bài viết khác mà tôi đã viết: [How to encrypt and upload large files to Amazon S3 in Laravel.](https://medium.com/@soarecostin/how-to-encrypt-upload-large-files-to-amazon-s3-in-laravel-af88324a9aa?sk=a9a358a3892e898a60448d5314fb3dc0)

# Nguồn
[https://medium.com/better-programming/how-to-encrypt-large-files-in-laravel-293460836ded](https://medium.com/better-programming/how-to-encrypt-large-files-in-laravel-293460836ded)