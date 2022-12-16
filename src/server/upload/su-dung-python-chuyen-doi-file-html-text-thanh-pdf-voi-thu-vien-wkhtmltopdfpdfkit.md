# Dẫn nhập
Tôi có một bài viết trước đây [Sử dụng Jinja template kết hợp với Python tự động sinh file báo cáo từ biểu mẫu](https://viblo.asia/p/su-dung-jinja-template-ket-hop-voi-python-tu-dong-sinh-file-bao-cao-tu-bieu-mau-oOVlYzGV58W), bài viết tiếp theo này tôi sẽ giới thiệu với các bạn một thư viện của Python là pdfkit (dựa trên enginee của wkhtmktopdf) để thực hiện chuyển đổi file html đã tạo được sang file pdf. 

## Lựa chọn pdfkit ? 
Trước khi dùng pdfkit, tôi đã tìm hiểu và sử dụng một loạt các thư viện khác như html2pdf, xhtml2pdf,...các thư viện này nhẹ và dễ dùng hơn pdfkit rất nhiều nhưng có một thứ mà pdfkit (wkhtmltopdf) làm được mà các thư viện khác không làm được (đến thời điểm tôi tham khảo) đó là xử lý dữ liệu tiếng Việt (unicode). 

pdfkit có thể thực hiện convert chính xác tiếng Việt có dấu từ html ra pdf. Còn các thư viện khác thì... hên xui, có ký tự có dấu xử lý được, có ký tự thì ô vuông, hỏi chấm.

## Cài đặt thư viện
Pdfkit sử dụng enginee do thư viện wkhtmltopdf cung cấp. Để sử dụng được pdfkit thì ta phải cài đặt wkhtmltopdf trước. 

### Cài đặt wkhtmltopdf
Đây là một opensoucce, chúng ta có thể download tại <https://wkhtmltopdf.org/index.html>, chú ý download đúng phiên bản tương ứng với hệ điều hành mà bạn đang sử dụng. 

Riêng với hệ điều hành Windows, khi cài đặt các bạn nhớ lưu ý đường dẫn đến vị trí cài đặt của của wkhtmltopdf (thường là C:\Program Files\wkhtmltopdf). 
Sau đó, thực hiện mở thư mục chứa đường dẫn này vào vào thư mục con sâu hơn là \bin (` C:\Program Files\wkhtmltopdf\bin`) vào class-path của windows. Việc cài đặt PATH, các bạn có thể tìm kiếm trên google nhé.

Sau khi cài đặt & set class path xong, bạn hãy mở windows terminal (mở cmd mới nhé) ra và gõ vào dòng lệnh sau: 

```wkhtmltopdf --version```
> wkhtmltopdf 0.12.5 (with patched qt)

Nếu có dữ liệu như trên thì có nghĩa là việc cài đặt wkhtmltopdf đã thành công.

Với hệ điều hành Linux, nếu user của bạn không phải là root, hãy thực hiện set đường dẫn đến thư mục chứa class của wkhtmltopdf để có thể sử dụng wkhtmltopdf trên commandline nhé.


### Cài đặt pdfkit.

Sử dụng câu lệnh sau để cài đặt pdfkit

```
pip install pdfkit
```

Kết quả hiện ra: 
```
Collecting pdfkit
  Downloading pdfkit-0.6.1-py3-none-any.whl (12 kB)
Installing collected packages: pdfkit
Successfully installed pdfkit-0.6.1
```

# Sử dụng pdfkit với Python
Thư viện pdfkit cung cấp khá đầy đủ các sample, các bạn có thể tham khảo thêm tại: https://pypi.org/project/pdfkit/


## Sử dụng các các chức năng mặc định.

### Convert một trang web sang pdf

Mở terminal, di chuyển đến một thư mục ... "dễ nhớ"và thực hiện một số dòng lệnh sau: (Nhớ chuyển từ terminal sang mode python bằng cách gõ `python` trước nhé)
```python
>>> import pdfkit
>>> pdfkit.from_url("https://viblo.asia/newest", "url2pdf.pdf")

```

Sau đó đợi thư viện làm việc và phản hồi lại.
```
Loading pages (1/6)
Counting pages (2/6)
Resolving links (4/6)
Loading headers and footers (5/6)
Printing pages (6/6)
Done
True
```
Như này là kết quả đã thành công, mở thư mục vừa di chuyển đến, ta sẽ thấy file url2pdf.pdf

![](https://images.viblo.asia/d8884c02-2a0d-456f-8872-4457dda76489.png)

### Convert một file html sang pdf

Trước tiên, thực hiện tạo ra một file .html và đặt nó vào một thư mục, trong ví dụ này, tôi dùng file có tên `report.html`.

Mở terminal và thực hiện di chuyển đến thưc mục chứa file `report.html`, sau đó chuyển sang mode nhập code python

```python
>>> import pdfkit
>>> pdfkit.from_file('report.html', 'report.pdf')
```
Chờ một chút để hệ thống xử lý và đưa ra thông báo.
```
Loading pages (1/6)
Counting pages (2/6)
Resolving links (4/6)
Loading headers and footers (5/6)
Printing pages (6/6)
Done
True
```

Sau đó ta có thể mở file report.pdf để xem kết quả convert:

![](https://images.viblo.asia/2b92c0da-126d-4727-b3ed-c7741ccbdbaf.png)



Lưu ý: để có thể convert đúng dữ liệu unicode thì là file .html phải có thẻ `<meta>` với nội dung như bên dưới đặt tại thẻ  `<head>`
```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

### Convert một đoạn text sang pdf


```python
>>> import pdfkit
>>>  pdfkit.from_string("convert dữ liệu string sang pdf", "string.pdf")
```
Chờ một chút để hệ thống xử lý và đưa ra thông báo.
```
Loading pages (1/6)
Counting pages (2/6)
Resolving links (4/6)
Loading headers and footers (5/6)
Printing pages (6/6)
Done
True
```

Sau đó ta có thể mở file string.pdf để xem kết quả convert --> Lỗi font chữ unicode 

![](https://images.viblo.asia/46a37909-8e29-4411-b643-49e6c5f3d177.png)



Để giải quyết việc này, pdfkit cho phép các bạn thực hiện khai báo thêm một số "cấu hình". 

```
options = {'encoding': "UTF-8"}
pdfkit.from_string("convert dữ liệu string sang pdf", 'string_unicode.pdf', options=options)
```

Kết quả thu được:

![](https://images.viblo.asia/b855b9c6-72f2-46b8-ab7f-c325321e66a5.png)


pdfkit cung cấp khá nhiều các tham số cấu hình khác dựa trên bộ tham số của wkhtmltopdf. Chúng ta sẽ làm quen với một số tham số ở phần tiếp theo.


## Thêm một chút nâng cao với pdfkit

### Thay đổi các cấu hình mặc định.

Pdfkit cung cấp việc thay đổi một số tham số cầu hình thường gặp giống như lúc chúng ta cấu hình in một văn bản ra máy in văn phòng: 

```python
options = {
        'page-size': 'A4',
        'orientation': 'Portrait',
        'quiet': '',
        'dpi': 96,
        'margin-top': '0.2in',
        'margin-bottom': '0.2in',
        'margin-right': '0.72in',
        'margin-left': '0.72in',
        'encoding': "UTF-8"
    }
```

`page-size`: Khổ giấy của file pdf sau khi convert. Mặc định là A4, có thể thay đổi thành cách giá trị Letter, A5,...

`orientation`: Mặc định là khổ giấy xoay dọc (Portrait), có thể thay đổi sang xoay ngang (Landscape)

`quiet`: Hiển thị log trong quá trình convert sang pdf. Giá trị ưng với các level đặt log (INFO, WARNING,...). Thường đặt '' trên production để tránh lỗi hiển thị terminal.

`dpi`: Dots Per Inch - Độ đậm nét của ký tự trên file pdf. Mặc định là 96. Tham số này không nên thay đổi. Với Windows, UNIX thì wkhtmltopdf sẽ reset về 96pdi, nếu chuyển qua convert trên máy OSX thì mới có thể tăng số lượng dpi lên được. 

`margin-`: Giãn cách từ vị trí các mép tương ứng đến phần dữ liệu đầu tiên của nội dung của file. Tùy theo nhu cầu mà chúng ta thay đổi hoặc giữ nguyên mặc định. 


Các tham số khác (enable/disable css, javascript, ...), các bạn có thể tham khảo thêm từ help của wkhtmltopdf
```
wkhtmltopdf -H
```

### Xử lý trường hợp không có quyền thiết lập $path
Đôi khi bạn không có quyền thực hiện set $PATH trên hệ thống mà vẫn muốn dùng luôn pdfkit, pdfkit sẽ cung cấp một tham số để bạn thực hiện trỏ đường dẫn đến vị trí cài đặt wkhtmltopdf.

Để xem đường dẫn của thư viện wkhtmltopdf, trên Unix, bạn gõ 
```
which wkhtmltopdf
```
>/usr/local/bin/wkhtmltopdf

Trên windows thì dùng tính năng search để tìm xem file wkhtmltopdf.exe ở đâu. Sao chép đường 

```python
wkhtmltopdf_path = "/usr/local/bin/wkhtmltopdf"
path_config = pdfkit.configuration(wkhtmltopdf=wkhtmltopdf_path)
pdfkit.from_file(html_file_path, pdf_file_path, options=options, configuration=config)
```

Việc trỏ config trực tiếp này sẽ giúp chúng ta ignore được các lỗi: 

>IOError: 'No wkhtmltopdf executable found'
>OSError: 'No wkhtmltopdf executable found'


### Convert nhiều nội dung và chung một file. 
Đây là một tính năng khá hay của pdfkit. Dưới đây là một ví dụ, thực hiện nối ghép các trang web vào một file cuối cùng. 

```python
import pdfkit
pdfkit.from_url(['google.com', 'viblo.asia', 'https://viblo.asia/newest'], 'concat_web.pdf')
```

![](https://images.viblo.asia/c09a886f-d34a-4d10-8ae0-4b6aac7bf120.png)

Các bạn có thể làm tương tự với các function `.from_string()`, `.from_file()`

----
Một bài viết ngắn giới thiệu một thư viện nho nhỏ. Cảm ơn các bạn đã đọc bài của tôi!