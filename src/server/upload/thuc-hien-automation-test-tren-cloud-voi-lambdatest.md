### I. Giới thiệu
Hiện nay, các dịch vụ cross browser software testing tool (cloud testing) đang rất phổ biến. Nói một cách nôm na, các dịch vụ này cung cấp device cho chúng ta để thực hiện test trên đó, và các device này là device thực được kết nối với hệ thống của họ. 
Ví dụ chúng ta cần test một website trên MacOS nhưng chúng ta không có Macbook hoặc iMac để test, thì chúng ta có thể sử dụng các hệ thống này để thực hiện test ngay trên browser, giống như ta đang remote vào một chiếc macbook từ trình duyệt vậy.

Không chỉ desktop OS, nó còn hỗ trợ rất nhiều đời máy smartphone để chúng ta có thể thực hiện test ngay trên browser của chúng ta. Việc thực hiện test trên nhiều devices (compatibility) sẽ rất khó khăn nếu chúng ta không có đủ device để test, thì hệ thống này sẽ là một giải pháp hữu ích

Ngoài ra, các hệ thống này còn hỗ trợ chúng ta trong việc chạy automation test trên nhiều OS/browser khác nhau mà và chúng ta có thể run từ chính máy local của chúng ta và các thao tác sẽ được thực hiện trên cloud. Mọi kết quả test, video, screenshot sẽ được lưu lại ngay trên cloud để chúng ta có thể kiểm soát và team member có thể kiểm tra kết quả một cách dễ dàng.

Có thể liệt kê đến các hệ thống hỗ trợ cloud testing phổ biến hiện tại như: [browserstack](https://www.browserstack.com/), [saucelabs](https://saucelabs.com/), [AWS device farm](https://aws.amazon.com/device-farm/), [Lambdatest](https://www.lambdatest.com/), etc ...


### II. Thực hiện automation test trên Lambdatest

Hệ thống thì nhiều, nhưng hiện tại mình thấy lambdatest đang có chương trình khá hay, free 15 phút automation và 15 ngày free trial cho bạn nào muốn trải nghiệm, hơn nữa lại không yêu cầu email doanh nghiệp để có thể sử dụng được free trial. Nên hôm nay mình sẽ làm hướng dẫn trên lambdatest

**1. Đăng ký tài khoản**

Đầu tiên thì chúng ta phải đăng ký tài khoản trên Lambdatest:
- Truy cập vào https://www.lambdatest.com/
- Chọn "Start Free Testing"
- Có thể signup bằng tài khoản Google cho lẹ
![image](https://user-images.githubusercontent.com/51961513/119314732-45b14700-bc9f-11eb-9682-54812c34fcb3.png)
- Tiếp đến là điền info company 
![image](https://user-images.githubusercontent.com/51961513/119316632-637fab80-bca1-11eb-81b7-7d1c126bcebc.png)

Vậy là đã xong, bây giờ chúng ta có thể sử dụng account này để thực hiện live test (manual) hoặc automation test trên Lambdatest
![image](https://user-images.githubusercontent.com/51961513/119316866-accffb00-bca1-11eb-827a-ca0147800504.png)

**2. Tạo project để run trên cloud**

**2.1. Test case demo**

Trước tiên sẽ là đề bài, mình sẽ thực hiện một test case đơn giản trên site http://demo.guru99.com/
Các bước sẽ là:
- Truy cập vào http://demo.guru99.com/
- Nhập random email
- Click submit
- Tại đây hệ thống sẽ tự động generate ra username & password
- Lấy username và password ở bước trên để đăng nhập vào hệ thống
- Xác minh đăng nhập thành công

**2.2. Tạo project**

Vẫn như thường lệ, mình sử dụng Selenium với Java và TestNG để demo. 
Việc thực hiện automation test trên cloud này chúng ta có thể run ngay từ source code trên máy local mà không cần đụng gì đến service trên cloud hết.

Đầu tiên mình sẽ tạo một maven project, tiếp theo input các dependencies cần thiết như selenium, testNG nhé
```
<dependencies>
        <!-- TestNG -->
        <dependency>
            <groupId>org.testng</groupId>
            <artifactId>testng</artifactId>
            <version>6.8.8</version>
        </dependency>
        <!-- Selenium Java -->
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-java</artifactId>
            <version>3.141.59</version>
        </dependency>
        <dependency>
            <groupId>org.seleniumhq.selenium</groupId>
            <artifactId>selenium-support</artifactId>
            <version>3.141.59</version>
        </dependency>
</dependencies>
```

**2.3. Thực hiện viết test cases**

Tiếp theo, mình sẽ tạo một class để run thử trên Lambdatest có tên là **LambdatestCloud.java**

Để có thể thực hiện kết nối giữa máy local của mình và device trên cloud, chúng ta cần cấu hình một vài thông số liên kết giữa local và cloud:

Các bạn truy cập [vào đây](https://www.lambdatest.com/capabilities-generator/), đăng nhập với account đã được tạo ở bước trên, chọn mục **Username and Access Keys** và copy giá trị của **Hub** `(1)`

Tiếp theo phải xác định môi trường và cấu hình của device/browser mà mình muốn chạy trên lambdatest.
Các bạn chọn vào mục **OS/Browser Configuration** và chọn cấu hình của device/browser mà mình muốn run test, hệ thống sẽ tự động generate ra các capability tương ứng.

Ví dụ mình muốn sử dụng OS là Windows, chạy trên Chrome browser version 91.0, mình chỉ cần chọn ở dropdown và các capabilities sẽ được tự động generate ở cột bên phải, copy các giá trị capabilities này `(2)`: 
![image](https://user-images.githubusercontent.com/51961513/119364627-49fa5600-bcd9-11eb-97d0-f80c7d4bb08d.png)

Ok, bắt tay vào viết hàm setup môi trường nào. method **setupEnvironment** được gán annotation @BeforeTest phía trên nên sẽ được chạy đầu tiên để setup môi trường. Các bạn chỉ cần copy các capability được generate phía trên ra, không cần phải setup driver lằng nhằng như khi chúng ta chạy trên local:

```
public class LambdatestCloud {
    private WebDriver driver;

    @BeforeTest
    public void setupEnvironment(){
        //Copy đường dãn hub được lấy ở trang https://www.lambdatest.com/capabilities-generator/ và dán vào đây (abc123 là access token demo)
        String hub = "https://nguyenphucminhtam:abc123@hub.lambdatest.com/wd/hub";

        DesiredCapabilities capabilities = new DesiredCapabilities();

        //Tên build & name sẽ được hiển thị lên kết quả/ report khi chúng ta chạy xong
        capabilities.setCapability("build", "Run test on lambdatest");
        capabilities.setCapability("name", "Tam Nguyen");
        capabilities.setCapability("platform", "Windows 10");
        capabilities.setCapability("browserName", "Chrome");
        capabilities.setCapability("version","91.0");
        capabilities.setCapability("visual",true);

        try {
            driver = new RemoteWebDriver(new URL(hub), capabilities);
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }

        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
    }
```
Tại đây, hub là giá trị mà chúng ta đã copy ở bước `(1)`, và các capability đã được copy ở bước `(2)`

Tiếp theo, thực hiện viết test case như đã nói ở phần **2.2.**

```
    @Test
    public void runTestDemoGuru(){
        //Truy cập vào trang http://demo.guru99.com/
        driver.get("http://demo.guru99.com/");

        //Nhập random email vào textbox
        driver.findElement(By.xpath("//input[@name='emailid']")).sendKeys("tam" + getRandomNumber() + "@mail.com");

        //Click vào nút submit
        driver.findElement(By.xpath("//input[@name='btnLogin']")).click();

        //Hệ thống sẽ tự động generate ra 2 giá trị userID và password, lưu 2 giá trị này vào biến tương ứng
        String userID = driver.findElement(By.xpath("//td[text()='User ID :']/following-sibling::td")).getText();
        String password = driver.findElement(By.xpath("//td[text()='Password :']/following-sibling::td")).getText();

        //Truy cập vào Bank Project từ menu
        driver.findElement(By.xpath("//a[text()='Bank Project']")).click();

        //Nhập userID và password đã lấy được ở phía trên
        driver.findElement(By.xpath("//input[@name='uid']")).sendKeys(userID);
        driver.findElement(By.xpath("//input[@name='password']")).sendKeys(password);

        //Click login button
        driver.findElement(By.xpath("//input[@name='btnLogin']")).click();

        //Xác minh đăng nhập thành công = element Manager đã xuất hiện
        Assert.assertTrue(driver.findElement(By.xpath("//a[text()='Manager']")).isDisplayed());
    }
    
    @AfterTest
    public void cleanUp(){
        driver.quit();
    }

    public int getRandomNumber(){
        Random rand = new Random();
        int randomNumber = rand.nextInt(50);
        return randomNumber;
    }
```

Vậy là coi như đã xong, bây giờ chúng ta có thể run test trực tiếp từ class này và xem kết quả.
Tất nhiên chúng ta setup để run trên lambdatest nên khi chạy sẽ không có browser nào được khởi động ở local cả.

Chúng ta sẽ đăng nhập vào [đây](https://automation.lambdatest.com/), chọn mục **"Automation"** từ menu và xem kết quả đã được tự động lưu lại dưới dạng video:

![image](https://user-images.githubusercontent.com/51961513/119369486-6c42a280-bcde-11eb-8caf-9a3145c952aa.png)

Ngoài ra còn có các thông số khác như thời gian chạy, screenshot, logs, .... các bạn đăng nhập vào để tìm hiểu thêm nhé.

### III. Kết
Ngày nay, các hệ thống cloud testing đang cung cấp một giải pháp rất hữu ích dành cho cá nhân/doanh nghiệp khi thực hiện test trên nhiều device khác nhau mà không cần phải bỏ tiền ra mua device. Ngoài ra còn có thể tích hợp với automation để làm việc theo team và run test một cách hiệu quả với tất cả các dữ liệu cần thiết được lưu lại. 

Cloud service như này đang là một xu thế tất yếu của testing trong thời gian tới, mong rằng bài viết này sẽ đưa được các kiến thức cơ bản đến các bạn. 

Lambdatest đang có freetrial cho user, chần chừ gì nữa, hãy thử setup theo hướng dẫn và trải nghiệm thôi