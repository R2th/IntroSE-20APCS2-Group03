Nhớ lại hồi mới tập tành học Rails tutorial được một người anh đồng nghiệp comment rất là "có tâm" kiểu như sau:
![](https://images.viblo.asia/d2c9551c-4238-4317-9094-dd7407a86f3b.png)

Mình cứ tưởng viết tắt chơi chữ hay gõ sai chính tả gì đó, vội đi hỏi chủ nhân thì nhận một câu trả lời "Google đi em!!!". 
Với mình đó là ấn tượng khó quên, cảm thấy mình thật ngu :sweat_smile: ... tới giờ vẫn không khá lên là mấy :joy:

Nên hôm nay mình sẽ giới thiệu lại chủ đề xưa cũ - Rails Internationalization (I18n)

## I. I18n là gì?
i18n là viết tắt của "internationalization (Quốc tế hóa)". Hiểu đơn giản là framework giúp ứng dụng của bạn hiển thị đa ngôn ngữ, sử dụng cho end-user đến từ nhiều quốc gia, thật là xịn xò, ó-sầm (awesome) mang tầm quốc tế

Thực chất thì I18n là ruby gem được hỗ trợ có sẵn kể từ rails 2.2, vì thế chúng ta chỉ việc thiết lập một vài bước đơn giản để sử dụng chứ không cần cài đặt nữa.

Mặc định app rails sẽ hỗ trợ ngôn ngữ English nhưng chúng ta có thể dễ dàng mở rộng qua các thứ tiếng khác như Lào, Campuchia, Thái, ...bla..bla.. mà bạn muốn có trong app của mình :scream:
## II. Thiết lập I18n trong Rails
Mình bỏ qua việc xây dựng một chức năng xịn xò là cho phép end-user lựa chọn ngôn ngữ rồi hiển thị theo ngôn ngữ đã chọn trên app của bạn nhé. Ở đây mình chỉ giới thiệu thiết lập cơ bản để dùng mặc định thôi :wink:

### **1. Cấu hình ngôn ngữ sử dụng mặc định cho app**

Mặc định ngôn ngữ của rails hỗ trợ là "en". Khi run app rails sẽ tìm nạp các bản dịch trong file "en.yml". Tuy nhiên bạn hoàn toàn có thể thay đổi:
```ruby
# Trong file /config/application.rb
  class Application < Rails::Application
    ...
    config.i18n.default_locale = :vi
  end
```
"**vi**" là gì? cái này bạn tự quy ước, ví dụ ở đây mình quy ước "vi" là ngôn ngữ Việt Nam.
Nếu bạn không thích thì có thể đặt tên khác, tuy nhiên quy ước mình thường thấy là dùng 2 ký tự viết tắt từ tên quốc gia (mình nghĩ là vậy)

### **2. Cấu hình danh sách các ngôn ngữ hỗ trợ của app**

Bạn có thể khai báo danh sách các ngôn ngữ mà app sẽ hỗ trợ
```ruby
# Cấu hình ở file /config/application.rb
  class Application < Rails::Application
    ...
    config.i18n.default_locale = :vi
    #Quy ước en: English, vi: Tiếng Việt, ja: Tiếng Nhật
    config.i18n.available_locales = [:en, :vi, :ja]
  end
```

### **3. Thêm các file YAML tương ứng với các ngôn ngữ sử dụng trong app đã khai báo**

Các bạn sẽ thấy project rails có folder **"/config/locales"**. Trong folder này sẽ chứa các file bản dịch ngôn ngữ của app (*.yml, *.rb).
Mặc định sẽ luôn có 1 file mẫu có tên là *"en.yml"*  - chỉ ra ngôn ngữ sử dụng là English. 

Nếu bạn muốn sử dụng các ngôn ngữ khác ngoài tiếng Anh, hãy thêm các tệp cần thiết vào thư mục này, ví dụ là: 
- vi.yml (tiếng Việt)
- ja.yml (tiếng Nhật)
- fr.yml (tiếng Pháp)
...

Ở đây thì chúng ta không nên nhét hết tất cả nội dung vào 1 file, như vậy thì sẽ rất vất vả khi maintance. Chúng ta nên theo đối tượng hoặc ý nghĩa để dễ quản lý, dễ dàng tìm kiếm và maintance. Miễn sao phải có chứa định dạng ngôn ngữ *.en.yml, *vi.yml, .... để rails hiểu là file này sẽ thuộc về ngôn ngữ nào. ví dụ:
![](https://images.viblo.asia/7447f409-6342-4610-bbc8-2c03dec865b9.png)

### **4. Cấu hình đường dẫn để tải các file bản dịch**

Bạn cần cấu hình đường dẫn tải bản dịch i18n cho app trong config/application.rb
```ruby
# File /config/application.rb
...
  class Application < Rails::Application
    ...
    #Load tất cả các file định dạng .yml, .rb trong folder /config/locales/
    config.i18n.load_path += Dir[Rails.root.join("config", "locales", "**", "*.{rb,yml}")]
    config.i18n.default_locale = :vi
    config.i18n.available_locales = [:en, :vi, :ja]
  end
```

Tới đây thì chúng ta đã cấu hình cơ bản i18n trong rails rồi, giờ thì sẽ đi tìm hiểu những chức năng hấp dẫn của i18n thôi :walking:

## III. Những tính năng hay ho của I18n

### **1. Dịch văn bản - I18n.t** 

Cơ bản nhất thường dùng là bản dịch kiểu văn bản. Ví dụ: Bạn muốn hiển thị tiêu đề của app theo tương ứng như sau:
- English: "Home page"
- Tiếng Việt: "Trang chủ"
```ruby
# File config/locales/en.yml thực hiện thêm
en:
  index:
    title: "Home page"

# File config/locales/vi.yml thực hiện thêm
vi:
  index:
    title: "Trang chủ"
  
# Sử dụng ở view tại file /app/views/layouts/application.html.erb
  <head>
    <title><%= I18n.t("index.title") %></title>
    ...
  </head> 
  
# Nếu gọi i18n ở controller, view thì chúng ta có thể viết gọn cách khác, lược bỏ I18n như sau:
 <title><%= t("index.title") %></title>
```
Kết quả hiển thị trên view

![](https://images.viblo.asia/afa8752b-a679-4e55-ad70-1c9aaae84576.png)
![](https://images.viblo.asia/01156469-dec1-4ddc-b821-c8a2a834c793.png)

Cách trên là truyền vào đường dẫn tuyệt đối bằng cách chỉ rõ phân cấp trỏ đến nội dung locale tương ứng là  t("index.title") . Rails sẽ đi tìm vị trí tương ứng là index -> title

Cách khác là truyền vào đường dẫn tương đối, Rails sẽ load locale tương ứng theo đường dẫn của file mà bạn đang gọi i18n. Ví dụ:

```ruby
# Khai báo i18n trong file /app/views/layouts/application.html.erb
  <head>
    <title><%= t(".title") %></title> # Nội dung bắt đầu bởi format .<tên biến locale>
    ...
  </head> 
  
# Cách khai báo ở file locale config/locales/vi.yml như sau:
vi:
  layouts:
    application:
      title: "Trang chủ"
```
Hoặc nếu bạn không biết nên khai báo ở đâu, thì hãy quan sát hiển thị nhắc nhở của rails cung cấp khi bị lỗi "missing translate i18n" :satisfied:
![](https://images.viblo.asia/63bcbc9b-17db-493a-8f92-070bc8174612.png)

### **2. Định dạng kiểu Date time - I18n.l**
Ngoài dịch văn bản ra thì việc hiển thị định dạng ngày giờ theo đa quốc gia cũng thường xuyên được dùng đến. 
```ruby
# config/locales/vi.yml
vi:
  date:
    formats:
      default: "%d/%m/%Y"
      long: "Ngày %d tháng %m năm %Y"
      short: "%d/%m"
  time:
    formats:
      default: "%H:%M:%S %d/%m/%Y"
      long: "Ngày %d tháng %m năm %Y, %H:%M:%S"
      short: "%d/%m/%Y %H:%M"
```
Kết quả:
```ruby
> I18n.l(Date.today)
=> "21/10/2019" # Sử dụng mặc định nếu không được chỉ định
> I18n.l(Date.today, format: :short)
=> "21/10"
> I18n.l(Time.now)
=> "22:58:07 21/10/2019"
> I18n.l(Time.now, format: :long)
=> "Ngày 21 tháng 10 năm 2019, 22:58:13"
```
### **3. Xác định bản dịch với file format Ruby (*.rb)**

Bản dịch thường được định nghĩa trong YAML, nhưng nó cũng có thể được định nghĩa trong file Ruby. Nhờ cách này húng ta có thể nhúng code ruby vào để xử lý để hiển thị bản dịch theo mong muốn.

```ruby
# config/locales/vi.rb
{ 
  vi: { 
    title: "Trang chủ" 
  } 
}
```
Kết quả:
```ruby
>  I18n.t(:title) 
=>  "Trang chủ"
```
Chúng ta cũng có thể gọi cho lambda cho một bản dịch
```ruby
# config/locales/vi.rb
{
  vi: {
    date: {
      formats: {
        month_of_age: ->(date, params) {
          today = Date.today
          month_diff = (today.year*12 + today.month) - (date.year*12 + date.month)
          "#{params[:name]} đã #{month_diff} tháng tuổi"
        }
      }
    }
  }
}
```
Kết quả:
```ruby
>  I18n.l(Date.new(2013, 4, 2), name: "Chú mèo nhỏ", format: :month_of_age) 
=>  "Chú mèo nhỏ đã 78 tháng tuổi"
```

### **4. Chỉ định phân cấp lồng nhau với các kí hiệu**
```ruby
# config/locales/vi.yml
  vi:
    foo
      bar
        title: "Tiêu đề"
```
Trường hợp dưới đây dấu chấm (.) chỉ định một chuỗi ký tự cấu trúc phân cấp thông thường: 
```ruby
>  I18n.t(foo.bar.title) 
=>  "Tiêu đề"
```

Sử dụng **:scope** bạn có thể chỉ định key và phân cấp riêng biệt
```ruby
> I18n.t("bar.title", scope: :foo)
=> "Tiêu đề"
> I18n.t(:title, scope: "foo.bar")
=> "Tiêu đề"
> I18n.t(:title, scope: [:foo, :bar])
=> "Tiêu đề"
```
Điều này sẽ giúp bạn mở rộng cấu trúc phân cấp linh hoạt hơn, gọn gàng hơn so với cách khai báo lại các cấu trúc phân cấp thông thường.
### **5. Truyền biến vào bản dịch**
```ruby
# config/locales/vi.yml
  vi:
    errors: "Biểu mẫu bao gồm %{num} lỗi"
```
Kết quả
```ruby
>   I18n.t(:errors, num: 3)
=>  "Biểu mẫu bao gồm 3 lỗi"
```
### **6. Chỉ định chuỗi kí tự thay thế khi không tìm thấy bản dịch**
Sử dụng **:default** sẽ giúp hiển thị bản dịch thay thế trong trường hợp không tìm thấy bản dịch chỉ định
```ruby
> I18n.t('undefined.key')
=> "translation missing: vi.undefined.key"

#Chỉ định một bản dịch thay thế
> I18n.t('undefined.key', default: "undefined!")
=> "undefined!"

# Sử dụng cụm từ khóa để tra cứu bản dịch đã được khai báo
> I18n.t('undefined.key', default: :"foo.bar.title")
=> "Tiêu đề"

# Sử dụng mảng các bản dịch dùng thay thế
> I18n.t('undefined.key', default: [:"foo.bar.title", "undefined!"])
=> "Tiêu đề"
```
### **7. Chỉ định locale sử dụng cụ thể cho một bản dịch xác định**

```ruby
# File config/locales/en.yml
en:
  title: "Home page"

# File config/locales/vi.yml
vi:
  title: "Trang chủ"
```
```ruby
> I18n.t(:title)
=> "Trang chủ"
> I18n.t(:title, locale: :en)
=> "Home page"
```
### **8. Nhúng code html vào trong bản dịch**
Đôi khi bạn muốn nhúng code html vào trong bản dịch và hiển thị ở chế độ html_safe thì có 2 cách sử dụng: Tên từ khóa kết thúc bằng **html** hoặc là **_html**
```ruby
# File config/locales/vi.yml
vi:
  hello_str: "<b>Xin chào!</b>"
  hello_html: "<b>Xin chào!</b>"
  hello:
    html: "<b>Xin chào!</b>"
  hello_with_name:
    html: "<b>Xin chào %{name}!</b>"
```
```ruby
# Sử dụng ở view
<div><%= t("hello_str") %></div>
<div><%= raw t("hello_str") %></div>
<div><%= t("hello_html") %></div>
<div><%= t("hello.html") %></div>
<div><%= t("hello_with_name.html", name: "Ruby") %></div>
<div><%= t("hello_with_name.html", name: "<span>Ruby</span>") %></div>
```
Kết quả hiển thị view trên browser
![](https://images.viblo.asia/30f3ba47-1b2b-43a6-9d0a-4f80e6609c8c.png)

### **9. Chỉ định một mảng các bản dịch theo từng nhóm**
Bằng cách chuyển các từ khóa vào trong một mảng, chúng ta có thể lấy được các bản dịch ngay lập tức ở định dạng mảng
```ruby
# File config/locales/vi.yml
vi:
  csv:
    header:
      user:
        customer_id: "Mã KH"
        name: "Tên"
        address: "Địa chỉ"
```
```ruby
> I18n.t([:customer_id, :name, :address], scope: [:csv, :header, :user])
=> ["Mã KH", "Tên", "Địa chỉ"]
```

### **10. Chỉ định tên thuộc tính và tên model**
Bằng cách đặt từ khóa vào hệ thống phân cấp được chỉ định, chúng ta có thể nhận được tên model và tên thuộc tính của một model một cách tiện lợi
```ruby
# File config/locales/vi.yml
vi:
  activerecord:
    # Chỉ định tên cho các model
    models:
      user: "KH"
      
    # Chỉ định tên thuộc tính cho từng model
    attributes:
      user:
        name: "Tên"
        address: "Địa chỉ"
        
  # Chỉ định tên thuộc tính chung cho tất cả model
  attributes:
    created_at: "Ngày tạo"
    updated_at: "Ngày cập nhật"
```
```ruby
> User.model_name.human
=> "KH"
> User.human_attribute_name(:name)
=> "Tên"
> User.human_attribute_name(:created_at)
=> "Ngày tạo"
```
### **11. Chuyển đổi số ít, số nhiều dựa theo số đã cho**
Bằng cách sử dụng tham số **one**, **other**, chúng ta có thể chuyển đổi giữa số ít và số nhiều theo số đã cho. 
```ruby
# File config/locales/vi.yml
vi:
  family:
    one: "Độc thân"
    other: "%{count} gia đình"    
```
```ruby
> I18n.t(:family, count: 1)
=> "Độc thân"
> I18n.t(:family, count: 2)
=> "Đã có 2 gia đình"
```

### **12. Khai báo nội dung error khi validate cho Active Record**
Khi có lỗi trong quá trình validate dữ liệu được hỗ trợ sẵn, rails sẽ tìm kiếm nội dung bản dịch trong i18n theo thứ tự ưu tiên như sau:
```ruby
activerecord.errors.models.[model_name].attributes.[attribute_name].[message_key]
activerecord.errors.models.[model_name].[message_key]
activerecord.errors.messages.[message_key]
errors.attributes.[attribute_name].[message_key]
errors.messages.[message_key]
```
Ví dụ về khai báo validate:
```ruby
# app/models/user.rb
class User < ActiveRecord::Base
  validates :name, presence: true
end
```
Ứng với validate present thì từ khóa tương ứng là **blank** vì vậy khi có lỗi xác thực khi thuộc tính name không có dữ liệu thì nội dung lỗi sẽ được tìm kiếm theo thứ tự:
```ruby
activerecord.errors.models.user.attributes.name.blank
activerecord.errors.models.user.blank
activerecord.errors.messages.blank
errors.attributes.name.blank
errors.messages.blank
```
Ví dụ về một khai báo message lỗi:
```
# File config/locales/vi.yml
vi:
  activerecord:
    errors:
      models:
        user:
          attributes:
            name:
              blank: "Không được để trống"
```

Bạn có thể tìm thấy các từ khóa tương ứng với các validates có sẵn [tại đây](https://guides.rubyonrails.org/i18n.html#error-message-interpolation)

### **13. Chỉ định nội dung subject cho Action Mailler**

Nếu không có nội dung subject nào được chuyển đến phương thức send mail, thì subject mặc định được tìm kiếm theo từ khóa có format sau:
```
[mailer_scope].[action_name].subject
```
ví dụ: 
```
# app/mailers/user_mailer.rb 
class UserMailer < ApplicationMailer
  def welcome user
    @user = user
    mail to: user.email
  end
end

# File config/locales/vi.yml
vi:
  user_mailer:
    welcome:
      subject: "Cảm ơn bạn đã đăng ký trên hệ thống của chúng tôi"
```

### **14. Chỉ định kiểu định dạng cho kiểu Currency (Tiền tệ)**
```ruby
# File config/locales/en.yml
en:
  currency:
    format:
      delimiter: "."                    # Phân cách phần thập phân
      format: "%n %u"                   # Đặt định dạng cho các số không âm (mặc định là "%u %n"), %u là đơn vị tiền tệ, %n là số tiền
      precision: 2                      # Chỉ định độ chính xác của số (mặc định là 2 chữ số thập phân)
      separator: ","                    # Phân cách các các hàng đơn vị theo hàng ngàn, trăm, triệu, ...
      raise: false,                     # Nếu là true sẽ raise ngoại lệ InvalidNumberError khi đối số là không hợp lệ
      unit: "$"                         # Đơn vị
```

```ruby
> number_to_currency(1234567890.50)
=> $1,234,567,890.50
> number_to_currency(1234567890.506)
=> $1,234,567,890.51
> number_to_currency(1234567890.506, precision: 3)
=> $1,234,567,890.506
> number_to_currency("123a456")
=> $123a456
> number_to_currency("123a456", raise: true)
=> InvalidNumberError
> number_to_currency(-1234567890.50, negative_format: "(%u%n)")
=> ($1,234,567,890.50)
> number_to_currency(1234567890.50, unit: "&pound;", separator: ",", delimiter: "")
=> &pound;1234567890,50
> number_to_currency(1234567890.50, unit: "&pound;", separator: ",", delimiter: "", format: "%n %u")
=> 1234567890,50 &pound;
```

Đến đây thì cũng quá dài rồi, mình xin phép tạm kết, hi vọng sẽ giúp ích được các bạn đọc :muscle:
Chi tiết các bạn có thể tìm ở nguồn: https://guides.rubyonrails.org/i18n.html