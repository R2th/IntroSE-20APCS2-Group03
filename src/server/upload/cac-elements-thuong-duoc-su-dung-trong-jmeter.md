Bài viết trước có liên quan đến Jmeter các bạn có thể xem tại [đây](https://viblo.asia/p/undefined-GrLZDweeKk0) rảnh rỗi vote up cho mình nhé :v: 

Trong  bài này mình sẽ giới thiệu định nghĩa và demo các Elements thường được sử dụng nhất để các bạn có thể làm việc với Jmeter.

Một kịch bản test đơn giản nhất trong JMeter bao gồm: 1 Test Plan, 1 Thread Group, 1 hoặc vài Samplers

### Các thành phần cơ bản trong Test Plan:
+ Test Plan
+ Thread Group
+ Samplers
+ Logic Controllers
+ Pre-Processor Elements
+ Post-Processor Elements
+ Assertions
+ Timers
+ Test Fragment
+ Configuration Element
+ Listeners

### 1. Test Plan

+ Một Test Plan mô tả một chuỗi các steps sẽ được JMeter thực thi khi chạy

Hình bên dưới là một ví dụ về 1 Test Plan hoàn chỉnh

![](https://images.viblo.asia/ea8c85ac-7493-4e1a-a9bc-e21b89663e7b.jpg)

### 2. Thread Group

+ Thread group elements là điểm bắt đầu của một test plan bất kỳ
+ Tất cả các Controllers và Samplers phải được đặt dưới một thread group
+ Những elements còn lại ( ví dụ Listeners ) có thể đặt trực tiếp dưới test plan. Trong trường hợp đó chúng sẽ áp dụng đến tất cả thread group.
+ Thread group element điều khiển số lượng threads mà JMeter sẽ sử dụng để thực thi kịch bản test
+ Một số thiết lập với thread group:
+ Thiết lập số lượng threads ( hay còn gọi là các User giả lập )
+ Thiết lập thời gian ramp-up để tạo các thread
+ Thiết lập số lần thực thi kịch bản test

![](https://images.viblo.asia/3261b4fb-a456-4f3d-a064-b78c016ac21b.jpg)

Như hình demo ở trên thì test plan này sẽ có:
+ 100 Threads (Users) được tạo ra
+ Thời gian ramp-up để tạo 100 threads sẽ là 10s
+ Số lần thực thi test sẽ là 1 lần

### 3. Samplers

+ Samplers sẽ chỉ thị JMeter gởi request đến server và chờ đợi phản hồi. Chúng được thực thi theo thứ tự xuất hiện trong test plan.

![](https://images.viblo.asia/d8ee02f2-55e6-47b4-8a6c-b819469e1208.jpg)

Như hình demo ở  trên thì test plan này có 2 Samplers gởi 2 requests là Login và GetDocumentList , khi một thread được tạo thì Login sẽ được gởi trước sau đó đến GetDocumentList .


### 4. Listeners

+ Cung cấp thông tin mà JMeter thu thập được về các test case trong lúc JMeter chạy
+ Ví dụ: "View results tree" Listener đưa ra chi tiết thông tin của các sampler requests và responses. Các Listeners khác cung cấp các thông tin tóm lược hoặc tổng quát . 
+ Listeners có thể trích xuất data thu thập ra file cho người dùng . Mỗi listeners cung cấp một field để chỉ định file sẽ chưa data. Có thể tùy chọn định dạng file là CSV hoặc XML
+ Lưu ý rằng tất cả Listeners đều lưu trữ cùng một dữ liệu/kết quả test , chỉ khác nhau ở cách mà data hiển thị trên màn hình
+ Listeners có thể đặt bất cứ đâu trong test plan. Chúng sẽ chỉ thu thập data từ các elements cùng cấp hoặc dưới cấp.

![](https://images.viblo.asia/486013a3-fa7c-439e-8f62-a33247dc041f.jpg)

Demo ở trên có 2 Listeners là Summary Report và View Results Tree. Ta có thể thấy Summary Report được đặt ngay dưới Thread Group, listener này sẽ thu thập report cho các element cùng level và level dưới nó. View Results Tree listener thì đặt dưới Sampler Login, sẽ chỉ thu thập data của request Login.

### 5. Configuration Elements

+ Làm việc bám sát với Sampler
+ Nó không gởi request, có thể dùng để thêm vào hay chỉnh sửa request
+ Một Configuration Elements chỉ có thể truy cập từ bên trong nhánh, nơi bạn đặt nó
+ Một Configuration Elements thì được ưu tiên cao hơn các elements khác cùng level
+ User Defined Variables Configuration element là một thuộc tính để config nhưng có chút khác biệt. Nó được xử lý tại thời điểu bắt đầu của test, không quan tâm đến vị trí nó được đặt. Để đơn giản hóa thì ta nên đặt thuộc tính này ở tại nơi bắt đầu của Thread Group. 

![](https://images.viblo.asia/72ba3725-5cf8-4bd3-b149-54baec3e602b.jpg)

Demo ở trên là mình sử dụng đối tượng CSV Data Set Config trong Configuration Elements để thiết lập sẵn data cần thiết để chạy request. Data có chứa trong file csv bao gồm 2 cột email và password, đặt ở cùng thư mục bin với JMeter.
Chú ý phần Variable Name, mình đặt tên biến cho các cột data, các biến cách nhau bằng dấu phẩy.

### 6. Logic Controllers 

+ Để bạn tùy chỉnh logic mà JMeter sẽ dùng để quyết định khi nào hoặc làm thế nào để gởi request
+ Có thể thay đổi thứ tự của các request đến từ các elements con của nó 
+ Có thể chỉnh sửa bản thân request hoặc làm cho JMeter lặp lại request... vv
+ Có thể dùng để điều chỉnh số lần lặp lại của một sampler
+ ETC

### 7. Timers 

+Bởi mặc định, JMeter thực thi samplers theo tuần tự mà không dừng.

+Một timer element sẽ làm cho JMeter tạo ra một thời gian chờ nhất định trước mỗi samplers thuộc phạm vi của timer

+Nếu bạn chọn thêm nhiều hơn 1 Timer vào một Thread Group, JMeter sẽ cộng dồn tất cả timers và dừng đúng bằng khoảng thời gian đó trước khi thực thi samplers có áp dụng timers.

+Timers có thể thêm vào như một lớp con của samplers hay controllers để áp dụng riêng cho lớp cha chứa nó 


![](https://images.viblo.asia/6cdb36cb-94b3-4f0b-ac57-8826ebe126e2.jpg)

Ở demo trên là một Timer tạo delay 3s giữa các request. Áp dụng cho các request ngang level và có level thấp hơn nó là Login và Send message.

### 8. Assertions

+ Assertions sẽ giúp bạn xác nhận kết quả thực tế trả về của response nhận được từ server đang được test
+ Sử dụng một Assertions, bạn có thể kiểm tra kết quả cần thiết mà ứng dụng của bạn trả về có đúng với như mong đợi hay không
+ Lưu ý rằng Assertions tác động đến tất cả sampler trong phạm vi của nó. Để kiểm soát một Assertion tác động đến chỉ một sampler đơn lẻ, hãy thêm Assertion như một note con của sampler đó

![](https://images.viblo.asia/8ad56ad9-6cba-466e-8c84-34a6da31efef.jpg)

Demo ở trên là một Assertions được tạo ra để kiểm tra response trả về của Login request có chứa chuỗi var ACCESS_TOKEN hay không. Nếu login thành công thì sẽ có chuỗi var ACCESS_TOKEN trong response.

### 9. Pre-Processor Elements

+ Thực thi một số hành động tại thời điểm một Sampler Request được khởi tạo
+ Nếu một Pre-Processor được đính kém tới một Sampler, nó sẽ chỉ thực thi tại thời điểm trước khi Sampler đó chạy
+ Pre-Processor thường được dùng để điều chỉnh thiết lập của Sampler Request chỉ trước khi nó chạy hay để cập nhật biến mà đã trích xuất từ văn bản trong response của server

### 10. Post-Processor Elements

+ Ngược lại với Pre-Processor Elements, Post-Processor Elements sẽ thực thi một số hành động tại thời điểm sau khi một Sampler Request đã chạy xong
+ Nếu một Post-Processor được đính kém tới một Sampler, nó sẽ chỉ thực thi tại thời điểm sau khi Sampler đó chạy xong
+ Một Post-Processor được dùng để xử lý dữ liệu của response, thường dùng để trích xuất giá trị từ response của server

![](https://images.viblo.asia/1efed186-77d0-4c99-aa61-156635fa5557.jpg)

Demo ở trên là một Post-Processor Elements để lấy giá trị token trong response trả về.

### 11. Test Fragment

+ Test Fragment element là loại đặc biệt của controller mà tồn tại trên Test Plan tại cunngf một level với Thread Group element.
+ Nó được tách biệt với một Thread Group, không thực thi cùng với Thread Group trừ khi được gọi hay tham chiếu bằng một Module Controler hay một Include Controller
+ Thuộc tính này hoàn toàn dành cho code để tái sử dụng bên trong Test Plan


### Thứ tự ưu tiên thực thi trong một test plan

1. Configuration Element
2. Pre-Processor Elements
3. Timers
4. Samplers
5. Post-Processor Elements
6. Assertions
7. Listeners



### Demo
Bây giờ mình sẽ demo một kịch bản sử dụng các elements mà mình giới thiệu ở trên.
Kịch bản như sau:
Tạo một test plan để thực hiện các hành động sau:
+ Login account Chatword
+ Gởi message đến một User bất kỳ
 
[Source demo](https://www.dropbox.com/s/ctw734scphlbvpb/source%20demo.rar?dl=0)

Chú thích demo

1. Sử dụng một đối tượng của **Configuration Element** để quản lý Cookie tạo ra bởi requests : HTTP Cookie Manager . Đặt ngay bên dưới Test Plan để apply cho toàn bộ Thread Group bên dưới nó . Vì các requests trong kịch bản của mình có yêu cầu sử dụng đến cookie nên mới cần add cái này. Còn lại bình thường thì không cần. Hoặc đa số chỉ sử dụng đến HTTP Header Manager để add các param của requests header.
2. Cũng trong **Configuration Element** , mình add một đối tượng CSV Data Set Config để quản lý data account login. Data được đặt trong file CSV để cùng thư mục bin của JMeter
3. Add một **Thread Group** để điền khiển số lượng thread(Users) được tạo
4. Add một **Timer** để tạo delay 3s giữa 2 request Login và Send message
5. Add 1 **Sampler** là Login . Chú ý ở request Login, mình có tham chiếu đến 2 biến đã khai báo ở CSV Data Set Config. Cú pháp gọi biến: ${Variable Name}
6. Add một **Assertions** vào request Login để kiểm tra login thành công hay không. Khi login thành công thì sẽ có chuỗi ACCESS_TOKEN trong response và Assertions sẽ pass.
7. Sử dụng một đối tượng của **Post-Processor Elements** là Regular Expression Extractor để lấy token cần thiết thực thi request Send message tiếp theo
8. Add 1 **Sampler** là Send message , sử dụng một biến token trích xuất được từ request Login ở trên
9. Add các **Listeners** để xem kết quả của các request

Nếu bạn chạy thành công thì tài khoản chỉ định sẽ nhận được số lượng message bằng với số thread tạo ra như bên dưới, đừng lạm dụng để bỏ bom người khác nha các bạn :P

![](https://images.viblo.asia/e0e06bbf-3435-49b1-8be3-a9121cd2b321.jpg)

Trong phạm vi bài viết thì mình khó mà giải thích được đầy đủ, chỉ đề cập đến nhưng cái cơ bản nhất và demo vài ví dụ cho dễ hiểu. Nếu có gì thắc mắc  các bạn có thể comment hỏi, mình sẽ trả lời .