IMPORTANT UPDATE (6 July 2017): Với phát hành mới của Rails 5.1, Rails hiện tại có hỗ trợ cho việc sử dụng React thông qua gem webpacker. 

Có một vài các khác nhau để dử dụng React bên trong ứng dụng Ruby on Rails. Trong bài này chúng ta sẽ tìm hiểu 3 cách phổ biến nhất.

**1. react-rails gem (https://github.com/reactjs/react-rails)**

Gem react-rails là cách đơn giản và nhanh nhất để bắt đầu sử dụng React bên trong ứng dụng Rails của bạn.

Nó sử dụng quản lý asset Rails mặc định và tự động chuyển đổi JSX thành asset pipeline bằng cách sử dụng trình biên dịch  Ruby Babel.

Giả sử bạn đã cài đặt một phiên bản của ruby và gem của Rails, khi đó làm thế nào bạn bắt đầu với react-rails.

Thêm gem vào Gemfile của bạn:

> gem 'react-rails'

Cài đặt gem:

> bundle install

Chạy lệnh cài đặt react-rails:

> rails g react:install

Việc này sẽ tạo ra một thư mục thành phần, manifest file và thêm chúng vào file application.js 

Sau đó tạo file component React của bạn với đuôi **.jsx**  và lưu nó trong thư mục **app/assets/javascripts/components**

```
var HelloMessage = React.createClass({
  render: function() {
    return (
      <h1>Hello {this.props.name}!</h1>
    )
  }
});
```

Cuối cùng, sử dụng component trong view của bạn với method helper **react_component**

> <%= react_component('HelloMessage', name: 'John') %>

Phương thức này lấy tên của component như tham số đầu tiên và props bất kì là tham số thứ 2. Nó thêm vào một div với class relevant và props, sau đó được sử dụng bởi react_ujs driver để mount và render component.

Đó là tất cả những gì bạn cần để bắt đầu!

**2. react_on_rails gem (https://github.com/shakacode/react_on_rails)**

Đây là một gem phổ biến khác để tích hợp React trong Rails. Điều khác biệt với react-rails là nó sử dụng EcmaScript 6 (ES6) mặc định và công cụ state-of-the-art JavaScript, bao gồm Webpack, thay vì dựa hoàn toàn vào Rails asset pipepline. Nó cũng không phụ thuộc vào JQuery. 

Thay vì sử dụng Rails asset pipeline để biên dịch ES6, react_on_rails chỉ sử dụng nó để including JS mà Webpack biên dịch.

Bạn có thể sử dụng npm để cài đặt các thư viện JavaScript, thay vì phải sử dụng các gem hoặc tải xuống thủ công và including chúng.

Nó mang lại cho bạn nhiều quyền lợi hơn về chi chí cài đặt và quản lý thêm một vài thứ.

Để bắt đầu, bạn cần cài đặt node để có thể sử dụng npm để cài đặt JavaScript dependencies . Bạn có thể download node trực tiếp từ website của họ hoặc cài đặt nó sử dụng nvm.

Khi note được cài đặt, chúng ta có thể bắt đầu thêm gem vào Gemfile của ứng dụng Rails.

> gem "react_on_rails", "~> 6"

Cài đặt nó bằng cách chạy lệnh:

> bundle

Bây giờ, chúng ta cần commit nó bằng git, nếu không thì script cài đặt của gem không hoạt động.

```
git init
git add -A
git commit -m "Initial commit"
```

Sau đó chạy lệnh sinh của gem để tạo file **package.json** và **Procfile.dev**:

> rails generate react_on_rails:install

Sau đó chạy lại bundle để cài đặt execjs và npm install để cài đặt các phụ thuộc JS:

> bundle && npm install

Sau đó, khởi động máy chủ Rails với foreman:

> foreman start -f Procfile.dev

Chúng ta đang sử dụng foreman để chạy Webpack, ngoài máy chủ Rails.

Bây giờ mọi thứ được thiếp lập, chúng ta có thể tạo và sử dụng các thành phần React.

gem's generator cũng tạo một thư mục clien, đó là nơi mà tất cả  client-side code cần đến.

Một ví dụ Hello World được include dưới thư mục client. Dưới đây là một giải nén đơn giản của mã cho một thành phần hiển thị một tin nhắn Hello với một tên được thông qua như một prop.

```
import React from 'react';

export default class HelloWorld extends React.Component {
  constructor(props, _railsContext) {
    super(props);
  }

  render() {
    return (
      <h1>Hello, {this.props.name}!</h1>
    );
  }
}
```

Chúng ta có thể sử dụng method helper react_component để render component trong view giống với cách chúng ta sử dụng gem react-rails:

> <%= react_component("HelloWorldApp", props: {name: 'John'}) %>

Nếu bạn đã quen thuộc với Webpack và các khái niệm và công cụ JavaScript mới, thì hãy tiếp tục và bắt đầu với react_on_rails. Nếu không, tốt hơn hết là bạn nên tìm hiểu về các khái niệm cốt lõi của React với react-rails  trước và sau đó chuyển sang react_on_rails.

**3. Rails API with a separate frontend React app (Nodejs + Express)**

Tùy chọn thứ ba để sử dụng React with Rails là tách phần backend và frontend thành hai ứng dụng khác nhau.

Phần backend có thể là ứng dụng Rails tiêu chuẩn hiển thị một số API endpoints với đầu ra JSON hoặc nó có thể là ứng dụng chỉ dành cho API Rails. Frontend là một ứng dụng Express chạy trên Nodej, sử dụng React và đàm phán với API Rails.

Rõ ràng, xây dựng, chạy và duy trì hai ứng dụng riêng biệt là nhiều công việc hơn. Nhưng có một số lợi ích.

Tạo một API có thể là một ý tưởng tốt để cho phép bạn xây dựng các ứng dụng khách khác như ứng dụng di động (mặc dù lưu ý rằng bạn cũng có thể sử dụng Rails API với các gem).

Một ứng dụng Node là môi trường tự nhiên cho một thư viện JavaScript như React, vì vậy bạn có thể thấy mình hiệu quả hơn và luôn có quyền truy cập vào công cụ JS mới nhất theo mặc định. Việc hiển thị các thành phần phía máy chủ cũng nhanh hơn.

Nếu bạn làm việc trong một công ty có quy mô vừa với đội ngũ chuyên dụng để phát triển phụ trợ và lối vào, thì việc tách hai cơ sở mã sẽ có ý nghĩa.

Bạn phải đối phó với sự phức tạp của việc chạy hai ứng dụng. Bạn phải thực hiện Chia sẻ tài nguyên nguồn gốc chéo (CORS) hoặc yêu cầu proxy thông qua một máy chủ như nginx.

-----

Cảm ơn bạn đã theo dõi bài viết!

-----


Tham khảo: https://learnetto.com/blog/3-ways-to-use-react-with-ruby-on-rails-5