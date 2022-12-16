Có rất nhiều cách có thể  tích hợp VueJs cùng với Django, nhưng trong bài viết này mình sẽ chỉ cho các bạn 3 cách đơn giản nhất để có thể tích hợp được chúng trong cùng một dự án.
### 1. Django là gì?
Django là một web framework khá nổi tiếng được viết hoàn toàn bằng ngôn ngữ Python. Nó không phải là một micro-framework như Flask, mà là một framework với đầy đủ các thư viện, module hỗ trợ các web-developer.

Django được so sánh khá nhiều với Ruby on Rails, các bạn có thể tìm thêm trên Google về cuộc đấu giữa 2 thằng này.
### 2. Tích hợp Vue vào các Django Teamplate
Cách dễ nhất để tích hợp Vue vào Django là chỉ bao gồm tập lệnh Vue trong mã html của bạn.
```html
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```
Khi điều này được thực hiện, bạn có thể bắt đầu tạo ứng dụng và các thành phần Vue của mình. 
Ví dụ:
```html
<html>
<head>
<script src="https://unpkg.com/vue"></script>
<script>
new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue.js!'
  }
})
</script>
</head>

<body>
<div id="app">
  <p>{{ message }}</p>
</div>
</body>
</html>
```
Bạn có thể nhận thấy rằng khi bạn chạy, "message" sẽ không hiển thị. Điều này là do cú pháp tương tự giữa ngôn ngữ của Django và Vue. Có một cách rất đơn giản để khắc phục điều này bằng cách thay đổi các dấu phân cách cho ứng dụng Vue. Thay thế `{{message}} `bằng `[[message]]` trong code và sau đó thêm dòng này vào trong thẻ script của bạn:
```js
el: '#app',
delimiters: ['[[', ']]'],
data: {
```
Thay vì `[[]] `bạn có thể sử dụng hầu hết các cú pháp khác mà bạn nghĩ nó là phù hợp , nhưng` [[]]` nó gần tương tự như `{{}}`. Nên nó gây cho mình ít nhầm lẫn nhất. Bây giờ bạn có thể bắt đầu xây dựng ứng dụng Django-Vue của mình.

### 3. Tích hợp Vue và Django bằng cách sử dụng Vue CLI độc lập.
Một cách khác để xen kẽ Vue là thiết lập một thể hiện Vue độc ​​lập trên một máy chủ riêng biệt. Điều này được thực hiện bằng cách thiết lập dự án Vue bằng CLI và lấy dữ liệu từ ứng dụng Django của bạn bằng API. Để bắt đầu với điều này, bạn cần cài đặt Vue bằng webpack:
```
$ npm install -g vue-cli
$ vue init webpack django-vue
$ cd django-vue
$ npm install
$ npm run dev
```
Điền thông tin của tên dự án, mô tả, vv.. khi bạn tạo. `"npm run dev"` sẽ khởi động máy chủ web cục bộ mà bạn có thể kiểm tra bằng cách mở http: // localhost: 8080 / trong trình duyệt của bạn.

Bây giờ bạn đã sẵn sàng để bắt đầu lấy dữ liệu từ ứng dụng Django của bạn. Điều này không được đề cập trong hướng dẫn này, nhưng một gợi ý là nhìn vào Axios. Đây là một thư viện trợ giúp để giao tiếp với máy chủ bằng Ajax.
### 4. Tích hợp thông qua Django webpack loader
MÌnh sẽ không đi sâu vào chi tiết về cách tích hợp Vue với Django bởi vì điều này đã được trình bày rất rõ trong phần đọc này. Bạn có thể tìm thấy hướng dẫn tại đây: 

https://github.com/owais/django-webpack-loader

Tại đây bạn sẽ tìm thấy mọi thứ từ thông tin cài đặt đến mẹo về cách sử dụng Django webpack loader 

Một điều rất thông minh cần nhớ khi sử dụng Django webpack loader là nó dường như được tích hợp vào dự án của bạn và điều đó có nghĩa là bạn vẫn có thể sử dụng các phiên của Django, csrf và một số chức năng khác. Điều này làm cho xác thực đơn giản hơn nhiều.
### 5. Kết Luận
Đây là ba cách khác nhau theo mình là nhanh và hiệu quả để sử dụng Django và Vue cùng nhau. Tôi chắc chắn có nhiều cách khác để làm điều đó và không có cách nào tốt nhất để làm điều đó, vì vậy bạn làm những gì phù hợp nhất với dự án của bạn. 
### Tài liệu tham khảo:
Bài viết được dịch từ các nguồn tham khảo sau:
1. https://ahackersday.com/blog/how-to-use-vue-and-django-together/
2. https://medium.com/@rodrigosmaniotto/integrating-django-and-vuejs-with-vue-cli-3-and-webpack-loader-145c3b98501a
3.  https://github.com/michaelbukachi/django-vuejs-tutorial/wiki/Django-Vue.js-Integration-Tutorial