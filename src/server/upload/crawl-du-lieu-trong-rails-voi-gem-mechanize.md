Mình cần tạo một ứng dụng crawl giá bán các sản phẩm từ một trang web bán hàng nước ngoài (trang A), và tính theo công thức của mình để đổi sang giá bán VNĐ. Đây chính là tiền đề cho ý tưởng dùng Ruby on Rails tạo web crawl dữ liệu của mình. Sau một hồi tìm hiểu thì mình tìm thấy gem Mechanize được mọi người đề xuất khá nhiều vì dễ cài đặt và sử dụng, chúng ta hãy cùng thử xem sao nhé!

**1. Giới thiệu gem Mechanize**

Thư viện Mechanize được sử dụng để tự động hóa tương tác với các trang web. Nó có cơ chế tự động lưu trữ và gửi cookie, chuyển hướng trang, link, điền và gửi biểu mẫu..

**2. Cài đặt**

* Trước tiên, bạn cần cài đặt `ruby` phiên bản >= 1.9.2 và gem `nokogiri`
* Sau đó thêm `gem "mechanize"` vào `Gemfile`

Chạy lệnh:

```
bundle install
```

Hoặc bạn cũng có thể chạy lệnh command line dưới đây:

```
sudo gem install mechanize
```

Sau khi hoàn tất cài đặt, chúng ta có thể sử dụng luôn mà không cần phải config gì thêm.

**3. Sử dụng**

Quay lại với bài toán của mình:

**Input:** Mình có một danh sách các mã sản phẩm, các mã này luôn xuất hiện trên url trang detail sản phẩm đó (trang A).

**Output:** Cái mình cần lấy ra là các thông tin về ảnh, giá cả, tỉ lệ giảm giá, kích thước sản phẩm, tình trạng kho (còn hay hết)...

Đầu tiên, mình cần tạo một ứng dụng Rails:

```
rails new crawl_product
```

Sau đó cài gem `Mechanize` như phía trên mục 2. Tiếp theo, để đơn giản mình sẽ dùng lệnh `generate scaffold` của rails để tạo model, views, controller cho sản phẩm.

```
rails generate scaffold Product code:string current_price_rub:integer old_price_rub:integer discount:integer current_price_vnd:integer image_url:string teger stock_status:integer diameter:integer
```

Tại form mình chỉ cho nhập code, các trường còn lại sẽ được gán giá trị thông qua crawl data từ web bán hàng A.

```
# /views/products/_form.html.erb 

<%= form_with(model: product, local: true) do |form| %>
  <% if product.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(product.errors.count, "error") %> prohibited this product from being saved:</h2>

      <ul>
      <% product.errors.full_messages.each do |message| %>
        <li><%= message %></li>
      <% end %>
      </ul>
    </div>
  <% end %>

  <div class="form-group">
    <h4><%= form.label :code, for: "exampleInputEmail1", class: "badge badge-dark" %><h4>
    <%= form.text_field :code, class: "form-control", placeholder: "Enter your code here! Example: 123456" %>
  </div>

  <div class="actions">
    <%= form.button(type: "submit", class: "btn btn-info") do %>
      <i class="fa fa-check"></i>
      Create
    <% end %>
  </div>
<% end %>
```

![](https://images.viblo.asia/4d0e56ed-52ba-4be5-89f5-7ea786a762d4.png)

Tiếp theo, mình cần viết một cái service để crawl data, tại đường dẫn lib/services/crawl.rb

```
# lib/services/crawl.rb

module Services
  class Crawl
    def initialize(product)
      @product = product
      @agent = Mechanize.new
    end

    def get_page
      @agent.get "https://example.net/catalog/product_#{@product.code}.html"
    end

    def perform!
      get_page
      
      # dưới đây là các method mà Mechanize cho phép thực thi để lấy ra dữ liệu dựa trên tên thẻ, tên class, thuộc tính html      
      @product.old_price_rub = @agent.page.search('.product-price.old').map(&:text).map(&:strip).uniq.first.gsub(" ", "").to_i
      @product.current_price_rub = @agent.page.search('.product-discount-price').map(&:text).map(&:strip).uniq.first.gsub(" ", "").to_i
      @product.current_price_vnd = @product.current_price_rub * 330 + xxx000
      @product.discount = @agent.page.search('.nohover').map(&:text).map(&:strip).uniq.first.split(" ").first.gsub("−", "").to_i
      @product.image_url = @agent.page.image_with(:src => /media\/products/).url.to_s
      diameter_position = @agent.page.search('.property-description-title').map(&:text).map(&:strip).map(&:strip).index("Диаметр:") + 1
      @product.diameter = @agent.page.search("#product-cart > div.product-text-accordion-wrapper > div.product-text-accordion.first.opened > div > div.property-descriptions > div:nth-child(#{diameter_position}) > div.property-description-content").map(&:text).map(&:strip).uniq.first.to_i
      # @product.stock_status = agent.page.search('.js-product-cart-add').present? ? :stocking : :out_of_stock
    end
  end
end
```

Sau đó, mình chỉnh sửa một chút trong method `create` để có thể dùng thư viện Crawl lấy dữ liệu:

```
# /controllers/products_controller.rb

def create
    @product = product.new(product_params)

    begin
      Services::Crawl.new(@product).perform!
      if @product.save
        redirect_to products_path, flash: { notice:  'Product was successfully created.' }
      else
        render :new
      end
    rescue Mechanize::ResponseCodeError => e
      Rails.logger.error "[Error][Mechanize::ResponseCodeError] #{e.message}"
      ...
    rescue => e
      Rails.logger.error "[Error] #{e.message}"
      ...
    end
  end
```

Thử tạo mới một mã sản phẩm và kết quả render tại trang danh sách sản phẩm:

```
# /views/products/index.html.erb

<table class="table table-bordered">
  <thead class="thead">
    <tr class="text-center">
      <th scope="col" class="text-center">Id</th>
      <th scope="col" class="text-center">Code</th>
      <th scope="col">Image</th>
      <th scope="col">Diameter</th>
      <th scope="col">Current Price (vnđ)</th>
      <th scope="col">Old Price (rub)</th>
      <th scope="col">Current Price (rub)</th>
      <th scope="col">Discount</th>
      <th colspan="3"></th>
    </tr>
  </thead>

  <tbody>
    <% @products.each do |product| %>
      <tr>
        <th scope="row"><%= @products.index(product) + 1 %></td>
        <th scope="row"><%= product.code %></td>
        <td><a type="button" data-toggle="modal" data-target="#exampleModalCenter" ><%= image_tag(product.image_url, style: "height: 160px;") %></a></td>
        <td><%= product.diameter %> mm</td>
        <td><%= product.current_price_vnd %> ₫</td>
        <td><%= product.old_price_rub %> ₽</td>
        <td><%= product.current_price_rub %> ₽</td>
        <td>−<%= product.discount %>%</td>
        <td>
          <%= link_to("https://example.net/catalog/product_#{product.code}.html", class: "btn btn-warning mb-3", target: "_blank") do %>
              <i class="fa fa-shopping-cart"></i>
              Detail
            <% end %>
            <%= link_to(product, method: :patch, data: { confirm: 'Are you sure?' }, class: "btn btn-success mb-3") do %>
              <i class="fa fa-arrow-up" aria-hidden="true""></i>
              Update
            <% end %>
            <%= link_to(product, method: :delete, data: { confirm: 'Are you sure?' }, class: "btn btn-danger") do %>
              <i class="fa fa-trash"></i>
              Delete
            <% end %>
        </td>
      </tr>
    <% end %>
  </tbody>
</table>
```

![](https://images.viblo.asia/c167f522-0684-4f63-9efa-c8aa9b6be041.png)

Tương tự cách trên, bạn có thể thêm các chức năng `update`, `import csv`, tạo `job auto update` cho trang dữ liệu crawl của bạn, chúc bạn thành công nhé!

Mình cũng có gặp một vấn đề với Mechanize là gem chỉ lấy được CSS và HTML của page mà không thể xử lý được JS. Mà tình trạng đơn hàng (trường `stock_status`) lại render sau khi trang A đã xử lý JS, do đó mình vẫn chưa thể lấy được giá trị cho trường stock_status (còn hay hết hàng). Vấn đề này mình có tìm hiểu thì do Mechanize thực tế cũng chỉ dùng nokorigi để xử lý html rồi từ đó cung cấp một cơ chế để ta có thể tương tác với trang web một cách đơn giản nhất. Và điểm hạn chế lớn nhất của nokorigi chính là nó không thể xử lý được javascript. Đây có thể xem như là một nhược điểm của gem này. Vậy nên nếu bạn muốn làm việc với một trang dùng JS thì nên cân nhắc việc lựa chọn một thư viện khác như Selenium, Capybara và PhantomJS...

**Kết luận:** Mechanize là một công cụ nhanh, gọn, dễ cài đặt để tương tác và crawl dữ liệu từ một web site, tuy nhiên nó lại không thể làm việc với JS nên cần cân nhắc trước khi lựa chọn có sử dụng cho ứng dụng của bạn hay không. 

Một số method của Mechanize mà bạn có thể cần tham khảo:
http://docs.seattlerb.org/mechanize/