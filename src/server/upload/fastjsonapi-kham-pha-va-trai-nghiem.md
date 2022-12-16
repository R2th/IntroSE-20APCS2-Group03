# Giới thiệu
Nếu là 1 dev server, thì có lẻ bạn đã quá quen với thứ gọi là api.Và nếu là 1 dev ruby on rails, chắc hẳn khi nhắc đến api các bạn sẽ nghĩ ngay đến Active Model Serializer(AMS).Vậy bạn đã nghe đến fastjson api và đã từng thử nghiệm nó chưa.Hôm nay mình xin giới thiệu một số nét về fastjson api mà mình đã có cơ hội trải nghiệm. Đó là khi khách hàng phàn nàn về performance của server, chúng mình đã áp dụng khá nhiều phương án như đi refactor code đến mức hết mức có thể, cached dữ liệu vào redis.Vậy nhưng vẫn chưa thỏa mãn khách hàng. Và rồi theo suggest của khách hàng, mình đã thử với fastjson api. Sau đây mình xin nói cụ thể hơn về gem này nhé.
# Fastjson api
Fast JSON API serialization cung cấp tất cả các chức năng chính mà Active Model Serializer (AMS) cung cấp, và đặc biệt hơn là hiệu suất và tốc độ của nó là vượt trội so với AMS.
Đây là biểu đồ thống kê về điều đó:
![](https://images.viblo.asia/94465967-fe0e-411f-a3a0-e0c83e4bc1bf.png)
Giờ mình xin hương dẫn cụ thể cách sử dụng nó:
- Đầu tiên các bạn hãy tạo 1 project cho mình nhé, mình sẽ demo với 1 project test của mình. Trong đó mình có 1 model UserOrder has_one User.
- Hãy thêm `gem 'fast_jsonapi'` vào gemfile nhé.
- Đừng quên bundle install để thiêt lập nó
Mong muốn của mình là muốn lấy về các userorder và thằng user của nó.
Ở controller mình sẽ chỉ cần gọi thế này:
```
options = {}
options[:params] = { current_user_id: current_user.id }
UserOrderSerializer.new(userorders, options).serializable_hash
```
Mình xin giải thích 1 chút về đoạn code trên, Mình đang gọi đến serializer của thằng UserOrder.Và cái options chính là 1 hổ trợ của fastjson api.Nó cho vào gửi kèm theo những thứ bạn cần cho việc get dữ liệu theo mong muốn.
Nó bao gồm như: options[:meta], options[:params], options[:include]... còn chi tiết mỗi cái thế nào mọi người có thể tìm hiểu thêm tại [](https://github.com/Netflix/fast_jsonapi)
Sau phần việc ở controller, giờ mình sẽ chỉ cho các bạn thấy ở serializer của UserOrder mình sẽ làm gì. Đại loại nó sẽ thế này:
![](https://images.viblo.asia/f735e8f3-4726-481f-94f2-5cbd368eb2e9.png)
Nhìn vào bạn sẽ thấy, serializer này sẽ không còn kế thừa ActiveModel::Serializer, vì đơn giản nó không dùng AMS mà  dùng fastjson. Và điều này thể hiện rõ ở việc nó `include FastJsonapi::ObjectSerializer`.
Và phía dưới nó là cách lấy các attribute mong muốn.
Như lúc đầu mình có nói, thằng UserOrder này có quan hệ has_one với User.Ở đây để lấy được User, chúng ta chỉ cần gọi đến quan hệ đó, và chỉ định serializer của thằng User này.
```
has_one :user, serializer: UserSerializer
```
Và hãy xem qua thử, thằng UserSerializer này có gì.
![](https://images.viblo.asia/63d13293-4f45-4dce-aee9-a66ac458ce51.png)

Nó cũng không có gì khác và quá khó hiểu đúng không.
Mình đã vừa hướng dẫn các bạn cách sử dụng fastjson api đơn giản nhất.
Nếu có gì sai sốt mong được mọi người góp ý thêm. :)