# GIỚI THIỆU
Gần đây mình vừa có cơ hội tìm hiểu về [Zalo for Developer](https://developers.zalo.me/). Nên hôm nay mình sẽ giới thiệu nó lại với mọi người, sau đó sẽ hướng dẫn xây dựng một ứng dụng hoàn chỉnh tương tác với  [Zalo](https://id.zalo.me)
##  Zalo là gì
Có lẻ tất mọi người đều không xa lạ gì với Zalo nên mình chỉ giới thiệu sơ lược về lịch sử phát triển của Zalo. Và mọi người có thể được được thêm [tại đây](https://vi.wikipedia.org/wiki/Zalo).


Zalo là ứng dụng nhắn tin và gọi điện miễn phí hoạt động trên nền tảng di động và máy tính.


Zalo được phát triển bởi đội ngũ kỹ sư của công ty VNG. Phiên bản đầu tiên được ra mắt vào ngày 08/08/2012 không nhận được sự quan tâm nhiều từ người dùng.


Tháng 12/2012, Zalo chính thức ra mắt, đi theo mô hình mobile-first và nhanh chóng thu hút được một lượng lớn người dùng Việt Nam nhờ việc sản phẩm hoạt động tốt, ổn định trên hạ tầng mạng Việt Nam.


Tháng 02/2013 Zalo được bình chọn vào top những ứng dụng di động sáng tạo nhất châu Á trên Techinasia.
## Zalo for Developer
**Zalo for Developer** gồm 2 phần chính là Zalo API và Zalo SDK:
### Zalo API 
Zalo API được tạo ra cho phép ứng dụng của bên thứ 3 có thể tương tác với Zalo Platform và kết nối tới hơn 100 triệu user của Zalo.
    
Hiện tại Zalo đã hỗ trợ 4 bộ API:
1. [Social API](https://developers.zalo.me/docs/api/social-api-4)
2. [Official Account Open API](https://developers.zalo.me/docs/api/official-account-open-api-5)
3. [Article API](https://developers.zalo.me/docs/api/article-api-45) 
4. [Store API (Zalo Shop)](https://developers.zalo.me/docs/api/store-api-zalo-shop-46)

**Social API**

Cung cấp một cách thức để ứng dụng của bạn có thể truy cập dữ liệu trên nền tảng của Zalo. Thông qua giao thức HTTP ứng dụng có thể truy vấn dữ liệu người dùng, dữ liệu bạn bè, đăng tin mới và nhiều tác vụ khác.
       
**Official Account Open API**    


   Cung cấp một cách thức để ứng dụng của bạn có thể truy cập dữ liệu trên nền tảng của Zalo. Thông qua giao thức HTTPS ứng dụng có thể tương tác với người quan tâm trên danh nghĩa của Zalo Official Account.


**Article API**    


   Cung cấp một cách thức để ứng dụng của bạn có thể truy cập dữ liệu article trên nền tảng của Zalo. Thông qua giao thức HTTP ứng dụng có thể tạo bài viết, chỉnh sửa, quản lý bài viết hoặc broadcast bài viết tới follower.


**Store API (Zalo Shop)**    


   Cung cấp một cách thức để ứng dụng của bạn có thể truy cập dữ liệu của Zalo Shop. Thông qua giao thức HTTP ứng dụng có thể tạo tạo danh mục, tạo sản phẩm, quản lý sản phẩm, quản lý đơn hàng và nhiều tác vụ khác.
### Zalo SDK 


Cùng với đó là 8 bộ SDK với các ngôn ngữ đa dạng giúp lập trình viên tích hợp một cách dễ dàng để sử dụng Zalo API:


1. [Java SDK](https://developers.zalo.me/docs/sdk/java-sdk-69)


3. [Android SDK](https://developers.zalo.me/docs/sdk/android-sdk-8)


5. [iOS SDK](https://developers.zalo.me/docs/sdk/ios-sdk-9)


7. [Javascript SDK](https://developers.zalo.me/docs/sdk/javascript-sdk-7)


9. [PHP SDK](https://developers.zalo.me/docs/sdk/php-sdk-64)


11. [Nodejs SDK](https://developers.zalo.me/docs/sdk/nodejs-sdk-66)


13. [Python SDK](https://developers.zalo.me/docs/sdk/python-sdk-78)


15. [ C# SDK](https://developers.zalo.me/docs/sdk/c-sdk-82)

# ỨNG DỤNG
## Giới thiệu bài toán
Giả sử mình có một website chăm sóc khách hàng. Mỗi Khách hàng sẽ có một tài khoản Zalo. Các nhân viên công ty có thể đăng nhập vào website và sử dụng website đó để gửi tin nhắn đến zalo của khách hàng để chăm sóc khách hàng.
## Triển khai bài toán
Để xây dựng được ứng dụng giải quyết bài toán trên chúng ta cần sử dụng **Official Account Open API**. 

Đầu tiên để sử dụng Official Account Open API bạn cần phải  [tạo official account](https://oa.zalo.me/manage/oa?option=create).  Lưu ý các bạn cần nhập đầy đủ thông tin. Sau đó phải đợi bên Zalo kiểm tra và cấp phép tài khoản 15 ngày. Để dùng vĩnh viển bạn cần cung cấp giấy tờ chứng thực.  

Khi các nhân viên đăng nhập vào website sẽ cùng sử dụng tài khoản này để chat với khách hàng. Các bạn có thể hiểu tài khoản này như kiểu 1 trang trên Facebook vậy.


Sau khi tạo thành công trong trang chi tiết, bạn sẽ thấy ID và secret key của Official Account. Đây là những thông tin quan trọng để bạn có thể gọi open api. Xin hãy giữ secret key của bạn bí mật. 


![](https://images.viblo.asia/cb9b1cbe-30ec-481e-8cde-6c313e19effa.png)


Tiếp đến bạn vào trang https://developers.zalo.me/tools/explorer/1104345532999378081 sử dụng ID và Secret key  ở trên để lấy access token.


Rất tiếc Zalo vẫn chưa xây dựng bộ SDK cho nền tảng Ruby on Rails nên chúng ta cần phải code chay nhé

### Gửi tin nhắn đi


Tiếp theo bạn tạo 1 service để gửi tin nhắn. Trong service này  bạn sẽ gọi API của Zalo để thực hiện gửi tin nhắn đển tài khoản Zalo của khách hàng.


Khi gọi Api này chúng ta cần gửi đi access_token trong param trên url cùng với zalo_id của người nhận và mesage gửi đi trong body của request. Nếu thực hiện request thành công thì ngay lập tức tài khoản của khách hàng sẽ nhận được message đó.


```
 class Zalos::SendMessageService < BaseService
   OPEN_TIMEOUT = 10
   READ_TIMEOUT = 10
 
    def initialize message
     @message = message
   end
 
    def execute
     uri = URI("https://openapi.zalo.me/v2.0/oa/message?access_token=" + ENV["ZOA_ACCESS_TOKEN"])
     request = Net::HTTP::Post.new uri, "Content-Type" => "application/json"
     request.body = {recipient: {user_id: message.client.zalo_id}, message: {text: message.content}}.to_json
     response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https") do |http|
       http.open_timeout = OPEN_TIMEOUT
       http.read_timeout = READ_TIMEOUT
       http.request request
     end
     response_body = JSON.parse response.body, symbolize_names: true
     raise :error unless response_body[:error] == 1
   end
 
    private
   attr_reader :message
 end
```

*Giải thích*

1. zalo_id sẽ lấy trong thông tin của client
2.  message các bạn có thể tạo ra 1 form cho nhân viên nhập

### Nhận tin nhắn về

TIếp theo để nhận tin nhắn từ khách hàng về website. Đầu tiên bạn cần đăng ký 1 ứng dụng trên [Zalo for Developer](https://developers.zalo.me/). Trong trang config các bạn liên kết ứng dụng này với Official Account đã tạo ở trên bằng ID và Secret key. 

Sau đó đăng ký event và cung cấp callback cho ứng dụng. ở đây mình sẽ đăng ký event nhận tin nhắn và cung cấp 1 callback để khi có sự kiện khách hàng gửi tin đến thì Zalo sẽ gọi đến:

```
 class Zalos::CallbacksController < ApplicationController
   def new
     Zalos::CallbackService.execute params
   end
 end
```

Khi gọi đên callback của mình Zalo sẽ gửi theo loại sự kiện, và content của sự kiện. Từ đó chúng ta có thể tạo 1 service để xử lý nó.  

Cụ thể chúng ta sẽ tiến hành lưu content của sự kiện khách hàng gửi tin nhắn đến Official Account của chúng ta. Và tiến hành run time nó trên website để nhân viên công ty nhận được.
```
 class Zalos::CallbackService < BaseService
   def initialize params
     @params = params
   end
 
    def execute
     case params[:event].to_sym
     when :event_type
       # TODO save message into DB and run time message to website
     end
   end
 
    private
   attr_reader :params
 end
```

### Kết luận bài toán
Trên đây mình đã xây dụng một ứng dụng nhỏ có thể gửi tin nhắn đi và nhận tin nhắn về gửi website của chúng ta đến tài khoản zalo của khách hàng bằng cách sử dụng Official Account Open API. 

Lưu ý còn rất nhiều ứng dụng thực tế khác được Official Account Open API hỗ trợ các bạn có thể xem chi tiết [tại đây](https://developers.zalo.me/docs/api/official-account-open-api-104)
# Kết luận
Cá nhân mình thấy Zalo for Developer đã xây dựng bộ API và SDK mạnh mẹ hỗ trợ rất nhiều ứng dụng thiết thực để tương tác với Zalo. Và cùng với đó là bộ tài liệu rất chi tiết để chúng ta tìm hiểu và sử dụng
# Tham khảm
[Zalo for Developer](https://developers.zalo.me/)