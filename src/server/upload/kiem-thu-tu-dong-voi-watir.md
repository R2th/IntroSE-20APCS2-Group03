# Khái niệm WATIR:

**Watir (Web Application Testing in Ruby)** là một thư viện Ruby mã nguồn mở dành cho kiểm thử tự động. Watir tương tác với một trình duyệt giống như cách mọi người thường làm: nhấp vào các liên kết, điền vào biểu mẫu và xác thực văn bản.

Người dùng watir có thể xây dựng một web scraper (trích xuất nội dung trang web) để mô phỏng việc vào một trang web, đăng nhập, gửi bình luận hoặc tải dữ liệu về và nhiều thứ khác nữa.

**Watir** cho phép kỹ sư kiểm thử tạo ra những test case dễ đọc hiểu và maintain. Đây là một công cụ khá dễ sử dụng và linh hoạt. 

Watir bao gồm **Watir-classic** và **Watir-Webdriver**.
Trong khi Watir-classic chỉ hỗ trợ Internet Explorer trên Windows, thì Watir-WebDriver còn hỗ trợ trên các trình duyệt phổ biến như Chrome, Firefox, Internet Explorer, Opera hoặc chạy ở chế độ headless (HTMLUnit). 

Watir-webdriver là phiên bản hiện đại của Watir API xây dựng dựa trên Selenium. Hay có thể mô tả Watir-webdriver=Watir-classic +WebDiver + 1 số tính năng bổ sung khác

# WATIR hoạt động như thế nào

Hiện nay **gem watir-classic** đã không còn được sử dụng nữa và tất cả source code của watir web-driver cũng đã được đưa vào gem Watir nên chúng ta sẽ tìm hiểu về cách hoạt động của Watir

Watir từ phiên bản 6.0 trở đi sử dụng Selenium web-driver. có nghĩa là chúng ta có thể tạo một trang web động với JavaScript. Một gem tương tự là Mechanize - phù hợp cho các trang tĩnh và không sử dụng nhiều JavaScript hoặc AJAX. 

**Watir-WebDriver** hỗ trợ trên các trình duyệt phổ biến như Chrome, Firefox, Internet Explorer, Opera hoặc chạy ở chế độ headless (HTMLUnit). 

Chế độ headless cho phép phân tích một trang không có giao diện - trong hầu hết các hệ thống UNIX, Watir yêu cầu cài đặt sẵn Xvfb (trên Ubuntu). Watir sử dụng PhantomJS để mô phỏng trình duyệt web và chạy một trang trong trình mô phỏng. Nếu muốn phân tích trang bằng các trình duyệt cần cài các driver tương ứng.

Cũng giống như những ngôn ngữ lập trình khác thì Ruby cho phép người dùng kết nối tới cơ sở dữ liệu, đọc tập tin dữ liệu, truy xuất tập tin XML và cấu trúc những đoạn code thành những thư viện để phục vụ mục đích tái sử dụng.

1 ví dụ cơ bản về Watir:

```
browser = Watir::Browser.new :chrome

browser.goto 'google.com'
browser.text_field(title: 'Search').set 'Hello World!'
browser.button(type: 'submit').click

puts browser.title
```
#giá trị title trả về sẽ là  'Hello World! - Google Search'

`browser.quit`

 Cách thức hoạt động của watir cũng giống như các tool kiểm thử tự động khác:
 
 Người dùng viết các câu lệnh => watir xử lý và thực thi chúng thông qua giao diện của các trình duyệt web giống như các tương tác giữa người dùng và trang web đó. 
 
#  So sánh với một số ứng dụng kiểm thử khác


| Tính năng | Watir | Selenium | TestComplete | UFT | Katalon Studio |
| -------- | -------- | -------- | -------- | -------- | -------- |
| **Nền tảng phát triển test**    | Đa nền tảng     | Đa nền tảng    | Windows  |  Windows | Đa nền tảng  |
| **Ứng dụng có thể sử dụng** | Web apps | Web apps | Windows desktop, Web, mobile apps | Windows desktop, Web, mobile apps | Web and mobile apps |
|**Ngôn ngữ viết script**  | Ruby | Java, C#, Perl, Python, JavaScript, Ruby, PHP | JavaScript, Python, VBScript, JScript, Delphi, C++ and C# | VBScript | Java/Groovy |
|**Hệ điều hành được hỗ trợ**  | Windows, Mac, Linux | Windows, Mac, Linux |Windows, Mac  |Windows  | Windows, Mac, Linux |
|**Yêu cầu kĩ năng lập trình**  |Không nhiều như Selenium Webdriver / UFT.Nhưng cần kiến thức tốt về Ruby  | Kỹ năng nâng cao cần thiết để tích hợp các công cụ khác nhau | Không yêu cầu, Cần kỹ năng tạo test scripts |Không yêu cầu. Cần kỹ năng tạo test scripts  | Không yêu cầu. Cần kỹ năng tạo test scripts |
|**Mức độ tăng hiểu biết khi tìm hiểu về công cụ**  |Trung Bình  | Cao | Trung Bình |Trung Bình  |  Trung Bình|
|**Độ khó khi cài đặt và sử dụng**  | Dễ. Cấu hình WATIR web driver sử dụng ruby command, yêu cầu phần lớn chỉ là cài đặt Ruby |Khó. Yêu cầu cài đặt và tích hợp nhiều công cụ và thư viện  |Dễ dàng cài đặt và chạy  |Dễ dàng cài đặt và chạy  | Dễ dàng cài đặt và chạy |
| **Thời gian tạo script** | Mất nhiều thời gian tương đương Selenium Webdriver |Mất nhiều thời gian  |Mất ít thời gian  | Mất ít thời gian |Mất ít thời gian  |
|**Lưu trữ đối tượng và bảo trì**  | Ruby đã xây dựng các khả năng Liên kết và nhúng (Object) và nhúng (OLE) | XPath, UI Maps | Xây dựng dựa vào kho đối tượng để lấy ra các đối tượng thông dụng | Xây dựng dựa vào kho đối tượng để lấy ra đối tượng chính xác |xây dựng dựa vào kho đối tượng, Xpath, nhận dạng lại đối tượng  |
|**Hỗ trợ kết nối tới Cơ sở dữ liệu (CSDL)** | Có thể kết nối đến CDSL | Selenium không thể kết nối tới CSDL của chính nó.Mà nó phụ thuộc vào sự hỗ trợ của một số ngôn ngữ khác ví dụ như Java có JDBC API |Có thể làm việc với CSDL sử dụng ADO và BDE  |Sử dụng Visual Basic script và ODBC, để kết nối với CSDL  | Có thể kết nối tới CSDL nhờ sử dụng java |
| **Tạo và lưu kết quả test** | Sử dụng RSpec framework WATIR có thể tạo HTML report để giữ kết quả test | Selenium Webdriver có thể tạo kết quả test bằng việc tương tác với frameworks khác (như TestNG)  | Có thể truy xuất kết quả test sử dụng định dạng như MHT HTML XML PDF tcLogX | Sau mỗi lần thực hiện test QTP/UFThiển thị kết quả test , mỗi dòng test script sẽ hiển thị pass/fail  | Tạo report của test suites với những định dạng như HTML, CSV, PDF và Junit sử dụng context menu trong test explorer  |
| **Framework được hỗ trợ** |Cucumber, RSpec, Test/Unit  | C# : Nunit Java: JUnit/TestNG Python: pyunit, py.test, robot Javascript:WebdriverJS, WebdriverIO, Nightwatch JS  | Data-driven testing framework | Data Driven automation framework Keyword Driven automation framework |  |
| **Giấy phép (License type)** |  Mã nguồn mở | Mã nguồn mở (Apache 2.0) | Độc quyền | Độc quyền | Miễn phí |
|**Chi phí sử dụng**  |Miễn phí  | Miễn phí  | Phí bản quyền và maintain |  Phí bản quyền và maintain| Miễn phí |

# Các bước cài đặt
## Bước 1: Cài đặt RUBY và gem WATIR
### 1. Cách cài đặt trên Windows
Trước khi cài Watir, cần tải và cài đặt ruby+devkit lên máy . Truy cập trang: https://rubyinstaller.org/downloads/

- Chọn phiên bản ruby phù hợp với hệ điều hành máy tính của bạn.

- Ví dụ : Windows 10 64 bit sẽ download phiên bản: Ruby+Devkit 2.5.1-1 (x64)

1.1 Cài đặt Ruby sau khi đã tải về

- Chạy trình cài đặt Ruby:

![](https://images.viblo.asia/959b7316-4242-4129-ac55-86d767dc682a.png)

- Chọn chấp nhận điều khoản và ấn Next chuyển qua bước tiếp theo

![](https://images.viblo.asia/3aa31c24-2f8d-4527-b06b-ab407dfaf04f.png)

- Chọn thư mục cài đặt và ấn Install

![](https://images.viblo.asia/c624e95a-551b-49de-bfed-45704c586bf0.png)

- Đợi quá trình cài đặt kết thúc 

![](https://images.viblo.asia/009e34cf-c852-466f-b800-7737e3ec1efd.png)

- Chọn option 3 - MSYS2 and MINGW development toolchain

Sau khi cài xong ruby bạn có thể kiểm tra lại xem ruby đã đươc cài thành công hay chưa bằng cách gõ đoạn lệnh ruby -v

![](https://images.viblo.asia/0276bcb3-b0be-4a14-8715-34746f397fa0.png)

1.2 Cài đặt Devkit

 Trước khi cài devkit bạn cần chuyển đổi thư mục lưu sang C:\devkit -> mở command prompt -> gõ lệnh cd c:\devkit
Run devkit:

![](https://images.viblo.asia/9dc903ea-cb3f-46e2-b537-debca63d7ce3.png)

 gõ đoạn lệnh: ruby dk.rb init -> [nhấn Enter] -> ruby dk.rb install ->  [nhấn Enter] -> cài đặt devkit thành công 

1.3  Cài đặt watir
- Mở command prompt gõ đoạn lệnh: gem install watir --no-ri --no-rdoc

 ![](https://images.viblo.asia/a1975517-ed0c-40f2-8ec7-71e19b13f834.png)

- Bạn có thể chạy đoạn lệnh gem install rspec để cài đặt  rspec hỗ trợ việc test sau này

![](https://images.viblo.asia/efe6a40f-38ee-46fd-a32e-600d43e94373.png)

### 2. Cách cài đặt trên Ubuntu


2.1 Trước khi cài Watir, cần cài đặt ruby lên máy. Bạn có thể chạy trên Terminal những câu lệnh sau:


- Cài đặt git nếu chưa có:

`sudo apt-get install git`

- Cài đặt ruby-install

```
wget -O ruby-install-0.6.0.tar.gz https://github.com/postmodern/ruby-install/archive/v0.6.0.tar.gz
tar -xzvf ruby-install-0.6.0.tar.gz
cd ruby-install-0.6.0/
sudo make install
ruby-install ruby 2.x
```
x là phiên bản ruby

- Sau khi các câu lệnh chạy hoàn thành. Kiểm tra xem ruby đã được cài thành công chưa: 

`ruby --version`

- Câu lệnh này sẽ trả về dạng

`ruby 2.x (yyyy-mm-dd) [x86_64-linux-gnu]`

2.2 Khi đã cài ruby hoàn tất, tiếp theo bạn cần cài Watir

Câu lệnh chạy trên Terminal để cài đặt Watir
`gem install watir`

## Bước 2:  Cài đặt các driver hỗ trợ các trình duyệt (áp dụng cho cả 2 hệ điều hành)

Tải drivers tương ứng với các trình duyệt tại đây: 

- Google Chrome: chromedriver

- Mozilla Firefox: geckodriver

- Microsoft Edge: Microsoft WebDriver

- Microsoft Internet Explorer: IEDriver

- Apple Safari: safaridriver (nếu bạn có Safari 10 thì nó đã được tích hợp sẵn)

Với Windows bạn chỉ cần bỏ cái tập tin .exe này vào thư mục cài đặt ruby. Riêng đôi với Ubuntu sau khi tải file về bạn cần thêm các file driver này vào PATH, sử dụng câu lệnh:

`export PATH=${HOME}/drivers:${PATH}`

/drivers là tên folder chứa các file driver

Ngoài ra bạn có thể sử dụng một số online service như:
- [Sauce Labs](https://saucelabs.com/)

- [Browser Stack](https://www.browserstack.com/)

Vậy là bạn đã hoàn thành các bước cài đặt. Bạn có thể sử dụng terminal hoặc IDE để bắt đầu chạy các đoạn script test

# Ứng dụng vào việc kiểm thử

Để thao tác được với Watir, cần có môi trường phát triển hay còn gọi là IDE sau:

-          ScITE (Free) : đã có khi tải ruby

-          Notepad ++ (Free)

-          Eclipse

-          Ruby in Steel (Free - $199) (Add-on to VS.Net)

-          Komodo IDE ($295) / Komodo Edit (Free)

## Thao tác cơ bản với các object trên trang:

*Tải thư viện Watir:*

   `require 'watir'`
   
*Mở trình duyệt:*

  ` browser = Watir::Browser.new:chrome   # firefox or ie`
  
*Mở trình duyệt với URL cụ thể: (mở với trình duyệt mặc định: chrome)*

   `browser = Watir::Browser.start("http://google.com")`
   
*Di chuyển đến URL cụ thể:*

   `browser.goto("http://amazon.com")`
   
*Đóng trình duyệt*

   `browser.close`

## Truy cập tới 1 Element:

Cấu trúc

![](https://images.viblo.asia/50001293-5634-42c5-be6f-8359914dfd78.png)


Text box hoặc text area

   `t = browser.text_field(:name, "username")`
   
Button

   `b = browser.button(:value, "Click Here")`
   
Drop down list

   `d = browser.select_list(:name, "month")`
   
Check box

   `c = browser.checkbox(:name, "enabled")`
   
Radio button

   `r = browser.radio(:name, "payment type")`
   
Form

  ```
 f = browser.form(:name, "address")
   f = browser.form(:action, "submit")
```

Link

  ```
 l = browser.link(:url, "http://google.com")
   l = browser.link(:href, "http://google.com")
```

Table: trỏ tới 1 ô trong bảng (hàng 2 cột 1)

   `td = browser.table(:name, 'recent_records')[2][1]`
   
## Kiểm tra nội dung:

Trả về html của trang hoặc element:

  ```
 browser.html
   e.html
```

Trả về text của trang hoặc element:

  ```
 browser.text
   e.text
```

Trả về title của tài liệu

  ` browser.title`
  
Lấy text từ status bar

 `  browser.status`
 
Trả về true nếu text mô tả xuất hiện trên trang

   `browser.text.include? 'llama'`
   
Trả về nội dung của bảng dạng array

   `browser.table(:id, 'recent_records').to_a`
   
##    Ví dụ:

**1.  Object: Link**

*- Web browser view:*

[Welcome to Camus team](http://www.camus.vn/)

*- HTML source:*

<a href=http://www.camus.vn/>Welcome to Camus team</a>

*- Watir code:*

```
Browser.link(:text, “Welcome to Camus team”).click -OR-
Browser.link(:url, “http://www.camus.vn”).click
```

**2. Object: Selection Boxes**

*- Web browser view:*

![](https://images.viblo.asia/d21f6135-6431-4cb3-bf43-88e7be2cd07b.png)

*- HTML source:*
<select name="language">
<option value="1"></option>
<option value="2">Japanese</option>
<option value="3">Vietnamese</option>
</select>

*- Watir code:*

`Browser.select_list(:name, “language”).select(“Vietnamese”)`

**3. Object: Checkbox**

*- Web browser view:*

![](https://images.viblo.asia/88b1ccf3-2569-4a6b-a9e9-737843dae603.png)

*- HTMl source:*
<input type=”checkbox” name=”checkme” value=”1”>

*- Watir code:*

```
Browser.checkbox(:name,”checkme”).set  -OR-
Browser.checkbox(:name,”checkme”).clear
```

# Kết luận 
Watir là một công cụ mã nguồn mở và miễn phí vì thế bạn có thể sử dụng nó tùy theo nhu cầu của bản thân, thay đổi nếu bạn muốn. Nó có thể được vận dụng linh hoạt vào việc test tự động các ứng dụng browser-based. Bên cạnh đó bạn có thể tìm kiếm sự trợ giúp khi cần bởi cộng đồng người dùng Watir đang ngày một nhân rộng. Một lý do thuyết phục cho điều này đó là Watir sử dụng Ruby để tạo script, một trong những ngôn ngữ lập trình phổ biến nhất hiện nay. Nó hỗ trợ đa trình duyệt đa nền tảng và hỗ trợ thực hiện test trên các sản phẩm được tạo ra từ bất kỳ ngôn ngữ/ công nghệ nào. 



*Nguồn tham khảo:*

http://watir.com/
https://www.sitepoint.com/watir-webdriver-control-browser/
https://www.deviqa.com/our-services/watir
http://thequalitytesting.blogspot.com/2007/12/how-does-watir-work.html