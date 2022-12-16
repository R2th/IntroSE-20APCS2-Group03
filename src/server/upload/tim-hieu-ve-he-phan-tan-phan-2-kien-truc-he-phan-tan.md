Tiếp nối [Phần 1 - Tổng quan về hệ phân tán](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-1-tong-quan-ve-he-phan-tan-bJzKmqWwK9N), ở bài tiếp theo này mình xin giới thiệu **Kiến trúc hệ phân tán**. Cùng tìm hiểu nhé!:grin:

# Khái niệm kiến trúc
Chúng ta đã biết hệ phân tán luôn được phân chia thành các thành phần nhỏ do đó chúng có tổ chức khá phức tạp. Để giải quyết vấn đề phức tạp đó các hệ thống cần được tổ chức tốt và cách tốt nhất là phải phân biệt giữa *tổ chức logic* và *thực thi vật lý*
* Tổ chức logic là các thành phần phần mềm cấu thành nên hệ thống => ***Kiến trúc phần mềm*** cho chúng ta biết cách thức mà các thành phần phần mềm tổ chức và tương tác với nhau như thế nào.
* Thực thi vật lý là việc sắp đặt các thành phần đó vào 1 máy tính thật và bản thể cuối cùng của 1 kiến trúc phần mềm. Sau khi xếp đặt hoàn thiện các thành phần với nhau được gọi là ***kiến trúc hệ thống***
# Các kiểu kiến trúc
> ***Kiểu kiến trúc*** là cách thức mà các thành phần kết nối với nhau, dữ liệu trao đổi giữa các thành phần và các thành phần đó được cấu hình với nhau tạo nên 1 hệ thống.

## 1. Kiến trúc phân tầng
* Trong HPT các chức năng trên hệ thống được phân rã  thành các chức năng con.
* Các chức năng con được thực hiện bởi các mô đun phần mềm, các thực thể phần mềm trên các hệ thống khác nhau tương tác với nhau. 
* Từ đó các mô đun phần mềm khác nhau trên cùng hệ thống phối hợp và tương tác với nhau để thực hiện chức năng chung.
=> để đơn giản hệ thống cần giảm thiểu liên kết giữa các mô đun => kiến trúc phân tầng
* **Ý tưởng cơ bản** của kiến trúc phân tầng:
    * Các thành phần được tổ chức theo phong cách phân tầng.
    * 1 thành phần ở tầng N được cho phép gọi các thành phần khác ở tầng dưới N-1.
    * Mô hình này được áp dụng rất nhiều trong cộng đồng mạng
    
    ![](https://images.viblo.asia/3096d3e9-720b-4e1f-a3a3-9c02034745d8.png)

* **Ưu điểm** của kiến trúc phân tầng:
    * Đối với các hệ thống phức tạp => áp dụng nguyên lý chia để trị
    * Cho phép xác định rõ nhiệm vụ của mỗi bộ phận và quan hệ giữa chúng
    * Cho phép dễ dàng bảo trì và nâng cấp hệ thống, thay đổi bên trong 1 bộ phận không làm thay đổi các bộ phận khác

Với nguyên tắc phân tầng như trên, các thực thể trong mạng phải thống nhất giao thức chuẩn tương ứng với mỗi tầng để có thể trao đổi thông tin với nhau.
> **Giao thức** là tập hợp tất cả các quy tắc, quy ước để đảm bảo cho các máy tính trên mạng có thể giao tiếp với nhau. 
* Các loại giao thức:
    * ***Giao thức hướng kết nối***: là giao thức trước khi tiến hành trao đổi thông tin dữ liệu, thực thể phải thiết lập 1 kênh truyền, sau đó hủy kênh truyền sau khi kết thúc trao đổi => giúp cho 2 thực thể có thể kiểm soát được đường truyền (giao thức TCP)
    *   ***Giao thức không kết nối***: không cần thiết lập kênh truyền, dữ liệu thường ở dạng datagram  (giao thức UDP)
    *   ***Giao thức tin cậy***: dữ liệu truyền đi tuần tự, nếu nhận thành công thì nơi nhận phải gửi tín hiệu báo nhận
    *   ***Giao thức không tin cậy***: ngược lại với giao thức tin cậy
##     2. Kiến trúc hướng đối tượng
![](https://images.viblo.asia/4b7b6647-0dda-4a61-92dc-c2a8b93739ed.png)

* Các thành phần là các đối tượng.
* Các kết nối là các lời gọi thủ tục

=> Các đối tượng được kết nối với nhau thông qua cơ chế lời gọi thủ tục
* Các đối tượng thường có 2 loại:
    * Đối tượng khách (Object Client)
    * Đối tượng chủ (Object server)
    
   => Kiến trúc này có nhiều điểm tương đồng với kiến trúc Client - Server

Ở đây kết nối giữa các đối tượng là kết nối lỏng, cho phép các đối tượng không đồng nhất. Chúng có thể khác nhau về các thuộc tính, phương thức và có khả năng trao đổi thông tin với nhau

* **Ưu điểm** của kiến trúc hướng đối tượng
    * Ánh xạ vào các đối tượng trong thế giới thật => dễ hiểu
    * Dễ dàng bảo trì và nâng cấp
    * Có tính tái sử dụng (Polymorphism & Abstraction)
    *  Kiểm soát lỗi
    *  Mở rộng chức năng mà không ảnh hưởng hệ thống
    *  Dễ dàng kiểm thử với encapsulation
    *  Giảm thời gian và chi phí phát triển

* **Nhược điểm** :
    * Khó khăn trong việc xác định các lớp, các đối tượng
    * Kích cỡ chương trình lớn
    * Chương trình chạy chậm hơn (so với procedure programs)
    * Không phải phù hợp với mọi bài toán

##     3. Kiến trúc hướng sự kiện

![](https://images.viblo.asia/11c16a6d-e2e1-4dd3-8204-406beec0d1c2.png)

* Các thành phần hệ thống trao đổi thông tin với nhau thông qua các sự kiện
* Các sự kiện chứa các thông tin cần trao đổi và có thể kích hoạt các thao tác trong các tiến trình
* Có thể hoạt động theo mô hình điểm điểm hoặc mô hình trục quảng bá sự kiện
##     4. Kiến trúc hướng dữ liệu

![](https://images.viblo.asia/775ee5fa-6af2-4d49-89db-acc23db1ae2f.png)

* Bản chất của kiến trúc hướng dữ liệu là các tiến trình có thiết kế tách dời theo thời gian
* Các thành phần trao đổi thông tin thông qua kho dữ liệu chung => 2 tiến trình không cần thiết phải cùng đang chạy trong thời điểm trao đổi thông tin
* Để gửi và nhận thông tin từ kho dữ liệu dùng chung các tiến trình có thể dùng các truy vấn cơ sở dữ liệu thay vì dùng tham chiếu

# Kiến trúc hệ thống
## 1. Kiến trúc tập trung
###  Kiến trúc client-server
![](https://images.viblo.asia/29003ccb-6caa-4c24-b0da-c092556dbfb4.png)

* **Client**: là tiến trình y/c dịch vụ từ phía server bằng cách gửi y/c, chờ server trả lời, nhận kết quả và hiển thị cho người sử dụng
* **Server**: là tiến trình triển khai 1 dịch vụ cụ thể. Công việc của nó là lắng nghe, nhận yêu cầu, xử lý, trả lời
* Tương tác giữa client và server có thể sử dụng hướng kết nối hoặc không hướng kết nối
* Với kiểu kiến trúc này sẽ có 1 số vấn đề như sau:
    * Đăng ký server: đây là cơ chế mà các server phải thực hiện để giúp cho các client biết được địa chỉ để gửi y/c (như DNS, dịch vụ thư mục)
    * Có thể hay không lặp lại y/c: vấn đề này nảy sinh khi client không nhận được báo nhận từ phía server. Client sẽ không biết là do server chưa nhận được y/c hay thông điệp báo nhận bị mất trên đường truyền. Lúc này tùy thuộc vào tính chất của dịch vụ hay ứng dụng mà client có gửi lại y/c hay không => việc cho phép lặp lại hay không phụ thuộc vào tính chất của dịch vụ đang sử dụng
    * Có nên sẻ dụng bộ nhớ trạng thái

Trong vài trường hợp chúng ta sẽ không thể phân biệt rõ ràng đâu là tiến trình client - server, ví dụ như 1 server trong hệ dữ liệu phân tán có thể đống vai trò là client khi y/c dữ liệu của server khác => thay vì phân biệt client-server sẽ phân biệt các tầng
### Phân tầng ứng dụng
Ứng dụng client-server chia làm 3 tầng chính:
* **Tầng giao diện người dùng:** nhiệm vụ là quản lý trực tiếp giao diện với người dùng. Tầng này cung cấp các chương trình cho phép người dùng cuối tương tác với các ứng dụng và các chương trình khác nhau bởi sự phức tạp của nó
* **Tầng nghiệp vụ**: chứa các chức năng xử lý chính của ứng dụng
* **Tầng dữ liệu**: có nhiệm vụ lưu trữ, duy trì dữ liệu để các ứng dụng sử dụng, dù không có ứng dụng sử dụng vẫn phải lưu trữ cho lần sử dụng kế tiếp

Ví dụ phân tầng ứng dụng tìm kiếm

![](https://images.viblo.asia/e000aca6-8b17-4b9c-afd3-bd7dd688b83c.png)

* Ở tầng giao diện người dùng, user dùng giao diện web của 1 trang tìm kiếm (google) và gõ từ khóa cần tìm kiếm
* Ở tầng nghiệp vụ, các diễn giải từ khóa mà người dùng vừa gõ sẽ được gửi xuống cho 1 mô đun có nhiệm vụ sinh ra các câu truy vấn CSDL từ các xâu ký tự từ khóa mà người dùng gõ. 
* Các câu truy vấn CSDL này sẽ được gửi xuống cho tầng thấp nhất là tầng dữ liệu.
* Tầng dữ liệu dựa vào các truy vấn đó sẽ lấy ra được dữ liệu cần tìm. 
* Dữ liệu thu được này sẽ gửi ngược lại lên tầng nghiệp vụ. Ở tầng nghiệp vụ sẽ có 1 mô đun chuyên dùng các thuật toán để sắp xếp lại các thứ hạng của các kết quả tìm kiếm đó.
*  Danh sách sau khi đã sắp xếp được gửi lên cho 1 mô đun chuyên sinh mã cho trang HTML.
* Sau đó kết quả được gửi lên cho tầng giao diện người dùng. Lúc này người dùng sẽ thấy trang web tìm kiếm 
### Kiến trúc đa tầng
Cách tổ chức đơn giản hơn là chia thành 2 kiểu máy tính client và server. Máy nào sở hữu chương trình nào sẽ quyết định xu hướng của mô hình hay còn gọi là 
![](https://images.viblo.asia/6f54dfc5-7f2b-4d1e-8937-b5b788e20d08.png)

* Hình a: Để 1 phần phụ thuộc giao diện ở máy client, phần còn lại ở máy server => mô hình kiến trúc này cho quyền điều khiển từ xa trên sự biểu diễn của dữ liệu lên máy client.
* Hình b: Chia ứng ụng thành phần giao diện đồ họa giao tiếp với phần còn lại nằm trên máy server bằng các giao thức ứng dụng => mô hình này, phần mềm client chỉ biểu diễn giao diện ứng dụng
* Hình c: 1 phần của lớp ứng dụng nằm ở máy client, phần còn lại nằm ở máy server => mô hình áp dụng trong trường hợp người dùng cần phải điền đầy đủ và đúng 1 biểu mẫu nào đó và phần ứng dụng nằm trên client sẽ y/c người dùng nhập  đầy đủ và chính xác biểu mãu đó rồi mới đem vào xử lý ở server.
* Hình d, e: 2 mô hình phổ biến với việc máy server chỉ quản lý CSDL, nó xảy ra khi 1 máy client kết nối qua 1 mạng máy tính tới 1 hệ thống tệp phân tán hoặc 1 CSDL. Phần lớn các ứng dụng chạy ở máy client nhưng các thao tác với CSDL thì chạy ở máy server.
* Ở hình e, máy client cũng có 1 phần thông tin dữ liệu. Đây là mô hình có sử dụng bộ đệm dữ liệu.

Như vậy liên quan đến **kiến trúc tập trung,** chúng ta có khái niệm kiến trúc client-server nhiều phần (*multitiers client-server architectures)* . Nó là kết quả của việc chia ứng dụng ra thành các phần như giao diện, các thành phần xử lý và thành phần dữ liệu. Các phần khác nhau này có liên quan trực tiếp đến việc tổ chức logic của ứng dụng. Trong nhiều trường hợp, việc xử lý phân tán có thể được hiểu là tổ chức ứng dụng client-server đó như một kiến trúc nhiều phần. Chúng ta gọi đó là ***phân phối  dọc*** (vertical distribution). 

## 2. Kiến trúc không tập trung
Liên quan đến vấn đề này là khái niệm ***phân phối ngang*** (horizontal distribution). Với hình thức phân tán này, một client hay server có thể bị phân chia một cách vật lý thành các phần bằng nhau, mỗi phần hoạt động trên phần mà nó được chia sẻ từ một tập dữ liệu hoàn chỉnh. Đây là cơ chế cân bẳng tải (nhân bản một chức năng của server lên nhiều máy).

Một ví dụ điển hình của kiến trúc không tập trung, đó là ví dụ về ***mạng ngang hàng*** (peer to peer network - P2P). P2P được chia làm 2 kiểu chính là P2P có cấu trúc và không có cấu trúc.

### P2P có cấu trúc
Trước khi nói đến P2P có cấu trúc chúng ta phải biết **mạng Overlay**  là gì?

![](https://images.viblo.asia/fb8b01c7-0c9c-4dda-b4e7-ff3d7ba58c99.png)

* Mạng Overlay là 1 mạng mà các node được tạo bởi các tiến trình và các đường kết nối được biểu diễn các kênh kết nối (như kết nối TCP), được xây dụng bên trên hệ thống mạng vật lý thực.

Trong kiến trúc P2P có cấu trúc, mạng Overlay được xây dựng dựa trên 1 thủ tục xác định. Thủ tục thường được sử dụng nhất là ***mô hình bảng băm phân tán DHT (Distributed Hash Table)***

![](https://images.viblo.asia/59c2b00c-c01f-42e8-97a5-eaa29504cc87.png)


* Hệ thống bảng băm phân tán là 1 lớp của HPT không tập trung, nó cung ứng 1 dịch vụ tìm kiếm tương tự với bảng băm sử dụng cặp khóa và giái trị.
* Với việc sử dụng mô hình bảng băm phân tán, khi muốn lưu trữ dữ liệu tên của tệp được băm bằng thuật toán SHA-1 tạo ra 1 khóa 160bit gọi là K. Sau đó dùng hàm put(K, data). Cặp (k, data) được truyền đi trong mạng Overlay đó đến được node chịu trách nhiệm khóa K dó. Và nó sẽ lưu trữ lại K và dữ liệu.
* Để lấy thông tin dữ liệu, chúng ta lại thực hiện băm tên tệp để có được khóa K và gọi lệnh get(K). Lúc đó thông điệp sẽ truyền trong mạng Overlay để đến được với node phụ trách khóa K đó.
* Để xây dựng mạng Overlay cần có thao tác phân vùng khóa. Thao tác này dùng để xác định các node chịu trách nhiệm các khóa, đồng thời khoảng cách giữa các node phải bé hơn 1 deta nào đó.
### P2P không có cấu trúc
- Người ta xây dựng trên các thuật toán ngẫu nhiên để xây dựng mạng overlay.
- Mỗi node có 1 danh sách các node hàng xóm.
- Dữ liệu được đưa vào mạng 1 cách ngẫu nhiên => khi muốn tìm dữ liệu nào đó cần thực hiện duyệt toàn bộ hệ thống (flooding)

## 3. Kiến trúc hỗn hợp
* Hệ thống máy chủ biên (edge-server system)
* Hệ phân tán hợp tác
### Hệ thống máy chủ biên
![](https://images.viblo.asia/22b198e2-df5f-4964-8e4c-5cb928409120.png)

* Các server được triển khai ở biên các mạng. 
* Đường biên được xác định bởi ranh giới giữa mạng doanh nghiệp với mạng Internet, được cung ứng bởi các nhà cung ứng dịch vụ mạng (ISP).
* Các người dùng cuối muốn truy cập vào mạng Internet phải kết nối thông qua server biên.
* Ý tưởng chính của mô hình hệ thống này:
    * Dữ liệu từ nhà cung cấp nội dung sẽ được phân tán đi các server biên. 
    * Các server biên sẽ phân phối tiếp nội dung đó đến cho các khách hàng. Các server biên ở đây có thể là chính các nhà cung ứng dịch vụ mạng.
    * Mục đính chính của việc dùng các server biên là để cung ứng nội dung cho các client mà các client không phải trực tiếp kết nối đến nhà cung cấp nội dung.
### Hệ phân tán hợp tác
Khi xây dựng 1 hệ thống kiến trúc hỗn hợp giữa hệ tập trung và không tập trung, ta cần xét đến mô hình client-server được sử dụng ở mức độ thường xuyên như thế nào.
* Ví dụ cách thiết kế hệ thống kiến trúc hỗn hợp là khi 1 node sẽ sử dụng mô hình tập trung để tham gia vào hệ thống với việc kiểm soát đăng ký và đăng nhập server.
* Sau đó node đó sẽ sử dụng ngay mô hình hoàn toàn không tập trung để trao đổi thông tin và tương tác với các node khác trong mạng hoàn toàn ngang hàng

Tổng kết lại thì tất các các mô hình kiến trúc trên đều có điểm chung cơ sở, đó là chúng đều được cấu tạo từ tiến trình có khả năng liên lạc với nhau bằng cách gửi thông điệp thông qua mạng máy tính. Chúng đều có y/c thiết kế làm sao cho đạt được các đặc tính về độ tin cậy, hiệu năng của các tiến trình và mạng. Đảm bảo độ an toàn tài nguyên cho hệ thống.

Ở phần tiếp theo mình sẽ giới thiệu về **[Quản lý tiến trình và luồng](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-3-quan-ly-tien-trinh-va-luong-vyDZO32aZwj)**. Mong mọi người đón đọc

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo:** Bài giảng Hề phân tán - DHBKHN