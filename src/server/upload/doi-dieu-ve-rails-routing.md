### Giới thiệu
Resource routing cho phép chúng ta khai báo 1 cách nhanh chóng các routes thường dùng cho controller. Thay vì khai báo từng route tách biệt: index, show, new, edit, create, update, destroy:
```
    get "users/index"
    post “users/update”
```
Resource route sẽ giúp chúng ta khai báo chúng chỉ 1 dòng:
```
    resources users
```

### Resources trên trình duyệt
Trình duyệt yêu cầu các trang từ Rails bằng việc tạo những request cho URL bằng một phương thức HTTP cụ thể, chẳng hạn như GET, POST, PATCH, PUT và DELETE.

Mỗi phương thức là 1 request để thực hiện 1 thao tác trên resource. Mỗi resource route ánh xạ đến 1 số nhưng request liên quan đến các actions trong 1 controller nào đó

Ví dụ khi ta nhận 1 request có dạng `DELETE /posts/33`

=> Nó sẽ gọi đến router để ánh xạ đến đúng action destroy trong PostsController và với tham số truyền vào hàm là id của post bằng 33 với phương thức DELETE

### Resources và Resource
Rails hỗ trợ tạo các routes cho 1 đối tượng đầy đủ restful routes chỉ với 1 dòng lệnh duy nhất. Ta có thể sử dụng resources hoặc resource để khai báo tuy nhiên có 1 chút sự khác nhau giữa hai cách khai báo này.

Khi sử dụng resources, Rails sinh ra cho ta 7 routes khác nhau trong ứng dụng. 

Ví dụ `resources :photos `

![](https://images.viblo.asia/38a33490-3c29-4fd8-98f0-952013d16e51.png)

Đặc biệt trong Rails còn hỗ trợ cho chúng ta tạo Singular Resources. Loại resources  này sẽ được sử dụng trong trường hợp chúng ta muốn thao tác với 1 bản ghi duy nhất trong 1 bảng ví dụ khi ta muốn hiển thị trang cập nhật tài khoản của 1 người nào nó mà không cần biết id của người này

Khi sử dụng resource, do chỉ cần làm việc với 1 đối tượng nên Rails chỉ sinh ra 6 routes mới và trừ 1 route đó là index. 

Ví dụ: `resource :geocoder`

![](https://images.viblo.asia/9c59e93b-6380-4970-801d-7426cf75f685.png)

### Nested resources

Nested Resources là một kĩ thuật trong Rails, nó dùng để phản ánh mối quan hệ has_many giữa các model trong routes và sau đó thể hiện nó qua URLs. Việc sử dụng Nested Resources giúp code dễ hiểu hơn, giúp code DRY (don't repeat yourself)

Ví dụ ta có 2 model có quan hệ has_many với nhau:

```
class Magazine < ApplicationRecord
  has_many :ads
end
```

```
class Ad < ApplicationRecord
  belongs_to :magazine
end
```

=> Một Magazine sẽ có nhiều Ads và 1 Ad thuộc về 1 Magazine

Trong file config/routes.rb ta cấu hình như sau:

```
resources :magazines do
  resources :ads
end
```

Ta sẽ có các routes của ads như sau:

| HTTP Verb | Path | Controller#Action | Used for |
| -------- | -------- | -------- |-------- |
| GET     | /magazines/:magazine_id/ads     | ads#index     |display a list of all ads for a specific magazine     |
| GET     | /magazines/:magazine_id/ads/new     | ads#new     |return an HTML form for creating a new ad belonging to a specific magazine     |
| POST     | /magazines/:magazine_id/ads     | ads#create     |create a new ad belonging to a specific magazine     |
| GET     | /magazines/:magazine_id/ads/:id     | ads#show     |display a specific ad belonging to a specific magazine     |
| GET     | /magazines/:magazine_id/ads/:id/edit     | ads#edit     |return an HTML form for editing an ad belonging to a specific magazine     |
| PATCH/PUT     | /magazines/:magazine_id/ads/:id     | ads#update     |update a specific ad belonging to a specific magazine     |
| DELETE     | /magazines/:magazine_id/ads/:id     | ads#destroy     |delete a specific ad belonging to a specific magazine     |

Đồng thời cũng tạo các url/path ví dụ như `magazine_ads_url` and `edit_magazine_ad_path`. Những helpers này sẽ yêu cầu 1 tham số đầu vào là 1 instance của magazine: `magazine_ads_url @magazine`

### Controller Namespaces and Routing

Rails cho phép bạn có thể nhóm các controller vào một namespaces bằng từ khóa namespace. Ví dụ nhóm các Articles và Comments controller trong Admin controller.

```
namespace :admin do 
 resources :articles
end
```

Khi đó, để xem được các bài viết bạn phải thêm tiền tố admin vào url: `/admin/articles`

Vẫn sẽ có 7 routes được tạo ra như sau bảng sau:

| HTTP Verb | Path | Controller#Action |Named Helper |
| -------- | -------- | -------- |-------- |
| GET     | /admin/articles     | /admin/articles#index     |admin_articles_path     |
| GET     | /admin/articles/new     | /admin/articles#new     |new_admin_articles_path     |
| POST     | /admin/articles   | /admin/articles#create     |admin_articles_path     |
| GET     |/admin/articles/:id     | /admin/articles#show     |admin_articles_path(:id)     |
| GET     | /admin/articles/:id/edit     | /admin/articles#edit     |edit_admin_articles_path(:id)     |
| PATCH/PUT     | /admin/articles/:id    | /admin/articles#update     |admin_articles_path(:id)     |
| DELETE     | /admin/articles/:id     | /admin/articles#destroy     |admin_articles_path(:id)     |

### Member và Collection

Nếu chúng ta muốn thêm các routes ngoài các RESTful routes, Rails hỗ trợ tạo thêm các routes này bằng việc sử dụng member hoặc collection

**Member routes**

Chúng ta sẽ đặt khối member ở trong khối resources

```
resources :photos do
  member do
    get 'preview'
  end
end
```

=> Đường dẫn tạo ra sẽ có dạng /photos/1/preview với phương thức là GET và nó sẽ gọi đến hàm preview trong PhotosController với params[:id] là tham số truyền vào. Đồng thời nó cũng tạo ra 2 helper preview_photo_url and preview_photo_path

**Collection Routes**

Để thêm 1 collection route

```
resources :photos do
  collection do
    get 'search'
  end
end
```

=> Collection routes  dạng /photos/ search với phương thức là GET và nó sẽ gọi đến hàm search trong PhotosController.

Collection routes được sử dụng trong trường hợp người dùng không muốn đường dẫn sẽ chứa id của resources chưa nó

### Nguồn tham khảo 
https://guides.rubyonrails.org/routing.html#resource-routing-the-rails-default