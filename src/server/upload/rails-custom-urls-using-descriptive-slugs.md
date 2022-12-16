## Introduction
Khi phát triển các trang web bằng Ror, mặc định các URLs sẽ được xây dựng dựa trên trường khóa chính ID và tất nhiên là auto-increment (vd như `/users/1`, `/posts/1/edit`..) Vì nhiều mục đích khác nhau như SEO, hoặc hạn chế sự đoán trước từ phía người dùng hay thậm chí là mục đích thẩm mỹ, chúng ta có thể custom lại URLs theo format khác, chẳng hạn như:  thêm mô tả của trang trên chính URLs: `/users/1-day-la-user-thu-nhat`, `/posts/1-this-is-my-first-post` hoặc chèn thêm vào đoạn token: `/posts/123QWERTY/edit`, các format này thường được gọi dưới cái tên `Slug URLs`. 

Có nhiều cách khác nhau để custom lại format của URLs, có thể dùng format text hay là UUIDs, Hash Ids. Để nhanh gọn chúng ta có thể sử dụng gem `friendly_id`, hoặc chúng ta hoàn toàn có thể tự implement việc đó bằng tay :D
## Implement
`Slug` được hiểu là tên URL của một trang web. Có rất nhiều "slug format styles" khác nhau, vd như hiển thị đầy đủ description của page(`/this-is-my-page`), hoặc sử dụng mỗi ID (`/page/1`) hoặc kết hợp cả 2 (`/page/1-this-is-my-page`), đơn cử như URL của bài post hiện tại chúng ta đang truy cập: https://viblo.asia/p/rails-custom-urls-using-descriptive-slugs-4dbZN86k5YM

Nói ngắn gọn, để làm được việc đó thì chúng ta cần làm những bước sau:
* Tạo thêm cột lưu giá trị `slug` cho từng record
* Tạo method generate ra giá trị cho trường `slug`
* Override lại method `to_param` để phục vụ cho việc gán link bằng `link_to`
* Config lại param cho routes để Rails nhận biết được `slug param`
* Sử dụng `find_by_slug` thay cho `find_by_id`
* Enjoy!

### Create Slug Column
Trước tiên chúng ta cần tạo project đã:
```
rails new test-slug-url
```
Để tiện thì mình dùng luôn scaffold cho model User
```
rails g scaffold user name:string slug:string
```
Và migrate:
```
rails db:migrate
```
done, giờ sang bước thứ hai
### Generate the pretty URL strings
Chúng ta sẽ cần method để format lại trường slug:
```
before_save :to_slug
private
def to_slug
  self.slug = slug.parameterize.truncate(80, omission: "")
end
```
Ở đây ta sử dụng 2 method `parameterize`(để format lại chuỗi string thành định dạng `pretty URL`) và `truncate`(để cố định max-length cho chuỗi):
```
"rails custom urls using descriptive slugs".parameterize
=> "rails-custom-urls-using-descriptive-slugs"
```
Khởi tạo thử 1 user:
```
User.create(name: "Thanos", slug: "Perfectly balanced as all things should be")
=> #<User id: 1, name: "Thanos", slug: "perfectly-balanced-as-all-things-should-be", created_at: "xxx", updated_at: "xxx">
```
### Override to_param method
Method `to_param` mặc định của Rails sẽ trả về id của record, được gọi đến khi chúng ta sử dụng helper `link_to`, vd như `<%= link_to "show", @user %>`, tương đương với `users/1`:
```
> User.first.to_param
  User Load (0.1ms)  SELECT  "users".* FROM "users"  ORDER BY "users"."id" ASC LIMIT 1
=> "1"
```
Để thuận tiện cho việc dẫn link đến từng page, chúng ta nên override lại method `to_param` một chút, thay vì trả về `id` thì sẽ trả về `slug`:
```
class User < ActiveRecord::Base
  def to_param
    slug
  end
end
```
### Set routes to use
Tiếp theo chúng ta sẽ cập nhật lại `config/routes.rb`. Mặc định `resources` helper sẽ sử dụng param là `id`, việc cần làm bây giờ sẽ là nói cho Rails routes biết chúng ta sẽ sử dụng `slug` thay cho `id`:
```
resources :post, param: :slug
```
Resources User giờ sẽ có dạng:
```
   Prefix     Verb   URI Pattern                 Controller#Action
    users     GET    /users(.:format)            users#index
              POST   /users(.:format)            users#create
   new_user   GET    /users/new(.:format)        users#new
   edit_user  GET    /users/:slug/edit(.:format) users#edit
     user     GET    /users/:slug(.:format)      users#show
              PATCH  /users/:slug(.:format)      users#update
              PUT    /users/:slug(.:format)      users#update
              DELETE /users/:slug(.:format)      users#destroy
```
### Use find_by_slug in controller
Bây giờ chúng ta sẽ dùng method `find_by_slug` thay cho `find_by_id`: 
```
def load_user
  @user = User.find_by_slug(params[:slug])
end
```
Và thành quả:
![](https://images.viblo.asia/9c5b36f7-3214-4e72-9d42-9afa9aa1b84d.png)
Tuy nhiên, việc find records hoàn toàn bằng strings thay vì ids như vậy tất nhiên là chậm hơn find bằng id thông thường, do đó sẽ có ảnh hưởng một chút đến hiệu năng của hệ thống:
```
User Load (0.2ms)  SELECT  "users".* FROM "users" WHERE "users"."slug" = ? LIMIT 1  [["slug", "perfectly-balanced-as-all-things-should-be"]]
```
Chúng ta vẫn có thể find records bằng `id` mà vẫn đảm bảo `friendly URLs` bằng cách kết hợp kiểu slug giữa `id` và `string` như sau:

Trước tiên là edit lại method `to_param`:
```
def to_param
 [id, slug.parameterize.truncate(80, omission: "")].join("-")
end
```
Và lại dùng `find_by_id` trong controller:
```
def load_user
  @user = User.find_by_id(params[:slug].to_i)
end
```
Method `to_i` sẽ ngừng việc convert ngay khi bắt gặp kí tự không phải chữ số:
```
> "1-this-is-my-post".to_i
=> 1
```
Kết quả:
![](https://images.viblo.asia/e9f8bf59-5eb8-4e7b-ac48-9861563c5417.png)
## Summary
Bài viết nhằm chia sẻ về Custom URLs qua việc sử dụng descriptive Slug, bài viết còn nhiều hạn chế, cảm ơn các bạn đã dành thời gian theo dõi.

Nguồn tham khảo:

https://dev.to/ryanwhocodes/custom-urls-in-ruby-on-rails-how-you-can-use-descriptive-slugs-instead-of-ids-3jke