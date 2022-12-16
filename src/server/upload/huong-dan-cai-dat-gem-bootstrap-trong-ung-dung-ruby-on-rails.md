Là một web developer chắc hẳn các bạn đã nghe hoặc sử dụng bootstrap rồi. Ở bài xin phép được chia sẻ cách cách cài đặt và sử dụng bootstrap trong ứng dụng Ruby on Rails. Tuy nhiên, đầu tiên mình sẽ giới thiệu qua về Bootstrap và lí do tại sao nó lại được nhiều developer yêu thích đến vậy.
# I. Tổng quan Bootstrap
Bootstrap là một framework cho phép thiết kế website reponsive nhanh hơn và dễ dàng. Nó bao gồm các HTML templates, CSS templates và Javascript cho phép tạo ra các form và element cơ bản như: typography, forms, buttons, tables, navigation, modals, image carousels... Trong bootstrap có thêm các plugin Javascript trong nó giúp cho việc thiết kế reponsive của bạn dễ dàng hơn và nhanh chóng hơn.

Từ những lợi ích trên mà bootstrap được sử dụng rất nhiều trong các ứng dụng web ngày này. Nó cho phép giảm thời gian xây dựng, thiết kế giao diện (nói dễ hiểu hơn là ví dụ như: ta muốn lắp ráp một chiếc xe thì chỉ cần lựa chọn những phần thích hợp rồi lắp ráp hoặc sửa đổi chút ít chứ không cần phải làm từ đầu nhưn cái đinh, cái ốc :D) 
# II. Cài đặt gem bootstrap
Đầu tiên chúng ta init rails project như sau: 
`rails new BootstrapDemo`

Vào Gemfile thêm gem gem `bootstrap-sass` như sau và chắc chắn rằng đã có gem `sass-rails` (mặc định đã được thêm khi init project nếu không ta cần bổ sung thêm gem `sass-rails`):

![](https://images.viblo.asia/00ce7935-fdb5-4ba5-aec2-b98db7cd717b.png)

Sau khi đã hoàn thành bước này chạy lệnh `bundle install` và restart lại server.

![](https://images.viblo.asia/35776d3e-91be-4759-8556-db263467e601.png)

Kiểm tra thấy dòng màu xanh đã install bootstrap-sass, như vậy là ta đã cài đặt xong tiếp theo là đến bước config cho ứng dụng nhé.

Trước hết vào file `app/assets/stylesheets/application.scss` import Bootstrap styles bằng cách bổ sung 2 lệnh dưới đây:
```
@import "bootstrap-sprockets";
@import "bootstrap";
```
Lưu ý: `bootstrap-sprockets` phải ở trên bootstrap, nếu bạn ngẫu hứng thay đổi thứ tự là mình không chịu trách nhiệm đâu nghe.

Mặc định file application có đuôi css ta cần đổi nó thành đuôi scss
```
$ mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss:
```
Sau đó xóa hết những dòng không cần thiết này nhé `*= require_self` `*= require_tree .`.

Chúng ta sẽ không còn sử dụng *= require trong các file stylesheets bởi vì nó sẽ không còn truy cập được Bootstrap mixins hay các biến.

Nếu các bạn đang sử dụng rails 5.1+ hãy thêm gem `jquery-rails` (đừng quên câu lệnh thần thánh `bundle install`).

Cuối cùng require bootstrap vào file application.js bằng cách thêm 2 lệnh sau:
```
//= require jquery
//= require bootstrap-sprockets
```

![](https://images.viblo.asia/be6a5e67-5db4-45ba-a47f-c32e97e1b139.png)

Như vậy là mình đã hướng dẫn các bạn cách cài đặt gem bootstrap, giờ chúng ta có thể vào đường dẫn sau [Bootstrap Components](https://getbootstrap.com/docs/3.3/components/) lấy bất cử component nào mong muốn hay sử dụng các thư viện của bootstrap để làm cho giao diện của mình thật lung ling và thân thiện với khách hàng ha. 

# III. Tài liệu tham khảo
* [Bootstrap for Sass](https://github.com/twbs/bootstrap-sass)