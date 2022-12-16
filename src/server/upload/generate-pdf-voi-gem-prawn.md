## Giới thiệu
Chào mọi người !

Trong bài hôm nay, mình xin chia sẻ với mọi người về gem **Prawn** cũng như cách sử dụng **Prawn** trong ứng dụng Rails thông qua các ví dụ .

Thì **Prawn** là một gem tạo file PDF khá mạnh mẽ hỗ trợ chúng ta dễ dàng tạo bảng, nhúng ảnh(png và jpg) hoặc vẽ các đường thẳng, đa giác…

## Hello world với Prawn

Để làm quen với **Prawn**, chúng ta sẽ cùng nhau tạo một file PDF đơn giản là in dòng chữ “Hello World”

**Config cơ bản :**

Đầu tiên là tạo project rails mới( Phần này mọi người tự tạo và cấu hình nha)

Trong `gemfile`. Thêm

```ruby
gem "prawn"
```

Và run : `bundle install`

Run : `rails generate scaffold User name:string email:string` và run  `rails db:migrate`

Fake dữ liệu :

```ruby
//db/seeds.rb

5.times do |i|
  User.create(name: "Name #{i}", email: "email#{i}.@gmail.com")
end
```

Run : `rails db:seed`

Tiếp theo, `trong app/config/initializers/mime_types.rb`. Thêm :

`Mime::Type.register "application/pdf", :pdf`

Ok. Vậy là xong phần cài đặt ban đầu

**Controller**

```ruby
//users_controller.rb

def show
    user = User.find(params[:id])
    respond_to do |format|
    format.html
    format.pdf do
      pdf = CvPdf.new
      send_data pdf.render,
                filename: "users/#{@user.id}.pdf",
                type: "application/pdf",
                disposition: "inline"
    end
   end
  end
```
Mọi người để ý option `disposition: "inline"` sẽ giúp file PDF hiển thị ngay trên trình duyệt mà không phải download về máy.

**View**

```ruby
//views/users/show.html.erb . Thêm 

<%= link_to 'Printable', user_path(@user, format: "pdf") %>
```

**Định dạng file PDF**

Tạo folder : `app/pdfs`

Tạo file : `app/pdfs/cv_pdf.rb`

```ruby
class CvPdf < Prawn::Document
  def initialize
    super()
    text "Hello World !"
  end
end
```

Ở trên ta sẽ tạo class CvPdf kế thừa từ `Prawn::Document`

Và thông thường chúng ta sẽ viết toàn bộ nội dung của file PDF ở đây.

Run : `rails s` và đây là kết quả

![](https://images.viblo.asia/b2a4caaf-5d45-4b05-87f1-a85beeb2c6d1.png)

Ok ! Rất đơn giản đúng không ạ 

## Tạo bảng với Prawn

Tạo bảng trong Prawn cũng rất đơn giản.

Đầu tiên mọi người phải thêm `gem "prawn-table"`

Trong `cv_pdf.rb`

```ruby
class CvPdf < Prawn::Document
  def initialize
    super()
    rows = [
      ['o', 'o','x'],
      ['x', 'o','x'],
      ['x', 'o','o']
    ]
    table rows
  end
end
```

 Kết quả :
 
 ![](https://images.viblo.asia/02490821-f102-4742-8edb-9b781f1ba355.png)
 
 Prawn-table có đầy đủ các method hỗ trợ thay đổi độ lớn, màu sắc các cột, các hàng.Mọi người có thể tìm hiểu thêm ở đây : https://github.com/prawnpdf/prawn-table
 
## Các method của Prawn

Một điểm mình rất thích của Prawn là hỗ trợ đầy đủ các method giúp chúng ta có thể tạo bất kỳ file PDF từ đơn giản đến phức tạp.

Đặc biệt là có docs giải thích rất chi tiết : https://prawnpdf.org/manual.pdf

Mình sẽ làm một demo nhỏ là tạo một phần CV để mọi người dễ dàng hình dung cách dùng các method của Prawn.

Mình sẽ lấy mẫu cv trên https://cv.viblo.asia/

Vẫn trong `cv_pdf.rb`

```ruby
class CvPdf < Prawn::Document
  def initialize
    super()
    header
    info_user
    career_goal
    experience
  end

  def header
    image "#{Rails.root}/app/assets/images/viblo_logo.png", position: :left, width: 150, height: 150
    draw_text "VIBLO CV", at: [200, 700],  size: 25, style: :bold
    draw_text "Full-Stack Developer", at: [200, 650], size: 25
  end

  def info_user
    draw_text "email@gmail.com", at: [20, 550],  size: 13
    draw_text "0123456789", at: [20, 530],  size: 13
    move_down 100
  end

  def career_goal
    stroke_horizontal_rule
    draw_text "CAREER GOAL", at: [20, 450],  size: 16, style: :bold
    draw_text "Description", at: [30, 430],  size: 13
  end

  def experience
    move_down 100
    stroke_horizontal_rule
    draw_text "EXPERIENCE", at: [20, 350], size: 16, style: :bold
    draw_text "You position :", at: [30, 330], size: 13
    draw_text "Company name :", at: [30, 310], size: 13
    draw_text "Description :", at: [30, 290], size: 13
  end
end
```

Kết quả :


![](https://images.viblo.asia/0eed08c7-38d2-40be-b5f6-d4d1fe06e2d8.png)


## Lưu ý
Prawn có một điểm yếu là cung cấp khá ít font chữ.

Nếu ta muốn sử dụng loại font chữ như tiếng Nhật , Hàn ... thì ta cần phải tự download font và cài thêm.

Vậy muốn hiển thị được tiếng Nhật trong Prawn.

Đầu tiên ta phải font. Link download : https://ctan.org/pkg/ipaex?lang=en

Giải nén và copy font mới đến folder : ` vendor/fonts`

Vẫn trong `cv_pdf.rb` 

```ruby
class CvPdf < Prawn::Document
  def initialize
    super()
    jp_font
    text "学ぶ"
  end

  def jp_font
    font_families.update('JP_font' => { normal: "#{Rails.root}/vendor/fonts/ipaexm.ttf" })
    font "JP_font", size: 10
  end
end
```

Ở trên, mình sử dụng method font_families để thêm font chữ mới và đặt tên là  `JP_font` . Sau đó `font "JP_font"` để sử dụng font mới.

Đây là kết quả :
![](https://images.viblo.asia/3158c207-27a4-449e-997f-4035a2282b19.png)

Lúc đầu, mình cũng hơi bất ngờ vì một gem khá lớn mà vẫn phải thêm font chữ một cách thủ công như vậy.

Nhưng thao tác thêm font chữ mới vào Prawn cũng khá đơn giản nên mọi người chú ý điều này để không gặp lỗi nha ^^

## Lời kết

Prawn ưu điểm là tốc độ khá nhanh, có docs chi tiết, hỗ trợ nhúng ảnh, vẽ đường thẳng, đường cong rất dễ dàng. 

Nhưng nhược điểm thì chỉ hỗ trợ sẵn một vài font chữ, muốn sử dụng ta phải mất công tự cài đặt font. Và Prawn không và sẽ không bao giờ có trình tạo HTML sang PDF. 

Trên đây là những hiểu biết của mình về gem Prawn. Hi vọng qua bài viết mọi người có thể hiểu cơ bản về Prawn.

Cảm ơn mọi người đã đọc ^^

### Tài liệu tham khảo 

https://github.com/prawnpdf/prawn

https://prawnpdf.org/manual.pdf

https://github.com/prawnpdf/prawn-table