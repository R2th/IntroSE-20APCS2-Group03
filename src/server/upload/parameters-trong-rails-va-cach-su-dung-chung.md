# Mở đầu
Trong khi xây dựng các ứng dụng web, truyền và nhận dữ liệu giữa các ứng dụng web là một kỹ thuật khá phổ biến. Người dùng có thể gửi dữ liệu đến ứng dụng web của bạn theo nhiều cách như sau:
*     Sử dụng query parameter (vd: "example.com/?q=bacon")
*     Sử dụng form
*     Dùng trên chính url (vd: "/users/1")
Trong rails ta cũng sử dụng những cách tương tự để có thể gửi dữ liệu. Tuy nhiên sau khi gửi xong, ta làm thể nào để có thể lấy được những dữ liệu đó và câu trả lời chính là `params`.  Ở trong controller ta có thể gọi `params` để truy cập đến dữ liệu được gửi từ form hay url query data.
Vậy chính xác params là gì? Nó là một phương thức trả về một đối tượng `ActionController::Parameters`, trong thực tế nó hoạt động như 1 hash.
Chúng ta có thể đọc một giá trị từ hash này bằng cách gọi: `params[:id]`, nó sẽ trả về giá trị của id được gửi nên nếu có còn không thì nó sẽ trả về `nil`.
### Một vài điều cần biết khi làm việc với params trong rails:
* Nếu một trường nào đó bị bỏ trống thì bạn sẽ nhận được một chuỗi trống.
* Tất cả các giá trị bên trong params là chuỗi, ngay cả khi giá trị tương ứng được gửi lên dưới dạng số nguyên.
### Tiếp theo ta sẽ đi tìm hiểu sâu hơn để hiểu rõ về cách làm việc với nó
# Form Fields & Params
Làm thế nào mà form fields và url parameters có thể ánh xạ tới các key params.
Ta có một ví dụ sau:
```
<form action="/search">
  <input name="q" type="text">
  <button type="submit">Search</button>
</form>
```
Đây là một form tìm kiếm đơn giản sẽ gửi một post request tới `/search`. Sau khi submit form ta nhận được params như sau:
```
{ "q"=>"", "controller"=>"books", "action"=>"search" }
```
Quan sát nội dung của params ta thấy có một key là "q", vậy "q" ở đây là gì? Thực ra nó chính là thuộc tính name của thẻ input ở trong form HTML và giá trị của nó chính là giá trị mà bạn nhập vào ô input đó ở trong form.
Trong rails nếu bạn sử dụng form_for, các tên sẽ được tự động tạo cho bạn theo một mẫu cụ thể. Ví dụ:
```
# form_for(@book) with a few fields generates something like this
<form action="/books">
  <input type="text" name="book[title]" id="book_title">
  <input type="text" name="book[author]" id="book_author">
  <input type="text" name="book[cover]" id="book_cover">
  <select name="book[language]" id="book_language">
    <option value="English">English</option>
    <option value="Spanish">Spanish</option>
    <option value="French">French</option>
  </select>
  <button type="submit">Create</button>
</form>
```
Ở đây `book[title]` sẽ tạo ra một hash chứa các giá trị lồng nhau, và ta sẽ nhận được:
```
{
  "book"=>
    {
      "title"=>"",
      "author"=>"",
      "cover"=>"",
      "language"=>"English"
    }
}
```
Và từ controller, ta có thể truy cập đến những dữ liệu này như sau (sử dụng `params`):
```
params[:book][:language]
# "English"
params[:book][:author]
# ""
```
Ta có thể thấy đây hoạt động như với 1 hash nhưng lại không giống như 1 hash thông thường, nó sẽ chấp nhận cả symbol và string làm key, ta có thể truy cập đến các param thông qua các key này. Nghĩa là `params["book"]` và `params[:book]` là như nhau.
# Cho phép routes truy cập Accept Parameters
Bên cạnh query parameters, bạn cũng có thể cho phép truy cập các [REST-style](https://en.wikipedia.org/wiki/Representational_state_transfer) parameters. Và trong rails được gọi là các "dynamic segment".
Chúng ta hãy xem ví dụ sau:
Ta có một routes như sau:
```
get 'books/:id', to: 'books#show'
```
Hay:
```
resources :books
```
Sau đó ta có thể sử dụng URLs như sau:
```
/books/10
```
"10" ở đây chính là id của books được truyền vào URL(`books/:id`). Và để có thể truy cập tới `id` này ta có thể sử dụng `params`:
```
params[:id]
```
# Strong Params
Đôi khi làm việc với params trong rails, trong lúc bạn cố gắng để lưu 1 bản ghi lên cơ sở dữ liệu, nhưng điều đó lại không làm việc như ý muốn của bạn. Và bạn nhìn vào "rails server log" của bạn, bạn có thể thấy:
```
Unpermitted parameter: :language
```
Điều này có nghĩa là gì?
Từ phiên bản rails 4 thì [Strong parameters](https://edgeapi.rubyonrails.org/classes/ActionController/StrongParameters.html) đã được thêm như một phương pháp bảo mật khi sử dụng tính năng Mass Assignment. Khi làm việc với các bản ghi, nó sẽ bắt bạn phải đưa vào danh sách trắng(**whitelist**) các thuộc tính của đối tượng mà người dùng có thể truy cập. Điều này để ngăn chặn một vấn đề được gọi là "mass assignment", cho phép người dùng độc hại có thể  đặt các trường khác của đối tượng mà họ không có quyền.
Bạn có thể định nghĩa các trường thuộc **whitelist** như sau:
```
def book_params
  params.require(:book).permit(:title, :author, :cover, :language)
end
```
Và nó hoạt động như thế nào?
* method `require` sẽ tìm `params[:book]` và sẽ raise lên lỗi nếu không tìm thấy.
* method `permit` định nghĩa 1 danh sách các thuộc tính cho phép.

Kết quả bạn sẽ nhận được 1 `hash` các thuộc tính, nó sẽ lọc các params được truyền lên trước khi được lưu vào datatbase.

Bạn cũng có thể sử dụng strong parameter với các thuộc tính `nested attributes`. Ta có ví dụ sau:
Ta có một model `User` có sử dụng `nested attributes` với `user_roles`:
```
class User < Activerecord::Base
  accepts_nested_attributes_for :user_roles, :allow_destroy => true
  has_many :roles, :through => :user_roles
end
```

Khi khai báo `strong params` cho `User` ta có thể khai báo như sau:
```
def user_params
    params.require(:user).permit(:name, user_roles_attributes: [:role_id,:id, '_destroy'])  
end
```
# Lời kết
Như vậy mình vừa giới thiệu cho các bạn về parameter trong rails và cách để sử dụng chúng chính xác.Thanks for reading!

### References:
https://www.rubyguides.com/2019/06/rails-params/
https://edgeapi.rubyonrails.org/classes/ActionController/StrongParameters.html