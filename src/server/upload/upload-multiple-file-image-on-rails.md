## Giới thiệu vấn đề ?
Trong quá trình tạo một trang web với rails chắc hẳn chúng ta đều phải tạo chức năng insert và update các file, đặc biệt là các file ảnh để hiển thị.
Một cách thiết đặt dababase phổ biến cho việc upload ảnh của một đối tượng nào đó là tạo quan hệ has many như sau:
```ruby
  class Room < ApplicationRecord
    has_many :images, dependent: :destroy
  end  
```
```ruby
  class Image < ApplicationRecord
    belongs_to :room
    mount_uploader :image_link, ImageUploader
  end
```
Khi tạo một room gồm một nhiều ảnh nên ta cần upload nhiều ảnh cùng 1 lúc. Vì vậy, bài viết này mình xin hướng dẫn các bạn một số cách upload nhiều file ảnh cùng lúc khi tạo room.
Trong ví dụ này, mình dùng gem CarrierWave để lưu trữ ảnh.
## Một số cách giải quyết ?
Để xử lý yêu cầu này, mình xin giới thiệu 3 cách sau:
* Cách 1. Sử dụng transaction
* Cách 2. Áp dụng kĩ thuật nested attributes
* Cách 3. Sử dụng nested attributes kết hợp với gem cocoon
## Sử dụng Transaction ?
Trong view tạo room ta cài đặt như sau:
```ruby
  <%= f.fields_for :images do |p| %>
    <div class="field">
      <%= p.label :images %><br>
      <%= p.file_field :image_link, multiple: true, name: "images[image_link][]" %>
    </div>
  <% end %>
```
Phần xử lý trong controller:
```ruby
  def new
    @room = Room.new
    @image = @room.images.build
  end

  def create
    @room = Room.new room_params
    insert_data
    redirect_to admin_rooms_path

  def insert_data
    ActiveRecord::Base.transaction do
      @room.save
      params[:images]["image_link"].each do |image|
        @image = Image.create room_id: @room.id, image_link: image
        @image.save
      end
    end
  end
```
## Sử dụng kĩ thuật Nested Attributes ?
### Nested attribues là gì ?
Nested Attributes là một tính năng cho phép chúng ta lưu bản ghi này thông qua bản ghi khác (associated records)
### Cách cài đặt
Mặc định trong rails thì nested atrributes updating được disable và bạn có thể kích hoạt nó bằng cách sử dụng phương thức accepts_nested_attributes_for trong model tương ứng.
**app/models/room.rb**
```ruby
  class Room < ActiveRecord::Base
    has_many :images, dependent: :destroy
    accepts_nested_attributes_for :images
  end
```
Ví dụ khi bạn sử dụng accepts_nested_attributes_for :images trong model Room thì khi create hoặc update cho đối tượng room bạn có thể create/update luôn cho images bằng cách truyền thuộc tính của images vào room_params.
```ruby
  def room_params
    params.require(:room).permit :category_id, :label, :floor, :status,
      images_attributes: [:id, :room_id, :image_link]
  end
```
### Vài lưu ý khi sử dụng nó
**:allow_destroy** Theo mặc định, bạn sẽ chỉ có thể thiết lập và cập nhật các thuộc tính trên mô hình liên quan. Nếu bạn muốn hủy mô hình liên kết thông qua các thuộc tính băm, bạn phải kích hoạt nó trước bằng cách sử dụng tùy chọn: allow_destroy. Cập nhật bản ghi bằng các thuộc tính hoặc đánh dấu nó để hủy nếu allow_destroy là true và has_destroy_flag? trả về true.

**:reject_if** Bạn cũng có thể thiết lập một: reject_if proc để âm thầm bỏ qua bất kỳ bản ghi mới nếu nó không vượt qua được tiêu chí của bạn.

**:limit** Cho phép bạn chỉ định số lượng tối đa của các record liên quan có thể được xử lý với các thuộc tính lồng nhau. :limit option chỉ áp dụng cho quan hệ one-to-many.

**:update_only** Cho phép bạn chỉ định một record chỉ có thể được update thôi. Một record mới chỉ được tạo ra khi không có record nào hiện có. :update_only chỉ hoạt động cho quan hệ one-to-one.

### Cách 1. Sử dụng multiple: true trong tag file_field
Trong view tạo room
```ruby
  <%= f.fields_for :images do |p| %>
    <div class="field">
      <%= p.file_field :image_link, multiple: true, name: "images[image_link][]" %>
    </div>
  <% end %>
``` 
Trong rooms_controller
```ruby
  def new
    @room = Room.new
    @image = @room.images.build
  end

  def create
    @room = Room.new room_params
    if @room.save
      params[:images]['image_link'].each do |a|
        @image = @room.images.create!(:image_link => a)
      end    
    redirect_to admin_rooms_path
  end 

  def update
    if @room.update_attributes room_params
      flash[:success] = t ".success"
      redirect_to admin_rooms_path
    else
      render :edit
    end
  end    

  def room_params
    params.require(:room).permit :category_id, :label, :floor, :status,
      images_attributes: [:id, :room_id, :image_link]
  end
```
### Cách 2. Sử dụng for hoặc each
Đơn giản là bạn sử dụng vòng lặp, bạn muốn thêm bao nhiêu đối tượng images phía trên thì sẽ lặp bấy nhiêu lần, cách này có một nhược điểm là bạn phải gán cố định số vòng lặp tất nhiên nó sẽ làm cho tính tùy biến trong ứng dụng của chúng ta giảm xuống.<br>
Trong view tạo room
```ruby
  <%= f.fields_for :images do |p| %>
    <div class="field">
      <%= p.file_field :image_link %>
    </div>
  <% end %>
``` 
Trong rooms_controller
```ruby
  def new
    @room = Room.new
    4.times do
      @image = @room.images.build
    end
  end

  def create
    @room = Room.new room_params
    if @room.save
      flash[:success] = t ".create_room_successful"
      redirect_to admin_rooms_path
    else
      flash.now[:warning] = t ".create_room_fail"
      render :new
    end
  end

  def update
    if @room.update_attributes room_params
      flash[:success] = t ".success"
      redirect_to admin_rooms_path
    else
      render :edit
    end
  end

  def room_params
    params.require(:room).permit :category_id, :label, :floor, :status,
      images_attributes: [:id, :room_id, :image_link]
  end
```
### Cách 3. Sử dụng link_to_add_fields
Cách này sẽ tạo ra một button mà khi click sẽ cho phép bạn sinh ra một đối tượng mới, mà cụ thể ở đây là đối tượng images.
Trong code js bạn thêm function add_fields. Hàm này sẽ lặp lại một đối tượng mà bạn truyền vào với một id mới.
```js
function add_fields(link, association, content) {  
    var new_id = new Date().getTime();  
    var regexp = new RegExp("new_" + association, "g");  
    $(link).parent().before(content.replace(regexp, new_id));  
}
```
Trong form của bạn.
```ruby
<%= link_to_add_fields "Add a Room", f, :images %>
```

Trong application_helper
```ruby
def link_to_add_fields(name, f, association, cssClass, title)  
  new_object = f.object.class.reflect_on_association(association).klass.new  
  fields = f.fields_for(association, new_object, :child_index => "new_#{association}") do |builder|  
    render(association.to_s.singularize + "_fields", :f => builder)  
  end  
  link_to name, "#", :onclick => h("add_fields(this, \"#{association}\", \"#{escape_javascript(fields)}\")"), :class => cssClass, :title => title 
end  
```
## Sử dụng nested attributes kết hợp với gem cocoon
**Ích lợi của way này:** <br>
Upload nhiều file cùng lúc <br>
Thêm hoặc remove input fields một cách thoải mái <br>
Xem các ảnh trước khi được upload <br>
Khi xảy ra lỗi có thể lưu lại cái field đã nhập hay cái ảnh đã chọn. <br>
**Gemfile.rb**
```ruby
gem "cocoon" // hỗ trợ nested form
```
**app/assets/js/application.js**
```js
//= require cocoon
```
Tiếp theo ở view ta tạo 1 view là new.htmt.erb:
```ruby
    <%= form_for @room do |f| %>
    <div class="form-group">
      <%= f.label :images, class: "col-md-4 control-label"%>
      <div class="col-md-4">
        <table class="user-photo-form">
          <%= f.fields_for :images do |image| %>
            <%= render "image_fields", f: image %>
          <% end %>
          <%= link_to_add_association (t "add_a_photo"), f, :images, class: "btn btn-default" %>
        </table>
      </div>
    </div>
    <% f.submit "Save "%>
```
Sau đó ta tạo 1 Partial **_image_link_fields.html.erb** (image_link là 1 trường của bảng 1 images)
```ruby
<tr class="nested-fields"> // class này dùng để gem cocoon nhận biết đây là phần để nó append vào mỗi khi ấn nút
  <td>
    <%= f.file_field :image %>
    <%= f.hidden_field :image_cache, value: f.object.image_cache %>
  </td>
  <td class="thumb"> // để js nhận biết append vào các preview image
    <% if f.object.image.url.present? %>
      <%= image_tag f.object.image.url %>
    <% end %>
  </td>
  <td>
    <%= link_to_remove_association (t "remove"), f %>
  </td>
</tr>
```

Cuối cùng, chúng ta chỉ cần tạo 1 file **room.js.coffee** như sau:
```js
$ ->
  onAddFile = (event) ->
    file = event.target.files[0]
    url = URL.createObjectURL(file)
    thumbContainer = $(this).parent().siblings('td.thumb')
    if thumbContainer.find('img').length == 0
      thumbContainer.append '<img src="' + url + '" />'
    else
      thumbContainer.find('img').attr 'src', url

  $('input[type=file]').each ->
    $(this).change onAddFile
  $('body').on 'cocoon:after-insert', (e, addedPartial) ->
    $('input[type=file]', addedPartial).change onAddFile
  $('a.add_fields').data 'association-insertion-method', 'append'
  $('a.add_fields').data 'association-insertion-node', 'table.user-photo-form tbody'
```
## Tổng kết
Trên đây là một số cách để chúng ta có thể thêm nhiều ảnh khi tạo một đối tượng has_many images. Có cách chưa được tối ưu, bạn nào có cách làm hay và hiệu quả hơn thì chia sẻ cho mọi người dưới comment nhé. 
<br> Cảm ơn các bạn đã đọc bài viết. Chúc mọi người có 1 ngày làm việc hiệu quả.
## Tham khảo
Bài viết được tham khảo từ các bài về nested attributes trên Viblo.
https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html
http://www.liooo.engineer/blog/2014/11/22/building-multiple-file-upload-form-in-rails-way/
https://stackoverflow.com/search?q=Nested+Attribute+Image++Rails+