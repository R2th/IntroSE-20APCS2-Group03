## **I. Giới thiệu**

Đây là 1 thư viện hỗ trợ việc tải lên nhiều tệp, hỗ trợ kéo thả tệp, thanh tiến trình tải tệp lên, xác thực và xem trước hình ảnh, nhạc và video.

Hỗ trợ cross-domain, chunked file và có thể tiếp tục upload sau khi dừng việc upload, thay đổi kích thước hình ảnh ở bên phía client. Hoạt động với mọi nền tảng từ phía máy chủ(PHP, Python, Ruby...), và có hỗ trợ tải lên tệp html tiêu chuẩn.

## **II. Các hàm tiện ích của Jquery fileupload.**

Jquery file upload cung cấp 1 API tải tệp và một plugin bổ sung cung cấp giao diện người dùng hoàn chỉnh. Tất cả các tùy chọn cơ bản đều có trong phiên bản UI, trong khi các phiên bản sau hỗ trợ 1 số tùy chọn bổ sung.

Ví dụ về cách sử dụng các tùy chọn của Jquery, ta có thể tham khảo tài liệu API.

**AJAX Options**

Jquery fileupload sử dụng Jquery.ajax cho các yêu cầu tải tệp, Điều này đúng ngay cả với các trình duyệt không hỗ trợ XHR, nhờ plugin Iframe Transport.

Các tùy chọn được cài đặt cho Jquery fileupload được chuyển đến Jquery.ajax và cho phép định nghĩa bất kì cuộc gọi ajax hoặc callback nào.

Các tùy chọn ajax processData, contentType và cache được đặt thành false để tải được các tệp lên và không nên thay đổi chúng.

**url**

Đó là url mà yêu cầu gửi đến.

Ví dụ: `/path/to/upload/handler.json`

**type**

Phương thức cho việc tải tệp lên. Nó có thể là `POST`, `PUT`, hoặc `PATCH` và mặc định là `POST`.

**dataType**

Loại dữ liệu được gửi về từ phía server.

Ví dụ: `json`

**dropZone**

Đối tượng kéo thả của Jquery, theo mặc định là 1 tệp hoàn chỉnh.

Nó được đặt thành null hoặc để trống để tắt hỗ trợ kéo thả,

**pasteZone**

Đối tượng thả của Jquery, theo mặc định nó cũng là 1 tệp hoành chỉnh.

**fileInput**

Đối tượng trường nhập vào tệp của jquery, nó được lắng nghe khi thay đổi tệp.

Nếu không xác định, nó được đặt thành các trường nhập tệp bên trong phần tử widget khi khởi tạo plugin.

**paramName**

Tên tham số cho dữ liệu biểu mẫu tệp.

Nếu không xác định hoặc để nó trống, thuộc tính tên của trường nhập tệp được sử dụng hoặc nó sẽ là `files[]` nếu thuộc tính tên đầu vào của tệp trống.

**singleFileUploads**

Theo mặc định, mỗi tùy chọn tệp được tải lên bằng 1 yêu cầu XHR riêng biệt.

Đặt tùy chọn này thành false để tải lên nhiều tệp trong mỗi yêu cầu.

**autoUpload**

Theo mặc định, các tệp sau khi được chọn sẽ được tải ngay lên khi người dùng nhấn vào nút bắt đầu. Để bật tải lên tự động, cài đặt tùy chọn này thành true.

Trên đây là các tùy chọn thường được sử dụng khi sử dụng plugin jquery fileupload.

## **III. Các callbacks.**

Tất cả các callbacks đều là 1 loại hàm và có thể được ràng buộc để lắng nghe các sự kiện, sử dụng callback với tên gọi cộng với `fileupload` làm tiền tố:

```
$('#fileupload')
    .bind('fileuploadadd', function (e, data) {/* ... */})
    .bind('fileuploadsubmit', function (e, data) {/* ... */})
    .bind('fileuploadsend', function (e, data) {/* ... */})
    .bind('fileuploaddone', function (e, data) {/* ... */})
    .bind('fileuploadfail', function (e, data) {/* ... */})
    .bind('fileuploadalways', function (e, data) {/* ... */})
    .bind('fileuploadprogress', function (e, data) {/* ... */})
    .bind('fileuploadprogressall', function (e, data) {/* ... */})
    .bind('fileuploadstart', function (e) {/* ... */})
    .bind('fileuploadstop', function (e) {/* ... */})
    .bind('fileuploadchange', function (e, data) {/* ... */})
    .bind('fileuploadpaste', function (e, data) {/* ... */})
    .bind('fileuploaddrop', function (e, data) {/* ... */})
    .bind('fileuploaddragover', function (e) {/* ... */})
    .bind('fileuploadchunkbeforesend', function (e, data) {/* ... */})
    .bind('fileuploadchunksend', function (e, data) {/* ... */})
    .bind('fileuploadchunkdone', function (e, data) {/* ... */})
    .bind('fileuploadchunkfail', function (e, data) {/* ... */})
    .bind('fileuploadchunkalways', function (e, data) {/* ... */});
```

**add**

add callback có thể hiểu là callback lắng nghe sự kiện cho hàng đợi yêu cầu tải tệp. Nó được gọi ngay sau khi các tệp được thêm vào plugin-thông qua lựa chọn nhập tệp, hoặc kéo thả.

Tham số data cho phép khi đè các tùy chọn cho cài đặt ajax được tốt hơn. `data.files` chứa danh sách các tệp cho yêu cầu tải tệp.

Qúa trình tải tệp lên bắt đầu khi phương thức submit được gọi trên tham số data. data.submit trả về 1 đối tượng Promise và cho phép đính kèm thêm các xử lí bổ sung bằng các add callback.

Theo mặc định

```
function (e, data) {
    if (data.autoUpload || (data.autoUpload !== false &&
            $(this).fileupload('option', 'autoUpload'))) {
        data.process().done(function () {
            data.submit();
        });
    }
}
```

Ví dụ tùy chọn:

```
function (e, data) {
    $.each(data.files, function (index, file) {
        console.log('Added file: ' + file.name);
    });
    data.url = '/path/to/upload/handler.json';
    var jqXHR = data.submit()
        .success(function (result, textStatus, jqXHR) {/* ... */})
        .error(function (jqXHR, textStatus, errorThrown) {/* ... */})
        .complete(function (result, textStatus, jqXHR) {/* ... */});
}
```

**submit**

Gọi lại sự kiện submit của mỗi tệp tin được tải lên. Nếu callback này trả về false, yêu cầu tải tệp lên không được bắt đầu:

```
function (e, data) {
    var input = $('#input');
    data.formData = {example: input.val()};
    if (!data.formData.example) {
      data.context.find('button').prop('disabled', false);
      input.focus();
      return false;
    }
}
```

**send**

Gọi lại cho việc bắt đầu tải tệp lên. Nếu callback này trả về false, tệp sẽ bị hủy bỏ cho việc tải lên:

```
function (e, data) {
    if (data.files.length > 10) {
        return false;
    }
}
```

**done**

Gọi lại yêu cầu sau khi tải lên tệp thành công. 

```
function (e, data) {
    // data.result
    // data.textStatus;
    // data.jqXHR;
}
```

**fail**

Cuộc lại sau khi việc tải lên các tệp không thành công

```
function (e, data) {
    // data.errorThrown
    // data.textStatus;
    // data.jqXHR;
}
```

**always**

Gọi lại cho các yêu cầu tải tệp lên hoàn thành hoặc bị hủy bỏ

```
function (e, data) {
    // data.result
    // data.textStatus;
    // data.jqXHR;
}
```

**progress**

Gọi khi tiến trình tải tệp lên được thực hiện

```
function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
}
```

**progressall**

Được gọi cho việc upload cục bộ, nghĩa là trong khi tất cả các file đang trong quá trình tải lên

```
function (e, data) {
    var progress = parseInt(data.loaded / data.total * 100, 10);
}
```

**start**

Gọi khi bắt đầu tải tệp lên

```
function (e) {
    console.log('Uploads started');
}
```

**stop**

Gọi khi dừng việc tải tệp lên

```
function (e) {
    console.log('Uploads finished');
}
```

Đây là các callback sử dụng cho việc upload file cơ bản. Ngoài ra còn các hàm tiện ích và các callback khác, khi các bạn sử dụng phiên bản mở rộng. Tham khảo tại [Jquery FileUpload wiki](https://github.com/blueimp/jQuery-File-Upload/wiki/Options). Cảm ơn các bạn đã theo dõi bài viết. Bài viết trước mình có sử dụng plugin này để thực hiện việc tải tệp lên trực tiếp S3, các bạn có thể tham khảo tại đây: https://viblo.asia/p/tai-anh-truc-tiep-len-amazon-s3-bang-jquery-fileupload-V3m5Wo4v5O7