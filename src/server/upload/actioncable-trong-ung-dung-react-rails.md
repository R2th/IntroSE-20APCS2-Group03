# Tổng quan
Real-time luôn là 1 trong những yếu tố mà các ứng dụng web, mobile đều phát triển nếu muốn tăng trải nghiệm người dùng, chẳng hạn như gửi notification, chat real-time...Trong ứng dụng rails thuần thì chúng ta đã dễ dàng cài đặt được chức năng này, nhưng khi client sử dụng React JS thì điều này hơi khác một chút, nhưng cũng khá dễ dàng để cài đặt được tính năng này. Bài viết này mình sẽ viết về cách cài đặt ActionCable trong ứng dụng React on Rails
# Cài đặt phía Server
Trước hết chúng ta cần có một ứng dụng React on Rails, các bạn có thể tham khảo cách tạo mình đã viết ở [đây](https://viblo.asia/p/cach-tao-mot-project-railsreactjs-su-dung-gem-react-on-rails-don-gian-va-deploy-len-heroku-djeZ14oGKWz)

Tiếp theo chúng ta sẽ viết code cho server:

Trong file app/channels/application_cable/connection.rb các bạn viết như sau để khai báo kết nối và định danh bởi `current_user`
```ruby
# app/channels/application_cable/connection.rb 
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
 
    def connect
      self.current_user = find_verified_user
    end
 
    private
      def find_verified_user
        if verified_user = User.find_by(id: cookies.encrypted[:user_id])
          verified_user
        else
          reject_unauthorized_connection
        end
      end
  end
end
```

Trong file app/channels/application_cable/channel.rb các bạn giữ nguyên không cần thêm gì.
```ruby
# app/channels/application_cable/channel.rb 
module ApplicationCable
  class Channel < ActionCable::Channel::Base
  end
end
```

Tiếp theo chúng tạo file app/channels/notifications_channel.rb để tạo kênh stream dữ liệu
```ruby
# app/channels/notifications_channel.rb
class NotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "notifications_#{current_user.id}_channel"
  end

  def unsubscribed
  end
end
```

Trong file routes các bạn thêm vào dòng này:
```ruby
mount ActionCable.server => '/cable'
```

Khi gửi dữ liệu các bạn chỉ cần viết đoạn code sau:
```ruby
ActionCable.server.broadcast "web_notifications_#{current_user.id}", { data: your_data }
```
Cơ bản vậy là xong!

# Cài đặt phía Client
Vì client chúng ta sử dụng React nên sẽ không sử dụng file coffee hay javascript trong thư mục app/assets/javascript để cài đặt kết nồi ActionCable, mà chúng ta sẽ viết thẳng vào trong Component của React JS. Để làm được điều này thì mình sử dụng package `actioncable` để hỗ trợ kết nối.

Cách cài đặt package `actioncable` như sau:

`npm install --save actioncable`

Tiếp theo viết code trong Component:
```js
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import axios from 'axios';
import ActionCable from 'actioncable';

class CableClass extends React.Component {
  state = {
    notifications: []
  }

 kết nối đến websocket khi virtual DOM đã mount xong
  componentDidMount = () => {
    // tạo kết nối
    const cable = ActionCable.createConsumer('ws://RAILS-API-PATH.com/cable')
    // kết nối kênh
    this.sub = cable.subscriptions.create('NotificationsChannel', {
      connected: () => {
          // thực hiện công việc khi kết nối
      }
       disconnected: () => {
           // thực hiện công việc khi ngắt kết nối
       }
      received: (data) => {
          // nhận về dữ liệu là biến data khi server gửi dữ liệu
      }
    });
  }
}
export default CableClass;
```

Trên đây mình đã hướng dẫn các bạn cài đặt và sử dụng ActionCable đơn giản cho ứng dụng React on Rails, còn một vài phần nữa nhưng cơ bản đều dựa vào base này. Các bạn tìm hiểu thêm và góp ý cho mình nhé!

# Tham khảo: 
* [https://www.npmjs.com/package/actioncable](https://www.npmjs.com/package/actioncable)