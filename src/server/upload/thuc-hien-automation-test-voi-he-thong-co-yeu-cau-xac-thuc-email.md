### I. Yêu cầu:

Việc đăng ký, đăng nhập là một thủ tục rất quen thuộc trong các hệ thống. Trong khi đó, nhiều hệ thống yêu cầu xác thực email khi đăng ký tài khoản. Khi bạn thực hiện test hệ thống, chắc đã quá quen với việc đăng ký và xác thực này. 

Tuy nhiên, số lượng email cá nhân là có hạn, vậy làm sao có đủ email để thực hiện test đi test lại chức năng này, chưa kể khi test các chức năng phía sau cần phải đăng nhập vào, có thể nói số lượng email phải sử dụng là rất lớn. Vì vậy chúng ta có các dịch vụ disposable email (nôm na là email sử dụng một lần), chắc hẳn nhiều bạn đã quen với các dịch vụ/hệ thống này, vậy nay mình xin liệt kê lại một vài website có hỗ trợ disposable email:

**Các hệ thống disposable email phổ biến:** 
- [mailsac.com/](https://mailsac.com/)
- [qa.team](http://qa.team/)
- [yopmail.com](http://www.yopmail.com/en/)
- [temp-mail.org](https://temp-mail.org/en/)
- [temp-mail.io](https://temp-mail.io/en/)
- .........

**Vậy cách thức thực hiện như nào?** 

Thông thường, disposable email mình có thể tự nhập tên email, phía sau @ sẽ sử dụng domain của các hệ thống này. 
Ví dụ với qa.team, khi đăng ký chúng ta có thể sử dụng email tam.nguyen@qa.team để đăng ký, sau đó vào qa.team nhập tam.nguyen và có thể nhận các email bình thường.

Đối với hệ thống temporary email như https://temp-mail.org, hệ thống sẽ tự generate email cho chúng ta, chúng ta chỉ việc copy email đó để đăng ký và quay lại hệ thống để nhận mail. 

### Vậy thực hiện automation với hệ thống có yêu cầu email verification thì thế nào?

Tương tự như manual, chúng ta có thể thực hiện nó ngay trên tầng UI. Manual như nào thì chúng ta có thể thực hiện với automation như vậy. Mặc dù các hệ thống này có support API, tuy nhiên để gần với user behavior nhất thì trong bài viết này mình sẽ sử dụng Selenium Java để thực hiện automation ngay trên UI. 

### II. Sử dụng Selenium java để thưc hiện automate cho hệ thống yêu cầu email verification

Hãy cùng thử viết một project automation cho website **[https://playground.mailslurp.com/](https://playground.mailslurp.com/)**

**1. Import các thư viện cần thiết** 

Đầu tiên, hãy cũng tạo một project demo cho yêu cầu này. Mình sử dụng Maven project và add các depedencies cần thiết vào:
Ở đây chỉ là thư viện của Selenium, TestNG và WebDriverManager để quản lý webdriver

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
        <dependency>
            <groupId>io.github.bonigarcia</groupId>
            <artifactId>webdrivermanager</artifactId>
            <version>3.6.0</version>
        </dependency>
    </dependencies>
```

**2. Các bước đăng ký có verify email cho website demo https://playground.mailslurp.com/**

Các bước manual ở đây sẽ như sau:

**1. Đăng ký**
- Nhập email
- Nhập password
- Mở tab mới và truy cập https://mailsac.com/
- Điền email vừa dùng để đăng ký
- Mở mailbox
- Lấy confirmation code
- Quay lại website https://playground.mailslurp.com/
- Nhập confirmation code 
- Nhấn Đăng ký

![register](https://user-images.githubusercontent.com/51961513/113724160-45bfac80-971c-11eb-88e9-e7783f469bc3.png)


**2. Đăng nhập**
- Điền email vừa đăng ký
- Nhập password
- Nhấn nút đăng nhập
- Kiểm tra đăng nhập thành công

![login](https://user-images.githubusercontent.com/51961513/113724189-4eb07e00-971c-11eb-88df-156852dbd367.png)

Tương tự như vậy, bắt tay vào viết 1 class để chạy nhé

**2. Viết class test để thực hiện automate cho các step bên trên**

Ở đây mình có một class sử dụng Java, Selenium và TestNG để automate các bước phía trên như sau:

```
public class DisposableEmail {
    private WebDriver driver;
    private String email, password, emailContent, confirmationCode;
    private JavascriptExecutor jsExecutor;

    /**
     * Hàm này chạy trước mọi method khác
     * Gán và khởi tạo Chrome driver
     * Khai báo hàm jsExecutor để sử dụng javascript executor
     * gán giá trị random cho email tránh trùng lặp dữ liệu
     * gán giá trị cho password
     */
    @BeforeClass
    public void beforeTest(){
        //Sử dụng thư viện WebDriverManager để phát hiện phiên bản chrome đang dùng, từ dó tự động download phiên bản webdriver tương ứng
        WebDriverManager.chromedriver().setup();
        
        //Khởi tạo driver
        driver = new ChromeDriver();
        
        //Phóng to màn hình chrome để script có thể chạy ổn định hơn
        driver.manage().window().maximize();
        
        //Set implicitwait, bạn nào chưa hiểu về wait thì google thêm nhé
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
        
        //Khởi tạo jvavascript executor
        jsExecutor = (JavascriptExecutor) driver;
        
        //Gán giá trị cho email và password. Ở đây email mình sử dụng thêm randomNumber để tránh trùng email khi chạy nhiều lần
        email = "tam.nguyen" + randomNumber() + "@mailsac.com";
        password = "12345678";
    }

    /**
     * Đăng ký tài khoản và xác minh địa chỉ email
     */
    @Test(priority = 1)
    public void registerAccount(){
        //Truy cập vào website demo
        driver.get("https://playground.mailslurp.com/");

        //Click vào register account link
        driver.findElement(By.xpath("//a[text()='Create account']")).click();

        //Điền vào email textbox - email là biến đã được gán số random ở trên, email sẽ có dạng tam.nguyen123@mailsac.com
        driver.findElement(By.xpath("//input[@name='email']")).sendKeys(email);

        //Điền vào password textbox = 12345678
        driver.findElement(By.xpath("//input[@name='password']")).sendKeys(password);

        //Click vào nút "Create account"
        driver.findElement(By.xpath("//button[text()='Create Account']")).click();

        //Sử dụng javascript executor để mở một tab mới và truy cập website mailsac.com
        jsExecutor.executeScript("window.open('http://mailsac.com','_blank');");

        //Lấy các tabs hiện tại đang có và switch qua tab có index = 1, lúc này mailsac.com đang ở tab thứ 2 nên sẽ có index = 1
        ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());
        //Switch qua tab mailsac.com vừa mở
        driver.switchTo().window(tabs.get(1));

        //Điền email mới đăng ký vào textbox
        driver.findElement(By.xpath("//input[@placeholder='anything']")).sendKeys(email);

        //Nhập vào nút "Check the email" để truy cập mailbox
        driver.findElement(By.xpath("//button[@class='btn btn-primary']")).click();

        //Click vào mail để mở nội dung email
        driver.findElement(By.xpath("//td[@class='col-xs-5 ng-binding']")).click();

        //lấy text của nội dung email và gán cho biến "emailContent"
        emailContent = driver.findElement(By.xpath("//div[@class='ng-binding ng-scope']")).getText();

        //Sử dụng regex để xác định dãy số có 6 chữ số trong email content
        Pattern date = Pattern.compile("[0-9]{6}");
        Matcher matcher = date.matcher(emailContent);
        matcher.find();
        
        //Gán giá trị số có 6 chữ số (confirmation code) cho biến confirmationCode
        confirmationCode =emailContent.substring(matcher.start(), matcher.end());

        //Switch về lại tab playground.mailslurp.com (index = 0)
        driver.switchTo().window(tabs.get(0));

        //Điền confirmation code
        driver.findElement(By.xpath("//input[@name='code']")).sendKeys(confirmationCode);

        //Click to Confirm button
        driver.findElement(By.xpath("//button[text()='Confirm']")).click();
    }

    /**
     * Đăng nhập vào hệ thống bằng email vừa mới đăng ký ở bước trên
     */
    @Test(priority = 2)
    public void loginToSystem(){
        //Truy cập lại website
        driver.get("https://playground.mailslurp.com/");

        //Điền email vừa đăng ký
        driver.findElement(By.xpath("//input[@name='username']")).sendKeys(email);

        //Điền password
        driver.findElement(By.xpath("//input[@name='password']")).sendKeys(password);

        //Click sign in button
        driver.findElement(By.xpath("//button[text()='Sign In']")).click();

        //Kiểm tra đăng nhập thành công
        //Kiểm tra màn hình welcome xuất hiện
        Assert.assertTrue(driver.findElement(By.xpath("//h1")).getText().equals("Welcome"));
    }

    @AfterClass
    public void afterTest(){
        driver.quit();
    }

    /**
     * Hàm sinh ra random number
     * @return randomNumber để gán vào email, tránh bị trùng lặp email khi chạy nhiều lần
     */
    public int randomNumber(){
        Random random = new Random();
        int randomNumber = random.nextInt();
        return randomNumber;
    }
}
```

Ở phía trên, hầu hết các câu lệnh đã được giải thích trong comment, hầu hết là thực hiện các bước y như manual. Nếu các bạn có câu hỏi nào có thể google hoặc để lại comment nhé

Ở đây mình chỉ tạo một class viết step by step, mọi người tự áp dụng vào framework của mình nhé

Referencies:
https://github.com/npmtam/Automation-Testing-Articles/issues/2