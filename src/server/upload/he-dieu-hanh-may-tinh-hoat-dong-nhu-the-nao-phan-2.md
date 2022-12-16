![](https://images.viblo.asia/89f87195-0940-4a0f-953a-f81bf1b4c77e.png)

# Lời mở đầu
Ở [Phần 1](https://viblo.asia/p/he-dieu-hanh-may-tinh-hoat-dong-nhu-the-nao-phan-1-aWj534BbK6m) của loạt bài viết tìm hiểu về hoạt động của hệ điều hành, mình đã tóm lược về các phần bao gồm **Quản lý tiến trình**, **Cơ chế lập lịch** và **Luồng và xử lý đồng bộ**. Tuy nhiên, ngoài 3 phần này thì hệ điều hành vẫn còn rất nhiều việc khác phải xử lý. Vì vậy, ở phần 2 của bài viết, mình sẽ tiếp tục giới thiệu về 3 công việc khác của hệ điều hành, bao gồm: **Memory Management** (Quản lý bộ nhớ), **Input/Output Management** (Quản lý vào/ra) và **Virtualization** (Công nghệ ảo hóa phần cứng). Ngay sau đây mình sẽ trình bày về các vấn đề này. 

# 1. Quản lý bộ nhớ
Quản lý bộ nhớ (hay **Memory Management**) là một chức năng của hệ điều hành, đối tượng được nhắm đến chủ yếu là **RAM** (Random Access Memory). Các công việc của quản lý bộ nhớ sẽ bao gồm:
* Trao đổi dữ liệu qua lại giữa bộ nhớ **RAM** và ổ đĩa cứng trong khi một tiến trình được thực hiện.
* Theo dõi từng vị trí cụ thể của bộ nhớ, bất kể nó được cấp cho một tiến trình nào đó đang hoạt động hoặc vùng nhớ đang không được sử dụng.
* Kiểm tra dung lượng bộ nhớ được phân bố cho các tiến trình.
* Quyết định thời gian được cấp phát bộ nhớ với mỗi tiến trình.
* Theo dõi bất cứ khi nào bộ nhớ được giải phóng hoặc không được phân bố, và ngay lập tức cập nhật trạng thái tương ứng.

![](https://images.viblo.asia/4abab445-f7d0-4833-b657-f23146f5d4b2.png)

* Hình ảnh thể hiện 1 phần cấp phát bộ nhớ của hệ điều hành.  
* Ban đầu vùng nhớ được cấp phát (allocate) cho Class A, sau đó Class B cũng sử dụng vùng nhớ này. Nếu quá trình diễn ra bình thường, vùng nhớ sẽ bị tiêu hủy (destroy) nếu cả A và B đều giải phóng. Nhưng trước đó, Class C đã xin tạo ra một bản sao (copy) để sử dụng và sẽ giải phóng nó sau.  
* Tất cả các công đoạn cấp phát, sử dụng, giải phóng hay tiêu hủy đều do bộ phận **Memory management** của hệ điều hành xử lý.


Địa chỉ vùng bộ nhớ được cấp cho các tiến trình được lưu trữ tập trung trong một không gian đặc biệt (gọi là **process addresses space**), đó cũng chính là tập hợp các địa chỉ logic mà tiến trình tham chiếu đến các mã xử lý của nó. Lấy ví dụ: khi sử dụng địa chỉ loại 32 bit, địa chỉ được phép cấp phát có thể nằm trong khoảng từ `0` đến `0x7FFFFFFF`, tương đương với ($2^{31} - 1$ số có thể sử dụng, với tổng kích thước lý thuyết là khoảng 2GB. Còn với địa chỉ 64 bit, số cấp phát sẽ nằm trong khoảng từ `0` đến `$0x7FFFFFFFFFFFFFFF$` ($2^{63} - 1$ giá trị, tối đa khoảng 8 Exabytes ô nhớ có thể sử dụng theo lý thuyết).

Hệ điều hành phải đảm nhiệm công việc ánh xạ (**mapping**) các địa chỉ logic (địa chỉ trong **process addresses space**) thành các địa chỉ vật lý (địa chỉ thực tế của **RAM**) tại thời điểm cấp phát bộ nhớ cho các chương trình hoặc tiến trình sử dụng. Có ba loại địa chỉ được sử dụng trong một chương trình hoặc tiến trình trước và sau khi bộ nhớ được cấp phát, đó là: 
* `Symbolic Addresses` (địa chỉ tượng trưng): Được sử dụng trong mã nguồn của chương trình, thường lưu trữ tên biến, hằng số và các nhãn chỉ dẫn.
* `Relative Addresses` (địa chỉ tương đối): Được chuyển đổi từ `Symbolic Addesses` tại thời điểm biên dịch.
* `Physical Addresses` (địa chỉ vật lý): Chỉ được tạo ra khi các mã xử lý của tiến trình được nạp vào bộ nhớ **RAM**.
Địa chỉ ảo và vật lý là như nhau trong các lược đồ liên kết địa chỉ thời gian biên dịch và thời gian tải. Địa chỉ ảo và vật lý khác nhau trong các lược đồ ràng buộc địa chỉ thời gian thực hiện.
Tập hợp tất cả các địa chỉ logic được tạo bởi một chương trình được gọi là không gian địa chỉ logic. Tập hợp tất cả các địa chỉ vật lý tương ứng với các địa chỉ logic này được gọi là không gian địa chỉ vật lý.

Cả `Physical Addresses` và `Logical Addresses` (gồm 2 loại Symbolic và Relative) đều có không gian lưu trữ và quản lý riêng, tương ứng gọi là **physical addresses spacec** và **logical addresses space**. Hai loại địa chỉ này tương đương nhau tại thời điểm biên dịch và cho đến khi nạp vào bộ nhớ **RAM**, còn khi thực hiện các mã xử lý bên trong **RAM** thì sẽ khác nhau, tất cả có thể được quản lý bởi bộ phận **Memory management** của hệ điều hành.

# 2. Quản lý vào / ra
Ở phần 1 của loạt bài viết, mình đã đưa ra một luận điểm 1 chiều, đó là:
> Không có hệ điều hành, các thiết bị máy tính là vô dụng

Nhưng khi tìm hiểu đến phần này, mình nhận ra rằng luận điểm trên chưa hoàn toàn chính xác. Đúng là một cỗ máy nếu không có hệ điều hành quản lý (hoặc không có con người thao tác) thì đều không làm nên việc gì cả. Nhưng ngược lại, nếu chỉ có hệ điều hành mà không có các thiết bị phần cứng đi kèm tương ứng thì cũng không làm nên được công việc gì cả. Thật ra, phần cứng máy tính và hệ điều hành đi kèm cùng nhau, hỗ trợ nhau, bổ sung cho nhau để cùng đạt được mục tiêu chung, không cái nào có thể bỏ đi được.
Cũng giống như phân cấp trong xã hội loài người, người thường và các nhà quản lý cũng không thể tách rời nhau. Nếu thiếu các nhà quản lý, xã hội sẽ loạn và không thể kiểm soát. Và ngược lại, nếu như tất cả đều là quản lý, không có những người bình thường nữa, thì cũng không ai là quản lý cả. Tóm lại:
> Phần cứng máy tính và hệ điều hành đi kèm là không thể tách rời, cả hai phối hợp với nhau tạo ra một chỉnh thể hoàn thiện.

Chính vì vậy, một trong những công việc quan trọng của `Hệ điều hành` là quản lý các thiết bị đầu vào / đầu ra (**Input / Output**) khác nhau, bao gồm chuột, bàn phím, touchpad, ổ đĩa cứng, màn hình, các thiết bị USB, thiết bị kết nối mạng, thiết bị âm thanh, máy in, v.v.
Cần thiết phải có hệ thống **I / O** để nhận các yêu cầu vào / ra dữ liệu của ứng dụng và gửi nó đến thiết bị vật lý, sau đó nhận lại các phản hồi từ thiết bị và gửi đến ứng dụng xử lý tiếp. Thiết bị **I / O** có thể được chia thành hai loại:
* `Block devices` (thiết bị khối):  loại thiết bị mà trình điều khiển giao tiếp bằng cách gửi toàn bộ khối dữ liệu. Ví dụ: Ổ đĩa cứng, thiết bị USB Flash, máy ảnh USB ...
* `Character devices` (thiết bị ký tự): Loại thiết bị mà trình điều khiển giao tiếp bằng cách gửi và nhận các ký tự đơn (byte hoặc mã 8 - octa). Ví dụ: các loại card màn hình, card âm thanh hoặc các cổng serial port, parallel ...
Trừ **CPU** thì các thiết bị ngoại vi khác thường sẽ có một trình điều khiển đi kèm (**CPU** có kiểu xử lý riêng và thường đi cùng với phần cứng, có bộ nhớ độc lập)

![](https://images.viblo.asia/72644cd9-8c83-45a6-9e6e-8cac6c7f82fd.jpeg)

Chính vì sự đặc biệt của **CPU**, nên hệ điều hành cũng tạo ra một số cách giao tiếp đặc biệt để **CPU** và các thiết bị **I/O** có thể làm việc cùng nhau, có tất cả 3 cách như sau:

### 2.1) Special instruction I/O
Cách này sử dụng các chỉ dẫn **CPU** được tạo riêng để điều khiển các thiết bị **I/O**. Các chỉ dẫn này thường cho phép dữ liệu được đọc ghi trực tiếp với các thiết bị (dữ liệu là mã nhị phân).

### 2.2) Memory mapped I/O
Kỹ thuật này dùng để chia sẻ không gian địa chỉ giữa các thiết bị I/O và bộ nhớ. Thiết bị được kết nối trực tiếp với một số vị trí bộ nhớ chính nhất định để nó có thể truyền khối dữ liệu đến / từ bộ nhớ mà không cần thông qua CPU.

![](https://images.viblo.asia/3a0a5db4-0272-4131-828a-3bee2aa3b7c4.jpeg)

Ưu điểm của kỹ thuật này là mọi chỉ dẫn có thể truy cập bộ nhớ đều có thể được sử dụng để thao tác với thiết bị ngoại vi. **I/O** được ánh xạ vào bộ nhớ cũng được sử dụng cho hầu hết các thiết bị **I/O** tốc độ cao.

### 2.3) Direct memory Access (DMA)
Các thiết bị xử lý chậm như bàn phím, chuột sẽ tạo ra sự gián đoạn (`interrupt`) đến **CPU** sau khi mỗi byte dữ liệu được truyền đi (có thể là nhấn một phím, thả một phím ...). Điều này có thể không gây nhiều ảnh hưởng. Nhưng nếu như là một thiết bị xử lý nhanh, chẳng hạn như đĩa cứng, tạo ra sự gián đoạn cho mỗi byte sẽ khiến cho hệ điều hành phải dành phần lớn thời gian để xử lý vấn đề này, có thể gây lãng phí rất nhiều tài nguyên **CPU**. Vì vậy để giảm chi phí phát sinh, kỹ thuật truy cập bộ nhớ trực tiếp (**DMA**) được áp dụng.

**DMA** có nghĩa là **CPU** sẽ cấp quyền cho các mô-đun **I/O** để đọc hoặc ghi vào bộ nhớ mà không cần bản thân CPU phải thao tác. Mô-đun **DMA** tự điều khiển việc trao đổi dữ liệu giữa bộ nhớ **RAM** và thiết bị **I/O**. **CPU** chỉ tham gia vào lúc bắt đầu và kết thúc quá trình chuyển và chỉ bị gián đoạn sau khi toàn bộ khối được chuyển đi.
**DMA** cần một phần cứng đặc biệt gọi là `DMA Controller` (DMAC) để quản lý việc truyền dữ liệu và xử lý truy cập vào bus của hệ thống. Các bộ điều khiển được lập trình với các con trỏ nguồn và đích (nơi đọc / ghi dữ liệu), `counter` để theo dõi số lượng byte được truyền và các cài đặt khác nhau. Chúng bao gồm các loại I/O và bộ nhớ, các ngắt và trạng thái cho các chu kỳ **CPU**.

# 3. Công nghệ ảo hóa phần cứng
Ảo hóa (`Virtualization`) là công nghệ đặc biệt cho phép chúng ta tạo ra nhiều môi trường mô phỏng hoặc tài nguyên chuyên dụng từ một hệ thống phần cứng vật lý duy nhất (Tức là có thể coi như dùng được nhiều máy tính trên một phần cứng duy nhất).

Một loại phần mềm đặc biệt tên là **hypervisor** có thể kết nối trực tiếp với phần cứng và cho phép ta chia một hệ thống thành nhiều môi trường riêng biệt, độc lập và an toàn được gọi là máy ảo (VM - `Virtual Machine`). Các máy ảo này dựa vào khả năng của **hypervisor** để chia tách tài nguyên của máy ra khỏi phần cứng và phân phối chúng một cách thích hợp.
Máy vật lý ban đầu được trang bị bộ ảo hóa được gọi là máy chủ lưu trữ, trong khi nhiều máy ảo sử dụng tài nguyên của nó được gọi là máy khách. Những máy khách này coi các tài nguyên điện toán - như CPU, bộ nhớ và lưu trữ - như một kho tài nguyên có thể dễ dàng di dời. Phần mềm vận hành có thể kiểm soát các phiên bản ảo hóa của CPU, bộ nhớ, lưu trữ và các tài nguyên khác để máy khách nhận được tài nguyên khi chúng cần.
Tóm lại, công nghệ ảo hóa sẽ tạo ra các môi trường và tài nguyên bạn cần để làm việc độc lập từ phần cứng chưa được sử dụng.

![](https://images.viblo.asia/e6bd1a02-bd33-4d70-8307-a30d5ea20030.png)

Kỹ thuật ảo hóa khá đa dạng, tuy nhiên có thể tóm lại bằng các loại chính sau:

### 3.1) Ảo hóa dữ liệu - Data Virtualization
Trước khi dữ liệu được ảo hóa thì chúng được tập hợp lại thành một nguồn duy nhất theo các phân loại nhằm tránh xự lan tràn. Ảo hóa dữ liệu cho phép các công ty coi dữ liệu là nguồn cung cấp động - cung cấp khả năng xử lý có thể kết hợp dữ liệu từ nhiều nguồn, dễ dàng cung cấp nguồn dữ liệu mới và chuyển đổi dữ liệu theo nhu cầu của người dùng. Các công cụ ảo hóa dữ liệu nằm trước nhiều nguồn dữ liệu và cho phép chúng được coi là một nguồn duy nhất. Chúng cung cấp các dữ liệu cần thiết theo yêu cầu vào đúng thời điểm cho bất kỳ ứng dụng hoặc người dùng nào.

### 3.2) Ảo hóa máy tính để bàn - Desktop Virtualization
Thường hay bị nhầm lẫn với ảo hóa hệ điều hành. Loại này cho phép chúng ta triển khai nhiều hệ điều hành trên một máy duy nhất. Ảo hóa máy tính để bàn cho phép quản trị viên trung tâm (hoặc công cụ quản trị tự động) triển khai môi trường máy tính để bàn mô phỏng lên hàng trăm máy vật lý cùng một lúc. Không giống như các môi trường máy tính để bàn truyền thống được cài đặt, cấu hình và cập nhật vật lý trên mỗi máy, ảo hóa máy tính để bàn cho phép quản trị viên thực hiện cấu hình hàng loạt, cập nhật và kiểm tra bảo mật trên tất cả các máy tính để bàn ảo (Còn có thể gọi là One-for-All)

### 3.3) Ảo hóa máy chủ - Server Virtualization
Máy chủ là máy tính được thiết kế để xử lý khối lượng lớn các tác vụ cụ thể, thường là giao tiếp logic hoặc ở các tầng thấp của mô hình mạng. Máy chủ sẽ cho phép các máy tính khác (như máy tính xách tay và máy tính để bàn) có thể thực hiện nhiều tác vụ khác nhau thông qua một giao diện cụ thể. Ảo hóa một máy chủ cho phép nó thực hiện nhiều chức năng cụ thể hơn và liên quan đến việc phân vùng nó để các thành phần có thể được sử dụng để phục vụ nhiều chức năng.

### 3.4) Ảo hóa hệ điều hành - Operating System Virtualization
Loại ảo hóa này sẽ xảy ra tại nhân (`kernel`), cũng là trình quản lý tác vụ trung tâm của các hệ điều hành. Nó là một cách hữu ích để chạy song song các môi trường hệ điều hành khác nhau như **Linux** và **Windows**. Các doanh nghiệp cũng có thể đưa các hệ điều hành ảo vào máy tính. Điều này sẽ đem lại một số tác dụng:
* Giảm chi phí phần cứng, vì các máy tính sẽ không yêu cầu khả năng vượt trội.
* Tăng tính bảo mật, vì tất cả các trường hợp ảo đều có thể được theo dõi và độc lập với máy tính chủ ban đầu (`host`).
* Giới hạn thời gian dành cho các dịch vụ CNTT như cập nhật phần mềm, bảo trì máy chủ.

### 3.5) Ảo hóa các chức năng mạng - Network Function Virtualization
Kỹ thuật này phân tách các chức năng chính của mạng (như `Directory Services`, `File sharing` và `IP configuration`) để chúng có thể được phân phối giữa các môi trường khác nhau qua mạng. Khi các chức năng phần mềm độc lập với các máy vật lý mà chúng từng hoạt động, các chức năng cụ thể có thể được đóng gói cùng nhau thành một mạng mới và được gán cho một môi trường riêng. Mạng ảo hóa làm giảm số lượng các thành phần vật lý (như các thiết bị `switches`, `routers`, `servers`, `cables` và `hubs`) cần thiết để tạo ra nhiều mạng độc lập và nó đặc biệt phổ biến trong ngành viễn thông.

# Kết luận
Trên  đây mình đã trình bày về 3 trong số những công việc tiếp theo mà hệ điều hành cần phải làm. Ở phần tiếp theo, mình sẽ tiếp tục tìm hiểu và giới thiệu về một số công nghệ hoặc tác vụ khác ít được mọi người để ý nhưng lại đóng vai trò không thể thiếu được trong công việc hàng ngày với máy tính. Cảm ơn mọi người đã đọc bài viết.

# Tài liệu tham khảo
* https://medium.com/cracking-the-data-science-interview/how-operating-systems-work-10-concepts-you-should-know-as-a-developer-8d63bb38331f
* https://edu.gcfglobal.org/en/computerbasics/understanding-operating-systems/1/
* https://computer.howstuffworks.com/operating-system.htm
* https://en.wikipedia.org/wiki/Operating_system