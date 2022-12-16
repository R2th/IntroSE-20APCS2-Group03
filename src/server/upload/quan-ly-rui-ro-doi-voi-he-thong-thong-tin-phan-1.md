![](https://images.viblo.asia/e3907735-8e87-48b0-aad5-9ca48b244811.jpg)


Trong cuộc sống, mọi thứ luôn biến đổi khôn lường và rủi ro có thể đến từ bất cứ đâu. Hệ thống thông tin (Infomation System) cũng vậy. Mọi thứ chúng ta sử dụng đều có thể dẫn tới rủi ro. Và để hạn chế tối đa các tác động của các rủi ro này, cần thiết phải có một chiến lược quản lí chúng một cách hợp lí. Ví dụ như trong một toà nhà, cần có bảo vệ để đề phòng kẻ gian, camera để quan sát hay bình cứu hoả và lối thoát hiểm cho các trường hợp khẩn cấp, trong hệ thống thông tin, để quản lí các rủi ro, nguy cơ có thể xảy ra cũng cần những chiến lược rõ ràng, cụ thể và hiệu quả. Vậy, quản lí rủi ro là gì? Quản lí các rủi ro đó như thế nào? thì trong bài này mình sẽ khái quát 1 chút về các vấn đề này.
## I. Rủi ro, mối đe doạ và lỗ hổng trong hệ thống thông tin

### 1. Rủi ro (Risk)

Rủi ro trong hệ thống thông tin có thể hiểu đơn giản là một điều gì đó xấu có thể xảy ra đối với tài sản của hệ thống. Tài sản ở đây có thể là các thiết bị, sở hữu trí tuệ hay một phần nhỏ thông tin như thông tin đăng nhập, dữ liệu cá nhân...  Rủi ro là nói về các **khả năng** có thể xảy ra, ví dụ như:
- Mất dữ liệu
- Sập server
- Giả mạo dữ liệu
...
### 2. Mối đe doạ (threat)
Mối đe doạ trong hệ thống thông tin là một hành động, sự việc nào đó có thể làm tổn hại tới tài sản thông tin. Mối đe doạ có thể chia làm 2 loại chính là *mối đe doạ tự nhiên* và *mối đe doạ do con người*. 

Mối đe doạ tự nhiên có thể là bão, lũ làm hư hại giao thông, hạ tầng làm việc. Hoặc như năm nay là dịch bệnh nên gián đoạn một số công việc trong 1 thời gian. Các mối đe doạ từ con người thì rõ ràng hơn. Có thể kể tới như nhân viên đập phá thiết bị, hacker tấn công hay ai đó tải malware về máy công ty... Bất cứ tổ chức nào cũng có các mối đe doạ của riêng mình.

### 3. Lỗ hổng
Trong hai vấn đề ở trên, dù là nguy cơ hay mối đe doạ đều chỉ là nói về khả năng. Và để khả năng đó thực sự khả thi thì hệ thống phải tồn tại lỗ hổng. *Lỗ hổng* là điểm yếu của hệ thống cho phép các mối đe doạ thực sự xảy ra. Lỗ hổng thì có vô vàn các hình thái kiểu cách khác nhau. Tuy nhiên, thông thường các lỗ hổng phải xuất hiện từ những thứ hợp lệ và bình thường của hệ thống. Ví dụ, một hệ thống cho phép truy vấn SQL thì có thể có lỗ hổng SQL Injection hay hệ thống cho phép tải file về máy công ty thì có thể dẫn tới lỗ hổng cho phép tải mã độc. 

Trên đời vốn không có gì hoàn hảo, và hệ thống thông tin cũng thế. Bất cứ hệ thống nào, dù quy mô ra sao, bảo mật nghiêm ngặt đến mấy cũng tồn tại các lỗ hổng của riêng mình. Vậy nên, để đảm bảo hạn chế tối đa việc bị khai thác các lỗ hổng này, các tổ chức cần thiết có cho mình một quy trình về quản lí rủi ro của riêng mình.

### 4. Ví dụ
Mình sẽ lấy vụ tấn công của WannaCry năm 2017 làm một ví dụ cho phần này nhé. Đây là một vụ tấn công khá nổi năm 2017 trên phạm vi toàn thế giới, thực hiện bởi một worm mã hóa nhằm mục đích tống tiền tên là WannaCry. Mã độc này nhắm chủ yếu tới các máy tính sử dụng hệ điều hành Windows, thực hiện mã hóa các file trên máy và đòi tiền chuộc qua tiền mã hóa Bitcoin. 

![](https://images.viblo.asia/2927fd5f-df00-4297-8a7b-824005e556c0.jpg)

Mình sẽ không đi sâu vào phần kĩ thuật hay quá trình của vụ này, mà chỉ tập trung vào việc phân tích 3 yếu tố đã nói ở trên trong vụ này. Trước tiên là về rủi ro, ở đây rủi ro dễ thấy nhất sẽ là:
- Mất dữ liệu
- Không thể vận hành hệ thống

Tiếp theo về mối đe dọa, ở đây có thể kể tới:
- Nhân viên tải tệp mã độc về thiết bị
- Kẻ tấn công phát tán mã độc
- Mã độc tự mình lây lan trong mạng 
- ...

Vậy lỗ hổng ở đây là gì? Một số lỗ hổng có thể có sẽ là:
- Không cài các phần mềm antivirus
- Nhân viên thiếu các kiến thức về an toàn thông tin
- Thiếu backup cho các dữ liệu quan trọng
- ...
## II. Quản lí rủi ro (Risk management)
Quản lí rủi ro là *quá trình* được một tổ chức tiến hành nhằm quản lí các rủi ro, nguy cơ đối với hệ thống thông tin và các tài sản thông tin của tổ chức (được định nghĩa là các tài sản đến từ việc sử dụng công nghệ thông tin). 

Có thể chúng ta thường nghe tới công ty A bị hacker tấn công đánh cắp vài nghìn tỷ, tập đoàn B bị rò rỉ thông tin của vài chục triệu khách hàng và mường tượng rằng các rủi ro là những thứ to tát như vậy. Thế nhưng, rủi ro mà một tổ chức gặp phải thực ra xuất hiện ở bất cứ đâu, bất cứ phần nào trong hệ thống thông tin, từ việc nhỏ như vô tình lộ mật khẩu tài khoản công ty khi vào web xyz, làm đổ nước chết máy tính công ty hay con mèo nhà anh X giẫm lên bàn phím vô tình xoá mất database. Tất cả chúng đều là các rủi ro đối với hệ thống thông tin mà bất cứ tổ chức nào có sử dụng công nghệ thông tin đều có thể gặp phải. 

Vậy làm sao để quản lí các rủi ro một cách hiệu quả? Theo như binh pháp có nói: "biết địch biết ta, trăm trận trăm thắng". Để có thể lên một chiến lược quản lí bất cứ thứ gì, cần phải hiểu rõ tình hình của bản thân và đối thủ. Quản lí rủi ro cũng không ngoại lệ.

### 1. Hiểu về bản thân

![](https://images.viblo.asia/d8209ff6-79df-4ab6-ba67-4df2b691fe7b.jpg)

Ai cũng có mặt xấu mặt tốt, ai cũng có cái hay cái dở. Chúng ta vốn không hoàn hảo và đương nhiên, tổ chức cũng là do con người tạo ra, cũng luôn có các lỗ hổng nhất định. Bất cứ một tổ chức nào cũng có các rủi ro của mình, không ai giống ai hoàn toàn. Chúng có thể tới từ việc thuê người nào làm việc cho mình, sản xuất sản phẩm, marketing hay thậm chí là nơi đặt trụ sở của tổ chức. 

Đối với việc quản lí an toàn thông tin, người quản lí cần hiểu được cách mà thông tin được thu thập, xử lí, lưu trữ và truyền tải ra sao. Việc *biết mình* trong trường hợp này, nói đơn giản là biết mình có gì, giá trị của chúng với tổ chức ra sao, phân loại như thế nào và việc bảo vệ chúng hiện tại như thế nào. Ví dụ, riêng về phần thông tin của người dùng, có thể kể tới như username, email, password, ảnh đại diện, số thẻ, số CVV,... có thể phân ra 2 loại cơ bản nhất là công khai và riêng tư. Các thông tin như username, email, ảnh đại diện có thể xem là các thông tin công khai và việc áp dụng các chính sách bảo mật với chúng có thể không cần quá cao. Ngược lại, các thông tin như password, số thẻ, số CVV nên được xếp vào nhóm bí mật, cần áp dụng các chính sách chặt chẽ để tránh việc làm lộ các thông tin này.


### 2. Hiểu về đối thủ

![](https://images.viblo.asia/34676dd4-129d-4227-a4ce-71dfb1659851.png)

Như binh pháp nói: "kẻ không biết địch biết ta, trăm trận trăm bại, kẻ biết mình mà không biết người cùng lắm chỉ trận thắng trận thua, chỉ có kẻ biết địch biết ta mới có thể bách chiến bách thắng". Để có thể đảm bảo an toàn cho hệ thống thông tin, người quản lí cũng cần biết được các rủi ro có thể đến đối với tổ chức của mình. Để làm được điều này, thông thường cần đáp ứng được các câu hỏi sau:

* Những rủi ro nào có thể xảy ra đối với tài sản thông tin của tổ chức?
* Rủi ro đó có thể dẫn tới hậu quả gì cho tổ chức?
* Rủi ro ở mức nào thì có thể chấp nhận được đối với tổ chức?
* Cần làm gì để giảm mức độ rủi ro hiện tại tới mức có thể chấp nhận được?

Trong số 4 câu hỏi trên,  3 câu đầu thường được gọi là quá trình phân tích rủi ro (risk analysis). Tương ứng với mỗi câu hỏi là một quá trình nhỏ trong việc quản lí rủi ro là:
#### a. Xác định rủi ro (risk identification)
- Tổng hợp tất cả các tài sản thông tin
- Phân loại và tổ chức chúng một cách hợp lý
- Đánh giá giá trị của từng tài sản thông tin
- Xác định các mối đe doạ với từng nhóm
- Xác định lỗ hổng với tài sản bằng việc gắn các tài sản với các mối đe doạ thích hợp
#### b. Đánh giá rủi ro (risk assessment)
- Xác định khả năng mà hệ thống có thể bị tấn công với từng mối đe doạ
- Đánh giá tương đối các rủi ro có thể xảy tới với tài sản thông tin của hệ thống, từ đó có thể biết các tài sản nào cần tập trung kiểm soát và bảo vệ.
- Tính toán rủi ro mà tài sản bị mất đối với các thiết lập hiện tại
- Nhìn tổng thể các phần có thể bị tấn công để xác định lỗ hổng và cách kiểm soát các rủi ro với tài sản
- Viết tài liệu và báo cáo về việc xác định và đánh giá rủi ro
#### c. Khẩu vị rủi ro (risk appetite)
- Xác định mức độ rủi ro có thể chấp nhận cho từng rủi ro
- Đặt mức độ chấp nhận rủi ro vào tình huống cụ thể của tổ chức

#### d. Kiểm soát rủi ro (risk control)
- Xác định các cách kiểm soát hiệu quả nhất
- Mua hoặc cài đặt, áp dụng các biện pháp kiểm soát thích hợp
- Nhìn tổng quan, quan sát quá trình hoạt động để để đảm bảo rằng các biện pháp đã sử dụng có hiệu quả

Trong bài này là các phần thông tin chung nhất về thế nào là một quy trình quản lí rủi ro cơ bản nhất. Trong các phần sau, mình sẽ nói chi tiết hơn về từng phần nhỏ trong quá trình này nhé.