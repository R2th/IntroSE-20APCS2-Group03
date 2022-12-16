# Vấn đề
Chức năng cần ghi lại các hành động của người dùng trong trang web thì nó luôn hay có. VÍ dụ như trang Github, nó sẽ hiển thị các activities của mình như 1 người bạn của mình đã tạo hoặc clone 1 reporstory hay 1 issue vừa được mở hay repo của mình đã được forked hay gắn sao,...
![](https://images.viblo.asia/2e8c704c-efbd-43ae-afd5-5365c11bbde9.png)


Hay Facebook cũng hiển thị các bài post, replies mới nhất của mình và bạn bè 
![](https://images.viblo.asia/7944c67b-ab6b-432f-9d32-08a24dd47dd2.png)

Đây là 1 cách dễ dàng để người dùng có thể biết được nội dung thay đổi gần đây. Vậy làm thế nào để chúng ta có thể ghi lại các lịch sử này.

Với Rails, nó thật sự dễ dàng với gem [pulic_activity](https://github.com/chaps-io/public_activity)


# Triển khai
## Chuẩn bị sample_app 
Bây giờ, giả sử chúng ta đang cần tạo ra 1 ứng dụng cho phép người dùng chia sẻ các stories. Người dùng có thể đăng nhập và story. guests thì có thể xem cũng như like cho mỗi story.
Và phần mình sẽ phải focus là activity feed - tức là người dùng có thể xem được những gì đã xảy ra gần đâu. Trong example này, feed activity sẽ focus vào các story đã được thêm, xóa hoặc like.

```
rails new sample-app-stories
```

Trong sample-app này mình sẽ dùng rails 6 và ruby 2.7

Bây giờ, mình cần 2 table là User và Story, và tiếp tục mình cần config model như sau:
```ruby
# User model
class User < ActiveRecord::Base
  has_many :stories
end

# Story model
class Story < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true
end
```

Tại controller Stories chúng ta sẽ định nghĩa các actions cho nó
```ruby
class StoriesController < ApplicationController
  before_action :find_story, only: %i(destroy show edit update)

  def index
    @stories = Story.order created_at: :DESC
  end

  def new
    @story = Story.new
  end

  def create
    @story = Story.new story_params
    if @story.save
      flash[:success] = "Story add success"
      redirect_to root_path
    else
      render :new
    end
  end

  def edit; end

  def update
    if @story.update_attributes story_params
      flash[:success] = "The story was edited!"
      redirect_to root_path
    else
      render :edit
    end
  end

  def destroy
    if @story.destroy
      flash[:success] = "The story was deleted!"
    else
      flash[:error] = "Cannot delete this story"
    end
    redirect_to root_path
  end

  def show; end

  private

  def story_params
    params.require(:story).permit :title, :body
  end

  def find_story
    @story = Story.find_by id:params[:id]
    return if @story
    
    flash[:warning] = "Story not found"
    redirect_to root_path
  end
end
```

## Tích hợp gem public_activity

Thực hiện bổ sung gem trong Gemfile:
```ruby
gem "public_activity"
```

Ý tưởng ở đây là mình sẽ sử dụng callback để có thể tự động lưu trữ thông tin về những thay đổi trong các table đã được chỉ định mà cụ thể ở đây là story table.
Thông tin này sẽ được sử dụng để hiển thị tất cả các hoạt động gần đây.

Bắt đầu thôi:
- Thực hiện run
```
rails g public_activity:migration
rails db:migrate
```
Với câu lệnh trên, trong DB của chúng ta sẽ tự động tạo 1 table là activities.

- Thực hiện áp dụng public_activity cho Story model
```ruby
# models/Story.rb
include PublicActivity::Model
tracked
```

Với code trên, bây giờ, bất cứ khi nào bạn thực hiện các hành động như save, update_attributes, destroy hay các action khác, public_activity sẽ được kích hoạt để ghi lại sự kiện này vào table activities 


## Hiển thị Activity Feed
Để hiển thị các events này, mình sẽ chủ động tạo riêng 1 page riêng biệt thay vì dùng chung của các view khác

Tại StoriesController,

```ruby
# controllers/StoriesController
before_action :load_activities, only: %i(destroy show edit update)

[...]

private

[...]

# Lấy 20 hoạt động được tạo mới nhất
def load_activities
  @activities = PublicActivity::Activity.order('created_at DESC').limit(20)
end
```


Tại view chỉ cần khai báo partial như sau:
```ruby
# views/shared/_activities.html.erb
<div class="col-sm-3">
  <%= render_activities @activities %>
</div>
```

```ruby
# views/public_activity/story/_create.html.erb
<li class="list-group-item">
  <span class="glyphicon glyphicon-plus"></span>
  <small class="text-muted"><%= a.created_at.strftime('%H:%M:%S %-d %B %Y') %></small><br/>
  <% if a.trackable %>
    <%= link_to a.trackable.title, story_path(a.trackable) %> was added.
  <% else %>
    An article that is currently deleted was added.
  <% end %>
</li>
```
**trackable** là polymorphic association, nó có tất cả thông tin cần thiết về mô hình đã được sửa đổi

Ngoài partial create, chúng ta có thể tạo tương tự cho các file _update, _destroy

# Lưu trữ thông tin người dùng (owner)
Có một trường đặc biệt được gọi là chủ sở hữu trong bảng activities nhằm lưu trữ thông tin về người dùng chịu trách nhiệm cho hành động.
Tuy nhiên, vấn đề là phương thức current_user không có sẵn bên trong mô hình, nên chúng ta cần custom lại code của application controller như sau:
```ruby
# application_controller.rb
[...]
include PublicActivity::StoreController

def current_user
  @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
end

helper_method :current_user
hide_action :current_user
[...]
```

Thêm hide_action: current_user đảm bảo rằng method này không được coi là một action của controller.


- Tại model Story thì thêm code 
```ruby
# models/story.rb
[...]
tracked owner: Proc.new { |controller, model| controller.current_user ? controller.current_user : nil }
[...]
```

Procedure nhận hai đối số: controller và model. Trong trường hợp này, chúng ta chỉ cần controller để gọi phương thức current_user; mô hình lưu trữ đối tượng đã được sửa đổi

Với điều này tại chỗ, tại login, add/change một số stories và kiểm tra bảng activities. Field owner phải được điền bằng id của người dùng.
- Chỉnh sửa view partial
```ruby
# views/public_activity/story/_create.html.erb
<li class="list-group-item">
  <span class="glyphicon glyphicon-plus"></span>
  <small class="text-muted"><%= a.created_at.strftime('%H:%M:%S %-d %B %Y') %></small><br/>
  <strong><%= activity.owner ? activity.owner.name : 'Guest' %></strong>
  <% if a.trackable %>
    added the story <%= link_to a.trackable.title, story_path(a.trackable) %>.
  <% else %>
    added the story that is currently deleted.
  <% end %>
</li>
```

Bây giờ, đối với các hành động mới được thực hiện, bạn sẽ thấy tên của mình được hiển thị; đối với những cái trước phải có text “Guest” thay thế.

Mọi thứ đều hoạt động tốt, nhưng các phần của chúng tôi chứa rất nhiều sự trùng lặp - trên thực tế, mã gần như giống hệt nhau giữa _create.html.erb, _update.html.erb và _destroy.html.erb. Vì vậy, hãy dành một chút thời gian để cấu trúc lại nó.

# Sử dụng I18n để refactor Activity Partials
Mình sẽ thực hiện loại bỏ hoàn toàn các phần hoạt động đó và chỉ làm việc vớishared/_activities.html.erb file. Tuy nhiên, có thêm 1 số solution khác bạn có thể[ tham khảo ](https://github.com/chaps-io/public_activity#layouts)

Code mơí sau khi tái cấu trúc sẽ là
```
# views/shared/_activities.html.erb
<div class="col-sm-3">
  <ul class="list-group">
    <% @activities.each do |activity| %>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-<%= activity.key.match(/\.(.*)/)[1] %>"></span>
        <strong><%= activity.owner ? activity.owner.name : 'Guest' %></strong>
        <%= render_activity activity, display: :i18n %>
        <% if activity.trackable %>
          "<%= link_to activity.trackable.title, story_path(activity.trackable) %>"
        <% else %>
          with unknown title.
        <% end %>
      </li>
    <% end %>
  </ul>
</div>
```

Các trường key chứa chuỗi ở dạng `.` Vì vậy, ví dụ trong trường hợp của chúng ta, nó có thể là story.create, story.update hoặc story.destroy.


Chúng tôi đang sử dụng chỉ thị @extend của Sass để áp dụng các kiểu cho các lớp mới của chúng tôi.

Vấn đề với text có thể được giải quyết với sự trợ giúp của fallbacks. Như chúng ta đã thấy, theo mặc định, public_activity sẽ tìm kiếm các phần tử bên trong thư mục public_activity /. Tuy nhiên, nếu chúng tôi cung cấp tùy chọn display:: i18n, các bản dịch I18n sẽ được sử dụng thay thế. Như vậy chúng ta còn có thể quốc tế hóa project (multi language) trong tương lai :D 
```yml
activity:
  model_name:
    create: '...'
    destroy: '...'
    update: '...'
    other_action: '...'
```
```yml
en:
  activity:
    story:
      create: 'has told his story'
      destroy: 'has removed the story'
      update: 'has edited the story'
```
Kết quả mà chúng ta muốn đây
![](https://images.viblo.asia/46bc4cce-f0b5-4b4d-9770-0f4e8d324935.png)

![](https://images.viblo.asia/71b6b9cf-759d-4ee6-a370-a928c94dbac9.png)

# Custom activities
Với nội dung trên chúng ta chỉ làm việc với các hoạt động CRUD cơ bản và các hoạt động được lưu tự động. Nhưng nếu chúng ta muốn theo dõi một số sự kiện tùy chỉnh thì sao? Hoặc nếu có nhu cầu kích hoạt một hoạt động mà không cần chạm vào mô hình?

Đừng lo lắng, điều này có thể được thực hiện khá dễ dàng. Giả sử chúng ta muốn thêm nút "like" và đếm lượt thích cho mỗi bài đăng. Hơn nữa, một hoạt động đặc biệt cũng nên được ghi lại.

- Đầu tiên, chúng ta cần add new column vào stories table
```
rails g migration add_likes_to_stories likes:integer
rails db:migrate
```

``` ruby
resources :stories do
  member do
    post :like
  end
end
```

- Add  button like vào view
```ruby
# views/stories/show.html.erb
<% page_header @story.title %>

<p>
  <span class="label label-default"><%= pluralize @story.likes, "like" %></span>
  <%= link_to content_tag :span, "",
       class: "glyphicon glyphicon-thumbs-up") + "like it",
       like_story_path(@story), class: "btn btn-default btn-sm", method: :post %>
</p>
```

- Và tại controller
```ruby
# stories_controller.rb

before_action :find_story, only: %i(destroy show edit update like)

[...]

def like
  @story.increment! :likes
  @story.create_activity :like
  flash[:success] = "Thanks for sharing your opinion!"
  redirect_to story_path @story
end
[...]
```
@ story.increment! (: likes) chỉ cần thêm 1 vào số lượt thích và lưu kết quả vào cơ sở dữ liệu. @ story.create_activity: như thực sự tạo ra một hoạt động mới bằng cách cung cấp khóa tương tự (chúng ta đã nói về khóa trước đây khi cấu trúc lại các thành phần)

- Tiếp tục sẽ là modify file translations
```yml
# config/locales/en.yml:
en:
  activity:
    story:
      like: "has liked the story"
```


**(*) Tuy nhiên:**

Có một vấn đề sẽ cho phép hiển thị thêm một tính năng của public_activity – disabling model tracking. Bạn thấy đấy, @story.increment!(:likes) code kích hoạt bản cập nhật khiến public_activity ghi lại update event. Vì vậy, **@story.create_activity: like sẽ dẫn đến việc ghi lại hai hoạt động cho một hành động**. 

Đây rõ ràng không phải là điều chúng ta mong muốn. Hoạt động đầu tiên nên được thực hiện mà không có bất kỳ theo dõi nào cả.

public_activity cho phép tắt tính năng theo tracking globally hoặc cho một mô hình cụ thể. 
``` ruby 
# disable tracking globally
PublicActivity.enabled = false

# disable tracking on model’s level use
Story.public_activity_off
```

Nhưng rõ ràng, việc bật tắt tính năng tracking, nó vẫn chưa thể giải quyết được vấn đề của chúng ta.

Chúng ta còn 1 cách nữa là chỉnh sửa trong Controller.

```ruby
# stories_controller.rb

def like
  Story.public_activity_off
  @story.increment! :likes
  Story.public_activity_on
  @story.create_activity :like
  flash[:success] = "Thanks for sharing your opinion!"
  redirect_to story_path @story
end
```

Hoặc đơn giản hơn chỉ cần:
```ruby
# stories_controller.rb

def like
  without_tracking do
    @story.increment!(:likes)
  end
  @story.create_activity :like
  flash[:success] = 'Thanks for sharing your opinion!'
  redirect_to story_path(@story)
end

private

def without_tracking
  Story.public_activity_off
  yield if block_given?
  Story.public_activity_on
end
```
Bây giờ, hoạt động increment sẽ không làm cho hoạt động update được kích hoạt.


# Lưu thông tin tùy chỉnh
Giả sử, bây giờ chúng ta muốn lưu trữ một số thông tin bổ sung về hoạt động.
public_activity trình bày hai cách để đạt được kết quả mong muốn. Trước hết, có trường parameters được tuần tự hóa có trong bảng activities mà chúng ta có thể truy cập ngay lập tức:
```ruby
@story.create_activity :like, parameters: {why: "because"}
```
Sau đó, chúng tôi có thể truy cập thông tin này
```ruby
activity.parameters[:why]
```


Tuy nhiên, điều này không phải lúc nào cũng thuận tiện. Nếu bạn cần lưu một số dữ liệu cho mỗi hoạt động, thì phương pháp này yêu cầu gọi hàm **create_activity** cho mỗi hành động.

Đối với các trường hợp khác, có các [custom fields ](https://github.com/chaps-io/public_activity#use-custom-fields-on-activity)có sẵn.

Ví dụ: hãy lưu trữ tiêu đề của câu chuyện để chúng tôi có thể tìm nạp ngay cả khi câu chuyện sau đó bị xóa.

- Tạo file migrate để add title field vào table Activities
```ruby
# xxx_add_title_to_activities.rb

class AddTitleToActivities < ActiveRecord::Migration
  def change
    change_table :activities do |t|
      t.string :title
    end
  end
end
```

- Tiếp theo là chỉnh sửa model

```ruby
# models/story.rb

[...]
tracked owner: Proc.new { |controller, model| controller.current_user ? controller.current_user : nil },
        title: Proc.new { |controller, model| model.title }
[...]
```

- Cuối cùng là phần hiển thị
``` ruby
# shared/_activities.html.erb

<div class="col-sm-3">
  <ul class="list-group">
    <% @activities.each do |activity| %>
      <li class="list-group-item">
        <span class="glyphicon glyphicon-<%= activity.key.match(/\.(.*)/)[1] %>"></span>
        <small class="text-muted"><%= activity.created_at.strftime('%H:%M:%S %-d %B %Y') %></small><br/>
        <strong><%= activity.owner ? activity.owner.name : 'Guest' %></strong>
        <%= render_activity(activity, display: :i18n) %>
        <% if activity.trackable %>
          "<%= link_to activity.trackable.title, story_path(activity.trackable) %>"
        <% elsif activity.title %>
          <span class="text-muted">"<%= activity.title %>"</span>
        <% else %>
          with unknown title.
        <% end %>
      </li>
    <% end %>
  </ul>
</div>
```

Nội dung bài viết mình tham khảo tại: https://www.sitepoint.com/activity-feeds-rails/