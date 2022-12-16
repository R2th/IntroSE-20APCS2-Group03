Hôm nay mình sẽ tiếp tục phần 2 của bài viết [Đào sâu tìm hiểu cách Rails tìm templates(p1)](https://viblo.asia/p/dao-sau-tim-hieu-cach-rails-tim-templatesp1-Eb85oyEkZ2G)

Ở bài trước chúng ta đã tìm hiểu đến `options[:prefixes]`, chúng ta cùng xem method `_prefixes` được thực hiện như thế nào nhé. 

Module `AbstractController::Rendering` include module `ActionView::ViewPaths`. Và method `_prefixes` được khai báo trong đó. 

`ActionView::ViewPaths` là một module quan trọng, chúng ta sẽ tìm hiểu chi tiết hơn ở các phần sau. Nó dùng để quản lý các đường dẫn cho các controllers. Ví dụ, mặc định Rails sẽ nối thêm view path `#{Rails.root}app/views` để ứng dụng biết tìm template theo đường dẫn cụ thể đó.

Bây giờ chúng ta sẽ tập chung vào method `_prefixes`

``` ruby
module ActionView

  module ViewPaths

    # The prefixes used in render "foo" shortcuts.
    def _prefixes # :nodoc:
      self.class._prefixes
    end

  end

end
```

`_prefixes` chỉ gọi class method `_prefixes`

```ruby
module ActionView

  module ViewPaths
    module ClassMethods
      def _prefixes # :nodoc:
        @_prefixes ||= begin
          return local_prefixes if superclass.abstract?

          local_prefixes + superclass._prefixes
        end
      end

      private

      # Override this method in your controller if you want to change paths prefixes for finding views.
      # Prefixes defined here will still be added to parents' <tt>._prefixes</tt>.
      def local_prefixes
        [controller_path]
      end

    end
  end

end
```

`ActionView::ViewPaths._prefixes` gọi đệ quy, nó nối thêm `local_prefixes` với supperclass `_prefixes`. `local_prefixes` chỉ có một phần tử `controller_path`.

Method `controller_path` rất đơn giản, nó được khai báo ở `AbstractController::Base`. Ví dụ, với controller `ArticlesController` thì `controller_path` sẽ là `articles`, và với controller là `Articles::CommentsController` thì `controller_path` sẽ là `articles/comments`.

Vì vậy, method `_prefixes` trước tiên nó sẽ lấy prefixes của cha nó, sau đó đưa `controller_path` lên phía trước.

Ví dụ, nếu ứng dụng của bạn có một controller `ArticlesController`. chúng ta có thể lấy ra prefixes của nó theo cách sau:

```ruby
$ rails c
Loading development environment (Rails 4.2.0)
2.0.0-p353 :001 > ArticlesController.new.send(:_prefixes)
 => ["articles", "application"]
```

Chúng ta có thể thấy prefixes chứa hai phần tử: `articles` và `application`. Nó có nghĩa là `ApplicationController` mở rộng từ `ActionController::Base`, nhưng `ActionController::Base` là abtract.

Vì vậy bây giờ chúng ta có thể thấy rằng đối với ` ArticlesController#index`, khi chúng ta gọi render mà không có bất kỳ đối số nào, các options sẽ chứa các phần tử như sau:

* :prefixes : array [“articles”, “application”]
* :template : string “index”

Bây giờ chúng ta sẽ xem phần sau, cách `ActionView::Layouts` ghi đè method `_normalize_options`. 

```ruby
module ActionView
  module Layouts

    def _normalize_options(options) # :nodoc:
      super

      if _include_layout?(options)
        layout = options.delete(:layout) { :default }
        options[:layout] = _layout_for_option(layout)
      end
    end

  end
end
```

Chúng ta có thể thấy nếu `options[:layout]` không được thiết lập, thì mặc định layout sẽ là `:default`, và sau đó `option[:layout]` sẽ được gán bằng kết của trả về của ` _layout_for_option`.

Nếu bạn quan tâm, bạn có thể kiểm tra cách mà `_layout_for_option` thực hiện. Khi module này tìm kiếm layout nó sẽ tìm kiếm `app/views/layouts/#{class_name.underscore}.rb` đầu tiên, nếu không tìm thấy thì nó sẽ tìm supper class. Kể từ khi một ứng Rails được tạo ra, `application.html.erb` sẽ được đặt trong `app/views/layouts` và vì theo mặc định tất cả controller cha là `ApplicationController`, vì vậy theo mặc định layout này sẽ được sử dụng.

Cuối cùng hãy cùng xem `ActionController::Rendering` ghi đè `_normalize_options`.

```ruby
module ActionController
  module Rendering

    # Normalize both text and status options.
    def _normalize_options(options) #:nodoc:
      _normalize_text(options)

      if options[:html]
        options[:html] = ERB::Util.html_escape(options[:html])
      end

      if options.delete(:nothing)
        options[:body] = nil
      end

      if options[:status]
        options[:status] = Rack::Utils.status_code(options[:status])
      end

      super
    end

  end
end
```

Method này chỉ sử lý các option `:html`, `:nothing`, `:status`.

Hãy cùng xem khi chúng ta gọi render trong `ArticlesController#index` mà không truyền đối số, các options sẽ chứa các giá trị sau:

* :prefixes : array [“articles”, “application”]
* :template : string “index”
* :layout : A Proc when called will return “app/views/layouts/application.html.erb”

Bây giờ chúng ta đã hiểu được cách các options được chuẩn hóa. Và khi Rails xác định template nào sẽ hiển thị, nó sẽ trích xuất ra chi tiết các options . Và chúng ta sẽ tìm hiểu các Rails xác định template ở các phần sau.

Nguồn: http://climber2002.github.io/blog/2015/02/21/how-rails-finds-your-templates-part-1/