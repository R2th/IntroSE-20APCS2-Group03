# I. Giới thiệu
 Resource routing cho phép bạn tạo ra 1 cách nhanh chóng tất cả các routes cho bộ điều khiển. Thay vì khai báo cho từng route: index, show, new, edit, create, update và destroy; resource routes sẽ giúp bạn khai báo tất cả chúng chỉ trong 1 dòng.
#  II. Nội dung
##  1.  Resources on the Web
 - Trình duyệt yêu cầu các trang từ Rails bằng cách yêu cầu URL bằng một phương thức HTTP cụ thể, chẳng hạn như GET, POST, PATCH, PUT và DELETE. Mỗi phương thức là một yêu cầu để thực hiện một thao tác trên resource. Một resource route ánh xạ một số yêu cầu liên quan đến các hành động trong một controller duy nhất.
 - Ví dụ: Khi ứng dụng Rails của bạn nhận được yêu cầu đến:
 
 `DELETE /photos/17`
 nó yêu cầu routes ánh xạ nó tới một hành động trong controller. Nếu route phù hợp đầu tiên là:
 
`resources :photos`
- Rails sẽ gửi yêu cầu đó đến hành động destroy trong controller để xóa ảnh với {id: '17'} trong params gửi lên.
## 2. CRUD, Verbs, and Actions
- Trong Rails, một resourceful route cung cấpmột ánh xạ giữa các động từ HTTP và URL cho các hành động của controller. Theo quy ước, mỗi hành động cũng ánh xạ tới một hoạt động CRUD cụ thể trong cơ sở dữ liệu. Một mục duy nhất trong tệp routing, chẳng hạn như:
```ruby
resources :photos
``` 
tạo bảy route khác nhau trong ứng dụng của bạn, tất cả ánh xạ tới Photos controller:
![](https://images.viblo.asia/f7601ddc-5918-4549-881c-bdda11dedf02.PNG)
Vì router sử dụng HTTP verb và URL để khớp các yêu cầu gửi đến, bốn URL ánh xạ tới bảy hành động khác nhau.
## 3. Path and URL Helpers
- Tạo một resourceful route cũng sẽ đưa ra một số helpers cho các controller trong ứng dụng của bạn. Trong trường hợp `resources :photos:`
![](https://images.viblo.asia/3ccf4ac8-4286-40cb-ade5-2e3fcd9ca7bd.PNG)
- Mỗi helper này có một _url helper tương ứng (chẳng hạn như photos_url) trả về cùng một đường dẫn có tiền tố máy chủ, cổng và đường dẫn hiện tại.

## 4. Định nghĩa nhiều Resources cùng một lúc
- Nếu bạn cần tạo các  route cho nhiều resource, bạn có thể tạo như sau:

`resources :photos, :books, :videos`
Thay vì:
```ruby
resources :photos
resources :books
resources :videos
```
Bạn có thể chọn 1 trong 2 cách trên.

## 5. Singular Resources
- Đôi khi, bạn có một resource mà khách hàng luôn tìm kiếm mà không cần biết ID. Ví dụ: bạn muốn hiển thị hồ sơ của người dùng hiện đang đăng nhập. Trong trường hợp này, bạn có thể sử dụng tài nguyên số ít (nó sẽ hiện /profile thay vì hiển thị /profile/: id trên url) để hiển thị hành động:

`get 'profile', to: 'users#show'`

Truyền một String: sẽ yêu cầu định dạng controller#action. Khi sử dụng Symbol, to: nên được thay thế bằng action:. Khi sử dụng String không có #, to: nên thay thế bằng controller::
`get 'profile', action: :show, controller: 'users'`

- Đây là resourceful route:
```ruby
resource :geocoder
resolve('Geocoder') { [:geocoder] }
```
tạo sáu route khác nhau trong ứng dụng của bạn, tất cả ánh xạ tới Geocoders controller:
![](https://images.viblo.asia/75b4158b-6420-45a4-b8e7-8960b28b871e.PNG)
- Một singular resourceful route tạo ra các helper:
```ruby
new_geocoder_path returns /geocoder/new
edit_geocoder_path returns /geocoder/edit
geocoder_path returns /geocoder
```
- Cũng như các resource số nhiều, các helper tương tự kết thúc bằng _url cũng sẽ bao gồm tiền tố máy chủ, cổng và đường dẫn

## 6. Controller Namespaces and Routing
- Bạn có thể muốn tổ chức các nhóm controllers trong một không gian tên (namespace). Thông thường nhất, bạn có thể nhóm một số controller quản trị trong admin::namespace. Bạn sẽ đặt các controllers này trong thư mục app/controllers/admin và bạn có thể nhóm chúng lại với nhau trong router của mình:

```ruby
namespace :admin do
  resources :articles, :comments
end
```

- Điều này sẽ tạo ra một số routes cho mỗi articles và comments controller. Đối với Admin :: ArticleControll, Rails sẽ tạo:
![](https://images.viblo.asia/384ff6e3-dd25-4748-bc95-d7ba75fe11cc.PNG)

- Nếu bạn muốn định tuyến route /articles (không có tiền tố /admin) bạn có thể sử dụng:

```ruby
scope module: 'admin' do
  resources :articles, :comments
end
```
hoặc trong trường hợp duy nhất: 
`resources :articles, module: 'admin'`
- Nếu bạn muốn định tuyến /admin/articles đến ArticleControll (không có tiền tố Admin:: module), bạn có thể sử dụng:
```ruby
scope '/admin' do
  resources :articles, :comments
end
```
hoặc trong trường hợp duy nhất:
`resources :articles, path: '/admin/articles'`
- Trong mỗi trường hợp này, các routes được đặt tên vẫn giống như khi bạn không sử dụng scope. Trong trường hợp cuối cùng, các đường dẫn sau ánh xạ tới ArticleControll:

![](https://images.viblo.asia/e948db72-05ca-46fb-aef2-d5a07fa00277.PNG) 
# III. Kết luận
- Trên đây mình đã giới thiệu cho các bạn những kiến thức cơ bản của Resource Routing trong rails. Ở phần tiếp mình sẽ giới thiệu cho các bạn những kiến thức còn lại của Resource routing. Chúc các bạn học tốt.

- Tài liệu tham khảo: https://guides.rubyonrails.org/routing.html#the-purpose-of-the-rails-router