Chao,

Chào các bạn, đến tháng lại lên. Hôm nay, mình xin giơí thiệu tới các bạn một Framework khá hay của một thằng khá bá-Javascript. 

Nhưng trước khi đi vào vấn đề chính, mình xin đề cập lại một bài toán rất phổ biến trong lập trình phát triển web, và hiện tại cũng có khá nhiều cách thức để giải quyết vấn đề này nhưng chưa có cách giải quyết nào tỏ ra hiệu quả vượt trội. 

Vấn đề ở đây mình muốn nói tới là việc phát triển một ứng dụng song song giữa các phần Front-end và Back-end.Ví dụ có một ứng dụng Web yêu cầu chúng ta phải phát triển song song giữa việc back-end: xử lí luông logic, dữ liệu và front-end: xử lý thao tác và giao diện người dùng. Chúng ta có thể nghĩ đến những client-side khá tốt cho phần front-end như AngularJS, BackboneJS...


Và trong bài viết này, mình xin mạo pháp giới thiệu với các bạn một cao thủ võ lâm tương tự như chú Ăng và chú Bếch ở trên, nó chính là EmberJS

Lét gâu 
# 1. EmberJS là gì? 

Thì phần trên vô tình mình đã đưa đến cho các bạn khái niệm của EmberJS cmnr :D

EmberJS là một client-side Framework được viết trên Javascript. Điểm mạnh nổi trội của Ember chính là khả năng đồng bộ. Các đối tượng của trang web sẽ được gắn với Framework để có thể update các đối tượng mà không cần quan tâm tới việc quan hệ giữa các thành phần trang web như thế nào. Chính điều này mang lại một tính hiệu rất tốt cho cả những nhà phát triển web như chúng ta lẫn người sử dụng khi dữ liệu trên trang được quản lý một cách rất dễ dàng.

# 2. Xây dựng một Rails app với EmberJS

## 2.1 Cấu trúc thư mục của Ember trong ứng dụng

Cấu trúc thư mục của EmberJS trong ứng dụng cũng được quản lý na ná như anh Angular. Với mô hình EM-VI-CI truyền thống :D

Chúng ta cùng xem qua một EmberJs trong Rails app như thế nào

```
app/assets/javascript:
```

`app/ `- chứa tất cả các javascript file cần thiết và các template liên quan tới Ember

`app/app.js `- khai báo biến ứng dụng global được mở rộng từ EmberEmber.Application

`app/models/ `- chứa các class model

app/controllers/ - quản lý và điều khiển tài nguyên

`app/views/` - chứa các class view

`app/templates/ `- chứa các template

`app/helpers/`

`vendor/`

`lib/`

## 2.2 Install EmberJS trong Rails app
### Add gem và bundle

Các bạn cài đặt gem trong Gemfile

`gem 'ember-rails'`

và sau đó chạy lênh

`bundle install `

### Khởi tạo cây thư mục trong app/assets/javascripts/

Ở phần này, các bạn lần lượt chạy 2 câu lệnh: 

```
cd app/assets/javascripts
```
```
mkdir app app/controllers app/helpers app/models app/templates app/views lib vendor
```

### Thêm vào file application.js để có thể thực hiện load pipeline

Tiếp theo, các bạn cần require những phần cần thiết của ember vào application.js để sử dụng được code

```
//= require jquery
//= require jquery_ujs
//= require ./vendor/ember
//= require ./vendor/ember-rest
//= require_tree ./lib
//= require app/app
//= require_tree ./app/models
//= require_tree ./app/controllers
//= require_tree ./app/views
//= require_tree ./app/helpers
//= require_tree ./app/templates
```


Cuối cùng: Download EmberJS từ trang chủ và thêm vào app/assets/javascripts/vendor/

### Tạo ứng dụng ember trong app/assets/javascripts/application.js

```
App = Ember.Application.create();
```

### Rails server

Các bạn hoàn toàn có thể  generate scaffold trong Rails để sử dụng



```
rails g scaffold
```


Thiết lập cho model cà controller

### Model: app/models/contact.rb

```
class Contact < ActiveRecord::Base
  validates :first_name, :presence => true
  validates :last_name, :presence => true
end
```

### Controller: app/controllers/contacts_controller.rb


```
 class ContactsController < ApplicationController
  # GET /contacts
  # GET /contacts.json
  def index
    @contacts = Contact.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @contacts }
    end
  end

  # GET /contacts/1.json
  def show
    @contact = Contact.find(params[:id])
    respond_to do |format|
      format.json { render json: @contact }
    end
  end

  # POST /contacts.json
  def create
    @contact = Contact.new(params[:contact])
    respond_to do |format|
      if @contact.save
        format.json { render json: @contact, status: :created, location: @contact }
      else
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /contacts/1.json
  def update
    @contact = Contact.find(params[:id])

    respond_to do |format|
      if @contact.update_attributes(params[:contact])
        format.json { render json: nil, status: :ok }
      else
        format.json { render json: @contact.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /contacts/1.json
  def destroy
    @contact = Contact.find(params[:id])
    @contact.destroy
    respond_to do |format|
      format.json { render json: nil, status: :ok }
    end
  end
end
```


### Routes

```
 EmberRestExample::Application.routes.draw do
  root :to => 'contacts#index'
  resources :contacts
end
```


Như vậy là mình đã tạo ra routes, action và model cho đối tường contact. 

### Front end

Tiếp tục chúng ta sẽ tạo view cho project này, kèm thêm phần code javascrip-thực ra là EmberJS code đấy =))

### Model: app/assets/javascripts/app/models/contact.js

```
App.Contact  = Ember.Resource.extend({
  resourceUrl: '/contacts',
  fullName: Ember.computed(function() {
    return this.get('first_name') + '' + this.get('last_name');
  }).property('first_name', 'last_name')
});
```

### Controller: app/assets/javascripts/app/controllers/contacts.js

```
App.contactsController = Ember.ResourceController.create({
  resourceType: App.Contact
});
    
```

### Views: ListContactsView :app/assets/javascripts/app/views/contacts/list.js


```
App.ListContactsView = Ember.View.extend({
  templateName:    'app/templates/contacts/list',
  contactsBinding: 'App.contactsController',

  refreshListing: function() {
    App.contactsController.findAll();
  }
});
```

### ShowContactView: app/assets/javascripts/app/views/contacts/show.js

```
App.ShowContactView = Ember.View.extend({
  templateName: 'app/templates/contacts/show',
  classNames:   ['show-contact'],
  tagName:      'tr'
});
```


### Template: Handlebar List: app/assets/javascripts/app/templates/contacts/list.handlebars


```
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
  {{#each contacts}}
    {{view App.ShowContactView contactBinding="this"}}
  {{/each}}
  </tbody>
</table>
```

### Show: app/assets/javascripts/app/templates/contacts/show.handlebars

```
<td>
  {{contact.id}}
</td>
<tdclass="data">{{contact.fullName}}</td
```

### Done

Cuối cùng, bạn cần một index view để hiển thị dữ liệu lên người dùng

### app/views/contacts/index.html.erb:

```
<h1>Contacts</h1>
<script type="text/x-handlebars">
  {{ view App.ListContactsView }}
</script>

<script type="text/javascript">
  $(function() {
    App.contactsController.loadAll(<%= @contacts.to_json.html_safe %>);
  });
</script>
```




Và trên đó là tất cả quá trình để khởi tạo một Rails app với EmberJS và sử dụng EmberJS để hổ trợ việc hiển thị data lên giao diện người dùng.

Và sau khi tìm hiểu về Ember, mình thấy em này là một trong số những client-side rất tốt, có khả năng hổ trợ dev và quản lý dữ liệu ổn. Cách hoạt động và phân chia thư mục dựa theo mô hình EM-VI-XI như mình đã nói, và theo nhận định cá nhân mình thì riêng điểm này nó làm triệt để và clear hơn Angular rất rất nhiều.


Vậy thôi nhé, chúc các bạn thành công :D :D

Chào và hẹn gặp lại =))