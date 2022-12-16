Trước đây ở bài viết [Các trình soạn thảo WYSIWYG phổ biến dùng cho website](https://viblo.asia/p/cac-trinh-soan-thao-wysiwyg-pho-bien-dung-cho-website-LzD5dXLW5jY) mình đã từng đề cập đến trình soạn thảo Quilljs. Đây cũng là 1 trong số những rich editor được sử dụng phổ biến thời gian gần đây bởi các chức năng hỗ trợ tiện lợi cho việc soạn thảo (Trong đó có kèm theo giao diện rất đẹp.

Một trong số đó có là giao diện **Bubble** với cách hiển thị Editor giống với Medium. Khi cần định dạng đoạn văn bản, chỉ cần bôi đen và Edior sẽ xuất hiện
![](https://images.viblo.asia/a8afe70a-ff81-4a8e-a78d-ce986a1b0078.png)

Việc tích hợp Quilljs vào ứng dụng Rails cũng khá dễ dàng vì hiện tại đã có Gem hỗ trợ developer làm việc đó một cách nhanh chóng
Các bạn có thể tham khảo về Gem tại link: https://github.com/abhinavmathur/quilljs-rails

## Cách cài đặt

Thêm dòng này vào Gemfile

`gem 'quilljs-rails'`

Sau đó gõ

`$ bundle install`

Hoặc gõ dòng lệnh sau trực tiếp từ Terminal

`$ gem install quilljs-rails`

## Cách sử dụng

Chèn Script Js và nhúng CSS Quill vào trong web của bạn từ CDN bằng cách chèn 2 đoạn mã sau lần lượt vào phần HEADER ở file `application.html.erb`

```
<script src="https://cdn.quilljs.com/1.1.9/quill.js"></script>
<link href="https://cdn.quilljs.com/1.1.9/quill.snow.css" rel="stylesheet">
```

Thêm tiếp dòng này vào file `application.js`

`  //= require quill.global`

**Lưu ý: **  Nếu bạn không muốn Load js và css từ qua CDN thì có thể thêm 2 dòng dưới vào file application.js

```
//= require quill.min
//= require quill.global
```

Nếu muốn biến text_filed hoặc text_area của html thông thường thành Quill Editor thì bạn chỉ cần thêm class `quill_container` cho nó


*Ví dụ*

`<%= f.text_field :title, label: 'Title', type: 'text', class: 'quill_container' %>`


Hoặc nếu bạn sử dụng **Simple form** thì cách khai báo như sau


`<%= f.input :title, input_html: { class: 'quill_container' } %>`


Mặc định, các cài đặt của **Quilljs** sẽ như sau

```
theme: 'snow',
modules: {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        [{ 'color': [] }, { 'background': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        ['clean']
    ]
}
```
    
Để có thể tùy chỉnh, bạn có thể sử dụng mã sau.
```
var defaults = {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                [{ 'color': [] }, { 'background': [] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                ['clean']
            ]
        }
    };

//This is the global config object
Quilljs.setDefaults(defaults)
```


Quilljs hỗ trợ sẵ 2 theme (giao diện cho editor) là **snow**  và **bubble.** Bạn có thể sử dụng chúng bằng cách require tương ứng vào file application.css(or application.scss nếu sử dụng sass)

`*= require quill.snow`

`*= require quill.bubble`

Xem thêm document của Quilljs để biết thêm cách tuỳ chỉnh Toolbar cho Editor của bạn:
https://quilljs.com/docs/quickstart/