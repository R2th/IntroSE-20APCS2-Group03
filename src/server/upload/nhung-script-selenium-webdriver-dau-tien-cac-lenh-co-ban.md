# Giới thiệu
Như các bạn cũng đã biết , Selenium Webdriver (Se driver) là một tool open source giúp việc thực thi các hành động lên trang web một cách tự động, tất nhiên là tùy vào mục đích và yêu cầu của người viết. Se driver hỗ trợ viết script trên nhiều ngôn ngữ khác nhau: Java, C#, python, PHP,...
Về mặt bản chất, Se driver là một 1 package trong đó có chứa rất nhiều các gói jar, cung cấp các API hay gọi nôm na là thư viện. Vì nó là thư viện nên cách sử dụng nó cũng chả khác gì việc sử dụng nhưng thư viện khác mà Java đã cung cấp sẵn như java.util hay java.lang.

Ở bài viết này , qua những ví dụ về rất đơn giản và cụ thể , mình hy vọng sẽ giới thiệu cho các bạn biết cách viết những script Selenium WebDriver cơ bản nhất

Để sử dụng được Selenium WebDriver với ngôn ngữ Java thì ta cần cài đặt :
- Java (JDK, JRE)
- Selenium package
- Eclipse
Phần hướng dẫn cài đặt có rất nhiều bài đã hướng dẫn chi tiết rồi nên mình sẽ không giới thiệu lại trong khuôn kho bài này nữa

# Ví dụ 1
 Truy cập vào 1 trang web bất kỳ bằng trình duyệt (Firefox, Chrome, Opera,...) sau đó tắt trình duyệt
 
 Để giải quyết vấn đề này , mình có đoạn code như sau :
 
 ![](https://images.viblo.asia/34cc89fa-f325-4b20-be20-c21005a53229.png)
 
##  Giải thích code 

### Importing Packages

Để bắt đầu, bạn import hai packages sau:

1. **org.openqa.selenium** - chứa class WebDriver cần thiết để khởi tạo trình duyệt mới được tải bằng trình điều khiển cụ thể
1. **org.openqa.selenium.firefox.FirefoxDriver** - chứa class FirefoxDriver cần thiết để khởi tạo trình điều khiển Firefox cụ thể trên trình duyệt được khởi tạo bởi class WebDriver

Nếu test của bạn cần các hành động phức tạp hơn như truy cập vào một class khác, chụp ảnh màn hình trình duyệt hoặc thao tác các tệp bên ngoài, chắc chắn bạn sẽ cần phải import nhiều package hơn.

### Khởi tạo các đối tượng (objects) và biến (variables)

Thông thường, đây là cách một đối tượng (object) được khởi tạo.
 ```
       System.setProperty("webdriver.gecko.driver", "D:\\Software\\geckodriver-v0.20.1-win64\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
```
Trong Selenium 3 thì bạn phải sử dụng gecko driver do Mozilla cung cấp để có thể chạy được WebDriver

Một class FirefoxDriver không có tham số có nghĩa là cấu hình mặc định của Firefox sẽ được khởi chạy bởi chương trình Java của chúng ta. Cấu hình mặc định của Firefox tương tự như khởi chạy Firefox ở chế độ an toàn (không có phần mở rộng nào được tải).

### Khởi chạy phiên trình duyệt

Phương thức **get()** của WebDriver được sử dụng để khởi chạy phiên trình duyệt mới và hướng nó đến URL mà bạn chỉ định làm tham số của nó. Ở đây chúng ta sẽ truy cập vào trang chủ của Google

Và để chắc chắn rằng bạn đang làm đúng, thì sau khi chạy xong bạn sẽ xuất ra màn hình console log 1 dòng chữ bất kỳ để confirm việc đó

```
driver.get("http://google.com.vn");
System.out.println("Chay duoc roi ne");
```

Ta dùng phương thức sleep() để dừng trình duyệt lại một chút sau khi thực hiện truy cập cho dễ quan sát hiện tượng hơn\

```
//Stop for a while to see the result
 Thread.sleep(500);
```

### Chấm dứt một phiên trình duyệt
Phương thức " quit () " được sử dụng để đóng toàn cửa sổ trình duyệt.	

```
//Close the entire browser
driver.quit();
```

# Ví dụ 2:
Lần này chúng ta cũng truy cập vào trang Google , sau đó chúng ta sẽ lấy Title của trang Google so sánh với expected Title và cho ra kết quả test

Đối với trường hợp này, chúng ta giải quyết như sau:

![](https://images.viblo.asia/d9f52e50-b83b-4daa-9479-1656820450f6.png)

## Giải thích code

Cũng giống như ví dụ 1 ở trên, 2 bước đầu tiên phải làm đó là :
 - Import packages
 - Khai báo đối tượng và biến
 
Ở đây phần khai báo biến, để cho thuận tiện việc sử dụng thì ta khai báo Google vào 1 biến baseUrl. Sau đó khai báo tiếp 2 biến là expected và actual Title đã đưa ra ở đề bài

```
String baseUrl = "https:\\google.com.vn";
String expectedTitle = "Google";
String actualTitle = "";
```

## Khởi chạy phiên trình duyệt
Phương thức get () của WebDriver được sử dụng để khởi chạy phiên trình duyệt mới và hướng nó đến URL mà bạn chỉ định làm tham số của nó.

```
// launch Fire fox and direct it to the Base URL
driver.get(baseUrl);
```

## Nhận tiêu đề trang thực tế
Class WebDriver cung cấp phương thức getTitle() được sử dụng để lấy tiêu đề của trang hiện đang được tải.

```
// get the actual value of the title
actualTitle = driver.getTitle();
```

## So sánh giá trị mong đợi và thực tế
Phần code  này chỉ đơn giản sử dụng cấu trúc Java cơ bản (if...else) để so sánh tiêu đề thực tế với tiêu đề mong muốn.

```
 /*
         * compare the actual title of the page with the expected one and print
         * the result as "Passed" or "Failed"
         */
		if (expectedTitle.contentEquals(actualTitle)) {
			System.out.println("Title Passed !");
		}
		else System.out.println("Title Failed");
```

## Chấm dứt một phiên trình duyệt
Khác với phương thức "quit()" sẽ close toàn bộ các tab trong trình duyệt và đóng luôn trình duyệt. Thì phương thức " close () " được sử dụng để đóng 1 cửa sổ trình duyệt

```
//Close the tab
driver.close();
```

# Ví dụ 3
Vào trang facebook và lấy trang tagName của các phần tử ở login form

Để giải bài toán này, chúng ta sẽ làm quen với một phương thức mới đó là **findElement()**. Ta có đoạn code như sau :

![](https://images.viblo.asia/bd640beb-771e-4a48-ac61-53dc2b376fe0.png)

Tương tự những bước đầu chung ta làm giống như 2 ví dụ trên.

## Định vị các phần tử GUI
Định vị các phần tử trong WebDriver được thực hiện bằng cách sử dụng phương thức **" findElement (By. Locator ()) "**. Phần "định vị" của mã giống như bất kỳ bộ định vị nào đã được thảo luận trước đó trong các chương IDE của Selenium trong các hướng dẫn này. 

Chúng ta có thể tìm ra id của 2 field "email" và "loginbutton" để đưa vào phương thức findElement (By. Locator ()) , bằng cách đơn gian là truy cập vào facebook và thực hiện inspect hai phần tử này, sau đó lấy id.

Tiếp đó, sử dụng phương thức **getTagName()** để lấy ra tag Name của những phần tử đó

```
// get tagName of element have id = loginbutton
tagNameLabel = driver.findElement(By.id("loginbutton")).getTagName();
System.out.println("tagNameLabel: " + tagNameLabel);
		
// get tagName of element have id = email
tagNameInput = driver.findElement(By.id("email")).getTagName();
System.out.println("tagNameInput: " + tagNameInput);
```

# Những lệnh cơ bản khác
Để tiện cho các bạn tự nghiên cứu và thực hành thêm nhiều ví dụ khác trên Selenium WebDriver, dưới đây sẽ cung cấp cho các bạn một số phương thức cơ bản thường dùng khác 

## Get commands

![](https://images.viblo.asia/80d35a7d-5314-4612-b158-b40aa33cec1d.png)

## Navigate commands
![](https://images.viblo.asia/58ed6842-cea7-4deb-8523-3218ea99ece3.png)

## Locating GUI Elements
![](https://images.viblo.asia/b55c03a8-ebcf-4a5b-9f67-14ef236abcee.png)


# Tạm kết
Qua những ví dụ đơn giản và dễ hiểu trên, hy vọng các bản có thể viết cho mình những Script Selenium WebDriver đầu tiên của mình. Mình sẽ còn quay lại với những bài hướng dẫn về Selenium WebDriver tiếp theo. Chúc các bạn thành công