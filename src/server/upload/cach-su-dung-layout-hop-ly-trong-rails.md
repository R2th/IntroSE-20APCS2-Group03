## Mở đầu:
Bài viết này dành cho các bạn mới tiếp cận với **Rails**  trong thời gian khoảng dưới 1 năm kinh nghiệm, hoặc cũng có thể các bạn đã từng làm nhưng không để ý.

Các bạn biết thuộc tính **layout** được sử dụng trong controller không?

Bình thường, hầu hết chúng ta ai cũng biết, khi load view của **rails** thì nó chạy qua **application.html.erb**, và trong đó tương ứng với mỗi **router** được gọi dữ liệu sẽ được load vào phần **yield** và hiển thị ra ngoài.

Vậy **layout** là gì? và khi nào chúng ta cần sử dụng nhiều **layout** trong một hệ thống.

**layout** là một bố cục cho một trang hiển thị, Ví dụ: một trang quản lý bình thường sẽ có các mục sau
* Header
* Body
* Footer
* Sidebar
Trong **Body** thì chúng ta lại có:
* Breadcrumb
* Content
* ....

![](https://images.viblo.asia/c4d29284-b9a1-4fca-9994-c4ff1149a213.png)

Vậy bình thường các hệ thống hay có những loại **layout** nào?
* layout đăng nhập đăng kí: thông thường là một màn hình phẳng và có khung ở giữa

![](https://images.viblo.asia/df28c4e7-6a5a-43a2-ac08-cd9ac972a293.png)
* layout người dùng: các trang báo, các bài viết, hay các màn hình tương tác, ví dụ như các trang show sản phẩm thì sẽ hiển thị thành 3 phần chính: **header** được fix cứng hiển thị, **sidebar** được fix cứng bên phải hoặc bên trái để chứa các chức năng search và các chức năng mở rộng, và phần **content** ở giữa hiển thị toàn bộ danh sách các sản phẩm và có thể scroll xuống dưới

![](https://images.viblo.asia/a76fcd35-7156-4efa-bcc1-35302e5e960a.png)
* layout quản lý: sẽ có nhiều thành phần hơn, **header**, **footer**, **sidebar**, **content**, trong **content** có thể là dạng đồ thị hoặc là dạng bảng, ngoài ra cũng có thể có khung chat để hỗ trợ cho người sử dụng.

![](https://images.viblo.asia/c58a1f87-a093-4989-a32d-0b96eceda344.png)
* Ngoài ra còn các **layout** riêng như:
* trang quản lý chat
 
![](https://images.viblo.asia/c2a26add-a35f-4c32-a690-570af002ee1a.png)
* trong theo dõi thông tin
* ....
Tùy từng trang thì cấu trúc **layout** sẽ khác nhau và dần dần thuộc tính **layout** cũng được tận dụng hiệu quả.

VÍ dụ: trong **Rails**, khi chúng ta mở rộng thêm 1 loại người dùng thì chúng ta sẽ tạo thêm 1 **namespace** mới trong **Routes** để tách biệt hoàn toàn các chức năng của từng loại, tránh trùng lặp

Ví dụ một hệ thống vận hành một kho rượi chúng ta sẽ có những vị trí sau:
- Hướng người dùng:
* Khách vãng lai
* Người mua đăng kí hệ thống

- Hướng người phát triển:
* SupperAdmin: chịu trách nhiệm backup hệ thống
* Admin: chịu trách nhiệm quản lý, phát triển nâng cấp hệ thống

- Hướng người quản lý:
* Kê toán: được quyền can thiệp vào toàn bộ hồ hơ hóa đoan và chứng từ khách hàng
* kho: được quyền xác nhận đơn hàng và kiểm tra tình trạng hàng hóa
* vận chuyển: được quyền đăng kí tiếp nhận đơn hàng, xác nhận tình trạng đơn hàng
* Quản lý chính: theo dõi được toàn bộ các chức năng của các phòng ban trên

Vậy với cấu trúc phân chia như vậy, mỗi một vị trí sẽ mở ra 1 **namespace** và dựng một **layout** tương ứng
với file controller chính **BaseController** sẽ được kế từ **ActionController::Base** và các controller còn lại sẽ dược kế thừa từ **BaseController**
ví dụ ta có **namespace** là **Admin**
chúng ta sẽ có controller chính là **Admin::BaseController**,  và sử dụng layout của riêng nó là **admin.html.erb** đặt trong **views/layouts**
```
class Admin::BaseController < ActionController::Base
  layout "admin"
  ...
end
```

với sự phân chia như vậy, chúng ta có thể dễ dàng quản lý và phát triển từng phần mà không sợ bị **conflic** với các bên khác.

## Ngoài ra:
Một vấn đề tương tự chúng ta sẽ xem xét là cách phân chia và bố cục đối với **CSS** và **Javascript**

Hầu như mình gặp đa phần mọi người load **CSS** thường viết chung vào 1 file là **custom.scss** rùi **= require custom** nó trong file **app/assetse/stylesheets/application.scss**

Mình thấy kha khá ý kiến là cứ viết tạm đó rùi sau này tách ra sau, còn quan điểm của mình thì mình cho rằng, nếu có thể chúng ta nên tách từ đầu, như vậy vừa dễ code vừa dễ quản lý:
Ví dụ cách mình hay chia file **CSS** ra làm 3 loại: 
* **lib**: các file dạng thư viện: có thể tạo thư mục **lib** trong hệ thống hoặc **install** vào thông qua **package**
* **common**: các file **CSS** tự thiết kế mà dùng chung trong toàn bộ hệ thống và được đặt trong thư mục **common**
* các file **CSS** đơn lẻ, chỉ dùng trong một trang nào đó nhất định

Đối với 2 loại đầu là **lib** và **common** chúng ta sẽ **load** chúng trong **application**
còn riêng đối với loại còn lại: chúng ta sẽ dùng cách khác:
ví dụ có 2 trang **localhost:3000/posts** và **localhost:3000/titles** , 2 trang này sẽ sử dụng 2 file **CSS** khác nhau là **post.scss** và **title.scss**, vậy làm sao để có thể **load** riêng mỗi trang chỉ nhận CSS của nó
### Giải pháp:
chúng ta sẽ thêm 1 đoạn **<%= yield, :last_assets %>** vào cuối file **application.html.erb**

```
<html>
  .....

  <body>
    <%= yield %>
    <%= yield, :last_assets %>
  </body>
</html>
```

và trong mỗi file load trang, mình sẽ gọi file **CSS** của nó ra

ví dụ: trang **localhost:3000/posts** là method **index** của **posts**, và chúng ta cần load file **post.scss**, thì chúng ta sẽ thêm đoạn sau đây vào đầu file **../views/posts/index.html.erb**
```rb
<% content_for :last_content do %>
  <%= stylesheet_link_tag 'post' %>
<% end %>
....
```

tương tự với phần **title**  chúng ta cũng sẽ thêm đoạn **content_for** tương tự vào đầu file **../views/titles/index.html.erb**
```rb
<% content_for :last_content do %>
  <%= stylesheet_link_tag 'title' %>
<% end %>
....
```

Như vậy chúng ta đã có thể phân chia thành công **CSS** trong dự án, và tối ưu nó trong sử dụng một cách tốt nhất

### Vậy với Javascript thì sao?
Đối với javascript, chúng ta cũng xử lý tương tự như **CSS** chỉ khác một cái là mình sẽ sử dụng **javascript_include_tag** thay vì **stylesheet_link_tag**

ví dụ chúng ta có file **title.js**
```rb
<% content_for :last_content do %>
  ...
  <%= javascript_include_tag 'title' %>
<% end %>
....
```

### Kết luận:
sự phân chia load trong hệ thống **Rails** sẽ phần nào làm tối giản hệ thống nâng cao performance, giúp chúng ta có thể quản lý hệ thống một cách dễ dàng và minh bạch hơn
Và chúng ta hoàn toàn có thể làm điều đó với sự giúp đỡ của **yield** và **content_for**

## Tổng kết:
Sự phân chia rành mạch từng phần trong hệ thống luôn luôn là một điều cần thiết đối với một nhà phát triển, nó giúp cho nhà phát triển có thể dễ dàng **control** hoặc **handle over** hệ thống một cách tốt nhất, mong rằng bài viết này sẽ nhận được nhiều **feedback** từ phía các bạn

### Xin cám ơn và hẹn gặp lại