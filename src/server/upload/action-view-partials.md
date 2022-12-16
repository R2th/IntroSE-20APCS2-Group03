Xin chào các bạn, hôm nay mình muốn nói tới `partial` trong `Rails`. 
# 1. Tổng quan về partial:
## 1.1 Partial là gì:
- `Render partial` được sử dụng nhằm hạn chế trùng lặp code giúp tái sử dụng, cũng như bảo trì nhanh chóng hơn cho code ở phần view trong `Rails` project.
-  Nó đơn giản chỉ là chia nhỏ code của file view ra thành nhiều phần nhỏ.
-  Dấu hiệu nhận biết đây là 1 partial view trong rails đó là sẽ có kí tự `_` trước tên file.
# 2 Cách sử dụng:
## 2.1 Cách gọi
Giả sử mình có 1 thư mục view Advertiser và muốn gọi partial là account:
```
<%= render partial: "account" %>
```
Lúc này `Rails app` sẽ render ra file: *"advertiser/_account.html.erb"* tại nơi gọi nó.
Ở 1 file view khác cũng có thể sử dụng lại được file *"advertiser/_account.html.erb"* này đó chính là sự lợi hại của `partial view`.
```
<%= render partial: "account", locals: { account: @buyer } %>

<% @advertisements.each do |ad| %>
  <%= render partial: "ad", locals: { ad: ad } %>
<% end %>
```
Trong ví dụ trên thì ta còn có thể truyền được biến vào trong partial.
## 2.2 :as và :object options
Mặc định partial view sẽ không có bất kỳ biến cục bộ nào(`local variable`). Option `:opbject` dùng để truyền 1 đối tượng vào trong partial. 
```
// sẽ cung cấp variable @buyer vào trong partial. 
<%= render partial: "account", object: @buyer %>
// hoặc gọi ntn:
<%= render partial: "account", locals: { account: @buyer } %>
# Với :as option, chúng ta có thể đặc tả một tên khác cho biến local
# Ví dụ chúng ta muốn sử dụng tên là user thay vì account
<%= render partial: "account", object: @buyer, as: "user" %>
//Tương đương: 
<%= render partial: "account", locals: { user: @buyer } %>
```
## 2.3 Rendering a collection of partials
Cái này dùng để render lại 1 tập các view giống hết nhau, biến truyền vào cũng kiểu như là 1 mảng hay là 1 hash. Thay vì chúng ta phải `.each` rồi render ra view như các ngôn ngữ khác, thì bây giờ có thể truyền vào thông qua `option collection`: 
```
<%= render partial: "ad", collection: @advertisements %>
// có thể render ra 1 partial nữa giữa các collection kia như sau
// khi render ra mỗi 1 element của  `@advertisements` thì sẽ render ra `_ad_divider.html.erb`
<%= render partial: "ad", collection: @advertisements, spacer_template: "ad_divider" %>
// nếu như array collection bị trống thì thực hiện 1 action khác
<%= render(partial: "ad", collection: @advertisements) || "There's no ad to be displayed" %>
```
## 2.4 Rendering trường hợp mặc định
Nếu bạn không sử dụng bất kì option nào như collections, layouts, thì chúng ta có thể sử dụng short-hand để render ra các partial: 
```
# Thay vì <%= render partial: "account" %>
<%= render "account" %>

# Thay vì <%= render partial: "account", locals: { account: @buyer } %>
<%= render "account", account: @buyer %>

# @account.to_partial_path returns 'accounts/account', so it can be used to replace:
# <%= render partial: "accounts/account", locals: { account: @account} %>
<%= render @account %>

# @posts is an array of Post instances, so every post record returns 'posts/post' on +to_partial_path+,
# that's why we can replace:
# <%= render partial: "posts/post", collection: @posts %>
<%= render @posts %>
```
Mình thì khi render partial thì hay sử dụng cấu trúc short-hand này hơn. 
# Kết luận
Mình xin kết thúc bài viết của mình tại đây, partial là 1 thành phần không thể thiếu và rất hay sử dụng trong rails, vì vậy mọi người cần phải nắm rõ được cách sử dụng chúng. Rất mong bài viết sẽ giúp ích được cho các bạn.
Tham khảo: https://api.rubyonrails.org/classes/ActionView/PartialRenderer.html