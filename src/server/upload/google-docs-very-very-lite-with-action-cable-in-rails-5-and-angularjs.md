Như tiêu đề, bài viết này mình sẽ hướng dẫn các bạn tạo ra một phiên bản google document cự kì thu nhỏ. Nó cho phép nhiều người cùng làm việc realtime trên textarea. Bắt đầu thôi nào ~.~
Các bạn đã biết kể từ khi Rails 5 được phát hành, với sự hổ trợ đắc lực của Action Cable thì việc tạo các app realtime tưởng khó lại vô cùng dễ dàng. Trước khi bắt đầu với tutorial này, mình xin điểm qua một vài khái niệm.
# 1. HTTP và Websockets
## HTTP
Đối với các web dev thì khái niệm này quá quen thuộc, chung quy thì nó là giao thức truyền tải giữa client và server. Khi client request thì có một kết nối được tạo ra với server, các yêu cầu cụ thể được gửi kèm theo(json, xml, html ....), server sẽ response lại request  và gửi về client, và sau khi gửi xong về client kết nối đó sẽ bị ngắt. Và cứ như vậy, mỗi khi chúng ta cần lấy 1 thứ gì đó ở server hoặc theo dõi sự thay đổi phía server thì phải tạo ra 1 request mới. 
## Websockets
Websockets là giao thức cho phép giữa client và server luôn giữ một cổng kết nối, duy trì việc trao đỗi dữ liệu tực tiếp giữa server và client. Khi client đăng ký một cổng kết nối với server, mọi thay đổi từ phía server sẽ được broadcast dữ liệu về các client đã đăng ký. Vì thế mà chúng ta có những tác vụ realtime.
## Action Cable
Nó là cái gì?, nghe có vẻ to. Thực tế nó là  "full-stack offering" (to thật) : nó cung cấp cả 2 phía client với Javascript framwork, và server Ruby.
Action có thể chạy như 1 server riêng lẻ, hoặc chúng ta có thể cho nó chạy bên trong ứng dụng Rails của chúng ta.
# 2. Google Docs Very Very Lite
Cái tên nói lên tất cả, chúng ta sẽ bắt đầu fake google doc very very lite.
Để bắt đầu, dĩ nhiên cũng ta cần 1 project
```
rails new demo-app
```
Sau khi khởi tạo project, chúng ta cần add một vài gem CẦN thiết 
```
gem 'redis', '~> 3.0'
```
Vì chúng ta chỉ làm demo đơn giản nên không cần thiết đến các model. chỉ dùng mỗi cái controller static_pages là đủ nhé.
```
rails g controller static_pages index
```
ở index trong view static_pages chúng ta đặt một textarea làm demo. sau này có hứng thú thì các bạn có thể thử với CKeditor hoặc thứ gì đó hay ho hơn.
```
<textarea cols="200" rows="50" id="google-doc"></textarea>
```
À đừng quên thiết lập routes nhé 
```
root "static_pages#index"
```
Cơ bản thì chúng ta đã xong rồi đó. Mà quên, đây mới chỉ là cho một người sài, thế còn realtime chỗ quái nào :-?
Bình tĩnh, làm tiếp thôi.
Trong bài viết này, mình sử dụng framwork JS là AngularJs nhé.
vì thế để tiếp tục, chúng ta thêm AngularJS vào project nhé. ( nếu các bạn thích jquery hơn thì cứ dùng nó thôi, không vấn đề gì cả). Trong phạm vi bài viết này mình chú trọng vào Action Cable, nên bạn nào muốn tìm hiểu thêm AngularJS thì có thể xem ở [đây](https://docs.angularjs.org/tutorial) nhé.
Chúng ta sẽ khai báo thêm một chút cho index
```
<div ng-controller="StaticPagesController as vm ">
   <textarea cols="200" rows="50" ng-model="vm.text" ng-keyup="vm.sendMessage(vm.text)">{{vm.text}}</textarea>
</div>
```
Các ng-model để khai báo một biến text, ng-keyup để bắt event lúc nhập vào textarea. và  trỏ nó về function sendMessage trong StaticPagesController js
Xong bước khai báo ngoài view, đơn giản thôi, tiếp theo chúng ta hãy vào controller js để đón nó nhé.
trong file static_pages_controller.js chúng ta khai báo hàm send message để gửi message tới channel:
```
vm.send_message = function(text) {
  var params = {text: text}
  StaticPageService.send_message(params).then(function(data){
  }, function(err){});
}
```
trong file StaticPageService chúng ta có: 
```
function send_message(params) {
    return ajaxLib.ajaxCall('POST', '/send_message', {data: params});
  }
```
Hàm ở trên thông qua các phương thức được angular cung cấp sẵn, gửi 1 request đến server của chúng ta. và trong static_page_controllers.rb chúng ta lại tiếp tục đón nhận nó và thực hiện các thao tác mong muốn trước khi broadcast nó đi ( ví dụ save db, hay làm gì đó ...)
Để có thể gửi message realtime, chúng ta sẽ dựa vào ActionCable để thiết lập channel, đăng ký kênh stream cũng như thực hiện subcribe kênh.
## Thiết lập socket connection phía server
Trong thư mục app/assets/javascript/channels chúng ta tạo 1 file room.js để định nghĩa thực thể của websocket connection. 
```
App.messages = App.cable.subscriptions.create('RoomChannel', {
    connected: function (){
    },
    received: function(data) {
      $('#google-doc').val(data.message);
    },
  });
```
nhớ require nó nhé.
## Tạo channel
Chúng ta tạo ra 1 file ở app/channels/room_channel.rb và định nghĩa cho chúng.
```
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel"
  end
end
```
Lớp RoomChannel được kế thừa từ ApplicationCable::Channel mà Rails 5 đã cung cấp sẵn. trong lớp này sẽ chứa sẵn một  method subscribed , nó có trách nhiệm đăng ký và gửi thông điệp được broadcast.
Quay lại static page controller. chúng ta có method send_message để nhận request từ client lên. nó trông như thế này.
```
 def send_message
    ActionCable.server.broadcast "room_channel", message: params[:text]
  end
```

Vậy là ok rồi. một message đơn giản được gửi lên server và được broadcast tới bất kỳ ai cùng đang subscribe.
# 3. Nguồn tham khảo
http://edgeguides.rubyonrails.org/action_cable_overview.html 
các bạn có thể tìm hiểu kỹ hơn về action cable tại đây.
Cảm ơn các bạn đã đọc bài viết, nếu có bất kỳ thắc mắt nào vui lòng để lại comment để được giải đáp. Chúc các bạn một ngày làm việc hiệu quả.