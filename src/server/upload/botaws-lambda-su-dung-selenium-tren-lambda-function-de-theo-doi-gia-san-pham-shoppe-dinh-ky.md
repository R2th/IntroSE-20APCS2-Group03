###  Mở đầu:
![image.png](https://images.viblo.asia/0d819708-0e25-4151-90eb-7b7370670327.png)
![](https://images.viblo.asia/e767e6d0-84db-4ad2-a6c1-fe53e9c8c82f.gif)

Hello mọi người, đầu xuân năm mới kính chúc mọi người tràn đầy sức khỏe, đạt được nhiều mục tiêu trong năm mới nhé nhé, hôm nào mình cũng có thói quen lướt lướt các sàn thương mại điện tử như Shoppe, Tiki để xem giá một số món đồ mình dự định mua ( tham khảo thôi chứ chưa có tiền mua ). Cũng mất khá nhiều thời gian nên nay rảnh rỗi làm cái tool nhè nhẹ để crawl giá của sản phẩm sau đó bắn sang Slack luôn, khi nào giá tốt thì múc thôi :v. 

### Stack sử dụng:
* Selenium
* AWS Lambda Service
* AWS CloudWatch Events

Mình cũng hay sử dụng Selenium để làm một số công cụ tự động hóa (automation) phục vụ cho công việc, với việc sử dụng selenium có thể mô phỏng các thao tác trên trình duyệt như người thật (perfect). Mình thấy cũng ít người sử dụng Selenium chạy trên AWS LAMBDA SERVICE, hôm nay hướng dẫn mọi người Setup phục vụ cho nhu cầu của bản thân luôn nhé.

### Tạo Lambda Function:

* Vào **AWS Console -> Chọn Lambda Service** để tạo 1 Lambda Function nhé.

![image.png](https://images.viblo.asia/81f27e79-710c-426c-832d-106978b976cf.png)

* Sau khi tạo được Lambda Function, tại Sidebar chọn **Layers -> Create layer**

![image.png](https://images.viblo.asia/8f6ecda3-852e-492a-95db-3de86df8c844.png)

* Lambda Layer giúp chúng ta dễ dàng cài đặt tất cả các thư viện và các dependencies bạn cần để ứng dụng của mình chạy được.  Việc sử dụng Layer giúp chúng ta giảm kích thước của file .zip deployment và deploy ứng dụng một cách nhanh hơn.
* Một layer là một .zip file mà chứa các thư viện, dependence, configuration files, custom runtime, data,... 

* File Layer chrome_headless.zip đã build sẵn mọi người có thể tải [tại đây](https://github.com/longnd-1038/selenium-lambda), hoặc muốn build mới thì mọi người làm theo các step sau:

```
git clone git@github.com:longnd-1038/selenium-lambda.git

rm -rf chrome_headless.zip

chmod -x chrome_headless_lambda_layer.sh

./chrome_headless_lambda_layer.sh
```

![image.png](https://images.viblo.asia/183cf46c-2c25-45f2-b4e1-db7afeb67a5b.png)

* Mình dùng Python 3.7 nên chọn Compatible Runtime là Python 3.7:

![image.png](https://images.viblo.asia/6080129f-24ff-467d-8da6-8a9ca2c31746.png)

* Add Layer vào Lambda Function, vào Lambda Function vừa tạo ở trên kéo xuống chọn Add layer
![image.png](https://images.viblo.asia/294d8b2e-9ccd-4006-908b-e8ff239e7a37.png)

* Chọn Layer đã tạo phía trên: 
 ![image.png](https://images.viblo.asia/c04f549c-71f7-4669-b9be-28437934def0.png)
 
 * Mọi người nhớ vào Lamda function đã tạo chọn **Configuration -> General configuration** để setting lại timeout lên tầm 3 ~ 5 minutes, memory tầm 512mb để chạy nhé:
![image.png](https://images.viblo.asia/b95c1955-f6cf-4dda-afdc-475373b5e943.png) 
 
 * Ok sau khi tạo xong lambda function cũng như add layer để có một số thư viện cần thiết để chạy thì tiếp theo chúng ta viết một script nhé.


### Viết script:
* Kịch bản :

Vào link https://shopee.vn/apple_flagship_store?page=0&shopCollection=10957665&sortBy=pop

Crawl thông tin các sản phẩm Macbook

Format text và gửi sang Slack

* Chạy với chế độ Non-Headless nó sẽ như thế này, nhưng trên lambda function thì chúng ta chạy với chế độ Headless nhé:
![](https://images.viblo.asia/e767e6d0-84db-4ad2-a6c1-fe53e9c8c82f.gif)

- Mình sẽ sử dụng python để viết script cho lambda function, và trước tiên nếu muốn gửi tin nhắn sang slack thì các bạn cần tạo ra 1 đường dẫn webhook tới 1 channel.  Khi bắn 1 POST request theo api của Slack thì Slack sẽ gửi tin nhắn đến cho channel ấy.
- Cũng đơn giản nên mọi người [tham khảo](https://itzone.com.vn/vi/article/huong-dan-su-dung-slack-de-log-error/) ở đây nhé.
![image.png](https://images.viblo.asia/090ee349-0ae6-4ba0-aa30-d9b3992ce004.png)

- Sau khi tạo xong Workspace -> Channel -> Mình tạo được một URL HOOK định dạng như này:

```
'https://hooks.slack.com/services/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d'
```

- Đoạn script để gửi text sang 1 channel:
```
def sendToSlackChannel(textSending, urlHook):
    try:
        payload = dict(text=textSending)
        requests.post(urlHook, json=payload)
    except:
        print('err')
```

- Đoạn script để crawl giá sản phẩm Macbook trên Shoppe (nhớ thay đổi urlHook nhé):
```
def crawlerMacbookShoppe(link = 'https://shopee.vn/apple_flagship_store?page=0&shopCollection=10957665&sortBy=pop'):
    urlHook = 'https://hooks.slack.com/services/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d'
    instance_ = WebDriver()
    driver = instance_.get()
    driver.get(link)
    time.sleep(5)
    elements = driver.find_elements_by_xpath('//*[@id="main"]/div/div[2]/div[2]/div/div[2]/div/div[4]/div[2]/div[2]/div[1]/div[2]/div/div')
    for el in elements:
        infor = el.text.split('\n')
        discount = infor[0]
        productName = infor[2]
        price = infor[5]
        textInfor = productName + ' - ' + discount + ' - ' + price
        sendToSlackChannel(textInfor, urlHook)
        print(textInfor)

    sendToSlackChannel('--------------------------------------------------------------------------------------', urlHook)
    driver.close()
```

* Và đây là Full Script nhé:
```
import json
from selenium.webdriver import Chrome
from selenium.webdriver.chrome.options import Options
import os
import shutil
import uuid
import time
from datetime import datetime
import datetime
import requests

class WebDriver(object):

    def __init__(self):
        self.options = Options()

        self.options.binary_location = '/opt/headless-chromium'
        self.options.add_argument('--headless')
        self.options.add_argument('--no-sandbox')
        self.options.add_argument('--start-maximized')
        self.options.add_argument('--start-fullscreen')
        self.options.add_argument('--single-process')
        self.options.add_argument('--disable-dev-shm-usage')

    def get(self):
        driver = Chrome('/opt/chromedriver', options=self.options)
        return driver


def lambda_handler(event, context):
    crawlerMacbookShoppe()
    return True

def crawlerMacbookShoppe(link = 'https://shopee.vn/apple_flagship_store?page=0&shopCollection=10957665&sortBy=pop'):
    urlHook = 'https://hooks.slack.com/services/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'
    instance_ = WebDriver()
    driver = instance_.get()
    driver.get(link)
    time.sleep(5)
    elements = driver.find_elements_by_xpath('//*[@id="main"]/div/div[2]/div[2]/div/div[2]/div/div[4]/div[2]/div[2]/div[1]/div[2]/div/div')
    for el in elements:
        infor = el.text.split('\n')
        discount = infor[0]
        productName = infor[2]
        price = infor[5]
        textInfor = productName + ' - ' + discount + ' - ' + price
        sendToSlackChannel(textInfor, urlHook)
        print(textInfor)

    sendToSlackChannel('--------------------------------------------------------------------------------------', urlHook)
    driver.close()

def sendToSlackChannel(textSending, urlHook):
    try:
        payload = dict(text=textSending)
        requests.post(urlHook, json=payload)
    except:
        print('err')
```

### Demo thử:
* Mọi người dán script vào lambda function -> nhấn deploy -> sau đó nhấn test:
![image.png](https://images.viblo.asia/280db2fd-0aef-4930-86b7-d8bfa75b9463.png)


* Và đây là kết quả nhá:
![image.png](https://images.viblo.asia/271a5017-1d1d-435d-a5d6-95b230af4361.png)


![image.png](https://images.viblo.asia/0d819708-0e25-4151-90eb-7b7370670327.png)


### Sử dụng Amazon EventBridge để cấu hình cronjob:
- Mục đích sử dụng Amazon EventBridge để có thể call lambda function một cách tự động, ở đây mình thiết lập 1 job là cứ 12 hours sẽ call lambda function 1 lần để bắn message về Slack.

![image.png](https://images.viblo.asia/e939c647-6e3b-432f-a464-20682de1029d.png)


![image.png](https://images.viblo.asia/2a36ee1d-7935-4827-8096-54639d1b066d.png)


### Tổng kết:
- Cảm ơn mọi người đã đọc bài viết, hi vọng sẽ giúp ích cho mọi người trong công việc và học tập.