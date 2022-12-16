## Giới thiệu
`Slim` là một thay thế cho `ERB`, tương tự như `HAML`. Slim cung cấp một cú pháp gọn gàng rất dễ hiểu. Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng Slim trong ứng dụng Ruby on Rails của chúng ta. Bắt đầu nào.
## Cú pháp cơ bản của Slim
`Slim` thực sự rất dễ học. Các tệp `Slim` được phân tách bằng tab, với khoảng cách xác định vị trí các thẻ đóng. Ví dụ:
```
p
  | Đây là một đoạn văn bản
```
Khi được chuyển sang html sẽ là:
```
<p>
  Đây là một đoạn văn bản
</p>
```
Trong ví dụ trên chúng ta nhận thấy là ký tự (|) được sử dụng để phân tách đoạn văn bản dạng tự do trên một dòng mới. Tiếp theo chúng ta chỉ dử dụng `p` để thay thế cho thẻ đóng mở `<p></p>`. Điều này được làm việc cho bất kỳ thẻ nào ví dụ như:
```
h1
  | Đây là chữ của thẻ H1
```
Hoặc có thể viết gọn như là:
```
h1 Đây là chữ của thẻ H1
```
Ở ví dụ này mình không sử dụng ký tự (|) đây là một lưu ý là ký tự này chỉ cần thiết nếu chúng ta nhập văn bản dạng tự do trên một dòng mới.

Ngoài ra chúng ta có thể tạo thẻ `div` bằng cách sau:
```
.class
```
Ví dụ này tương đương với:
```
<div class="class"></div>
```
Cũng như vậy chúng ta cho thể tạo thẻ `div` có id như sau:
```
#id
```
Tương tự như:
```
<div id="id"></div>
```
Vậy khi sử dụng các thuộc tính của html (meta,v.v...) thì chúng ta làm như thế nào. Rất đơn giản thôi chúng ta chỉ cần viết như sau:
```
meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
```
Chuyển sang html là như sau:
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
```
Để chỉ định một loại tài liệu chúng ta làm 
```
doctype html
```
Tương tự với:
```
<!DOCTYPE html>
```
Trên đây là cơ bản về `Slim`, vậy khi sử dụng với `ruby` thì làm như thế nào nhỉ? Cũng đơn giản lắm với những mã không trả lại kết quả ví dụ như câu lệnh điều kiện hoặc vòng lặp chúng ta sẽ thêm ký tự (-) trước mỗi câu lệnh. Ví dụ như:
```
- if @products.nil?
  p Không có giá trị nào
```
Đoạn code này tương đương như:
```
if @products.nil?
  <p>
     No results found.  Please try again.
  </p>
end
```
`Slim` cũng tự động đóng mã `Ruby` của chúng ta vì vậy `end` là không cần thiết. Nếu mã có trả về kết quả ví dụ như muốn in một thuộc tính hay một biến bạn chỉ cần sử dụng ký tự (=) trước mỗi câu lệnh:
```
= current_user.name
```
Điều này giống như là:
```
<%= current_user.name %>
```
Bạn cũng có thể sử dụng javascript như sau:
```
javascript:
  alert("hello world!")
```
Cuối cùng nếu chuỗi của bạn có sử dụng Rubyized chúng ta cũng chỉ cần làm như ví dụ sau:
```
| Hello #{user.name}
```
Với ví dụ trên sẽ được hiển thị là Hello và tên của người dùng.

Trên đây là những điều cơ bản về `Slim` với việc đơn giản hóa việc viết html thì `Slim` rất tuyệt vời phải không. Bây giờ chúng ta hãy xây dựng một ứng dụng `Rails` để học các sử dụng `Slim` trong ứng dụng ruby on rails như thế nào nhé.
## Cài đặt Slim vào ứng dụng Rails
Điều đầu tiên tất nhiên là thêm một vài gem vào Gemfile của ứng dụng rồi :D

```
gem 'slim', '~> 2.0.3'
gem 'slim-rails', '~> 2.1.5'
```
Sau khi thêm các gem để ứng dụng `Slim` vào ứng dụng rồi thì nhớ chạy `bundle` nhé.
Tiếp theo chúng ta sẽ tạo một bộ điều kiển và action show với lệnh sau:
```
rails g controller Examples show
```
Bây giờ chúng ta sẽ thêm route cho action show của controller examples
```
# config/routes.rb
Rails.application.routes.draw do
  resource :example, only: [:show]
  root to: "examples#show"
end
```
Thêm một lưu ý nhỏ cho các bạn chúng ta cần phải tạo các file trong views với đuôi là .slim thay vì .erb nhé.
```
#app/views/homes/show.html.slim
javascript:
  alert("Chào các bạn!")
  
h1 Chào mừng các bạn đến với ví dụ sử dụng Slim trong ứng dụng Ruby on rails

p
  | Bây giờ là: #{ Time.now },
    Và tôi đang ngồi viết bài hướng dẫn này :P
    
#idName Đây là div có id
.className Đây là div có class

p = Random.rand(10)

- if Random.rand(6) == 1
  | Đây là số 1
  
br
br

small Goodbye!
```
Ví dụ view trên tương tự với
```
<script type="text/javascript">
  alert("Chào các bạn!")
</script>

<h1>Chào mừng các bạn đến với ví dụ sử dụng Slim trong ứng dụng Ruby on rails</h1>

<p>
  Bây giờ là: 2018-08-18 19:50:19 -0400, Và tôi đang ngồi viết bài hướng dẫn này :P
</p>

<div id="idName">
  Đây là div có id
</div>

<div id="className">
  Đây là div có class
</div>

<p>2</p>

<br>
<br>

<small>Goodbye!</small>
```
Như vậy là chúng ta cũng đã hoàn thành xong việc cài đặt và sử dụng `Slim` vào ứng dụng `Ruby on rails`. Chúc các bạn học tập hiệu quả.