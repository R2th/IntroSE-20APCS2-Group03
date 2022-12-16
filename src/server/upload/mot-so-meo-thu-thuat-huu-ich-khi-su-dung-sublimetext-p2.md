![](https://images.viblo.asia/0d3a825b-875e-41a3-ae42-56707953993b.png)

Tiếp nối series giới thiệu các thủ thuật hữu ích khi sử dụng SublimeText với [phần 1](https://viblo.asia/p/mot-so-meo-thu-thuat-huu-ich-khi-su-dung-sublimetext-RnB5pBRbZPG), bài viết này mình xin đề cập đến 2 thủ thuật nâng cao hơn một chút đó là:

- Xác định dòng code bị lỗi
- Làm việc với code snippets

Hãy cùng đi cụ thể từng phần nhé.

### 1. Xác định dòng code bị lỗi

Việc bạn ngồi cặm cụi code hàng giờ đồng hồ, dồn nhiều công sức và tâm huyết nhưng đến cuối cùng đến khi chạy thì đoạn code của bạn trả về lỗi, điều này quả thực là không mấy vui vẻ phải không :D. Và nếu như đến lúc này bạn không biết được đoạn code của mình xảy ra lỗi ở đâu thì việc tìm ra lỗi bây giờ cực kỳ tốn thời gian và công sức, có khi bạn cũng chẳng còn nhiều thời gian để check lại mọi thứ cho kỹ càng... dẫn đến chất lượng công việc thấp.

Tuy nhiên, nếu làm việc với SublimeText thì sẽ có một mẹo nhỏ giúp bạn giảm thiểu vấn đề này. Trong bài viết này, mình xin được đề cập đến khái niệm **lint**.

**Lint** là các quy tắc sẽ giúp ta phân tích các lỗi hoặc lỗi tiềm ẩn trong đoạn code, và nó hỗ trợ hầu hết các ngôn ngữ lập trình như  **JavaScript**, **PHP**, **Java** và cả **CSS** nữa. Đó sẽ là các quy chuẩn về code để bạn tuân theo. Và có một plugin đã đóng gói tất cả các quy chuẩn đó để bạn có thể sử dụng là **SublimeLinter**.

#### Cài đặt SublimeLinter

Chỉ là cài đặt package hết sức đơn giản, dùng tổ hợp phím `Ctrl` + `Shift` + `P` (mình dùng trên Ubuntu nhé), search cho `Install Package` để load thư mục các gói plugin ra, xong thì search tên plugin `SublimeLinter` và chọn để cài đặt.

![](https://images.viblo.asia/c78dc39c-438c-4e26-9478-d478eb1d541d.jpg)

Như thế là bạn đã cài đặt thành công plugin **SublimeLinter**, mặc định thì nó sẽ chạy `background` và sẽ chạy ngay khi ta code. Bạn có thể thay đổi việc này bằng cách chọn theo menu `Preferences` > `Package Settings` > `SublimeLinter` > `Settings` mở ra file config để khai báo `lint_mode` là `save`, cài đặt việc check lỗi chỉ được thực hiện khi bạn thực hiện lưu file.

```
{
  "lint-mode": "save"
}
```

Theo mình như thế sẽ hay hơn (hoặc là dùng `load_save` để chỉ định việc check lỗi khi load và lưu file), các bạn có thể bỏ qua bước này để sử dụng config mặc định.

Dưới đây là một ví dụ cho các bạn dễ hình dung.

 #### Linting CSS
Mình dùng plugin **SublimeLinter-csslint**, bạn cần cài đặt `csslint` cho hệ thống của mình bằng lệnh
```
[sudo] npm install -g csslint
```
Bạn có thể xem chi tiết hơn [ở đây](https://github.com/SublimeLinter/SublimeLinter-csslint#installation)

 Sau khi cài đặt hoàn thành, với đoạn code như sau:
 
 ```css
 .anotherclass {
    border-radius: 5px;
 ```
 
Dùng tổ hợp phím tắt `Ctrl` + `k` + `a` để xem tất cả lỗi của file (bạn có thể mở theo menu `Preferences` > `Package Settings` > `SublimeLinter` > `Key Bindings` để xem danh sách các phím tắt), ta sẽ có như sau:

![](https://images.viblo.asia/de707897-0c4c-4204-9398-7affccfc25ec.png)
 
 
### 2. Làm việc với code snippets

Trong khi phát triển dự án, developer hay có xu hướng viết lại hoặc sử dụng lại các đoạn code giống nhau nhiều lần. Một cách để loại bỏ quá trình lặp đi lặp lại này là giữ các đoạn code mà  thường sử dụng dưới dạng **snippets**. SublimText cung cấp cho ta khả năng tạo và quản lý các **snippets** khá đơnn giản.

#### Tạo mới một snippet

Trước tiên chọn theo menu `Tools` > `Developer` > `New Snippet` để mở ra tab thêm mới snippet, SublimeText cung cấp cho bạn một cái template sẵn để sử dụng. Ta đơn giản chỉ cần thêm nội dung đoạn code vào trong khối `<![CDATA[...]]>` trong thẻ `<content>`, ví dụ:
    
```html
<content><![CDATA[
  Hello, this is a snippet.
]]></content>
```

Tiếp theo bạn đặt tên cho snippet mới này trong thẻ `<tabTrigger>`, nên đặt tên sao cho ngắn gọn, dễ nhớ và cũng đại diện cho ý nghĩa của cả đoạn code bên trong. Ví dụ trên mình đặt tên là `shadow`. Bên cạnh đó, bạn có thể khai báo thêm phạm vi mà đoạn snippet này có thể được áp dụng trong thẻ `<scope>`. Snippet hoàn chỉnh của bạn sẽ như này:

```html
<snippet>
  <content><![CDATA[
    Hello, this is a snippet.
  ]]></content>
  <tabTrigger>hello</tabTrigger>
</snippet>
```

Cuối cùng là lưu lại file khai báo snippet này, lưu ý là lưu file với `.sublime-snippet` để SublimeText có thể nhận biết được nhé. Nên tạo mới thư mục `CSS`, `HTML`, ... để lưu file này cho rõ ràng.

Như vậy là bạn đã tạo mới một snippet

#### Sử dụng snippet

Trong file cần đến đoạn code trong snippet, bạn chỉ cần gõ tên nó ra và `Tab` là sẽ thấy điều kỳ diệu :D.

![](https://images.viblo.asia/34a8dcca-af33-486a-bae8-33a7cff21fe9.gif)

Lưu ý nếu snippet của bạn có khai báo `scope` cho snippet thì bạn sẽ không thể sử dụng snippet đó cho những file có syntax khác nhé.

#### Snippet có thể thay đổi nội dung khi sử dụng

Ta dùng từ khóa `${[vị trí]:[giá trị]}` trong nội dung của snippet để khái báo những vị trí có thể thay đổi giá trị khi sử dụng. Ví dụ ta thay đổi snippet ở bên trên lại một chút như sau:

```html
<content><![CDATA[
  Hello, ${1:this} is a ${2:snippet}.
]]></content>
```

Khi gọi ra để sử dụng thì bạn có thể sử dụng kết hợp với phím `Tab` để thay đổi các giá trị như sau:

![](https://images.viblo.asia/19ca309b-94b5-46c1-b888-3653c0e7ec44.gif)

#### Cài đặt snippet Package

Bên cạnh tự tạo mới thì cũng có nhiều snippet có sẵn cho bạn cài đặt và sử dụng, cài đặt thì cũng như cài đặt các package thông thường khác mà thôi.


***

Trên đây mình đã trình bày thêm 2 thủ thuật nhỏ khi làm việc với SublimeText, hi vọng nó sẽ giúp ích cho bạn.

***

### Tham khảo
- https://www.hongkiat.com/blog/identify-code-errors-sublime-linter/
- https://www.hongkiat.com/blog/sublime-code-snippets/