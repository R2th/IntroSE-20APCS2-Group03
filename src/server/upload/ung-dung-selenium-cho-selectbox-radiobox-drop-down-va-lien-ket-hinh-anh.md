Ngoài những elements như textbox, action button thì ngoài ra chúng ta cùng cần đến sự tương tác với các elements cũng cơ bản không kém như Radio Button, CheckBox, Drop-Down, liên kết hình ảnh .....
# 1. Tương tác với Radio Button
* Chúng ta có thể dễ dàng tương tác với Radio Button bằng cách sử dụng câu lệnh click().
* Với đặc tính của Radio button, mỗi khi bạn click vào 1 lựa chọn thì lựa chọn trước đó sẽ bị hủy.

![](https://images.viblo.asia/01653f5c-24f1-4667-adca-64cb02247cf8.png)

# 2. Tương tác với CheckBox 
* Việc tương tác với CheckBox cũng tương tự với các loại button cơ bản khác, chúng ta có thể dễ dàng tương tác với nó thông qua câu lệnh click().
* Với CheckBox, bạn có thể ứng dụng cho các CheckBox remember khi log - in, hoàn thành form, ... Đặc thù của CheckBox là nếu 1 group có nhiều option, bạn có thể lựa chọn nhiều option khác nhau trong cùng 1 group đó. 
   ![](https://images.viblo.asia/0f973f54-4692-4618-a2a8-81c937f40102.png)<br/><br/>
* Ngoài việc truyền đi lệnh chọn, chúng ta còn có thể kiểm tra tình trạng của 1 option nào đó xem nó có đang được chọn hay không, để làm được việc đó ta có thể sử dụng câu lệnh isSelected().
* Kết quả trả về của câu lệnh isSelected() là giá trị boolean, nghĩa là chỉ có thể nhận định đúng/sai, bạn có thể tham khảo ví dụ sau:

![](https://images.viblo.asia/374232a8-0013-4368-b3ee-577db46b8636.png)

# 3. Tương tác với Drop-Down
* Để bắt đầu tương tác với kiểu dữ liệu này, bạn cần xác định được đối tượng dropdown cần tương tác và khai báo chúng dưới dạng biến Select.
 
*  Ví dụ:
 ![](https://images.viblo.asia/69641928-9534-4cab-bcaa-fe948a293881.png)

**Bước 1:** Import thư viện "Select" 
```
import org.openqa.selenium.support.ui.Select;
```

**Bước 2:** Khởi tạo biến Drop-down dưới dạng Select object trong WebDriver

```
Select country = new Select(driver.findElement(By.name(country)));
```
**Bước 3:** Bạn có thể bắt đầu tương tác với drop-down thông qua biến country vừa được khởi tạo ở bước 2 bằng các câu lệnh riêng biệt, ví dụ như:
```
country.selectByVisibleText("ANTARCTICA");
```
* Với câu lệnh trên bạn đã chọn thành công option ANTARCTICA trên drop-down.

* Ngoài ra, với 1 số dạng dropdown cho phép chọn nhiều option cùng lúc như thế này:
![](https://images.viblo.asia/fc6c4226-b7f1-4bb1-a51f-2a7673c253c6.png)
* Giải pháp: bạn có thể dễ dàng chọn lần lượt các lựa chọn mình mong muốn
 ```
Select fruits = new Select(driver.findElement(By.id(fruits)));
fruits.selectByVisibleText("banana");
fruits.selectByIndex(1);
```
* **Kết quả:** bạn đã chọn thành công cùng lúc Banana và Apple trên danh sách fruits ở ví dụ trên.

* Ngoài ra, chúng ta sẽ còn có 1 số phương thức đặc trưng khác cho kiểu dữ liệu Drop - down như:

| Phương thức | Chức năng |
| -------- | -------- |
|**selectByVisibleText(<thamso>)** <br/> và<br/> **deselectByVisibleText(<thamso>)** <br/>***Ví dụ:*** country.selectByVisibleText("ANTARCTICA");<br/>country.deselectByVisibleText("ANTARCTICA");  | Đây là phương thức chọn (select) và bỏ chọn (deselect) mà bạn có thể tùy ý tương tác với option mà mình mong muốn theo tham số truyền vào <br/>*Tham số:* Text của option| 
|**selectByValue(<thamso>)** <br/> và <br/>**deselectByValue(<thamso>)**  <br/>***Ví dụ:*** country.selectByValue("234");| Đây là phương thức chọn (select) và bỏ chọn (deselect) mà bạn có thể tùy ý tương tác với option theo tham số tương ứng với value của option chỉ định <br/>*Tham số:* giá trị của thuộc tính value trong từng option, như ví dụ sau: ![](https://images.viblo.asia/85233a51-6eb7-4389-b4a3-6e654fb5015b.png)| 
|**selectByIndex(<thamso>)** <br/>và<br/> **deselectByIndex(<thamso>)**  <br/>***Ví dụ:*** country.selectByIndex(0);| Đây là phương thức chọn (select) và bỏ chọn (deselect) mà bạn có thể tùy ý tương tác với những option theo chỉ mục của nó<br/>*Tham số:* chỉ mục của từng option, thường được đếm từ 0,1,2,...| 
|**isMultiple()**  <br/>***Ví dụ:*** `if(fruits.isMultiple()) {  }`| Đây là phương thức sẽ trả về giá trị true/ false để kiểm tra trạng thái của drop-down có cho phép chọn nhiều giá trị cùng 1 lúc không?| 
|**deselectAll()**  <br/>***Ví dụ:*** `fruits.deselectAll()`| Xóa tất cả các mục đã chọn. Điều này chỉ hợp lệ khi drop-down hỗ trợ nhiều lựa chọn.| 
 
# 4. Tương tác với liên kết hình ảnh

* Liên kết hình ảnh là các liên kết trong các trang web được thể hiện bằng một hình ảnh ( thường là logo) mà khi nhấp vào thì sẽ redirect đến một trang khác.
* Và vì bởi chúng là hình ảnh, nên chúng ta không thể sử dụng các phương thức như By.linkText () và By.partialLinkText () cho câu lệnh [findElement()](https://viblo.asia/p/lam-sao-de-su-dung-cau-lenh-findelement-va-findelements-trong-selenium-3Q75w8B7KWb) vì về cơ bản các liên kết hình ảnh sẽ không có link text. 
* Trong trường hợp này, chúng ta nên sử dụng phương thức tìm kiếm By.cssSelector hoặc By.xpath. Trong đó, phương thức By.cssSelector được ưa thích hơn vì tính đơn giản, dễ sử dụng.
* Trong ví dụ bên dưới, chúng ta sẽ truy cập logo "Facebook" ở phần trên bên trái của trang Khôi phục mật khẩu của Facebook.
    
    ![](https://images.viblo.asia/98b85aff-5677-4b72-bc7b-f6fe1d49a4a5.png)
* Ở đây, chúng ta sẽ sử dụng phương thức By.cssSelector và thuộc tính "title" của phần tử (như ảnh trên) để tương tác với hình ảnh. Và sau đó chúng ta sẽ có thể redirect đến trang chủ của Facebook bằng cách:
```
        driver.findElement(By.cssSelector("a[title=\"Go to Facebook home\"]")).click();					
			if (driver.getTitle().equals("Facebook - log in or sign up")) {							
                    System.out.println("We are back at Facebook's homepage");					
                } 
            else {			
                    System.out.println("We are NOT in Facebook's homepage");					
                 }		
				
```
* Khi câu lệnh trên chạy thành công, kết quả bạn nhận được sẽ là:
    
 ![](https://images.viblo.asia/b2ce4230-e949-448d-95fe-94ff0544bbfc.png)

# 5. Kết luận:
* Ngoài những phần tử trên và những loại phần tử trong những bài trước cùng series [Học Selenium Automation Test](https://viblo.asia/s/hoc-selenium-automation-test-L6lAy1j4lek), với mỗi kiểu phần tử khác nhay, Selenium WebDriver đều hỗ trợ người dùng để có thể tiếp cận đến và thao tác trên chúng một cách tương đối dễ hiểu và không cần am hiểu quá sâu về coding thì chúng ta cũng có thể dễ dàng sử dụng những câu lệnh này.
* Tuy nhiên, có thể có những bạn sẽ gặp phải khó khăn khi tìm kiếm id, value, xPath,... của phần tử mong muốn tương tác, nhưng trên quan điểm cá nhân, tôi nhận thấy Selenium WebDriver vẫn là một phương pháp tiếp cận tương đối đơn giản, dễ hòa nhập đối với các bạn tester/ QA  trong bước đầu tìm hiểu về Automation Testing. 


# Tham khảo:
https://www.guru99.com/checkbox-and-radio-button-webdriver.html<br/>
https://www.guru99.com/select-option-dropdown-selenium-webdriver.html<br/>
https://www.guru99.com/click-on-image-in-selenium.html