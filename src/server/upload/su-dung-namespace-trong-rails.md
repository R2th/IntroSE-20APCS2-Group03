Đã bao giờ bạn cảm thấy thật rối rắm và mệt mỏi khi phải sắp xếp hay quản lý các cấu trúc và phần xử lý của ứng dụng ? \
Bạn có một ứng dụng phân quyền, trong đó có những chức năng mà bất kỳ người dùng nào cũng có thể sử dụng, nhưng cũng có những chức năng mà chỉ admin (người quản lý) mới có thể thực thi. Vậy làm sao để có thể quản lý mọi thứ một cách đơn giản và dễ hiểu nhất ? Hãy cùng tìm hiểu nhé. 
## **Routing**
Hãy bắt đầu với 1 ví dụ đơn giản, giả sử chúng ta có nhiều categories (xe cộ, tàu thuyền, máy bay...), mỗi category lại có nhiều post. Routes của chúng ta sẽ có dạng như sau:
```ruby
resources :categories, only: [:index, :show] do
  resources :posts, only: [:new, :create, :show]
end
```
Chúng ta muốn cho admin quyền tạo mới và thêm categories, khi đó hãy thêm vào *routes.rb*:
```ruby
namespace :admin do
  resources :categories, only: [:new, :create]
end
```
Lúc này chúng ta đã có 1 routes với đường dẫn ***/admin/categories*** dẫn tới ***Admin::CategoriesController***
## **Controller**
Sau khi định nghĩa namespace trong routes, chúng ta cần lưu ý một vài vấn đề sau:
1. Khi tạo file trong controller, hãy đặt nó trong folder ***admin/*** của ***app/controllers/*** (ví dụ: ***app/controllers/admin/categories_controller.rb***).
2. Controller được đặt trong namespace admin nên chúng ta sẽ sử dụng toán tử scope để định nghĩ class trong controller:
```ruby
class Admin::CategoriesController < ApplicationController
# Methods omitted
end
```
Kể từ bây giờ, chúng ta có thể định nghĩa các actions **new** và **create** như bình thường.
Lưu ý, đối với routes categories, chúng ta có thể tạo thẳng file **categories_controller** trong ***app/controllers/*** vì bản thân categories không phải là 1 namespace.
## **Views**
Những file views của các action trong ***Admin::CategoriesController*** cũng được tạo tương tự như controller.
Khi Rails muốn sử dụng những file này. chúng sẽ được tìm thấy trong cái subfolder nằm trong ***app/views/admin/***
## **Restricting Access to Admin Actions**
Chúng ta đã thiết lập những action của admin thông qua namespace, nhưng chúng ta chưa giới hạn quyền truy cập cho những hành động này.
Một trong những phương pháp thường được sử dụng nhất là thêm một ***before_action*** trong ***Admin::CategoriesController***
```ruby
class Admin::CategoriesController < ApplicationController
  before_action :require_admin

  # Methods omitted

  def require_admin
    unless current_user.admin?
      redirect_to root_path
    end
  end
end
```
Ở đây, chúng ta đã có một method ***current_user*** được định nghĩa bởi hệ thống authentication. Ngoài ra, trong ***User*** model của chúng ta đã tồn tại 1 trường boolean ***admin***, nhờ vào đó có thể dễ dàng kiểm tra tài khoản hiện tại có phải là một admin hay không.
## **Refactoring**
Tính tới thời điểm này, đây là một phương pháp tốt, nhưng vẫn thiếu tính linh động. Nếu như phải thêm những action khác cho admin (ví dụ như: lọc những post bị gắn cờ spam), chúng ta phải tái định nghĩa method ***require_admin*** trong mỗi namespace trong controller. Vậy làm sao để giải quyết vấn đề này ?\
Một trong những giải pháp cho trường hợp này là định nghĩa ***require_admin*** trong ***ApplicationController***. Sau đó, thêm ***before_action*** trong mỗi admin controller.\
Tiếp theo, chúng ta định nghĩa 1 class riêng biệt, ***AdminController***, kế thừa từ ***ApplicationController***.
```ruby
class AdminController < ApplicationController
  before_action :require_admin

  def require_admin
    unless current_user.admin?
      redirect_to root_path
    end
  end
end
```
Kể từ đây, mỗi namespace admin controller đều có thể kế thừa trực tiếp từ ***AdminController***. Do đó, chỉ cần chúng ta khai báo ***before_action***  trong ***AdminController***, tất cả những actions trong sub-classed controller bất kỳ đều bị giới hạn bởi tài khoản admin.\
Chúng ta không cần phải liệt kê toàn bộ các ***before_action*** hay khai báo một method ***require_admin*** trong mỗi namespace trong controller vì từ đây, chúng sẽ được kế thừa từ ***AdminController***.
```ruby
class Admin::CategoriesController < AdminController
  # Methods omitted
end
```
Trên đây là những tìm hiểu của mình về việc sử dụng namespace để tổ chức, phân biệt và quản lý các action của admin một cách đơn giản và hiệu quả. Hẹn gặp lại các bạn ở bài viết sau.
### IC_Mzu