Routes là một phần cơ bản của Rails, vì nếu không có chúng, bạn sẽ không thể điều hướng trong ứng dụng. Mặc dù tất cả các nhà phát triển Rails đều ít hoặc nhiều quen với các tuyến DSL, một số tính năng ít được biết đến hơn làm cho cấu hình định tuyến trở nên linh hoạt hơn.

Bài viết này bao gồm các ví dụ sử dụng không chuẩn mà bạn có thể thấy hữu ích khi xây dựng ứng dụng web tiếp theo với Rails.

### Nhiều file cấu hình cho một project lớn

Độ phức tạp của file routes.rb tập tăng dần với độ phức tạp của ứng dụng, vì vậy bạn có thể gặp nhiều định nghĩa và sẽ khó duy trì chúng hơn đối với một người không quen với ứng dụng.

Thay vì đặt tất cả các định nghĩa vào tệp config/route.rb, bạn có thể chia các tuyến đường thành nhiều tệp. Giả sử rằng ứng dụng của bạn có một phần dành cho người dùng và quản trị viên:

```ruby
# config/routes.rb
 
Rails.application.routes.draw do
 namespace :admin do
   resources :users
   resources :posts
 end
 
 resources :posts, only: %i[show index]
 resources :users, only: %i[show]
end
```

Nếu bạn dự định thêm nhiều tuyến đường với các nhóm khác nhau,  lưu trữ cấu hình trong các tệp được tách biệt có thể là một ý tưởng hay. Để thực hiện việc này, hãy tạo một thư mục config/routes và tạo tệp cho mỗi nhóm:

```ruby
# config/routes/admin.rb
 
namespace :admin do
 resources :users
 resources :posts
end
```

Và một tệp cho người user:

```ruby
# config/routes/user.rb
 
resources :posts, only: %i[show index]
resources :users, only: %i[show]
```


Bước cuối cùng là tải các tệp đó vào tệp config/route.rb chính và cung cấp chúng trong ứng dụng. Để làm điều này, chúng ta có thể ghi đè lớp mapper và thêm phương thức draw:

```ruby
# config/routes.rb
 
module ActionDispatch
  module Routing
    class Mapper
      def draw(routes_name)
        routes_path = Rails.root.join('config', 'routes', (@scope[:shallow_prefix]).to_s, "#{routes_name}.rb")

        instance_eval(File.read(routes_path))
     end
    end
  end
end
 
Rails.application.routes.draw do
  draw :admin
  draw :user
end
```

Kể từ giờ, mỗi khi phương thức draw được gọi, chúng ta tìm kiếm tệp route với tên đã cho và đánh giá nội dung của tệp trong ngữ cảnh của block draw của chúng ta.

### Chuyển hướng ở routes thay vì controller

Chuyển hướng ở controller là một mẫu điển hình, nhưng hành động như vậy cũng có thể đạt được ở route . Ví dụ đơn giản nhất về chuyển hướng chứa các giá trị được mã hóa cứng cho cả đường dẫn nguồn và đường dẫn đích:

```ruby
Rails.application.routes.draw do
  get '/email_us' => redirect('/contact')
end
```

Theo mặc định, mã phản hồi 301 được trả về trong quá trình chuyển hướng, có nghĩa là tài nguyên được di chuyển vĩnh viễn đến địa chỉ mới. Nếu bạn muốn thay đổi hành vi đó và sử dụng mã phản hồi 302 để thay thế (có nghĩa là được di chuyển tạm thời), bạn phải chuyển tùy chọn trạng thái làm đối số thứ hai:

```ruby
Rails.application.routes.draw do
  get '/email_us' => redirect('/contact', status: 302)
end
```

### Logic chuyển hướng phức tạp hơn

Nếu việc chuyển hướng của bạn phức tạp hơn chỉ là một sự thay thế đơn giản của đường dẫn chính, bạn có thể truyền một block đến phương thức chuyển hướng và thao tác với các tham số và đối tượng yêu cầu bên trong:

```ruby
Rails.application.routes.draw do
  get '/email_us/:utm_source', to: redirect { |params, request|
    utm_path = case params[:utm_source]
               when 'facebook', 'twitter' then 'contact/social'
               when 'campaign' then 'contact/campaign'
               else
                 'contact/default'
               end
 
    "http://#{request.host_with_port}/#{utm_path}"
  }
end
```

Chúng tôi muốn chuyển hướng đến một đường dẫn khác trong chuyển hướng ở trên tùy thuộc vào nguồn của khách truy cập. Với cú pháp đó, chúng tôi cũng có thể dễ dàng chuyển hướng người dùng bên ngoài ứng dụng của mình.

Cách tiếp cận này là linh hoạt nhưng còn lâu mới hoàn hảo. Chúng ta muốn tránh đưa logic nghiệp vụ vào tệp tuyến đường. Rất may, chúng ta có thể đơn giản cấu trúc lại mã của mình và cô lập logic.

### Logic chuyển hướng có thể tái sử dụng và dễ dàng kiểm tra 

Phương thức chuyển hướng cũng chấp nhận bất kỳ class instance nào phản hồi phương thức gọi. Phương thức này sẽ trả về một chuỗi đại diện cho đường dẫn mà khách truy cập sẽ được chuyển hướng đến và chấp nhận hai đối số: tham số và yêu cầu.

Chúng ta có thể tạo lớp UtmSourceRedirector và cô lập logic chuyển hướng của chúng ta ở đó:

```ruby
class UtmSourceRedirector
  def initialize(target_path)
    @target_path = target_path
  end
 
  def call(params, request)
    path = utm_path(params[:utm_source])
    "http://#{request.host_with_port}/#{path}"
  end
 
  private
 
  def utm_path(utm_source)
    case utm_source
    when 'facebook', 'twitter' then "#{@target_path}/social"
    when 'campaign' then "#{@target_path}/campaign"
    else
      "#{@target_path}/default"
    end
  end
end
```

Bây giờ, chúng ta chỉ cần tạo một instance  mới và chuyển nó đến phương thức chuyển hướng để giữ nguyên logic như chúng ta đã có với block option.

```ruby
Rails.application.routes.draw do
  get '/email_us/:utm_source', to: redirect(UtmSourceRedirector.new('contact'))
end
```

### Sửa đổi các tùy chọn chuyển hướng

Nếu bạn không cần một lớp riêng biệt để xử lý chuyển hướng, bạn cũng có thể ghi đè các tham số yêu cầu chuyển hướng bằng cách truyền các tùy chọn sau:

*     protocol
*     host
*     port
*     path
*     params

Ví dụ: nếu bạn muốn thực hiện chuyển hướng với các tham số bổ sung, bạn có thể truyền hàm băm sau cho phương thức chuyển hướng:

```ruby
Rails.application.routes.draw do
  get '/email_us', to: redirect(path: 'contact', params: { utm_source: 'old_form'})
end
```

Chỉ cần nhớ truyền cả tùy chọn đường dẫn vì bạn đang ghi đè tùy chọn yêu cầu. Nếu không có tùy chọn đường dẫn, bạn sẽ gặp phải chuyển hướng vô tận vì Rails sẽ sử dụng đường dẫn hiện tại mà chuyển hướng đã được xác định.

Chuyển hướng ở route là một sự thay thế thú vị cho phép chúng ta không thay đổi logic của controller khi không cần thiết

### Concern không chỉ dành riêng cho các model và controller

Khái niệm concerns chủ yếu được biết đến từ các controllers và models nơi chúng ta có thể sử dụng các module để đóng gói mã thường được sử dụng và sử dụng lại nó trên các class khác. Cũng có thể sử dụng concerns với các tuyến đường. Mặc dù cách triển khai khác nhau, nhưng kết quả là giống nhau: chúng tai không lặp lại hai lần cùng một đoạn mã.

Hãy xem xét một ví dụ điển hình để có ý tưởng đằng sau các mối quan tâm về route. Nếu bạn đang xây dựng một trang web, bạn có thể muốn thêm khả năng nhận xét về các tài nguyên khác nhau của người dùng trang web:

```ruby
Rails.application.routes.draw do
  resources :articles do
    member do
      resources :comments, only: [:create, :index]
    end
  end
end
```

Cấu hình trên cho phép bạn tạo và kéo bình luận cho bài viết đã chọn. Nếu bạn muốn xem những route nào có sẵn, hãy thực hiện rake routes hoặc rails routes task (rake routes không còn khả dụng trong Rails 6.1).

Nếu bạn cũng có documents resources, bạn cũng có thể cho phép nhận xét về chúng:

```ruby
Rails.application.routes.draw do
  resources :articles do
    member do
      resources :comments, only: [:create, :index]
    end
  end
 
  resources :documents do
    member do
      resources :comments, only: [:create, :index]
    end
  end
end
```

Chúng ta đã phải lặp lại cấu hình để đảm bảo rằng tính năng nhận xét sẽ hoạt động giống như trên các bài báo và tài liệu. Đây là một kịch bản hoàn hảo để sử dụng concerns:

```ruby
Rails.application.routes.draw do
  concern :commentable do
    member do
      resources :comments, only: [:create, :index]
    end
  end
 
  resources :articles, concerns: %i[commentable]
  resources :documents, concerns: %i[commentable]
end
```

Bạn chỉ cần tạo mối quan tâm mới bằng cách đặt tên của nó và gói nó thành một khối chứa tất cả cấu hình thuộc concern đã cho.

Nếu bạn muốn linh hoạt hơn nữa, bạn có thể bọc cấu hình của mình thành một đối tượng:

```ruby
# commentable.rb
 
class Commentable
  def initialize(defaults = {})
    @defaults = defaults
  end
 
  def call(mapper, options = {})
    options = @defaults.merge(options)
    commentable_actions = %i[create index]
    commentable_actions << :update if options[:editable]
 
    mapper.member do
      mapper.resources :comments, only: commentable_actions
    end
  end
end
```

Đối tượng đó cho phép chúng ta kiểm soát rõ ràng tính năng chỉnh sửa nhận xét khi sử dụng concern đối với các tài nguyên đã cho:

```ruby
Rails.application.routes.draw do
  concern :commentable, Commentable.new(editable: false)
 
  resources :articles do
    concerns :commentable, editable: true
  end
 
  resources :documents, concerns: %i[commentable]
end
```

Người dùng của chúng ta có thể nhận xét về tài liệu, nhưng họ không thể chỉnh sửa nhận xét của mình khi nhận xét về các bài báo; sau đó họ có thể chỉnh sửa nhận xét của mình nếu cần.

Nếu tệp route.rb của bạn bao gồm nhiều tuyến đường, có lẽ bạn nên cấu trúc lại cấu hình bằng concerns. Nếu bạn không xác định nhiều tuyến đường, thay đổi đó có thể chỉ là một mức trừu tượng khác mà bạn không cần.

### Chạy một ứng dụng khác bên trong ứng dụng Rails

Có thể gắn một ứng dụng dựa trên Rack khác làm tuyến ứng dụng Rails. Bạn có thể sử dụng Hanami, Sinatra hoặc Grape để xây dựng một ứng dụng và sau đó sử dụng nó với ứng dụng Rails hiện có của bạn.

Nếu bạn đang tự hỏi tại sao bạn cần làm điều đó thay vì thêm nhiều mã hơn vào ứng dụng của mình, tôi có một vài lý do có thể thuyết phục bạn:

>      Ứng dụng API riêng biệt - bạn có thể để lộ quyền truy cập API cho ứng dụng của mình bằng cách xây dựng một ứng dụng nhỏ với Grape hoặc Sinatra. Cách tiếp cận như vậy hiệu quả hơn và cung cấp sự cô lập tuyệt vời cho mã
>      Sử dụng một ứng dụng không cần Rails - Rails rất tuyệt, nhưng các tính năng tuyệt vời của nó đi kèm với chi phí hiệu suất kém hơn và nhiều mức độ trừu tượng. Trang tổng quan web của Sidekiq là một ví dụ tuyệt vời về tiện ích bổ sung mở rộng Rails nhưng nó không cần mã của nó để cung cấp giá trị

Đây là ví dụ từ tài liệu của Sidekiq:

```ruby
Rails.application.routes.draw do
  require 'sidekiq/web'
  mount Sidekiq::Web => '/sidekiq'
end
```

Bạn chỉ cần gọi mount, truyền vào điểm nhập ứng dụng cùng với đường dẫn nơi nó có thể truy cập được và bạn đã hoàn tất.