Trong Selenium – Waits (các lệnh đợi/chờ) là một yếu tố đóng vai trò rất quan trọng khi thực thi các test case. Waits giúp người dùng khắc phục sự cố trong khi chuyển hướng đến các trang web khác nhau bằng cách làm mới toàn bộ trang web và tải lại các phần tử web mới. Vì một số nguyên nhân liên quan đến việc xử lý các phần tử web, Ajax và Javascript ở phía ứng dụng web, nên việc load các phần tử không thể diễn ra cùng một lúc được. Vì vậy, việc sử dụng Waits sẽ tạo ra độ trễ thời gian trong khi tải và phản ánh các thành phần web, tránh xảy ra lỗi load dữ liệu.

Ở bài viết này chúng ta sẽ cùng nhau tìm hiểu Implicit Wait và Explicit Wait là 2 Wait phổ dụng. Đây là hai kiểu wait (đợi) để xử lý tải trang định kỳ, tải phần tử web; mở các cửa sổ, popup, các thông báo lỗi và phản ánh các phần tử web trên trang web.

![](https://images.viblo.asia/970a5550-37bd-4672-922b-c0b134faa514.png)

### WebDriver Implicit Wait

Implicit wait được sử dụng để cung cấp một khoảng thời gian chờ mặc định (giả sử 30 giây) giữa mỗi bước/lệnh kiểm tra liên tiếp trong toàn bộ tập lệnh kiểm tra (test script). Theo đó, bước kiểm tra tiếp theo sẽ chỉ thực hiện sau 30 giây kể từ thời điểm thực thi xong lệnh kiểm tra trước đó.

**Key Notes:**

* Implicit wait là một dòng mã đơn được khai báo trong method setup của test script (tập lệnh thử nghiệm).
* So với Explicit wait thì Implicit wait tường minh và đơn giản hơn. Cú pháp và cách tiếp cận của  Implicit wait cũng đơn giản hơn.

Ngoài ưu điểm dễ dàng và đơn giản để áp dụng, Implicit wait cũng có một số nhược điểm như : nó làm tăng thời gian thực thi tập lệnh thử nghiệm vì sau mỗi lệnh sẽ bị dừng để chờ trong một khoảng thời gian quy định trước khi tiếp tục thực thi lệnh tiếp theo.

Vì vậy, để khắc phục sự cố này, WebDriver cung cấp Explicit wait, nơi chúng ta có thể áp dụng các wait bất cứ khi nào phát sinh sự cố/tình huống thay vì bắt buộc phải chờ trong khi thực hiện từng bước kiểm tra.

**Import Statements:**

`import java.util.concurrent.TimeUnit` – Để có thể truy cập và áp dụng Implicit wait trong các test script của mình, chúng ta bắt buộc phải import package này vào test script.

**Syntax:**

```
drv.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
```

Đưa dòng mã này vào tập lệnh thử nghiệm ngay sau bước khởi tạo biến thể WebDriver. Đây là tất cả những gì cần thiết để đặt một implicit wait vào tập lệnh thử nghiệm của bạn.

**Code Walkthrough:**

Implicit wait gồm 2 tham số/đối số. Đối số đầu tiên cho biết thời gian bằng chữ số mà hệ thống cần đợi (trong ví dụ này là 10). Đối số thứ hai chỉ ra đơn vị thời gian (trong ví dụ này là giây). Ghép lại, trong đoạn mã trên, chúng ta đã thiết lập 10 giây làm thời gian chờ mặc định của Implicit wait.

### WebDriver Explicit Wait

Explicit wait được sử dụng để tạm dừng việc thực thi script cho đến khi một điều kiện cụ thể được chỉ định được đáp ứng hoặc thời gian tối đa đã trôi qua. Khác với Implicit wait, Explicit wait chỉ được áp dụng cho một trường hợp cụ thể thay vì dùng cho toàn bộ các lệnh trong script.

WebDriver cung cấp các lớp `WebDriverWait` và `ExpectedConditions`  để dùng cho Explicit wait. Hãy bắt đầu làm quen với Explicit wait thông qua ví dụ trên trang “gmail.com”.

**Scenario:**

* Khởi chạy trình duyệt web và mở trang “gmail.com”
* Nhập tên người dùng hợp lệ
* Nhập mật khẩu hợp lệ
* Bấm vào nút Đăng nhập
* Chờ nút "Compose" xuất hiện sau khi tải trang

**WebDriver Code sử dụng Explicit wait**

Chúng ta sẽ sử dụng luôn project “Learning_Selenium” đã tạo ở các bài trước để tạo tập lệnh cho kịch bản trên.

**Bước 1 :** Tạo 1 class java mới có tên “Wait_Demonstration” trong project “Learning_Selenium”.

**Bước 2 :** Copy và paste đoạn code dưới đây vào class “Wait_Demonstration.java” vừa tạo. Đây là đoạn code tương ứng với kịch bản đã tạo ở trên.

```
import static org.junit.Assert.*;
import java.util.concurrent.TimeUnit;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
 
public class Wait_Demonstration {
 
       // created reference variable for WebDriver
       WebDriver drv;
       @Before
       public void setup() throws InterruptedException {
 
              // initializing drv variable using FirefoxDriver
              drv=new FirefoxDriver();
              // launching gmail.com on the browser
              drv.get("https://gmail.com");
              // maximized the browser window
              drv.manage().window().maximize();
              drv.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
       }
 
       @Test
       public void test() throws InterruptedException {
 
              // saving the GUI element reference into a "username" variable of WebElement type
              WebElement username = drv.findElement(By.id("Email"));
 
              // entering username
              username.sendKeys("shruti.shrivastava.in");
 
              // entering password
              drv.findElement(By.id("Passwd")).sendKeys("password");
 
              // clicking signin button
              drv.findElement(By.id("signIn")).click();
 
              // explicit wait - to wait for the compose button to be click-able
              WebDriverWait wait = new WebDriverWait(drv,30);
 
         wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(text(),'COMPOSE')]")));
              // click on the compose button as soon as the "compose" button is visible
       drv.findElement(By.xpath("//div[contains(text(),'COMPOSE')]")).click();
       }
 
       @After
       public void teardown() {
       // closes all the browser windows opened by web driver
   drv.quit();     
       }
}
```

**Import Statements**

Trong đoạn code trên, 2 package ExpectedConditions và WebDriverWait được import ở đoạn đầu class trước khi tạo tập lệnh thực thi cho phần Explicit wait :

* `import org.openqa.selenium.support.ui.ExpectedConditions`
* `import org.openqa.selenium.support.ui.WebDriverWait`

Ngoài ra còn 1 số package khác đã đề cập ở các bài trước : ví dụ như các pakage tham chiếu đến class Select để xử lý dropdown ...

**Khởi tạo Object cho class WebDriverWait**

```
WebDriverWait wait = new WebDriverWait(drv,30);
```

Tạo một biến tham chiếu “wait” cho lớp WebDriverWait và khởi tạo nó bằng cách sử dụng biến thể WebDriver và khai báo thời gian chờ tối đa để quá trình thực thi tạm dừng. Thời gian chờ tối đa này được tính bằng "giây" (trong ví dụ này đang set là 30s)

Cách khởi tạo WebDriver thì đã được đề cập ở các bài trước.

**Expected Condition**

```
wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(text(),'COMPOSE')]")));
drv.findElement(By.xpath("//div[contains(text(),'COMPOSE')]")).click();
```

Command trên có ý nghĩa đợi một khoảng thời gian quy định hoặc một điều kiện dự kiến sẽ xảy ra, tùy điều kiện nào xảy ra trước.

Để có thể thực hiện việc này, chúng ta sử dụng biến tham chiếu "wait" của lớp `WebDriverWait` đã tạo ở step trước cùng với lớp `ExpectedConditions` và một điều kiện thực tế dự kiến sẽ xảy ra (visibilityOfElementLocated(By.xpath ... )). Ngay khi điều kiện mong đợi xảy ra, bộ điều khiển chương trình sẽ chuyển sang bước thực hiện tiếp theo thay vì bắt buộc phải đợi trong toàn bộ 30 giây (thời gian chờ tối đa set ở trên).

Đợi nút “Compose” xuất hiện và được tải xong, chương trình tiếp tục gọi lệnh tiếp theo : nhấp vào nút “Compose”.

**Các loại Expected Conditions**

Lớp `ExpectedConditions` cung cấp một bộ trợ giúp tuyệt vời để giải quyết các tình huống trong đó chúng ta phải xác định điều kiện xảy ra trước khi thực thi các step test thực tế.

Lớp `ExpectedConditions` đi kèm với một loạt các điều kiện mong đợi có thể được truy cập với sự trợ giúp của biến tham chiếu `WebDriverWait` và phương thức` until()`.

**Một số Expected Conditions điển hình :**

**#1) elementToBeClickable()** – Điều kiện mong đợi là chờ một phần tử có thể click được, tức là phần tử đó phải hiện diện / được hiển thị trên màn hình và phải enabled (có thể click).

**Sample Code:**

```
wait.until(ExpectedConditions.elementToBeClickable(By.xpath(“//div[contains(text(),'COMPOSE')]”)));
```

**#2) textToBePresentInElement()** – Điều kiện mong đợi là chờ một phần tử chứa đoạn text được chỉ định.

**Sample Code:**

```
wait.until(ExpectedConditions.textToBePresentInElement(By.xpath(“//div[@id= ‘forgotPass'”), “text to be found”));
```

**#3) alertIsPresent()** – Điều kiện mong đợi là chờ một hộp cảnh báo xuất hiện.

**Sample Code:**

`wait.until(ExpectedConditions.alertIsPresent()) !=null);`

**#4) titleIs()** – Điều kiện mong đợi là chờ một trang có tiêu đề cụ thể.

**Sample Code:**

`wait.until(ExpectedConditions.titleIs(“gmail”));`

**#5) frameToBeAvailableAndSwitchToIt()** – Điều kiện mong đợi là chờ một khung có sẵn (available) và ngay sau khi có khung, điều khiển sẽ tự động chuyển sang nó.

**Sample Code:**

```
wait.until(ExpectedConditions.frameToBeAvailableAndSwitchToIt(By.id(“newframe”)));
```

### Điều hướng bằng WebDriver

Có một hành vi người dùng rất phổ biến là nhấp chuột qua lại nhiều lần vào nút back (quay lại) và forward (chuyển tiếp) của trình duyệt web để điều hướng đến các trang web khác nhau đã truy cập trong phiên hiện tại trên lịch sử của trình duyệt. Để mô phỏng các hành động như vậy, WebDriver giới thiệu các lệnh Điều hướng. Dưới đây là 1 số command chi tiết:

**#1) navigate().back()**

Lệnh điều hướng đến trang web trước đó đã truy cập

**Sample code:**

```
driver.navigate().back();
```

Lệnh trên không yêu cầu tham số và đưa người dùng trở lại trang web trước đó trong lịch sử của trình duyệt web.

**#2) navigate().forward()**

Lệnh này cho phép người dùng điều hướng đến trang web tiếp theo có tham chiếu đến lịch sử của trình duyệt.

**Sample code:**

```
driver.navigate().forward();
```

Lệnh forward trên cũng không yêu cầu tham số và đưa người dùng đi đến trang web tiếp theo trong lịch sử của trình duyệt web (trang web tiếp sau của trang web đã điều hướng đến bằng lệnh back).

**#3) navigate().refresh()**

Lệnh này cho phép người dùng làm mới trang web hiện tại do sẽ tải lại tất cả các phần tử web trong trang.

**Sample code:**

```
driver.navigate().refresh();
```

Đây cũng là 1 lệnh không có tham số.

**#4) navigate().to()**

Lệnh này cho phép người dùng khởi chạy một cửa sổ trình duyệt web mới và điều hướng đến URL được chỉ định.

**Sample code:**

```
driver.navigate().to(“http://google.com”);
```

Khác với các lệnh trên, đây là 1 lệnh có tham số đầu vào là 1 URL (địa chỉ muốn điều hướng đến). URL này được chỉ định để mở trong trình duyệt web mới khởi chạy.

### Lời kết

Bài dịch trên còn thiếu sót, nếu bạn quan tâm có thể tìm hiểu bài viết gốc tại đây :
https://www.softwaretestinghelp.com/selenium-webdriver-waits-selenium-tutorial-15/

Ngoài 2 loại wait được đề cập đến trong bài, thì còn 1 loại wait nữa khá phổ biến là Fluent wait. Sử dụng Fluent wait trong những trường hợp kiểu như, đôi khi là ta gặp những phần tử mà cần từ một đến hai giây để load, nhưng khi khác có khi lại cần nhiều thời gian hơn đến tận mấy chục giây chẳng hạn. Fluent wait sẽ tìm kiếm đi tìm kiếm lại cho đến khi tìm được phần tử đó hoặc đến khi time out thì thôi.
Nếu bạn quan tâm có thể tìm hiểu thêm ở bài này :
https://vananhtooo.wordpress.com/2017/11/13/implicit-wait-explicit-wait-va-fluent-wait-trong-selenium-webdriver/