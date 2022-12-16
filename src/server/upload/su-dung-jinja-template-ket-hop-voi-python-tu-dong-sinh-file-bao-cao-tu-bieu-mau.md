# Dẫn nhập
Cách đây khá lâu, team của tôi nhận được một yêu cầu xây dựng một hệ thống tự động sinh các file báo cáo (pdf) bằng cách điền dữ liệu input vào các vị trí được định sẵn trong các biểu mẫu (template) đã có sẵn. File báo cáo sau khi sinh ra, tự động đẩy vào server FTP đã định sẵn. 

*Ghi chú: Đây là những dữ liệu giả định và dựa trên một câu chuyện có thật.*

Các file báo cáo có định dạng kiểu như này:
![](https://images.viblo.asia/76be0365-0642-4df7-9629-05d41c7a68f2.jpg)

Dữ liệu đầu vào là dữ liệu json :

```Json
{
    "customerName": "Tiểu Bá Vương",
    "gender": "Nam",
    "paymentRequest": [
        {
            "serviceName": "Bữa ăn sáng/trưa/tối",
            "cash": 630000,
            "note": ""
        },
        {
            "serviceName": "Dịch vụ giặt/là quần áo",
            "cash": 250000,
            "note": "Thêm phí tẩy trắng quần áo"
        },
        {
            "serviceName": "Dịch vụ gọi xe riêng",
            "cash": 70000,
            "note": ""
        },
        {
            "serviceName": "Dịch vụ chăm sóc thú cưng",
            "cash": 480000,
            "note": ""
        }
    ],
    "cashRemain": 450000,
    "serviceRemain": 1
}
```
Với yêu cầu đầu vào và đầu ra như trên, team chúng tôi giải quyết khá nhanh bằng phương án đơn giản (làm nhanh còn lấy thành tích): 
- Làm một API đón dữ liệu đầu vào. Thực hiện kiểm tra các dữ liệu đưa vào, nếu có lỗi thì trả lại thông báo lỗi. 
- Phần sinh báo cáo thì làm theo cách “tay to”: Viết một phần template bằng HTML code, sau đó dùng chức năng format string của Python để đẩy dần dữ liệu vào file HTML.
- Convert file HTML thành PDF và đẩy sang server lưu trữ. 

Thời gian đầu, mọi việc có vẻ như suôn sẻ. Sau đó thì bên nghiệp vụ đưa thêm các yêu cầu:

**Về phần nội dung:**
-	Nếu giới tính là Nam, hiển thị là “Ông”, giới tính Nữ  hiển thị là “Bà”, không có dữ liệu giới tính thì bỏ trống.
- Nếu moneyRemain > 3 chỉ hiện ra thông báo: 
>   Dự kiến đủ để duy trì dịch vụ trong **y tuần** tiếp theo.
- Nếu 1 < moneyRemain <= 3 thì hiện ra thông báo: 
  
>   Dự kiến đủ để duy trì dịch vụ trong **y tuần** tiếp theo. <br/>Đề nghị quý khách nạp thêm tiền vào tài khoản lưu ký để các dịch vụ có thể cung cấp đúng theo yêu cầu. 
  
- Nếu moneyRemain = 1 và cashRemain < paymentTotal (tính bằng tổng số tiền phải trả trong tuần gần nhất) thì hiện ra thông báo: 
> Dự kiến **không** đủ để duy trì dịch vụ trong **1 tuần** tiếp theo. <br/>Đề nghị quý khách nạp thêm tiền vào tài khoản lưu ký để các dịch vụ có thể cung cấp đúng theo yêu cầu. 

**Về phần chức năng:**
- Nghiệp vụ muốn tự thay đổi các thành phần nhỏ trong báo cáo như: Font chữ, cỡ chữ, kiểu chữ, điều kiện phát sinh các thông báo (theo số lượng serviceRemain)  mà không cần thông qua đội dev hoặc đội dev làm mà không cần nâng cấp back-end .
- Sẽ phát sinh thêm nhiều loại biểu mẫu khác nhau và phía cung cấp input chỉ đồng ý đẩy thêm một trường dữ liệu reportType để chúng tôi phân loại.

Sau khi nhận được yêu cầu như trên, chúng tôi đã thảo luận với nhau khá lâu (thực ra là cãi nhau ỏm tỏi) để đưa ra các giải pháp xử lý phần sinh báo cáo từ template. 

Vì không thể liên tục nâng cấp back-end để chạy theo nghiệp vụ mãi được nên sẽ chọn giải pháp xử lý dữ liệu tại phần template. 

Sau khi cân nhắc nhiều phương án cuối cùng chúng tôi chọn Jinja2 template + Python. Lý do tại sao thì mời các bạn đọc tiếp phần bên dưới.

*Note: Trong phạm vi bài viết này, tôi sẽ giới thiệu với các bạn về Jinja2, phần html2pdf tôi sẽ giới thiệu trong bài viết khác.*
# Giới thiệu Jinja2 template
Jinja2 là một ngôn ngữ tạo template cung cấp cho các lập trình viên Python, được tạo ra dựa trên ý tưởng của Django template. 

Jinja2 được sử dụng để tạo HTML, XML hoặc các định dạng file khác dựa trên nguyên tắc kết hợp các dữ liệu vào các vị trí đã được đánh dấu trong văn bản.

Ví dụ: 

Có template:
```
Kính gửi ông/bà {{ customerName }}		Quốc tịch: Việt Nam
```
Khi truyền dữ liệu: 
```json
{
    "customerName": "Tiểu Bá Vương"
}
```
Thu được kết quả: 
```
Kính gửi ông/bà Tiểu Bá Vương		Quốc tịch: Việt Nam
```

Thông tin về Jinja2, các bạn có thể tham khảo tại https://jinja.palletsprojects.com/.

Một đặc điểm về các library hỗ trợ cho Python mà tôi khá thích đó là các thư viện đều được xây dựng rất “có tâm” với đầy đủ các tài liệu mô tả các function và cách sử dụng hiệu quả thư viện. Jinja2 không phải ngoại lệ, các bạn có thể tìm hiểu tất cả những gì về Jinja2 tại đường dẫn trên: Từ kiểu dữ liệu, xử lý vòng lặp, rẽ nhánh,… 

Các ưu điểm của Jinja2, các bạn có thể tìm hiểu đọc tại: 
https://palletsprojects.com/p/jinja/

# Áp dụng Jinja2 vào giải quyết bài toán sinh báo cáo tự động
Thay vì mô tả một số function của jinja2 bằng một vài sample như trên trang document của jinja2 thì tôi sẽ giới thiệu với các bạn bằng cách giải quyết bài toán ở trên bằng jinja2 step by step như cách tôi đã làm demo để thuyết phục các bạn trong cùng team. 

## Cài đặt Jinja2
Để bắt đầu sử dụng Jinja2, các bạn có thể cài đặt theo câu lệnh sau:
```
pip install jinja2
```

Bình thường mọi người thường sử dụng jinja2 trong flask để thực hiện server-side render ra dữ liệu html code trả về cho client. Trong bài viết này, tôi sẽ sử dụng một function khác của jinja2 để sinh ra file .html

 

## Khởi tạo project cho sample code

Đầu tiên, tôi sẽ tạo ra thư mục chứa mã nguồn, trong thư mục này đặt 3 file: 
- input.json: Chứa file dữ liệu json là đầu vào của report
- template.html: Chứa mã nguồn html là biểu mẫu để jinja2 đưa dữ liệu vào.
- jinja_render.py: Chứa code python thực hiện lấy dữ liệu từ input.jon và template.html để tạo thành file report.html.

Để khởi động, mở file template.html và nhập vào nội dung

```html
<html>
    <body>
        <h2>THÔNG BÁO DÀNH CHO KHÁCH HÀNG</h2> <br/>
        Kính gửi ông/bà {{ customerName }}      Quốc tịch: Việt Nam

    </body>
</html>

```

Mở file  jinja_render.py, nhập vào đoạn code:

```python
import json
from jinja2 import Template

def get_input_sample():
    with open("input.json", 'r', encoding='UTF-8') as file:
        return file.read()

def get_template_sample():
    with open("template.html", 'r', encoding='UTF-8') as file:
        return file.read()

def save_report(html_content):
    with open("report.html", 'w', encoding='UTF-8') as file:
        file.write(html_content)
    

def build_report():
    input_data = json.loads(get_input_sample())
    html_template = get_template_sample()
    jinja2_template = Template(html_template)
    html_content = jinja2_template.render(**input_data)
    save_report(html_content)
    print("create `report.html` success!")

if __name__ == "__main__":
    build_report();

```

Đứng từ environment có chứa jinja2, thực hiện chạy file jinja_render.py

` python jinja_render.py`
> create `report.html` success!

Mở thư mục chứa code, có file report.html, mở file ra xem nội dung

```html
<html>
    <body>
        <h2>THÔNG BÁO DÀNH CHO KHÁCH HÀNG</h2> <br/>
        Kính gửi ông/bà Tiểu Bá Vương       Quốc tịch: Việt Nam

    </body>
</html>

```

Chúng ta đã sử dụng các thành phần sau của jinja2 trong python:
-	Class Template
-	Function render
Nhiệm vụ của file `jinja_render.py` đã hoàn thành.  Kể từ đây, phần xử lý tiếp bài toán sẽ là tập trung vào sử dụng jinja language trên file template.html

# Làm quen với ngôn ngữ lập trình Jinja2 

Jinja2 cung cấp 2 syntax để đánh dấu việc bắt đầu sử dụng enginee trong việc xử lý là: 

{{        }}: Hiển thị dữ liệu của các biến. 

{% keyword    %}: Bắt đầu một block xử lý. Với các keyword thường gặp: if/else/elif/endif, for/endfor, set, ….  

{# commnet #} Đại diện cho phần bắt đầu và kết thúc của comment. 

Để làm quen với cách thức sử dụng, mời các bạn sẽ lần lượt đi vào các phần nhỏ dưới đây.

## Đưa dữ liệu vào template
Syntax của jinja template để thực hiện đặt dữ liệu vào vị trí nào đó trong template là `{{ variable_name }}`

Với variable_name là dữ liệu tên biến dữ liệu được truyền vào từ input.

Quay lại sample phía trên, code Python sample của chúng ta sẽ thực hiện đưa dữ liệu customerName lấy từ file json vào vị trí {{ customerName }} trên template.html

![](https://images.viblo.asia/aa9ee096-2a6b-44ba-b1bd-95084119b689.png)

## Các loại cấu trúc điều khiển (List of Control Structures)
Cấu trúc điều khiển là phần định hướng luồng hoạt động của một chương trình, trong Jinja2 cung cấp các cấu trúc điều khiển (Control Structures) như sau: if/elif/else, for-loop, marco,… Sử dụng syntax mặc định các lệnh điều khiển sẽ nằm trong cặp {%        %} và được chia thành các block dựa trên câu lệnh báo hiệu kết thúc endif, endfor,….
Syntax và các từ khóa của Jinja2 tương đối giống với ngôn ngữ lập trình Python (như kiểu sinh ra là để dành cho nhau).

### Điều khiển rẽ nhánh trong Jinja2

Trong phần này, sample của chúng ta sẽ giải quyết một yêu cầu: 

![](https://images.viblo.asia/746b0ab7-4027-4381-8c60-c58819ccefa5.png)

Syntax của câu lệnh rẽ nhánh được sử dụng như sau: 

```jinja
    {% if gender == "Nam" %}
            ông
        {% elif gender == "Nữ" %}
            bà
        {% else %}
            ông/bà
        {% endif %}
```

Dấu hiệu `{%        %}` đại diện cho việc bắt đầu một đoạn lệnh của jinja2, thoát ra ngoài ngoặc nhọn là lại đến phần dữ liệu của HTML/content của file tương ứng. 

Như ví dụ trên, ta có thể thấy syntax phần rẽ nhánh của jinja2 giống như của Python. 

Quay lại ví dụ trên, ta có thể hiểu là nếu điều kiện nào thỏa mãn thì sẽ hiện thị tương ứng dữ liệu text ở bên dưới. 


```html
<html>
    <body>
        <h2>THÔNG BÁO DÀNH CHO KHÁCH HÀNG</h2> <br/>
        Kính gửi 
        {% if gender == "Nam" %}
            ông
        {% elif gender == "Nữ" %}
            bà
        {% else %}
            ông/bà
        {% endif %} {{ customerName }}      Quốc tịch: Việt Nam <br/>
        
    </body>
</html>

```

Khi truyền vào gender == Nam (như trong file json) thì dữ liệu tương ứng được sinh ra trong file report.html 

![](https://images.viblo.asia/b62f54d9-3f9c-4517-896b-dbd761e4ec21.jpg)

### Cấu trúc for-loop
Trong phần này, sample của chúng ta sẽ giải quyết một yêu cầu: 
![](https://images.viblo.asia/57c4c8c7-1ec9-4d47-901d-7536a6593abe.png)


Với đề bài trên, chúng ta có paymentRequest là một list (array) với mỗi item con là một dictionary. Cấu trúc for-loop của jinja2 sẽ thực hiện lấy ra từng item bên trong paymentRequest và truy xuất tiếp vào các trường dữ liệu của từng item.

Chúng ta sẽ đặt một đoạn lệnh có dùng for-loop vào file template và chạy file 

```jinja
{% for item in paymentRequest %}
           {{ item.serviceName }}, {{ item.cash }}, {{ item['note'] }} <br/>
 {% endfor %}

```
Kết quả thu được
![](https://images.viblo.asia/2ed2f359-7acd-4f95-8211-25ccf65313f7.jpg)

Như ví dụ ở trên, một tiểu mục `item` là một dictinoray, chúng ta có thể truy xuất vào từng giá trị bằng syntax: 

`item.cash`  hoặc `item['note']`

Vậy là chúng ta đã lấy được ra dữ liệu các tiểu mục, giờ còn một thứ là cột STT. 

Jinja2 cung cấp một loại cách truy cập vào index của một danh sách (thực sự là còn tiện hơn cả Python).

![](https://images.viblo.asia/f5ebb2d3-0c43-4b15-a6cc-a51f8be5935b.jpg)

Nhìn vào bảng trên, ta thấy chúng ta có thể sử dụng loop.index để đánh STT cho từng dòng dữ liệu.

```jinja
        {% for item in paymentRequest %}
           {{ loop.index }} {{ item.serviceName }}, {{ item.cash }}, {{ item['note'] }} <br/>
        {% endfor %}

```

Trong block code for-loop thì `loop.index`, `loop.index0`,… được gọi là **special variables**.

Áp dụng tiếp vào bài toán trên, ta thực hiện thay đổi template.html bằng cách thêm vào body đoạn code: 

```jinja
        <table class="table-without-space">
            <tr>
                <td class="td-boder">STT</td>
                <td class="td-boder">Tên hạng mục</td>
                <td class="td-boder">Số tiền</td>
                <td class="td-boder">Ghi chú</td>
            </tr>
            
            {% for item in paymentRequest %}
            <tr>
                <td class="td-boder"> {{ loop.index }} </td>
                <td class="td-boder"> {{ item.serviceName }} </td>
                <td class="td-boder">{{ item.cash }}</td>
                <td class="td-boder">{{ item['note'] }}</td>
            </tr>
            {% endfor %}
        </table> <br/>

```

Kết quả thu được

![](https://images.viblo.asia/74578ff6-9645-4279-b07e-83eb8065bc79.png)

Trong phần hiển thị này còn 2 vấn đề cần giải quyết: 
- Định dạng số tiền thiếu dấu . phân cách giữa các cụm 3 số (nghìn, triệu)
- Dòng cuối cùng của bảng chứa tổng số tiền.

Chúng ta sẽ tiếp tục xử lý ở bên dưới nhé.

### Sử dụng các hàm dựng sẵn (build-in function) 

Để tính tổng số tiền, theo lý thuyết thì chúng ta sẽ cộng dần số tiền của từng tiểu mục vào và điền vào dòng cuối. 

Jinja2 cung cấp function để thực hiện việc tính tổng các giá trị trong một list hoặc  theo từng thuộc tính của các phần tử trong list.

Chúng ta có thể tham khảo các function này tại đường dẫn sau: https://jinja.palletsprojects.com/en/2.11.x/templates/#list-of-builtin-filters

Quay lại bài toán này của chúng ta, việc tính toán tổng số tiền lại vô cùng đơn giản dựa vào function: sum

```jinja
            <tr>
                <td class="td-boder"></td>
                <td class="td-boder">Tổng cộng</td>
                <td class="td-boder">
                    {{ paymentRequest|sum(attribute='cash') }}
                </td>
                <td class="td-boder"></td>
            </tr>
```

![](https://images.viblo.asia/d9e30340-98d9-4e0b-93b8-67cc0f98db08.png)

Syntax thực hiện format các số, chuỗi trong jinja2 cũng giống như python. 

Ví dụ để thực hiện hiển thị một số với dấu `.` là phân cách hàng nghìn, dấu `,` là phân cách hàng thập phân, hiển thị 2 số sau dấu thập phân: 

```jinja

 {{ "{0:.,0f}".format(my_num) }}

```
Thu được kết quả: 
```
1,234.56 
```

Số tiền ở Việt Nam sử dụng dấu `.` Làm giá trị phân cách nên chúng ta sẽ thực hiện thêm một số lượt replace “vòng tròn” …. Thực hiện replace dấu `.` thành `#`, `,` thành `.`, dấu `#` thành `,`.

```jinja
{{ "{0:,.2f}".format(my_num)|replace(".", "#")|replace(",", ".")|replace("#", ",") }}
```

Việc đưa một đoạn dài như trên vào template có vẻ như hơi… xấu nên jinja2 sẽ hỗ trợ chúng ta một loại block là Marco

### Tự định nghĩa các function bằng marco

Trong phần này, chúng ta sẽ cùng nhau tạo ra một marco thực hiện thêm phân cách hàng nghìn cho số tiền. 

Việc định nghĩa marco được sử dụng theo syntax

```jinja
{% macro marco_name(varargs, kwargs) -%}
    Action do
{%- endmacro %}
```

Varargs, kwargs được sử dụng như định nghĩa function của python 😊 

Cùng xem ví dụ dưới đây nhé: 

```jinja
{% macro format_number(my_num) -%}
    {{ "{0:,.2f}".format(my_num)|replace(".", "#")|replace(",", ".")|replace("#", ",") }}
{%- endmacro %}
```


```html
Number: 1234.56 <br/>
Kết quả format_number: {{ format_number(1234.56) }} <br/>
```


```
Number: 1234.56 
Kết quả format_number: 1.234,56 
```

Áp dụng vào bài toán của chúng ta, chúng ta bổ sung marco phía trên vào code và thực hiện thay đổi nội dung của table

```html
{% macro format_number(my_num) -%}
    {{ "{0:,.2f}".format(my_num)|replace(".", "#")|replace(",", ".")|replace("#", ",") }}
{%- endmacro %}

        <table class="table-without-space">
            <tr>
                <td class="td-boder">STT</td>
                <td class="td-boder">Tên hạng mục</td>
                <td class="td-boder">Số tiền</td>
                <td class="td-boder">Ghi chú</td>
            </tr>
            {% for item in paymentRequest %}
            <tr>
                <td class="td-boder"> {{ loop.index }} </td>
                <td class="td-boder"> {{ item.serviceName }} </td>
                <td class="td-boder">{{ format_number(item.cash) }}</td>
                <td class="td-boder">{{ item['note'] }}</td>
            </tr>
            {% endfor %}
            <tr>
                <td class="td-boder"></td>
                <td class="td-boder">Tổng cộng</td>
                <td class="td-boder">{{ format_number(paymentRequest|sum(attribute='cash')) }}</td>
                <td class="td-boder"></td>
            </tr>
        </table> <br/>

```

Kết quả thu được:

![](https://images.viblo.asia/5ff6311b-55a2-458e-a41a-6f45c875ae92.png)

### Đưa dữ liệu vào biến tạm 

Ở ví dụ trên, ta thấy tổng số tiền chi trả sẽ dùng vào yêu cầu phía dưới. Để không phải gọi nhiều lần vào function sum(), ta sẽ thực hiện gán tổng số tiền vào một biến có tên `total` như đoạn code bên dưới.


```jinja
            {% set total = paymentRequest|sum(attribute='cash') %}
            <tr>
                <td class="td-boder"></td>
                <td class="td-boder">Tổng cộng</td>
                <td class="td-boder">{{ format_number(total) }}</td>
                <td class="td-boder"></td>
            </tr>

```
Tất nhiên là kết quả không thay đổi. 

## Hoàn thiện giải quyết bài toán

Bài viết của tôi cũng đã khá dài và phần lớn các syntax thường dùng của Jinja2 đã được đưa ra ở phía trên nên đoạn code dưới đây sẽ hoàn thiện nốt bài toán. Cảm ơn các bạn đã kiên trì đọc đến đây.

```jinja
        Sau khi trừ số tiền trên, trong tài khoản lưu ký của quý khách còn lại {{ format_number(cashRemain) }} VND. <br/>
        
        
        
        {% macro display_not_enough(remain_cash, service_remain) -%}
            {% set not_enough_week = 1 %}
            {% if (service_remain <= not_enough_week) and (remain_cash < total) %}
                    <b>không</b>
            {% endif %}
        {%- endmacro %}
        
        Dự kiến {{ display_not_enough(cashRemain, serviceRemain)}} đủ để duy trì dịch vụ trong <b> {{ serviceRemain }} tuần</b> tiếp theo. <br/>

        {# Định nghĩa biến dữ liệu noti_remain_week đại diện cho số tuần tương ứng sẽ hiển thị thông báo #}
        {% set noti_remain_week = 3 %}
        {% if (serviceRemain <= noti_remain_week)   %}
        Đề nghị quý khách nạp thêm tiền vào tài khoản lưu ký để các dịch vụ có thể cung cấp đúng theo yêu cầu. <br/>
        {% endif %}

        Cảm ơn quý khách đã sử dụng dịch vụ của chúng tôi. <br/>
```


Kết quả cuối cùng hiển thị: 
![](https://images.viblo.asia/005e8000-0a35-4431-809d-32aac5b9a430.png)

# Lời kết
Ngoài việc xử lý biểu mẫu báo cáo như ở trên, Jinja2 còn ứng dụng theo nhiều cách khác nhau.

Ví dụ như bạn có một database, mỗi bảng dữ liệu bạn sẽ phải viết đi viết lại các function phục vụ CRUD, update database, giao diện cơ bản, .... Hãy bỏ ra  một khoảng thời gian, viết một cái template, sau đó chỉ cần truyền vào một cấu trúc bảng dữ liệu hoặc viết hẳn thành ứng dụng hoàn chỉnh kết nối vào database, đọc ra các schema sau đó tự sinh ra các file cần thiết. 

Cảm ơn các bạn đã đọc bài viết của tôi. Hẹn gặp lại các bạn vào bài viết tiếp theo.