Pdf là một trong những định dạng phổ biến hiện nay, với ưu điểm là chất lượng cao và không dễ bị thay đổi font chữ hay bố cục của nội dung. Vì thế pdf thường xuyên được sử dụng để lưu trữ những nội dung sau khi đã hoàn thiện và dùng chúng để trao đổi qua mạng. Trong một số website nhiều tác vụ cũng cần đến việc lưu trữ thành định dạng pdf để thuận tiện cho việc lưu trữ lại của người dùng, vì thế hôm nay mình viết bài viết này để tạo một website đơn giản bằng Ruby on Rails có tích hợp tính năng xuất file pdf từ thông tin của trang web với gem PDFKit !!!

# Tạo ứng dụng Rails
Tạo một ứng dụng với tên là invoices (hóa đơn) và thêm 2 models:
```
$ rails new invoices -d mysql
$ cd invoices
 
$ rails generate model invoice date:date client notes total
$ rails generate model line_item description price:float invoice:references
```
sau đó thêm một số dữ liệu mẫu vào cơ sở dữ liệu bằng cách thêm vào file `db/seeds.rb.`
```
invoice = Invoice.create(
  client: 'Tùng Phan',
  total: 165000,
  date: Date.new(2020, 2, 17))

LineItem.create([
  { invoice_id: invoice.id, description: 'Tuổi trẻ đáng giá bao nhiêu???', price: 96000 },
  { invoice_id: invoice.id, description: 'Mắt Biếc (Tái Bản 2019)', price: 69000} ])
```
Chạy lệnh rails db:seed trong terminal để thêm hóa đơn mẫu vào cơ sở dữ liệu.
### Tạo controller and view

 chạy lệnh `rails generate controller Invoices index show`để tạo controllers và views.
 
***app/models/invoice.rb***
```
class Invoice < ApplicationRecord
  has_many :line_items
end
```
***app/models/line_item.rb***
```
class LineItem < ApplicationRecord
  belongs_to :invoice
end
```

 
 ***app/controllers/invoicescontroller.rb***
```
 class InvoicesController < ApplicationController
  def index
    @invoices = Invoice.all
  end
 
  def show
    @invoice = Invoice.find(params[:id])
  end
end
```
***app/views/invoices/index.html.erb***

```
<h1>HÓA ĐƠN</h1>
<ul>
  <% @invoices.each do |invoice| %>
  <li>
    <%= link_to "#{invoice.id} - #{invoice.client} - #{invoice.date.strftime("%B %d, %Y")} ", invoice_path(invoice) %>
  </li>
  <% end %>
</ul>
```

***app/views/invoices/show.html.erb***

```
<div class="invoice">
  <h1>CHI TIẾT HÓA ĐƠN</h1>

  <h3>KHÁCH HÀNG: <%= @invoice.client %></h3>
  <h3>NGÀY: <%= @invoice.date.strftime("%B %d, %Y") %></h3>

  <table>
    <thead>
        <tr>
          <th>TÊN SÁCH</th>
          <th>GIÁ</th>
        </tr>
      </thead>
      <tbody>
        <% @invoice.line_items.each do |line_item| %>
          <tr>
            <td><%= line_item.description %></td>
            <td><%= number_to_currency(line_item.price) %></td>
          </tr>
        <% end %>
        <tr class="total">
          <td style="text-align: right">THÀNH TIỀN: </td>
          <td><%= number_to_currency(@invoice.total) %></span></td>
        </tr>
      </tbody>
  </table>

  <% if @invoice.notes %>
  <div class="notes">
    <p><strong>LƯU Ý:</strong> <%= @invoice.notes %></p>
  </div>
  <% end %>
</div>

```

***app/assets/stylesheets/application.scss***

```
.invoice {
  width: 700px;
  max-width: 700px;
  border: 1px solid grey;
  margin: 50px;
  padding: 50px;
 
  h1 {
    text-align: center;
    margin-bottom: 100px;
  }
  .notes {
    margin-top: 100px;
  }
 
  table {
    width: 90%;
    text-align: left;
  }
  th {
    padding-bottom: 15px;
  }
 
  .total td {
    font-size: 20px;
    font-weight: bold;
    padding-top: 25px;
  }
}
```

Sau đó `rails s` và truy cập vào `localhost:3000` và vào xem chi tiết hóa đơn

![](https://images.viblo.asia/a2777314-cc74-4c3a-919d-ef77f04a1cbd.PNG)

Chi tiết hóa đơn

![](https://images.viblo.asia/03a6eca3-6e49-4299-84d9-343dc6ac425e.PNG)

# Tích hợp chức năng export Pdf
### Thêm các gem vào gem file
```
gem 'pdfkit'
gem 'render_anywhere'
gem 'wkhtmltopdf-binary'
```

Sau đó chạy lệnh `bundle install` để cài đặt các gem vừa thêm vào
### Tạo một class InvoicePdf trong thư mục app/models
***app/models/Invoice_pdf.rb***
```
require "render_anywhere"
 
class InvoicePdf
  include RenderAnywhere
 
  def initialize(invoice)
    @invoice = invoice
  end
 
  def to_pdf
    kit = PDFKit.new(as_html, page_size: 'A4')
    kit.to_file("#{Rails.root}/public/invoice.pdf")
  end
 
  def filename
    "Invoice #{invoice.id}.pdf"
  end
 
  private
 
    attr_reader :invoice
 
    def as_html
      render template: "invoices/pdf", layout: "invoice_pdf", locals: { invoice: invoice }
    end
end
```
***app/views/invoices/pdf.html.erb***
```
<div class="invoice">
  <h1>CHI TIẾT HÓA ĐƠN</h1>
 
  <h3>To: <%= invoice.client %></h3>
  <h3>Date: <%= invoice.date.strftime("%B %d, %Y") %></h3>
 
  <table>
    <thead>
        <tr>
          <th>TÊN SÁCH</th>
          <th>GIÁ</th>
        </tr>
      </thead>
      <tbody>
        <% invoice.line_items.each do |line_item| %>
          <tr>
            <td><%= line_item.description %></td>
            <td><%= number_to_currency(line_item.price) %></td>
          </tr>
        <% end %>
        <tr class="total">
          <td style="text-align: right">Total: </td>
          <td><%= number_to_currency(invoice.total) %></span></td>
        </tr>
      </tbody>
  </table>
 
  <% if invoice.notes %>
  <div class="notes">
    <p><strong>LƯU Ý:</strong> <%= invoice.notes %></p>
  </div>
  <% end %>
</div>
```
***app/views/layouts/invoice_pdf.html.erb***
```
<!DOCTYPE html>
<html>
<head>
  <title>Envato Invoices</title>
  <style>
    <%= Rails.application.assets.find_asset('application.scss').to_s %>
  </style>
</head>
<body>
  <%= yield %>
</body>
</html>
```
### Tạo DownloadsController để Render hóa đơn PDF
`config/routes.rb`
```
Rails.application.routes.draw do
  root to: "invoices#index"
 
  resources :invoices, only: [:index, :show] do
    resource :download, only: [:show]
  end
end
```
***app/controllers/downloadscontroller.rb***
```
class DownloadsController < ApplicationController
 
  def show
    respond_to do |format|
      format.pdf { send_invoice_pdf }
    end
  end
 
  private
 
  def invoice_pdf
    invoice = Invoice.find(params[:invoice_id])
    InvoicePdf.new(invoice)
  end
 
  def send_invoice_pdf
    send_file invoice_pdf.to_pdf,
      filename: invoice_pdf.filename,
      type: "application/pdf",
      disposition: "inline"
  end
end
```
Thêm link download pdf vào hóa đơn : `app/views/invoices/show.html.erb`
```
<%= link_to "Download PDF",
  invoice_download_path(@invoice, format: "pdf"),
  target: "_blank",
  class: "download" %>
```
Chạy `rails s` chuyển đến hóa đơn chi tiết, click vào `Download PDF`một tab mới sẽ hiện file pdf hóa đơn!!!

## Tài liệu tham khảo
https://www.pdftron.com/blog/rails/how-to-generate-pdf-with-ruby-on-rails/

https://code.tutsplus.com/tutorials/generating-pdfs-from-html-with-rails--cms-22918