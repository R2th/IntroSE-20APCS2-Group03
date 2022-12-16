Một tiêu đề khá hài hước nhưng có lẽ bây giờ là thời để chúng ta thay đổi. Thường thì khi chúng ta bắt đầu một điều gì đó thì chúng ta thường tỏ ra khó khăn và bối rối về những điều chúng ta cần làm và chúng ta nên bắt đầu từ đâu. Nhưng bây giờ  có lẽ bạn sẽ enjoy nó hơn nhiều so với trước đây.

Với ý kiến của cá nhân mình thì front-end là một điều gì đó khá khó để có thể làm cho nó rõ ràng, kiểu như nó là một thứ rất là rối rắm, và để có thể integrating nó với back-end thì với mình đó là một điều gì đó kì diệu nếu như bạn không gặp bất cứ một lỗi nào hay không có lỗi nào làm bạn phát điên khi xử lý nó. Và khi Node xuất hiện, thì có vẻ như mọi thứ đang bắt đầu được đơn giản hóa, một xu hướng mới được tạo ra đó là "Code Backend bằng JS". Và khi Angular xuất hiện , developer bắt đầu sử dụng nó mọi nơi và cho mọi thứ mà họ nghĩ rằng có thể sử dụng được. Và tiếp theo đó những React, Flux/Redux, cứ thế nối theo để giúp cho mọi thứ được dễ dàng hơn. 

Vậy tại sao rất nhiều người trong chúng ta lại thích sử dụng Rails? Bởi vì cái cách Rails hoạt động! Chúng ta có raats nhiều cách để hoàn thành 1 task, không hề gò bó, không ai bắt bạn phải làm theo 1 cách nhất định nào cả, cảm giác như chúng ta được "Think out side the box" vậy. Nhưng trong thế giới của JS, thì mọi thứ không hẳn là như vậy ít nhất là cho đến bây giờ.

Công việc của mình sử dụng chính là Rails, mình cũng được tiếp cận rất nhiều với Angular hay React kết hợp cùng với nó nhưng các project của mình đều base theo Rails Asset Pipeline và đó là một điều mang đến nhiều câu hỏi từ những developer mới về cách thức hoạt động của nó, và vô vàn câu hỏi vì sao?

Trong hội thảo mới đây nhất của Railsclub, sau khi [Zach Briggs diễn thuyết](https://www.youtube.com/watch?v=3cL1IKjbOus) và họ đã dành thời gian nói chuyện rất nhiều để tìm cách giải quyết một số vấn đề về giao diện người dùng và đó là một "nỗi đau" cho tất cả mọi người, và đòi hỏi chúng ta phải tìm ra một lối đi mới. Bài phát biểu về Vue.js đã khuyến khích "cho JS một cơ hội nữa". Và tôi đã quyết định cho JS một cơ hội nữa.

## Vue JS là gì?
Vue.js là một framework, nó đã trở nên rất phổ biến khi hoạt động trong Larevel (một php-clone của Rails). Jquery đã được ticket hợp trong Rails tại một số thời điểm, và Laravel đã bắt đầu sử dụng Vue. Có lẽ đó không phải là trend thời điểm hiện tại nhưng nó cứ âm thầm phát triển ngày qua ngày.

Một trong những điểm tuyệt vời đó là phần engine cho page rendering/rendering đã được thực hiện nhờ đội ngũ phát triển React engine, nhưng Vue không chỉ dừng lại ở đó, mà họ còn đáp ứng một cách tuyệt vời về tốc độ lẫn performance

Nhưng trên hết đó là một thực tế (và đó cũng chính là lý do tại sao mình đã thực sự cho JS một cơ hội), rằng nó tích hợp cho phép bạn có thể thay đổi front end từng li từng tí một. Nếu bạn muốn thêm một chút tương tác vào trang, bạn có thể chỉ sử dụng một ứng dụng Vue tại một vị trí cụ thể. Nếu bạn cần sử dụng một thành phần, bạn có thể tìm đc chúng và không nhất thất sử dụng SPA cho toàn bộ hệ thống của bạn. 

## rails/webpacker
Mình không biết các bạn mong chờ điều gì trong bản release Rails 5.1, nhưng với mình ít nhất là hy vọng có sự thay đổi về cấu trúc của front end. Đó cũng là điều mà các nhà phát triển đã hứa trước đó. Và họ đã làm mình không thất vọng với việc ra mắt gem Webpacker, với Webpacker nó sẽ giải quyết cho bạn rất nhiều, các câu hỏi mà mọi người đặt ra về việc integrate frontend vào Rails app. Tất cả các file sẽ được sắp xếp với default configurations, batch managers, và mọi thứ mà bạn thường xuyên làm một cách rất thủ công.

## Hãy cùng mình thử trải nghiệm một chút nhé!
Điều mình mong muốn đem lại sau bài viết này là những điều cơ bản đầu tiên về Vue và sự kết hợp của nó với Rails, và trong tương lai mình sẽ cố gắng đem đến một series về nó để mọi người có cái nhìn trực quan hơn về bộ đôi này. Và bây giờ không là lúc để "chém gió" nữa chúng ta hãy cùng bắt tay vào công việc nào. Mình đặt ra một ví dụ về một app mà mình dùng mỗi khi mình đi xem phim. Đó là Cinema Ticket Booking. Let's start
```
rails new cinematronix
```

### Setup
Điều đầu tiên là chúng ta sẽ thêm những gem cần thiết. Bận cần cho thêm Webpack vào để sử dụng frontend và Foreman để bắt đầu một vài process trong một vài chức năng trong app.

```
# Gemfile
gem 'webpacker'
gem 'foreman'
```

```
bundle install
```

Sau khi cài đặt Gem, chúng ta có rất nhiều command mới được tích hợp sẵn 

```
$ bin/rails webpacker:install
$ bin/rails webpacker:install:vue
$ bin/yarn install
```

Command đầu tiên là để setup front end. Đơn giản các bạn chỉ cần hiểu về câu lệnh đầu tiên như vậy, vì mình nghĩ rằng phần này cũng k cần thiết phải giải thích sâu về nó/ Comand thứ 2 để generates template, settings, và tường là để install Vue.js. Tất cả những thứ này rất đơn giản chỉ trong một dòng

Và câu lệnh cuối cùng là dùng để install những phần cần thiến của npm-packages, thứ mà defined package.json ở root folder


## Vue app
Khi bạn đã setp xong, thì chúng ta vào trong folder javascript trong thư mục gốc=. Vậy là bây giờ frontend không phải là 1 loại assets hay 1 thứ tương tự như vậy, minh đã thay đổi 1 chút default code, nhưng nó cũng rất giống so với code ban đầu. Như bạn có thể thấy bình thường natively thì chúng ta sẽ có một file application.js. Đoạn code tương tự nhưng chúng ta sẽ viết vào phía dưới đó là hello_vue.js

Webpacker cho phép chúng ta có thể create một số packs. Và mình chắc chắn rằng nó rất thuận tiện khi bạn có một vài frontend - apps trong project của mình. Nhưng ngày hôm nay chúng ta sẽ làm nhiều điều hơn là chỉ copy code ở application.js và delete all "hello" mentions

```
// app/javascript/packs/application.js

import Vue from 'vue'
import App from '../components/app.vue'

document.addEventListener('DOMContentLoaded', () => {
  document.body.appendChild(document.createElement('app'))
  const app = new Vue({
    el: 'app',
    template: '<App/>',
    components: { App }
  })

  console.log(app)
})
```

Mình sẽ giải thích ngắn gọn về đoạn code này: nó đợi cho cây DOM tải và sau đó bắt đầu khởi tạo một ứng dụng Vue. Nó hoạt động giống như jQuery, ready (), nhưng không có jQuery. Đường dẫn đến Vue cũng có một chút thay đổi. Vue là một component framework, do đó bạn nên đặt các t hành phần vào thư mục con có cùng tên. Ngoài ra, mình cũng có config thêm một chút trong component

```
// app/javascript/components/app.vue

<template>
  <div id='app'>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        message: "Welcome to Cinematronix!"
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }
</style>
```

Đó là những gì cơ bản của Vue-component. Nó bao gồm các template, một số logic và style gắn liền với các template cụ thể. Cũng khá đơn giản đúng không mọi người? 

### Backend
All right! Bây giờ hãy thêm javascript_pack_tag vào layout. Đây là một helper mới từ Webpacker lấy tệp được chỉ ra từ thư mục `app /javascript/packs` và sau đó tạo một ứng dụng bằng cách sử dụng các đường dẫn bên trong entry-point

```
# app/views/layouts/application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <title>Cinematronix</title>
    <%= csrf_meta_tags %>

    <%= stylesheet_link_tag 'application', media: 'all' %>
    <%= javascript_pack_tag 'application' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

Nhưng chúng ta không có default controller, nên chúng ta cần phải tạo thêm controller

```
bin/rails g controller Landing index
```

```
# config/routes.rb
root to: 'landing#index'
```

Và điều cuối cùng là xóa tất cả mọi thứ từ Vue `app/views/landing/index.html.erb`

## 3..2..1.. Here we go!

Mình đã nhắc đến đầu bài viết rằng chúng ta sẽ sử dụng Foreman để bắt đầu một số quá trình trong terminal. Tất nhiên là chúng ta có thể bắt đầu bằng Rails-server trong một tab và trình biên dịch frontend ở một tab khác, nhưng như vậy nó không thuận tiện. Nhân tiện, Webpacker đươc trang bị máy chủ webpack-dev-server đặc biệt để biên dịch ứng dụng ngay và tải lại ngay trong trình duyệt của bạn.

```
# Procfile
backend: bin/rails s -p 3000
frontend: bin/webpack-dev-server
```
Assets sẽ được download đến một máy chủ khác, mặc định là localhost:8080. Do đó chúng ta cần phải thiết lập ở trong development environment

```
# config/environments/development.rb
Rails.application.configure do
  # Make javascript_pack_tag load assets from webpack-dev-server.
  config.x.webpacker[:dev_server_host] = 'http://localhost:8080'
  ...
end
```

Và chúng ta sẽ cùng nhau chạy nó

```
$ foreman start
```

### Tổng kết

Vậy là chúng ta đã có thể kết hợp Rails với một Vue app một cách rất đơn giản, không đau đầu, không cần npm, không cần Yarn hợp thời, không cần phải viết package.json, không transpliers và các phiên bản kèm theo, và không cần đến ES5/ES6

Trên đây là một bài viết rất cơ bản giới thiệu cho các bạn về Vue JS từ bước ban đầu, tại sao nó tốt, tại sao bạn cần nó? Và giới thiệu về webpacker của Rails 5.1 cùng sự kết hợp của nó với Vue. Trong bài viết tới mình sẽ cố gắng viết về một series sử dụng Vue kết hợp với Rails để có thể tạo ra một app đơn giản. Hy vọng bài viết này sẽ giúp ích được cho các bạn trong những bước ban đầu làm quen với Vue nói riêng và Rails/Webpacker nói chung. 

p.s: Nếu thấy hay hãy Upvote và Subcribe mình nhé! ^^