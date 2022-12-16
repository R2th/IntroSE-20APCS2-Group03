# Giới thiệu:
Hôm nay, mình đang gặp vấn đề muốn lấy dữ liệucủa 1 số loại máy tính bảng đang có trên thị trường để viết mock api (mình dev frontend nên dùng `json-server` để giả lập thui nhưng đang cần dữ liệu thực). Nên mình muốn tìm 1 thư viện nào có thể cào dữ liệu và export ra dưới dạng json.
Sau 1 hồi tìm kiếm mình đã tìm ra `https://scrapy.org/` được nhiều người xài, :joy: thử viết thử có được không ai ngờ viết vài dòng là lấy được liền.... Cùng mình tìm hiểu thử nó tiện lợi và viết dễ dàng như thế nào nhé.


# Cài đặt:
Chỉ 1 câu lệnh đơn giản thui:
```cmd
pip install Scapy
```

Khởi tạo ứng dụng nào:
```
scrapy startproject tutorial
```

Thế là ta đã có 1 project:
```
tutorial/
    scrapy.cfg            # deploy configuration file

    tutorial/             # project's Python module, you'll import your code from here
        __init__.py

        items.py          # project items definition file

        middlewares.py    # project middlewares file

        pipelines.py      # project pipelines file

        settings.py       # project settings file

        spiders/          # a directory where you'll later put your spiders
            __init__.py
```

# Bắt đầu tìm hiểu nào:
### 1. Tạo 1 spider:
Theo như giới thiệu nó là 1 lớp thu thập dữ liệu từ 1/n website(nhiều website thì đưa vào schedule), bóc tách dữ liệu từ website được chỉ định. 
Đầu tiên ta tạo 1 file `tgdd.py` trong thư mục `scriders/`. Nội dung của file:
```python
# -*- coding: utf-8 -*-
import scrapy

class TggSpider(scrapy.Spider):
    name = "tgdd" # tên của spider
    allowed_domains = ["thegioididong.com"] # dont't config https://www...
    # ta điền link cần cào
    start_urls = [
        'https://www.thegioididong.com/may-tinh-bang',
    ]

 # lớp để bóc tách dữ liệu
    def parse(self, response):
        # Tìm tất cả các item dựa vào selector
        for item_url in response.css("li.item > a ::attr(href)").extract():
            yield scrapy.Request(response.urljoin(item_url), callback=self.parse_tablet) # if have product, call function parse_book_page
        
       # nếu có trang kế thì bóc tiếp
        next_page = response.css("li.next > a ::attr(href)").extract_first()
        if next_page:
            yield scrapy.Request(response.urljoin(next_page), callback=self.parse)

// lớp để xử lý 
    def parse_tablet(self, response):
        item = {}
        # find info of product
        product = response.css(".type0")
        item["title"] = product.css(".rowtop > h1 ::text").extract_first()
        item['price'] = response.css('.area_price strong ::text').extract_first()
       
        yield item
```

Trong ví dụ trên ta sẽ thấy có 1 số config:
- name: tên spider, cần thiết để sử dụng các lệnh cmd,...
-  start_urls: link ta cần cào (tương ứng với allow domain)
-  parse : 1 method quan trong để bóc tách dữ liệu
Trong method này ta sử dụng các selector(tìm hiểu thêm tại đây: https://docs.scrapy.org/en/latest/topics/selectors.html). ta thường sử dụng xpath hoặc class/id để tìm kiếm đối tượng cần lấy trên DOM.

### 2. Bắt đầu cào:
Mục đích chỉ cần lấy file dữ liệu và lưu dưới dạng json. Nên theo hướng dẫn ta có thể dùng lệnh: 
```cmd
scrapy crawl tgdd -o tgdd.json
````
==> kết quả: bị lỗi 403 
Lý do bị lỗi này: do các website thường chặn các con bot cào dữ liệu của họ. Với trang thế giới di động mình chỉ cần thêm 1 trick nhỏ thui .

Vào file ` settings.py` mình cấu hình thêm user-agent như thế này:
```
DEFAULT_REQUEST_HEADERS = {
# Các khai báo command này chưa cần thiết để khai báo
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
#   'Referer': 'https://www.google.com',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:48.0) Gecko/20100101 Firefox/48.0',
}

# support utf-8: scrapy crawl tgdd -o tgdd.json
FEED_EXPORT_ENCODING = 'utf-8'
```
ĐỒng thời ta cấu hình thêm utf-8 để tránh lỗi font nhé. Ta chạy lại lệnh crawl được kết quả như sau:
```
[
{"title": "Máy tính bảng Lenovo Tab E10 TB-X104L Đen", "price": "3.190.000₫"},
{"title": "Máy tính bảng Samsung Galaxy Tab S6 Lite", "price": "9.990.000₫"},
{"title": "Máy tính bảng Masstel Tab 10 Pro", "price": "2.590.000₫"},
{"title": "Máy tính bảng iPad 10.2 inch Wifi Cellular 32GB (2019)", "price": "13.490.000₫"},
....
]
```

### 3> Download file hoặc hình ảnh:
Việc lấy file json đã kết thúc rồi, nhưng phần giới thiệu có thêm mục download file, thấy họ giới thiệu cũng nhanh chóng. Nên triển luôn thử download vài hình ảnh của máy tính bảng. 

Đầu tiên vào mục Items.py thêm 2 khai báo field này:
```python
import scrapy

class TutorialItem(scrapy.Item):
    file_urls = scrapy.Field()
    files = scrapy.Field
    pass
```

Vào file Settings.py:
```python
# dowload file
ITEM_PIPELINES = {'scrapy.pipelines.files.FilesPipeline': 1}
FILES_STORE = 'download-files'
```

Vào lại file spiders tgdd.py thêm vào tương ứng:
```python
def parse_book_page(self, response):
    .....
    file_url = response.css('#normalproduct img::attr(src)').get()
    file_url = response.urljoin(file_url)
   item['file_urls'] = [file_url]
    yield item
```

==> chạy lại lệnh crawl
```cmd
scrapy crawl tgdd
```
Thế là ta có full hình máy tính bảng rồi đấy.

# Kết luận:
`scrapy` là 1 công cụ rất đơn giản dễ dùng và hiệu quả trong việc lấy dữ liệu khi cần thiết.
Cảm ơn các bạn đã đọc bài viết của mình.

Nguồn tham khảo:
https://docs.scrapy.org/en/latest/intro/tutorial.html