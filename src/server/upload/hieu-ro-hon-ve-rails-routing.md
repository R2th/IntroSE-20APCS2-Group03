### Giới thiệu
Ruby on Rails cung cấp một cách xử lý URLS khác về cơ bản so với hầu hết các ngôn ngữ khác. Thay vì dựa vào máy chủ web để kiểm soát định tuyến URL, Rails xử lý định tuyến thông qua config/routes.rb file. File này kiểm soát mọi khía cạnh của URL của bạn. Trong bài viết này, chúng tôi sẽ đề cập đến một số điều cơ bản định tuyến. Băt đâu nào!!!!
### RESTful Routes
Trước đến với routing, chúng ta phải hiểu REST. Rails sử dụng REST rộng rãi cho định tuyến URL, vì vậy chúng ta phải hiểu rõ về REST để hiểu định tuyến Rails. REST là viết tắt của Chuyển giao Nhà nước Đại diện. Các ứng dụng RESTful thường coi web như một tài nguyên. Với REST, có một số phương thức HTTP được sử dụng để thể hiện các loại hành động được thực hiện bởi người dùng và / hoặc ứng dụng.
Sử dụng các phương thức HTTP một cách rõ ràng:
     1. Dùng POST để tạo mới một tài nguyên
     2. Dùng GET để truy xuất tài nguyên
     3. Dùng PUT/PATCH để cập nhật tài nguyên
     4. Dùng DELETE để xóa tài nguyên
Bạn sẽ nhận thấy list trên mà tôi đã đề cập rằng hầu hết các trình duyệt chỉ hiểu POST và GET. Đây không phải là vấn đề đối với Rails. Rails thực sự có phương thức HTTP được chôn trong một phần tử biểu mẫu ẩn. Khi trang tương tác với máy chủ, yêu cầu bị chặn và được xây dựng lại.
### File routes trong rails
Thông thường trong tệp tuyến đường Rails, bạn chỉ định phương thức HTTP theo sau là trang hoặc hành động. Ví dụ:
```
get "users", to: "users#index"
# http GET method, Trong trường hợp này, Lấy được một danh sách người dùng

get "users/:id", to: "users#show"
# Trong trường hợp này, có được một người dùng cụ thể thông qua id được cung cấp. Ví dụ: / users / 3882

post "users", to: "users#create"
# http POST method, Trong trường hợp này, được sử dụng để tạo người dùng.

put "users/:id"
# http PUT method, được sử dụng để cập nhật tài nguyên, trong trường hợp này, cập nhật người dùng. Các phiên bản cũ hơn của Rails đã sử dụng điều này cho tất cả các bản cập nhật.

patch "users/:id"
#  http PATCH method.  66/5000
trong trường hợp này, được sử dụng để cập nhật một phần thông tin của người dùng.

delete "users/:id"
# http DELETE method.  Trong trường hợp này, được sử dụng để xóa một người dùng.
```
Tất cả các phương thức được liệt kê ở trên đều sử dụng các phương thức HTTP để báo cho Rails biết phương thức nào cần gọi trên bộ điều khiển. Chúng quan trọng đến mức Rails bao gồm 2 từ khóa đặc biệt để tự động tạo chúng. Đầu tiên 'resources'  với Rails bạn muốn chỉ định các hành động trên cho một controller nhất định
```
resources: users
# tạo:
# get "/ users" - chỉ mục trên controller của bạn
# get "/ users /: id" - hiển thị trên controller của bạn
# get "/ users / new" - phương thức mới trên controller
# bài "/ users" - tạo trên controller
# get "/ users /: id / edit" - phương pháp chỉnh sửa trên controller
# put "/ users /: id" - cập nhật trên controller
# patch "/ users /: id" - cập nhật trên controller
# xóa "/ users /: id" - xoá trên controller
```
Từ khóa thứ hai, 'resource' (không có collection), được sử dụng nếu bạn đang tương tác với một tài nguyên. Trong trường hợp này, một số routes được bỏ qua.
```
resource :privacy_policy
# generates:
#   get "/privacy_policy" -- hiển thị trên controller
#   get "/privacy_policy/new" -- phương thức mới trên controller
#   post "/privacy_policy" -- Tạo trên controller
#   get "/privacy_policy/edit" -- chỉnh sửa trên controller
#   put "/privacy_policy" -- Cập nhật trên controller
#   patch "/privacy_policy" -- Cập nhật trên controller
#   delete "/privacy_policy" -- xoá controller
```
Bạn có thể nhanh chóng và dễ dàng bỏ qua các hành động nhất định cho cả hai resource và resources. Để làm điều này, bạn sử dụng một trong hai 'except' và 'only' . Như tên của chúng ngụ ý, từ khóa ngoại trừ cho rails tạo ra tất cả các hành động ngoại trừ những hành động bạn chỉ định, trong khi từ khóa duy nhất bảo Rails chỉ tạo các tuyến đã cho.
```
resources :users, except: [:show]
# tạo hành động cho mọi thứ trừ get "/ users /: id"

resource :privacy_policy, only: [:show]
# chỉ tạo tuyến đường get "/ Privacy_policy cho Chính sách quyền riêng tư.
```
### Custom Actions
Trong một số trường hợp nhất định, bạn có thể muốn có hành động tùy chỉnh. Những hành động này có thể là trên một tài resource lẻ (/ users /: id) hoặc một tập hợp các resource (/ users).
```
resources "posts" do
  put :rate # tạo ra put "/posts/:id/rate_up"
end

resources "products"  do
  collection do
    get "most_popular" # tạo ra get "/products/most_popular"
  end
end
```
Các hành động tùy chỉnh thường có ích để làm cho URL có ý nghĩa hơn hoặc ngụ ý nhiều chức năng hơn.
### Lồng nhiều resource
```
resources :users do
   resources :posts
end
```

Bạn cũng có thể tạo bí danh cho URL. Điều này có nghĩa là bạn có thể có một url thân thiện với người dùng, chẳng hạn như http://yourdomain.com/login gọi một controller và hành động cụ thể, hành động mới trên controller phiên của bạn chẳng hạn.
### Những ràng buộc
Bạn cũng có thể chỉ định các ràng buộc. Chẳng hạn, giả sử bạn muốn hạn chế một số hành động nhất định với một tên miền phụ cụ thể. Bạn có thể làm như vậy với mã sau đây.
```
constraints subdomain: 'api' do
  resources :products do
end
```
Các ràng buộc có thể còn cao cấp hơn, ví dụ, các ràng buộc sau đây sẽ kiểm tra xem người dùng có đang sử dụng iPhone không:
```
constraints(lambda { |req| req.env["HTTP_USER_AGENT"] =~ /iPhone/ }) do
  resources :products
end
```
Đối với các ràng buộc thực sự tiên tiến, bạn có thể tạo một lớp. Ví dụ, đoạn mã sau thực hiện chính xác như trước:
```
class Iphone
  def self.matches?(request)
    request.env["HTTP_USER_AGENT"] =~ /iPhone/
  end
end
```
```
constraints(Iphone) do
  resources :products
end
```
### Namespaces
Bạn có thể có không gian tên tùy chỉnh là tốt. Mọi thứ trong một không gian tên sẽ được tiền tố bởi không gian tên. Ví dụ:
```
namespace :admin do
  get 'posts' => "posts#index" # http://yourapp.com/admin/posts
end
```
### Phần kết luận
Đây không phải là một hướng dẫn đầy đủ để định tuyến trong Ruby on Rails, mà là nó được thiết kế để giúp bạn có được đôi chân ướt mà không phải đào bới hàng tấn tài liệu. Hãy cho tôi biết nếu bạn thấy hướng dẫn này hữu ích. Cảm ơn vì đã đọc!