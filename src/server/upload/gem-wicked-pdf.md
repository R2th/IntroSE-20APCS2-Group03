# 1. Introduction
- Gem wicked_pdf được dùng để generate file PDF từ HTML.
- Thay vì dùng DSL để generate PDF, bạn chỉ cần viết 1 file HTML và wicked_pdf sẽ lo phần còn lại.

# 2. Install
- Thêm gem wicked_pdf vào Gemfile.
    ```ruby
    # Gemfile
    gem "wicked_pdf"
    gem "wkhtmltopdf-binary"
    ```
- Chạy bundle install để install gem vào source code.
    ```ruby
    bundle install
    ```
- wicked_pdf là wrapper của wkhtmltopdf, để sử dụng gem wicked_pdf thì bạn phải install thêm gem wkhtmltopdf-binary vào source code.
- Chạy rails generate wicked_pdf để generate initializer của gem wicked_pdf.
    ```ruby
    rails generate wicked_pdf
    ```
- Sau khi chạy, ta nhận đc file wicked_pdf.rb với nội dung như sau
    ```ruby
    # config/initializers/wicked_pdf.rb
    WickedPdf.config = { }
    ```
- File này dùng để config gem wicked_pdf.
- Thêm pdf vào mime_types.rb.
    ```ruby
    # config/initializers/mime_types.rb
    Mime::Type.register "application/pdf", :pdf
    ```

# 3. Basic usage
- Để hiển thị file PDF, trong controller ra sử dụng method render
    ```ruby
    # app/controllers/welcome_controller.rb
    class WelcomeController < ApplicationController
      def index
        respond_to do |format|
          format.pdf do
            render pdf: "welcome"
          end
        end
      end
    end
    ```
- Tạo thêm file `app/views/welcome/index.pdf.erb` cho phần view
    ```ruby
    # app/views/welcome/index.pdf.erb
    <h1>Welcome#index</h1>
    <p>Find me in app/views/welcome/index.pdf.erb</p>
    ```
- Kết quả thu được khi access localhost:3000/welcome.pdf
    ![](https://images.viblo.asia/1e111838-e9e5-460f-a358-5609dfe75121.png)

# 4. Asssets (CSS, JS)
- wkhtmltopdf được chạy bên ngoài Rails app, nên các helper mặc định cho assets pipeline như `stylesheet_link_tag` và `javascript_include_tag` sẽ không hoạt động với file pdf được geneate bởi gem wicked_pdf
- Để sử dụng assets pipeline với gem wicked_pdf, ra sử dụng các helper được cung cấp bởi gem wicked_pdf như `wicked_pdf_stylesheet_link_tag`, `wicked_pdf_image_tag`, `wicked_pdf_javascript_include_tag`
- Config layout cho wicked_pdf
    ```ruby
    # config/initializers/wicked_pdf.rb
    WickedPdf.config = {
     layout: "wicked_pdf_application.html.erb"
    }
    ```
- Tạo file layout cho wicked_pdf
    ```ruby
    # app/views/layouts/wicked_pdf_application.html.erb
    <!DOCTYPE html>
    <html>
      <head>
        <title>VibloWickedPdf</title>
        <%= csrf_meta_tags %>
        <%= csp_meta_tag %>

        <%= wicked_pdf_stylesheet_link_tag "application", media: "all", "data-turbolinks-track": "reload" %>
        <%= wicked_pdf_javascript_include_tag "application", "data-turbolinks-track": "reload" %>
      </head>

      <body>
        <%= yield %>
      </body>
    </html>
    ```

# 5. Render pdf options
- Với method render được sử dụng ở controller, ngoài option pfd để config filename khi download file pdf, ra còn có các options khác.
- `disposition`: inline (hiển thị file PDF, vẫn có thể download file PDF manual), attachment (download file PDF khi access link).
- `template`: nội dung file PDF, default trùng với template HTML của action.
- `inline`: nội dung file PDF dưới dạng string, override lại template option.
- `show_as_html`: trả về true thì sẽ hiển thị HTML thay vì PDF.
- `orientation`: default là Portrait (hướng dọc), hoặc Landscape (hướng ngang).
- Bạn có thể tham khảo các option đầy đủ tại [đây](https://github.com/mileszs/wicked_pdf#advanced-usage-with-all-available-options).

# 5. Reference
- Source code: https://github.com/thanhlt-1007/viblo_wicked_pdf
- Document: https://github.com/mileszs/wicked_pdf#advanced-usage-with-all-available-options