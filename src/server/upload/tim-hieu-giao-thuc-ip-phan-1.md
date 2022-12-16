Các máy tính trên mạng "nói chuyện" với nhau thông qua một ngôn ngữ đặc biệt gọi các giao thức mạng. Có nhiều giao thức khác nhau và mỗi giao thức đều có một nhiệm vụ riêng  như:
- Giao thức truyền dữ liệu, dùng để vận chuyển dữ liệu giữa 2 máy tính.
- Giao thức xử lý dữ liệu có nhiệm vụ xử lý dữ liệu nhận được từ giao thức truyền dữ liệu.

Giao thức IP là một giao thức của chồng giao thức TCP/IP thuộc tầng mạng. Mọi người có thể đọc bài [Tìm hiểu cơ bản về mô hình TCP/IP](https://viblo.asia/p/tim-hieu-co-ban-ve-mo-hinh-tcpip-RQqKLkJp57z) để biết chức năng của tầng mạng là gì nhé! Và hôm nay mình sẽ giới thiệu thêm về giao thức IP. Cùng tìm hiểu nhé!:wink:

# Đặc điểm của giao thức IP
* Là 1 trong những giao thức quan trọng nhất của bộ giao thức TPC/IP.
*  Là giao thức hướng không liên kết (connectionless): dữ liệu của IP được truyền đi ngay lập tức nếu có thể (best effort), không có bất kì cơ chế thiết lập kết nối , không có cơ chế báo nhận hay điều khiển luồng nào được sử dụng với IP, các gói tin IP cũng không được đánh số thứ tự khi trao đổi trên mạng… 
*  Mỗi gói tin IP được xử lý một cách hoàn toàn độc lập với các gói tin IP khác .
*  Giao thức IP sử dụng cơ chế định địa chỉ theo kiểu phân cấp, trong đó phần NetworkId của địa chỉ giống như tên của một con đường và phần hostId của địa chỉ sẽ là số nhà của một căn nhà trên con đường ấy.
*  Không có cơ chế khôi phục lại gói tin bị mất trên đường truyền. Việc này được giao lại cho các giao thức tầng trên để đảm bảo độ tin cậy (TCP)
# Cấu trúc gói tin
Gồm 2 phần là Header và data. *Header* chứa thông tin quản lý của gói tin, *data* là phần dữ liệu cần truyền tải được đóng gói trong gói tin IP

![](https://images.viblo.asia/d16966f4-c811-48b3-825b-7728507ef05d.png)

*  **VERS (4 bit)**: chỉ ra phiên bản hiện hành của IP đang được dùng, Nếu trường này khác với phiên bản IP của thiết bị nhận, thiết bị nhận sẽ từ chối và loại bỏ các gói tin này.
*  **HLEN (IP Header Length - 4 bit):**  chỉ độ dài phần tiêu đề của datagram, tính theo đơn vị word (32 bits). Nếu không có trường này thì độ dài mặc định của header là 5 từ.
*  **Service Type (8 bit)**: đánh dấu dữ liệu (marking) phục vụ cho tác vụ QoS với các gói tin IP
 >  **QoS (Quality of Service)** là tập hợp các kĩ thuật cho phép cấp phát các tài nguyên một cách thích hợp cho các loại dữ liệu khác nhau, từ đó có thể đảm bảo chất lượng dịch vụ mạng cho các loại dữ liệu này .
*  **Precedence (3 bit)**: chỉ thị quyền ưu tiên gửi datagram, cụ thể:

|Priority  | Main |
| -------- | -------- |
 |111     | Network Control (cao nhất)     |
  |011     | flash     |
|110     | Internetwork Control     |
|010     | Immediate     |
|101     | CRITIC/ECP     |
|001     | Priority     |
|100     | Flas Override     |
|000     | Routine (thấp nhất)     |

*  **Delay (1 bit)** : chỉ độ trễ yêu cầu. *0*: độ trễ bình thường; *1*: độ trễ thấp
*  **Throughput (1 bit)** : chỉ số thông lượng yêu cầu.  *0*: thông lượng bình thường;  *1*: thông lượng cao
*  **Reliability (1 bit)**: chỉ độ tin cậy yêu cầu. *0*: độ tin cậy bình thường; *1*: độ tin cậy cao

* **Total Length (16 bit)**: chiều dài của toàn bộ gói tin IP kể cả phần header được tính theo byte. Để biết chiều dài của dữ liệu cần lấy tổng chiều dài này trừ đi HLEN.
* **Identification (16 bit)**:  Trường định danh, cùng các tham số khác như địa chỉ nguồn (Source address) và địa chỉ đích (Destination address) để định danh duy nhất cho mỗi Datagram được gửi đi bởi 1 trạm. Thông thường phần định danh được tăng thêm 1 khi 1 Datagram được gửi đi.
* **Flags (3 bit)**: Cờ sử dụng trong khi phân đoạn các Datagram.
    * Bit 0: reserved chưa sử dụng, giá trị luôn là 0.
    * Bit 1: *DF = 1*: Gói tin bị phân đoạn, có nhiều hơn 1 đoạn, *DF = 0*: Gói tin ko bị phân đoạn.
    * Bit 2: *MF = 0:* đoạn cuối cùng, *MF = 1*: chưa là đoạn cuối cùng, còn đoạn khác phía sau nữa.

* **Fragment Offset (13 bit):** Chỉ vị trí của đoạn phân mảnh (Fragment) trong IP Datagram tính theo đơn vị 64 Bit. 
* **Time to Live (TTL) (8 bit)**: sử dụng để chống loop gói tin IP khi xảy ra lỗi định tuyến trên sơ đồ mạng. Giá trị này được đặt lúc bắt đầu gửi gói tin và nó sẽ giảm đi 1 đơn vị khi đi qua 1 router. Khi TTL = 0, gói tin sẽ bị loại bỏ.
* **Protocol (8 bit)**: nhận dạng giao thức nào đang được truyền tải trong phần data của gói tin IP, như TCP hay UDP.
* **Header checksum (8 bit)**: kiểm tra lỗi của IP Header. Nếu như việc kiểm tra này thất bại, gói dữ liệu sẽ bị huỷ bỏ tại nơi xác định được lỗi.
* **Source Address (32 bit)**: địa chỉ của trạm nguồn.
* **Destination Address (32 bit)**: địa chỉ của trạm đích.
* **Option (có độ dài thay đổi)**: cho phép thêm vào tính năng mới cho giao thức IP.
* **Padding (độ dài thay đổi)**: Cấu trúc của gói IP quy định option phải là bội số của 32 bit nên nếu option không đủ số bit , các bit padding sẽ được thêm vào để đạt được yêu cầu này .
* **Data (độ dài thay đổi)**: vùng dữ liệu có độ dài là bội của 8 bit, tối đa là 65535 byte.

# Địa chỉ IP
Mỗi máy tính khi kết nối Internet đều có 1 địa chỉ duy nhất, đó chính là địa chỉ IP. Mục đích là để định danh duy nhất cho 1 máy tính bất kỳ trên liên mạng.
## Cấu trúc địa chỉ
* Địa chỉ IP gồm 32 bit nhị phân , chia thành 4 cụm 8 bit (gọi là các octet). Các octet được biểu diễn dưới dạng thập phân và được ngăn cách bằng các dấu chấm.
* Địa chỉ IP được chia thành 2 phần : phần **NetworkID** (phần địa chỉ mạng) và phần **HostID** (phần địa chỉ máy trạm)
![](https://images.viblo.asia/3c9aa2d6-8ecf-48f6-a811-ba31923abd64.jpg) *Hình 1*

* Trong 1 byte (8 bit) , mỗi bit được gán một giá trị. Nếu bit được đặt là 0 thì nó được gán giá trị 0, nếu bit được đặt là 1 thì có thể chuyển đổi thành 1 giá trị thập phân. Bit thấp nhất trong byte tương ứng với 1, bit cao nhất tương ứng với 128. Vậy giá trị lớn nhất của 1 byte là 255 tương ứng với trường hợp cả 8 bit đều được đặt là 1.
![](https://images.viblo.asia/06448004-2b80-45d7-b964-27b759b717ef.png)
 * Ví dụ ở *Hình 1*, với octet đầu tiên và dựa vào cách tính ở hình trên ta có: 10000011 = 128+0+0+0+0+0+2+1 = 131. Tương tự với 3 octet còn lại, ta sẽ ra được 1 địa chỉ IP là 131.108.122.204 
*  Chú ý: Các bit phần NetworkID **không được phép** đồng thời bằng **0**.
## Các dạng địa chỉ
* **Địa chỉ mạng** (Network Address):
    * Định danh cho một mạng
    * **Tất cả các bit phần HostID là 0**

* **Địa chỉ quảng bá** (Broadcast Address)
    * Địa chỉ dùng để gửi dữ liệu cho tất cả các máy trạm trong mạng
    * **Tất cả các bit phần HostID là 1**

* **Địa chỉ máy trạm** (Unicast Address): gán cho một cổng mạng
* **Địa chỉ nhóm** (Multicast address): định danh cho nhóm
## Các lớp địa chỉ
Không gian địa chỉ IP được chia thành các lớp như sau:
![](https://images.viblo.asia/20b1e1f3-555d-483d-80a7-01c71843d4fe.png)

### Lớp A
* Địa chỉ lớp A sử dụng một otet(8 bit) đầu làm phần mạng, ba octet sau làm phần host
* Bit đầu của một địa chỉ lớp A luôn được giữ là ***0***.
* Các địa chỉ lớp mạng của lớp A gồm : ***1.0.0.0 -> 126.0.0.0***.
* Mạng ***127.0.0.0*** được sử dụng làm ***loopback***
* Phần host có 24 bit => mỗi mạng lớp A có (***2^24 – 2***) host.

### Lớp B
* Địa chỉ lớp B sử dụng hai octet đầu làm phần mạng , hai octet sau làm phần host.
* Hai bit đầu của một địa chỉ lớp B luôn được giữ là ***1 0***
* Các địa chỉ mạng lớp B gồm : ***128.0.0.0 -> 191.255.0.0*** . Có tất cả ***2^14=16384*** mạng trong lớp B.
* Phần host dài 16 bit => một mạng lớp B có (***2^16 – 2 = 65534***) host.

### Lớp C
* Địa chỉ lớp C sử dụng 3 octet đầu làm phần mạng , một octet sau làm phần host.
* Ba bit đầu của một địa chỉ lớp C luôn được giữ là ***1 1 0***.
* Các địa chỉ mạng lớp C gồm : ***192.0.0.0 -> 223.255.255.0***. Có tất cả ***2^21*** mạng trong lớp C.
* Phần host dài 8 bit do đó có một mạng lớp C có (***28 – 2 = 254***) host.

### Lớp D
* Bốn bit đầu của một địa chỉ lớp D luôn được giữ là ***1 1 1 0***
* Gồm các địa chỉ thuộc dải: ***244.0.0.0 -> 239.255.255.255***
* Được sử dụng để làm địa chỉ ***multicast***.

### Lớp E
* Năm bit đầu của một địa chỉ lớp E luôn được giữ là ***1 1 1 1***
* Địa chỉ thuộc dải từ ***240.0.0.0*** trở đi
* Được sử dụng cho mục đích dự phòng.

**Chú ý:**
* Các lớp địa chỉ IP có thể sử dụng để đặt cho các host là các lớp A,B,C
* Để dễ dàng nhận diện một địa chỉ IP thuộc lớp nào , ta có thể quan sát octet đầu của địa chỉ nằm trong khoảng giá trị:

|  Địa chỉ lớp | Octet đầu của địa chỉ | 
| -------- | -------- | 
| A     | 1 -> 126     |
| B     | 128 -> 191    |
| C    | 192 -> 223    |
| D     | 224 -> 239   |
| E     | 240 -> 255    |

Tuy nhiên việc phân chia cứng thành các lớp (A, B, C, D, E) làm hạn chế việc sử dụng toàn bộ không gian địa chỉ dẫn đến lãng phí không gian địa chỉ. Vậy giải pháp là gì:thinking:? 
Ở phần 2 mình sẽ nói tiếp về cách giải quyết vần đề này thé!:wink: 

Thanks for reading:sparkling_heart:

*Nguồn tham khảo*: Giáo trình *mạng máy tính* của Đại học Bách Khoa Hà Nội