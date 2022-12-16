## Lời dẫn

Trong quá trình sử dụng internet, chắc chắn các bạn đều thường xuyên sử dụng webbrowsers như: Chrome, Firefox, Opera, Internet Explorer, Safari… để lướt web. Trong số đó, đôi khi phát sinh những thao tác lặp đi lặp lại như các bạn chơi Offer (một dạng kiếm tiền online trên mang), tạo tài khoản google, facebook hay đơn giản là download hàng trăm bộ phim “người nghèo” – à hí hí,tôi thích cách suy nghĩ của bạn. 
Thì lúc này là lúc mà các lập trình viên “phi thường” như chúng ta ra tay. Với công cụ mạnh mẽ đó là **Selenium**.

Ở bài này, mình  sẽ giới thiệu tới bạn các Thao tác cơ bản với Selenium trong WPF.

## Nội dung

Để đọc hiểu bài này tốt nhất bạn cần:

* Cài đặt sẵn VISUAL[ [STUDIO 2019 community]](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=Community&rel=16)
* Có kiến thức TỔNG QUAN VỀ SELENIUM.
* Có kiến thức về C# CƠ BẢN, LẬP TRÌNH OOP trong C#, và LẬP TRÌNH WPF.
* Có kiến thức HTML cơ bản.

Trong bài này, chúng ta sẽ cùng tìm hiểu những nội dung sau:

* Tạo một Project import thư viện Selenium Firefox và Chrome Driver.
* Navigate URL với Selenium.
* Một số thuộc tính và phương thức cơ bản.
* Get Element với Selenium.

## Tạo một project import thư viện Selenium Firefox và Chrome Driver

Đầu tiên chúng ta mở **Visual Studio** và tạo một project mới

![](https://images.viblo.asia/4b9bac73-5f24-4e43-a6b4-4db654adc8b8.png)

Chọn WPF App(.NET Framework) hoặc Windows Forms App nếu bạn không rành WPF. Đặt tên project và chọn đường dẫn lưu solution của bạn.

![](https://images.viblo.asia/29b4d56b-6beb-4538-be65-be9716a400d1.png)

Tại màn hình ban đầu của project.

![](https://images.viblo.asia/74692094-a38b-4624-899a-6deb0cbcaa55.png)

Bạn thêm đoạn code:

```
<Button Content="Start" Click="Button_Click"></Button>
```

Tạo Button ngay bên trong cặp thẻ bên dưới, để khi chúng ta nhấn vào Button đó sẽ cho chạy Selenium.

```
​​​​​​​<Grid>


</Grid>
```

Code hoàn chỉnh của **MainWindow.xaml**

```
<Window x:Class="Basic_Selenium_Firefox_Chrome.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:Basic_Selenium_Firefox_Chrome"
        mc:Ignorable="d"
        Title="MainWindow" Height="350" Width="525">
    <Grid>
        <Button Content="Start" Click="Button_Click"></Button>
    </Grid>
</Window>

```

Một lưu ý nhỏ, trong sự kiện Click mình đã tạo sẵn một Event Click theo cách nhắc lệnh mà Visual Studio hỗ trợ, đó là: 

> Gõ Click=

> Một New Event Handler sẽ hiện lên bạn chỉ cần nhấn Enter

> Sẽ tự tạo một event ở code behind

Chúng ta sẽ bắt đầu Import thư viện Selenium vào để dùng. Mình sẽ Import một lúc cả Firefox & Chrome nhé!

Cần 1 thư viện chính đó là IWebDriver còn lại tùy theo bạn dùng trình duyệt web nào mà chọn thư viện tương ứng.

Mở tab **Solution Explore** > Nhấp chuột phải vào **References** > Chọn **Manage Nuget Packages**.

![](https://images.viblo.asia/09b2cfa1-2731-4b8f-97d6-78c725f3de2c.png)

Trong tab **Nuget** mở ra. Chọn **Browse** và gõ từ khóa **Selenium** vào thanh Search. **Install Selenium.WebDriver** và **Selenium.Chrome.WebDriver** hoặc **Selenium.Firefox.WebDriver** tùy theo trình duyệt bạn dùng.

![](https://images.viblo.asia/d716d414-3df1-4749-87a5-8c9073715298.png)

Sau đó, qua phần code Behind là file **MainWindow.xaml.cs** để bắt đầu với phần chính.

## Navigate tới một URL với Selenium

Để thao tác với một trình duyệt thì mình phải thử vào trang web nào đó đúng không?

Vậy trước tiên mình sẽ khởi tạo trình duyệt đó đã! Ở đây mình sẽ chạy cùng lúc Firefox và Chrome cho các bạn thử nhé!

Selenium cũng là class như các class khác nên khởi tạo nó thì mình sẽ tạo một Instance của nó theo cách:

* FirefoxDriver:

```
FirefoxDriver firefoxDriver = new FirefoxDriver();
```

* ChromeDriver:

```
ChromeDriver chromeDriver = new ChromeDriver();
```

Các bạn thấy Visual báo lỗi ở **FirefoxDriver** và **ChromeDriver** vì các bạn chưa import thư viện vào. Cách làm nhanh là rê chuột vào tên class > chọn biểu tượng bóng đèn > Chọn **Using OpenQA.Selenium.Firefox** theo hình bên dưới (tương tự với Chrome nhé!): 

![](https://images.viblo.asia/8af2ed0c-531b-4c05-9099-a1a2a78cb044.png)

Tới đây, chúng ta chạy thử chương trình. Nhấn button Start và sẽ thấy hai cửa sổ CMD hiện lên, mỗi cái tương ứng với một WebBrowser và sau đó là hai trình duyệt Firefox & Chrome. Sau này, bạn chỉ cần chọn dùng một trong hai WebDriver thôi. Ở đây, mình ví dụ cho các bạn thấy nên dùng một lúc cả hai.

![](https://images.viblo.asia/98f99e4f-1e14-4114-9071-f265723ae0c8.png)

![](https://images.viblo.asia/1b2c8736-4924-4014-9db0-afdb60fed6e6.png)

Từ đây, bạn thấy ngay sau khi bạn khởi tạo WebDriver thì chương trình đã gọi trình duyệt lên cho bạn rồi. Nhưng giờ chỉ mới là mở trình duyệt. Cùng tìm hiểu cách chuyển trang nhé!

### Cách để Navigate tới một URL (Chrome và Firefox tương tự)

Cách 1 (nên dùng cho rõ ràng):

```
firefoxDriver.Url = "https://viblo.asia/";
firefoxDriver.Navigate();

chromeDriver.Url = "https://viblo.asia/";
chromeDriver.Navigate();

```

Cách 2:

```
firefoxDriver.Navigate().GoToUrl("https://viblo.asia/");

chromeDriver.Navigate().GoToUrl("https://viblo.asia/");

```

Khi chạy thử, bạn sẽ thấy lúc này 2 trình duyệt đã chuyển đến trang **viblo.asia**

![](https://images.viblo.asia/d126b60f-2616-4595-a840-af9321122604.png)

## Một số thuộc tính và phương thức cơ bản trong Selenium

* Lấy Source page hiện tại:

```
driver.PageSource
```

* Lấy địa chỉ URL hiện tại:

```
driver.Url
```

* Chuyển tới trang trước đó:

```
driver.Navigate().Back()
```

* Chuyển tới trang sau đó:

```
driver.Navigate().Forwad()
```

* F5 (Refresh) lại trang: 

```
driver.Navigate().Refresh()
```

* Handle arlet:

```
IAlert a = driver.SwitchTo().Alert();

a.Accept();

a.Dismiss();

```

* Chuyển đổi giữa các cửa sổ hoặc tab:

```
ReadOnlyCollection<string> windowHandles = driver.WindowHandles;

string firstTab = windowHandles.First();

string lastTab = windowHandles.Last();

driver.SwitchTo().Window(lastTab);
```

* Maximize window:

```
this.driver.Manage().Window.Maximize();
```

* Add cookies:

```
Cookie cookie = new OpenQA.Selenium.Cookie("key", "value");

this.driver.Manage().Cookies.AddCookie(cookie);
```

* Get all cookies:

```
var cookies = this.driver.Manage().Cookies.AllCookies;
```

* Delete cookie:

```
this.driver.Manage().Cookies.DeleteCookieNamed("CookieName");
```

* Delete all cookies:

```
this.driver.Manage().Cookies.DeleteAllCookies();
```

* Chụp màn hình:

```
Screenshot screenshot = ((ITakesScreenshot)driver).GetScreenshot();

screenshot.SaveAsFile(@"pathToImage", ImageFormat.Png);
```

**@pathToImage** là đường dẫn tới file hình sẽ lưu.

* Đợi đến khi Website load xong hết các đoạn JavaScript:

```
WebDriverWait wait = new WebDriverWait(this.driver, TimeSpan.FromSeconds(30));

wait.Until((x) =>

{

 return ((IJavaScriptExecutor)this.driver).ExecuteScript("return document.readyState").Equals("complete");

});

```

* Chuyển đổi giữa các frames:

```
this.driver.SwitchTo().Frame(1);

this.driver.SwitchTo().Frame("frameName");

IWebElement element = this.driver.FindElement(By.Id("id"));

this.driver.SwitchTo().Frame(element);
```

* Chuyển tới document mặc định:

```
this.driver.SwitchTo().DefaultContent();
```

## Get Element với Selenium

Cách lấy **WebElement** cơ bản nhất của Selenium là theo: id, class name, name và tag.

Ở phần này, mình sẽ giới thiệu những cách cơ bản này. Ở những phần sau, mình sẽ giới thiệu tới các cách lấy nâng cao hơn, khi các thuộc tính này không tồn tại hoặc khó xác định ra đối tượng.

Có những phương thức lấy đối tượng ra từ Selenium như:

> driver.FindElementById("ID của HTMl element mà bạn muốn tìm")

Hàm này tương ứng với:

> driver.FindElement(By.Id("id"))

## Kết luận

Qua bài viết này, bạn đã nắm được các thao tác cơ bản trong Selenium. Cảm ơn các bạn đã đọc bài viết này.
Nguồn: HowKteam.com