Hôm nay, mình sẽ giới thiệu về Selenium Grid - một trong số các bộ testing tool của Selenium. Tìm hiểu cách thực hiện Cross browser testing bằng Selenium Grid.

Khi nào thì cần dùng Selenium Grid?

Có hai lý do chính để bạn cân nhắc việc sử dụng Selenium Grid cho các dự án của mình đó là:

* Các kịch bản test của bạn yêu cầu phải được kiểm tra trên nhiều trình duyệt khác nhau, nhiều hệ điều hành và trên nhiều máy test khác nhau trong cùng một lúc. Việc này để đảm bảo là các ứng dụng của bạn tương thích với các hệ điều hành cùng với các môi trường hoạt động khác nhau.

* Hai là, để tiết kiệm thời gian thực hiện bộ test case.  Ví dụ, ứng dụng của bạn cần phải test trên 4 trình duyệt khác nhau, thông thường cùng với 1 test case bạn phải chạy 4 lần, nhưng với Selenium Grid thì bạn chỉ cần chạy 1 lần thôi, đơn giản là đã nhìn ra được sự khác biệt rồi!

**Các thành phần cơ bản của Selenium Grid:**

**Hub:**   Trong selenium grid, Hub đóng vai trò là một máy tính trung tâm, nơi mà các kịch bản kiểm thử của bạn được load tới đó.
Mỗi Grid chỉ nên có một Hub, và Hub này được khởi chạy trên một máy duy nhất. Trên máy có chứa Hub, khi run các kịch bản kiểm thử bạn có thể quan sát được các thông tin automate trên các trình duyệt ở các node.

**Node:**   Nodes là các máy test được kết nối với máy Hub, nó sẽ thực hiện run các kịch bản kiểm thử mà bạn đã load lên Hub. Trong một grid bạn có thể xây dựng một hoặc nhiều node. Các node có thể khởi chạy được trên nhiều máy với nhiều nền tảng và trình duyệt khác nhau. Và nền tảng để run các máy test này không nhất thiết là phải giống với máy Hub.

![](https://images.viblo.asia/2b1f1add-2e86-42e1-9934-36345503179d.jpg)

**Install Selenium GRID**

Bước 1: Tải về bản Selenium Server mới nhất từ trang   http://www.seleniumhq.org/download/

Bước 2: Mở command prompt và đi đến folder – chính là nơi mà bạn đã lưu trữ Selenium server ở bước trên đó. Ở cửa sổ command này bạn gõ dòng lệnh sau:

java -jar selenium-server-standalone-2.41.0.jar -role hub

Bước 3. Tiếp tục gõ dòng lệnh: 

```
java -jar selenium-server-standalone-2.41.0.jar -role node -hub

http://localhost:4444/grid/register -port 5556
```

Chạy selenium server để start nodes.


**Browser and Nodes**

Sau khi starting hub và nodes,  bạn sẽ navigate đến GRID Console

Bạn sẽ tìm thấy 5 trình duyệt Chrome, 5 Firefox và 1 IE trong phần Trình duyệt như bên dưới.

![](https://images.viblo.asia/92a1d9ba-3c05-47c6-a330-af80add24ff8.jpg)

Bạn có thể sử dụng 5 trình duyệt Chrome, 5 Firefox và 1 IE. Ví dụ, nếu bạn chỉ muốn sử dụng IE, bạn có thể start nodes bằng cách sử dụng lệnh bên dưới:

```
java -jar selenium-server-standalone-2.41.0.jar -role webdriver -hub

http://localhost:4444/grid/register -port 5556 -browser browserName=iexplore
```

Verify loại trình duyệt với các loại khác trong GRID console bằng cách click vào xem config

![](https://images.viblo.asia/f779f14b-1b29-4325-bdbf-36f50e3936f0.jpg)

**Tương tự với Firefox:**

 Gõ lệnh:
 
```
java -jar selenium-server-standalone-2.41.0.jar -role webdriver -hub

http://localhost:4444/grid/register -port 5556 -browser browserName=firefox
```

![](https://images.viblo.asia/e2928c8d-0fd2-4cb3-8b3c-f6e33392d46d.jpg)

**Với Chrome:**

 Gõ lệnh:
 
```
java -jar selenium-server-standalone-2.41.0.jar -role webdriver -hub

http://localhost:4444/grid/register -port 5556 -browser browserName=chrome
```

![](https://images.viblo.asia/f8207618-49f8-41fb-95ca-50c4ec35727c.jpg)

Có một vài tình huống mà bạn có thể cần nhiều trình duyệt, ví dụ: IE, Chrome và Firefox.

 Gõ lệnh:
 
```
java -jar selenium-server-standalone-2.41.0.jar -role webdriver -hub

http://localhost:4444/grid/register -port 5556 -browser browserName=iexplore
```

-browser browserName=firefox -browser browserName=chrome]

![](https://images.viblo.asia/9a3184c3-cc16-4067-8a87-b3366a9d444a.jpg)

**maxInstances:**

maxInstance được sử dụng để giới hạn số lượng khởi tạo trình duyệt trong 1 node.

Ví dụ: nếu bạn muốn làm việc với 2 Firefox và 2 IE thì bạn có thể start node bằng maxInstance.

Gõ lệnh:

```
java -jar selenium-server-standalone-2.41.0.jar -role webdriver -hub

http://localhost:4444/grid/register -port 5556 -browser browserName=firefox,maxInstance=3
```

Maximum instance được verify dưới tab cấu hình

![](https://images.viblo.asia/6405e3b4-40f9-4b37-a8ac-db7978340730.jpg)

Tương tự, các trình duyệt khác có thể được configured bằng maxInstances.

**maxSession:**

maxSession được sử dụng để cấu hình số lượng trình duyệt có thể được sử dụng song song trong remote system.

Sử dụng lệnh:

```
java -jar selenium-server-standalone-2.41.0.jar -role webdriver -hub

http://localhost:4444/grid/register -port 5556 -browser browserName=chrome,maxInstance=3

-browser browserName=firefox,maxInstance=3 –maxSession 3
```

Bạn có thể start multiple nodes và cấu hình được verify trong bảng console

**NODE1:**

![](https://images.viblo.asia/70a34d40-c353-4528-8397-f701a3b1184c.jpg)

**NODE2:**

![](https://images.viblo.asia/c1242ba0-6d55-437a-898d-f662ef557897.jpg)

**Ví dụ về Grid Code:**
 
Ở đây mình đã thực hiện một sample test để đăng nhập vào Gmail và nhập tên người dùng và mật khẩu

```
public class GridExample {

     

    @Test

    public void mailTest() throws MalformedURLException{

        DesiredCapabilities dr=null;

        if(browserType.equals("firefox")){

        dr=DesiredCapabilities.firefox();

        dr.setBrowserName("firefox");

        dr.setPlatform(Platform.WINDOWS);

     

        }else{

            dr=DesiredCapabilities.internetExplorer();

            dr.setBrowserName("iexplore");

            dr.setPlatform(Platform.WINDOWS);

        }

             

        RemoteWebDriver driver=new RemoteWebDriver(new    URL(http://localhost:4444/wd/hub), dr);

        driver.navigate().to("http://gmail.com");

        driver.findElement(By.xpath("//input[@id='Email']")) .sendKeys("username");

        driver.findElement(By.xpath("//input[@id='Passwd']")) .sendKeys("password");

        driver.close();

     

}
```

**Configuration sử dụng JSON file:**

Grid có thể được launch bằng cách sử dụng JSON configuration file.

Tạo một tệp JSON để có cấu hình bên dưới. Ở đây mình đã tạo một tệp JSON có tên là Grid_hub.json

```
{
  "host": null,

  "port": 4444,

  "newSessionWaitTimeout": -1,

  "servlets" : [],

  "prioritizer": null,

  "capabilityMatcher":   "org.openqa.grid.internal.utils.DefaultCapabilityMatcher",

  "throwOnCapabilityNotPresent": true,

  "nodePolling": 5000,

  "cleanUpCycle": 5000,

  "timeout": 300000,

  "maxSession": 5

}
```

Start HUB bằng dòng lệnh dưới đây:

`java -jar selenium-server-standalone-2.41.0.jar -role hub –hubConfig grid_hub.json`

Tương tự, tạo tệp json khác cho các node khác nhau theo cấu hình yêu cầu.

Dưới đây là một ví dụ về tệp cấu hình JSON cho node có tên là Grid_node.json

```
{

  "capabilities":

      [

        {

          "browserName": "chrome",

          "maxInstances": 2

        },

        {

          "browserName": "firefox",

          "maxInstances": 2

        },

        {

          "browserName": "internet explorer",

          "maxInstances": 1

        }

      ],

    "configuration":

        {

        "nodeTimeout":120,

        "port":5555,

        "hubPort":4444,

        "hubHost":"localhost",

        "nodePolling":2000,

        "registerCycle":10000,

        "register":true,

        "cleanUpCycle":2000,

        "timeout":30000,

        "maxSession":5,

        }

}
```

**Để start node**

Sử dụng câu lệnh:

`java -jar selenium-server-standalone-2.41.0.jar -role rc –nodeConfig grid_node.json`

Bạn có thể thay đổi tất cả cấu hình của browser, maxInstances, port, maxSession, v.v. trong tệp JSON.

Bạn có thể cung cấp browser version, platform trong tệp JSON như bên dưới:

```
{
   “browserName”: “chrome”,”version”:”8”,”platform”:”Windows”
}
```

Link thanm khảo: 

https://vananhtooo.wordpress.com/2017/10/02/selenium-grid-install-va-cac-buoc-de-setup-hub-va-node/

https://vntesters.com/kiem-thu-tu-dong-selenium-grid/

Trên đây là chia sẻ của mình về Setup và 1 vài ví dụ về Cross Browser Testing. Cám ơn các bạn đã đọc, rất mong bài viết của mình có thể giúp đỡ phần nào những vướng mắc của các bạn!