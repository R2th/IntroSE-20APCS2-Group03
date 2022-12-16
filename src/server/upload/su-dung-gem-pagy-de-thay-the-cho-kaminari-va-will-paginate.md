# Giới thiệu
Nếu các bạn là một web developer thì sẽ không còn xa lạ với công việc phân trang cho trang web của bạn, việc phân trang không chỉ giúp mọi thứ trên trang web của bạn được gọn gàng, rõ ràng, đẹp đẽ mà còn giúp giảm thiểu được việc phải load 1 cục data to đùng vứt ở cả 1 trang.
Và nếu bạn là 1 Ruby On Rails developer, chắc sẽ khá quen thuộc với những cái tên như kaminari hay will_paginate, đây là những cái tên mà ngay khi muốn phân trang bạn sẽ nghĩ đến.Chúng khá mạnh mẽ và tiện lợi.
Nhưng hôm nay, mình xin giới thiệu đến các bạn một gem khá hay cũng cho việc phân trang này, đó là gem Pagy.
Vậy gem này có gì hay ho, chúng ta sẽ cũng nhau tìm hiểu nhé.
# Gem pagy
Trước tiên hãy xem 2 sơ đồ được một người dùng so sánh giữ 3 gem tôi đã nhắc đến ở trên.
![](https://images.viblo.asia/0ec1031f-5854-4b22-9504-23bd9a5fca16.png)
![](https://images.viblo.asia/ad7c1518-8f66-4a14-9759-f123ece6058d.png)
Như các bạn đã thấy, khi sử dụng pagy, sẽ tốn ít bộ nhớ ram khá nhiều so với sử dụng will_paginate, và với kaminari thì càng khủng hơn đúng không.
Vậy tại sao lại có sẽ khác biệt đó, hãy đi thử nghiệm nhé.
Ở đây mình sẽ lấy ví dụ so sánh giữa kaminari và pagy.
Trước tiên hãy nhớ lại thao tác phân trang với kaminari.
Ở `users_controller.rb` chúng ta có:
```
@users = User.all.sort_by_newest.page(params[:page]).per Settings.admin.user_per_page
```
Và ở view, chúng ta chỉ việc: 
```
<%= paginate @users, theme: 'twitter-bootstrap-3' %>
```
Như ở trên chúng ta có thể thấy, ở controller sẽ lấy tất cả object users, sau đó ở view gọi đến paginate.Gem này sẽ phân trang dựa vào các objact user và điều kiện trang.
Bây giờ hãy xem Pagy làm gì nhé:
Tương tự ở `users_comtroller` chúng ta có:
```
@pagy, @users = pagy User.all.sort_by_newest, items: Settings.admin.user_per_page
```
Chắc các bạn đã thấy gì đó đặc biêt, đó là biến @pagy.Vậy hãy xem nó có gì bên trong.
![](https://images.viblo.asia/8af06f88-254d-4248-a40e-817db25afe11.png)
Trong pagy có chưa những thuộc tính cho việc phân trang, bao gồm trang hiện tại, số lượng data, trang tiếp theo...
Và điều đặc biệt là trong đó, không hề chưa 1 object user nào, chỉ toàn là số.
Khi đó ở view sẽ là:
```
<%== pagy_nav(@pagy) %>
```
Như vậy ở view, pagy sẽ dựa vào @pagy này để thực hiện phân trang, và đến đây, nó sẽ không còn đụng gì đến object user nữa.mà một khi đã không đụng gì đến object, chỉ toàn là số, thì việc ít tốn kém bộ nhớ là được dễ hiểu.
Ngoài ra, pagy cũng hổ trợ khá nhiều lựa chọn themes cho việc phân trang như bootstrap...và cũng có nhiều lựa chọn như số record cho 1 trang(mặc định của gem là 20)..
Các bạn có thể tham khảo thêm tại đây, cũng khá đơn giản nhé. https://github.com/ddnexus/pagy
Vừa rồi là bài so sánh giữa gem pagy và kaminari dự theo những gì mình hiểu biết.Nếu có gì sai sót và đóng góp, các bạn có thể comment phía dưới.Cảm ơn mọi người rất nhiều.