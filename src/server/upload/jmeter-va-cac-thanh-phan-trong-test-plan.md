## 1. Giới thiệu tool JMeter
- JMeter là công cụ có thể test tải, test chức năng, test hồi quy... trên nhiều giao thức và các công nghệ khác nhau:
    - Web: HTTP, HTTPS
    - Web service: SOAP
    - Database với JDBC drivers
    - FTP service
-  JMeter là một ứng dụng Java desktop với giao diện đồ hoạ sử dụng Swing graphical API.
Do đó nó có thể chạy trên bất kỳ môi trường / máy trạm nào chấp nhận một máy ảo Java,
ví dụ như Windows, Linux, Mac, v.v . 
- Các tính năng của JMeter: 
    - Vì là phần mềm Open Source nên luôn có sẵn các plugin phục vụ thiết kế test
    plan, giao diện trực quan, dễ sử dụng. 
    - JMeter có thể tiến hành kiểm tra tải và hiệu suất cho nhiều loại máy chủ khác
    nhau - Web - HTTP, HTTPS, SOAP. Cơ sở dữ liệu thông qua JDBC, LDAP,
    JMS, Mail - POP3, v.v ... 
    - Nó là một công cụ không phụ thuộc vào platform. Trên Linux /Unix, JMeter
    có thể được gọi bằng cách nhấp vào tập lệnh shell JMeter. Trên Windows, nó
    có thể được gọi bằng cách run file jmeter.bat.
    - Nó có đầy đủ Swing và các thành phần hỗ trợ gọn nhẹ (precompiled JAR sử
    dụng các gói javax.swing . *). 
    - JMeter  lưu test plan của nó ở định dạng XML . Do đó cho có thể dùng text
    editor bất kỳ để generate test plan. 
    - Khung đa luồng đầy đủ của nó cho phép lấy mẫu đồng thời bởi nhiều luồng
    và lấy mẫu đồng thời các chức năng khác nhau bằng các nhóm luồng riêng
    biệt
    - Jmeter có khả năng mở rộng cao. 
- Cách thức hoạt động: JMeter giả lập một nhóm người dùng gửi các yêu cầu tới một máy chủ và trả về các số liệu thống kê cho người dùng dưới dạng các báo cáo tóm tắt, bảng biểu và đồ thị dạng cây, đồ thị đồ họa, … <br>
 Sơ đồ hoạt động của JMeter:
 
     ![](https://images.viblo.asia/503be53e-5f2e-43cf-8a80-9ff0429b9764.png)
- Môi trường để chạy JMeter:
    -  Download JDK tại trang chủ của oracle: https://www.oracle.com/java/technologies/javase-downloads.html
    -  Kiểm tra cài đặt Java thành công bằng cách mở terminal và gõ lệnh: java -version
    ![](https://images.viblo.asia/f447eb70-60f4-40b8-a38e-966898627535.PNG)
    Nếu hiển thị như trên là đã cài đặt thành công Java
    - Download JMeter tại đây: https://jmeter.apache.org/download_jmeter.cgi
    Sau khi tải về, giải nén file zip, sau đó vào thư mục bin mở file jmeter.bat
    - JMeter khởi động xong sẽ có giao diện:
    ![](https://images.viblo.asia/5eaabdd7-cd58-4f4e-852e-9dadce91d74d.PNG)


## 2. Test plan và các thành phần trong test plan
- Có 2 cách để tạo script với JMeter. Một là record từ thao tác người dùng trên hệ
thống. Hai là tự tạo các request. Cách hai tương đối nhanh, không mất công chỉnh sửa
nhưng để tự tạo request đúng và đủ thì đòi hỏi tester phải biết rõ các hàm POST, GET cùng các param, path tương ứng của từng chức năng. 
- Test plan chứa các test case. Nó định nghĩa các test case và làm thế nào để đi đến test case đó. Một testplan hoàn chỉnh bao gồm một hoặc nhiều yếu tố như thread groups, logic controllers, sample-generating controllers, listeners, timers, assertions, và  configuration elements. Một testplan phải bao gồm ít nhất 1thread group. 
![](https://images.viblo.asia/08116d0b-b8b5-4dbc-9b68-69dd993bdce9.PNG)

- **User Defined Variables**:  cho phép định nghĩa các biến tĩnh, từ đó, cung cấp các giá trị lặp lại trong test của người dùng, như là tên server, cổng, … Ví dụ, nếu muốn test một ứng dụng trên server www.example.com, có thể định nghĩa một biến server với giá trị www.example.com. Giá trị này sẽ được thay bằng biến "${server}" ở bất kỳ vị trí nào trong test plan mà không cần phải liệt kê lại. 
    - Tùy chọn Run Thread Groups consecutively (i.e. one at a time): Chạy liên tiếp (Chạy tuần tự từ trên xuống). 
    - Run teardown Thread Groups after shutdown of main threads: Chạy tearDown Thread Group sau khi Thread Group shutdown. 
    -  Funtional test Mode  (i.e. save Respone Data and Sampler Data): Lựa chọn này khiến Jmeter record dữ liệu trả lại từ server cho mỗi sample và ghi chúng ra file mà được chỉ ra ở Listener. Bạn có thể sử dụng button Configuration trên Listener để điều chỉnh những trường muốn save. Lựa
    chọn này có thể hữu ích nếu bạn muốn chạy debug để chắc chắn server của bạn trả về kết quả mong muốn. 
    - Add directory or jar to classpath: Cho phép người dùng thêm vào các file JAR, hoặc các thư mục, trong trường hợp muốn tạo thêm các extension cho Jmeter. Tuy nhiên, cần lưu ý khởi động lại Jmeter khi có thay đổi. Ngoài ra, có thể sử dụng cách khác, đó là copy tất cả các file JAR vào thư mục lib của JMETER. Một cách khác nữa là cấu hình trong Jmeter properties file, Edit
    "#user.classpath=../classes;../jars/jar1 để thêm vào các thư viện. 
### 2.1. Thread Group
- Là thành phần bắt buộc phải có trong 1 Test Plan. Các thành phần trong Thread
    group sẽ kiểm soát số lượng Threads mà Jmeter sử dụng trong suốt quá trình test.
    ThreadGroup cho phép thiết lập:
![](https://images.viblo.asia/ad1c1c00-04c6-49c8-9199-20f7bdc5f32f.PNG)
    - Action to be takens after a Sample error: Hành động được thực hiện sau khi 1
    sample bị lỗi. <br>
    Mặc định Jmeter để Continue – nghĩa là tiếp tục chạy các sample
    khác bỏ qua sample bị lỗi, Start Next Thread Loop – là chuyển sang vòng lặp
    tiếp theo, Stop Thread – Dừng Thread hiện tại, Stop test – Dừng hoàn toàn để
    kiểm tra lỗi trước khi chạy tiếp, Stop test Now – Dừng hoàn toàn việc test một
    cách đột ngột. 
    - Number of thread (users): số lượng người dùng hệ thống
    - Ramp-up Period (in secords): Thời gian để máy client khởi tạo số Number of threads 
    - Loop count: Số lần lặp, có thể chọn forever hoặc điền số lần cụ thể. <br>
- Cách tạo Thread group: click chuột phải vào **Test plan -> Add -> Threads (Users) -> Thread group**
### 2.2. Controllers
JMeter có 2 loại controllers: Samplers và Logical Controller, có tác dụng điều khiển thực hiện quá trình test.Với Samplers controller, có nhiệm vụ yêu cầu JMeter gửi các requests tới một server. 
- Samplers controller: Jmeter samplers cho phép định nghĩa các request có thể
được gửi tới một server. Sampler có thể giả lập các request của người dùng tới
target server. Mỗi Sampler sinh ra các mẫu kết quả (sample result), với rất
nhiều các thuộc tính như hiệu năng, elapsed time, throughput, … Mặc định,
Jmeter gửi các request theo thứ tự mà các Samplers xuất hiện trên cây. Tuy
nhiên, trật tự xử lý các Sampler có thể được cấu hình mở rộng thêm với các
Logic Controller. Các controllers có thể được sử dụng để chỉnh sửa số lần lặp
của một sampler. Các JMeter samplers bao gồm: HTTP Request, FTP Request,
JDBC Request, Java Request, SOAP/XML-RPC Request, WebService (SOAP)
Request, LDAP Request, LDAP Extended Request, Access Log Sampler,
BeanShell Sampler, BSF Sampler, TCP Sampler, JMS Publisher, JMS
Subscriber, JMS Point-to-Point, JUnit Request, Mail Reader Sampler, Test
Action. Có thể customize mỗi sampler bằng cách thiết lập các thuộc tính của hoặc thêm các Configuration Element.
- Logic Controllers: Logic Controller cho phép bạn xử lý trật tự xử lý Samplers
/ Request trong một Thread . Logic Controllers sẽ quyết định "When & How"
gửi yêu cầu đến một máy chủ web. Logic Controller mà Jmeter cung cấp:
Simple Controller, Loop Controller, Once Only Controller, Interleave
Controller, Random Controller, Random Order Controller, Throughput
Controller, Runtime Controller, If Controller, While Controller, Switch
Controller, ForEach Controller, Module Controller, Include Controller,
Transaction Controller, Recording Controller. Một số logic controller thông
dụng: 
    - Interleave controller: Ứng dụng: Nếu 1 ThreadGroup có 5 user, thực hiện 2
    lần lặp. Trong Thread Group có interleave controller, với 2 element con của nó
    là A, hoặc B. Thì với mỗi user, các scope ngoài interleave controller được thực
    hiện bình thường, riêng interleave controller, với mỗi user, trong mỗi lần lặp,
    chỉ thực hiện 1 element con của nó (A hoặc B), lần thực hiện kế tiếp sẽ thực
    hiện element con tiếp theo của interleave controller, theo thứ tự (VD: Lần 1,
    thực hiện A, lần 2 thực hiện B, lần 3 lại thực hiện A, lần 4 thực hiện B, …) 
    - Switch controller: Ứng dụng: Tương tự như interleave Controller, nhưng thay
vì lần lượt thực hiện các phần tử con của nó, nó thực hiện 1 phần tử theo giá trị
switch. VD: Trong phần tử switch, có các con là A0, A1, A2, …An. Giá trị
switch sẽ lấy phần tử tương ứng trong mảng con (đánh số từ 0). Giá trị switch được chọn có thể là 1 số, cũng có thể là 1 biến, khi đó, giá trị của biến sẽ đưa ra phần tử được chọn thích hợp. 
    - Random controller: Thực hiện tương tự như Interleave controller, điểm khác
biệt nằm ở chỗ nó không thực hiện theo thứ tự tuần tự mà thực hiện 1 element
con bất kỳ của nó. 
    - Random order controller: Thực hiện tương tự như Simpler Controller, điểm
khác biệt nằm ở chỗ nó sẽ thực hiện mỗi phần tử con 1 lần, nhưng thứ tự thực
hiện các phần tử con là random. 
    - Transaction Controller: Transaction Controller cho phép tạo ra các sampler
bổ sung, các sampler này sẽ đo thời gian tổng thực hiện để test lồng các yếu tố
với nhau. Có 2 option: Generate parent sample: chỉ generate các sample cha
trong các listener, Include duration of timer and pre-post processors in
generate sample: tùy chọn này sẽ generate cả timer, pre- and post-processing
time delays trong sample controller.
    - Simple Controller: Các Simple Controller cho phép tổ chức các sampler đơn
giản, không giống các controller khác, controller này không cung cấp chức
năng ngoài của thiết bị lưu trữ. 
### 2.3. Listener
Truy cập vào các thông tin Jmeter tập hợp về các testcase trong khi chạy và hiển
thị chúng dưới các dạng khác nhau như: graph, tree, table, …cho phép lưu giữ các
thông tin này dưới nhiều dạng file khác nhau như CSV, XML, txt, …Nó được add
vào bất cứ nơi nào trong testplan và chỉ thu thập dữ liệu từ thành phần cùng cấp hoặc cấp dưới nó… Một số Listener Jmeter cung cấp: Sample Result Save,
Configuration, Graph Full Results, Graph Results, Spline Visualizer, Assertion
Results, View Results Tree, Aggregate Report, View Results in Table, Simple
Data Writer, Monitor Results, Distribution Graph (alpha), Aggregate Graph,
Mailer Visualizer, BeanShell Listener, Summary Report. 
### 2.4. Timer
Theo mặc định, một thread JMeter gửi các yêu cầu mà không cần tạm dừng giữa
các sample. Đây có thể không phải là điều bạn muốn. Bạn có thể thêm một Timer
cho phép bạn xác định khoảng thời gian chờ giữa mỗi request. Jmeter cung cấp
các loại Timer như sau: Constant Timer, Gaussian Random Timer, Uniform
Random Timer, Constant Throughput Timer, Synchronizing Timer, BeanShell
Time. 
### 2.5. Assertions 
Cho phép add một số kiểm tra để xác nhận phản hồi từ server . Sử dụng assertion
bạn có thể chứng minh rằng ứng dụng của bạn đang trả lại dữ liệu chính xác. Một
số assertion Jmeter cung cấp: Beanshell Assertion, BSF Assertion, Compare
Assertion, JSR223 Assertion, Response Assertion, Duration Assertion, Size
Assertion, XML Assertion, BeanShell Assertion, MD5Hex Assertion, HTML
Assertion, XPath Assertion, XML Schema Assertion. 
### 2.6. Configuration Elements 
 Configuration Element cho phép người dùng tạo các giá trị mặc định và các biến
được sử dụng trong các Samplers. Chúng được sử dụng để add hoặc modify các
request tạo ra từ các Sampler. Trong scope của nó, 1 Configuration Element được
thực hiện đầu tiên, trước tất các Sampler trong cùng scope đó. Vì vậy, 1
Configuration Element chỉ được access trong nội bộ nhánh mà nó được đặt.
Jmeter cung cấp các loại Configuration Elements JMeter như sau: CSV Data Set
Config, FTP Request Defaults, HTTP Authorization Manager, HTTP Cookie
Manager, HTTP Proxy Server, HTTP Request Defaults, HTTP Header Manager,
Java Request Defaults, JDBC Connection Configuration, Login Config Element,
LDAP Request Defaults, LDAP Extended Request Defaults, TCP Sampler
Config, User Defned Variables, Simple Config Element.

### 2.7. Pre-processor Elements
Pre-processors cho phép chỉnh sửa các Samplers trong scope của nó. PreProcessor thường được sử dụng để chỉnh sửa thiết lập của một Sample Request
trước khi nó được chạy, hoặc update các variables không được extract từ các
response text. Danh sách các Pre-Processor Elements JMeter cung cấp: HTML
Link Parser, HTTP URL Re-writing Modifer, HTML Parameter Mask, HTTP
User Parameter Modifer, User Parameters, Counter, BeanShell PreProcessor. 
### 2.8. Post-processor Elements 
Post-processors được thực hiện sau khi một request vừa được tạo ra từ 1 Sampler.
Thông thường, Post processor được đặt làm con của một Sampler, để đảm bảo nó
được chạy chỉ sau Sampler đó, không liên quan tới các Sampler sau đó. Post Processor Element là đặc biệt hữu dụng để xử lý các response data, ví dụ như để
thu được các giá trị cụ thể cho các sử dụng về sau. Danh sách các Post-Processor
Elements mà JMeter cung cấp: Regular Expression Extractor, XPath Extractor,
Result Status Action Handler, Save Responses to a file, Generate Summary
Results, BeanShell PostProcessor. 
### 2.9. CSV Data Set Config
Khi muốn run script với nhiều dữ liệu khác nhau bạn cần phải truyền dữ liệu vào
từ bên ngoài thì bạn cần sử dụng tới CSV Data Set Config. Để add đối tượng này,
chuột phải vào TestPlan > Add > Config Element > CSV Data Set Config: 
![](https://images.viblo.asia/582016c2-420f-4363-9b5b-cb9f7b0b0bf2.PNG)
Trong đó: <br>
- Filename: Tên file .csv hoặc .txt nếu file để trong thư mục Bin, nếu file để ở chỗ
khác thì phải điền đầy đủ đường dẫn tới file. Mỗi bộ dữ liệu trong file là 1 dòng,
mỗi thuộc tính là 1 cột trong đối với file csv. Đối với file .txt mỗi bộ dữ liệu là 1
dòng, mỗi thuộc tính trong bộ tách nhau bằng dấu “,”.
- Variable names: Tên các thuộc tính tương ứng trong file.
Note: Đối tượng này chỉ có tác dụng cho các đối tượng cùng cấp hoặc cấp nhỏ
hơn nó. Nếu trong script có sử dụng Loop Controller thì đối tượng này phải đặt
trong Loop Controller.