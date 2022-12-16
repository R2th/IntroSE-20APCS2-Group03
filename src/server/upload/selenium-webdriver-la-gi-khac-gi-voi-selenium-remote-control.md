# 1. Selenium WebDriver là gì?
* Selenium WebDriver ( gọi tắt là WebDriver) là một automation framework dành cho web, với WebDriver bạn có thể thực hiện các phiên kiểm thử  của mình trên các trình duyệt khác nhau mà không cần chỉ giới hạn trên Firefox hay Chrome.
* WebDriver sẽ cung cấp công cụ hỗ trợ bạn tốt hơn trong việc coding để tạo test scripts. Bạn có thể sử dụng ngay các phương thức điều kiện như if-then-other, switch-case,  hoặc vòng lặp như do-while...

![](https://images.viblo.asia/0d165eeb-7741-435a-b301-2c4cf26fe6db.jpg)

* WebDriver hỗ trợ nhiều ngôn ngữ lập trình khác nhau như Java, .Net, PHP, Python, Perl, Ruby. Không nhất thiết bạn phải am hiểu tất cả các ngôn ngữ trên nhưng để sử dụng WebDriver 1 cách hiệu quả hơn, bạn nên biết ít nhất một trong số những ngôn ngữ trên.

# 2. Điểm khác biệt giữa Selenium Webdriver và Selenium Remote Control 
Trước khi WebDriver ra đời vào năm 2006, đã có một công cụ tự động hóa khác gọi là Selenium Remote Control (gọi tắt là RC). Cả WebDriver và RC đều có các tính năng sau:

* Cả hai đều cho phép sử dụng ngôn ngữ lập trình trong việc thiết kế test scripts của bạn.
* Cả hai đều cho phép kiểm thử trên các trình duyệt khác nhau.


***Vậy chúng khác nhau như thế nào?***
 
## a.  Kiến trúc
  ***WebDriver***
* Kiến trúc của WebDriver đơn giản hơn so với Selenium RC, nó kiểm soát trình duyệt từ cấp OS (hệ điều hành).
* Tất cả những gì bạn cần có là IDE của ngôn ngữ lập trình mà bạn sử dụng (chứa các dòng lệnh Selenium trong test scripts) và trình duyệt.

![](https://images.viblo.asia/7e988b6e-472e-4ec4-b6da-85a0c15f106d.jpg)

  ***RC***
* Kiến trúc của RC lại phức tạp hơn nhiều.
* Trước tiên, bạn cần start một ứng dụng riêng có tên Selenium RC Server
* Selenium RC Server sẽ hoạt động như một bộ phận trung gian giữa các lệnh Selenium và trình duyệt của bạn
* Khi bắt đầu kiểm thử, Selenium RC Server "tiêm" một chương trình Javascript có tên Selenium Core vào trình duyệt.
* Sau khi được tiêm, Selenium Core sẽ bắt đầu nhận các hướng dẫn được chuyển tiếp từ RC Server của bạn.
* Khi các hướng dẫn được nhận đầy đủ, Selenium Core sẽ thực thi chúng dưới dạng các lệnh Javascript.
* Trình duyệt sẽ tuân theo hướng dẫn của Selenium Core và sẽ chuyển tiếp phản hồi của nó tới RC Server.
* RC Server sẽ nhận được phản hồi của trình duyệt và sau đó hiển thị kết quả cho bạn.
* Tiếp đó với mỗi phiên kiểm thử RC Server sẽ lặp lại toàn bộ chu trình trên.

![](https://images.viblo.asia/da8e7ebc-1d25-4c3d-a205-88f7eb075e49.jpg)

## b. Tốc độ
  ***WebDriver***

WebDriver nhanh hơn Selenium RC vì WebDriver hỗ trợ bạn trao đổi dữ liệu trực tiếp và kiểm soát bằng chính engine riêng của mỗi trình duyệt.

![](https://images.viblo.asia/486fc75e-c612-41b2-ad90-a9d575a70b31.jpg)

  ***RC***

RC chậm hơn vì nó sử dụng Selenium Core như một bước trung gian để điều khiển trình duyệt.
![](https://images.viblo.asia/15749696-e709-412f-ac6c-67102a078307.jpg)

## c. Tương tác thực
  ***WebDriver***
* WebDriver tương tác với các elements theo cách thực tế hơn. Ví dụ: Nếu bạn có một textbox bị vô hiệu hóa, WebDriver sẽ tự động không thể nhập bất kỳ giá trị nào trên textbox đó giống như cách một user không thể.

![](https://images.viblo.asia/b4a25cf8-8bb9-49b8-9669-a62747e36e7a.jpg)

  ***RC***
* Với RC, Selenium Core sẽ thực thi tương tự như các đoạn mã JavaScript khác - nghĩa là có thể truy cập cả những phần tử bị vô hiệu hóa. Và bởi thế, trước đây, đã những người sử dụng Selenium phàn nàn rằng Selenium Core có thể nhập các giá trị vào textbox đang bị vô hiệu hóa trong các phiên kiểm thử của họ.

![](https://images.viblo.asia/2fd13c35-ea8f-4c8a-9eb8-ddb6ef331286.jpg)

## d. API
  ***WebDriver***
* API của WebDriver đơn giản hơn của Selenium RC vì bởi nó trực quan, ngắn gọn và không chứa các lệnh dư thừa và khó hiểu.

![](https://images.viblo.asia/7138b508-d18a-4f6d-9107-cff1f7c786cf.jpg)

  ***RC***
* Nhưng API của RC tuy trưởng thành hơn nhưng lại chứa các phần thừa và các lệnh thường gây nhầm lẫn. Ví dụ, hầu hết thời gian, người sùng đều sẽ bối rối không biết nên sử dụng type hay typeKeys; hoặc sử dụng click, mouseDown hoặc mouseDownAt. Tệ hơn, các trình duyệt khác nhau lại diễn giải từng lệnh theo những cách khác nhau!

## e. Các hỗ trợ của trình duyệt
  ***WebDriver***
* WebDriver có thể hỗ trợ trình duyệt HtmlUnit. Đây là một trình duyệt không có UI, nhờ vậy mà chu kỳ kiểm thử sẽ ít tốn thời gian hơn. (Nhưng cũng bởi vì không có UI nên HtmlUnit chỉ có thể điều khiển được thông qua các phương thức tự động như WebDriver)

***RC***
* RC không thể hỗ trợ trình duyệt HtmlUnit. Nó luôn cần một trình duyệt thực, bắt buộc phải có UI để thực thi kiểm thử.

## f. Báo cáo kết quả kiểm thử

  ***WebDriver***
* WebDriver không có tích hợp lệnh tự động tạo báo cáo kết quả kiểm thử. Bạn sẽ phải dựa vào cửa sổ đầu ra của IDE hoặc tự thiết kế báo cáo bằng cách coding để lưu trữ dưới dạng văn bản hoặc HTML, v.v.

***RC***
* RC đã tích hợp sẵn trình tạo kết quả thử nghiệm, do đó nó sẽ tự động tạo tệp HTML chứa báo cáo kết quả kiểm thử. Định dạng của báo cáo được thiết lập sẵn bởi chính RC. Hãy xem một ví dụ về báo cáo này dưới đây
![](https://images.viblo.asia/87541b60-d2e1-4201-ba24-224ecad359ef.jpg)


## g. Điểm hạn chế của riêng WebDriver

* WebDriver không thể sẵn sàng hỗ trợ trình duyệt mới. Do nó hoạt động ở cấp độ OS. Và chúng ta phải hiểu rằng các trình duyệt khác nhau giao tiếp với các OS theo những cách khác nhau. Nếu một trình duyệt mới xuất hiện, nó có thể phát sinh một quá trình giao tiếp mới hoàn toàn giữa các OS với trình duyệt đó. Vì vậy, phải dành cho WebDriver team khá nhiều thời gian để họ có thể tìm ra quy trình hoàn chỉnh trước khi phát hành một phiên bản WebDriver mới hỗ trợ được cho trình duyệt đó.

# 3. Tổng kết

|  | **WebDriver** | **RC** |
| -------- | -------- | -------- |
| ***Kiển trúc***    | Đơn giản hơn     | Phức tạp hơn     |
| ***Tốc độ***     | Nhanh hơn     | Chậm hơn     |
| ***Tương tác thực***     | Trực tiếp    | Trung gian thông qua Selenium Core     |
| ***API***     | Trực quan, ngắn gọn hơn     | Chứa các dòng lệnh, đặt tên các thao tác gây dễ nhầm lẫn     |
| ***Hỗ trợ của trình duyệt***     | Có hỗ trợ HtmlUnit     | Không hỗ trợ HtmlUnit     |
| ***Báo cáo kiểm thử***     | Không hỗ trợ sẵn, có thể coding để tự custom chức năng này     | Có tự động tạo tệp HTML chứa báo cáo kết quả kiểm thử    |
| ***Hỗ trợ với trình duyệt  mới***     | Không thể sẵn sàng hỗ trợ trình duyệt mới     | N/A    |

Link tham khảo: https://www.guru99.com/introduction-webdriver-comparison-selenium-rc.html