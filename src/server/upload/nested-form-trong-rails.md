## Tổng quan
Trong rails nếu chúng ta muốn tạo form lồng trong form thì chúng ta có thể dùng fields_for. Nhưng nó vẫn chưa đủ để chúng ta có thể làm việc dễ dàng.  Có một số gem hỗ trợ rails tạo ra nested form này nhưng mình thấy gem cocoon là hỗ trợ đầy đủ chức năng nhất. Nên hôm nay mình sẽ giới thiệu với các bạn về cài đăì và cách dùng gem cocoon.
## Cài đặt
1. Thêm vào Gemfile
    `gem "cocoon"`
2. Chạy lệnh `bundle install'
3. Thêm vào file `application.js` nếu sử dụng Rails 3.1+/Rails 4/Rails 5 

    `//= require cocoon`
    
    Hoặc nếu dùng Rails 3.0.x
    
    `rails g cocoon:install` và thêm vào file layout `javascript_include_tag :cocoon`
## Cách dùng
Giả sử có 2 model là Project và Task. Project có các thuộc tính name, description. Task có các thuộc tính description, done. 1 Project thì có nhiều Task.

**Trong file model**
```
    class Project < ActiveRecord::Base
      has_many :tasks
      accepts_nested_attributes_for :tasks, reject_if: :all_blank, allow_destroy: true
    end

    class Task < ActiveRecord::Base
      belongs_to :project
    end
```
`reject_if: :all_blank` có nghĩa là từ chối thêm nếu như tất cả task trống. 

`allow_destroy: true` tức cho phép chúng ta có thể xóa task.
    
**Trong file products_controller.rb**
```
    def project_params
      params.require(:project).permit :name, :description, tasks_attributes: [:id, :description, :done, :_destroy]
    end
```

Ở đây `_destroy` là virtual attribute.  Khi mà `_destroy` được thiết lập thì nested model sẽ được xóa.

**Trong view**
1. Nếu sử dụng **Formtastic**. Trong `projects/_form partial` chúng ta viết:
```
= semantic_form_for @project do |f|
  = f.inputs do
    = f.input :name
    = f.input :description
    %h3 Tasks
    #tasks
      = f.semantic_fields_for :tasks do |task|
        = render 'task_fields', f: task
      .links
        = link_to_add_association 'add task', f, :tasks
    = f.actions do
      = f.action :submit
 ```
 Và trong `_task_fields` partial viết như sau:
 ```
 .nested-fields
  = f.inputs do
    = f.input :description
    = f.input :done, as: :boolean
    = link_to_remove_association "remove task", f
 ```
2.  Nếu sử dụng **SimpleForm**. Trong `projects/_form partial` chúng ta viết:
 ```
 = simple_form_for @project do |f|
  = f.input :name
  = f.input :description
  %h3 Tasks
  #tasks
    = f.simple_fields_for :tasks do |task|
      = render 'task_fields', f: task
    .links
      = link_to_add_association 'add task', f, :tasks
  = f.submit
 ```
  Và trong `_task_fields` partial viết như sau:
  ```
  .nested-fields
      = f.input :description
      = f.input :done, as: :boolean
      = link_to_remove_association "remove task", f
  ```
3. Nếu sử dụng **Standard Rails forms**. Trong `projects/_form partial` chúng ta viết:
```
= form_for @project do |f|
  .field
    = f.label :name
    %br
    = f.text_field :name
  .field
    = f.label :description
    %br
    = f.text_field :description
  %h3 Tasks
  #tasks
    = f.fields_for :tasks do |task|
      = render 'task_fields', f: task
    .links
      = link_to_add_association 'add task', f, :tasks
  = f.submit
```
 Và trong `_task_fields` partial viết như sau:
 ```
 .nested-fields
  .field
    = f.label :description
    %br
    = f.text_field :description
  .field
    = f.check_box :done
    = f.label :done
  = link_to_remove_association "remove task", f
 ```
## Các helper function của cocoon
Thì trong gem cocoon định nghĩa 2 helper function chính đó là `link_to_add_association` và `link_to_remove_association`
1. `link_to_add_association`
   Đây là sự kiện để thêm mới các trường của nested model vào trong form.
   ```
       = link_to_add_association 'add something', f, :task,
           partial: 'orther_partial'
   ```
   nếu không có ` partial: 'orther_partial'` thì mặc định nó sẽ lấy partial ở cùng thư mục và có tên là `task_fields`
  2. `link_to_remove_association`
  Chức năng này dùng để xóa các trường của 1 nested model trong form
  ```
      = link_to_remove_association 'remove task', f,
          { wrapper_class: 'my-wrapper-class' })
  ```
  Ở đây `wrapper_class` sẽ là class mà chứa các trường của nested model. Mặc định sẽ là `nested-fields`. Các bạn nhớ đặt `link_to_remove_association` vào trong cái class chứa trường của nested model luôn nhé.
## Các sự kiện
Cocoon có một số sự kiện sau:
```
    cocoon:before-insert: được gọi trước khi thêm, có thể hủy hành dộng thêm
    cocoon:after-insert: được gọi sau khi thêm xong
    cocoon:before-remove: được gọi trước khi xóa, có thể hủy hành động xóa
    cocoon:after-remove: được gọi sau khi đã xóa
```
Các để bắt các sự kiện trên javascript
```
$(document).ready(function() {
    $('#tasks')
      .on('cocoon:before-insert', function(e, task_to_be_added) {
        // do somthing
      })
      .on('cocoon:after-insert', function(e, added_task) {
       // do somthing
      })
      .on('cocoon:before-remove', function(e, task_to_be_removed) {
         // do somthing
      });
      .on('cocoon:after-remove', function(e, removed_task) {
          // do somthing
      });
});
```
Cảm ơn các bạn đã xem bài biết của mình. Happy codding :D

Bài viết được tham khảo từ https://github.com/nathanvda/cocoon