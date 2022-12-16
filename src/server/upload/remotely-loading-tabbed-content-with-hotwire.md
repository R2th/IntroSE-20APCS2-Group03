![image.png](https://images.viblo.asia/4b75ff97-c845-48b6-af4e-a1e93e00f920.png)
## Introduction
**Hotwire** là công cụ dành cho việc phát triển web, nó cung cấp cho chúng ta một framework giúp update DOM mà không cần (hoặc ít) phải viết các đoạn code javascript bằng cách gửi HTML thay vì JSON, trong khi vẫn đảm bảo tốc độ load ứng dụng nhanh chóng.

Giả sử chúng ta có 1 page chứa nhiều thông tin được chia thành các tab. Khi muốn xem 1 thông tin nào đó chúng ta sẽ click vào các tab tương ứng, và toàn bộ trang sẽ được reload với content mới nhất. Để tăng performance, ta có thể viết thêm các đoạn code javascript xử lý để chỉ load những content DOM cần thiết, còn những thành phần chính khác của page thì vẫn keep như cũ. Với hotwire thì chúng ta có thể làm được điều tương tự mà không cần thêm 1 dòng code javascript nào, chỉ thuần là standard Rails code và thêm 1 chút kỹ thuật  [Turbo drive](https://turbo.hotwired.dev/handbook/drive).

Trong phần này chúng ta sẽ build 1 Rails app sử dụng hotwire để hiểu rõ hơn về nó (ở đây sử dụng Rails phiên bản 6.1).
## Implement
Ý tưởng sẽ là 1 simple app, đối tượng chính là User. Một user có thể có nhiều skills và levels và thông tin về list các skill và level của user sẽ được hiển thị ở phần user details dưới dạng 2 tab.

### Setup app
Đầu tiên, tất nhiên rồi, ta sẽ khởi tạo 1 app, model user, model skill, model level, và migrate:
```ruby
rails new hotwire_demo
rails g scaffold User name:string
rails g model Skill name:string user:references
rails g model Level name:string user:references
rails db:migrate
```
Thêm mối quan hệ:
```ruby
class User < ApplicationRecord
  has_many :skills
  has_many :levels
end
```
Sau đó tạo 1 vài data:
```ruby
User.create name: "A"
User.first.skills.create name: "Ror"
User.first.skills.create name: "GO"
User.first.levels.create name: "BE"
User.first.levels.create name: "FE"
```
### Install Hotwire
Để thêm hotwire vào app, chúng ta có thể add `hotwire-rails` vào Gemfile rồi `bundle`.

Sau khi add hotwire, chúng ta run `rails hotwire:install` để install hotwire và mọi thứ đã sẵn sàng.
### Implement logic
Sau khi xong phần cài đặt, tiếp theo chúng ta sẽ thêm các logic cần thiết để chạy được :v

Tạo controller:
```ruby
rails g controller Skills
rails g controller Levels
```
Tạo routes:
```ruby
Rails.application.routes.draw do
  resources :users do
    member do
      resources :levels, only: %i[index]
      resources :skills, only: %i[index]
    end
  end
end
```
Logic phần controller: (tương tự với LevelsController)
```ruby
class SkillsController < ApplicationController
  before_action :load_user

  def index
    respond_to do |format|
      format.html do
        render partial: 'skills/list', locals: {skills: @user.skills, user: @user}
      end
    end
  end

  private
  def load_user
    @user = User.find(params[:id])
  end
end
```
Ở partial `app/views/skills/_list.html.erb`: (tương tự với `app/views/levels/_list.html.erb`)
```html
<%= turbo_frame_tag "details_tab" do %>
  <div>
    <%= render partial: "shared/tabs" %>
    <div>
      <h3>List skills of <%= user.name %></h3>
      <ul>
        <% skills.each do |skill| %>
          <li><%= skill.name %></li>
        <% end %>
      </ul>
    </div>
  </div>
<% end %>
```
Ở đây chúng ta sử dụng đến kỹ thuật `turbo_frame_tag`, khi render HTML sẽ dưới dạng tag `<turbo-frame>`. Đây là method của [Turbo frame helper](https://github.com/hotwired/turbo-rails/blob/main/app/helpers/turbo/frames_helper.rb), sử dụng tham số id để phân biệt các thành phần DOM nào cần update (trong trường hợp này là "details_tab")

Tiếp theo là tạo partial shared/tabs:
```ruby
mkdir app/views/shared
touch app/views/shared/_tabs.html.erb
```
```html
# app/views/shared/_tabs.html.erb
<div>
  <%= link_to "Skills", skills_path(@user) %>
  <br>
  <%= link_to "Levels", levels_path(@user) %>
</div>
```
Rồi cuối cùng ở phần show user:
```html
# app/views/users/show.html.erb
<p id="notice"><%= notice %></p>

<p>
  <strong>(<%= Time.now %>) Name:</strong>
  <%= @user.name %>
</p>

<div>
  <%= render partial: "levels/list", locals: {user: @user, levels: @user.levels} %>
</div>
```
Sau đó chúng ta vào màn show user và xem thành quả:
![](https://images.viblo.asia/6d7c1c42-c093-4a32-b961-0c87d4d9717c.gif)
## Summary
Hotwire cung cấp cho developer 1 framework khá mạnh mẽ giúp cải thiện performance ứng dụng và trải nghiệm người dùng với chi phí tối thiểu. Trong đó Turbo Drive là 1 trong những phương pháp xử lý request + update các thành phần DOM riêng biệt một cách nhanh chóng mà không cần dùng đến các Javascript framework cồng kềnh. Bài viết nhằm chia sẻ và demo cách implement Hotwire trong rails app, cảm ơn bạn đã dành thời gian đọc. 

Nguồn và tài liệu tham khảo
* https://www.colby.so/posts/remotely-loading-tab-content-with-rails-and-hotwire
* https://hotwired.dev/
* https://turbo.hotwired.dev/handbook/introduction