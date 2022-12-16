Ngày nay, rất nhiều nhà cung cấp dịch vụ (như Facebook, Google, Slack, ...) cung cấp webhook để các bạn tương tác với ứng dụng của mình.

### Webhook là gì? 

Webhook hiểu đơn giản là một công cụ để truy vấn dữ liệu của một event xác định. Khi sự kiện đó được kích hoạt, nó sẽ gửi một HTTP POST request tới URL được cấu hình webhook. Nó giống như một cái API ngược, thay vì bạn gọi API tới server của nhà cung cấp dịch vụ thì ở đây nhà cung cấp dịch vụ sẽ trả dữ liệu về cho bạn thông qua một cái Callback URL mà bạn cung cấp.

Ví dụ, để xây dựng con Chat Bot trên Facebook, đầu tiên bạn phải đăng ký với Facebook một webhook URL, khi có người nhắn tin tới con Bot, facebook sẽ nhận sự kiện và gửi thông báo đến webhook của bạn, việc của bạn là xử lý tin nhắn trên server của bạn và gửi lại cho facebook để con Bot trả lời người dùng.

### Làm thế nào để xây dựng một Secure callback end-point

Để nhận được callback từ nhà cung cấp dịch vụ, bạn sẽ phải cung cấp một public callback URL, vì vậy bạn sẽ phải chắc chắn rằng callback URL của mình phải được đảm bảo an toàn, chỉ nhận dữ liệu từ nhà cung cấp dịch vụ, chứ không phải nguồn nào khác. 

Để giải quyết vấn đề này thì chắc chắn phía nhà cung cấp dịch vụ sẽ phải nhận thêm một cái mã xác minh lúc bạn đăng ký callback URL. Phía ứng dụng người dùng sẽ chỉ xử lý request nếu đúng mã xác minh trả về.
Tùy vào nhà cung cấp dịch vụ họ trả về data cho bạn như thế nào

```ruby
# /controllers/webhooks_controller.rb
class WebhooksController < ApplicationController
  def create
    if request.headers["SECURE_TOKEN"] = ENV["SECURE_TOKEN"]
      # Handle request data from service provider
    end
  end
end

# /configs/routes.rb
Rails.application.routes.draw do
  resources :webhooks, only: :create
end
```

Bây giờ đơn giản bạn cầm URL và cái SECURE_TOKEN này đi đăng ký với serivce providers theo hướng dẫn của họ. Vậy là bạn đã có 1 webhook sẵn sàng nhận dữ liệu từ nhà cung cấp dịch vụ khi sự kiện bạn đang muốn theo dõi được kích hoạt.

Tuy nhiên, bài viết này mình sẽ làm rắc rối hơn một xí bằng cách xây dựng thử một ứng dụng cung cấp webhook cho người dùng sử dụng.

Nghe có vẻ ngược nhỉ, tại sao không phải là API? Thử tưởng tượng bạn đang có một ứng dụng chat rất nhiều người dùng, Viblo muốn gửi tin nhắn tới ứng dụng của bạn để thông báo với mọi người có một bài viết mới. Lúc này bạn sẽ viết API với Authentication các kiểu? Không, hãy thử với webhook. Bạn sẽ cung cấp cho Viblo một webhook URL, Viblo sẽ gửi một HTTP POST request, tới webhook đó sau khi một bài viết mới được tạo. 

Bây giờ, chúng ta sẽ có một bảng là webhook đi

```ruby
create_table :webhooks do |t|
  t.string :webhook_token
  t.references :user

  t.timestamps
end
```

Mỗi khi user thực hiện lấy webhook, chúng ta sẽ lưu lại record tương ứng với mỗi user sẽ là một webhook_token ngẫu nhiên (webhook_token sẽ đại diện cho SECURE_TOKEN mà mình đã đề cập ở trên)

```ruby
# models/webhook.rb
class Webhook < ApplicationRecord
  belongs_to :user
  validates :webhook_token, presences: true, uniqueness: true
  
  before_validation(on: :create) do
    generate_webhook_token
  end
  
  private
  def generate_webhook_token
    # Generate a secure token and make sure it is uniqueness with each user
  end
end
```

Phía bên sử dụng dịch vụ của bạn muốn gửi callback sẽ phải gửi vào webhook bạn định nghĩa kèm với webhook_token mà bạn đã cung cấp. Tuy nhiên, để đơn giản cho người sử dụng, bạn có thể cho webhook_token này như là một URL

```ruby
# configs/routes.rb
Rails.application.routes.draw do
  post "/:webhook_token" => "webhooks#create"
end
```

Trong controller, tìm thằng user tương ứng với token và xử lý data
```ruby
# controllers/webhooks_controller.rb
class WebhooksController < ApplicationController
  before_action :find_user
  
  def create
    # Handle data
  end
  
  private
  def find_user
    @user = Webhook.find_by(webhook_token: params[:webhook_token])&.user
    render json: {}, status: :not_found unless @user
  end
end
```

### Kết
Qua bài viết, hi vọng các bạn sẽ hiểu về webhook, và xem xét sử dụng webhook thay cho API trong một số trường hợp cụ thể.

Cảm ơn các bạn đã theo dõi!