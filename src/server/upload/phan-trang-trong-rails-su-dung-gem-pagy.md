Pagy là một thư viện phân trang tương đối nhanh nếu so sánh với các thư viện quen thuộc như Kaminari và will_paginate. Bạn có thể xem so sánh về việc sử dụng bộ nhớ và tốc độ xử lý giữa 3 thư viện này theo ảnh dưới.
![](https://images.viblo.asia/4428e68b-8aa4-48ce-a6c5-5760d9a47ba4.png)
![](https://images.viblo.asia/bb59c60b-0019-4e14-8e87-14cc3c79cfef.png)
![](https://images.viblo.asia/ec0e7c95-8560-4e9d-8576-b84dee171259.png)
### Cài đặt 
Thêm dòng dưới vào `Gemfile` xong chạy `bundle install`
```
gem "pagy"
```
include trong `ApplicationController`
```
Include Pagy::Backend
```
Include trong ApplicationHelper
```
include Pagy::Frontend
```
### Cách sử dụng
Ở trong controller chỉ cần gọi
```
@pagy, @users = pagy(User.all)
```
`@pagy` sẽ có giá trị nhau ví dụ dưới:
```
 @page=1,
 @pages=5,
 @prev=nil,
 @to=2,
 @vars=
  {:page=>1,
   :items=>2,   
   :outset=>0,
   :size=>[1, 4, 4, 1],
   :page_param=>:page,
   :params=>{},
   :anchor=>"",
   :link_extra=>"",
   :item_path=>"pagy.info.item_name",
   :count=>10}>
```
Để thay đổi các giá trị mặc định của pagy sẽ có 2 cách. Bạn có thể chọn một trong 2 cái tùy theo trường hợp mà bạn cần sử dụng:
1. Trong `initializers` tạo file `pagy.rb`. Giá trị thay đổi sẽ được áp dụng cho tất cả các chỗ sử dụng pagy.
Vd: trong `pagy.rb` thêm vào dòng dưới để thay đổi giá trị mặc định items trong một trang
```
Pagy::VARS[:items] = 25
```
2. Chỉ cần thay đổi một chỗ mà bạn cần sử dụng
Vd: 
```
@pagy, @users = pagy(User.all, items: 30)
```
### Sử dụng pagy template
Pagy có hỗ trợ các template như  `pagy_nav`, `pagy_nav_bootstrap`, `pagy_nav_bulma` và `pagy_nav_foundation` . Nếu bạn cần chỉnh sửa lại template bạn có thể làm theo các [này](https://ddnexus.github.io/pagy/how-to#using-templates). nhưng việc chỉnh sửa lại template có thể ảnh hưởng đến tốc độ render.
Mình sẽ cho một ví dụ về việc sử dụng template `pagy_nav_bootstrap`.
Trong file initializers/pagy.rb thêm include pagy bootstrap vào
```
require 'pagy/extras/bootstrap'
```
Sau đó bạn có thể chọn một  trong 3 cái dưới để show phân trạng
```
<%== pagy_nav_bootstrap(@pagy) %>
<%== pagy_nav_responsive_bootstrap(@pagy) %>
<%== pagy_nav_compact_bootstrap(@pagy) %>
```
Chú ý: để sử dụng được các template bạn phải có sử dụng các thư viện đó trong project.
Như trên thì bạn phải có thư viện bootstrap mới hiển thị được `pagy_nav_bootstrap`.
Các bạn có thể tìm hiểu thêm về pagy theo link dưới đây:
* https://github.com/ddnexus/pagy
* https://medium.com/@vfreefly/how-to-use-pagy-with-sequel-and-sinatra-157dfec1c417
* https://www.imaginarycloud.com/blog/how-to-paginate-ruby-on-rails-apps-with-pagy/
* https://ddnexus.github.io/pagy/how-to