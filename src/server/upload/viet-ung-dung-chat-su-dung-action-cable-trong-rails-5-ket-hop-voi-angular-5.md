Chào các bạn, ở bài viết hôm nay mình sẽ giới thiệu các bạn cách viết một ứng dụng sử dụng Action Cable trong Rails 5 kết hợp với Angular 5, vì chắc hẳn nhiều người đã biết đến Action Cable nên mình sẽ không nói về lý thuyết nữa, chúng ta bắt tay vào vấn đề chính nhé.
# I. Action Cable trong Rails
### 1. Khởi tạo Rails APP
```
cd ..
rails new server --api
cd server
```
Ở đây mình sử dụng hệ CSDL là mysql nên bạn cần phải thêm gem **mysql** và chỉnh sửa 1 chút trong file **config/database.yml** nhé

### 2. Tạo model message
```
rails generate scaffold message body:string sender:string
rails db:migrate
```

### 3. Thêm 1 số gem cần thiết
Để có thể sử dụng được action cable trong rails, bạn cần khao báo gem redis và puma. Ngoài ra thêm gem **rack-cor** để cho phép các ứng dụng bên ngoài kết nối với nó.
```
gem "redis", "~> 3.0"
gem "puma"
gem "rack-cors"
```

Tiếp đến, các bạn cần vào file server/config/initializers/cors.rb, và thêm nội dung như sau:
```
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      expose:  ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

### 4. Config router

```
Rails.application.routes.draw do
  resources :messages
  mount ActionCable.server => '/cable'
end
```

### 5. Tạo kênh chat trên server
```
rails g channel chat
```
Ở đây chúng ta sẽ tạo 1 stream là 'chat'
```
class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat'
  end
end
```

### 6. Tạo job MessageBroadcastJob
```
rails g job message_broadcast
```

```
  queue_as :default

  def perform(*args, message)
    # Action cable sẽ broadcast message với nội dung và người gửi message
    ActionCable.server.broadcast('chat', {body: message.body, sender: message.sender})
  end
```

Cứ mỗi khi người dùng tạo 1 tin nhắn, chúng ta cần phải gọi đến job này vì vậy trong file `model/message.rb`
```
class Message < ApplicationRecord
  after_create_commit {MessageBroadcastJob.perform_now self}
end
```

# II. Tạo Angular App
### 1. Cài đặt angular 5
Để chắc chắn máy tính bạn đã cái đặt angular 5 hãy kiểm tra bằng dòng lệnh sau:
```
 ng --version
```

Nếu bạn chưa cài đặt hoặc phiên bản nhỏ hơn 1.2 hãy chạy câu lệnh sau:
```bash
 npm install -g @angular/cli
```
Và cuối cùng bạn chạy dòng lệnh dưới đây để tạo ứng dụng nhé:
```bash
ng new client-chat-app
```

Để angular có thể làm việc được với cable bạn cần phải install thư viện `ng2-cable`
```
npm install ng2-cable --save
```

### 2. Tạo MessageService
File này sẽ xử lí tạo ra một số method của message ở đây sẽ có 2 method để nhận dữ liệu từ server và tạo tin nhắn khi người dùng submit. Bạn tạo file message.ts theo `client-chat-app/src/app/message.ts`

```
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable()
export class MessageService {

  constructor(private http: Http) {
  }

  query() {
    return this.http.get('http://localhost:3000/messages').map(res => {
      return res.json();
    });
  }

  create(message:any) {
    return this.http.post('http://localhost:3000/messages', message).map(res => {
      return res.json();
    });
  }
}
```

### 3. Xây dựng kênh chat trên client
Để làm được việc này, mình sẽ xử lí luôn ở trong file `app.component.ts`, đúng ra để code đẹp hơn thì các bạn nên tạo ra 1 thư mục message để xử lý những thứ này, bây giờ copy code đoạn dưới:
```
import { Component, OnInit } from '@angular/core';
import { Ng2Cable, Broadcaster } from 'ng2-cable';
import { HttpModule } from '@angular/http';
import { MessageService } from './message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'app';
  public currentSender: any;
  public messages: any[] = [];
  public message: any = {};

  constructor(private ng2cable: Ng2Cable, private broadcaster: Broadcaster, private http: HttpModule,
    private messageService: MessageService) {
    this.ng2cable.subscribe('http://localhost:3000/cable', 'ChatChannel'); 
    #subscribe vào kênh "ChatChanel"
  }

  ngOnInit() {
    this.loadMessages();
    this.initEvents();
  }

  initEvents() {
    this.broadcaster.on<string>('ChatChannel').subscribe(
      message => {
        this.messages.push(message);
      }
    );
  }

  loadMessages() {
    this.messageService.query().subscribe(
      (messages) => {
        this.messages = messages;
      }
    );
  };

  createMessage() {
    this.messageService.create({message: this.message}).subscribe(
      ()=> {
        this.message = {};
        this.loadMessages();
      }
    );
  };
}
```
Đoạn code trên khá là dễ hiểu, có một số đoạn mình đã comment ngay trong code các bạn có thể đọc để hiểu nó hơn nhé

Tiếp theo chúng ta cần view để load message cũng như submit message, trong file `app.component.html`, trang view này mình chỉ demo vào vấn đề chính nên không chú trọng vào đẹp mắt nhé.
```
<ul>
  <li *ngFor="let message of messages"><strong>{{message.sender}}: </strong> {{message.body}}</li>
</ul>
<div class="panel-footer">
  <div class="row">
      <div class="col-xs-9">
        <input [(ngModel)]="message.body" type="text" placeholder="Enter your text" class="form-control chat-input" name="body">
        <input [(ngModel)]="message.sender" type="text" placeholder="Enter your name" class="form-control chat-input" name="sender">
      </div>
      <div class="col-xs-3">
        <button (click)="createMessage()"  class="btn btn-primary btn-block" type="submit">Send</button>
      </div>
  </div>
</div>
```

Trong file **app.module.ts**, vì ở ngoài view mình đang sử dụng ngModel nên đang thực hiện Two-way Binding vì vậy chúng ta cần import `FormsModule`, ngoài ra sẽ cần nhiều thử phải thêm vào file này, bạn copy file sau và đưa vào **app.module.ts**
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { Ng2CableModule } from 'ng2-cable';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    Ng2CableModule,
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [Ng2CableModule],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### 4. Run Run Run
Bây giờ bạn `cd` vào thư mục của server và client-chat-app lần lượt chạy `rails` cho server và `ng serve` cho client, sau đó bật 2 tab lên để tận hưởng thành quả. Đây là thành quả của mình:
https://imgur.com/a/PmiRBty

Mình xin kết thúc bài viết ở đây, nếu có thắc mắc hay có lỗi để lại comment bên dưới nhé