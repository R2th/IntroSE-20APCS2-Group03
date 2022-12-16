![](https://images.viblo.asia/54964540-10fc-4205-b21e-cf6a3ce91e74.png)
# Service Objects
Nếu như bạn đã quen thuộc với Rails, bạn biết rằng nó có một cấu trúc thư mục đã được xác định trước. Rails là một trong những adaptors sớm sử dụng mô hình MVC (Model, View, Controller). Trên thực tế, đó là một trong những điểm mạnh của framework, nó dễ dàng để học khi mọi thứ đã có những vị trí riêng của mình. Điều này sẽ rất tốt khi ứng dụng Rails của bạn tương đối nhỏ, nhưng khi nó bắt đầu phát triển với nhiều tính năng và chức năng hơn, bạn sẽ sớm tìm thấy những đoạn mã mà nó không phù hợp với cấu trúc thư mục tiêu chuẩn của Rails. Đây là khi mà các phương thức đó có xu hướng được đẩy vào các ActiveRecord models. Tuy nhiên, không phải tất cả các phương thức đều liên quan trực tiếp đến một model, thường các phương pháp này có chứa một số yêu cầu hợp lệ từ phía khách hàng.

Trong những tình huống như vậy, thực hiện các logic thông qua các `service objects` là một ý tưởng tốt.

`Service Objects` chịu trách nhiệm thực hiện tương tác của user với ứng dụng. Nó chứa business logic điều phối các thành phần tạo tác khác. Bạn cũng có thể gọi nó là cốt lõi của một ứng dụng. Trên thực tế, khi nhìn vào thư mục services của một ứng dụng có thể cho người lập trình biết những chức năng thật sự của ứng dụng thực hiện mà thường không rõ ràng khi chúng ta xem các controllers và các models.

## Ví dụ
Hãy cùng thử một ví dụ để hiểu rõ hơn về tác dụng của `Service Objects` nhé.

Ví dụ như bạn đang phát triển một hệ thống đặt vé với Rails. Và khách hàng của bạn có một yêu cầu như sau: `"Sau khi một người dụng đặt vé, anh ấy/cô ấy nên nhận được vé bằng email"`
Bạn đồng ý và bắt đầu thêm những codes sau vào trong controller của bạn:

```rails
  # app/controllers/tickets_controller.rb #create

   if @ticket.save
     Email.send(current_user.email, @ticket)
     # code
   else
     # code
   end
```

Công việc đang đi theo đúng như yêu cầu, và hoạt động tốt. Cho đến, một vài ngày sau, khách hàng lại thêm một yêu cầu khác: `"Chúng ta không những gửi cho người dùng một email, mà còn cả một SMS nếu như chúng ta có số điện thoại của họ"`

Ahh... bây giờ, bạn có 2 sự lựa chọn để giải quyết vấn đề này:
 - Thêm điều kiện vào trong `tickets_controller` và gọi đến phương thức gửi SMS. Nhưng chờ đã... Nó sẽ làm cho controller của bạn phình lên,
 - Tạo một phương thức và gọi đến hàm gửi Email và SMS ở trong đó
 
Vì vậy, bạn đã tạo một phương thức trong `User` model và di chuyển code vào trong đó:

```rails
  # app/models/user.rb
  class User < ActiveRecord::Base
    # code

    # this method is called from the controller
    def send_notifications(ticket)
      Email.send_email_to_user(self.email, ticket)
      Sms.send(self.mobile, ticket) if self.mobile
    end
  end
```

Codes đã hoạt động tốt. Và bây giờ, mỗi khi khách hàng cần thêm một kênh thông báo mới, tất cả điều bạn cần phải làm là thêm nó vào phương thức `send_notifications` trên kia. Tuy nhiên, các thông báo  và business logic được bổ sung theo thời gian, bạn sẽ nhận thấy rằng:
 1) Mặc dù các thông báo được gửi đến một người dùng, nhưng nó không phải là chức năng cốt lõi của `User` class.
 2) Thêm nhiều và nhiều hơn các business logic bên trong `User` model sẽ làm cho nó trở nên cồng kềnh và cuối cùng sẽ làm cho codes của bạn khó để bảo trì.
 3) Việc test các model/method mà không stabbing/mocking các models khác sẽ trở nên quá khó khăn.
 
Hãy hiểu những điều sau:
1. Nếu bạn nhìn kĩ vào phương thức `send_notifications`, gửi một thông báo thực sự là một chức năng hỗ trợ cho `User`, chứ không phải là cốt lõi. Các chức năng cốt lõi sẽ là ví dụ như, thêm một User mới hoặc xóa một User hiện có. Và nơi hợp lý nhất để chúng ta thực hiện những chức năng cốt lõi không đâu khác ngoài `User` class.
2. Khi khách hàng muốn thêm vào business logic,  User model của chúng ta sẽ nhận thêm ngày càng nhiều chức năng và sớm trở nên quá lớn và khó để bảo trì.  Hãy nghĩ lại về các yêu cầu của khách hàng như sau: `"Chúng ta cần gửi một SMS đến người dùng nếu họ đã kích hoạt tùy chọn gửi ticket thông qua SMS."`
Trong bối cảnh business của ứng dụng của bạn, việc gửi thông báo tới người dùng sau khi xác nhận tất cả các business rules nên thuộc về miền thông báo chứ không phải miền người dùng.
3. Khi bạn viết unit tests cho User model, bạn phải suy nghĩ về kết quả trả về khi gọi đến phương thức của các class khác, ví dụ như Email. Điều này sẽ trở nên rõ ràng hơn khi chúng ta sử dụng callbacks (như after_save), bởi vì bạn sẽ phải stub các phương thức của Email class để test User model. Quá nhiều thiết lập dữ liệu cần thiết cho unit test. Trong trường hợp này là bởi vì User model của chúng ta làm những thứ không liên quan trực tiếp đến miền User.

Khi bạn bắt đầu chạy vào những tình huống khó, nó thường là dấu hiệu cho thấy bạn nên suy nghĩ lại về cấu trúc mã của bạn. Trong trường hợp này, chúng ta có thể di chuyển logic thông báo sang sử dụng một `Service Object`.

## Xây dựng một ‘service object’
Đầu tiên, các bạn tạo một thư mục `services` bên trong thư mục app. Nó sẽ chứa những `service class` - giống như Rails có một thư mục `models` chứa các ActiveRecord models. Sau đó, ta sẽ thêm service thông báo vào trong đó - gọi là `UserNotificationService`:

```rails
app/
  assets/
  controllers/
  helpers/
  mailers/
  models/
  services/
    user_notification_service.rb
  views/
```

Tiếp theo, chúng ta sẽ implement `UserNotificationService` class, dưới đây là một cách để thực hiện nó (chú ý rằng ở đây việc xử lý exception không được thêm vào để cho codes được đơn giản hơn):
 ```rails
 # app/services/user_notification_service.rb
 # Gửi thông báo tới người dùng sau khi vé đã được mua
class UserNotificationService
  def initialize(user)
    @user = user
  end

  # gửi thông báo
  def notify(ticket)
    Email.send_email_to_user(@user.email, ticket)
    Sms.send(@user.mobile, ticket) if @user.mobile
  end
end
 ```

Như bạn thấy, bây giờ chúng ta có thể thêm nhiều và nhiều hơn các business rules tới tính năng thông báo của chúng ta mà không gây ảnh hưởng đến `User` model. Điều này cung cấp cho bạn một sự tách biệt rõ ràng giữa business logic của bạn và tầng ORM (ở đây là ActiveRecord).

Service của chúng ta bây giờ có thể được gọi như sau:
```rails
# app/controllers/tickets_controller.rb #create
if @ticket.save
  UserNotificationService.new(current_user).notify(@ticket)
  # code
else
  # code
end
```

## Làm thế nào để test chúng
Việc viết test đối với một Service Object không hề khó một chút nào. Ở đây, tôi sử dụng RSpec framework trong một ví dụ ở dưới để minh họa cho các bạn thấy.

```ruby
require 'rails_helper'

describe UserNotificationService do
  let(:user) { FactoryBot.create(:user, mobile: mobile) }
  let(:ticket) { FactoryBot.create(:ticket) }

  subject(:notification) do
    UserNotificationService.new(user).notify(ticket)
  end

  context 'when the user does not have a mobile number' do
    let(:mobile) { nil }

    it 'send an email' do
      expect(Email).to receive(:send_email_to_user)
      notification
    end

    it 'does not send an SMS' do
      expect(Sms).to_not receive(:send)
      notification
    end
  end
  
  context 'when the user have a mobile number' do
    let(:mobile) { '0987654321' }

    it 'send an email' do
      expect(Email).to receive(:send_email_to_user)
      notification
    end

    it 'also send an SMS' do
      expect(Sms).to receive(:send)
      notification
    end
  end
end
```

## Khi nào thì nên sử dụng `Service Objects`
Sự thật là không có một quy tắc cứng nào cho việc sử dụng service objects. Thông thường, các services sẽ tốt hơn ở các hệ thống tầm vừa và lớn. Bất cứ khi nào bạn thấy một đoạn code có thể không thuộc về các thư mục mà bạn đã sử dụng, một ý tưởng tốt để suy nghĩ và xem xét là nó có thể sử dụng một service thay thế. Ví dụ như, một method chứa logic liên quan đến nhiều model, không thuộc về một model riêng biệt nào, hoặc method đó có chứa business logic, hoặc method đó gọi đến một external API chẳng hạn.

## Kết luận
Thực hiện một service không phải quá khó, phải không? Service objects là một cách tuyệt vời để tổ chức codes và business logic. Chúng sẽ làm codes của bạn dễ đọc hơn, dễ bảo trì và test. Vì vậy, về cơ bản, từ bây giờ, hãy thử sử dụng services objects bất cứ khi nào có thể ứng dụng, và ghi nhớ để giữ cho services của bạn gọn gàng và dễ quản lý.

##  Tài liệu tham khảo
1.https://www.netguru.co/blog/service-objects-in-rails-will-help

2.https://reinteractive.com/posts/268-keeping-your-classes-small-and-maintainable-with-service-objects