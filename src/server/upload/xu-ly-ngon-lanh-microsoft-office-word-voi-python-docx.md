**Microsoft Word** (MS)- một trong các tiện ích từ bộ Microsoft Office là một trong những phần mềm phổ biến trong việc tạo ra file document, hỗ trợ đọc và ghi nội dung từ đơn giản đến phức tạp. Mặc dù con người có thể trực tiếp tạo và viết nội dung lên file MS, tuy nhiên trong rất nhiều tác vụ cần máy tính xử lý và tự động tạo nội dung trên các file MS. Ví dụ bạn đọc nội dung từ file pdf và muốn chuyển nội dung sang file docx  hoặc bạn đang phát triển một mô hình xử lý ngôn ngữ tự nhiên và cần đọc dữ liệu đầu vào là các file MS thì  [Python-Docx](https://python-docx.readthedocs.io/en/latest/user/documents.html) là một trong những thư viện rất đáng để bạn lựa chọn.

Hôm nay mình xin giới thiệu các bạn cách tạo ra tự động file MS cũng như các tính năng thêm, sửa, xóa các nội dung dưới sự hỗ trợ của thư viện **Python Docx**.

## 1. Cài đặt thư viện
Nếu các bạn đang sử dụng anaconda, các bạn có thể dễ dàng cài đặt bằng cách sau đây:
```
pip install python-docx
```
## 2. Khởi tạo file
Để mở một file đã tồn tại trước đó, bạn sử dụng câu lệnh sau
```python
from docx import Document

document = Document('existing-document-file.docx')
```
Nếu file này chưa tồn tại, bạn sử dụng câu lệnh sau:
```python
document = Document()
```
Sau khi bạn khởi tạo file, bạn có thể chỉnh sửa nội dung của file MS như thêm đoạn văn, thêm bảng, ...  thông qua biến *document* như ví dụ bên trên. Sau khi hoàn thiện bạn có lưu lại những thay đổi bằng câu lệnh sau :
```
document.save(filename)
```
Ở đây, filename là tên file mà bạn muốn lưu. Tất nhiên đuôi là **.docx** nhé. :smiley:
## 3. Heading, title
Thư viện python-docx hỗ trợ ghi phần **title** hoặc heading của văn bản theo nhiều level mà người dùng chỉ định. 

- *Content*: nội dung title hoặc heading
- *Level*: bậc của heading (0, 1, 2, ...). Số càng nhỏ font chữ càng lớn. 

```python
document.add_heading(content, level)
```

### 3.1. Title
Theo mặc định của python-docx, title có level là 0
```python
document.add_heading("This is a title part, level=0)
```
Ta có kết quả tương ứng sẽ là :
![](https://images.viblo.asia/12fcc7e8-5850-4516-ae00-13969d6afc3d.png)
### 3.2. Heading 
Đối với các phần heaing, ta có các level 1, 2, 3....
 - **Level 1**
 ```python
 document.add_heading("This is a heading 1", level=1)
 ```
 Kết quả tương ứng :

 ![](https://images.viblo.asia/10d6d80b-21d8-40a5-bdf5-7a3837042be0.png)
  - **Level 2**
 ```python
 document.add_heading("This is a heading 2", level=2)
 ```
 Kết quả tương ứng :
![](https://images.viblo.asia/84a28960-4ed1-4771-a6dc-b24989f5e873.png)

## 4. Đoạn văn (paragraph)
 Trong các loại văn bản thông thường, chúng ta có hai cách biểu diễn nội dung của một trang đó là: 
 
 - **Layout truyền thống**: nội dung được biển diễn từ trên xuống dưới, từ trái sang phải
 ![](https://news.meeycdn.com/uploads/2020/07/Hop-dong-thue-nha-gom-nhieu-noi-dung-khac-nhau.jpg)
 - **Layout dạng cột** : Nội dung được tổ chức thành từng cột riêng rẽ với nhau
 ![](https://appdata.chatwork.com/uploadfile/216976/216976993/125fdc6ffe9e80e5a2ffe61cba33d21b.dat?response-content-type=image%2Fpng&response-content-disposition=inline&Expires=1615738070&Signature=P1M4859j7KMk9rP8IUzMk-HMoRRkuUWfRzcDdO~IDBhNeftdjtPK8h1bkCwZg-Sn2eXUC4BsdayvdllcPatlQescj9lCru5qLC24exhRcQYUaww~UzdmDuQnCYRQ2WfL5EYoreMkHCEVJVpRzsmj0Gk-zV37u8JOutQeOgIyyJWW1cwfA7eVbxoQvm2wsb1~yaC0ggi3UZYkr~anmepukLSTHSbKi3hAX6nvPDMimTHv74Kc7zfAXg39XcbRdLJfs9fo-3L4SAYFdZHFuqWTZv4SEshAM2yFalsKmp3FVAzOHMpfQRP1RoDT6pbDkeA3fzSBBvrcOCVFpwpNMV7DpQ__&Key-Pair-Id=APKAIZEFQUITKUSISS7A)
 
 ### 4.1. Layout truyền thống
 Với layout kiểu truyền thống, chúng ta ghi nội dung vào file MS như sau:
 ```
 document.add_paragraph(content)
 ```
 Kết quả tương ứng: 
 ![](https://images.viblo.asia/573b8912-241a-463b-975f-964d7262700e.png)
### 4.2. Layout dạng cột
Để tạo ra được các văn bản dạng cột. Chúng ta cần dùng đến khái niệm **Section**. Mỗi section có thể chứa nhiều các đoạn văn. Mỗi section sẽ tương đương với một page và chúng ta thông qua section để biểu diễn nội dung cho một page.

Tạo layout cột cho section :
```python 
from docx.enum.section import WD_SECTION_START

def set_number_of_columns(section, cols):
    """ sets number of columns through xpath. """
    WNS_COLS_NUM = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}num"
    section._sectPr.xpath("./w:cols")[0].set(WNS_COLS_NUM, str(cols))
    
section = document.add_section(WD_SECTION_START.NEW_PAGE)
# col_nb is number of column layout
set_number_of_columns(section, col_nb)
 ```
 
 Sau đó chúng ta thực hiện thêm đoạn văn giống như kiểu layout truyền thống. Đoạn văn sẽ được thêm theo thứ tự các cột, từ trái sang phải.
 ```python
p = document.add_paragraph(content)
```
 
 Ngoài ra, chúng ta cũng có thể thêm phần căn lề (trái, phải, giữa ) cho đoạn văn như sau:
 ```python
 from docx.enum.text import WD_PARAGRAPH_ALIGNMENT
```
 - Căn lề trái
 ```python
  p.alignment = WD_PARAGRAPH_ALIGNMENT.LEFT
  ```
  - Căn lề phải
  ```python
  p.alignment = WD_PARAGRAPH_ALIGNMENT.RIGHT
  ```
  - Căn lề giữa
  ```
  p.alignment = WD_PARAGRAPH_ALIGNMENT.CENTER
  ```
  - Căn lề hai bên
  ```
  p.alignment = WD_PARAGRAPH_ALIGNMENT.JUSTIFY
  ```
  ### 4.3. Thêm câu cho đoạn văn
  Thư viện python-docx hỗ trợ chèn thêm câu riêng lẻ vào trong đoạn văn đã được khởi tạo:
  
  ```python
  # initialize new paragraph
  p = document.add_paragraph(content)
  
  # add sentence to initialized paragraph
  sentence_element = p.add_run(str(content))
  ```
  
  ### 4.3.1. Highlight background
  Bạn cũng có thể highlight background cho từng câu bằng các màu yêu thích như sau:(highlight là tên màu )
  ```python
  from docx.enum.text import WD_COLOR_INDEX

if highlight == 'black':
    color_element = WD_COLOR_INDEX.BLACK
elif highlight == 'blue':
    color_element = WD_COLOR_INDEX.BLUE
elif highlight == 'green':
    color_element = WD_COLOR_INDEX.BRIGHT_GREEN
elif highlight == 'dark blue':
     color_element = WD_COLOR_INDEX.DARK_BLUE
elif highlight == 'dark red':
    color_element = WD_COLOR_INDEX.DARK_RED
elif highlight == 'dark yellow':
    color_element = WD_COLOR_INDEX.DARK_YELLOW
elif highlight == 'dark green':
     color_element = WD_COLOR_INDEX.GREEN
elif highlight == 'pink':
    color_element = WD_COLOR_INDEX.PINK
elif highlight == 'red':
    color_element = WD_COLOR_INDEX.PINK
elif highlight == 'white':
    color_element = WD_COLOR_INDEX.WHITE
elif highlight == 'teal':
    color_element = WD_COLOR_INDEX.TEAL
elif highlight == 'yellow':
    color_element = WD_COLOR_INDEX.YELLOW
 elif highlight == 'violet':
    color_element = WD_COLOR_INDEX.VIOLET
 elif highlight == 'gray25':
    color_element = WD_COLOR_INDEX.GRAY_25
 elif highlight == 'gray50':
    color_element = WD_COLOR_INDEX.GRAY_50
    
 style = document.styles.add_style("document style", WD_STYLE_TYPE.CHARACTER)
style.font.highlight_color = color_element
 sentence_element = p.add_run(str(c), style=self.style)
```

#### 4.3.2. In đậm, nghiêng, gạch chân
Bạn cũng có thể thêm highlight cho bằng thêm in đậm, in nghiêng hay gạch chân như khi người sử dụng trực tiếp trên file MS.

```
 # set bold, italic, underline value which is boolean value True or False
sentence_element = p.add_run(str(content)
sentence_element.bold = bold
sentence_element.italic = italic
entence_element.underline = underline
```

## 5. Picture
Bạn cũng có thể chèn ảnh trưc tiếp vào python-docx bằng đường dẫn tới file ảnh cần chèn hoặc ảnh đã được biểu diễn dạng ma trận. Bạn cũng có thể điều chỉnh kích thước ảnh phù hợp với văn bản của mình.
```python
import cv2
from docx.shared import Inches
from io import BytesIO
import numpy as np


def add_picture(document, image_path_or_stream, width):
     """Add picture to image"""
     if isinstance(image_path_or_stream, str):
         img = cv2.imread(image_path_or_stream)
     else:
         img = np.array(image_path_or_stream)

     is_success, im_buf_arr = cv2.imencode(".jpg", img)
     byte_im = im_buf_arr.tobytes()
     stream = BytesIO(byte_im)
     document.add_picture(stream, width=Inches(width))
     
add_picture(document, 'example.jpg', 5.0)
```

## Lời kết 
**Python-docx** là một thư viện hỗ trợ mạnh mẽ về cách tạo lập hay sửa đổi văn bản docx. Tuy nhiên để có thể tận dụng hết các tính năng của Microsoft Word thì các bạn cần tìm hiểu sâu thêm các api của Mircosoft Word. Còn nếu bạn chỉ muốn sử dụng tính năng đơn giản thì python-docx vẫn là sự lựa chọn hết sức tuyệt vời. Cảm ơn các bạn đã theo dõi bài đọc của mình :grinning: