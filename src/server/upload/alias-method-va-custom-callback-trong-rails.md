Ruby on Rails hỗ trợ rất nhiều `callbacks` xung quanh `lifecycle` của một object hay một action nào đó. Tuy nhiên, những callbacks này là không đủ để có thể giải quyết những vấn đề đặc biệt. Thay vào đó, với `ActiveSupport`, `Rails` đã cung cấp cho chúng ta đầy đủ công cụ để có thể tự tạo ra một callback cho riêng mình. Các bước để tạo ra một callback trong `Rails` bao gồm:
* **Define target:** Sử dụng kết hợp hai method `define_callbacks` và `run_callbacks` để xác định đối tượng và phạm vi chạy callback.
* **Callback methods:** Giống nhưng những method thông thường khác.
* **Set callback:** Sử dụng method `set_callback` để xác định thời điểm sẽ chạy các `callback methods` đã được khai báo ở trên.

Trước khi đi vào vấn đề chính chúng ta sẽ đi tìm hiểu về một method rất thú vị mà `Ruby` cung cấp. Nếu nắm vững và sử dụng hợp lý nó sẽ làm cho code trở nên linh hoạt hơn đặc biệt là trong việc `override` và sử dụng `callback`.
# Method `alias_method`
Chúng ta có một class `Dog` kế thừa từ class `Animal` như sau:
```
class Animal
  def run
    puts "Animal running..."
  end
end

class Dog < Animal
  def run
    # will be override here
  end
end
```
Vì một lý do nào đó chúng ta phải `override` lại method `run` của `Animal` tuy nhiên vẫn muốn giữ lại nó ở đâu đó ở trong `Dog`. Giải pháp là sử dụng `alias_method`:
```
class Dog < Animal
  def run
    puts "Dog running..."
  end
  
  alias_method :run_as_animal, :run
end
```
Chúng ta hãy cùng xem điều gì đã xảy ra:
![](https://images.viblo.asia/e47ec990-d1f7-4b25-8ff3-43c6207f2440.png)

Một object trong ruby hoàn toàn không chứa method. Tất cả những method mà object sử dụng đều được lưu ở `table_methods` nằm trong class object tạo ra nó hoặc bên trong `SingletonClass` của nó.
Một `method name` bản chất là một `symbol` trỏ tới một `block code`.

Method `alias_method(:new_name, :old_name)` sẽ tạo ra một bản copy của block mà `:old_name` đang trỏ tới. Tiếp đó `:new_name` sẽ được trở tới block mới này.

Cụ thể trong trường hợp trên `:run_as_animal` sẽ trỏ tới một bản copy của `:run` (kế thừa từ `Animal`). Method `run` trong `Dog` đã được override và tại thời điểm này `:run` sẽ trỏ tới block mới đó.

Ở một diễn biến tương tự khác, chúng ta có `UsersController` như sau:
```
class UsersController < ApplicationController
  alias_method :render_without_feature, :render
  alias_method :render, :render_with_feature
end
```
![](https://images.viblo.asia/22b135d7-ff37-4d9f-9be0-b0c0f96d086e.png)

Ngắn gọn hơn nữa, `ActiveSupport` cung cấp một method có tên là `alias_method_chain`. Toàn bộ quá trình chúng ta vừa thấy ở trên sẽ diễn ra chỉ sau một dòng code:
```
alias_method_chain :render, :feature
```
Chúng ta chỉ việc define method `render_with_feature` và symbol `:render` sẽ tự động trỏ tới nó. Tuy nhiên, từ các phiên bản Rails 5 (sử dụng Ruby 2.0), method này không còn được sử dụng nữa.

> Trước phiên bản `Ruby 2.0`, mỗi một module khi được include vào một class, code của nó chỉ có thể được đưa vào phía trên code của class đó. Nghĩa là các method trong module có thể bị override bởi class hiện tại. Từ phiên bản `Ruby 2.0`, với `prepend`, chúng ta có thể sử dụng module để override các method của chính class prepend nó. Những vấn đề này chúng ta sẽ tìm hiểu kỹ hơn trong một bài viết khác.
> 
# Custom controller callbacks
Sử dụng callback giống như một con dao hai lưỡi, nó có thể khiến cho code của bạn phức tạp và khó debug hơn tuy nhiên khi sử dụng hợp lý thì nó lại giúp cho code DRY và ngắn gọn hơn rất nhiều.

Có nhiều trường hợp trong controller cần sử dụng đến một callback. Ví dụ như khi bạn sử dụng `ajax` để `create` hay `delete` một record trên trang `index`. Điều cần làm sau đó là phải xử lý phân trang lại vì số lượng record hiển thị trên một trang cần phải cố định. Hay việc phải xác định `layout` trước khi `render`, để đơn giản chúng ta sẽ sử dụng luôn ví dụ này làm minh họa cho việc custom callback trong controller. Chúng ta có `UsersController` như sau:
```
class UsersController < ApplicationController
  def new
    ...
    set_layout
  end
  
  def create
    ...
    set_layout
  end
  
  private
  def set_layout
    ...
  end
end
```
Đó là khi không sử dụng callback. Cũng không vấn đề gì cả nếu như việc set layout động chỉ xảy ra ở `UsersController`. Trong trường hợp project có nhiều controller khác phải thực hiện việc này thì một callback có thể sẽ là lựa chọn tốt hơn cả. Vậy thời điểm chạy callback này là khi nào? Đó là trước khi controller thực hiện render view. Chúng ta sử dụng một module để giải quyết vấn đề này.
```
# app/controllers/concerns/render_callbacks.rb

module RenderCallbacks
  extend ActiveSupport::Callbacks

  included do
    define_callbacks :render
  end

  def render *options, &block
    run_callbacks :render do
      super
    end
  end
  
  ...
end
```
Như đã nói ở phần đầu
* Chúng ta đã sử dụng `define_callbacks` để định nghĩa `target` sẽ đăng ký callback, ở đây là `:render` . 
* Tiếp theo là định nghĩa method `:render` và chỉ rõ phạm vi sẽ được chạy callback bằng việc wrap chúng vào trong block `run_callbacks`.
* Việc `set callback` sẽ được thực hiện thông qua một `class method` có tên là `before_render`.

Có một vấn đề là một class khi include một module thì không thể kế thừa những `class method` đã được định nghĩa trong module đó. Nhưng rất may mắn là `ActiveSupport::Concern` đã có giải pháp cho điều đó:
```
module RenderCallbacks
  extend ActiveSupport::Concern
  extend ActiveSupport::Callbacks
  ...
  
  module ClassMethods
    def append_before_render_action *callbacks, &block
      _insert_callbacks callbacks, block do |callback, options|
        set_callback :render, :before, callback, options
      end
    end

    def prepend_before_render_action *callbacks, &block
      _insert_callbacks callbacks, block do |callback, options|
        set_callback :render, :before, callback, options.merge(prepend: true)
      end
    end

    def skip_before_render_action *callbacks, &block
      _insert_callbacks callbacks, block do |callback, options|
        skip_callback :render, :before, callback, options
      end
    end

    alias_method :before_render, :append_before_render_action
    alias_method :prepend_before_render, :prepend_before_render_action
    alias_method :skip_before_render, :skip_before_render_action
  end
end
```
Tất cả những method được định nghĩa trong module `ClassMethods` sẽ trở thành `class method` của những class include module này. Method `_insert_callbacks` sẽ tạo ra một default `options` được sử dụng làm tham số cho method `set_callback` hay `skip_callback`. Chi tết về việc sử dụng các method này các bạn có thể xem tại [đây](https://api.rubyonrails.org/classes/ActiveSupport/Callbacks/ClassMethods.html). Bây giờ chúng ta sẽ viết lại UsersController như sau:
```
class UsersController < ApplicationController
  include RenderCallbacks
  
  before_render :set_layout

  def new
    ...
  end
  
  def create
    ...
  end
  
  private
  def set_layout
    ...
  end
end
```
Mọi thứ hoạt động tốt và code trông đã rất ngắn gọn và sạch sẽ.

# Custom model callbacks
Với model thì việc tạo mới một callback sẽ đơn giản hơn. Mặc định `Rails` đã hỗ trợ rất nhiều những callback xung quanh `lifecycle` của một `object` như: `create`, `update`, `destroy`. Tương ứng với đó là các thời điểm chạy callback: `before`, `after`, `arround`.

Lấy luôn ví dụ về trang **Viblo**, khi một user chuyển bài viết từ `Private draft` sang trạng thái `Public` thì những user đang theo dõi user này sẽ nhận được thông báo về bài viết mới. Để tạo một callback trong model chúng ta phải extend module `ActiveModel::Callbacks ` mà `Rails` cung cấp:
```
class Post
  extend ActiveModel::Callbacks
  
  define_model_callbacks :publish, only: :before
  
  before_publish :notify_subscribed_users
  
  def publish
    run_callbacks :publish do
      puts "Make this post public"
    end
  end
  
  private
  def notify_subscribed_users
    ...
  end
end
```
Về cơ bản việc tạo callback ở trong một model cũng tương tự như với một controller ngoại trừ việc `ActiveModel::Callbacks` cung cấp một số method để việc tạo callback trở nên dễ dàng hơn.
* Cũng giống như `define_callbacks` nhưng `define_model_callbacks` còn thực hiện luôn chức năng của hàm `set_callback` khi xác định thời điểm chạy callback bằng một tham số `options`. Trong trường hợp này là `only: :before`
* Khai báo method `:publish` và phạm vi đoạn code sẽ được xác định để chạy callback
* Khai báo method sẽ được callback. Trong trường hợp này `notify_subscribed_users` sẽ được chạy ngay bên dưới dòng code `puts "Make this post public"`

# Sumary
Như vậy chúng ta đã tìm hiểu xong về một method rất thú vị và mạnh mẽ của Ruby là `alias_method` cũng như tìm hiểu về cách để tạo ra một callback trong Rails. Việc tự tạo cho mình một `callback` sẽ giúp ta hiểu rõ hơn về cách thức hoạt động của chúng cũng như để việc sử dụng những callback mà `Rails` cung cấp hiệu quả hơn.