**Rails Routes** là gì? Request của người dùng sẽ được gửi đến đâu? Sự kết nối giữa Rails routes, Controller và View là gì? Rails RESTful là gì?...

Đó là những câu hỏi của nhiều người khi mới bắt đầu với Ruby on Rails, bài viết này sẽ giải thích một cách cơ bản nhất những câu hỏi trên đồng thời đưa ra các ví dụ sử dụng một số kỹ thuật của `Ruby on Rails` để giúp các bạn  dễ hiểu hơn về **Rails Routes**.
## 1. Rails Router là gì?
Routes trong Rails là một module có nhiệm vụ phát hiện ra các URL (request) từ trình duyệt gửi lên, nó cần phải biết mỗi một request chạy tương ứng với một action nào trong Controller. Nói một cách đơn giản thì khi người dụng nhập một đường dẫn url trên tên miền của bạn, Rails routes sẽ gọi đến đúng Controller và action tương ứng với url đó.Nếu không tìm thấy route phù hợp với yêu cầu, ứng dụng sẽ xảy ra lỗi. Ngoài ra, router còn sinh Paths và URLs từ code để người dùng có thể link nhanh đến đường dẫn mà họ muốn.


![](https://images.viblo.asia/404960a3-82e6-4d96-a717-f6971ae0f9f5.png)

Trong sơ đồ trên, yêu cầu của người dùng đối với URL `pages/home` sẽ đi từ trình duyệt của người dùng đến `Rails Router`. Sau đó `routes` sẽ quyết định rằng request trên sẽ được xử lý bởi `pages_controller.rb` và action `home` tương ứng. Cuối cùng một response được trả về cho user (controller render HTML lại cho user).

Ứng dụng Rails yêu cầu `routes` phải khớp với `request` của người dùng và các `action trong controller` tương ứng. Các `routes` trong một ứng dung Rails được cấu hình trong file `config/routes.rb`. Trong sơ đồ trên `routes` tương ứng là: 
```ruby
Rails.application.routes.draw do
  get "/pages/home", to: "pages#home"
end
```
Để kiểm tra các `routes` trong ứng dụng của mình bạn sử dụng lệnh `rails routes`.

![](https://images.viblo.asia/29cfb029-5123-45ee-b32b-1139ca00e57d.png)

Routes sẽ tự động ánh xạ request từ trình duyệt đến action hoặc method tương ứng của `pages_controller`. Sau đó action xác định trang nào sẽ được hiển thị cho người dùng ( ở đây trang được hiển thị là `home.html.erb`.

## 2. Rails RESTful
 REST là viết tắt của Representational State Transfer, hiểu một cách đơn giản thì REST là một kiến trúc trong lập trình website. Ứng dụng theo chuẩn RESTful sẽ coi web như một `resource`. Về cơ bản sẽ có 7 loại `action` mà bạn có thể làm với `resource`. 
 
* GET: index, show, new và edit
* POST: create
* PUT: update
* DELETE: destroy

Trong Rails bạn có thể tạo ra các `routes` mặc định của RESTful bằng cách xử dụng từ khóa `resources` theo sau là tên của controller tương ứng, ví dụ:
```
resources :users
```
Lệnh trên tạo ra tất cả 7 routes ánh xạ đến controller `users`.

Dùng lệnh `rails routes` để kiểm tra.

![](https://images.viblo.asia/3e11af2b-ee1f-4f49-8763-8ae74ae49ef1.png)

## 3. Resource routing
### 3.1. CRUD, Verbs và Actions
Mỗi `routes` có một ánh xạ giữa giữa HTTP verbs và URLs để điều khiển các hành động. Như ví dụ ở trên.
```
resources :users
```
tạo ra 7 routes khác nhau , tất cả ánh xạ đến Users controller.


| HTTP Verb | Path | Controller#Action | User for|
| ---------------- | ---------------- | ---------------- |---------------- |
| GET     | /users     | users#index     | Hiển thị tất cả user |
| GET     | /users/new     | users#new     | Trả về form HTML để tạo mới user |
| POST     | /users     | users#create     | Tạo mới user |
| GET     | /users/:id     | users#show     | Hiển thị một user |
| GET     | /users/:id/edit     | users#edit     | Trả về form HTML để sửa user  |
| PATCH/PUT     | /users/:id       | users#update     | Cập nhật một user |
| DELETE     | /users/:id       | users#destroy     | Xóa một user |

Giải thích qua một chút về bảng trên nhé :D

* **HTTP Verb**  là tên các phương thức.
* **Path** là đường dẫn sẽ hiển thị trên trình duyệt khi bạn thực hiện 1 hành động nào đó, chẳng hạn, phương thức GET với đường dẫn là /users/:id sẽ thực hiện hành động `show` để hiển thị thông tin `user` mà  `id` được truyền vào.

### 3.2 Path và URL helper

Việc tạo một resourceful route cũng tạo ra 1 số helper cho controller trong ứng dụng của bạn. Đó chính là `path` và `url`, Trong trường hợp với `resources :users` ta có:

* users_path: trả về tất cả các user
* new_user_path: trả về user/new
* edit_user_path(:id): Trả về /user/:id/edit
* user_path(:id) Trả về /users/:id

### 3.3 Controller Namespaces and Routing
Rails cho phép bạn có thể nhóm các controller vào một namespaces bằng từ khóa `namespace`. Ví dụ nhóm các `Articles` và `Comments` controller  trong `Admin` controller.
```ruby
namespace :admin do 
 resources :articles, :comments
end
```
Khi đó, để xem được các bài viết bạn phải thêm tiền tố `admin` vào url.
```
/admin/articles
```
Vẫn sẽ có 7 routes được tạo ra như sau bảng sau:
| HTTP Verb | Path | Controller#Action | Named Helper|
| ---------------- | ---------------- | ---------------- |---------------- |
| GET     | /admin/articles     | /admin/articles#index     | admin_articles_path |
| GET     | /admin/articles/new     | /admin/articles#new     | new_admin_articles_path |
| POST     |/admin/articles     | /admin/articles#create     | admin_articles_path |
| GET     | /admin/articles/:id     | /admin/articles#show     | admin_articles_path(:id) |
| GET     | /admin/articles/:id/edit     | /admin/articles#edit     | edit_admin_articles_path(:id)  |
| PATCH/PUT     |/admin/articles/:id       | /admin/articles#update     | admin_articles_path(:id) |
| DELETE     | /admin/articles/:id       | /admin/articles#destroy     | admin_articles_path(:id) |


### 3.4 Giới hạn route muốn sử dụng
Rails cho phép các lập trình viên có thể lựa chọn các `action` mà họ muốn sử dụng bằng cách sử dụng các từ khóa như `only` hoặc `except`. Ví dụ:
```ruby
resources :posts, only: [:index, :show]
resources :users, except: [:index]
```
Với cách config như trên thì với  `post` bạn chỉ có 2 routes tương ứng với `index` và `show` đó là tác dụng của `only`. Ngược lại khi sử dụng `except` với `user` bạn sẽ có tất cả routes theo mặc định của RESTful ngoại trừ routes ứng với `index` dễ hiểu đúng không :D.

### 3.5 Non-RESTful Routes

RESTful là lựa chọn mặc định của 1 ứng dụng Rails, tuy nhiên bạn cũng có thể tự tạo ra một routes riêng và anh xạ nó vào 1 controller nhé.
```ruby
get "/help", to: "static_pages#help"
```
Tuy nhiên khi còn có thể thì bạn vẫn nên cố gắng tuân thủ theo RESTful nhé :D.

### 3.6 Resources hay Resource?
Từ đầu bài viết đến giờ trong các ví dụ của mình đều chỉ dùng `resources` vậy nên các bạn cũng đã hiểu được `resources` làm được những gì trong ứng dụng Rails rồi đúng không? Tuy nhiên trong Rails cũng cung cấp cho lập trình viên một từ cách khác để tạo `routes` gần giống với `resources` đó là `resource`. Phần này sẽ nêu ra những điểm khác nhau giữa `resources` và `resource`.

Đầu tiên hãy xem sự khác nhau giữa 2 options này nhé!

 Với `resources`
 ```ruby
 resources :users
 ```
 Kết quả `rails routes`.
 
 ![](https://images.viblo.asia/73b515f2-668c-4334-8332-8dd85ba7299b.png)
 
 Như các bạn biết `resources` cung cấp cho lập trình viên đủ 7 `routes` là: `index, new, create, show, edit, update, destroy` theo đúng kiến trúc của RESTful đế hỗ trợ việc tương tác với database.
 
  Với `resource`
 ```ruby
 resource :user
 ```
 Kết quả `rails routes`
 
 ![](https://images.viblo.asia/b39b0d33-f617-40e3-8359-2091ec6a7851.png)

Còn với `resoucre` thì chỉ còn 6 `routes` thôi:   `new, create, show, edit, update, destroy`. Và cũng dễ thấy trong các `routes` không sử dụng đến `:id`.

Vậy thì khi nào dùng đến `resoucre` nhỉ?

Ví dụ nhé:  Khi người bạn muốn cho người dùng có thể xem thông tin của họ mà không cần `id`, lúc đó đường dẫn của bạn chỉ đơn giản là `/profile` thôi cũng có thể hiển thị thông tin của người đang đăng nhập hiện tại.
### 3.6 Nested Resources

`Nested Resources` là một kĩ thuật trong Rails, nó dùng để phản ánh mối quan hệ `has_many` giữa các `model` trong `routes` và sau đó thể hiện nó qua URLs. Việc sử dụng `Nested Resources` giúp code dễ hiểu hơn, giúp code DRY (don't repeat yourself). ví dụ sau đây sẽ giúp bạn hiểu hơn về `Nested Resources`.

```ruby
#app/models/club.rb
class Club < ActiveRecord::Base
    has_many :fighters
end


#app/models/fighter.rb
class Fighter < ActiveRecord::Base
    belongs_to :club
end
```
Một `club` sẽ có nhiều `fighters` và một `fighter` sẽ thuộc về một `club`.

Trong file `config/routes.rb` ta cấu hình như sau: 

```ruby
resources :clubs do
  resources :fighters
end
```
Bây giờ ta đã có `Nested Resources` trong ứng dụng của mình, kiểm tra các `routes` đó nhé~
```
rails routes
```

![](https://images.viblo.asia/4ced07b0-4e66-4825-a8aa-161ac8ef0d34.png)

 Done! Vậy là Rails vẫn tạo ra đầy đủ các `routes` theo chuẩn RESTful, và nó sẽ có thêm tiền tố là `clubs/:club_id` đúng những gì chúng ta mong muốn.
 
 Đến đây thay vì phải code như thế này trong file **clubs_controller.rb**.
 ```ruby
 def fighters_index
  @club = Club.find_by :id params[:id]
  @fighters = @club.fighters
  render template: "fighters/index"
 end
 ```
 Thì chúng ta có thể code mà vẫn tuân thủ các nguyên tắc của kiến trúc RESTful, ở trong file **fighters_controller.rb** ta viết:
 ```ruby
def index
  if params[:club_id]
    @fighters = Club.find_by(:id params[:club_id]).includes(:clubs).fighters
  else
    @fighters = Fighter.all
  end
end
 ```
 
 ## 4. Kết luận
 Trên đây là nhưng điều cơ bản về `Rails Routing` trong Rails mà tôi đã tìm hiểu được. Hy vọng thông qua bài viết này các bạn sẽ hiểu hơn về `Rails Routing` trong Rails. 
 
 Cảm ơn vì đã đọc bài!
 
 Nguồn tham khảo:
 
 https://guides.rubyonrails.org/routing.html#nested-resources
 https://dev.to/brittanytinnin/nested-resources-in-rails-5-4oea
 https://stackoverflow.com/questions/11356146/difference-between-resource-and-resources-in-rails-routing