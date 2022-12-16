# 1. Breadcrumbs là gì?
BreadcrumbsOnrails là một  simple Ruby on Rails plugin cho việc tạo và quản lý những navigation, giúp chúng ta có thể điều hướng một trang web một cách nuột nà. Ví dụ như, chúng ta mở hàng chục Tab và lại quên mất là mình đang đứng ở tab nào đó hoặc là muốn quay lại một tab nào đó mà không biết làm thế nào, khi đó Breadcrumbs sẽ giúp chúng ta làm việc đó. Breadcrumbs là công cụ hỗ trợ người dùng điều hướng một trang web, làm tăng tính tiện dụng giữa người dùng với website lên rất nhiều. Và đây là một ví dụ cụ thể và rất quen thuộc

# 2. Yêu cầu :
`Rails 4 hoặc là Rails 5`
### 	Lưu ý :
BreadcrumbsOnRails không tương thích với Rails 2.1 hoặc thấp hơn
# 3. Cách cài đặt :
cài đặt với terminal :
`$ gem install breadcrumbs_on_rails`
hoặc thêm vào gemfile :
`gem "breadcrumbs_on_rails"`
# 4. Cách sử dụng :
ở trong controller chúng ta gọi phương thức `add_breadcrumb` để thêm mới một phần tử vào breadcrumbs stack. add_breadcrumb yêu cầu hai đối số truyền vào: `name of breadcrumbs` và `breadcrumbs path.`
```
class MyController

  add_breadcrumb "home", :root_path
  add_breadcrumb "my", :my_path

  def index
    # ...

    add_breadcrumb "index", index_path
  end

end
```
Để ý tới "Breadcrumb Element" chúng ta sẽ tìm hiểu kĩ hơn về tên và đường dẫn.
Chúng ta có lựa chọn thứ 3 về tham số truyền vào của method add_breadcrumb là lựa chọn để customize breadcrumb link.
```
class MyController
  def index
    add_breadcrumb "index", index_path, title: "Back to the Index"
  end
end
```


Ở trong view chúng ta render ra breadcrumbs menu với render_breadcrumbs helper.
```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>untitled</title>
</head>

<body>
  <%= render_breadcrumbs %>
</body>
</html>
```
render_breadcrumbs được hiểu như là đã giới hạn các tùy chọn.Tuy nhiên trong ví dụ sau chúng ta sẽ thay đổi kí tự phân cách trong breadcrumbs với options :separator.
```
<body>
  <%= render_breadcrumbs separator: " / " %>
</body>
```

Chúng ta hay có các tùy chọn như sau:
separator:
tag:
Để sử dụng Boostrap chúng ta có thể viết theo cách sau:
```
<body>
  <ol class="breadcrumb">
    <%= render_breadcrumbs tag: :li, separator: "" %>
  </ol>
</body>
```
    
# 5. customize builder :
    
Đầu tiên, chúng ta sẽ customize lại `render method` default của BreadcrumbsOnrails.
```
lib/custom_breadcrumbs_builder.rb
class CustomBreadcrumbsBuilder < BreadcrumbsOnRails::Breadcrumbs::Builder
  def render
    @context.render "/shared/breadcrumbs", elements: @elements
  end
end
layouts/shared/_breadcrumbs.html.erb
<% elements[0..-1].each do |element| %>
      <li>
        <a href="<%= element.path %>"><%= element.name %></a>
      </li>
<% end %>
    <li>
      <p href="#"><%= elements.last.name %></p>
    </li>
application.html.erb
<%= render_breadcrumbs builder: ::CustomBreadcrumbsBuilder %>
```
    
# 6. kết luận
Trên là cách đơn giản để builder lại Breadcrumbs theo ý muốn của chúng ta. thực sự Breadcrumbs giúp ích trang web chúng ta tiện dụng hơn rất nhiều và dễ dàng sử dụng.