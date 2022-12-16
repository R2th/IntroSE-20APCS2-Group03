Table, Frame và Dynamic Element là các phần thiết yếu không thể thiếu của bất kỳ web project nào. Chúng ta hãy cùng nhau tìm hiểu cách xử lý chúng trong tập lệnh selenium nhé.

### #1) Web Tables/HTML Tables

Web table (hay còn gọi là HTML table) về cơ bản là một nhóm các phần tử được lưu trữ một cách hợp lý ở định dạng hàng và cột. Nó được sử dụng để sắp xếp các thông tin tương tự nhau trên một trang web.

**Dưới đây là ví dụ về 1 HTML table đơn giản:**

![](https://images.viblo.asia/caa3f5a3-d7a3-4443-a216-0921d9f01762.jpg)

**Dưới đây là một phần đoạn mã cấu trúc HTML của table trên:**

![](https://images.viblo.asia/9a81cdc5-8dec-4487-bca8-ae8f340cba7f.jpg)

**Các thẻ định nghĩa table:**

1. ’table’ : thẻ xác định table.
2. ’tbody’ : thẻ xác định vùng chứa cho các hàng và cột của table.
3. ’tr’ : thẻ xác định các hàng của table.
4. ’td’/’th’ : thẻ xác định các cột của table (th - phần tử header / tiêu đề cột, td - phần tử nội dung/value)

**Tìm các phần tử của table:**

***Phương pháp #1:***

Dưới đây là xpath để tìm đến một ô bất kỳ của table:

```
//div[@id=’main’]/table[1]/tbody/tr[1]/th[1]
```

Trong ví dụ này thì đang đề cập đến ô đầu tiên :
* tr[1] : xác định hàng đầu tiên
* th[1] : xác định cột đầu tiên

Giả sử số lượng hàng và cột của bảng là hằng số (5 hàng + 3 cột, không đổi trong mọi trường hợp). Sử dụng vòng lặp để duyệt toàn bộ ô (cell) của table và in ra giá trị của tất cả các ô này (giữ nguyên xpath trên, thay số hàng và cột tương ứng vào mục chỉ số hàng + cột):

```
for(int numberOfRows=1; numberOfRows<=5; numberOfRows++)
{
for(int numberOfCol=1; numberOfCol <=3; numberOfCol++)
{
System.out.println(driver.findElement(By.xpath
(“//div[@id='main']/table[1]/tbody/tr
[“+numberOfRows+”]/th[“+numberOfCol+”]”)));
}
}
```

***Phương pháp #2:***

Phương pháp đầu tiên phù hợp nhất cho bảng không thay đổi kích thước của nó và luôn giữ nguyên. Cách tiếp cận trên sẽ không phải là một giải pháp hoàn hảo cho các table web thay đổi động. Dưới đây là giải pháp cho các table động này:

```
WebElement htmltable=driver.findElement(By.xpath("//*[@id='main']/table[1]/tbody"));
List<WebElement> rows=htmltable.findElements(By.tagName("tr"));
 
for(int rnum=0;rnum<rows.size();rnum++)
{
List<WebElement> columns=rows.get(rnum).findElements(By.tagName("th"));
System.out.println("Number of columns:"+columns.size());
 
for(int cnum=0;cnum<columns.size();cnum++)
{
System.out.println(columns.get(cnum).getText());
}
}
```

**Bước 1** : Lấy toàn bộ table và lưu trữ bảng này bằng biến có tên ‘htmltable’

**Bước 2** : Lấy tất cả các hàng có thẻ là ‘tr’ và lưu trữ tất cả các phần tử này vào trong 1 list có tên là ‘rows’

**Bước 3** : Lặp qua từng hàng và lấy danh sách các phần tử có thẻ ‘th’. Lệnh `'rows.get(0)’` sẽ get hàng đầu tiên và `‘findElements(By.tagName(“th”))’` sẽ get danh sách các cột của hàng này.

**Bước 4** : Lặp lại bằng cách sử dụng lệnh `‘columns.getsize()’` và get chi tiết của từng ô (tất cả các cô của hàng đang duyệt).

### #2) Frames

Trong phần này, chúng ta sẽ tìm hiểu về các khung (Frame) trong một trang web và cách xác định các khung. Ngoài ra, chúng ta sẽ tìm hiểu cách có thể xử lý một khung trong Selenium WebDriver.

Nhiều nhà phát triển thích đặt các phần tử bên trong khung. Khung giống như một thùng chứa nơi có thể nhóm một số phần tử.

**Nhận dạng khung:**

Các cách khác nhau để nhận biết phần tử có bên trong khung hay không:

**#1.** Nhấp chuột phải vào phần tử. Kiểm tra xem tùy chọn `“This Frame”` có khả dụng không. Nếu tùy chọn `“This Frame”` khả dụng, điều đó có nghĩa là phần tử nằm bên trong khung.

![](https://images.viblo.asia/5d31db2b-a52f-4e17-b95c-bfdb0e26ecb9.jpg)

**#2.** Xem mã nguồn của trang web và kiểm tra xem có thẻ ‘iframe’ nào cho phần tử này hay không.

**Xác minh số lượng khung trong một trang web:**

Tất cả frame đều có tag name là “iframe”.

```
List<WebElement> frameList=driver.findElements(By.tagName(“iframe”));
System.out.println(frameList.size());
```

Trong ví dụ trên : biến `frameList` được sử dụng để lưu trữ tất cả các frame của trang web. Và lệnh `frameList.size()` được sử dụng để đếm số lượng của list này.

**Xử lý một phần tử bên trong khung:**

Nếu một phần tử nằm bên trong khung thì bộ điều khiển phải chuyển sang khung trước rồi mới bắt đầu hoạt động trên các phần tử.

**Bước 1:** Chuyển đổi bên trong khung:

```
driver.switchTo().frame(1); //chuyển sang khung số 1.
or
driver.switchTo().frame(“frame Name”); //chuyển sang khung “frame Name”.
or
driver.switchTo().frame(“xpath of the frame”);
```

**Bước 2 :** Truy cập vào phần tử của khung (Sau khi chuyển đổi bên trong khung, sẽ có thể hoạt động trên các phần tử):

```
driver.findElement(//*[@id=’username’]).sendKeys(“username”);
driver.findElement(//*[@id=’pass’]).sendKeys(“password”);
```

### #3) Dynamic Element

Trong phần này, chúng ta sẽ tìm hiểu các cách khác nhau để xử lý phần tử động và xây dựng Xpath chung. Các thuộc tính phần tử thay đổi động này có thể là ‘id’, ’name’, v.v...

**Ví dụ về 1 phần tử động :** Giả sử ‘id’ của trường "username" là ‘username_123’ và XPath là: `//*[@id=’username_123′]` . Nhưng truy cập lại vào trang web sau đó thì ‘id’ của trường ‘username’ thay đổi thành giá trị mới, ví dụ như ‘username_234’.

Trong trường hợp này, quá trình kiểm tra sẽ không thành công vì selenium không thể tìm thấy XPath mà bạn đã vượt qua trước đó vì id của trường đã thay đổi thành một số giá trị khác.

Để giải quyết vấn đề này có nhiều cách tiếp cận - tùy thuộc vào loại vấn đề:

**Loại vấn đề 1: Thay đổi một phần giá trị thuộc tính:**

Ví dụ: Như trong ví dụ trên, giá trị id thay đổi nhưng một số trường không đổi : ‘username_123’ đã thay đổi thành ‘username_234’ nhưng trường ‘username’ luôn không đổi.

***Bạn có thể xây dựng xpath như sau:***

```
driver.findElement(By.xpath(“//*[contains(@id,’username’)]”)).sendKeys(“username”);
driver.findElement(By.xpath(“//*[starts-with(@id,’user’)]”)).sendKeys(“username”);
```

`contains` là 1 phương thức java kiểm tra xem "id" có chứa substring "username" hay không.
`starts-with()` kiểm tra xem có thuộc tính nào bắt đầu bằng “user” không.

***Loại vấn đề 2: Thay đổi toàn bộ giá trị thuộc tính:***

![](https://images.viblo.asia/d26d4da0-f4b3-46bc-bfd8-369d78f23702.jpg)

Ví dụ: Nếu id của trường 'login' thay đổi động và không có giá trị cố định để sử dụng phương thức `contains`.

**Giải pháp:** Sử dụng `sendKeys`.
Selenium cung cấp các API khác nhau để sử dụng các phím chức năng. Ví dụ: phím tab, phím enter, F5, v.v...

**Bước 1 :** Nhập password
```
driver.findElement(By.id(“password”)).sendKeys(“password”));
```

**Bước 2 :** Sử dụng các chức năng key để điều hướng đến phần tử:
```
driver.findElement(By.id(“password”)).sendKeys(Keys.ENTER));
```
hoặc
```
driver.findElement(By.id(“password”)).sendKeys(Keys.TAB));
```

Hiểu cấu trúc của XPath chung rất hữu ích cho việc xử lý các phần tử động. Trong trường hợp có khung, tập lệnh của bạn phải chuyển đổi khung và sau đó truy cập vào các phần tử.

Bài dịch từ nguồn : https://www.softwaretestinghelp.com/selenium-tutorial-18/