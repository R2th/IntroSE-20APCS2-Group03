# 1.Tổng quan về TinyMCE.
TinyMCE là một nền tảng độc lập dựa trên Javascript HTML WYSIWYG được phát hành bởi LGPL web. Nó cung cấp một trình soạn thảo văn bản HTML, được thiết kế để đơn giản hóa việc tạo ra nội dung web. Nó giúp chúng ta dễ dàng chỉnh sửa định dạng những đoạn văn bản như blog, description... Hơn nữa nó cũng hoàn toàn miễn phí
# 2.Sử dụng TinyMCE trong ExpressJS.
TinyMCE được ứng dụng và sử dụng trong rất nhiều ngôn ngữ, việc cài đặt bằng cách tải package về hoặc cài đặt bằng dòng lệnh trên terminal.
Trong bài viết này mình sẽ ứng dụng TinyMCE trong framework ExpressJS.
## 2.1. Cài đặt.
Chúng mình sẽ cài đặt TinyMCE qua Bower -  công cụ quản lý các nguồn tài nguyên cho việc lập trình font-end. Được phát triển và Open Source bởi Twitter.
Nếu bạn nào chưa rõ lắm về cách cài đặt và sử dụng npm thì có thể tham khảo tại bài viết :
https://trungquandev.com/toi-da-su-dung-bower-de-quan-ly-cac-thu-vien-code-nhu-the-nao/

Thêm TinyMCE vào project của mình bằng câu lệnh:
```
    bower install tinymce
```
## 2.2.Sử dụng.
Sau khi chúng ta đã cài xong TinyMCE bằng bower , bước tiếp theo để nhúng TinyMCE vào trong project của mình để sử dụng. Mình sẽ lấy một đoạn code demo 1 form tạo 1 bài viết.
```HTML
<section class="content-header">
    <h1><%= __('Add post') %></h1>
</section>
<!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-10 offset-1">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <h3 class="box-title"><%= __('Create new post') %></h3>
                </div>
                <form method="POST" action="/admin/posts/store" role="form" class="form-element" id="create-post">
                    <div class="box-body">
                        <div class="form-group">
                            <label for="name"><%= __('Title') %></label>
                            <input class="form-control" type="text" name="title" id="title" placeholder="<%= __('Post\'s name...') %>">
                        </div>
                        <div class="form-group">
                            <label for="name"><%= __('Content') %></label>
                            <textarea class="form-control" name="content" id="content" placeholder="<%= __('Content\'s name...') %>"></textarea>
                        </div>
                    </div>
                    <div class="box-footer text-right">
                        <button type="submit" class="btn btn-lg btn-warning"><%= __('Save') %></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<%- contentFor('appjs') %>
<script type="text/javascript" src="/javascripts/admin/create_category_validator.js"></script>
<script type="text/javascript" src="/javascripts/admin/create_category_validator.js"></script>
<script src="/bower/tinymce/tinymce.min.js"></script>
  <script type="text/javascript">
      tinymce.init({
        selector: '#content'
      });
  </script>

```
Chúng ta sẽ nhúng đoạn script này vào để sử dụng TinyMCE.
```HTML
    <script src="/bower/tinymce/tinymce.min.js">
        tinymce.init({
            selector: '#content'
        });
    </script>
```
Khi cài đặt xong bower thì sẽ sinh ra trong project của chúng ta file .bowerrc và trong đó ta config đường dẫn khi chúng ta bower về thì package đó sẽ nằm ở đâu. Thì ở đây trong file .bowerrc mình config tất cả các package khi bower về sẽ nằm ở public/bower .<br>
.bowerrc
```Javascript
{
    "directory": "public/bower"
}
```
Đoạn code 
```HTML
 tinymce.init({
      selector: '#content'
 });
```
Dùng để init TinyMCE , #content là id của thẻ <textarea></textarea>.<br>
Với 1 thao tác nhúng đoạn script đơn giản như vậy , chúng mình sẽ được giao diện TinyMCE như sau :
![](https://images.viblo.asia/3be71c0b-f50e-4548-8823-3eb4759cf371.png)
Đoạn code trên sẽ quyết định giao diện của HTML editor:

plugins: cài đặt những phần mở rộng cho HTML editor:

Table: hỗ trợ việc chèn bảng và làm việc với bảng
Image: có thể chèn ảnh.
còn rất nhiều plugin khác, bạn có thể tham khảo đây: http://archive.tinymce.com/wiki.php/Plugins

toolbar: cài đặt các công cụ cần thiết cho việc soạn thảo như:

Thao tác: undo, redo
Căn lề: alignleft, aligncenter, ignjustify, alignright
Định dạng font: formatselect, fontselect, fontsizeselect
Đinh dạng chữ: bold, italic, underline
Thứ tự của các công cụ trên sẽ giống như thứ tự được viết trong file config.
# 3.Ứng dụng plugins có sẵn của TinyMCE.
Khi viết một bài viết thì chúng ta thường muốn chèn ảnh vào bài viết. Sau đây mình sẽ giới thiệu plugin dùng để chèn ảnh khi viết một bài viết. Mình sẽ dùng plugin có sẵn trong TinyMCE .
![](https://images.viblo.asia/241fecf6-d5cd-478e-bb1f-134685e7bf1c.gif)
```HTML
<script src="/bower/tinymce/tinymce.min.js"></script>
  <script type="text/javascript">
        tinymce.init({
            selector: '#content',
            plugins: "image",
        });
     </script>
```
Thêm trường plugins có giá trị "image". Plugin này ở thư mục tinymce/plugins/image/plugin.min.js.<br>
Ta sử dụng plugin có sẵn của TinyMCE thì chỉ chèn được ảnh khi có được đường dẫn của ảnh chứ không chèn được ảnh có sẵn ở local. Sau đây mình sẽ giới thiệu cách thứ 2 để chèn ảnh vào bài viết từ local.<br>
Chúng ta sẽ sử dụng đoạn code sau.<br>
```HTML
<script src="/bower/tinymce/tinymce.min.js"></script>
  <script type="text/javascript">
  tinymce.init({
    selector: '#content',
    plugins: "image code",
    image_title: true,
    automatic_uploads: true,
    file_picker_types: 'image',
    file_picker_callback: function(cb, value, meta) {
        var input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.onchange = function () {
            var file = this.files[0];
            var reader = new FileReader();

            reader.onload = function () {
                var id = 'blobid' + (new Date()).getTime();
                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                var base64 = reader.result.split(',')[1];
                var blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);
                cb(blobInfo.blobUri(), {title: file.name});
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }
  });
  </script>
```
Sau đây là hình ảnh demo.
![](https://images.viblo.asia/c3cb30df-9dd7-48d5-9a13-79a295f809eb.gif)
<br>
# 4.Kết luận.
Trên đây mình đã giới thiệu về TinyMCE cũng như là cách sử dụng plugin trong TinyMCE. TinyMCE  dễ cài đặt và sử dụng, có nhiều tùy chọn. Mong sẽ giúp ích được cho các bạn.
# 5.Tham khảo.
https://www.tinymce.com/docs/plugins/<br>
https://www.tinymce.com/docs/demo/file-picker/