Việc hiển thị lỗi theo trang mặc định của Rails đôi khi làm chúng ta rất khó để biết chính xác lỗi đó là gì vì rất ít thông tin được hiển thị. Vì vậy để những đoạn message error trông rõ ràng hơn thuận tiện cho việc fix bug chúng ta có thể sử dụng gem bettererrors kết hợp với bindingofcaller.
### Khởi tạo môi trường
- Đầu tiên chúng ta tạo một ứng dụng với 2 model post và category
```
rails generate scaffold Category name:string description:string
rails generate scaffold Post title:string description:string category:references

```
- Vậy là ta đã có model, bây giờ ta sẽ tạo một data post nhưng có giá trị category_id = nil
```

post = Post.new(title: "Coupe de France: Les Herbiers ont", description: "")
p.save(validate:false)

```
- Tiếp theo ta tạo một lỗi trong phương thức show để xem lỗi hiển thị mặc định của Rails
```
  def show
    return if @post.category.empty?  # sinh ra  Exception vì data ta tạo phía trên không có category
  end

```
### Install gem
- Để sử dụng gem better_errors kết hợp với binding_of_caller ta thêm vào Gemfile
```
 gem "better_errors"
 gem "binding_of_caller"

# Nhớ chạy lại  bundle

```
### So sánh kết quả
 Bây giờ ta sẽ xem kết quả hiển thị trước và sau khi sử dụng gem
- Ta có 2 trang hiển thị lỗi mặc định của rails
   + Hiển thị exception ta tạo ra phía trên:

![](https://images.viblo.asia/40983011-0942-4645-ac3f-1dcd79f299a4.png)
![](https://images.viblo.asia/271db13b-b4e5-41c6-a65b-f8a453ebbdc6.png)

- Với @post không tồn tại

![](https://images.viblo.asia/fa3fcdf5-2db3-42d0-8a4a-420b473a1ea3.png)
![](https://images.viblo.asia/ae0a1849-a0f8-4969-843d-ebd5fe693a89.png)

Như ta đã thấy, phần hiển thị sau khi sử dụng gem cho thấy được sự khác biệt rất lớn (rõ ràng về thông tin hiển thị lỗi, có thể tương console) giúp ta dẽ dàng trong việc tìm lỗi so với trang mặc định hiển thị lỗi của Rails ban đầu. 

### Link tham khảo
https://github.com/charliesome/better_errors