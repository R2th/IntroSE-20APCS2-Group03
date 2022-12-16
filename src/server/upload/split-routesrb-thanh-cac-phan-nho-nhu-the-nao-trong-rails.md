## 1. Đặt vấn đề
Mỗi ứng dụng được tạo ra sử dụng framework Ruby on Rails có một bộ routing và file config/routes để lưu trữ, định nghĩa các routes path. File này thường xuyên bị mở càng ngày càng rộng trong quá trình phát triển sản phẩm. Mỗi dòng routing được thêm vào trong file routes sẽ làm cho file này và cả hệ thống rất khó bảo trì. Thêm vào đó, việ tìm kiếm các đường dẫn cụ thể trong giai đoạn phát triển cũng trở nên khó khăn hơn rất nhiều. Đôi khi, mình đã từng đọc những đoạn code mà bộ routing của nó chứa khoảng 500LOC. Với mình, nó quá nhiều để tracking để tìm hiểu project đó. Nhưng, cách giải quyết khá đơn giản. Tất cả những gì chúng ta cần đó là: Chia file routes thành các thành phần nhỏ hơn dựa trên ý tưởng của nó.

## 2. Một chút về Routing

Khi một request đến từ brower, chúng ta đều biết là request đó sẽ được đi đến với routes để bộ định tuyến này có thể được xác định controller và action để chịu trách nhiệm cho request đó. 
Khi đi vào file `routes.rb`, file này sẽ đọc theo thứ tự từ trên xuống dưới. Khi routes đầu tiên phù hợp với request, request này sẽ được chuyển đến cho controller thích hợp. Trong trường hợp không tìm thấy path đúng với yêu cầu trong file, Rails server sẽ trả lỗi 404: "Routing Error". Do khả năng tự sắp xếp thứ tự tải các file, chúng ta có thể xác định độ ưu tiên cho các namespace của mình.

## 3. Giải pháp

Chúng ta hãy cùng xem một ví dụ đơn giản như sau trong file `routes.rb`

```
ActionController::Routing::Routes.draw do
  root to: "home#index"
  get "/about
  get "/login" => "application#login"


  namespace :api do
    #nested resources
  end

  namespace :admin do
    #nested resources
  end

  namespace :messages do
    #nested resources
  end

  namespace :orders do
    #nested resources
  end
end
```

Có rất rất nhiều namespace mặc định (với routes /home, /about, /login) và 4 namespace khác. Các namespace này xác định ngữ cảnh trong application của chúng ta. VÌ thế, chúng ta một ứng cử viên tuyệt vời cho việc chia nhỏ các file khác. Vì thế, chúng ta có thể tạo ra các `routes/api.rb` và `routes/admin.rb`, `routes/messages.rb`,  `routes/orders.rb`. 

Bước tiếp theo, đó là tải các tập tin ở đó lên. Ở bản Rails 5, việc load file route trong config của applcation voo cùng dễ dàng. 
Cuối cùng, chúng ta cos thể xem trong applcation.rb, cần có:
```
config.paths["config/routes"] += Dir[Rails.root.join('config/routes/*.rb’)]
```

Nếu bạn cần controller thứ tự load cá file, bạn có thể định nghĩa như sau:
```
config.paths["config/routes"] = %w(
      config/routes/messages.rb
      config/routes/orders.rb
      config/routes/admin.rb
      config/routes/api.rb
      config/routes.rb
    ).map { |relative_path| Rails.root.join(relative_path) }
```

Tuy nhiên, từ Rails version 4.2 trở đi, nếu bạn muốn thêm bất cứ gì vào applcation thì sẽ phải thêm ngoại lệ. Rails 4 không cung cấp `config/routes` key trong Rails::Engine nữa. Có một option khác hoạt động trong cả hai phiên bản của Rails để xử lý việc tách nhỏ file routes.
```
YourApplication::Application.routes.draw do

def draw(routes_name)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_name}.rb")))
end

  draw :messages
  draw :orders
  draw :api
  draw :admin

  root to: "home#index"
  get "/about
  get "/login" => "application#login" 

end
```

Điều này cho phép chúng ta thêm một method mới trong module giúp load path là ActionDispatch::Routing. 

## 4. Kết luận

Tách các file là một giải pháp rất đơn giản để cải thiện điều kiện của các routes trong file của chúng ta và phát triển hiệu quả hơn.

## Tham khảo thêm tại
https://github.com/rails/rails/commit/5e7d6bba79393de0279917f93b82f3b7b176f4b5