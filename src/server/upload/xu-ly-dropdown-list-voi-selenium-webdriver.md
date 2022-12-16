Chúng ta có thể sử dụng Selenium WebDriver để xử lý Dropdown list vì nó hỗ trợ kiểm tra các giá trị của DropDown list bằng cách sử dụng lớp `Select`. Đầu tiên  chúng ta tạo ra một trang HTML bao gồm nhiều thành phần web cơ bản như :

* Hyperlink (đường dẫn)
* Button (nút)
* Dropdown (list option)

Ví dụ như hình dưới đây :

![](https://images.viblo.asia/55b62e9e-ae50-4166-b338-0f79f01ccc06.jpg)

### Giải thích về Ứng dụng đang được Thử nghiệm :

 Trang web được thiết kế theo hướng bao gồm một vài loại yếu tố web cơ bản :
 
 * **Hyperlink** : 2 đường dẫn có tên là `Google` và `abodeQA` được cung cấp để chuyển hướng người dùng đến trực tiếp trang “https://www.google.co.in/” và “http://www.abodeqa.com/” khi click vào.
* **Button** : nút `"try it"`  được tạo để hiển thị popup có nút `OK` và `Cancel` khi click vào.
* **Dropdown** : 3 dropdown list : colour dropdown, fruit dropdown, animal dropdown được tạo để chọn lần lượt màu, loại trái cây và các con vật. 3 dropdown list này đã được set giá trị default.

**Mã HTML được sử dụng để tạo trang web được đề cập ở trên:**

```
<!DOCTYPE html>
<html>
<head><title> Testing Select Class </title>
<body>
<div id="header">
<ul id="linkTabs">
<li>
<a href="https://www.google.co.in/">Google</a>
</li>
<li>
<a href="http://abodeqa.wordpress.com/">abodeQA</a>
</li>
</ul>
</div>
<div class="header_spacer"></div>
<div id="container">
<div id="content" style="padding-left: 185px;">
<table id="selectTable">
<tbody>
<tr>
<td>
<div>
<select id="SelectID_One">
<option value="redvalue">Red</option>
<option value="greenvalue">Green</option>
<option value="yellowvalue">Yellow</option>
<option value="greyvalue">Grey</option>
</select>
</div>
</td>
<td>
<div>
<select id="SelectID_Two">
<option value="applevalue">Apple</option>
<option value="orangevalue">Orange</option>
<option value="mangovalue">Mango</option>
<option value="limevalue">Lime</option>
</select>
</div>
</td>
<td>
<div>
<select id="SelectID_Three">
<option value="selectValue">Select</option>
<option value="elephantvalue">Elephant</option>
<option value="mousevalue">Mouse</option>
<option value="dogvalue">Dog</option>
</select>
</div>
</td>
</tr>
<tr>
<td>
<!DOCTYPE html>
<html>
<body>
<p>Click the button to display a confirm box.</p>
<button onclick="myFunction()">Try it</button>
<script>
function myFunction()
{
confirm("Press a button!");
}
</script>
</body>
</html>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</body>
</html>
```

### Kịch bản để chạy test tự động

* Khởi chạy trình duyệt web và mở trang web test (trang test trên hình)
* Nhấp vào đường dẫn "Google" trên trang test
* Điều hướng trở lại trang web gốc (trang test trên)
* Chọn “Green” trong colour dropdown list
* Chọn “Orange” trong fruit dropdown list
* Chọn “Elephant” trong animal dropdown list

### Mã WebDriver sử dụng class Selenium Select

Có thể sử dụng lại project đã tạo ở các bài trước để tiếp tục phần này.

**Bước 1:** Tạo 1 class java mới tên là “HandlingDropDown” bên trong “Learning_Selenium” project.

**Bước 2:** Copy và paste đoạn code dưới đây vào “HandlingDropDown.java” class. Đây là đoạn mã tương đương với kịch bản được đề cập ở trên:

```
import static org.junit.Assert.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
 
/**
 * class description
 */
 
public class HandlingDropDown {
       WebDriver driver;
 
       /**
        * Set up browser settings and open the application
        */
 
       @Before
       public void setUp() {
              driver=new FirefoxDriver();
              
// Opened the application
              driver.get("file:///F:/Work/Blogs/testingstuff/DemoWebAlert.html");
              driver.manage().window().maximize();
       }
 
       /**
        * Test to select the dropdown values
        * @throws InterruptedException
        */
 
       @Test
       public void testSelectFunctionality() throws InterruptedException { 
              
// Go to google
              driver.findElement(By.linkText("Google")).click();
              
// navigate back to previous webpage
              driver.navigate().back();
              Thread.sleep(5000);
              
// select the first operator using "select by value"
              Select selectByValue = new Select(driver.findElement(By.id("SelectID_One")));
              selectByValue.selectByValue("greenvalue");
              Thread.sleep(5000);
              
// select the second dropdown using "select by visible text"
              Select selectByVisibleText = new Select (driver.findElement(By.id("SelectID_Two")));
              selectByVisibleText.selectByVisibleText("Lime");
              Thread.sleep(5000);
              
// select the third dropdown using "select by index"
              Select selectByIndex = new Select(driver.findElement(By.id("SelectID_Three")));
              selectByIndex.selectByIndex(2);
              Thread.sleep(5000);       
       }
 
       /**
        * Tear down the setup after test completes
        */
 
       @After
       public void tearDown() { 
              driver.quit();
       }
}
```

### Code Walkthrough (giải trình đoạn mã)

**Import Statements**

* `import org.openqa.selenium.support.ui.Select` – Import gói này trước khi tạo tập lệnh, nó sẽ tham chiếu đến class `Select` để yêu cầu xử lý dropdown.

**Khởi tạo đối tượng cho class `Select`**

```
Select selectByValue = new Select(driver.findElement(By.id(“SelectID_One”)));
```

Chúng ta tạo một biến tham chiếu cho lớp Select có tên là `selectByValue` và khởi tạo nó bằng cách sử dụng lớp Select và mã định danh cho target dropdown (trong ví dụ này là đang trỏ đến dropdown color list đầu tiên với id = "SelectID_One")

Mã định danh hoặc giá trị định vị cho dropdown có thể được tìm thấy bằng cách sử dụng các kỹ thuật tìm kiếm ở các bài trước đây (sử dụng Selenium IDE và firebug).

**Cách tìm mã định danh cho 1 dropdown list :**

Hầu hết tất cả các thành phần dropdown list được nằm trong cặp thẻ <select> ... </select> , list option bên trong gồm nhiều giá trị (tạo thành 1 tập danh sách các giá trị xổ xuống), mỗi 1 giá trị/option được đặt trong cặp thẻ <option> ... </option>  (Hình dưới đây).

![](https://images.viblo.asia/6888f19e-4bf3-413a-b8e2-edf1fae6fd27.jpg)

**Cách 1 : Sử dụng method `selectByValue()` để thiết lập giá trị cho dropdown**

```
selectByValue.selectByValue(“greenvalue”);
```

Trong câu lệnh trên, chúng ta chọn giá trị "green" trong dropdown list bằng cách sử dụng phương thức `selectByValue()` và tham số hóa nó bằng giá trị của thuộc tính `value` (value='greenvalue') :

![](https://images.viblo.asia/2386e914-a555-4e99-9287-3dc1d26c0fcb.jpg)

Đây là cách chọn option dựa vào giá trị của thuộc tính `value` trong thẻ. Nên sử dụng cách này vì độ chính xác cao, tránh hiện tượng trùng lặp dữ liệu.

**Cách 2 : Sử dụng method `selectByVisibleText()` để thiết lập giá trị cho dropdown**

```
selectByValue.selectByVisibleText(“Lime”);
```

Trong câu lệnh trên, chúng ta chọn giá trị “Lime” trong dropdown list thứ hai bằng cách sử dụng phương thức `selectByVisibleText()` và tham số hóa nó bằng giá trị text hiển thị trực tiếp trên giao diện người dùng (text trong cặp thẻ <option> </option>). Đây là cách chọn option dựa vào giá trị của text hiển thị trên UI.

![](https://images.viblo.asia/1bbe1c9b-d259-4cb1-98db-f4cb1f8b37ea.jpg)

**Cách 3 : Sử dụng method `selectByIndex()` để thiết lập giá trị cho dropdown**

```
selectByValue.selectByIndex(“2”);
```

Trong câu lệnh trên, chúng ta chọn option thứ 3 trong dropdown list bằng cách sử dụng phương thức `selectByIndex()` và tham số hóa nó bằng giá trị index (số thứ tự) của element. Đây là cách chọn option dựa vào số thứ tự của option trong list, index được đánh bắt đầu từ 0.

### Lời kết

Trên đây là những kiến thức cơ bản về xử lý dropdown được dịch từ bài : https://www.softwaretestinghelp.com/selenium-select-class-selenium-tutorial-13/

Ngoài ra thực tế, dropdown còn được chia làm Drop down list tĩnh với Drop down list động, và cách xử lý với từng loại bạn có thể tham khảo ở bài dưới đây :
- Xử lý Drop down list tĩnh với Selenium Webdriver : https://vananhtooo.wordpress.com/2017/08/23/selenium-lam-viec-voi-drop-down-list/
- Xử lý Drop down list động với Selenium Webdriver : https://vananhtooo.wordpress.com/2017/08/24/selenium-lam-viec-voi-drop-down-list-dong/