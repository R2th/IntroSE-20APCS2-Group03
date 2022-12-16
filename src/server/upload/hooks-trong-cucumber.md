## Hooks là gì?

   Hooks là các đoạn code chạy trước hoặc sau mỗi kịch bản test. Bạn có thể định nghĩa chúng ở bất cứ đâu trong dự án hoặc các step. 
Hooks cho phép chúng ta quản lý tốt hơn quy trình làm việc của mã  nguồn và giúp giảm sự dư thừa code. Hooks cho phép chúng ta thực hiện các kịch bản test một cách rõ ràng hơn.

Vì sao chúng ta cần sử dụng Hooks?
 
- Thông thường khi thực hiện test một dự án, các bạn sẽ gặp phải những kịch bản phải sử dụng lặp đi lặp lại cho một testcase ví dụ như:
    - Khởi động webdriver.
    - Tạo kết nối đến Database
    - Khởi tạo test data.
    - Xóa hoặc cài đặt cookies cho trình duyệt.
    - Mở một website.
    
 - Tương tự với đó thì khi kết thúc các testcase có thể chúng ta cũng phải làm những việc như sau:
      - Đóng trình duyệt.
      - Đóng kết nối với database
      - Xóa cookies trình duyệt.
      - Chụp ảnh nếu xảy ra lỗi.
      - Gửi mail, hoặc log bug lên các công cụ quản lý như jira..
      
 - Nếu mỗi testcase chúng ta đều phải thực hiện những điều trên thì có thể gây ra dư thừa code, dài dòng và khó bảo trì sau này.  Vì vậy cucumber đưa ra khái niệm Hooks.
 
 - Không giống như TestNG, cucumber chỉ hỗ trợ duy nhất 2 annotation là @Before và @After. 
     - @Before thực thi các đoạn code trước mỗi test scenario
     - @After thực hiện các đoạn code sau mỗi scenario.
     
 - Cách sử dụng hooks raart đơn giản, Bạn chỉ cần đặt annotation @Before hoặc @After phía trước phương thức.
     ```
    import cucumber.api.java.en.Given;
    import cucumber.api.java.en.Then;
    import cucumber.api.java.en.When;
    import cucumber.api.java.After;
    import cucumber.api.java.Before;
    public class Hooks_Steps {
     @Before
        public void beforeScenario(){
            System.out.println("This will run before the Scenario");
        } 
     @Given("^this is the first step$")
     public void This_Is_The_First_Step(){
     System.out.println("This is the first step");
     }

     @When("^this is the second step$")
     public void This_Is_The_Second_Step(){
     System.out.println("This is the second step");
     }

     @Then("^this is the third step$")
     public void This_Is_The_Third_Step(){
     System.out.println("This is the third step");
     }
     @After
        public void afterScenario(){
            System.out.println("This will run after the Scenario");
        }
        }
     ```
## Đa trình duyệt với Hook
- Thông thường trước mỗi testcase chúng ta đều phải khởi tạo webdriver để thực hiện test bằng cách setup System và trỏ đường dẫn tới file driver.

- Tuy nhiên, trong trường hợp bạn chuyển code sang máy khác để chạy hoặc trình duyệt trên máy bạn thay đổi phiên bản, đơn giản hơn là bạn chỉ muốn chuyển từ chrome sang firefox để thực hiện testcase. 
- Lúc đó bạn phải trỏ lại đường dẫn, chỉnh sửa System rất là mất thời gian và dễ gây nhầm lẫn. Vì vậy hôm nay mình muốn giới thiệu cho các bạn thư viện webdrivermanager của Bonigarcia.
- Để sử dụng được thư viện này chúng ta thêm vào file pom như sau:
    ```
            <!-- https://mvnrepository.com/artifact/io.github.bonigarcia/webdrivermanager -->
            <dependency>
                <groupId>io.github.bonigarcia</groupId>
                <artifactId>webdrivermanager</artifactId>
                <version>3.6.2</version>
            </dependency>
    ```
 - Tiếp theo chúng ta sẽ định nghĩa Before hook như sau:
     ```
    @Before
        public void BeforeScenario() {
            String webdriver = System.getProperty("webdriver", "firefox");
            switch (webdriver) {
                case "chrome":
                    WebDriverManager.chromedriver().setup();
                    driver = new ChromeDriver();
                    break;
                case "firefox":
                    WebDriverManager.firefoxdriver().setup();
                    driver = new FirefoxDriver();
                    break;
                case "opera":
                    WebDriverManager.operadriver().setup();
                    driver = new OperaDriver();
                    break;
                case "edge":
                    WebDriverManager.edgedriver().setup();
                    driver = new EdgeDriver();
                    break;
                case "ie":
                    WebDriverManager.iedriver().setup();
                    driver = new InternetExplorerDriver();
                default:
                    throw new RuntimeException("Unsupported webdriver" + webdriver);
            }
            driver.manage().deleteAllCookies();
            driver.manage().window().maximize();
        }
    ```

- Ở trên, nếu chạy test thông thường thì webdriver manger sẽ tự động tìm phiên bản firefox tương ứng trên máy của bạn để tải webdriver về phục vụ cho việc test.
- Nếu muốn thay đổi trình duyệt. Bạn có thể chạy với cmd bằng cách set biến -Dwebdriver
    ```
    $mvn clean test -Dwebdriver=chrome
    ```
## Chụp ảnh màn hình, chèn file vào report.
- Để chụp lại ảnh màn hình các bạn thêm vào @After phương thức sau:
    ```
    @After
        public void AfterScenario(Scenario scenario){
            if(scenario.isFailed())
            {
            try{
                  byte[] screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.BYTES);
                  scenario.embed(screenshot, "image/png");
                  }
            catch(Exception e){
                 e.printStackTrace();
            }
        }
        driver.quit();
     }
    ```
- Để nhúng một file vào test report các bạn thêm vào phương thức sau:
    ```
    @After
        public void AfterScenario(Scenario scenario){
            try{
                    String path = "README.md;
                    byte[] encoded = Files.readAllBytes(Paths.get(path));
                    scenario.embed(encoded,"text/markdown");
                  }
            catch(Exception e){
                 e.printStackTrace();
            }
        driver.quit();
     }
    ```
- Ở 2 ví dụ trên nếu kết hợp lại các bạn sẽ thấy, lý thuyết khi embed bất cứ 1 file nào vào test report ( ảnh, text,..vv) là:
    - chuyển file đó sang dạng byte.
    - embed file với mimetype tương ứng. 
    - (Để biết mimetype của file các bạn có thể vào https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types )