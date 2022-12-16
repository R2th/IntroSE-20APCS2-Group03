Ở phần 1 này mình sẽ build 1 server bằng Ruby on Rails và phần 2 sẽ dùng React cho frontend.

Ứng dụng mà mình sẽ xây dựng là một trình quản lý sự kiện, cho phép bạn tạo và quản lý danh sách các sự kiện của một trường đại học.

Let's go!
# Xây dựng API
Trước tiên mình tạo project và model Event:
``` ruby
rails new event-manager -d mysql
rails g model Event event_type event_date:date title:text speaker host published:boolean
```
Chỉnh sửa username và password trong file `config/database.yml` sau đó migrate:
``` ruby
rails db:create
rails db:migrate
```
# Controller
Tiếp theo là tạo controller Event, ở đây mình sẽ đặt nó trong folder `controllers/api/` 
``` ruby
mkdir app/controllers/api
touch app/controllers/api/events_controller.rb
```
- Thêm `gem "responders"` vào `Gemfile` và chạy `bundle`, nó sẽ cung cấp cho chúng ta method `respond_with`, method này từng là 1 phần của Rails core, nhưng được tách ra gem ở bản Rails 4.2
- Thêm đoạn code sau vào file `app/controllers/api/events_controller.rb`
``` ruby
class Api::EventsController < ApplicationController
  respond_to :json

  def index
    respond_with Event.order(event_date: :DESC)
  end

  def show
    respond_with Event.find_by id: params[:id]
  end

  def create
    respond_with :api, Event.create(event_params)
  end

  def destroy
    respond_with Event.destroy(params[:id])
  end

  def update
    event = Event.find_by id: params[:id]
    event.update(event_params)
    respond_with Event, json: event
  end

  private

  def event_params
    params.require(:event).permit :id, :event_type, :event_date, :title, :speaker, :host, :published
  end
end
```
Việc sử dụng method `respond_with`  cho phép chúng ta render JSON. Nếu không có method này, chúng ta sẽ phải viết 1 đoạn code như:
``` ruby
def index
  respond_to do |format|
    format.json { render json: Event.order(event_date: :DESC) }
  end
end
```
Thêm `protect_from_forgery with: :null_session` vào `app/controllers/application_controller.rb` vì Rails có cơ chế bảo vệ, chống lại CSRF. Bởi mặc định, Rails sẽ generate 1 token và validate nó trong mỗi request CRUD gửi lên, nếu không có token này, Rails sẽ trả về lỗi.

Tuy nhiên, mình đang build 1 single-page app, nó sẽ chỉ gửi token lần đầu tiên nên mình thêm `protect_from_forgery with: :null_session` vào để tránh việc này.

# Routes
Trong `config/routes.rb` thêm
```ruby
Rails.application.routes.draw do
  namespace :api do
    resources :events, only: %i[index show create destroy update]
  end
end
```

Ok! Giờ test với Postman, send request POST với 

Headers  `Content-Type: application/json` 

Body(như trong ảnh)
``` ruby
{ 
	"event" : {
	  "event_type": "Symposium",
	  "event_date": "2019-01-01",
	  "title": "A Symposium",
	  "speaker": "Albert Einstein",
	  "host": "Marie Curie",
	  "published": true
	}
}
```
**Kết quả:**
![](https://images.viblo.asia/f51f0b46-fc0c-4a25-ab2b-ed26963cb71d.png)

**Nhớ đón xem phần tiếp theo nhé!**