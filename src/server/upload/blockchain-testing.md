Thời gian gần đây, thị trường đầu tư tiền điện tử Bitcoin được rất nhiều người quan tâm . Vậy tại sao Bitcoin lại có thể gây lên tiếng vang lớn đến vậy? Công nghệ nào đứng đằng sau Bitcoin? Đó chính là công nghệ Blockchain. 

Trong bài viết này,  sẽ trình bày tổng quan về công nghệ Blockchain và Blockchain Testing.


![](https://images.viblo.asia/4ababa22-892f-4185-abcc-43f2ca83f18b.jpg)

# I. Tổng quan về Blockchain
## 1. Blockchain là gì?
* Blockchain là công nghệ cho phép  truyền tải dữ liệu một cách an toàn dựa vào hệ thống mã hóa vô cùng phức tạp, tương tự cuốn sổ kế toán của một công ty, nơi mà tiền mặt được giám sát chặt chẽ. 
Trong trường hợp này Blockchain được gọi là cuốn sổ kế toán hoạt động trong lĩnh vực kĩ thuật số.

* Blockchain sở hữu tính năng vô cùng đặc biệt đó là: việc truyền tải dữ liệu không đòi hỏi một trung gian để xác nhận thông tin. 
* Đây là một ệ thống bảo mật an toàn cao trước khả năng bị đánh cắp dữ liệu. Ngay cả khi một phần hệ thống  Blockchain sụp đổ, những máy tính và các nút khác sẽ tiếp tục bảo vệ thông tin và giữ cho mạng lưới tiếp tục hoạt động.
## 2. Phân loại
Hệ thống Blockchain có 3 phân loại chính:
* Public : tất cả mọi người đều có quyền đọc và ghi dữ liệu trên Blockchain
* Private: 
Người dùng chỉ được quyền đọc dữ liệu, không có quyền ghi vì điều này thuộc về bên tổ chức thứ ba tuyệt đối tin cậy.
* Permissioned
Đây là một dạng của private, tuy nhiên có bổ sung thêm một số tính năng.
Ví dụ các ngân hàng hay tổ chức liên doanh sẽ sử dụng Blockchain cho riêng mình.
## 3. Hoạt động và lợi ích của Blockchain
**Hình dưới đây minh họa hoạt động của Blockchain:**

![](https://images.viblo.asia/f454936b-f943-4e44-9aa1-6d08656d131a.png)

**Một số lợi ích mà Blockchain mang lại:**
* Là một hệ thống công khai, blockchain hồ sơ và xác nhận mọi giao dịch được thực hiện đảm bảo an toàn và tin cậy
* Tất cả các giao dịch được thực hiện ủy quyền bở một bên thứ ba. Làm cho các giao dịch không thay đổi và ngăn chặn xâm nhập liên quan đến vấn đề bảo mật.

# II. Blockchain Testing
Để kiểm thử Blockchain  chúng ta cần kiểm thử những gì? 

Có những hạn chế nào chúng ta cần giải quyết ?

Blockchain có phạm vi rộng hơn nhiều so với Bitcoin. Dưới đây là một số khía cạnh cần quan tâm khi tiến hành kiểm thử Blockchain.

**Load**

* Bitcoin của blockchain hiện có lưu lượng tối đa là 3-4 giao dịch mỗi giây, với các khối mới để giữ các giao dịch tạo ra khoảng 10 phút một lần. 
* So sánh việc này với giao dịch / tải thứ hai cần thiết để xử lý. 
* Vấn đề với blockchain là tốc độ giảm khi tải tăng, làm cho vấn đề khả năng mở rộng. 
Có một sự thay thế DLT cho blockchain được gọi là Tangle, không bị chặn đứng, có thể mở rộng và nhẹ, được hỗ trợ bằng cách sử dụng các cây thay vì các dây chuyền. 

**Performance / Hiệu năng**

* Mất bao lâu cho một truy vấn mất nếu nó phải nhìn vào mỗi khối trong chuỗi để nghiên cứu một cái gì đó giống như mỗi khi một tài khoản cụ thể đã được xác định?
* Nó giống như truy vấn SQL, nơi những pha khác nhau ảnh hưởng đến thời gian? 
Điều này có thể bao gồm thử nghiệm tích hợp mà nhấn mạnh các ứng dụng truy vấn bên ngoài nhiều hơn chính blockchain.

**Consistency/Availability (Tính nhất quán / Tính khả dụng)**

* Theo định lý CAP, có thể chỉ có 2 phản ứng mà một hệ thống phân chia có thể cung cấp: phần tiếp cận gần nhất của một chuỗi, hoặc sự lựa chọn giữa đoạn gần nhất của chuỗi hoặc lỗi. 

* Hoặc nói cách khác, nếu kết thúc gần đây nhất của chuỗi là không thể truy cập (luôn luôn là một khả năng trong một hệ thống phân vùng), bạn ném và lỗi hoặc cung cấp các chi tiết từ một đoạn trước đó? 
Giả sử rằng việc chờ đợi kết thúc chuỗi kết nối không thành công và hệ thống phải chọn giữa hai lựa chọn: không thành công hoặc tiết lộ một khối sớm hơn. 

**Security**

* Blockchain  xuất hiện trong tin tức để công bố giá trị gia tăng của bitcoin, hoặc trộm cắp bitcoin.
Từ đó nêu ra câu hỏi rõ ràng: bitcoin an toàn không? Nhiều lớp bảo mật được xây dựng trong việc xác định danh tính. 
* Thật không may, một khi các lớp nhận dạng đã bị tấn công, các giao dịch tức thời không thể dừng lại. 

* Sự đa dạng của các phím có thể làm phức tạp việc trộm cắp, nhưng cuối cùng, bất cứ thứ gì có thể được nhập cũng có thể bị đánh cắp, bởi những điểm yếu như bộ nhớ đệm lờ mờ hoặc các công cụ như sniffers. Chất lượng an toàn chống giả mạo được tích hợp sẵn để blockchain.

**CRUD testing query logic/ Kiểm thử logic các câu truy vấn**

* Trong trường hợp chuỗi cung ứng hoặc thu hồi sản phẩm hoặc hoạt động của người dùng, nhiều bản ghi cần được phân tích chính xác qua nhiều chuỗi hoặc nhiều bản ghi bên trong một khối hoặc cả hai.

* Trong trường hợp hợp đồng smart, bạn có thể theo dõi tất cả các dự thảo hợp đồng hoặc kéo các phiên bản có hiệu lực trong một khoảng thời gian cụ thể. 
Kiểm thử nên bao gồm cả kiểm thử chức năng và kiểm thử hiệu năng.


**Database handling / Xử lí cơ sở dữ liệu**

* Cần theo dõi để phát hiện ra các trường hợp bất thường. Điều gì sẽ xảy ra nếu cái gì đó bị hư hỏng hoặc missing dữ liệu hay dữ liệu không chính xác?


Trên đây là một số kiểm thử cơ bản đối với Blockchain, kiểm thử nên bao gồm kiểm thử tích hợp cho tiến trình giao dịch Blockchain

# Tài liệu tham khảo
[1] https://www.qualitestgroup.com/white-papers/testing-blockchain/

[2] https://gomedici.com/an-overview-of-blockchain-technology/