# Giới thiệu Opentok
> “Real-time, high-quality interactive video, voice, messaging, and screen sharing for web and mobile apps”

Opentok là công cụ nền tảng hỗ trợ giao tiếp thời tiếp thời gian thực. Opentok dựa vào nền tảng webRTC 
để gửi các gói tin đa phương tiện qua javascript giúp chúng dể dàng tích hợp các chức năng như:
chia sẻ video, âm thanh, tin nhắn, màn hình trực tuyến...

OpenTok có thể chạy trên nhiều nền tảng như  web, ios, android, ứng dụng trên windows.

**Ứng dụng của Opentok:**

Chúng ta có thể sử dụng Opentok để xây dựng các chức năng *HOT*  như:
1. Live stream của facebook.
2. Phòng họp của zoom.
# Tích hợp Opentok trong ruby on rails
Trong bài viết này mình sẻ hướng đến giới thiệu tổng quan về opentok và xây dựng một ứng dụng nhỏ để hiểu lợi ích của opentok đem lại.

Các bài viết tiếp theo mình sẻ giới thiệu cụ thể nguyển lý hoạt động của opentok  và hướng dẫn xây dựng ứng dụng hoàn chỉnh là dạy học trực tuyến qua live stream.
### Tổng quan
Trước hết bạn vào trang https://dashboard.tokbox.com/ để dăng ký 1 tài khoản. Lưu ý khi đăng ký 1 tài khoản thì sẻ miễn phí trong 30 ngày, nếu bạn dùng quá sẽ tính phí nhé.
Sau khi có tài khoản, các bạn tạo một project và nhận lấy session id và token của dự án.

Trước khi xây dựng ứng dụng chúng ta cần tìm hiểu các khái niệm cơ bản:
1. **Session:** Các luồng phát trực tiếp video của opentok được khởi tạo bởi một session, Các Session này sẻ được lưu trử ở cloud của opentok. Với mỗi session sẻ gắn với một session id duy nhất. Nhiều client có thể kết nối đến một session thông qua session id.

2. **Publish:**  Khi client kết nối đến một session, thì nó có thể publish một luồng audio-video đến session này. Sử dụng Publisher token chúng ta có thể hạn chế số lượng client có thể publish luồng phát audio-video. Từ có  tạo ra qua quan hệ one-to-many, ví dụ như một người live stream và nhiều người vào xem.


3. **Subscribe:**  Sau khi một client kết nối đến một session, nó có thể subscribe đến bất kỳ luồng audio-video được publish bởi client khác trong session đó. Hành động này được thực hiện bằng Subscriber token.

Tất cả ứng dụng Opentok đề yêu cầu cả 2 thành phần là client và server. 
Client là trình duyệt của người dùng, xử lý phần lớn các chức năng của opentok. 
Bao  gồm kết nối đến ssesion, Publishing luồng audio-video đến session và subscribing đến luồng audio-video của client khác. 

**Ưu điểm**
1. Hỗ trợ đầy đủ các chức năng cần thiết.
2. Cloud của Opentok với dung lượng lớn hỗ trợ lưu trữ các luồng phát trực tiếp.
3. Tính bảo mật cao. (Vì được một cộng đồng người dùng lớn tin dùng).
4. Hỗ trợ đa nền tảng.


**Nhược điểm**
1. Chỉ được dùng free trong vòng 30 này :D
### Cài đặt
Đầu tiên chúng ta cần thêm gem "opentok"  và sau đó bundle:
```
gem "opentok"
```
Tạo 1 controller với nội dung như sau:
```
class RoomsController < ApplicationController

  before_filter :config_opentok,:except => [:index]
  def index
    @rooms = Room.where(:public => true)
    @new_room = Room.new
  end

  def create
    session = @opentok.create_session
    params[:room][:session_id] = session.session_id

    @new_room = Room.new room_params

    respond_to do |format|
      if @new_room.save
        format.html { redirect_to("/party/"+@new_room.id.to_s) }
      else
        format.html { render :controller => 'rooms',
          :action => "index" }
      end
    end
  end

  def party
    @room = Room.find(params[:id])

    @tok_token = @opentok.generate_token(@room.session_id)
  end

  private
  def config_opentok
    if @opentok.nil?
     @opentok = OpenTok::OpenTok.new("45784002", "f9157a1c9f021502b3ee44a97d363f7b0c085933")
    end
  end

  def room_params
    params.require(:room).permit(:name, :public, :session_id)
  end

end
```

Tạo trang index ở view:
```
<div id="newRoom">
  <fieldset>
  <legend>Start a new party room</legend>
<%= form_for(@new_room) do |f| %>
  Party Name: <%= f.text_field :name %><br/><br/>
  Public? <%= f.check_box :public %><br/><br/>

  <%= f.submit %>
<% end %>
</fieldset>
</div>

<fieldset>
  <legend>Existing party rooms</legend>
  <table cellpadding="2" cellspacing="5">
    <tr>
      <th>Name</th>
      <th>Started</th>
    </tr>

    <% @rooms.each do |room| %>
      <tr>
        <td align="center" width="300px"><a href="/party/<%= room.id %>"><%= room.name %></a></td>
        <td><%= room.created_at %></td>
      </tr>
    <% end %>
  </table>
</fieldset>
```
Và 1 trang party.html , tạm thời mình viết js ngay ở trang này:
```
<div id="invitation"></div>
<div id="videobox">

</div>
<script src="https://static.opentok.com/v2/js/opentok.min.js" type="text/javascript"></script>
<script type="text/javascript">
  var apiKey =  "45784002";
  var sessionId = "<%= @room.session_id %>";
  var token = "<%= @tok_token %>";
  var session;

//  TB.addEventListener('exception', exceptionHandler);

  //Video chat event listeners
  //session.addEventListener('sessionConnected', sessionConnectedHandler);
  //session.addEventListener('streamCreated', streamCreatedHandler);
    //session.addEventListener('streamDestroyed', streamDestroyedHandler);
TB.setLogLevel(TB.DEBUG);
//session.connect(apiKey, token);
   var session = TB.initSession(sessionId);
    session.addEventListener('sessionConnected', sessionConnectedHandler);
    session.addEventListener('streamCreated', streamCreatedHandler);
    session.connect(apiKey, token);
 var publisher;
    function sessionConnectedHandler(event) {
      publisher = TB.initPublisher(apiKey, 'videobox');
      session.publish(publisher);
      // Subscribe to streams that were in the session when we connected
      subscribeToStreams(event.streams);
    }
    function streamCreatedHandler(event) {
      // Subscribe to any new streams that are created
      subscribeToStreams(event.streams);
    }
    function subscribeToStreams(streams) {
      for (var i = 0; i < streams.length; i++) {
        if (streams[i].connection.connectionId == session.connection.connectionId) {
          return;
        }
        var div = document.createElement('div');
        div.setAttribute('id', 'stream' + streams[i].streamId);
        document.body.appendChild(div);
        session.subscribe(streams[i], div.id);
      }
    }
</script>
```
Cấu hình ở router:
```
resources :rooms
  match '/party/:id', :to => "rooms#party", :as => :party, :via => :get
```
Kết quả:
![](https://images.viblo.asia/1a2eb26a-34e1-49cb-b27d-57b6a03cdac7.png)
Trong bài viết này mọi người chưa cần phải hiểu rỏ nguyên lý hoạt động của opentok mà chỉ cần nắm được những gì opentok là gì, nó hỗ trợ những gì. 
Các bài viết tiếp theo chúng ta sẻ tìm hiểu sâu hơn về opentok, và xây dựng một ứng dụng hoàn chỉnh