![](https://viblo.asia/uploads/6ac7a9ec-8577-4b0c-a8c5-bca8f7aa995e.jpg)

Khi xây dựng một ứng dụng mà có tính năng gửi SMS nhằm mục đích xác thực hay thông báo, chúng ta thường sử dụng một dịch vụ bên ngoài như [Twilio](http://twilio.com/) để xử lý việc gửi một tin nhắn thực. Khi viết unit test cho các đoạn codes mà tương tác với SMS, bạn có thể dễ dàng stub việc gửi một tin nhắn thực để giữ cho test của bạn được cô lập. Nhưng với feature specs thì sao?

## Viết feature specs
Giả sử có 2 kịch bản như sau:
> Khi tôi thực hiện mua hàng, tôi muốn nhận được một liên kết tới hóa đơn thông qua một tin nhắn SMS xác nhận

và

> Khi tôi đăng nhập, tôi muốn được hỏi cả mật khẩu của tôi và bốn chữ số được gửi cho tôi thông qua SMS nhằm tăng cường an ninh hơn cho tài khoản của tôi.

Chúng đều yêu cầu chúng ta tương tác với một tin nhắn SMS. Lý tưởng nhất, một feature spec sẽ giống như sau:

```rails
feature "signing in" do
  scenario "with two factors" do
    user = create(:user, password: "password", email: "user@example.com")

    visit root_path
    click_on "Sign In"

    fill_in :email, with: "user@example.com"
    fill_in :password, with: "password"
    click_on "Submit"

    secret_code = SMS::Client.messages.last
    fill_in :code, with: secret_code
    click_on "Submit"

    expect(page).to have_content("Sign out")
  end
end
```

Nếu chúng ta có một vài cơ chế cho việc truy cập vào các tin nhắn đã được gửi đi từ các test thì mọi chuyện đã trở nên dễ dàng hơn. Tuy nhiên, các thư viện SMS client không cung cấp tính năng này bởi vì nó sẽ là một sự lãng phí vô nghĩa của bộ nhớ để lưu trữ tất cả tin nhắn được gửi trong production.

Vậy giải pháp để giải quyết việc này là gì, mời bạn đọc tiếp tục theo dõi ở các phần sau đây.

## Xây dựng một fake SMS client

Một giải pháp tốt ở đây là tạo một SMS client riêng cho việc test bắt chước API của một client thật thay vì gửi một tin nhắn SMS lưu trữ trong bộ nhớ.

Ví dụ, nhìn vào document của gem [Twilio Ruby](https://github.com/twilio/twilio-ruby), chúng ta có thể thấy rằng API của họ như sau:

```Ruby
# set up a client to talk to the Twilio REST API
@client = Twilio::REST::Client.new(account_sid, auth_token)

# send an SMS
@client.messages.create(
  from: '+14159341234',
  to: '+16105557069',
  body: 'Hey there!'
)
```

Hãy xây dựng một fake client bước chước API này như sau:

```Ruby
class FakeSMS
  Message = Struct.new(:from, :to, :body)

  cattr_accessor :messages
  self.messages = []

  def initialize(_account_sid, _auth_token)
  end

  def messages
    self
  end

  def create(from:, to:, body:)
    self.class.messages << Message.new(from: from, to: to, body: body)
  end
end
```

## Stubbing the constant

RSpec cung cấp một phương thức `stub_const` cho phép chúng ta stub các constant trong specs. Trong `spec_helper`, chúng ta có thể làm như sau:

```rails
# spec/spec_helper.rb

RSpec.configure. do |config|
  config.before(:each) do
    stub_const("Twilio::REST::Client", FakeSMS)
  end
end
```

Khi đó, `Twilio::REST::Client` sẽ tham chiếu đến `FakeSMS`

Hoặc bạn có thể sử dụng cách stub đó trong initializers của thư mục config:
```Rails
# config/initializers/fake_twilio.rb

if Rails.env.test?
  Twilio::REST::Client = FakeSMS
end
```

## Cấu hình
Twilio code có thể được viết như sau:
```Rails
class SMSClient
  cattr_accessor :client
  self.client = Twilio::REST::Client

  def initialize
    @client = self.class.client.new(
      ENV.fetch("TWILIO_ACCOUNT_SID"),
      ENV.fetch("TWILIO_AUTH_TOKEN"),
    )
  end

  def send_message(from:, to:, body:)
    @client.messages.create(from: from, to: to, body: body)
  end
end
```

Sau đó, trong `spec_helper`, chúng ta có thể thay đổi cài đặt như sau:

```rails
# spec/spec_helper.rb

SMSClient.client = FakeSMS
```

## Reset hàng đợi chứa các tin nhắn

Bạn có thể sẽ muốn reset lại `FakeMS.messages` giữa mỗi các test. Để làm điều này, thêm đoạn sau vào trong `spec_helper`:

```Rails
RSpec.configure do |config|
  config.before :each, type: :feature do
    FakeSMS.messages = []
  end
end
```

## Kết luận
Sau khi có một vài điều chỉnh, feature spec của chúng ta sẽ có thể chạy thành công:
```Rails
feature "signing in" do
  scenario "with two factors" do
    user = create(:user, password: "password", email: "user@example.com")

    visit root_path
    click_on "Sign In"

    fill_in :email, with: "user@example.com"
    fill_in :password, with: "password"
    click_on "Submit"

    last_message = FakeSMS.messages.last # this now returns a message object
    fill_in :code, with: last_message.body # the code is the body of the message
    click_on "Submit"

    expect(page).to have_content("Sign out")
  end
end
```

Sử dụng một fake SMS client là một cách đẹp đẽ để cho phép feature specs test các flow yêu cầu tương tác với tin nhắn SMS. Phương pháp này không chỉ sử dụng được với riêng Twilio mà còn sử dụng được với bất kì nhà cung cấp SMS nào.


## Tài liệu tham khảo
1. https://robots.thoughtbot.com/testing-sms-interactions
2. https://github.com/twilio/twilio-ruby
3. https://www.twilio.com/