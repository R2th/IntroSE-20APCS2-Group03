Trong Rails có khá nhiều gem có thể sử dụng để tạo pdf file trong đó `gem wicked_pdf` là một gem khá phổ biến với nhiều chức năng giúp chúng ta tạo được pdf dễ dàng hơn và đơn giản.

Gem này phụ thuộc vào [wkhtmltopdf ](http://wkhtmltopdf.org/) để tạo pdf từ HTML. Chúng ta chỉ cần viết HTML như bình thường, còn lại nó sẽ hỡ trợ để xuất ra PDF cho mình. 

Trong bài này mình sẽ làm một demo để tạo invoice. 

# Cài đặt

```ruby
gem "wicked_pdf"

gem "wkhtmltopdf-binary"
```
sau đó : 
```
$ bundle install

$ rails generate wicked_pdf
```

Add vào trong `config/initializers/mime_types.rb` : 
```ruby
Mime::Type.register "application/pdf", :pdf
```

# Implementation

**1. Tạo HTML và layout như bình thường:**

* **Tạo layout:** 


```html
<!-- app/views/layouts/pdf_layout.pdf.erb -->

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">

    <style>
      .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
      }

      .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
      }

      .invoice-box table td {
        padding: 5px;
        vertical-align: top;
      }

      .invoice-box table tr td:nth-child(2) {
        text-align: right;
      }

      .invoice-box table tr.top table td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
      }

      .invoice-box table tr.information table td {
        padding-bottom: 40px;
      }

      .invoice-box table tr.heading td {
        background: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
      }

      .invoice-box table tr.details td {
        padding-bottom: 20px;
      }

      .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
      }

      .invoice-box table tr.item.last td {
        border-bottom: none;
      }

      .invoice-box table tr.total td:nth-child(2) {
        border-top: 2px solid #eee;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

* **Tạo HTML body:**

```html
<!-- app/views/invoices/generate_pdf.pdf.erb -->

<div class="invoice-box">
  <table cellpadding="0" cellspacing="0">
    <tr class="top">
      <td colspan="2">
        <table>
          <tr>
            <td class="title">
              <img src="https://www.sparksuite.com/images/logo.png" style="width:100%; max-width:300px;">
            </td>

            <td>
              Invoice #: 123<br>
              Created: January 1, 2015<br>
              Due: February 1, 2015
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="information">
      <td colspan="2">
        <table>
          <tr>
            <td>
              Sparksuite, Inc.<br>
              12345 Sunny Road<br>
              Sunnyville, CA 12345
            </td>

            <td>
              Acme Corp.<br>
              John Doe<br>
              john@example.com
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <tr class="heading">
      <td>Payment Method</td>

      <td>Check #</td>
    </tr>

    <tr class="details">
      <td>Check</td>
      <td>1000</td>
    </tr>

    <tr class="heading">
      <td>Item</td>
      <td>Price</td>
    </tr>

    <tr class="item">
      <td>Website design</td>
      <td>$300.00</td>
    </tr>

    <tr class="item">
      <td>Hosting (3 months)</td>
      <td>$75.00</td>
    </tr>

    <tr class="item last">
      <td>Domain name (1 year)</td>
      <td>$10.00</td>
    </tr>

    <tr class="total">
        <td></td>
        <td>Total: $385.00</td>
    </tr>
  </table>
</div>
```

**2. Controller:**

```ruby
class Invoicesontroller < ApplicationController

  def generate_pdf
    respond_to do |format|
      format.pdf do
        render pdf: "invoice.pdf",
            template: "invoices/generate_pdf",
            layout: "layouts/pdf_layout"
      end
    end
  end
end
```
Trong đó có nhiều options để mình có thể sử dụng được theo yêu cầu thực tế. Bạn có thể xem ỏ đây https://github.com/mileszs/wicked_pdf#advanced-usage-with-all-available-options

**3. Routes và link tới PDF**

**Trong config/routes.rb**

```ruby
resources :invoices do
  collection do
    get :generate_pdf
  end
end
```

Đến đây mình có thể link để show pdf trên : 

```erb
<%= link_to "Print Invoice", generate_pdf_invoices_path(format: :pdf) %>
```
![](https://images.viblo.asia/0306047d-5e9b-4ada-8adc-c30a5f4953c7.png)

# Tạo và lưu PDF file  
Có những trường hơp chúng ta cần tạo PDF và lưu nó ở đâu đó trong server hoặc cần download luôn file đó. Như cách trên thì nó sẽ chỉ hiển thị luôn, chứ không lưu PDF file đó ở đâu cả trong server. 

Để làm diều đó mình cần làm như sau: 
```ruby
def create_pdf_file
    #Tạo folder cần lưu pdf 

    pdf_path = "#{Rails.root}/public/uploads/img_sys/invoices"
    FileUtils.mkdir_p pdf_path

    # generate invoice.pdf

    pdf_file1 = "invoice.pdf"

    pdf_html1 = ActionController::Base.new.render_to_string(
        template: "invoices/generate_pdf",
        layout: "layouts/pdf_layout"
    )

    pdf1 = WickedPdf.new.pdf_from_string(pdf_html1)
    File.open("#{pdf_path}/#{pdf_file1}", "wb") do |file|
        file << pdf1
    end
end
```

Chạy code trên mình sẽ nhận được PDF file vào trong folder như mô tả trên. 

Đây là demo đơn giản về cách sử dụng wicked_pdf. Để chi tiết hơn, bạn có thể tham khảo document sau:
https://github.com/mileszs/wicked_pdf