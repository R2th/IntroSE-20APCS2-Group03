*Ở bài đăng trước, mình có viết một bài về upload file được dịch từ [Laravel Daily](https://laraveldaily.com/), nhưng bài đó đã quá cũ vì được viết từ năm 2017. Sang bài này, mình sẽ viết thêm một cách upload file mới với Dropzone.js và Laravel MediaLibrary. Bài này mình cũng dịch trên [Laravel Daily](https://laraveldaily.com/), vì thế mình xin phép được giữ nguyên các ví dụ của tác giả. Link gốc mình để dưới bài viết nhé.*

Upload file là một trong những tính năng phổ biến nhất của web hiện nay. Và có khá nhiều thư viện có thể giúp chúng ta làm chức năng này. Ở đây chúng ta dùng [Dropzone](https://www.dropzonejs.com/) cho phía client và [Spatie MediaLibrary](https://github.com/spatie/laravel-medialibrary) cho phía server.

Đầu tiên, chúng ta hãy xem hình ảnh demo của Dropzone.

![](https://images.viblo.asia/f39ec5c9-b24e-4c34-baeb-e26e8535634e.png)

# Bước 1. Cài đặt MediaLibrary
Ta cài đặt MediaLibrary bằng command này:

```
composer require spatie/laravel-medialibrary:^7.0.0
```

Tiếp theo, ta publish file migration:

```
php artisan vendor:publish --provider="Spatie\MediaLibrary\MediaLibraryServiceProvider" --tag="migrations"
```

Và chạy migration:

```
php artisan migrate
```

Đến bây giờ, ta đã có bảng media trong database của mình.

![](https://images.viblo.asia/55ba5408-3f76-423d-92aa-36686a413656.png)

Bảng này sử dụng [Quan hệ đa hình](https://www.youtube.com/watch?v=rx1DQBE01b0).

# Bước 2. Làm việc với Dropzone.js
Trong file view sử dụng blade này, ta cần sử dụng code JavaScript của [Dropzone](https://www.dropzonejs.com/).

```
<form action="{{ route("projects.store") }}" method="POST" enctype="multipart/form-data">
    @csrf

    {{-- Name/Description fields, irrelevant for this article --}}

    <div class="form-group">
        <label for="document">Documents</label>
        <div class="needsclick dropzone" id="document-dropzone">

        </div>
    </div>
    <div>
        <input class="btn btn-danger" type="submit">
    </div>
</form>
```

Trong đoạn code trên, ta thấy:
* Form sẽ được gửi thông qua route **projects.store** - ta sẽ nói về cái này sau.
* Dropzone nó chỉ bao gồm 1 thẻ Div chứa id và class của dropzone.

Bây giờ, t sử dụng JavaScript ở phía cuối của đoạn code:

```
@section('scripts')
<script>
  var uploadedDocumentMap = {}
  Dropzone.options.documentDropzone = {
    url: '{{ route('projects.storeMedia') }}',
    maxFilesize: 2, // MB
    addRemoveLinks: true,
    headers: {
      'X-CSRF-TOKEN': "{{ csrf_token() }}"
    },
    success: function (file, response) {
      $('form').append('<input type="hidden" name="document[]" value="' + response.name + '">')
      uploadedDocumentMap[file.name] = response.name
    },
    removedfile: function (file) {
      file.previewElement.remove()
      var name = ''
      if (typeof file.file_name !== 'undefined') {
        name = file.file_name
      } else {
        name = uploadedDocumentMap[file.name]
      }
      $('form').find('input[name="document[]"][value="' + name + '"]').remove()
    },
    init: function () {
      @if(isset($project) && $project->document)
        var files =
          {!! json_encode($project->document) !!}
        for (var i in files) {
          var file = files[i]
          this.options.addedfile.call(this, file)
          file.previewElement.classList.add('dz-complete')
          $('form').append('<input type="hidden" name="document[]" value="' + file.file_name + '">')
        }
      @endif
    }
  }
</script>
@stop
```

* **route(‘admin.projects.storeMedia’)** - nó sẽ là URL để xử lý tệp đã được chọn trước khi form được gửi.
* **$(‘form’).append()** - sau khi URL ở trên thực hiện công việc tải tệp lên, ta sẽ lấy được tên file và gán nó vào value của input hidden.
* Ngoài ra còn có chức năng **remove file**, sau khi xóa thì input hidden kia cũng bị xóa.
* Một vài chi tiết khác như **CSRF-token** hoặc **hạn chế dung lượng file tải lên** thì tự tìm hiểu trong đoạn code trên nhé.

**Lưu ý:** code JavaScript này vẫn sẽ ok cả với chức năng **edit**, chứ không riêng gì với **create**.

Bây giờ, ta cần thêm một số css và js từ cdn nữa:

```
{{-- CSS assets in head section --}}
<link href="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.1/min/dropzone.min.css" rel="stylesheet" />

{{-- ... a lot of main HTML code ... --}}

{{-- JS assets at the bottom --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.js"></script>
{{-- ...Some more scripts... --}}
<script src="https://cdnjs.cloudflare.com/ajax/libs/dropzone/5.5.1/min/dropzone.min.js"></script>
@yield('scripts')

</html>
```

Giờ ta đã có thể tải thử 1 file nào đó lên vào phần Dropzone, nhưng nó chưa thể submit vì ta cần phải làm thêm một vài phần nữa.

# Bước 3. Upload file
Đầu tiên, ở file **routes/web.php** chúng ta sẽ có dòng này, nếu chưa có thì các bạn thêm vào nhé:

```
Route::post('projects/media', 'ProjectsController@storeMedia')
  ->name('projects.storeMedia');
```

Tiếp theo, ta mở file **app/Http/Controllers/ProjectsController.php:**

```
public function storeMedia(Request $request)
{
    $path = storage_path('tmp/uploads');

    if (!file_exists($path)) {
        mkdir($path, 0777, true);
    }

    $file = $request->file('file');

    $name = uniqid() . '_' . trim($file->getClientOriginalName());

    $file->move($path, $name);

    return response()->json([
        'name'          => $name,
        'original_name' => $file->getClientOriginalName(),
    ]);
}
```

Không có gì đặc biệt ở đây, chỉ cần sử dụng các hàm PHP - Laravel bình thường để tải lên tệp, tạo tên tệp duy nhất của nó và trả lại cùng với tên gốc, như kết quả JSON, để tập lệnh Dropzone có thể tiếp tục.

**Lưu ý:** **storage/tmp/uploads** chỉ là đường dẫn tạm thời, bạn có thể chọn đường dẫn khác.

Bây giờ, chúng ta đã có các file được tải lên server, nhưng chưa có dữ liệu trong database, vì form chưa được submit, nhìn nó sẽ như thế này:

![](https://images.viblo.asia/999c193a-2216-4034-8453-2d98bca6896b.png)

# Bước 4. Submit form
Sau khi ấn nút Submit, ta gọi đến hàm **ProjectsController@store()**, hàm này là hàm có sẵn của resource trong Laravel:

```
public function store(StoreProjectRequest $request)
{
    $project = Project::create($request->all());

    foreach ($request->input('document', []) as $file) {
        $project->addMedia(storage_path('tmp/uploads/' . $file))->toMediaCollection('document');
    }

    return redirect()->route('projects.index');
}
```

# Bước 5. Edit / Update form
Với chức năng Edit, phần Dropzone của client không thay đổi, chỉ có phía server cần phải xem lại một chút:

```
public function update(UpdateProjectRequest $request, Project $project)
{
    $project->update($request->all());

    if (count($project->document) > 0) {
        foreach ($project->document as $media) {
            if (!in_array($media->file_name, $request->input('document', []))) {
                $media->delete();
            }
        }
    }

    $media = $project->document->pluck('file_name')->toArray();

    foreach ($request->input('document', []) as $file) {
        if (count($media) === 0 || !in_array($file, $media)) {
            $project->addMedia(storage_path('tmp/uploads/' . $file))->toMediaCollection('document');
        }
    }

    return redirect()->route('admin.projects.index');
}
```

Hiểu đơn giản đoạn code trên thì là: trước tiên ta xóa các tệp không sử dụng, sau đó chỉ gán những tệp chưa có trong danh sách.

# Case khác
Giả sử người dùng đã chọn tải lên các file của mình nhưng không ấn nút submit, thì các file đó vẫn được lưu trên server. Cái này thì sẽ tùy vào các xử lý của bạn: lưu vào bộ nhớ của người dùng để sau này sử dụng hoặc dùng 1 con cron job để xóa sạch nhưng file không sử dụng chẳng hạn.

***Tài liệu tham khảo:*** Bài này mình đã dịch ra từ https://laraveldaily.com/multiple-file-upload-with-dropzone-js-and-laravel-medialibrary-package/.

Cảm ơn các bạn đã dành thời gian xem qua.