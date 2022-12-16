Ở bài viết trước mình và các bạn đã cùng nhau tìm hiểu về "[Một số commands mà Automation Tester cần biết](https://viblo.asia/p/mot-so-commands-ma-automation-tester-can-biet-Eb85oaxOZ2G)". Bài viết này chúng ta cùng tìm hiểu những vấn đề liên quan đến cách xử lý và thao tác với DropDown/Multi Select box trên các website. Chúng ta sử dụng Selenium WebDriver để xử lý vì nó hõ trợ kiểm tra các giá trị của DropDown/Multi Select box bằng cách sử dụng lớp Select.

Trước khi sử dụng lớp Select, cần import vào thư viện 
   
**import org.openqa.selenium.support.ui.Select;**
   


Ví dụ: Truy cập trang Sample WebPage for Automation Testing (https://www.testandquiz.com/selenium/testing.html), chú ý đến dropdown "Drop down".

![](https://images.viblo.asia/a6fa7792-e474-44dc-9394-f0daaa2fbb3b.png)

## Step 1:

Import the "Select" package vào thư viện


-----

     import org.openqa.selenium.support.ui.Select
     
-----


## Step 2:
Tiếp theo chúng ta khai báo Elenment của dropdown bằng cách sử dụng  các command "findElement(By, by)" mà bài trước đã tìm hiểu.


-----
```
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));
```
-----
## Step 3:
Bây giờ chúng ta có thể thao tác select hoặc deselect các items trong dropdown/multi-select box. Chúng ta có 3 phương thức để select hoặc deselect các items trong dropdown/multi-select box

* **selectByVisibleText(String arg0) : void** - Dùng để chọn bất kỳ item hiển thị trong dropdown/multi-select box

-----
```
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));
     dropdown.selectByVisibleText("Database Testing"); 
```
-----

* **selectByIndex(int arg0) : void** - Gần giống như selectByVisibleText nhưng điểm khác biệt duy nhất ở đây là cung cấp số chỉ mục của tùy chọn ứng items. 

-----
```
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));
     dropdown.selectByIndex(3); 
```
-----
*Lưu ý : Index bắt đầu từ 0, nên item thứ tư sẽ có index = 3.*

* **selectByValue(String arg0) : void** - Dùng để chọn item trong dropdown/multi-select box theo thuộc tính value của thẻ <option>.


-----
```
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));
     dropdown.selectByValue("Database");
```
-----

Đối với phương thức để deselect các item trong dropdown/multi-select box thì tương tự như các phương thức select.
    

-----
```
    deselectByIndex(int arg0);
     deselectByValue(String arg0);
     deselectByVisibleText(String arg0);
```
-----

* **getOption()** - Dùng để đếm các items trong dropdown/multi-select box


-----
```
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));
     List <WebElement> osize = dropdown.getOptions();
     int iSize = osize.size();
	 System.out.println("Số giá trị trong dropdown/multi-select box : " + iSize);
```
-----

* **In ra các items** 


-----
```java
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));
     List <WebElement> osize = dropdown.getOptions();
     int iSize = osize.size();
     for(int i= 0; i<iSize; i++) {
	 String sValue= osize.get(i).getText();
	 System.out.println(sValue);
```             

-----

*  **isMultiple()** - Kiểm tra xem dropdown có phải là multi select hay là single select?


-----
```java
    Select dropdown = new Select(driver.findElement(By.id("testingDropdown")));	
	 if (dropdown.isMultiple()) { 
		dropdown.selectByIndex(0);
		dropdown.selectByIndex(1);
		dropdown.selectByIndex(2);
		dropdown.selectByIndex(3);
                            
	 } else {
	    	 driver.quit();
	         System.out.println("Không phải multi-select box :(");
	        
	   };
```
-----
* **Multi Select Methods** - Chỉ áp dụng cho multi-select box, không áp dụng cho dropdown/listbox


-----
```java
    Select oSelect = new Select(driver.findElement(By.id(Element_ID)));
	 oSelect.selectByIndex(index)
	 oSelect.selectByIndex(index)

	//  hoặc có thể sử dụng

	 oSelect.selectByVisibleText(text)
	 oSelect.selectByVisibleText(text)

	// hoặc có thể sử dụng

	 oSelect.selectByValue(value)
	 oSelect.selectByValue(value)
```
-----

                            
## Thực hành
1. Khởi động trình duyệt Chrome
2. Truy cập "https://www.toolsqa.com/automation-practice-form/"
3. Sử dụng ID locator để xác định element "Drop down"
4. Select item "Wait Commands" (Dùng selectByIndex and deselectByIndex)
5. Đếm và in ra items
6. Kiểm tra xem dropdown có phải là multi select hay là single select?
7. Đóng trình duyệt

  

-----
```java
    package automationtest;

    import java.util.List;
    import java.util.concurrent.TimeUnit;
    import org.openqa.selenium.By;
    import org.openqa.selenium.WebDriver;
    import org.openqa.selenium.WebElement;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.Select;

    public class Dropdown_Test {
    public static void main(String[] args) throws InterruptedException {
	System.setProperty("webdriver.gecko.driver", "D:\\TuanBin\\chromedriver_win32");
	
	//Tạo phiên làm việc mới trình điều khiển Chrome
	WebDriver driver = new ChromeDriver();
	
	driver.manage().window().maximize();
	
	//Khởi chạy URL
	String URL = "https://www.toolsqa.com/automation-practice-form/";
	driver.navigate().to(URL);
	
	driver.manage().timeouts().implicitlyWait(100, TimeUnit.SECONDS);	
	
	// Sử dụng ID locator để xác định element "Selenium Commands"
	Select dropdown = new Select(driver.findElement(By.id("selenium_commands")));
	
	//Select item "Wait Commands" (Dùng selectByIndex and deselectByIndex)
	dropdown.selectByIndex(2);
	Thread.sleep(100);
	dropdown.deselectByIndex(2);
	
	//Đếm và in ra items
	List <WebElement> osize = dropdown.getOptions();
	int iSize = osize.size();
	
	//In ra số items
	System.out.println("Số items trong dropdown : " + iSize);
	for(int i= 0; i<iSize; i++) {
	String sValue= osize.get(i).getText();
	
	//In ra các items
	System.out.println(sValue);
	}
	
	//Kiểm tra xem dropdown có phải là multi select hay là single select?
	if (dropdown.isMultiple()) { 
		dropdown.selectByIndex(0);
		dropdown.selectByIndex(1);
		dropdown.selectByIndex(2);
		dropdown.selectByIndex(3);
	 	
	 } else {
	    driver.quit();
	    System.out.println("Không phải multi-select box :(");    
	     };
	
	//Đóng trình duyệt
	driver.quit();
	}
}
```

-----

Trên đây là là phương thức hay gặp và hay dùng nhất, Lớp Select vẫn còn nhiều phương thức khác nữa. Các bạn có thể tìm hiểu thêm, còn ở bài viết này chúng ta đã tìm hiểu rõ hơn các thao tác với DropDown/Multi Select box, cũng như áp dụng vào bài thực hành.  Chúng ta sẽ gặp lại nhau vào bài viết sau. Cảm ơn các bạn đã quan tâm đọc bài viết.
                          
                                  
                            
                            
                         
                            
                            
*Tài liệu tham khảo: https://www.toolsqa.com/selenium-webdriver/dropdown-multiple-select-operations/*