Vào một ngày trời oi bức! thanh niên Sả đang loay hoay đọc và tìm hiểu về routes. đọc docs mãi chả thấy hiểu, cộng thêm tiết trời oi nóng nên quyết định mang máy ra quán cafe gần nhà! cũng vào hôm đó thanh niên Húng Chó đang chán đời vì bị bạn gái bỏ do OT quá nhiều cũng ra quán càfe đó! đang ngồi uống thì Húng Chó ngó thấy ông Xả đang bù đầu tóc rối, hỏi mới biết là hắn ta đang học routes trong rails. Húng Chó đang rảnh thế là câu chuyện bắt đầu:

> Húng Chó: Tôi thấy ông đang đọc rails routes đúng không? có gì khó à! tôi cũng biết chút, tôi chỉ cho!


> Sả: Ô ngon, gặp đúng cao nhân! tôi đang đọc routes mà chả biết bắt đầu từ đâu, tôi mới học và cũng đang tự tìm hiểu.

> Húng Chó: Ok tôi hôm nay cũng đang rảnh! để tôi chỉ cho.
> trước khi học về routes, ông phải nắm được chút ít về REST đã,nó được viết tắt của `Representational State Transfer`, các ứng dụng RESTful thường xử lý website như resource (không phải là hành động) với một số phương thức HTTP được định nghĩa để biểu đạt hành động được thực thi của người dùng.
> ví dụ ông cứ ngó qua cái bảng này đi đã nhé:

| Phương thức HTTP | Sử dụng trong trường hợp | Ví Dụ |
| -------- | -------- | -------- |
| GET    | Truy xuất resource    | Truy xuất một danh sách các nhân viên trong một nhóm của công ty.   |
| POST | Tạo resource | Tạo một tài khoản cho hệ thống. |
| PUT | Cập nhật toàn bộ thông tin của resource| Cập nhật lại profile cho một nhân viên. có thể chỉnh sửa toàn bộ các thông tin của nhân viên đó|
|PATCH| Cập nhật một phần thông tin của resource| Cập nhật mật khẩu cho tài khoản|
|DELETE| Xóa resource| Xóa thư rác|
> Sả: Trước tối đọc thì thấy trình duyệt hỗ trợ có 2 phương thức là POST và GET, sao ở đây lại có nhiều phương thức khác như vậy ông?

> Húng Chó: Đúng rồi đó ông! nếu ông từng làm với form UPDATE của rails thì chắc hẳn ông phải thấy một thẻ input hidden với thuộc tính 
> ```<input name='_method' type='hidden' value='patch' />``` khi request của ông được gửi lên và xử lý ở Rails thì nó sẽ đọc ra được method tương ứng để phù hợp với RESTful, cái này tương tự khi ông dùng Ajax trong ứng dụng của ông nhé!

> Sả: Ồ ra là vậy! hay quá! tôi thấy cũng hiểu về RESTful rồi! ông chỉ tôi về routes nhé!

> Húng Chó: tất nhiên rồi! bắt đầu này. Đầu tiên ông mở cho tôi file `config/routes.rb`!...ok tôi thấy ông có một cái cấu trúc trong file đó rồi kìa.
```
get "users", to: "users#index"
# lấy ra một danh sách users

get "users/:id", to: "users#show"
# Lấy 1 user cụ thể theo id.

post "users", to: "users#create"
# Tạo user mới.

put "users/:id"
# update thông tin một user với id tương ứng.

patch "users/:id"
# update một user với id tương ứng.

delete "users/:id"
# Xóa user có id tương ứng.
``` 

>Hiện Phần trên này tôi thấy cũng ok rồi đó! nhưng đó là cách hơi chày cối, ông nên viết ngắn lại hơn mà vẫn có hiệu quả tương tự.
```
resources :users
```
> Nào cũng chạy lệnh `rails routes` trên terminal xem có khác biết không nhé!

> Sả: Hay quá ông ơi! Giống nhau y hệt này!
```
                    users GET    /users(.:format)                                                                         users#index
                          POST   /users(.:format)                                                                         users#create
                 new_user GET    /users/new(.:format)                                                                     users#new
                edit_user GET    /users/:id/edit(.:format)                                                                users#edit
                     user GET    /users/:id(.:format)                                                                     users#show
                          PATCH  /users/:id(.:format)                                                                     users#update
                          PUT    /users/:id(.:format)                                                                     users#update
                          DELETE /users/:id(.:format)                                                                     users#destroy
```
> Sả: ông giải thích cho tôi sao lại có cái thằng `resources` đó không?

> Húng Chó: Khi ông dùng `resources` thì sẽ thông báo cho Rails biết rằng ông dùng các action trong controller tương ứng với đầy đủ các phương thức và action của RESTful kia thôi. à thêm chút là nó là dành cho các collection có thể có nhiều resource. còn có một keyword khác nữa là `resource` thì nó dành cho resource nào chỉ có một. ví dụ dưới đây này:

```
resource :privacy_policy
```
> Chính sách bảo mật thì chỉ có 1 thôi đúng không, nên mọi action của ông chỉ hướng tới 1 resource đó thôi. chú ý thể số ít và số nhiều của symbol là tham số của 2 keyword trên nhé (resource và resources).

> Sả: Thế giờ tôi không muốn có action `delete` ở `resource :privacy_policy` được không ông?

> Húng Chó: được chứ! ông chỉ cẩn thêm tham số thứ 2 là `except` hoặc `only` và value của nó là 1 mảng gồm các symbol đại diện cho action mà ông cần lấy thôi!
> như trường hợp ông hỏi tôi ở trên thì đơn giản thế này là xong này:
```
resource :privacy_policy, except: :delete
```

> Sả: Tôi thấy nó ngon lên rồi đây! à thế ngoài các action mặc định thường có (index new create show edit update destroy) thì tôi muốn tự định nghĩa cho tôi một action có được không ông?

> Húng Chó: Tất nhiên là ok rồi ông!
```
resources :users do
  put :upgrade #=> put "/users/:id/upgrade"
end
```
> Sả: như thế kia thì dành riêng cho đối tượng cụ thể rồi tôi muốn dùng cho collection thì phải sửa như thế nào?

> Húng Chó: ông làm theo 1 trong 2 cách tôi chỉ đây nhé!
```
resources :users  do
  collection do
    put :upgrade #=> put "/users/upgrade"
  end
end
```
hoặc cách 2 (dùng cho ít routes được thêm):
```
resources :users  do
  put :upgrade, on: :collection #=> put "/users/upgrade"
end
```

> Sả: ông nói đến users và posts làm tôi này ra câu hỏi này: làm sao để tôi có các action của post theo từng user nhỉ? ví dụ như lấy hết các bài post của 1 user cụ thể nào đó?

> Húng Chó: Được đó! tôi thấy ông hiểu dần rồi đó! để làm như trên thì ông nên dùng nested resource được hỗ trợ như sau nhé:
```
resources :users do
   resources :posts
end
``` 
> Chạy `rails routes` để cảm nhận nào!
> Rails hỗ trợ cả Alias và redirect đó ông! trong tường hợp ông ghét cái mặt thằng route nào! ông alias nó với cái tên khác sẽ cool ngầu hơn đấy. ví dụ nhé:

```
get 'login', to: "sessions#new" #=> http://localhost:3000/login
get 'logout', to: "sessions#destroy" #=> http://localhost:3000/logout
```
> Nhìn nó thân thiện hơn rồi chứ! còn cái thằng redirect thì cái này dùng để chuyển hướng từ đường dẫn này sang đường dẫn khác
```
get 'chemgio/', to: redirect("/noithatlong")
# redirect http://localhost:3000/chemgio/ to http://localhost:3000/noithatlong/

get "/products/product_info", to: redirect {|params, req|
    begin
      id = req.params[:products_id]
      product = Product.find(id)
      "/products/#{product.slug}"
    rescue
      "/products"
    end
}

# cái này ông đọc code là hiểu ngay nhé! nhưng tôi nghĩ cái này cũng không hay xuất hiện lắm! :v:
```

> Sả: Hay quá ông! ông cho tôi hỏi nốt chút này nhé! khi tôi làm trang admin đó! làm sao để phân tách ra các routes cho admin?

> Húng Chó: Cái này thì rất đơn giản nhé ông! ông chỉ cần dùng `namespace` là được:
```
namespace :admin do
  get 'users' => "posts#index" # http://localhost:3000/admin/users
end
```

> Sả: Hay quá ông ơi! tôi thấy nó chạy ổn rồi này, Cảm ơn ông nhé! ra đây được gặp ông may mắn quá! để tôi mời ông ly nước hôm nay nhé?

Đúng lúc đó, người yêu của Húng Chó gọi cho anh và sau cuộc gọi đó 2 người đã quay lại với nhau, anh vào vội chào Sả rồi chim cút đến chỗ người yêu luôn! một kết thúc đẹp.