Có khi nào bạn sử dụng hệ thống mà bị trì trệ, các thao tác trở nên chậm chạp và đơ. Trong khi tình trạng mạng vẫn đang ổn định. 
Gần đây thì mình đã gặp tình trạng này với hệ thống website mình đang quản lý. Các chức năng thì đơ, chậm, thao tác không thành công. 
Sau khi kiểm tra file log một hồi không có kết quả. Lúc này kiểm tra RAM thì mới thấy tình trạng RAM của hệ thống dao động khoảng trên 80%. 
Vậy tại sao khi hiệu suất sử dụng RAM cao thì hệ thống lại bị trì trệ. Hôm nay chúng ta cùng tìm hiểu về RAM và giải pháp khi phần trăm sử dụng RAM trên 80% nha.
# I- RAM là gì?
RAM (Random Access Memory) là loại bộ nhớ truy xuất ngẫu nhiên,  tức là loại bộ nhớ cho phép truy xuất đọc, ghi ngẫu nhiên đến bất kỳ vị trí nào trong bộ nhớ dựa theo địa chỉ ô nhớ.

Như chúng ta đã biết trong quá trình vận hành hệ thống, có rất nhiều biến, tập tin được phát sinh mang tính tạm thời để hệ thống sử dụng không mang giá trị lâu dài. Và RAM chính là môi trường nhớ tạm mà các tập tin trên được lưu lai để giúp phần mềm, hệ thống vận hành.Có thể hiểu đơn giản là một khi một chương trình hay ứng dụng được khởi chạy, thông tin của nó được tạo ra và lưu trữ trên bộ nhớ RAM để cho các thành phần khác như CPU, GPU lấy thông tin và xử lí.

Thông tin lưu trên RAM chỉ là tạm thời, những thông tin đó sẽ mất đi nếu nguồn điện cung cấp không còn, nó khác với ROM (Read-Only Memory) là loại bộ nhớ mà thông tin lưu trên ROM vẫn được duy trì dù nguồn điện cấp không còn.

Bộ nhớ RAM càng lớn đồng nghĩa với việc nó có thể chứa 1 lúc dữ liệu của nhiều tác vụ đang chạy song song, do đó khả năng đa nhiệm (chạy nhiều tác vụ cùng lúc) càng trơn tru, mượt mà. Nguồn gốc dẫn đến cái tên này đến từ đặc tính của nó: cho dù ở bất cứ vị trí nào trên bộ nhớ thì thời gian đọc hoặc ghi của nó với mỗi ô nhớ đều là như nhau.Thông thường, mỗi ô nhớ tương ứng là một byte (8 bit). Tuy nhiên, hệ thống có khả năng đọc hay ghi vào nhiều byte (2, 4, 8 byte) chứ không chỉ một byte.


# II- Đặc trưng của RAM
* Dung lượng bộ nhớ : Tổng số byte của bộ nhớ (nếu tính theo byte) hoặc là tổng số bit trong bộ nhớ nếu tính theo bit.
* Tổ chức bộ nhớ : Số ô nhớ và số bit cho mỗi ô nhớ
* Thời gian thâm nhập : Thời gian từ lúc đưa ra địa chỉ của ô nhớ đến lúc đọc được nội dung của ô nhớ đó.
* Chu kỳ bộ nhớ : Thời gian giữa hai lần liên tiếp thâm nhập bộ nhớ.
# III- Vai trò của RAM
Trái ngược với ổ cứng, bộ nhớ của RAM thấp hơn bộ nhớ của ổ cứng khá nhiều, tuy nhiên RAM lại là nơi để CPU lấy dữ liệu để xử lý nên tốc độ ghi và đọc trong RAM rất nhanh. RAM đóng vai trò quyết định đối với khả năng thực thi và tốc độ thực thi đa nhiệm của hệ thống. Dung lượng RAM càng lớn, chu kỳ bộ nhớ càng nhanh, Hệ thống  có thể chạy cùng lúc nhiều tác vụ càng thoải mái. Nếu dung lượng RAM không đủ, Hệ thống sẽ gặp phải hiện tượng giật lag hoặc treo do số lượng các tác vụ lớn gây tràn bộ nhớ.
# IV- Khi nào chúng ta cần nâng RAM cho hệ thống của mình
Thông thường thì sẽ có nhiều option để lựa chọn hệ thống có bao nhiêu GB RAM, tùy thuộc tác vụ thực hiện nhiều hay ít mà chúng ta lựa chọn dung lượng cho phù hợp. Và bạn hãy nhớ lúc nào cũng nên để dung lượng dư khoảng 40% để giúp cho hệ thống chạy thật tốt. Chẳng hạn như cần dùng 3Gb ram thì chúng ta nên tối thiểu sử dụng 5Gb RAM.

Nâng cấp RAM cho hệ thống cũng là một việc làm rất quan trọng. Vì phần mềm và các nền tảng cao cấp hiện nay khi vận hành đều tốn dung lượng RAM để chạy nền rất cao nên khi chúng ta thấy hệ thống hoạt động chiếm hơn 70% RAM thì đó là lúc chúng ta cần nâng cấp dung lượng RAM cao hơn nữa để đảm bảo được việc vận hành RAM thật tốt và có thể tối ưu được khả năng vận hành cho hệ thống của chúng ta một cách tốt hơn.
Để kiểm tra thông tin về RAM trên server của bạn:
```
// Input
free -m
```
```
// Out put
                             total        used        free      shared  buff/cache   available
Mem:            990         113         157          26         719         625
```
Nếu lúc này hệ thống của bạn thường xuyên vượt ngưỡng 80% . Thì điều bạn cần làm là nâng RAM cho hệ thống ngay lập tức.
# V- Các bước nâng RAM cho 1 EC2 instance.
**Bước 1**: Tạo 1 bản backup cho instance hiện tại

Chon instance mà bạn muốn nâng cấp RAM > Chọn Image > Create Image
![](https://images.viblo.asia/29a9aaea-aa31-4eb1-a410-e2d223b2261f.png)

**Bước 2**: Stop Instance EC2
Chọn Chon instance mà bạn muốn nâng cấp RAM > Chon Instance state > Stop
![](https://images.viblo.asia/41b6f7a9-c592-4a48-b197-6ab95751f314.png)

**Bước 3**: Chọn instance type có mức RAM phù hợp
Chọn Chon instance mà bạn muốn nâng cấp RAM > Chon Instance setting > Change Instance Type
![](https://images.viblo.asia/6e4553bc-dff5-4c3a-92de-11422fcc81e1.png)
Chọn mức RAM phù hợp tham khảo [Tại đây](https://aws.amazon.com/vi/ec2/instance-types/)
![](https://images.viblo.asia/baa2710a-a649-43e6-a887-f914c2223aa9.png)

**Bược 4**: Khởi động lại Instance EC2 sau đó kiểm tra dung lượng RAM bằng lệnh free -m. 
Vậy là đã thành công rồi. Hệ thống lại chạy mượt mà như chưa có chuyện gì xảy ra cả.
# VI- Tài liệu tham khảo
[https://aws.amazon.com/vi/ec2/instance-types/](https://aws.amazon.com/vi/ec2/instance-types/)

[https://fptshop.com.vn/tin-tuc/danh-gia/ram-la-gi-bo-nho-ram-dung-de-lam-gi-57115](https://fptshop.com.vn/tin-tuc/danh-gia/ram-la-gi-bo-nho-ram-dung-de-lam-gi-57115)