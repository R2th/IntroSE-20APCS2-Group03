Bắt một exception - ngoại lệ trong mã tự động hóa là rất phổ biến. ‘Ngoại lệ’ biểu thị trường hợp đặc biệt hoặc không phổ biến.

Việc thực thi mã tự động có thể không được như mong đợi do nhiều yếu tố khách quan liên quan đến quá trình thực thi như vấn đề ổn định mạng, sự cố Internet, độ ổn định của máy chủ, v.v... Từ đó chúng ta có thể sẽ nhận được ngoại lệ trả về do không đủ thời gian chờ hoặc cú pháp, tham số không chính xác, v.v...

Vì vậy việc tìm hiểu về các ngoại lệ và cách xử lý chúng cũng rất cần thiết trong quá trình tạo các mã tự động hóa.

### Exception là gì?

Ngoại lệ là các sự kiện do chương trình kết thúc đột ngột mà không đưa ra kết quả mong đợi. Java có cung cấp một framework nơi người dùng có thể xử lý các ngoại lệ.

Tiến trình xử lý các ngoại lệ được gọi là Exception Handling.

Các ngoại lệ cần được xử lý vì chúng phá vỡ quy trình thực thi bình thường của một chương trình. Một trong những mục đích quan trọng của việc xử lý ngoại lệ là ngăn chặn sự phá vỡ này để tiếp tục thực thi chương trình. Hoặc thực hiện một số hành động nào đó khi xảy ra một ngoại lệ nhất định.

Khi 1 ngoại lệ xảy ra thì 1 đối tượng ngoại lệ ‘Throwing an Exception’  được khởi tạo cùng với các khối Try/Catch ví dụ như sau:

```
try {
// Protected code 
} catch (ExceptionName e) {
// Catch block 
}
```

* Khi có ngoại lệ `e` nào đó xảy ra thì statement `catch` sẽ được thực thi.
* Khi không còn ngoại lệ `e` thì statement `try` được thực thi và bỏ qua statement `catch`
* Nên sử dụng try / catch để xử lý những việc sai và nằm ngoài tầm kiểm soát.

Nên sử dụng các phương pháp `Avoid-And-Handle` để tránh ngoại lệ trước, nếu không tránh được ngoại lệ thì mới xử lý.

**Ưu điểm và nhược điểm của phương pháp Avoid-Handle này:**

***Ưu điểm:***
* Làm giảm cơ hội nhận được ngoại lệ
* Nếu một ngoại lệ vẫn bị bắt thì nó sẽ là một trường hợp thực sự đặc biệt đáng để kiểm tra
* Giảm thời gian gỡ lỗi. Mã tự động hóa nhằm mục đích tìm ra lỗi và bạn không muốn thấy quá nhiều ngoại lệ không mong muốn và tìm lý do đằng sau từng lỗi đó
* Trong khối Catch, bạn đối phó với các trường hợp giá trị hơn
* Giảm các lỗi sai
* Báo cáo rõ ràng hơn

***Nhược điểm:***
* Tăng số lượng dòng code vì bạn thêm mã bổ sung để tránh ngoại lệ
* Cần có hiểu biết về các API, command và ngoại lệ của Web Driver

Để tìm hiểu về phương pháp `Avoid-And-Handle` này thì trước hết cần hiểu cơ bản về Exception Handling and các khối Try/Catch.

### Các loại Exception trong Java và Selenium

**Có 3 loại exception:**
1. Checked Exception
2. Unchecked Exception
3. Error

**Phân cấp lớp của ngoại lệ và lỗi:**

![](https://images.viblo.asia/617ec5c0-fe54-452b-9313-6c1d910102a4.jpg)

**#1) Checked Exception:** được xử lý trong thời gian biên dịch và sẽ gây ra lỗi biên dịch nếu nó không được bắt và xử lý trong thời gian biên dịch (bắt buộc phải xử lý để có thể tiếp tục biên dịch chương trình)

Ví dụ : FileNotFoundException, IOException ...

**#2) Unchecked Exception:** trong trường hợp này trình biên dịch không bắt buộc phải xử lý. Trình biên dịch bỏ qua trong thời gian biên dịch.

Ví dụ : ArrayIndexoutOfBoundException

**#3) Error:** Khi một kịch bản nghiêm trọng xảy ra và chương trình không thể tự khôi phục thì JVM sẽ tạo ra một lỗi. Khối try-catch không thể xử lý lỗi này. Ngay cả khi người dùng cố gắng xử lý lỗi bằng cách sử dụng khối try-catch thì nó cũng không thể khôi phục sau lỗi.

Ví dụ : Assertion error, OutOfMemoryError ....

### Exception Handling

**Try and Catch block:**

Các khối try-catch thường được sử dụng để xử lý các ngoại lệ. Các loại ngoại lệ dự kiến sẽ đến được khai báo trong khối catch (//IOException ie). Khi một ngoại lệ xuất hiện trong khối try, ngay lập tức trình điều khiển sẽ điều hướng đến khối `catch` (//ie.printStackTrace()):

```
try {
    br = new BufferedReader(new FileReader("Data"));
    } catch(IOException ie)
    {
         ie.printStackTrace();
    }
```

Có thể kết hợp bắt nhiều ngoại lệ trong 1 khối try:

```
try {
    br = new BufferedReader(new FileReader("Data"));
    } catch(IOException ie)
    {
      ie.printStackTrace();
    } catch(FileNotFoundException file){
      file.printStackTrace();
    }
```

**throws Exception:**

Từ khóa `throws` trong java được sử dụng để ném/bỏ một ngoại lệ thay vì xử lý nó. Tất cả các ngoại lệ là checked exception có thể được ném bằng các phương thức. Ví dụ:

```
public static void main(String[] args) throws IOException
{
BufferedReader br=new BufferedReader(new FileReader("Data"));
     while ((line = br.readLine()) != null)
         {
           System.out.println(line);
         }
}
```

**Finally block:**

Khối thực thi bất kể việc thực thi khối try-catch như thế nào và được thực thi ngay sau khi khối try / catch hoàn tất.

Đóng tệp, ngắt kết nối cơ sở dữ liệu, v.v... có thể được thực hiện trong khối (cuối cùng) này. Ví dụ:

```
try {
    br = new BufferedReader(new FileReader("Data"));
    } catch(IOException ie)
    {
      ie.printStackTrace();
    }
Finally {
          br.close();
        }
```

Trong ví dụ trên, luồng BufferReader được đóng trong khối `Finally`. Lệnh `br.close();` sẽ luôn được thực thi bất kể việc thực thi khối try - catch như thế nào.

***Chú ý:***
* Khối `Finally` là khối độc lập, có thể tồn tại mà không cần phải có bất kỳ khối catch nào
* Có thể có nhiều khối catch nhưng chỉ có 1 khối `Finally` duy nhất.

**Throwable:**

`Throwable` là lớp cha của lỗi và ngoại lệ. Nếu bạn không chắc chắn về các loại lỗi và ngoại lệ thì nên sử dụng lớp `Throwable` cho an toàn, nó có thể bắt cả lỗi và ngoại lệ. Ví dụ:

```
try {
   br = new BufferedReader(new FileReader("Data"));
     } catch (Throwable t)
     {
       t.printStackTrace();
     }
```

### Các ngoại lệ phổ biến trong Selenium WebDriver

Selenium có một tập các ngoại lệ riêng. Trong khi phát triển các tập lệnh selenium bạn cần phải xử lý hoặc loại bỏ những ngoại lệ này.

**Dưới đây là một số ví dụ về các trường hợp ngoại lệ này:**

Tất cả các lớp thời gian chạy ngoại lệ trong Selenium WebDriver đều nằm dưới lớp superclass WebDriverException:

![](https://images.viblo.asia/811f1c34-0833-4775-bf06-e8b2376b3616.jpg)

Có rất nhiều lớp Exception trong WebDriverException, phổ biến hay thấy 1 số lớp dưới đây:
* NoSuchElementException : Ngoại lệ này là do truy cập vào một phần tử không có sẵn trên trang.
* NoSuchElementException
* NoSuchWindowException
* NoSuchFrameException
* NoAlertPresentException : Người dùng cố gắng xử lý hộp cảnh báo nhưng cảnh báo không xuất hiện.
* InvalidSelectorException
* ElementNotVisibleException : Selenium cố gắng tìm một phần tử nhưng phần tử đó không hiển thị trong trang
* ElementNotSelectableException
* TimeoutException
* NoSuchSessionException
* StaleElementReferenceException
* WebDriverException : Ngoại lệ xảy ra khi mã không thể khởi tạo WebDriver.

## Avoiding và Handling các ngoại lệ phổ biến (nêu trên)

### #1) org.openqa.selenium.NoSuchElementException

Lớp ngoại lệ thường thấy này là một lớp con của lớp `NotFoundException`. Ngoại lệ xảy ra khi WebDriver không thể tìm thấy và định vị các phần tử. Điều này thường xảy ra khi người kiểm tra viết bộ định vị phần tử không chính xác trong phương thức `findElement(By, by)`.

Hãy xem xét rằng trong ví dụ dưới đây, id chính xác cho trường văn bản là "firstfield" nhưng người kiểm tra đã viết sai là "fistfield". Trong trường hợp này, WebDriver không thể định vị phần tử và `org.openqa.selenium.NoSuchElementException` sẽ được bắn ra:

```
driver.findElement(By.id("submit")).click();
Exception Handling:
 
try {
driver.findElement(By.id("submit")).click();
} catch (NoSuchElementException e)
```

**Avoiding-And-Handling** : Hãy thử đưa ra một lệnh chờ. Ví dụ:

```
try {
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(ExpectedConditions.presenceOfElementLocated(By.id("submit")));
try {
driver.findElement(By.id("submit")).click();
} catch (WebDriverException e) {
System.out.println(“An exceptional case.”);
}
} catch (TimeOutException e) {
System.out.println(“WebDriver couldn’t locate the element”);
}
```

Lệnh chờ sẽ đợi 10 giây cho sự hiện diện của phần tử web với id ‘submit’. Sau đó, lệnh `try` thực hiện nhấp chuột vào nó. Nếu phần tử có sẵn nhưng nhấp chuột vẫn không thành công, một ngoại lệ sẽ bị bắt.

Sử dụng thời gian trễ là một phương pháp phổ biến trong kiểm thử tự động để tạo khoảng dừng giữa các bước. Bằng cách thêm khối Try/Catch, có thể đảm bảo rằng chương trình sẽ tiếp tục ngay cả khi việc chờ đợi không thể giúp ích được gì.

### #2) org.openqa.selenium.NoSuchWindowException

`NoSuchWindowException` nằm trong lớp `NotFoundException`. Ngoại lệ này được bắn ra khi WebDriver cố gắng chuyển sang một cửa sổ không hợp lệ.

Đoạn mã dưới đây bắn về `org.openqa.selenium.NoSuchWindowException` nếu cửa sổ không tồn tại hoặc không có sẵn để chuyển đổi.

```
driver.switchTo().window(handle_1);
```

**Avoiding-And-Handling** : Sử dụng các window handle để lấy tập hợp các cửa sổ đang hoạt động và sau đó thực hiện các hành động tương tự.

Trong ví dụ dưới đây, driver switch được thực thi đối với mỗi window handle. Do đó, nguy cơ truyền một tham số cửa sổ sai giảm xuống.

```
for (String handle : driver.getWindowHandles()) {
    try {
        driver.switchTo().window(handle);
    } catch (NoSuchWindowException e) {
        System.out.println(“An exceptional case”);
    }
}
```

### #3) org.openqa.selenium.NoSuchFrameException

Khi WebDriver cố gắng chuyển sang một khung không hợp lệ, `NoSuchFrameException` trong lớp `NotFoundException` được bắn ra.

Đoạn mã ví dụ dưới đây sẽ bắn về `org.openqa.selenium.NoSuchFrameException` nếu khung `frame_11` không tồn tại hoặc không có sẵn.

`driver.switchTo().frame(“frame_11”);`

***Exception Handling:***

```
try {
driver.switchTo().frame("frame_11");
} catch (NoSuchFrameException e)
```

Trong trường hợp này, ngoại lệ được bắn ra ngay cả khi khung không được tải.

**Avoiding-And-Handling** : Hãy thử đưa ra một lệnh chờ. Ví dụ:

Trong ví dụ dưới đây, WebDriver đợi 10 giây để tải khung. Nếu khung có sẵn và vẫn có một ngoại lệ, thì nó bị bắt.

```
try {
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(ExpectedConditions.frameToBeAvaliableAndSwitchToIt(frame_11));
try {
driver.switchTo().frame("frame_11");
} catch (WebDriverException e) {
System.out.println(“An exceptional case”);
}
} catch (TimeOutException e) {
System.out.println(“WebDriver couldn’t locate the frame”);
}
```

### #4) org.openqa.selenium.NoAlertPresentException

`NoAlertPresentException` nằm trong `NotFoundException` được bắn ra khi WebDriver cố gắng chuyển sang cảnh báo không khả dụng.

```
driver.switchTo().alert().accept();
```

`org.openqa.selenium.NoAlertPresentException` sẽ được bắn ra nếu gọi phương thức `accept()` hoạt động trên lớp Alert khi  một cảnh báo chưa xuất hiện trên màn hình.

Exception Handling:
```
try {
driver.switchTo().alert().accept();
} catch (NoSuchAlertException e)
```
Trong trường hợp này, ngoại lệ được ném ra ngay cả khi cảnh báo không được tải hoàn toàn.

**Avoiding-And-Handling:** Trong mọi trường hợp dự kiến có cảnh báo, luôn sử dụng explicit wait hoặc fluent wait trong một thời gian cụ thể. Nếu cảnh báo có sẵn và vẫn có một ngoại lệ, thì nó sẽ bị bắt.

```
try {
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(ExpectedConditions.alertIsPresent());
try {
driver.switchTo().alert().accept();
} catch (NoAlertPresentException e) {
System.out.println(“An exceptional case”);
}
} catch (TimeOutException e)
System.out.println(“WebDriver couldn’t locate the Alert”);
}
```

### #5) org.openqa.selenium.InvalidSelectorException

Đây là lớp con của lớp `NoSuchElementException`, xảy ra khi một bộ chọn không chính xác hoặc không hợp lệ về mặt cú pháp. Ngoại lệ này thường xảy ra khi sử dụng bộ định vị XPATH. Ví dụ:

```
clickXPathButtonAndWait(“//button[@type=’button’][100]”);
```
Điều này sẽ tạo ra một lỗi không hợp lệ vì cú pháp XPATH không chính xác.

**Avoiding and Handling:** Để tránh điều này, chúng ta nên kiểm tra bộ định vị được sử dụng vì bộ định vị có thể không chính xác hoặc sai cú pháp. Sử dụng Firebug để tìm xpath có thể giảm bớt trường hợp ngoại lệ này.

***Cách xử lý ngoại lệ này sử dụng Try/Catch***
```
try {
clickXPathButtonAndWait("//button[@type='button']");
} catch (InvalidSelectorException e) {
}
```

### #6) org.openqa.selenium.ElementNotVisibleException

Lớp `ElementNotVisibleException` là một lớp con của lớp `ElementNotInteractableException`. Ngoại lệ này được bắn ra khi WebDriver cố gắng thực hiện một hành động trên một phần tử web ẩn, không thể tương tác với phần tử này. Tức là phần tử web đang ở trạng thái ẩn.

**Ví dụ**: trong đoạn mã dưới đây, nếu nút có id = ‘submit’ bị ‘ẩn’ trong HTML, thì `org.openqa.selenium.ElementNotVisibleException` sẽ được bắn ra.

```
driver.findElement(By.id("submit")).click();
Exception Handling:
try {
driver.findElement(By.id("submit")).click();
} catch (ElementNotVisibleException e)
```

Trong trường hợp này, ngoại lệ được bắn ra ngay cả khi trang chưa được tải hoàn toàn.

**Avoiding-And-Handling:** Chúng ta có thể sử dụng lệnh chờ cho phần tử nhận được hoàn toàn. Đoạn mã dưới đây chờ 10 giây cho phần tử xuất hiện. Nếu phần tử hiển thị và vẫn ném ngoại lệ, nó sẽ bị bắt.

```
try {
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(ExpectedConditions.visibilityOfElementLocated(By.id(”submit”));
try {
driver.findElement(By.id("submit")).click();
} catch (WebDriverException e) {
System.out.println(“Exceptional case”);
}
} catch (TimeOutException e)
System.out.println(“WebDriver couldn’t find this element visible”);
}
```

### #7) org.openqa.selenium.ElementNotSelectableException

Ngoại lệ này nằm trong lớp `InvalidElementStateException`. `ElementNotSelectableException` chỉ ra rằng phần tử web hiện diện trong trang web nhưng không thể được chọn.

Ví dụ: đoạn mã dưới đây sẽ trả về một ngoại lệ `ElementNotSelectableException` nếu id “swift” bị vô hiệu hóa (disable).

```
Select dropdown = new Select(driver.findElement(By.id(“swift”)));
```

**Exception Handling:**

```
try {
Select dropdown = new Select(driver.findElement(By.id(“swift”)));
} catch (ElementNotSelectableException e)
```
Trong trường hợp này, ngoại lệ được ném ra ngay cả khi phần tử được bật sau một thời gian.

**Avoiding-And-Handling:** Thêm lệnh chờ để đợi cho đến khi phần tử có thể nhấp được. Nếu vẫn có ngoại lệ, nó sẽ bị bắt.

```
try {
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
wait.Until(ExpectedConditions. elementToBeClickable(By.id(”swift”));
try {
Select dropdown = new Select(driver.findElement(By.id("swift")));
} catch (WebDriverException e) {
System.out.println(“Exceptional case”);
}
} catch (TimeOutException e)
System.out.println(“WebDriver found that this element was not selectable.”);
}
```

### #8) org.openqa.selenium.TimeoutException

Ngoại lệ này xảy ra khi một lệnh hoàn thành mất nhiều hơn thời gian chờ cho phép. Các lệnh chờ Wait chủ yếu được sử dụng trong WebDriver để tránh ngoại lệ `ElementNotVisibleException`: Đôi khi trang test có thể chưa được tải hoàn toàn trước lệnh tiếp theo trong chương trình. Nếu WebDriver cố gắng tìm một phần tử trong trang web trước khi trang tải hoàn toàn, thì ngoại lệ `ElementNotVisibleException` sẽ được bắn ra. Để tránh ngoại lệ này, các lệnh chờ được thêm vào.

Tuy nhiên, nếu các thành phần không tải ngay cả sau khi chờ, thì ngoại lệ `org.openqa.selenium.TimeoutException` sẽ được bắn ra.

```
driver.manage().timeouts().implicitlyWait(10,TimeUnit.SECONDS) ;

driver.get(“https://www.softwaretestinghelp.com” );
```

Trong đoạn mã trên, thời gian chờ ngầm định là 10 giây được thêm vào. Nếu trang www.softwaretestinghelp.com không được tải trong vòng 10 giây, thì ngoại lệ `TimeoutException` sẽ được bắn ra.

**Avoiding and Handling:** Để tránh điều này, chúng ta có thể kiểm tra thủ công thời gian tải trang trung bình và điều chỉnh thời gian chờ. Hoặc, có thể thêm explicit wait (thời gian chờ rõ ràng) bằng trình thực thi JavaScript cho đến khi trang được tải.

Trong ví dụ dưới đây, trình thực thi JavaScript được sử dụng. Sau khi điều hướng trang, gọi JavaScript trả về `document.readyState` trong 20 giây cho đến khi “complete” được trả về.

```
WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(30));
 
wait.until(webDriver -> ((JavascriptExecutor)webDriver).executeScript("return document.readyState").equals("complete"));
 
driver.get("https://www.softwaretestinghelp.com");
```


### Lời kết

Xử lý ngoại lệ là phần thiết yếu của mọi chương trình java cũng như tập lệnh selenium. Nhờ việc xử lý các ngoại lệ theo những cách thông minh, chúng ta có thể xây dựng bộ mã mạnh mẽ và tối ưu. Nếu bạn quan tâm có thể xem bài viết gốc tại đây:

https://www.softwaretestinghelp.com/exception-handling-framework-selenium-tutorial-19/