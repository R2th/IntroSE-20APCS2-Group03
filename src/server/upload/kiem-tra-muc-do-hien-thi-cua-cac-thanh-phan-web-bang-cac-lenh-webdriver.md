WebDriver có thông số W3C chi tiết hóa thông tin về các tùy chọn hiển thị khác nhau dựa trên các loại yếu tố web mà các hành động sẽ được thực hiện.
WebDriver tạo điều kiện cho người dùng sử dụng các phương pháp sau để kiểm tra mức độ hiển thị của các thành phần web. Các thành phần web này có thể là :  button, drop box, checkbox, radio button, label ...

* isDisplayed()
* isSelected()
* isEnabled()

Để hiểu rõ hơn, chúng ta sẽ đi sâu vào phân tích bằng các đoạn mã dưới đây. Chúng ta sẽ sử dụng trang “google.com” làm ứng dụng thử nghiệm và sử dụng “Learning_Selenium” project đã được tạo ra trong các hướng dẫn trước đây để tạo tập lệnh.

**Kịch bản kiểm thử tự động :**

* Khởi chạy trình duyệt web và mở ứng dụng đang thử nghiệm – http://google.com
* Xác minh tiêu đề trang web
* Xác minh xem nút “Google Search” được hiển thị hay không
* Nhập từ khóa vào hộp văn bản “Google Search”
* Xác minh rằng nút “Search button” được hiển thị và được kích hoạt (enable)
* Dựa trên khả năng hiển thị của nút Tìm kiếm, click vào nút tìm kiếm này

### WebDriver Code

**Bước 1:** Tạo 1 class java mới tên là “VisibilityConditions” bên trong “Learning_Selenium” project.

**Bước 2:** Copy và paste đoạn code dưới đây vào “VisibilityConditions.java” class. Đây là đoạn mã tương đương với kịch bản được đề cập ở trên:

```
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
 
public class VisibilityConditions {
 
       /**
        * @param args
        */
 
       public static void main(String[] args) {
 
              // objects and variables instantiation
              WebDriver driver = new FirefoxDriver();
              String appUrl = "https://google.com";
 
              // launch the firefox browser and open the application url
              driver.get(appUrl);
 
              // maximize the browser window
              driver.manage().window().maximize();
 
              // declare and initialize the variable to store the expected title of the webpage.
              String expectedTitle = "Google";
 
              // fetch the title of the web page and save it into a string variable
              String actualTitle = driver.getTitle();
 
              // compare the expected title of the page with the actual title of the page and print the result
              if (expectedTitle.equals(actualTitle))
              {
                     System.out.println("Verification Successful - The correct title is displayed on the web page.");
              }
              else
              {
                     System.out.println("Verification Failed - An incorrect title is displayed on the web page.");
              }
 
              // verify if the “Google Search” button is displayed and print the result
              boolean submitbuttonPresence=driver.findElement(By.id("gbqfba")).isDisplayed();
              System.out.println(submitbuttonPresence);
 
              // enter the keyword in the “Google Search” text box by which we would want to make the request
              WebElement searchTextBox = driver.findElement(By.id("gbqfq"));
              searchTextBox.clear();
              searchTextBox.sendKeys("Selenium");
 
              // verify that the “Search button” is displayed and enabled
              boolean searchIconPresence = driver.findElement(By.id("gbqfb")).isDisplayed();
              boolean searchIconEnabled = driver.findElement(By.id("gbqfb")).isEnabled();
 
              if (searchIconPresence==true && searchIconEnabled==true)
              {
                     // click on the search button
                     WebElement searchIcon = driver.findElement(By.id("gbqfb"));
                     searchIcon.click();
              }
 
              // close the web browser
              driver.close();
              System.out.println("Test script executed successfully.");
 
              // terminate the program
              System.exit(0);
       }
}
```

### Code Walkthrough (giải trình đoạn mã)

Dưới đây là những cách xác định sự hiển thị của các yếu tố web trên trang web.

**isDispalyed()**

```
boolean submitbuttonPresence=driver.findElement(By.id(“gbqfba”)).isDisplayed();
```

`isDispalyed()` là phương thức được sử dụng để xác minh sự hiện diện của một thành phần web trong trang web. Phương pháp được thiết kế để kết quả trả về là giá trị Boolean (true || false) với mỗi thành công hoặc thất bại. Phương thức này trả về giá trị `true` nếu phần tử web được chỉ định có hiển thị trên trang web và trả về giá trị `false` nếu phần tử web này không được hiển thị trên trang web.
Đoạn mã trên xác minh sự hiện diện của nút `submit` có id = “gbqfba” trên trang web google : trả về giá trị `true` nếu nút submit này có được hiển thị và trả về giá trị `false` nếu nút submit này không xuất hiện trên trang web google.

Phương pháp này liên quan đến khả năng hiển thị của tất cả các loại thành phần web không giới hạn ở bất kỳ loại nào.

**isEnabled()**

```
boolean searchIconEnabled = driver.findElement(By.id(“gbqfb”)).isEnabled();
```

`isEnabled()` là phương thức được sử dụng để xác minh xem phần tử web được enable (bật) hay disable (tắt/vô hiệu hóa) trong trang web. Giống như phương thức `isDisplayed()`, phương thức này được thiết kế để kết quả trả về là giá trị Boolean (true || false) với mỗi thành công hoặc thất bại. Phương thức này trả về giá trị `true` nếu phần tử web được enable trên trang web và trả về giá trị `false` nếu phần tử web này không được enable (đang bị disable - vô hiệu hóa) trên trang web.

Do đó, đoạn mã trên xác minh xem nút `submit` có id = “gbqfb” có được enable hay không và trả về giá trị Boolean tùy thuộc vào kết quả.

Phương thức `isEnabled()` rất có ý nghĩa trong các tình huống mà chúng ta muốn xác định rằng chỉ khi điều kiện A được thực hiện, thì phần tử (nút chỉ định nào đó) mới được bật. Ví dụ như trường hợp rất phổ biến như hình minh họa dưới đây :

![](https://images.viblo.asia/9113dfd5-b86a-40ab-81ea-4914dca411c1.jpg)

Nút `Register` chỉ được enable (khả dụng) khi checkbox agreement ... được chọn.

Để kiểm tra xem phần tử có đang được chọn (selected) hay không, chúng ta có phương thức dưới đây:

**isSelected()**

```
boolean searchIconSelected = driver.findElement(By.id(“male”)).isSelected();
```

`isSelected()` là phương thức được sử dụng để xác minh xem phần tử web có đang được chọn hay không. Nó thường được sử dụng để check các radio button, dropdown và checkbox. Tương tự 2 phương thức trên , phương thức này được thiết kế để kết quả trả về là giá trị Boolean (true || false) với mỗi thành công hoặc thất bại.

Trong bài viết này, chúng ta đã làm quen với các phương thức lặp và điều kiện của WebDriver. Các phương thức có điều kiện này thường xử lý được hầu hết các loại tùy chọn hiển thị cho các thành phần web.

Bài được dịch từ : 
https://www.softwaretestinghelp.com/webdriver-commands-selenium-tutorial-14/