## Rack

Để hiểu cách Rails diễn giải params, bạn sẽ phải hiểu những điều cơ bản của Rack và cách Rails tương tác với nó. Theo [document](https://github.com/rack/rack) của rack:

> Rack provides a minimal interface between web servers that support Ruby and Ruby frameworks.
> To use Rack, provide an “app”: an object that responds to the call method, taking the environment hash as a parameter, and returning an Array with three elements:
> 1. The HTTP response code
> 2. A Hash of headers
> 3. The response body, which must respond to each


-----

Về cơ bản thì Rack sẽ nằm giữa web server và ứng dụng Rails của bạn.

* Nó nhận request từ web server, chuyển nó thành biến `env` (Ruby hash) mà Rails có thể hiểu
* Rails lấy biến `env` đó, thực hiện những gì nó cần với nó và trả về một mảng đơn giản trở lại Rack với `HTTP response code`, `headers` và `response body`.
* Rack lấy mảng đó, chuyển nó trở lại thành phản hồi HTTP thích hợp và đưa nó đến trình duyệt để hiển thị.!

![](https://images.viblo.asia/499e319b-f6ae-4bff-ba51-d3bd4d5bdf1c.png)


## “params” là gì ?

Để hiểu rõ hơn về việc params bắt nguồn từ đâu, chúng ta cần hiểu rõ hơn về nó. Có phải là một `Hash` ? `Method` ? Thứ gì khác ?

Cách tốt nhất để tìm ra điều này là đặt `binding.pry` vào một `controller action` và cố gắng tìm hiểu xem nó có những cái gì.

Hãy lấy 1 VD:

![](https://images.viblo.asia/d1603a41-ffa9-41ff-8463-1c748dffd673.png)

Sau khi submit 1 test form

![](https://images.viblo.asia/d84d7002-119d-42d2-8691-0c625c8191e3.png)

Tiếp tục tìm hiểu:

1. `params` là một method của lớp `ActionController::StrongParameter`.
2. Mặc dù `params` được thể hiện như là một `hash`, nhưng thữ ra nó là một instance của lớp `ActionControll::Paramameter`.

![](https://images.viblo.asia/6cb881ef-9ca8-4a28-9eb2-12ee7724cf55.png)

Nếu bạn không quen thuộc với `ActionControll::StrongParameter`, thì đây là lớp cấp cho chúng ta nhiều bảo mật hơn và dùng để hạn chế đối với tham số đầu vào. Nếu bạn đã từng sử dụng cú pháp này trước đây, bạn có thể cảm ơn `ActionContoder::StrongParameter`:

```
params.require(:post).permit!
```


Bên trong [source code](https://github.com/rails/rails/blob/4-0-stable/actionpack/lib/action_controller/metal/strong_parameters.rb) `ActionControll::StrongParameter`, bạn sẽ tìm thấy `params` trong đó.

![](https://images.viblo.asia/508f8f28-d19a-4107-b3f8-0ab2693acd59.png)

Như bạn thấy, `params` là một getter method của lớp `ActionContoder::StrongParameter` và nó trả về biến instance `@_params`, là một instance của lớp `ActionContoder::Paramameter`.

Thoạt nhìn, điều này có vẻ không có ích nhiều, nhưng điều này giải thích tại sao `params` có sẵn cho chúng ta trong controller của chúng ta. Kiểm tra console của bạn sẽ cho bạn biết lý do tại sao.

![](https://images.viblo.asia/3ef82b03-7727-4d81-a1e4-f4bd637c5059.png)


Chúng ta có quyền truy cập vào `params` vì controller của chúng ta là `descendants` của `ActionContoder::StrongParameter` và kế thừa tất cả các `instance methods` của nó!

Trong khi điều này giải thích bí ẩn `params` có mặt ở khắp nơi, thì nó không giải thích làm thế nào nó để có được nó. Nếu bạn như tôi, bạn muốn biết toàn bộ câu chuyện. Ví dụ, request.parameters là gì? Nó đến từ đâu?

## `params` đến từ đâu

Sau khi tìm hiểu nhiều hơn về Rails, tôi đã thấy `ActionControll::Metal`. Về cơ bản, `ActionControll::Metal` là một phiên bản `khung xương` của `ActionControll::Base`.

Nếu bạn nhìn vào [source code](https://github.com/rails/rails/blob/4-0-stable/actionpack/lib/action_controller/metal.rb) của nó, bạn sẽ tìm thấy một số tài liệu liên quan đến `request` cũng như tập hợp các methods liên quan đến `params`.

![](https://images.viblo.asia/bce2c567-3efa-41fb-bf17-8e6c1331ec2b.png)

Tại thời điểm này tôi nên đề cập rằng, để đi sâu hơn vào Rails, tôi đã bao gồm một trình ghi stack trace.

![](https://images.viblo.asia/6dba08fa-f9d6-4a3c-9bb7-41dc399ed2b7.png)


Lý do tôi đề cập đến điều này là bởi vì bạn sẽ thấy tất cả các methods được gọi khi Rails nhận được một biến env từ Rack - và có RẤT NHIỀU. Nếu bạn muốn xem mọi thứ xảy ra đằng sau hậu trường, hãy xem cái này.

![](https://images.viblo.asia/c872ba67-6ee3-490c-b74e-2e9c293844f5.png)


Mặc dù nhật ký này rất ấn tượng và quái dị, nhưng chỉ có một vài dòng mà chúng ta cần phải lo lắng về `params`và `ActionContoder::Metal`.

![](https://images.viblo.asia/00f65ac5-e408-4b09-9a66-899cacb87dfb.png)

Các dòng có liên quan được tô màu xanh lam

![](https://images.viblo.asia/6c70f1cc-6d91-481b-80ef-6b658486f398.png)

ActionController::Metal#dispatch

![](https://images.viblo.asia/5252dfae-c0b4-4957-a4ce-2c06046a61dd.png)

ActionController::Metal::action

Điều mà stack trace này nói là sau khi Rails được khởi tạo với biến env, biến đó được truyền qua Rails. Tại một số điểm, nó hướng tới `class method ActionControll::Metal::action`. Bên trong phương thức này, `ActionContoder::Metal` khởi tạo một `instance` mới của chính nó và gọi `#dispatch`, nó đặt `@_request` là một `instance` mới của lớp `ActionDispatch:: Request`.

`ActionDispatch::Request` là giao diện Rails sử dụng để tương tác với `HTTP request` (env) có nguồn gốc từ Rack. Một trong những phương thức mà API này cung cấp là `#parameters`.

![](https://images.viblo.asia/171e00d7-dad1-4f27-8b54-32e393330698.png)

Đây là khởi nguồn của `request.parameter`!