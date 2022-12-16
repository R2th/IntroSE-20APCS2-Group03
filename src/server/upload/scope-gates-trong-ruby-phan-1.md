- Bài viết được dịch từ bài [Scope gates in Ruby](https://medium.com/rubycademy/scope-gates-in-ruby-part-i-f73e81eef6d1) của tác giả [Mehdi Farsi](https://medium.com/@farsi_mehdi).
-----

![](https://miro.medium.com/max/2560/1*FAcftN7ou3J7CDRtaGUKCg.jpeg)

-----
Trong bài viết này, chúng ta sẽ khám phá các chủ đề sau:

* method scope
* class scope

[Phần 2](https://viblo.asia/p/scope-gates-trong-ruby-phan-1-aWj53LjeK6m) chúng ta sẽ tìm hiểu:

* module scope
* nesting và scopes

### Giới thiệu
Trong Ruby, scope của một chương trình có mối tương quan chặt chẽ với giá trị của `self`.

Ở đây, chúng ta sẽ phân tích chi tiết các giá trị của `self` khi đang "ở bên trong" một phương thức, một lớp và trong phạm vi cấp cao nhất(top-level scope).

###  Method scope
Trong Ruby, top-level scope là ngữ cảnh của đối tượng `main`.

Thật vậy, `self` đề cập đến đối tượng `main` tại thời điểm này:
```ruby
self # => main
```
> Nếu rảnh thì bạn hãy đọc bài viết [Mô hình đối tượng Ruby](https://medium.com/rubycademy/ruby-object-model-part-1-4d06fa486bec) nếu bạn không quen thuộc với đối tượng `main`.

Bây giờ, hãy xem những gì mà ngữ cảnh của `self` trong một phương thức được xác định trong top-level scope?
```ruby
self # => main

local_variable = 'hello local_variable'
@instance_variable = 'hello instance_variable'

def hello
  self # => main

  @instance_variable # => 'hello instance_variable'
  local_variable     # => NameError: undefined local variable or method `local_variable' for main:Object
end

hello
```
Ở đây chúng ta có thể thấy rằng `self`  cũng đề cập đến đối tượng `main`.

Sự khác biệt duy nhất là chúng ta không có quyền truy cập vào các biến local được khai báo trong top-level scope trong phương thức của chúng ta.

Điều này là do thực tế là từ khóa `def` "nhúng" nội dung của phương thức trong một phạm vi scope khác - hoàn toàn bị cô lập.

Tuy nhiên, phương pháp của chúng ta có thể truy cập các biến instance được khai báo trong top-level scope.

Thật vậy, khi các biến instance được khai báo ở level của đối tượng thì chúng ta có thể truy cập các biến này trong phạm vi khác trong đó `self` tham chiếu đến cùng một đối tượng - đối tượng `main` trong trường hợp trên.

Vì vậy, khi `self` trỏ đến `main` trong top-level scope và trong phương thức được xđịnh nghĩa trong top-level scope, chúng ta có thể truy cập biến đối tượng @instance_variable trong phương thức `hello`.

### Class scope
Khi chúng ta sử dụng từ khóa `class`:
* Giá trị của self thay đổi
* Nội dung của class được nhúng trong một phạm vi tách biệt

Hãy cùng xem một ví dụ sau

```ruby
self # => main

class Hello
  p self # => Hello
end
```
Ở đây chúng ta có thể thấy rằng trong class thì `self ` có một giá trị khác - nó đề cập đến lớp Hello.

Ngoài ra, chúng ta không có quyền truy cập vào các biến và phương thức được xác định bên ngoài lớp.

Lưu ý rằng chúng ta có quyền truy cập vào các biến instance trong các phương thức instance vì những lý do tương tự được mô tả trong phần đầu tiên của bài viết.

Trong Phần II & III, chúng ta sẽ thức hành với các scope bằng cách sử dụng các Module, các nested class và các block (FLAT SCOPES).

---

Scope gates trong Ruby: [Phần 2](https://viblo.asia/p/scope-gates-trong-ruby-phan-2-924lJqGNZPM)