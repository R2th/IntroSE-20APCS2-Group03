Bài viết trước, mình đã trình bày về CSS Selector là gì, dùng khi nào, tại sao dùng và dùng như thế nào. Lý do dùng và thời điểm dùng XPath khá giống với CSS Selector nên mình sẽ không viết lại ở bài viết này mà đi thẳng luôn vào cách xác định phần tử bằng Xpath.
Đây là phần 1 nên mình sẽ cùng các bạn tìm hiểu 8 cách xác định phần tử bằng Xpath và cách lấy Xpath đơn giản trên trình duyệt Chrome.
## 1. Các cách xác định phần tử bằng Xpath
1. Single Slash
2. Double Slash
3. Single Attribute
4. Multiple Attribute
5. AND
6. OR
7. Contains()
8. Starts_with()
9. Text()
10. Last()
11. Position()
12. Index()
13. Following xpath axes
14. Preceding xpath axes
## 2. Cách sử dụng
***2.1. Single Slash***

Hay còn biết đến là XPath tuyệt đối. Nó cho phép bạn định vị một đối tượng UI theo đường dẫn tuyệt đối đến đối tượng đó.
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)

*Cú pháp*: `html/body/tagname/tagname/tagname/...`

*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("html/body/section/section/div/div[2]/div[2]/div[1]/div[1]/div[1]/ul/li[1]/a"));
```
div[2] nghĩa là thẻ div ở vị trí thứ hai trong list thẻ div đều là con của thẻ cha nào đó, số trong dấu [] là số thứ tự của thẻ con trong list thẻ con của thẻ cha nào đó.

*Giải thích nội dung:* `html/body/section/section/div/div[2]/div[2]/div[1]/div[1]/div[1]/ul/li[1]/a`

Thẻ HTML -> thẻ body(thẻ con nằm trong thẻ html) 

-> thẻ section(thẻ con nằm trong thẻ body) -> thẻ section(thẻ con nằm trong thẻ section) 

-> thẻ div(thẻ con của thẻ section) -> thẻ div[2](thẻ con thứ hai trong list thẻ con của thẻ div trước đó) 

-> thẻ div[2](thẻ con thứ hai trong list thẻ con của thẻ div thứ hai ngay trước đó) -> thẻ div[1](thẻ con thứ nhất trong list thẻ con của thẻ div thứ hai ngay trước đó)

-> tương tự ta sẽ tìm ra thẻ a như nội dung đã nêu trên.
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("html/body/section/section/div/div[2]/div[2]/div[1]/div[1]/div[1]/ul/li[1]/a"));
```
***2.2. Double Slash***

Hay còn biết đến là XPath tương đối. Nó cho phép bạn định vị một đối tượng UI theo đường dẫn tương đối đến đối tượng đó.
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)

*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//section//section//div/div[2]/div[2]/div[1]/div[1]/div[1]/ul/li[1]/a"));
```
`//section//div` : lấy tất cả các thẻ div nằm trong thẻ section

***2.3. Single Attribute***

*Cú pháp*: `//<tag name>[@attribute=value]` hoặc `//*[@attribute=value]`
'*' nghĩa là lấy tất cả các thẻ thỏa mãn giá trị của attribute
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[@id='header_promotion_tab_01']/a"));
//hoặc
// driver.findElement(By.xpath("//li[@id='header_promotion_tab_01']/a"));
```
Ta có thể định vị thẻ a dựa trên id của thẻ li chứa thẻ a

***2.4. Multiple Attribute***

*Cú pháp*: `//<tag name>[@attribute1=value1][@attribute2=value2]` hoặc `//*[@attribute1=value1][@attribute2=value2]`
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[@id='header_promotion_tab_01'][@class='mini-logo active']/a"));
//hoặc
// driver.findElement(By.xpath("//li[@id='header_promotion_tab_01'][@class='mini-logo active']/a"));
```
Định vị thẻ a dựa trên id và class name của thẻ li chứa thẻ a

***2.5. AND***

*Cú pháp*: `//<tag name>[@attribute1=value1 and @attribute2=value2]` hoặc `//*[@attribute1=value1 and @attribute2=value2]`
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[@id='header_promotion_tab_01' and @class='mini-logo active']/a"));
//hoặc
// driver.findElement(By.xpath("//li[@id='header_promotion_tab_01' and @class='mini-logo active']/a"));
```

***2.6. OR***

*Cú pháp*: `//<tag name>[@attribute1=value1 or @attribute2=value2]` hoặc `//*[@attribute1=value1 or @attribute2=value2]`
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[@id='header_promotion_tab_01' or @class='mini-logo active']/a"));
//hoặc
// driver.findElement(By.xpath("//li[@id='header_promotion_tab_01' or @class='mini-logo active']/a"));
```

***2.7. Contains()***

Định vị phần tử thông qua 1 phần giá trị của thuộc tính nào đó của thẻ.

*Cú pháp*: `//<tag name>[contains(@attribute,value)]` hoặc `//*[contains(@attribute,value)]`
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[contains(@id,'header_promotion_tab')]/a"));
//hoặc
// driver.findElement(By.xpath("//li[contains(@id,'header_promotion_tab')]/a"));
```

***2.8 Startswith()***

Định vị phần tử thông qua giá trị của thuộc tính nào đó của thẻ bắt đầu với ký tự gì.

*Cú pháp*: `//<tag name>[starts-with(@attribute, value)]` hoặc `//*[starts-with(@attribute,value)]`
![](https://images.viblo.asia/5facbaad-3a7a-4ead-a4ed-cec9d7206e5f.png)
*Chương trình tương ứng*
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[starts-with(@id,'header_promotion')]/a"));
//hoặc
// driver.findElement(By.xpath("//li[starts-with(@id,'header_promotion')]/a"));
```

***Cách lấy XPath đơn giản trên Chrome***

Đầu tiên, chọn đối tượng bạn cần định vị, sau đó click chuột phải chọn Inspect.
![](https://images.viblo.asia/e0760357-f8b7-4305-900a-c12701666e25.png)
Tiếp theo, chọn vùng khoang màu( chính là đối tượng bạn cần định vị), click chuột phải và chọn Copy, tiếp theo chọn Copy Xpath.
![](https://images.viblo.asia/37118bd0-ab99-46df-921d-372b2a518479.png)
Copy vào source code và thế là xong.
```
WebDriver driver = new ChromeDriver();
driver.get("https://www.kidsplaza.vn/customer/account/login/");
driver.findElement(By.xpath("//*[@id='header_promotion_tab_01']/a"));
```

***Tài liệu tham khảo:***

https://www.softwaretestingmaterial.com/dynamic-xpath-in-selenium/

Cảm ơn mọi người đã đọc bài viết của mình và mong các bạn góp ý với bài viết này.
*Note:* Mình cũng viết bài trên trang blogger, nếu muốn các bạn có thể ghé qua và góp ý([Link](https://www.blogger.com/blogger.g?blogID=786750462536776027#allposts))