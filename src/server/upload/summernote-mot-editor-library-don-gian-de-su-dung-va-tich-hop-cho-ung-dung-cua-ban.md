# Giới thiệu
Chào mọi người, như mọi người cũng biết đối với các trang website blog, tin tức, hay các forum,... thì các thư viện soạn thảo văn bản (editor library) là không thể thiếu, nó tăng trải nghiệm của người dùng hơn là các thẻ `<input>, <textarea>` thông thường. Các editor này cũng vô cùng phong phú và đa dạng, và hôm nay mình sẽ giới thiệu cho các bạn `Summernote` - một editor đơn giản, dễ sử dụng và cực kì mạnh mẽ mà bạn không nên bỏ qua cho ứng dụng của bạn. Vậy chúng ta cùng tìm hiểu về nó nhé.
# Cài đặt
### Download
Bạn có thể vào [đây](https://summernote.org/) để download trực tiếp phiên bản mới nhất của `Summernote` và nhúng chúng vào ứng dụng của bạn.
### CDN
Hoặc bạn có thể nhúng trực tiếp link Cdn dưới đây vào ứng dụng của mình. `Summernote` có các phiên bản hỗ trợ cho cả `Bootstrap 3`, `Bootstrap 4` và phiên bản `không sử dụng Bootstrap`:
1. **Bootstrap 3**
    ```
    <!-- include libraries(jQuery, bootstrap) -->
    <link href="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script> 
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.js"></script> 

    <!-- include summernote css/js -->
    <link href="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css" rel="stylesheet">
    <script src="http://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.js"></script>
    ```
2. **Bootstrap 4**
    ```
    <!-- include libraries(jQuery, bootstrap) -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"></script>

    <!-- include summernote css/js -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-bs4.js"></script>
    ```

3. **Không sử dụng Bootstrap**

    ```
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-lite.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote-lite.js"></script>
    ```
# Sử dụng
### Khởi tạo
Đầu tiên bạn cần khai báo nơi sẽ khởi tạo `Summernote` trên view. `Summernote` có thể được sử dụng cùng `<form>` hoặc sử dụng không cùng `<form>`:
* Nếu sử dụng `Summernote` không cùng `<form>` thì bạn nên sử dụng với thẻ `<div>`:
    ```
    <div id="summernote">Hello Summernote</div>
    ```
* Nếu sử dụng `Summernote` cùng `<form>` thì bạn nên sử dụng với thẻ `<texterea>`:
    ```
    <form method="post">
      <textarea id="summernote" name="editordata"></textarea>
    </form>
    ```
Sau đó bạn cần gọi function khởi tạo `Summernote` mặc định:
```
$('#summernote').summernote();
```
Nếu bạn muốn khởi tạo `Summernote` với các tùy chọn khác:
```
$('#summernote').summernote(option = {});
```
{@embed: https://jsfiddle.net/0x4h9nr3/}

Trong đó, `option` các tùy chọn thiết lập để khởi tạo `Summernote` như:
* `toolbar`: Tùy chỉnh hiển thị các button trên thanh toolbar của editor. Bạn có thể tùy chỉ hiển thị các button trên editor như`style`, `font`, `color`, `fontsize`, `table`,...
* `popover`: Tùy chỉnh hiển thị các button trên các menu popover (Menu popover là các menu sẽ được hiển thị khi bạn click vào các hình ảnh, bảng, link,... mà bạn đã insert vào editor).
* `placeholder`: Nội dung placeholder trong editor.
* `tabsize`: Tùy chỉnh độ rộng của tab.
* `height`, `minHeight`, `maxHeight`: Tùy chỉnh độ cao, min và max của độ cao editor.
* `focus`: Focus vào editor chỉ định (default là false),
* `codemirror`: Tùy chọn các thiết lập của codeview (theme,..)
* `hint`: Tùy chọn thiết lập chức năng gợi ý khi nhập.
* `callbacks`: Tùy chọn khai báo sử dụng các callback function của `Summernote` (`onInit`, `onChange`, `onBlur`...).
*  .....
(Bạn có thể xem thêm các tùy chọn khác [tại đây](https://summernote.org/deep-dive/#initialization-options))

### Basic API
`Summernote` cung cấp cho chúng ta các Basic Api để chúng ta có thể thực hiện một số thao tác cơ bản với nó:
* Get và set nội dung code Html trong editor:
    ```
    // get
    var markupStr = $('#summernote').summernote('code');

    // set
    var markupStr = '<h2>hello world</h2>';
    $('#summernote').summernote('code', markupStr);
    ```
* Tạo, lưu, khôi phục đối tượng Range (bạn có thể đọc về Range [ở đây](https://techblog.vn/selection-amp-range-tim-hieu-mot-chut-truoc-khi-ban-phai-su-dung-no)):
    ```
    // create range
    var range = $('#summernote').summernote('createRange');

    // save range
    $('#summernote').summernote('saveRange');

    // restore range
    $('#summernote').summernote('restoreRange');
    ```
* Undo và Redo:
    ```
    $('#summernote').summernote('undo');
    $('#summernote').summernote('redo');
    ```
* Kiểm tra nội dung của editor có rỗng hay không:
    ```
    if ($('#summernote').summernote('isEmpty')) {
      alert('editor content is empty');
    }
    ```
* Focus vào editor chỉ định:
    ```
    $('#summernote').summernote('focus');
    ```
* Chuyển đổi qua lại giữa chế độ nhập bình thường và codeview:
    ```
    $('#summernote').summernote('codeview.toggle');
    ```
* Xóa nội dung và các lịch sử đã lưu của editor:
    ```
    $('#summernote').summernote('reset');
    ```
* Disable và enable editor:
    ```
    $('#summernote').summernote('disable');
    $('#summernote').summernote('enable');
    ```
* Destroy summernote editor:
    ```
    $('#summernote').summernote('destroy');
    ```
### Font style API và Paragraph API
`Summernote` cung cấp cho chúng ta các Api mà cho phép chúng ta thay đổi các style của văn bản trong editor:
* Thay đổi font, font-style, font-size:
    ```
    $('#summernote').summernote('bold');
    $('#summernote').summernote('fontName', 'Arial');
    $('#summernote').summernote('fontSize', 20);
    ```
* Thay đổi màu sắc chữ và màu nền:
    ```
    $('#summernote').summernote('backColor', 'red');
    $('#summernote').summernote('foreColor', 'blue');
    ```
* Thay đổi căn lề văn bản:
    ```
    $('#summernote').summernote('justifyLeft');
    $('#summernote').summernote('justifyRight');
    ```
* Insert các đoạn văn bản, các danh mục:
    ```
    $('#summernote').summernote('insertParagraph');
    $('#summernote').summernote('insertOrderedList');
    $('#summernote').summernote('insertUnorderedList');
    ```
* Thay đổi lineHeight, format của văn bản:
    ```
    $('#summernote').summernote('lineHeight', 20);
    $('#summernote').summernote('formatH2');  // <h2> </h2>
    ```
* Xóa tất cả style:
    ```
    $('#summernote').summernote('removeFormat');
    ```
* ... (Các bạn có thể xem thêm [tại đây](https://summernote.org/deep-dive/#font-style-api))
### Insertion API
`Summernote` còn cung cấp các Insertion API cho phép chúng ta insert các đoạn văn bản, image, Html, Link,... vào editor.
* Insert image:
    ```
    // @param {String} url
    // @param {String|Function} filename - optional
    $('#summernote').summernote('insertImage', url, filename);

    // example
    $('#summernote').summernote('insertImage', url, function ($image) {
      $image.css('width', $image.width() / 3);
      $image.attr('data-filename', 'retriever');
    });
    ```
* Insert văn bản:
    ```
    // @param {String} text
    $('#summernote').summernote('insertText', 'Hello, world');
    ```
* Insert các phần tử (Html element):
    ```
    var node = document.createElement('div');
    // @param {Node} node
    $('#summernote').summernote('insertNode', node);
    ```
* Insert văn bản có chứa Html:
    ```
    // @param {String} HTML string
    var HTMLstring = '<div><p>Hello, world</p><p>Summernote can insert HTML string</p></div>';
    $('#summernote').summernote('pasteHTML', HTMLstring);
    ```
* Tạo và xóa link:
    ```
    // @param {String} text - link text
    // @param {String} url - link url
    // @param {Boolean} isNewWindow - whether link's target is new window or not
    $('#summernote').summernote('createLink', {
      text: "This is the Summernote's Official Site",
      url: 'http://summernote.org',
      isNewWindow: true
    });

    $('#summernote').summernote('unlink');
    ```
### Callbacks
`Summernote` cung cấp cho chúng ta thêm các callback function sẽ chạy phụ thuộc vào các trạng thái, các sự kiện của editor như `onInit`, `onEnter`, `onFocus`, `onFocus`, `onBlur`, `onKeyup`, `onPaste`, `onImageUpload`,.... Dưới đây là ví dụ về 2 cách sử dụng callback `onFocus`:
```
// onFocus callback
$('#summernote').summernote({
  callbacks: {
    onFocus: function() {
      console.log('Editable area is focused');
    }
  }
});

// summernote.focus
$('#summernote').on('summernote.focus', function() {
  console.log('Editable area is focused');
});
```
Các callback function khác của `Summernote` cũng được sử dụng tương tự như vậy (bạn có thể xem thêm [ở đây](https://summernote.org/deep-dive/#callbacks)).
### Custom button
`Summernote` còn cho phép bạn thêm các custom button của mình vào editor như sau:

Tạo custom button:
```
var HelloButton = function (context) {
  var ui = $.summernote.ui;

  // create button
  var button = ui.button({
    contents: '<i class="fa fa-child"/> Hello',
    tooltip: 'hello',
    click: function () {
      // invoke insertText method with 'hello' on editor module.
      context.invoke('editor.insertText', 'hello');
    }
  });

  return button.render();   // return button as jquery object
}
```
Khai báo custom button vào summernote editor khi khởi tạo:
```
$('.summernote').summernote({
  toolbar: [
    ['mybutton', ['hello']]
  ],

  buttons: {
    hello: HelloButton
  }
});
```
**Lưu ý**: Ở đây là nếu bạn sử dụng `Summernote` version `> 0.8.10` thì sẽ bị báo lỗi ở dòng `context.invoke('editor.insertText', 'hello');` bởi vì lỗi `context is undefined`. Lỗi này chỉ xuất hiện từ sau version `0.8.10` vậy nên nếu bạn sử dụng `Summernote` version `<= 0.8.10` thì sẽ không bị lỗi này nữa.

### Hint
Bạn còn có thể tạo các gợi ý khi nhập trong `Summernote` để gợi ý các từ, các emoji hay mentions các người dùng,...

Một vài ví dụ đơn giản:
{@embed: https://jsfiddle.net/nL36r4ef/}

### i18n
`Summernote` còn hỗ trợ cho cả đa ngôn ngữ (`i18n`).
Đầu tiên bạn cần nhúng file ngôn ngữ tương ứng vào ứng dụng của bạn:
```
<!-- include summernote-ko-KR -->
<script src="lang/summernote-ko-KR.js"></script>
```
Sau đó là thiết lập ngôn ngữ cho summernote editor:
```
$('#summernote').summernote({
    lang: 'ko-KR' // default: 'en-US'
});
```
Bạn có thể xem thêm các ngôn ngữ khác mà `Summernote` hỗ trợ [ở đây](https://github.com/summernote/summernote/tree/master/lang).
# Demo
Mình có sử dụng `Summernote` với `Larevel` để làm một trang tạo bài viết đơn giản, và đây là kết quả :D

![](https://images.viblo.asia/9a9acd71-de80-4c70-81f4-6201b9ee6ade.gif)
# Kết luận
Qua bài viết này mình đã giới thiệu cho các bạn `Summernote` - một editor đơn giản, dễ sử dụng và cực kì mạnh mẽ. Cá nhân mình khá thích `Summernote` và thấy đây là một editor khá tốt cho các ứng dụng của mình. Hy vọng bài viết này sẽ hữu ích với các bạn :D.
# Tham khảo
https://summernote.org/