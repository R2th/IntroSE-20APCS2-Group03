Xin chào các bạn, mong là các bạn thích bài viết về Adapter Pattern của mình lần trước, nếu ai chưa đọc nhưng có hứng thú về phần đó thì có đọc [tại đây](https://viblo.asia/p/design-patterns-in-ruby-on-rails-adapter-pattern-XL6lA9y4lek) nhé. Bài viết lần này minh sẽ mang đến cho mọi người một design pattern khác cũng được sử dựng phổ biến trong Rails mà mình đã có đề cập trong bài viết trước, đó là **Decorator Pattern**.  Cùng bắt đầu thôi nào!

# 1. Decorator Pattern là gì

Decorator, các bạn có thể hiểu đơn giản như cái tên của nó, là một structural design pattern cho phép chúng ta "trang trí" thêm các tính năng cho một đối tượng nào đó mà không thay đổi cấu trúc của nó. Hiểu nôm na như đặt đối tượng nào vào trong một wrapper đặc biệt có chứa các tính năng mà bạn cần vậy,  Bến dưới là một hình minh họa đơn giản để mọi người dễ hình dung về cách hoạt động của decorator.

![Refactoring.Guru](https://images.viblo.asia/b48c2512-2088-424a-a942-6691f2625731.png)

 *Source: Refactoring.Guru*

Bình thường nếu chúng ta không mặc gì cả thì sẽ cảm thấy bị lạnh, mặc một cái len vào thì sẽ không còn thấy lạnh nữa, thêm một cái áo đi mưa thì sẽ không bị ướt nữa. Chúng ta thêm cho bản thân 2 tính năng mới là chống lạnh và chống ướt nhưng cơ thể chúng ta vẫn như vậy. Đó cũng tương tự như cách decorator pattern hoạt động. Còn nếu vẫn cảm thấy khó hiểu thì chúng ta sẽ cùng nhau bước qua phần tiếp theo là một demo đơn giản về cách sử dụng decorator pattern, có input, output thì chắc sẽ dễ hình dung hơn nhỉ :wink:. Let's dive in!

# 2. Demo

## 2.1 Demo background

Ở bài viết lần này mình xin phép đước tiếp tục implement trên nền demo lần trước là một page liệt kê các heroes có trong tựa game Dota 2, cùng với các thuộc tính của từng hero.

Cụ thể hơn thì mình sẽ dùng decorator để thêm icon của từng hero khi được hiển thị trong in-game minimap. Đồng thời là thay vì cho hiển thị thuộc tính sức mạnh của hero theo dạng text thì mình sẽ cho hiển thị theo dạng icon luôn và thêm một cột role cho mỗi hero. Bắt đầu từ những thứ đang giản để chúng ta có thể nắm được cách hoạt động của decorator nhé. Cùng xem qua demo của mình khi chưa implement decorator pattern nhé.


![demo-image-1](https://images.viblo.asia/0061b4ff-74e3-4639-9ccf-8beab5b510fa.png)

Như các bạn có thể thấy ở đây, hiện tại cột Icon, Primary Attribute thì chỉ đang chỉ hiển thị text, còn cột Role thì kiểu hiển thị không được bắt mắt cho lắm, vì ở đây mình đang cho hiển thị raw data nhận được từ OpenDota API chứ chưa xử lý gì cả. Công việc giờ đã rõ ràng quá rồi, chúng ta cùng bắt tay vào áp dụng decorator pattern thôi.

## 2.2 Getting Started

Để có thể sử dụng decorator dễ dàng hơn thì chúng ta sẽ nhờ đến sự trợ giúp của gem draper nhé mọi người. Để tìm hiểu kĩ hơn về gem thì mọi người có thể truy cập [vào đây](https://github.com/drapergem/draper).

Đầu tiên là thêm draper vào Gemfile

```
gem "draper"
```

Sau đó bundle install các thứ để tiến hành cài gem thôi, không có gì đặc biệt. Vậy là giờ chúng ta có thể tiến hành viết decorator cho ứng dụng của mình rồi.

## 2.3 Viết và sử dụng decorator

Khi đã cài đặt gem thành công và đã có model sẵn thì các bạn chỉ cần chạy lệnh dưới để generate file decorator cho chúng ta

```
rails generate decorator {Tên model}
```

còn nếu chưa có gì cả thì khi chạy lệnh generate resource bên dưới cũng sẽ tự động sinh ra decorator cho các bạn luôn

```
rails generate resource {Tên model}
```

Ở ví dụ lần này mình không thực hiện thao tác với Db mà chỉ lấy data từ API về hiển thị thôi nên mình sẽ không tạo decorator theo 2 cách trên mà sẽ tạo ở file *heroes_decorator.rb* ở đường dẫn *apps/decorators/* (nếu chưa có thì các bạn phải tạo nhé). Các decorators được viết đều sẽ được kế thừa từ Draper::Decorator.

![](https://images.viblo.asia/a8d11511-8965-4738-9520-34c3f1df597d.png)

Bây giờ chúng ta có 3 việc phải làm trong decorator này, đó là dựa vào tên của hero để đưa ra icon tương ứng cho mỗi hero, dựa vào primary attribute để đưa ra icon attribute tương ứng và format lại các roles của từng hero để nhìn cho đẹp mắt hơn.

Đây là decorator của mình sau khi đã implement các tính năng nêu trên.

![](https://images.viblo.asia/4a1ce78e-bafb-41b8-9f02-48df8d80a307.png)

Mình xin được giải thích sơ về các hàm mà mình đã implement trong decorator này. Ở đây `object` sẽ là object mình truyền vào decorator này, lát nữa sang controller mọi người sẽ biết được object này là gì.

* Ở hàm `hero_icon`, mình sẽ trả về dạng string có dạng `"d2mh {tên hero}"` để dùng làm class của thẻ  <i>   để hiển thị icon của hero tương ứng với tên hero đó. Về css cho phần icon của hero thì mọi người có thể tìm ở [đây](https://github.com/bontscho/dota2-minimap-hero-sprites) nếu có hứng thú.
    
*  Ở hàm `attr_icon`, mình sẽ kiểm tra xem thuộc tính của hero thuộc loại nào trong 3 loại Strength, Agility, và Intelligence để trả về đường dẫn file minh họa PNG của thuộc tính đó, đường dẫn sẽ được sử dụng trong thẻ <img> để hiển thị icon thuộc tính của hero.
    
* Và cuối cùng hàm `roles` này thì quá đơn giản rồi, chỉ là mình cho downcase hết các tên role trong mảng roles của mỗi hero thôi. Cái này để giúp thuận tiện hơn trong việc lấy và hiển thị icon của mỗi role cho bắt mắt hơn.
   
Vậy là đã xong phần chuẩn bị decorator, chúng ta sẽ áp dụng decorator này vào demo trên nhé. Bên dưới là controller xử lý việc gọi API và lấy dữ liệu hero từ API bên thứ 3.
    
![](https://images.viblo.asia/3c8f4101-d4de-40ab-a37b-a5c31390e78d.png)

Ở controller này thì trước đó mình trả thẳng `@heroes` là dạng data chưa được decorate về cho views để hiển thị luôn. Còn bây giờ thì mình sẽ truyền thằng `@heroes` này vào `HeroesDecorator` để tiến hành decorate nó và cho ra `@heroes_decorated`. Giờ thì các bạn có thể thấy rõ ràng hơn là `object` mà khi nãy chúng ta sử dụng trong decorator chính là thằng `@heroes` mà chúng ta truyền vào ở đây đấy. Ở đây mình dùng decorate_collection là để decorate tất cả các phần tử trong collection mà mình truyền vào. Tham khảo link gem draper cuối bài để tìm hiểu thêm các method khác nhé.
    
> *Lưu ý: Hẳn có nhiều bạn sẽ bị nhầm lẫn là cần phải có 1 model thì mới có thể sử dụng decorator được, nhưng không phải vậy nhé mọi người. Chúng ta cũng có thể sử dụng decorator bằng cách truyền vào nó một object như mình đã làm nữa nha.*

Sau đó trên views mình sẽ lấy thằng `@heroes_decorated` để hiển thị dữ liệu cho người dùng.
   
![](https://images.viblo.asia/e36e07f2-3ab9-42fc-81d1-51ccf21ece55.png)

Trong partial `hero_info` mình sẽ tiến hành cho hiển thị các tính năng mà mình đã "trang trí" bằng decorator bên trên.
    
![](https://images.viblo.asia/f215ac93-c44c-4854-bf75-02619e859dcf.png)

Khi mọi người muốn dùng các thuộc tính có sẵn của object ban đầu thì cứ `.object` và lấy ra thuộc tính đó từ `@heroes_decorated`, đến đây chúng ta có thể dễ dàng thấy là object ban đầu của chúng ta giờ đây đã được bọc trong một object đó là `@heroes_decorated`. Giống như mình đã nói ở đầu bài viết nhé ;). Giờ cùng xem thành quả thôi nào!
   
![](https://images.viblo.asia/b575a57a-417e-42f6-9378-07d53f3dbd97.png)

Vâng, đây là thành quả sau khi đã áp dụng decorator vào demo, khá là bắt mắt hơn rồi phải không nhỉ :D.
    
Đến đây thì cũng đã hoàn thành demo rồi, bên trên mình đã giới thiệu sơ qua cho các bạn về decorator pattern là gì và làm sao để ứng dụng decorator pattern vào một project Ruby on Rails.
    
Bài viết có thể còn nhiều thiếu sót, các bạn đừng ngại góp ý cho mình bằng những comment bên dưới nhé. Bạn đọc nào vẫn còn cảm thấy mơ hồ về bài viết hay có chỗ nào không rõ thì cũng có thể để lại một comment bên dưới, mình sẽ cố gắng support trong khả năng của mình nhé. Cảm ơn các bạn đã theo dõi bài viết, hẹn gặp lại các bạn trong các bài viết sắp tới. Peace!
    
***References:***
    
Bài viết về Adapter Pattern lần trước của mình: https://viblo.asia/p/design-patterns-in-ruby-on-rails-adapter-pattern-XL6lA9y4lek
    
Gem Draper: https://github.com/drapergem/draper
    
OpenDota API: https://docs.opendota.com/
    
Package for Dota 2 Minimap Hero Icon: https://github.com/bontscho/dota2-minimap-hero-sprites