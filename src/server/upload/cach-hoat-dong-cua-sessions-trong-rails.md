Điều gì sẽ xảy ra nếu trang web sử dụng **Ruby on Rails** của bạn không thể cho biết ai đã truy cập trang web này? Không thể biết rằng cùng một người đã yêu cầu hai trang khác nhau? Nếu tất cả dữ liệu bạn đã lưu trữ biến mất ngay sau khi bạn trả lại request?

Điều đó có thể là bình thường nếu trang web chủ yếu là nội dung tĩnh. Nhưng hầu hết các trang web cần có khả năng lưu trữ một số dữ liệu về người dùng. Có thể đó là ID người dùng hoặc ngôn ngữ ưa thích hoặc liệu người có luôn muốn xem trang web của chúng ta với giao diện máy tính hay giao diện di động  trên iPad hay không?

Sessions là 1 cách hoàn hảo để lưu các loại dữ liệu đã nói ở trên. Những dữ liệu bạn muốn giữ lại cho nhiều request.

Trong Rails, Sessions rất dễ sử dụng: 
``` ruby
session[:current_user_id] = @user.id
```

Vậy **Session** là gì? Làm thế nào để Rails biết để hiển thị dữ liệu cho đúng từng người? Làm thế nào để bạn quyết định nơi lưu trữ dữ liệu của session?

## Session là gì?
Session là được hiểu là 1 phiên làm việc trong đó người sử dụng giao tiếp với trang web. Session bắt đầu khi người sử dụng truy cập vào trang lần đầu tiên, và kết thúc khi người sử dụng thoát khỏi trang. 

Phiên làm việc ở đây có thể hiểu là nơi lưu trữ dữ liệu trong một request gửi đi mà bạn có thể đọc trong các request sau này nữa

Bạn có thể thiết lập 1 số dữ liệu vào session và đặt nó bên trong action của 1 controller
> app/controllers/sessions_controller.rb
``` ruby
def create
    # ...
    session[:current_user_id] = @user.id
    # ...
end
```
Và đọc nó ở 1 nơi khác
> app/controllers/users_controller.rb
``` ruby
def index
    # ...
    current_user = User.find_by id: session[:current_user_id]
    # ...
end
```
Phải có sự phối hợp giữa trình duyệt của người dùng và Rails để mọi thứ kết nối. Tất cả bắt đầu với cookie.

Khi bạn gửi request một trang web, máy chủ có thể đặt cookie khi nó phản hồi lại:
```
~ jweiss$ curl -I http://www.google.com | grep Set-Cookie

Set-Cookie: NID=67=J2xeyegolV0SSneukSOANOCoeuDQs7G1FDAK2j-nVyaoejz-4K6aouUQtyp5B_rK3Z7G-EwTIzDm7XQ3_ZUVNnFmlGfIHMAnZQNd4kM89VLzCsM0fZnr_N8-idASAfBEdS; expires=Wed, 16-Sep-2015 05:44:42 GMT; path=/; domain=.google.com; HttpOnly
```

Trình duyệt của bạn sẽ lưu trữ các cookie đó. Cho đến khi cookie hết hạn, mỗi khi bạn đưa ra yêu cầu, trình duyệt của bạn sẽ gửi cookie trở lại máy chủ:
```
...
> GET / HTTP/1.1
> User-Agent: curl/7.37.1
> Host: www.google.com
> Accept: */*
> Cookie: NID=67=J2xeyegolV0SSneukSOANOCoeuDQs7G1FDAK2j-nVyaoejz-4K6aouUQtyp5B_rK3Z7G-EwTIzDm7XQ3_ZUVNnFmlGfIHMAnZQNd4kM89VLzCsM0fZnr_N8-idASAfBEdS; expires=Wed, 16-Sep-2015 05:44:42 GMT; path=/; domain=.google.com; HttpOnly
...
```

Nhiều cookie trông giống như vô nghĩa. Và chúng được cho là vậy. Bởi vì thông tin bên trong cookie không dành cho người dùng. Rails sẽ chịu trách nhiệm tìm ra ý nghĩa của cookie. 

## Cookie phải làm gì với Session?
Sự khác biệt giữa cookie và session là gì?

Theo mặc định, trong Rails, không có nhiều khác biệt. Rails làm [một số việc với cookie để làm cho nó an toàn hơn](http://guides.rubyonrails.org/security.html#session-storage). Nhưng bên cạnh đó, nó hoạt động theo cách bạn mong đợi. Ứng dụng Rails của bạn đặt một số dữ liệu vào cookie, cùng một dữ liệu xuất hiện từ cookie. Nếu như thế thì cookie không khác gì so với session

Ngoại trừ việc mặc định session sẽ hết hạn khi người dùng kết thúc phiên làm việc hoặc đóng trình duyệt, nó khác so với việc cookie sẽ hoạt động ngay cả khi người dùng đóng trình duyệt hay không 

Nhưng cookie không phải lúc nào giống session:
* Bạn chỉ có thể lưu trữ khoảng 4kb dữ liệu trong cookie
* Cookie được gửi cùng với mọi yêu cầu bạn thực hiện
* Nếu bạn vô tình lộ secret_key_base của mình, người dùng của bạn có thể thay đổi dữ liệu bạn đã đặt bên trong cookie
* Lưu trữ sai loại dữ liệu bên trong cookie có thể không an toàn

Nếu bạn cẩn thận, đây không phải là vấn đề lớn.
Nhưng khi bạn không thể lưu trữ dữ liệu session bên trong cookie vì một trong những lý do trên, Rails có một vài nơi khác để lưu giữ session 
### Cách session hoạt động và lưu trữ
Tất cả các cách session lưu trữ dù không phải là session lưu trữ trong cookie cũng hoạt động theo cách tương tự. Để dễ hiểu nhất là suy nghĩ về việc sử dụng một ví dụ thực tế
1. Khi bạn gọi `session[:current_user_id] = 1` trong ứng dụng của mình và session này không tồn tại
2. Rails sẽ tạo bản ghi mới trong session với Session ID ngẫu nhiên (ví dụ: 09497d46978bf6f32265fefb5cc52264).
3. Nó sẽ lưu trữ {current_user_id: 1} (được mã hóa Base64) trong data attribute của bản ghi đó.
4. Nó sẽ trả lại Session ID được tạo, 09497d46978bf6f32265fefb5cc52264, cho trình duyệt bằng cách sử dụng Set- cookie.

Lần tới khi bạn request một trang,
1. Trình duyệt sẽ gửi cùng một cookie đó cho ứng dụng, sử dụng Cookie: header. VD: (```Cookie: _my_app_session=09497d46978bf6f32265fefb5cc52264;
path=/; HttpOnly```)
2. Khi bạn gọi session[:current_user_id]
3. Ứng dụng lấy ra Session ID từ cookie, và tìm thấy bản ghi của Session ID trong bảng Session.
4. Sau đó, nó trả về current_user_id trong data attribute của bản ghi đó.

Cho dù bạn đang lưu trữ các session trong cơ sở dữ liệu, trong Memcached, trong Redis hay bất kỳ nơi nào khác, chúng chủ yếu thực hiện theo quy trình tương tự này. Cookie của bạn chỉ chứa Session ID và ứng dụng Rails của bạn tra cứu dữ liệu trong Session Store sử dụng ID đó.

### Cookie store, cache store, or database store?
Session lưu trong cookie là cách dễ nhất để dùng. Nó không cần bất kỳ cơ sở hạ tầng hoặc thiết lập bổ sung nào.

Nhưng nếu bạn không muốn lưu vào cookie, bạn có hai tùy chọn:

Lưu trữ session trong cơ sở dữ liệu hoặc lưu trữ chúng trong bộ nhớ cache

**Lưu trữ session trong Cache**

Bạn có thể đã sử dụng một cái gì đó như Memcache để cache bộ nhớ  hoặc dữ liệu. Nếu vậy, bộ nhớ cache là nơi dễ dàng lưu trữ dữ liệu session thứ 2, vì nó đã được thiết lập.

Bạn không phải lo lắng về việc session của bạn không thể kiểm soát được vì các session cũ hơn sẽ tự động bị loại khỏi bộ nhớ cache nếu nó quá lớn. Nó nhanh, vì bộ nhớ cache rất có thể sẽ được lưu trong bộ nhớ.

***Nhưng nó không hoàn hảo:***

* Nếu bạn thực sự quan tâm đến việc giữ các session cũ , có thể không muốn chúng bị loại khỏi bộ nhớ cache.
* Các session và dữ liệu được lưu trong bộ nhớ cache của bạn. Nếu bạn không có đủ bộ nhớ, có thể phải đối mặt với rất nhiều lần cache bộ nhớ và các session sẽ hết hạn sớm.
* Nếu bạn cần phải đặt lại bộ nhớ cache của mình (giả sử bạn đã nâng cấp Rails và dữ liệu đã lưu trong bộ nhớ cache cũ của bạn không còn chính xác nữa), không có cách nào để làm điều đó mà không hết hạn session của mọi người.
**Lưu trữ session trong Database**

Nếu bạn muốn giữ session của bạncho đến khi nó hết hạn hợp pháp, bạn có thể muốn giữ nó trong một số loại cơ sở dữ liệu. Cho dù đó là Redis, ActiveRecord hay cái gì khác.

***Nhưng cơ sở dữ liệu lưu trữ Session cũng có nhược điểm:***
* Với một số loại cơ sở dữ liệu, các session sẽ không tự động được dọn dẹp
* Bạn phải biết cơ sở dữ liệu của bạn sẽ hoạt động như thế nào khi dữ liệu session đầ
* Bạn phải cẩn thận hơn khi tạo dữ liệu của session hoặc bạn sẽ đầy cơ sở dữ liệu của mình bằng các session vô dụng.

Hầu hết những vấn đề này là khá hiếm. Nhưng bạn vẫn nên nhận thức được chúng.


Bài viết của mình đến đây là hết, mong các bạn sẽ có kiến thức hơn về Cookie, sử dụng và lưu trữ nó trong Rails 1 cách hợp lí!

Nguồn bài viết: [How rails sessions work](https://www.justinweiss.com/articles/how-rails-sessions-work/)