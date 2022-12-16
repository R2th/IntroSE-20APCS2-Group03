### I. Giới thiệu
Khi thực hiện automation, vì yêu cầu hệ thống hay vì một vài lý do cá nhân mà chúng ta muốn thay đổi IP mỗi khi chạy automation.

Cách đơn giản nhất là set proxy trong capability cho browser, làm thế nào thì có thể tham khảo [tại đây](https://www.tutorialspoint.com/how-to-handle-proxy-in-selenium-in-java)

Tuy nhiên, sử dụng proxy có hạn chế là chúng ta chỉ có thể set proxy khi khởi tạo browser (Mình đã nghĩ đến trường hợp thêm 1 list proxy rồi get random ra chạy nhưng nó vẫn là có hạn và dễ bị trùng lặp), điều này có nghĩa là chúng ta chỉ có thể sử dụng proxy cho một lần chạy, nếu chúng ta chạy data-driven, một bộ data sẽ chỉ sử dụng chung một proxy. Vậy có cách nào để thay đổi IP cho mỗi test case hay không?

Hiện nay, có một số VPN extension hỗ trợ chúng ta trong việc này, nêu có thể thực hiện nó một cách thủ công, sao không thử áp dụng nó vào automation. 

Trong bài này mình sẽ sử dụng extension "Touch VPN" trên Chrome. Tuy nhiên, extension này không tự động chạy sau khi chúng ta cài đặt nó _(trên UI sẽ hiển thị như vậy nhưng khi kiểm tra thì IP không thay đổi)_, mà extension này yêu cầu phải thao tác trên popup của extension mới có thể sử dụng được. Hãy cùng tìm hiểu về cách khởi chạy extension này hoặc các extension có yêu cầu tương tự trong bài này.

### II. Hãy cùng thử thực hiện nó một cách thủ công

1. Đầu tiên, truy cập vào trang [Chrome extensions](https://chrome.google.com/webstore/category/extensions?hl=en)
2. Tìm kiếm "Touch VPN"
3. Chọn "Add to Chrome"
4. Sau khi đã add vào Chrome, click vào button extension bên góc phải Chrome
5. Chọn "Touch VPN - Secure and unlimited VPN proxy"
6. Ở cửa sổ popup, click vào "Connect"
7. Sau khi popup thay đổi sang "Encription is enabled" và hiển thị các thông số tức là đã sử dụng VPN thành công

![image](https://user-images.githubusercontent.com/51961513/114308298-86993600-9b0d-11eb-95f5-ec810264450b.png)

Ở bước (3), chúng ta bắt buộc phải click vào connect mới có thể sử dụng extension này, vậy làm sao để thực hiện auto trên pop-up này. Hãy cùng mình thử cách khác để thực hiện.

### III. Viết code để thực hiện các bước trên

Ở đây mình sẽ sử dụng Selenium với Java, TestNG và maven, các ngôn ngữ khác thì cách làm tương tự nhé.

**1. Tải VPN extension về máy**

File extension có dạng crx. Làm sao để download extension về máy thì có thể tham khảo [bài viết này](https://www.maketecheasier.com/download-save-chrome-extension/#:~:text=Using%20Chrome%20Extension%20Downloader&text=Just%20visit%20the%20website%2C%20enter,on%20the%20%E2%80%9CKeep%E2%80%9D%20button.)

Ở đây mình đã download sẵn extension này, các bạn có thể download **[tại đây](https://drive.google.com/file/d/1GLfWbvNuAqEwEbESkWIDlz-OODyGEKHf/view?usp=sharing)**

**2. Cài đặt các thư viện cần thiết**

Các thư viện bao gồm Selenium, TestNG, WebDriverManager, add các thư viện này vào file pom.xml. 

Add những thư viện này như thế nào và tại sao cần nó thì tham khảo phần II trong [bài trước của mình nhé](https://github.com/npmtam/Automation-Testing-Articles/issues/2)

**3. Tạo class để thực hiện các bước trên**

- Đầu tiên, đưa file crx vừa download ở bước (1) vào folder của dự án, ở đây mình sẽ đưa vào _"main/resources/"_

![image](https://user-images.githubusercontent.com/51961513/114309099-3bcced80-9b10-11eb-83a9-47d5dc0063de.png)

- Tiếp theo, khai báo annotation @BeforeTest và cấu hình cho Chrome driver:

```
    @BeforeTest
    public void beforeTest(){
        String rootFolder = System.getProperty("user.dir");
        File vpn = new File(rootFolder + File.separator + "src" + File.separator + "main" + File.separator + "resources" + File.separator + "touchVPN.crx");
        WebDriverManager.chromedriver().setup();
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.addExtensions(vpn);
        driver = new ChromeDriver(chromeOptions);
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    }
```

> - rootFolder là đường dẫn đến thư mục dự án
> - vpn là đường dẫn đến file crx vừa download phía trên mà mình đã bỏ vào "/main/resources/touchVPN.crx". Việc sử dụng File.seperator là để chúng ta có thể chạy trên nhiều OS khác nhau, vì mỗi OS khác nhau sẽ có dấu đường dẫn khác nhau (trên Linux là "\")
> - Khai báo ChromeOptions để add Extension Touch VPN
> - Khai báo implicit wait bằng 30 giây

- Tiếp theo, viết một method @Test để thực hiện truy cập vào index page của extension, nhấn vào connect (bước 6, phần II ở trên)

```
    @Test
    public void checkIPHasChanged() throws InterruptedException {
        //Chờ 2s để script chạy ổn định hơn
        Thread.sleep(2000);
        String extension_Protocol = "chrome-extension";
        String extension_ID = "bihmplhobchoageeokmgbdihknkjbknd";

        //Truy cập vào index page thay vì mở click vào extension để mở popup, index page sẽ có dạng extension protocol + extension ID + /panel/index.html
        String indexPage = extension_Protocol + "://" + extension_ID + "/panel/index.html";

        //Truy cập vào index page vừa khai báo phía trên
        driver.get(indexPage);

        //Vì khi sử dụng extension, extension sẽ tự mở một page của extension nên chúng ta cần switch lại tab đầu tiên (tab index page)
        //Khai báo các tabs đang mở
        ArrayList<String> tabs = new ArrayList<String>(driver.getWindowHandles());
        //Switch về tab đầu tiên
        driver.switchTo().window(tabs.get(0));

        //Click vào nút connect
        driver.findElement(By.id("ConnectionButton")).click();


        //Truy cập vào "https://whatismyipaddress.com/" để kiểm tra IP đã đổi hay chưa
        driver.get("https://whatismyipaddress.com/");

        //Switch về tab đầu tiên (whatismyipaddress.com) vì extension tự mở tab mới của extension
        driver.switchTo().window(tabs.get(0));

        //Kiểm tra thông tin Country ở trang này không còn là Vietnam nữa (tức là IP đã được đổi)
        String countryName = driver.findElement(By.xpath("//span[text()='Country:']/following-sibling::span")).getText();
        Assert.assertFalse(countryName.equals("Vietnam"));
    }
```

> - Chúng ta không thể thực hiện auto cho pop-up khi click vào extension rồi nhấn connect, vì vậy ở đây chúng ta truy cập vào **index page** của extension đó thay vì click vào extension. index page sẽ có dạng  _extension protocol + extension ID + /panel/index.html_
> - extension ID lấy ở đâu? extension ID có thấy lấy từ Chrome Extension page
> ![image](https://user-images.githubusercontent.com/51961513/114310605-771deb00-9b15-11eb-95fc-83646baaa19c.png)
> - Sau khi khởi tạo browser với extension, extension sẽ tự khởi tạo một page của extension, vì vậy chúng ta phải switch về lại page muốn thao tác, ở đây là index page và _"https://whatismyipaddress.com/"_
> - Sau khi truy cập vào _"https://whatismyipaddress.com/"_, kiểm tra nếu như country không phải Vietnam, tức là chúng ta đã thay đổi IP thành công, IP đang sử dụng đã không còn ở Vietnam nữa
> ![image](https://user-images.githubusercontent.com/51961513/114310732-fca19b00-9b15-11eb-954d-88a4cd1966d0.png)


- Sau cùng là đóng browser

```
    @AfterTest
    public void afterTest(){
        driver.quit();
    }
```

Nếu chúng ta đặt step này trước mỗi test case, sẽ có thể thay đổi IP (sử dụng VPN) cho từng test cases. Cách này tuy sẽ tốn thời gian hơn nhưng sẽ xử lý được vấn đề. 

### IV. Kết

Tất nhiên việc sử dụng proxy chỉ là hy hữu, truy nhiên, **chúng ta có thể tham khảo việc truy cập index page của extension cho các extension khác yêu cầu click vào icon để có thể thao tác**, vì không phải extension nào cũng chỉ cần cài đặt là có thể sử dụng ngay được. 

Hy vọng bài viết này sẽ giúp ích cho bạn khi các bạn gặp các vấn đề tương tự

**Referencies:**
https://github.com/npmtam/Automation-Testing-Articles/issues/3