# Mở đầu
&nbsp;&nbsp;&nbsp;&nbsp;Trong quá trình làm dự án, các bạn chắc hẳn cũng gặp nhiều vấn đề, mình cũng vậy nhưng mỗi lần như thế mình lại học nhiều điều. Hôm nay mình sẽ đi tìm hiểu về một công cụ soạn thảo `Markdown`.
# Nội dung
**1. Khái niệm**

**2. Tích hợp**

**3. Một số config**

**4. Sử dụng cơ bản**
### 1. Khái niệm
&nbsp;&nbsp;&nbsp;&nbsp;**Markdown** là một ngôn ngữ đánh dấu với cú pháp văn bản thô, được thiết kế để có thể dễ dàng chuyển thành `HTML` và nhiều định dạng khác sử dụng một công cụ cùng tên. Nó thường được  dùng để tạo các tập tin readme, viết tin nhắn trên các diễn đàn, và tạo văn bản có định dạng bằng một trình biên tập văn bản thô.
### 2. Tích hợp
&nbsp;&nbsp;&nbsp;&nbsp;Hiện tại có rất nhiều thư viện hỗ trợ để mình tích hợp vào. Ở đây mình có giới thiệu một thư viện mà mình dùng và thấy cũng dễ dàng để sử dụng `SimpleMDE`
Chúng ta có thể cài đặt dùng `npm` hoặc tải file nén về 
> npm i simplemde

Hoặc

&nbsp;&nbsp;&nbsp;&nbsp;[Vào đây để download](https://simplemde.com/)

&nbsp;&nbsp;&nbsp;&nbsp;Sau đó ta tìm đến file `simplemde.min.css` và `simplemde.min.js` để nhúng vào ứng dụng của chúng ta.

&nbsp;&nbsp;&nbsp;&nbsp;Còn cách nữa ta có thể dùng link `cdn` như dưới đây:
```css
<link rel="stylesheet" href="https://cdn.jsdelivr.net/simplemde/latest/simplemde.min.css">
```
```js
<script src="https://cdn.jsdelivr.net/simplemde/latest/`simplemde.min.js`"></script>
```

Sau khi nhúng ta set vào nơi cần gán như là `textarea` dựa theo `id` của element đó:
```js
<script>
var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
</script>
```
hoặc 
```js
<script>
var simplemde = new SimpleMDE({ element: $("#MyID")[0] });
</script>
```
Get/Set the content 
```js
simplemde.value();
simplemde.value("This text will appear in the editor");
```
### 3. Một số config
**`autoDownloadFontAwesome`**:  Nếu được đặt thành `true` buộc tải xuống `font-awesome` (sử dụng cho icons). nếu đặt là `fasle` ngăn tải xuống. Mặc đinh là `undefined`, sẽ kiểm tra một cách thông minh xem `font-awesome` đã được đưa vào chưa, sau đó tải xuống cho phù hợp.

**`autofocus`** :  Nếu được đặt thành `true`, tự động lấy nét trình chỉnh sửa. Mặc định là `false`.

**`autosave`**: Lưu văn bản đang được soạn thảo. Sẽ xóa khi submit.
* `enabled`: Nếu đặt là `true` thì văn bản được tự động lưu. Mặc định là `false`.
* `delay`: Độ trễ giữa các lần lưu. Được tính bằng mili giây. Mặc định là `10000` (10s).
* `uniqueId`: Đặt một mã định danh chuỗi duy nhất để `SimpleMDE` có thể tự động lưu. Một cái gì đó tách biệt điều này với các phiên bản khác của SimpleMDE ở nơi khác trên trang web của mình.


**`toolbar`**: Nếu đặt `false` ẩn thanh công cụ. Mặc định hiển thị mảng icons. Ví dụ
```javascript
<script>
        var simplemde = new simpleMDE({
            element: document.getElementById('content_category'),
            autoDownloadFontAwesome: true,
            autofocus: true,
            autosave: true,
            showIcons: ['code', 'table'],
            spellChecker: false,
            promptURLs: true,
            toolbar: [
                { name: "bold", action: simpleMDE.toggleBold, className: "fa fa-bold", title: "Bold", },
                { name: "heading-1", action: simpleMDE.toggleHeading1, className: "fa fa-header fa-header-x fa-header-1", title: "Big Heading",},
                { name: "heading-2", action: simpleMDE.toggleHeading2, className: "fa fa-header fa-header-x fa-header-2", title: "Medium Heading",},
                { name: "heading-3", action: simpleMDE.toggleHeading3, className: "fa fa-header fa-header-x fa-header-3", title: "Small Heading",},
                "|",
                { name: "link", action: simpleMDE.drawLink, className: "fa fa-link no-mobile", title: "Create Link",},
                { name: "unordered-list", action: simpleMDE.toggleUnorderedList, className: "fa fa-list-ul", title: "Generic List",},
                { name: "ordered-list", action: simpleMDE.toggleOrderedList, className: "fa fa-list-ol", title: "Numbered List",},
                "|",
                { name: "preview", action: simpleMDE.togglePreview, className: "fa fa-eye no-disable", title: "Toggle Preview",},
                // { name: "side-by-side", action: simpleMDE.toggleSideBySide, className: "fa fa-columns no-disable no-mobile",title: "Toggle Side by Side",},
                // { name: "fullscreen", action: simpleMDE.toggleFullScreen, className: "fa fa-arrows-alt no-disable no-mobile", title: "Toggle Fullscreen",},
                {
                    name: "image",
                    action: function() {
                        $('#UpImage').modal("show");
                    },
                    className: "fa fa-image",
                    title: "Upload Image",
                }
            ]
        });
    </script>
    
   ```
   
 Chúng ta sẽ được:
 
![](https://images.viblo.asia/439ec927-e002-474b-a165-24bfccffdc19.png)

&nbsp;&nbsp;&nbsp;&nbsp;**Toolbar icons**
Dưới đây là các toolbar icons  (chỉ một số trong số đó được đặt theo mặc định), có thể được sắp xếp lại theo cách bạn muốn. 

`name` là `name` của icons, được tham chiếu trong JS. `Action` là một function hoặc một URL. `Class` để hiển thị các icons. `Tooltip` là chú giải `tooltip`  xuất hiện thông qua thuộc tính `title = ''`. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ngoài ra, bạn có thể thêm dấu phân cách giữa bất kỳ biểu tượng nào bằng cách thêm '|' Đến mảng thanh `toolbar`.

Trên đây là mảng icons.

Name | Action | Tooltip<br>Class
:--- | :----- | :--------------
bold | toggleBold | Bold<br>fa fa-bold
italic | toggleItalic | Italic<br>fa fa-italic
strikethrough | toggleStrikethrough | Strikethrough<br>fa fa-strikethrough
heading | toggleHeadingSmaller | Heading<br>fa fa-header
heading-smaller | toggleHeadingSmaller | Smaller Heading<br>fa fa-header
heading-bigger | toggleHeadingBigger | Bigger Heading<br>fa fa-lg fa-header
heading-1 | toggleHeading1 | Big Heading<br>fa fa-header fa-header-x fa-header-1
heading-2 | toggleHeading2 | Medium Heading<br>fa fa-header fa-header-x fa-header-2
heading-3 | toggleHeading3 | Small Heading<br>fa fa-header fa-header-x fa-header-3
code | toggleCodeBlock | Code<br>fa fa-code
quote | toggleBlockquote | Quote<br>fa fa-quote-left
unordered-list | toggleUnorderedList | Generic List<br>fa fa-list-ul
ordered-list | toggleOrderedList | Numbered List<br>fa fa-list-ol
clean-block | cleanBlock | Clean block<br>fa fa-eraser fa-clean-block
link | drawLink | Create Link<br>fa fa-link
image | drawImage | Insert Image<br>fa fa-picture-o
table | drawTable | Insert Table<br>fa fa-table
horizontal-rule | drawHorizontalRule | Insert Horizontal Line<br>fa fa-minus
preview | togglePreview | Toggle Preview<br>fa fa-eye no-disable
side-by-side | toggleSideBySide | Toggle Side by Side<br>fa fa-columns no-disable no-mobile
fullscreen | toggleFullScreen | Toggle Fullscreen<br>fa fa-arrows-alt no-disable no-mobile
guide | [This link](https://simplemde.com/markdown-guide) | Markdown Guide<br>fa fa-question-circle

Trên là một số config, các bạn có thể xem thêm ở link mình để bên dưới.
### 4. Sử dụng cơ bản
Đầu tiên là thẻ `h`, ở `markdown` thì tương tự dư này
```
h1 -> # h1
h2 -> ## h2
h3 -> ### h3
```
Tương ứng với đầu ra
# h1
## h2
### h3
Kiểu chữ
```
in đậm -> **in đậm**
in nghiêng -> *in nghiêng*
gạch ngang -> ~~gạch ngang~~
```
Kết quả tương ứng:

in đậm -> **in đậm**

in nghiêng -> *in nghiêng*

gạch ngang -> ~~gạch ngang~~

với các ngôn ngữ lập trình
với cú pháp 
```
   ```ngôn ngữ 
   
       ```
```

ví dụ :
```
    ```html
            <html>
                <head></head>
                <body>
                        <div>he he</div>
                </body>
            </html>
    ```
    
   ```
   
   Kết quả nà:
   ```html
            <html>
                <head></head>
                <body>
                        <div>he he</div>
                </body>
            </html>
   ```
Bên trên là một số cách dùng, mình sẽ để link tham khảo để các bạn tìm hiểu sâu hơn.

# Kết Luận
&nbsp;&nbsp;&nbsp;&nbsp;Ngành coder chúng ta rất nhiều kiến thức đúng không nào, chúng ta cứ từ từ thưởng thức nhé. Hi vọng qua bài này chúng ta sẽ có thêm một sự lựa chọn ứng dụng của chúng ta với vấn đề soạn thảo.

# Tài Liệu tham khảo

[Tài Liệu 1](https://github.com/sparksuite/simplemde-markdown-editor)

[Hướng dẫn sử dung markdown để soạn thảo](https://viblo.asia/helps/cach-su-dung-markdown-bxjvZYnwkJZ)