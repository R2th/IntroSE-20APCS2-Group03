Chào các bạn, hôm nay mình sẽ giới thiệu cho các bạn về templating cho HTML và cụ thể đó là SLIM. Đây là công cụ rất hay xuất hiện trong các dự án về Ruby On Rails. Chúng ta sẽ cùng tìm hiểu về nó để biết tại sao nó rất hay được sử dụng như vậy nhé.
#  SLIM là gì, mục đích sử dụng?
`SLIM` là một template engine. Thông thường khi mới khởi tạo 1 project, template engine mặc định là `.html.erb`, tuy nhiên cách viết `HTML` thông thường quá dài, gây cản trở quá trình viết code, bảo trì, mở rộng tính năng cho lập trình viên. Và thế là SLIM ra đời là để giảm thiểu, tối ưu các đoạn code về `HTML` và `XML` một cách gọn gàng nhất. Cú pháp khi code trong SLIM cũng sẽ dễ nhìn hơn so với `HTML` thông thường.
# Cài đặt
Đầu tiên chúng ta hãy cài đặt `SLIM` đã. Thêm dòng này vào Gemfile:
```
gem "slim"
```
Sau đó `bundle instal`, và bật lại `server`. Hoặc `gem install slim` ở trong terminal.
note: `SLIM` bắt đầu được hỗ trợ từ `Rails 3` trở lên.
# Cách dùng trong SLIM
## 1. Cách sử dụng
Cách sử dụng thì đơn giản lắm, để sử dụng slim bạn phải tạo file có đuôi là `.slim` thay vì `.html.erb` ở trong thư mục view thôi.
## 2. Cú pháp trong slim
Điểm nổi bật của `SLIM` mang lại chính là không có thẻ tag, mà sẽ thay thế bằng cách lùi đầu dòng (ấn nút `tab` trên bàn phím). Thông thường bạn viết code `.html` muốn viết 1 đoạn hiển thị thông tin sẽ phải:
``` 
<div class="demo">
  <p id="full_name">Họ tên: Nguyễn Văn A</p>
  <p id="age">Tuổi: 22</p>
</div>
```
Đoạn code trên trong `SLIM` sẽ viết 1 đoạn tương đương ứng là:
``` 
.demo
  p#full_name
    | Họ tên: Nguyễn Văn A
  p#age
    | Tuổi: 22
```
Đoạn code trên ta chú ý 1 chút:
* `.demo` => đây là 1 div có class là demo (nếu là `#demo` => `<div id=demo></div>`)
* `tab` => full_name và age vào 1 tab ở so với `.demo` vì vậy nó sẽ nằm trong `.demo`
* `|` => ký tự (|) được sử dụng để phân tách đoạn văn bản dạng tự do trên một dòng mới và nó thụt vào so với thẻ `p` vì thế nó nằm trong `p`.
OK vậy là chúng ta đã biết sơ qua về `SLIM` như nào rồi nhỉ. Giờ thì cùng tìm hiểu chi tiết hơn về cú pháp của `SLIM` nhé.
### Line indicators
#### - Control code
Ký tự `-` chính là biểu hiện cho <% %> đó các bạn. Nếu viết if end hoặc vòng lặp trong ruby thì các bạn cũng không cần phải viết `end` cho nó nữa tất cả `SLIM` đã dựa vào ident(dấu tab) để xác định rồi.
```
- if user.name.nil?
  p
    | Không có tên
- else
  p = user.name
```
#### - Output
Ở trong view khi muốn in ra 1 đoạn code từ `rails` thông thường bạn phải viết ở trong `<%= %>` nhưng bây giờ ta chỉ cần `=` mà thôi.
```
p = user.name
```
ngay cả khi render 1 partial cũng không là ngoại lệ nhé:
```
= render "form"
```
#### - Comment trong slim 
Dùng `/` để comment trong code. và dùng `/!` để comment trong html.
```
p
  / Đây là comment trong code.
  /! Dòng này là comment html hiện khi bạn inspect trong trình duyệt.
```
### HTML tags
#### - Inline tags
Đôi khi bạn muốn rút gọi code hơn nữa, bạn dùng `:` để gộp các dòng vào
```
ul
  li.first: a href="link1" link 1
  li: a href="link2" link 2
```
#### - html Rails
Rails cũng hỗ trợ các thẻ html cơ bản như là `link_to`, `images_tag`,... nếu biết kết hợp thì code sẽ gọn gàng hơn và sạch đẹp hơn rất nhiều. Bản thân mình khi code cũng thích kiểu viết này hơn.
```
ul
  li.first link_to link1_path, "Link 1"
  li link_to link2_path, "link 2"
```
#### - javascript
Bạn cũng có thể viết thêm javascript vào trong nhé.
```
javascript:
  alert("Hello World!!!");
```
### Attributes
Bạn viết các thuộc tính trực tiếp sau thẻ đó. Nội dung của các thuộc tính bạn phải cho vào dấu "" hoặc là ''.
```
   a href="http://www.google.com.vn" title="Link to Google" Google
```
nếu muốn dùng biến ruby ở trong thì:
```
   a href="http://www.google.com.vn" title="Link to Google" data-link="#{Tên_biến}" Google
```
#### - Attribute merging
Bạn có thể sử dụng một `Array` để nhóm nhiều giá trị của một thuộc tính lại với nhau, 
```
a class=["class1", "class2"]
a class=[:class1, :class2]
```
#### - Attributes wrapper
Bạn muốn code rõ ràng rành mạch hơn các cho thuộc tính attributes bạn cũng có thể cho chúng vào cặp thẻ `{...}`, `(...)`, `[...]`
```
body
  h1(id="logo") = page_logo
  h2[id="tagline" class="small tagline" data-demo1 = "demo1" data-demo2= "demo2"]= page_tagline
```
Trường hợp mà 1 dòng code dài quá, bạn có cũng thể ngắt dòng đó thành nhiều dòng vẫn được:
```
  h2[id="tagline" class="small tagline" data-demo1 = "demo1" 
    data-demo2= "demo2"]= page_tagline
```
## Tài iệu tham khảo
https://github.com/slim-template/slim
## Kết luận
OK đây là những gì mình đã tìm hiểu về `Slim` và muốn chia sẻ với các bạn trong bài viết này. Bài viết đến không thể tránh khỏi những sai sót nên rất mong nhận được những đóng góp từ các bạn. Hẹn gặp các bạn ở các bài viết sau. Happy coding!