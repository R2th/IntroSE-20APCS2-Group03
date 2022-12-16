## Giới thiệu
Chắc hẳn khi đọc tiêu đề thì bạn đã đoán được URL shortener là gì rồi, nó đơn giản chỉ là công cụ rút ngắn URL nhìn gọn hơn, giúp cho việc chia sẽ dễ dàng hơn khi hiện nay nhiều website, app có message, content bị giới hạn ký tự. Ở bài viết này mình cũng sẽ thử build một ứng dụng tương tự để rút gọn URL với Rails, nhìn chung thì nó sẽ hoạt động như sau:
* Input nhập một URL và output là một URL đã rút ngắn. 
* Có thể sử dụng URL mới đó đó để chia sẻ. 
* Khi click vào URL mới, sẽ chuyển hướng đến URL gốc.
* Bạn có thể xem số liệu thống kê về số lần đã click vào URL mới này.
## Chuẩn bị
Đầu tiên new project với Rails và config DB.
```
rails new demo_url_shortener -d mysql
```
Tiếp theo tạo model, ở đây tạo với scaffold cho nhanh, nhớ bổ sung cột **t.integer :clicked, default: 0** và **add_index :short_links, :shorted_code, unique: true** vì chúng ta sẽ dùng **shorted_code** này search nhiều.
```hiều
rails g scaffold short_link origin_url:string shorted_code:string clicked:integer
```
```
class CreateShortLinks < ActiveRecord::Migration[5.2]
  def change
    create_table :short_links do |t|
      t.string :origin_url
      t.string :shorted_code
      t.integer :clicked, default: 0

      t.timestamps
    end

    add_index :short_links, :shorted_code, unique: true
  end
end
```
```
rails db:migrate
```
Tiếp theo sửa lại file **routes.rb**  và view một tí: **app/views/short_links/_form.html.erb**
```
Rails.application.routes.draw do
  root to: "short_links#index"
  resources :short_links
  get "/:shorted_code", to: "short_links#show", as: :short
end
```
```
<%= form_with(model: short_link, local: true) do |form| %>
  <div class="field">
    <%= form.label :origin_url %>
    <%= form.text_field :origin_url %>
  </div>

  <div class="actions">
    <%= form.submit %>
  </div>
<% end %>
```
![](https://images.viblo.asia/a54824a3-f2c0-4bbd-b299-43b1fe70ce01.png)
## Code thôi nào
Ở file model **app/models/short_link.rb** bổ sung thêm validates và viết function để generate **shorted_code**. <br>Ở đây mình dùng **urlsafe_base64 (SecureRandom)** để generate, cái này không bắt buộc đâu bạn có thể dùng bất kỳ kiểu nào cũng được.<br>
```
validates :shorted_code, uniqueness: true

before_save :generate_shorted_code

private

def generate_shorted_code
  self.shorted_code = SecureRandom.urlsafe_base64(10)
  generate_shorted_code if duplicate?
end

def duplicate?
  ShortLink.where(shorted_code: shorted_code).exists?
end
```
Để đề phòng trường hợp generate **shorted_code** bị trùng với cái đã có trong DB, ta viết thêm một function **duplicate?** để check thêm nhằm bảo đảm chỉ cần nhập URL thì chắc chắn chỉ có một **shorted_code** duy nhất, trong trường hợp bị trùng sẽ 
generate ra một **shorted_code** mới chứ không trả về lỗi.<br>
Gọi function **generate_shorted_code** bằng callbacks **before_save :generate_shorted_code**<br><br>
Tiếp theo sửa code ở file **app/controllers/short_links_controller.rb**
```
class ShortLinksController < ApplicationController
  def index
    @short_links = ShortLink.all
  end
  
  def new
    @short_link = ShortLink.new
  end

  def create
    @short_link = ShortLink.create(short_link_params)

    redirect_to root_path
  end

  private

  def short_link_params
    params.require(:short_link).permit(:origin_url)
  end
end
```
Sau khi hoàn tất các bước trên ta đã có thể tạo một **short_link** như thế này rồi.<br><br>
![](https://images.viblo.asia/f2872d71-1d9f-4ea5-8836-0c46ffe2f3f8.png)
<br><br>
Bước tiếp theo ta dùng **shorted_code** mới này để chuyển hướng đến **origin_url**. <br>
Ở controller
**app/controllers/short_links_controller.rb**, với phương thức **update_columns** này sẽ không gọi lại callback nữa nên bạn yên tâm nó sẽ không generate ra **shorted_code** mới đâu.
```
before_action :load_short_link, only: :show

def show
  @short_link.update_columns(clicked: (@short_link.clicked + 1))

  redirect_to URI(@short_link.origin_url).to_s
end

private

def load_short_link
  @short_link = ShortLink.find_by shorted_code: params[:shorted_code]
end
```
<br>

Ok giờ thì chúng ta có thể đã có thể click vào 
[http://localhost:3000/pUJg_ca8bxoXEg](http://localhost:3000/pUJg_ca8bxoXEg)
thì sẽ đến trang gốc 
[https://www.zauberware.com/en/articles/2019/create-a-url-shortener-with-ruby-on-rails](https://www.zauberware.com/en/articles/2019/create-a-url-shortener-with-ruby-on-rails) như ta mong muốn.

Kiểm tra lại khi quay lại trang index thì column clicked đã tăng lên 1 rồi.
![](https://images.viblo.asia/19203e08-f1a8-4d5b-aa7c-210f6ffb33c0.png)

## Kết
Trên là bài viết cơ bản để có thể xây dựng chức năng URL shortener với Rails, bạn có thể tham khảo thêm ở những link bên dưới<br>
https://www.zauberware.com/en/articles/2019/create-a-url-shortener-with-ruby-on-rails<br>
https://medium.com/@sparkboldstudio/building-a-url-shortener-rails-app-96db60d3bf9d