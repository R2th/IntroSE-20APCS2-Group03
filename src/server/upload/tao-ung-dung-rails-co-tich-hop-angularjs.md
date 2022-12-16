# Getting started with AngularJS and Rails
## Giới thiệu
AngularJS là 1 framework của JavaScript, cho phép bạn nhanh chóng và dễ dàng tạo 1 ứng dụng web và đặc biệt là các SPA. Trong bài viết này sẽ hướng dẫn các bạn cách tích hợp AngularJS với ứng dụng Rails. Đầu tiên, chúng ta sẽ xây dựng 1 ứng dụng AngularJS đơn giản có tên là VistorsCenter. Ứng dụng cho phép người dùng theo dõi khách truy cập đến và đi từ 1 tòa nhà, ví dụ như 1 văn phòng. Bây giờ chúng ta sẽ bắt tay vào xây dựng :grinning:
## Thiết lập ứng dụng rails
* Trước khi bắt đầu chúng ta cần thêm gem vào Gemfile. Gem *angularJs-rails* tích hợp framework AngularJs với ứng dụng Rails của bạn, gem *bootstrap-sass* chỉ thêm để hỗ trợ bootstrap do đó chúng ta có thể tập trung vào code thay vì style của app.
Sau khi thêm gem vào Gemfile chạy *bundle install*
* Tiếp đến, chúng ta cần tạo model có tên là **Visitor**. Model này sẽ đại diện cho 1 khách truy cập đang truy cập. Chạy dòng lệnh dưới đây để tạo model.
> rails g model Visitor first_name:string last_name:string reason:string
> rails db:migrate
* Tiếp đến chúng ta sẽ tạo controller Visitors, sẽ đưa ra cách chúng ta tương tác với model. Chúng ta sẽ tạo 3 action trong ví dụ này. Chạy dòng lệnh sau để tạo Controller
> rails g controller Visitors index create destroy
* Bây giờ chúng ta sẽ sửa file routes.rb để thiết lập các đường dẫn như sau:
![](https://images.viblo.asia/708181a2-5e86-4a77-ae67-9b1e17399748.png)
Đoạn mã *defaults: {format: json}* cho Rails biết rằng chúng ta muốn trả về json mặc định cho các actions của chúng ta. Chúng ta làm điều này bởi hầu hết các tương tác trong ứng dụng sẽ sử dụng thông qua JSON.
* Mặc định AngularJs không biết sự bảo vệ CSRF trong ứng dụng. Chúng ta cần 1 cách để AngularJs biết tương tác với ứng dụng trong khi tuân theo các bảo vệ CSRF mà chúng ta có. May thay chúng ta có cách để làm điều này. Mở ApplicationCotroller của bạn và thêm đoạn mã dưới đây vào
    * Nếu bạn sử dụng Rails 4.2 trở lên thì sử dụng đoạn code sau:

![](https://images.viblo.asia/a47f9f00-c899-4326-95c9-e63add569da1.png)
    * Nếu bạn vẫn sử dụng Rails 4.1. sử dụng đoạn code sau:

![](https://images.viblo.asia/0e185a71-534a-4aee-ae73-01c3a999ae7f.png)
* Code được liệt kê ở trên tạo 1 cookie có tên là XSRF-TOKEN có chứa form_authenticity_token. Bất cứ khi nào 1 yêu cầu được thực hiện AngularJs sẽ trình bày mã thông báo đó trong các headers HTTP cho các yêu cầu.
* Bây giờ chúng ta cùng sửa đổi VisitorsController để cho phép truy cập vào model Vistors. Mở VistorController để sửa đổi nó giống như hình dưới đây:
![](https://images.viblo.asia/8f28d3ca-091e-47b6-ada3-13c1a7f627d5.png)
* Đoạn mã trên là đoạn mã điển hình của Rails, ngoại trừ việc chúng ta trả về  kết quả là JSON. Vì ứng dụng của chúng ta giao tiếp chủ yếu thông qua AJAX, chúng ta không cần HTML khác với action index, nó sẽ trả về html hoặc json tùy theo yêu cầu.
* Tiếp theo, chúng ta cần thêm hỗ trợ cho cả AngularJs và Bootstrap vào file application.js, mở file và sửa đổi giống như file dưới đây:
![](https://images.viblo.asia/a0d1e4da-a084-47ea-a129-c4767f819c4e.png)
* Trong đoạn code trên, chúng ta đã thêm hỗ trợ cho AngularJS cũng như Bootstrap. Chúng ta cũng sử dụng thêm thư viện để hỗ trợ gọi là angular-resource cái cho phép chúng ta dễ dàng tương tác với ứng dụng Rails.
* Bây giờ chúng ta thêm CSS cho bootstrap. Tạo 1 file có thên là bootstrap_config.scss và thêm code sau vào file:

![](https://images.viblo.asia/fa522246-de21-4f09-9c58-a336c1ee005f.png)
* Điều tiếp theo chúng ta cần làm là tạo ứng dụng AngularJs của chúng ta. Các ứng dụng AngularJs thường bao gồm mã JavaScript kết hợp các bit khác nhau của HTML. Để bắt đầu làm việc này, điều đầu tiên chúng ta cần làm là đổi tên tệp visitor.js.coffee thành visitor.js và sửa đổi nó để trông giống đoạn code dưới đây. Bạn cũng có thể viết lại trong CoffeeScript, nhưng tôi sử dụng JavaScript cho những người chưa học CoffeeScript.

![](https://images.viblo.asia/e1d68006-9ed5-4a09-85a2-6064167112f6.png)
* Có rất nhiều hoạt động diễn ra trong file này, chúng ta sẽ phân tích từng phần hoạt động của nó.
* Dòng đầu tiên,
> var visitorCenter = angular.module('VisitorCenter', ['ngResource']);
Định nghĩa 1 module AngularJS. Các module AngularJS có thể  được coi là các thành phần riêng lẻ trong ứng dụng của bạn. Bạn sẽ nhận thấy chúng tôi bao gồm *ngResource* như là 1 đối số. ngResource cung cấp quyền truy cập dễ dàng vào các tài nguyên RESTful như là ứng dụng của chúng ta.
* Những dòng tiếp theo,

![](https://images.viblo.asia/80b79404-2bb7-42df-87ae-fb32a810405c.png)

Định nghĩa 1 dịch vụ, trong trường hợp này, nó liên kết dịch vụ ngResource được đề cập trước đó và nói với AngularJS các giao tiếp với ứng dụng Rails của chúng ta.
* Những dòng tiếp, 

![](https://images.viblo.asia/dd9c1be9-f6a3-4ec9-8256-0e6d525dcf64.png)

định nghĩa 1 controller. Controllers nói với AngularJS làm thế nào để tương tác với ứng dụng của chúng ta tương tự như là controller Rails được sử dụng để nói với Rails làm thế nào để View tương tác được với Model.
* Bây giờ chúng ta sẽ viết ứng dụng Javascript, chúng ta cần tạo ra 1 view để liên kết mọi thứ với nhau. Mở chế độ xem của Visitors controller và sửa đổi nó giống như dưới đây:

![](https://images.viblo.asia/8a6eb94d-05c7-4671-b561-6426390526ed.png)
![](https://images.viblo.asia/73ddbc5d-8401-45ef-8846-54439c1237d6.png)

* div bên ngoài trên dòng đầu tiên có thuộc tính được gọi là *ng-app*.Thuộc tính này cho AngularJS biết rằng đây là 1 phần của ứng dụng AngualrJS của chúng ta. Trong trường hợp này chúng ta chỉ định tên của module AngularJS, VisitorCenter.
* Trong div tiếp theo có thuộc tính là ng-controller. Thuộc tính này nói AngularJS rằng chúng ta muốn sử dụng VisitorsController là 1 bộ điều khiển cho phần này của ứng dụng.
* Thuộc tính ng-submit trong form cho AngularJS biết chúng ta muốn sử dụng method addVisitor() trong controller để sử lý form request. Mỗi 1 phần từ input chứa 1 thuộc tính ng-model. Thuộc tính này sẽ nối các phần tử input trong model của chúng ta.
* Thuộc tính *ng-show* trong hàng đầu tiên nói AngularJS rằng chúng ta chỉ muốn show nếu điều kiện yêu cầu thỏa mãn. Trong trường hợp nà là hiển thị hàng đầu tiên nếu không có vistor
* Thuộc tính *ng-repeat* là 1 vòng lặp. Vòng lặp đặc biệt này cho AngularJS biết chúng ta muốn lặp qua từng visitor.
    * Đoạn text được bao trong {{...}} là 1 biểu thức trong AngularJS. Trong trường hợp này là AngularJS render ra các trường được đề cập trong mỗi biểu thức.
* Button *ng-click* yêu cầu AngularJS chạy chức năng điều khiển được chỉ định khi thẻ html được nhấp vào. Trong trường hợp này dùng để xóa người dùng được chỉ định.
Trên đây là giới thiệu và AngularJS và Rails. Cảm ơn các bạn đã đọc!

**Nguồn tham khảo:**
* **AngularJS HomePage:** [https://angularjs.org/](https://angularjs.org/)
* **AngularJS Rails Gem Homepage:** [https://github.com/hiravgandhi/angularjs-rails](https://github.com/hiravgandhi/angularjs-rails)

**Nguồn bài viết:**
[https://richonrails.com/articles/getting-started-with-angularjs-and-rails](https://richonrails.com/articles/getting-started-with-angularjs-and-rails)