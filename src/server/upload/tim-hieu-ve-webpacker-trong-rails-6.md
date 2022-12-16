Bắt đầu từ Rails 6, **Webpacker** chính là  trình biên dịch **JavaScripts** mặc định. Nó có nghĩa là tất cả code **JavaScripts** sẽ được xử lý bởi **Webpacker** thay vì **assets pipeline** hay còn gọi là **Sprockets**. **Webpacker**  khác với **assets pipeline** về cả định nghĩa lần cách triển khai. Trong bài viết này chúng ta sẽ tìm hiểu về cách hoạt động của **Webpacker**.

### 1. Webpacker là gì ?
**Webpacker** là một gem chưa **webpack** (một công cụ khá phổ biến được sử dụng để đóng gói code **JavaScripts** - và cung cấp các helper để người dùng có thể sử dụng các **webpack** trong ứng dụng Rails. Nói một cách đơn giản nó cung cấp cho Rails cách sử dụng **webpack**. Đây là cách đơn giản để định nghĩa một công cụ khá mạnh mẽ, nhưng nó là đủ cho những người đang bắt đầu với Rails.

Khi bạn bắt đầu tạo một project mới với **Rails 6**, bạn sẽ thấy kết quả như sau ở trong console.

![](https://images.viblo.asia/88ba2d3f-8867-4a0f-b4b9-43ad65f32567.png)


Bạn cũng sẽ thấy gem **webpacker** được mặc định thêm vào Gemfile. Câu lệnh ```Rails new``` cũng sẽ tự động cài đặt các hói **npm** thông quá **Yarn**
* Chú ý : Các ứng dụng có version thấp khi nâng cấp lên **Rails 6** sẽ không được cài đặt gem **webpacker**. Vậy nên bạn cần cài đặt gem một cách thủ công, sau đó chạy lệnh ```rails webpacker:install``` .

### 2. Cây thư mục mới cho code JavaScripts
Các phiên bản trước **Rails 6**, tất cả code Javascript phải ở trong thư mục ```app/assets/javascripts```, nhưng trong một ứng dụng **Rails 6** thư mục trên không tồn tại. Thay vào đó, chúng ta có thư mục  ```app/javascripts``` để lưu trữ tất cả các mã JavaScripts của toàn ứng dụng.
Hãy xem qua nội dung của thư mục này trong một ứng dụng **Rails 6** mới được khởi tạo :

![](https://images.viblo.asia/9e8e096f-ad56-4217-91a4-951f2b83aff0.png)

Nó chứa 2 thư mục ```channels``` và ```packs```. Thư mục ```channels```  được tạo ra bởi các **Action Cable** của Rails. Tạm thời chúng ta có thể bỏ qua nó và tập trung vào phần quan trọng nhất ở đây - thư mục ```packs``` - để xem nó chứa những gì nhé:

```
// app/javascript/application.js
require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")
```

### 3. Pack là gì?
**webpack** có một khái niệm về ```entry points```  nó có nghĩa là những files mà nói sẽ tìm đến đầu tiên khi bắt đầu biên dịch code JavaScript của bạn. **webpack** tạo ra một pack ```application``` dưới dạng files ```application.js``` nằm trong thư mục ```app/javascript/packs/``` file này tương đương với file ```app/assets/javascripts/application.js``` của asset pipline.

Vì thế, pack ```application``` chính là entry point cho toàn  bộ có JavaScripts trong ứng dụng của bạn. Chúng ta cũng có thể tạo được pack mới và để trong thư mục ```app/javascript/packs``` và **Webpacker** tự động sẽ tìm đến chúng khi chạy biên dịch.

Tất cả việc này được config sẵn ở file ```config/webpacker.yml```

```
# config/webpacker.yml
5:  source_entry_path: packs
```

Nếu chúng ta muốn webpack tìm tới các thư mục khác để chạy code JavaScript thì chúng ta có thể config setting ```resolved_paths``` ở trong file ```config/webpacker.yml```.  Tệp này khá dễ hiểu về các tùy chọn cấu hình.

### 4. Biên dịch code JavaScripts
Việc biên dịch và chạy code JavaScript ở môi trường Development hoàn toàn được Webpacker và webpack thực hiện hết, bạn không cần phải làm gì hết. Khi chạy server Rails, việc compile được thực hiện ngay trong quá trình request giống như cách Rails làm với asset pipeline.

### 5. Reloading với webpack-dev-server
**Webpacker** sinh ra một file ``bin/webpack-dev-server`` để thực hiện việc reload (live reloading) ở môi trường Development. Để xem cách **webpack** thực hiện việc live reloading và hotswap module thì chúng ta cần phải chạy riêng ``webpack-dev-server`` .

### 6. Webpacker với môi trường Production
Ở Production, **Webpacker** sẽ thêm task ``webpacker:compile`` vào task ``assets:precompile``. Do đó nếu bạn build pipeline bằng cách chạy ``assets:precompile`` thì nó cũng đồng thời compile luôn những file được chỉ định bởi **webpack**. Vì package webpack là 1 phần của ``package.json``, nên **yarn** sẽ tự động install webpack để nó có thể compile code JS.

### 7. Including JavaScript code vào ứng dụng
Chúng ta đã thấy cách biên dịch mã **JavaScript** bằng cách sử dụng **webpacker** nhưng làm thế nào để đưa nó vào ứng dụng?

Để là được vậy, **Webpacker** cung cấp một helper method ```javascript_pack_tag```, nó được sử dụng để include các pack của **webpacker** vào file layout của ứng dụng. Nó tương ứng với ``javascript_link_tag`` ở trong assets pipeline.

```
# app/views/layouts/application.html.erb

<%= javascript_pack_tag 'application', 'data-turbolinks-track': 'reload' %>
```
Method ``javascript_pack_tag`` sẽ đảm bảo việc chỉ định đến đúng file và code cần thiết để compile trên cả môi trường Development lẫn Production giống như asset pipeline.

### 8. Kết luận

Trên đây là một số hiểu biết của mình về **Webpacker**, hy vọng thông qua bài viết này sẽ giúp các bạn có cái nhìn tổng quan về **Webpacker**, qua đó thì có thể sử dụng nó trong các ứng dụng với **Rails 6**. 

### Nguồn tham khảo.
https://prathamesh.tech/2019/08/26/understanding-webpacker-in-rails-6/