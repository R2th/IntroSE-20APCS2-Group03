Rails cung cấp rất nhiều những điều kì diệu mà đôi khi chúng ta luôn coi đó là một điều hiển nhiên. Rất nhiều trong số đó đang diễn ra đằng sau con mắt của một người dùng framework và cũng sẽ thật hữu ích nếu như chúng ta vén bức màn ấy để xem mọi thứ thực sự hoạt động như thế nào.

Nhưng việc mở mã nguồn của Rails có thể sẽ khiến bạn cảm thấy chán nản ngay lập tức. Giống như bị lạc vào một khu rừng với đầy những thứ trừu tượng và cả metaprogramming nữa. Điều này là do bản chất của lập trình hướng đối tượng: về bản chất nó sẽ không đi theo một chiều với từng bước được thực hiện tuần tự tại runtime.

Với suy nghĩ này, hãy giành một chút thời gian để khám phá cách mà bộ định tuyến của Rails hoạt động. Làm thế nào để một request được Rack chấp nhận lại được chỉ dẫn để đến với đúng controller của bạn?

## Familiar territory
Để tiện cho việc minh họa, hãy xem xét một Rails app với duy nhất một route và controller như sau:
```
# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def index
    # ...
  end
end

# config/routes.rb
Rails.application.routes.draw do
  resources :users, only: :index
end
```
Trong trường hợp này, một GET request tới `/users` sẽ được chuyển tới `UsersController#index`. Nhưng bằng cách nào ?

## Orientation
Trải qua rất nhiều bước để một request tìm được tới controller. Nhưng sẽ dễ dàng hơn nếu như chúng ta có một cái nhìn tổng quan về chúng trước. Dưới đây là sơ đồ thể hiện việc đăng ký các route mà chúng ta định nghĩa ở `routes.rb` trong thời điểm Rails khởi động

![](https://images.viblo.asia/3383e165-cbc1-4478-9f73-77a10fc2019a.png)

Và đây là những gì sẽ diễn ra khi chúng ta gửi một GET request tới `/users`:

![](https://images.viblo.asia/cab5e7df-0bd0-498f-91bb-890b75de9cc5.png)

## routes.rb
Chắc hẳn bạn đã quá quen thuộc và hiểu về nó. Nhìn ở góc độ của Rails, đây là một giao diện chung. Đây là nơi bạn định nghĩa ra các `routes` của mình còn Rails sẽ lo phần còn lại. Đó là việc đảm bảo các request đến được với các controller thích hợp.
## RouteSet
Thực ra `routes.rb` chỉ là DSL của public interface. `RouteSet` mới thực sự là người đóng vai trò cấu hình nên các `routes` của một Rails app thông qua việc sử dụng method quen thuộc `#draw`:

```
Rails.application.routes.draw do
  # ...
end
```
Vậy thực sự `Rails.application.routes` là gì? Đó chính là một `RouteSet`.
Tại runtime, `RouteSet` chịu trách nhiệm điều phối toàn bộ quá trình đi vào của các request thông qua việc nhận và xem sét các request đó để gửi các yêu cầu tương ứng vào trong ứng dụng.
## Journey::Routes
Trước đây, `Journey` là một gem độc lập nhưng sau đó nó đã được đưa vòa trong `ActionPack`. Nó tập trung vào các routes và định tuyến cho một request. Nó không can thiệp vào Rails hoặc là nó cũng không quan tâm đến điều đó. Đơn giản chỉ là cung cấp cho nó một danh sách các routes đã được đăng ký, cùng với một request, nó sẽ định tuyến cho request đó đến với route đầu tiên phù hợp.

 `Journey::Routes` nắm giữ dánh sách routes của Rails app. Trong khi `RouteSet` sẽ có nhiệm vụ đưa thêm vào danh sách đó những route mới được đăng ký, nó có thể đến từ `routes.rb`, một engine hay một `gem` giống như Devise khi nó tự định nghĩa các routes của riêng mình.
 ## Journey::Route
 Nếu như coi `Journey::Routes` giống như một mảng thì `Journey::Route` sẽ là các phần tử trong mảng đó. Ngoài những dữ liệu mà bản thân phải lưu giữ, một `Journey::Route` còn chứa một tham chiếu đến `app`, nó sẽ được gọi để phục vụ cho yêu cầu từ request.
 
 Với chức năng như vậy, `Journey::Route` giống như một ứng dụng web đáp ứng yêu cầu đến một endpoint duy nhất. Nó không hiểu về các routes khác trong `Journey::Routes` ngoài bản thân nó, nhưng nó cũng có thể chỉ dẫn một request đi đúng hướng nếu cần thiết.
 ## RouteSet::Dispatcher
 Trái lại với những gì chúng ta nghĩ, `app` trong tham chiếu của một `Journey::Route` hoàn toàn không liên quan gì đến controller. Để thực hiện việc kết nối đó, Rails sử dụng thêm một tầng khác, cũng là để tách biệt logic trong việc routing, thứ mà `Journey` đang nắm giữ.
 
 `Dispatcher` là một class có nhiệm vụ khởi tạo controller và đưa cho nó một request tương ứng cùng với đó là một đối tượng response rỗng. Nó sẽ được gọi khi request được xác định là phù hợp cho một yêu cầu nào đó. Nó không quan tâm đến việc request đó đến từ đâu. Trong trường hợp của chúng ta, khi nhận được request đến `/users`, `Dispactcher` sẽ khởi tạo một `UsersController` và đưa vào đó request. Đây thực sự giống như một nhà máy cho các controllers, nơi mà chúng được được sinh ra và loại bỏ nếu như điều đó là cần thiết.
 
 Điều này có vẻ là không cần thiết nhưng sẽ thật đáng giá nếu như chúng ta xem xét đến vị trí của `Dispatcher`. Nó nằm ở giữa logic của `Journey` và `Controller` đảm bảo việc nếu một trong số chúng có thay đổi thì sẽ không ảnh hưởng tới phần còn lại.
 
## Journey::Router
`Journey::Routes` không biết gì về các requests ở ngoài kia. Nó chỉ biết đến các routes của nó. Vậy khi muốn nhanh chóng điều hướng cho một request đến các route phù hợp, chúng ta cần phải có thứ gì đó hiểu về các routes lẫn các requests. Đúng như tên gọi và chức năng của mình, `Router` xuất hiện để giải quyết vấn đề đó, đây thực sự là nơi đã gọi đến `Dispatcher` khi có một route được tìm thấy.
## UsersController
Sau một quãng đường dài mệt mỏi cuối cùng chúng ta đã về đến nhà. Chắc hẳn khi đứng tại đây, ai cũng sẽ cảm thấy vô cùng thân thuộc. Nhưng liệu bạn có thực sự hiểu rõ về ngôi nhà của mình? Hãy cùng tìm hiểu trong phần sau của series này nhé!

Nguồn bài viết : https://medium.com/rubyinside/a-deep-dive-into-routing-and-controller-dispatch-in-rails-8bf58c2cf3b5