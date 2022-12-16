Khi bạn sử dụng web, bạn sẽ thường thấy các URL mô tả về trang mà bạn sẽ truy cập. Ví dụ [Viblo](https://viblo.asia/) URL có chưa tiêu đề của bài viết kèm theo. Theo như doc mô tả về phần [routing trong Rails](https://guides.rubyonrails.org/routing.html) thì mặc định sẽ tìm kiếm model theo ID của nó. Bài viết này sẽ giới thiệu với bạn cách thay đổi routes và kiếm kiếm URL của model mà không cần sử dụng Gem.

Chúng ta sẽ thực hiện thay đổi id-based URL dạng:

![](https://images.viblo.asia/21b48940-cba0-420d-857e-bcf72d1c14e3.png)

sang một URL dài hơn như là:

![](https://images.viblo.asia/6982b76a-45a4-40d2-9a7f-f9e930305968.png)

# Config để Rails có thể nhận pretty URLs
Slug là tên được đặt cho một URL của trang, xuất phát từ ngành công nghiệp xuất bản và in ấn. Không có cách định tuyến tốt nhất trên các trang web. Một số sử dụng các từ và câu đầy đủ, một số sử dụng id, một số kết hợp cả hai. Ví dụ như Viblo đặt id ở cuối slug URL

Đây là cách thay đổi cách Rails tìm thấy các record và định tuyến đến chúng: 

1. Tạo method để tạo ra slug
2. Thêm slug vào model
3. Override method `to_params` trong các model tương ứng
4. Chỉ định routes tương ứng sử dụng slug params
5. Update method `find_by` trong controller để tìm kiếm theo slug 
6. Kiểm tra lại đường dẫn trên trình duyệt

![](https://images.viblo.asia/313e054e-1b7a-4f52-b112-a4c489878d52.png)

## 1. Tạo URL đẹp

Chúng ta có thể sử dụng một method để đảm bảo rằng các URL được định dạng theo cùng một cách và không gặp sự cố khi trình duyệt cố gắng hiển thị chúng. Bạn có thể thực hiện theo cách sau:

```Ruby
# app/models/application_record.rb

module ApplicationRecord
  def to_slug string
    string.parameterize.truncate 80, omission: ""
  end
end
```

Để chi tiết hơn các bạn có thể tham khảo doc về 2 method [parameterize](https://apidock.com/rails/ActiveSupport/Inflector/parameterize) (thay thế các kí tự đặc biệt bằng dấu "-") và [truncate](https://apidock.com/rails/String/truncate) (đặt chiều dài tối đa cho slug)

## 2. Thêm slug vào model

Đầu tiên cần tạo migration

```
rails generate migration AddSlugToPost slug:string
rails db:migrate
```

Hãy đảm bảo rằng có thể thêm mới và sửa được trường slug

```Ruby
Post.create slug: to_slug(name)
```

Với các record đã được tạo trước đó, bạn có thể viết một task để bổ sung slug ví dụ như cách sau:

```Ruby
# app/models/post.rb

class Post < ApplicationRecord
  class << self
    def add_slugs
      update slug: to_slug(name) # giả sử muốn slug dựa theo trường name
    end
  end
end
```

Sau đó có thể chạy:
```
rails console 
Post.add_slugs
```

## 3. Override to_param
Mặc định, method `to_param` trong Rails trả về ID của record. Nếu muốn override lại (khi sử dụng ngoài view) 

```
<%= link_to "View post", @post %>
```

routes thay vì là `posts/:id` (ví dụ: posts/1, posts/2 .....) sẽ thay đổi thành `posts/:slug` (ví dụ: posts/my-post-url-slug, posts/pretty-url ...)

```Ruby
# app/models/post.rb

class Post < ApplicationRecord
  def to_prarams
    slug
  end
end
```

**Lưu ý:** Khi thay đổi từ việc sử dụng id (kiểu dữ liệu là integer) sang sử dụng slug (kiểu dữ liệu string) sẽ gặp phải một số vấn đề về performance, vì máy tình tìm kiếm theo id nhanh hơn  tìm kiếm theo string. Có thể có tùy chọn thay thế, ví dụ như Stack Overflow, bao gồm cả id rồi slug sau đó. 
## 4. Config routes nhận slug

Mặc định thì helper method resources  sẽ sử dụng id. 
![](https://images.viblo.asia/6439b998-358f-41b0-9e2d-90a9b262a437.png)

Chúng ta có thể override lại sử dụng slug như sau
```Ruby
# config/routes

...
resources :posts, param: :slug
...
```

![](https://images.viblo.asia/23008923-aa43-46e2-ad88-708f675a070a.png)
## 5. Tìm kiếm theo slug trong controller

Cơ bản thì công việc của chúng ta đã hoàn thành. Bây giờ chỉ cần update lại controller để tìm kiếm record theo slug nữa là ổn

```Ruby
# app/controllers/posts_controller.rb

class PostController < ApplicationController
  def show
    @post = Post.find_by slug: params[:slug]
  end
end
```

## 6. Check lại URL 

Hãy thử truy cập lại trình duyệt của bạn để thấy sự khác biệt. 

Ngoài ra các bạn có thể tham khảo thêm gem [friendly_id](https://github.com/norman/friendly_id) để sử dụng một cách nhanh chóng hơn. Đây cũng là một gem rất phổ biến để hỗ trợ xây dưng pretty url

Bạn cạnh đó các bạn có thể đọc thêm tài liệu:
* https://medium.freecodecamp.org/routes-in-ruby-on-rails-5-using-resources-and-records-to-define-urls-411a68afa21a
* https://medium.freecodecamp.org/service-objects-explained-simply-for-ruby-on-rails-5-a8cc42a5441f
* https://medium.freecodecamp.org/add-bootstrap-to-your-ruby-on-rails-project-8d76d70d0e3b

Bài viết được dịch từ [nguồn ](https://medium.freecodecamp.org/custom-urls-in-ruby-on-rails-use-descriptive-slugs-instead-of-ids-67c631475a94). Cảm ơn các bạn đã theo dõi.