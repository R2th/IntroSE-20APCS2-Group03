# I. Giới thiệu
AngularJS là 1 thư viện javascript cực kì phổ biến, cho phép bạn nhanh chóng và dễ dàng để tạo ra các trang web, ứng dụng web phong phú. Trong bài viết này tôi sẽ chỉ cho bạn cách tích hợp AngularJS vào ứng dụng Rails của bạn. Tôi sẽ xây dựng 1 ứng dụng AngularJS đơn giản gọi là VisitorsCenter. Ứng dụng VisitorsCenter cho phép người dùng theo dõi khách truy cập khách đến và đi từ tòa nhà giống như là tòa nhà văn phòng. Hãy cùng bắt đầu.
# II. Cài đặt môi trường trong ứng dụng rails
Trước khu chúng ta bắt đầu, chúng ta phải thêm một vài thư viện vào trong Gemfile. Gem angularJs-rails tích hợp thư viện AngularJS vào ứng dụng rails. Gem bootstrap-sass chỉ bổ sung hỗ trợ bootstrap để chúng ta có thể tập trung vào mã code chứ không phải là giao diện của ứng dụng. Thêm những gem này vào trong tệp `Gemfile`
```ruby
gem 'angularjs-rails', '~> 1.2.25'
gem 'bootstrap-sass', '~> 3.2.0.2'
```
Và sau đó chạy bundle install để cài đặt các gem.
Tiếp đó, chúng ta cần tạo một model gọi là Visitor trong ứng dụng. Model này sẽ đại diện cho khách truy cập vào văn phòng. Chạy lệnh như dưới đây để tạo ra model Visitor:
```ruby
rails g model Visitor first_name:string last_name:string reason:string
rake db:migrate
```
Tuyệt vời, bây giờ chúng ta hãy tạo VisitorsController để tương tác với model Visitor. VisitorsController sẽ có 3 action trong ví dụ này. Action đầu tiên, `index` sẽ trả lại trang liệt kê danh sách lượng Visitor truy cập. Action thứ 2 là `create` có trách nhiệm tạo ra một Visitor. Action thứ 3 là `destroy` sẽ xóa đi 1 Visitor. Chạy lệnh sau để tạo ra VisitorsController:
```rub
rails g controller Visitors index create destroy
```
Bây giờ hãy chỉnh sửa file `routes.rb` để cài đặt đường dẫn và root url cho ứng dụng.
```ruby
Rails.application.routes.draw do
  resources :visitors, only: [:index, :create, :destroy], defaults: {format: :json}
  root to: "visitors#index"
end
```
Đoạn mã` defaults: {format: :json}` nói với Rails rằng chúng ta muốn trả về json mặc định cho các action trong controller. Chúng ta làm điều này vì hầu hết các tương tác trong ứng dụng của chúng ta đều thông qua JSON. Theo mặc định, AngularJS không biết gì về CSRF trong ứng dụng của chúng ta. Chúng ta cần một cách để nói với Angular rằng làm thế nào để tương tác với Rails thông qua các bảo vệ CSRF. May mắn thay chúng ta có 1 cách để làm điều đó. Mở `ApplicationController` và thêm vào đoạn mã sau:
```ruby
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  after_action :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

protected

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
```
Mã trên sẽ tạo ra một cookie gọi là XSRF-TOKEN sẽ chứa form_authenticity_token. Bất cứ lúc nào yêu cầu được thực hiện, AngularJS sẽ chuẩn bị token ở trong HTTP header cho yêu cầu. Bây giờ hãy sửa VisitorsController để truy cập vào model Visitor
```ruby
class VisitorsController < ApplicationController
  respond_to :json
  def index
    respond_to do |format|
      format.json { render json: Visitor.all }
      format.html
    end
  end

  def create
    respond_with Visitor.create(visitor_params)
  end

  def destroy
    respond_with Visitor.destroy(params[:id])
  end

private
  def visitor_params
    params.require(:visitor).permit(:first_name, :last_name, :reason)
  end
end
```
Đoạn code phía trên là điển hình của Rails, với ngoại lệ là chúng ta sẽ trả về JSON. Kể từ đây ứng dụng của chúng ta sẽ giao tiếp chủ yếu thông qua AJAX, chúng ta không cần HTML khác cho action index, mà sẽ trả lại html hoặc json tùy theo yêu cầu. Tiếp theo chúng ta cần thêm hỗ trợ cho cả AngularJS và Bootstrap vào tệp application.js. Mở tệp application.js và sửa đổi nó như sau:
```
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require angular
//= require angular-resource
//= require bootstrap-sprockets
//= require_tree .
```
Trong đoãn mã trên, chúng ta đã thêm hỗ trợ AngularJS cũng như Boostrap cho ứng dụng. Chúng ta cần thêm hỗ trợ nữa gọi là angular-resource cho phép chúng ta dễ dàng thao tác với Rails. Bây giờ hãy thêm css cho bootstrap. Tạo một tệp mới có tên là `bootstrap_config.scss` và sửa nó như sau:
```ruby
@import "bootstrap-sprockets";
@import "bootstrap";
```
Điều tiếp theo chúng ta cần làm là tạo ra ứng dụng AngularJS. Các ứng dụng AngularJS thường bao gồm cả mã Javascript kết hợp với HTML. Để bắt đầu làm điều này, điều đầu tiên chúng ta cần làm là đổi tên tệp `visitor.js.coffee` thành `visitor.js` và sửa đổi nó trông giống như dưới đây. Bạn cũng có thể viết lại trong CoffeeScript, nhưng tôi sẽ dùng JavaScript cho những người chưa biết về CoffeeScript.
```ruby
var visitorCenter = angular.module('VisitorCenter', ['ngResource']);

visitorCenter.factory("Visitor", function($resource) {
  return $resource("visitors/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
})

visitorCenter.controller("visitorsController", function($scope, Visitor) {
  $scope.visitors = Visitor.index()

  $scope.addVisitor = function() {
    visitor = Visitor.save($scope.newVisitor)

    $scope.visitors.push(visitor)
    $scope.newVisitor = {}
  }

  $scope.deleteVisitor = function(index) {

    visitor = $scope.visitors[index]
    Visitor.delete(visitor)
    $scope.visitors.splice(index, 1);
  }
})
```
Có rất nhiều thứ cần tìm hiểu trong đoạn mã trên, vì vậy tôi sẽ chia chúng ra thành nhiều phần và giải thích chúng, dòng đầu tiên:
```ruby
var visitorCenter = angular.module('VisitorCenter', ['ngResource']);
```
Định nghĩa một module AngularJS. Các module AngularJS có thể được coi là các thành phần riêng lẻ trong ứng dụng của bạn. Bạn sẽ nhận thấy tôi bao gồm ngResource như một đối số. `ngResource` để truy cập dễ dàng vào các RESTful resource như ứng dụng Rails. Các dòng tiếp theo:
```ruby
visitorCenter.factory("Visitor", function($resource) {
  return $resource("visitors/:id", { id: '@id' }, {
    index:   { method: 'GET', isArray: true, responseType: 'json' },
    update:  { method: 'PUT', responseType: 'json' }
  });
})
```
Định nghĩa một service, trong trường hợp này, nó liên kết trong ng-Resource service đã được nói trước đó và bảo AngularJS giao tiếp với ứng dụng của chúng ta như thế nào. Các dòng tiếp theo:
```ruby
visitorCenter.controller("visitorsController", function($scope, Visitor) {
  $scope.visitors = Visitor.index()

  $scope.addVisitor = function() {
    visitor = Visitor.save($scope.newVisitor)

    $scope.visitors.push(visitor)
    $scope.newVisitor = {}
  }

  $scope.deleteVisitor = function(index) {

    visitor = $scope.visitors[index]
    Visitor.delete(visitor)
    $scope.visitors.splice(index, 1);
  }
})
```
Định nghĩa một controller. Controller bảo AngularJS làm thế nào để tương tác với ứng dụng Rails của chúng ta tương tự như các controller của Rails được sử dụng để nói với rails cách các views được tương tác với models. Bây giờ chúng ta đã viết ứng dụng Javascript, chúng ta cần tạo view để mọi thứ có thể kết hợp với nhau. Mở `index` view cho VisitorController và sửa nó như sau:
```ruby
<div class="container" ng-app="VisitorCenter">
  <h1>Visitors</h1>

  <div ng-controller="visitorsController">
    <div class="well">
      <h3>Add a new Visitor</h3>
      <form ng-submit="addVisitor()">
        <div class="row">
          <div class="col-xs-6">
            <input type="text" ng-model="newVisitor.first_name" class="form-control" placeholder="First Name" />
          </div>
          <div class="col-xs-6">
            <input type="text" ng-model="newVisitor.last_name" class="form-control" placeholder="Last Name" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <br />
            <input type="text" ng-model="newVisitor.reason" class="form-control" placeholder="Reason for Visit" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 text-center">
            <br />
            <input type="Submit" value="Add Visitor" class="btn btn-primary" />
          </div>
        </div>
      </form>
    </div>

    <h3>Currently Visiting</h3>
    <hr />
    <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Reason for Visit</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody>
        <tr ng-show="!visitors.length">
          <td colspan="4">No visitors in the building.</td>
        </tr>
        <tr ng-repeat="visitor in visitors">
          <td>{{ visitor.first_name }}</td>
          <td>{{ visitor.last_name }}</td>
          <td>{{ visitor.reason }}</td>
          <td><a class="btn btn-danger" ng-click="deleteVisitor($index)">Remove</a></td>
        </tr>
      </tbody>
    </table>

  </div>
</div>
```
Đoạn mã như dưới đây:
```ruby
<div class="container" ng-app="VisitorCenter">
...
</div>
```
Các div bên ngoài trên dòng đầu tiên có 1 thuộc tính gọi là ng-app. Thuộc tính ng-app cho Angular biết đây là 1 phần của ứng dụng AngularJS của chúng ta. Trong trường hợp này chúng ta định tên cuả module AngularJS, VisitorCenter.
```ruby
<div ng-controller="visitorsController">
...
</div>
```
Div bên dòng tiếp theo chứa 1 thuộc tính gọi là ng-controller. Thuộc tính này cho AngularJS biết rằng chúng ta muốn sử dụng VisitorsController làm controller cho phần này của ứng dụng
```ruby
<form ng-submit="addVisitor()">
    <div class="row">
     <div class="col-xs-6">
       <input type="text" ng-model="newVisitor.first_name" class="form-control" placeholder="First Name" />
     </div>
     <div class="col-xs-6">
       <input type="text" ng-model="newVisitor.last_name" class="form-control" placeholder="Last Name" />
     </div>
    </div>
    <div class="row">
     <div class="col-xs-12">
       <br />
       <input type="text" ng-model="newVisitor.reason" class="form-control" placeholder="Reason for Visit" />
     </div>
    </div>
    <div class="row">
     <div class="col-xs-12 text-center">
       <br />
       <input type="Submit" value="Add Visitor" class="btn btn-primary" />
     </div>
    </div>
</form>
```
Thuộc tính ng-submit trên form của chúng ta cho Angular biết rằng chúng ta muốn sử dụng phương thức addVisitor() trên controller để xử lí yêu cầu của form. Mỗi input đầu vào chứa một thuộc tính của ng-model. Thuộc tính này ánh xạ các phần tử đầu vào vào model của chúng ta.
```ruby
<tr ng-show="!visitors.length">
  <td colspan="4">No visitors in the building.</td>
</tr>
```
Thuộc tính ng-show ở trên hàng đầu tiên nói với AngularJS rằng chúng ta chỉ muốn hiển thị hàng này nếu điều kiện được đề cập là phù hợp. Trong trường hợp này là không có visitor truy cập
```ruby
<tr ng-repeat="visitor in visitors">
...
</tr>
```
Thuộc tính ng-repeat là một vòng lặp. Vòng lặp này cho AngularJS biết rằng chúng ta muốn lặp lại từng visitor.
```ruby
<td>{{ visitor.first_name }}</td>
<td>{{ visitor.last_name }}</td>
<td>{{ visitor.reason }}</td>
```
Văn bản chứa trong {{...}} là một phương thức của AngularJS. Trong trường hợp này chúng ta đang nói với AngularJS để hiển thị các trường được đề cập tới trong biểu thức đó.
```ruby
<td><a class="btn btn-danger" ng-click="deleteVisitor($index)">Remove</a></td>
```
Nút ng-click cho AngularJS chạy vào hàm trong controller được chỉ định khi thẻ html tag được click. Trong trường hợp này chúng ta chạy mã để xóa đi visitor đã chỉ định. 
Đây là phần giới thiệu về AngularJS và Rails. Cảm ơn các bạn đã đọc bài.