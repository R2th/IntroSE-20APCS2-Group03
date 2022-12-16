Ở [phần 1](https://viblo.asia/p/tim-hieu-giao-thuc-ip-phan-1-bJzKmxer59N) mình đã giới thiệu cơ bản về giao thức IP trong mô hình TCP/IP và ở cuối bài mình cũng nói *Việc phân chia cứng thành các lớp (A, B, C, D, E) làm hạn chế việc sử dụng toàn bộ không gian địa chỉ dẫn đến lãng phí không gian địa chỉ.* Và phần này sẽ là hướng giải quyết cho vấn đề này nhé!:wink:

Vậy giải pháp là gì? Như chúng ta đã biết giao thức TCP/IP quy định hai địa chỉ IP muốn làm việc trực tiếp với nhau thì phải nằm chung một mạng, hay còn gọi là có chung một Network ID và để giảm thiểu việc sử dụng toàn bộ không gian mạng gây lãng phí thì mỗi địa chỉ IP đều đi kèm với thành phần gọi là **Subnet mask** (còn gọi là mặt nạ mạng) để phân chia thành các mạng con.

### Mục đích phân chia subnet mask
- Giảm giao dịch trên mạng, chỉ có gói tin nào có địa chỉ đích ở ngoài mới được chuyển tiếp.
- Quản lý mạng đơn giản hơn, dễ kiểm tra khi có sự cố và xác định được nguyên nhân gây lỗi hơn là trong một mạng lớn.
- Mỗi một subnet cũng được phân biệt với các subnet khác bằng cách thêm vào một định danh nào đó. Định danh này được gọi là *subnet address*. Để phân chia thành các mạng subnet, ta cần biết số lượng subnet của mạng và số thiết bị trong mỗi subnet, khi đó router trên mỗi subnet chỉ cần biết thông tin địa chỉ của mỗi máy trên một subnet mà nó quản lý.

Vậy Subnet mask là gì?

### Subnet mask
 - Subnet mask cũng là một dải nhị phân dài 32 bit và chia ra 4 bộ 8 bit như địa chỉ IP được sử dụng để che 1 phần của địa chỉ IP. Bằng cách này các máy tính có thể xác định đâu là Net ID và đâu là Host ID trong 1 địa chỉ IP.
 -  Đặc điểm của subnet mask là phân làm hai vùng, vùng bên trái chỉ chứa các bit 1 và vùng bên phải chỉ chứa các bit 0. Do đó phần địa chỉ IP nằm tương ứng với vùng các bit 1 của Subnet mask sẽ là NetID của địa chỉ đó. Ví dụ 1 subnet mask có dạng :
    ![](https://images.viblo.asia/24d45aec-48ea-425e-8027-bb040a67170b.png)

 -  Không phải tất cả các mạng đều cần có Subnet và vì thế không cần sử dụng Subnet. Trong trường hợp này người ta nói là sử dụng Subnet mask mặc định ( default Subnet mask ). Có 3 Subnet mask mặc định


  Lớp | Default subnet mask  |Prefix length
-------- | -------- |--------
 A     | 255.0.0.0     | /8
  B     | 255.255.0.0 |/16
   C     | 255.255.255.0   | /24
Trong đó: ***Prefix length*** là số lượng các bit trong subnet mask làm địa chỉ mạng
   
###    Cách tính địa chỉ mạng
Một địa chỉ IP có thể thuộc các mạng khác nhau nếu sử dụng các subnet mask khác nhau. Để xác định địa chỉ IP đó thuộc mạng nào, ta chỉ cần lấy địa chỉ IP AND (bitwise) với subnet mask tương ứng.

* Phép toán AND (nhắc lại nếu các bạn quên:wink:)
    * 0 AND 0 = 0
    * 0 AND 1 = 0
    * 1 AND 0 = 0
    * 1 AND 1 = 1

Để mình lấy ví dụ cho dễ hiểu nhé! 


| |  Dạng thập phân|Dạng nhị phân|Note|
| -------- | -------- | -------- |-------- |
| Địa chỉ IP  | 203.178.142.130 | 11001011.10110010.10001110.10000010|Nhìn vàò số đầu tiên (203) => thuộc lớp C. Vậy nó sẽ có 3 octet đầu làm phần mạng , một octet sau làm phần host
| Netmask  | 255.255.255.224    | 11111111.11111111.11111111.11100000|
| Địa chỉ mạng  | 203.178.142.128    | 11001011.10110010.10001110.10000000|Do 3 octet đầu của Netmask đều là 1 nên khi AND vs phần mạng của đ/c IP đều ra chính phần mạng của đ/c IP đó => ta chỉ cần AND phần host của đ/c IP và octet cuối Netmask là sẽ ra phần host của đ/c mạng (quá nhanh phải k ạ:grin:)
Để tính nhanh được đia chỉ mạng, quan trọng bạn phải biết rõ đ/c IP thuộc lớp nào và cách chia của nó ra làm sao thì sẽ tính rất nhanh. Và đây là chi tiết
![](https://images.viblo.asia/8de805cc-b234-4413-9c41-41d62fa1e1d7.png)

Ở đây (**/27**) có nghĩa là dùng 27 bit 1 của subnet mask làm địa chỉ mạng. 

* Cách chia địa chỉ mạng mọi người có thể tham khảo bài [Hướng dẫn chia IP](https://anninhmang.edu.vn/huong-dan-chia-ip/). Mình thấy bài này viết khá chi tiết và thời còn đi học thì mình cũng làm theo các bước này :grin:


### Tổng kết
Qua hai phần thì mình cũng đã giới thiệu những kiến thức cơ bản cần nắm được của giao thức IP như đặc điểm của giao thức, cấu trúc gói tin, địa chỉ IP cũng như subnet mask và cách tính địa chỉ mạng. Hi vọng sẽ giúp ích cho những bạn đang học về mạng máy tính:grin:. 

Thanks for reading:sparkling_heart:

Phần 1: [Tìm hiểu giao thức IP (Phần 1)](https://viblo.asia/p/tim-hieu-giao-thuc-ip-phan-1-bJzKmxer59N#_cau-truc-goi-tin-1)

*Nguồn tham khảo*: Giáo trình *mạng máy tính* của Đại học Bách Khoa Hà Nội