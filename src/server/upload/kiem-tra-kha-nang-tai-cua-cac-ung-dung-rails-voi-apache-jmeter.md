# I. Đặt vấn đề 
Trong thực tế khi các dự án Rails chạy trên trình duỵêt, người ta luôn phải tính toán về độ smooth cũng chư các chức năng chạy ổn khi online. Vì thế các TH khó test bằng các unit test thông thường khi Khả năng tải(VD như hoảng 10000 user đều login cùng lúc) của nhiều request đồng thời. Rất nhiều trang web đã sập ngay khi có quá nhiều request tại 1 khoảng thời gian nhất định. Hơn nữa, sau khi người dùng cuối bắt đầu sử dụng ứng dụng, nhiều thứ khác nhau có thể khiến ứng dụng không hoạt động như  mong đợi, vì một số lý do sau:

* Hành vi của người dùng có thể không thể đoán trước được;
* Người dùng được phân phối trên các địa điểm khác nhau;
* Một số lượng lớn người dùng có thể sử dụng ứng dụng cùng một lúc.
Đối với các ứng dụng quy mô lớn, những điều này rất cần biết trước khi phát hành chính thức. Để đảm bảo rằng ứng dụng hoạt động như mong đợi, ta cần xem xét một số điều khi triển khai chức năng của nó:
## 1. Các giai đoạn
  Trong quá trình phát hành theo từng giai đoạn, một phần nhỏ người dùng có thể kiểm tra ứng dụng trước khi mọi người có quyền truy cập vào chức năng. Điều này sẽ giúp xác định hành vi của người dùng.
*Thử nghiệm tải* - Trong quá trình triển khai theo từng giai đoạn, ta có thể xác định hành vi của người dùng nhưng không thể biết nền tảng hoạt động như thế nào khi nhiều người dùng sử dụng ứng dụng cùng một lúc từ các vị trí khác nhau
## 2. Kiểm tra tải là gì và nó khác với kiểm tra hiệu suất như thế nào?
Ba thuật ngữ sau đây nghe có vẻ giống nhau, nhưng chúng khác nhau:
* Kiểm tra năng suất(Performance Testing), 
* Kiểm tra tải(Load Testing)
* Bài kiểm tra về áp lực(Stress Testing)
### a. Performance Testing
Kiểm tra hiệu suất là một cơ chế kiểm tra chung được sử dụng để đánh giá cách ứng dụng hoạt động với một đầu vào nhất định. Điều này có thể được thực hiện với một người dùng sử dụng ứng dụng hoặc với nhiều người dùng. Nó được tiến hành để đánh giá các số liệu nhất định, chẳng hạn như thời gian phản hồi và mức sử dụng CPU/memory. *Load/stress* là một tập hợp con của thử nghiệm hiệu suất.
### b. Load Testing
Kiểm tra tải được tiến hành để đảm bảo ứng dụng hoạt động như mong đợi với một số lượng người dùng được chỉ định sử dụng ứng dụng đồng thời trong một khoảng thời gian nhất định. Nó giúp xác định số lượng người dùng mà một hệ thống có thể xử lý.
### c. Stress Testing
Kiểm tra áp lực và kiểm tra tải có liên quan chặt chẽ với nhau. Stress testing có thể được thực hiện với cơ chế tương tự như kiểm thử tải, nhưng mục tiêu của kiểm tra là khác nhau. Mục tiêu của kiểm tra tải là để xác định xem ứng dụng có hoạt động với số lượng người dùng được chỉ định hay không, trong khi kiểm tra căng thẳng được tiến hành để xác định cách ứng dụng hoạt động và xử lý lỗi sau khi đạt đến giới hạn tải.

Dựa trên giai đoạn tăng tốc, thử nghiệm hiệu suất có thể được phân loại là thử nghiệm tăng đột biến hoặc thử nghiệm ngâm . Số người dùng tăng đột biến trong một thời gian ngắn là một phép thử tăng đột biến và lượng người dùng tăng chậm trong thời gian dài là một phép thử ngâm.

## 3. Tại sao Kiểm tra Hiệu suất lại Quan trọng?
Trong một trong những dự án Rails mà được dự đoán người dùng sẽ tăng trưởng rất nhiều trong tương lai gần. Dẫn đến cần đảm bảo rằng ứng dụng hoạt động như mong đợi và chức năng quan trọng không bị mất khi số lượng người dùng tăng lên. Vì vậy, làm thế nào để chúng tôi đảm bảo điều này? Vậy hãy thực hiện kiểm tra tải và kiểm tra xem ứng dụng có thể xử lý sự gia tăng người dùng nhất định hay không. Kiểm tra hiệu suất có thể quan trọng trong nhiều trường hợp khác:

* Nếu ứng dụng dự kiến sẽ có lượng người dùng tăng đột biến vào một ngày cụ thể, chẳng hạn như ngày **Black Friday**, thì việc kiểm tra ứng dụng tăng đột biến với một khoảng thời gian ngắn có thể giúp chúng tôi tìm ra các vấn đề tiềm ẩn trong hệ thống.
* Kiểm tra tải giúp xác định các lỗi trong hệ thống không hiển thị hoặc rất nhỏ khi chỉ có một số người dùng sử dụng nó.
* Nó cho phép chúng ta đánh giá tốc độ của nền tảng bị ảnh hưởng như thế nào khi tăng tải. Nếu ứng dụng chậm, chúng ta có thể mất khách hàng.
* Nó giúp đánh giá cách hệ thống của chúng tôi hoạt động khi tăng tải và hệ thống có gặp sự cố khi sử dụng CPU hoặc bộ nhớ cao khi có 10.000 người dùng hay không.
* Có thể xác định chi phí chạy ứng dụng cho một số lượng người dùng cụ thể bằng thử nghiệm tải.
# II. Giải pháp
Chúng ta có thể tìm thấy lỗi trong ứng dụng Rails của mình khi thực hiện kiểm tra tải. Tôi sẽ mô tả một tình huống tương tự khi chúng tôi xác định được một vấn đề. Một ứng dụng đặt phòng khách sạn có quy trình đặt phòng mở và khi chỉ có một vài người dùng cố gắng đặt phòng, mọi thứ đều ổn. Tuy nhiên, khi nhiều người dùng đang cố gắng đặt cùng một phòng, hai người dùng khác nhau có thể đặt thành công. Bằng cách tải thử nghiệm ứng dụng của mình, chúng tôi có thể xác định sự cố và khắc phục nó ở giai đoạn đầu, trước khi phát hành tính năng này.

## 1. Sử dụng Apache JMeter để tải kiểm tra ứng dụng Rails
JMeter là một công cụ kiểm tra tải mã nguồn mở được cấp phép bởi Apache 2.0. Nó cung cấp thử nghiệm tải dựa trên luồng. Với thử nghiệm dựa trên luồng, chúng ta có thể dễ dàng mô phỏng áp lực mà hệ thống của chúng tôi sẽ phải chịu khi nhiều người dùng sử dụng ứng dụng đồng thời. JMeter cũng cung cấp báo cáo tốt về kết quả thử nghiệm.

Chúng ta sẽ xem xét cách sử dụng Apache JMeter để thực hiện kiểm tra tải nhằm xác định các vấn đề tiềm ẩn với hệ thống và thời gian phản hồi của ứng dụng bằng cách mô phỏng nhiều người dùng sử dụng hệ thống.

JMeter có thể được tải xuống từ liên kết sau: http://jmeter.apache.org/download_jmeter.cgi#binaries

### Một số thuật ngữ JMeter để làm quen
* **Test Plan**(kế hoạch kiểm tra) là thứ cấp cao nhất bên trong, được xác định là các thành phần kiểm tra tải. Các biến và cấu hình chung được xác định ở đây.
* **Thread Group**(nhóm chủ đề) được sử dụng để xác định luồng và cấu hình, chẳng hạn như số luồng, thời gian tăng tốc, độ trễ giữa các luồng và vòng lặp. Đây có thể được coi là số lượng người dùng song song mà bạn muốn chạy thử nghiệm tải.
* **Sampler** là những gì một luồng duy nhất thực thi. Có nhiều loại trình lấy mẫu khác nhau, chẳng hạn như yêu cầu HTTP, yêu cầu SMTP hoặc yêu cầu TCP.
* **Pre/Post Processor**(bộ xử lý trước/sau) được sử dụng để thực thi một cái gì đó trước hoặc sau khi bộ lấy mẫu chạy. Các bộ xử lý hậu kỳ có thể nhận dữ liệu phản hồi từ một lệnh gọi API và chuyển nó để sử dụng cho lệnh gọi tiếp theo.
* **Listener** lắng nghe phản hồi từ trình lấy mẫu và cung cấp báo cáo tổng hợp về thời gian phản hồi hoặc phản hồi từ mỗi luồng.
* **Assertion** có thể hữu ích để xác thực rằng dữ liệu phản hồi là những gì chúng tôi mong đợi từ trình lấy mẫu.
* **Config Element**(phần tử cấu hình) xác định các cấu hình, chẳng hạn như tiêu đề HTTP, cookie HTTP hoặc cấu hình tập dữ liệu CSV.
Để chạy kiểm tra tải, trước tiên chúng ta cần tạo một tệp JMX nơi chúng ta xác định các thuật ngữ JMeter được mô tả ở trên.

### Chuẩn bị tệp JMX để kiểm tra tải
JMX là một tệp dự án JMeter được viết ở định dạng XML. Việc ghi tệp JMX theo cách thủ công có thể khó khăn, vì vậy chúng ta sẽ sử dụng giao diện JMeter để tạo tệp.

Mở giao diện JMeter và định vị kế hoạch kiểm tra. Bên trong kế hoạch kiểm tra,  thêm các luồng và cấu hình kiểm tra tải của nó.
![](https://images.viblo.asia/d6c05d84-9cb9-4ffb-b136-841d0cfd9f3d.png)
### Giao diện JMeter để tạo kế hoạch thử nghiệm

Kế hoạch thử nghiệm có thể được đổi tên theo những gì đang thử nghiệm tải. Chúng ta có thể cấu hình một nhóm chủ đề (Người dùng - Users). Bạn có thể giữ cài đặt mặc định ở đây và chuyển sang tạo nhóm chủ đề.

*Add -> Threads(Users) -> Thread Group*

Trong nhóm luồng, theo mặc định, sẽ có một luồng duy nhất được chỉ định. Thay đổi số nếu cần để mô phỏng số lượng người dùng truy cập ứng dụng.

Vì chúng ta sẽ tải thử nghiệm một ứng dụng Rails dựa trên web, chúng ta sẽ thêm một trình lấy mẫu HTTP. Chúng ta có thể thêm một trình lấy mẫu, sẽ nằm bên trong a ThreadGroup. Thêm một HTTP Samplerbằng cách điều hướng sau:

*Add -> Sampler -> HTTP Request*

Tại đây, chúng tôi định cấu hình IP hoặc miền mà chúng tôi đang tải thử nghiệm và phương thức HTTP và bất kỳ nội dung yêu cầu nào được yêu cầu cho điểm cuối HTTP.

Cuối cùng, để xem báo cáo của thử nghiệm tải, chúng ta có thể thêm một người nghe vào nhóm luồng.

*Add -> Listener -> View Result Tree*

Cây kết quả xem sẽ hiển thị thời gian phản hồi của từng luồng, cũng có thể thêm các loại báo cáo khác ở đây. 'Xem cây kết quả' chỉ nên được sử dụng để gỡ lỗi các đề xuất chứ không phải để thử nghiệm thực tế.

Bằng cách này, chúng ta có thể tạo một kế hoạch thử nghiệm đơn giản và thực hiện nó. Chỉ cần nhấn vào biểu tượng phát ở thanh trên cùng của JMeter để thực hiện kiểm tra.

### Những điều cần cân nhắc trước khi tải thử nghiệm ứng dụng Rails
Ví dụ trên là một yêu cầu HTTP điểm cuối rất đơn giản. Trong trường hợp ứng dụng Rails của chúng ta, các điểm cuối mà ta muốn kiểm tra đã bị khóa bằng xác thực. Do đó, cần đảm bảo rằng chúng ta có những điều sau đây:

* **Cookie web** - Các điểm cuối HTTP cần phải có tiêu đề cookie trước khi có thể thực hiện kiểm tra tải trên chúng. JMeter cung cấp chức năng thêm cookie sau khi người dùng đăng nhập. Trong phần tiếp theo, chúng ta sẽ xem xét cách chúng ta có thể ghi lại yêu cầu của trình duyệt và chuyển đổi nó thành tệp JMX để kiểm tra tải của chúng ta và cũng sẽ đề cập đến việc ghi lại cookie.
* **Rails CSRF token**(mã thông báo Rails CSRF) - Rails bảo vệ ứng dụng khỏi lỗ hổng bảo mật bằng cách cung cấp mã thông báo CSRF, vì vậy cần đảm bảo rằng yêu cầu của ta có xác thực CSRF trong tiêu đề trước khi thực hiện kiểm tra tải. Mã thông báo CSRF này có trong thẻ *header* bên trong *meta tag* trong HTML.
**Rails CSRF Token** có thể được tìm nạp trong JMeter bằng cách sử dụng bộ xử lý hậu kỳ. Bấm chuột phải vào Yêu cầu HTTP tải trang web chứa mã thông báo CSRF, sau đó chọn *Add -> Post Processor -> Regular Expression Extractor*. Tại đây, bạn có thể thêm các cấu hình trình trích xuất biểu thức chính quy sau để đọc giá trị CSRF từ thẻ meta tiêu đề:

* Reference Name: *csrfvalue*
* Regular Expression: *name="csrfToken" content="(.+?)"*]
* Template: *$1$*
* Match No: *1*

Bây giờ, biến *csrfvalue* có thể được sử dụng để thực hiện request.

### Ghi yêu cầu từ trình duyệt để tạo tệp JMX
Với ít điểm cuối HTTP hơn, có thể đơn giản để tạo tệp JMX từ giao diện JMeter. Tuy nhiên, đối với một trường hợp thử nghiệm lớn hơn, điều này có thể khó khăn. Ngoài ra, có khả năng chúng tôi có thể bỏ lỡ các yêu cầu thực tế được thực hiện khi người dùng sử dụng ứng dụng. Tôi muốn các yêu cầu thực tế được thực hiện từ trình duyệt được ghi lại và tệp JMX được tạo tự động.

JMeter có thể được thêm vào làm proxy giữa ứng dụng Rails và trình duyệt. Với điều này, tất cả các yêu cầu sẽ được chuyển tiếp đến máy chủ Rails bởi JMeter. Đây còn được gọi là một cuộc tấn công MITM (người ở giữa).

![](https://images.viblo.asia/0d842495-b109-466a-9fc1-c86d0b8a5073.jpg)
*JMeter Recording*

Để tạo bản ghi trong JMeter, hãy truy cập *file -> templates -> recording* và nhấp vào *create*. Chỉ định tên máy chủ mà bạn đang ghi. Điều này sẽ tự động tạo ra một số thứ cho bạn, bao gồm cả trình quản lý cookie. Trình quản lý cookie sẽ lưu cookie cần thiết để xác thực.

### Xác minh yêu cầu HTTP bằng chứng chỉ SSL của JMeter
Yêu cầu này mà tôi thực hiện từ trình duyệt sẽ được chuyển tiếp đến JMeter và JMeter sẽ chuyển tiếp nó tới dịch vụ web và ghi lại các yêu cầu để tôi có thể chạy kiểm tra tải từ bản ghi JMeter. Nếu ứng dụng yêu cầu giao thức https cho kết nối SSL, thì chứng chỉ cần được thêm vào trình duyệt. Để thêm chứng chỉ, hãy để chúng tôi mở Firefoxhoặc bất kỳ trình duyệt nào khác. Trong Firefox,Đi tới *settings > Privacy > Manage certificate* và thêm *JMeter certificate* để trình duyệt sẽ nhận ra certificate do *JMeter certificate* tạo ra.

Nhập *cmd + sht + g* và nhập đường dẫn */usr/local/Cellar/jmeter/5.2/libexec/bin/jmeter* để thêm certificate(chứng chỉ)

### Định cấu hình Firefox để sử dụng JMeter làm Aa Proxy
Tiếp theo, tôi cần chuyển tiếp yêu cầu từ Firefox tới tập lệnh ghi JMeter của tôi. Điều này có thể được thực hiện bằng cách định cấu hình proxy trong Firefox. Mở Firefox và truy cập *Preferences -> Advanced -> Connection(settings)*. Tại đây, đặt HTTP Proxy thành "localhost" và cổng thành "8080" và chọn "Sử dụng máy chủ proxy này cho tất cả các giao thức".

Bây giờ, chúng ta có thể đến JMeter và Script recordingphần từ mẫu mà chúng ta đã chọn trước đó. Khi ta nhấn nút bắt đầu, JMeter bắt đầu chấp nhận các yêu cầu đến. Khi ta truy cập Firefox và duyệt ứng dụng mà ta đang thử nghiệm tải, điều này sẽ ghi lại và chuyển đổi nó thành tệp JMX, tệp này tacó thể chạy để kiểm tra tải.

## 2. Kiểm tra tải phân tán với JMeter
Trong khi chạy thử nghiệm, tôi có thể thực hiện kiểm tra từ một trong các máy cục bộ của tôi. Làm điều này là ổn khi chuẩn bị kế hoạch thử nghiệm, nhưng khi chạy thử nghiệm thực tế, chúng ta cần phải thay đổi nó. Thực hiện kiểm tra tải trên một máy sẽ có giới hạn phần cứng (tức là CPU và bộ nhớ) và yêu cầu giới hạn vị trí. Các bài kiểm tra này được chạy để mô phỏng lưu lượng của người dùng thực tế đang sử dụng ứng dụng. Vì mục đích này, tôi cần phân phối các bài kiểm tra đến các máy chủ khác nhau và có một nơi duy nhất để xem tất cả các kết quả.

JMeter cung cấp một nút chính để tổ chức thử nghiệm và nhiều nút phụ để chạy thử nghiệm. Điều này giúp mô phỏng người dùng thực sử dụng ứng dụng. Chúng ta có thể phân phối các máy chủ thử nghiệm đến các khu vực khác nhau gần với người dùng thực tế của chúng ta.

![](https://images.viblo.asia/36987bdc-2011-46ab-9787-305e3617fc6d.jpg)
*JMeter Distributed testing - JMeter Thử nghiệm phân tán*

Để thực hiện kiểm tra phân tán, hãy bắt đầu bằng cách cài đặt JMeter trên cả máy chủ chính và phụ.

Những việc cần làm trên máy chủ phụ:
* Đi tới *jmeter/bin* và thực hiện lệnh * jmeter-server*. Thao tác này sẽ khởi động máy chủ để thực hiện kiểm tra.
* Nếu bất kỳ đầu vào CSV nào là cần thiết cho quá trình kiểm tra, hãy thêm các tệp này vào máy chủ này.

Những việc cần làm trên máy chủ chính:
* Chuyển đến thư mục *jmeter/bin* và mở tệp *jmeter.properties*.
* Chỉnh sửa dòng chứa *remotehosts* và thêm IP của các máy chủ phụ, phân tách bằng dấu phẩy *remotehosts=<s1ip>,<s2ip>*.
* Chạy thử nghiệm JMeter.
    
Máy chủ phụ sẽ chịu trách nhiệm chạy thử nghiệm thực tế và máy chủ chính sẽ tổng hợp các báo cáo.

Để thực hiện kiểm tra tải, chúng ta nên luôn sử dụng lệnh CLI thay vì kích hoạt kiểm tra từ giao diện người dùng, vì điều này có thể gây ra sự cố hiệu suất cho các máy chủ kiểm tra tải. Chúng ta có thể sử dụng lệnh JMeter chỉ định tên tệp JMX:

*> jmeter -n -t path/to/test.jxm -r*

Hoặc là

*> jmeter -n -t path/to/test.jxm -R s1ip,s2ip,…*

-*r* sử dụng máy chủ từ xa được chỉ định trong *jmeter.properties*

-*n* sẽ chạy nó mà không cần mod GUI

-*t* đường dẫn đến tệp jmx

###  Cách chúng tôi quyết định sử dụng Puma so với Unicorn cho máy chủ Rails
Puma và Unicorn là hai máy chủ web khác nhau cho Rails. Cả hai đều có lợi ích, vậy làm thế nào để chúng ta quyết định cái nào là tốt nhất? Nó phụ thuộc vào ứng dụng. Một số ứng dụng hoạt động tốt nhất với Unicorn và một số ứng dụng hoạt động tốt nhất với Puma. Chúng ta phải chọn giữa Unicorn và Puma cho một trong các ứng dụng Rails của mình và tôi đã làm như vậy dựa trên dữ liệu thu được từ thử nghiệm tải. Tôi đã thực hiện kiểm tra tải trên ứng dụng Rails một lần với Unicorn và lần khác bằng Puma. Điều duy nhất chúng tôi thay đổi là máy chủ web trên ứng dụng Rails.

Tôi nhận được kết quả sau từ thử nghiệm này:
![](https://images.viblo.asia/4e7fb3a1-b8a3-4e49-ae40-111fae78358d.png)
Thời gian phản hồi khác nhau giữa Puma và Unicorn

Tôi nhận thấy rằng Puma hoạt động tốt hơn cho ứng dụng Rails của chúng tôi khi có một lượng lớn người dùng trên nền tảng. Điều này có nghĩa là chúng tôi sẽ có thể xử lý nhiều người dùng hơn với số lượng máy chủ ứng dụng ít hơn.

Lưu ý: Điều này phụ thuộc vào loại phiên bản máy chủ bạn đang sử dụng và loại xử lý logic nghiệp vụ mà ứng dụng thực hiện.

### Một số lỗi thường gặp khi deploy ứng dụng Rails và cách khắc phục chúng
* Truy vấn cơ sở dữ liệu chưa được tối ưu hóa
     -  Loại bỏ vấn đề truy vấn n + 1.
     -  Thêm chỉ mục theo mẫu truy cập(Đánh index).
     -  Sử dụng lớp bộ nhớ đệm giống Redis ở phía trước cơ sở dữ liệu.
* Hiệu suất code ruby chậm
     -  Ghi nhớ để tối ưu hóa mã.
     -  Tìm ra độ phức tạp *o (n ^ 2)* và sử dụng các thuật toán tối ưu.
* Trong kiến trúc *micro-service*, có thể có rất nhiều lần call HTTP giữa các service. Các cuộc calls mạng bị chậm.
     -  Giảm số lượng cuộc gọi HTTP bằng cách sử dụng hệ thống nhắn tin cho micro-services.
* Bản ghi giống nhau được tạo hai lần khi được tạo đồng thời.
     -  Thêm một ràng buộc cơ sở dữ liệu duy nhất.
     -  Sử dụng tạo tài nguyên dựa trên sự kiện FIFO (hàng đợi).
* Sử dụng xử lý nền, chẳng hạn như Sidekiq, bất cứ khi nào có thể.
* Xác định SLA cho thời gian phản hồi API và bao gồm kiểm tra hiệu suất như một phần của vòng đời phát triển.
    
### Môi trường nào nên được sử dụng để thực hiện kiểm tra tải?
Thực hiện thử nghiệm tải trong môi trường sản xuất không phải là lựa chọn lý tưởng vì nó có thể gây ra sự cố và thậm chí là thời gian ngừng hoạt động trong quá trình sản xuất. Tôi không muốn tạo ra các vấn đề trong môi trường sản xuất, nhưng tôi vẫn muốn đảm bảo rằng báo cáo thử nghiệm phản ánh dữ liệu trung thực, tương tự như sản xuất. Đối với các thử nghiệm load/stress, nên tạo một môi trường sản xuất sao chép. Điều này bao gồm những thứ như sau:

* Số lượng máy chủ ứng dụng.
* Thông số kỹ thuật phần cứng của máy chủ cơ sở dữ liệu, bao gồm cả bản sao.
* Dữ liệu giống sản xuất trong cơ sở dữ liệu thử nghiệm. Điều này phải bao gồm một khối lượng dữ liệu gần bằng nhau như đã gặp trong quá trình sản xuất.
    
Tạo ra một môi trường giống như sản xuất có thể là một thách thức và tốn kém. Vì vậy, dựa trên những gì chúng tôi đang thử nghiệm tải, cơ sở hạ tầng chỉ chạm vào các thành phần đó mới có thể được nâng cấp lên giống như sản xuất. Nó tiết kiệm chi phí. Tốt hơn nên load/stress trên ứng dụng của bạn ba tháng một lần. Tuy nhiên, kiểm tra hiệu suất với một người dùng duy nhất và xác nhận rằng thời gian phản hồi có theo tiêu chuẩn đã xác định (chẳng hạn như 200m) là thứ mà chúng tôi cần thêm vào chu trình phát triển.

Trong khi kiểm tra tải, chúng tôi cũng cần các điểm dữ liệu, chẳng hạn như mức sử dụng CPU/memory của máy chủ đích. Việc sử dụng memory/CPU tăng đột biến có thể khiến ứng dụng gặp sự cố. Để đo KPI phần cứng, hãy thêm các công cụ giám sát, chẳng hạn như [Prometheus](https://prometheus.io/) , trước khi bắt đầu kiểm tra tải.
    
#    III. Kết Luận

Apache JMeter là một công cụ mạnh mẽ để kiểm tra tải. Tôi đã sử dụng Apache JMeter để kiểm tra tải ứng dụng Rails, nhưng nó có thể được sử dụng để thực hiện kiểm tra load/stress của một bản dựng ứng dụng trên bất kỳ ngăn xếp nào. Kiểm tra tải giúp đưa ra quyết định dựa trên dữ liệu trong ứng dụng. Kiểm thử tải nghe có vẻ đáng sợ, nhưng với một chút đầu tư ban đầu, nó có thể bổ sung rất nhiều tính ổn định và độ tin cậy cho ứng dụng về lâu dài.

*Tài liệu:*
    
    - https://www.tutorialspoint.com/jmeter/index.htm
    
    -  http://jmeter.apache.org/download_jmeter.cgi#binaries