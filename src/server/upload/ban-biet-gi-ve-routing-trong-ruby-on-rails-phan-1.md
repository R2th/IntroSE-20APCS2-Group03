*Hẳn những bạn mới tiếp cận với Ruby on Rails như mình khi bắt đầu sử dụng đến route đều có những thắc mắc kiểu như: route là gì?, tại sao lại có path và url, userpath và userspath có gì khác nhau?,... Vậy thì ở bài viết này mình sẽ giới thiệu với các bạn về Routing trong Rails đề phần nào giải đáp những thắc mắc kể trên và có cái nhìn tổng quan hơn về nó.*
# 1.Router là gì?
Router có thể hiểu nôm na là "người giữ cửa" cho ứng dụng của bạn. Khi một HTTP Request được gửi đến từ trình duyệt, nó cần phải biết nên chạy ở controller nào với action nào. Về cơ bản thì nó sẽ nhìn vào các method như get, post,... và URL được yêu cầu để tìm đến đúng controller để thực hiện. Nếu không tìm thấy route phù hợp với yêu cầu, ứng dụng sẽ xảy ra lỗi. Ngoài ra, router còn sinh Paths và URLs từ code để người dùng có thể link nhanh đến đường dẫn mà họ muốn. Nói xuông có vẻ hơi khó hiểu, vậy thì các bạn hãy nhìn vào ví dụ dưới đây: 
Trong route bạn có:


```
get '/patients/:id', to: 'patients#show', as: 'patient'
```

Trong controller thực hiện việc tìm bệnh nhân:

```
@patient = Patient.find_by id: params[:id]
```

Ở đây router sinh path như dưới đây: 

```
<%= link_to 'Patient Record', patient_path(@patient) %>
```
# 2. RESTful Routes

Trước khi bắt đầu với routing, ta cần biết đôi chút về REST. REST là viết tắt của Representational State Transfer. Ứng dụng theo chuẩn RESTful sẽ coi web như một resource. Về cơ bản sẽ có 7 loại hành động mà bạn có thể làm với `resource`. Chúng là:
- GET: có 4 hành động index, show, new và edit
- POST: create
- PUT: update
- DELETE: destroy

Ví dụ cụ thể hơn mình sẽ đề cập ở phần sau.
Rails biết rằng chúng muốn sử dụng cả 7 hành động trên nhiều lần, do đó nó cung cấp cho chúng ta một helper để có thể viết chúng trong 1 dòng thay vì 7 dòng như trước:

`resources :photos`

Dòng trên là 1 phương thức trong Ruby, đơn giản là nó xuất ra 7 routes mà mình đã nói ở trên. Các bạn chắc hẳn đã thấy nó rất nhiều lần. Giờ thì bạn biết nó là gì rồi đấy

# 3. Resource routing
### * **CRUD, Verbs và Actions**

Như đã nói ở trên, route có 1 ánh xạ giữa HTTP verbs và URLs để điều khiển các hành động. Để thuận tiện thì mỗi hành động ánh xạ với một CRUD(create, read, update, delete) trong database. Cụ thể hơn ở bảng dưới đây:

```
resources :photos
```
tạo ra 7 routes khác nhau , tất cả ánh xạ đến Photos controller:

![](https://images.viblo.asia/016696a3-8e64-4bb6-9029-fff7d5d23c84.png)

Bảng trên chắn hẳn các bạn đã quá quen thuộc rồi vì vậy mình sẽ chỉ nói rõ hơn một chút. Cột đầu tiên là phương thức của mỗi route. Path là đường dẫn sẽ hiển thị trên trình duyệt khi bạn thực hiện 1 hành động nào đó. Chẳng hạn, phương thức `GET` với đường dẫn là `photos/:id` sẽ thực hiện hành động `show` là hiển thị photo của id được truyền vào

### * **Path và URL helper**

Việc tạo một resourceful route cũng tạo ra 1 số helper cho controller trong ứng dụng của bạn. Đó chính là path và url mà mình đã giới thiệu ở phần đầu. Trong trường hợp với `resources :photos` ta có: 
- photos_path : Trả về tất cả các photo
- new_photo_path : Trả về /photos/new
- edit_photo_path(:id):  Trả về /photos/:id/edit
- photo_path(:id) returns /photos/:id

Mỗi một helper ở trên đều có _url tương ứng. Chúng khá giống nhau tuy nhiên _url trả về đường dẫn tuyệt đối còn _path trả về đường dẫn tương đối. Các bạn cần lưu ý khi sử dụng trong các trường hợp riêng biệt.

### ***Controller Namespaces and Routing**

Đôi khi trong ứng dụng của mình, bạn muốn nhóm những controller trong 1 namespace. Chẳng hạn như giới hạn những hành động của admin. Khi đó bạn có thể nhóm những controller trong 1 router như dưới đây: 

```
namespace :admin do
  resources :articles, :comments
end
```
Khi đó đường dẫn và helper sẽ thay đối đôi chút như sau: 

![](https://images.viblo.asia/bdc7906b-4596-444c-ad91-ab60ca7876e9.png)

### * **Giới hạn 1 vài route muốn sử dụng**

Khi bạn không cần sử dụng hết các route, bạn có thể viết như dưới đây: 

```
resources :posts, only: [:index, :show]
resources :users, except: [:index]
```

### * Khai báo nhiều resource cùng 1 lúc

Thay vì phải viết ra từng dòng như: 

```
resources :photos
resources :books
resources :videos
```

Bạn có thể viết gọn vào 1 dòng như dưới đây: 

`resources :photos, :books, :videos`

### * Non-RESTful Routes

Đương nhiên là bạn không cần phải lúc nào cũng theo RESTful. Thỉnh thoảng bạn cũng muốn tạo ra route riêng và ánh xạ nó vào controller. Bạn có thể làm như dưới đây: 

`get "/help", to: "static_pages#help"`

Note: Tuy không bắt buộc nhưng bạn nên tuân thủ theo RESTful khi có thể




Thêm một lưu ý nhỏ là bạn có thể chạy lênh `rails routes` trong terminal để xem các route hiện tại trong app



Nguồn: 

https://www.theodinproject.com/courses/ruby-on-rails/lessons/routing
https://richonrails.com/articles/understanding-rails-routing
http://guides.rubyonrails.org/routing.html