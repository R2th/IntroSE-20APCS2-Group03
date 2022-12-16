Ở bài viết lần trước mình đã giới thiệu với các bạn cách xác thực user của một ứng dụng Rails với Firebase ([link](https://viblo.asia/p/xac-thuc-user-trong-rails-app-cua-ban-voi-firebase-bWrZnaQQKxw)).

Bài viết hôm nay mình xin được giới thiệu một số công việc của Rails server API để quản lý Firebase Realtime Database trước khi gửi về cho client sử dụng.

Firebase Realtime Database là dịch vụ lưu trữ và đồng bộ data với cơ sở dữ liệu NoSQL của Firebase. Dữ liệu sẽ được đồng bộ thời gian thực trên tất cả các client, và vẫn khả dụng khi ứng dụng đang ngoại tuyến.

Với mỗi tài khoản Google, bạn sẽ được Free 1GB lưu trữ, 10GB download / tháng, 100 kết nối đồng thời. Nếu nhu cầu của ứng dụng lớn hơn, bạn có thể tham khảo các gói trả phí của Firebase [tại đây](https://firebase.google.com/pricing).

### Đặt vấn đề

Giả sử bạn xây dựng một ứng dụng đa nền tảng (android, ios, javascript) sử dụng Rails làm Server API, trong đó có chức năng ChatRoom. Bạn hướng tới sử dụng Firebase Realtime Database để xây dựng cho chức năng này thay vì mở websocket thì sẽ khá là tốn tài nguyên cho server.

Yêu cầu chức năng của chúng ta sẽ đơn giản là: User yêu cầu mở một room chat, người khác sẽ join vào room để chat, user close room chat. Bài viết của mình sẽ chỉ tập trung vào những công việc và server API sẽ làm để cung cấp cho client.


### Tạo Database

Đầu tiên, bạn phải đăng nhập vào Firebase console tạo một Realtime Database. Mặc định mới tạo Firebase sẽ cho phép bạn chọn 2 mode: **Locked mode**: Từ chối tất cả request read và write, **Test mode**: Cho phép read and write. Bạn có thể chọn bất kỳ mode nào vì kiểu gì cũng sẽ phải config cái rules này tùy theo mục đích dự án

![](https://images.viblo.asia/791bb826-e8ff-4a0a-b1a6-12f16a63200f.png)

Giao diện ban đầu nó sẽ như thế này

![](https://images.viblo.asia/315d9481-f088-4351-a2c6-2410ab9d5886.png)

Hãy copy cái URL của database (trong ví dụ này là https://caro-29f09.firebaseio.com/) để tương tác

Tại đây, nếu bạn đã xây dựng 1 app kết nối với Database này, bạn hoàn toàn có thể thêm dữ liệu để test thử xem dữ liệu có được đồng bộ với app hay không? Tuy nhiên bài viết này sẽ không đề cập tới việc App client kết nối với Firebase như thế nào

### Tạo chat room

Đầu tiên, bạn phải xác thực Rails server của mình với Firebase bằng cách tải JSON private key file về máy (Project Overview > Project Settings > Service Account > Generate new private key)

![](https://images.viblo.asia/a1410af8-f900-4c34-a9b4-493c0a52dac4.png)

Để tương tác tối với Firebase, Firebase suggest bạn sử dụng gem [firebase](https://github.com/oscardelben/firebase-ruby) 

Add gem này vào Gemfile và bundle install

```ruby
# Gemfile
gem "firebase"
```

Bây giờ mình sẽ tạo 1 service để tạo ChatRoom trên Firebase mỗi lần Client request

```ruby
class FirebaseAdmin
  # ENV["PRIVATE_KEY_FILE_PATH"] = "Đường dẫn tới file JSON private key đã tải ở trên"
  # ENV["DATABASE_URL"] = "URL của Firebase Reltime Database"
  
  def initialize
    @private_key_json = File.open(ENV["PRIVATE_KEY_FILE_PATH"]).read
    @client = Firebase::Client.new ENV["DATABASE_URL"], @private_key_json
  end

  def update_chat_room room_id
    client.update "rooms/#{room_id}/read_only", {status: :active}
  end

  private
  attr_reader :client
end
```

Bạn có thắc mắc vì sao không phải là create mà là update? Thực ra thì, khi mình gửi 1 cái path mà Firebase thấy chưa tồn tạo thì nó sẽ tạo luôn cho mình. Và để một cái path được tồn tại thì bắt buộc nó phải chưa ít nhất 1 cặp key values. Chính vì thế, khi tạo chat room mình có gửi thêm `{status: :active}` mục đích là để Firebase tạo ra cái room mong muốn, ngoài ra mình sẽ còn sử dụng để đặt rules phân quyền

Bây giờ khi Client gửi request để tạo room chat, chỉ cần gọi đến service này, trên Firebase sẽ tạo 1 room cho client tương tác

```ruby
class Api::V1:ChatRoomsController < Api::V1::BaseController
  before_action :doorkeeper_authorize!
  
  def create
    # some logic in your app
    FirebaseAdmin.new.update_chat_room @chat_room.id
    render json: {}, status: :ok
  end
end
```

Sau khi tạo thành công Firebase Realtim Database sẽ có dạng như thế này

![](https://images.viblo.asia/236397f5-1ef2-45e7-8351-f60b30d5d646.png)

### Client tương tác

Sau khi API trả về thành công, app client của bạn sẽ bắt đầu tương tác với DB này.  Giai đoạn này server sẽ không can thiệp vào nữa. Client app sẽ phải thống nhất các key values để việc đồng bộ data được diễn ra trơn tru.

Giả sử mỗi lần gửi message vào chat room, client sẽ phải gửi vào path `rooms/{room_id}/messages/{message_id_generate_by_firebase}` với nội dung:

```json
{
  "user_name": "Tên người nhắn tin",
  "content": "Nội dung tin nhắn"
}
```

Realtime Database sẽ quản lý như thế này

![](https://images.viblo.asia/35f16a7e-0a4a-4fda-8add-80f8e07bebb0.png)

Vấn đề sẽ là, để client có thể gửi data lên Firebase thì yêu cầu phải cấp quyền write cho họ. Điều này khá nguy hiểm vì kẻ xấu có thể lợi dụng để xóa hoàn toàn Realtime DB của bạn.

Như ban đầu mình có đề cập, bạn sẽ phải cần thêm 1 bước config rules nữa. Click vào tab Rules ở màn hình quản lý Realtime Database bạn sẽ thấy giao diện quản lý rules như thế này

![](https://images.viblo.asia/6f9212d9-4a02-4bee-85b6-6c7ba0779509.png)

Ban đầu tạo DB, mình chọn chế độ Test mode nên hiện tại, bất cứ app nào connect với DB đều có quyền read và write.

Giả sử, app của mình yêu cầu user phải đăng nhập thì mới có thể xem và gửi messages được. Chat room sau khi close không cho phép gửi tin nhắn vào nữa

Như vậy với cấu trúc DB mình thiết kế ở trên, mình sẽ cho phép client read khi đã xác thực user với firebase, write vào folder `messages` Giá trị `status` trong `read_only` để đánh dấu chatroom đang hoạt động hay đã close. Mình sẽ có đoạn config rules như sau:

```json
{
  "rules": {
    ".read": "auth != null",
    "rooms": {
      "$room_id": {
        "read_only": {
          ".write": false
        },
        "messages": {
          ".write": "auth != null && data.parent().child('read_only/status').val() == 'active'" 
        }
      }
    }
  }
}
```

### Close chat room

Sau một hồi chém gió, chém bão đủ đường, chủ room chat cảm thấy không vui và close room chat. Lúc này, ngoài những công việc xử lý logic ở phía server API, bạn sẽ phải gửi request lên Firebase để update giá trị của status trong read_only, tránh trường hợp xuất hiện những dữ liệu thừa không mong muốn. Lúc này mình sẽ sửa lại hàm update_chat_room 1 chút

```ruby
def update_chat_room room_id, info = {}
  client.update "rooms/#{room_id}/read_only", info
end
```

Và gọi trong controller

```ruby
class Api::V1:ChatRoomsController < Api::V1::BaseController
  before_action :doorkeeper_authorize!
  
  def destroy
    # some logic in your app
    FirebaseAdmin.new.update_chat_room @chat_room.id, {status: :closed}
    render json: {}, status: :ok
  end
end
```

Nếu dữ liệu chat quan trọng, bạn có thể thực hiện đồng bộ dữ liệu về DB của mình sau khi close room chat.

Chúc các bạn có những trải nghiệm mượt mà với Firebase Realtime Database. Thank for your reading!