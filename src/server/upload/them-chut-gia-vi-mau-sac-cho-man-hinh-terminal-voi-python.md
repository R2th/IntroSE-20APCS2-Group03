> Là một lập trình viên, không thể tránh khỏi có những lúc tôi & các bạn thấy nhàm chán với công việc lặp đi lặp lại. Bản thân tôi cũng vậy, lâu lâu chán chán, tôi lại nghĩ ra những cách khác nhau để xả stress. Có một cách mà tôi đã áp dụng nhiều lần là “Thay đổi một chút những gì mình đang làm để tạo ra cảm hứng mới”. 

Một phần công việc mà tôi đang làm hàng ngày là viết ra những dòng code để đọc và phân tích các log-file được sinh ra từ các hệ thống khác nhau. Tìm những thông tin “hữu ích” để tạo thành các báo cáo theo yêu cầu của nghiệp vụ, sếp. 

Định kỳ, thực hiện gọi vào hệ thống bằng các file .py, các file này sẽ cắt các block trong log file và đưa ra màn hình các nội dung problem (song song với việc đẩy dữ liệu vào file báo cáo excel). Cuối cùng xử lý hết một file log thì có phần tổng hợp lại các block, các marjor, problem,… Hôm nào, “nhôm nhựa” thì tôi chỉ xem phần tổng hợp, hôm nào cẩn thận sẽ đọc lại toàn bộ màn hình đã output ra để có thể phát hiện và phân loại trước các problem, nếu có problem xuất hiện thì gửi ngay báo cáo cho bộ phận khác xử lý (nếu không có thì tập hợp báo cáo  gửi một lần để lưu trữ). 

Việc mỗi ngày nhìn mấy cái dòng text trắng trên nền đen khiến tôi cảm thấy khá nhàm chán. Thực ra cũng có thể chuyển các file .py chạy ngầm trong web viết bằng flask/django hoặc làm cho cái giao diện bằng tkiner nhưng … lười nên tôi không làm. Chính vì sự “lười” này nên tôi đã khám phá ra kha khá các thư viện thú vị liên quan đến cái màn hình terminal. 

# Hiển thị chữ có màu trên màn hình terminal
Bình thường màn hình tổng hợp cuối cùng các báo cáo sẽ ra như kiểu này.
![](https://images.viblo.asia/64fda197-20e9-47cc-903a-bc5b51fec6be.jpg)

Khá đơn điệu với màu chữ trắng trên nền đen. Thi thoảng tôi lại thử chuyển qua dùng màu nền, màu chữ khác (thay đổi trong properties) cho đỡ nhàm chán. Một ngày tôi chợt nghĩ, sao không thực hiện đổi màu các chữ trên màn hình đen để có thể focus đúng vào các vị trí cảnh báo marjor, critical, fatal ?

Search loanh quanh các package trên “kho” của python thì ra thư viện khá thú vị là Colorama. Việc install một thư viện với python cũng khá đơn giản (lưu ý là nên tạo một virtual enviroment cho đỡ rác nếu bạn chỉ muốn thử nghiệm).
```
pip install colorama
```

Theo như mô tả trong tài liệu (https://pypi.org/project/colorama/), tác giả hướng đến việc hiển thị màu trên terminal được chia ra làm 3 mục: 

**FOREGROUND**: Màu của chữ; 

**BACKGROUND**: Màu nền của termial.

Thư viện hỗ trợ các màu cơ bản: Black, red, green, yellow, blue, magenta, cyan, white.

**STYLE**: Định dạng chữ bright, dim, normal. Nếu để định dạng BRIGHT sẽ làm cho text hiển thị có vẻ như là… sáng hơn so với DIM, NORMAL (hơi khó để cảm nhận). 

Khi kết hợp 3 loại này trên cùng một dòng text, có khá nhiều thay đổi thú vị được hiển thị. Dưới đây là ảnh demo sự thay đổi của tác giả: 
![](https://images.viblo.asia/f20f41b3-65b3-47c9-a3e6-cad9e3627a1a.png)

Có một lưu ý là việc sử dụng thư viện colorama trên windows và linux sẽ khác nhau một chút do cơ chế hiển thị lên terminal của 2 hệ điều hành khác nhau. Trên Linux chỉ cần import thư viện vào là sử dụng được. Trên Windows sẽ phải đi lòng vòng. Tác giả cũng có đề cập đến vấn đề này trong tài liệu của mình. 

Ví dụ đoạn code hiển thị demo như sau: 

**Trên Linux**:

```Python
from colorama import Fore, Back, Style
print(Fore.RED + 'some red text')
print(Back.GREEN + 'and with a green background')
print(Style.RESET_ALL)
print('back to normal now')
```


![](https://images.viblo.asia/9fce6bd1-2f75-424b-baba-becdf5c96242.png)


**Trên Windows:**

```Python

import sys
from colorama import Fore, Back, Style
from colorama import init, AnsiToWin32
init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream
print(Fore.RED + 'some red text', file=stream)
print(Back.GREEN + 'and with a green background', file=stream)
print(Style.RESET_ALL, file=stream)
print('back to normal now', file=stream)
```


![](https://images.viblo.asia/577b7811-a98e-427d-87bd-fc4040a0deec.png)


Sau khi đọc xong các sample của tác giả, tôi áp dụng vào màn hình báo cáo của tôi và thu được kết quả: 
![](https://images.viblo.asia/df4867db-cc61-433e-91f1-15c2957f20b0.png)

Các bạn cũng có thể tham khảo đoạn code dưới đây của tôi viết trên windows (code chay hiển thị text đoạn text cuối cùng thôi nhé)

```python
import sys
from colorama import Fore, Back, Style
from colorama import init, AnsiToWin32
init(wrap=False)
stream = AnsiToWin32(sys.stderr).stream

colors = {
    'highlight_backgroud': Back.BLACK,
    'default_color': Fore.WHITE,
    'issue_color': Fore.WHITE,
    'warning_color': Fore.CYAN,
    'major_color': Fore.YELLOW,
    'cirtical_color': Fore.MAGENTA,
    'fatal_color': Fore.RED,
    'reset': Style.RESET_ALL,
    'highlight_number_backgroud': Back.GREEN
}


template = "{highlight_backgroud}{default_color}Market Info{reset}   # Total: {issue_color}{issue_count} issues{default_color}"\
            "=> {warning_color}{warning_count} warning; {major_color}{major_count} issue; {cirtical_color}{cirtical_count} issue; {fatal_color}{fatal_count} issue;"


maket_info_total = {
    'number': " ",
    'issue_count': 600,
    'warning_count': 70,
    'major_count': 7,
    'cirtical_count': 11,
    'fatal_count': 1     
}


maket_info_total.update(colors)
if maket_info_total.get('fatal_count', 0) == 0:
    maket_info_total['fatal_color'] = Fore.WHITE
maket_info_total['highlight_backgroud'] = Back.BLUE
maket_info_total['highlight_number_backgroud'] = Back.BLUE

print(template.format(**maket_info_total), file=stream);


```

Nếu các thấy thư viện này hay & hữu ích, hãy tặng cho tác giả 1 star trên github nhé https://github.com/tartley/colorama 

# Thêm vài cái icon cho vui nhộn 
Một lần, khi cài đặt redis, thấy có biểu tượng cốc bia  :beer: hiện lên trong quá trình màn hình đen đang chạy cài đặt. Một lần khác, khi đang thực hiện diagnostic lỗi phần cứng bằng một phần mềm chạy từ màn hình đen, tôi thấy có biểu tượng :thumbsup:   hiện ra khi kết quả diagnostic là phát hiện ra lỗi và đã tự khắc phục xong. 
Một ý tưởng đã nảy ra với tôi, “màn hình đen mà họ đưa được icon vào, thì mình cũng thử với script của mình xem sau” 

Ngó nghiêng trên các thư viện của Python trên pypi, có một thư viện mà tôi khá ưng là emoji (https://pypi.org/project/emoji/). 
Để sử dụng nó thì tạo virtual environment và install thư viện. 

```
pip install emoji  
```

Lúc đầu thử nghiệm trên jupyter notebook thì thấy khá ngon. 

![](https://images.viblo.asia/17aa47b8-13da-4468-9451-d03409cb9e49.png)

Đến lúc chuyển qua viết trên Windows thì không hiển thị được các icon trên màn hình cmd của Windows. Dù đã thử nhiều cách nhưng kết quả hiển thị ra đều là các ô vuông. 
![](https://images.viblo.asia/9494de14-57d1-4c00-9ba2-eb1f1e3f9023.png)

Chuyển qua viết trên và chạy trên Linux (ssh vào server) thì cũng ra hình thù icon nhưng … mất màu. Thôi thì méo mó, có hơn không vậy.
![](https://images.viblo.asia/194da66a-cca8-486e-89ef-56999b93ef25.png)

Đến một ngày vô tình biết đến “windows terminal preview” (https://www.microsoft.com/en-us/p/windows-terminal-preview/9n0dx20hk701).
Mọi thứ trở lên thú vị hơn. 
Mời các bạn đang phải dùng Windows để code Python một cốc beer nhé. 
![](https://images.viblo.asia/a3d7d302-1fff-4d2b-9627-41f5ed1ff151.png)

Thư viện này của tác giả có trên github tại địa chỉ https://github.com/carpedm20/emoji, hãy vote cho tác giả 1 star nếu bạn thấy hay nhé. 

Phần ký hiệu của các icon để dùng vào lệnh, các bạn có thể tra cứu tại: https://github.com/carpedm20/emoji/blob/master/emoji/unicode_codes.py


----
Ngoài 2 thư viện ở trên, tôi cũng có tìm hiểu thêm một số thư viện khá thú vị nữa & sẽ giới thiệu với các bạn vào các bài viết sau. 

Bài viết đầu tiên trên Viblo. Hy vọng đã chia sẻ được một chút niềm vui cho các bạn. Cảm ơn các bạn đã đọc bài viết của tôi!