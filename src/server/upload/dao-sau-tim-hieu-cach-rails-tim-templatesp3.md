Hôm nay mình sẽ tiếp tục phần 2 của bài viết [Đào sâu tìm hiểu cách Rails tìm templates(p2)](https://viblo.asia/p/dao-sau-tim-hieu-cach-rails-tim-templatesp2-ByEZkyaE5Q0).

Trong phần trước, mình đã giới thiệu cách Rails tìm kiếm một template, trước tiên nó sẽ tạo ra hash chứa các options bằng cách gọi `_normalize_render`. Và sau đó trong hàm `render`, nó sẽ gọi `render_to_body` và truyền vào options đã tạo trước đó

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

`render_to_body` nó sẽ chọn template dựa trên các giá trị của hash options truyền vào. Nếu chúng ta kiểm tra mã nguồn của `AbstractController::Rendering#render_to_body`, nó không có j cả. Cũng giống như các hàm mà chúng ta tìm hiểu, nó bị ghi đè bởi module khác.

```ruby
module AbstractController

  module Rendering

    # Performs the actual template rendering.
    # :api: public
    def render_to_body(options = {})
    end

  end

end
```

Trong phần trước chúng ta có thể chạy `ApplicationController.ancestors_that_implement_instance_method` để tìm ra những class hoặc module ghi đè một method nào đó, và chúng ta sẽ tìm thấy như sau

```ruby
2.0.0-p353 :008 > ApplicationController.ancestors_that_implement_instance_method(:render_to_body)
 => [ActionController::Renderers, ActionController::Rendering, ActionView::Rendering, AbstractController::Rendering]
```

### ActionController::Renderers#render_to_body

Đối với hàm `ActionController::Renderers#render_to_body`, nó đăng ký các renderers, và sau đó nếu options có chứa renderer key, thì nó sẽ gọi đến renderer đó. Nếu không tìm thấy renderer thì nó chỉ gọi `super`.

```ruby
module ActionController

  module Renderers

    def render_to_body(options)
      _render_to_body_with_renderer(options) || super
    end

    def _render_to_body_with_renderer(options)
      _renderers.each do |name|
        if options.key?(name)
          _process_options(options)
          method_name = Renderers._render_with_renderer_method_name(name)
          return send(method_name, options.delete(name), options)
        end
      end
      nil
    end

  end

end
```

Cái này chủ yếu để gọi `render` và truyền các tham số giống như :json, :xml, giống đoạn code dưới đây

```ruby
class ArticlesController < ApplicationController

  def index
    @articles = Articles.all
    render json: @articles
  end
end
```

`:json` là một renderer trong `ActionController::Renderers`, nó sẽ gọi đến renderer đó. Bạn cũng có thể đăng ký renderer của riêng mình bằng cách gọi `ActionController::Renderers.add`.

### ActionController::Rendering#render_to_body

Nếu trong `ActionController::Renderers#render_to_body`, nó không tìm thấy renderer, thì nó sẽ gọi `super`, đó là `ActionController::Rendering#render_to_body`. Cùng xem những gì mà module này thực hiện trong hàm.

```ruby
module ActionController

  module Rendering

    RENDER_FORMATS_IN_PRIORITY = [:body, :text, :plain, :html]

    def render_to_body(options = {})
      super || _render_in_priorities(options) || ' '
    end

    private

    def _render_in_priorities(options)
      RENDER_FORMATS_IN_PRIORITY.each do |format|
        return options[format] if options.key?(format)
      end

      nil
    end

  end

end
```

Lưu ý hàm này nó sẽ gọi `super` đầu tiên, nó chỉ gọi `_render_in_priorities` nếu `super` không trả về gì cả.

Trong `_render_in_priorities` nó tìm kiếm `RENDER_FORMATS_IN_PRIORITY` từng cái một, và trả về giá trị của option nếu tìm thấy format.

Trong module này khi nó gọi `super`, là nó gọi đếb hàm `ActionView::Rendering#render_to_body`.

### ActionView::Rendering#render_to_body

```ruby
module ActionView

  module Rendering

    def render_to_body(options = {})
      _process_options(options)
      _render_template(options)
    end

    # Returns an object that is able to render templates.
    # :api: private
    def view_renderer
      @_view_renderer ||= ActionView::Renderer.new(lookup_context)
    end

    private

      # Find and render a template based on the options given.
      # :api: private
      def _render_template(options) #:nodoc:
        variant = options[:variant]

        lookup_context.rendered_format = nil if options[:formats]
        lookup_context.variants = variant if variant

        view_renderer.render(view_context, options)
      end

  end

end
```

Hóa ra đây là thứ mà chúng ta tìm kiếm. `render_to_body` gọi `_render_template`, và đối với `_render_template` thì nó gọi `view_renderer.render(view_context, options)`.

`view_renderer` là một object của `ActionView::Renderer`, và khi nó khởi tạo, nó truyền vào object `lookup_context`, đó là một instance của `ActionView::LookupContext`. `ActionView::LookupContext` chứa tất cả thông tin tìm kiếm một template dựa trên các options. Vì vậy, trong phần tiếp theo, chúng ta sẽ tìm hiểu chi tiết về class này và tìm hiểu cách `LookupContext`, `ViewPaths`, `PathSet` hoạt động cùng nhau để tìm template.

Nguồn: http://climber2002.github.io/blog/2015/02/22/digging-rails-how-rails-finds-your-templates-part-2/