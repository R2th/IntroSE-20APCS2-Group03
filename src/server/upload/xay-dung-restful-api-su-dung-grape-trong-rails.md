Trong thời kỳ phát triển các ứng dụng web và ứng dụng mobile đang phát triển.Chúng ta cần RESTful JSON API để tương tác với front-end. Ở đây bạn thể sử dụng backbone.js, ember.js hoặc angurlar.js trong front-end của ứng dụng. Ở đây chúng ta sử dụng Rails ở phía back-end để sử lý trả về API. Ở trong Rails thì có khá nhiều các gem để hổ trở viết APi ở đây grape có thể là một lựa chọn khá tốt.

# {GRAPE}

Grape là một microframework  RESTful API  sử dụng dễ dàng và nhanh chóng tạo ra các API cho các ứng dụng web gốc Ruby.
OK bây giờ chúng ta sẽ bắt đầu xây dựng RESTful JSON sử dùng thư viện Grape:

### Setting gem.
Thêm gem grape vào gem file và bundle nó:
```ruby
gem 'grape'
```
### Tạo base cơ bản.
Tạo 1 folder api ở trong lib `lib/api` . Chúng ta thêm luôn trong lib thì không cần load path cho folder này nữa nhưng nếu bạn muốn để trong một folder khác ví dụ `app/api` thì chúng ta phải làm như sau trong aplication.rb:
```ruby
# aplication.rb
configconfig..pathspaths..addadd  "app/api""app/api",,  globglob::  "**/*.rb""**/*.rb"
 
configconfig..autoload_pathsautoload_paths += Dir["#{Rails.root}/app/api/*"]
```

Đầ tiên chúng ta sẽ tạo một class như sau:
```ruby
# lib/api/root.rb
module API
  class Root < Grape::API
    prefix 'api'
    mount API::V1::Root
    # mount API::V2::Root (next version)
  end

```
Và bây giờ một version của api:
```ruby
# lib/api/v1/root.rb
module API
  module V1
    class Root < Grape::API
      mount API::V1::Posts
      mount API::V1::Authors
    end
  end
end
```
Tiếp theo sẽ là một `posts`resource để truy cập api:
```ruby
Now, add resource Posts available for api access in json format

# lib/api/v1/posts.rb
module API
  module V1
    class Posts < Grape::API
      version 'v1'
      format :json
 
      resource :posts do
        desc "Return list of recent posts"
        get do
          Post.recent.all
        end
      end
    end
  end
end
```
Chúng ta sẽ tạo thêm một số api nữa:
```ruby
# lib/api/v1/authors.rb
module API
  module V1
    class Authors < Grape::API
      version 'v1' 
      format :json 
 
      resource :authors do
        desc "Return list of authors"
        get do
          Author.all
        end
      end
    end
  end
end
```
Và giờ chúng ta sẽ mounting API và routes của rails
```ruby
# config/routes.rb
SampleApp::Application.routes.draw do
  mount API::Root => '/'
end
```
###  Xử lý lỗi - JSON API Errors
Chúng ta có thể control các lỗi và customize chúng để trả về lỗi theo ý của mình.
```ruby
# lib/api/error_formatter.rb
module API
  module ErrorFormatter
    def self.call message, backtrace, options, env
      { :response_type => 'error', :response => message }.to_json
    end
  end
end
```
Và ta sẽ sử dụng nó ở trong API::Root
```ruby
# lib/api/root.rb
module API
  class Root < Grape::API
    #...
    error_formatter :json, API::ErrorFormatter
    #...
  end
end
```
Bạn có thể override lỗi cho phiên bản api cụ thể cho API :: v1 :: Root:
```ruby
#lib/api/v1/error_formatter.rb
module API
  module V1
    module ErrorFormatter
      def self.call message, backtrace, options, env
        { :response_type => 'error', :response => message }.to_json
      end
    end
  end
end
 
# lib/api/v1/root.rb
module API
  module V1
    class Root < Grape::API
      #...
      error_formatter :json, API::V1::ErrorFormatter
      #...
    end
  end
end
```
### Truy cập API.
Khi bạn `rake routes | grep api` thì khi đó chỉ hiện thị duy nhất một routes:
```ruby
rake routes | grep api
    api_root        /api                API::Root
```
Nếu bạn muốn hiện thị sâu hơn routes để hiện thị các routes của `posts hay author` thì bạn phải custom lại rake routes trong rake task như sau:
```ruby

# lib/tasks/routes.rake# lib/tasks/routes.rake
 
namespacenamespace  :api:api  dodo
 
    descdesc  "API Routes""API Routes"
 
    tasktask  :routes:routes  =>=>  :environment:environment  dodo
 
        APIAPI::::RootRoot..routesroutes..eacheach  dodo  ||apiapi||
 
            methodmethod  ==  apiapi..route_methodroute_method..ljustljust((1010))
 
            pathpath  ==  apiapi..route_pathroute_path..gsubgsub((":version"":version",,  apiapi..route_versionroute_version))
 
            putsputs  "     "     #{#{methodmethod}}  #{#{pathpath}}""
 
        endend
 
    endend
 
endend
```
Và bây giờ bạn chạy lại như sau sẽ nhận được một kết quả khá rõ ràng:
```ruby
rake api:routes
    GET        /api/v1/posts(.:format)
    GET        /api/v1/authors(.:format)
```
### Securing API
Bạn có thể sử dụng `HTTP Basic authentication` hoặc đơn giản hơn sử dụng `Authenticate using email and password
` 
##### HTTP Basic authentication
Thêm basic authen như sau:
```ruby
# lib/api/root.rb
module API
  class Root < Grape::API
    #...
 
    http_basic do |email, password|
      user = User.find_by_email(email)
      user && user.valid_password?(password)
    end
    #...
  end
end
```
##### Authenticate using email and password
Grape cung cấp cho chúng ta `before block` và chúng ta áp dụng nó để authen như sau:
```ruby
# lib/api/root.rb
module API
  class Root < Grape::API
    #...
    before do
      error!("401 Unauthorized", 401) unless authenticated
    end
 
    helpers do
      def authenticated
        user = User.find_by_email(params[:email])
        user && user.valid_password?(params[:password])
      end
    end
    #...
  end
end
```
Mọi người có thể tham khảo thêm ở bài viết chính:
http://funonrails.com/2014/03/building-restful-api-using-grape-in-rails/
hoặc trên github của Grape:
https://github.com/ruby-grape/grape
Cảm ơn mọi người đã quan tâm đế chủ đề này.