Trong bài này, mình sẽ không đưa ra về nguyên lí hoạt động của route ra sao, cơ chế của nó như thế nào, mà tập chung list lại nhưng options hay sử dụng mà đôi khi anh em lại lẵng quên nó:

### 1. resources:
Tạo ra 7 đường routes dành cho các method mặc định trong controller: Index, new, create, update, edit, destroy, show.
Có thể sử dụng options `:only` để giới hạn những method cần dùng
### 2. resource:
Gần giống với resources, nhưng không có route dành cho INDEX:
Bao gồm 6 routes: new, create, update, edit, destroy, show.
### 3. get, post, put, delete:
Sử dụng khi bạn không muốn tạo cả 1 nhóm theo resources mà muốn tạo riêng 1 custom route nào đó.

Ví dụ:

```

Get '/information', to: 'users/information' # khi dùng url '/information' nó sẽ dẫn đến method `information` nằm trong controller `app/users_controller.rb`
```

Tương tự với post, put, delete

### 4. collection và member:
Hai thằng này thường được sử dụng trong resources dùng để tạo ra các routes cho các method không phải mặc định của controller.

Điểm khác nhau của chúng là: collection Không require ID, còn member có require ID từ resources chứa nó:

Ví dụ:

```
resources :photos do
  collection do
    get :search
  end
end
```

route cho :search ở đây sẽ là `/photos/search` không cần ID của photo, nhưng `member` thì khác:
```
resources :photos do
  member do
    get :preview
  end
end
```

Route của :search trong trường hợp này là '/photos/:id/search'

### 5. Namespace:

Controller của bạn có đường dẫn là app/admin/users_controller.rb
thì route sẽ cần phải viết là:

```
namespace :admin do
    resources :users
end
```

### 6. Scope module:

Ví dụ bạn có 1 controller app/admin/users_controller.rb, với cách viết namespace thì bạn sẽ có route là /admin/users

Giờ bạn cần một routes cho method send_mail nằm trong users_controller.rb ở trên nhưng lại muốn route không có namespace là 'admin' ????

Lúc này chúng ta cần phải dùng module ở đây:

```
scope module: :admin do
    post '/send_mail', to: 'users#send_mail'
end
```

Ok, giờ bạn đã có '/send_mail' chọc thẳng vào app/admin/users_controller.rb#send_mail rồi đó.

-------------------------------------_THE END -----------------------------------------------------------------