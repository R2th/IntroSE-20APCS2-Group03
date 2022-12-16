Trong bài này tôi sẽ hướng dẫn các bạn về chi tiết các thành phần của JMeter và cách sử dụng chúng trong kế hoạch kiểm thử để bao phủ tất cả các kịch bản kiểm tra performance có thể có trong AUT_Application Under Test ( Kiểm thử dưới ứng dụng ).
Các thành phần của JMeter bao gồm:
* Test plan
* ThreadGroup
* Samplers
* Listeners
* WorkBench
* Assertions
* Config Element
* Logic Controllers
* Timer

Sơ đồ bên dưới giúp bạn hiểu về mỗi thành phần và mối quan hệ giữa các phần trong JMeter
![](https://images.viblo.asia/1c4ac5c6-4e20-4874-b818-41d74248a0d2.png)

Bây giờ chúng ta sẽ bắt đầu tìm hiểu về từng thành phần của JMeter cùng với các trường hợp sử dụng để biết cách các thành phần làm việc như thế nào và các nhân viên kiểm thử có thể thao tác trên các thành phần này như thế nào để có thể thực hiện việc kiểm thử của mình. 

## Test Plan

Chỉ là một kế hoạch kiểm thử đơn giản trong kiểm thử phần mềm bao gồm tất cả các bước mà thực thi kịch bản, Kế hoạch kiểm thử của JMeter có cùng mục đích giống nhau. Mọi thứ mà được bao gồm trong một kế hoạch kiểm thử được thực thi theo một trình tự là từ trên xuống dưới hoặc theo trình tự được xác định trong kế hoạch kiểm tra.
Kế hoạch kiểm thử là đơn giản còn với ThreadGroup, Sampler và Listener thì nó trở nên phức tạp hơn ngay khi bạn bắt đầu thêm nhiều phần tử như các phần tử về cấu hình, điều khiển  và tiền xử lý.
Như chúng ta biết rằng JMeter đo hiệu suất bằng cách tạo ra người dùng ảo hoặc các Threads dùng để tấn công máy chủ dưới việc kiểm tra như thể người dùng thực đang gửi yêu cầu tới server. Do đó, mọi kế hoạch kiểm thử nên có nhiều người dùng ảo hoặc các nhóm Thread khi chúng ta gọi chúng trong JMeter.

**Các điểm quan trọng về Test Plan**
* Kế hoạch kiểm thử nên được lưu trước khi chạy
* Các file Jmeter hoặc các kế hoạch kiểm thử nên được lưu dưới dạng tệp với đuôi mở rộng là .jmx
* Bạn cũng có thể lưu các phần khác nhau của kế hoạch kiểm thử như các lựa chọn khác nhau . Ví dụ, Nếu bạn muốn lưu HTTP Request Sampler với Listener, bạn có thể lưu nó như Test Fragment vì vậy nó có thể được sử dụng nó trong các cảnh khác nhau của kiểm thử.
* Các thành phần của WorkBench không được lưu trong Kế hoạch kiểm thử.

## Thread Group
Thread Group là một nhóm ng;ười dùng mà sẽ tấn công máy chủ dưới việc kiểm tra hoặc là đồng thời hoặc là theo một số trình tự được xác định trước. Thread Group có thể được thêm vào trong kế hoạch kiểm thử bằng việc nhấn phải chuột trong Test Plan. JMeter là "Right Click Stuff", bạn có thể có tất cả các lựa chọn ở trên sau khi click chuột phải.
Bạn có thể đặt lại tên Tread Group thành tên của riêng bạn. Chỉ thay đổi tên và click vào bất kỳ đâu bên ngoài cửa sổ kế hoạch kiểm thử, bạn có thể nhìn thấy tên đã được thay đổi.
Dưới đây là hình hướng dẫn tạo thêm Thread Groups

![](https://images.viblo.asia/c09e45c7-61b3-4488-a1c9-d405a7eefa3d.png)

Nó là quan trọng để cấu hình thread group của bạn theo điều kiện kiểm thử
Ví dụ, nếu bạn muốn kiểm thử một server web như thế nào khi có 100 người dùng cùng truy cập một lúc, bạn có thể thiết lập theard như dưới đây:

![](https://images.viblo.asia/9926854f-b71d-443f-b930-2cbf49275e29.png)

Về cơ bản, có 3 tham số chính mà phải được thiết lập để tạo ra việc tải thực hoặc các người sử dụng ảo
* Số lượng của Thread ( Users ): Nó được định nghĩa số lượng người dùng ảo. Đối với mục đích kiểm thử chúng ta chỉ nên tạo ra một lượng tải hạn chế như khi tạo ra khối lượng khủng lồ một lần sẽ tiêu tốn nhiều threads mà dấn tới việc sử dụng CPU cao.
* Ramp Up Period :  Đây là trường rất quan trọng trong việc điều khiển việc tạo ra tải. Ramp up đã định nghĩa tổng số thời gian cái mà tổng tải sẽ được tạo ra.

**Example 1:**

![](https://images.viblo.asia/bcac4bfa-6df3-41d9-b83d-62a7e9393db3.png)

Nó có nghĩa là cả 10 users sẽ tấn công máy chủ đồng thời ngay khi kiểm thử được chạy

**Example 2:**

![](https://images.viblo.asia/605bbc50-2279-4089-882e-425041e928a0.png)

* Bạn phải chú ý Checkbox "Scheduler" ở hình trên. Trong trường hợp bạn muốn trường hợp kiểm thử của bạn chạy ở thời gian muộn hơn bạn có thể set thời gian như hình dưới. Nó có nghĩa rằng mỗi giây, một người sử dụng mới sẽ truy cập vào máy chủ không đồng thời những sẽ tăng dần. Trước 10 giây, tất cả người dùng sẽ gửi hết yêu cầu.
* Loop Count: Nó định nghĩa thời gian Thread Group sẽ thực thi. Nếu bạn check vào checkbox Forever thì trường hợp kiểm thử của bạn sẽ chạy mãi trừ khi  bạn phải dừng nó bằng tay. Điều này có thể được sử dụng để kiểm thử một số thứ như "Máy chủ của bạn không gặp sự cố khi tải liên tiếp trong vài phút".

![](https://images.viblo.asia/dee534ec-3e8f-4585-b0c5-220b0ef60ca6.png)

## Samplers

JMeter làm thế nào để biết được cái kiểu yêu cầu được gửi tới máy chủ ???
Nó thông qua Sampler, Sampler phải được thêm vào kế hoạch kiểm thử duy nhất, nó cho phép Jmeter biết cái kiểu request cần được gửi tới máy chủ và với bất kỳ tham số nào được định nghĩa trước hoặc không. Các yêu cầu có thể là HTTP, HTTP(s), FTP, TCP, SMTP, SOAP ...
Samplers chỉ có thể được thêm vào Thread Group không trực tiếp dưới kế hoạch kiểm thử như Thread Group cần để sử dụng một sampler để gửi một yêu cầu tới URL máy chủ dưới việc kiểm thử. Sampler có thể được thêm vào bởi đường dẫn: Thread Group -> Sampler -> HTTP Request.
 
 **HTTP Requests**
 
 Đây là những yêu cầu thông thường nhất gửi tới máy chủ. Ví dụ, chúng tôi muốn 100 người dùng sẽ tấn công https://www.google.com đồng thời, điều này có thể được làm như miêu tả của hình dưới đây:
 
 ![](https://images.viblo.asia/5e0c59b1-9088-4f31-9295-780f3eb7daa4.png)
 
*  Đường dẫn bên trong trang web chính. Ví dụ nếu bạn muốn truy cập http://www.google.com/gmail thì chúng tôi có thể thiết lập "/ Gmail" trên đường dẫn và phần còn lại vẫn giữ nguyên.
*  Không cần gõ "www" trong tên máy chủ
*  Số cổng được sử dụng nếu bạn đang sử dụng bất kỳ một máy chủ proxy.
*  Thời gian chờ kết nối và phản hồi có thể được thiết lập nếu mà muốn có điểm chuẩn về thời gian kết nối và thời gian phản hồi của máy chủ. Yêu cầu của bạn sẽ thất bại nếu máy chủ của bạn mất nhiều thời gian hơn để gửi phản hồi so với thời gian đã được thiết lập.
*  Bạn cũng có thể thiết lập các tham số để gửi cùng với yêu cầu của bạn. Ví dụ: trong một số trường hợp bạn có thể cần gửi mã xác thực cùng với yêu cầu của mình, vì thế bạn cần phải thêm chúng vào yêu cầu HTTP như dưới đây: 

![](https://images.viblo.asia/8920b6ca-4c92-411d-856b-30b2f03c7f51.png)

**Yêu cầu FTP** 

**Path -> Test Plan -> Thread Group -> Sampler -> FTP Request**

FTP chuẩn cho giao thức truyền tệp dữ liệu và nó được sử dụng cho việc upload hoặc download một tệp dữ liệu từ máy chủ.
Các Thread của Jmeter gửi yêu cầu tới máy chủ FTP để upload hoặc download các tệp dữ liệu từ đó và đo đạc việc thực hiện tải.

![](https://images.viblo.asia/b31cfafb-5222-4448-b77a-4979c181e33d.png)

* Tệp tin cục bộ là vị trí nơi bạn cần để lưu tệp đã được tải về
* Sử dụng lựa chọn GET nếu bạn tải từ máy chủ FTP
* Sử dụng lựa chọn POST nếu bạn upload bất kỳ tệp nào lên máy chủ FTP
Chúng ta có nhiều listeners cái mà sẽ  được bao phủ khi chúng đi qua một số các kế hoạch kiểm thử thực bao gồm Samplers, Listeners, các thành phần cấu hình...

## Listeners
Chúng ta đã nhìn thấy một vài samplers gửi yêu cầu tới máy chủ nhưng chưa từng phân tích phản hồi trả về. Kiểm thử hiệu năng là phân tích về các phản hồi của máy chủ trong nhiều dạng khác nhau và sau đó thể hiện giống nhau tới khách hàng.
Listeners được sử dụng để hiển thị kết quả thực hiện kiểm tra để người kiểm tra có được các số liệu thống kế. Chúng ta có khoảng 15 listeners trong Jmeter nhưng hầu như chỉ sử dụng chủ yếu là bảng, cây và đồ thị.

**View Results in Table**


Đây là hình người dùng thường sử dụng và dễ hiểu nhất của listerner. Nó hiển thị kết quả dưới dạng bảng với các tham số hiệu suất quan trọng
Listeners có thể được thêm trực tiếp dưới kế hoạch kiểm thử hoặc dưới một Sampler. Sự khác biệt là, khi bạn thêm một listener dưới một sampler, nó sẽ thể hiện các kết quả của chỉ một sampler. Nếu chúng ta thêm sampler trực tiếp dưới kế hoạch kiểm thử nó sẽ hiển thị kết quả của tất cả sampler dưới cấu trúc phân cấp.

Tham khảo màn hình dưới đây:

![](https://images.viblo.asia/3191e4df-fcdd-45c4-ac0c-b631b521b9ac.png)
 
 Bạn sẽ nhìn thấy kết quả giống như dưới đây

![](https://images.viblo.asia/18608537-70b4-4f4a-a973-a528d4835318.png)
 
*  Latency: đó là thời gian khi phần thông tin đầu tiên được nhận ( byte đầu tiên của dữ liệu được nhận )
*  Connect Time: đó là thời gian để thiết lập kết nối với máy chủ
*  Sample Time : Thời gian để nhận dữ liệu khi hoàn thành
*  Bytes : kích thước của dữ liệu khi được nhận

**View Results in tree**

Đây là một listeners được sử dụng thông thường khác và nó cung cấp thông tin chi tiết với các yêu cầu và phản hồi. Nó cũng có thể view trang HTML được hiển thị trong phản hồi ngoài việc xem Json, XML, Text, TegEx.

 Nó rất hữu ích khi nhân viên kiểm thử có thể đưa ra các xác nhận về phản hồi nhận được để đảm bảo rằng trường hợp kiểm thử là passed. Kết quả Jmeter vẫn thể hiện "Pass" thậm chí ngay cả những phản hồi không được thỏa mãn. 

Ví dụ: Chúng ta sẽ yêu cầu HTTP trên một website bất kỳ www.xyz.com và trong phản hồi chúng ta mong đợi <title> XYZ </title> hoặc trong các từ đơn giản, khi chúng ta truy cập trang home page  công ty của trang này mở với tên của nó. Nếu chúng ta không đặt assertion, Jmeter vẫn sẽ hiển thị kết quả khi truy cập vào server.

![](https://images.viblo.asia/75740263-6696-4e39-b5e5-097534b8b20c.png)

Hình dưới thể hiện format của các kết quả

![](https://images.viblo.asia/1e17d52d-871a-4bb4-9623-0701254444bf.png)

Đối với việc xem trang HTML trong phản hồi, Click trên drop-down ở khung bên trái sau đó chọn "HTML" , Điều hướng đến tab phản hồi và kiểm tra trang mà được trả về dưới dạng phản hồi của máy chủ.
 
![](https://images.viblo.asia/05e8d815-b329-45a8-953c-c7fb45dabc2b.png)

## Work Bench
Workbench là một nơi mà bạn có thể chứa những thành phần mà không được sử dụng trong kế hoạch kiểm thử hiện tại của bạn nhưng có thể được sao chép và dán. Khi bạn lưu tệp Jmeter, các thành phần mà ở trong workbench sẽ không được tự động lưu. Bạn phải lưu chúng riêng bằng cách click phải chuột và chọn "Save as" .
Bạn có thể nghĩ là sử dụng workbench làm gì khi có thể dễ dàng thêm bất kỳ thành phần nào vào kế hoạch kiểm thử của JMeter một cách trực tiếp
Lý do ở đây là người sử dụng có thể làm một số thử nghiệm và cố gắng thử kịch bản mới. Như chúng ta đã biết các thành phần trong Workbench không được lưu vì vậy người sử dụng có thể sử dụng bất cứ thứ gì và sau đó vứt đi. Nhưng có một số thành phần "Non-Test Components " mà chỉ có trong WorkBench.

Chúng được liệt kê ở đây:
* HTTP Mirror Server
* HTTP(s) Test Script Recorder
* Property Display

HTTP(s) Test Script Recorder là thành phần Non-Test quan trọng nhất được sử dụng trong Jmeter. Nó giúp nhân viên kiểm thử trong việc ghi lại kịch bản và sau đó thiết lập việc tải cho mỗi giao dịch.
Jmeter không chỉ ghi lại các yêu cầu gửi tới máy chủ.  Đừng lẫn lộn với chức năng "Record and Play" của QTP/Selenium. Tất cả các yêu cầu được ghi lại và các nhân viên kiểm thử có thể áp dụng load trên chúng để xem hành vi.

![](https://images.viblo.asia/859d1995-7f7e-4ee4-bff9-9ac4714a3aa2.png)

Đây là thành phần rất quan trọng đối với các tình huống nơi các nhân viên kiểm thử không biết tất cả các yêu cầu sẽ đi từ ứng dụng của họ. họ có thể sử dụng Http(s) script recorder để ghi lại ứng dụng dưới việc kiểm thử.
Kiểm thử hiệu năng của các ứng dụng di động cũng có thể được làm theo cách này bằng cách thiết lập Proxy Jmeter và sau đó ghi lại các yêu cầu nơi ứng dụng di động của chúng ta sẽ gửi tới máy chủ. 

## Assertions
Cho đến giờ, chúng ta đã bao phủ cách Jmeter truy cập vào máy chủ và cách các phản hồi được hiển thị thông qua listeners. Để đảm bảo rằng phản hồi nhận được là chính xác và theo mong đợi, chúng ta cần thêm các assertions ( xác nhận ). Các xác nhận đơn giản là các xác nhận mà chúng ta cần đặt vào các phản hồi để thực hiện so sánh kết quả.
Dưới đây là các kiểu của xác nhận thường được sử dụng:
* Phản hồi khẳng định
* Thời lượng khẳng định
* Xác nhận kích thước
* Xác nhận XML
* Xác nhận HTML

**Response Assertion**

Trong xác nhận khẳng định chúng ta có thể thêm các chuỗi mấu và sau đó so sánh chúng với phản hồi nhận được từ máy chủ. Ví dụ mã phản hổi 200 khi bất kỳ yêu cầu nào trả về một số phản hồi thành công. Vì thế nếu chúng ta thêm xâu mẫu "Response Code = 202" thì trường hợp kiểm thử trên sẽ thất bại

Dưới là hình miêu tả

![](https://images.viblo.asia/f1b118e1-9daf-4fe8-8e7b-f354085b37a5.png)
![](https://images.viblo.asia/7f9a0da3-be91-47a7-bac1-0a9ca8fc2d35.png)

Bây giờ, Khi chạy trường hợp kiểm thử nó thể hiện kết quả với mầu đỏ chỉ ra là các kết quả xác nhận là thất bại

**Duration Assertion**

Duration assertion là rất quan trọng và xác định rằng máy chủ phản hồi bên trong thời gian được đưa ra. Nó có thể được sử dụng trong các tình huống nơi chúng ta cần 100 mẫu yêu cầu và đảm bảo rằng mọi thời gian phản hổi được nhận trên trong giới hạn của benchmark.
Trường hợp: 10 user cùng truy cập đồng thời tới máy chủ "google.com" và duration assertion được thiết lập là 1000ms. Hãy nhìn hình dưới

![](https://images.viblo.asia/055e4337-47f1-4248-983a-f35e1abb9068.png)

Xác thực XML assertion nếu phản hồi dữ  liệu có văn bản XML chính xác trong nó và HTML Assertion xác nhận cấu trúc HTML của các phản hổi nhận được từ máy chủ.

![](https://images.viblo.asia/9b2e0029-d5d0-4976-8e3b-131f00b67848.png)

## Config Elements

Các yêu cầu gửi tới máy chủ có thể được tham số hóa bằng cách sử dụng một số thành phần cấu hình mà được thực thi trước yêu cầu thực. Một ví dụ đơn giản về nó là có thể đọc các giá trị của biến từ một tệp CSV mà cấu hình thiết lập CSV được được sử dụng.
Dưới đây là một số các thành phần cấu hình quan trọng được sử dụng trong kiểm tra hiệu năng của trang web và ứng dụng di động
* Cấu hình thiết lập dữ liệu CSV
* Các biến được định nghĩa bởi người dùng
* Các yêu cầu HTTPS mặc định
* Quản lý bộ đệm HTTPS
* Quản lý cookie HTTPS

**CSV Data Set Config**

Cấu hình thiết lập dữ liệu CSV giúp Jmeter chọn giá trị của một số tham số từ một tệp CSV thay vì truyền tham số khác nhau trong mỗi yêu cầu riêng biệt. Ví dụ, nếu chúng ta cần kiểm tra chức năng login với một nhóm người dùng và mật khẩu khác nhau, chúng ta có thể tạo hai cột trong một file CSV và nhập các giá trị ở đó vì thế Jmeter có thể chọn một cho mỗi yêu cầu gửi đến máy chủ

Dưới đây là quy trình sử dụng cấu hình thiết lập dữ liệu CSV để kiểm tra API thời tiết cho các thành phố khác nhau ở Ấn Độ
* Thêm các thành phần cấu hình thiết lập dữ liệu CSV tới kế hoạch kiểm thử

![](https://images.viblo.asia/f1d12e9c-8e24-4f25-ae3e-bf46b4ca2248.png)

* Tạo tệp CSV
* Biến pass trong tham số gửi yêu cầu. Tham số APPID có thể được tạo tự động từ http://openweathermap.ord/appid

![](https://images.viblo.asia/d76213fd-285e-400c-958a-e327d62e7e90.png)

* Chạy kiểm thử và xem kết quả 

**User Defined Variables**

Nó giúp Jmeter chọn giá trị từ một biến được định nghĩa trước. Ví dụ, bạn cần tạo một kế hoạch kiểm thử trong đó bạn cần thêm nhiều yêu cầu HTTP trên cùng một URL  và có thể có một kịch bản nơi phía khách hàng có kế hoạch di chuyển nó  tới một số URL khác nhau. Vì vậy, để tránh cập nhật URL trong mỗi yêu cầu chúng ta có thể nói Jmeter chọn URL từ một UDV ( biến được định nghĩa với người sử dụng ) có để được cập nhật sau để xử lý tất cả các yêu cầu để cập nhật URL.

![](https://images.viblo.asia/db2a3e1b-336c-47c5-b7d8-a5e110479999.png)

**HTTP Request Defaults**

Đây là thành phần cấu hình rất hữu ích cho việc xác định các giá trị mặc định của yêu cầu https. Để hướng dẫn bạn nhiều hơn, láy một ứng dụng nơi chúng ta cần truy cập 50 yêu cầu khác nhau tới máy chủ google. Trong hoàn cảnh này, nếu chúng ta thêm một HTTP Request Default sau đó chúng ta không cần xác đinh tên máy chủ, đường dẫn hay bất kỳ cái gì khác ví dụ như là số cổng, thời gian kết nối. Bất cứ cái gì được xác định trong thành phần cấu hình HTTP Request Default được kế thừa bởi tất cả các yêu cầu HTTP.

![](https://images.viblo.asia/cbd971b4-3c5e-4719-b146-ccaafc9521ee.png)

HTTP Cache Manager và HTTP Cookie Manager được sử dụng trong tạo Jmeter có hành vi như một trình duyệt thời gian thực. HTTP Cache Manager có thể làm sạch bộ nhớ đệm sau mỗi yêu cầu trong khi người khác có thể quản lý việc cài đặt cookies.
## Logic Controllers And Timers

Logic controllers and timers giúp Jmeter điều khiển dòng giao dịch. Timers đảo bảo việc trì hoãn trong mỗi thread nếu cầu để kiểm tra ở bất kỳ máy chủ nào. Ví dụ. nếu chúng ta cần FTP request đợi 5 giây sau yêu cầu HTTP được hoàn thành, chúng ta có thể thêm timer ở đây.
Logic Controller được sử dụng để định nghĩa dòng các yêu cầu nơi được gửi tới máy chủ. Nó cũng có thể cho phép bạn lưu trữ các yêu cầu cho mỗi đơn vị riêng lẻ như là login và logout.

Hy vọng bài viết trên đây có thể giúp các bạn phần nào hiểu thêm về các thành phần trong Jmeter. Trong bài sau tôi sẽ hướng dẫn các bạn về Processors và Controllers của Jmeter.


Link tham khảo: https://www.softwaretestinghelp.com/jmeter-components/