# 4. Kiến thức về Rails
## RESTful là gì? Cách viết route
Web service là một dịch vụ mà nó kết hợp các máy tính cá nhân với các thiết bị khác, các cơ sở dữ liệu và các mạng máy tính để tạo thành một cơ cấu tính toán ảo mà người sử dụng có thể làm việc thông qua các trình duyệt mạng.
RESTful web service là các dịch vụ web được xây dựng dựa trên cấu trúc REST (Representational State Transfer). Tức là nó giống như một kiến trúc, nguyên tắc cần tuân theo để thiết kế, xây dựng một web service. <br>
Trong kiến trúc REST mọi thứ đều được coi là tài nguyên, chúng có thể là: tệp văn bản, ảnh, trang html, video, hoặc dữ liệu động… <br>
Và nội dung của kiến trúc REST bao gồm bốn nguyên tắc cơ bản sau:<br>
GET: dùng để truy xuất một tài nguyên<br>
POST: dùng để tạo một tài nguyên trên máy chủ<br>
PUT/PATCH: dùng để thay đổi trạng thái một tài nguyên hoặc để cập nhật nó.<br>
DELETE: dùng để huỷ bỏ hoặc xóa một tài nguyên.
### Cách viết route
#### Cấu trúc của một route
```ruby
get/post/patch "URL", to "controller#action", as "name shortcut"
```
#### Root Resources
```ruby
root "controller#action"

namespace :admin do
  root to: "admin#index"
end

root to: "home#index"
```

#### member and collection route?
```ruby
resources :employees do
  member do
    get :preview
  end
  collection do
   get :search
  end
end
```
Member truyền id vào qua params 
`/photos/1/preview employee_preview_url`
Collection không truyền id vào route
`/photos/search/search_employees_url`

#### resources

resources :models => tạo 7 route tương ứng (new create show index edit update destroy)

#### namespace
Khi bạn sử dụng namespace, nó sẽ thêm tiền tố đường dẫn URL cho các tài nguyên được chỉ định, và cố gắng xác định vị trí controller theo một mô-đun có tên giống như tên namespace của bạn
```ruby
namespace :admin do
  resources :users
end
```
Admin đã được thêm vào như một tiền tố trong URL (/admin/users)<br>
Tìm views ở `views/admin/users/…`<br>
Mong đợi `Admin::UsersController` được đặt tại `app/controllers/admin/users_controller.rb`

#### scope
Khi sử dụng scope mà không có bất kỳ tùy chọn, chỉ có tên scope => chỉ thay đổi URL
```ruby
scope :admin do
  resources :users
end
```
`users		GET  	 /admin/users(.:format)		users#index`<br>
Rails sẽ mong đợi `UsersController` được đặt tại `app/controllers/users_controller.rb`<br>
scope cung cấp 3 options: **module, path, as**<br>
**module** cho phép chúng ta yêu cầu Rails mong đợi tại tên module<br>
```ruby
scope module: 'admin' do
  resources :users
end
```
`users		GET		/users(.:format)		admin/users#index`<br>
URL và đường dẫn không thay đổi, tìm views ở `views/users/…`<br>
Tuy nhiên, rails sẽ mong đợi `Admin::UsersController` được đặt tại `.../admin/users_controller.rb`

**path** cho phép chúng ta đặt tiền tố sẽ xuất hiện trong URL, trước tên tài nguyên.
```ruby
scope module: 'admin', path: 'fu' do
  resources :users
end
```
`users		GET		/fu/users(.:format)		admin/users#index`<br>
URL sẽ trở thành: http://localhost/fu/users<br>
Đường dẫn không thay đổi, sẽ tìm views ở `views/users/…`<br>
Rails sẽ mong đợi `Admin::UsersController `được đặt tại `.../admin/users_controller.rb`

**as** có thể được sử dụng để thay đổi tên của đường dẫn sử dụng để xác định tài nguyên.
```ruby
scope module: 'admin', path: 'fu', as: 'cool' do
  resources :users
end
```
`cool_users		GET		/fu/users(.:format)		admin/users#index`<br>
URL sẽ trở thành: http://localhost/fu/users<br>
Sẽ tìm views ở `views/cool/users/…`<br>
Rails sẽ mong đợi `Admin::UsersController` được đặt tại `app/controllers/admin/users_controller.rb`
<br> Nếu bạn sử dụng:
```ruby
scope module: 'admin', path: 'admin', as: 'admin' do
  resources :users
end
```
thì nó sẽ tương đương với
```ruby
namespace :admin do
  resources :users
end
```
 
## Render and Redirect_to?
**render**<br>
Gọi tới render sẽ tạo một response đầy đủ trả về cho browser. Nếu không chỉ rõ render trong controller action. Rails sẽ tự động tìm kiếm và render template tương ứng dựa vào tên controller action.<br>
**redirect_to**<br>
Khác với render công việc của redirect_to là điều hướng browser, yêu cầu browse tạo một request mới đến một URL khác.<br>
**Ví dụ:** redirect_to photos_url, hoặc tới một website khác redirect_to "https://sbc.com". <br>
Mặc định Rails sử dụng "302 Moved" redirect, ta có thể thay đổi bằng option status redirect_to photos_path, status: 301.<br>
Ngoài ra còn có phương thức redirect_back hoạt động tương tự nhưng là điều hướng về trang trước lúc thực hiện request (buộc phải chỉ định option fallback_location).<br>
**Chú ý:** redirect_to và redirect_back không dừng method lại ngay mà chỉ thực hiện response, nghĩa là các câu lệnh sau đó trong method vẫn sẽ được thực thi

## Một số phương thức cơ bản khi thao tác với dữ liệu
**new** tạo mới một object nhưng chưa lưu vào database<br>
**save** lưu object nếu object là một bản ghi mới được tạo ra trong cơ sở dữ liệu, nếu không sẽ tiến hành cập nhật mới return ra true nếu thành công hoặc false nếu thất bại (lỗi)<br>
**save!** tương tự save, chỉ khác khi gặp lỗi thì sẽ raise ActiveRecord::RecordInvalid.<br>
Ta có thể lấy lỗi từ ActiveRecord::Validations <br>
**create** tạo một đối tượng (hoặc nhiều đối tượng) và lưu nó vào cơ sở dữ liệu, nếu xác thực hợp lệ.<br>
Đối tượng kết quả được trả về cho dù đối tượng đã được lưu thành công vào cơ sở dữ liệu hay không.<br>
**create!** giống như create, nhưng nếu bản ghi không hợp lệ, sẽ xuất ra một ngoại lệ.<br>
destroy sẽ gọi đến tất cả các quan hệ phụ thuộc trong model và thực hiện hành động xóa chúng. Có thể gọi lại callbacks được khi có vấn đề về dữ liệu.<br>
**delete** tương tự destroy nhưng sẽ không thực hiện callbacks được.<br>
**update** là public class method bạn gọi trực tiếp từ model class. Có 2 tham số truyền vào là id và hash các attributes. Hàm này sẽ thực hiện update các attributes của record chứa id tương ứng.<br>
**update!** giống update, chỉ khác là hàm này sẽ raise exception nếu update không thành công, còn hàm update sẽ return false<br>
**update_attributes** được gọi từ một object của model class. Hàm thực hiện update tất cả các attributes được truyền vào từ params<br>
**update_attribute** được gọi bởi một object của class model. Nó chỉ có thể update một attribute của object đó. Tuy nhiên, có một số thứ đặc biệt ở đây:<br>
Trường được update sẽ bị bỏ qua validate<br>
Callback vẫn chạy<br>
updated_at vẫn được cập nhật<br>
**update_columns** tương tự như update_attributes. Tuy nhiên, hàm này nó sẽ update trực tiếp vào DB. Và:<br>
Bỏ qua validate<br>
Callback không thực thi<br>
updated_at không được cập nhật

## Phân biệt count, size, length
### count
Khi sử dụng count. Nó sẽ dùng câu lệnh sql (SELECT COUNT() FROM…) để truy vấn ra số lượng của activerecord mà chúng ta truy vấn.<br>
Một điều quan trọng nữa là count không được lưu trữ trong đối tượng mà chúng ta gọi, nghĩa là một lần gọi count thì nó sẽ thực hiện một truy vấn (SELECT COUNT() FROM…) vào database dù cho trước đó bạn đã gọi hay chưa, tuy nhiên câu lệnh (SELECT COUNT(*) FROM…) hoạt động cực kỳ nhanh.

### length
Khi sử dụng length, nó sẽ đếm số lượng mà không sử dụng thêm câu truy vấn nếu đối tượng đó đã được nạp, ngược lại nó sẽ nạp toàn bộ object của bạn vào bộ nhớ và thực hiện đếm => Bad<br>
```ruby
2.1.2 :057 > collection = User.all
2.1.2 :058 > collection.length
  User Load (140.9ms)  SELECT `users`.* FROM `users`
 => 16053
2.1.2 :060 > collection.length
 => 16053
```
Khi gọi length lần thứ 2 trở đi, length sẽ không còn load từ database nữa, mà trả về luôn kết quả (đã được lưu trong bộ nhớ)
### size
Khi object đã được load, nó sẽ thực hiện trên chính object đó trong bộ nhớ (không query vào database, tương tự length ở lần thứ 2 trở đi)<br>
Còn khi object đó chưa được load, nó sẽ thực hiện câu lệnh SELECT COUNT(*) câu lệnh cực kỳ nhanh trong SQL)

## Phân biệt nil, empty, blank, present
### nil?
Cung cấp bởi Ruby<br>
Có thể sử dụng trên bất kỳ đối tượng nào<br>
Trả về boolean, nếu nil thì là true, ngược lại là false.
### empty?
Cung cấp bởi Ruby<br>
Dùng để check xem object có empty không? nếu rỗng (empty) thì là true, ngược lại là false<br>
empty? chỉ sử dụng trên các đối tượng dạng tập hợp (collection) như Hash, Array, Set, String.
### blank?
Cung cấp bởi Rails<br>
Dùng cho bất kỳ object nào<br>
Trả về true nếu object là giá trị là nil, false, empty, 1 chuỗi chỉ gồm các khoảng trắng; ngược lại false<br>
number và time sẽ không có blank? -> Chúng sẽ luôn trả về false.
### present?
Được cung cấp bởi Rails<br>
present? là phủ định của blank? và có thể sử dụng ở bất cứ đâu
### empty? và blank?
empty? chỉ lấy ra số lượng các bản ghi đáp ứng được điều kiện<br>
blank? lấy ra tất cả các bản ghi đó và đếm số lượng chúng<br>
Các quan hệ đã được tải trước, cả hai đều có hiệu năng như nhau.
### any? và exists?
exists? luôn luôn truy vấn từ cơ sở dữ liệu và không bao giờ dựa trên những bản ghi được tải lên trước, chỉ lấy ra 1 bản ghi,

## Eager loading - n+1 query là gì? Làm thế nào để tránh n+1 query?
n+1 query xảy ra khi lấy dữ liệu record con qua record cha trong quan hệ 1: nhiều; ORM mặc định kích hoạt chức năng lazy-loading, nên các truy vấn được tìm tới bản ghi "cha", sau đó mới thực hiện từng truy vấn đối với các bản ghi "con" dẫn tới có quá nhiều truy vấn được thực hiện => giảm hiệu suất.<br>
Rails có một số phương thức để tránh n+1 query như `preload, eager load, includes`.<br>
#### Ví dụ: Author has many Post
### 1. preload:
Thực hiện 2 câu truy vấn: một query để load dữ liệu của cha, một query để load dữ liệu liên kết<br>
```ruby
@posts = Post.order(created_at: :desc).preload(:author)
```
### 2. eager_load:
Luôn luôn sử dụng LEFT OUTER JOIN trong mọi trường hợp, lấy mọi dữ liệu liên kết trong một query duy nhất<br>
```ruby
@posts = Post.order("authors.name").eager_load(:author)
```
### 3. includes:
Vừa có thể thực hiện từng câu query riêng biệt giống preload, vừa có thể thực hiện gộp nhiều câu queries giống eager_load nếu có references<br>
Thực hiện từng câu query riêng biệt giống preload<br>
```ruby
@posts = Post.order(created_at: :desc).includes :author
```
Gộp nhiều câu queries giống eager_load nếu có references
```ruby
User.includes(:products).where("products.name=?","Product1").references(:products)
```