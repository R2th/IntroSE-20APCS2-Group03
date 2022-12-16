![](https://images.viblo.asia/544589d1-b726-460d-8eff-b1ffdd18d9d1.jpg)

### Giới thiệu : 

Trong bài viết này mình sẽ giới thiệu đến các bạn một công cụ automation trên trình duyệt web mà mình hay sử dụng để tự động hóa các tác vụ trên trình duyệt giống như người dùng thật đó là Selenium. Và mình sẽ sử dụng selenium kết hợp với python để tạo một con bot facebook tự động lấy tin tức mới nhất  ở trang https://www.24h.com.vn/ để gửi vào facebook chính của mình. 
### Cài đặt Selenium với Python

Có rất nhiều bài viết hướng dẫn cài đặt môi trường, các bạn có thể tham khảo [tại đây](https://nguyenvanhieu.vn/cai-dat-moi-truong-selenium-voi-python/) nhé . 
### Bước 1 : Đăng nhập vào facebook bằng cookie : 

Ở đây mình sẽ tạo sẵn một clone facebook và tiến hành lấy cookie để đăng nhập, mình không sử dụng tài khoản và mật khẩu trực tiếp là vì giảm hiện tượng checkpoint trên trình duyệt khi đăng nhập ở trình duyệt lạ. Các bạn tiến hành đăng nhập vào facebook và lấy cookie như hình nhé. Nếu các bạn không muốn có thể đăng nhập bằng tài khoản và mật khẩu nhé và mình đoán sẽ bị chặn ngay từ lần đầu tiên đăng nhập :v: 

Đầu tiên lấy cookie của clone như hình nhé :
![](https://images.viblo.asia/4c20239e-6b46-4efa-974f-e075b77c704d.png)

Tạo script đăng nhập vào facebook bằng Cookie vừa có được :
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from datetime import datetime

def initDriver():
    CHROMEDRIVER_PATH = '/usr/bin/chromedriver'
    WINDOW_SIZE = "1920,1080"
    chrome_options = Options()
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
    chrome_options.add_argument('--no-sandbox')
    driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                              options=chrome_options
                              )
    return driver

driver=initDriver()

user_receive = "100009116007864"
cookie = "Cookie: fr=0ib4TxzI1pcwOr8aG.AWVFTLqO6sKdJ0jOOB5tp81vVgM.Bffts3.2O.AAA.0.0.BfgyU0.AWWUe73A0nA; sb=VgoPX7xwsLcGBg9tY1y_rPgP; datr=VgfgoPX0PyzfdsfoHMD38tzdjrr0uC; _fbp=fb.1.159533sdsfds8346205.1354317687; wd=1832x346; c_user=100039058042146; xs=44%3AQS-_M-LyD-t_ww%3A2%3A160fdsfs2427402%3A19608%3A14949%3A%3AAcW_NFvRVJOj5-W14FBfJ2PZD9G__13Iy8QQ4nWD4Q; spin=r.1002804926_b.trunk_t.1602427404_s.1_v.2_"


def loginFacebookByCookie(cookie):
    script = 'javascript:void(function(){ function setCookie(t) { var list = t.split("; "); console.log(list); for (var i = list.length - 1; i >= 0; i--) { var cname = list[i].split("=")[0]; var cvalue = list[i].split("=")[1]; var d = new Date(); d.setTime(d.getTime() + (7*24*60*60*1000)); var expires = ";domain=.facebook.com;expires="+ d.toUTCString(); document.cookie = cname + "=" + cvalue + "; " + expires; } } function hex2a(hex) { var str = ""; for (var i = 0; i < hex.length; i += 2) { var v = parseInt(hex.substr(i, 2), 16); if (v) str += String.fromCharCode(v); } return str; } setCookie("' + cookie + '"); location.href = "https://facebook.com"; })();'
    driver.execute_script(script)

```
Cookie trên là của mình nên mình change rồi nhé : ))

Demo login nào :

![](https://images.viblo.asia/1b7e703e-d2de-4bd1-8eba-5abc2dbfccc5.gif)


### Bước 2 : Lấy nội dung tin tức mới nhất trên 24h.com.vn :

Đầu tiên, các bạn thực hiện xác định element của các bài viết mới nhất để tiến hành lấy nội dung tiêu đề :
Chuột phải inspect phần tử mình lấy theo xpath:
![](https://images.viblo.asia/2eb555ae-a309-4dd2-a33e-bbc8da5c5b8f.gif)

Script :

```python
def getNews(driver):
    news_arr = []
    driver.get('https://www.24h.com.vn/tin-tuc-trong-ngay-c46.html')
    news = driver.find_elements_by_xpath('//*[@id="cated"]/div/section/div/div/div/div/article/div/div/header/h2/a')
    if (len(news) > 0) :
        for i in range(0, len(news)):
            text = str(news[i].text) + ": Link nè :" + str(news[i].get_attribute('href'))
            news_arr.append(text)
    return news_arr
```

### Bước 3 : Tạo Script tự động nhắn tin tới facebook sau một khoảng thời gian :

Tương tự mình cũng sẽ thực hiện xác định các element của textarea và button gửi để viết script tự động gửi tin nhắn nhé, các bạn tự inspect phần tử nhé :

Ok. Viết Script nào :
```python
def sendMessage(message):
    driver.get('https://mbasic.facebook.com/messages/compose/?ids[0]=' + user_receive)
    text_input = driver.find_elements_by_tag_name('textarea')
    if (len(text_input) > 0):
        text_input[0].send_keys(message)
        driver.find_element_by_xpath('//*[@id="composer_form"]/div[2]/table/tbody/tr/td[2]/input').click()
```

### Thành quả :
Đoạn script hoàn chình : 
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
from datetime import datetime

def initDriver():
    CHROMEDRIVER_PATH = '/usr/bin/chromedriver'
    WINDOW_SIZE = "1920,1080"
    chrome_options = Options()
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
    chrome_options.add_argument('--no-sandbox')
    driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                              options=chrome_options
                              )
    return driver

driver=initDriver()

user_receive = "100009116007864"  #uid facebook người nhận
cookie = "Cookie: fr=0ib4TxzI1pcwOr8aG.AWVFTLqO6sKdJ0jOOB5tp81vVgM.Bffts3.2O.AAA.0.0.BfgyU0.AWWUe73A0nA; sb=VgoPX7xwsLbcGBg9cxtY1y_rPgP; datr=VgoPX0PyzoHMD38tzdjrr0uC; _fbp=fb.1.15953383fsdfdsfdf46205.1354317687; wd=1832x346; c_user=100039058042146; xs=44%3AQS-_M-LyD-t_ww%3A2%3A1602427402%3A19608%3A14949%3A%3AAcW_NFvRVJOj5-W14FBfJ2PZD9G__13Iy8QQ4nWD4Q; spin=r.1002804926_b.trunk_t.1602fds427404_s.1_v.2_" #cookie clone, mọi người dùng cookie mới nhé
time_delay= 60 # thời gian delay để gửi tin tức

def getNews(driver):
    news_arr = []
    driver.get('https://www.24h.com.vn/tin-tuc-trong-ngay-c46.html')
    news = driver.find_elements_by_xpath('//*[@id="cated"]/div/section/div/div/div/div/article/div/div/header/h2/a')
    if (len(news) > 0) :
        for i in range(0, len(news)):
            text = str(news[i].text) + ": Link nè :" + str(news[i].get_attribute('href'))
            news_arr.append(text)
    return news_arr

def sendMessage(message):
    driver.get('https://mbasic.facebook.com/messages/compose/?ids[0]=' + user_receive)
    text_input = driver.find_elements_by_tag_name('textarea')
    if (len(text_input) > 0):
        text_input[0].send_keys(message)
        driver.find_element_by_xpath('//*[@id="composer_form"]/div[2]/table/tbody/tr/td[2]/input').click()

def loginFacebookByCookie(cookie):
    script = 'javascript:void(function(){ function setCookie(t) { var list = t.split("; "); console.log(list); for (var i = list.length - 1; i >= 0; i--) { var cname = list[i].split("=")[0]; var cvalue = list[i].split("=")[1]; var d = new Date(); d.setTime(d.getTime() + (7*24*60*60*1000)); var expires = ";domain=.facebook.com;expires="+ d.toUTCString(); document.cookie = cname + "=" + cvalue + "; " + expires; } } function hex2a(hex) { var str = ""; for (var i = 0; i < hex.length; i += 2) { var v = parseInt(hex.substr(i, 2), 16); if (v) str += String.fromCharCode(v); } return str; } setCookie("' + cookie + '"); location.href = "https://facebook.com"; })();'
    driver.execute_script(script)

driver.get("https://facebook.com/")
loginFacebookByCookie(cookie)

while True:
    try:
        time.sleep(time_delay)
        sendMessage('Tin tức mới trong ngày nè Xếp : ')
        news = getNews(driver)
        for i in range(0, len(news)):
            time.sleep(30)
            sendMessage(str(news[i]))
    except:
        print('err')

driver.close()
```



Sau khi hoàn thành đoạn script trên thì mình có thể deploy lên server vps ubuntu và mình đã sở hữu một con bot giúp mình tiếp cận với tin tức mới hàng ngày . (yaoming!!)
![](https://images.viblo.asia/98f5835e-7999-4e0b-8c0b-3a80b827e7be.gif)

   
Cảm ơn các bạn đã đọc bài nhé !