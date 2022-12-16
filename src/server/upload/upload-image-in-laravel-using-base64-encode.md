Trong bài viết này, tôi sẽ chia sẻ một cách chuyển đổi hình ảnh định dạng **Base64** thành hình ảnh. Tất cả dữ liệu đều được trích xuất từ chuỗi mã hóa **Base64**, chúng ta có thể encode đoạn mã đó và lưu lại dưới dạng file hình ảnh.

### Base64 là gì?
**Base64** là một chương trình mã hóa chuỗi ký tự bằng cách dùng thay thế các ký tự trong bảng mã ASCII 8 bit thông dụng thành bảng mã 6 bit. Nó thường được sử dụng để mã hóa các tập tin đa phương tiện (hình ảnh, âm thanh, video,…). Ký tự 64 trong Base64 là đại diện cho 64 ký tự trong bãng mã ASCII. Base64 thường được sử dụng trong việc truyền tải email. Tuy nhiên, ngày nay người ta đã sử dụng nó vào việc truyền tải hình ảnh trên website.

Tài liệu tham khảo Base64: https://en.wikipedia.org/wiki/Base64
### Ứng dụng Base64 vào upload hình ảnh trong Laravel
Như chúng ta hiểu thì Base64 là một chuỗi má hóa nên chúng ta có thể sử dụng nó để lưu trữ vào database hoặc mã hóa ngược lại để hiển thị hình ảnh và lưu file hình ảnh đó lại.

Chúng ta sẽ bắt đầu tạo một ứng dụng đơn giản cho phép lưu trữ hình ảnh trong **Laravel** sử dụng Ajax để truyền tập tin dữ liệu lên server. Như vậy, ta có thể ứng dụng vào việc gửi cùng lúc chuỗi mã hóa hình ảnh và các input lên server và lưu trữ trực tiếp vào database.

Đầu tiên, ta sẽ bắt đầu với form bao gồm các input text & fileupload với:

**Form HTML upload**
```HTML
<form method="POST" id="form_upload" action="{{ route('upload.base64') }}" enctype="multipart/form-data">
    <img src="" alt="" id="img_preview">
    <div class="form-group">
        <input name="text" class="form-control" placeholder="Title"/>
    </div>
    <div class="form-group">
        <input type="file" id="fileUpload" class="form-control">
        <input type="hidden" name="base64" id="inputBase64">
    </div>
    <button type="button" id="send_data" class="btn">Upload & Save</button>
</form>
```

**Action upload** xử lý upload giải mã và lưu dữ liệu vào database
```PHP
public function upload(Request $request)
{
    $res = [
        'success' => false,
        'message' => '',
    ];
    $base64String = $request->input('base64');
    $model = new Photo();
    $model->title = $request->input('title');
    $model->image = $this->saveImgBase64($base64String, 'uploads');

    if ($model->save()) {
        $res = [
            'success' => true,
            'message' => 'Successfully updated',
        ];
    }

    return response()->json($res);
}
```
**Function giải mã chuỗi base64 và lưu hình ảnh**: chúng ta sẽ sử dụng `base64_decode` để mã hóa content trước khi sử dụng Storage lưu file vào local disk pulic. Với Storage package chúng ta có thể upload lên nhiều disk khác nhau như: s3, local,...
```PHP
protected function saveImgBase64($param, $folder)
{
    list($extension, $content) = explode(';', $param);
    $tmpExtension = explode('/', $extension);
    preg_match('/.([0-9]+) /', microtime(), $m);
    $fileName = sprintf('img%s%s.%s', date('YmdHis'), $m[1], $tmpExtension[1]);
    $content = explode(',', $content)[1];
    $storage = Storage::disk('public');

    $checkDirectory = $storage->exists($folder);

    if (!$checkDirectory) {
        $storage->makeDirectory($folder);
    }

    $storage->put($folder . '/' . $fileName, base64_decode($content), 'public');

    return $fileName;
}
```
Hình ảnh Form minh họa như sau:
![](https://images.viblo.asia/8c8e63d6-ee2e-40bb-843d-2fdbb3b5b822.png)

Kết quả hình ảnh đã được giả mã và lưu vào ổ local disk:
![](https://images.viblo.asia/b4007219-8ea9-42a6-a907-ff2ae14ea8c1.png)

Như vậy, chúng ta đã hoàn thành ứng dụng upload file áp dụng mã hóa **Base64** trong **Laravel**. Chúng ta cũng có thể lưu trực tiếp chuỗi mã hóa này vào database và chỉ việc decode và hiển thị. Nhưng chúng ta có thể gặp vấn đề khi file dung lượng quá lớn thì tương đương với việc chuỗi mã hóa càng lớn.
### Kết luận
Đây là một ứng dụng nhỏ trong việc lưu trữ hình ảnh bằng chuỗi base64. Ngoài ra chúng ta có thể ứng dụng cho việc truyền tải nhiều loại tập tin media khác.  Hy vọng sau bài viết này mọi người có thể có nhiều ứng dụng phát triển hơn nữa. Bài viết còn sơ sài và mong sẽ có nhiều đóng góp để có thể viết ra những bài chia sẻ hay hơn lắng đọng tâm hồn hơn. Thanks !