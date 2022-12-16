### Sử dụng HTML `<template>` và `<slot>` với Shadow DOM.

Bài viết tham khảo [How to Use HTML <template> & <slot> With Shadow DOM](https://www.hongkiat.com/blog/html-template-slow-tag-shadow-dom/).
    
HTML `slot` là một trong những tiêu chuẩn đáng chú ý nhất được đề xuất bởi W3C. Cùng với một tiêu chuẩn W3C ấn tượng khác là `template`, bạn sẽ có một sự kết hợp tuyệt vời để làm việc. Việc có thể tạo và thêm các phần tử HTML vào page sử dụng JavaScript là một nhiệm vụ cần thiết và quan trọng.
    
Nó sẽ hữu ích khi một đoạn code chỉ xuất hiện vào những thời điểm nhất định, hoặc là khi bạn không muốn loại bỏ hàng trăm thành phần HTML có cấu trúc giống nhau nhưng lại muốn tự động hóa quy trình làm việc.

Việc phải tạo các phần tử HTML trong JavaScript không phải là điều mà bạn sẽ không mong muốn chút nào đâu. Thật là rắc rồi khi bạn phải kiểm tra đi kiểm tra lại xem liệu là bạn có bao đóng tất cả thẻ chưa, các thẻ đã được đặt đúng thứ tự chưa,...có quá nhiều thứ phải theo dõi. Khi thẻ `<template>`, vấn đề này đã được giải quyết. Nếu một thứ gì đó mới cần được thêm vào trang page động, bạn đơn giản chỉ cần đặt nó bên trong thành phần `<template>` này thôi.

Trong bài viết này, mình xin trình bày với các bạn là làm thế nào để sử dụng các thẻ `<slot>` và `<template>` cùng với JavaScript để tạo ra một `nhà máy bảng HTML mini` - để tạo ra hàng trăm bảng có cấu trúc tương tự nhau.

### Làm quen thẻ `<slot>` và `<template>`.

- `<template>` => chứa mã HTML sẽ không được hiển thị ra bởi trình duyệt cho đến khi nó được chỉ định thêm vào tài liệu bởi JavaScript.
- `<slot>` => một trình giữ chỗ (`placeholder`) bạn thêm vào `Shadow DOM`, có thể được tọa thành từ nội dung của phần tử `<template>`.

Ở trên, mình có đề cập đến `Shadow DOM` - nó thực chất cũng tương tự như một `DOM` (document object model) thông thường mà thôi. Nó tạo ra một cây phạm vi (cây Shadow DOM), nó có một gốc riêng và cũng có thể có một phong cách riêng của nó.

Khi bạn chèn cây Shadow DOM vào một phần tử của tài liệu chính thì phần tử đó sẽ được gọi là `host`. Và tất cả các phần tử con của `host` đó được đánh dấu với thuộc tính `slot` (khác với thẻ `<slot>` đã nói ở trên nhé) sẽ thay thế chúng trong cây con mới được chèn vào.

![](https://images.viblo.asia/c9226d27-1ed7-4520-9e21-b9bf69b4bda9.jpg)

Hình trên minh họa cho việc bạn chèn một cây Shadow DOM vào phần tử đã có sẵn. Bạn có thể tìm hiểu kỹ hơn về Shadow DOM tại [đây](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM).

Tại thời điểm viết bài này thì Shadow DOM hỗ trợ khá nhiều các trình duyệt khác nhau, bạn có thể kiểm tra thông tin cụ thể hơn tại [CanIUse](https://caniuse.com/#search=shadow%20dom).

### Cài đặt HTML `<template>`.

Hãy cùng xem qua code ví dụ bên dưới cho dễ hiểu nhé.

Bên trong `<template>`, có một bảng và ta sẽ dùng nó như một bản thiết kế chi tiết để tạo ra các bảng sẽ được thêm vào tài liệu. Các phần tử `<slot>` trong các ô của bảng đóng vai trò giữ chỗ cho các tiêu đề cột và giá trị của ô đó. Mỗi slot sẽ có một thuộc tính `name` duy nhất dùng để định danh.

```html
<template>
  <table>
    <tr>
      <th><slot name='title-1'></slot></th>
      <th><slot name='title-2'></slot></th>
    </tr>
    <tr>
      <td><slot name='value-1.1'></slot></td>
      <td><slot name='value-1.2'></slot></td>
    </tr>
    <tr>
      <td><slot name='value-2.1'></slot></td>
      <td><slot name='value-2.2'></slot></td>
      </tr>
  </table>
</template>
```

Bên ngoài `template`, có 2 phần tử `<div>` chứa tiêu đề cột và giá trị của ô bên trong `<span>`, cho 2 bảng riêng biệt mà ta muốn thêm vào trang web. Code như sau:

```html
<div>
  <span slot='title-1'>Title A</span>
  <span slot='title-2'>Title B</span>
  <span slot='value-1.1'>Value A.1</span>
  <span slot='value-1.2'>Value A.2</span>
  <span slot='value-2.1'>Value B.1</span>
  <span slot='value-2.2'>Value B.2</span>
</div>
 
<div>
  <span slot='title-1'>Title C</span>
  <span slot='title-2'>Title D</span>
  <span slot='value-1.1'>Value C.1</span>
  <span slot='value-1.2'>Value C.2</span>
  <span slot='value-2.1'>Value D.1</span>
  <span slot='value-2.2'>Value D.2</span>
</div>
```

Bạn có thể thấy ở đây, mỗi phần tử `<span>` sẽ có một thuộc tính `slot` tương ứng với thuộc tính `name` trong các phần tử `<slot>` bên trong khối `<template>` ở bên trên.

Đến đây, bạn sẽ chỉ thấy được phần nội dung trong các phần tử `<span>` được show ra thôi, ta sẽ cần thêm một số code JavaScript để show ra tấ cả.

 ### Gắn cây Shadow DOM.
 
Sử dụng JavaScript, ta chèn nội dung bảng từ bên trong phần tử `template` vào trong cả `<div>` như là một cấy Shadow DOM. Sau khi chèn, các phần tử `<span>` sẽ được đặt vào các vị trí tương ứng bên trong bảng và hiển thị tiêu đề cột, giá trị của ô như mong muốn. Kết quả là 2 bảng được tạo tự động sử dụng cùng một khung mẫu.

Đầu tiên, bạn hãy kiểm tra xem là Shadow DOM có được hỗ trợ cho trình duyệt của bạn đang dùng không đã nhé.
Phương thức `attachShadow()` dùng để gắn một cây Shadow DOM vào một phần tử và trả về nút gốc của cây Shadow DOM đó. Khối `if` ở trong đoạn code bên dưới sẽ kiểm tra xem liệu trình duyệt có hỗ trợ phương thức này hay không bằng cách kiểm tra xem ở trên các khối `div` trong trang web, có phương thức `attachShadow()` hay không.

```javascript
// check if Shadow DOM is supported
if ('attachShadow' in document.createElement('div')){
 
} else {
  console.warn('attachShadow not supported');
}
```

Chúng ta tạo một biến tùy chỉnh tên là `templateContent` để phục vụ như là một tham chiếu đến nội dung của template.

```javascript
if('attachShadow' in document.createElement('div')) {
  let templateContent = document.querySelector('template').content;
  let divs = document.querySelectorAll('div');
 
  divs.forEach(function(div) {
    // inside loop
  });
} else {
  console.warn('attachShadow not supported');
}
```

Trong vòng lặp `forEach`, một cây Shadow DOM sẽ được gắn cho mỗi khối `div` bởi cú pháp `div.attachShadow({ mode: 'open' })`.

Có 2 thuộc tính cho `attachShadow`: 
- `open`
- `closed` => nếu chọn thuộc tính này, nút gốc của cây Shadow DOM sẽ trở thành không thể truy cập được đến các phần tử và đối tượng DOM bên ngoài.

Sau đó, ta thêm một bản copy của nội dung template vào cây Shadow DOM bằng phương thức ` templateContent.cloneNode(true)`. Code sẽ như sau:

```javascript
if('attachShadow' in document.createElement('div')) {
  let templateContent = document.querySelector('template').content;
  let divs = document.querySelectorAll('div');
 
  divs.forEach(function(div){
    div.attachShadow({  mode: 'open' }).appendChild(
      templateContent.cloneNode(true)
    )
  });
} else {
  console.warn('attachShadow not supported');
}
```

Và đến đây, bảng HTML động của bạn đã sẵn sàng, cấu trúc của khối `template` đã được dùng để vẽ ra các bảng tương ứng cho các khối `div` bên dưới.


***
### Tham khảo.

- https://www.hongkiat.com/blog/html-template-slow-tag-shadow-dom/
- https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM

***
Cám ơn bạn đã theo dõi bài viết.