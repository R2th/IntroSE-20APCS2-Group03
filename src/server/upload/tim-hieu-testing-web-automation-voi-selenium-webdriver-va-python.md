![](https://images.viblo.asia/bda1b747-6669-4537-bc5a-3daf374aa488.jpg)
## I.	Giới thiệu Automation Test & Selenium Webdriver
Công việc của QA là tìm hiểu business và ứng dụng để tìm lỗi, support developer và team cải tiến, làm sản phẩm tốt hơn. 

Bên cạnh manual test thì automation test cũng là một hình thức  test được nhiều dự án áp dụng và nhiều QA đang theo đuổi 

Chẳng hạn như:       
   Khi thực hiện test form login, QA cần phải nhập thủ công bằng tay username, password và click vào nút “login” để xem kết quả đăng nhập. Nhưng khi thực hiện automation test QA chỉ cần viết script để chạy tự động tất cả các bước gồm nhập thông tin, click, kiểm tra kết quả và so sánh kết quả thực tế với kết quả giả định.
   
![](https://images.viblo.asia/42cca954-ba0b-4937-93b2-0a9cbb718342.jpg)
### Web automation engine được dùng phổ biến hiện tại là Selenium Webdriver. Nó phổ biến, miễn phí, có cộng đồng mạnh. Vậy Selenium Webdriver là gì? 
![](https://images.viblo.asia/cd0fc46e-ad4a-42f6-a195-b445d27918dc.jpg)

⦁	Nó là một tool open source giúp việc thực thi các hành động lên trang web một cách tự động, tất nhiên là tùy vào mục đích và yêu cầu của người viết. 

⦁	Selenium Webdriver hỗ trợ viết script trên nhiều ngôn ngữ khác nhau như : Java, C#, python, PHP…

⦁	Java có vẻ như đang được ưa chuộng tuy nhiên đang có sự dịch chuyền dần sang Python.

⦁	Mình chọn Python là do nó đơn giản và dễ học hơn Java hay C#. Đây cũng là 1 sự lựa chọn tốt để test Selenium Webdriver với Python theo yêu cầu của khách hàng.

## II.	Cài đặt môi trường lập trình Python
Mình sẽ hướng dẫn cài đặt môi trường Python cho cả Windows, Linux, Mac OS.
### ⦁	Cài đặt Python trên Windows
Việc cài đặt Python trên Windows rất đơn giản.
1. Bạn vào trang chủ Python: https://www.python.org,
2. Click Download và tải phiên bản bạn muốn cài (phiên bản mới nhất mình check là 3.7.3).
3. Click install now và sau đó click nút Next. Nhưng hãy nhớ tick vào ô “Add python 3.x to PATH” như hình dưới đây nha
![](https://images.viblo.asia/e0666ced-226f-4660-9d99-760ef400d9f9.png)

### ⦁	Cài đặt Python trên Linux or Mac OS
1. Mở cmd
2. Run các command sau:
```
sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y python3-pip
sudo apt-get install build-essential libssl-dev libffi-dev python-dev
```
Kiểm tra cài đặt đã thành công như dưới nha:
```
lien@macbook:~$ python -V
Python 3.7.3
lien@macbook:~$ pip -V
pip 19.0.3 from /home/liennt/.local/lib/python3.7/site-packages/pip (python 3.7)
```
Nếu không có lỗi gì và có thông tin phiên bản Python bản vừa cài thì là đã thành công rồi nhé!

## III.	Cài đặt môi trường sử dụng Selenium
### a.	Cài đặt Selenium với Python

Việc cài đặt Selenium với ngôn ngữ Python cực kỳ đơn giản, bạn chỉ cần chạy command sau:
```
pip install selenium
```

### b.	Download & Install Selenium WebDriver:

Các bạn nên dùng WebDriver FireFox hoặc Chrome. Trong series này mình sẽ dùng FireFox driver nhé.

Bạn chỉ cần chọn một trong 2 driver dưới. Khi tải nhớ chọn đúng phiên bản ứng với hệ điều hành bạn đang sử dụng nhé:

FireFox Driver: https://github.com/mozilla/geckodriver/releases

Chrome Driver: http://chromedriver.chromium.org/downloads

Sau khi tải về, các bạn giải nén ra sẽ được 1 file duy nhất. 

Bây giờ việc thiết lập sẽ có đôi chút khác với từng hệ điều hành nhé.

### ⦁ Với Linux:
Bạn cần copy file đó vào trong /usr/local/bin như dưới:

```
sudo mv -f ~/chromedriver /usr/local/bin/chromedriver
sudo chown root:root /usr/local/bin/chromedriver
sudo chmod 0755 /usr/local/bin/chromedriver
```

### ⦁  Với Windows:
Cách đơn giản nhất là bạn copy file này vào cùng thư mục với code python của bạn. Kiểu như này:

--Project_dir

  |____ geckodriver

  |____ auto_script.py

### c.	Download và Install PyCharm IDE
![](https://images.viblo.asia/c12877ab-1140-458c-9296-62585b6a208f.png)
Để phục vụ cho việc code Python được thuận lợi, chúng ta sẽ sử dụng PyCharm IDE.

Các bạn chỉ cần vào trang chủ của họ để tải bản cài đặt tương ứng với hệ điều hành của bạn.

Link tới trang download: https://www.jetbrains.com/pycharm/download

Sau khi download thành công thì sẽ thực hiện install theo hướng dẫn.
## IV. QA cần nắm được các nội dung dưới để test automation với Selenium Webdriver và Python:
- Các phiên bản Python:

Hiện nay, có 2 phiên bản python khác nhau đó là python 2 và python 3. Hai phiên bản này có một chút khác nhau về cú pháp. Bạn không thể dùng python 2 để chạy code của phiên bản python 3 và ngược lại. Một lưu ý nữa là hiện nay python 2 đã bị khai tử nên các bạn chỉ có thể sử dụng python 3 (phiên bản 3.5 trở lên)

- Các kiểu dữ liệu cơ bản trong Python

Cũng giống như hầu hết các ngôn ngữ lập trình khác, python cũng có các kiểu dữ liệu cơ bản bao gồm: integers, floats, booleans, và strings. Nhưng những kiểu dữ liệu này có cách sử dụng đơn giản và giảm bớt các ràng buộc so với các ngôn ngữ khác.
- Nắm được syntax python 

Ví dụ như: 
   + Containers 
       Python đã được xây dựng sẵn một số loại containers: lists, dictionaries, sets, và tuples.
   + Lists - Lists trong python đóng vai trò tương tự như mảng(arrays). Nhưng lists có khả năng tự động thay đổi kích thước và các phần tử trong 1 list có thể có kiểu dữ liệu khác nhau.
   + Dictionaries - Một dictionaries chứa các cặp (key,value), nó tương tự với map trong Java và C++
   + Sets - Set là một tập hợp các phần tử không có thứ tự và các phần tử không trùng lặp (distinct).
   + Functions - Hàm trong python được định nghĩa sử dụng keyword def. 
   
   
Ví dụ:
```
def sign(x):
    if x > 0:
        return 'positive'
    elif x < 0:
        return 'negative'
    else:
        return 'zero'
 
for x in [-1, 0, 1]:
    print(sign(x))
# Prints "negative", "zero", "positive"
```
....
## V.	Viết chương trình đầu tiên sử dụng Selenium

Bây giờ các bạn giúp mình tạo một file hello_world.py và copy đoạn code sau vào chạy thử nhé
```

from selenium import webdriver
from time import sleep
 
 
class HelloSelenium:
    def __init__(self, url):
        self.driver = webdriver.Firefox()
        self.driver.get(url)
 
    def get_site_info(self):
        print('URL:', self.driver.current_url)
        print('Title:', self.driver.title)
        sleep(5)
        self.driver.save_screenshot('screen_shot.png')
 
 
if __name__ == '__main__':
    hello = HelloSelenium('https://sun-asterisk.vn')
    hello.get_site_info()
    # Close driver
    hello.driver.close()

```
Sau khi chạy xong, trên console output sẽ in ra thông tin website url và website title như sau:
```
/home/liennt/sources/python/hello_selenium/venv/bin/python 
/home/ liennt /sources/python/hello_selenium/hello_world.py
URL: https://sun-asterisk.vn
Title: Sun* Inc. | Digital Creative Studio - Làm việc tại Hà Nội, Đà Nẵng, Hồ Chí Minh, onsite Nhật Bản, Sun* Inc. tuyển dụng các vị trí lập trình viên Android, PHP, iOS, BrSE, QA/Tester...
```
Đồng thời, thư mục chứa code sẽ có một file ảnh chụp màn hình website có tên là screen_shot.png

Như vậy, là mình vừa chạy xong một script để thực hiện test bằng Python rồi. 

## VI. Kết Luận: 
⦁  Python có cú pháp đơn giản giúp cho QA dễ dàng đọc và tìm hiểu. Mình có 1 đoạn scrip với nội dung như nhau nhưng được viết bởi Java và Phythol để mọi người có cái nhìn trực quan hơn nhé
![](https://images.viblo.asia/3dd6fde7-4cf4-4bc8-bf8a-88a711d84f2a.png)

⦁  Bên cạnh đó Python khá phổ biến nên có nhiều trang web lớn sử dụng ngôn ngữ lập trình này dễ dàng tạo nền tảng vững chắc để một QA bước vào thế giới lập trình :):):)

## VII. Reference:
https://automatetheboringstuff.com

https://www.seleniumhq.org

http://www.seleniumhq.org/docs/03_webdriver.jsp

http://toolsqa.com/selenium-tutorial

https://nguyenvanhieu.vn/khoa-hoc-lap-trinh-python/