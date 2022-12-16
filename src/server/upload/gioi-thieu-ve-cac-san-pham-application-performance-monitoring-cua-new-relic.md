Nguồn bài viết : [監視製品の紹介 - New Relic を使ったアプリケーションのパフォーマンス監視入門](https://qiita.com/kumatronik/items/621f41eaabf27238dce8#%E7%90%86%E8%AB%96%E7%B7%A8-%E3%81%9D%E3%81%AE3--new-relic-%E8%A3%BD%E5%93%81%E3%81%AE%E7%B4%B9%E4%BB%8B)

Hiện tại các sản phầm mà New Relic cung cấp bao gồm 5 sản phẩm giám sát (monitoring) và 2 sản phẩm phụ trợ.

**Sản phẩm giám sát (monitoring)**

•	New Relic APM: application performance monitoring

•	New Relic Browser: real user monitoring 

•   New Relic Synthetics: Outline monitoring / Vital monitoring

•	New Relic Mobile: native app monitoring

•	New Relic Infrastructure: server monitoring/setting changes monitoring/cloud, middleware monitoring

**Sản phẩm phụ trợ**

•	New Relic Insights: dashboard tool

•	New Relic Alerts: alert

Dưới đây tác giả sẽ giới thiệu khái quát về 5 sản phẩm giám sát (monitoring)

# New Relic APM
Là sản phẩm application performance monitoring, hiện tại có thể dùng sản phẩm này để biết được performance của app ở phía server. (thời gian xử lí, throughput, error rate, độ hài lòng của user…)

Hơn nữa không chỉ kiểm tra được average response time mà còn kiểm tra được cả performance ở Percentiles and histograms, độ hài lòng của user Apdex.

Đặc biệt khi filter từng transaction thì có thể kiểm tra được đến cả SQL.

Chức năng chủ yếu của sản phẩm này bao gồm

•	Transaction performance check list : có thể check được transaction theo chiều order chậm dần của transaction hay chiều order có nhiều throughput. Hơn nữa còn có thể biết được 1 xử lí transaction hết bao nhiêu giây. 

•	DB processing performance check list : lấy DB processing làm trục sẽ có thể check được những xử lí chậm, và được dùng ở transaction nào.

•	External service performance check list : có thể check được performance của những External service được sử dụng

•	Performance of language processing system : có thể check được performance theo xử lí ngôn ngữ ví dụ với Ruby và Java thì là Ruby VM và Java VM ( có thể biết được GC, memory và heap size…)
Error analysis: có thể check và phân tích được những ngoại lệ uncatch. 

•	Key transaction : có thể tạo được page chuyên dùng cho những transaction quan trọng, setting được alert dành riêng cho những transaction đặc biệt.

•	Tracing deploy : có thể quản lí thời điểm deploy production trên New Relic, từ đó biết được performance trước và sau khi deploy.

•	Service map : nếu quản lí nhiều app trên New Relic thì có thể check được liên kết service và performance của chúng

•	Health map : trong trường hợp sử dụng New Relic APM và New Relic Infrastructure thì có thể check được app performance cũng như performance của server đang hoạt động.

•	SLA ( Service Level Agreement  )report : có thể dễ dàng so sánh được performance mỗi ngày, mỗi tuần, mỗi tháng

## Liên kết với Infrastructure 
Trong trường hợp dùng APM và Infrastructure trong cùng 1 account New Relic thì sẽ có rất nhiều chức năng liên kết, có thể dễ dàng check được app performance cũng như performance của server đang hoạt động trong health map, từ đó khi có alert từ app thì sẽ check được cả alert ở server và biết được nguyên nhân là ở phía server hay phía app.

Hơn nữa còn có thể check được tỉ lệ sử dụng CPU, số memory đã dùng của app…từ đó di chuyển trực tiếp đến Infrastructure sẽ check được performance của server.

## Cấu trúc
New Relic APM dùng library gọi là Agent, chuyên dụng cho các ngôn ngữ phát triển app phía server , nó sẽ thu thập thông tin về performance gửi về New Relic server. 

Chỉ cần thêm library và server app, khởi động app server là APM agent sẽ tự động khởi động, lấy dữ liệu, gửi định kì (1 phút 1 lần) về New Relic server. 

Các ngôn ngữ hỗ trợ dùng New Relic bao gồm : 
•	.NET

•	Java

•	Ruby

•	Python

•	PHP

•	Node.js

•	Go

Agent sẽ được upgrade định kì, có những chức năng nếu không upgrade agent sẽ không dùng được nên hãy chú ý luôn update bản mới nhất.

Hơn nữa tuy không có yêu cầu về OS nhưng hiện tại cũng không hỗ trợ kết hợp giữa Windows Server và PHP.

# New Relic Browser
Là sản phẩm real user monitoring, 1 dịch vụ đo lường performance trên browser của user, có thể check được DOM processing, rendering, network, server side processing time cũng như dễ dàng check được xử lí ở layer nào đang tốn nhiều thời gian.

## Các chức năng chủ yếu
•	Performance list theo từng page view : check được performance của những page view bị chậm

•	Performance list theo đơn vị session : check được performance theo đợn vị session, hình ảnh tương tự nhủ Network tab của DevTools ở Google Chrome, sẽ check được thời gian xử lí cũng như đọc từng asset (image, CSS, JS) của session, thời gian xử lí cũng như thời điểm gộ xử lí Ajax.

•	Performance list theo đơn vị Ajax request : check performance của Ajax được gọi

•	JavaScript error list : check những error JavaScript phát sinh 

•	Performance list theo từng browser : check được browser nào gọi nhiều request, bị chậm ở đâu, hơn nữa nếu chọn browser cụ thể sẽ check được xem bị chậm ở version nào

•	Perfomance list theo địa lí : check được xem khu vực nào access nhiều, bị chậm ở đâu, còn có thể filter theo từng URL và device.

•	SPA : check được performance của  Initial load và route thay đổi

## Cấu trúc
Chỉ cần thêm JS chuyên dụng vào HTML thì data sẽ được tự động thống kê và gửi về New Relic server. 
Có thể thêm vào bằng cách thủ công hoặc trường hợp sử dụng APM thì sẽ được tự động thêm.

Agent sẽ được upgrade định kì, có những chức năng nếu không upgrade agent sẽ không dùng được nên hãy chú ý luôn update bản mới nhất.

# New Relic Synthetics
Là sản phầm Outline monitoring / Vital monitoring. Nó sẽ gửi request đến 1 page(URL) hoặc 1 service được chỉ định, từ 20 địa điểm trên toàn thế giới của New Relic, và check performance cũng như alive monitoring của page hay service đó. 

Khác với New Relic Browser monitoring performance thực tế của user, nhưng không so sánh được performance của app trong 1 khoảng thời gian nhất định môi trường của user thường thiếu ổn định,
thì New Relic Synthetics do thường xuyên gửi request từ cùng 1 môi trường nên sẽ dễ dàng so sánh được performance.

## Monitoring method : Gồm 4 loại 
•	Ping : gửi request HTTP Head, xem kết quả

•	Simple Browser: Gửi request HTTP Get, xem kết quả. Giống như New Relic Browser có thể check được thời gian đọc và thời gian xử lí của HTML、CSS、JS

•   Scripted Browser: Là bản nhiêù page của Simple Browser. Không phải chỉ định URL cụ thể mà bằng cách viết JS Selenium chuyên dụng có thể check được performance và hoạt động giữa các page với nhau.

•	API Test: Bản API của Scripted Browser, lấy đối tượng không phải là page mà là API để viết JS

Đây là 1 service rất tiện lợi khi muốn so sánh, đo lường performance trên mức browser hay monitoring tính khả dụng của app. 

Ví dụ trong trường hợp muốn cải thiện performance thì có thể check được xem từ góc nhìn của user performance đã được cải thiện hay chưa. 

Ngoài ra đây còn là 1 service rất dễ sử dụng do UI của việc setting monitoring đã được hoàn thiện.

## Cấu trúc
Như đã nói ở trên, New Relic sẽ định kì thường xuyên gửi request từ các server đặt trên toàn thế giới, do đó người dùng không cần thiết phải cài đặt gì cả. 

Tuy nhiên trường hợp muốn gửi request từ server không phải của New Relic thì sẽ cần tạo cấu trúc khác và sẽ mất thêm phí để sử dụng.

## Cách sử dụng
Access vào page New Relic Synthetics  và setting monitoring, thông thường có những setting như dưới đây
•	Địa điểm (20)

•	Tần suất (１giờ,１ngày)

•	Mail address để gửi thông báo khi monitoring failed 

Trường hợp dùng Ping, Simple Browser thì sẽ là đối tượng URL. Trường hợp dùng Scripted Browser、API Test thì sẽ viết JS code trên JS editor chuyên dụng.

# New Relic Mobile

Là service phân tích performance, cũng như lỗi của mobile deveice app.

Có thể check được list số lượt install, update hay tỉ lệ phát sinh lỗi...theo từng version của app.

Do đó khi thực hiện version up sẽ biết đươc performance tăng lên hay giảm đi.

Ngoài ra trong trường hợp app crash có thể biết được hoạt động của user gây ra crash từ đó biết được flow xử lí dẫn đến crash. 

Do đó ta có thể biết được hoạt động của nhiều user trong trường hợp app crash với nguyên nhân tương tự nhau, tìm được các trường hợp chung gây crash từ đó điều tra được nguyên nhân sâu xa gây ra tình trạng này.

## Cấu trúc

Vì đã có sẵn SDK chuyên dụng cho iOS, Android, tvOS nên chỉ cần cài đặt vào từng môi trường tương ứng (ví dụ Xcode...) rồi public trên store là được. Khi user khởi động app thì dữ liệu về performance và lỗi sẽ được thu thập và gửi về server của New Relic.

Đối với iOS thì không cần chỉ định measurement point vẫn có thể lấy được data, còn Android thì phải chỉ định cụ thể. Hiện tại Unity cũng được hỗ trợ.

Agent sẽ được upgrade định kì, có những chức năng nếu không upgrade agent sẽ không dùng được nên hãy chú ý luôn update bản mới nhất.

# New Relic Infrastructure

Là sản phẩm thực hiện server monitoring, configuration change monitoring, IT property management, middleware monitoring.

Đặc biệt nó có UI được thiết kế để monitoring, phân tích được 1 cách hiệu quả hàng chục, hàng trăm server trên các môi trường infra hiện nay.

## •	Server monitoring:
o	Performance theo đơn vị host (CPU, memory, load average)

o	Performance storage của từng device (used disk capacity, usage rate, read / write amount)

o	Network transmission volume, reception volume and reception error trên từng instance

o	Performance của từng proccess (CPU, memory, I/0)

## •	Event history (Lịch sử thay đổi của server setting) 
có thể check được xem ai đã thay đổi gì vào lúc nào, ví dụ như login bằng SSH khi cài đặt package hay tắt, bật app, service. 

Hơn nữa vì nó được liên kết với server monitoring nên khi có bất thường xảy ra có thể biết được nguyên nhân có phải do thay đổi setting server hay không.

## •	IT property management
dưới sự giám sát của New Relic Infrastructure ta có thể dễ dàng tìm kiếm, xem được list toàn bộ package được install vào host, khi phát hiện package nào có lỗi sẽ biết ngay được cần phải upgrade hay tìm hiểu thêm, từ đó không bị nhầm lẫn hay thiếu sót khi upgrade package...

## •	Cloud, middleware monitoring 
có thể check được performance của từng service của cloud (AWS, Azure) như EC2, S3, Lambda... hơn nữa còn có thể check được performance của Apache、MySQL、Nginx、Redis、Cassanadra 

## Extensive filtering

Chức năng filter của New Relic Infrastructure rất đầy đủ, như trong trường hợp cloud thì sẽ có rất nhiều filter như region, instance type, role...

Do có thể grouping hàng trăm host 1 cách đơn giản nên ta có thể focus vào những host đặc biệt muốn check. 

Hơn nữa trường hợp sử dụng EC2 thì tag sẽ được tự động đọc và thu thập dữ liệu nên ta có thể dễ dàng check được performance của cluster giống với EC2. 

Ngoài ra vì container như DOcker cũng được hỗ trợ nên ta cũng check được performance của từng container.

## Alert
Có rất nhiều loại alert có thể setting cho server monitoring như CPU usage, memory usage, disk usage. Hơn nữa còn có thể setting alert cho AWS, middleware hay alert trong trường hợp host không response.

## Liên kết với APM 
Giống như đã viết ở phần APM, liên kết giữa Infrastructure và APM mang lại nhiều tiện lợi khi điều tra nguyên nhân gây lỗi, xác định được nguyên nhân nằm ở phía server hay phía app.

## Cấu trúc
Infrastructure agent(Linux,Windows) sau khi được cài đặt vào server, thực hiện setting sẽ định kì gửi thông tin lên server của New Relic.
Agent sẽ được upgrade định kì, có những chức năng nếu không upgrade agent sẽ không dùng được nên hãy chú ý luôn update bản mới nhất.