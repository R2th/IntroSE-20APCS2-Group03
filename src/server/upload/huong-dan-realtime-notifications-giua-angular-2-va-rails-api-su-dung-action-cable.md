Angular 2 & Rails Làm thế nào để realtime notifications giữa front-end-server và back-end-api-server?

Sau một thời gian làm task về tạo realtime notification trong một dự án Rails, mình đặt ra câu hỏi là, Rails hỗ trợ rất nhiều trong ứng dụng thuần của Rails. 
Vậy khi chúng ta phải làm dự án với 2 phần, một phần là api và một phần là front-end thì Action cable sẽ hỗ trợ chúng ta thế nào?

Rails api thì về bản chất vẫn là Rails mà thôi, các hoạt động khác nó vẫn hoạt động tương tự như Rails thường, Action cable cũng vậy, vậy bạn nào đã từng làm việc với Action cable rồi thì có thể lướt qua bài viết, đến cuối bài mình mới tập trung vào vấn đề giao tiếp giữa hai server.

Để bắt đầu tìm hiểu về chủ đề này, trước tiên cần chuẩn bị một số kiến thức về ```Rails-api```, ```Action cable``` trong rails cũng như một ít kiến thức về ```Angular 2```.

Mình nói lướt qua một chút về những gì mình sẽ trình bày trong bài viết này nha:
- Tạo một Rails-api app để có thể xử lý thông báo,
- Tạo một kênh thông qua Action cable để stream-notifications realtime.
- Tạo một Angular 2 app để bắt notification từ Rails api.
- Cấu hình để 2 server có thể mapping với nhau.
- Stream notification giữa Angular vs Rails Api


Thôi giới thiệu thế đủ rồi, bắt tay vào thực hiện nào.
## 1. Tạo Rails server api.
Chạy lệnh sau để build một app thuần api, dùng hệ quản trị csdl là mysql luôn:
```shell
rails new api-app --api -d mysql
```

Để có notification để stream thì chúng ta cũng cần tạo các model cần thiết. Ở đây mình tạo các model sau:
- User
- Notification
```shell
rails g model User
rails g model Notification
```

tại model user khai báo acsociation với model notification:
```ruby
has_many :notifications
```
model notification:

```ruby
belongs_to :user
```

File migration create_notification:

```ruby
class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.string :content
      t.boolean :read
      t.references :user

      t.timestamps
    end
  end
end
```


File migration create users:

```ruby
class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.text :password_digest

      t.timestamps
    end
  end
end
```
Sau đó chạy migrate

```shell
rails db:create
rails db:migrate
```


## 2. Tạo channel để stream notification
Tại model notification chúng ta tạo một call_back để khi có notification thì nó có thể stream về client.
```ruby
class Notification < ApplicationRecord
  after_create :send_notification
  scope read: {unread: 0, read: 1}
  scope :lastest, ->{order created_at: :desc}

  def send_notification
    # Xử lý gửi thông báo sau khi có thông báo mới
  end
end
```

#### controller notifications:

Tạo controller đơn giản để xử lý thông báo, controller này mình chỉ cần hàm index và show thôi:

```shell
rails g controller api/v1/notifications
```


file ```controllers/api/v1/notification_controllers.rb```

```ruby
module Api
  module V1
    class NotificationsController < ApplicationController
      before_action :load_notification, only: :show

      def index
        @notifications = Notification.lastest
        render json: {message: "", data: {notifications: @notifications}}, status: 200
      end

      def show; end

      private

      def load_notification
        @notification = Notification.find_by id: params[:id]
      end
    end
  end
end
```




Chúng ta cũng cần tạo luôn một job đơn giản để gửi notification và trong model gọi job đó khi notification được tạo xong.

```shell
rails g job notification_broadcast
```



```ruby
class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform
     # Action cable sẽ bắn notification qua dòng code này
  end
end
```

Sơ sơ đã vậy, bây giờ tiếp tục chúng ta phải tạo một Angular app:
## 3. Tạo angular app
Ở đây mình sẽ dùng angular 2.

```shell
ng new notification-app
```


Giao diện thì chúng ta sẽ tạo một component là header để chứa cái thanh thông báo


```shell
ng generate component header
```


```html
<h1>Header works</h1>
```



```shell
ng generate component footer
```


```html
<h1>Footer works</h1>
```


file app.component.html
```html
<app-header></app-header>
<app-footer></app-footer>
```


Vậy là chúng ta đã tạo được một front-end app để có thể bắt đầu bắt ghép nó với server api mà chúng ta đã tạo trước đó:

## 4. Cấu hình server để 2 server có thể bắt ghép với nhau.

Vì Rails có cơ chế bảo vệ bằng token, trong một app Rails thuần, authenticate_token được render dưới view mặc định trong header, trong form hay bất kỳ cái gì thuộc về rails mà cần có cơ chế xác thực, vì thế khi chúng ta tạo server khác mà muốn gọi đến rails để lấy api thì mặc định là không thể get được api đó. 


Vì thế cần cấu hình trong config của Rails để các server khác có thể get api từ Rails.

### Trong Rails

Trong gemfile:
thêm gem ```rack-cors```
```ruby
gem "rack-cors"
```


```shell
bundle
```

trong file``` application.rb``` chúng ta thêm đoạn code này:
Mục đích nhằm cho phép localhost:4200 có thể gọi được api lên server api của chúng ta.

Rack-Cors cung cấp hỗ trợ cho Cross-Origin Resource Sharing (CORS) cho các ứng dụng web tương thích Rack.

Sử dụng nó để chúng ta có thể tạo request ajax chéo lên server Rails từ một server khác.

```ruby
config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:4200"
    resource "*",
      headers: :any,
      expose: ["Authorization"],
      methods: %i[get post options put patch delete]
  end
end
```


Chúng ta cần tạo một kênh để có thể stream notification:

```shell
rails g channel notification
      Running via Spring preloader in process 4112
      create  app/channels/notification_channel.rb
```

Config router như sau:

config/routes.rb

```ruby
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :notifications
      resources :users
    end
  end
  mount ActionCable.server => '/cable'
end
```

Tiếp theo chúng ta tạo một notification broadcast job để gọi action cable stream notification:


```shell
rails generate job notification_broadcast
Running via Spring preloader in process 9571
      invoke  test_unit
      create    test/jobs/notification_broadcast_job_test.rb
      create  app/jobs/notification_broadcast_job.rb

```

File ```app/jobs/notification_broadcast_job.rb ```:

```ruby
class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  # override perform
  def perform count, notification
   # Action cable sẽ broadcast notification số lượng thông báo và nội dung thông báo
    ActionCable.server.broadcast "notification_channel", counter: count, notification: notification.as_json
  end
end
```


Trong file ```models/notification.rb```
hàm send_notification như sau:
```ruby

  def send_notification
     # Truyền số lượng thông báo, và nội dung thông báo cho job
    NotificationBroadcastJob.perform_now(Notification.unread.size, self)
  end

```

Sau các bước trên, hãy chạy server Rails lên, xem log của server, nếu thấy như sau tức là server đã thiết lập kênh thành công và bên angular có thể bắt được thông báo khi có thông báo mới.

```shell

Finished "/cable/" [WebSocket] for 127.0.0.1 at 2018-04-21 20:27:16 +0700
NotificationChannel stopped streaming from notification_channel
Started GET "/cable" for 127.0.0.1 at 2018-04-21 20:27:17 +0700
Started GET "/cable/" [WebSocket] for 127.0.0.1 at 2018-04-21 20:27:17 +0700
Successfully upgraded to WebSocket (REQUEST_METHOD: GET, HTTP_CONNECTION: Upgrade, HTTP_UPGRADE: websocket)
```


Như vậy là đã xong bên server, tiếp đến là bên angular nhé
Cấu hình cho phép server localhost:4200 có thể giao tiếp với Rails qua các method đã được khai báo.

### Angular app:

Vì rails nó có hỗ trợ cả method trong javascript luôn rồi nên khi sử dụng action cable trong ứng dụng thuần rails khá đơn giản, vậy với Angular thì sao, vì Angular nó chạy độc lập không liên quan gì với rails hết, vậy làm sao để nó bắt được notification từ Action cable mà đã stream từ Rails?

Trước đây khi băn khoăn về cái này, mình đã nghĩ chắc là Angular nó phải tạo request liên tục lên server để bắt response từ Action cable mất.

Câu trả lời cho giải pháp đó là nó khá tệ, sẽ khiến hệ thống chậm đi rất nhiều.
Angular có một thư viện code cung cấp cho angular js. Tiếp đó thì angular 2, 4 còn hỗ trợ nhiều hơn nữa.
Vậy là chúng ta không cần phải nghĩ nhiều về việc tạo request liên tục lên server nữa rồi. :grin:

```shell
cd notification-app
npm install ng2-cable --save
    + ng2-cable@2.0.7
    added 130 packages in 30.856s

```

Thêm ```Ng2CableModule``` vào app.module.ts
```typescript


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { Ng2CableModule } from 'ng2-cable';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    Ng2CableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Tiếp đến ở header component, chúng ta import ```Ng2Cable, Broadcaster```


```typescript

import { Component, OnInit } from '@angular/core';

import { Ng2Cable, Broadcaster } from 'ng2-cable';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  counter: any;

  constructor(private ng2cable: Ng2Cable,
              private broadcaster: Broadcaster) {

    this.counter = 0;
    this.ng2cable.subscribe('http://localhost:3000/cable', 'NotificationChannel');
    // subscribe vào kênh "NotificationChannel" ở server Rails

    this.broadcaster.on<string>('NotificationChannel').subscribe(
      message => {
        console.log(message); // mesage trả về 
      }
    );
  }

  ngOnInit() {
  }

}

```

Như vậy là angular 2 đã có thể bắt được message mỗi khi có thông báo mới từ server api.
Ở phạm vi bài viết mình chỉ mới hướng dẫn các bạn các bước cơ bản để có thể stream notification, bài viết sau mình sẽ  hướng dẫn thêm về render thông báo với update counter trong angular 2.

Các bạn có thể clone về source code demo ở đây: 
- Angular: https://github.com/at-uytran/notification-app
- API: https://github.com/at-uytran/notification-app-api


Tham khảo:
https://medium.com/codequest/actioncable-in-rails-api-f087b65c860d
https://github.com/viktor-shmigol/ng2-cable