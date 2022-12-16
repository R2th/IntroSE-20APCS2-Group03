Chắc hẳn khá nhiều người đã từng làm việc với realtime, vậy hôm nay mình xin trình bày 1 demo nho nhỏ giới thiệu về realtime trong angular  kết hợp với websockets
# 1. Giới thiệu
Hôm nay mình sẽ tạo ra một ứng dụng realtime cung cấp phản hồi ngay lập tức khi một người dùng ấn like một bức ảnh. Để làm được điều này chúng ta sẽ sử dụng Angular 5 và Pusher API. Nếu ai chưa nge qua về Pusher API có thể tìm hiểu ở link này nhé:  https://pusher.com/docs

Đây là hình ảnh sau khi hoàn thành demo:
![](https://images.viblo.asia/79c96413-7459-4e13-ac3e-1e40c2d7e788.png)

Để bắt đầu làm demo trước hết các bạn phải kiểm tra mình đã cài đặt Node và NPM chưa.
```bash
npm --version
node --version
```
# 2.  Xây dựng một ứng dụng Angular 5
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
ng new angular5-pusher
```

# 3. APP Component
Ứng dụng hôm nay của mình sẽ khá đơn giản, chỉ cần load 1 hình ảnh, thêm một button like là xong. Trong file *app.component.html* bạn thêm đoạn code như bên dưới:
```html
    <div class="main-app">
      <h1>
        {{ title }}!
      </h1>
      <img width="300" alt="Pusher Logo" src="../assets/pusher.svg" />
      <div class="like">
        <div style="margin-right: 1rem">
          <h2>{{ likes }} likes</h2>
        </div>
        <button class="btn btn-lg btn-success" (click)="liked()">Like Image</button>
      </div>
    </div>
```
Ở đây chúng ta sẽ thấy có sự kiện click, tức là mỗi lần click vào button này, thì lượng like sẽ tăng lên, và việc xử lí đó mình sẽ đặt ở trong *app.component.ts*
```typescript
    import { Component, OnInit } from '@angular/core';
    //..

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })

    export class AppComponent implements OnInit {
      title = 'Pusher Liker';
      likes: any =  0;

      constructor() {
        // the pusher service will be injected as part of the constructor later
      }
      ngOnInit() {
        // ..
      }
      // add to the number of likes to the server
      liked() {
        this.likes = parseInt(this.likes) + 1;
        // ..
      }
    }
```

# 4. Thêm Pusher vào ứng dụng
Hiện tại, khi mà một người dùng click vào button like thì ở phía người dùng sẽ không hiển thị ngay lập tức lượng like mà người khác vừa thực thi. Và Pusher sẽ giải quyết vấn đề này, nó cho phép bạn thêm thời gian thực vào ứng dụng khá là đơn giản. 
Tất cá việc mình cần làm là phải đăng kí 1 chanel và sau đó *listen* for *event* :). Nó giống như bạn bật tv xem 1 trận worldcup (chanel) và sau đó chờ đợi một bàn thắng(event)
Để cài đặt pusher vào ứng dụng angular 5, chúng ta cần add nó vào thư viện:
```
npm install --save pusher-js
```

Tiếp theo ở trong file *.angular-cli.json* chúng ta include thư viện pusher mới install ở trên
```json
//...

"scripts": ["../node_modules/pusher-js/dist/web/pusher.min.js"]

//...
```
Như các bạn đã biết về angular 2 trở đi, chúng ta có một khái niệm gọi là *services*, ở đây mình sẽ tạo một services có tên là *PusherService*:
```bash
ng generate service Pusher
```

Trong file *pusher.service.ts* chúng ta cần import một vài thứ sau:
```typescript
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
declare const Pusher: any;
```
Khi import HttpClient thì mọi phản hồi đều mặc định là dạng JSON. Tiếp thoe chúng ta cần phải thêm một vài biến môi trường ở trong thư mục *enviroment.ts* để giúp pusher hoạt động tốt. 
```typescript
    export const environment = {
      production: false,
      pusher: {
        key: 'PUSHER_API_KEY',
        cluster: 'PUSHER_CLUSTER',
      }
    };
```
Các chi tiết như key hay cluster bạn có thể lấy tư ứng dụng Pusher [dashboard](https://dashboard.pusher.com/)
Tạo một ứng dụng mới trên trang dashboard của pusher
1. Click "Create New APP" từ thanh công cụ bên trái
2. Bạn cung cấp một số cấu hình cơ bản để tạo app (cái này khá đơn giản không có gì phức tạp). Hình ảnh của việc tạo app trên Pusher
![](https://images.viblo.asia/775c8cd4-8b69-4ede-bcbb-f9c94528a50c.png)

Bây giờ bạn vào file *pusher.service.ts*
```typescript
    @Injectable()
  export class PusherService {
  pusher: any;
  channel: any;
  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  }

  like( num_likes ) {
    this.http.put('http://localhost:3000/likes/' + 1, {'like': {like_count: num_likes}) // 1 ở đây là ID của record like trong db nhé. Vì mình chỉ tập trung làm demo về realtime nên đoạn này làm qua qua 
    .subscribe(data => {});
  }
}
```
Trong hàm khởi tạo của PusherService chúng ta included HttpClient và đăng kí 1 kênh tên là *events-channel*. Chúng ta cũng cần tạo ra phương thức PUT để gửi yêu cầu đến server nhằm mục đích update lượng count, params là số lượng like mà người dùng đã click. Để làm được điều này các bạn có thể sử dụng server bằng Rails để thực thi yêu cầu nhé về cái này mình sẽ đề cập sau.

Tiếp theo trong file *app.component.ts*

```typescript
    //-- app.component.ts
    import { Component, OnInit } from '@angular/core';
    import { PusherService } from './pusher.service';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
export class AppComponent implements OnInit {
  title = 'Pusher Liker';
  likes: any = 0;
  
  constructor(private pusherService: PusherService, private http: HttpClient) {
    this.http.get('http://localhost:3000/likes/1.json')
      .subscribe(res => {
        this.likes = res.json().like_count;
      });
  }
  ngOnInit() {
    this.pusherService.channel.bind('new-like', data => {
      this.likes = data.like_count ;
    });
  }

  liked() {
    this.likes = parseInt(this.likes) + 1;
    this.pusherService.like( this.likes );
  }
}
```
Ở trên chúng ta đã import pusherSerrvice và add nó vào hàm khởi tạo. Bây giờ khi component được tạo ra, chúng ta sẽ dùng bind cho pusherService đối với sự kiện *new-like* và update số lượt like.

# 5. Tạo server xử lí dữ liệu bằng Rails
Trước hết để Angular 5 và Rails có thể kết hợp được với nhau bạn hãy tham khảo link này nhé, https://viblo.asia/p/tao-ung-dung-voi-rails-5-va-angular-5-63vKjm6y52R Sau khi đã hiểu về nó tiếp tục làm bước bên dưới (BẮT BUỘC)
1. Tạo Database lưu trữ like_count
```
 rails generate scaffold Like like_count:integer
```
2. Tạo DB:
```
rake db:create
rake db:migrate
```
Sau đó để chạy demo ngon lành bạn tạo 1 record có id=1 nhé
3. Thêm gem:
```bash
    # Gemfile
    gem 'pusher'
    gem 'figaro'
```
4.  Chạy *figaro install* để sinh ra file application.yml, sau đó chúng ta sẽ thêm Pusher key vào file này:
```yml
# config/application.yml

    PUSHER_APP_ID: 'xxxxxx'
    PUSHER_KEY: 'xxxxxxxxxxxxxxxxx'
    PUSHER_SECRET: 'xxxxxxxxxxxxxx'
    PUSHER_CLUSTER: 'xx'
```
các thông tin về ID, KEY... bạn lấy ở đây về nhé [dashboard](https://dashboard.pusher.com/)
5. Thêm đoạn code sau vào file *config/initializers/pusher.rb*
```ruby
    require 'pusher'

    Pusher.app_id = ENV["PUSHER_APP_ID"]
    Pusher.key = ENV["PUSHER_KEY"]
    Pusher.secret = ENV["PUSHER_SECRET"]
    Pusher.cluster = ENV["PUSHER_CLUSTER"]
    Pusher.logger = Rails.logger
    Pusher.encrypted = true
```
6. Tiếp theo để update thông tin về like_count ngay lập tức sau khi ấn like, chúng ta sẽ đẩy số like vào chanel và subscribe mà chúng ta đã đăng kí trên client. Ở trong model model Like, chúng ta add *after_commit* được gọi khi thực thi một lệnh update số like. đoạn code như sau:
```ruby
    # app/models/like.rb

    class Like < ApplicationRecord
      after_commit :notify_pusher, on: [ :update]

      def notify_pusher
        Pusher.trigger('events-channel', 'new-like', self.as_json)
      end
    end
```
Chắc chắn các bạn sẽ quên mất đi "new-like" và 'events-channel' được lấy từ đâu? đó chính là ở trong file 
```typescript
#app.component.ts
  ngOnInit() {
    this.pusherService.channel.bind('new-like', data => {  // new-like
      this.likes = data.like_count ;
    });
  }
```

```typescript
#pusher.service.ts

  constructor(private http: HttpClient) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel'); //event-channel
  }
```

Sau khi hoàn thành các bước trên các bạn có thể xem thành quả của mình (đây là demo mình lấy trên mạng, trên thực tế cũng tương tự như vậy)
![](https://images.viblo.asia/b83574e3-ec86-48c4-8759-e3c883664bff.gif)