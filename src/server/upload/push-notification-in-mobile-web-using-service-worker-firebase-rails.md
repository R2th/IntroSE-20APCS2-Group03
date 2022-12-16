Bài viết này mình sẽ giới thiệu với các bạn về cách sử dụng service worker trên rails

# Service worker là gì và dùng để làm gì và hoạt động thế nào ?
Theo định nghĩa thì Service worker là một script được browser run trên background, độc lập với Web page, thực hiện các tác vụ mà không cần web page hay tương tác của người sử dụng.
Có lẽ push notification là ứng dụng chủ yếu sử dụng service worker.

![](https://images.viblo.asia/582e739e-8ea1-42b5-aeae-85e50afe7579.png)
Khi đăng kí serviceworker trên trình duyệt thì trình duyệt của chúng ta sẽ có một subscriptionID, subscriptionID này sẽ là định danh để ta gửi lên FIREBASE CLOUD MESSAGE, để nó xác định và gửi event message về trình duyệt của chúng ta.
Hiện tại để tạo web page trên mobile muốn sử dụng notification thì chúng ta phải sử dụng serviceworker.

Theo mình được biết thì serviceworker chưa được hỗ trợ cho IOS, hiện mới chỉ được hỗ trợ trên Android, các web browser cơ bản, không hỗ trợ IE.

# Bắt đầu cài đặt
Các bạn hình dung như sau
User click button -> POST to server -> Server send request to FIREBASE -> FIREBASE gửi về response cho browser thông qua **subscriptionID**. -> Serviceworker nhận event, thực hiện script hiện notification. 
Ở đây mình sử dụng 2 gem là webpush và serviceworker-rails để thực hiện việc cài đặt trong đó:
+ serviceworker-rails để config phía browser
+ webpush để  đảm nhận nhiệm vụ gửi request lên FIREBASE CLOUD MESSAGE trên server

serviceworker-rails là một gem mà config và nhúng sẵn serviceworker, config cho chúng ta nên không phải mất công chèn thêm Javascript hoặc sử dụng SDK.

Đầu tiên các bạn thêm 2 gem sau vào và chạy bundle install
```
gem "webpush"
gem "serviceworker-rails"
```

Sau khi install bạn chạy lệnh 
```
rails g serviceworker:install
```

Sau khi chạy lệnh này thì sẽ tự động tạo ra một số file, mà quan trọng là 
app/assets/javascripts/manifest.json.erb
app/assets/javascripts/serviceworker.js.erb

File đầu tiên là file manifest cung cấp các thông tin về website của bạn, và mục đích chính ở đây là để khai báo thêm gcm_sender_id. Định dạng của nó như sau

```
<% icon_sizes = Rails.configuration.serviceworker.icon_sizes %>
{
  "name": "My Progressive Rails App",
  "short_name": "Progressive",
  "start_url": "/",
  "icons": [
  <% icon_sizes.map { |s| "#{s}x#{s}" }.each.with_index do |dim, i| %>
    {
      "src": "<%= image_path "serviceworker-rails/heart-#{dim}.png" %>",
      "sizes": "<%= dim %>",
      "type": "image/png"
    }<%= i == (icon_sizes.length - 1) ? '' : ',' %>
  <% end %>
  ],
  "theme_color": "#000000",
  "background_color": "#FFFFFF",
  "display": "fullscreen",
  "orientation": "portrait",
  "gcm_sender_id": ""
}
```


File thứ hai là script serviceworker, là script sẽ được chạy mỗi khi nhận event. Có thể tưởng tượng nó như một event được đang kí trên background của trình duyệt, lắng nghe các event tới để thực thi. Ở đây chúng ta sử dụng event "push" message, thực hiện show notification mỗi khi có event xáy ra.


Các bạn chú ý là **showNotification** là một hàm show notification của serviceworker, nó khác với Notification API trên trình duyệt, ở trong script của serviceworker thì không sử dụng được Notification API như 
new Notification("SomeText"). Và ở trong script này thì việc gọi một số API cũng khá hạn chế, window không được định nghĩa ở đây.

```
  self.addEventListener("push", function(event) {
      var data = JSON.parse(event.data.text());
      var title = data.title;
      var body = data.message;
      var href = data.href;

      event.waitUntil(
        self.registration.showNotification(title, {
          body: body,
          data: { href: href }
        })
      )
  });
```

Đã có script và GCM sender_id, giờ chúng ta cần phải đăng kí script này với trình duyệt. Các bạn có thể  làm như sau
```
  // Request access Notification
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        console.log("Permission to receive notifications has been granted");
      }
    });
  }
  
  // Register service worker
  navigator.serviceWorker.register('/serviceworker.js', { scope: './' }).then(function (reg) {
      console.log('Registration successful');
    }).catch(function (error) {
      console.error("Registration failure " + error.toString());
    });
  
      navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe({
        userVisibleOnly: true
      }).then(function (subscription) {
        console.log('Subscription successfull');
      }).catch(function (error) {
        console.error("Subscription error " + error.toString());
      });
    });
```

Đoạn đầu tiên là mình request permission cho Notification browser.
Ở đoạn thứ hai mình register vào browser script **serviceworker.js** sau khi serviceworker.js.erb được compile.

Các bạn chú ý ở đây mình register trên scope là '/', tức là phạm vi sử dụng của file script này từ path '/' trở đi. Nếu là '/user' thì sẽ là '/user' trở đi.

VD: localhost:3000/user
Việc sử dụng scope này cho phép bạn có thể cài đặt nhiều script serviceworker và quy định từng scope trên trang web của mình. 

Mình thử inspect khi serviceworker được register xem sao
```
subscription.toJSON()
Trả về 1 object như sau
{
  endpoint: "https://android.googleapis.com/gcm/send/emJMAJr6T4A:APA91bGTLOq-w7xs59Thq0o8jSl3kYgiqYTCuLN1rBG8zJiM5zR9XukaDa2Q1IhH08odwfD0x85qW50CkfTw68iWdFkzTYzQUpRn9lMkNkDjzPsgFJZQPT57BOLpUTMCt_Xs5-3q9RTRnp9lhq5_7UieWZQbmJrYZg",
  expirationTime: null,
  keys: {
    auth: "R3fHXWJ1TMBnxbACOwvTag",
    p256dh: "BPKnPGZnBvJOA7t-IEO7SV6TRwJdxbZvMhZQv0qb8OK2eNtG20_b5Vgnl7NWdOC8AikiLfDj8_DoayNXfhok1ko"
  }
}
```
Trong đó endpoint có chứa emJMAJr6T4A:APA91bGTLOq-w7xs59Thq0o8jSl3kYgiqYTCuLN1rBG8zJiM5zR9XukaDa2Q1IhH08odwfD0x85qW50CkfTw68iWdFkzTYzQUpRn9lMkNkDjzPsgFJZQPT57BOLpUTMCt_Xs5-3q9RTRnp9lhq5_7UieWZQbmJrYZg
chính là subscriptionID của chúng ta.

Auth và p256dh theo mình có lẽ là key để xác thực service của chúng ta.

Về phần cài đặt browser đã xong, giờ mình sẽ cài đặt bên server.
Bên server không có gì đặc biệt cẩ, sử dụng Webpush để gửi lên endpoint firebase.
```
webpush_controllers.rb
class WebpushController < ApplicationController
  def push_message
    Webpush.payload_send(
      endpoint: strong_params[:endpoint],
      message: params[:message].to_json,
      p256dh: strong_params[:keys][:p256dh],
      auth: strong_params[:keys][:auth],
      api_key: ENV["API_KEY"]
    )
  end
  
  def strong_params
     params.require(:subscription).permit(:endpoint, keys: [:auth, :p256dh])
  end
end
```

```
routes.rb

post "/push_notification", to: "webpush#push_message"
```

Giờ việc cần làm là đăng kí app trên FIREBASE CLOUD MESSAGE trên https://console.firebase.google.com/u/0/
WebAPI key sẽ là ENV["API_KEY"] của bạn, còn gcm_sender_id là SenderID
![](https://images.viblo.asia/ccdca388-20ed-4d9d-b4b3-16736cc15a91.png)
![](https://images.viblo.asia/3020728a-ca09-46c8-8d50-57732e1a8aab.png)

Setup đã xong, giờ chỉ cần click button là có notification rồi 
![](https://images.viblo.asia/6f7d4483-d240-4aff-a898-77e36742a04c.png)

Mọi người cũng có thể add thêm event click cho Notification  như sau
```
self.addEventListener("notificationclick", function(event){
    var href = "https://google.com;
    if(clients.openWindow && href){
      clients.openWindow(href);
      event.notification.close();
    } else {
      throw new Error("Something went wrong")
    }
  })
```

Trên đây mình đã trình bày về serviceworker, cách cài đặt và sử dụng trên Rails sử dụng firebase. Ngoài ra còn 1 option khác nếu không sử dụng firebase là dùng VAPID, VAPID thì mình chưa thử config, các bạn có thể đọc thêm về nó.

Cám ơn đã theo dõi bài viết !