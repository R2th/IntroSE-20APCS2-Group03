![](https://images.viblo.asia/24ca4024-4005-4770-9413-81bca9edd194.jpg)

Trong bài [Cách tìm kiếm với Google](https://viblo.asia/p/cach-tim-kiem-voi-google-Ljy5VzpG5ra), tôi có giới thiệu một vài hướng tìm kiếm nâng cao với Google. Kỹ thuật tìm kiếm đó được gọi là [Google Dork hay Google hacking](https://en.wikipedia.org/wiki/Google_hacking).

![](https://images.viblo.asia/4e715d99-3255-4524-8ae3-376e14fe1c29.png)

Cách tìm kiếm này rất hiệu quả trong việc tìm kiếm thông tin mà ta cần. Nó tăng độ chính xác cho từ khóa tìm kiếm, giảm thời gian tìm kiếm, vân vân và mây mây.

Nhưng có một vấn đề đặt ra nếu kết quả có nhiều việc thủ công xem xét từng trang một là không hiệu quả. Nếu có một cách nào đó tự động lấy được tất cả các link trên sẽ giảm thời gian của ta đi rất nhiều.

Vì vậy, tôi đã tìm trên Google cách để giải quyết vấn đề đang gặp phải. Và phát hiện ra một bài hướng dẫn [How To Scrape Google With Python](https://hackernoon.com/how-to-scrape-google-with-python-bo7d2tal). Bài hướng dẫn này rất cơ bản và dễ hiểu cho người mới.

Hãy bắt đầu code nào!!!
# 1. Chuẩn bị môi trường
1. Hệ điều hành: Chọn hệ điều hành nào tùy thích, tôi dùng [subsystem Ubuntu 18.04](https://linuxconfig.org/how-to-install-ubuntu-18-04-on-windows-10)
2. Python: Cài đặt python2 hoặc python3, tôi dùng [python3](https://www.python.org/downloads/)
3. Cài đặt pip: [Windows](https://www.liquidweb.com/kb/install-pip-windows/), Ubuntu `sudo apt install python3-pip -y`. Nếu sử dụng Python2 `sudo apt install python-pip -y`
4. IDE: Chọn IDE hoặc trình soạn thảo ưa thích, tôi dùng [vim](https://www.maketecheasier.com/vim-keyboard-shortcuts-cheatsheet/)

> Note: python2 đã không còn được hỗ trợ sửa lỗi từ nhà phát triển nữa.
> 
# 2. Bắt đầu code
## Cài đặt thư viện cần thiết
Đầu tiên cần cài đặt các thư viện cần thiết cho chương trình. Tạo một file *requirements.txt* và chèn vào nội dung sau:

```
requests
bs4
```

Sau đó chạy lệnh

```bash
# Python3
pip3 install -r requirements.txt

# Python2
pip install -r requirements.txt --user
```

## Thêm thư viện
Để chương trình sử dụng được các hàm từ thư viện, ta cần *import* chúng vào trong chương trình.

```python
import urllib
import requests
from bs4 import BeautifulSoup
```

## Chuẩn bị câu truy vấn
Google sử dụng phương thức [GET](https://www.w3schools.com/tags/ref_httpmethods.asp) để nhận dữ liệu từ người dùng nhập vào ô tìm kiếm. Vì vậy ta cần phải tạo ra một địa chỉ [URL](https://en.wikipedia.org/wiki/URL) ([URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier)) tương tự khi ta tìm kiếm trên trình duyệt. Nội dung của từ khóa tìm kiếm được truyền cho tham số `q`.

```python
query = 'site:viblo.asia cach tim kiem voi google'
query = urllib.parse.quote(query)
URL = f"https://google.com/search?q={query}"
```

Google trả kết quả có sự khác biệt khi ta sử dụng **PC/Laptop** hoặc **mobile**. Làm sao Google biết được điều này, đó là nhờ vào [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent). Vì vậy, ta cần chỉ định User-Agent cho mỗi request tìm kiếm.

```python
# desktop user-agent
USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:65.0) Gecko/20100101 Firefox/65.0'
# mobile user-agent
MOBILE_USER_AGENT = 'Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36'
```

Sau khi đã User-Agent tiếp theo cần làm là chèn vào [Header của HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers). Tại sao lại cần chèn vào Header HTTP? Đó là bởi vì nếu không chèn vào thì lúc ta gửi đi sẽ không có thông tin đó.

```python
headers = {'User-Agent': USER_AGENT}
```

## Thực thi
Đến đây, ta đã có đủ thông tin cần thiết cho việc gửi một GET HTTP requests và nhận lại kết quả tương ứng từ Google.

```python
resp = requests.get(URL, headers=headers)
print(resp.text)
```

Khi chạy lên ta thu được kết quả như ảnh dưới.

![](https://images.viblo.asia/0c8a7a4b-8591-4862-8995-02d8c264fa18.png)

Không phải lúc nào ta cũng nhận được kết quả như mong muốn (tức là server phải hồi với [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 200). Vì vậy, ta cần phải kiểm tra kết quả trước khi thực hiện phân tích mã nguồn [HTML](https://www.w3schools.com/html/). Kiểm tra rằng nếu server trả về 200 thì mới tiến hành phân tích HTML thông qua [Beautiful Soup](https://pypi.org/project/beautifulsoup4/).

```python
if resp.status_code == 200:
    soup = BeautifulSoup(resp.content, "html.parser")
```

Sau khi có kết quả phản hồi từ Google, ta tiến hành tìm kiếm các link kết liên kết đến kết quả mong muốn. Công việc phân tích HTML để lấy ra kết quả được sự trợ giúp của Beautiful Soup sẽ giảm bớt gánh nặng cho ta. Khi lặp qua toàn bộ code HTML trích xuất kết quả và lưu vào trong một mảng.

```python
results = []
for g in soup.find_all('div', class_='r'):
    anchors = g.find_all('a')
    if anchors:
        link = anchors[0]['href']
        title = g.find('h3').text
        item = {
                'title': title,
                'link': link}
        results.append(item)
        
for result in results:
    print(result['link'])
```

Vậy là xong phần phân tích và lưu kết quả. Bây giờ cùng chạy thử nghiệm.

![](https://images.viblo.asia/afbb3310-2031-4882-a0a0-14c5ec5bfe1d.png)

OK! Vậy là ngon lành cành đào rồi.

Đến đây ta có thể cài tiến thêm một chút là từ khóa tìm kiếm được nhập vào hoặc lấy từ tham số.

Hãy thêm chút code cho nó ngon hơn 'cành đào' nhé!

> Git repo: [git@github.com:com0t/scrape-google-python.git](git@github.com:com0t/scrape-google-python.git)