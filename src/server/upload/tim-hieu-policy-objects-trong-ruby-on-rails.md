# Đặt vấn đề
Giả sử chúng ta có 1 ứng dụng đơn giản với 3 phân quyền như sau
1. regular user: có thể xem được các dữ liệu public của clients
2. moderator: có thể chỉnh sửa dữ liệu của clients và có thể xem dữ liệu  private của clients
3. admin: có tất cả các quyền
Chúng ta có 2 model như sau:
```
class Client < ActiveRecord::Base
  # ...
end
```
```
class User < ActiveRecord::Base

  def admin?
    # ...
  end

  def moderator_for?(client)
    # ..
  end
end
```

Để phân quyền cho các user thông thường chúng ta thực hiện

```
# app/controllers/clients_controllers.rb

class ClientsController < ApplicationController
  before_filter :authenticate_user! # Devise check if current user is sign_in or not (is he/she authenticated)
  before_filter :set_client

  def show
  end

  def edit
    if current_user.admin? || moderator_for?(@client)
      render :edit
    else
      render text: 'Not Authorized', status: 403
    end
  end

  # ...

  private

  def set_client
    @client = Client.find(params[:id])
  end
end
```
và ở view sẽ như thế này
```
# app/views/clients/show.html.erb

Clients Name: <%= @client.name %>

<% if current_user.admin? || current_user.moderator_for?(@client) %>
  Clients contact: <%= @client.email %>
<% end %>
```

Cấu trúc này sẽ lặp đi lặp lại ở nhiều nơi khác trong ứng dụng của chung ta bời vì 1 phần quyền có thể thực thi hàng trăm chức năng.
Tệ hơn là  Business requirements thay đổi. Lúc này chúng ta phải tìm lại tất cả những nơi này để thay đỗi chúng. Tất nhiên là chúng ta sẽ dể dàng bị quên một nơi nào đó.
Và đây là security vulnerability nghiêm trọng, chẳng hạn như regular user lại có thể xoá  một clients

# Giải pháp - Policy Object
Cách để giải quyết là chúng t agom tất cả lại một nơi để xử lý và sử dụng ở nhiều nơi khác nhau(views) . 
Và khi  Business requirements thay đổi chúng ta chỉ cần chỉnh sửa tại nơi này mà không quan tâm nó được sử dụng ở hàng trăm nơi khác(views).
Chúng ta tạo một class client_policy tại thư mục policy
```
# app/policy/client_policy.rb
class ClientPolicy
  attr_reader :current_user, :resource

  def initialize(current_user:, resource:)
    @current_user = current_user
    @resource = resource
  end

  def able_to_moderate?
    current_user.admin? || current_user.moderator_for?(resource)
  end
end
```
Và ở controller chúng ta sẽ như sau:
```
# app/controllers/clients_controllers.rb
class ClientsController < ApplicationController
  before_filter :authenticate_user!
  before_filter :set_client

  def show
  end

  def edit
    if client_policy.able_to_moderate?
      render :edit
    else
      render text: 'Not Authorized', status: 403
    end
  end

  # ...

  private

  def set_client
    @client = Client.find(params[:id])
  end

  def client_policy
    @client_policy ||= ClientPolicy.new(current_user: current_user, resource: @client)
  end
  helper_method :client_policy
end
```
Và ở view app/views/clients/show.html.erb
```
Clients Name: <%= @client.name %>

<% if client_policy.able_to_moderate? %>
  Clients contact: <%= @client.email %>
<% end %>
```

Bây giờ khi 1 phân quyền có thêm hay mất một vài chức năng nào đó chúng ta chỉ cần thêm vào thêm hoặc xoá  ở ClientPolicy thật đơn giản phải không nào.
# Scopes
Tiếp theo mình sẽ nói về scope trong Police Objects
Bắt đầu với 1 action index 
```
# app/controllers/clients_controllers.rb
class ClientsController < ApplicationController
  # ...

  def index
    if current_user.admin?
      @clients = Client.all
    elsif current_user.clients.any?
      @clients = current_user.clients
    else
      @clients = Client.where(public: true)
    end
  end

  # ...
end
```
Thật tệ khi phải thực hiện if else như trên ở nhiều action, thay vào đó chúng ta thực hiện như sau:

```
# app/policy/client_policy.rb
class ClientPolicy
  class Scope
    attr_reader :current_user, :scope

    def initialize(current_user:, scope:)
      @current_user = current_user
      @scope = scope
    end

    def displayable
      return scope if current_user.admin?

      if current_user.clients.any?
        scope.where(id: current_user.clients.pluck(:id))
      else
        scope.where(public: true)
      end
    end
  end

  # ...
end
```
ở các action khác chúng ta chỉ cần khởi tạo một  object của ClientPolicy::Scope và sử dụng mà không cần phải if esle.
```
# app/controllers/clients_controllers.rb
class ClientsController < ApplicationController
  # ...

  def index
    @clients = Client.all
    @clients = ClientPolicy::Scope
                 .new(current_user: current_user, scope: @clients)
                 .displayable

    # you can implement more scopes e.g. @clients.order(:created_at)
    # or @clients pagination

    # ...
  end

  # ...
end
```
# Tổng kết
Có một số gem đã giúp chúng ta thực hiện việc này nhanh hơn như cancancan, pundit... Nhưng khi chúng làm nó một cách thủ công thì sẻ dể mở rộng hơn cho một ứng dụng lớn