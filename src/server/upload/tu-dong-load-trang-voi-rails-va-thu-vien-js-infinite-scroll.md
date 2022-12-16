## **I. Giới thiệu.**

Trong rails, bạn có thể thực hiện tự động load trang ở trên view khi sử dụng phân trang trong controller với nhiều cách, trong đó phổ biến nhất vẫn là tự viết javascript của mình, bạn có thể tham khảo [tại đây](https://www.sitepoint.com/infinite-scrolling-rails-basics/). Nhưng bài viết này sẽ giới thiệu cho bạn một cách khác, đó là sử dụng thư viện javascript là infinite-scroll, bạn có thể download thư viện đó [tại đây](https://infinite-scroll.com/).

## **II. Cách thực hiện.**

Đầu tiên bạn sẽ tạo 1 ứng dụng rails mới và 1 model là `User` với 1 vài thuộc tính ví dụ như `first_name`, `last_name`, `address` để làm ví dụ.
Các bạn lên trang chủ của thư viện infinite-scroll [tại đây](https://infinite-scroll.com/) để tải thư viện javascript đó về và để và trong folder `app/assets/javascript`, đặt tên file là `infinite-scroll.js`. 

Trong file `application.js` các bạn thêm: `//= require infinite-scroll.js`

Tạo controller mới có tên là `users_controller.rb`:
```
class UsersController < ApplicationController
  def index
    @users = User.order(:name).page(params[:page]).per 20
  end
end
```

Tạo view tương ứng với action index trong controller ở trên, ở đây tôi sẽ sử dụng slim template để code. File `app/views/users/index.slim` trông sẽ như sau:
```
.js-user-feed
  - @users.each do |user|
    .js-user
       .user-name = user.first_name + user.last_name
       .user_address = user.address
  .js-scroller-status
    .infinite-scroll-request.infinite-scroll-request ...
    .infinite-scroll-last End of content
    .infinite-scroll-error No more to load
  .js-pagination
    .js-pagination__next href="#{path_to_next_page @users}"
```

Vẫn chưa xong, bài viết tôi giới thiệu về thư viện trên nhưng không có nghĩa là khi các bạn thêm nguyên cả cái thư viện kia vào project của các bạn và code các class giống như tôi làm trong file `index.slim` là có tự động load trang cho các bạn, đấy chỉ là ví dụ còn các bạn muốn đặt tên class như thế nào là tùy các bạn. Chúng ta còn phải code thêm một đoạn javascript nữa cho việc tự động load trang với systax của infinite-scroll:
```
$(document).on("ready page:load", function(){
  $(".js-user-feed").infiniteScroll({
    path: '.js-pagination__next',
    append: '.js-user',
    status: '.js-scroller-status',
    hideNav: '.js-pagination',
  });
});
```

Đoạn code trên được giải thích như sau:

`$(".js-user-feed").infiniteScroll({.....});`

Đây là ta sẽ thực hiện việc tự động load thêm user ở trong thẻ có class là `js-user-feed` khi chúng ta sử dụng thanh cuộn trên trình duyệt cuộn lên cuộn xuống (scroll up và scroll down).

`path: '.js-pagination__next'`

Trong thẻ có class `js-pagination__next` các bạn để ý tôi để link: `path_to_next_page @users` . Ở đây đó là đường dẫn đến trang tiếp theo của các users được phân trang bằng gem kaminari (cái này các bạn tự thêm). js-infinite-scroll sẽ gọi đến đường dẫn đó và tự động append trang html đó vào bằng đoạn code: `append: '.js-user'` . 

`status: '.js-scroller-status'`

Hãy để ý trong thẻ có class `js-scroller-status` nó bao gồm:

1. `.infinite-scroll-request`: khi bạn cuộn thanh cuộn xuống cuối cùng mỗi trang, js-infinite-scroll sẽ thực hiện việc request lên server để lấy các user ở trang tiếp theo và trên trình duyệt sẽ hiển thị `...`, ý nghĩa của nó là loading, bạn có thể đặt icon, chữ hay cái gì thay cho ý nghĩa của việc loading, tức là đang tải.
2. `.infinite-scroll-last`: Đó là dòng chữ sẽ hiện ra khi bạn cuộn xuống cuối của 1 trang nào đó, ở đây là `End of content`
3. `.infinite-scroll-error`: khi không còn next page của user nữa tức là không thể thực hiện load thêm trang nữa thì ở cuối cùng sẽ hiển thị dòng chữ `No more to load`.

Bây giờ các bạn chỉ việc bật trình duyệt lên chạy thử, với dữ liệu test khoảng 100 users, khi bạn vào `localhost:3000/users` ban đầu bạn sẽ chỉ nhìn thấy 20 user đầu tiên, và khi bạn cuộn thanh cuộn xuống cuối thì các user tiếp theo sẽ tự động load ra. Rất dễ phải không nào.

## **III. Infinite Scroll events**

Bạn có thể thực hiện việc gọi callback cho infinite-scroll giống như callback trong ruby.
1. request: trong quá trình infinite-scroll thực hiện request lên server lấy dữ liệu, bạn có thể làm gì đấy tùy bạn, ví dụ:
     ```
    $(".js-user-feed").on("request.infiniteScroll", function() {
      console.log('requesting server');
    });
    ```
2. load: khi thanh cuộn làm cho request đến server và tải dữ liệu. ví dụ:
    ```
    $(".js-user-feed").on("load.infiniteScroll", function() {
      console.log('loading');
    });
    ```
3. append: được gọi đến sau khi các phần tử được gọi đã được thêm vào trang, hay nói ở ví dụ trên là các user ở trang tiếp theo đã được load ra. ví dụ:
    ```
    $(".js-user-feed").on("append.infiniteScroll", function() {
      console.log('appended');
    });
    ```


Bài viết đến đây là hết, các bạn có thể tham khảo thêm tại trang chủ của thư viện infinite-scroll. Cảm ơn các bạn đã đọc.