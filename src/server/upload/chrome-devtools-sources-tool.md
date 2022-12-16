# Sources tool

Tool sources là tool thứ 3 trong số các tool mặc định. Nó là nơi lưu trữ mã nguồn script và css... của website và cho phép chỉnh sửa debug các chúng.

Các công dụng chính của `sources tool`:
 - Xem files.
 - Chỉnh sửa CSS và Javascript.
 - Cài đặt một workspace: Để các thay đổi trên DevTool sẽ được lưu vào sources code của bạn. 
 - Tạo và lưu Snippets của JavaScript, các đoạn snippets này có thể chạy trên bất kỳ trang nào không nhất thiết là trang hiện tại!
 - Debug JavaScript.


## Xem sources code CSS và JS, các file bạn có quyền đọc

Đầu tiên thì `sources` cho phép bạn xem các file: CSS, JS, images ... của trang đang chạy qua tab `Page`của `sources tool`.

![](https://images.viblo.asia/f7266058-9f7a-4349-b93c-0d75bf1a728e.png)

Cùng với đó là một số thao tác với file đó, ví dụ:
- Click vào file để xem source code của file đó (có thể hiện dưới dang base64). 
Để sử dụng base64 image bạn có thể tham khảo  [stackoverflow](https://stackoverflow.com/questions/8499633/how-to-display-base64-images-in-html).
- Open in new tab: để xem một file trong một full trang.
- Click chuột phải và `Save as` để lưu file về máy.
...

Mặt khác chúng ta cũng có thể xem source của các extensions bằng cách chọn tab `Content script`.

Hầu hết các file source javascript trên đây đều có thể xem được nên các trang web thường mix file về dạng min để che giấu code hay làm cho code khó đọc hơn. Bạn có thể dùng [css beautifier](https://www.freeformatter.com/css-beautifier.html) để nó dễ nhìn hơn 1 tẹo (chỉ hơn 1 tẹo thôi nhé :sweat_smile:)
## Chỉnh sửa file CSS và JS

Khi xem source code theo frame của `sources tool` chúng ta có thể chỉnh sửa file đó.

Thêm các cú pháp css, js như bạn thường viết. Nếu bạn muốn sử dụng jQuery thì có thể viết trong hàm ví dụ:
```js
(function (document, $) {
    $a = $('a');
    alert($a);
})(window.document, jQuery);
```

Ví dụ mình có thêm đoạn code `console.log("Day la cai scripts minh them vao");` vào một file js và save lại. Note: chỉ áp dụng cho lần biên dịch sau, do đó chúng ta cần tạo workspace để lưu lại dữ liệu.

![](https://images.viblo.asia/de689354-fec9-415b-9b53-9c77f13f9799.png)

## Cài đặt workspace

Trong `Sources` có thể cho phép bạn đồng bộ với code trên project, code bên trong `Sources` thay đổi thì code trong project của bạn cũng thay đổi và ngược lại.

![](https://images.viblo.asia/bcfd4112-4a8d-4133-8661-fdca7fb2dce5.png)

Cách tạo `workspace`: tab `Filesystem` -> `Add forder to workspace` -> chọn forder -> chọn Allow.

Sau đó chúng ta có thể chỉnh sửa trên Chrome và lưu lại mà không cần copy paste :upside_down_face:

## Tạo snippets
Nếu chúng ta muốn chỉnh sửa javascript luôn và không muốn reload lại trang thì phải làm sao?

Chrome cung cấp cách tạo `snippets` tiện ích cho bạn, bạn có thể tạo 1 snippets mà chạy cho tất cả các trang (thật là tiện lợi!) .

Cách tạo `Snippets`: tab `Snippet` -> `New snippet` -> Viết code -> Ctrl+Enter 
![](https://images.viblo.asia/28db0db7-2212-44a7-99bf-d3d8cce9c42b.gif)

Các snippet này là một [Bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) có thể được lưu lại trên trình duyệt mà k bị mất khi close.

## Debug JavaScript

Bạn có thể tham khảo cách debug javascript ở trang của nhà phát triển 
[Google Chrome Developers](https://www.youtube.com/watch?v=H0XScE08hy8&feature=youtu.be)

# Tổng kết 
Cám ơn các bạn đã đọc bài viết của mình :hugs:

Tài liệu tham khảo: [developers.google.com](https://developers.google.com/web/tools/chrome-devtools/javascript)