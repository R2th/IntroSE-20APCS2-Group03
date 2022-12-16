Giờ đây, hầu hết các ứng dụng web được phát triển bằng  Ajax và Javascript. Khi trang web được trình duyệt tải lên, các phần tử mà chúng ta muốn tương tác có thể sẽ mất một thời gian nhất định nào đó để có thể tải lên. Và vì vậy mà đôi khi chúng ta đang chạy automation với Selenium thì gặp ngoại lệ `ElementNotVisibleException` mà nhiều khi các bạn không hiểu vì sao, rồi tự hỏi các câu như kiểu: “rõ ràng lấy đúng locator rồi mà”, “rõ ràng thấy button hiển thị mà”,...Nhưng đừng lo lắng, vì chúng ra đã có Waits giúp chúng ta giải quyết vấn đề này.
Waits trong Selenium có 2 loại chính và mỗi loại sẽ phù hợp với những mục đích sử dụng khác nhau. Vậy trong bài hướng dẫn này chúng ta sẽ cùng nhau tìm hiểu về 2 loại Waits phổ biến trong Selenium:
*  Implicit wait
*  Explicit wait

![](https://images.viblo.asia/ec11a751-9982-49ad-a828-2784ab113acd.png)

### 1. Implicit wait

Implicit wait sẽ báo cho trình điều khiển web chờ trong khoảng thời gian xác định trước khi nó hết kiên nhẫn và đưa ra thông báo “No Such Element Exception”.

**Syntax:**

`driver.manage().timeouts().implicitlyWait(TimeOut, TimeUnit.SECONDS);`

- `TimeOut` được để mặc định là 0, và khi chúng ta cài đặt `TimeOut`, trình điều khiển web sẽ chờ đợi trong khoảng thời gian `TimeOut` đó trước khi đưa ra ngoại lệ 
- Tham số thứ 2: `TimeUnit.SECONDS`, ngoài Seconds chúng ta còn có thể cài đặt phép đo thời gian theo MINUTES, MILISECOND, MICROSECONDS, NANOSECONDS, DAYS, HOURS, v.v.

Để hiểu rõ hơn về việc Implicit Wait được sử dụng như thế nào, chúng ta hãy cùng xem đoạn mã dưới đây:

```java
 WebDriver driver = new FirefoxDriver();
 //set Inplicit Wait với thời gian timeout là 10 giây
 driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
 driver.get("http://url_that_delays_loading");
 //Phần tử này sẽ được chờ đợi load lên trong khung thời gian là 10s
 WebElement myDynamicElement = driver.findElement(By.id("myDynamicElement"));
```

Từ ví dụ này ta sẽ có 2 điều cần ghi nhớ dưới đây:

**Lưu ý 1:** Implicit Wait là chờ đợi động, nghĩa là nó sẽ dừng thực hiện chờ đợi 1 phần tử được tải xong nếu đã tìm thấy phần tử đó mà không cần chờ cho hết thời gian `TimeOut` đã được đặt sẵn từ đầu.

**Lưu ý 2:** Implicit Wait được áp dụng cho tất cả các phần tử web trong trình điều khiển 

### 2. Explicit Wait
 Explicit wait được sử dụng để yêu cầu trình duyệt web chờ đợi trong một thời gian nhất định, theo một điều kiện cụ thể. 
 Nếu vượt quá thời gian chờ đợi thì sẽ đưa ra ngoại lệ `ElementNotVisibleException`
 
**Syntax:**

`WebDriverWait wait=new WebDriverWait(WebDriveReference,TimeOut);`

Một ví dụ về Explicit wait:

```java
public void clickElementWhenReady() {
      // Start browser
      WebDriver driver = new ChromeDriver();
      driver.get("http://url_that_delays_loading");
      //Tạo đối tượng của lớp WebDriverWait
      WebDriverWait wait = new WebDriverWait(driver, 20);
      // Ở đây chúng ta sẽ chờ cho phần tử xuất hiện trong khung thời gian là 20s
      WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//p[text()='WebDriver']")));
      element.click();
}
```

**Lưu ý :** Explicit là chờ đợi động, và nó chỉ được áp dụng cho phần tử nào được chỉ định

Và cuối cùng, để giúp các bạn có cái nhìn tổng quan hơn, chúng ta hãy cũng nhau nhìn vào sự khác biệt dưới đây giữa Implicit wait và Explicit wait nhé:

|  Implicit wait         | Explicit wait | 
| -------- | -------- | 
| Thời gian chờ đợi được áp dụng cho tất cả các phần tử trong tập lệnh     | Thời gian chờ đợi được áp dụng cho những phần tử được chỉ định     |
|Trong Implicit wait, chúng ta không cần chỉ định "ExpectedConditions" trên phần tử được định vị |  Trong Explicit wait, chúng ta cần chỉ định "ExpectedConditions" trên phần tử được định vị 
Nên được sử dụng với những thành phần có thể được xác định trong khung thời gian được chỉ định trong Implicit wait |Nên sử dụng với những thành phần mất nhiều thời gian để tải, hoặc để kiểm tra các thuộc tính của phần tử như (visualOfEuityLocated, ElementToBeClickable, ElementToBeSelected) |

Việc sử dụng Waits hoàn toàn dựa vào các thành phần được tải với các khoảng thời gian như thế nào. Qua bài này mong rằng sẽ giúp các bạn hiểu thêm về Implicit wait và Explicit wait, từ đó có cách sử dụng hợp lý trong dự án của mình.

Nguồn tham khảo: 
https://www.guru99.com/implicit-explicit-waits-selenium.html
https://dzone.com/articles/waits-in-selenium-how-to-use-implicit-amp-explicit