Đợt này không nghĩ ra được gì để viết bài, thôi thì viết nốt về hệ phân tán cho nó trọn bộ vậy:grin: . Hôm nay mình sẽ viết nốt về phần ĐỊnh danh. Đây là chương 5 trong bộ môn này. Cùng tìm hiểu nhé!

**Mục lục**
* (1) Tên, định danh, và địa chỉ
* (2) Không gian tên phẳng
* (3) [Không gian tên có cấu trúc](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dinh-danh-part-2-GrLZDR3g5k0#_3-khong-gian-ten-co-cau-truc-0)
* (4) [Không gian tên theo thuộc tính](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dinh-danh-part-2-GrLZDR3g5k0#_4-khong-gian-ten-theo-thuoc-tinh-8)

# 1. Tên, định danh, thực thể, tên chức năng
![](https://images.viblo.asia/0a2f42f0-7cde-4457-bdfc-24433c6a4c68.png)

* **Name (Tên)**: một xâu các bit hoặc các ký tự dùng để tham chiếu đến một thực thể (entity).  Số lượng tên cho mỗi thực thể không bị hạn chế. 
* **Entity (Thực thể)**: bất kỳ những gì có trong hệ thống như host, printer, file, người dùng, tiến trình.
* **Access point (Điểm truy cập)**: điểm truy nhập đến thực thể, 1 thực thể có thể có nhiều điểm truy cập
* **Address (Địa chỉ)**:  tên của access point. Là một loại name đặc biệt:
    * Một tên có thể gồm nhiều địa chỉ
    * Thực thể có thể thay đổi địa chỉ trong quá trình tồn tại
    * Một địa chỉ có thể trỏ đến các thực thể khác nhau trong các thời điểm khác nhau 
    * Đảm bảo có thể tham chiếu tới các tài nguyên bằng tên 
* **Identifier (Định danh)**: một loại tên đặc biệt. Nó phải đáp ứng ba yêu cầu sau:
    * 1 định danh chỉ đến nhiều nhất 1 thực thể.
    * Mỗi thực thể chỉ được xác định bởi 1 định danh.
    * Một định danh mãi mãi chỉ trỏ đến 1 thực thể.

Việc sử dụng định danh để phục vụ việc truy xuất tới các thực thể trong hệ thống máy tính. Trong hệ thống phân tán, việc thực thi của hệ thống định danh thường phân tán trên nhiều máy. Việc phân tán  như thế nào đóng vai trò quan trọng trong tính hiệu quả và khả năng mở rộng của hệ thống định danh.

# 2. Không gian tên phẳng
## 2.1. Khái niệm
* Là chuỗi các bit, chuỗi ký tự ngẫu nhiên không cấu trúc.
* Không chứa bất kỳ thông tin nào về cách xác định vị trí các điểm truy cập của thực thể đã được liên kết của chúng..
* Nhiệm vụ: cho biết tên và xác định điểm truy nhập tới các thực thể.
* Các giải pháp để xác định điểm truy cập: 
    * Các giải pháp thông thường
    * Home-base (dựa vào Home Agent)
    * DHT ( hàm băm phân tán)
    * Cách tiếp cận phân cấp

## 2.2. Các giải pháp thông thường
Thực hiện bằng cách gửi định danh cần tìm theo:
* Phương pháp quảng bá, gửi cho các thành viên của nhóm.
* Sử dụng con trỏ chuyển tiếp. 
### 2.2.1. Quảng bá/thông báo nhóm
* Một thông báo có chứa định danh cần phân giải được quảng bá tới tất cả các thực thể trong hệ thống.
* Thực thể nào có đúng định danh trong thông báo nhận được sẽ quảng bá một thông báo chứa định danh và địa chỉ của thực thể.
* Tất cả các thực thể khác sẽ nhận được thông báo này và có được ánh xạ giữa định danh và địa chỉ của thực thể nói trên
* Phương pháp này đòi hỏi tất cả các thành viên đều phải lắng nghe và tiếp nhận yêu cầu gửi đến cũng như kém hiệu quả khi kích thước mạng tăng => chỉ phù hợp với qui mô nhỏ, do đó thường chỉ được áp dụng trong các mạng cục bộ (LAN). 

Thay thế quảng bá bằng truyền thông nhóm trên mạng điểm điểm. Khi một thực thể gửi một thông báo nhóm, các bộ định tuyến sẽ thực hiện theo chính sách nỗ lực tối đa để chuyển các thông báo này tới đích

### 2.2.2. Chuyển tiếp con trỏ (Forwarding pointer)
* Phương pháp dựa trên nguyên tắc một thực thể khi rời sang vị trí khác thì phải để lại thông tin tham chiếu tới vị trí mới. 
* Khi cần tìm một thực thể, client có thể xác định ngay được địa chỉ hiện tại của thực thể này nhờ phương pháp dò tìm lưu vết.
* Ưu điểm của phương pháp: đơn giản.
* Nhược điểm: 
    * Chuỗi dài vô hạn
        * Giải pháp: sử dụng các short cut. Tuy nhiên có khả năng có chuỗi không tham chiếu được.
    * Lưu trữ vô số các tham chiếu
        * Giải pháp: loại bỏ các tham chiếu. Tuy nhiên khi nào có thể loại bỏ các tham chiếu

Để giải quyết các vấn đế trên người ta dùng giải pháp **home-based** để thay thế

## 2.3. Giải pháp Home-based

![](https://images.viblo.asia/2d11dfea-b59c-4f81-96df-92e806ce911c.png)

* Giải quyết vấn đề mở rộng, tính hiệu quả trong mạng quy mô lớn của broadcasting và forwarding pointers.
* Giải pháp này dựa trên việc cấp phát cho mỗi thực thể một vị trí gốc để lưu giữ địa chỉ hiện tại của các thực thể. 
* Địa chỉ gốc được đăng kí tại dịch vụ đặt tên. 

=> Như vậy để tìm kiếm một thực thể phải truy tìm vị trí gốc, để biết được chính xác vị trí hiện tại của một thực thể.

## 2.4. Giải pháp sử dụng hàm băm phân tán (DHT)
* Bảng băm phân tán (DHT) dùng để cung cấp chức năng tìm kiếm trong hệ thống phân tán. 
* Một cặp khóa và giá trị được lưu trong DHT, bất cứ nút nào tham gia vào hệ thống đều có thể lấy được giá trị ứng với một khóa xác định. 
* Việc duy trì bảng ánh xạ giữa khóa và các giá trị được lưu phân tán trên các nút. Khi đó việc thay đổi của một số nút tham gia vào hệ thống chỉ ảnh hưởng đến số nhỏ các khóa liên quan =>  DHT có thể dễ dàng mở rộng với số lượng lớn nút tham gia và cung cấp khả năng duy trì hệ thống khi có nút rời khỏi hệ thống. 
* Ưu điểm của phương pháp:
    * Không sử dụng bất kì một hệ thống trung tâm nào để quản lý
    * Dễ dàng thích nghi mở rộng hệ thống. 
    * DHT chứa không gian khóa ảo và được phân vùng cho từng nút trong hệ thống. 
    * Một mạng phủ kết nối các nút với nhau sẽ giúp các nút tìm được nút đang giữ thông tin về một khóa trong không gian khóa.

* Thuật toán SHA-1 được sử dụng để tạo mã băm của tên tập tin, là khóa k có độ dài 160 bit để lưu một tập tin với tên và dữ liệu trong DHT. 
* Khi đó một thông báo put(k, data) được gửi đến các nút trong mạng DHT. 
* Thông điệp được chuyển tiếp qua các nút cho đến khi tới được nút giữ nhiệm vụ lưu giữ khóa k được quy định bởi cách phân bổ không gian khóa. 
* Nút đó thực hiện lưu giữ khóa và dữ liệu. 
* Các nút khác có thể lấy thông tin của file bằng cách thực hiện hàm băm trên tên file để lấy được khóa k. Từ đó có thể truy vấn bất kỳ nút nào trong mạng DHT để tìm kiếm dữ liệu tương ứng với khóa k bằng thông điệp get(k). 
* Thông điệp này được truyền trên mạng thông qua các nút cho đến khi tới nút lưu giữ thông tin về khóa k. Nút này trả lại thông tin về dữ liệu ứng với khóa.
* DHT sử dụng phương pháp băm nhất quán để ánh xạ khóa vào các nút. 
* Kĩ thuật này cung cấp một hàm δ(k1,k2) để tính khoảng cách giữa hai khóa k1 và k2. 
* Mỗi nút được gán cho một khóa định danh ID là i(x) có nhiệm vụ lưu trữ tất cả các khóa k(m) nếu i(x) là định danh nút gần nhất với các khóa đó bằng hàm δ(k1,k2). 
* Khi thêm bớt một nút trong mạng chỉ có những khóa thuộc nút đó mới cần chuyển sang các nút lân cận và không tác động đến các nút khác. 
* Mỗi nút duy trì một tập các đường dẫn đến các nút láng giềng (gọi là bảng định tuyến). 
* Một nút chọn các nút láng giềng dựa theo một cấu trúc nhất định gọi là hình trạng của mạng. 
* Đặc điểm của một hình trạng:
    * Đảm bảo định tuyến một cách chính xác.
    * Đảm bảo số lượng tối đa các nút phải đi qua 
    * Đảm bảo đáp ứng nhanh truy vấn và số lượng nút láng giềng của một nút phải nhỏ để đảm bảo không làm gây khó khăn trong việc duy trì hệ thống.

**Xét hệ thống Chord**
* Chord là giao thức phổ biến nhất được sử dụng trong bảng băm phân tán.
* Mạng Chord hỗ trợ khả năng gán tương ứng một khóa cho trước với một nút mạng. 
* Tùy thuộc vào ứng dụng sử dụng Chord, mỗi nút có thể đảm nhiệm nhiệm vụ lưu trữ dữ liệu được gán với khóa. 
* Chord sử dụng phương pháp băm nhất quán (consistent hashing) gián tiếp thực hiện việc cân bằng tải giữa các nút.
* Việc tham gia hay rời khỏi mạng sẽ chỉ làm cho một số khóa chuyển từ nút này sang nút khác, do đó khả năng mở rộng qui mô tương đối đơn giản. 
* Các nút trong mạng Chord tạo thành mạng logic dạng vòng tròn có các vị trí nút từ 0 - 2^m-1. 
* Khóa k được gán cho nút đầu tiên có định danh lớn hơn hoặc bằng định danh của k, được gọi là successor(k). 
* Trong vòng định danh, nút kế tiếp của một khóa chính là nút gần nhất theo chiều kim đồng hồ tính từ khóa k.
 
![](https://images.viblo.asia/dcd2e636-6ab5-49b6-a621-efb40347221b.png)

Ví dụ trên là hệ thống Chord với m=6, chứa 10 nút và 5 khóa. 
* Nút liền sau của định danh 10 là nút 14 do đó K10 sẽ được đặt ở N14, tương tự K24 và K30 được đặt  ở N32, K38 đặt ở K38 và K54 tại K56. 
* Để duy trì bảng ánh xạ khi một nút n tham gia vào mạng, một số khóa trước đây được đặt tại nút kế tiếp của n sẽ chuyển sang cho nút n.  Ở ví dụ trên, nếu một nút với định danh 26 tham gia vào mạng nó sẽ nhận được K24 chuyển từ N32. 
* Để tăng tốc độ quá trình tìm kiếm, Chord sử dụng thêm thông tin định tuyến như định danh của mỗi nút và khóa có độ dài m bit. 
    * Mỗi nút n duy trì một bảng định tuyến chứa m mục gọi là bảng finger. 
    * Mục thứ i trong bảng của nút n chứa định danh của nút s sao cho s là nút đầu tiên trên vòng tiếp sau khóa n+2^i-1 s=successor(n+2^i-1), với 1 ≤ i ≤ m.  (lấy số dư với modun 2^m)
    * Lúc này s là finger thứ i của nút n. 
    * Finger đầu tiên của một nút cũng chính là nút kế tiếp của nút đó.

![](https://images.viblo.asia/8768e9b8-3605-4581-86bf-e58fb9b1a63c.png)

Hình trên thể hiện bảng finger của nút
* Finger đầu tiên được trỏ đến N14 do 14 là nút liền sau (8+20)  mod 26 = 9
* Tương tự finger cuối cùng của N8 trỏ đến N42 do 42 là nút liền sau (8+25) mod 26 = 40. 

Với cách thiết lập trên ta thấy: 
* Một nút chỉ lưu thông tin về một số giới hạn các nút có trong mạng.
*  Một nút chỉ biết đến một số nút nằm gần với nó.
*  Một nút không lưu trữ đủ thông tin để có thể ngay lập tức tìm được nút kế tiếp của khóa k.

Khi một nút tự nguyện dời khỏi mạng:
* Tất các khóa liên quan được chuyển cho nút kế tiếp, thông báo cho nút kế tiếp và và nút liền trước. 
* Bảng finger trên các nút khác sẽ được điều chỉnh thông qua quá trình ổn định mạng định kỳ. 
* Khi một nút đột ngột rời khỏi mạng sẽ gây ra ảnh hưởng sau:
    * Có thể gây mất các khóa, các mục liên quan đến khóa.
    *  Một số nút sẽ không truy vấn được một số khóa nhất định.
*  Cách giải quyết:
    *  Lưu trên mỗi nút một danh sách các nút nằm sau nó trong vòng Chord.
    *  Nếu một nút đột ngột không liên lạc được với nút kế tiếp nó sẽ sử dụng các nút liền sau trong danh sách. 
    *  Các khóa và các mục liên quan tới khóa sẽ được sao chép trên các nút có trong danh sách => Một khóa và các mục liên quan đến khóa sẽ chỉ bị mất khi có log2(N)+1 các nút trong danh sách đồng thời rời khỏi mạng.
###  2.5. Giải pháp phân cấp
* Xây dựng cây tìm kiếm phân cấp và thực hiện phân miền ở các mức khác nhau.
* Mỗi miền giống như một nút thư mục riêng biệt, nút gốc biết tất cả các thực thể. 
* Mỗi thực thể trong một miền tương ứng với một bản ghi trong nút thư mục, đó là địa chỉ hiện tại của thực thể hoặc một con trỏ. 
* Địa chỉ của một thực thể được lưu trong một nút lá hoặc một nút trung gian.
*  Nút trung gian chứa con trỏ đến một nút con khi và chỉ khi cây con nằm tại nút con lưu trữ một địa chỉ của thực thể. 
*  Một thực thể có thể có nhiều địa chỉ. 
*  Cơ chế hoạt động: tìm kiếm ở các nút lá cục bộ, nếu nút đó biết thực thể sẽ đi xuống dưới theo con trỏ, ngược lại đi lên trên.

Phần 1 của bài mình xin kết thúc tại đây. Ở [phần 2 ](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dinh-danh-part-2-GrLZDR3g5k0)chúng ta sẽ tìm hiểu nốt mục (3) và (4) nhé.

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo** Bài giảng Hệ phân tán - ĐHBKHN