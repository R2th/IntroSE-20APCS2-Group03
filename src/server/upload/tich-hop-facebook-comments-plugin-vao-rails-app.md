### **I. Comments plugin là gì?**

-  Comments plugin của facebook cho phép mọi người bình luận về nội dung trên trang web của bạn bằng tài khoản Facebook của họ.
-  Mọi người cũng có thể chọn chia sẻ hoạt động bình luận của họ với bạn bè (và bạn của bạn bè họ) trên Facebook.
-  Comments plugin cũng hỗ trợ các công cụ kiểm duyệt và sắp xếp các comment.

### **II. Các bước để tích hợp comments plugin vào ứng dụng**

1. Bước 1: 
- Tạo một [facebook app](https://developers.facebook.com/apps)

2. Bước 2:
- Sao chép url của rails app
- Vào trình tạo mã của [comments plugin](https://developers.facebook.com/docs/plugins/comments)
- Dán url của rails app vào form, tùy chỉnh chiều rộng và số lượng comment muốn hiển thị theo form
![trình tạo mã của comments plugin](https://images.viblo.asia/aabfb9e9-e23b-473a-b63a-a99763ee9e2a.png)
- Submit form để sinh code
![code sinh ra sau khi submit form](https://images.viblo.asia/14b2546b-3037-4f11-a100-d717db06a7af.png)

3. Bước 3:
- Tạo 1 parital `comments_plugin.html.erb`
- Sao chép và dán đoạn mã vào partial:
```
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.1&appId=188260182105910&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
```

4. Bước 4:
- Đặt đoạn mã để hiển thị khung comment vào vị trí mong muốn trong rails app:
```
<div class="fb-comments" data-href="https://your_rails_app.com" data-numposts="5"></div>
```

Như vậy chúng ta đã có thể bắt đầu sử dụng facebook's comments trong rails app của mình một cách đơn giản nhất rồi.

### **III. Tùy chỉnh comments plugin**

`Comments plugin` hỗ trợ tùy chỉnh các thuộc tính như sau:

| Thuộc tính | HTML5 | Mô tả | Giá trị mặc định |
| -------- | -------- | -------- | -------- |
| colorscheme | data-colorscheme | màu được sử dụng trong comments plugin. Có 2 giá trị là "light" và "dark". | "light" |
| href | data-href | URL được liên kết với các comment. | URL hiện tại |
| mobile | data-mobile | Giá trị boolean chỉ định xem có hiển thị phiên bản được tối ưu hóa cho thiết bị di động hay không. | Auto-detected |
| num_posts | data-numposts | Số bình luận sẽ hiển thị theo mặc định. Giá trị tối thiểu là 1. | 10 |
| order_by | data-order-by | Thứ tự sử dụng khi hiển thị bình luận. Có thể là "social", "reverse_time" hoặc "time". | "social" |
| width | data-width | Chiều rộng của plugin bình luận trên trang web. Đây có thể là một giá trị pixel hoặc phần trăm (như 100%) cho chiều rộng linh hoạt. Phiên bản di động của plugin bình luận bỏ qua thông số chiều rộng và có chiều rộng linh hoạt là 100%. Chiều rộng tối thiểu mà plugin bình luận hỗ trợ là 320px. | 550 |


### **IV. Sắp xếp comments**

- User có thể sắp xếp các comment được hiển thị bằng cách sử dụng menu ở trên cùng bên phải của comments plugin.
![Sắp xếp comments](https://images.viblo.asia/e2946b63-2815-4246-b2c3-7d8165b9e427.png)

- Các tùy chọn trong menu được xác định bằng thuộc tính `data-order-by` với 1 trong 3 giá trị:
    - `social` (mặc định): Còn được gọi là "Hàng đầu", hiển thị các bình luận có chất lượng cao nhất. Các bình luận được sắp xếp sao cho bình luận phù hợp nhất từ bạn bè và bạn của bạn bè được hiển thị trước tiên, hoặc các bình luận được yêu thích nhất. Những bình luận bị đánh dấu là spam được ẩn khỏi màn hình.
    - `time`: Bình luận được hiển thị theo thứ tự đăng, với bình luận cũ nhất ở trên cùng và mới nhất ở dưới cùng.
    - `reverse_time`: Bình luận được hiển thị theo thứ tự ngược lại với `time`, với bình luận mới nhất ở trên cùng và cũ nhất ở dưới cùng.

### **V. Thay đổi ngôn ngữ**

- `Comments plugin` hỗ trợ thay đổi ngôn ngữ hiển thị bằng cách thay đổi thuộc tính `js.src` trong plugin:
```
js.src = "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&amp;version=v2.4";
```

- Ngôn ngữ trên Facebook sử dụng định dạng ll_CC, trong đó ll là mã ngôn ngữ gồm hai chữ cái và CC là mã quốc gia gồm hai chữ cái. Chẳng hạn en_US là tiếng Anh Mỹ. Mã ngôn ngữ và mã quốc gia được sử dụng theo chuẩn [ISO](http://www.loc.gov/standards/iso639-2/php/code_list.php?fbclid=IwAR1LzK536sf9BMDLH0MP_geMrXzH_gBJB5cop-7RKBpblc8lsgu4d2WWYZA)

### **VI. Kết luận**

Trên đây là hướng dẫn để tích hợp `comments plugin` đơn giản vào Rails app. Hi vọng bài viết có thể giúp các bạn biết được cách dùng cơ bản của `comments plugin` trong Rails app.

## **Cảm ơn đã theo dõi**