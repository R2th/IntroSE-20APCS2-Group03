# 1. Câu lệnh  findElement và findElements để làm gì?
* Để có thể tương tác với những phần tử trên web, điều đầu tiên chúng ta cần quan tâm đó là vị trí chính xác và duy nhất của các phần tử này. Để đối ứng với nhiều loại thẻ khác nhau, thì với câu lệnh này bởi ngôn ngữ Java, chúng ta cũng có nhiều cách để tìm đến "nhà" của các phần tử web, như By.Name(""), By.ID(""), By.linkText(""), By.className(""), By.xpath("").... 
* Nếu với findElement bạn sẽ nhận được 1 phần tử duy nhất cho biến của mình, thì với findElements bạn sẽ nhận được 1 danh sách phần tử cho biến danh sách liên kết hoặc mảng của mình.

![](https://images.viblo.asia/d74e3a99-8d3f-4342-a6d4-f91f8b034e6f.png)

# 2. Sử dụng câu lệnh  findElement và findElements như thế nào?
### *By Name*
Nếu bạn đã xác định được một phần tử nằm ở 1 thẻ với name cụ thể như là "btnLogin" thì bạn có thể dễ dàng tương tác với button ấy với câu lệnh như sau:<br/><br/>
```
WebElement elementName = driver.findElement(By.Name("btnLogin"));
```
### *By ID*
Ngoài Name, thì developer cũng rất thường hay sử dụng thành phần ID cho các element. Sau khi check inspect để tìm được ID của thẻ bạn muốn tương tác, bạn có thể sử dụng: <br/><br/>
```
WebElement elementName = driver.findElement(By.ID("btnLogin_id"));
```
### *By linkText*
Với những thẻ chứa content mà không có name, không có id như <br/><br/>
```
<buton>Login</button>
```
Bạn vẫn có thể sử dụng câu lệnh tìm element thông qua content của thẻ <br/><br/>
```
WebElement elementName = driver.findElement(By.linkText("Login"));
```
### *By partialLinkText*
Bên cạnh đó, đối với những thẻ có nội dung quá dài, hoặc bạn khó tìm được trên inspect mà chỉ chắc chắn được content của thẻ (ví dụ như tìm 1 button ẩn hiện có điều kiện - nên khó lấy địa chỉ của thẻ trên inspect)
Bạn có thể tìm thẻ đó với câu lệnh tìm tương đối:<br/><br/>
```
WebElement elementName = driver.findElement(By.linkText("here"));
```
### *By className*
```
<td>
<input class="inputtext" type="email">
</td>
```
Và có thể có trường hợp bạn sẽ gặp phải như trên, 1 thẻ chỉ có tên class mà không có ID hay name gì cả, thì hãy dùng ngay class name cho câu lệnh findElement/s ngay nhé:<br/><br/>
```
WebElement elementName = driver.findElement(By.className("inputtext"));
```
### *By xpath*
Cũng có rất nhiều tình huống, chúng ta chỉ có thể xác định được bằng xpath, với những dạng thẻ như:<br/>
` <p>Xin chào</p>`  <br/>nằm sâu thăm thẳm trong hàng hàng lớp lớp thẻ thì chúng ta có thể sử dụng xpath, để lấy được xpath của 1 thẻ, bạn có thể làm theo các step sau:<br/>
 Step 1: Mở inspect tại phần tử cần tương tác<br/>
 Step 2: Chuột phải chọn Copy --> Copy Xpath / Copy Full Xpath<br/>
 Sau đó bạn có thể dùng câu lệnh như sau để tìm đến phần tử mong muốn:<br/><br/>
```
WebElement elementName = driver.findElement
(By.xpath("//*[@id="________"]/div[1]/div[2]/div/a/div[7]/div/p"));
```
hoặc với findElements
```
List<WebElement> listOfElements = driver.findElements(By.xpath("//div"));
```
### *Code hoàn chỉnh < tham khảo>*
```
import java.util.List;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
public class Testing
{
    public static void main(String[] args) throws InterruptedException {
        System.setProperty("webdriver.gecko.driver","C:\\SeleniumGecko\\geckodriver.exe");
        WebDriver driver = new FirefoxDriver();
        driver.get("___________<add your website>____________");
        WebElement btnLogin = driver.findElement(By.className("btn-login"));
        WebElement btnSubmit = driver.findElement(By.className("btn-login-submit"));
        WebElement emailElement = driver.findElement(By.id("user_email"));
        WebElement passwordElement = driver.findElement(By.id("user_password"));

        String email = "__________<add email here>___________";
        String password = "_____<add password here>_____";
        btnLogin.click();
        emailElement.sendKeys(email);
        passwordElement.sendKeys(password);
        btnSubmit.click();
        driver.quit();
}
```

# 3. Tổng kết và những điểm cần lưu ý
Để có thể tương tác với các phần tử web thì việc sử dụng câu lệnh findElement/s là hết sức hữu ích. Từ việc chuyển các phần tử ấy về dạng biến, chúng ta có thể dùng nó để truyền dữ liệu hay lấy dữ liệu từ phần tử ấy. <br/><br/>
* Ngoài ra, để sử dụng câu lệnh này chúng ta cần phải lưu ý những case khác nhau giữa findElement và findElements như sau:

| FindElement | FindElements |
| -------- | -------- |
| Trả về phần tử web khớp với phần tử đầu tiên trong trang web.     | Trả về toàn bộ các phần tử web khớp với tiêu chí tìm kiếm  |
| Trả về duy nhất 1 phần tử web     | Trả về danh sách các phần tử web   |
| Trả về lỗi NoSuchEuityException nếu nó không tìm thấy phần tử phù hợp với tiêu chí.    | Trả về một danh sách rỗng nếu nó không tìm thấy phần tử phù hợp với tiêu chí.    |
| Không áp dụng     | Mỗi phần tử được lập chỉ mục với một số bắt đầu từ 0 giống như một mảng  |

Nguồn tham khảo: https://www.guru99.com/find-element-selenium.html