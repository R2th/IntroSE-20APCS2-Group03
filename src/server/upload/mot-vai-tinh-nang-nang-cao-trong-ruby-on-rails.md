# Giới thiệu
Có một vài tính năng có thể bạn không thường xuyên dùng tới nhưng tôi nghĩ nó sẽ có ích nếu bạn biết. Trong bài viết này, tôi sẽ giới thiệu đến bạn phần định tuyến (routes) nâng cao, các layouts phức tạp và giới thiệu ngắn gọn về metaprogramming.
# Định tuyến nâng cao
* Có lẽ bạn đã quá quen thuộc với các định tuyến mặc định trong Rails, khi chuyển đổi các yêu cầu RESTful bằng cách sử dụng các động từ HTTP cơ bản để ánh xạ thành các hành động tương ứng trong controller (hay còn gọi là các thao tác CRUD). Chúng ta có thể khai báo **resources** cho đối tượng hoặc chỉ định cụ thể hành động bằng việc sử dụng **get/post/put/delete** method trong file **config/routes.rb**. 90% bạn sử dụng để khai báo các method cơ bản trong file định tuyến, nhưng 10% khác lại cung cấp cho bạn một số tùy chọn nâng cao khác như quy định chuyển hướng trực tiếp trong file định tuyến, định tuyến lồng nhau (**nested routes**) hoặc phân tích các tham số từ các **requests** gửi đến.
## Singular Resource
* Bạn đã gặp điều này rất thường xuyên trong các dự án. Với các đối tượng mà bạn muốn khai báo ngắn gọn các phương thức CRUD cho chúng, bạn chỉ cần khai báo trên một dòng với **resources** (ví dụ: **resouces :posts**)
* Đôi khi cũng có resource cần khai báo mà nó chỉ có ý nghĩa đối với việc có một. Một ví dụ như là dashboard người dùng hiển thị các sự kiện thông tin dựa trên người dùng đăng nhập cụ thể. Chỉ có một trang dashboard template, nó chỉ đủ thông minh để hiển thị những thứ có liên quan cho người dùng hiện đang đăng nhập.
* Trong trường hợp này, sẽ không có ý nghĩa gì khi hiển thị hành động **index** của các dashboards, vì nó chỉ cần 1 khi thay đổi người dùng đăng nhập. Đối với bất kì hành động nào khác mà yêu cầu tham số **id** để phân biệt đối tượng (như **show**, **edit**) thì ta không cần tham số **id** đấy nữa
* Khai báo **singular resource**:
```
# in config/routes.rb
resource :dashboard
```

* Chỉ cần lưu ý **resource** và **dashboard** khai báo dạng số ít. Điều này cũng rất dễ gây nhầm lẫn khi nhiều lập trình viên gõ **resource** thay vì **resources** khi họ muốn khai báo các phương thức định tuyến mặc định (số nhiều). 
* Khi chạy lệnh **$rails routes** thì phần khai báo **singular resource** sẽ chỉ hiện 6 định tuyến (vì chúng ta không sử dụng **#index)**, và không có tham số **id** sau các định tuyến như:
```
edit_dashboard  GET /dashboard/edit(.:format)  dashboards#edit
```

và nó khác với **resources** đầy đủ:
```
edit_post  GET /posts/:id/edit(.:format)  posts#edit
```

## Nested Routes
* Đôi khi nó chỉ có ý nghĩa đối với một **resource** được lồng bên trong một **resource** khác. Chẳng hạn, một danh sách các bài học (**lessons**) nằm trong danh sách các khóa học (**courses**) - vì vậy bạn mong muốn một loại URL (**http://example.com/courses/1/lessons/3**). Cách để có được một đường dẫn như này là ta khai báo một **resource** trong khối khai báo **resouce** khác trong file định tuyến:
```
# config/routes.rb
  Rails.application.routes.draw do
    resources :courses do
      resources :lessons
    end
  end
```
* Lưu ý rằng phương thức **resources** sẽ bao gồm một tập hợp các **routes**. Khi bạn truy cập URL, bạn sẽ phải chỉ định tham số **:id** cho cả hai đối tượng. Cụ thể nó được thể hiện: 
```
course_lesson  GET  /courses/:course_id/lessons/:id(.:format)  lessons#show
```

* Cũng cần chú ý là tham số **:id** là tham số của **resource** được lồng sâu nhất, các tham số **:id** của các **resource** cha đều có tiền tố là tên của **resource** đó (**:course_id**). Các view helpers cũng sẽ tự động tạo các đường dẫn hợp lý như khi bạn có **course_lesson_path**, bạn cần chỉ định hai tham số **id** cho đường dẫn đó như **course_lesson_path(1, 3)**
* Trên thực tế, đôi khi bạn sẽ chỉ cần một số hành động các **resource** được lồng vào nhau - chỉ những hành động thực sự cần ID của **resource** cha để chỉ định nó. Chẳng hạn, bạn có thể lấy một **lesson** cụ thể bằng cách chỉ biết ID của nó. Nhưng để có được tất cả các **lessons** được liệt kê bên dưới một **course** cụ thể, bạn cần có ID khóa học để nó phải được lồng vào nhau. Điều tương tự cũng đúng khi tạo **lesson**, vì chúng sẽ cần một **course** cha của nó:
```
# config/routes.rb
  Rails.application.routes.draw do
    resources :courses do
      resources :lessons, :only => [:index, :create]
    end
  end
```

### Member - Collection Routes
* Đôi khi bạn muốn thêm một định tuyến không phải RESTful trong **resource**. Nếu bạn muốn thêm một route cho chỉ một thành viên của **resource**, sử dụng phương thức **member**:
```
# config/routes.rb
  Rails.application.routes.draw do
    resources :courses do
      member do
        get "preview"   # Preview a single course
      end
    end
  end
```
* Nó sẽ ánh xạ đến hành động **courses#preview** trong controller. Còn nếu bạn muốn thêm định tuyến không phải RESTful cho một tập trong **resource** thì không cần chỉ định tham số **:id** cụ thể, dùng phương thức **collection**:
```
# config/routes.rb
  Rails.application.routes.draw do
    resources :courses do
      member do
        get "preview"  # Preview a single course (requires ID)
      end
      collection do
        get "upcoming"  # Show a list of *all* upcoming courses (no ID needed)
      end
    end
  end
```
* Định tuyến **upcoming** này sẽ ánh xạ đến hành động **courses#upcomming** nhưng bạn không cần khai báo tham số **:id**
### Redirect - Wildcard Routes
* Bạn có thể muốn cung cấp một URL không thuận tiện cho người dùng của mình nhưng ánh xạ nó trực tiếp đến một URL khác mà bạn đang sử dụng. Sử dụng **redirect**:
```
 # config/routes.rb
  Rails.application.routes.draw do
    get 'courses/:course_name' => redirect('/courses/%{course_name}/lessons'), :as => "course"
  end
```
* Nguyên tắc cơ bản ở đây là chỉ sử dụng phương tức **redirect** để gửi một route này sang route khác. Nếu route của bạn đơn giản, đó là một phương pháp thực sự đơn giản. Nhưng nếu bạn cũng muốn gửi các tham số ban đầu, bạn cần đặt tham số bên trong **%{here}**. Trong ví dụ trên, chúng tôi cũng đã đổi tên route để thuận tiện bằng cách sử dụng bí danh với tham số **:as**. Điều này cho phép chúng ta sử dụng tên đó trong các phương thức như path helper. Chạy lệnh **$rails routes** để quan sát chi tiết hơn.
# Layout lồng nhau và các thông tin truyền vào
* Một vấn đề liên quan đến việc sử dụng lại các phần view trong các trang khác nhau. Chúng ta có thể tạo các phần duy nhất vẫn sử dụng lại nhiều kiểu để bạn có thể giữ nhất quán trên toàn bộ trang web (ví dụ phần **footer**). Chúng ta tạo các phần view riêng và sau đó gọi chúng bằng cách sử dụng **render :template => "your_layout.html.erb"**
* Bạn cũng có thể truyền thông tin từ layout đầu tiên đến layout chứa nó bằng cách sử dụng phương thức **content_for**. Điều này cho phép bạn tạo logic, nội dung tùy chỉnh trong layout chính phụ thuộc vào nội dung được truyền qua các tệp layout riêng lẻ của bạn. Chẳng hạn, bạn có thể có một tệp layout cụ thể cho các trang tĩnh của bạn là **app/views/layouts/static_pages.html.erb**. Tệp này sẽ được hiển thị theo mặc định cho việc tạo các trang nội dung trả về từ **StaticPagesController** của bạn (mặc định của Rails). Tuy nhiên, giả sử rằng bạn muốn các trang tĩnh của mình trông gần giống với phần còn lại của trang web nhưng bạn không muốn thanh điều hướng xuất hiện trên đầu trang. Trong trường hợp này, bạn khai báo **content_for** trong layout **static_pages.html.erb** để truyền định dạng CSS tới layout **application.html.erb** chứa nó, ví dụ:
```
# app/views/layouts/static_pages.html.erb

  <% content_for :stylesheets do %\>\
    #navbar {display: none}
  <% end % >
  <%= render :template => "layouts/application" %\>\
```

* Sau đó, layout **application.html.erb** của bạn cần được thiết lập để bắt nội dung đó và sử dụng nội dung đó bằng cách thêm phương thức **yield**:
```
# app/views/layouts/application.html.erb
  ...
  <head>
    ...
    <style><%= yield :stylesheets %></style>
  </head>
  ...
  render :template => "static_pages.html.erb"
  ...
```

và kết quả là layout **application.html.erb** tương đương với nội dung sau:
```
# app/views/layouts/application.html.erb
...
<head>
  ...
  <style> #navbar {display: none} </style>
</head>
...
```
* Điều này đặc biệt hữu ích khi bạn muốn làm cho một phần của trang web của mình trông khác đi nhưng không thiết kế lại hoàn toàn với layout hoàn toàn mới, bạn có thể xem xét lồng các layout của mình và chuyển thông tin từ một layout con đến layout cha chứa nó.
# Metaprogramming Rails
* Vậy **metaprogramming** là gì? Đó là một khái niệm tuyệt vời và hữu ích được sử dụng trên Rails và bạn cũng có thể tự mình sử dụng nó. Về cơ bản đó là ý tưởng là ứng dụng hoặc tập lệnh của bạn tạo ra các hàm hoặc phương thức hoặc các lớp một cách nhanh chóng trong khi nó đang chạy và có thể tự động gọi chúng. 
* Một ví dụ về siêu lập trình đang hoạt động trong Rails là với route helpers. Khi ứng dụng Rails của bạn kích hoạt lần đầu tiên, nó sẽ tải file **config/routes.rb**, chứa dòng **get "home" => "static_pages#home"** để người dùng của bạn có thể nhập **http://www.yoursite.com/home** để quay lại trang chủ. Rails tự động tạo một cặp phương thức là **home_path** và **home_url**. Đó chính là một ví dụ của **metaprogramming**.
* Còn những tình huống linh hoạt hơn mà bạn không biết trước phương thức nào sẽ được gọi? Ruby cung cấp phương thức **send** cho việc này. Nếu bạn muốn chạy một phương thức trên một đối tượng, sử dụng **send** trên đối tượng với bất kỳ đối số nào bạn muốn. Một ví dụ đơn giản bạn có thể làm trên dòng lệnh của mình là 1+2:
```
> 1 + 2
=> 3
> 1.send(:+, 2)
=> 3
```
* Trong một tình huống thông thường, không có lý do để sử dụng **send** nhưng nếu bạn không biết bạn sẽ cần gọi phương thức nào, thì đó là một cứu cánh. Chỉ cần truyền cho nó tên của phương thức bạn muốn chạy trên đối tượng đó và Ruby sẽ tìm kiếm nó.
* Nhưng làm thế nào để bạn xác định một phương pháp mới?  Trong trường hợp này, bạn có thể sử dụng phương thức **define_method**, đặt tên cho phương thức và xác định khối code bên trong nó. Ví dụ:
```
class Rubyist

    define_method :hello do |my_arg|
      my_arg
    end
end

obj = Rubyist.new
puts(obj.hello('Matz')) # => Matz
```
* Một phương thức rất mạnh khác là **method_missing**. Bạn chắc chắn đã thấy những lỗi **Hey you, you tried to call a method that doesn’t exist!**. Về cơ bản, **method_missing** là một phương thức của BasicObject trong Ruby được kế thừa bởi mọi đối tượng và nó được gọi bất cứ khi nào bạn cố chạy một phương thức không thực sự tồn tại. Nó cũng nhận vào tất cả các đối số bạn đã cố gắng gửi và bất kỳ khối code đi kèm với nó. Điều đó có nghĩa là bạn có thể ghi đè **method_missing**  cho một đối tượng nhất định và sử dụng bất cứ thứ gì được gọi trước đó, ví dụ như in ra một thông báo cho biết tên của phương thức bạn đã cố gắng gọi và các đối số của nó:
```
class Rubyist
  def method_missing(m, *args, &block)
    str = "Called #{m} with #{args.inspect}"

    if block_given?
      puts str + " and also a block: #{block}"
    else
      puts str
    end
  end
end
```

```
> Rubyist.new.anything
"Called anything with []"
=> nil

> Rubyist.new.anything(3, 4) { "something" }
"Called anything with [3, 4] and also a block: #<Proc:0x007fa0261d2ae0@(irb):38>"
=> nil
```
* **Metaprogramming** là tính năng tiện lợi và có rất nhiều công dụng thú vị cho nó. Bạn không cần phải thành thạo nó để học Rails, và chỉ nên đi sâu vào nó một khi bạn cảm thấy vững vàng với Rails, nhưng chắc chắn nó sẽ hữu ích cho bạn trong việc tối ưu code và giải quyết một vài vấn đề phức tạp khác trong các dự án.
# Kết luận
* Trên đây là một số tips hay mà tôi muốn chia sẻ với bạn trong bài viết này. Hi vọng bạn có thể áp dụng chúng hợp lý trong công việc. Chúc bạn thành công
* Nguồn tham khảo: [https://www.theodinproject.com/courses/ruby-on-rails/lessons/advanced-topics](https://www.theodinproject.com/courses/ruby-on-rails/lessons/advanced-topics)