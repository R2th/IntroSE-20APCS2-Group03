Trong công việc chúng ta thường xuyên phải tạo 1 file với nhiều format như pdf, xlsx... Bài viết này mình xin viết về tạo 1 file xlsx trong Rails với tùy chỉnh design và style. Bài toán mình đặt ra là export 1 file excel có format giống như ảnh, hàng cuối cùng 1 số cột sẽ tính tổng các giá trị tương ứng với cột tương ứng



![](https://images.viblo.asia/1f6b98da-1658-465c-b402-7a8ded2566a8.png)


## 1. Giới thiệu gem axlsx
Để tạo ra 1 file excel có style, định dạng, biểu đồ vv..vv thì  gem [Axlsx](https://github.com/randym/axlsx) là một sự lựa chọn tuyệt vời. Gem này cung cấp 1 danh sách rất lớn các tính năng mà bạn có thể thực hiện được cho hầu hết mọi việc từ việc thêm các định dạng đơn giản đến xây dựng đồ thị hay các tùy chọn cài đặt để in.
![](https://images.viblo.asia/b2b96f41-5578-4ba3-95f6-252e5fa6735b.png)

Các tính năng nổi bật là:
1. Cho phép bạn dễ dàng và nhanh chóng tạo ra các bản báo cáo chuyên nghiệp dựa trên xlsx
2. Giúp xây dựng các 3D Pie, Line, Scatter và Bar Charts ... dựa trên data trong worksheet của bạn. Có thể tùy chỉnh lable, color
3. Style tùy chỉnh: Bạn có thể tạo kiểu đường viền,  alignment, fills, fonts, and number formats trên 1 line hoặc toàn bộ các line
4. Tự động nhận dạng các kiểu dữ liệu  Float, Integer, String, Date, Time và Boolean 
5. Chiều rộng cột tự động: Axlsx sẽ tự động xác định độ rộng thích hợp cho các cột của bạn dựa trên nội dung trong trang tính
6. Có thể thêm hình ảnh jpg, gif, png vào trang tính
7. Tham chiếu dễ dàng trong trang tính bằng cách tham chiếu kiểu  "A1" và "A1: D4" hoặc "Sheet1! A3: B4"
8. Hỗ trợ tính toán, gộp hàng, cột một cách dễ dàng.
... 

Còn nhiều tính năng khác nữa bạn có thể tham khảo tại [đây](https://github.com/randym/axlsx)
## 2. Cài đặt
Để cài đặt Axlsx ta thêm bằng cách add gem vào Gemfile
```
gem "axlsx"
```
Ta tìm hiểu nhanh qua cách hoạt động của Axlsx:

Tại controller ta sẽ tạo 1 response mới là xlsx:
```
[...]
def index
  @products = Product.order('created_at DESC')
  respond_to do |format|
    format.html
    format.xlsx
  end
end
[...]
```
Tại view add thêm link để download:
```
<h1>List of products</h1>
<%= link_to 'Download as .xlsx', products_path(format: :xlsx) %>
```

Giờ chúng ta tạo 1 template mới đặt là index.xlsx.axlsx để trả về format xlsx. 

Tại views/products/index.xlsx.axlsx:
```
wb = xlsx_package.workbook
wb.add_worksheet(name: "Products") do |sheet|
  @products.each do |product|
    sheet.add_row [product.title, product.price]
  end
end
```
`add_row` sẽ tạo ra 1 row mới chứa thông tin của product. "Products" sẽ là sheet name.

Sau đó ta thay đổi file name download tại controller

```
[...]
respond_to do |format|
  format.html
  format.xlsx {
    response.headers['Content-Disposition'] = 'attachment; filename="all_products.xlsx"'
  }
end
[...]
```

Ngoài ra bạn có thể sử dụng render method với các tùy chọn: 
```
render xlsx: 'products', template: 'my/template', filename: "my_products.xlsx", disposition: 'inline',
  xlsx_created_at: 3.days.ago, xlsx_author: "Elmer Fudd"
```

## 3. Các option style
Add style vào các cell cụ thể bằng cách
```
require "axlsx"

p = Axlsx::Package.new
ws = p.workbook.add_worksheet

# Định nghĩa style
title = ws.styles.add_style(:bg_color => "FFFF0000",
                           :fg_color=>"#FF000000",
                           :border=>Axlsx::STYLE_THIN_BORDER,
                           :alignment=>{:horizontal => :center})

date_time = ws.styles.add_style(:num_fmt => Axlsx::NUM_FMT_YYYYMMDDHHMMSS,
                               :border=>Axlsx::STYLE_THIN_BORDER)

percent = ws.styles.add_style(:num_fmt => Axlsx::NUM_FMT_PERCENT,
                             :border=>Axlsx::STYLE_THIN_BORDER)

currency = ws.styles.add_style(:format_code=>"¥#,##0;[Red]¥-#,##0",
                              :border=>Axlsx::STYLE_THIN_BORDER)

# Xây dựng row data tương ứng
ws.add_row ["Generated At:", Time.now], :styles=>[nil, date_time]
ws.add_row ["Previous Year Quarterly Profits (JPY)"], :style=>title
ws.add_row ["Quarter", "Profit", "% of Total"], :style=>title
ws.add_row ["Q1", 4000, 40], :style=>[title, currency, percent]
ws.add_row ["Q2", 3000, 30], :style=>[title, currency, percent]
ws.add_row ["Q3", 1000, 10], :style=>[title, currency, percent]
ws.add_row ["Q4", 2000, 20], :style=>[title, currency, percent]
f = File.open('example_you_got_style.xlsx', 'w')
p.serialize(f)
```

- fg_color (String) — The text color
- sz (Integer) — The text size
- b (Boolean) — Indicates if the text should be bold
- i (Boolean) — Indicates if the text should be italicised
- u (Boolean) — Indicates if the text should be underlined
- strike (Boolean) — Indicates if the text should be rendered with a strikethrough
- shadow (Boolean) — Indicates if the text should be rendered with a shadow
- charset (Integer) — The character set to use.
- family (Integer) — The font family to use.
- font_name (String) — The name of the font to use
- num_fmt (Integer) — The number format to apply
- format_code (String) — The formatting to apply.
- border (Integer|Hash) — The border style to use. borders support style, color and edges options
- bg_color (String) — The background color to apply to the cell
- hidden (Boolean) — Indicates if the cell should be hidden
- locked (Boolean) — Indicates if the cell should be locked
- type (Symbol) — What type of style is this. Options are [:dxf, :xf]. :xf is default
- alignment (Hash) — Hash định nghĩa các attributes sử dụng trong CellAlignment.Các attribute cụ thể là:


| Tên attribute| Mô tả |
| -------- | -------- |
| horizontal     |   Căn chỉnhn ngang , các giá trị có thể là  "bottom", "center", "top"  | 
| vertical     |  Căn chỉnhn dọc , các giá trị có thể là  "bottom", "center", "top"      | 
| text_rotation     |   Độ xoay của chữ . Có giá trị từ 0 đến 180 hoặc 255 (mặc định là 0). "90", "45" là được xoay lên 90 độ, 45 độ  | 
| indent     |    Lượng thụt lề  | 
| relative_indent     |   Lượng thụt lề tương đối.   | 
| justify_last_line     |     Indicate if the last line should be justified | 
| shrink_to_fit     |  Cho biết liệu văn bản có nên được thu nhỏ cho vừa trong ô hay không    | 
| reading_order     |   Thứ tự đọc của văn bản 0 là Context Dependent, 1 là Left-to-Right , 2 là Right-to-Left.   | 





## 4. Giải quyết bài toán đưa ra
```
HEADER_TEXT_ROTATION = 255 #Text hiển thị kiểu thẳng đứng
NUMBER_FORMAT = 3 #Hiển thị format số 10000 => 10,000
BG_COLOR_HIGHLIGHT = "FEF2CB" #Background color cho ô highlight
BG_COLOR_HEADER = "DEEAF6" #Background color cho ô header
  
xlsx_package = Axlsx::Package.new
xlsx_workbook = xlsx_package.workbook
# Định nghĩa các style sẽ áp dụng
xlsx_workbook.styles do |style|
  border_cell = style.add_style(border: Axlsx::STYLE_THIN_BORDER, num_fmt: NUMBER_FORMAT)
  highlight_cell = style.add_style(bg_color: BG_COLOR_HIGHLIGHT,
    border: Axlsx::STYLE_THIN_BORDER, num_fmt: NUMBER_FORMAT)
  header_cell = style.add_style(bg_color: BG_COLOR_HEADER, border: Axlsx::STYLE_THIN_BORDER,
    alignment: {textRotation: HEADER_TEXT_ROTATION, horizontal: :center, vertical: :center})

  xlsx_workbook.add_worksheet(name: ArrangeBilling.sheet_name) do |worksheet|
    worksheet.add_row(ArrangeBilling.label_i18n, style: header_cell)
    users.each do |user|
      worksheet.add_row(user.row_data, style: border_cell)
    end
    # Thêm dòng tính tổng SUM ở hàng cuối cùng
    worksheet.add_row(User.row_caculate_data(users.length),
      style: User.row_caculate_style(highlight_cell))
  end
end
xlsx_package.serialize Rails.root.join("tmp", "user_export.xlsx")
```

Tại user.rb
```
# Định nghĩa các cột tương ứng với giá trị index
ALL_ELEMENTS = 39
ROW_CALCULATE = {
    5 => "F",
    6 => "G",
    24 => "Y",
    25 => "Z",
    26 => "AA",
    27 => "AB",
    28 => "AC",
    29 => "AD",
    30 => "AE",
    31 => "AF",
    32 => "AG",
    33 => "AH",
    34 => "AI",
    35 => "AJ",
    36 => "AK",
    37 => "AL"
}
  
class_methods do
    def label_i18n
      I18n.t("user.export.label").values
    end

    def sheet_name
      I18n.t("user.export.sheet_name")
    end

    def row_caculate_data size
      row_array = Array.new(ALL_ELEMENTS, nil)
      size += 1
      ROW_CALCULATE.each do |key, column_name|
        row_array[key] = "=SUM(#{column_name}2:#{column_name}#{size})"
      end
      row_array
    end

    def row_caculate_style highlight
      row_array = Array.new(ALL_ELEMENTS, nil)
      ROW_CALCULATE.map{|key, _v| row_array[key] = highlight}
      row_array
    end
 end
```

Như vậy ta đã xây dựng xong file excel giống như đề bài mình đưa ra. Về cơ bản chúng ta sẽ xây dựng file dựa trên ý tưởng như vậy

Hi vọng bài viết giúp ích cho bạn!

Thank you

**Nguồn tham khảo**

https://www.rubydoc.info

https://github.com/randym/axlsx

https://github.com/SheetJS/js-xlsx/pull/263/commits/aa8f3a759f816df614671ce8afa6813dfb9d8d7f

https://pramod-shinde.com/2013/12/29/design-spreadsheets-using-axlsx-in-rails/
https://www.sitepoint.com/generate-excel-spreadsheets-rails-axlsx-gem/