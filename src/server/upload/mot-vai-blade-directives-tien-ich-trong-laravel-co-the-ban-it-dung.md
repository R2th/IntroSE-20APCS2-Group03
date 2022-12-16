Laravel cung cấp cho chúng ta khá nhiều cú pháp rút gọn để chúng ta có thể sử dụng trong các file view một các tiện lợi, linh hoạt để hiển thị giao diện đối với các điều kiện thỏa mãn khác nhau, được gọi là *Blade directives*. Ở bài viết này mình sẽ đi vào các *Blade directives* rất hữu dụng mà có thể chúng ta ít dùng. Nếu bạn là một beginner với Laravel, những tips này có thể giúp bạn khám phá những điều tuyệt của Blade - một template engine của Laravel.

![](https://images.viblo.asia/da0b3915-953c-4cea-ab9a-a5a9e4217df0.JPG)

## Kiểm tra liệu user đã được xác thực vào hệ thống hay chưa (user loggin thành công chưa)
Khi kiểm tra xem người dùng có được xác thực hay không, bạn có thể kiểm tra giá trị trả ra khi lấy authenticated user có null hay không:
```
@if(auth()->user())
    // The user is authenticated.
@endif
```

Tuy nhiên, Laravel có cung cấp một Blade directive rõ ràng để giúp chúng ta kiểm tra trong trường hợp nêu trên:

```
@auth
    // The user is authenticated.
@endauth
```
## Kiểm tra xem người dùng có phải là khách hay không
Ngược lại với việc kiểm tra user đã được xác thực chưa, chúng ta có thể kiểm tra xem người dùng có phải là khách hay không:
```
@if(auth()->guest())
    // The user is not authenticated.
@endif
```
Tuy nhiên Laravel cũng cung cấp* @guest* directive cho chúng ta
```
@guest
    // The user is not authenticated.
@endguest
```
Chúng ta cũng có thể kết hợp hai *directives* này bằng cách sử dụng câu lệnh *else*:
```
@guest
    // The user is not authenticated.
@else
    // The user is authenticated.
@endguest
```
## include file view nếu tồn tại, nếu không include file default
Xây dựng một trang web có nhiều theme, nhiều khi chúng ta cần phải include file view nào đó nếu chúng tồn tại, còn không thì dùng một file default. Bạn có thể dễ dàng đạt được điều này với các blade đơn giản:
```
@if(view()->exists('first-view-name'))
    @include('first-view-name')
@else
    @include('second-view-name')
@endif
```
Có một directive ngắn hơn và gọn gàng hơn để chúng ta có thể include file view được tìm thấy đầu tiên, điều kiện này giống điều kiện trên nhưng chúng ta có thể thấy nó gọn gàng hơn rất nhiều:
```
@includeFirst(['first-view-name', 'second-view-name']);
```
## Include file view dựa theo điều kiện
Người dùng sẽ nhìn thấy giao diện ở các điều kiện khác nhau, tùy mỗi điều kiện bạn có thể add thêm content cho phần hiển thị, ví dụ một bài viết nếu có comment thì hiện, không thì thôi chẳng hạn:
```
@if($post->hasComments())
    @include('posts.comments')
@endif
```
Thay vì với cách trên, bạn có thể viết ngắn gọn như sau:
```
@includeWhen($post->hasComments(), 'posts.comments');
```
## Include file view nếu nó tồn tại
Như thường lệ có thể bạn sẽ dùng cách này:
```
@if(view()->exists('view-name'))
    @include('view-name')
@endif
```
Thay vì cú pháp đó, bạn có thể nghĩ tới *includeIf* ngắn gọn hơn:
```
@includeIf('view-name')
```

Trên đây là những blade directives tiện dụng mà bạn có thể sẽ nên sử dụng để những dòng code của mình trở nên ngắn gọn mà mạch lạc hơn. Đó là những directives mà Laravel cung cấp. Vậy có bao giờ bạn nghĩ tới việc sẽ tự tạo ra những directives như vậy để có thể sử dụng dễ dàng ngắn gọn trong những file view? Ở bài viết tới mình sẽ viết một vài ví dụ đơn giản về việc custom Blade directives. Nếu bạn quan tâm thì ở tháng tới bạn có thể ghé qua profile của mình để tham khảo nhé :D
## Reference:
https://laravel-news.com/five-useful-laravel-blade-directives