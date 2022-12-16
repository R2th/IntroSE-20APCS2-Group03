### Mở đầu:
Vào một ngày đẹp trời, có ông chú nọ nhờ mình triển khai một con Crawl nhỏ nhỏ với mục đích là làm thế nào để lấy hết nội dung cũng như ảnh của các bài viết trên một Group hay Fanpage nào đó. Mục đích sử dụng của lượng Data này thì mình không biết (hihi), có thể là Clone nội dung từ 1 Group hay Fanpage này sang 1 Group hay Fanpage khác hoặc lấy nội dung đó để import lên website chẳng hạn,... blabla

![Peek 2022-05-30 16-11.gif](https://images.viblo.asia/2b15d33c-738d-468a-bf02-d8e4ecd40080.gif)

### II. Tech sử dụng :
- [Selenium] : Đây là 1 framework kiểm thử tự động ( Automation Testing ) cho phép chúng ta điều khiển trình duyệt một cách tự động theo kịch bản có sẵn, mô phỏng hành vi, thao tác trên trình duyệt. Nếu mọi người chưa tiếp cận thì có thể tìm hiểu sơ qua rồi tiếp tục phần dưới nhé ^^
- [Python] - Sử dụng ngôn ngữ lập trình Python

### III. Cài đặt Selenium trên Linux:

- **Precondition** : Máy đã cài python3 và pip3 nhé

-  **Step 1**  - Install Selenium + pyotp
```
pip3 install selenium
pip3 install pyotp
```

- **Step 2** – Install Google Chrome
```
sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
sudo echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
sudo apt-get -y update
sudo apt-get -y install google-chrome-stable
```

- **Step 3** – Install ChromeDriver
```
wget https://chromedriver.storage.googleapis.com/2.41/chromedriver_linux64.zip
unzip chromedriver_linux64.zip
You can find the latest ChromeDriver on its official download page. Now execute below commands to configure ChromeDriver on your system.

sudo mv chromedriver /usr/bin/chromedriver
sudo chown root:root /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver
```

Sau khi cài xong Selenium Python thì triển luôn nhé:

### IV. Triển khai:
- Để hạn chế nhất việc login clone vào Facebook thì lăn ra chết ngay (checkpoint) thì ở đây mình khuyến khích mọi người sử dụng ip 3G, 4G có thể phát trên điện thoại nhé (Mọi người có thể biến chiếc điện thoại của mình trở thành một công cụ như USB 3G 4G - đổi ip liên tục, bạn nào muốn dùng cái này mình hướng dẫn config nhé) và một cái nữa mình nhận thấy là việc **LOGIN FACEBOOK BẰNG 2FA** sẽ giúp clone của bạn TRUST hơn, giảm thiểu BOT FACEBOOK phát hiện (Bạn cần bật 2FA trên account facebook của mình nhé).
- Kịch bản script sẽ như thế này:
+ Login vào Facebook bằng ( username, password, mã 2FA ) thay vì token hay cookie
+ Quét id bài viết trong nhóm hoặc Fanpage
+ Crawl các bài viết sau đó lưu trong 1 folder

### V. Viết script nào:
Mình thấy viết script theo các kịch bản đưa ra sẵn khá đơn giản, mọi người chỉ cần nắm basic ngôn ngữ nào đó (Java, PHP, Golang...)  không nhất thiết phải Python, tìm hiểu cách inspect Element theo id, xpath, class.., rồi thao tác các event trên các element này là được.

1. Khởi tạo Google Chrome
2. Login vào Facebook bằng Username, Password, 2FA
3. Quét tất cả các id bài viết trong nhóm hoặc Fanpage ( nhiều nhất có thể nhé )
4. Crawl nội dung lưu về local

Ở bài viết này mình sẽ cố gắng Crawl nhiều nhất có thể các bài viết trên nhóm [Việc làm Công Nghệ Thông Tin Đà Nẵng](https://www.facebook.com/groups/368698476630471)
Group



#### 1. Đầu tiên là đoạn script khởi tạo chrome và đăng nhập vào FACEBOOK bằng 2FA (Nhớ bật 2FA trên clone facebook trước nhá):

- Clone login sẽ có định dạng như này:
```
username: '100066731256212'
passWord: 'HnrDzNCYzyJAaV9'
2fa: 'DP74VXA5Z5MPP2C4XVGLAFGCLYDVBG4O'
```
![Peek 2022-05-30 14-46.gif](https://images.viblo.asia/1f83aa32-8a6a-47be-beac-2869456f7835.gif)

Dưới đây là đoạn script login nhé:

```python
import os
import shutil
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time
import requests
from selenium.webdriver.common.keys import Keys
from time import sleep
import pyotp

# Đoạn script này dùng để khởi tạo 1 chrome profile
def initDriverProfile(profile):
    CHROMEDRIVER_PATH = '/usr/bin/chromedriver'
    WINDOW_SIZE = "1000,2000"
    chrome_options = Options()
    #chrome_options.add_argument("--headless")
    chrome_options.add_argument("--window-size=%s" % WINDOW_SIZE)
    chrome_options.add_argument("user-data-dir=/home/dinhlongit/.config/google-chrome/" + str(profile))  # Path to your chrome profile
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('disable-infobars')
    chrome_options.add_argument('--disable-gpu') if os.name == 'nt' else None  # Windows workaround
    chrome_options.add_argument("--verbose")
    chrome_options.add_argument("--no-default-browser-check")
    chrome_options.add_argument("--ignore-ssl-errors")
    chrome_options.add_argument("--allow-running-insecure-content")
    chrome_options.add_argument("--disable-web-security")
    chrome_options.add_argument("--disable-feature=IsolateOrigins,site-per-process")
    chrome_options.add_argument("--no-first-run")
    chrome_options.add_argument("--disable-notifications")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-translate")
    chrome_options.add_argument("--ignore-certificate-error-spki-list")
    chrome_options.add_argument("--ignore-certificate-errors")
    chrome_options.add_argument("--disable-blink-features=AutomationControllered")
    chrome_options.add_experimental_option('useAutomationExtension', False)
    prefs = {"profile.default_content_setting_values.notifications": 2}
    chrome_options.add_experimental_option("prefs", prefs)
    chrome_options.add_argument("--start-maximized")  # open Browser in maximized mode
    chrome_options.add_argument("--disable-dev-shm-usage")  # overcome limited resource problems
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    # chrome_options.add_experimental_option("prefs", {"profile.managed_default_content_settings.images": 2})
    chrome_options.add_argument('disable-infobars')

    driver = webdriver.Chrome(executable_path=CHROMEDRIVER_PATH,
                              options=chrome_options
                              )
    return driver

def checkLiveClone(driver):
    try:
        driver.get("https://mbasic.facebook.com/")
        time.sleep(2)
        driver.get("https://mbasic.facebook.com/")
        time.sleep(1)
        elementLive = driver.find_elements_by_name("view_post")
        if (len(elementLive) > 0):
            print("Live")
            return True

        return False
    except:
        print("view fb err")
        

def getCodeFrom2FA(code):
    totp = pyotp.TOTP(str(code).strip().replace(" ","")[:32])
    time.sleep(2)
    return totp.now()


def confirm2FA(driver):
    time.sleep(2)
    btnRadioClick = driver.find_elements_by_css_selector(
        "section > section.x > div:nth-child(2) > div > div.y.ba > label > input[type=radio]")[0].click()
    time.sleep(2)
    continueBntSubmit = driver.find_elements_by_css_selector("#checkpointSubmitButton-actual-button")[0].click()

def loginBy2FA(driver, username, password, code):
    # changeMacAdrress()
    # changeIp4G()
    #readIp()
    driver.get("https://mbasic.facebook.com/login/?next&ref=dbl&fl&refid=8")
    sleep(10)
    userNameElement = driver.find_elements_by_css_selector("#m_login_email")
    userNameElement[0].send_keys(username)
    time.sleep(2)
    passwordElement = driver.find_elements_by_css_selector("#login_form > ul > li:nth-child(2) > section > input")
    passwordElement[0].send_keys(password)
    time.sleep(2)
    btnSubmit = driver.find_elements_by_css_selector("#login_form > ul > li:nth-child(3) > input")
    btnSubmit[0].click()
    faCodeElement = driver.find_elements_by_css_selector("#approvals_code")
    faCodeElement[0].send_keys(str(getCodeFrom2FA(code)))
    time.sleep(2)
    btn2fa = driver.find_elements_by_css_selector("#checkpointSubmitButton-actual-button")
    btn2fa[0].click()
    confirm2FA(driver)
    btn2fa = driver.find_elements_by_css_selector("#checkpointSubmitButton-actual-button")
    if (len(btn2fa) > 0):
        btn2fa[0].click()
        btn2faContinue = driver.find_elements_by_css_selector("#checkpointSubmitButton-actual-button")
        if (len(btn2faContinue) > 0):
            btn2faContinue[0].click()
            confirm2FA(driver)
    #end login

isLogin = checkLiveClone(driver) # Check live 
print(isLogin)
userName = '100066731256212' # Điền tài khoản vào đây
passWord = 'HnrD9SCYqSySASV1' # Mật khẩu
twoFa= 'DP74VXA5ZSMPS2CSXVSLAFYCLYDVBG4O' # 2FA

if (isLogin == False):
    loginBy2FA(driver, userName, passWord, twoFa)


```

Nếu trên server mọi người muốn chạy chế độ không giao diện (headless) thì bỏ comment dòng lệnh này * chromeoptions.addargument("--headless")* ở trên nhé.



#### 2. Đoạn script quét id của tất cả bài viết trong nhóm:

![Peek 2022-05-30 15-24.gif](https://images.viblo.asia/9b8a658b-bba0-4971-980e-9637c1bbc42c.gif)

Thêm tiếp đoạn script này để quét id của tất cả bài viết trong group nhé:

```python
fileIds = 'post_ids.csv'
def readData(fileName):
    f = open(fileName, 'r', encoding='utf-8')
    data = []
    for i, line in enumerate(f):
        try:
            line = repr(line)
            line = line[1:len(line) - 3]
            data.append(line)
        except:
            print("err")
    return data

def writeFileTxt(fileName, content):
    with open(fileName, 'a') as f1:
        f1.write(content + os.linesep)

def getPostsGroup(driver, idGroup, numberId):
    try:
        driver.get('https://mbasic.facebook.com/groups/' + str(idGroup))
        file_exists = os.path.exists(fileIds)
        if (not file_exists):
            writeFileTxt(fileIds, '')

        sumLinks = readData(fileIds)
        while (len(sumLinks) < numberId):
            likeBtn = driver.find_elements_by_xpath('//*[contains(@id, "like_")]')
            if len(likeBtn):
                for id in likeBtn:
                    idPost = id.get_attribute('id').replace("like_", "")
                    if (idPost not in sumLinks):
                        sumLinks.append(idPost)
                        writeFileTxt(fileIds, idPost)
                        print(idPost)
            nextBtn = driver.find_elements_by_xpath('//a[contains(@href, "?bacr")]')
            if (len(nextBtn)):
                sleep(6)
                nextBtn[0].click()
            else:
                print('Next btn does not exist !')
                break
    except:
        print('Error')

driver = initDriverProfile("dinhlongitpage1")
isLogin = checkLiveClone(driver)  # Check live
print(isLogin)
userName = '100066731256212'
passWord = 'HnrDfsd9NCdsdaqydJA6V1'
twoFa= 'DP74VXA5151PH214XVG1AFYCYDVBG4O'

if (isLogin == False):
    loginBy2FA(driver, userName, passWord, twoFa)

getPostsGroup(driver, 'vieclamCNTTDaNang', 100000)
```



#### 3. Đoạn script để crawl nội dung + ảnh từ những id bài viết đã crawl ở trên:

![Peek 2022-05-30 16-11.gif](https://images.viblo.asia/2b15d33c-738d-468a-bf02-d8e4ecd40080.gif)

```python
#getPostsGroup(driver, 'vieclamCNTTDaNang', 100000) # sau khi crawl xong id bài viết thì comment lại nhé

def clonePostContent(driver, postId = "1902017913316274"):
    try:
        driver.get("https://m.facebook.com/" + str(postId))
        parrentImage = driver.find_elements_by_xpath("//div[@data-gt='{\"tn\":\"E\"}']")
        if (len(parrentImage) == 0):
            parrentImage = driver.find_elements_by_xpath("//div[@data-ft='{\"tn\":\"E\"}']")

        contentElement = driver.find_elements_by_xpath("//div[@data-gt='{\"tn\":\"*s\"}']")
        if (len(contentElement) == 0):
            contentElement = driver.find_elements_by_xpath("//div[@data-ft='{\"tn\":\"*s\"}']")

        #get Content if Have
        if (len(contentElement)):
            content = contentElement[0].text

        #get Image if have
        linksArr = []
        if (len(parrentImage)):
            childsImage = parrentImage[0].find_elements_by_xpath(".//*")
            for childLink in childsImage:
                linkImage = childLink.get_attribute('href')
                if (linkImage != None):
                    linksArr.append(linkImage.replace("m.facebook", "mbasic.facebook"))
        linkImgsArr = []
        if (len(linksArr)):
            linkImgsArr = []
            for link in linksArr:
                driver.get(link)
                linkImg = driver.find_elements_by_xpath('//*[@id="MPhotoContent"]/div[1]/div[2]/span/div/span/a[1]')
                linkImgsArr.append(linkImg[0].get_attribute('href'))

        postData = {"post_id": postId, "content" : "", "images": []}

        if (len(linkImgsArr)):
            postData["images"] = linkImgsArr
        if (len(contentElement)):
            postData["content"] = content
        print(postData)
        return postData
    except:
        return False
        print("Fail clone Post")

def writeFileTxtPost(fileName, content, idPost, pathImg="/img/"):
    pathImage = os.getcwd() + pathImg + str(idPost)
    with open(os.path.join(pathImage, fileName), 'a') as f1:
        f1.write(content + os.linesep)

def download_file(url, localFileNameParam = "", idPost = "123456", pathName = "/data/"):
    try:
        if not os.path.exists(pathName.replace('/', '')):
            os.mkdir(pathName.replace('/', ''))

        local_filename = url.split('/')[-1]
        if local_filename:
            local_filename = localFileNameParam
        with requests.get(url, stream=True) as r:
            pathImage = os.getcwd() + pathName + str(idPost)

            if (os.path.exists(pathImage) == False):
                os.mkdir(pathImage)

            with open(os.path.join(pathImage, local_filename), 'wb') as f:
                shutil.copyfileobj(r.raw, f)
    except:
        print("download file err")

def crawlPostData(driver, postIds, type = 'page'):
    folderPath = "/data_crawl/"
    for id in postIds:
        try:
            dataPost = clonePostContent(driver, id)
            dataImage = []
            if (dataPost != False and len(dataPost["images"])):
                if (type == 'group'):
                    for img in dataPost["images"]:
                        driver.get(img)
                        dataImage.append(driver.current_url)
                else:
                    dataImage = dataPost["images"]

                postId = str(dataPost['post_id'])
                postContent = str(dataPost['content'])
                stt = 0
                for img in dataImage:
                    stt += 1
                    download_file(img, str(stt), postId, folderPath)
                writeFileTxt('post_crawl.csv', str(id))
                writeFileTxtPost('content.csv', postContent, postId, folderPath)
        except:
            print("crawl fail")


postIds = readData(fileIds)
crawlPostData(driver, postIds, 'group')
```


**Cuối cùng là Script hoàn chỉnh mọi người có thể tham khảo [repo này](https://github.com/longnd-1038/crawl_post_group_fanpage_facebook) của mình nha.**

**Data mình crawl thử được[ ở đây](https://github.com/longnd-1038/crawl_post_group_fanpage_facebook/tree/master/data_crawl) nhóe:**


### VI. Phát triển thêm
- Sau khi crawl lượng dữ liệu trên thì chúng ta sẽ có thể làm rất nhiều thứ trên đó:
+   Làm tool trích xuất bài viết rồi đăng lên một nền tảng khác chẳng hạn.
+   Lấy nội dung bài viết để phân tích xu hướng, thống kê số liệu, đưa ra quyết định cho việc gì đó...

### VII. Tổng kết
- Hi vọng qua cái tool nho nhỏ trên sẽ giúp ích cho công việc của mọi người ạ. Thank for reading ^^