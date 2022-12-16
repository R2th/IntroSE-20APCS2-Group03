## Sự kết hợp hiệu quả khi sử dụng thư viện với remote: true
1. Một số thư viện thường dùng kết hợp với remote: true trong dự án rails

- Ransack là thư viện hổ trợ cho việc tìm kiếm, sắp xếp,... chi tiết: https://github.com/activerecord-hackery/ransack

- Kaminari là thư viện hổ  trợ phân trang,... chi tiết: https://github.com/kaminari/kaminari

2. Cài đặt và sử dụng
+ Vào thư mục Gemfile thêm các thư viện này
```
gem "config"
gem "ransack"
gem "kaminari"
gem "simple_form"
```
+ Sau đó
```
bundle install
rails g config:install
rails generate simple_form:install
```
+ Tạo model demo

db/migrate/20180202095954_create_cars.rb
```
class CreateCars < ActiveRecord::Migration[5.1]
  def change
    create_table :cars do |t|
      t.string :code
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```
+ Config routes

config/routes.rb
```
Rails.application.routes.draw do
  resources :cars
end
```
+ Thêm tham số trong settings file

config/settings.yml: tạo danh sách số lượng record trên 1 trang
```
per_pages:
  first: 5
  second: 10
  third: 20
  fourth: 25
  fifth: 50
  sixth: 100
```
3. Bây giờ chúng ta sẻ làm một vài ví dụ về sự kết hợp ransack, kaminari với remote: true
+ Controller
app/controllers/cars_controller.rb
```
class CarsController < ApplicationController
  def index
    @search = Car.ransack params[:q]
    @per_page = params[:per_page] || 20
    @cars = @search.result.page(params[:page]).per @per_page
    respond_to :js if request.xhr?
  end
end
```
+ View
app/views/cars/index.html.erb: Chứa danh sách car, một text input để tìm kiếm và option select lấy ra bao nhiêu record trên 1 trang
```
<div>
  <%= render "search" %>
  <div>
    <label>
      <%= select_tag :per_page,
        options_for_select(Settings.per_pages.as_json.map{|key, value| [value, value]}, @per_page),
        data: {remote: true, url: cars_path} %>
    </label>
  </div>
  <div id="not-exist-cars-search"></div>
  <div id="list-cars">
    <%= render "table_car" %>
  </div>
</div>
```
app/views/cars/_search.html.erb
```
<%= search_form_for @search, class: "row", remote: true do |f| %>
  <div class="form-group col-md-6">
    <%= f.text_field :code_or_name_or_description_cont, placeholder: "Nhập mã hoặc tên danh mục hoặc mô tả",
      class: "form-control" %>
  </div>
<% end %>
```
app/assets/javascripts/common.js
```
$(document).ready(function(){
  search("#car_search", "#q_code_or_name_or_description_cont");
});

// Viết hàm tìm kiếm, khi nhập một ký tự thì gửi request lên server
function search(form_id, id) {
  $(form_id + " input" + id).keyup(function(e) {
    $.get($(form_id).attr('action'), $(form_id).serialize(), null, 'script');
  });
}
```
Tạo một template table car với các cột Id, Code, Name, Description. sort_link là hàm sắp xếp của thư viện ransack,
paginate là hàm phân trang của thư viện kaminari
app/views/cars/_table_car.html.erb
```
<div>
  <table>
    <tbody>
      <tr>
        <th>
          <%= sort_link @search, :id, "Id", {}, {remote: true} %>
        </th>
        <th>
          <%= sort_link @search, :code, "Code", {}, {remote: true} %>
        </th>
        <th>
          <%= sort_link @search, :name, "Name", {}, {remote: true} %>
        </th>
        <th>
          <%= sort_link @search, :description, "Description", {}, {remote: true} %>
        </th>
      </tr>
      <%= render partial: "car", collection: @cars, as: :car %>
    </tbody>
  </table>
</div>
<div>
  <%= paginate @cars, remote: true %>
</div>
```
app/views/cars/_car.html.erb
```
<tr>
  <td><%= car.id %></td>
  <td><%= car.code %></td>
  <td><%= car.name %></td>
  <td><%= car.description %></td>
</tr>
```
app/views/cars/index.js.erb: Khi sử dụng request ajax thì chúng ta render lại dữ liệu nên tạo file js này
```
$('#list-cars').html('<%= j render("table_car") %>');
$('#not-exist-cars-search').html('<%= t("admin.search.not_found") if @cars.blank? %>');
```
Làm theo các bước như trên thì chúng ta sẻ làm được một trang có chức năng tìm kiếm, sắp xếp tăng(giảm) dần, phân trang như một thư viện data table và sử dụng ajax để load dữ liệu.
## Tài liệu tham khảo
http://guides.rubyonrails.org/working_with_javascript_in_rails.html#remote-elements