Dạo gần đây trong dự án mình có yêu cầu tạo file PDF và lưu vào database. Lúc đầu nghe thì tưởng không khó nhưng khi nhìn mấy file template khách đưa cho thì lại thấy khó không tưởng 🤣Tuy logic xử lý không có gì phức tạp nhưng lại có khá nhiều file với cấu trúc đa dạng, có thể chia thành 3 loại chính như sau:

- Nội dung chủ yếu là text, rất ít hình hay bảng biểu
- Format cố định, chỉ cần điền nội dung vào vị trí cho trước
- Có cả text, hình và bảng biểu, format không cố định 

Sau 1 thời gian tìm hiểu thì mình cũng tìm được các giải pháp khả thi cho từng loại trên và muốn giới thiệu với các bạn trong bài viết này. Tất nhiên là ưu tiên các giải pháp miễn phí mà vẫn đảm bảo được chất lượng của các file PDF tạo ra 😆

# Tạo file PDF từ HTML

Ruby có khá nhiều gem để tạo file PDF từ HTML, nổi tiếng nhất trong số đó có lẽ là [Wicked PDF](https://github.com/mileszs/wicked_pdf) và [PDFKit](https://github.com/pdfkit/pdfkit). Do đã quen với Wicked PDF và trên [The Ruby Toolbox](https://www.ruby-toolbox.com/categories/pdf_generation) thì thứ hạng của Wicked PDF cao hơn PDFKit nên mình đã  chọn sử dụng nó trong dự án lần này.

Giới thiệu qua 1 chút, Wicked PDF thực chất là wrapper của [wkhtmltopdf](https://wkhtmltopdf.org/) - 1 tiện ích giúp convert HTML thành PDF. Do đó chúng ta cũng cần cài đặt `wkhtmltopdf` cùng với gem Wicked PDF. Cách đơn giản nhất để cài `wkhtmltopdf` là thông qua gem [wkhtmltopdf_binary_gem](https://github.com/zakird/wkhtmltopdf_binary_gem). Thêm 2 dòng sau vào Gemfile và chạy `bundle install` là bước cài đặt đã hoàn thành.

```ruby
gem 'wicked_pdf'
gem 'wkhtmltopdf-binary'
```

## Render view dưới dạng PDF

Thông thường chúng ta sẽ cho phép user xem hoặc tải file PDF thông qua 1 đường link. Ví dụ khi user vào `/posts/1.pdf` sẽ thấy nội dung của post với `id = 1` dưới dạng PDF. Để làm điều đó chúng ta có thể viết controller như sau:

```ruby
class PostsController < ApplicationController
  def show
    @post = Post.find params[:id]
    respond_to do |format|
      format.html
      format.pdf do
        render pdf: "post-#{@post.id}" # tên file PDF chúng ta tạo ra
      end
    end
  end
end
```

Gem Wicked PDF đã [override](https://github.com/mileszs/wicked_pdf/blob/master/lib/wicked_pdf/pdf_helper.rb#L9) method `render` của class `ActionController::Base` sao cho khi có option `pdf` được truyền vào thì view sẽ được render thành HTML rồi sau đó convert sang PDF bằng `wkhtmltopdf`. Trong trường hợp này nếu có file `show.pdf.erb` trong thư mục `app/views/posts` thì nó sẽ được render thành file PDF. Chúng ta có thể viết HTML trong file này và nhúng các đoạn code Ruby để xử lí dữ liệu như bình thường. Ngoài ra, method `render` cũng còn có rất nhiều option khác nữa, các bạn có thể tìm hiểu thêm tại [đây](https://github.com/mileszs/wicked_pdf#advanced-usage-with-all-available-options).

## Tạo file PDF và lưu lại 

Tuy nhiên ở dự án mình thì cần tạo file PDF rồi lưu lại trên Amazon S3 chứ không cần show ra cho user xem ngay. Thế nên thay vì render trong controller như trên, mình dùng method `pdf_from_string` mà Wicked PDF cung cấp và gọi nó trong 1 service.

Dưới đây là service mình viết để convert 1 file template HTML thành 1 file PDF:

` app/services/html_to_pdf_service.rb`

```ruby
class HtmlToPdfService
  DEFAULT_LAYOUT = "pdf/layouts/application"

  attr_reader :template, :out_file, :data, :layout, :pdf_options

  def initialize template, out_file, data = {}, layout: DEFAULT_LAYOUT, pdf_options: {}
    @template = template
    @out_file = out_file
    @data = data
    @layout = layout
    @pdf_options = pdf_options
  end

  def perform
    html = ActionController::Base.render template: template, layout: layout, locals: data
    pdf = WickedPdf.new.pdf_from_string html, pdf_options
    File.write out_file, pdf, mode: "wb"
    true
  rescue StandardError => e
    Rails.logger.error e.message
    false
  end
end
```

Ở đây `data` là 1 hash chứa các biến local được dùng trong file template, `layout` là layout được sử dụng khi render template thành HTML, `pdf_options` là các tuỳ chọn khi convert từ HTML thành PDF như page size, page margin, orientation...

File layout được viết trong `app/views/pdf/layouts/application.html.slim` như sau (mình dùng Slim thay vì ERB):
```ruby
doctype html
html lang="ja"
  head
    meta charset="utf-8"
    = wicked_pdf_stylesheet_link_tag "pdf/application", media: "all"
    - if content_for? :stylesheets
      = yield :stylesheets
  body
    = yield
    = wicked_pdf_javascript_include_tag "pdf/application"    
    - if content_for? :javascripts
      = yield :javascripts
````

Ở đây mình sử dụng các helper method `wicked_pdf_stylesheet_link_tag` và `wicked_pdf_javascript_include_tag` của Wicked PDF để include các file CSS và JS với đường dẫn tuyệt đối. Do `wkhtmltopdf` chạy bên ngoài ứng dụng Rails nên nếu sử dụng các helper method `stylesheet_link_tag` và `javascript_include_tag` của Rails thì các file trong thư mục `assets` sẽ không thể được tìm thấy.

Bây giờ mình tạo 1 file template `app/views/pdf/test.html.slim`

```
h1
  | The quick brown fox jumps over the lazy dog.
```

và gọi 

```
pdf_options = {
  page_size: "A4",
  margin: {
    top:    35, # mm
    bottom: 30, # mm
    left:   30, # mm
    right:  30  # mm
  }
}
HtmlToPdfService.new("pdf/test", "out.pdf", pdf_options: pdf_options).perform
```

thì sẽ tạo được 1 file PDF trông như thế này:

![](https://images.viblo.asia/80036fd7-9f2e-4cdf-bbc8-8a70631953cb.png)

## Sử dụng custom font và những điểm cần chú ý 

Trông file PDF ở trên hơi đơn điệu nên mình sẽ thử thêm chút style cho dòng chữ trong thẻ `h1`. Sửa lại file `app/assets/stylesheets/pdf/application.scss` như sau

```stylesheet
@font-face {
  font-family: 'Caveat';
  src: font-url('Caveat.ttf');
}

h1 {
  font-size: 3rem;
  font-family: 'Caveat';
  color: green;
}
```

File font `Caveat.ttf` mình đã để sẵn trong thư mục `app/assets/fonts`. Xem thành quả nào

![](https://images.viblo.asia/98df5968-c9f7-481f-b734-e711ffc2ea07.png)

Chẳng có cái gì cả 😯Có vẻ là do mình dùng custom font và font đó không được tìm thấy khi convert HTML thành file PDF. Thử đủ kiểu như `src: url('fonts/Caveat.ttf')` hay dùng cả đường dẫn tuyệt đối đến file font cũng không được. Sau 1 hồi tìm hiểu thì mình biết được có 2 cách khắc phục:

- Nếu định nghĩa font trong file css thì phải dùng base64-encoded data, nó có dạng như `src: url(data:font/ttf;base64,AAEAAAATAQAABAAwR1BPU+Df..)`. Thật may là Wicked PDF có sẵn helper method `wicked_pdf_asset_base64` giúp convert 1 file asset ra base64. Để sử dụng method đó trong file css chúng ta cần thêm `.erb` vào đuôi file và include class `WickedPdf::WickedPdfHelper::Assets`. Cách làm như sau:
  
  File `app/assets/stylesheets/pdf/application.scss.erb`
  ```ruby
  <% environment.context_class.instance_eval { include WickedPdf::WickedPdfHelper::Assets } %>

  @font-face {
    font-family: 'Caveat';
    src: url('<%= wicked_pdf_asset_base64 "Caveat.ttf" %>');;
  }

  h1 {
    font-size: 3rem;
    font-family: 'Caveat';
    color: green;
  }
  ```

- Nếu viết style trong file HTML thì chúng ta có thể dùng đường dẫn trực tiếp tới file hoặc base64-encoded data. Trong file `test.html.slim` viết 1 trong 2 kiểu dưới đây đều được:

    ```ruby
    - content_for :stylesheets do
      css:
        @font-face {
          font-family: 'Caveat';
          src: url('#{Rails.root.join "app", "assets", "fonts", "Caveat.ttf"}');
        }
    ```
    
    ```ruby 
    - content_for :stylesheets do
      css:
        @font-face {
          font-family: 'Caveat';
          src: url('#{wicked_pdf_asset_base64 "Caveat.ttf"}');
        }
    ```
    
 Và đây là thành quả sau cùng 🤣
 
 ![](https://images.viblo.asia/e82b0d5e-c6c8-4d01-8a24-5dce3abd758e.png)

Như vậy là việc tạo file PDF từ HTML đã có gem làm cho, vậy còn việc viết HTML thì sao? Trong dự án của mình thì 1 số file PDF cần tạo đều có template Word sẵn rồi nên mình tận dụng luôn tính năng `Save as Web Page` của Mircosoft Word ✌🏻Đối với các file PDF chỉ chứa chủ yếu là text, không có hoặc có ít hình ảnh, bảng biểu... thì cách này khá hữu ích. Nó giúp tiết kiệm thời gian hơn so với việc viết HTML và căn chỉnh CSS 1 cách thủ công.
 
 ![](https://images.viblo.asia/000c37ba-833b-45e5-aa43-4890c9ebea36.png)

Trong cửa sổ Word các bạn chọn `File` > `Save As...` rồi chọn `Web Page, Filtered (.htm)` như hình. File HTML mà Word tạo ra đã nhúng sẵn CSS và gắn inline style cho các element nên công việc còn lại là thêm đuôi `.erb` để nhúng các đoạn code Ruby cần thiết và thêm đường dẫn tuyệt đối cho font như mình đã hướng dẫn ở trên. Một điểm chú ý là không phải cứ font nào có sẵn trong máy (đi kèm với OS, Microsoft Office, ...) là chúng ta có thể sử dụng nó trên server. Một số font có license riêng cho việc dùng trên server hoặc dùng với mục đích thương mại, các bạn nên tìm hiểu kĩ và chỉ nên dùng các font cơ bản khi không có nhu cầu đặc biệt khác.

# Tạo file PDF từ file PDF 
Trong thực tế có những file PDF mà format đã cố định và chỉ cần điền thêm thông tin vào, ví dụ như bản CV dưới đây:

![](https://images.viblo.asia/3f633067-0212-4e39-8a95-12a3377f91dd.png)

Trong trường hợp này thì việc tạo file PDF từ HTML là không cần thiết, chúng ta chỉ cần insert text vào các vị trí nhất định.

Ở đây mình xin giới thiệu với các bạn 1 gem tạo file PDF rất nổi tiếng đó là [Prawn](https://github.com/prawnpdf/prawn). Nó khác với Wicked PDF hay PDFKit ở chỗ Prawn là 1 thư viện thuần Ruby để tạo ra file PDF còn Wicked PDF hay PDFKit chỉ là wrapper của 1 ứng dụng convert HTML sang PDF. Prawn hỗ trợ rất tốt việc chèn text, ảnh hay vẽ hình vector, các bạn có thể set kiểu font, kích thước, vị trí, góc quay... của các phần tử 1 cách tuỳ ý. 

Để cài đặt Prawn các bạn chỉ cần thêm `gem 'prawn'` vào Gemfile rồi chạy `bundle install` là xong. Hướng dẫn sử dụng Prawn các bạn có thể xem ở [đây](http://prawnpdf.org/manual.pdf), rất đầy đủ và dễ hiểu.

Tuy Prawn là 1 gem rất tuyệt vời để tạo file PDF nhưng nó lại không thể chỉnh sửa hoặc thêm nội dung vào 1 file PDF có sẵn 🤣 Vì thế để giải quyết bài toán ở trên mình phải đi đường vòng: đầu tiên dùng gem Prawn để tạo ra 1 file PDF chỉ chứa nội dung cần điền như dưới

![](https://images.viblo.asia/95ac651b-35a1-439d-bd03-059aca54a3e6.png)

và sau đó dùng gem [CombinePDF](https://github.com/boazsegev/combine_pdf) merge file content với file template để tạo ra file kết quả

![](https://images.viblo.asia/1a2fedd7-355c-41e5-b69c-7a08ef6b7075.png)

Để đơn giản hoá việc tạo file PDF và tránh sử dụng trực tiếp các method của Prawn, mình đã viết 1 service để tạo file content và merge với file template:

```ruby
class PdfToPdfService
  PAGE_MARGIN = [0, 0, 0, 0].freeze

  attr_reader :template_file, :template_pdf, :content_pdf, :out_file, :data

  def initialize template_file, out_file, data
    @template_file = template_file
    @template_pdf = CombinePDF.load template_file
    @content_pdf = Prawn::Document.new skip_page_creation: true
    @out_file = out_file
    @data = data # dữ liệu để thêm vào từng page của file template
  end

  def perform
    create_content_file
    merge_content_with_template
    true
  rescue StandardError => e
    Rails.logger.error e.message
    false
  ensure
    FileUtils.rm_f content_file
  end

  private
  def create_content_file
    # do file template có thể có nhiều page, mỗi page có size khác nhau
    # nên khi tạo file content cũng phải tạo từng page với size tương ứng
    template_pdf.pages.each_with_index do |template_page, page_idx|
      _, _, width, height = template_page.mediabox
      content_pdf.start_new_page size: [width, height], margin: PAGE_MARGIN
      add_content_page data[page_idx]
    end

    content_pdf.render_file content_file
  end

  def add_content_page page_data
    page_data.each do |input| 
      content_pdf.send input[0], *input[1..-1]
    end
  end

  def merge_content_with_template
    # merge từng page của file content với từng page của file template
    content_pages = CombinePDF.load(content_file).pages
    template_pdf.pages.each_with_index do |page, page_idx|
      page << content_pages[page_idx]
    end
    template_pdf.save out_file
  end

  def content_file
    @content_file ||= Rails.root.join "tmp", "content_#{Time.now.to_i}_#{SecureRandom.hex}.pdf"
  end
end
```

Khi gọi service này mình truyền vào data như sau:

```ruby
data = [
  [
    [:font, Rails.root.join("app", "assets", "fonts", "ipaex_mincho.ttf")], # set font cho toàn bộ content file
    [:text_box, "2018", at: [260, 790], size: 10], # điền text "2018" với font size 10 vào vị trí (260, 790)
    [:text_box, "6", at: [307, 790], size: 10], 
    [:text_box, "20", at: [333, 790], size: 10],
    [:text_box, "グエン　ドゥック　トゥン", at: [135, 774], size: 10],
    [:text_box, "NGUYEN DUC TUNG", at: [135, 748], size: 20],
    [:text_box, "1991", at: [120, 701], size: 10],
    [:text_box, "2", at: [170, 701], size: 10],
    [:text_box, "31", at: [210, 701], size: 10],
    [:text_box, "26", at: [285, 701], size: 10],
    [:stroke_ellipse, [348, 688], 10], # vẽ đường tròn với bán kính 10px ở vị trí (348, 688)
    [:text_box, "トウキョウト シンジュクク シンジュク ゴチョウメ ニノイチ", at: [135, 673], size: 10],
    [:text_box, "160-0022", at: [135, 658], size: 10],
    [:text_box, "東京都新宿区新宿５丁目２ー1", at: [135, 635], size: 18],
    [:text_box, "0987654321", at: [425, 653], size: 12]
  ],
  [
    # page 2 tạm thời không có nội dung nên truyền vào mảng rỗng
  ]
]

PdfToPdfService.new("CV.pdf", "out.pdf", data).perform
```

Ở đây `data` là 1 mảng của các mảng, mỗi mảng con là dữ liệu cần điền vào mỗi page. Ví dụ khi nhận vào `[:text_box, "2018", at: [260, 790], size: 10]`, service sẽ gọi method `text_box ` của Prawn với các argument `"2018", at: [260, 790], size: 10` để điền text `2018` với font size 10 vào vị trí (260, 790).

Như vậy là mình đã tạo được 1 file PDF như mong muốn, thế nhưng lại có vấn đề là việc xác định toạ độ để điền thông tin phải làm thủ công và rất mất công, gặp những file như dưới đây chỉ muốn 😭  

![](https://images.viblo.asia/18e58453-48b3-4054-a12f-2ea82071710f.jpg)

Nguồn ảnh: https://xn--zsss19a.jp/%E9%9B%87%E7%94%A8%E4%BF%9D%E9%99%BA/%E9%9B%87%E7%94%A8%E4%BF%9D%E9%99%BA%E3%81%AE%E5%8F%97%E7%B5%A6%E6%89%8B%E7%B6%9A%E3%81%8D/

Có 1 cách để đơn giản hoá việc 1 chút đó là sử dụng các method của Prawn để vẽ grid kèm theo toạ độ của các đường dọc ngang lên file template. Nếu các bạn cần có thể tham khảo đoạn code trong issue [này](https://github.com/prawnpdf/prawn/issues/957#issuecomment-211625985) trên trang GitHub của Prawn.
# Tạo file PDF từ file Word, Excel, ...

Giải pháp cuối cùng đó là convert trực tiếp file Word, Excel, ... sang PDF. [LibreOffice](https://www.libreoffice.org/) là 1 bộ office open-source nổi tiếng và nó cũng có thể được dùng để convert file tạo bởi Microsoft Office sang PDF. Sau khi cài đặt LibreOffice trên server thì các bạn có thể sử dụng chế độ dòng lệnh của LibreOffice như sau:

- Convert file Word sang PDF

    ```
    /path/to/libreoffice --headless --convert-to pdf:writer_pdf_Export input.docx
    ```
    
- Convert file Excel sang PDF

    ```
    /path/to/libreoffice --headless --convert-to pdf:calc_pdf_Export input.docx
    ```
    
- Convert file PowerPoint sang PDF

     ```
    /path/to/libreoffice --headless --convert-to pdf:impress_pdf_Export input.docx
    ```
    
Nếu các bạn muốn dùng code Ruby thay vì dùng trực tiếp LibreOffice thì cũng có gem làm điều đó cho bạn: [libreconv](https://github.com/FormAPI/libreconv).

Tuy nhiên không có gì là hoàn hảo 100%, các file PDF tạo ra bởi LibreOffice thường không giữ được layout như file gốc. Cũng dễ hiểu thôi, LibreOffice không phải là Microsoft Office, bản thân LibreOffice khi mở các file của Microsoft Office cũng lỗi layout chứ chưa cần nói đến khi convert sang file PDF. Tạm thời thì ở dự án mình phải khắc phục bằng cách mở các file Word bằng LibreOffice, sửa những chỗ bị lỗi layout rồi save lại, sau đó mới dùng những file đó để convert sang PDF. Tuy hơi mất công nhưng vẫn khả thi hơn việc viết HTML và CSS để tạo ra các file đó 😅

Có vẻ là nếu sử dụng các giải pháp miễn phí thì khó mà tạo ra được file PDF 1 cách đơn giản và có chất lượng cao. Do đó nếu như "nhà có điều kiện" thì chúng ta có thể cân nhắc những giải pháp mất phí dưới đây. Mình cũng chỉ tìm kiếm qua trên Google chứ không tìm hiểu kĩ vì biết chắc là không thể nào được sử dụng đến 🤣

- Cài đặt Microsoft Office lên server chạy Windows và có thể dùng [script](https://gallery.technet.microsoft.com/office/Script-to-convert-Word-f702844d) để convert file Word sang PDF. Tất nhiên là cũng cần phải xây dựng web server và API để Rails app có thể gửi file Word và nhận về file PDF.
- Dùng các giải pháp của bên thứ 3 như [GemBox](https://www.gemboxsoftware.com/bundle), [Muhimbi PDF Converter Services](http://www.muhimbi.com/Products/PDF-Converter-Services.aspx) hay [Qoppa PDF Automation Server](https://aws.amazon.com/marketplace/pp/B071H86JZG), giá cái nào cũng phải vài nghìn \$ trở lên.

# Tổng kết
Như vậy là mình đã giới thiệu xong 3 giải pháp tạo file PDF với Ruby on Rails. Tóm lại thì 

- Đối với những file PDF đơn giản mình sử dụng gem Wicked PDF để convert từ HTML
- Đối với những file PDF có format cố định và chỉ cần điền thông tin vào mình sử dụng gem Prawn cùng với CombinePDF
- Đối với những file PDF layout phức tạp hơn mình sử dụng LibreOffice để convert từ file Word, Excel, ...

Giải pháp thì cũng có những điểm mạnh và hạn chế riêng, không có giải pháp nào là hoàn hảo hay "ngon - bổ - rẻ" cả. Qua bài viết này mình cũng rất mong nếu có bạn nào biết các giải pháp khác khả thi hơn thì xin cho mình biết với (bow). 

Cảm ơn các bạn đã theo dõi bài viết!