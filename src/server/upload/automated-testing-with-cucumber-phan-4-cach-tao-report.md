Khi các bạn phải chia sẻ báo cáo các lần chạy tự động, kết quả pass/fail cho khách hàng và quản lý, trong trường hợp đó các bạn cần một báo cáo HTML để chia sẻ các kết quả sau mỗi lần chạy. Ở bài viết này mình sẽ hướng dẫn cách setup có 1 file HTML sau mỗi lần chạy.

## 1.Tạo báo cáo HTML bằng cách thêm plugin vào file TestRunner
(Cách này chỉ tạo ra một báo cáo đơn giản, case nào pass, case nào fail, không thống kê được số lượng pass/fail)

**Bước 1:** Trong file TestRunner, hãy thêm 1 plugin(như bên dưới) để định dạng kết quả sau khi chạy thành định dạng HTML.
Các bạn cần một đường dẫn để đặt các file báo cáo, ở đây mình có đường dẫn là : *target/htmlreports*.
```
@CucumberOptions(
        features = "src/main/Feature/Login.feature"
        , glue = {"stepDefinition"}
        ,plugin = {"pretty", "html:target/htmlreports"}      
)
```


**Bước 2:** Chạy file TestRunner, khi chạy xong các bạn sẽ thấy thư mục *htmlreports* trong thư mục *target*. Để mở báo cáo, các bạn truy cập vào project đã có trên máy và 

![](https://images.viblo.asia/0feb21d8-f629-472b-aef9-1e2fa25c01ae.png)

**Bước 3:** Sau khi chạy xong, một thư mục mới sẽ được tạo ra tại đường dẫn các bạn cài đặt trong plugin. Mở thư mục trên máy(như hình bên dưới):
![](https://images.viblo.asia/1eec13c6-852f-4cea-bdc4-17805acba6e8.png)

Dưới đây là báo cáo sau khi chạy:

* Khi chạy pass:
![](https://images.viblo.asia/4b675be6-0917-4fd6-aa4f-956ef0e2acbf.png)

* Khi chạy fail sẽ đỏ ở bước chạy fail và mô tả lỗi:
![](https://images.viblo.asia/3a04057e-e9e4-4b8b-8eb9-781c58460a79.png)

## 2.Tạo báo cáo bằng cách sử dụng Extent-Reports

**Bước 1:** Thêm dependencies  vào file pom.xml vào cập nhật dự án sau khi thêm

```
<dependency>
    <groupId>com.vimalselvam</groupId>
    <artifactId>cucumber-extentsreport</artifactId>
    <version>3.0.2</version>
   </dependency>

    <dependency>
    <groupId>com.aventstack</groupId>
    <artifactId>extentreports</artifactId>
    <version>3.1.2</version>
   </dependency>
```

**Bước 2:** Thêm 1 thư mục config  vào dự án.
(Cách này các bạn có thể cấu hình được tên, giao diện,... của báo cáo và thống kê chi tiết số case pass/fail)

Ví dụ: Nhấp chuột phải vào tên dự án -> Click New -> Folder -> config. Sau đó, các bạn tạo 1 file XML: report.xml vào thư mục này, file này chứa tiêu đề, tên, định dạng báo cáo,... Các bạn có thể cấu hình thông tin mình mong muốn ở file này.

```
<?xml version="1.0" encoding="UTF-8"?>
<extentreports>
  <configuration>
    <!-- report theme --> <!-- standard, dark -->
    <theme>standard</theme>
  
    <!-- document encoding -->  <!-- defaults to UTF-8 -->
    <encoding>UTF-8</encoding>
    
    <!-- protocol for script and stylesheets -->   <!-- defaults to https -->
    <protocol>https</protocol>
    
    <!-- title of the document -->
    <documentTitle>Selenium Cucumber Framework</documentTitle>
    
    <!-- report name - displayed at top-nav -->
    <reportName>Functional Testing report</reportName>
    
    <!-- global date format override -->  <!-- defaults to yyyy-MM-dd -->
    <dateFormat>yyyy-MM-dd</dateFormat>
    
    <!-- global time format override -->   <!-- defaults to HH:mm:ss -->
    <timeFormat>HH:mm:ss</timeFormat>
    
    <!-- custom javascript -->
    <scripts>
      <![CDATA[
        $(document).ready(function() {
        
        });
      ]]>
    </scripts>
    
    <!-- custom styles -->
    <styles>
      <![CDATA[
        
      ]]>
    </styles>
  </configuration>
</extentreports>
```

**Bước 3:** Thêm một plugin vào file TestRunner để định dạng kết quả sau khi chạy thành định dạng HTML:

```
@CucumberOptions(
        features = "src/main/Feature/Login.feature"
        , glue = {"stepDefinition"}
        , plugin = {"com.cucumber.listener.ExtentCucumberFormatter:target/cucumber-reports/report.html"}
        , monochrome = true

)
```

**Bước 4:** Thêm một plugin vào  hàm *AfterScenario* trong file *Hooks* để load file report.xlm, trong plugin này đề cập đến định dạng của báo cáo, và vị trí muốn lưu báo cáo. Plugin này sẽ như sau:

```
@After
public void AfterScenario(Scenario scenario) {
     Reporter.loadXMLConfig(new File("config/report.xml"));
}
```

**Bước 5:** Sau khi chạy xong, một thư mục mới sẽ được tạo ra tại đường dẫn các bạn cài đặt trong plugin. Mở thư mục trên máy(như hình bên dưới):
![](https://images.viblo.asia/e756f252-d57b-4892-8d51-cc1dafa5dbfb.png)

* Khi chạy pass 
![](https://images.viblo.asia/1b648f14-7c95-4f09-834f-991a3bc6bdcb.png)

* Khi chạy fail
![](https://images.viblo.asia/7d8a96a7-69ae-433f-83b0-195584ee3af6.png)

Tài liệu tham khảo: https://www.axelerant.com/resources/team-blog/setup-for-selenium-with-cucumber-using-maven