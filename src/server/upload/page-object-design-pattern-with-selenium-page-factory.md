Trong bài viết này chúng ta sẽ tìm hiểu về khái niệm Page Object Design Pattern hay còn có thể gọi ngắn gọn là Page Object. Một trong nhưng ưu điểm chính của việc sử dụng một Page Object Design Pattern ( hay từ đây sẽ gọi tắt là Page Object) là nếu UI hoặc bất kỳ đối tượng HTML nào thay đổi cho bất kỳ trang nào, thì test script của chúng ta không cần sửa chữa bất kỳ chỗ nào. Chỉ có code trong các Page Object sẽ bị ảnh hưởng và chúng ta chỉ cần sửa một mình Page Object là đủ và nó không có bất kỳ tác động nào quá lớn đến test script chúng ta đã viết trước đó. 

# Page Object Design Pattern

Trong những trường hợp hay dự án demo đơn giản thì có thể chúng ta chỉ có một hoặc vài file để chứa code của toàn bộ những test script mà chúng ta đã viết. Nhưng hãy thử tưởng tượng với một dự án chúng ta có 100+ test scenario phải viết automate script và vài chục file stepDefinition để chứa code thì sẽ ra sao. Lúc đó source code của dự án sẽ rất khó để quản lí và giảm khả năng maintain code của chúng ta đi rất nhiều (có nhiều trường hợp là không thể maintain được). Do đó, để quản lý code tốt hơn cũng như tăng khả năng sử dụng lại, chúng ta nên sử dụng một Page Object Design Pattern để chia một ứng dụng nào đó thành nhiều trang và ở mỗi trang tương ứng sẽ có một file dùng để chứa tất cả nhưng Page Object ( các phần tử UI và HTML) của trang đó.

Page Object Design Pattern sẽ cung cấp cho chúng ta một solution để làm việc trên nhiều trang khác nhau của một ứng dụng và ngăn ngừa việc trùng lặp code không mong muốn cũng như việc maintain code trở nên dễ dàng hơn. Nói chung, mỗi trang trong một ứng dụng sẽ được tách ra riêng biệt thành một class duy nhất và class đó sẽ chứa tất cả những phần tử UI cũng như HTML của trang tương ứng.

# How to implement the Page Object Model?

Có 2 cách để chúng ta có thể implement Page Object Model (POM)

1. **Regular Java classes** : Phần này các bạn có thể tìm hiểu ở [link này](https://www.toolsqa.com/selenium-webdriver/page-object-model/)

    *Note : Không khuyến khích các bạn dùng cách này , vì Selenium đã cung cấp cho chúng ta một giải pháp tốt hơn, nhanh hơn cho vấn đề này, đó là Selenium PageFactory.*

2. **Selenium PageFactory**: PageFactory class trong Selenium là một phần mở rộng cho khái niệm Page Object Design Pattern. Nó được sử dụng để khởi tạo những thành phần , phần tử UI trong một trang hoặc dùng để khởi tạo chính trang đó.

    PageFactory được sử dụng để khởi tạo các thành phần của Page Object class mà không phải sử dụng 'FindElement' hoặc 'FindElements' nhưng thông thường. Nó sử dụng các annotation để cung cấp tên mô tả của các đối tượng cần tương tác trên trang để cải thiện khả năng đọc hiểu code trở nên dễ dàng hơn. Tuy nhiên, có một vài khác biệt giữa triển khai C # và Java - Java sẽ cung cấp tính linh hoạt cao hơn với PageFactory.

## @FindBy Annotation

Như đã giới thiệu trước đó thì PageFactory cho phép chúng ta tìm những phần tử trong trang thông qua **By** chứ không thông qua cách **findElement** hay **findElements** như thông thường. **@FindBy** hỗ trợ truy cập vào những phần tử trên trang thông qua đa dạng các thuộc tính như **TagName**, **PartialLinkText**, **Name**, **LinkText**, **Id**, **Css**, **ClassName**, **XPath**. Điều này sẽ giúp người dùng tạo Page Object một cách nhanh chóng và dễ dàng hơn.

```
@FindBy(how = How.CSS, using = “.username“)]
private WebElement userName;
```

Đoạn code trên sẽ tạo một PageObject và đặt tên là userName bằng cách tìm nó thông qua CSS locator của nó . Rất đơn giản và nhanh gọn đúng không nào

## InitElements

Được dùng để khởi tạo một instance của class đã cho. Phương thức này sẽ cố gắng khởi tạo class được cung cấp cho nó, tốt nhất là sử dụng một constructor lấy một đối tượng WebDriver làm parameter duy nhất của nó hoặc quay trở lại với hàm tạo không có parameter. Exception sẽ được ném ra nếu class không thể được khởi tạo.

`PageFactory.initElements(WebDriver, PageObject.Class);`

Params:
* WebDriver – The driver that will be used to look up the elements
* PageObjects – A class which will be initialized

*Note: Để sử dụng được PageFactory thì chúng ta phải import `org.openqa.selenium.support.PageFactory;`*

## How to do it…

Chúng ta sẽ làm theo hướng dẫn sau từng bước để thiết lập Page Factory.

**Step 1:** Lấy một ví dụ đơn giản về case LogIn và hiểu nơi chúng ta sẽ sử dụng Page Factory ở đâu.

**Step 2:** Sử dụng các annotations của Page Factory để tạo một Page Object

**Step 3:**  Implement Page Factory cho case Login phía trên 

**Step 4:** Tách các trang của ứng dụng cần làm thành những Page Object sử dụng Page Factory tương ứng


### Step 1: Lấy một ví dụ đơn giản về case LogIn và hiểu nơi chúng ta sẽ sử dụng Page Factory ở đâu

Ví dụ ở đây chúng ta sẽ có một test case Login với scenario như sau

![](https://images.viblo.asia/a1653945-47c4-488e-8d7e-09bffec732a9.png)


### Step 2: Sử dụng các annotations của Page Factory để tạo một Page Object

Như đã đề cập ở phía trên thì chúng ta đơn giản là sử dụng @FindBy annotation để tìm các elements mà mình muốn tương tác thông qua các thuộc tính như **TagName**, **PartialLinkText**, **Name**, **LinkText**, **Id**, **Css**, **ClassName**, **XPath**.

Ngoài ra , để sử dụng được Page Factory thì chúng ta cũng cần viết một constructor sử dụng InitElements để khởi tạo instance cho Page Object class chúng ta vừa tạo

Cụ thể như sau :

![](https://images.viblo.asia/9f31c37f-667d-44fa-ab28-c066ce12216b.png)


### Step 3:  Implement Page Factory cho case Login phía trên 

Sau khi đã tạo ra Page Object cho trang Login thì chúng ta chỉ việc đơn giản là gọi lại các element đó và implement case Login bằng Selenium như thông thường



Cụ thể như sau : 
![](https://images.viblo.asia/946e8f06-0849-43ec-9d8c-5aaaaa05cf08.png)


### Step 4: Tách các trang của ứng dụng cần làm thành những Page Object sử dụng Page Factory tương ứng

Để dễ dàng trong việc quản lí code và sử dụng Page Object cũng như Page Factory trong dự án thật như đã ứng dụng phía trên. Thì chúng ta nên tách các trang trong ứng dụng ra làm các class khác nhau và mỗi class chỉ chứa element của một duy nhất một trang.

Tất cả những class đó nên được để chung vào 1 package gọi là **pageObjects**

Cụ thể như sau :

![](https://images.viblo.asia/afabf1b6-5f0b-4c02-a0f2-c411123c88e9.png)


# Tạm Kết
Hy vọng tutorial trên sẽ giúp các bạn tìm được một solution cho việc quản lí , sử dụng lại cũng như dễ dàng maintain được code của Page Object trong Selenium. Chúc các bạn thành công


**Nguồn tham khảo** : https://www.toolsqa.com/selenium-cucumber-framework/page-object-design-pattern-with-selenium-pagefactory-in-cucumber/

  https://www.toolsqa.com/selenium-webdriver/page-object-pattern-model-page-factory/