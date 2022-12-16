Lại là mình và lại tiếp tục chuỗi series về hệ phân tán nữa nào! Ở phần trước mình đã nói về [Quản lý tiến trình và luồng](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-3-quan-ly-tien-trinh-va-luong-vyDZO32aZwj) và hôm nay mình sẽ nói về cách thức trao đổi thông tin trong HPT như thế nào nhé! Let's go

**Mục lục:**

* Trao đổi thông tin giữa các tiến trình
* Lời gọi thủ tục từ xa

# 1. Trao đổi thông tin giữa các tiến trình
Các tiến trình trao đổi thông tin với nhau thông qua chủ yếu 2 giao thức TCP và UDP. Và để hiểu rõ hơn về 2 giao thức này cũng như cách thức trao đổi thông tin thông qua chúng mọi người có thể xem bài viết này của mình [Tìm hiểu giao thức TCP và UDP](https://viblo.asia/p/tim-hieu-giao-thuc-tcp-va-udp-jvEla11xlkw). 

Ở đây mình sẽ nói thêm 1 chút về việc **đóng liên kết, kiểm soát luồng và kiểm soát tắc nghẽn trong TCP** để mọi người rõ hơn về TCP:slightly_smiling_face: 

### Đóng liên kết trong TCP

![](https://images.viblo.asia/c7016ba1-9af8-4b98-83da-0a87ea4b1d01.png)

Nhìn hình chúng ta cũng thấy, khi muốn đóng liên kết: 
* Host A sẽ gửi gói tin FIN (Finish) cho Host B
* Host B nhận được gói FIN, gửi gói ACK trả lời lại, đồng thời vào vào trạng thái “chờ” và gửi tiếp gói FIN
* Host A nhận được gói FIN và gửi gói ACK để xác nhận
* Cuối cùng Host B nhận được gói ACK xác nhận và đóng liên kết

**Lưu ý:** Cả hai bên đều có thể chủ động đóng liên kết 

### Kiểm soát luồng
![](https://images.viblo.asia/f3d64be3-1f79-42fb-bd80-1c3a68f58f4e.png)
TCP đảm bảo rằng dữ liệu truyền đi sẽ không làm quá tải bên nhận, bởi vì khi bên nhận không còn khả năng nhận thêm dữ liệu những gói tin tiếp theo sẽ mất.
* Để kiểm soát được luồng dữ liệu, bên nhận sẽ có một cửa sổ nhận Receiver Window (rwnd) dùng để báo khoảng trống còn lại mà bên nhận có thể nhận. 
* Mỗi khi nhận được một gói tin, bên nhận gửi một ACK đến bên gửi để xác nhận, trong gói tin ACK đó sẽ chứa giá trị của rwnd. Từ đó bên gửi có thể tiếp tục gửi những gói tin tiếp theo.
* Lượng dữ liệu gửi đi phải nhỏ hơn min(Rwnd, Cwnd), trong đó CWnd: Cửa sổ kiểm soát tắc nghẽn
> **Cwnd** được thiết lập dựa vào quan sát về mức độ tắc nghẽn:
> * Dấu hiệu không tường minh: lượng gói rớt.
> * Dấu hiệu tường minh: gói điều khiển thông báo tình trạng tắc nghẽn
### Kiểm soát tắc nghẽn
TCP có 3 giai đoạn kiểm soát tắc nghẽn:
* **Slow-start:** Tăng tuyến tính có thể mất nhiều thời gian để kết nối TCP đạt tốc độ. Ý tưởng cơ bản:
    * Đặt cwnd bằng 1 MSS (Maximum segment size)
    * Tăng cwnd lên 1 mỗi khi nhận được ACK, cửa sổ được tăng gấp đôi sau mỗi RTT (Round Trip Time)
    * Bắt đầu thấp, nhưng tăng theo hàm mũ

Tăng cho đến một ngưỡng ***ssthresh*** và sau đó, TCP chuyển sang trạng thái tránh tắc nghẽn
* **Congestion Avoidance**: giai đoạn tránh tắc nghẽn:
    * Tăng cwnd theo cấp số cộng sau khi nó đạt tới ngưỡng tắc nghẽn ssthresh.
    * Khi bên gửi nhận được ACK, tăng cwnd thêm 1 MSS
* **Congestion detection**: giai đoạn phát hiện tắc nghẽn, tắc nghẽn xảy ra khi timeout hoặc bên gửi nhận được 3 ACK trùng lặp.
    * Cách xử lý: Khi có timeout của bên gửi
        * TCP đặt ngưỡng ssthresh xuống còn một nửa giá trị hiện tại của cwnd
        * TCP đặt cwnd về 1 MSS
        * TCP chuyển về slow start 

# 2. Lời gọi thủ tục từ xa
## 2.1. Cơ chế RPC (Remote Procedure Call) 

 Là cơ chế truy cập trong suốt với người dùng
 
 ![](https://images.viblo.asia/d554fc66-9733-4f7b-aea3-76259fda1afd.png)

Khi một tiến trình trên máy A (client) muốn thực hiện một thủ tục nào đó nằm trên máy B (server ) nó sẽ thực hiện một lời gọi thủ tục từ xa tới máy B. Tiến trình gọi trên A sẽ bị treo, và quá trình thực thi thủ tục được gọi diễn ra trên máy B dựa trên các tham số được truyền đến từ máy A và kết quả sẽ được truyền trở lại cho máy A tương ứng.

Trong ***mô hình client – server*** thì lời gọi thủ tục từ xa được thực hiện như sau:

![](https://images.viblo.asia/a3057146-51ec-4385-81b1-9982c9fe0fb5.png)

*    Tiến trình muốn thực hiện thủ tục ở máy client sẽ gọi client stub.
*    Client stub tạo một bản tin và có lời gọi đến HĐH của client đó.
*    HĐH của máy client sẽ gửi bản tin đó tới HĐH của máy server.
*    HĐH của server sẽ gửi bản tin tới server stub.
*    Lúc này server stub sẽ lấy các thông tin của gói tin và gọi server tương ứng.
*    Server thực hiện công việc được yêu cầu và trả kết quả về cho server stub.
*    Server stub đóng gói kết quả đó vào bản tin rồi gọi HĐH của server đó.
*    HĐH của máy server này sẽ gửi bản tin kết quả đó HĐH của máy client.
*    HĐH của máy client sẽ gửi bản tin cho client stub.
*    Client stub sẽ mở gói tin kết quả và trả về cho client.

Trong đó:
* **Client stub:** chứa procedures mà client sẽ gọi thật sự
    * Thu thập và đóng gói (pack) các tham số thành thông điệp và gọi hàm hệ thống (system call) để gửi đi. 
    * Mở đóng gói (Unpack) kết quả trả về và chuyển kết quả cho client.
* **Server stub:** chứa procedures được gọi bởi hệ thống trên máy Server khi có một thông điệp được truyền đến, sau đó sẽ gọi procedures thật sự trên máy Server để thực thi.
 
=> 2 thành phần nhằm giảm nhẹ công việc cho client và server, làm cho hệ thống hoạt động một cách trong suốt hơn.

### Các thao tác của RPC
**Đóng gói các tham số**
* Việc đóng gói các tham số để chuẩn bị truyền đi do client stub thực hiện. 
* Client stub sẽ sắp xếp các tham số và đưa vào hàng đợi. Quá trình này được gọi là parameter marshaling. 
* Các tham số được truyền đi giúp cho server hiểu được công việc mình cần thực hiện tương ứng là gì để xác định lời gọi đến thủ tục thích hợp.

**Truyền tham số**

Việc truyền tham số từ client tới  có hai cách truyền: truyền tham biến và truyền tham trị.
* *Truyền tham biến*:
    * Các tham số được truyền đi là con trỏ hay biến chứa địa chỉ của nơi chứa giá trị thực của chúng. 
    * Các thủ tục được gọi sẽ căn cứ vào địa chỉ này để tham chiếu đến giá trị khi tính toán.
    *  Khi giá trị này bị thay đổi trong khi thực hiện thủ tục thì sẽ được thông báo cho client và các lần gọi sau sẽ dùng giá trị mới đó.
*  *Truyền tham trị*:
    *  Các tham số được truyền đi là các giá trị cụ thể. 
    *  Các thủ tục được gọi đến sẽ coi các tham biến được truyền kiểu tham trị như là các biến được khởi tạo cục bộ, có thể thay đổi giá trị nhưng lại không ảnh hưởng tới giá trị gốc trong lần gọi sau.

### Vấn đề với cơ chế truyền tham số
Nhìn ý tưởng của cơ chế trông rất đơn giản, tuy nhiên thực tế cơ chế vẫn còn tồn tại nhiều vấn đề liên quan đến việc truyền tham số. Đó là:
* Thứ nhất, do phía gọi và phía bị gọi nằm ở hai máy tính khác nhau, nên chúng sẽ được thực thi trên những không gian địa chỉ khác nhau, và điều này gây ra sự phức tạp không nhỏ.
* Thứ hai, tham số và kết quả trả về cũng phải được truyền di => gây ra sự phức tạp nếu như hai máy không tương tự nhau.
* Cuối cùng, trong quá trình thực hiện, có thể một trong hai máy xảy ra lỗi, và lỗi này có thể gây ra một số vấn đề khác nữa

Và để khắc phục các vấn đề trên, người ta đã mở rộng mô hình RPC ra làm hai loại chính: *Synchronous RPC* và *Asynchronous RPC*.

## Các mô hình RPC mở rộng
Việc mở rộng mô hình này làm cho
* Client và Server được cài đặt bởi các NSX khác nhau
* Giao diện thống nhất client và server
    * Không phụ thuộc công cụ và ngôn ngữ lập trình
    * Mô tả đầy đủ và trung lập
    * Thường dùng ngôn ngữ định nghĩa giao diện 

### Asynchronous RPC (RPC không đồng bộ)
![](https://images.viblo.asia/a4a4e1d6-e80c-48e4-8c2f-e181ce315738.png)

* Client gửi tới server lời gọi thủ tục và chờ bản tin chấp nhận từ server. 
* Phía server sẽ gửi một tín hiệu ACK về cho client thông báo đã nhận được yêu cầu và bắt đầu thực hiện yêu cầu RPC đó. 
* Lúc này client sẽ tếp tục thực hiện công việc của mình mà không chờ kết quả từ server như ở RPC truyền thống.

### Synchronous RPC (RPC đồng bộ)
![](https://images.viblo.asia/d9715ee3-18a5-4a11-8463-22189e1c5b03.png)

* Thực hiện hai lời gọi, một từ client và một từ server. 
* Client gửi tới server lời gọi thủ tục và chờ bản tin chấp nhận từ server. 
* Server gửi bản tin chấp nhận về cho client thông báo đã nhận được yêu cầu và bắt đầu thực hiện yêu cầu RPC đó. 
* Lúc này client sẽ tếp tục thực hiện công việc của mình. 
* Khi thực hiện thủ tục xong, server sẽ thực hiện lời gọi tới client báo nhận lấy kết quả. 
* Client thực hiện ngắt, nhận kết quả và gửi lại cho server tín hiệu ACK đã nhận kết quả thành công. 

### One- way RPC (RPC đơn tuyến)
![](https://images.viblo.asia/3d714cda-bd33-48f2-9d4f-23c993b5efd4.png)
Sau khi thực hiện lời gọi thủ tục từ xa tới server, client không chờ đợi thông báo  nhận yêu cầu thành công từ server mà tiếp tục thực hiện ngay các công việc khác của mình.

## 2.2. Triệu gọi đối tượng từ xa - RMI (Remote Method Invocation)
* RMI  là cách thức giao tiếp giữa các đối tượng Java.
* Cho phép 1 phương thức thực thi từ xa trên nhiều máy ảo khác nhau.
### Mô hình đối tượng phân tán

![](https://images.viblo.asia/439421e6-1b09-46e1-931b-ad531b48373f.png)
* Một đối tượng phân tán gồm các thành phần sau:
    *  **State**: các dữ liệu đã được đóng gói.
    *  **Method**: các thao tác có thể thực hiện trên dữ liệu.
    *  **Interface**: nơi để giao tiếp với các phương thức của đối tượng. 
*  Một đối tượng có thể thực thi nhiều interface và cũng có thể có nhiều đối tượng cùng thực thi một interface giống nhau.
* Sự độc lập giữa các interface và các đối tượng thực thi interface cho phép ta có thể đặt một interface vào một máy nào đó trong khi chính bản thân đối tượng có thể cư trú ở máy khác.

![](https://images.viblo.asia/5770a85e-f17f-44d9-9a15-ef7de735a34b.png)


Ở hình trên là Mô hình đối tượng phân tán
*  Các đối tượng A1, A2 gọi các phương thức của nhau được gọi là triệu gọi phương thức cục bộ (local method invoke). Đây là cách lập trình hướng đối tượng truyền thống vẫn sử dụng, tương tự các đối tượng C1, C2, C3 là các đối tượng cục bộ.
* Tuy nhiên các đối tượng Java có thể triệu gọi phương thức của một đối tượng nằm trên một máy khác dựa vào giao thức triệu gọi từ xa RMI. Ở mô hình trên thì lời triệu gọi phương thức của đối tượng B1 ở trên máy B từ đối tượng A2 ở trên máy A là lời gọi phương thức từ xa.

### Mục đích của RMI
Hỗ trợ gọi phương thức từ xa trên các đối tượng trong các máy ảo (JVM) khác nhau
* Tích hợp mô hình đối tượng phân tán vào ngôn ngữ lập trình Java theo một cách tự nhiên, có tin cậy trong khi vẫn duy trì các ngữ cảnh đối tượng của ngôn ngữ lập trình Java
* Làm cho mô hình đối tượng phân tán và mô hình đối tượng cục bộ không có sự khác biệt.

### Vấn đề phát sinh
* Việc gọi phương thức của đối tượng từ xa luôn phức tạp hơn gọi phương thức cục bộ. Các đối tượng trên hai máy khác nhau hoạt động trên hai tiến trình khác nhau có hai không gian địa chỉ khác nhau nên:
    * Việc tham chiếu đến biến, địa chỉ của đối tượng là khác nhau ở các máy khác nhau
    * Các tham số truyền cho phương thức của đối tượng ở xa phải được đóng gói và chuyển qua mạng đến phương thức thực sự.
    * Lời gọi phương thức từ xa phải thông qua mạng và có thể bị ngắt ngang do mạng gặp sự cố
* Phụ thuộc vào kết nối mạng

### Giải pháp
* Để giải quyết vấn đề trên,  đối tượng trên hai máy khác nhau không gọi trực tiếp mà thông qua  **lớp trung gian**
* Lớp trung gian tồn tại ở cả hai phía Client (Stub) và Server (Skeletion)
    * **Stub**: có nhiệm vụ gửi tiếp lời yêu cầu này đến Skeleton phía server bằng cách:
        *  Mở một socket đến server
        * Đóng gói các tham số:
            * Gói nhận dạng đối tượng từ xa
            * Gói phương pháp nhận dạng
    * **Skeletion**: chứa đựng một phương thức nhận các lời yêu cầu từ xa:
        * Mở gói tham số
        * Gọi hàm thực sự trên server để tính toán
        * Trả kết quả về Stub phía client.



### Kiến trúc RMI
![](https://images.viblo.asia/a1198eff-087f-4387-ad25-b323d017e383.png)
* Lớp trung gian Stub và Skeletion: có nhiệm vụ chặn các lời gọi phương thức của Client tới các biến tham chiếu và gửi tới dịch vụ từ xa. Lớp Skeletion sẽ đọc các tham số của lời triệu gọi từ xa từ 1 liên kết nào đó, thực hiện lời gọi tới đối tượng thực thi dịch vụ từ xa, sau đó gửi trả giá trị lại cho Stub
* Remote Reference Layer: tâng này dịch và quản lý các tham chiếu tới các đối tượng dịch vụ từ xa. Đây chính là hệ thống truyền thông của RMI
* Transport: Đây là tầng Giao vận, dựa trên các kết nối TCP / IP giữa các máy tính trong mạng.

### Cơ chế hoạt động của RMI
![](https://images.viblo.asia/6092cf4a-b62a-46b1-b6fa-6dc4c3de0c4d.png)
*  (1): RMI-server đăng ký tên của đối tượng với Registry Server.
*  (2): Registry Server trả về tham chiếu đến đối tượng ở xa RMI Server thông qua lớp giao tiếp
*  (3), (4): RMI-client liên lạc với Registry Server để lấy về tham chiếu đến đối tượng trên Server. Các quá trình đăng ký và truy tìm tên đối tượng được Java quản lý bằng các hàm giao tiếp API JNDI
*  (5), (6), (7): Client sẽ gọi các phương thức của đối tượng trên Server. Khi một phương thức được gọi, sẽ được chuyển tiếp đến lớp trung gian Stub, rồi gọi đến lớp Skeleton.
*  (8), (9), (10): Lớp Skeleton sẽ trực tiếp yêu cầu đối tượng thực thi phương thức và trả kết quả cho Client

## So sánh RPC và RMI
RPC và RMI là các cơ chế cho phép máy khách gọi thủ tục hoặc phương thức từ máy chủ thông qua thiết lập giao tiếp giữa máy khách và máy chủ. 
* Giống nhau:
    * Cùng hỗ trợ lập trình với các giao diện
    * Dựa trên giao thức yêu cầu/trả lời
    * Mức độ trong suốt 
* Khác nhau:
 
| Đặc điểm | RPC |  RMI |
| -------- | -------- | -------- |
| Hỗ trợ     | Lập trình thủ tục     | Lập trình hướng đối tượng     |
| Thông số     | Cấu trúc dữ liệu thông thường được chuyển đến các thủ tục từ xa | Các đối tượng được truyền cho các phương thức từ xa |
| Hiệu quả     | Thấp hơn RMI | Hơn RPC và được hỗ trợ bởi phương pháp lập trình hiện đại (ví dụ: mô hình hướng đối tượng) |
| Tham số  | Bắt buộc    | không bắt buộc  |
|  Lập trình  | thấp hơn RMI   | dễ dàng hơn RPC  |

Ở phần tiếp theo của serises sẽ là phần về *[Đồng bộ hóa trong HPT](https://viblo.asia/p/tim-hieu-ve-he-phan-tan-phan-5-dong-bo-hoa-part-1-1Je5E9Ny5nL)* mong mọi người đón đọc.

Thanks for reading:sparkling_heart:

**Tài liệu tham khảo**: Bài giảng Hệ phân tán - ĐHBKHN