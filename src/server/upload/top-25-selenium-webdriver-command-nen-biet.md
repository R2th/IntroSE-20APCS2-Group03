### Các loại Command trong WebDriver

Mọi file Java tự động hóa đều bắt đầu bằng việc tạo một tham chiếu của trình duyệt web mà chúng ta muốn sử dụng để gọi đến theo cú pháp dưới đây.

![](https://images.viblo.asia/9f69c1c2-33b3-43aa-ada6-88522ec30bbb.jpg)

Có một số phương thức có sẵn của giao diện Webdriver. Các phương thức này được truy cập bằng cách sử dụng biến thể **driver** trên theo một format đơn giản **driver.methodName();**. Tất cả các project tự động hóa sẽ gọi các phương thức này và so sánh + đánh giá những kết quả chúng trả về.

![](https://images.viblo.asia/ce92df3e-fb18-4547-acfa-acb37fd4860e.jpg)

**Nói một cách dễ hiểu, chúng ta có thể phân loại các lệnh Webdriver như sau:**

* Browser commands,
* Get commands,
* Navigation commands,
* Webelement commands,
* Action commands,
* Result commands.

Cũng giống như test thủ công, kết quả của case test PASS hoặc FAIL được quyết định bởi **Result commands** là phương thức so sánh giữa kết quả mong đợi và kết quả thực tế trả về sau khi thực hiện các bước của test case.

## Top 7 Selenium Command

* Phương thức **get()**
* ĐỊnh vị link bằng phương thức **linkText()** và **partialLinkText()**
* Chọn nhiều item trong list dropdown
* Submit form
* Xử lý iframe
* Phương thức **close()** và **quit()**
* Xử lý ngoại lệ

### #1) Các lệnh get()

| **WebDriver command** | **Cách sử dụng** |
| -------- | -------- |
| get()     | Khởi chạy trình duyệt mới và mở URL được chỉ định trong biến thể trình duyệt này. Command nhận một tham số kiểu chuỗi đơn thường là URL của ứng dụng đang được kiểm tra. Đối với người dùng Selenium IDE, lệnh này có thể rất giống lệnh open. Ví dụ : `driver.get("https://google.com");`  |
| getClass()     | Sử dụng để truy xuất đối tượng Class đại diện cho đối tượng đề cập. Ví dụ : `driver.getClass(); `   |
| getCurrentUrl()     | Sử dụng để truy xuất URL của trang web mà người dùng hiện đang truy cập. Command này không yêu cầu bất kỳ tham số nào và trả về giá trị chuỗi `driver.getCurrentUrl();`    |
| getPageSource()     | Sử dụng để truy xuất nguồn trang của trang web mà người dùng hiện đang truy cập. Không yêu cầu bất kỳ tham số nào và trả về giá trị chuỗi. Có thể sử dụng kết hợp với các phương thức khác như `contains()` để xác định sự hiện diện của giá trị chuỗi được chỉ định. Ví dụ : `boolean result = driver.getPageSource().contains("String to find");`  |
| getTitle()     | Sử dụng để truy xuất tiêu đề của trang web đang truy cập. Một chuỗi rỗng được trả về nếu trang web không có tiêu đề. Không yêu cầu bất kỳ tham số nào, trả về giá trị chuỗi đã cắt (trim) . Ví dụ : `String title = driver.getTitle();`   |
| getText()     | Sử dụng để lấy văn bản bên trong của phần tử web được chỉ định. Không yêu cầu bất kỳ tham số nào và trả về giá trị chuỗi. Đây cũng là một trong những lệnh được sử dụng rộng rãi để xác minh thông báo, label, lỗi, v.v. được hiển thị. Ví dụ : `String Text = driver.findElement(By.id("Text")).getText();`    |
| getAttribute()     | Sử dụng để truy xuất giá trị của thuộc tính được chỉ định. Command này yêu cầu một tham số chuỗi đơn tham chiếu đến một thuộc tính có giá trị mà chúng ta muốn biết và kết quả là trả về một giá trị chuỗi. Ví dụ : `driver.findElement(By.id("findID")); getAttribute("value");`    |
| getWindowHandle()     | Sử dụng để giải quyết tình huống khi có nhiều cửa sổ cần xử lý. Command này giúp chuyển sang cửa sổ mới và thực hiện các thao tác trên cửa sổ mới này. Người dùng cũng có thể chuyển trở lại cửa sổ trước đó nếu muốn.  Ví dụ : `private String winHandleBefore; winHandleBefore = driver.getWindowHandle(); driver.switchTo().window(winHandleBefore);`   |
| getWindowHandles()     | Lệnh này tương tự như lệnh “getWindowHandle()” nhưng có sự khác biệt nhỏ là nó giúp xử lý nhiều cửa sổ, cần dùng khi chúng ta phải xử lý nhiều hơn 2 cửa sổ.     |

**Ví dụ cho getWindowHandles() :**

```
public void explicitWaitForWinHandle(final WebDriver dvr, int timeOut, final boolean close) throws WeblivException
{

try {
Wait<WebDriver> wait = new WebDriverWait(dvr, timeOut);
ExpectedCondition<Boolean> condition = new ExpectedCondition<Boolean>() {

@Override
public Boolean apply(WebDriver d) {
int winHandleNum = d.getWindowHandles().size();

if (winHandleNum > 1)
{
// Switch to new window opened
for (String winHandle : d.getWindowHandles())
{
dvr.switchTo().window(winHandle);

// Close the delete window as it is not needed
if (close && dvr.getTitle().equals("Demo Delete Window"))
{
dvr.findElement(By.name("ok")).click();
}
}
return true;
}
return false;
}
};
```

### #2) Định vị link bằng linkText() và partialLinkText()

Hãy truy cập “google.com” và “abodeqa.com” bằng cách sử dụng phương thức **linkText()** và **partialLinText()** của WebDriver.

![](https://images.viblo.asia/c79c5beb-d5e9-4c56-aff1-dc4586908893.jpg)

**Các liên kết được đề cập ở trên có thể được truy cập bằng cách sử dụng các lệnh sau:**

```
driver.findElement(By.linkText(“Google”)).click();
driver.findElement(By.linkText(“abodeQA”)).click();
```

Lệnh tìm phần tử chứa văn bản liên kết và sau đó click vào phần tử đó, kết quả là chuyển hướng lại trang tương ứng.

**Các liên kết được đề cập ở trên cũng có thể được truy cập bằng cách sử dụng các lệnh sau:**

```
driver.findElement(By.partialLinkText(“Goo”)).click();
driver.findElement(By.partialLinkText(“abode”)).click();
```

Hai lệnh trên tìm các phần tử dựa trên chuỗi con (substring) của liên kết được cung cấp trong dấu ngoặc và sau đó click vào phần tử đó.

### #3) Chọn nhiều item của dropdown

Có 2 loại dropdown:

* **Single select dropdown** : chỉ cho phép chọn 1 item.
* **Multi-select dropdown** : có thể chọn nhiều item.

**Dưới đây là đoạn mã để tạo ra dropdown cho phép chọn nhiều item:**

```
<select id="SelectID_One" multiple="">
<option value="redvalue">Red</option>
<option value="greenvalue">Green</option>
<option value="yellowvalue">Yellow</option>
<option value="greyvalue">Grey</option>
</select>
```

![](https://images.viblo.asia/6d7c8378-829c-4660-915d-0ed448584cd1.jpg)

Còn dưới đây là đoạn mã ví dụ về action chọn nhiều item:

```
// select the multiple values from a dropdown
Select selectByValue = new Select(driver.findElement(By.id("SelectID_One")));
selectByValue.selectByValue("greenvalue");
selectByValue.selectByVisibleText("Red");
selectByValue.selectByIndex(2);
```

### #4) Submit form

Hầu hết tất cả các trang web đều có biểu mẫu cần được điền và gửi trong khi kiểm thử ứng dụng web. Ví dụ như : biểu mẫu Đăng nhập, biểu mẫu Đăng ký, biểu mẫu Tải lên tệp (Upload file), biểu mẫu tạo hồ sơ (Profile) ...

![](https://images.viblo.asia/683da6b4-c21b-4ff9-8d2a-ddebe679834c.jpg)

Trong WebDriver, có 2 cách để submit form : một là sử dụng phương thức được tạo riêng để gửi biểu mẫu, hai là sử dụng phương pháp nhấp vào nút gửi/submit.

Dưới đây là đoạn mã submit tương ứng:

```
// Nhập username hợp lệ
driver.findElement(By.<em>id</em>("username")).sendKeys("name");

// Nhập địa chỉ email hợp lệ
driver.findElement(By.<em>id</em>("email")).sendKeys("name@abc.com");

// Nhập password hợp lệ
driver.findElement(By.<em>id</em>("password")).sendKeys("namepass");

// Nhập lại password
driver.findElement(By.<em>id</em>("passwordConf")).sendKeys("namepass");

// submit form
driver.findElement(By.<em>id</em>("submit")).submit();
```

 Ngay khi trình điều khiển chương trình nhìn thấy phương thức submit, nó sẽ định vị phần tử và kích hoạt phương thức submit() trên phần tử web được tìm thấy.
 
###  #5) Xử lý iframe

Trong khi tự động hóa các ứng dụng web, có thể có những tình huống buộc phải xử lý nhiều khung trong một cửa sổ. Do đó, yêu cầu cần phải phát triển kịch bản có thể chuyển đổi qua lại giữa các khung hoặc iframe khác nhau cho vấn đề này.

Ví dụ chèn một tài liệu khác vào trong tài liệu HTML hiện tại hoặc đơn giản là mở một trang web bên trong một trang web khác bằng cách mở lồng nhau ...

```
<html>
<head><title>Software Testing Help - iframe session</title>
</head>
<body>
<div>
<iframe id="ParentFrame">
<iframe id="ChildFrame">
<input type="text" id="Username">UserID</input>
<input type="text" id="Password">Password</input>
</iframe>
<button id="LogIn">Log In</button>
</iframe>
</div>
</body>
</html>
```
 
Đoạn mã HTML trên minh họa sự hiện diện của một iframe (khung nội tuyến) được nhúng vào một iframe khác. Do đó, để có thể truy cập iframe con, trước tiên bắt buộc phải điều hướng đến iframe cha. Sau khi thực hiện thao tác bắt buộc, người dùng có thể phải điều hướng trở lại iframe cha để xử lý phần tử khác của trang web.

**Select iframe by id:**
`driver.switchTo().frame(“ID of the frame“);`

**Định vị iframe bằng tagName**

Trong khi định vị iframe, người dùng có thể gặp một số rắc rối nếu iframe đó không được gán với các thuộc tính tiêu chuẩn. Nó trở thành một quá trình phức tạp để định vị khung và chuyển sang nó. Để giải quyết vấn đề này, WebDriver cung cấp phương thức `tagName` để tìm iframe.

```
driver.switchTo().frame(driver.findElements(By.tagName(“iframe”).get(0));
```

Lệnh trên định vị phần tử web đầu tiên bằng tagName được chỉ định và chuyển sang iframe đó. "Get (0) được sử dụng để định vị iframe với giá trị chỉ mục." Do đó, theo dòng mã HTML, cú pháp mã trên sẽ dẫn điều khiển chương trình chuyển sang “ParentFrame” (iframe cha).

**Xác định iframe sử dụng index:**

***a) frame(index)***
`driver.switchTo().frame(0);`

***b) frame(Name of Frame)***
`driver.switchTo().frame(“name of the frame”);`

***c) frame(WebElement element)***
Select Parent Window:
```
driver.switchTo().defaultContent();
```
Lệnh trên đưa người dùng trở lại cửa sổ ban đầu, tức là ra khỏi cả hai khung nội tuyến.

### #6) close() và quit()

Có hai loại lệnh trong WebDriver để đóng biến thể trình duyệt web.

**a) close():** đóng cửa sổ trình duyệt web hiện đang được WebDriver truy cập. Lệnh không yêu cầu bất kỳ tham số nào cũng như không trả về bất kỳ giá trị nào.

**b) quit():** đóng tất cả các cửa sổ mà chương trình đã mở. Tương tự như close(), lệnh này không yêu cầu bất kỳ tham số nào cũng như không trả về bất kỳ giá trị nào.

```
driver.close(); // closes only a single window that is being accessed by the WebDriver instance currently
driver.quit(); // closes all the windows that were opened by the WebDriver instance
```

### #7) Xử lý ngoại lệ

Các trường hợp ngoại lệ là các điều kiện hoặc tình huống tạm dừng việc thực thi chương trình một cách bất ngờ. Nguyên nhân có thể do:

* Lỗi do người dùng
* Lỗi do lập trình viên
* Lỗi do tài nguyên vật lý

Do đó, để đối phó với những điều kiện bất ngờ này, việc xử lý ngoại lệ đã được hình thành.

**Catching 1 exception (Bắt 1 ngoại lệ)**

```
try{
// Protected block
// implement java code for automation
}
catch (ExceptionName e)
{
// catch block - Catches the exceptions generated in try block without halting the program execution
}
```

Nếu bất kỳ ngoại lệ nào xảy ra trong khối `try` (khối bảo vệ), thì trình điều khiển thực thi sẽ kiểm tra một khối `catch` phù hợp với loại ngoại lệ và chuyển ngoại lệ cho nó mà không phá vỡ quá trình thực thi chương trình.

**Multiple Catch Blocks**

```
try{
//Protected block
}
catch (ExceptionType1 e)
{
// catch block
}
catch (ExceptionType2 e)
{
// catch block
}
catch (ExceptionType3 e)
{
// catch block
}
```

Trong đoạn mã trên, một ngoại lệ có thể bị bắt trong khối `catch` đầu tiên nếu loại ngoại lệ phù hợp. Nếu loại ngoại lệ không khớp, thì ngoại lệ sẽ được chuyển qua khối `catch` thứ hai và khối `catch` thứ ba, v.v. cho đến khi tất cả các khối `catch` được truy cập.

**Điều kiện WebDriver và Xử lý Ngoại lệ**

Khi muốn xác minh sự hiện diện của bất kỳ phần tử nào trên trang web bằng cách sử dụng các lệnh điều kiện khác nhau của WebDriver, WebDriver sẽ giả định phần tử web có hiện diện trên trang web. Nếu phần tử web thực tế không có trên trang web, các lệnh có điều kiện sẽ bắn ra “NoSuchElementPresentException”. Do đó, để tránh những trường hợp ngoại lệ làm tạm dừng thực thi chương trình, chúng ta sẽ sử dụng cơ chế Xử lý Ngoại lệ. Tham khảo đoạn mã bên dưới:

```
WebElement saveButton = driver.findElement(By.id("Save"));
try{
if(saveButton.isDisplayed()){
saveButton.click();
   }
}
catch(NoSuchElementException e){
e.printStackTrace();
}
```

## List 25 WebDriver Command phổ biến

### #1) get()

Để mở một URL trong trình duyệt hiện tại.

**Syntax:**

```
driver.get("https://www.softwaretestinghelp.com");
```

**Giải thích:**

Điều hướng đến URL https://www.softwaretestinghelp.com

### #2) getCurrentUrl()

Được sử dụng lấy URL hiện tại của trang đang được truy cập, thường dùng khi muốn kiểm tra xem liệu URL đã chính xác hay chưa.

**Cú pháp lấy URL - Syntax:**

`driver.getCurrentUrl();`

Thường sử dụng phương pháp này trong các lệnh để kiểm tra xem đã điều hướng đến đúng trang như mong đợi hay chưa. Để làm được điều đó, chúng ta phải sử dụng Assert:

`Assert.assertEquals(expectedUrl,  driver.getCurrentUrl());`
*expectedUrl : URL mong muốn*

### #3) findElement(By, by) and click()

**findElement(By, by) và click() để Click vào bất cứ phần tử nào của trang**

Phương thức `findElement(By, by)` tìm kiếm và định vị phần tử đầu tiên trên trang hiện tại, sao cho khớp với tiêu chí được đưa ra dưới dạng tham số. Phương pháp này thường được sử dụng trong các lệnh để mô phỏng hành vi của người dùng như nhấp (click), gửi (submit), nhập (type), v.v...

Ví dụ command dưới đây tìm kiếm và định vị phần tử đầu tiên trong trang web có id "submit1" và click vào nó nếu phần tử đó không được che:

**Syntax:**

```
driver.findElement(By.id("submit1")).click();
```

Có thể định vị phần tử web bởi  **ID**, **Name**, **Class Name**, **Tag Name**, **Link Text & Partial Link Text**, **CSS Selector** hoặc **X Path**.

**Giải thích:**

* Tìm nút Submit được yêu cầu
* Click chuột vào button đó

Hoặc ví dụ về chọn 1 item trong list item của dropdown:

```
WebElement roleDropdown = driver.findElement(By.id("name1");
roleDropdown.click();
```

* Tìm và định vị item có id là “name1”. 
* Click vào item đó.

### #4) isEnabled()

Kiểm tra xem phần tử web là Enable hay Disable. Ví dụ:

```
boolean textBox = driver.findElement(By.xpath("//input[@name='textbox1']")).isEnabled();
```

### #5) findElement(By, by) with sendKeys()

Dùng khi muốn nhập giá trị vào form field.

Kiểm tra xác thực biểu mẫu bằng cách nhập các giá trị đầu vào khác nhau của người dùng thường được yêu cầu trong kiểm tra tự động hóa. Chúng ta sử dụng `findElement(By, by)` để định vị các trường/field và `sendKeys()` để nhập một số nội dung vào trường có thể chỉnh sửa.

Ví dụ dưới đây sử dụng bộ định vị Name để tìm field và nhập text “Aaron” cho nó:

```
driver.findElement(By.name("name")).sendkeys("Aaron");
```

### #6) findElement(By, by) with getText()

Tìm phần tử web và lấy nội dung văn bản trong thẻ HTML tương ứng:

```
String dropDown = driver.findElement(By.tagName("dropdown1")).getText();
```

* Tìm phần tử có tagName “dropdown1”.
* Lấy text bên trong thẻ HTML của nó.
* Lưu trữ text này vào đối tượng String ‘dropDown’.

### #7) Submit()

Thực hiện click nút submit và gửi form đi. Nút submit nằm bên trong thẻ HTML ‘form’ và loại nút là ‘submit’ (không phải ‘button’). Submit() làm cho cuộc sống dễ dàng hơn bằng cách tự động tìm nút và có thể thêm vào bất kỳ trường nào khác như tên hoặc địa chỉ email trong phương thức để gửi form đi. 

**Syntax:**

```
driver.findElement(By.xpath("//input[@name='comments']")).submit();
```

* Tìm phần tử web mà xpath có tên là ‘comments’.
* Submit form.

### #8) findElements(By, by)

Tìm dah sách các phần tử web.

**Syntax:**

```
List<WebElement> allChoices = dropDown.findElements(By.xpath(".//fruitoption"));
```
* Get danh sách tất cả các phần tử web với xpath ".//fruitoption" . Tạo 1 List webelement có tên là `allChoices` để lưu trữ danh sách get được này.

### #9) findElements(By, by) with size()

**findElements(By, by) with size()** để xác thực 1 thành phần web nào đó tồn tại hay không.

Lệnh dưới đây được sử dụng để xác minh rằng điều kiện định vị có trả về đối tượng cụ thể (có tồn tại yếu tố đó trong một trang web). Nếu size ()! = 0 thì phần tử hiện diện (present).

**Syntax:**

```
Boolean checkIfElementPresent= driver.findElements(By.xpath("//input[@id='checkbox2']")).size()!= 0;
```

* Tìm thành phần web trong xpath với id ‘checkbox2’.
* Dựa vào size của element list, hàm Boolean checkIfElementPresent sẽ được gán giá trị TRUE hoặc FALSE.

### #10) pageLoadTimeout(time,unit)

Set thời gian chờ tối đa để tải trang.

Đôi khi do sự cố máy chủ hoặc mạng chậm, một trang web có thể mất nhiều thời gian hơn bình thường để tải. Điều này có thể gây ra lỗi trong chương trình. Để tránh điều này, cần đặt thời gian chờ và `pageLoadTimeout()` sẽ hỗ trợ việc này. Cú pháp:

```
driver.manage().timeouts().pageLoadTimeout(500, SECONDS);
```
* Set thời gian chờ = 500s

### #11) implicitlyWait()

Set thời gian chờ trước khi tìm và định vị thành phần web.

Điều gì xảy ra nếu Webdriver cố gắng định vị một phần tử trước khi trang web tải và phần tử đó chưa xuất hiện? Sẽ dẫn đến `NoSuchElementExeption`. Để tránh điều này, cần thêm một lệnh để chờ ngầm trong một khoảng thời gian nhất định trước khi định vị phần tử web. Cú pháp:

```
driver.manage().timeouts().implicitlyWait(1000, TimeUnit.SECONDS);
```
* Chờ ngầm 1000s trước khi thực thi dòng code tiếp theo.

### #12) untill() and visibilityOfElementLocated()

**untill()** từ **WebdriverWait** và **visibilityOfElementLocated()** từ **ExpectedConditions** để đợi cho đến khi một phần tử hiển thị trong trang web.

Trong trường hợp một phần tử mất quá nhiều thời gian để hiển thị trên trang web thì việc áp dụng chờ ngầm (implicitlyWait) trở nên khó khăn. Trong trường hợp này, có thể sử dụng kết hợp method **untill()** của class **WebdriverWait** và method **visibilityOfElementLocated()** của class **ExpectedConditions** để đợi cho đến khi phần tử mong muốn hiển thị trong trang web.

```
WebDriverWait wait = new WebDriverWait(driver, 10);
WebElement element = wait.until(ExpectedConditions.visibilityOfElementLocated (By.xpath("//input[@id=’name’]")));
```

* Dòng lệnh đầu tiên : thiết lập thời gian chờ là 10s
* Dòng lệnh thứ 2 : thiết lập điều kiện chờ - xuất hiện thành phần web có id’name’ trong xpath tương ứng.

### #13) untill() and alertIsPresent()

Tương tự lệnh chờ until trên nhưng ở đây là chờ đến khi cảnh báo (alert) xuất hiện. Cú pháp:

```
WebDriverWait wait = new WebDriverWait(driver, 10);
WebElement element = wait.until(ExpectedConditions.alertIsPresent()
);
```
* Dòng lệnh đầu tiên : thiết lập thời gian chờ là 10s
* Dòng lệnh thứ 2 : thiết lập điều kiện chờ - xuất hiện 1 alert popup.

### #14) getTitle()

Get tiêu đề trang. Cú pháp:

```
String title = driver.getTitle();
System.out.println(title);
```
* Line 1 : Get tiêu đề trang và lưu giá trị vào String title
* Line 2 : xuất tiêu đề trang nhận được ra file output.

### #15) Select

Trong quá trình kiểm thử thường có các tình huống liên quan đến dropdown. Các phương thức từ Select class được sử dụng để xử lý điều này như : `selectByVisibleText()`, `selectByValue()` hoặc `selectByIndex()`

```
WebElement mySelectedElement = driver.findElement(By.id("select"));
Select dropdown= new Select(mySelectedElement);
dropdown.selectByVisibleText("Apple");
```
* Tìm Drop down có id “select”.
* Chọn item có text hiển thị là “Apple” trong list.

```
WebElement mySelectedElement = driver.findElement(By.id("select"));
Select dropdown= new Select(mySelectedElement);
Dropdown.selectByValue("Apple")
```
* Tìm Drop down có id “select”.
* Chọn item có value là “Apple” trong list.

```
WebElement mySelectedElement = driver.findElement(By.id("select"));
Select dropdown= new Select(mySelectedElement);
listbox.selectByIndex(1);
```
* Tìm Drop down có id “select”.
* Chọn item có  index value = ‘1’ trong list (phần tử thứ 2)

**Tương tự như select, chúng ta có thể bỏ chọn các giá trị của dropdown bằng các lệnh tương tự.**

```
WebElement mySelectedElement = driver.findElement(By.id("select"));
Select dropdown= new Select(mySelectedElement);
dropdown.deselectByVisibleText("Apple");
```

* Tìm dropdown có id “select”.
* Bỏ chọn item có hiển thị text là “Apple” từ dropdown.

```
WebElement mySelectedElement = driver.findElement(By.id("select"));
Select dropdown= new Select(mySelectedElement);
Dropdown.deselectByValue("Apple");
```
* Tìm dropdown có id “select”.
* Bỏ chọn item có value là “Apple” từ dropdown.

```
WebElement mySelectedElement = driver.findElement(By.id("select"));
Select dropdown= new Select(mySelectedElement);
listbox.deselectByIndex(1);
```
* Tìm dropdown có id “select”.
* Bỏ chọn item có index value ‘1’ từ dropdown (item thứ 2)

### #16) navigate()

Sử dụng để điều hướng giữa các URL.

Đôi khi chúng ta muốn điều hướng từ URL đích rồi quay lại hoặc chuyển tiếp. Trong những trường hợp như vậy, thay vì sử dụng lệnh `get()` thì có thể sử dụng lệnh `navigate()`. Trong Navigate chúng ta có thể sử dụng các phương thức `back()` và `forward()` mà không cần chỉ định URL cụ thể.

*Syntax:*
```
driver.navigate().to("https://www.softwaretestinghelp.com");
driver.navigate().back();
driver.navigate().forward();
```
* Điều hướng đến trang https://www.softwaretestinghelp.com
* Quay trở lại trang trước đó
* Chuyển sang trang tiếp theo


### #17)  getScreenshotAs()

Sử dụng để chụp toàn bộ màn hình trang trong Selenium WebDriver. Dùng trong trường hợp muốn lưu chi tiết công việc hoặc đôi khi kiểm tra đầu ra theo cách thủ công.


```
File shot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
FileUtils.copyFile(shot, new File("D:\\ shot1.jpg"));
```

* Chụp màn hình và lưu file vào đối tượng `object`
* Save file vào ổ D , đặt tên là shot1.png


### #18) moveToElement()

Cung cấp bởi class Actions, dùng để mô phỏng hiệu ứng di chuột.

Có những trường hợp chúng ta cần di chuột qua các phần tử web như qua menu để xem menu con, hover chuột và link để xem thay đổi màu sắc ... Trong những trường hợp này, chúng ta sử dụng lớp Actions. Ví dụ:

```
Actions actions = new Actions(driver);
WebElement mouseHover = driver.findElement(By.xpath("//div[@id='mainmenu1']/div"));
actions.moveToElement(mouseHover);
actions.perform();
```

* Tìm thành phần web với div id ‘mainmenu1’.
* Di chuột qua phần tử web này.

### #19) dragAndDrop()

Cung cấp bởi class Actions, dùng để kéo một phần tử và thả nó vào một phần tử khác. Thường được dùng để mô phỏng hành vi kéo/thả ảnh, file đính kèm …

```
WebElement sourceLocator = driver.findElement(By.xpath("//*[@id='image1']/a"));
WebElement destinationLocator = driver.findElement(By.xpath("//*[@id='stage']/li"));
Actions actions=new Actions(driver);
actions.dragAndDrop(sourceLocator, destinationLocator).build().perform();
```
* Tìm và Định vị phần tử web nguồn.
* Tìm và Định vị phần tử web đích.
* Kéo và thả phần tử nguồn vào phần tử đích.

### #20) switchTo() and accept(), dismiss() and sendKeys()

Cung cấp bởi class Alert, dùng để chuyển sang popup alert và xử lý chúng bằng cách kết hợp phương thức switchTo() với accept(), dismiss().

```
Alert alert = driver.switchTo().alert();
alert.sendKeys("This Is Softwaretestinghelp");
alert.accept()
```

* Chuyển sang cửa sổ cảnh báo.
* Nhập “This Is Softwaretestinghelp” bên trong cảnh báo.
* Chấp nhận cảnh báo và đóng cảnh báo.

Ngoài ra còn 1 số command như :

* #21) getWindowHandle() and getWindowHandles()

* #22) getConnection()

* #23) POI

* #24) assertEquals(),assertNotEquals(), assertTrue() and assertFalse()

* #25) close() and quit()

Chi tiết bạn có thể xem ở bài viết gốc sau:

https://www.softwaretestinghelp.com/selenium-webdriver-commands-selenium-tutorial-17/