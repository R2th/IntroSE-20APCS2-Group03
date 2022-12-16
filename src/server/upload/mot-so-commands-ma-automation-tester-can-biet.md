Hiện nay, sự phát triển bùng nổ của rất nhiều các ứng dụng web, vì thế mà các yêu cầu về nhân lực trong mảng này cũng đòi hỏi cần phải có kỹ năng tốt hơn nữa về lập trình, technical, các kỹ năng về automation, và nhiều thứ khác nữa…
Để đáp ứng nhu cầu công việc, cũng như sự cần thiết về việc nâng cao và phát triển sâu, rộng hơn về các kỹ năng chuyên môn, nhiều Manual tester đã có những cân nhắc trong việc bước sang mảng Automation nhiều thách thức cũng nhiều cơ hội hơn. Một số tool được dùng trong Automation Testing như : Selenium, HP QTP/UFT, TestComplete, IBM Rational Functional Tester, Ranorex, Jmetter, SoapUI, Appium, … rất nhiều. Các bạn chỉ cần gõ từ khóa đơn giản là ‘automation testing tools’ thì google sẽ tìm ra cho bạn rất rất nhiều kết quả cho bạn tham khảo, tìm hiểu, vấn đề là việc tiếp cận với nó như thế nào mà thôi. Sau khi mình tham khảo, tìm hiểu các tools thì mình quyết định theo đuổi Selenium để giúp mình trong học tập cũng như công việc trong tương lai.  Ở bài viết này , mình sẽ giới thiệu cho các bạn biết một số commands cơ bản để chúng ta có thể viết những script Selenium WebDriver cơ bản nhất.
# 1. get() 
**Cú pháp :** 


-----

    driver.get("https://www.facebook.com");


-----



**Giải thích :** Điều hướng tới URL https://www.facebook.com
# 2. getCurrentUrl()
**Cú pháp :** 

-----

    driver.getCurrentUrl();

-----


Thường sử dụng phương pháp này trong các lệnh để kiểm tra xem  đã điều hướng đến đúng trang như mong đợi hay chưa. Để làm được điều đó, chúng ta phải sử dụng Assert như trong **ví dụ** dưới đây

**Cú pháp**: 


-----

    Assert.assertEquals(expectedUrl,  driver.getCurrentUrl());


-----



Trong đó expectedUrl là URL được mong đợi ở định dạng chuỗi.

**Giải thích:**

Kiểm tra và xác minh rằng URL được tải vẫn giữ nguyên và trang chính xác được tải.
# 3. findElement(By, by), sendKeys() và click()


- **Tìm vị trí của phần tử bằng ID**


-----

    driver.findElement(By.id("email")).sendKeys("nguyenanh@gmail.com")

-----


- **Tìm vị trí của phần tử bằng className**

-----

    driver.findElement(By.className("test")).sendKeys("nguyenanh"); 

-----

- **Tìm vị trí của phần tử bằng linkText**


-----

    driver.findElement(By.linkText("Trouble Signing in?")).click();

-----


- **Tìm vị trí của phần tử bằng partiallinkTex**


-----

    driver.findElement(By.partiallinkText("Trouble")).click();

-----


- **Tìm vị trí của phần tử bằng cssSelector**


-----

    driver.findElement(By.cssSelector("#login-signin")).click();

-----

- **Tìm vị trí của phần tử bằng xpath**


-----


    driver.findElement(By.xpath("//input[@id='q']")).sendKeys("Selenium");


-----
# 4. getTitle() 
**Cú pháp**


-----
    String title = driver.getTitle();
     System.out.println(title);

-----

**Giải thích :** 
- Lấy tiêu đề của trang web và lưu trữ nó trong tiêu đề đối tượng String.
- In giá trị được lưu trong tiêu đề vào nhật ký đầu ra.


# 5. navigate()
**Cú pháp**


-----
    driver.navigate().to("https://www.facebook.com");
     driver.navigate().back();
     driver.navigate().forward();
     driver.navigate().refresh();

-----

**Giải thích :** 

- Điều hướng tới https://www.facebook.com
- Back về trang trước đó
- Chuyển tiếp tới trang trước đó
- Tải lại trang hiện tại

# 6. manage().window().maximize();
**Cú pháp :** 


-----

    driver.manage().window().maximize();


-----



**Giải thích :** Phóng to cửa sổ trình duyệt
# 7. implicitlyWait()
**Cú pháp :** 


-----

    driver.manage().timeouts().implicitlyWait(1000, TimeUnit.SECONDS);


-----



**Giải thích :** 
- Wait cho page được render thành công sau 1000s
- Nếu sau 1000s vẫn chưa xong thì sẽ throw ra exception.

# 8. pageLoadTimeout(time,unit)
**Cú pháp :** 


-----

    driver.manage().timeouts().pageLoadTimeout(500, SECONDS);


-----



**Giải thích :** Đợi 500 giây để tải trang.

# 9. close() and quit()

**Cú pháp :** 


-----

    driver.close();
    driver.quit();


-----



**Giải thích :** 
- Đóng cửa sổ hiện tại.

- Thoát khỏi thể hiện trình điều khiển này, đóng mọi cửa sổ liên quan, được mở.

#  Ví dụ script WebDriver đơn giản.



-----

    package automationtest;

    
    import org.openqa.selenium.By;
    import org.openqa.selenium.WebDriver;
    import org.openqa.selenium.chrome.ChromeDriver;
   


    public class Practice {
    
    public static WebDriver driver;
       
    public static void main(String[] args) {

    System.setProperty("webdriver.gecko.driver","D:\\TuanBin\\chromedriver_win32");
   	WebDriver driver = new ChromeDriver();
	driver.manage().window().maximize();
    
   	String url = "https://www.facebook.com/";
   	driver.get(url);
   
   	
   	driver.findElement(By.id("email")).sendKeys(nguyenanhtuan2203@gmail.com);;
	driver.findElement(By.id("pass")).sendKeys(password123);;
    driver.findElement(By.id(loginbutton)).click();
   
    
    
     driver.close();
	
}

-----


**Phân tích script**

*   *Khai báo thư viện cần thiết*


-----

     import org.openqa.selenium.By;
      import org.openqa.selenium.WebDriver;
      import org.openqa.selenium.chrome.ChromeDriver;

-----
Khi viết code nếu IDE báo lỗi code thì có thể là do bạn add thiếu thư viện. Bạn có bấm **Ctrl + Shift + O** để eclipse tự động add thêm thư viện còn thiếu. Hoặc trỏ chuột vào chỗ báo lỗi ấn nút **F2** để hiện thị lên các suggest fix lỗi đó, nếu thiếu thư viện thì nó sẽ gợi ý add thêm thư viện thiếu.

* *Gecko Driver*


-----

    System.setProperty("webdriver.gecko.driver","D:\\TuanBin\\chromedriver_win32");

-----

Nếu phiên bản Selenium Web Driver mà bạn đã và đang sử dụng là version từ 3.0 trở lên thì bạn cần cài đặt thêm Gecko Driver để khởi động Firefox. Gecko Driver là liên kết giữa các file test trong Selenium và trình duyệt Firefox. Các bạn có thể tham khảo cacs bài viết trên mạng để cài đặt.
* *Khởi tạo 1 object*


-----

   
     WebDriver driver = new ChromeDriver();

-----

Do WebDriver là 1 interface nên khi khởi tạo ta phải new 1 Object của 1 class đã implement cái Interface WebDriver, trong trường hợp này là ChromeDriver

* *Mở URL của trang login*


-----

    String url = "https://www.facebook.com/";
   	 driver.get(url);

-----



Cái Object driver trên sử dụng được rất nhiều các method khác nhau để điều khiển cái browser. 

*  *Điền thông tin và click vào button submit*


-----

    driver.findElement(By.id("email")).sendKeys(nguyenanhtuan2203@gmail.com);;
	 driver.findElement(By.id("pass")).sendKeys(password123);;
     driver.findElement(By.id(loginbutton)).click();

-----


Trong đó, sendKeys() và click() là method của interface WebElement.

* *Đóng cửa sổ


-----

    driver.close();

-----


Trên đây là những gì mình tìm hiểu được, còn có rất nhiều các vấn đề, khó khăn mà chúng ta cần phải xử lý và vượt qua. Chặng đường trở thành Automation Tester phía trước còn rất dài nên chúng ta cần cố gắng rất nhiều. Cảm ơn các bạn đã quan tâm bài viết nhé!





*Tài liệu tham khảo:* https://www.softwaretestinghelp.com/selenium-webdriver-commands-selenium-tutorial-17/