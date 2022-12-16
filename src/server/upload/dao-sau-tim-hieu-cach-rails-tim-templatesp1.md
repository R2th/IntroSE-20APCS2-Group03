Bạn đã bao giờ tự hỏi về một ứng Rails, khi bạn truy cập vào một action trong controller, làm thế nào Rails tìm thấy template để render? Ví dụ: khi action index trong `ArticlesController`  được truy cập, mặc định template `app/views/articles/index.html.erb` sẽ được chọn và render. Gần đây mình đã đào sâu vào source code của Rails, các bạn cùng mình tìm hiểu thông qua source code trong `ActionPack` và `ActionView` nhé. 

Trong phần đầu tiên này, chúng ta sẽ tìm hiểu cách `render` hoạt động. Lưu ý chúng ta sẽ tìm hiểu trong Rails 4.2, nếu bạn xem trong một phiên bản khác thì có thể hơi khác một chút. 

Điểm bắt đầu cho `render` là nằm ở method `AbstractController::Rendering#render` . `AbstractController` là một module được chia sẻ bởi `ActionController` và `ActionMailer`. Vì hai module này chia sẻ rất nhiều chức năng, nên Rails sẽ lấy ra các chức năng tương tự đưa vào `AbstractController`.  Cùng nhìn vào method này nhé:

```ruby
module AbstractController

  module Rendering

    # Normalize arguments, options and then delegates render_to_body and
    # sticks the result in self.response_body.
    # :api: public
    def render(*args, &block)
      options = _normalize_render(*args, &block)
      self.response_body = render_to_body(options)
      _process_format(rendered_format, options) if rendered_format
      self.response_body
    end
  end

end
```

Trong controller, chúng ta có thể gọi `render` trực tiếp, Ví dụ chúng ta có thể gọi `render "new"` để render template `new.html.erb`. Hoặc nếu chúng ta gọi `render` rõ ràng thì có một module là `ActionController::ImplicitRender` nó sẽ gọi `default_render`.

```ruby
module ActionController
  module ImplicitRender
    def send_action(method, *args)
      ret = super
      default_render unless performed?
      ret
    end

    def default_render(*args)
      render(*args)
    end
  end
end
```

method `send_action` sẽ được gọi khi action của controller được kích hoạt. Đầu tiên nó gọi `super`, sau đó nếu trong action không render bất kỳ thứ gì thì `performed?` sẽ trả về false. Vì vậy `default_render` được gọi. Chúng ta có thể thấy `default_render` nó chỉ gọi `render` mà không có bất kì đối số nào. 

Trong method `AbstractController::Rendering#render`, Đầu tiên nó gọi `_normalize_render`, sau đó gọi `render_to_body`. `_normalize_render` trả về một đối tượng tùy chọn là một `Hash`. Trong phần này chúng ta sẽ tìm hiểu method `_normalize_render` xem các tùy chọn được sinh ra như thế nào.

Cùng xem cách `_normalize_render` được thực hiện.

```ruby
module AbstractController

  module Rendering

    private

    # Normalize args and options.
    # :api: private
    def _normalize_render(*args, &block)
      options = _normalize_args(*args, &block)
      #TODO: remove defined? when we restore AP <=> AV dependency
      if defined?(request) && request && request.variant.present?
        options[:variant] = request.variant
      end
      _normalize_options(options)
      options
    end

  end

end
```

Chúng ta có thể thấy nó gọi method `_normalize_args ` và `_normalize_options`.  

**_normalize_args**

method `_normalize_args` là để chuyển đổi tất cả các đối số thành options hash. Ví dụ: khi chúng ta gọi method `render`, chúng ta có thể gọi như thế này:

```ruby
render 'new', status: :ok
``` 

Ở đây đối số đầu tiên 'new' là `String`, và `_normalize_args` có trách nhiệm đưa đối số đầu tiên này vào options hash và cung cấp cho nó một key thích hợp.

Cùng xem cách nó thực hiện:

```ruby
module AbstractController

  module Rendering

    # Normalize args by converting render "foo" to render :action => "foo" and
    # render "foo/bar" to render :file => "foo/bar".
    # :api: plugin
    def _normalize_args(action=nil, options={})
      if action.is_a? Hash
        action
      else
        options
      end
    end

  end

end
```

Chúng ta có thể thấy method này theo mặc định hầu như không có gì, nếu action là một Hash nó sẽ trả về action, nếu không hành động giống ví dụ sẽ là một string, nó sẽ trả về tham số thứ hai là options hash. 

Lưu ý: `ApplicationController` include một số module khác ghi đè phương thức này, chúng ta sẽ thấy sau.

**_normalize_options**

method `_normalize_options` dành cho các module include các tùy chọn khác. Đối với ứng dụng Rails, `ApplicationController` extend từ `ActionController::Base`, và `ActionController::Base` includes rất nhiều module, mỗi module đều có thể ghi đè method này và thêm một số tùy chọn khác. 

Trước tiên, hãy kiểm tra xem được triển khai như thế nào trong `AbstractController::Rendering`

```ruby
module AbstractController

  module Rendering

    # Normalize options.
    # :api: plugin
    def _normalize_options(options)
      options
    end

  end

end
```

Mặc định method này không làm gì cả, Nhưng nó sẽ bị ghi đè trong các module khác.

**Override _normalize_args**

Source code của Rails rất phức tạp, một lý do bởi vì có nhiều module có thể ghi đè các module khác. Ví dụ: trong một `ArticlesController`, cùng xem cha của nó:

```ruby
$ rails c
Loading development environment (Rails 4.2.0)
2.0.0-p353 :001 > puts ArticlesController.ancestors
ArticlesController
#<Module:0x007f8f0a971800>
ApplicationController
#<Module:0x007f8f0a8f93c8>
#<Module:0x007f8f05465118>
#<Module:0x007f8f05465140>
ActionController::Base
WebConsole::ControllerHelpers
Turbolinks::XHRHeaders
Turbolinks::Cookies
Turbolinks::XDomainBlocker
Turbolinks::Redirection
ActiveRecord::Railties::ControllerRuntime
ActionDispatch::Routing::RouteSet::MountedHelpers
ActionController::ParamsWrapper
ActionController::Instrumentation
ActionController::Rescue
ActionController::HttpAuthentication::Token::ControllerMethods
ActionController::HttpAuthentication::Digest::ControllerMethods
ActionController::HttpAuthentication::Basic::ControllerMethods
ActionController::DataStreaming
ActionController::Streaming
ActionController::ForceSSL
ActionController::RequestForgeryProtection
ActionController::Flash
ActionController::Cookies
ActionController::StrongParameters
ActiveSupport::Rescuable
ActionController::ImplicitRender
ActionController::MimeResponds
ActionController::Caching
ActionController::Caching::Fragments
ActionController::Caching::ConfigMethods
AbstractController::Callbacks
ActiveSupport::Callbacks
ActionController::EtagWithTemplateDigest
ActionController::ConditionalGet
ActionController::Head
ActionController::Renderers::All
ActionController::Renderers
ActionController::Rendering
ActionView::Layouts
ActionView::Rendering
ActionController::Redirecting
ActionController::RackDelegation
ActiveSupport::Benchmarkable
AbstractController::Logger
ActionController::UrlFor
AbstractController::UrlFor
ActionDispatch::Routing::UrlFor
ActionDispatch::Routing::PolymorphicRoutes
ActionController::ModelNaming
ActionController::HideActions
ActionController::Helpers
AbstractController::Helpers
AbstractController::AssetPaths
AbstractController::Translation
AbstractController::Rendering
ActionView::ViewPaths
ActionController::Metal
AbstractController::Base
ActiveSupport::Configurable
Object
ActiveSupport::Dependencies::Loadable
PP::ObjectMixin
JSON::Ext::Generator::GeneratorMethods::Object
Kernel
BasicObject
```

Chúng ta có thể thấy đối với một controller bình thường, nó có rất nhiều cha và hầu hết là các modules. Tất cả các module sau `AbstractController::Rendering` có thể ghi đè method. Mình có một cách để kiểm tra những thằng cha thực hiện một method:

```ruby
class Module
  def ancestors_that_implement_instance_method(instance_method)
    ancestors.find_all do |ancestor|
      (ancestor.instance_methods(false) + ancestor.private_instance_methods(false)).include?(instance_method)
    end
  end
end
```

Chạy code trên trong rails console, sau đó bạn có thể gọi `ClassName.ancestors_that_implement_instance_method` để kiểm tra những thằng cha nào thực hiện một method.

Đầu tiên hãy xem những thằng cha ghi đè method `_normalize_args` 

```ruby
$ rails c
Loading development environment (Rails 4.2.0)
2.0.0-p353 :013 >   ArticlesController.ancestors_that_implement_instance_method(:_normalize_args)
 => [ActionController::Rendering, ActionView::Rendering, AbstractController::Rendering]
```

Hai modules ghi đè method này: `ActionView::Rendering` và `ActionController::Rendering`. 

Cùng nhìn vào `ActionView::Rendering` trước

```ruby
module ActionView
  module Rendering
    # Normalize args by converting render "foo" to render :action => "foo" and
    # render "foo/bar" to render :template => "foo/bar".
    # :api: private
    def _normalize_args(action=nil, options={})
      options = super(action, options)
      case action
      when NilClass
      when Hash
        options = action
      when String, Symbol
        action = action.to_s
        key = action.include?(?/) ? :template : :action
        options[key] = action
      else
        options[:partial] = action
      end

      options
    end
  end
end
```

Chúng ta có thể thấy với đối số đầu tiên là action, nếu nó là chuỗi và chuỗi bao gồm "/", thì key củ đối số này là :template còn nếu không bao gồn "/" thì khóa là :action.

Vì vậy nếu chúng ta gọi `render "new"`, option sẽ là `{action: "new"}`, nếu chúng ta gọi `render "articles/new"` thì option sẽ là `{template: "articles/new"}`

Ok, giờ hãy xem cách `ActionController::Rendering` ghi đè method 

```ruby
module ActionController
  module Rendering
    # Normalize arguments by catching blocks and setting them on :update.
    def _normalize_args(action=nil, options={}, &blk) #:nodoc:
      options = super
      options[:update] = blk if block_given?
      options
    end
  end
end
```

Chúng ta có thể rõ ràng, nếu method được truyền một block, nó sẽ gán block cho options[:update]

**Override _normalize_options**

Cũng giống như `_normalize_args`, Cùng kiểm tra những module ghi đè `_normalize_options`, Chúng ta có thể thấy các module sau triển khai `_normalize_options`: `[ActionController::Rendering, ActionView::Layouts, ActionView::Rendering, AbstractController::Rendering]`

Cùng kiểm tra `ActionView::Rendering` đầu tiên

```ruby
module ActionView
  module Rendering

    # Normalize options.
    # :api: private
    def _normalize_options(options)
      options = super(options)
      if options[:partial] == true
        options[:partial] = action_name
      end

      if (options.keys & [:partial, :file, :template]).empty?
        options[:prefixes] ||= _prefixes
      end

      options[:template] ||= (options[:action] || action_name).to_s
      options
    end
  end
end
```

Chúng ta có thể thấy nó thêm 3 options theo mặc định
* Nếu options[:partial] là true, thì nó sẽ đặt options[:partial] thành action_name, action_name là tên của action trong contronller được kích hoạt.
* Nếu options không include: :partial, :file hoặc :template, nó sẽ thiết lập options[:prefixes], cùng xem những gì nó thiết lập cho:prefixes sau ít phút.
* Nó thiết lập options[:template]. Nó có thể được truyền từ các đối số hoặc action_name.

Phần này tạm kết thúc tại đây, phần sau chúng ta sẽ tìm hiểu xem trong option[:prefixes] có gì và method `_prefixes`

Mong bài viết sẽ giúp ích được cho mọi người. Cảm ơn mọi người!!~~

Nguồn: http://climber2002.github.io/blog/2015/02/21/how-rails-finds-your-templates-part-1/